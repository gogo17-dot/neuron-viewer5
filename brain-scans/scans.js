import { Niivue } from 'https://unpkg.com/@niivue/niivue@0.69.0/dist/index.js';
import { initTheme, getTheme } from './theme.js';
import { initLang, t, onLangChange, syncFromSiteShell } from './lang.js';
import {
  resolveScanQuery,
  cortexUrlForLabel,
} from './scanBridge.js';

const REMOTE_BASE = 'https://niivue.github.io/niivue-demo-images';
const LOCAL_BASE = './scans-data';
const TIP_KEY = 'scans-viewer-tip-v1';
const DEFAULT_OPACITY = 0.65;
/** NiiVue MultiplanarLayout enum */
const MULTIPLANAR_AUTO = 0;
const MULTIPLANAR_COLUMN = 1;
const MULTIPLANAR_GRID = 2;
const MULTIPLANAR_ROW = 3;
/** NiiVue DragMode.crosshair / contrast / pan */
const DRAG_CROSSHAIR = 8;
const DRAG_CONTRAST = 1;
const DRAG_PAN = 3;

/** Files mirrored under scans-data/ (offline-friendly teaching set). */
const LOCAL_FILES = new Set([
  'mni152.nii.gz',
  'spmMotor.nii.gz',
  'pcasl.nii.gz',
  'chris_t1.nii.gz',
  'chris_t2.nii.gz',
  'CT_AVM.nii.gz',
  'chris_MRA.nii.gz',
  'chris_PD.nii.gz',
  'MR_Gd.nii.gz',
  'register/FLAIR_2D.nii.gz',
  'register/dwi.nii.gz',
  'CIT168/CIT168.nii.gz',
  'CIT168/CIT168.json',
  'Cerebellum/atl-Anatom.nii.gz',
  'Cerebellum/atl-Anatom.json',
  'PD25/PD25-subcortical-1mm.nii.gz',
  'PD25/PD25-subcortical.json',
  'Juelich31/JulichBrainAtlas31_LH.nii.gz',
  'Juelich31/JulichBrainAtlas31_RH.nii.gz',
  'Juelich31/Julich.json',
]);

function assetUrl(rel) {
  return LOCAL_FILES.has(rel) ? `${LOCAL_BASE}/${rel}` : `${REMOTE_BASE}/${rel}`;
}

const NV_BG = {
  dark: [0.0078, 0.0314, 0.0627, 1],
  light: [0.9804, 0.9725, 0.9569, 1],
};

const SCANS = [
  { id: 'mni152', file: 'mni152.nii.gz', atlasSpace: true, primary: true },
  { id: 't1', file: 'chris_t1.nii.gz', primary: true },
  { id: 't2', file: 'chris_t2.nii.gz', primary: true },
  { id: 'flair', file: 'register/FLAIR_2D.nii.gz', primary: true },
  { id: 'ct', file: 'CT_AVM.nii.gz', colormap: 'ct_bones', primary: true },
  { id: 'mra', file: 'chris_MRA.nii.gz', prefer: 'render' },
  { id: 'pd', file: 'chris_PD.nii.gz' },
  { id: 'gd', file: 'MR_Gd.nii.gz' },
  { id: 'dwi', file: 'register/dwi.nii.gz', colormap: 'hot' },
  {
    id: 'activation',
    file: 'spmMotor.nii.gz',
    colormap: 'warm',
    atlasSpace: true,
    prefer: 'axial',
  },
  { id: 'asl', file: 'pcasl.nii.gz', is4D: true },
];

const ATLASES = [
  { id: 'none', files: null, labels: null },
  {
    id: 'cit',
    files: ['CIT168/CIT168.nii.gz'],
    labels: 'CIT168/CIT168.json',
  },
  {
    id: 'cereb',
    files: ['Cerebellum/atl-Anatom.nii.gz'],
    labels: 'Cerebellum/atl-Anatom.json',
  },
  {
    id: 'pd25',
    files: ['PD25/PD25-subcortical-1mm.nii.gz'],
    labels: 'PD25/PD25-subcortical.json',
  },
  {
    id: 'jul',
    files: [
      'Juelich31/JulichBrainAtlas31_LH.nii.gz',
      'Juelich31/JulichBrainAtlas31_RH.nii.gz',
    ],
    labels: 'Juelich31/Julich.json',
  },
];

/**
 * Per-atlas cold-start targets (first match wins).
 * Avoid Accumbens / vague early hits that short-circuit teaching value.
 */
const ATLAS_SEED_PREFS = {
  cit: [/putamen/i, /caudate/i],
  pd25: [/red nucleus/i, /substantia nigra/i, /subthalamic/i, /putamen/i],
  cereb: [/Dentate/i, /CrusI(?!I)/i, /Left_VI\b/i, /I_IV/i],
  jul: [/FuP|putamen/i, /hOc1|V1|CalcS/i, /Area 4[ap]?\b/i, /Te 1\./i],
};

const SEED_LABEL_PREFS = ATLAS_SEED_PREFS.cit;

const REGION_NOTES = [
  { match: /putamen/i, key: 'note.putamen' },
  { match: /caudate/i, key: 'note.caudate' },
  { match: /accumbens/i, key: 'note.accumbens' },
  { match: /pallidus|pallidum/i, key: 'note.pallidum' },
  { match: /substantia nigra|snc|snr/i, key: 'note.sn' },
  { match: /subthalamic|stn/i, key: 'note.stn' },
  { match: /red nucleus|NRp|NRm/i, key: 'note.red' },
  { match: /thalamus|pulvinar|VPL|VPM|MD\b|VA\b|VL/i, key: 'note.thalamus' },
  { match: /hippocamp|ca1|ca2|ca3|dentate gyrus|\bdg\b|subic/i, key: 'note.hippo' },
  { match: /amygdala|Astr|VTM|\bLB\b|\bCM\b|\bSF\b|\bMF\b|\bIF\b/i, key: 'note.amygdala' },
  { match: /hOc1|V1|CalcS/i, key: 'note.v1' },
  { match: /hOc2|V2/i, key: 'note.v2' },
  { match: /Te 1\.|HESCHL/i, key: 'note.a1' },
  { match: /Area 4[ap]?\b|PreCG/i, key: 'note.m1' },
  { match: /Area 3[ab]|Area 1\b|Area 2\b|PostCG|PostCS/i, key: 'note.s1' },
  { match: /Area 44|Area 45|IFG/i, key: 'note.broca' },
  { match: /insula|Ig\d|Id\d|Ia\d/i, key: 'note.insula' },
  { match: /Fo\d|OFC|orbito/i, key: 'note.ofc' },
  { match: /cingul|p24|s24|p32|s32|Area 25|Area 33/i, key: 'note.cingulate' },
  { match: /IPL|PFm|PGa|PGp|PF\b|PFt|PFcm|PFop/i, key: 'note.ipl' },
  { match: /SPL|7A|7P|7M|7PC|5M|5L/i, key: 'note.spl' },
  { match: /crus|vermis|cerebell|fastigial|interposed|dentate|Ndent|Nfast|Ninterp/i, key: 'note.cerebellum' },
  { match: /hypothalam|mammillar/i, key: 'note.hypothalamus' },
  { match: /habenul/i, key: 'note.habenula' },
  { match: /parabrachial/i, key: 'note.parabrachial' },
  { match: /ventral tegmental|VTA/i, key: 'note.vta' },
];

const VIEWS = ['multi', 'axial', 'coronal', 'sagittal', 'render'];

const $ = (id) => document.getElementById(id);

let nv = null;
let scanId = 'mni152';
let atlasId = 'cit';
let viewId = 'multi';
let atlasLabels = null;
let atlasCmap = null;
let busy = false;
let lastRegionName = null;
let showMoreScans = false;
/** Inbound deep-link from 3D / ?region= (consumed by seedLocation). */
let deepLinkTarget = resolveScanQuery();

function currentScan() {
  return SCANS.find((s) => s.id === scanId);
}

function overlaysAllowed() {
  return Boolean(currentScan()?.atlasSpace);
}

function showOverlay(text, isError = false) {
  const overlay = $('overlay');
  const overlayMsg = $('overlay-msg');
  overlayMsg.textContent = text;
  overlay.classList.toggle('err', isError);
  overlay.hidden = false;
}

function hideOverlay() {
  $('overlay').hidden = true;
}

function makePill(text, pressed, onClick, { warm = false, disabled = false, title = '', cls = '' } = {}) {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'pill' + (warm ? ' warm' : '') + (cls ? ` ${cls}` : '');
  b.textContent = text;
  b.setAttribute('aria-pressed', String(pressed));
  if (title) b.title = title;
  if (disabled) {
    b.disabled = true;
    b.setAttribute('aria-disabled', 'true');
  } else {
    b.addEventListener('click', onClick);
  }
  return b;
}

function visibleScans() {
  if (showMoreScans) return SCANS;
  const primary = SCANS.filter((s) => s.primary);
  const active = currentScan();
  if (active && !active.primary && !primary.some((s) => s.id === active.id)) {
    return [...primary, active];
  }
  return primary;
}

function renderControls() {
  const allowOverlay = overlaysAllowed();

  const rs = $('row-scan');
  rs.querySelectorAll('button').forEach((n) => n.remove());
  for (const s of visibleScans()) {
    rs.appendChild(
      makePill(t(`scan.${s.id}`), s.id === scanId, () => {
        if (busy || s.id === scanId) return;
        scanId = s.id;
        if (s.prefer && s.prefer !== viewId) viewId = s.prefer;
        if (!s.atlasSpace && atlasId !== 'none') atlasId = 'none';
        renderControls();
        load();
      }),
    );
  }
  rs.appendChild(
    makePill(
      showMoreScans ? t('scans.less') : t('scans.more'),
      false,
      () => {
        showMoreScans = !showMoreScans;
        renderControls();
      },
      { cls: 'pill--more' },
    ),
  );

  const ra = $('row-atlas');
  ra.querySelectorAll('button').forEach((n) => n.remove());
  for (const a of ATLASES) {
    const isNone = a.id === 'none';
    const disabled = !isNone && !allowOverlay;
    ra.appendChild(
      makePill(
        t(`atlas.${a.id}`),
        a.id === atlasId,
        () => {
          if (busy || a.id === atlasId) return;
          atlasId = a.id;
          renderControls();
          load();
        },
        {
          warm: true,
          disabled,
          title: disabled ? t('scans.overlayLocked') : '',
        },
      ),
    );
  }

  const rv = $('row-view');
  rv.replaceChildren();
  for (const id of VIEWS) {
    rv.appendChild(
      makePill(t(`view.${id}`), id === viewId, () => {
        if (busy || id === viewId) return;
        viewId = id;
        renderControls();
        applyView();
      }),
    );
  }

  $('opacity-wrap').hidden = atlasId === 'none';
  updateSpaceNotice();
  updateRegionNote(lastRegionName);
}

function updateSpaceNotice() {
  const notice = $('space-notice');
  if (!notice) return;
  const show = !overlaysAllowed();
  notice.hidden = !show;
  if (show) notice.textContent = t('scans.overlayLocked');
}

function applyView() {
  if (!nv) return;
  const map = {
    multi: nv.sliceTypeMultiplanar,
    axial: nv.sliceTypeAxial,
    coronal: nv.sliceTypeCoronal,
    sagittal: nv.sliceTypeSagittal,
    render: nv.sliceTypeRender,
  };
  const sliceType = map[viewId];
  if (sliceType !== undefined) nv.setSliceType(sliceType);
  if (viewId === 'multi') fitMultiplanarLayout();
  // Re-fit tiles after layout changes
  requestAnimationFrame(() => {
    try {
      nv.resizeListener?.();
      nv.drawScene?.();
    } catch {
      /* ignore */
    }
  });
}

/**
 * Pick a tile layout that fills the stage given multiplanarEqualSize.
 * With equal tiles: ROW needs ~3:1, COLUMN ~1:3, otherwise GRID (~1:1).
 * GRID always includes the 3D render tile so the stage has no empty quadrant.
 */
function fitMultiplanarLayout() {
  if (!nv || viewId !== 'multi') return;
  const canvas = $('gl');
  const w = canvas?.clientWidth || 1;
  const h = canvas?.clientHeight || 1;
  const ratio = w / h;
  let layout = MULTIPLANAR_GRID;
  if (ratio >= 2.4) layout = MULTIPLANAR_ROW;
  else if (ratio <= 0.45) layout = MULTIPLANAR_COLUMN;
  try {
    if (nv.opts) {
      nv.opts.multiplanarForceRender = true;
      nv.opts.multiplanarShowRender = 1; // ALWAYS — fill 4th cell (or 4th in row/col)
      nv.opts.multiplanarEqualSize = true;
      nv.opts.multiplanarPadPixels = 0;
      nv.opts.multiplanarLayout = layout;
    }
    nv.setMultiplanarLayout?.(layout);
  } catch {
    /* ignore */
  }
}

function applyNvTheme(theme = getTheme()) {
  const bg = NV_BG[theme] || NV_BG.dark;
  const stage = document.querySelector('.page--scans .stage');
  // NiiVue attachTo() hardcodes parentElement.style.backgroundColor = "black"
  if (stage) {
    const [r, g, b] = bg;
    stage.style.backgroundColor = `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  }
  if (!nv) return;
  nv.opts.backColor = bg.slice();
  try {
    nv.drawScene?.();
  } catch {
    /* ignore */
  }
}

/** Size the WebGL buffer to the stage and reflow multiplanar tiles. */
let _nvStageW = 0;
let _nvStageH = 0;
let _nvRefitTimer = 0;
function refitNvStage(force = false) {
  if (!nv) return;
  const stage = document.querySelector('.page--scans .stage');
  if (stage) {
    const w = Math.round(stage.clientWidth);
    const h = Math.round(stage.clientHeight);
    if (!force && w === _nvStageW && h === _nvStageH) return;
    _nvStageW = w;
    _nvStageH = h;
  }
  try {
    fitMultiplanarLayout();
    nv.resizeListener?.();
    nv.drawScene?.();
  } catch {
    /* ignore */
  }
}

function scheduleRefitNvStage() {
  if (_nvRefitTimer) cancelAnimationFrame(_nvRefitTimer);
  _nvRefitTimer = requestAnimationFrame(() => {
    _nvRefitTimer = 0;
    refitNvStage(false);
  });
}

async function fetchAtlasMeta(path) {
  try {
    const r = await fetch(assetUrl(path));
    if (!r.ok) throw new Error(String(r.status));
    const j = await r.json();
    if (Array.isArray(j.labels)) return { labels: j.labels, cmap: j };
    if (Array.isArray(j)) return { labels: j, cmap: null };
    return { labels: null, cmap: null };
  } catch {
    return { labels: null, cmap: null };
  }
}

function fmt(n, digits = 1) {
  if (n === undefined || n === null || Number.isNaN(n)) return '—';
  const v = Number(n);
  const s = v.toFixed(digits);
  if (s === '-0' || s === '0') return digits === 0 ? '0' : Number(0).toFixed(digits);
  return (v > 0 ? '+' : '') + s;
}

function readValue(entry) {
  if (entry == null) return null;
  if (typeof entry === 'object') return entry.value;
  return entry;
}

function regionNoteKey(name) {
  if (!name) return null;
  for (const rule of REGION_NOTES) {
    if (rule.match.test(name)) return rule.key;
  }
  return 'note.generic';
}

function updateRegionNote(name) {
  const el = $('region-note');
  const link = $('region-3d-link');
  if (!el) return;
  if (!name) {
    el.hidden = true;
    el.textContent = '';
    if (link) {
      link.hidden = true;
      link.removeAttribute('href');
    }
    return;
  }
  const key = regionNoteKey(name);
  el.hidden = false;
  el.textContent = t(key, { name });
  const href = cortexUrlForLabel(name);
  if (link) {
    if (href) {
      link.href = href;
      link.textContent = t('scans.open3d');
      link.hidden = false;
    } else {
      link.hidden = true;
      link.removeAttribute('href');
    }
  }
}

function onLocation(data) {
  if (!data) return;

  const mm = data.mm;
  $('out-mm').textContent = mm
    ? `${fmt(mm[0], 0)} ${fmt(mm[1], 0)} ${fmt(mm[2], 0)}`
    : '—';

  const vox = data.vox;
  $('out-vox').textContent = vox ? `${vox[0]} ${vox[1]} ${vox[2]}` : '—';

  const vals = data.values;
  const bgVal = Array.isArray(vals) && vals.length ? readValue(vals[0]) : null;
  $('out-val').textContent =
    bgVal === undefined || bgVal === null ? '—' : Number(bgVal).toFixed(1);

  const labelEl = $('out-label');
  if (atlasId === 'none' || !atlasLabels) {
    lastRegionName = null;
    labelEl.textContent =
      atlasId === 'none' ? '—' : t('scans.labelsUnavailable');
    labelEl.className = 'v dim';
    updateRegionNote(null);
    return;
  }

  let name = null;
  if (Array.isArray(vals)) {
    for (let i = 1; i < vals.length; i++) {
      const entry = vals[i];
      // RGBA overlays may report value as array [R,G,B,A] with label in R
      const raw = Array.isArray(entry)
        ? Number(entry[0])
        : Array.isArray(entry?.value)
          ? Number(entry.value[0])
          : Number(readValue(entry));
      const idx = Math.round(raw);
      if (!Number.isFinite(idx) || idx <= 0) continue;
      const candidate = atlasLabels[idx];
      if (candidate) {
        name = candidate;
        break;
      }
    }
  }

  lastRegionName = name;
  labelEl.textContent = name || '—';
  labelEl.className = 'v ' + (name ? 'accent' : 'dim');
  updateRegionNote(name);
}

function setOverlayOpacity(opacity) {
  if (!nv?.volumes) return;
  for (let i = 1; i < nv.volumes.length; i++) {
    nv.setOpacity(i, opacity);
  }
}

function applyAtlasColormaps() {
  if (!nv?.volumes || !atlasCmap?.labels) return;
  for (let i = 1; i < nv.volumes.length; i++) {
    const vol = nv.volumes[i];
    if (!vol) continue;
    // CIT168 / Cerebellum are RGBA32 packs with label index in R — NOT baked colours.
    // NiiVue only paints them when colormapLabel is set (PAQD atlas shader).
    try {
      if (typeof vol.setColormapLabel === 'function') {
        vol.setColormapLabel(atlasCmap);
      } else if (typeof nv.setColormapLabel === 'function') {
        nv.setColormapLabel(i, atlasCmap);
      }
    } catch {
      /* non-fatal per volume */
    }
  }
  try {
    nv.updateGLVolume?.();
    nv.drawScene?.();
  } catch {
    /* non-fatal */
  }
}

function volumeDims(vol) {
  const d = vol?.dimsRAS || vol?.dims || vol?.hdr?.dims;
  if (!d || d.length < 3) return null;
  // NiiVue dimsRAS is typically [ndim, nx, ny, nz]
  if (d.length >= 4 && d[0] <= 7 && d[1] > 8) return [d[1], d[2], d[3]];
  if (d.length >= 3 && d[0] > 8) return [d[0], d[1], d[2]];
  if (d.length >= 4) return [d[1], d[2], d[3]];
  return null;
}

/** Scan overlay for a label index — handles scalar + interpolated RGBA atlases. */
function findVoxelForLabel(vol, labelIdx) {
  if (!vol || labelIdx == null) return null;
  const dims = volumeDims(vol);
  if (!dims) return null;
  const [nx, ny, nz] = dims;
  const frame = vol.frame4D || 0;
  const margin = Math.min(2, Math.floor(Math.min(nx, ny, nz) / 8));

  // Fast path: raw Uint8/Uint16 label volumes (e.g. PD25)
  const img = vol.img;
  const nVox = nx * ny * nz;
  if (img && img.length >= nVox && img.length < nVox * 3) {
    const hits = [];
    for (let z = margin; z < nz - margin; z++) {
      for (let y = margin; y < ny - margin; y++) {
        for (let x = margin; x < nx - margin; x++) {
          const i = x + nx * (y + ny * z);
          if (Number(img[i]) === labelIdx) hits.push([x, y, z]);
        }
      }
    }
    if (hits.length) return centroidVoxel(hits);
  }

  if (typeof vol.getValue !== 'function') return null;

  // Pass 1: tight near-integer match; Pass 2: looser (RGBA atlases)
  for (const tol of [0.2, 0.45]) {
    const hits = [];
    for (let z = margin; z < nz - margin; z++) {
      for (let y = margin; y < ny - margin; y++) {
        for (let x = margin; x < nx - margin; x++) {
          const raw = labelFromGetValue(vol.getValue(x, y, z, frame));
          if (!Number.isFinite(raw)) continue;
          if (Math.round(raw) !== labelIdx) continue;
          if (Math.abs(raw - labelIdx) > tol) continue;
          hits.push([x, y, z]);
        }
      }
    }
    if (hits.length) return centroidVoxel(hits);
  }
  return null;
}

function centroidVoxel(hits) {
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (const h of hits) {
    cx += h[0];
    cy += h[1];
    cz += h[2];
  }
  const n = hits.length;
  cx /= n;
  cy /= n;
  cz /= n;
  let best = hits[0];
  let bestD = Infinity;
  for (const h of hits) {
    const d = (h[0] - cx) ** 2 + (h[1] - cy) ** 2 + (h[2] - cz) ** 2;
    if (d < bestD) {
      bestD = d;
      best = h;
    }
  }
  return best;
}

function labelIndexMatching(re) {
  if (!atlasLabels || !re) return null;
  const i = atlasLabels.findIndex((l) => l && re.test(l));
  return i > 0 ? i : null;
}

function preferredLabelIndex() {
  if (!atlasLabels) return null;
  const prefs = ATLAS_SEED_PREFS[atlasId] || SEED_LABEL_PREFS;
  for (const re of prefs) {
    const i = labelIndexMatching(re);
    if (i) return i;
  }
  const i = atlasLabels.findIndex(
    (l, idx) => idx > 0 && l && String(l).trim() && !/^na$/i.test(l) && !/^air$/i.test(l),
  );
  return i > 0 ? i : null;
}

/** Scalar label from getValue — RGBA atlases return [R,G,B,A] with label in R. */
function labelFromGetValue(gv) {
  if (gv == null) return NaN;
  if (Array.isArray(gv)) return Number(gv[0]);
  return Number(gv);
}

function overlayLabelAtFrac(frac) {
  if (!nv?.volumes || !atlasLabels) return null;
  try {
    const mm =
      typeof nv.frac2mm === 'function' ? nv.frac2mm(frac, 0, true) : null;
    if (!mm) return null;
    for (let i = 1; i < nv.volumes.length; i++) {
      const vol = nv.volumes[i];
      if (!vol || typeof vol.mm2vox !== 'function') continue;
      const vox = vol.mm2vox(mm);
      const raw = labelFromGetValue(
        vol.getValue(vox[0], vox[1], vox[2], vol.frame4D),
      );
      if (!Number.isFinite(raw)) continue;
      const val = Math.round(raw);
      if (val > 0 && Math.abs(raw - val) <= 0.35 && atlasLabels[val]) {
        return atlasLabels[val];
      }
    }
  } catch {
    return null;
  }
  return null;
}

function setCrosshairFromOverlayVox(vol, vox) {
  if (!nv || !vol || !vox) return false;
  try {
    // Prefer explicit RAS mm (vox2frac alone can place far outside for some atlases)
    let mm = null;
    if (typeof vol.vox2mm === 'function' && vol.matRAS) {
      mm = vol.vox2mm(vox, vol.matRAS);
    }
    if (mm && Number.isFinite(mm[0])) {
      const frac = nv.mm2frac(mm);
      if (frac && frac.length >= 3 && Number.isFinite(frac[0])) {
        nv.scene.crosshairPos = frac.map((v) =>
          Math.min(0.95, Math.max(0.05, Number(v) || 0.5)),
        );
        return true;
      }
    }
    const volIdx = nv.volumes.indexOf(vol);
    if (typeof nv.vox2frac === 'function' && volIdx >= 0) {
      const frac = nv.vox2frac(vox, volIdx);
      if (frac && frac.length >= 3 && Number.isFinite(frac[0])) {
        nv.scene.crosshairPos = [
          Math.min(0.95, Math.max(0.05, Number(frac[0]) || 0.5)),
          Math.min(0.95, Math.max(0.05, Number(frac[1]) || 0.5)),
          Math.min(0.95, Math.max(0.05, Number(frac[2]) || 0.5)),
        ];
        return true;
      }
    }
    return false;
  } catch {
    return false;
  }
}

function fireLocation() {
  if (!nv) return;
  if (typeof nv.createOnLocationChange === 'function') {
    nv.createOnLocationChange();
  }
  nv.drawScene?.();
}

/** Atlas-aware mm fallbacks when voxel search fails. */
const SEED_MM_BY_ATLAS = {
  cit: [
    [6, 0, 9],
    [-6, 0, 9],
    [8, 2, 6],
    [-8, 2, 6],
  ],
  pd25: [
    [-5, -16, -8],
    [5, -16, -8],
    [-8, -12, -6],
    [0, -14, -10],
  ],
  cereb: [
    [0, -56, -30],
    [-20, -60, -32],
    [20, -60, -32],
    [-12, -52, -28],
  ],
  jul: [
    [-6, 0, 9],
    [-10, -18, 8],
    [-8, -80, 8],
    [-48, 12, 20],
  ],
};

const SEED_MM_CANDIDATES = SEED_MM_BY_ATLAS.cit;

/**
 * Move crosshair onto a preferred labelled voxel, then refresh readout.
 * Honours inbound deepLinkTarget from ?structure= / ?region=.
 */
function seedLocation() {
  if (!nv) return;
  try {
    const overlay = nv.volumes?.[1];
    const prefs = ATLAS_SEED_PREFS[atlasId] || SEED_LABEL_PREFS;
    const mmList = SEED_MM_BY_ATLAS[atlasId] || SEED_MM_CANDIDATES;

    // 0) Deep-link from 3D mesh / region query
    if (deepLinkTarget) {
      if (deepLinkTarget.mm && typeof nv.mm2frac === 'function') {
        const frac = nv.mm2frac(deepLinkTarget.mm);
        if (frac) {
          nv.scene.crosshairPos = frac;
          const name = overlayLabelAtFrac(frac);
          if (
            name &&
            (!deepLinkTarget.label || deepLinkTarget.label.test(name))
          ) {
            fireLocation();
            return;
          }
        }
      }
      if (deepLinkTarget.label && overlay) {
        const idx = labelIndexMatching(deepLinkTarget.label);
        if (idx) {
          const vox = findVoxelForLabel(overlay, idx);
          if (vox && setCrosshairFromOverlayVox(overlay, vox)) {
            fireLocation();
            return;
          }
        }
      }
    }

    // 1) Search overlay for preferred label (atlas-specific)
    const labelIdx = preferredLabelIndex();
    if (labelIdx && overlay) {
      const vox = findVoxelForLabel(overlay, labelIdx);
      if (vox && setCrosshairFromOverlayVox(overlay, vox)) {
        // Verify the landing label is sensible; otherwise keep searching
        const name = overlayLabelAtFrac(nv.scene.crosshairPos);
        if (name && (prefs.some((re) => re.test(name)) || name)) {
          fireLocation();
          return;
        }
      }
    }

    // 2) Curated mm points
    let anyLabelFrac = null;
    for (const mm of mmList) {
      if (typeof nv.mm2frac !== 'function') break;
      const frac = nv.mm2frac(mm);
      if (!frac) continue;
      nv.scene.crosshairPos = frac;
      const name = overlayLabelAtFrac(frac);
      if (!name) continue;
      if (prefs.some((re) => re.test(name))) {
        fireLocation();
        return;
      }
      if (!anyLabelFrac) anyLabelFrac = frac;
    }

    if (anyLabelFrac) nv.scene.crosshairPos = anyLabelFrac;
  } catch {
    /* keep default crosshair */
  }
  fireLocation();
}

function syncFrameControls() {
  const wrap = $('frame-wrap');
  if (!wrap || !nv?.volumes?.length) {
    if (wrap) wrap.hidden = true;
    return;
  }

  const vol = nv.volumes[0];
  const n = Number(vol.nFrame4D) || 1;
  const wants4D = Boolean(currentScan()?.is4D) && n > 1;
  wrap.hidden = !wants4D;
  if (!wants4D) return;

  const slider = $('frame');
  const valEl = $('frame-val');
  slider.max = String(n - 1);
  const cur = Math.min(Math.max(0, Number(vol.frame4D) || 0), n - 1);
  slider.value = String(cur);
  valEl.textContent = t('scans.frameVal', { frame: cur + 1, total: n });
}

function setFrame(frame) {
  if (!nv?.volumes?.length) return;
  const vol = nv.volumes[0];
  const n = Number(vol.nFrame4D) || 1;
  if (n <= 1) return;
  const clamped = Math.min(Math.max(0, Math.round(frame)), n - 1);
  if (typeof nv.setFrame4D === 'function') {
    nv.setFrame4D(vol.id, clamped);
  } else {
    vol.frame4D = clamped;
    nv.updateGLVolume?.();
    nv.drawScene?.();
  }
  $('frame-val').textContent = t('scans.frameVal', {
    frame: clamped + 1,
    total: n,
  });
  fireLocation();
}

async function load() {
  if (!nv) return;
  busy = true;
  const scan = currentScan();
  const atlas = ATLASES.find((a) => a.id === atlasId);
  const useAtlas = atlas?.files && overlaysAllowed();
  showOverlay(t('scans.loading', { name: t(`scan.${scan.id}`).toLowerCase() }));

  const opacity = Number($('opacity').value);
  const list = [
    { url: assetUrl(scan.file), colormap: scan.colormap || 'gray' },
  ];
  if (useAtlas) {
    for (const file of atlas.files) {
      // No continuous colormap — labels get setColormapLabel after load
      list.push({
        url: assetUrl(file),
        opacity,
      });
    }
  }

  atlasLabels = null;
  atlasCmap = null;
  lastRegionName = null;
  updateRegionNote(null);
  try {
    const jobs = [nv.loadVolumes(list)];
    if (useAtlas && atlas.labels) {
      jobs.push(
        fetchAtlasMeta(atlas.labels).then((meta) => {
          atlasLabels = meta.labels;
          atlasCmap = meta.cmap;
        }),
      );
    }
    await Promise.all(jobs);

    // Volumes are on screen — never report later UI/seed issues as a load failure
    try {
      applyAtlasColormaps();
    } catch {
      /* optional */
    }
    try {
      applyView();
      syncFrameControls();
      ensureMriVisible();
      setOverlayOpacity(Number($('opacity')?.value) || DEFAULT_OPACITY);
    } catch {
      /* non-fatal display tweaks */
    }
    hideOverlay();
    requestAnimationFrame(() => {
      try {
        seedLocation();
      } catch {
        /* non-fatal */
      }
    });
  } catch (e) {
    showOverlay(
      t('scans.loadError', {
        file: scan.file,
        error: e.message || e,
      }),
      true,
    );
  } finally {
    busy = false;
  }
}

function initTip() {
  const tip = $('viewer-tip');
  const dismiss = $('tip-dismiss');
  if (!tip) return;

  let seen = false;
  try {
    seen = localStorage.getItem(TIP_KEY) === '1';
  } catch {
    /* ignore */
  }

  if (seen) {
    tip.hidden = true;
    return;
  }

  tip.hidden = false;
  tip.classList.add('is-visible');

  const hide = () => {
    tip.hidden = true;
    tip.classList.remove('is-visible');
    try {
      localStorage.setItem(TIP_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  dismiss?.addEventListener('click', hide);
  // Dismiss on any stage interaction so the tip never eats drags
  document.querySelector('.page--scans .stage')?.addEventListener(
    'pointerdown',
    hide,
    { once: true, capture: true },
  );
}

/**
 * Make left-click / touch move the crosshair.
 * NiiVue expects device pixels (CSS × dpr). Our earlier helper used CSS pixels,
 * so taps often mapped outside the tile and the crosshair never moved.
 */
function bindCrosshairInteraction() {
  if (!nv) return;

  try {
    nv.opts.dragModePrimary = DRAG_CROSSHAIR;
    nv.opts.dragMode = DRAG_CONTRAST;
    nv.setMouseEventConfig?.({
      leftButton: { primary: DRAG_CROSSHAIR },
      rightButton: DRAG_CONTRAST,
      centerButton: DRAG_PAN,
    });
    nv.setTouchEventConfig?.({
      singleTouch: DRAG_CROSSHAIR,
      doubleTouch: DRAG_PAN,
    });
  } catch {
    /* non-fatal */
  }

  const canvas = $('gl');
  const stage = document.querySelector('.page--scans .stage');
  if (!canvas) return;

  canvas.style.touchAction = 'none';
  if (stage) stage.style.touchAction = 'none';

  let dragging = false;
  let pointerId = null;

  const moveToEvent = (ev) => {
    if (!nv || typeof nv.canvasPos2frac !== 'function') return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Number(nv.uiData?.dpr) || window.devicePixelRatio || 1;
    const x = (ev.clientX - rect.left) * dpr;
    const y = (ev.clientY - rect.top) * dpr;
    try {
      const frac = nv.canvasPos2frac([x, y]);
      if (!frac || frac.length < 3) return;
      if (frac.some((v) => !Number.isFinite(v) || v < 0 || v > 1)) return;
      nv.scene.crosshairPos = frac.map((v) =>
        Math.min(0.99, Math.max(0.01, Number(v))),
      );
      nv.drawScene?.();
      fireLocation();
    } catch {
      /* ignore */
    }
  };

  const onDown = (ev) => {
    if (ev.target?.closest?.('button, a, input, label')) return;
    if (ev.pointerType === 'mouse' && ev.button !== 0) return;
    dragging = true;
    pointerId = ev.pointerId;
    moveToEvent(ev);
  };

  const onMove = (ev) => {
    if (!dragging || (pointerId != null && ev.pointerId !== pointerId)) return;
    moveToEvent(ev);
  };

  const onUp = (ev) => {
    if (!dragging) return;
    if (pointerId != null && ev.pointerId !== pointerId) return;
    dragging = false;
    pointerId = null;
  };

  // Listen on the canvas so coords match NiiVue's own mouse path
  canvas.addEventListener('pointerdown', onDown, { passive: true });
  canvas.addEventListener('pointermove', onMove, { passive: true });
  canvas.addEventListener('pointerup', onUp, { passive: true });
  canvas.addEventListener('pointercancel', onUp, { passive: true });
}

function ensureMriVisible() {
  if (!nv?.volumes?.length) return;
  try {
    // Base MRI/CT must stay fully opaque under the atlas
    if (typeof nv.setOpacity === 'function') nv.setOpacity(0, 1);
    const base = nv.volumes[0];
    if (base) {
      base.opacity = 1;
      const gmin = Number(base.global_min);
      const gmax = Number(base.global_max);
      const cmin = Number(base.cal_min);
      const cmax = Number(base.cal_max);
      // Recover if a contrast-drag crushed the window to flat/black
      if (
        Number.isFinite(cmin) &&
        Number.isFinite(cmax) &&
        cmax - cmin < 1e-3 &&
        Number.isFinite(gmin) &&
        Number.isFinite(gmax) &&
        gmax > gmin
      ) {
        base.cal_min = gmin;
        base.cal_max = gmax;
      }
    }
    nv.updateGLVolume?.();
    nv.drawScene?.();
  } catch {
    /* ignore */
  }
}

async function main() {
  initTheme((theme) => applyNvTheme(theme));
  initLang(() => {
    renderControls();
    syncFrameControls();
    updateRegionNote(lastRegionName);
    const tipText = $('tip-text');
    if (tipText) tipText.textContent = t('scans.tip');
    const msg = $('overlay-msg');
    if (!$('overlay').hidden && !$('overlay').classList.contains('err')) {
      const scan = currentScan();
      if (scan) msg.textContent = t('scans.loading', { name: t(`scan.${scan.id}`).toLowerCase() });
    }
  });
  onLangChange(() => {
    renderControls();
    syncFrameControls();
    updateRegionNote(lastRegionName);
  });

  // Honour ?structure= / ?region= before first load
  if (deepLinkTarget?.atlas) {
    scanId = 'mni152';
    atlasId = deepLinkTarget.atlas;
    viewId = 'multi';
  }

  try {
    nv = new Niivue({
      backColor: NV_BG[getTheme()] || NV_BG.dark,
      crosshairColor: [0.13, 0.83, 0.93, 1],
      show3Dcrosshair: true,
      isColorbar: false,
      loadingText: '',
      // Fill the stage: equal tiles + always show 3D in the 4th cell
      multiplanarForceRender: true,
      multiplanarShowRender: 1, // ALWAYS
      multiplanarEqualSize: true,
      multiplanarPadPixels: 0,
      multiplanarLayout: MULTIPLANAR_AUTO,
      // Primary pointer / single-touch moves the crosshair
      dragModePrimary: DRAG_CROSSHAIR,
      dragMode: DRAG_CONTRAST,
      touchEventConfig: {
        singleTouch: DRAG_CROSSHAIR,
        doubleTouch: DRAG_PAN,
      },
    });
    nv.onLocationChange = onLocation;
    await nv.attachTo('gl');
    applyNvTheme(getTheme());
    bindCrosshairInteraction();
    // Window resize only — NiiVue already observes the canvas parent.
    // Extra stage ResizeObserver + scrollIntoView caused a grow/zoom loop while dragging.
    window.addEventListener('resize', scheduleRefitNvStage);
    refitNvStage(true);
    requestAnimationFrame(() => {
      refitNvStage(true);
      requestAnimationFrame(() => refitNvStage(true));
    });
  } catch {
    showOverlay(t('scans.webglError'), true);
    return;
  }

  const opacityEl = $('opacity');
  opacityEl.value = String(DEFAULT_OPACITY);
  $('opacity-val').textContent = DEFAULT_OPACITY.toFixed(2);
  opacityEl.addEventListener('input', (ev) => {
    const v = Number(ev.target.value);
    $('opacity-val').textContent = v.toFixed(2);
    setOverlayOpacity(v);
  });

  $('frame')?.addEventListener('input', (ev) => {
    setFrame(Number(ev.target.value));
  });

  initTip();
  renderControls();
  await load();
}

main();

window.__neyronAfterSetLang = function (lang) {
  try { syncFromSiteShell(lang); } catch (_) {}
};
