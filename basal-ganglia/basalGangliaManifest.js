/**
 * Basal ganglia GLBs from CIT168 / Z-Anatomy, plus a ghost brainstem for context.
 * Loaded at native atlas transforms — no per-structure repositioning.
 */
export const BASAL_GANGLIA_GLB_FILES = [
  'Caudate_nucleus.glb',
  'Putamen.glb',
  'Globus_pallidus.glb',
  'Subthalamic_nucleus.glb',
  'Substantia_nigra.glb',
  'Locus_coeruleus.glb',
  'Periaqueductal_grey.glb',
  { file: 'Brainstem.glb', key: 'Brainstem' },
];

export function resolveBasalGangliaAsset(entry) {
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

/** Brainstem: visible only — clicks pass through. */
export function isNonInteractiveContextKey(key) {
  return key === 'Brainstem';
}

export function ghostOpacityForKey(key, theme = 'dark') {
  if (key === 'Brainstem') return theme === 'light' ? 0.14 : 0.18;
  return 1;
}
