/**
 * Visual pathway GLBs from public/visual_pathway_glb.
 * Skull context from public/cranial_nerves_glb.
 * Brainstem context from public/brainstem_glb.
 */
export const VISUAL_PATHWAY_GLB_FILES = [
  {
    file: '00_Skull_context.glb',
    folder: 'cranial_nerves_glb',
    key: '00_Skull_context',
  },
  '11_Eyeball_posterior_L.glb',
  '11_Eyeball_posterior_R.glb',
  '01_Retina_L.glb',
  '01_Retina_R.glb',
  '02_Optic_nerve_II_L.glb',
  '02_Optic_nerve_II_R.glb',
  '03_Optic_chiasm_L.glb',
  '03_Optic_chiasm_R.glb',
  '04_Optic_tract_L.glb',
  '04_Optic_tract_R.glb',
  '05_Lateral_geniculate_body_L.glb',
  '05_Lateral_geniculate_body_R.glb',
  '06_Superior_colliculus_L.glb',
  '06_Superior_colliculus_R.glb',
  '07_Primary_visual_cortex_V1_L.glb',
  '07_Primary_visual_cortex_V1_R.glb',
  '08_Cuneus_L.glb',
  '08_Cuneus_R.glb',
  '09_Lingual_gyrus_L.glb',
  '09_Lingual_gyrus_R.glb',
  '10_Occipital_pole_L.glb',
  '10_Occipital_pole_R.glb',
  '12_Occipital_lobe_L.glb',
  '12_Occipital_lobe_R.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
];

export const VISUAL_PATHWAY_FOLDER = 'visual_pathway_glb';

export function resolveVisualPathwayAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: VISUAL_PATHWAY_FOLDER,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || VISUAL_PATHWAY_FOLDER,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return (
    key === 'Brainstem' ||
    key === '00_Skull_context' ||
    key === '12_Occipital_lobe_L' ||
    key === '12_Occipital_lobe_R'
  );
}

/** Skull / brainstem / occipital shells: visible only — clicks pass through. */
export function isNonInteractiveContextKey(key) {
  return (
    key === 'Brainstem' ||
    key === '00_Skull_context' ||
    key === '12_Occipital_lobe_L' ||
    key === '12_Occipital_lobe_R'
  );
}

export function ghostOpacityForKey(key) {
  if (key === '00_Skull_context') return 0.14;
  if (key === '12_Occipital_lobe_L' || key === '12_Occipital_lobe_R') return 0.18;
  if (key === 'Brainstem') return 0.18;
  return 1;
}
