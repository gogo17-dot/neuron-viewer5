import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createViewer(canvas, sceneBackground) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(sceneBackground);

  const camera = new THREE.PerspectiveCamera(
    42,
    window.innerWidth / window.innerHeight,
    0.001,
    100,
  );

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.06;
  controls.minDistance = 0.5;
  controls.maxDistance = 8;

  scene.add(new THREE.AmbientLight(0xb8c8e0, 0.65));
  scene.add(new THREE.HemisphereLight(0xd8e8ff, 0x2a1820, 0.85));
  const key = new THREE.DirectionalLight(0xfff8f0, 1.3);
  key.position.set(0.05, 0.1, 0.08);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x88aacc, 0.55);
  fill.position.set(-0.08, 0.04, -0.06);
  scene.add(fill);

  return { scene, camera, renderer, controls };
}

export function frameObject(camera, controls, object) {
  const box = new THREE.Box3().setFromObject(object);
  if (box.isEmpty()) return;

  const center = box.getCenter(new THREE.Vector3());
  const size = box.getSize(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);

  const fovRad = (camera.fov * Math.PI) / 180;
  const fitDistance = maxDim / (2 * Math.tan(fovRad / 2));
  const distance = fitDistance * 1.85;

  controls.target.copy(center);
  camera.position.set(
    center.x + distance * 0.18,
    center.y + distance * 0.12,
    center.z + distance,
  );

  controls.minDistance = distance * 0.25;
  controls.maxDistance = distance * 4;
  camera.near = Math.max(distance / 1000, 0.001);
  camera.far = distance * 20;
  camera.updateProjectionMatrix();
  controls.update();
}

export function disposeScene(root) {
  root.traverse((child) => {
    if (!child.isMesh) return;
    child.geometry?.dispose();
    const mats = Array.isArray(child.material) ? child.material : [child.material];
    mats.forEach((mat) => mat?.dispose());
  });
}
