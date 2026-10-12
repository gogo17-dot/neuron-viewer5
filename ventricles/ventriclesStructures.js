// Keys match exported .glb filenames (without extension).

const ventriclesStructures = {
  '01_Lateral_ventricle_L': {
    title: 'LATERAL VENTRICLE (LEFT)',
    titleAz: 'Lateral Ventricle (sol)',
    category: 'Ventricles',
    categoryAz: 'Mədəciklər',
    description:
      'The left lateral ventricle is a C-shaped CSF cavity within the left cerebral hemisphere, with frontal (anterior), body, occipital (posterior), and temporal (inferior) horns. It communicates with the third ventricle through the left interventricular foramen (of Monro).\n\nCSF produced by choroid plexus flows from the lateral ventricles into the third ventricle. Enlargement may reflect hydrocephalus, atrophy (ex vacuo), or obstruction at the foramen of Monro.\n\nOn imaging it is the largest paired CSF space; asymmetry can be normal or pathologic depending on context.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Lateral Ventricle (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '02_Lateral_ventricle_R': {
    title: 'LATERAL VENTRICLE (RIGHT)',
    titleAz: 'Lateral Ventricle (sağ)',
    category: 'Ventricles',
    categoryAz: 'Mədəciklər',
    description:
      'The right lateral ventricle mirrors the left: a C-shaped CSF cavity with frontal, body, occipital, and temporal horns, draining through the right foramen of Monro into the third ventricle.\n\nIt is lined by ependyma and contains choroid plexus along the floor of the body and temporal horn / atrium region. Mass effect from hemisphere lesions can shift or compress this ventricle.\n\nTogether the lateral ventricles form the start of the intracranial CSF pathway toward the midline third ventricle.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Lateral Ventricle (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '03_Third_ventricle': {
    title: 'THIRD VENTRICLE',
    titleAz: 'Third Ventricle',
    category: 'Ventricles',
    categoryAz: 'Mədəciklər',
    description:
      'The third ventricle is a narrow midline slit between the thalami, continuous with the lateral ventricles via the foramina of Monro and with the cerebral aqueduct caudally. Its walls include hypothalamus inferiorly and the lamina terminalis anteriorly.\n\nRecesses (supraoptic, infundibular, pineal, and suprapineal) are useful MRI landmarks. Obstruction here or at the aqueduct produces triventricular hydrocephalus.\n\nIt is a key corridor in endoscopic third ventriculostomy (ETV), which fenestrates the floor to bypass aqueductal block.',
    descriptionAz:
      'Third Ventricle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '04_Cerebral_aqueduct': {
    title: 'CEREBRAL AQUEDUCT',
    titleAz: 'Cerebral Aqueduct',
    category: 'Ventricles',
    categoryAz: 'Mədəciklər',
    description:
      'The cerebral aqueduct (of Sylvius) is the narrow CSF channel through the midbrain linking the third and fourth ventricles. It is surrounded by periaqueductal grey.\n\nIt is the most common site of congenital or acquired obstruction causing non-communicating hydrocephalus. Stenosis, webs, tumours, or midbrain compression can block flow.\n\nOn sagittal MRI it appears as a thin CSF line between the tectum and tegmentum; dilation of the proximal ventricles with a normal fourth suggests aqueductal failure.',
    descriptionAz:
      'Cerebral Aqueduct — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '05_Fourth_ventricle': {
    title: 'FOURTH VENTRICLE',
    titleAz: 'Fourth Ventricle',
    category: 'Ventricles',
    categoryAz: 'Mədəciklər',
    description:
      'The fourth ventricle sits between the brainstem (floor) and cerebellum (roof). CSF enters from the aqueduct and exits to the subarachnoid space via the median aperture (Magendie) and lateral apertures (Luschka).\n\nIt is diamond-shaped in axial section, with a fastigium toward the cerebellar vermis. Posterior fossa masses, Chiari malformation, and outlet obstruction can enlarge it or trap CSF.\n\nFrom here CSF circulates around the brain and spinal cord before resorption at arachnoid granulations.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Fourth Ventricle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '06_Choroid_plexus_L': {
    title: 'CHOROID PLEXUS (LEFT)',
    titleAz: 'Choroid Plexus (sol)',
    category: 'Choroid plexus',
    categoryAz: 'Xoroid pleksus',
    description:
      'Choroid plexus is a vascular, villous epithelium that secretes most CSF. On the left it is prominent in the atrium / body of the lateral ventricle and extends into the temporal horn; smaller tufts relate to the third and fourth ventricles.\n\nCalcification of glomus choroideum is a common adult CT finding. Tumours (papilloma, carcinoma) and haemorrhage into plexus can occur here.\n\nIn this atlas the left choroid plexus marks the CSF production site within the left lateral ventricle.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Choroid Plexus (sol) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  '07_Choroid_plexus_R': {
    title: 'CHOROID PLEXUS (RIGHT)',
    titleAz: 'Choroid Plexus (sağ)',
    category: 'Choroid plexus',
    categoryAz: 'Xoroid pleksus',
    description:
      'The right choroid plexus mirrors the left, producing CSF within the right lateral ventricle (especially atrium and temporal horn) and contributing to flow toward the foramina of Monro.\n\nIt is fed by choroidal arteries (anterior and posterior) and is densely vascular — hence arterial-like colouring in many atlases.\n\nSymmetric plexus is expected; unilateral enlargement or mass should raise concern for papilloma or other lesion.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Choroid Plexus (sağ) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
};

export const VENTRICLES_RELATIONS = {
  '01_Lateral_ventricle_L': [
    '02_Lateral_ventricle_R',
    '03_Third_ventricle',
    '06_Choroid_plexus_L',
  ],
  '02_Lateral_ventricle_R': [
    '01_Lateral_ventricle_L',
    '03_Third_ventricle',
    '07_Choroid_plexus_R',
  ],
  '03_Third_ventricle': [
    '01_Lateral_ventricle_L',
    '02_Lateral_ventricle_R',
    '04_Cerebral_aqueduct',
  ],
  '04_Cerebral_aqueduct': ['03_Third_ventricle', '05_Fourth_ventricle'],
  '05_Fourth_ventricle': ['04_Cerebral_aqueduct', '03_Third_ventricle'],
  '06_Choroid_plexus_L': ['01_Lateral_ventricle_L', '07_Choroid_plexus_R'],
  '07_Choroid_plexus_R': ['02_Lateral_ventricle_R', '06_Choroid_plexus_L'],
};

export default ventriclesStructures;
