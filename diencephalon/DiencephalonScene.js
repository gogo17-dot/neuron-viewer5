import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  DIENCEPHALON_GLB_FILES,
  resolveDiencephalonAsset,
  isGhostContextKey,
  isNonInteractiveContextKey,
  isCsfKey,
  ghostOpacityForKey,
} from './diencephalonManifest.js';
import diencephalonStructures from './diencephalonStructures.js';
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
  '01_Thalamus_L': { dark: 0x7a9ad0, light: 0xFF7A00 },
  '01_Thalamus_R': { dark: 0x7a9ad0, light: 0xFF1A1A },
  '02_Hypothalamus': { dark: 0xd4789a, light: 0x0055FF },
  '03_Mammillary_body_L': { dark: 0xd4a060, light: 0xFF8C00 },
  '03_Mammillary_body_R': { dark: 0xd4a060, light: 0x1A8CFF },
  '04_Habenula': { dark: 0x9a7aaa, light: 0xE02828 },
  '05_Lateral_geniculate_body_L': { dark: 0x5b8fd9, light: 0x00A86B },
  '05_Lateral_geniculate_body_R': { dark: 0x5b8fd9, light: 0x7A3CFF },
  '06_Medial_geniculate_body_L': { dark: 0x5b8fd9, light: 0xFF5A00 },
  '06_Medial_geniculate_body_R': { dark: 0x5b8fd9, light: 0x0066CC },
  '07_Optic_chiasm_L': { dark: 0xe8dcc0, light: 0xFF7A00 },
  '07_Optic_chiasm_R': { dark: 0xe8dcc0, light: 0xFF1A1A },
  '08_Optic_tract_L': { dark: 0xf0e6c8, light: 0x0055FF },
  '08_Optic_tract_R': { dark: 0xf0e6c8, light: 0xFF8C00 },
  '09_Stria_medullaris_L': { dark: 0xd8c8b0, light: 0x1A8CFF },
  '09_Stria_medullaris_R': { dark: 0xd8c8b0, light: 0xE02828 },
  '10_Posterior_commissure': { dark: 0xe0d4bc, light: 0x00A86B },
  '11_Third_ventricle': { dark: 0x6bb8e0, light: 0x7A3CFF },
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
  const isCsf = isCsfKey(structureKey);
  const ghostOpacity = ghostOpacityForKey(structureKey);
  const isTranslucent = isGhost || isCsf;

  const prepared = sources.map((source) => {
    const mat = source.clone();
    const baseColor = resolveStructurePaint(source, structureKey, theme);
    mat.side = THREE.DoubleSide;
    mat.color.copy(baseColor);
    mat.emissive = baseColor.clone().multiplyScalar(isGhost ? 0.04 : 0.08);
    mat.emissiveIntensity = isGhost ? 0.06 : EMISSIVE_BASE;
    mat.metalness = isGhost ? 0.05 : 0;
    mat.roughness = isCsf ? 0.35 : isGhost ? 0.9 : 0.72;
    mat.transparent = isTranslucent;
    mat.opacity = ghostOpacity;
    mat.depthWrite = !isTranslucent;
    mat.userData.baseColor = baseColor.clone();
    mat.userData.structureKey = structureKey;
    mat.userData.isGhostContext = isGhost;
    mat.userData.isCsf = isCsf;
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
    if (node.name && diencephalonStructures[node.name]) return node.name;
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

export class DiencephalonScene {
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
    this.diencephalonGroup = new THREE.Group();
    this.diencephalonGroup.name = 'diencephalonGroup';
    this.assemblyRoot.add(this.diencephalonGroup);

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
    this.pendingLoads = DIENCEPHALON_GLB_FILES.length;
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
    const data = diencephalonStructures[name];
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
    for (const [key, entry] of this.structures) {
      for (const mesh of entry.meshes) {
        forEachMaterial(mesh.material, (mat) => {
          if (mat.userData.usesAuthoredPaint) return;
          const baseColor = baseColorForStructure(key, this.theme);
          mat.color.copy(baseColor);
          mat.emissive.copy(baseColor).multiplyScalar(0.08);
          mat.userData.baseColor = baseColor.clone();
        });
      }
    }
  }

  loadAllModels() {
    this.onLoadProgress?.(0, DIENCEPHALON_GLB_FILES.length);

    for (const entry of DIENCEPHALON_GLB_FILES) {
      const { file, folder, key } = resolveDiencephalonAsset(entry);
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
          this.diencephalonGroup.add(root);
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
      DIENCEPHALON_GLB_FILES.length,
      false,
      this.failedLoads,
    );

    if (this.pendingLoads > 0) return;

    centerSceneOnce(this.assemblyRoot, this.centerState);
    frameObject(this.camera, this.controls, this.assemblyRoot);
    resizeViewer(this.camera, this.renderer, this.canvas);
    frameObject(this.camera, this.controls, this.assemblyRoot);

    this.onLoadProgress?.(
      DIENCEPHALON_GLB_FILES.length,
      DIENCEPHALON_GLB_FILES.length,
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
      const data = diencephalonStructures[name];
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
    for (const [key, { meshes }] of this.structures) {
      const isSelected = key === this.selectedName;
      const isHovered = key === this.hoveredName && !isSelected;
      const isFaded = this.selectedName != null && !isSelected;
      const isGhost = isGhostContextKey(key);
      const isCsf = isCsfKey(key);
      const isTranslucent = isGhost || isCsf;
      const baseOpacity = ghostOpacityForKey(key);

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
            mat.emissive.copy(base).multiplyScalar(isGhost ? 0.04 : 0.08);
            mat.emissiveIntensity =
              mat.userData.baseEmissiveIntensity ?? EMISSIVE_BASE;
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

    const intersections = this.raycaster.intersectObject(this.diencephalonGroup, true);
    const hits = [];
    const seen = new Set();

    for (const hit of intersections) {
      const name = resolveStructureName(hit.object, this.diencephalonGroup);
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

    const data = diencephalonStructures[selected.name];
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
