/**
 * Bridge between 3D mesh structure keys and MRI atlas targets.
 * Used by the cortex viewer (outbound link) and ../brain-scans/index.html (inbound seed).
 */

/** @typedef {{ atlas: string, label: RegExp, mm?: number[] }} ScanTarget */

/** @type {Record<string, ScanTarget>} */
export const STRUCTURE_TO_SCAN = {
  'Striatum_Putamen.l': {
    atlas: 'cit',
    label: /L Putamen/i,
    mm: [6, 0, 9],
  },
  'Striatum_Putamen.r': {
    atlas: 'cit',
    label: /R Putamen/i,
    mm: [-6, 0, 9],
  },
  'Striatum_Caudate nucleus.l': {
    atlas: 'cit',
    label: /L Caudate/i,
    mm: [-12, 10, 10],
  },
  'Striatum_Caudate nucleus.r': {
    atlas: 'cit',
    label: /R Caudate/i,
    mm: [12, 10, 10],
  },
  'Striatum_Globus pallidus.l': {
    atlas: 'cit',
    label: /L Globus Pallidus/i,
    mm: [-18, 0, 0],
  },
  'Striatum_Globus pallidus.r': {
    atlas: 'cit',
    label: /R Globus Pallidus/i,
    mm: [18, 0, 0],
  },
  'Striatum_Lentiform nucleus.l': {
    atlas: 'cit',
    label: /L Putamen/i,
    mm: [6, 0, 9],
  },
  'Striatum_Lentiform nucleus.r': {
    atlas: 'cit',
    label: /R Putamen/i,
    mm: [-6, 0, 9],
  },
  'BasalForebrain_Amygdaloid body.l': {
    atlas: 'cit',
    label: /L Extended Amygdala/i,
    mm: [-22, -4, -16],
  },
  'BasalForebrain_Amygdaloid body.r': {
    atlas: 'cit',
    label: /R Extended Amygdala/i,
    mm: [22, -4, -16],
  },
  'BasalForebrain_Septal nuclei': {
    atlas: 'cit',
    label: /Accumbens/i,
    mm: [-8, 10, -6],
  },
  'Diencephalon_Thalamus.l': {
    atlas: 'pd25',
    label: /Left thalamus/i,
    mm: [-10, -18, 8],
  },
  'Diencephalon_Thalamus.r': {
    atlas: 'pd25',
    label: /Right thalamus/i,
    mm: [10, -18, 8],
  },
  Diencephalon_Hypothalamus: {
    atlas: 'cit',
    label: /Hypothalamus/i,
    mm: [0, -4, -8],
  },
  Diencephalon_Habenula: {
    atlas: 'cit',
    label: /Habenular/i,
    mm: [2, -26, 2],
  },
  'Diencephalon_Mamillary body.l': {
    atlas: 'cit',
    label: /Mammillary/i,
    mm: [-3, -10, -12],
  },
  'Diencephalon_Mamillary body.r': {
    atlas: 'cit',
    label: /Mammillary/i,
    mm: [3, -10, -12],
  },
  'Diencephalon_Lateral geniculate body.l': {
    atlas: 'jul',
    label: /LGN|geniculate/i,
    mm: [-22, -24, -4],
  },
  'Diencephalon_Lateral geniculate body.r': {
    atlas: 'jul',
    label: /LGN|geniculate/i,
    mm: [22, -24, -4],
  },
  'Diencephalon_Medial geniculate body.l': {
    atlas: 'jul',
    label: /MGN|geniculate/i,
    mm: [-16, -26, -4],
  },
  'Diencephalon_Medial geniculate body.r': {
    atlas: 'jul',
    label: /MGN|geniculate/i,
    mm: [16, -26, -4],
  },
  Cerebellum: {
    atlas: 'cereb',
    label: /Dentate|CrusI|Left_VI\b/i,
    mm: [0, -56, -30],
  },
  Brainstem: {
    atlas: 'pd25',
    label: /red nucleus|substantia nigra/i,
    mm: [-5, -16, -8],
  },
  Midbrain: {
    atlas: 'pd25',
    label: /red nucleus/i,
    mm: [-5, -16, -8],
  },
  'Insula.l': {
    atlas: 'jul',
    label: /insula|Ig\d|Id\d/i,
    mm: [-36, 4, 4],
  },
  'Insula.r': {
    atlas: 'jul',
    label: /insula|Ig\d|Id\d/i,
    mm: [36, 4, 4],
  },
  'Occipital_lobe.l': {
    atlas: 'jul',
    label: /hOc1|V1|CalcS/i,
    mm: [-8, -80, 8],
  },
  'Occipital_lobe.r': {
    atlas: 'jul',
    label: /hOc1|V1|CalcS/i,
    mm: [8, -80, 8],
  },
  'Frontal_lobe.l': {
    atlas: 'jul',
    label: /Area 4[ap]?\b|PreCG/i,
    mm: [-30, -12, 56],
  },
  'Frontal_lobe.r': {
    atlas: 'jul',
    label: /Area 4[ap]?\b|PreCG/i,
    mm: [30, -12, 56],
  },
  'Temporal_lobe.l': {
    atlas: 'jul',
    label: /Te 1\.|HESCHL/i,
    mm: [-42, -22, 10],
  },
  'Temporal_lobe.r': {
    atlas: 'jul',
    label: /Te 1\.|HESCHL/i,
    mm: [42, -22, 10],
  },
};

/**
 * Loose keyword → target for ?region=putamen style links.
 * @type {Record<string, ScanTarget>}
 */
export const REGION_TO_SCAN = {
  putamen: STRUCTURE_TO_SCAN['Striatum_Putamen.l'],
  caudate: STRUCTURE_TO_SCAN['Striatum_Caudate nucleus.l'],
  pallidum: STRUCTURE_TO_SCAN['Striatum_Globus pallidus.l'],
  thalamus: STRUCTURE_TO_SCAN['Diencephalon_Thalamus.l'],
  hypothalamus: STRUCTURE_TO_SCAN.Diencephalon_Hypothalamus,
  habenula: STRUCTURE_TO_SCAN.Diencephalon_Habenula,
  amygdala: STRUCTURE_TO_SCAN['BasalForebrain_Amygdaloid body.l'],
  cerebellum: STRUCTURE_TO_SCAN.Cerebellum,
  midbrain: STRUCTURE_TO_SCAN.Brainstem,
  brainstem: STRUCTURE_TO_SCAN.Brainstem,
  nigra: {
    atlas: 'pd25',
    label: /substantia nigra/i,
    mm: [-8, -14, -10],
  },
  stn: {
    atlas: 'pd25',
    label: /subthalamic/i,
    mm: [-10, -12, -6],
  },
  red: {
    atlas: 'pd25',
    label: /red nucleus/i,
    mm: [-5, -16, -8],
  },
  insula: STRUCTURE_TO_SCAN['Insula.l'],
  v1: STRUCTURE_TO_SCAN['Occipital_lobe.l'],
  m1: STRUCTURE_TO_SCAN['Frontal_lobe.l'],
  a1: STRUCTURE_TO_SCAN['Temporal_lobe.l'],
};

/**
 * Keyword heuristics for meshes that are not in STRUCTURE_TO_SCAN.
 * Matched against the structure key / title (underscores → spaces).
 */
const FUZZY_RULES = [
  { match: /putamen|lentiform/i, target: STRUCTURE_TO_SCAN['Striatum_Putamen.l'] },
  { match: /caudate/i, target: STRUCTURE_TO_SCAN['Striatum_Caudate nucleus.l'] },
  { match: /pallidus|pallidum/i, target: STRUCTURE_TO_SCAN['Striatum_Globus pallidus.l'] },
  { match: /amygdal/i, target: STRUCTURE_TO_SCAN['BasalForebrain_Amygdaloid body.l'] },
  { match: /septal|accumbens/i, target: STRUCTURE_TO_SCAN['BasalForebrain_Septal nuclei'] },
  { match: /thalamus/i, target: STRUCTURE_TO_SCAN['Diencephalon_Thalamus.l'] },
  { match: /hypothalam/i, target: STRUCTURE_TO_SCAN.Diencephalon_Hypothalamus },
  { match: /habenul/i, target: STRUCTURE_TO_SCAN.Diencephalon_Habenula },
  { match: /mammillar|mamillar/i, target: STRUCTURE_TO_SCAN['Diencephalon_Mamillary body.l'] },
  {
    match: /lateral geniculate|lgn/i,
    target: STRUCTURE_TO_SCAN['Diencephalon_Lateral geniculate body.l'],
  },
  {
    match: /medial geniculate|mgn/i,
    target: STRUCTURE_TO_SCAN['Diencephalon_Medial geniculate body.l'],
  },
  { match: /cerebell/i, target: STRUCTURE_TO_SCAN.Cerebellum },
  { match: /brainstem|midbrain|pons|medulla/i, target: STRUCTURE_TO_SCAN.Brainstem },
  { match: /insula/i, target: STRUCTURE_TO_SCAN['Insula.l'] },
  { match: /occipital/i, target: STRUCTURE_TO_SCAN['Occipital_lobe.l'] },
  { match: /frontal/i, target: STRUCTURE_TO_SCAN['Frontal_lobe.l'] },
  { match: /temporal|heschl/i, target: STRUCTURE_TO_SCAN['Temporal_lobe.l'] },
  {
    match: /parietal/i,
    target: { atlas: 'jul', label: /IPL|SPL|PFm|Area 2\b|PostCG/i, mm: [-40, -50, 40] },
  },
  {
    match: /limbic|cingul|hippocamp|fornix/i,
    target: { atlas: 'jul', label: /cingul|CA1|hippocamp|Subc/i, mm: [-6, -20, 30] },
  },
  {
    match: /optic|chiasm|tract/i,
    target: { atlas: 'jul', label: /hOc1|V1|CalcS/i, mm: [-8, -80, 8] },
  },
  {
    match: /ventricle|white matter|callosum|commissure|septum/i,
    target: STRUCTURE_TO_SCAN['Diencephalon_Thalamus.l'],
  },
  {
    match: /vestibulocochlear|viii|auditory|cn.?8/i,
    target: STRUCTURE_TO_SCAN['Temporal_lobe.l'],
  },
];

function textFromKey(structureKey) {
  return String(structureKey || '')
    .replace(/\.glb$/i, '')
    .replace(/[._]+/g, ' ')
    .trim();
}

/** Exact map entry, or fuzzy keyword match on the mesh key/title. */
export function resolveStructureTarget(structureKey) {
  if (!structureKey) return null;
  if (STRUCTURE_TO_SCAN[structureKey]) {
    return { key: structureKey, ...STRUCTURE_TO_SCAN[structureKey], exact: true };
  }
  const text = textFromKey(structureKey);
  // Prefer right-hemisphere variants when key ends with .r
  const wantRight = /\.r\b/i.test(structureKey) || /\bright\b/i.test(text);
  for (const rule of FUZZY_RULES) {
    if (!rule.match.test(text)) continue;
    let target = rule.target;
    if (wantRight && target?.label) {
      // Flip L→R label / mm when possible via REGION-like siblings
      const flipped = flipHemisphereTarget(structureKey, target);
      if (flipped) target = flipped;
    }
    return { key: structureKey, ...target, exact: false };
  }
  return null;
}

function flipHemisphereTarget(structureKey, target) {
  // If an exact right-side map exists for a known left key pattern, use it
  const rightKey = String(structureKey).replace(/\.l\b/i, '.r');
  if (rightKey !== structureKey && STRUCTURE_TO_SCAN[rightKey]) {
    return STRUCTURE_TO_SCAN[rightKey];
  }
  if (!target?.mm) return target;
  // Mirror mm X for right hemisphere
  return {
    ...target,
    mm: [-target.mm[0], target.mm[1], target.mm[2]],
    label: target.label,
  };
}

/** Mesh keys that have an MRI deep-link (exact or fuzzy). */
export function hasScanLink(structureKey) {
  return Boolean(resolveStructureTarget(structureKey));
}

/** Build ../brain-scans/index.html URL for a mesh structure. */
export function scansUrlForStructure(structureKey) {
  const resolved = resolveStructureTarget(structureKey);
  if (!resolved) return null;
  if (resolved.exact && STRUCTURE_TO_SCAN[structureKey]) {
    return `../brain-scans/./index.html?structure=${encodeURIComponent(structureKey)}`;
  }
  return `../brain-scans/index.html?q=${encodeURIComponent(structureKey)}`;
}

/** Resolve inbound query params on ../brain-scans/index.html. */
export function resolveScanQuery(search = window.location.search) {
  const params = new URLSearchParams(search);
  const structure = params.get('structure');
  if (structure) {
    const hit = resolveStructureTarget(structure);
    if (hit) return hit;
  }
  const q = (params.get('q') || '').trim();
  if (q) {
    const hit = resolveStructureTarget(q);
    if (hit) return hit;
    // Free-text region keyword
    const lower = q.toLowerCase();
    for (const [region, target] of Object.entries(REGION_TO_SCAN)) {
      if (lower.includes(region)) return { key: q, ...target };
    }
  }
  const region = (params.get('region') || '').trim().toLowerCase();
  if (region && REGION_TO_SCAN[region]) {
    return { key: region, ...REGION_TO_SCAN[region] };
  }
  return null;
}

/** Best-effort reverse: atlas label → cortex mesh key for “open in 3D”. */
export function structureKeyForLabel(label) {
  if (!label) return null;
  const s = String(label);
  if (/putamen|lentiform|FuP/i.test(s)) {
    return /right|^R\b|R Putamen|R Globus/i.test(s)
      ? 'Striatum_Putamen.r'
      : 'Striatum_Putamen.l';
  }
  if (/caudate/i.test(s)) {
    return /right|^R\b|R Caudate/i.test(s)
      ? 'Striatum_Caudate nucleus.r'
      : 'Striatum_Caudate nucleus.l';
  }
  if (/pallidus|pallidum/i.test(s)) {
    return /right|^R\b|R Globus/i.test(s)
      ? 'Striatum_Globus pallidus.r'
      : 'Striatum_Globus pallidus.l';
  }
  if (/amygdala/i.test(s)) {
    return /right|^R\b/i.test(s)
      ? 'BasalForebrain_Amygdaloid body.r'
      : 'BasalForebrain_Amygdaloid body.l';
  }
  if (/thalamus|pulvinar|VPL|VPM|MD\b|VA\b|VL/i.test(s)) {
    return /right|^R\b|Right thalamus/i.test(s)
      ? 'Diencephalon_Thalamus.r'
      : 'Diencephalon_Thalamus.l';
  }
  if (/hypothalam/i.test(s)) return 'Diencephalon_Hypothalamus';
  if (/habenul/i.test(s)) return 'Diencephalon_Habenula';
  if (/mammillar/i.test(s)) {
    return /right|^R\b/i.test(s)
      ? 'Diencephalon_Mamillary body.r'
      : 'Diencephalon_Mamillary body.l';
  }
  if (/red nucleus|substantia nigra|subthalamic|snc|snr|stn/i.test(s)) {
    return 'Brainstem';
  }
  if (/cerebell|crus|vermis|dentate|fastigial|interposed|Left_I|Right_I|_VI/i.test(s)) {
    return 'Cerebellum';
  }
  if (/insula|Ig\d|Id\d/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Insula.r' : 'Insula.l';
  }
  if (/hOc1|V1|CalcS|occipital/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Occipital_lobe.r' : 'Occipital_lobe.l';
  }
  if (/Area 4|PreCG|frontal/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Frontal_lobe.r' : 'Frontal_lobe.l';
  }
  if (/Te 1\.|HESCHL|temporal/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Temporal_lobe.r' : 'Temporal_lobe.l';
  }
  if (/IPL|SPL|PFm|PGa|PGp|PostCG|parietal/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Parietal_lobe.r' : 'Parietal_lobe.l';
  }
  if (/cingul|CA1|CA2|CA3|hippocamp|Subc|limbic/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Limbic_lobe.r' : 'Limbic_lobe.l';
  }
  if (/Area 44|Area 45|Fo\d|OFC|broca/i.test(s)) {
    return /right|^R\b/i.test(s) ? 'Frontal_lobe.r' : 'Frontal_lobe.l';
  }
  return null;
}

export function cortexUrlForLabel(label) {
  const key = structureKeyForLabel(label);
  if (!key) return null;
  return `./index.html?structure=${encodeURIComponent(key)}`;
}

