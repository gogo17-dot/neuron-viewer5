/**
 * Cranial nerve GLBs from public/cranial_nerves_glb.
 * Brainstem context from public/brainstem_glb.
 * Loaded at native atlas transforms.
 */
export const CRANIAL_NERVES_GLB_FILES = [
  '00_Skull_context.glb',
  '01_CN_I_Olfactory_L.glb',
  '01_CN_I_Olfactory_R.glb',
  '02_CN_II_Optic_L.glb',
  '02_CN_II_Optic_R.glb',
  '03_CN_III_Oculomotor_L.glb',
  '03_CN_III_Oculomotor_R.glb',
  '04_CN_IV_Trochlear_L.glb',
  '04_CN_IV_Trochlear_R.glb',
  '05_CN_V_Trigeminal_L.glb',
  '05_CN_V_Trigeminal_R.glb',
  '06_CN_VI_Abducens_L.glb',
  '06_CN_VI_Abducens_R.glb',
  '07_CN_VII_Facial_L.glb',
  '07_CN_VII_Facial_R.glb',
  '08_CN_VIII_Vestibulocochlear_L.glb',
  '08_CN_VIII_Vestibulocochlear_R.glb',
  '09_CN_IX_Glossopharyngeal_L.glb',
  '09_CN_IX_Glossopharyngeal_R.glb',
  '10_CN_X_Vagus_L.glb',
  '10_CN_X_Vagus_R.glb',
  '11_CN_XI_Accessory_L.glb',
  '11_CN_XI_Accessory_R.glb',
  '12_CN_XII_Hypoglossal_L.glb',
  '12_CN_XII_Hypoglossal_R.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
];

export const CRANIAL_NERVES_FOLDER = 'cranial_nerves_glb';

export function resolveCranialNerveAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: CRANIAL_NERVES_FOLDER,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || CRANIAL_NERVES_FOLDER,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return key === 'Brainstem' || key === '00_Skull_context';
}

export function ghostOpacityForKey(key) {
  if (key === '00_Skull_context' || key === 'Brainstem') return 0.14;
  return 1;
}

/** Skull / brainstem — visible context only; clicks pass through to nerves. */
export function isPassthroughContextKey(key) {
  return key === 'Brainstem' || key === '00_Skull_context';
}
