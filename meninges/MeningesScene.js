import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  MENINGES_GLB_FILES,
  resolveMeningesAsset,
  isGhostContextKey,
  isNonInteractiveContextKey,
  isMembraneKey,
  ghostOpacityForKey,
} from './meningesManifest.js';
import meningesStructures from './meningesStructures.js';
import {
  createViewer,
  centerSceneOnce,
  frameObject,
  disposeScene,
  resizeViewer,
} from './viewer.js';
import { THEME_COLORS } from './theme.js';
import { modelUrl } from './paths.js';

const FADED_OPACITY = 0.14;
const EMISSIVE_BASE = 0.14;
const EMISSIVE_HOVER = 0.38;
const EMISSIVE_SELECTED = 0.55;

const SPECIAL_COLORS = {
  // Day mode: vivid orange / electric blue / red so clickable dura pops on cream
  '01_Falx_cerebri': { dark: 0xe8dcc8, light: 0xff7a00 },
  '02_Tentorium_cerebelli_L': { dark: 0xe0d4bc, light: 0xff1a1a },
  '02_Tentorium_cerebelli_R': { dark: 0xe0d4bc, light: 0xff1a1a },
  '03_Cavernous_sinus_L': { dark: 0x5a7ad0, light: 0x0055ff },
  '03_Cavernous_sinus_R': { dark: 0x5a7ad0, light: 0x0055ff },
  '04_Spinal_dura': { dark: 0xd8ccb4, light: 0xff8c00 },
  '00_Skull_context': { dark: 0x9a9088, light: 0x7a7068 },
  Brainstem: { dark: 0x9a9088, light: 0x7a7068 },
};

function baseColorForStructure(key, theme) {
  if (SPECIAL_COLORS[key]) {
    return new THREE.Color(SPECIAL_COLORS[key][theme] ?? SPECIAL_COLORS[key].dark);
  }
  return new THREE.Color(theme === 'light' ? 0xc8bca0 : 0xe0d4bc);
}

function isAuthoredPaintColor(color) {
  if (!color) return false;
  const max = Math.max(color.r, color.g, color.b);
  const min = Math.min(color.r, color.g, color.b);
  const sat = max - min;
  const lum = 0.2126 * color.r + 0.7152 * color.g + 0.0722 * color.b;
  if (sat > 0.04) return true;
  return lum > 0.12 && lum < 0.9;
}

function resolveStructurePaint(source, structureKey, theme) {
  // Teaching palette (incl. grey brainstem) over authored atlas paints.
  if (SPECIAL_COLORS[structureKey] || isGhostContextKey(structureKey)) {
    return baseColorForStructure(structureKey, theme);
  }
  const authored = source?.color?.clone?.() ?? null;
  if (source?.map) return authored ?? new THREE.Color(0xffffff);
  if (isAuthoredPaintColor(authored)) return authored;
  return baseColorForStructure(structureKey, theme);
}

function forEachMaterial(material, fn) {
  if (Array.isArray(material)) material.forEach(fn);
  else fn(material);
}

function prepareMeshMaterial(material, structureKey, theme) {
  const sources = Array.isArray(material) ? material : [material];
  const isGhost = isGhostContextKey(structureKey);
  const isMembrane = isMembraneKey(structureKey);
  const ghostOpacity = ghostOpacityForKey(structureKey, theme);
  const isTranslucent = isGhost || isMembrane;
  const isDay = theme === 'light';

  const prepared = sources.map((source) => {
    const mat = source.clone();
    const baseColor = resolveStructurePaint(source, structureKey, theme);
    mat.side = THREE.DoubleSide;
    mat.color.copy(baseColor);
    // Day: stronger tint so interactive dura pops; night keeps soft glow
    mat.emissive = baseColor.clone().multiplyScalar(
      isGhost ? 0.04 : isDay ? 0.35 : 0.08,
    );
    mat.emissiveIntensity = isGhost ? 0.06 : isDay ? 0.48 : EMISSIVE_BASE;
    mat.metalness = isGhost ? 0.05 : 0;
    mat.roughness = isMembrane ? (isDay ? 0.42 : 0.35) : isGhost ? 0.9 : 0.72;
    mat.transparent = isTranslucent;
    mat.opacity = ghostOpacity;
    mat.depthWrite = !isTranslucent;
    mat.userData.baseColor = baseColor.clone();
    mat.userData.structureKey = structureKey;
    mat.userData.isGhostContext = isGhost;
    mat.userData.isMembrane = isMembrane;
    mat.userData.baseOpacity = ghostOpacity;
    mat.userData.baseEmissiveIntensity = mat.emissiveIntensity;
    mat.userData.usesAuthoredPaint =
      Boolean(source?.map) || isAuthoredPaintColor(source?.color);
    return mat;
  });

  return Array.isArray(material) ? prepared : prepared[0];
}

function resolveStructureName(object, group) {
  let node = object;
  while (node && node !== group) {
    if (node.name && meningesStructures[node.name]) return node.name;
    node = node.parent;
  }
  return null;
}

function displayTitleForKey(key, rawTitle) {
  const source = rawTitle || key.replace(/^\d+_/, '').replace(/_/g, ' ');
  return source
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase());
}

export class MeningesScene {
  constructor(canvas, {
    onSelect,
    onLoadProgress,
    onSelectionChange,
    onReady,
    theme = 'dark',
    interactive = true,
  } = {}) {
    this.canvas = canvas;
    this.onSelect = onSelect;
    this.onLoadProgress = onLoadProgress;
    this.onSelectionChange = onSelectionChange;
    this.onReady = onReady;
    this.theme = theme;
    this.interactive = interactive;

    this.assemblyRoot = new THREE.Group();
    this.assemblyRoot.name = 'assemblyRoot';
    this.meningesGroup = new THREE.Group();
    this.meningesGroup.name = 'meningesGroup';
    this.assemblyRoot.add(this.meningesGroup);

    this.structures = new Map();
    this.centerState = { centered: false };
    this.labelEl = null;
    this._labelWorld = new THREE.Vector3();
    this._labelNdc = new THREE.Vector3();

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lastFrontName = null;
    this.clickDepth = 0;
    this.selectedName = null;
    this.hoveredName = null;
    this.pendingHoverEvent = null;
    this.hoverDirty = false;
    this.pendingLoads = MENINGES_GLB_FILES.length;
    this.loadedCount = 0;
    this.failedLoads = 0;
    this.loader = new GLTFLoader();
    this.disposed = false;

    const colors = THEME_COLORS[theme] ?? THEME_COLORS.dark;
    const viewer = createViewer(canvas, colors.scene);
    this.scene = viewer.scene;
    this.camera = viewer.camera;
    this.renderer = viewer.renderer;
    this.controls = viewer.controls;
    this.scene.add(this.assemblyRoot);

    this.loadAllModels();
    if (this.interactive) this.bindInteraction();
    this.animate();
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('beforeunload', () => this.dispose());
  }

  setLabelElement(el) {
    this.labelEl = el;
  }

  getLabelText(name) {
    if (!name) return '';
    const data = meningesStructures[name];
    const lang = document.documentElement.lang === 'az' ? 'az' : 'en';
    if (lang === 'az' && data?.titleAz) return data.titleAz;
    return displayTitleForKey(name, data?.title);
  }

  frameStructure(name) {
    const entry = this.structures.get(name);
    if (!entry?.root?.visible) {
      frameObject(this.camera, this.controls, this.assemblyRoot);
      return;
    }
    frameObject(this.camera, this.controls, entry.root);
  }

  notifySelectionChange() {
    this.onSelectionChange?.(this.selectedName);
  }

  projectStructureToCanvas(name, out = this._labelNdc) {
    const entry = this.structures.get(name);
    if (!entry?.root?.visible) return null;

    const box = new THREE.Box3().setFromObject(entry.root, true);
    if (box.isEmpty()) return null;

    this._labelWorld.set(
      (box.min.x + box.max.x) * 0.5,
      box.max.y,
      (box.min.z + box.max.z) * 0.5,
    );
    out.copy(this._labelWorld).project(this.camera);
    if (out.z > 1) return null;

    const rect = this.canvas.getBoundingClientRect();
    return {
      x: (out.x * 0.5 + 0.5) * rect.width,
      y: (-out.y * 0.5 + 0.5) * rect.height,
      rect,
    };
  }

  updateFloatingLabel(labelEl) {
    if (!labelEl) return;
    const name = this.hoveredName || this.selectedName;
    if (!name) {
      labelEl.hidden = true;
      return;
    }

    const projected = this.projectStructureToCanvas(name);
    if (!projected) {
      labelEl.hidden = true;
      return;
    }

    labelEl.hidden = false;
    labelEl.textContent = this.getLabelText(name);
    labelEl.style.transform = `translate(${projected.x}px, ${projected.y}px) translate(-50%, -130%)`;
  }

  setTheme(theme) {
    this.theme = theme;
    const colors = THEME_COLORS[theme] ?? THEME_COLORS.dark;
    this.scene.background = new THREE.Color(colors.scene);
    this.renderer.toneMapping = THREE.NoToneMapping;
    this.renderer.toneMappingExposure = 1;
    this.applyThemeColors();
    this.applySelectionVisuals();
  }

  applyThemeColors() {
    const isDay = this.theme === 'light';
    for (const [key, entry] of this.structures) {
      const isGhost = isGhostContextKey(key);
      const opacity = ghostOpacityForKey(key, this.theme);
      for (const mesh of entry.meshes) {
        forEachMaterial(mesh.material, (mat) => {
          if (mat.userData.usesAuthoredPaint) return;
          const baseColor = baseColorForStructure(key, this.theme);
          mat.color.copy(baseColor);
          mat.emissive
            .copy(baseColor)
            .multiplyScalar(isGhost ? 0.04 : isDay ? 0.35 : 0.08);
          mat.emissiveIntensity = isGhost ? 0.06 : isDay ? 0.48 : EMISSIVE_BASE;
          mat.opacity = opacity;
          mat.userData.baseColor = baseColor.clone();
          mat.userData.baseOpacity = opacity;
          mat.userData.baseEmissiveIntensity = mat.emissiveIntensity;
        });
      }
    }
  }

  loadAllModels() {
    this.onLoadProgress?.(0, MENINGES_GLB_FILES.length);

    for (const entry of MENINGES_GLB_FILES) {
      const { file, folder, key } = resolveMeningesAsset(entry);
      const url = modelUrl(file, folder);
      let settled = false;

      const finish = (success) => {
        if (settled || this.disposed) return;
        settled = true;
        window.clearTimeout(loadTimeout);
        this.onModelLoaded(success);
      };

      const loadTimeout = window.setTimeout(() => {
        this.failedLoads += 1;
        finish(false);
      }, 45000);

      this.loader.load(
        url,
        (gltf) => {
          const root = gltf.scene;
          root.name = key;
          const meshes = [];

          root.traverse((child) => {
            if (!child.isMesh) return;
            child.material = prepareMeshMaterial(child.material, key, this.theme);
            child.frustumCulled = false;
            // Let clicks pass through skull / brainstem to pathway structures.
            if (isNonInteractiveContextKey(key)) {
              child.raycast = () => {};
            }
            meshes.push(child);
          });

          this.structures.set(key, { root, meshes });
          this.meningesGroup.add(root);
          finish(true);
        },
        undefined,
        () => {
          this.failedLoads += 1;
          finish(false);
        },
      );
    }
  }

  onModelLoaded(success) {
    this.pendingLoads -= 1;
    if (success) this.loadedCount += 1;
    this.onLoadProgress?.(
      this.loadedCount,
      MENINGES_GLB_FILES.length,
      false,
      this.failedLoads,
    );

    if (this.pendingLoads > 0) return;

    centerSceneOnce(this.assemblyRoot, this.centerState);
    frameObject(this.camera, this.controls, this.assemblyRoot);
    resizeViewer(this.camera, this.renderer, this.canvas);
    frameObject(this.camera, this.controls, this.assemblyRoot);

    this.onLoadProgress?.(
      MENINGES_GLB_FILES.length,
      MENINGES_GLB_FILES.length,
      true,
      this.failedLoads,
    );
    this.onReady?.();
  }

  selectStructure(name, { frame = false, emit = false } = {}) {
    if (!this.structures.has(name) || isNonInteractiveContextKey(name)) return;

    this.selectedName = name;
    this.applySelectionVisuals();
    this.notifySelectionChange();

    if (frame) this.frameStructure(name);
    if (emit) {
      const data = meningesStructures[name];
      if (data) this.onSelect?.({ key: name, ...data });
    }
  }

  clearSelection() {
    this.selectedName = null;
    this.lastFrontName = null;
    this.clickDepth = 0;
    this.applySelectionVisuals();
    this.notifySelectionChange();
  }

  applySelectionVisuals() {
    const isDay = this.theme === 'light';
    for (const [key, { meshes }] of this.structures) {
      const isSelected = key === this.selectedName;
      const isHovered = key === this.hoveredName && !isSelected;
      const isFaded = this.selectedName != null && !isSelected;
      const isGhost = isGhostContextKey(key);
      const isMembrane = isMembraneKey(key);
      const isTranslucent = isGhost || isMembrane;
      const baseOpacity = ghostOpacityForKey(key, this.theme);

      for (const mesh of meshes) {
        forEachMaterial(mesh.material, (mat) => {
          const base = mat.userData.baseColor ?? mat.color;

          if (isSelected) {
            mat.transparent = isTranslucent;
            mat.opacity = isTranslucent ? Math.min(1, baseOpacity + 0.25) : 1;
            mat.depthWrite = !isTranslucent;
            mat.emissive.copy(base);
            mat.emissiveIntensity = EMISSIVE_SELECTED;
          } else if (isHovered) {
            mat.transparent = isTranslucent;
            mat.opacity = isTranslucent ? Math.min(1, baseOpacity + 0.12) : 1;
            mat.depthWrite = !isTranslucent;
            mat.emissive.copy(base);
            mat.emissiveIntensity = EMISSIVE_HOVER;
          } else if (isFaded) {
            mat.transparent = true;
            mat.opacity = isGhost
              ? Math.min(FADED_OPACITY, baseOpacity * 0.5)
              : FADED_OPACITY;
            mat.depthWrite = false;
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          } else {
            mat.transparent = isTranslucent;
            mat.opacity = baseOpacity;
            mat.depthWrite = !isTranslucent;
            mat.emissive
              .copy(base)
              .multiplyScalar(isGhost ? 0.04 : isDay ? 0.35 : 0.08);
            mat.emissiveIntensity =
              mat.userData.baseEmissiveIntensity ??
              (isDay ? 0.48 : EMISSIVE_BASE);
          }
        });
      }
    }
  }

  getHits(event) {
    const rect = this.canvas.getBoundingClientRect();
    this.pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.pointer, this.camera);

    const intersections = this.raycaster.intersectObject(this.meningesGroup, true);
    const hits = [];
    const seen = new Set();

    for (const hit of intersections) {
      const name = resolveStructureName(hit.object, this.meningesGroup);
      if (!name || seen.has(name) || isNonInteractiveContextKey(name)) continue;
      seen.add(name);
      hits.push({ name, distance: hit.distance, point: hit.point });
    }

    return hits;
  }

  handleClick(event) {
    const hits = this.getHits(event);
    if (!hits.length) {
      this.clearSelection();
      return;
    }

    const frontName = hits[0].name;
    let selected;

    if (frontName === this.lastFrontName) {
      this.clickDepth += 1;
      selected = hits[this.clickDepth % hits.length];
    } else {
      this.clickDepth = 0;
      this.lastFrontName = frontName;
      selected = hits[0];
    }

    const data = meningesStructures[selected.name];
    if (!data) return;

    this.selectStructure(selected.name);
    this.onSelect?.({ key: selected.name, ...data });
  }

  handleHover(event) {
    this.pendingHoverEvent = event;
    this.hoverDirty = true;
  }

  flushHover() {
    if (!this.hoverDirty || !this.pendingHoverEvent) return;
    this.hoverDirty = false;

    const hits = this.getHits(this.pendingHoverEvent);
    const next = hits[0]?.name ?? null;
    if (next === this.hoveredName) return;
    this.hoveredName = next;
    this.applySelectionVisuals();
  }

  bindInteraction() {
    this.canvas.addEventListener('pointerdown', (e) => {
      if (e.button !== 0) return;
      this._pointerDown = { x: e.clientX, y: e.clientY };
    });

    this.canvas.addEventListener('pointerup', (e) => {
      if (e.button !== 0 || !this._pointerDown) return;
      const dx = e.clientX - this._pointerDown.x;
      const dy = e.clientY - this._pointerDown.y;
      this._pointerDown = null;
      if (dx * dx + dy * dy > 36) return;
      this.handleClick(e);
    });

    this.canvas.addEventListener('pointermove', (e) => this.handleHover(e));
    this.canvas.addEventListener('pointerleave', () => {
      this.hoveredName = null;
      this.hoverDirty = false;
      this.applySelectionVisuals();
    });
  }

  onResize() {
    resizeViewer(this.camera, this.renderer, this.canvas);
  }

  animate() {
    if (this.disposed) return;
    requestAnimationFrame(() => this.animate());
    this.flushHover();
    this.controls.update();
    this.updateFloatingLabel(this.labelEl);
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    disposeScene(this.assemblyRoot);
    this.renderer.dispose();
  }
}
