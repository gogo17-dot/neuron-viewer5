/**
 * Optional optic-radiation DTI layer (HCP-1065 OR_L / OR_R) via NiiVue overlay.
 * Anatomical pathway GLBs stay in Three.js; streamlines are MNI-space measured fibres.
 */

import { Niivue } from 'https://unpkg.com/@niivue/niivue@0.69.0/dist/index.js';

const MNI_URL = 'https://niivue.github.io/niivue-demo-images/mni152.nii.gz';
const OR_TRACTS = [
  { url: 'tracts/OR_L.trk.gz', rgba255: [251, 191, 36, 255] },
  { url: 'tracts/OR_R.trk.gz', rgba255: [251, 191, 36, 255] },
];

let nv = null;
let loadPromise = null;

function ensureDom() {
  let panel = document.getElementById('or-dti-panel');
  if (panel) return panel;

  panel = document.createElement('div');
  panel.id = 'or-dti-panel';
  panel.className = 'or-dti-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <div class="or-dti-panel__head">
      <strong data-en="Optic radiation (DTI)" data-az="Optik radiasiya (DTI)">Optic radiation (DTI)</strong>
      <button type="button" class="or-dti-panel__close" id="or-dti-close" aria-label="Close">×</button>
    </div>
    <canvas id="or-dti-gl" class="or-dti-panel__canvas"></canvas>
    <p class="or-dti-panel__status" id="or-dti-status">Loading…</p>
    <p class="or-dti-panel__attr">
      Tractography from the HCP-1065 population-averaged atlas (Yeh, 2022),
      derived from Human Connectome Project data, licensed CC BY-SA 4.0.
    </p>
  `;
  const host = document.getElementById('app') || document.body;
  host.appendChild(panel);

  document.getElementById('or-dti-close')?.addEventListener('click', () => {
    setOrLayerVisible(false);
    const tog = document.getElementById('tog-or-dti');
    if (tog) tog.checked = false;
  });

  return panel;
}

async function ensureLoaded() {
  if (nv) return nv;
  if (loadPromise) return loadPromise;

  loadPromise = (async () => {
    const panel = ensureDom();
    const status = document.getElementById('or-dti-status');
    const canvas = document.getElementById('or-dti-gl');
    if (!canvas) throw new Error('OR DTI canvas missing');

    // Panel must be visible for WebGL size
    panel.hidden = false;
    nv = new Niivue({
      backColor: [0.027, 0.031, 0.039, 1],
      show3Dcrosshair: false,
      isColorbar: false,
    });
    await nv.attachTo('or-dti-gl');
    if (status) status.textContent = 'Loading MNI152…';
    await nv.loadVolumes([{ url: MNI_URL, opacity: 0.28, colormap: 'gray' }]);
    nv.setSliceType(nv.sliceTypeRender);

    if (status) status.textContent = 'Loading optic radiation…';
    await nv.loadMeshes(
      OR_TRACTS.map((spec) => ({
        url: spec.url,
        rgba255: spec.rgba255,
      })),
    );
    for (let i = 0; i < nv.meshes.length; i++) {
      const mesh = nv.meshes[i];
      const rgba = OR_TRACTS[i]?.rgba255 || [251, 191, 36, 255];
      nv.setMeshProperty(mesh.id, 'fiberColor', 'Fixed');
      nv.setMeshProperty(mesh.id, 'rgba255', rgba);
      nv.setMeshProperty(mesh.id, 'fiberRadius', 0.12);
      nv.setMeshProperty(mesh.id, 'fiberDither', 0.1);
    }
    if (status) status.hidden = true;
    nv.drawScene();
    return nv;
  })().catch((err) => {
    loadPromise = null;
    nv = null;
    const status = document.getElementById('or-dti-status');
    if (status) {
      status.hidden = false;
      status.textContent = `Failed: ${err?.message || err}`;
    }
    throw err;
  });

  return loadPromise;
}

export async function setOrLayerVisible(visible) {
  const panel = ensureDom();
  const tog = document.getElementById('tog-or-dti');
  if (tog) tog.checked = !!visible;

  if (!visible) {
    panel.hidden = true;
    return;
  }

  panel.hidden = false;
  await ensureLoaded();
  nv?.drawScene();
}

export function initOrDtiToggle() {
  ensureDom();
  let control = document.getElementById('or-dti-control');
  if (!control) {
    control = document.createElement('label');
    control.id = 'or-dti-control';
    control.className = 'or-dti-control';
    control.innerHTML = `
      <input type="checkbox" id="tog-or-dti" />
      <span data-en="Optic radiation (DTI)" data-az="Optik radiasiya (DTI)">Optic radiation (DTI)</span>
    `;
    const tip = document.getElementById('viewer-tip');
    const app = document.getElementById('app');
    if (tip?.parentNode) tip.parentNode.insertBefore(control, tip);
    else app?.appendChild(control);
  }

  document.getElementById('tog-or-dti')?.addEventListener('change', (ev) => {
    setOrLayerVisible(ev.target.checked).catch((err) => console.error(err));
  });
}
