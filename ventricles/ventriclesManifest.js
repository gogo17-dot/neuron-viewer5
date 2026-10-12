/**
 * Ventricular system GLBs from public/ventricles_glb.
 * Loaded at native atlas transforms.
 */
export const VENTRICLES_GLB_FILES = [
  '01_Lateral_ventricle_L.glb',
  '02_Lateral_ventricle_R.glb',
  '03_Third_ventricle.glb',
  '04_Cerebral_aqueduct.glb',
  '05_Fourth_ventricle.glb',
  '06_Choroid_plexus_L.glb',
  '07_Choroid_plexus_R.glb',
];

export const VENTRICLES_FOLDER = 'ventricles_glb';

/** CSF spaces are slightly translucent so the system reads as fluid cavities. */
export function isCsfKey(key) {
  return /ventricle|aqueduct/i.test(key) && !/choroid/i.test(key);
}

export function csfOpacityForKey(key) {
  if (isCsfKey(key)) return 0.72;
  return 1;
}
