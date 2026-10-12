import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PART_DESCRIPTIONS, PART_DESCRIPTIONS_AZ } from "./partDescriptions.js";

const panel = document.getElementById("info-panel");
const panelName = document.getElementById("panel-name");
const panelOverview = document.getElementById("panel-overview");
const panelDetail = document.getElementById("panel-detail");
const panelDetailWrap = document.getElementById("panel-detail-wrap");
const panelMore = document.getElementById("panel-more");
const closeBtn = document.getElementById("panel-close");

/** Part key for the open info panel — keeps hover tooltip text in sync when picking through (double-click). */
let panelOpenPickLabel = null;
let panelDetailExpanded = false;

const PANEL_UI = {
  en: { clinicalDetail: "Clinical detail", showLess: "Show less" },
  az: { clinicalDetail: "Klinik təfərrüat", showLess: "Daha az göstər" },
};

function splitClinicalText(description = "") {
  const parts = String(description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return {
    overview: parts[0] || "",
    detail: parts.slice(1).join("\n\n"),
  };
}

function fillNeuronPanel(data) {
  if (!data || !panelName || !panelOverview) return;
  const { overview, detail } = splitClinicalText(data.desc || "");
  panelName.textContent = data.name;
  panelOverview.textContent = overview || data.desc || "";
  if (panelDetail) panelDetail.textContent = detail;
  panelDetailExpanded = false;
  if (panelDetailWrap) panelDetailWrap.hidden = true;
  if (panelMore) {
    const hasDetail = Boolean(detail);
    panelMore.hidden = !hasDetail;
    panelMore.textContent = PANEL_UI[currentLang]?.clinicalDetail || "Clinical detail";
    panelMore.setAttribute("aria-expanded", "false");
  }
  panel.style.right = "max(12px, env(safe-area-inset-right, 0px))";
  panel.classList.add("is-open");
}

if (closeBtn && panel) {
  closeBtn.addEventListener("click", () => {
    panel.style.right = "-320px";
    panel.classList.remove("is-open");
    panelOpenPickLabel = null;
    panelDetailExpanded = false;
  });
}

if (panelMore) {
  panelMore.addEventListener("click", () => {
    panelDetailExpanded = !panelDetailExpanded;
    if (panelDetailWrap) panelDetailWrap.hidden = !panelDetailExpanded;
    const ui = PANEL_UI[currentLang] || PANEL_UI.en;
    panelMore.textContent = panelDetailExpanded ? ui.showLess : ui.clinicalDetail;
    panelMore.setAttribute("aria-expanded", panelDetailExpanded ? "true" : "false");
  });
}

let currentLang = "en";

/** Panel + tooltips only; nav EN/AZ and <html lang> come from `site-shell.js`. */
function neuronSetLang(lang) {
  currentLang = lang;

  const descriptions = lang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
  /** Prefer the mesh key from the last click (incl. double-click depth) so title + body stay aligned. */
  if (panelOpenPickLabel && panelName && panelOverview) {
    const data = descriptions[panelOpenPickLabel];
    if (data) fillNeuronPanel(data);
  } else {
    const currentName = panelName ? panelName.textContent : "";
    if (currentName && panelName && panelOverview) {
      for (const key in PART_DESCRIPTIONS) {
        if (
          PART_DESCRIPTIONS[key].name === currentName ||
          PART_DESCRIPTIONS_AZ[key]?.name === currentName
        ) {
          const data = descriptions[key];
          if (data) fillNeuronPanel(data);
          break;
        }
      }
    }
  }
  if (panelOpenPickLabel) {
    const tip = document.querySelector(".structure-label");
    if (tip) {
      tip.textContent = tooltipNames[lang][panelOpenPickLabel] || panelOpenPickLabel;
    }
  }
}

window.__neyronAfterSetLang = function (lang) {
  neuronSetLang(lang);
};

function clientToNdc(clientX, clientY, canvasEl, target) {
  const r = canvasEl.getBoundingClientRect();
  const w = Math.max(1, r.width);
  const h = Math.max(1, r.height);
  target.x = ((clientX - r.left) / w) * 2 - 1;
  target.y = -((clientY - r.top) / h) * 2 + 1;
}

const tooltipNames = {
  en: {
    Soma: "Soma",
    Nucleus: "Nucleus",
    Dendrites: "Dendrites",
    "Dendritic Spine": "Dendritic Spine",
    "Axon Hillock": "Axon Hillock",
    Axon: "Axon",
    "Myelin Sheath": "Myelin Sheath",
    "Node of Ranvier": "Node of Ranvier",
    "Axon Terminal": "Axon Terminal",
    "Synaptic Bouton": "Synaptic Bouton",
    Mitochondria: "Mitochondria",
    "Nissl Body": "Nissl Body",
    "Schwann Cell": "Schwann Cell",
  },
  az: {
    Soma: "Soma",
    Nucleus: "Nüvə",
    Dendrites: "Dendritlər",
    "Dendritic Spine": "Dendritik Tikan",
    "Axon Hillock": "Akson Təpəciyi",
    Axon: "Akson",
    "Myelin Sheath": "Mielin Qılafı",
    "Node of Ranvier": "Ranvye Düyünü",
    "Axon Terminal": "Akson Terminası",
    "Synaptic Bouton": "Sinaptik Düymə",
    Mitochondria: "Mitoxondriya",
    "Nissl Body": "Nissl Cisimciyi",
    "Schwann Cell": "Şvan Hüceyrəsi",
  },
};

/** Matches NEYRON opening hero neuron (day). */
const NEYRON_DAY_PHYS = {
  color: 0xc93840,
  emissive: 0x501820,
  emissiveIntensity: 0.26,
  roughness: 0.34,
  metalness: 0.52,
  clearcoat: 0.16,
  clearcoatRoughness: 0.42,
};

const nightMaterialSnapshots = new WeakMap();

function snapshotMaterialState(m) {
  if (m.isMeshPhysicalMaterial) {
    return {
      t: "physical",
      color: m.color.getHex(),
      emissive: m.emissive.getHex(),
      emissiveIntensity: m.emissiveIntensity,
      roughness: m.roughness,
      metalness: m.metalness,
      clearcoat: m.clearcoat,
      clearcoatRoughness: m.clearcoatRoughness,
      sheen: m.sheen,
      sheenColor: m.sheenColor.getHex(),
      sheenRoughness: m.sheenRoughness,
      transparent: m.transparent,
      opacity: m.opacity,
      transmission: m.transmission,
      ior: m.ior,
      thickness: m.thickness,
      depthWrite: m.depthWrite,
      side: m.side,
    };
  }
  if (m.isMeshBasicMaterial) {
    return { t: "basic", color: m.color.getHex(), opacity: m.opacity, transparent: m.transparent };
  }
  return null;
}

function restoreMaterialState(m, snap) {
  if (!snap) return;
  if (snap.t === "physical" && m.isMeshPhysicalMaterial) {
    m.color.setHex(snap.color);
    m.emissive.setHex(snap.emissive);
    m.emissiveIntensity = snap.emissiveIntensity;
    m.roughness = snap.roughness;
    m.metalness = snap.metalness;
    m.clearcoat = snap.clearcoat;
    m.clearcoatRoughness = snap.clearcoatRoughness;
    if (snap.sheen !== undefined) {
      m.sheen = snap.sheen;
      m.sheenColor.setHex(snap.sheenColor);
      m.sheenRoughness = snap.sheenRoughness;
    }
    m.transparent = snap.transparent;
    m.opacity = snap.opacity;
    m.transmission = snap.transmission;
    m.ior = snap.ior;
    m.thickness = snap.thickness;
    m.depthWrite = snap.depthWrite;
    m.side = snap.side;
  } else if (snap.t === "basic" && m.isMeshBasicMaterial) {
    m.color.setHex(snap.color);
    m.opacity = snap.opacity;
    m.transparent = snap.transparent;
  }
}

function applyDayPhysicalHeroLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(NEYRON_DAY_PHYS.color);
  m.emissive.setHex(NEYRON_DAY_PHYS.emissive);
  m.emissiveIntensity = NEYRON_DAY_PHYS.emissiveIntensity;
  m.roughness = NEYRON_DAY_PHYS.roughness;
  m.metalness = NEYRON_DAY_PHYS.metalness;
  m.clearcoat = NEYRON_DAY_PHYS.clearcoat;
  m.clearcoatRoughness = NEYRON_DAY_PHYS.clearcoatRoughness;
  m.transmission = 0;
  if (m.opacity < 0.98) {
    m.transparent = true;
    m.opacity = 0.28;
    m.depthWrite = false;
  } else {
    m.opacity = 1;
    m.transparent = false;
    m.depthWrite = true;
  }
}

/** NEYRON day accent — dendrites & spines (matches hero orange tone). */
const NEYRON_DAY_DENDRITE = {
  color: 0xe05a10,
  emissive: 0x502208,
  emissiveIntensity: 0.34,
  roughness: 0.34,
  metalness: 0.48,
  clearcoat: 0.18,
  clearcoatRoughness: 0.4,
};

function applyDayDendriteSpineLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(NEYRON_DAY_DENDRITE.color);
  m.emissive.setHex(NEYRON_DAY_DENDRITE.emissive);
  m.emissiveIntensity = NEYRON_DAY_DENDRITE.emissiveIntensity;
  m.roughness = NEYRON_DAY_DENDRITE.roughness;
  m.metalness = NEYRON_DAY_DENDRITE.metalness;
  m.clearcoat = NEYRON_DAY_DENDRITE.clearcoat;
  m.clearcoatRoughness = NEYRON_DAY_DENDRITE.clearcoatRoughness;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Node of Ranvier — day: periwinkle / blue-violet (pops vs yellow myelin + teal axon). */
function applyDayRanvierSilkLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0x5c68e8);
  m.emissive.setHex(0x1c1a48);
  m.emissiveIntensity = 0.34;
  m.roughness = 0.2;
  m.metalness = 0.4;
  m.clearcoat = 0.72;
  m.clearcoatRoughness = 0.16;
  m.sheen = 0.55;
  m.sheenColor.setHex(0xe4e8ff);
  m.sheenRoughness = 0.34;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/**
 * Axon + terminal branches (day) — deep teal/cyan complements dendrite orange;
 * slight warm emissive ties the palette without matching orange.
 */
function applyDayAxonLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0x1a6d78);
  m.emissive.setHex(0x5c3818);
  m.emissiveIntensity = 0.24;
  m.roughness = 0.24;
  m.metalness = 0.42;
  m.clearcoat = 0.68;
  m.clearcoatRoughness = 0.2;
  m.sheen = 0.42;
  m.sheenColor.setHex(0xbee8ea);
  m.sheenRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Myelin sheaths — saturated yellow, distinct from axon / gold nodes (day). */
function applyDayMyelinYellowLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0xefd21a);
  m.emissive.setHex(0x5a4a08);
  m.emissiveIntensity = 0.34;
  m.roughness = 0.3;
  m.metalness = 0.22;
  m.clearcoat = 0.58;
  m.clearcoatRoughness = 0.2;
  m.sheen = 0.4;
  m.sheenColor.setHex(0xfff6b8);
  m.sheenRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Nucleus / mitochondria / Nissl inside translucent soma — not hero red (day). */
function applyDaySomaInteriorLook(m, lab) {
  if (!m.isMeshPhysicalMaterial) return;
  if (lab === "Nucleus") {
    m.color.setHex(0x3a58d8);
    m.emissive.setHex(0x182a70);
    m.emissiveIntensity = 0.52;
  } else if (lab === "Mitochondria") {
    m.color.setHex(0xe83848);
    m.emissive.setHex(0x601018);
    m.emissiveIntensity = 0.48;
  } else if (lab === "Nissl Body") {
    m.color.setHex(0x9b40cc);
    m.emissive.setHex(0x381058);
    m.emissiveIntensity = 0.5;
  } else {
    applyDayPhysicalHeroLook(m);
    return;
  }
  m.roughness = 0.38;
  m.metalness = 0.42;
  m.clearcoat = 0.22;
  m.clearcoatRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

window.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || d.source !== "neyron-parent") return;
  if (d.type === "theme" && (d.theme === "day" || d.theme === "night")) {
    if (typeof window.__neyronSiteShellSetTheme === "function") {
      window.__neyronSiteShellSetTheme(d.theme);
    } else if (typeof window.__neuronAtlasApplyTheme === "function") {
      window.__neuronAtlasApplyTheme(d.theme);
    }
  }
  if (d.type === "lang" && (d.lang === "en" || d.lang === "az")) {
    if (typeof window.__neyronSiteShellSetLang === "function") {
      window.__neyronSiteShellSetLang(d.lang);
    } else {
      neuronSetLang(d.lang);
    }
  }
});

function random(a, b) {
  return a + Math.random() * (b - a);
}

function lerpVec(a, b, t) {
  return a.clone().lerp(b, t);
}

/** First labeled ancestor (same chain `userData.label` uses for picking). */
function findRootLabelMesh(obj) {
  let o = obj;
  while (o) {
    if (o.userData && o.userData.label) {
      return o;
    }
    o = o.parent;
  }
  return null;
}

/** One ray entry per distinct labeled object (drops duplicate front/back hits on the same mesh). */
function buildOrderedUniqueLabelHits(intersections) {
  const out = [];
  let lastRoot = null;
  for (let i = 0; i < intersections.length; i++) {
    const rootM = findRootLabelMesh(intersections[i].object);
    if (!rootM) {
      continue;
    }
    if (rootM === lastRoot) {
      continue;
    }
    out.push(intersections[i]);
    lastRoot = rootM;
  }
  return out;
}

/**
 * Tube along curve with radius linearly interpolated from r0 to r1 over arc length.
 * @param innerTubeSegments subdivisions along each short chord (higher = smoother joins)
 */
function createTaperedTubeGeometry(
  curve,
  tubularSegments,
  r0,
  r1,
  radialSegments,
  innerTubeSegments = 4
) {
  const geoms = [];
  for (let i = 0; i < tubularSegments; i++) {
    const u0 = i / tubularSegments;
    const u1 = (i + 1) / tubularSegments;
    const p0 = curve.getPointAt(u0);
    const p1 = curve.getPointAt(u1);
    const rad0 = r0 + (r1 - r0) * u0;
    const rad1 = r0 + (r1 - r0) * u1;
    const seg = new THREE.LineCurve3(p0, p1);
    const midR = (rad0 + rad1) * 0.5;
    const g = new THREE.TubeGeometry(seg, innerTubeSegments, midR, radialSegments, false);
    geoms.push(g);
  }
  return mergeGeometries(geoms);
}

function init() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "neuron-scene";
  root.appendChild(wrap);

  const tooltip = document.createElement("div");
  tooltip.className = "structure-label";
  tooltip.hidden = true;
  wrap.appendChild(tooltip);

  const scene = new THREE.Scene();
  const nightBg = 0x020810;
  scene.background = new THREE.Color(nightBg);
  const fog = new THREE.FogExp2(nightBg, 0.008);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 500);
  camera.position.set(0, 2, 16);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
  });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  // Match meninges / diencephalon / synapse — flat exact #020810 / #faf8f4
  renderer.toneMapping = THREE.NoToneMapping;
  renderer.toneMappingExposure = 1;
  wrap.appendChild(renderer.domElement);

  const ndcScratch = new THREE.Vector2();

  function syncCanvasSize() {
    const rect = root.getBoundingClientRect();
    const w = Math.max(1, Math.floor(rect.width));
    const h = Math.max(1, Math.floor(rect.height));
    if (w < 2 || h < 2) return;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(w, h);
  }
  syncCanvasSize();
  const resizeObs = new ResizeObserver(() => syncCanvasSize());
  resizeObs.observe(root);
  window.addEventListener("resize", syncCanvasSize);

  renderer.domElement.addEventListener("click", (e) => {
    clientToNdc(e.clientX, e.clientY, renderer.domElement, ndcScratch);

    const clickRaycaster = new THREE.Raycaster();
    clickRaycaster.setFromCamera(ndcScratch, camera);

    const allMeshes = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.userData.label) {
        allMeshes.push(obj);
      }
    });

    const hits = clickRaycaster.intersectObjects(allMeshes, false);

    if (hits.length > 0) {
      const stack = buildOrderedUniqueLabelHits(hits);
      if (stack.length === 0) {
        return;
      }
      /** `e.detail`: 1 = front hit, 2+ = next distinct labeled object along the ray (double-click). */
      const detail = e.detail || 1;
      const pickIndex =
        stack.length === 1 ? 0 : (detail - 1) % stack.length;
      const rootPick = findRootLabelMesh(stack[pickIndex].object);
      const label = rootPick ? rootPick.userData.label : null;
      if (!label) {
        return;
      }
      const descriptions = currentLang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
      const data = descriptions[label];
      if (data && panel && panelName && panelOverview) {
        panelOpenPickLabel = label;
        fillNeuronPanel(data);
      }
    }
  });

  /** Native double-click: pick second distinct structure along ray (same as 2nd click `detail`). */
  renderer.domElement.addEventListener("dblclick", (e) => {
    clientToNdc(e.clientX, e.clientY, renderer.domElement, ndcScratch);
    const cr = new THREE.Raycaster();
    cr.setFromCamera(ndcScratch, camera);
    const pickMeshes = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.userData.label) {
        pickMeshes.push(obj);
      }
    });
    const dh = cr.intersectObjects(pickMeshes, false);
    if (!dh.length) return;
    const st = buildOrderedUniqueLabelHits(dh);
    if (st.length < 2) return;
    const root2 = findRootLabelMesh(st[1].object);
    const lab2 = root2 ? root2.userData.label : null;
    if (!lab2) return;
    const descriptions2 = currentLang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
    const data2 = descriptions2[lab2];
    if (data2 && panel && panelName && panelOverview) {
      panelOpenPickLabel = lab2;
      fillNeuronPanel(data2);
    }
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.35;
  if ("enableDollyOnDoubleClick" in controls) {
    controls.enableDollyOnDoubleClick = false;
  }
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };

  const neuronGroup = new THREE.Group();
  scene.add(neuronGroup);

  const rayMeshes = [];

  function registerLabel(mesh, label) {
    mesh.userData.label = label;
    rayMeshes.push(mesh);
  }

  // --- 1. SOMA ---
  const somaGeom = new THREE.SphereGeometry(1.2, 48, 48);
  const posAttr = somaGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const noise = 1 + 0.07 * Math.sin(x * 4) * Math.cos(y * 3.7) * Math.sin(z * 5);
    posAttr.setXYZ(i, x * noise, y * noise, z * noise);
  }
  posAttr.needsUpdate = true;
  somaGeom.computeVertexNormals();

  const soma = new THREE.Mesh(somaGeom);
  soma.material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x2de89a),
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.3,
    ior: 1.2,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
    clearcoat: 0.0,
  });
  soma.material.color.set(0x1a6b52);
  soma.material.emissive = new THREE.Color(0x3a1510);
  soma.material.transmission = 0.6;
  soma.material.opacity = 0.45;
  soma.material.depthWrite = false;
  soma.material.side = THREE.DoubleSide;
  neuronGroup.add(soma);
  registerLabel(soma, "Soma");

  const somaInteriorLight = new THREE.PointLight(0x7ecfb3, 1.5, 3);
  somaInteriorLight.position.set(0, 0, 0);
  neuronGroup.add(somaInteriorLight);

  // --- 2. NUCLEUS ---
  const nucleusGeom = new THREE.SphereGeometry(0.48, 24, 24);
  const nucleusMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x5577ee),
    emissive: new THREE.Color(0x1a2860),
    emissiveIntensity: 0.85,
    transparent: true,
    opacity: 0.92,
  });
  const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
  nucleus.position.set(0.05, 0.05, 0);
  nucleus.renderOrder = 1;
  neuronGroup.add(nucleus);
  registerLabel(nucleus, "Nucleus");

  const mitoBodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf06068),
    emissive: new THREE.Color(0x701018),
    emissiveIntensity: 0.58,
    roughness: 0.45,
  });
  const mitoCristaMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf06068),
    emissive: new THREE.Color(0x601010),
    emissiveIntensity: 0.45,
    roughness: 0.45,
  });

  function makeMitochondrionMesh() {
    const body = new THREE.SphereGeometry(0.12, 12, 12);
    body.scale(1, 0.5, 0.5);
    const numCristae = Math.random() < 0.5 ? 2 : 3;
    const cristaOffsets = [
      [0.065, 0.01, 0.025],
      [-0.055, 0.035, -0.02],
      [0.015, -0.045, 0.035],
    ];
    const parts = [body];
    for (let i = 0; i < numCristae; i++) {
      const cg = new THREE.SphereGeometry(0.04, 6, 6);
      cg.scale(0.85, 0.4, 1.1);
      cg.translate(cristaOffsets[i][0], cristaOffsets[i][1], cristaOffsets[i][2]);
      parts.push(cg);
    }
    const merged = mergeGeometries(parts, true);
    const mats = [mitoBodyMat];
    for (let i = 0; i < numCristae; i++) mats.push(mitoCristaMat);
    return new THREE.Mesh(merged, mats);
  }

  const mitoConfigs = [
    { pos: new THREE.Vector3(-0.5, 0.3, 0.2), scale: new THREE.Vector3(1.0, 0.45, 0.45) },
    { pos: new THREE.Vector3(0.4, -0.3, 0.4), scale: new THREE.Vector3(0.9, 0.4, 0.5) },
    { pos: new THREE.Vector3(-0.2, 0.5, -0.3), scale: new THREE.Vector3(1.1, 0.42, 0.42) },
  ];
  for (const cfg of mitoConfigs) {
    const mito = makeMitochondrionMesh();
    mito.position.copy(cfg.pos);
    mito.scale.copy(cfg.scale);
    mito.renderOrder = 1;
    registerLabel(mito, "Mitochondria");
    neuronGroup.add(mito);
  }

  const nisslMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xa56dd4),
    emissive: new THREE.Color(0x401868),
    emissiveIntensity: 0.58,
    roughness: 0.62,
    transparent: true,
    opacity: 0.88,
  });
  const nisslPositions = [
    new THREE.Vector3(0.55, 0.4, 0.1),
    new THREE.Vector3(-0.55, 0.35, 0.2),
    new THREE.Vector3(0.3, -0.55, 0.3),
    new THREE.Vector3(-0.3, -0.5, -0.2),
    new THREE.Vector3(0.5, 0.1, -0.5),
    new THREE.Vector3(-0.4, 0.2, 0.55),
  ];
  for (const np of nisslPositions) {
    const ng = new THREE.SphereGeometry(0.08, 8, 8);
    const nPos = ng.attributes.position;
    for (let i = 0; i < nPos.count; i++) {
      const x = nPos.getX(i);
      const y = nPos.getY(i);
      const z = nPos.getZ(i);
      const s = 1 + 0.15 * Math.random();
      nPos.setXYZ(i, x * s, y * s, z * s);
    }
    nPos.needsUpdate = true;
    ng.computeVertexNormals();
    const nissl = new THREE.Mesh(ng, nisslMat);
    nissl.position.copy(np);
    nissl.renderOrder = 1;
    registerLabel(nissl, "Nissl Body");
    neuronGroup.add(nissl);
  }

  const dendriteMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x7ecfb3),
    emissive: new THREE.Color(0x0a2a1a),
    emissiveIntensity: 0.25,
    roughness: 0.5,
  });
  const spineMat = new THREE.MeshPhysicalMaterial({
    color: 0x5dcaa5,
    emissive: 0x0a2a1a,
    emissiveIntensity: 0.25,
    roughness: 0.5,
  });

  const spineGeomShared = new THREE.SphereGeometry(0.035, 10, 10);

  // --- 3. DENDRITES ---
  function makeDendrite(start, direction, radius, depth) {
    if (depth <= 0 || radius < 0.015) return;

    const dir = direction.clone().normalize();
    const len = random(1.0, 1.6) * (depth / 5);
    const end = start.clone().add(dir.clone().multiplyScalar(len));
    const mid = lerpVec(start, end, 0.5);
    mid.add(
      new THREE.Vector3(random(-0.1, 0.1), random(-0.1, 0.1), random(-0.1, 0.1))
    );
    const q1 = lerpVec(start, mid, 0.45);
    q1.add(new THREE.Vector3(random(-0.035, 0.035), random(-0.035, 0.035), random(-0.035, 0.035)));
    const q2 = lerpVec(mid, end, 0.55);
    q2.add(new THREE.Vector3(random(-0.035, 0.035), random(-0.035, 0.035), random(-0.035, 0.035)));

    const curve = new THREE.CatmullRomCurve3(
      [start.clone(), q1, mid, q2, end.clone()],
      false,
      "centripetal"
    );
    const tubeGeom = createTaperedTubeGeometry(curve, 28, radius, radius * 0.7, 12, 8);
    const branchMesh = new THREE.Mesh(tubeGeom, dendriteMat);
    neuronGroup.add(branchMesh);
    registerLabel(branchMesh, "Dendrites");

    const spineCount = Math.floor(random(3, 5));
    for (let s = 0; s < spineCount; s++) {
      const t = random(0.15, 0.85);
      const spinePos = curve.getPointAt(t);
      const spine = new THREE.Mesh(spineGeomShared, spineMat);
      spine.position.copy(spinePos);
      neuronGroup.add(spine);
      registerLabel(spine, "Dendritic Spine");
    }

    const spreadMin = 0.4;
    const spreadMax = 0.7;
    for (let c = 0; c < 2; c++) {
      const axis = new THREE.Vector3(random(-1, 1), random(-0.2, 1), random(-1, 1)).normalize();
      const angle = random(spreadMin, spreadMax);
      const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      const childDir = dir.clone().applyQuaternion(q).normalize();
      makeDendrite(end.clone(), childDir, radius * 0.65, depth - 1);
    }
  }

  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 9; i++) {
    const t = (i + 0.5) / 9;
    const y = 0.2 + t * 0.75;
    const ringR = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    const dir = new THREE.Vector3(
      Math.cos(theta) * ringR,
      y,
      Math.sin(theta) * ringR
    ).normalize();
    const start = dir.clone().multiplyScalar(1.15);
    makeDendrite(start, dir, 0.22, 6);
  }

  // --- 4. AXON HILLOCK (tapered tube from soma bottom to axon start) ---
  const hillockCurve = new THREE.LineCurve3(
    new THREE.Vector3(0, -1.2, 0),
    new THREE.Vector3(0, -1.8, 0)
  );
  const hillockGeom = createTaperedTubeGeometry(hillockCurve, 14, 0.28, 0.16, 8, 5);
  const hillockMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xe8c07a),
    emissive: 0x2a1000,
    emissiveIntensity: 0.3,
  });
  const hillock = new THREE.Mesh(hillockGeom, hillockMat);
  neuronGroup.add(hillock);
  registerLabel(hillock, "Axon Hillock");

  // --- 5. AXON ---
  const axonPoints = [new THREE.Vector3(0, -1.8, 0)];
  for (let i = 1; i < 20; i++) {
    const prev = axonPoints[axonPoints.length - 1];
    const dy = 0.55 + random(0, 0.1);
    axonPoints.push(
      new THREE.Vector3(
        prev.x + random(-0.06, 0.06),
        prev.y - dy,
        prev.z + random(-0.04, 0.04)
      )
    );
  }
  const axonCurve = new THREE.CatmullRomCurve3(axonPoints);
  const axonGeom = new THREE.TubeGeometry(axonCurve, 72, 0.09, 10, false);
  const axonMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x2f6f86),
    emissive: new THREE.Color(0x061c28),
    emissiveIntensity: 0.42,
    roughness: 0.26,
    metalness: 0.2,
    clearcoat: 0.85,
    clearcoatRoughness: 0.16,
    sheen: 0.32,
    sheenColor: new THREE.Color(0x9fd4e8),
    sheenRoughness: 0.48,
  });
  const axonMesh = new THREE.Mesh(axonGeom, axonMat);
  neuronGroup.add(axonMesh);
  registerLabel(axonMesh, "Axon");

  const myelinMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf2d830),
    emissive: new THREE.Color(0x4a3a06),
    emissiveIntensity: 0.4,
    roughness: 0.36,
    metalness: 0.14,
    clearcoat: 0.56,
    clearcoatRoughness: 0.26,
    sheen: 0.32,
    sheenColor: new THREE.Color(0xfff4a8),
    sheenRoughness: 0.48,
  });
  const nodeMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd67cff),
    emissive: new THREE.Color(0x5a1088),
    emissiveIntensity: 0.82,
    roughness: 0.16,
    metalness: 0.44,
    clearcoat: 0.9,
    clearcoatRoughness: 0.09,
    sheen: 0.62,
    sheenColor: new THREE.Color(0xf2e0ff),
    sheenRoughness: 0.32,
  });

  const upRef = new THREE.Vector3(0, 1, 0);

  const myelinGeomShared = new THREE.CylinderGeometry(0.155, 0.155, 0.55, 12);
  const schwannShellGeomShared = new THREE.SphereGeometry(1, 12, 12);
  /* Slightly thicker torus + smoother segments so small nodes read on dark backgrounds */
  const nodeGeomShared = new THREE.TorusGeometry(0.1, 0.024, 8, 18);

  const schwannMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fe1cb,
    emissive: 0x0a2a1a,
    emissiveIntensity: 0.15,
    roughness: 0.6,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });

  // --- 6 & 7. MYELIN + NODES OF RANVIER ---
  const myelinTValues = [];
  for (let k = 0; k < 12; k++) {
    myelinTValues.push(0.06 + ((0.88 - 0.06) * (k + 0.5)) / 12);
  }

  for (let k = 0; k < 12; k++) {
    const t = myelinTValues[k];
    const pt = axonCurve.getPointAt(t);
    const tangent = axonCurve.getTangentAt(t).normalize();
    const myelin = new THREE.Mesh(myelinGeomShared, myelinMat);
    myelin.position.copy(pt);
    myelin.quaternion.setFromUnitVectors(upRef, tangent);
    neuronGroup.add(myelin);
    registerLabel(myelin, "Myelin Sheath");

    if (k % 2 === 0) {
      const schwann = new THREE.Mesh(schwannShellGeomShared, schwannMat);
      schwann.position.copy(pt);
      schwann.quaternion.copy(myelin.quaternion);
      schwann.scale.set(0.22, 0.38, 0.22);
      registerLabel(schwann, "Schwann Cell");
      neuronGroup.add(schwann);
    }

    if (k < 11) {
      const tNext = myelinTValues[k + 1];
      const tGap = (t + tNext) * 0.5;
      const pGap = axonCurve.getPointAt(tGap);
      const tanGap = axonCurve.getTangentAt(tGap).normalize();
      const nodeMesh = new THREE.Mesh(nodeGeomShared, nodeMat);
      nodeMesh.position.copy(pGap);
      nodeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tanGap);
      neuronGroup.add(nodeMesh);
      registerLabel(nodeMesh, "Node of Ranvier");
    }
  }

  // --- 8. AXON TERMINALS ---
  const axonEnd = axonCurve.getPoint(1.0);
  const angles = [0, 1.05, 2.1, 3.14, 4.19, 5.24];
  const boutonMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4537e,
    emissive: 0x440011,
    emissiveIntensity: 0.6,
    clearcoat: 1.0,
  });
  const boutonGeomShared = new THREE.SphereGeometry(0.13, 16, 16);

  for (const ang of angles) {
    const endPt = new THREE.Vector3(
      axonEnd.x + Math.cos(ang) * 0.7,
      axonEnd.y - random(0.3, 0.8),
      axonEnd.z + Math.sin(ang) * 0.7
    );
    const termCurve = new THREE.CatmullRomCurve3([axonEnd.clone(), endPt.clone()]);
    const termGeom = new THREE.TubeGeometry(termCurve, 10, 0.028, 6, false);
    const termMesh = new THREE.Mesh(termGeom, axonMat);
    neuronGroup.add(termMesh);
    registerLabel(termMesh, "Axon Terminal");

    const bouton = new THREE.Mesh(boutonGeomShared, boutonMat);
    bouton.position.copy(endPt);
    neuronGroup.add(bouton);
    registerLabel(bouton, "Synaptic Bouton");
  }

  // --- 9. ACTION POTENTIAL PULSE ---
  const pulseCoreGeom = new THREE.SphereGeometry(0.2, 16, 16);
  const pulseCoreMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
  const pulseCore = new THREE.Mesh(pulseCoreGeom, pulseCoreMat);

  const pulseHaloGeom = new THREE.SphereGeometry(0.4, 16, 16);
  const pulseHaloMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.18,
    side: THREE.BackSide,
  });
  const pulseHalo = new THREE.Mesh(pulseHaloGeom, pulseHaloMat);

  const pulseLight = new THREE.PointLight(0x00ffcc, 5, 3);
  const pulseGroup = new THREE.Group();
  pulseGroup.add(pulseCore, pulseHalo, pulseLight);
  neuronGroup.add(pulseGroup);

  let pulseT = 0;

  neuronGroup.updateMatrixWorld(true);
  // Frame the whole neuron in the viewport without moving or altering meshes.
  const neuronBounds = new THREE.Box3().setFromObject(neuronGroup);
  const neuronCenter = new THREE.Vector3();
  const neuronSize = new THREE.Vector3();
  neuronBounds.getCenter(neuronCenter);
  neuronBounds.getSize(neuronSize);
  const maxDim = Math.max(neuronSize.x, neuronSize.y, neuronSize.z, 1);
  const fovRad = (camera.fov * Math.PI) / 180;
  const fitPadding = 1.15;
  const fitDist = ((maxDim / 2) / Math.tan(fovRad / 2)) * fitPadding;
  camera.position.set(neuronCenter.x, neuronCenter.y, neuronCenter.z + fitDist);
  camera.near = Math.max(0.05, fitDist / 1000);
  camera.far = Math.max(500, fitDist * 15);
  camera.updateProjectionMatrix();
  controls.target.copy(neuronCenter);
  controls.update();
  // Re-sync canvas after layout settles so the neuron stays framed in the full viewport.
  requestAnimationFrame(() => {
    syncCanvasSize();
    controls.target.copy(neuronCenter);
    camera.position.set(neuronCenter.x, neuronCenter.y, neuronCenter.z + fitDist);
    controls.update();
  });

  // --- 10. LIGHTING ---
  const ambLight = new THREE.AmbientLight(0x1a3050, 2.05);
  scene.add(ambLight);
  const hemiLight = new THREE.HemisphereLight(0x8eb4d4, 0x0c1828, 0.65);
  scene.add(hemiLight);

  const somaGlow = new THREE.PointLight(0x7ecfb3, 4.2, 24);
  somaGlow.position.set(0, 0, 0);
  scene.add(somaGlow);

  const dirLight = new THREE.DirectionalLight(0x9ed0f0, 2.45);
  dirLight.position.set(-5, 4, -6);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xa8c8e8, 1.1);
  fillLight.position.set(6, 2, 8);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0x00ffcc, 1.15, 35);
  accentLight.position.set(3, -3, 5);
  scene.add(accentLight);

  function registerNightMaterialsFromGroup(group) {
    group.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const mat of mats) {
        if (nightMaterialSnapshots.has(mat)) continue;
        const s = snapshotMaterialState(mat);
        if (s) nightMaterialSnapshots.set(mat, s);
      }
    });
  }

  registerNightMaterialsFromGroup(neuronGroup);

  let atlasViewTheme = "night";

  function applyAtlasTheme(theme) {
    const isDay = theme === "day";
    atlasViewTheme = theme;
    document.body.classList.toggle("atlas-day", isDay);
    document.documentElement.classList.toggle("atlas-day", isDay);
    try {
      document.documentElement.setAttribute("data-theme", isDay ? "day" : "night");
    } catch (e) {}

    if (isDay) {
      scene.background.setHex(0xfaf8f4);
      fog.color.setHex(0xfaf8f4);
      fog.density = 0.0016;
      accentLight.color.setHex(0xff9944);
      accentLight.intensity = 0.95;
      renderer.toneMappingExposure = 1;
      ambLight.color.setHex(0xffffff);
      ambLight.intensity = 0.58;
      hemiLight.color.setHex(0xfffaf6);
      hemiLight.groundColor.setHex(0xf0ebe6);
      hemiLight.intensity = 0.62;
      somaGlow.color.setHex(0xffb088);
      somaGlow.intensity = 3.2;
      somaInteriorLight.color.setHex(0xffaa88);
      somaInteriorLight.intensity = 1.35;
      dirLight.color.setHex(0xfff5f0);
      dirLight.intensity = 2.2;
      fillLight.color.setHex(0xffffff);
      fillLight.intensity = 0.58;
      neuronGroup.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        const lab = o.userData.label;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) {
          if (mat.isMeshPhysicalMaterial) {
            if (lab === "Dendrites" || lab === "Dendritic Spine") {
              applyDayDendriteSpineLook(mat);
            } else if (lab === "Nucleus" || lab === "Mitochondria" || lab === "Nissl Body") {
              applyDaySomaInteriorLook(mat, lab);
            } else if (lab === "Node of Ranvier") {
              applyDayRanvierSilkLook(mat);
            } else if (lab === "Axon" || lab === "Axon Terminal") {
              applyDayAxonLook(mat);
            } else if (lab === "Myelin Sheath") {
              applyDayMyelinYellowLook(mat);
            } else {
              applyDayPhysicalHeroLook(mat);
            }
          } else if (mat.isMeshBasicMaterial && mat !== pulseCoreMat && mat !== pulseHaloMat) {
            mat.color.setHex(0xe05a10);
            if (mat.opacity < 1) mat.opacity = 0.2;
          }
        }
      });
      const heroSig = 0xc93840;
      pulseCoreMat.color.setHex(heroSig);
      pulseHaloMat.color.setHex(heroSig);
      pulseLight.color.setHex(heroSig);
    } else {
      scene.background.setHex(nightBg);
      fog.color.setHex(nightBg);
      fog.density = 0.008;
      pulseCoreMat.color.setHex(0x00ffcc);
      pulseHaloMat.color.setHex(0x00ffcc);
      pulseLight.color.setHex(0x00ffcc);
      accentLight.color.setHex(0x00ffcc);
      accentLight.intensity = 1.15;
      renderer.toneMappingExposure = 1;
      ambLight.color.setHex(0x1a3050);
      ambLight.intensity = 2.05;
      hemiLight.color.setHex(0x8eb4d4);
      hemiLight.groundColor.setHex(0x0c1828);
      hemiLight.intensity = 0.65;
      somaGlow.color.setHex(0x7ecfb3);
      somaGlow.intensity = 4.2;
      somaInteriorLight.color.setHex(0x7ecfb3);
      somaInteriorLight.intensity = 1.5;
      dirLight.color.setHex(0x9ed0f0);
      dirLight.intensity = 2.45;
      fillLight.color.setHex(0xa8c8e8);
      fillLight.intensity = 1.1;
      neuronGroup.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) {
          restoreMaterialState(mat, nightMaterialSnapshots.get(mat));
        }
      });
    }
    neuronSetLang(currentLang);
    try {
      localStorage.setItem("neyron_theme", theme);
    } catch (e) {}
  }

  window.__neuronAtlasApplyTheme = applyAtlasTheme;

  const qs = new URLSearchParams(window.location.search);
  const urlTheme = qs.get("theme");
  let initialTheme = "night";
  if (urlTheme === "day" || urlTheme === "night") {
    initialTheme = urlTheme;
  } else {
    try {
      const lsT = localStorage.getItem("neyron_theme");
      if (lsT === "day" || lsT === "night") initialTheme = lsT;
    } catch (e) {}
  }
  applyAtlasTheme(initialTheme);

  scene.traverse((obj) => {
    if (obj.isMesh) {
      if (obj === soma) {
        obj.renderOrder = 999;
      } else {
        obj.renderOrder = 0;
      }
    }
  });

  // --- 13. HOVER LABELS (pinned to structure like meninges) ---
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2(2, 2);
  const labelBox = new THREE.Box3();
  const labelWorld = new THREE.Vector3();
  const labelNdc = new THREE.Vector3();

  function findMeshByLabel(label) {
    for (let i = 0; i < rayMeshes.length; i++) {
      if (rayMeshes[i].userData.label === label) return rayMeshes[i];
    }
    return null;
  }

  function updateFloatingStructureLabel(labelKey) {
    if (!labelKey) {
      tooltip.hidden = true;
      return;
    }
    const mesh = findMeshByLabel(labelKey);
    if (!mesh || !mesh.visible) {
      tooltip.hidden = true;
      return;
    }
    labelBox.setFromObject(mesh, true);
    if (labelBox.isEmpty()) {
      tooltip.hidden = true;
      return;
    }
    labelWorld.set(
      (labelBox.min.x + labelBox.max.x) * 0.5,
      labelBox.max.y,
      (labelBox.min.z + labelBox.max.z) * 0.5
    );
    labelNdc.copy(labelWorld).project(camera);
    if (labelNdc.z > 1 || Math.abs(labelNdc.x) > 1.15 || Math.abs(labelNdc.y) > 1.15) {
      tooltip.hidden = true;
      return;
    }
    const rect = renderer.domElement.getBoundingClientRect();
    const x = (labelNdc.x * 0.5 + 0.5) * rect.width;
    const y = (-labelNdc.y * 0.5 + 0.5) * rect.height;
    const displayName = tooltipNames[currentLang][labelKey] || labelKey;
    tooltip.textContent = displayName;
    tooltip.hidden = false;
    tooltip.style.transform = `translate(${x}px, ${y}px) translate(-50%, -130%)`;
  }

  function onPointerMove(event) {
    clientToNdc(event.clientX, event.clientY, renderer.domElement, pointerNdc);
  }
  renderer.domElement.addEventListener("mousemove", onPointerMove);

  renderer.domElement.addEventListener("pointerdown", () => {
    controls.autoRotate = false;
  });
  window.addEventListener("pointerup", () => {
    controls.autoRotate = true;
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    controls.autoRotate = true;
    pointerNdc.set(2, 2);
    if (!panelOpenPickLabel) tooltip.hidden = true;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (atlasViewTheme === "day") {
      somaGlow.intensity = 2.85 + 0.55 * Math.sin(time * 1.4);
    } else {
      somaGlow.intensity = 3.6 + 1.1 * Math.sin(time * 1.4);
    }

    pulseT += 0.003;
    if (pulseT >= 1.0) pulseT -= 1.0;
    const pulsePos = axonCurve.getPointAt(pulseT);
    pulseGroup.position.copy(pulsePos);

    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(rayMeshes, false);
    let labelKey = panelOpenPickLabel;
    if (!labelKey && hits.length > 0 && hits[0].object.userData.label) {
      labelKey = hits[0].object.userData.label;
    }
    updateFloatingStructureLabel(labelKey);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

}

init();
