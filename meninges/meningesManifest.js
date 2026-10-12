/**
 * Meninges / dura GLBs from public/meninges_glb.
 * Skull + brainstem as non-interactive framing context.
 */
export const MENINGES_GLB_FILES = [
  {
    file: '00_Skull_context.glb',
    folder: 'cranial_nerves_glb',
    key: '00_Skull_context',
  },
  '01_Falx_cerebri.glb',
  '02_Tentorium_cerebelli_L.glb',
  '02_Tentorium_cerebelli_R.glb',
  '03_Cavernous_sinus_L.glb',
  '03_Cavernous_sinus_R.glb',
  '04_Spinal_dura.glb',
  { file: 'Brainstem.glb', folder: 'brainstem_glb', key: 'Brainstem' },
];

export const MENINGES_FOLDER = 'meninges_glb';

export function resolveMeningesAsset(entry) {
  if (typeof entry === 'string') {
    return {
      file: entry,
      folder: MENINGES_FOLDER,
      key: entry.replace(/\.glb$/i, ''),
    };
  }
  return {
    file: entry.file,
    folder: entry.folder || MENINGES_FOLDER,
    key: entry.key || String(entry.file).replace(/\.glb$/i, ''),
  };
}

export function isGhostContextKey(key) {
  return key === 'Brainstem' || key === '00_Skull_context';
}

/** Skull / brainstem: visible only — clicks pass through. */
export function isNonInteractiveContextKey(key) {
  return key === 'Brainstem' || key === '00_Skull_context';
}

/** Durals read better slightly translucent. */
export function isMembraneKey(key) {
  return /falx|tentorium|dura|cavernous/i.test(key);
}

export function ghostOpacityForKey(key, theme = 'dark') {
  if (key === '00_Skull_context') return theme === 'light' ? 0.1 : 0.12;
  if (key === 'Brainstem') return theme === 'light' ? 0.14 : 0.18;
  // Day mode: nearly solid so orange / blue / red stay readable on cream
  if (/falx|tentorium|dura/i.test(key)) return theme === 'light' ? 0.98 : 0.78;
  if (/cavernous/i.test(key)) return theme === 'light' ? 1 : 0.85;
  return 1;
}
