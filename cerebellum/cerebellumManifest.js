/**
 * Cerebellum GLBs: SUIT Anatom lobules + deep nuclei, Z-Anatomy peduncles,
 * ghost brainstem for context. Native atlas transforms — no per-mesh moves.
 */
export const CEREBELLUM_GLB_FILES = [
  'Culmen.glb',
  'Wing_of_central_lobule.glb',
  'Anterior_quadrangular_lobule.glb',
  'Declive.glb',
  'Posterior_quadrangular_lobule.glb',
  'Folium_of_vermis.glb',
  'Superior_semilunar_lobule.glb',
  'Tuber_of_vermis.glb',
  'Inferior_semilunar_lobule.glb',
  'Gracile_lobule.glb',
  'Pyramis_of_vermis.glb',
  'Biventral_lobule.glb',
  'Uvula_of_vermis.glb',
  'Tonsil_of_cerebellum.glb',
  'Nodule_of_vermis.glb',
  'Flocculus.glb',
  'Superior_cerebellar_peduncle.glb',
  'Middle_cerebellar_peduncle.glb',
  'Inferior_cerebellar_peduncle.glb',
  'Dentate_nucleus.glb',
  'Interposed_nucleus.glb',
  'Fastigial_nucleus.glb',
  { file: 'Brainstem.glb', key: 'Brainstem' },
];

export function resolveCerebellumAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return key === 'Brainstem';
}

export function isNonInteractiveContextKey(key) {
  return key === 'Brainstem';
}

export function ghostOpacityForKey(key, theme = 'dark') {
  if (key === 'Brainstem') return theme === 'light' ? 0.14 : 0.18;
  return 1;
}
