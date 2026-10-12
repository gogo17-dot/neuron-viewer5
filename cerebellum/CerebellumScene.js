import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  CEREBELLUM_GLB_FILES,
  resolveCerebellumAsset,
  isGhostContextKey,
  isNonInteractiveContextKey,
  ghostOpacityForKey,
} from './cerebellumManifest.js';
import cerebellumStructures from './cerebellumStructures.js';
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

const SPECIAL_COLORS = {
  Culmen: { dark: 0xc9a06a, light: 0xff7a00 },
  Wing_of_central_lobule: { dark: 0xb88848, light: 0xff1a1a },
  Anterior_quadrangular_lobule: { dark: 0xd4a574, light: 0x0055ff },
  Declive: { dark: 0xc4785a, light: 0xff8c00 },
  Posterior_quadrangular_lobule: { dark: 0x6aa8e0, light: 0x1a8cff },
  Folium_of_vermis: { dark: 0x7a9ad0, light: 0xe02828 },
  Superior_semilunar_lobule: { dark: 0x5b8fd9, light: 0x00a86b },
  Tuber_of_vermis: { dark: 0x9a7aaa, light: 0x7a3cff },
  Inferior_semilunar_lobule: { dark: 0x4a88c8, light: 0xff5a00 },
  Gracile_lobule: { dark: 0x6a9e8a, light: 0x0066cc },
  Pyramis_of_vermis: { dark: 0xa67c52, light: 0xff7a00 },
  Biventral_lobule: { dark: 0xb8956a, light: 0xff1a1a },
  Uvula_of_vermis: { dark: 0xc9a0a8, light: 0x0055ff },
  Tonsil_of_cerebellum: { dark: 0xc4785a, light: 0xe07040 },
  Nodule_of_vermis: { dark: 0x5a8f7a, light: 0x1b7a5a },
  Flocculus: { dark: 0x6a9e8a, light: 0x2e7d62 },
  Superior_cerebellar_peduncle: { dark: 0xc9a86c, light: 0xd4a017 },
  Middle_cerebellar_peduncle: { dark: 0xb8956a, light: 0xc9892e },
  Inferior_cerebellar_peduncle: { dark: 0xa67c52, light: 0xb87a2e },
  Dentate_nucleus: { dark: 0xd4a84a, light: 0xf0b429 },
  Interposed_nucleus: { dark: 0xc9923a, light: 0xe09830 },
  Fastigial_nucleus: { dark: 0xb87a2e, light: 0xd08028 },
  Brainstem: { dark: 0x9a9088, light: 0x7a7068 },
};

function baseColorForStructure(key, theme) {
  if (SPECIAL_COLORS[key]) {
    return new THREE.Color(SPECIAL_COLORS[key][theme] ?? SPECIAL_COLORS[key].dark);
  }
  return new THREE.Color(theme === 'light' ? 0xc8bca0 : 0xe0d4bc);
}

function forEachMaterial(material, fn) {
  if (Array.isArray(material)) material.forEach(fn);
  else fn(material);
}

function prepareMeshMaterial(material, structureKey, theme) {
  const sources = Array.isArray(material) ? material : [material];
  const baseColor = baseColorForStructure(structureKey, theme);
  const isGhost = isGhostContextKey(structureKey);
  const isDeepNucleus =
    structureKey.endsWith('_nucleus') || structureKey === 'Substantia_nigra';
  const ghostOpacity = ghostOpacityForKey(structureKey, theme);

  const prepared = sources.map((source) => {
    const mat = source.clone();
    mat.side = THREE.DoubleSide;
    mat.color.copy(baseColor);
    mat.emissive = new THREE.Color(isGhost ? 0x000000 : isDeepNucleus ? baseColor : 0x000000);
    mat.emissiveIntensity = isGhost ? 0.06 : isDeepNucleus ? 0.22 : 0;
    mat.metalness = isGhost ? 0.05 : isDeepNucleus ? 0.1 : 0.04;
    mat.roughness = isGhost ? 0.9 : isDeepNucleus ? 0.45 : 0.62;
    mat.transparent = isGhost;
    mat.opacity = ghostOpacity;
    mat.depthWrite = !isGhost;
    mat.userData.baseColor = baseColor.clone();
    mat.userData.structureKey = structureKey;
    mat.userData.isDeepNucleus = isDeepNucleus;
    mat.userData.isGhostContext = isGhost;
    mat.userData.baseOpacity = ghostOpacity;
    return mat;
  });

  return Array.isArray(material) ? prepared : prepared[0];
}

function resolveStructureName(object, group) {
  let node = object;
  while (node && node !== group) {
    if (node.name && cerebellumStructures[node.name]) return node.name;
    node = node.parent;
  }
  return null;
}

export class CerebellumScene {
  constructor(canvas, { onSelect, onLoadProgress, theme = 'dark', interactive = true } = {}) {
    this.canvas = canvas;
    this.onSelect = onSelect;
    this.onLoadProgress = onLoadProgress;
    this.theme = theme;
    this.interactive = interactive;

    this.assemblyRoot = new THREE.Group();
    this.assemblyRoot.name = 'assemblyRoot';
    this.cerebellumGroup = new THREE.Group();
    this.cerebellumGroup.name = 'cerebellumGroup';
    this.assemblyRoot.add(this.cerebellumGroup);
    this.structures = new Map();
    this.centerState = { centered: false };

    this.raycaster = new THREE.Raycaster();
    this.pointer = new THREE.Vector2();
    this.lastFrontName = null;
    this.clickDepth = 0;
    this.selectedName = null;
    this.pendingLoads = CEREBELLUM_GLB_FILES.length;
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
      const baseColor = baseColorForStructure(key, this.theme);
      const ghostOpacity = ghostOpacityForKey(key, this.theme);
      for (const mesh of entry.meshes) {
        forEachMaterial(mesh.material, (mat) => {
          mat.color.copy(baseColor);
          mat.userData.baseColor = baseColor.clone();
          mat.userData.baseOpacity = ghostOpacity;
        });
      }
    }
  }

  loadAllModels() {
    this.onLoadProgress?.(0, CEREBELLUM_GLB_FILES.length);

    for (const entry of CEREBELLUM_GLB_FILES) {
      const { file, key } = resolveCerebellumAsset(entry);
      const url = modelUrl(file);
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
            if (isNonInteractiveContextKey(key)) {
              child.raycast = () => {};
            }
            meshes.push(child);
          });

          this.structures.set(key, { root, meshes });
          this.cerebellumGroup.add(root);
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
      CEREBELLUM_GLB_FILES.length,
      false,
      this.failedLoads,
    );

    if (this.pendingLoads > 0) return;

    centerSceneOnce(this.assemblyRoot, this.centerState);
    frameObject(this.camera, this.controls, this.assemblyRoot);
    resizeViewer(this.camera, this.renderer, this.canvas);
    frameObject(this.camera, this.controls, this.assemblyRoot);

    this.onLoadProgress?.(
      CEREBELLUM_GLB_FILES.length,
      CEREBELLUM_GLB_FILES.length,
      true,
      this.failedLoads,
    );
  }

  selectStructure(name) {
    if (!this.structures.has(name) || isNonInteractiveContextKey(name)) return;
    this.selectedName = name;
    this.applySelectionVisuals();
  }

  clearSelection() {
    this.selectedName = null;
    this.lastFrontName = null;
    this.clickDepth = 0;
    this.applySelectionVisuals();
  }

  applySelectionVisuals() {
    for (const [key, { meshes }] of this.structures) {
      const isSelected = key === this.selectedName;
      const isFaded = this.selectedName != null && !isSelected;
      const isGhost = isGhostContextKey(key);
      const baseOpacity = ghostOpacityForKey(key, this.theme);

      for (const mesh of meshes) {
        forEachMaterial(mesh.material, (mat) => {
          const base = mat.userData.baseColor ?? mat.color;

          if (isSelected) {
            mat.transparent = false;
            mat.opacity = 1;
            mat.depthWrite = true;
            mat.emissive.copy(base);
            mat.emissiveIntensity = mat.userData.isDeepNucleus ? 0.75 : 0.55;
          } else if (isFaded) {
            mat.transparent = true;
            mat.opacity = isGhost
              ? Math.min(FADED_OPACITY, baseOpacity * 0.5)
              : FADED_OPACITY;
            mat.depthWrite = false;
            mat.emissive.setHex(0x000000);
            mat.emissiveIntensity = 0;
          } else {
            mat.transparent = isGhost;
            mat.opacity = baseOpacity;
            mat.depthWrite = !isGhost;
            if (mat.userData.isDeepNucleus && !isGhost) {
              mat.emissive.copy(base);
              mat.emissiveIntensity = 0.22;
            } else {
              mat.emissive.setHex(0x000000);
              mat.emissiveIntensity = isGhost ? 0.06 : 0;
            }
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

    const intersections = this.raycaster.intersectObject(this.cerebellumGroup, true);
    const hits = [];
    const seen = new Set();

    for (const hit of intersections) {
      const name = resolveStructureName(hit.object, this.cerebellumGroup);
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

    const data = cerebellumStructures[selected.name];
    if (!data) return;

    this.selectStructure(selected.name);
    this.onSelect?.(data);
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
  }

  onResize() {
    resizeViewer(this.camera, this.renderer, this.canvas);
  }

  animate() {
    if (this.disposed) return;
    requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    if (this.disposed) return;
    this.disposed = true;
    disposeScene(this.assemblyRoot);
    this.renderer.dispose();
  }
}
