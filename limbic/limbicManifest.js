/**
 * Limbic system GLBs from public/limbic_glb.
 * Loaded at native atlas transforms.
 */
export const LIMBIC_GLB_FILES = [
  '01_Hippocampus_L.glb',
  '02_Hippocampus_R.glb',
  '03_Amygdala_L.glb',
  '04_Amygdala_R.glb',
  '05_Parahippocampal_gyrus_L.glb',
  '06_Parahippocampal_gyrus_R.glb',
  '07_Fornix_L.glb',
  '08_Fornix_R.glb',
  '09_Mammillary_body_L.glb',
  '10_Mammillary_body_R.glb',
  '11_Stria_medullaris_L.glb',
  '12_Stria_medullaris_R.glb',
  '13_Habenula.glb',
  '14_Septal_nuclei.glb',
  '15_Septum_pellucidum.glb',
  '16_Cingulate_gyrus_anterior_L.glb',
  '17_Cingulate_gyrus_anterior_R.glb',
  '18_Cingulate_gyrus_posterior_L.glb',
  '19_Cingulate_gyrus_posterior_R.glb',
  '20_Cingulate_gyrus_dorsal_L.glb',
  '21_Cingulate_gyrus_dorsal_R.glb',
  '22_Cingulate_gyrus_ventral_L.glb',
  '23_Cingulate_gyrus_ventral_R.glb',
  '24_Gyrus_rectus_L.glb',
  '25_Gyrus_rectus_R.glb',
];

export const LIMBIC_FOLDER = 'limbic_glb';

/** Thin midline membrane — slight translucency so neighbours remain visible. */
export function isMembraneKey(key) {
  return key === '15_Septum_pellucidum';
}

export function membraneOpacityForKey(key) {
  if (isMembraneKey(key)) return 0.55;
  return 1;
}
