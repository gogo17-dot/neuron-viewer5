/**
 * Diencephalon GLBs from public/diencephalon_glb.
 * Brainstem context from public/brainstem_glb.
 */
export const DIENCEPHALON_GLB_FILES = [
  '01_Thalamus_L.glb',
  '01_Thalamus_R.glb',
  '02_Hypothalamus.glb',
  '03_Mammillary_body_L.glb',
  '03_Mammillary_body_R.glb',
  '04_Habenula.glb',
  '05_Lateral_geniculate_body_L.glb',
  '05_Lateral_geniculate_body_R.glb',
  '06_Medial_geniculate_body_L.glb',
  '06_Medial_geniculate_body_R.glb',
  '07_Optic_chiasm_L.glb',
  '07_Optic_chiasm_R.glb',
  '08_Optic_tract_L.glb',
  '08_Optic_tract_R.glb',
  '09_Stria_medullaris_L.glb',
  '09_Stria_medullaris_R.glb',
  '10_Posterior_commissure.glb',
  '11_Third_ventricle.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
];

export const DIENCEPHALON_FOLDER = 'diencephalon_glb';

export function resolveDiencephalonAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: DIENCEPHALON_FOLDER,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || DIENCEPHALON_FOLDER,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return key === 'Brainstem';
}

/** Brainstem: visible only — clicks pass through. */
export function isNonInteractiveContextKey(key) {
  return key === 'Brainstem';
}

export function isCsfKey(key) {
  return key === '11_Third_ventricle';
}

export function ghostOpacityForKey(key) {
  if (key === 'Brainstem') return 0.18;
  if (isCsfKey(key)) return 0.72;
  return 1;
}
