// Keys match exported .glb filenames (without extension).

const earPathwayStructures = {
  '01_Auricle_external_ear_R': {
    title: 'AURICLE (EXTERNAL EAR)',
    category: 'Outer & middle ear',
    description:
      'The auricle (pinna) is the visible cartilaginous outer ear that collects sound and funnels it into the external acoustic meatus. Its ridges and fossae (helix, antihelix, concha, tragus) shape the incoming wavefront and contribute to vertical sound localisation.\n\nSound pressure is guided toward the tympanic membrane; the concha and meatus also act as a mild acoustic resonator favouring speech frequencies. Skin of the pinna is tightly bound over elastic cartilage, making haematoma and frostbite clinically relevant.\n\nThis atlas shows the right auricle as the start of airborne sound capture before middle-ear impedance matching begins.',
  },
  '17_External_acoustic_meatus_R_approx': {
    title: 'EXTERNAL ACOUSTIC MEATUS',
    category: 'Outer & middle ear',
    description:
      'The external acoustic meatus (ear canal) is the S-shaped tunnel from the concha to the tympanic membrane. Lateral cartilage continues into a medial bony canal within the temporal bone, carrying sound to the drum.\n\nCerumen, foreign bodies, and otitis externa affect this segment; the bony canal is also a surgical corridor in approaches to the middle ear. This mesh is an approximate right-sided canal linking pinna to tympanic membrane.\n\nWith the auricle and drum, it completes the outer-ear air path before ossicular transmission.',
  },
  '02_Tympanic_membrane': {
    title: 'TYMPANIC MEMBRANE',
    category: 'Outer & middle ear',
    description:
      'The tympanic membrane (eardrum) is a thin, cone-shaped membrane closing the medial end of the external acoustic meatus and forming the lateral wall of the tympanic cavity. Sound waves set it into vibration, which is transmitted to the malleus via the umbo and handle.\n\nIts pars tensa is fibrous and taut; the smaller pars flaccida lies superiorly. Otoscopic landmarks (cone of light, handle of malleus) guide clinical examination. Perforation, otitis media, and cholesteatoma all disturb this first mechanical transducer.\n\nHere it is the interface between the air-filled outer ear and the ossicular chain.',
  },
  '03_Malleus': {
    title: 'MALLEUS',
    category: 'Outer & middle ear',
    description:
      'The malleus (“hammer”) is the largest ossicle. Its handle embeds in the tympanic membrane; the head articulates with the incus in the epitympanic recess. Tensor tympani inserts on the handle and dampens loud sound by tensing the membrane.\n\nVibration of the drum is thus coupled into the ossicular lever system. The malleus, with the other ossicles, helps match low-impedance air to high-impedance cochlear fluid — a critical middle-ear function.\n\nDisruption of the malleoincudal joint or malleus fixation reduces conductive hearing; it is also a landmark in middle-ear surgery.',
  },
  '04_Incus': {
    title: 'INCUS',
    category: 'Outer & middle ear',
    description:
      'The incus (“anvil”) articulates with the malleus laterally and with the stapes medially via its lenticular process. It forms the middle link of the ossicular lever that amplifies force at the oval window.\n\nThe long process is slender and vulnerable to trauma, chronic infection, and cholesteatoma erosion — a common cause of conductive hearing loss when the ossicular chain is interrupted.\n\nIn the ascending auditory path, the incus simply relays mechanical energy from malleus to stapes before fluid waves begin in the labyrinth.',
  },
  '05_Stapes': {
    title: 'STAPES',
    category: 'Outer & middle ear',
    description:
      'The stapes (“stirrup”) is the smallest ossicle. Its footplate sits in the oval (vestibular) window, sealed by the annular ligament, and drives perilymph of the vestibule. Stapedius inserts on the neck and reflexively stiffens the chain against loud sound.\n\nForce concentration from the large tympanic membrane onto the small footplate, plus the ossicular lever, provides the main impedance-matching gain of the middle ear.\n\nOtosclerosis typically fixes the footplate, causing progressive conductive loss; stapedotomy/stapedectomy restores oval-window mobility.',
  },
  '06_Vestibule_oval_window': {
    title: 'VESTIBULE & OVAL WINDOW',
    category: 'Inner ear',
    description:
      'The vestibule is the central cavity of the bony labyrinth, continuous with the cochlea anteriorly and the semicircular canals. The oval window on its lateral wall receives the stapes footplate, launching a travelling pressure wave into perilymph.\n\nFrom the vestibule, energy enters the scala vestibuli of the cochlea. The round window (not always modelled separately) bulges reciprocally to allow incompressible fluid displacement.\n\nThis station converts ossicular motion into labyrinthine fluid motion — the gateway from middle ear to cochlear transduction.',
  },
  '07_Cochlea': {
    title: 'COCHLEA',
    category: 'Inner ear',
    description:
      'The cochlea is the spiral hearing organ of the inner ear. Its three scalae (vestibuli, media, tympani) and basilar membrane support a tonotopic travelling wave: high frequencies near the base, low frequencies toward the apex.\n\nInner hair cells of the organ of Corti transduce basilar-membrane motion into receptor potentials and release glutamate onto spiral-ganglion afferents. Outer hair cells provide cochlear amplification and sharp tuning.\n\nSensorineural loss, noise damage, and ototoxicity often originate here. In this atlas the cochlea is the sensory transducer feeding the cochlear nerve.',
  },
  '08_Cochlear_nerve': {
    title: 'COCHLEAR NERVE',
    category: 'Peripheral nerves',
    description:
      'The cochlear nerve is the auditory division of CN VIII. Peripheral processes of bipolar spiral-ganglion neurons contact hair cells; central processes gather in the modiolus and join the vestibulocochlear nerve toward the brainstem.\n\nIt carries frequency-, intensity-, and timing-coded spike trains from the cochlea. Schwann-cell myelination and a short intracranial course make it sensitive to compression (e.g. vestibular schwannoma) and to surgical trauma in the CPA.\n\nElectrically stimulating these fibres (cochlear implant) can restore useful hearing when hair cells are lost but the nerve remains.',
  },
  '09_Vestibulocochlear_nerve_VIII': {
    title: 'VESTIBULOCOCHLEAR NERVE (VIII)',
    category: 'Peripheral nerves',
    description:
      'Cranial nerve VIII carries cochlear (hearing) and vestibular (balance) fibres from the labyrinth through the internal acoustic meatus into the cerebellopontine angle, entering the brainstem at the pontomedullary junction.\n\nCochlear fibres terminate in the cochlear nuclei; vestibular fibres reach the vestibular nuclei. Lesions (schwannoma, meningioma, vascular loops) may cause hearing loss, tinnitus, and vertigo together.\n\nIn this pathway view CN VIII is the trunk linking the inner ear to the first central relays.',
  },
  '10_Cochlear_nuclei_brainstem': {
    title: 'COCHLEAR NUCLEI',
    category: 'Central auditory pathway',
    description:
      'The cochlear nuclei (dorsal and ventral) lie at the pontomedullary junction beside the inferior cerebellar peduncle and are the obligatory first CNS synapse of the auditory pathway. Tonotopy from the cochlea is preserved and refined here.\n\nVentral pathways feed the superior olivary complex for sound localisation; dorsal pathways contribute to higher-order spectral processing via ascending tracts toward the inferior colliculus.\n\nBrainstem stroke, demyelination, or CPA mass effect can disrupt this node, producing central hearing deficits that may spare the pure-tone audiogram more than speech-in-noise performance.',
  },
  '11_Superior_olivary_complex': {
    title: 'SUPERIOR OLIVARY COMPLEX',
    category: 'Central auditory pathway',
    description:
      'The superior olivary complex (SOC) in the caudal pons is the first major binaural integration centre. Medial SOC neurons compare interaural time differences; lateral SOC circuits emphasise interaural level differences — the cues for horizontal localisation.\n\nIt also drives the stapedius reflex arc and shapes ascending input to the lateral lemniscus and inferior colliculus. Many fibres cross in the trapezoid body, so each SOC receives bilateral cochlear-nucleus input.\n\nPontine lesions affecting the SOC can impair localisation and binaural fusion even when peripheral hearing is intact.',
  },
  '12_Inferior_colliculus': {
    title: 'INFERIOR COLLICULUS',
    category: 'Central auditory pathway',
    description:
      'The inferior colliculus is the midbrain auditory hub in the tectum. Almost all ascending brainstem auditory pathways converge here before projecting via the brachium of the inferior colliculus to the medial geniculate body.\n\nIt integrates monaural and binaural maps of frequency, space, and timing, and participates in acoustic startle and orienting. Commissural fibres link left and right colliculi.\n\nMidbrain lesions, demyelination, or tectal compression can cause auditory processing disorders, tinnitus, or impaired sound localisation with relatively preserved cochlear thresholds.',
  },
  '13_Medial_geniculate_body': {
    title: 'MEDIAL GENICULATE BODY',
    category: 'Central auditory pathway',
    description:
      'The medial geniculate body (MGB) is the thalamic auditory relay on the posterior-inferior thalamus. It receives the brachium of the inferior colliculus and projects through auditory radiations to Heschl’s (transverse temporal) gyri.\n\nCore (lemniscal) divisions preserve sharp tonotopy for primary cortex; belt divisions support broader, associative auditory processing. Corticofugal feedback from cortex also modulates MGB filtering.\n\nThalamic or radiation injury can contribute to central auditory dysfunction; together with IC and cortex, MGB completes the classical ascending pathway.',
  },
  '14_Auditory_cortex_transverse_temporal_gyri': {
    title: 'AUDITORY CORTEX (HESCHL’S GYRUS)',
    category: 'Central auditory pathway',
    description:
      'Primary auditory cortex occupies the transverse temporal gyri (Heschl’s gyri) on the superior temporal plane, buried in the lateral sulcus. It receives thalamocortical fibres from the medial geniculate and is organised tonotopically.\n\nFrom here, information spreads to belt and parabelt auditory association cortex for speech, music, and auditory scene analysis. Language-dominant hemisphere specialisation (e.g. planum temporale) builds on this core.\n\nBilateral temporal lesions can cause cortical deafness; unilateral lesions more often impair complex auditory processing than pure tones. This mesh marks the cortical endpoint of the pathway assembled here.',
  },
  '15_Bony_labyrinth_R': {
    title: 'BONY LABYRINTH',
    category: 'Inner ear',
    description:
      'The bony labyrinth is the dense otic-capsule cavity in the petrous temporal bone housing the membranous labyrinth. It comprises the cochlea, vestibule, and semicircular canals filled with perilymph outside the endolymphatic ducts.\n\nIt provides the rigid shell that shapes travelling-wave mechanics and protects the delicate neurosensory epithelium. Fractures of the otic capsule, otosclerosis, and labyrinthitis involve this compartment.\n\nIn this right-sided model it frames the cochlea and vestibule so inner-ear structures read as contents of bone rather than floating scraps.',
  },
  '16_Temporal_bone_petrous_R': {
    title: 'TEMPORAL BONE (PETROUS)',
    category: 'Temporal bone & canals',
    description:
      'The petrous part of the temporal bone is the dense pyramid of the skull base containing the middle and inner ear. It cradles the ossicles, tympanic cavity, bony labyrinth, and the internal acoustic meatus for CN VII–VIII.\n\nSurgical corridors (transmastoid, middle fossa, translabyrinthine) are defined by this bone. Petrous apex lesions, cholesteatoma, and temporal-bone fracture are major clinical topics here.\n\nShown ghosted on the right so the ear pathway remains visible inside its anatomical housing.',
  },
  '18_Internal_acoustic_meatus_R_approx': {
    title: 'INTERNAL ACOUSTIC MEATUS',
    category: 'Temporal bone & canals',
    description:
      'The internal acoustic meatus is the canal in the posterior petrous face through which the facial (VII) and vestibulocochlear (VIII) nerves pass from the CPA into the temporal bone toward the labyrinth.\n\nVestibular schwannomas classically expand this meatus; MRI of the IAM is standard in asymmetric hearing loss. This mesh is an approximate right-sided corridor linking inner ear to intracranial CN VIII.\n\nTogether with the external meatus it bookends the temporal bone’s sound and nerve pathways.',
  },
  Brainstem: {
    title: 'BRAINSTEM',
    category: 'Brain context',
    description:
      'The brainstem (midbrain, pons, medulla) is the stalk connecting cerebrum and spinal cord. Auditory relays — cochlear nuclei, superior olivary complex, and inferior colliculus — live here before the pathway ascends to thalamus and cortex.\n\nShown ghosted as housing for the central auditory stations so nuclei no longer float in empty space.\n\nToggle Brain context off if you want only the bare pathway nodes.',
  },
  'Temporal_lobe.r': {
    title: 'TEMPORAL LOBE (RIGHT)',
    category: 'Brain context',
    description:
      'The temporal lobe houses primary auditory cortex on the superior temporal plane (Heschl’s gyri) plus auditory association belts involved in speech and sound recognition.\n\nGhosted on the right so Heschl’s gyrus reads as cortex inside the lobe rather than a scrap next to the ear.\n\nToggle Brain context to compare pathway-only versus anatomically framed views.',
  },
};

export const EAR_PATHWAY_RELATIONS = {
  '01_Auricle_external_ear_R': ['17_External_acoustic_meatus_R_approx', '02_Tympanic_membrane'],
  '17_External_acoustic_meatus_R_approx': [
    '01_Auricle_external_ear_R',
    '02_Tympanic_membrane',
    '16_Temporal_bone_petrous_R',
  ],
  '02_Tympanic_membrane': [
    '17_External_acoustic_meatus_R_approx',
    '03_Malleus',
    '04_Incus',
  ],
  '03_Malleus': ['02_Tympanic_membrane', '04_Incus', '05_Stapes'],
  '04_Incus': ['03_Malleus', '05_Stapes', '02_Tympanic_membrane'],
  '05_Stapes': ['04_Incus', '06_Vestibule_oval_window', '15_Bony_labyrinth_R'],
  '06_Vestibule_oval_window': ['05_Stapes', '07_Cochlea', '15_Bony_labyrinth_R'],
  '07_Cochlea': [
    '06_Vestibule_oval_window',
    '15_Bony_labyrinth_R',
    '08_Cochlear_nerve',
  ],
  '15_Bony_labyrinth_R': [
    '07_Cochlea',
    '06_Vestibule_oval_window',
    '16_Temporal_bone_petrous_R',
  ],
  '16_Temporal_bone_petrous_R': [
    '15_Bony_labyrinth_R',
    '17_External_acoustic_meatus_R_approx',
    '18_Internal_acoustic_meatus_R_approx',
  ],
  '18_Internal_acoustic_meatus_R_approx': [
    '09_Vestibulocochlear_nerve_VIII',
    '16_Temporal_bone_petrous_R',
    '08_Cochlear_nerve',
  ],
  '08_Cochlear_nerve': [
    '07_Cochlea',
    '09_Vestibulocochlear_nerve_VIII',
    '18_Internal_acoustic_meatus_R_approx',
  ],
  '09_Vestibulocochlear_nerve_VIII': [
    '08_Cochlear_nerve',
    '18_Internal_acoustic_meatus_R_approx',
    '10_Cochlear_nuclei_brainstem',
  ],
  '10_Cochlear_nuclei_brainstem': [
    '09_Vestibulocochlear_nerve_VIII',
    '11_Superior_olivary_complex',
    '12_Inferior_colliculus',
  ],
  '11_Superior_olivary_complex': [
    '10_Cochlear_nuclei_brainstem',
    '12_Inferior_colliculus',
  ],
  '12_Inferior_colliculus': [
    '11_Superior_olivary_complex',
    '13_Medial_geniculate_body',
    '10_Cochlear_nuclei_brainstem',
  ],
  '13_Medial_geniculate_body': [
    '12_Inferior_colliculus',
    '14_Auditory_cortex_transverse_temporal_gyri',
  ],
  '14_Auditory_cortex_transverse_temporal_gyri': [
    '13_Medial_geniculate_body',
    'Temporal_lobe.r',
  ],
  Brainstem: [
    '10_Cochlear_nuclei_brainstem',
    '11_Superior_olivary_complex',
    '12_Inferior_colliculus',
  ],
  'Temporal_lobe.r': [
    '14_Auditory_cortex_transverse_temporal_gyri',
    '13_Medial_geniculate_body',
  ],
};

export default earPathwayStructures;
