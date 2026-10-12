/**
 * Auditory pathway assets.
 * Most live in public/ear_pathway; brain context from public/brainstem_glb.
 */
export const EAR_PATHWAY_GLB_FILES = [
  '01_Auricle_external_ear_R.glb',
  '17_External_acoustic_meatus_R_approx.glb',
  '02_Tympanic_membrane.glb',
  '03_Malleus.glb',
  '04_Incus.glb',
  '05_Stapes.glb',
  '16_Temporal_bone_petrous_R.glb',
  '15_Bony_labyrinth_R.glb',
  '06_Vestibule_oval_window.glb',
  '07_Cochlea.glb',
  '18_Internal_acoustic_meatus_R_approx.glb',
  '08_Cochlear_nerve.glb',
  '09_Vestibulocochlear_nerve_VIII.glb',
  '10_Cochlear_nuclei_brainstem.glb',
  '11_Superior_olivary_complex.glb',
  '12_Inferior_colliculus.glb',
  '13_Medial_geniculate_body.glb',
  '14_Auditory_cortex_transverse_temporal_gyri.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
  { file: 'Temporal_lobe.r.glb', folder: 'brainstem_glb', key: 'Temporal_lobe.r' },
];

export function resolveEarAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: 'ear_pathway',
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || 'ear_pathway',
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export const EAR_PATHWAY_LAYERS = [
  { id: 'bone', label: 'Temporal bone' },
  { id: 'outer_middle', label: 'Outer / middle ear' },
  { id: 'inner', label: 'Inner ear' },
  { id: 'nerves', label: 'Nerves' },
  { id: 'central', label: 'Central pathway' },
  { id: 'context', label: 'Brain context' },
];

/** Ghosted context — see pathway contents through bone / brain. */
export function isGhostContextKey(key) {
  return /^(15_|16_)/.test(key) || key === 'Brainstem' || key === 'Temporal_lobe.r';
}

export function ghostOpacityForKey(key) {
  // Match temporal-bone shell opacity for all framing context
  if (key === 'Brainstem' || key === 'Temporal_lobe.r' || /^16_/.test(key)) {
    return 0.22;
  }
  if (/^15_/.test(key)) return 0.22;
  return 1;
}

/** Framing shells — visible but never pickable (click through to pathway). */
export function isPassthroughContextKey(key) {
  return (
    key === 'Brainstem' ||
    key === 'Temporal_lobe.r' ||
    /^15_/.test(key) ||
    /^16_/.test(key)
  );
}

export function earLayerIdForKey(key) {
  if (key === 'Brainstem' || key === 'Temporal_lobe.r') return 'context';
  if (/^(16_|18_)/.test(key)) return 'bone';
  if (/^(01_|02_|03_|04_|05_|17_)/.test(key)) return 'outer_middle';
  if (/^(06_|07_|15_)/.test(key)) return 'inner';
  if (/^(08_|09_)/.test(key)) return 'nerves';
  return 'central';
}

export function earGroupForKey(key) {
  if (key === 'Brainstem' || key === 'Temporal_lobe.r') {
    return { groupId: 'context', groupLabel: 'Brain context' };
  }
  if (/^(16_|18_)/.test(key)) {
    return { groupId: 'bone', groupLabel: 'Temporal bone & canals' };
  }
  if (/^(01_|02_|03_|04_|05_|17_)/.test(key)) {
    return { groupId: 'outer_middle', groupLabel: 'Outer & middle ear' };
  }
  if (/^(06_|07_|15_)/.test(key)) {
    return { groupId: 'inner', groupLabel: 'Inner ear' };
  }
  if (/^(08_|09_)/.test(key)) {
    return { groupId: 'nerves', groupLabel: 'Peripheral nerves' };
  }
  return { groupId: 'central', groupLabel: 'Central auditory pathway' };
}
