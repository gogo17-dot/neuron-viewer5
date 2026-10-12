import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  EAR_PATHWAY_GLB_FILES,
  resolveEarAsset,
  earLayerIdForKey,
  earGroupForKey,
  isGhostContextKey,
  ghostOpacityForKey,
  isPassthroughContextKey,
} from './earPathwayManifest.js?v=44';
import earPathwayStructures from './earPathwayStructures.js';
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
  '01_Auricle_external_ear_R': { dark: 0xd4a88a, light: 0xFF7A00 },
  '17_External_acoustic_meatus_R_approx': { dark: 0xc9a888, light: 0xFF1A1A },
  '02_Tympanic_membrane': { dark: 0xe8c8a8, light: 0x0055FF },
  '03_Malleus': { dark: 0xe0d4b8, light: 0xFF8C00 },
  '04_Incus': { dark: 0xd8ccb0, light: 0x1A8CFF },
  '05_Stapes': { dark: 0xd0c4a8, light: 0xE02828 },
  '16_Temporal_bone_petrous_R': { dark: 0x9a9088, light: 0x7a7068 },
  '15_Bony_labyrinth_R': { dark: 0x9a9088, light: 0x7a7068 },
  '06_Vestibule_oval_window': { dark: 0xc9b896, light: 0xFF5A00 },
  '07_Cochlea': { dark: 0xc4a878, light: 0x0066CC },
  '18_Internal_acoustic_meatus_R_approx': { dark: 0xa89880, light: 0xFF7A00 },
  '08_Cochlear_nerve': { dark: 0xf0e6c8, light: 0xFF1A1A },
  '09_Vestibulocochlear_nerve_VIII': { dark: 0xe8dcc0, light: 0x0055FF },
  '10_Cochlear_nuclei_brainstem': { dark: 0x7a9ad0, light: 0xFF8C00 },
  '11_Superior_olivary_complex': { dark: 0x8f72b5, light: 0x1A8CFF },
  '12_Inferior_colliculus': { dark: 0xc49a5a, light: 0xE02828 },
  '13_Medial_geniculate_body': { dark: 0x5b8fd9, light: 0x00A86B },
  '14_Auditory_cortex_transverse_temporal_gyri': { dark: 0xe0a85a, light: 0x7A3CFF },
  // Match temporal bone — visual context only (not pickable)
  Brainstem: { dark: 0x9a9088, light: 0x7a7068 },
  'Temporal_lobe.r': { dark: 0x9a9088, light: 0x7a7068 },
};

function structureHue(key) {
  let hash = 0;
  for (let i = 0; i < key.length; i += 1) {
    hash = key.charCodeAt(i) + ((hash << 5) - hash);
  }
  return ((hash * 137.508) % 360) / 360;
}

function baseColorForStructure(key, theme) {
  if (SPECIAL_COLORS[key]) {
    return new THREE.Color(SPECIAL_COLORS[key][theme] ?? SPECIAL_COLORS[key].dark);
  }
  const hue = structureHue(key);
  if (theme === 'light') return new THREE.Color().setHSL(hue, 0.82, 0.5);
  return new THREE.Color().setHSL(hue, 0.7, 0.56);
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
  // Context shells use the temporal-bone teaching palette (not authored paints).
  if (
    structureKey === 'Brainstem' ||
    structureKey === 'Temporal_lobe.r' ||
    structureKey === '16_Temporal_bone_petrous_R' ||
    structureKey === '15_Bony_labyrinth_R'
  ) {
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
  const isDeep =
    /nuclei|olivary|colliculus|geniculate|cortex/i.test(structureKey);
  const isGhost = isGhostContextKey(structureKey);
  const ghostOpacity = ghostOpacityForKey(structureKey);

  const prepared = sources.map((source) => {
    const mat = source.clone();
    const baseColor = resolveStructurePaint(source, structureKey, theme);
    mat.side = THREE.DoubleSide;
    mat.color.copy(baseColor);
    mat.emissive = baseColor.clone().multiplyScalar(isGhost ? 0.04 : 0.1);
    mat.emissiveIntensity = isDeep ? 0.24 : isGhost ? 0.06 : EMISSIVE_BASE;
    mat.metalness = isGhost ? 0.05 : 0;
    mat.roughness = isGhost ? 0.9 : 0.78;
    mat.transparent = isGhost;
    mat.opacity = ghostOpacity;
    mat.depthWrite = !isGhost;
    mat.userData.baseColor = baseColor.clone();
    mat.userData.structureKey = structureKey;
    mat.userData.isDeepNucleus = isDeep;
    mat.userData.isGhostContext = isGhost;
    mat.userData.baseOpacity = ghostOpacity;
    mat.userData.baseEmissiveIntensity = mat.emissiveIntensity;
    mat.userData.usesAuthoredPaint =
      Boolean(source?.map) || isAuthoredPaintColor(source?.color);
    return mat;
  });

  return Array.isArray(material) ? prepared : prepared[0];
}

function resolveStructureName(object, pathwayGroup) {
  let node = object;
  while (node && node !== pathwayGroup) {
    if (node.name && earPathwayStructures[node.name]) return node.name;
    node = node.parent;
  }
  return null;
}

function displayTitleForKey(key, rawTitle) {
  const source = rawTitle || key.replace(/^\d+_/, '').replace(/_/g, ' ');
  return source
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .replace(/\bViii\b/g, 'VIII')
    .replace(/\bHeschl'S\b/g, "Heschl's");
}

export class EarPathwayScene {
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
    this.pathwayGroup = new THREE.Group();
    this.pathwayGroup.name = 'earPathwayGroup';
    this.assemblyRoot.add(this.pathwayGroup);

    this.structures = new Map();
    this.centerState = { centered: false };
    this.explodeAmount = 0;
    this.explodeReady = false;
    this.labelEl = null;
    this._labelWorld = new THREE.Vector3();
    this._labelNdc = new THREE.Vector3();
    this.homeView = null;
    this.layerVisibility = {
      bone: true,
      outer_middle: true,
      inner: true,
      nerves: true,
      central: true,
      context: true,
    };

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lastFrontName = null;
    this.clickDepth = 0;
    this.selectedName = null;
    this.hoveredName = null;
    this.pendingHoverEvent = null;
    this.hoverDirty = false;
    this.pendingLoads = EAR_PATHWAY_GLB_FILES.length;
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

  getStructureCatalog() {
    const items = [];
    for (const key of this.structures.keys()) {
      const data = earPathwayStructures[key];
      if (!data) continue;
      const group = earGroupForKey(key);
      items.push({
        key,
        title: displayTitleForKey(key, data.title),
        groupId: group.groupId,
        groupLabel: group.groupLabel,
      });
    }

    const order = ['bone', 'outer_middle', 'inner', 'nerves', 'central', 'context'];
    items.sort((a, b) => {
      const g = order.indexOf(a.groupId) - order.indexOf(b.groupId);
      if (g !== 0) return g;
      return a.key.localeCompare(b.key);
    });
    return items;
  }

  getLabelText(name) {
    if (!name) return '';
    const data = earPathwayStructures[name];
    return displayTitleForKey(name, data?.title);
  }

  captureExplodeBases() {
    this.assemblyRoot.updateMatrixWorld(true);
    const assemblyBox = new THREE.Box3().setFromObject(this.assemblyRoot, false);
    if (assemblyBox.isEmpty()) {
      this.explodeReady = false;
      return;
    }

    const assemblyCenter = assemblyBox.getCenter(new THREE.Vector3());
    const span = assemblyBox.getSize(new THREE.Vector3()).length();
    const maxDist = Math.max(span * 0.35, 0.02);
    const parentInv = new THREE.Matrix4();
    const worldDir = new THREE.Vector3();
    const localDir = new THREE.Vector3();
    const center = new THREE.Vector3();

    for (const [, entry] of this.structures) {
      const root = entry.root;
      const parent = root.parent;
      if (!parent) continue;
      parent.updateMatrixWorld(true);
      parentInv.copy(parent.matrixWorld).invert();

      const box = new THREE.Box3().setFromObject(root, false);
      if (box.isEmpty()) continue;
      box.getCenter(center);

      worldDir.copy(center).sub(assemblyCenter);
      if (worldDir.lengthSq() < 1e-10) worldDir.set(0, 1, 0);
      else worldDir.normalize();

      localDir.copy(worldDir).transformDirection(parentInv).normalize();
      root.userData.restPosition = root.position.clone();
      root.userData.explodeDirLocal = localDir.clone();
      root.userData.explodeDistance = maxDist;
    }

    this.explodeReady = true;
    this.setExplodeAmount(this.explodeAmount);
  }

  setExplodeAmount(amount) {
    this.explodeAmount = Math.max(0, Math.min(1, Number(amount) || 0));
    if (!this.explodeReady) return;

    for (const [, entry] of this.structures) {
      const root = entry.root;
      const rest = root.userData.restPosition;
      const dir = root.userData.explodeDirLocal;
      const dist = root.userData.explodeDistance ?? 0;
      if (!rest || !dir) continue;
      root.position.copy(rest).addScaledVector(dir, dist * this.explodeAmount);
    }
  }

  setLayerVisible(layerId, visible) {
    if (!(layerId in this.layerVisibility)) return;
    this.layerVisibility[layerId] = Boolean(visible);
    this.applyLayerVisibility();

    if (
      this.selectedName &&
      earLayerIdForKey(this.selectedName) === layerId &&
      !visible
    ) {
      this.clearSelection();
    }
  }

  applyLayerVisibility() {
    for (const [key, entry] of this.structures) {
      entry.root.visible = this.layerVisibility[earLayerIdForKey(key)] !== false;
    }
  }

  saveHomeView() {
    this.homeView = {
      position: this.camera.position.clone(),
      target: this.controls.target.clone(),
      minDistance: this.controls.minDistance,
      maxDistance: this.controls.maxDistance,
      near: this.camera.near,
      far: this.camera.far,
    };
  }

  resetView() {
    this.selectedName = null;
    this.hoveredName = null;
    this.lastFrontName = null;
    this.clickDepth = 0;

    for (const id of Object.keys(this.layerVisibility)) {
      this.layerVisibility[id] = true;
    }
    this.applyLayerVisibility();
    this.setExplodeAmount(0);

    if (this.homeView) {
      this.camera.position.copy(this.homeView.position);
      this.controls.target.copy(this.homeView.target);
      this.controls.minDistance = this.homeView.minDistance;
      this.controls.maxDistance = this.homeView.maxDistance;
      this.camera.near = this.homeView.near;
      this.camera.far = this.homeView.far;
      this.camera.updateProjectionMatrix();
      this.controls.update();
    } else {
      frameObject(this.camera, this.controls, this.assemblyRoot);
    }

    this.applySelectionVisuals();
    this.notifySelectionChange();
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
      const forceTeaching =
        key === 'Brainstem' ||
        key === 'Temporal_lobe.r' ||
        key === '16_Temporal_bone_petrous_R' ||
        key === '15_Bony_labyrinth_R';
      for (const mesh of entry.meshes) {
        forEachMaterial(mesh.material, (mat) => {
          if (mat.userData.usesAuthoredPaint && !forceTeaching) return;
          const baseColor = baseColorForStructure(key, this.theme);
          mat.color.copy(baseColor);
          mat.emissive.copy(baseColor).multiplyScalar(isGhostContextKey(key) ? 0.04 : 0.1);
          mat.userData.baseColor = baseColor.clone();
        });
      }
    }
  }

  loadAllModels() {
    this.onLoadProgress?.(0, EAR_PATHWAY_GLB_FILES.length);

    for (const entry of EAR_PATHWAY_GLB_FILES) {
      const { file, folder, key } = resolveEarAsset(entry);
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
            if (isPassthroughContextKey(key)) {
              // Keep visible for context; never intercept picks.
              child.raycast = () => {};
            }
            meshes.push(child);
          });

          this.structures.set(key, { root, meshes });
          this.pathwayGroup.add(root);
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
      EAR_PATHWAY_GLB_FILES.length,
      false,
      this.failedLoads,
    );

    if (this.pendingLoads > 0) return;

    this.centerAssembly();
    frameObject(this.camera, this.controls, this.assemblyRoot);
    resizeViewer(this.camera, this.renderer, this.canvas);
    frameObject(this.camera, this.controls, this.assemblyRoot);
    this.captureExplodeBases();
    this.saveHomeView();
    this.applyLayerVisibility();

    this.onLoadProgress?.(
      EAR_PATHWAY_GLB_FILES.length,
      EAR_PATHWAY_GLB_FILES.length,
      true,
      this.failedLoads,
    );
    this.onReady?.(this.getStructureCatalog());
  }

  centerAssembly() {
    centerSceneOnce(this.assemblyRoot, this.centerState);
  }

  selectStructure(name, { frame = false, emit = false } = {}) {
    if (!this.structures.has(name) || isPassthroughContextKey(name)) return;
    const layer = earLayerIdForKey(name);
    if (this.layerVisibility[layer] === false) {
      this.setLayerVisible(layer, true);
    }

    this.selectedName = name;
    this.applySelectionVisuals();
    this.notifySelectionChange();

    if (frame) this.frameStructure(name);
    if (emit) {
      const data = earPathwayStructures[name];
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
      const baseOpacity = ghostOpacityForKey(key);

      for (const mesh of meshes) {
        forEachMaterial(mesh.material, (mat) => {
          const base = mat.userData.baseColor ?? mat.color;

          if (isSelected) {
            mat.transparent = isGhost;
            mat.opacity = isGhost ? Math.min(1, baseOpacity + 0.45) : 1;
            mat.depthWrite = !isGhost;
            mat.emissive.copy(base);
            mat.emissiveIntensity = EMISSIVE_SELECTED;
          } else if (isHovered) {
            mat.transparent = isGhost;
            mat.opacity = isGhost ? Math.min(1, baseOpacity + 0.25) : 1;
            mat.depthWrite = !isGhost;
            mat.emissive.copy(base);
            mat.emissiveIntensity = EMISSIVE_HOVER;
          } else if (isFaded) {
            mat.transparent = true;
            mat.opacity = isGhost ? Math.min(FADED_OPACITY, baseOpacity * 0.5) : FADED_OPACITY;
            mat.depthWrite = false;
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          } else {
            mat.transparent = isGhost;
            mat.opacity = baseOpacity;
            mat.depthWrite = !isGhost;
            mat.emissive.copy(base).multiplyScalar(isGhost ? 0.04 : 0.1);
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

    const intersections = this.raycaster.intersectObject(this.pathwayGroup, true);
    const hits = [];
    const seen = new Set();

    for (const hit of intersections) {
      const name = resolveStructureName(hit.object, this.pathwayGroup);
      if (!name || seen.has(name)) continue;
      if (isPassthroughContextKey(name)) continue;
      const entry = this.structures.get(name);
      if (!entry?.root?.visible) continue;
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

    const data = earPathwayStructures[selected.name];
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

