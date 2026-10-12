// Keys match exported .glb filenames (without extension).

const limbicStructures = {
  '01_Hippocampus_L': {
    title: 'HIPPOCAMPUS (LEFT)',
    titleAz: 'Hippocampus (sol)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The left hippocampus is a curved medial temporal structure essential for forming declarative and spatial memories. It includes cornu ammonis (CA1–CA4), dentate gyrus, and subiculum, folded into the floor of the temporal horn.\n\nIt receives entorhinal input via the perforant path and projects through the fornix toward mammillary bodies and septal nuclei (Papez circuit). Mesial temporal sclerosis and Alzheimer disease preferentially injure CA1 and entorhinal cortex.\n\nSeizures often arise here; left-sided damage classically impairs verbal memory more than visuospatial memory.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Hippocampus (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '02_Hippocampus_R': {
    title: 'HIPPOCAMPUS (RIGHT)',
    titleAz: 'Hippocampus (sağ)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The right hippocampus mirrors the left as the core of the medial temporal memory system, packing dentate gyrus and CA fields into the temporal lobe.\n\nIt participates in the same trisynaptic circuit and fornix outflow. Right-predominant injury more often affects nonverbal / visuospatial memory and navigation.\n\nVolume loss on MRI is a key biomarker in neurodegeneration, epilepsy work-up, and post-ictal imaging.',
    descriptionAz:
      'Hippocampus (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '03_Amygdala_L': {
    title: 'AMYGDALA (LEFT)',
    titleAz: 'Amygdala (sol)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The left amygdala sits anterior to the hippocampus in the medial temporal lobe and is the hub for threat detection, fear conditioning, and emotional tagging of memory.\n\nIt links olfactory, sensory, and prefrontal inputs to hypothalamus and brainstem autonomic centres. Kluver–Bucy–like features and emotional dysregulation can follow bilateral injury.\n\nIt is frequently involved in mesial temporal epilepsy and psychiatric imaging studies of anxiety and PTSD.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Amygdala (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '04_Amygdala_R': {
    title: 'AMYGDALA (RIGHT)',
    titleAz: 'Amygdala (sağ)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The right amygdala complements the left in rapid emotional appraisal and autonomic drive, with dense connections to orbitofrontal cortex and limbic striatum.\n\nAsymmetry of volume or metabolism appears in mood and anxiety disorders. Surgical or ischaemic damage alters fear learning and social–emotional processing.\n\nTogether the amygdalae sit at the anterior pole of the limbic “loop” into hypothalamus and brainstem.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Amygdala (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '05_Parahippocampal_gyrus_L': {
    title: 'PARAHIPPOCAMPAL GYRUS (LEFT)',
    titleAz: 'Parahippocampal Gyrus (sol)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The left parahippocampal gyrus forms the cortical ribbon along the medial temporal lobe, housing entorhinal and perirhinal cortices that gate neocortical traffic into hippocampus.\n\nIt supports scene/context memory and is an early site of Alzheimer tau and atrophy. The collateral sulcus separates it from fusiform cortex.\n\nLesions disrupt encoding of episodic context even when hippocampal remnant volume looks relatively spared.',
    descriptionAz:
      'Parahippocampal Gyrus (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '06_Parahippocampal_gyrus_R': {
    title: 'PARAHIPPOCAMPAL GYRUS (RIGHT)',
    titleAz: 'Parahippocampal Gyrus (sağ)',
    category: 'Medial temporal',
    categoryAz: 'Medial temporal',
    description:
      'The right parahippocampal gyrus mirrors the left gateway into hippocampus, with strong roles in spatial context and topographic memory.\n\nIt completes the medial temporal surface from uncus back toward the isthmus / retrosplenial region.\n\nImaging atrophy here tracks cognitive decline alongside hippocampal volume loss.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Parahippocampal Gyrus (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '07_Fornix_L': {
    title: 'FORNIX (LEFT)',
    titleAz: 'Fornix (sol)',
    category: 'Limbic pathways',
    categoryAz: 'Limbic pathways',
    description:
      'The left fornix carries the major hippocampal outflow: fimbria → crus → body → column, ending mainly in the mammillary body and septal region.\n\nIt is the white-matter arm of the Papez circuit. Compression by hydrocephalus, colloid cyst, or trauma can cause dense anterograde amnesia.\n\nOn MRI the crura arch under the corpus callosum before joining the body in the midline.',
    descriptionAz:
      'Fornix (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '08_Fornix_R': {
    title: 'FORNIX (RIGHT)',
    titleAz: 'Fornix (sağ)',
    category: 'Limbic pathways',
    categoryAz: 'Limbic pathways',
    description:
      'The right fornix is the paired hippocampal projection through the same fimbria–crus–body–column course to mammillary and septal targets.\n\nBilateral fornix injury produces severe memory loss; unilateral deficits are subtler but still clinically relevant after surgery near the ventricles.\n\nIt visually links the medial temporal lobe to the diencephalic limbic nodes in this atlas.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Fornix (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '09_Mammillary_body_L': {
    title: 'MAMMILLARY BODY (LEFT)',
    titleAz: 'Mammillary Body (sol)',
    category: 'Diencephalic limbic',
    categoryAz: 'Diencephalic limbic',
    description:
      'The left mammillary body is a hypothalamic nucleus on the ventral diencephalon that receives fornix input and projects via the mammillothalamic tract to anterior thalamus.\n\nIt is a classic site of damage in Wernicke–Korsakoff syndrome (thiamine deficiency), producing confabulation and dense amnesia.\n\nSmall paired swellings on the floor of the third ventricle mark them on sagittal MRI.',
    descriptionAz:
      'Mammillary Body (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '10_Mammillary_body_R': {
    title: 'MAMMILLARY BODY (RIGHT)',
    titleAz: 'Mammillary Body (sağ)',
    category: 'Diencephalic limbic',
    categoryAz: 'Diencephalic limbic',
    description:
      'The right mammillary body completes the paired diencephalic relay of the Papez circuit between fornix and anterior thalamic nuclei.\n\nAtrophy or T2 hyperintensity here supports Wernicke encephalopathy or chronic Korsakoff pathology.\n\nTogether they sit just posterior to the pituitary stalk on midline sagittal views.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Mammillary Body (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '11_Stria_medullaris_L': {
    title: 'STRIA MEDULLARIS (LEFT)',
    titleAz: 'Stria Medullaris (sol)',
    category: 'Limbic pathways',
    categoryAz: 'Limbic pathways',
    description:
      'The left stria medullaris thalami is a slender fibre bundle along the dorsomedial thalamus carrying septal and basal forebrain axons to the habenula.\n\nIt forms the upper rim of the third ventricle’s lateral wall and is a landmark in endoscopic third-ventricle surgery.\n\nIt links reward/aversion circuitry of the septal region to habenular modulation of monoamine systems.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Stria Medullaris (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '12_Stria_medullaris_R': {
    title: 'STRIA MEDULLARIS (RIGHT)',
    titleAz: 'Stria Medullaris (sağ)',
    category: 'Limbic pathways',
    categoryAz: 'Limbic pathways',
    description:
      'The right stria medullaris mirrors the left pathway from septal/basal forebrain territories into the habenular complex.\n\nDisruption alters habenular drive onto midbrain monoaminergic nuclei involved in mood and aversion.\n\nVisually it is the thin cord running toward the pineal / habenular region in this model.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Stria Medullaris (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '13_Habenula': {
    title: 'HABENULA',
    titleAz: 'Habenula',
    category: 'Diencephalic limbic',
    categoryAz: 'Diencephalic limbic',
    description:
      'The habenula is a small epithalamic nucleus (medial and lateral divisions) beside the pineal that receives stria medullaris input and projects via the fasciculus retroflexus to midbrain.\n\nIt encodes negative reward prediction and aversion, tightly coupled to serotonin and dopamine systems. Habenular hyperactivity is implicated in depression research.\n\nIt sits at the posterior third-ventricle roof — a tiny but powerful limbic node.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Habenula — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '14_Septal_nuclei': {
    title: 'SEPTAL NUCLEI',
    titleAz: 'Septal Nuclei',
    category: 'Basal forebrain limbic',
    categoryAz: 'Basal forebrain limbic',
    description:
      'The septal nuclei lie in the medial basal forebrain / septum, providing cholinergic and GABAergic modulation to hippocampus and receiving reciprocal fornix fibres.\n\nThey participate in reward, social behaviour, and hippocampal theta generation. Lesions or stimulation historically linked “septal rage” and pleasure circuits.\n\nThey sit just beneath the septum pellucidum near the anterior commissure / foramen of Monro region.',
    descriptionAz:
      'Septal Nuclei — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '15_Septum_pellucidum': {
    title: 'SEPTUM PELLUCIDUM',
    titleAz: 'Septum Pellucidum',
    category: 'Midline limbic',
    categoryAz: 'Midline limbic',
    description:
      'The septum pellucidum is a thin vertical membrane between the frontal horns of the lateral ventricles, spanning corpus callosum above and fornix below.\n\nIt is not a primary computational nucleus but frames the septal region and is a CSF-space landmark. Cavum septum pellucidum is a common developmental variant.\n\nAbsence or marked cavum can accompany midline anomalies; trauma may tear it.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Septum Pellucidum — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '16_Cingulate_gyrus_anterior_L': {
    title: 'ANTERIOR CINGULATE (LEFT)',
    titleAz: 'Anterior Cingulate (sol)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Left anterior cingulate cortex (ACC) wraps above the corpus callosum and integrates pain affect, conflict monitoring, motivation, and autonomic drive.\n\nIt connects to prefrontal cortex, amygdala, and thalamus. Hypometabolism or surgical targets (cingulotomy) relate to depression, OCD, and chronic pain.\n\nIt is the “affective–executive” pole of the limbic cortical belt.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Anterior Cingulate (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '17_Cingulate_gyrus_anterior_R': {
    title: 'ANTERIOR CINGULATE (RIGHT)',
    titleAz: 'Anterior Cingulate (sağ)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Right anterior cingulate mirrors left ACC roles in emotion–cognition coupling, error monitoring, and visceral–emotional awareness.\n\nAsymmetry appears in mood-disorder imaging. It forms the rostral arc of the cingulate gyrus toward the subgenual / pregenual region.\n\nClinically it is a frequent target in functional neurosurgery and psychiatric neuromodulation.',
    descriptionAz:
      'Anterior Cingulate (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '18_Cingulate_gyrus_posterior_L': {
    title: 'POSTERIOR CINGULATE (LEFT)',
    titleAz: 'Posterior Cingulate (sol)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Left posterior cingulate cortex (PCC) is a default-mode hub linking autobiographical memory, spatial orientation, and internally directed thought.\n\nIt is among the earliest hypometabolic regions in Alzheimer disease and connects strongly to hippocampus and precuneus / retrosplenial cortex.\n\nDamage disrupts familiarity, navigation context, and self-referential processing.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Posterior Cingulate (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '19_Cingulate_gyrus_posterior_R': {
    title: 'POSTERIOR CINGULATE (RIGHT)',
    titleAz: 'Posterior Cingulate (sağ)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Right posterior cingulate completes the caudal cingulate belt toward the isthmus and retrosplenial region.\n\nIt participates in the same memory–default-mode network and is sensitive to early neurodegenerative change.\n\nTogether with hippocampus it closes the cortical side of classic limbic circuits.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Posterior Cingulate (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '20_Cingulate_gyrus_dorsal_L': {
    title: 'DORSAL CINGULATE (LEFT)',
    titleAz: 'Dorsal Cingulate (sol)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Left dorsal (mid) cingulate spans cognitive control and skeletomotor zones above the callosal body, bridging ACC and PCC territories.\n\nIt supports attention to action, response selection, and pain localisation components distinct from affective ACC.\n\nIn this atlas it fills the superior cingulate ribbon between anterior and posterior segments.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Dorsal Cingulate (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '21_Cingulate_gyrus_dorsal_R': {
    title: 'DORSAL CINGULATE (RIGHT)',
    titleAz: 'Dorsal Cingulate (sağ)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Right dorsal cingulate mirrors the mid-cingulate cognitive–motor belt on the right medial wall.\n\nIt contributes to action monitoring and sensorimotor integration within limbic–prefrontal networks.\n\nSegmenting it clarifies how cingulate function shifts from affect (anterior) to memory (posterior).\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Dorsal Cingulate (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '22_Cingulate_gyrus_ventral_L': {
    title: 'VENTRAL CINGULATE (LEFT)',
    titleAz: 'Ventral Cingulate (sol)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Left ventral / subgenual cingulate (around BA25 and adjacent cortex) sits below the genu of the corpus callosum and is tightly linked to mood and autonomic state.\n\nIt is a well-known deep-brain / cortical stimulation target in treatment-resistant depression.\n\nDense amygdala and hypothalamic connections make it a visceral–emotional node of the limbic cortex.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Ventral Cingulate (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '23_Cingulate_gyrus_ventral_R': {
    title: 'VENTRAL CINGULATE (RIGHT)',
    titleAz: 'Ventral Cingulate (sağ)',
    category: 'Cingulate',
    categoryAz: 'Cingulate',
    description:
      'Right ventral cingulate complements the subgenual mood circuit on the right medial frontal surface.\n\nMetabolic and connectivity changes here track depressive states and treatment response.\n\nIt anchors the inferior arc of cingulate limbic cortex beneath the callosal genu.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Ventral Cingulate (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '24_Gyrus_rectus_L': {
    title: 'GYRUS RECTUS (LEFT)',
    titleAz: 'Gyrus Rectus (sol)',
    category: 'Orbitofrontal limbic',
    categoryAz: 'Orbitofrontal limbic',
    description:
      'Left gyrus rectus is the medial orbitofrontal strip beside the olfactory sulcus, involved in reward valuation, olfactory–emotional linking, and social decision-making.\n\nIt belongs to the orbitofrontal–limbic continuum continuous with ventral medial prefrontal cortex.\n\nOrbital trauma, meningioma, or frontotemporal degeneration here alters judgement and impulse control.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Gyrus Rectus (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '25_Gyrus_rectus_R': {
    title: 'GYRUS RECTUS (RIGHT)',
    titleAz: 'Gyrus Rectus (sağ)',
    category: 'Orbitofrontal limbic',
    categoryAz: 'Orbitofrontal limbic',
    description:
      'Right gyrus rectus mirrors left medial orbitofrontal cortex in value-based choice and affective olfactory processing.\n\nIt closes the ventral frontal limbic surface toward the midline olfactory groove.\n\nTogether the gyri recti frame the inferior frontal contribution to limbic behaviour circuits.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Gyrus Rectus (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
};

export const LIMBIC_RELATIONS = {
  '01_Hippocampus_L': [
    '02_Hippocampus_R',
    '05_Parahippocampal_gyrus_L',
    '07_Fornix_L',
    '03_Amygdala_L',
  ],
  '02_Hippocampus_R': [
    '01_Hippocampus_L',
    '06_Parahippocampal_gyrus_R',
    '08_Fornix_R',
    '04_Amygdala_R',
  ],
  '03_Amygdala_L': ['04_Amygdala_R', '01_Hippocampus_L', '05_Parahippocampal_gyrus_L'],
  '04_Amygdala_R': ['03_Amygdala_L', '02_Hippocampus_R', '06_Parahippocampal_gyrus_R'],
  '05_Parahippocampal_gyrus_L': [
    '06_Parahippocampal_gyrus_R',
    '01_Hippocampus_L',
    '03_Amygdala_L',
  ],
  '06_Parahippocampal_gyrus_R': [
    '05_Parahippocampal_gyrus_L',
    '02_Hippocampus_R',
    '04_Amygdala_R',
  ],
  '07_Fornix_L': [
    '08_Fornix_R',
    '01_Hippocampus_L',
    '09_Mammillary_body_L',
    '14_Septal_nuclei',
  ],
  '08_Fornix_R': [
    '07_Fornix_L',
    '02_Hippocampus_R',
    '10_Mammillary_body_R',
    '14_Septal_nuclei',
  ],
  '09_Mammillary_body_L': ['10_Mammillary_body_R', '07_Fornix_L'],
  '10_Mammillary_body_R': ['09_Mammillary_body_L', '08_Fornix_R'],
  '11_Stria_medullaris_L': ['12_Stria_medullaris_R', '13_Habenula', '14_Septal_nuclei'],
  '12_Stria_medullaris_R': ['11_Stria_medullaris_L', '13_Habenula', '14_Septal_nuclei'],
  '13_Habenula': ['11_Stria_medullaris_L', '12_Stria_medullaris_R'],
  '14_Septal_nuclei': [
    '15_Septum_pellucidum',
    '07_Fornix_L',
    '08_Fornix_R',
    '11_Stria_medullaris_L',
  ],
  '15_Septum_pellucidum': ['14_Septal_nuclei', '07_Fornix_L', '08_Fornix_R'],
  '16_Cingulate_gyrus_anterior_L': [
    '17_Cingulate_gyrus_anterior_R',
    '20_Cingulate_gyrus_dorsal_L',
    '22_Cingulate_gyrus_ventral_L',
  ],
  '17_Cingulate_gyrus_anterior_R': [
    '16_Cingulate_gyrus_anterior_L',
    '21_Cingulate_gyrus_dorsal_R',
    '23_Cingulate_gyrus_ventral_R',
  ],
  '18_Cingulate_gyrus_posterior_L': [
    '19_Cingulate_gyrus_posterior_R',
    '20_Cingulate_gyrus_dorsal_L',
    '01_Hippocampus_L',
  ],
  '19_Cingulate_gyrus_posterior_R': [
    '18_Cingulate_gyrus_posterior_L',
    '21_Cingulate_gyrus_dorsal_R',
    '02_Hippocampus_R',
  ],
  '20_Cingulate_gyrus_dorsal_L': [
    '21_Cingulate_gyrus_dorsal_R',
    '16_Cingulate_gyrus_anterior_L',
    '18_Cingulate_gyrus_posterior_L',
  ],
  '21_Cingulate_gyrus_dorsal_R': [
    '20_Cingulate_gyrus_dorsal_L',
    '17_Cingulate_gyrus_anterior_R',
    '19_Cingulate_gyrus_posterior_R',
  ],
  '22_Cingulate_gyrus_ventral_L': [
    '23_Cingulate_gyrus_ventral_R',
    '16_Cingulate_gyrus_anterior_L',
    '24_Gyrus_rectus_L',
  ],
  '23_Cingulate_gyrus_ventral_R': [
    '22_Cingulate_gyrus_ventral_L',
    '17_Cingulate_gyrus_anterior_R',
    '25_Gyrus_rectus_R',
  ],
  '24_Gyrus_rectus_L': [
    '25_Gyrus_rectus_R',
    '22_Cingulate_gyrus_ventral_L',
  ],
  '25_Gyrus_rectus_R': [
    '24_Gyrus_rectus_L',
    '23_Cingulate_gyrus_ventral_R',
  ],
};

export default limbicStructures;
