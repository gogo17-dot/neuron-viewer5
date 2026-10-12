/**
 * White-matter pathway GLBs from public/white_matter_glb.
 * Brainstem context from public/brainstem_glb.
 * Loaded at native atlas transforms.
 */
export const WHITE_MATTER_GLB_FILES = [
  '01_Corpus_callosum.glb',
  '02_Anterior_commissure.glb',
  '03_Posterior_commissure.glb',
  '04_Hippocampal_commissure.glb',
  '05_Fornix_L.glb',
  '06_Fornix_R.glb',
  '07_Stria_terminalis_L.glb',
  '08_Stria_terminalis_R.glb',
  '09_Cerebral_peduncle_L.glb',
  '10_Cerebral_peduncle_R.glb',
  '13_Medullary_pyramid_L.glb',
  '14_Medullary_pyramid_R.glb',
  '15_Superior_cerebellar_peduncle_L.glb',
  '16_Superior_cerebellar_peduncle_R.glb',
  '17_Optic_tract_L.glb',
  '18_Optic_tract_R.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
];

export const WHITE_MATTER_FOLDER = 'white_matter_glb';

export function resolveWhiteMatterAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: WHITE_MATTER_FOLDER,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || WHITE_MATTER_FOLDER,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return key === 'Brainstem';
}

export function ghostOpacityForKey(key) {
  // Match auditory-pathway temporal bone opacity
  if (key === 'Brainstem') return 0.22;
  return 1;
}

/** Visible framing only — clicks pass through to tracts. */
export function isPassthroughContextKey(key) {
  return key === 'Brainstem';
}
