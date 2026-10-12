// Keys match exported .glb filenames (without extension).
// Lookup: brainstemStructures[clickedObject.name]

const brainstemStructures = {
  Medulla_oblongata: {
    title: 'MEDULLA OBLONGATA',
    titleAz: 'Medulla Oblongata',
    description:
      'The medulla oblongata is the most caudal segment of the brainstem, continuous below with the spinal cord at the level of the foramen magnum and continuous above with the pons. It contains the cardiovascular and respiratory centres of the reticular formation, the decussation of the pyramids (where the corticospinal tract crosses to the opposite side), and the nuclei of cranial nerves IX through XII. Because it houses vital autonomic control centres, even small medullary lesions - from stroke, demyelination, or compression - can be life-threatening, producing effects on breathing, heart rate, and blood pressure alongside more localized deficits.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Medulla Oblongata — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Pons: {
    title: 'PONS',
    titleAz: 'Pons',
    description:
      'The pons sits between the medulla and midbrain, forming a prominent anterior bulge produced by the transverse pontocerebellar fibres that connect the cerebral cortex to the cerebellum via the middle cerebellar peduncle. It houses the nuclei of cranial nerves V through VIII and contains ascending and descending long tracts passing between spinal cord, cerebellum, and cerebrum. The pons also contains key components of the reticular activating system governing sleep-wake states, and pontine lesions are classically associated with locked-in syndrome when the ventral pons is damaged bilaterally.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Pons — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Midbrain: {
    title: 'MIDBRAIN (MESENCEPHALON)',
    titleAz: 'Midbrain (Mesencephalon)',
    description:
      'The midbrain is the shortest and most rostral segment of the brainstem, connecting the pons and cerebellum to the forebrain. It is organized into three levels: the tectum (roof, containing the colliculi) dorsally, the tegmentum (containing cranial nerve nuclei, red nucleus, and reticular formation) centrally, and the cerebral peduncles (crus cerebri) ventrally, carrying descending corticospinal and corticobulbar fibres. The cerebral aqueduct runs through its centre, connecting the third and fourth ventricles. The midbrain houses nuclei for cranial nerves III and IV and is a major integration site for visual and auditory reflexes.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Midbrain (Mesencephalon) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Red_nucleus: {
    title: 'RED NUCLEUS',
    titleAz: 'Red Nucleus',
    description:
      'The red nucleus is a rounded mass of grey matter in the midbrain tegmentum, named for its pinkish hue in fresh tissue caused by rich vascularity and iron content. It receives input from the cerebellum and motor cortex and gives rise to the rubrospinal tract, which contributes to control of limb flexor tone, particularly prominent in lower vertebrates and of more limited functional significance in humans, where corticospinal pathways predominate. It also serves as a useful radiological landmark - its abnormal signal on MRI is a recognized feature in some parkinsonian and neurodegenerative conditions.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Red Nucleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Superior_colliculus: {
    title: 'SUPERIOR COLLICULUS',
    titleAz: 'Superior Colliculus',
    description:
      'The superior colliculus forms the upper pair of bumps on the midbrain tectum (dorsal surface) and functions as a key visuomotor integration centre. It receives direct retinal input as well as input from the visual cortex, and coordinates rapid, reflexive eye and head movements toward new visual stimuli (saccades and orienting responses). Its layered structure integrates visual, auditory, and somatosensory maps to guide attention and gaze, making it central to how the brain rapidly localizes and orients toward salient events in the environment.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Superior Colliculus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Inferior_colliculus: {
    title: 'INFERIOR COLLICULUS',
    titleAz: 'Inferior Colliculus',
    description:
      'The inferior colliculus forms the lower pair of bumps on the midbrain tectum and is the principal midbrain relay station for the auditory pathway, receiving input from nearly all lower auditory nuclei, including the cochlear and superior olivary complexes, before relaying to the medial geniculate body of the thalamus. It plays a central role in sound localization and integration of binaural cues, and is a key structure implicated in models of migraine-associated auditory and vestibular dysfunction, given its position as an obligatory relay for ascending auditory signal processing.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Inferior Colliculus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Aqueduct_of_midbrain: {
    title: 'CEREBRAL AQUEDUCT (AQUEDUCT OF MIDBRAIN)',
    titleAz: 'Cerebral Aqueduct (Aqueduct of Midbrain)',
    description:
      'The cerebral aqueduct is a narrow channel running through the centre of the midbrain, connecting the third ventricle above to the fourth ventricle below and allowing cerebrospinal fluid to circulate between them. Because it is the narrowest point in the entire ventricular system, it is a common site of obstruction - aqueductal stenosis is a classic cause of obstructive (non-communicating) hydrocephalus. The periaqueductal grey matter, a key descending pain-modulation centre implicated in migraine pathophysiology, surrounds the aqueduct directly, though it is not itself a separate structure in this model.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Cerebral Aqueduct (Aqueduct of Midbrain) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Base_of_cerebral_peduncle: {
    title: 'BASE OF CEREBRAL PEDUNCLE (CRUS CEREBRI)',
    titleAz: 'Base of Cerebral Peduncle (Crus Cerebri)',
    description:
      'The base of the cerebral peduncle, or crus cerebri, is the ventral-most portion of the midbrain, composed of descending white matter fibres travelling from the cerebral cortex toward the pons and spinal cord. It carries the corticospinal tract (destined for the spinal cord), corticobulbar tract (destined for brainstem motor nuclei), and corticopontine fibres (destined for the pons and cerebellum). Damage here produces contralateral hemiparesis, and the crus cerebri is a common site of infarction in midbrain stroke syndromes such as Weber syndrome, where it is affected alongside the oculomotor nerve fascicles.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Base of Cerebral Peduncle (Crus Cerebri) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Substantia_nigra: {
    title: 'SUBSTANTIA NIGRA',
    titleAz: 'Substantia Nigra',
    description:
      "The substantia nigra is a darkly pigmented nucleus in the midbrain, lying just dorsal to the cerebral peduncles, named for the neuromelanin pigment in its dopaminergic neurons. It has two functionally distinct parts: the pars compacta, whose dopaminergic neurons project to the striatum via the nigrostriatal pathway and are essential for smooth, coordinated voluntary movement, and the pars reticulata, which functions more like an output nucleus of the basal ganglia. Progressive loss of pars compacta neurons is the defining pathological feature of Parkinson's disease.",
    descriptionAz:
      'Substantia Nigra — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Pyramid_of_medulla_oblongata: {
    title: 'PYRAMID OF MEDULLA OBLONGATA',
    titleAz: 'Pyramid of Medulla Oblongata',
    description:
      "The pyramids are paired, longitudinally-oriented ridges on the ventral surface of the medulla, formed by the corticospinal tracts as they descend from the cerebral cortex toward the spinal cord. At the pyramid's lower end, roughly 85-90% of these fibres cross the midline at the decussation of the pyramids, forming the lateral corticospinal tract on the opposite side, while the remainder continue uncrossed as the anterior corticospinal tract. This crossing explains why a lesion above the decussation produces contralateral weakness, while a lesion below it produces ipsilateral weakness.",
    descriptionAz:
      'Pyramid of Medulla Oblongata — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_oculomotor_nerve: {
    title: 'NUCLEUS OF OCULOMOTOR NERVE (CN III)',
    titleAz: 'Nucleus of Oculomotor Nerve (Cn Iii)',
    description:
      'The oculomotor nucleus lies in the midbrain at the level of the superior colliculus, ventral to the cerebral aqueduct. It contains several subnuclei that separately supply the levator palpebrae superioris and four of the six extraocular muscles (superior, medial, and inferior rectus, and inferior oblique), controlling most eye movements and eyelid elevation. Damage produces a characteristic "down and out" eye position with ptosis, and because the nucleus sits close to the corticospinal fibres of the crus cerebri, midbrain infarcts here classically produce crossed syndromes combining oculomotor palsy with contralateral limb weakness.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Oculomotor Nerve (Cn Iii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Accessory_nucleus_of_oculomotor: {
    title: 'ACCESSORY NUCLEUS OF OCULOMOTOR NERVE (EDINGER-WESTPHAL NUCLEUS)',
    titleAz: 'Accessory Nucleus of Oculomotor Nerve (Edinger-Westphal Nucleus)',
    description:
      'The accessory oculomotor nucleus, better known as the Edinger-Westphal nucleus, lies just dorsal to the main oculomotor nucleus and provides the parasympathetic component of cranial nerve III. Its preganglionic fibres travel with the oculomotor nerve to the ciliary ganglion, where they synapse before controlling pupillary constriction and lens accommodation. Because these parasympathetic fibres run on the outer surface of the nerve, they are especially vulnerable to compression (for example from an expanding aneurysm or uncal herniation), which classically produces a dilated, non-reactive pupil before other oculomotor signs appear.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Accessory Nucleus of Oculomotor Nerve (Edinger-Westphal Nucleus) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_trochlear_nerve: {
    title: 'NUCLEUS OF TROCHLEAR NERVE (CN IV)',
    titleAz: 'Nucleus of Trochlear Nerve (Cn Iv)',
    description:
      'The trochlear nucleus sits in the caudal midbrain, just below the oculomotor nucleus. It is unique among cranial nerve nuclei in that its axons cross the midline internally before exiting the brainstem dorsally - the only cranial nerve to emerge from the back of the brainstem. It supplies the superior oblique muscle, which depresses, abducts, and intorts the eye. Trochlear nerve palsy produces vertical diplopia that worsens on downward gaze (such as reading or descending stairs) and is often subtle enough that patients present with head tilt as a compensatory strategy before the underlying palsy is recognized.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Trochlear Nerve (Cn Iv) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_abducens_nerve: {
    title: 'NUCLEUS OF ABDUCENS NERVE (CN VI)',
    titleAz: 'Nucleus of Abducens Nerve (Cn Vi)',
    description:
      'The abducens nucleus lies in the caudal pons, beneath the floor of the fourth ventricle, where it forms the facial colliculus together with the looping fibres of the facial nerve that wrap around it. It supplies the lateral rectus muscle, responsible for eye abduction. Because of its long intracranial course after exiting the brainstem, the abducens nerve is particularly susceptible to stretch injury from raised intracranial pressure, making abducens palsy a classic, often nonspecific, "false localizing sign" seen in conditions ranging far beyond direct pontine pathology.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Abducens Nerve (Cn Vi) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Motor_nucleus_of_facial_nerve: {
    title: 'MOTOR NUCLEUS OF FACIAL NERVE (CN VII)',
    titleAz: 'Motor Nucleus of Facial Nerve (Cn Vii)',
    description:
      "The facial motor nucleus lies in the caudal pons and supplies the muscles of facial expression. Its axons take an unusual looping course, first travelling dorsally around the abducens nucleus (forming the internal genu and facial colliculus) before exiting ventrolaterally. Because the upper facial muscles receive bilateral cortical innervation while the lower face receives only contralateral input, an upper motor neuron lesion spares the forehead while a lower motor neuron (nuclear or nerve) lesion, as in Bell's palsy, causes complete hemifacial weakness - a key distinction in localizing facial weakness clinically.",
    descriptionAz:
      'Motor Nucleus of Facial Nerve (Cn Vii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_hypoglossal_nerve: {
    title: 'NUCLEUS OF HYPOGLOSSAL NERVE (CN XII)',
    titleAz: 'Nucleus of Hypoglossal Nerve (Cn Xii)',
    description:
      'The hypoglossal nucleus lies in the medulla, close to the midline beneath the floor of the fourth ventricle, forming the hypoglossal trigone. It provides motor innervation to nearly all intrinsic and extrinsic muscles of the tongue. A lower motor neuron lesion causes ipsilateral tongue weakness, atrophy, and fasciculations, with the tongue deviating toward the side of the lesion on protrusion (due to unopposed action of the healthy genioglossus). Its medial location near the midline makes it a useful landmark in medial medullary syndrome, where it is affected alongside the pyramid and medial lemniscus.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Hypoglossal Nerve (Cn Xii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_accessory_nerve: {
    title: 'NUCLEUS OF ACCESSORY NERVE (CN XI)',
    titleAz: 'Nucleus of Accessory Nerve (Cn Xi)',
    description:
      'The accessory nerve nucleus is unusual among cranial nerve nuclei in that it spans the caudal medulla and extends down into the upper cervical spinal cord (C1-C5/6). Its fibres ascend through the foramen magnum to join the cranial portion briefly before separating out as the spinal accessory nerve, which supplies the sternocleidomastoid and trapezius muscles. It governs head rotation/tilt and shoulder shrug, and its long, superficial course in the posterior triangle of the neck makes it particularly vulnerable to iatrogenic injury during neck surgery or lymph node biopsy.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Accessory Nerve (Cn Xi) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_ambiguus: {
    title: 'NUCLEUS AMBIGUUS',
    titleAz: 'Nucleus Ambiguus',
    description:
      'The nucleus ambiguus is an elongated column of motor neurons in the medulla, named for its indistinct boundaries on standard histological staining. It provides motor innervation to the muscles of the pharynx, larynx, and soft palate via cranial nerves IX, X, and XI, controlling swallowing, phonation, and airway protection. It also contributes parasympathetic cardioinhibitory fibres to the heart via the vagus nerve. Damage here, as in lateral medullary (Wallenberg) syndrome, produces dysphagia, dysarthria, and a hoarse voice due to ipsilateral vocal cord paralysis.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus Ambiguus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Nucleus_of_solitary_tract: {
    title: 'NUCLEUS OF SOLITARY TRACT',
    titleAz: 'Nucleus of Solitary Tract',
    description:
      'The nucleus of the solitary tract (nucleus tractus solitarius) is a long, paired nucleus running through the medulla that serves as the principal visceral sensory relay of the brainstem. It receives taste information via cranial nerves VII, IX, and X in its rostral portion, and general visceral sensory input - including baroreceptor and chemoreceptor signals from the cardiovascular and respiratory systems - in its caudal portion. It is a critical hub for autonomic reflexes such as the baroreflex and vomiting reflex, and relays this information onward to the hypothalamus, thalamus, and reticular formation.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Nucleus of Solitary Tract — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Posterior_nucleus_of_vagus_nerve: {
    title: 'POSTERIOR NUCLEUS OF VAGUS NERVE (DORSAL MOTOR NUCLEUS)',
    titleAz: 'Posterior Nucleus of Vagus Nerve (Dorsal Motor Nucleus)',
    description:
      'The dorsal motor nucleus of the vagus lies in the medulla beneath the floor of the fourth ventricle, forming the vagal trigone. It is the principal source of preganglionic parasympathetic output carried by the vagus nerve to the heart, lungs, and abdominal viscera down to the splenic flexure, controlling processes such as gut motility, glandular secretion, and heart rate modulation alongside the nucleus ambiguus\'s cardioinhibitory contribution. Its close anatomical relationship to the nucleus of the solitary tract and area postrema underlies coordinated autonomic and emetic reflexes.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Posterior Nucleus of Vagus Nerve (Dorsal Motor Nucleus) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Anterior_cochlear_nucleus: {
    title: 'ANTERIOR (VENTRAL) COCHLEAR NUCLEUS',
    titleAz: 'Anterior (Ventral) Cochlear Nucleus',
    description:
      'The ventral cochlear nucleus is the first central relay station for auditory information, located at the pontomedullary junction where the cochlear nerve enters the brainstem. It receives direct input from spiral ganglion neurons of the cochlea and is organized tonotopically, preserving the frequency-mapped organization established in the inner ear. From here, projections diverge into multiple parallel pathways subserving sound localization and pattern recognition. Given its role as the mandatory first synapse for all auditory input, it is of direct relevance to research on migraine-associated cochlear and auditory dysfunction, as any disruption at this level would affect all downstream auditory processing.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Anterior (Ventral) Cochlear Nucleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Posterior_cochlear_nucleus: {
    title: 'POSTERIOR (DORSAL) COCHLEAR NUCLEUS',
    titleAz: 'Posterior (Dorsal) Cochlear Nucleus',
    description:
      'The dorsal cochlear nucleus, situated alongside the ventral cochlear nucleus at the pontomedullary junction, also receives direct primary afferent input from the cochlear nerve but has a more complex, layered cytoarchitecture resembling the cerebellar cortex. It is thought to play a specialized role in processing spectral cues used for sound localization in the vertical plane and in distinguishing self-generated from external sounds. Like its ventral counterpart, it represents an early, obligatory stage of central auditory processing relevant to understanding how peripheral cochlear pathology translates into central auditory symptoms.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Posterior (Dorsal) Cochlear Nucleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Vestibular_nuclei: {
    title: 'VESTIBULAR NUCLEI',
    titleAz: 'Vestibular Nuclei',
    description:
      'The vestibular nuclear complex spans the pontomedullary junction beneath the floor of the fourth ventricle and comprises four principal subnuclei (superior, inferior, medial, and lateral) that receive input from the vestibular labyrinth via cranial nerve VIII. These nuclei integrate vestibular signals with visual and proprioceptive information to coordinate balance, gaze stabilization (via the vestibulo-ocular reflex), and postural control, and give rise to the vestibulospinal tracts. This complex is central to understanding migraine-associated vestibular dysfunction and vestibular migraine, given its role as the principal integration site for balance-related sensory input.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Vestibular Nuclei — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Superior_salivatory_nucleus: {
    title: 'SUPERIOR SALIVATORY NUCLEUS',
    titleAz: 'Superior Salivatory Nucleus',
    description:
      'The superior salivatory nucleus lies in the pontine tegmentum and provides preganglionic parasympathetic fibres that travel with the facial nerve (via the greater petrosal and chorda tympani branches) to the pterygopalatine and submandibular ganglia. It controls secretion from the lacrimal, submandibular, and sublingual glands, as well as the mucous membranes of the nasal cavity and palate. It is functionally linked to the trigeminal autonomic reflex arc implicated in cluster headache and some migraine-related autonomic symptoms such as lacrimation and rhinorrhea during attacks.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Superior Salivatory Nucleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Inferior_salivatory_nucleus: {
    title: 'INFERIOR SALIVATORY NUCLEUS',
    titleAz: 'Inferior Salivatory Nucleus',
    description:
      'The inferior salivatory nucleus lies in the medulla and supplies preganglionic parasympathetic fibres that travel with the glossopharyngeal nerve to the otic ganglion, ultimately controlling secretion from the parotid gland. Though small and diffusely organized, its output is essential to normal salivary function, and it works alongside the superior salivatory nucleus to provide complete parasympathetic control of the major salivary glands, each nucleus supplying a distinct subset via a different cranial nerve pathway.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Inferior Salivatory Nucleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Oculomotor_nerve_III: {
    title: 'OCULOMOTOR NERVE (CN III)',
    titleAz: 'Oculomotor Nerve (Cn Iii)',
    description:
      'The oculomotor nerve emerges from the ventral midbrain, exiting between the cerebral peduncles in the interpeduncular fossa, before running forward to enter the orbit through the superior orbital fissure. It carries both the somatic motor fibres controlling four extraocular muscles and the levator palpebrae, and the parasympathetic fibres from the Edinger-Westphal nucleus controlling pupillary constriction. Its course close to the posterior communicating artery makes it especially vulnerable to compression by aneurysms at that site, classically producing a painful pupil-involving third nerve palsy.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Oculomotor Nerve (Cn Iii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Trochlear_nerve_IV: {
    title: 'TROCHLEAR NERVE (CN IV)',
    titleAz: 'Trochlear Nerve (Cn Iv)',
    description:
      'The trochlear nerve is the only cranial nerve to exit the brainstem dorsally, emerging just below the inferior colliculus after its fibres decussate within the midbrain. It has the longest intracranial course of any cranial nerve, wrapping around the brainstem before travelling forward to the orbit. This long course, combined with its slender diameter, makes it particularly susceptible to shear injury in closed head trauma, and trochlear palsy is a relatively common cause of vertical, torsional diplopia following head injury.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Trochlear Nerve (Cn Iv) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Trigeminal_nerve_V: {
    title: 'TRIGEMINAL NERVE (CN V)',
    titleAz: 'Trigeminal Nerve (Cn V)',
    description:
      'The trigeminal nerve is the largest cranial nerve, emerging from the lateral pons as separate large sensory and smaller motor roots. Its sensory division carries facial, oral, and anterior scalp sensation via three divisions (ophthalmic, maxillary, mandibular), while its motor division innervates the muscles of mastication. The trigeminal nerve and its associated brainstem nuclei form the core of the trigeminovascular system, the anatomical pathway believed to underlie migraine pain: activation of trigeminal afferents innervating cranial blood vessels and meninges is central to current models of migraine pathophysiology.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Trigeminal Nerve (Cn V) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Abducens_nerve_VI: {
    title: 'ABDUCENS NERVE (CN VI)',
    titleAz: 'Abducens Nerve (Cn Vi)',
    description:
      "The abducens nerve exits the brainstem at the pontomedullary junction and travels a long, vulnerable course along the base of the skull before entering the orbit to supply the lateral rectus muscle. Its length and close application to the clivus make it prone to stretch injury with any process that raises intracranial pressure or shifts the brainstem, which is why an isolated sixth nerve palsy is one of the least anatomically specific cranial neuropathies, often reflecting pressure effects far from the nerve's actual course.",
    descriptionAz:
      'Abducens Nerve (Cn Vi) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Facial_nerve_VII: {
    title: 'FACIAL NERVE (CN VII)',
    titleAz: 'Facial Nerve (Cn Vii)',
    description:
      "The facial nerve exits the brainstem at the pontomedullary junction, alongside the vestibulocochlear nerve, at the cerebellopontine angle. It carries motor fibres to the muscles of facial expression, parasympathetic secretomotor fibres to the lacrimal and salivary glands, and special sensory taste fibres from the anterior two-thirds of the tongue via the chorda tympani. Its course through the narrow facial canal in the temporal bone makes it prone to compressive injury from swelling, which is thought to underlie Bell's palsy, the most common cause of acute facial paralysis.",
    descriptionAz:
      'Facial Nerve (Cn Vii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Vestibulocochlear_nerve_VIII: {
    title: 'VESTIBULOCOCHLEAR NERVE (CN VIII)',
    titleAz: 'Vestibulocochlear Nerve (Cn Viii)',
    description:
      'The vestibulocochlear nerve carries two functionally distinct components - the cochlear nerve, conveying auditory information from the organ of Corti, and the vestibular nerve, conveying balance information from the semicircular canals, utricle, and saccule - which travel together from the inner ear through the internal auditory meatus before entering the brainstem at the cerebellopontine angle. As the direct conduit between the peripheral auditory/vestibular apparatus and the cochlear and vestibular brainstem nuclei, it is of central relevance to any investigation of migraine-associated cochleovestibular dysfunction, sitting at the anatomical interface between inner ear pathology and central processing.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Vestibulocochlear Nerve (Cn Viii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Glossopharyngeal_nerve_IX: {
    title: 'GLOSSOPHARYNGEAL NERVE (CN IX)',
    titleAz: 'Glossopharyngeal Nerve (Cn Ix)',
    description:
      'The glossopharyngeal nerve emerges from the medulla and exits the skull through the jugular foramen. It provides taste and general sensation from the posterior third of the tongue, sensation from the pharynx and middle ear, motor supply to the stylopharyngeus muscle, and parasympathetic secretomotor fibres to the parotid gland. It also carries baroreceptor and chemoreceptor information from the carotid sinus and body, making it a key afferent limb of the baroreflex. Glossopharyngeal neuralgia produces severe, brief episodes of throat and ear pain, sometimes triggered by swallowing.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Glossopharyngeal Nerve (Cn Ix) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Vagus_nerve_X: {
    title: 'VAGUS NERVE (CN X)',
    titleAz: 'Vagus Nerve (Cn X)',
    description:
      'The vagus nerve exits the medulla and travels the longest course of any cranial nerve, descending through the neck, thorax, and abdomen. It provides the majority of parasympathetic innervation to the thoracic and abdominal viscera, motor supply to the pharynx and larynx (via the nucleus ambiguus), and sensory input from these organs and from the external ear. Its extensive distribution and central role in autonomic regulation - from heart rate to gut motility - make it a nerve of major clinical and research interest, including as a target for vagus nerve stimulation therapies in some headache and epilepsy syndromes.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Vagus Nerve (Cn X) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Accessory_nerve_XI: {
    title: 'ACCESSORY NERVE (CN XI)',
    titleAz: 'Accessory Nerve (Cn Xi)',
    description:
      'The accessory nerve has a unique dual origin, with a small cranial root arising from the medulla and a larger spinal root arising from the upper cervical spinal cord, which ascends through the foramen magnum before the two roots briefly join and then separate again. The spinal component exits the skull via the jugular foramen to supply the sternocleidomastoid and trapezius muscles, controlling head turning and shoulder elevation. Because of its long, superficial course through the posterior triangle of the neck, it is one of the most commonly iatrogenically injured cranial nerves.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Accessory Nerve (Cn Xi) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Hypoglossal_nerve_XII: {
    title: 'HYPOGLOSSAL NERVE (CN XII)',
    titleAz: 'Hypoglossal Nerve (Cn Xii)',
    description:
      'The hypoglossal nerve emerges as a series of rootlets from the ventral medulla, between the pyramid and the olive, before exiting the skull through the hypoglossal canal. It provides the sole motor supply to the intrinsic and most extrinsic muscles of the tongue. A lower motor neuron lesion causes ipsilateral tongue deviation on protrusion, atrophy, and fasciculations, and because of its position adjacent to the pyramid, it is classically affected together with the corticospinal tract in medial medullary (Dejerine) syndrome, producing crossed hypoglossal palsy with contralateral limb weakness.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Hypoglossal Nerve (Cn Xii) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Anterior_corticospinal_tract: {
    title: 'ANTERIOR CORTICOSPINAL TRACT',
    titleAz: 'Anterior Corticospinal Tract',
    description:
      'The anterior corticospinal tract carries the minority (roughly 10-15%) of corticospinal fibres that do not cross at the pyramidal decussation, instead descending uncrossed in the anterior spinal cord white matter and crossing individually at the spinal segmental level they innervate. It primarily supplies axial and proximal trunk musculature, contributing to postural control and bilateral trunk movements, in contrast to the much larger lateral corticospinal tract, which governs fine distal limb movement.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Anterior Corticospinal Tract — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Lateral_corticospinal_tract: {
    title: 'LATERAL CORTICOSPINAL TRACT',
    titleAz: 'Lateral Corticospinal Tract',
    description:
      'The lateral corticospinal tract is the largest and functionally most important descending motor pathway, formed by the roughly 85-90% of corticospinal fibres that cross at the pyramidal decussation in the caudal medulla before descending in the lateral spinal cord white matter. It is the principal pathway for voluntary, particularly fine and distal, limb movement. Damage above the decussation causes contralateral weakness, while damage below it causes ipsilateral weakness - a distinction that is fundamental to localizing lesions along the neuraxis.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Lateral Corticospinal Tract — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Gracile_fasciculus: {
    title: 'GRACILE FASCICULUS',
    titleAz: 'Gracile Fasciculus',
    description:
      'The gracile fasciculus is the medial division of the dorsal columns, carrying fine touch, vibration, and proprioceptive information from the lower limb and lower trunk up to the gracile nucleus in the medulla, where it synapses before crossing and continuing as the medial lemniscus. Because it occupies the most medial position in the dorsal columns, it is often preferentially affected in conditions like subacute combined degeneration (vitamin B12 deficiency) or tabes dorsalis, producing loss of proprioception and vibration sense typically beginning in the feet.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Gracile Fasciculus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Cuneate_fasciculus: {
    title: 'CUNEATE FASCICULUS',
    titleAz: 'Cuneate Fasciculus',
    description:
      'The cuneate fasciculus is the lateral division of the dorsal columns, present only above spinal cord level T6, carrying fine touch, vibration, and proprioceptive information from the upper limb and upper trunk to the cuneate nucleus in the medulla. Like the gracile fasciculus, it synapses in the medulla before its second-order fibres cross the midline and ascend as the medial lemniscus. Together the two fasciculi form the dorsal column-medial lemniscus pathway, the principal route for discriminative touch and proprioception.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Cuneate Fasciculus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Superior_cerebellar_peduncle: {
    title: 'SUPERIOR CEREBELLAR PEDUNCLE',
    titleAz: 'Superior Cerebellar Peduncle',
    description:
      'The superior cerebellar peduncle is the primary output pathway of the cerebellum, carrying fibres from the deep cerebellar nuclei (chiefly the dentate nucleus) upward and forward to decussate in the caudal midbrain before synapsing in the contralateral red nucleus and continuing to the thalamus. This pathway relays coordinated motor planning information from the cerebellum to the cerebral cortex. It stands in contrast to the middle and inferior cerebellar peduncles, which are predominantly input pathways carrying information into the cerebellum rather than out of it.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Superior Cerebellar Peduncle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Fourth_ventricle: {
    title: 'FOURTH VENTRICLE',
    titleAz: 'Fourth Ventricle',
    description:
      'The fourth ventricle is a diamond-shaped cavity situated between the pons/medulla ventrally and the cerebellum dorsally, continuous with the cerebral aqueduct above and the central canal of the spinal cord below. Cerebrospinal fluid produced here exits into the subarachnoid space via the paired lateral apertures (foramina of Luschka) and the midline median aperture (foramen of Magendie). Its floor forms the rhomboid fossa, marked by several cranial nerve nuclei-related elevations including the facial and hypoglossal trigones, making it an important anatomical landmark for localizing brainstem lesions.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Fourth Ventricle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Inferior_cerebellar_peduncle: {
    title: 'INFERIOR CEREBELLAR PEDUNCLE',
    titleAz: 'Inferior Cerebellar Peduncle',
    description:
      'The inferior cerebellar peduncle is the largest cerebellar input pathway, carrying proprioceptive, vestibular, and reticular information from the spinal cord and brainstem into the cerebellum. It connects the medulla and upper spinal cord to the cerebellar hemisphere and vermis, and is essential for balance, posture, and coordination of ongoing movement. Lesions affecting this peduncle disrupt cerebellar input and can produce ipsilateral ataxia and incoordination.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Inferior Cerebellar Peduncle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Middle_cerebellar_peduncle: {
    title: 'MIDDLE CEREBELLAR PEDUNCLE',
    titleAz: 'Middle Cerebellar Peduncle',
    description:
      'The middle cerebellar peduncle is the principal pathway for pontocerebellar fibres, carrying information from the pontine nuclei (which receive cortical input via corticopontine tracts) into the cerebellum. It forms the large lateral bulge of the pons and is the largest of the three cerebellar peduncles. It is critical for coordinating planned, skilled movement by relaying motor planning signals from cortex to cerebellum.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Middle Cerebellar Peduncle — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Locus_coeruleus: {
    title: 'LOCUS COERULEUS',
    titleAz: 'Locus Coeruleus',
    description:
      'The locus coeruleus is a small pigmented nucleus in the upper pons and caudal midbrain that is the brain\'s main source of norepinephrine. Its widespread projections regulate arousal, attention, stress responses, sleep-wake transitions, and pain modulation. Dysfunction of the locus coeruleus has been implicated in anxiety disorders, depression, PTSD, and migraine, making it a key structure linking brainstem autonomic control to higher cognitive and emotional states.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Locus Coeruleus — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
  Tectum_of_midbrain_colliculi: {
    title: 'TECTUM OF MIDBRAIN (COLLICULI)',
    titleAz: 'Tectum of Midbrain (Colliculi)',
    description:
      'The tectum is the dorsal roof of the midbrain, composed of the paired superior and inferior colliculi. Together they form a major integration centre for orienting reflexes: the superior colliculus for visual and multimodal gaze shifts, and the inferior colliculus for auditory processing and sound localization. The tectum sits rostral to the pons and is a defining landmark of the mesencephalon on dorsal views of the brainstem.\n\nClinical meaning: correlate this structure with neighboring landmarks in the 3D model; lesions, compression, and inflammation here produce syndrome patterns used in bedside localization and imaging reports.',
    descriptionAz:
      'Tectum of Midbrain (Colliculi) — bu struktur atlasda anatomik yerləşmə, qonşuluq və klinik lokalizasiya üçün əsas oriyentirdir.\n\nFunksional əlaqələrini və klinik sindrom nümunələrini qonşu strukturlara klikləyərək möhkəmləndirin.\n\nKlinik əhəmiyyət: 3D modeldə bu strukturu qonşu oriyentirlərlə müqayisə edin; zədələnmə, sıxılma, demyelinizasiya və ya iltihab burada tipik lokalizasiya sindromları və görüntüləmə tapıntıları yaradır — klinik korrelyasiya üçün modeli fırladın və əlaqəli strukturlara keçin.',
  },
};

export default brainstemStructures;
