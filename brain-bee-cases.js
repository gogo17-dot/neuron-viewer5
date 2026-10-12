export const cases = [
  {
    id: "pd-01",
    disorder: "Parkinson's disease",
    category: "Degenerative diseases",
    difficulty: "medium",
    history:
      "I'm sixty-four. For about a year my right hand has shaken when I rest it on my lap, and the shaking eases when I reach for a cup. Getting out of a chair takes several tries. My wife says I shuffle and that my right arm no longer swings. People tell me my face looks less expressive in photos. I still manage the household bills and I have not fallen. Buttoning a shirt is slow. Nothing came on suddenly. I barely drink. The tremor is worse at rest and when I am nervous.",
    presentation:
      "Masked facies and a stooped posture. Reduced right-arm swing. A slow pill-rolling rest tremor in the right hand that dampens with action. Mild cogwheel rigidity at the wrist. Short-stepped shuffling gait without cerebellar ataxia. Reflexes are symmetric. No pyramidal weakness.",
    tests: {
      ct: "Age-appropriate volume. No hemorrhage, mass, or acute infarct. Ventricles are not disproportionately enlarged.",
      pet_spect:
        "DaTscan SPECT shows reduced tracer uptake in the posterior putamen, worse on the left, consistent with a nigrostriatal dopaminergic deficit.",
      mri: "No hydrocephalus and no midbrain mass. Mild age-related white-matter change. Routine sequences do not show a competing structural cause for parkinsonism.",
      eeg: "Normal posterior rhythm. No epileptiform discharges.",
      ncs: "Motor and sensory conduction velocities and amplitudes are within normal limits.",
      cognitive:
        "MoCA 27/30. Mild slowing on a timed motor task. Memory and language are intact.",
      blood: "TSH, B12, copper studies, and routine chemistries are normal. Nothing to suggest Wilson disease.",
      csf: "Opening pressure normal. Cell count, protein, and glucose normal. No oligoclonal bands.",
    },
    answer: "Parkinson's disease",
    acceptedAnswers: [
      "Parkinson's",
      "Parkinsons",
      "Parkinson disease",
      "Parkinson's Disease",
      "idiopathic Parkinson's disease",
      "PD",
    ],
    explanation:
      "Asymmetric rest tremor, bradykinesia, and rigidity with a dopaminergic deficit on DaTscan are the common picture of idiopathic Parkinson's disease. Essential tremor is an action tremor with a normal DaTscan. Normal-pressure hydrocephalus would add magnetic gait, incontinence, and large ventricles, which imaging does not show. Multiple system atrophy usually brings early autonomic failure or cerebellar signs, which are absent here.",
    distractors: ["Essential tremor", "Normal pressure hydrocephalus", "Multiple system atrophy"],
  },
  {
    id: "ad-01",
    disorder: "Alzheimer's disease",
    category: "Degenerative diseases",
    difficulty: "medium",
    history:
      "I'm seventy-eight. For two years I have been repeating the same questions, and last month I got lost driving a route I have used for decades. I still dress myself, but I misplaced the bills twice and my daughter now checks the accounts. I have not had a stroke that we know of. I do not drink. Sleep is fair. I know something is wrong with my memory, though I used to joke that it was just age. Names of acquaintances go first. Cooking is simpler than it was.",
    presentation:
      "Alert, well-groomed, and fully mobile. Speech is fluent but she cannot recall three words at five minutes. She is disoriented to the date. No focal weakness, no rest tremor, and no visual-field cut. Gait is steady. Primitive reflexes are absent.",
    tests: {
      ct: "Mild generalized and mesial temporal volume loss. No hemorrhage or large infarct.",
      pet_spect:
        "FDG-PET shows hypometabolism in bilateral posterior cingulate and temporoparietal cortex. Striatal metabolism is preserved.",
      mri: "Hippocampal and entorhinal atrophy, slightly worse on the left. No strategic infarct. White-matter disease is only mild.",
      eeg: "Mild posterior slowing. No epileptiform activity.",
      ncs: "Normal motor and sensory studies.",
      cognitive:
        "MMSE 22/30. Delayed recall 0/3. Clock drawing is impaired. Attention is relatively spared compared with memory.",
      blood: "B12, TSH, syphilis serology, and the metabolic panel are normal, so a reversible mimic is unlikely.",
      csf: "Low Aβ42 with elevated phosphorylated tau, an Alzheimer biomarker profile. Cell count is normal.",
    },
    answer: "Alzheimer's disease",
    acceptedAnswers: [
      "Alzheimer's",
      "Alzheimers",
      "Alzheimer disease",
      "Alzheimer's Disease",
      "AD",
      "Alzheimer dementia",
    ],
    explanation:
      "Insidious episodic memory loss, hippocampal atrophy, temporoparietal hypometabolism, and an Aβ/tau CSF profile are the typical late-onset Alzheimer pattern. Vascular dementia would show stepwise deficits and strategic infarcts. Normal-pressure hydrocephalus presents with gait first, not isolated amnesia. Depression can mimic complaints of memory loss but does not produce this biomarker and imaging signature.",
    distractors: ["Vascular dementia", "Normal pressure hydrocephalus", "Major depressive disorder"],
  },
  {
    id: "ms-01",
    disorder: "Multiple sclerosis",
    category: "Degenerative diseases",
    difficulty: "medium",
    history:
      "I'm twenty-seven. Three years ago my left eye went blurry and painful for two weeks, then recovered. This winter my right foot felt numb for a month. Last week both legs went heavy after a hot shower, and I had a band of tightness around my ribs. I am not pregnant. I do not use drugs. Bladder urgency is new. My mother has Hashimoto thyroiditis. I work at a desk and I am otherwise well.",
    presentation:
      "Left optic disc is mildly pale. Relative afferent pupillary defect on the left. Brisk lower-limb reflexes with a left extensor plantar. Reduced vibration at the right ankle. No truncal rash. Extraocular movements are full today.",
    tests: {
      ct: "Brain CT is unremarkable. No mass or hemorrhage. CT is insensitive for demyelinating plaques.",
      pet_spect:
        "FDG-PET is not used to diagnose relapsing MS and shows no neurodegenerative dementia pattern.",
      mri: "Multiple ovoid periventricular T2/FLAIR lesions perpendicular to the ventricle (Dawson fingers). One enhancing short-segment cervical cord lesion. No longitudinally extensive LETM.",
      eeg: "Normal awake EEG. No encephalitic slowing.",
      ncs: "Normal motor and sensory studies. No conduction block to suggest CIDP.",
      cognitive: "Mild slowing on processing-speed tasks. Memory encoding is intact.",
      blood:
        "B12 is normal. AQP4-IgG and MOG-IgG are negative. ANA and HIV are negative.",
      csf: "Mild lymphocytic pleocytosis. Unmatched oligoclonal bands. Glucose is normal. Protein is slightly raised.",
    },
    answer: "Multiple sclerosis",
    acceptedAnswers: ["MS", "relapsing remitting multiple sclerosis", "RRMS", "disseminated sclerosis"],
    explanation:
      "Separate attacks in time (optic neuritis, then cord) plus dissemination in space on MRI, with unmatched oligoclonal bands, is the common relapsing-remitting MS presentation. Neuromyelitis optica prefers longitudinally extensive cord lesions and AQP4 antibodies, which are absent. B12 deficiency can mimic cord and optic findings but the serum B12 is normal. CIDP is a peripheral demyelinating neuropathy; NCS are normal.",
    distractors: ["Neuromyelitis optica", "B12 deficiency", "CIDP"],
  },
  {
    id: "hd-01",
    disorder: "Huntington's disease",
    category: "Genetic disorders",
    difficulty: "medium",
    history:
      "I'm forty-two. Over three years my hands have started to twitch and jerk when I sit still, and people say I fidget. I lost my job after snapping at colleagues. My father died at fifty-five after years of dancing movements and dementia; his sister was similar. I drink a little beer. I do not take stimulants. Swallowing is a bit messy. I came because my partner is frightened and because I keep dropping cups.",
    presentation:
      "Continuous distal chorea of the fingers and toes, motor impersistence of tongue protrusion, and a dancing, lurching gait. No rest tremor. Saccade initiation is slow. Reflexes are brisk. Insight into the movements is limited. No Kayser-Fleischer rings.",
    tests: {
      ct: "Bilateral caudate flattening with enlarged frontal horns. No acute bleed.",
      pet_spect: "FDG-PET shows marked hypometabolism in the caudate and putamen.",
      mri: "Caudate and putamen atrophy. Cortex is relatively spared for age. No restricted diffusion of an acute infarct.",
      eeg: "Nonspecific slowing. No periodic complexes of prion disease.",
      ncs: "Normal conduction studies.",
      cognitive:
        "Impaired Trails B and verbal fluency. Delayed recall is only mildly reduced. No confabulation.",
      blood:
        "Ceruloplasmin and copper are normal. HTT CAG repeat on blood DNA is in the pathogenic range. Routine chemistries are normal.",
      csf: "Normal cell count and protein. 14-3-3 is not supportive of CJD.",
    },
    answer: "Huntington's disease",
    acceptedAnswers: [
      "Huntington's",
      "Huntingtons",
      "Huntington disease",
      "Huntington's Disease",
      "HD",
      "Huntington chorea",
    ],
    explanation:
      "Adult-onset chorea, psychiatric change, autosomal-dominant family history, caudate atrophy, and a pathogenic HTT CAG expansion are the classic Huntington picture. Wilson disease presents younger, with abnormal copper studies and often Kayser-Fleischer rings. Tardive dyskinesia follows dopamine-blocking drugs, which are not in the history. Sydenham chorea is a post-streptococcal childhood illness, not a progressive midlife dementia with caudate loss.",
    distractors: ["Wilson's disease", "Tardive dyskinesia", "Sydenham chorea"],
  },
  {
    id: "stroke-01",
    disorder: "Stroke",
    category: "Vascular disorders",
    difficulty: "easy",
    history:
      "I'm sixty-one. An hour ago, while talking at breakfast, the right side of my face went slack and I could not find words. My right arm felt heavy. I did not lose consciousness. I have high blood pressure and I smoke. There was no thunderclap headache. I take aspirin some days. My wife says I was fine last night. I can follow some commands with my left hand. This has never happened before.",
    presentation:
      "Right lower-face weakness, right arm denser than leg, and non-fluent aphasia with relatively spared comprehension of simple commands. Gaze preference toward the left. Plantar response is extensor on the right. No meningism. Blood pressure 178/96.",
    tests: {
      ct: "Hyperdense left MCA sign. No hemorrhage. Parenchyma still looks isodense, as expected in the hyperacute window.",
      pet_spect:
        "PET/SPECT is not part of hyperacute stroke pathways and would not replace CT/MRI for thrombolysis decisions. No tracer study was diagnostically useful here.",
      mri: "DWI restriction in the left MCA territory involving insula and frontal operculum, with ADC drop. MRA shows a left M1 cutoff.",
      eeg: "Left hemispheric slowing. No evolving seizure pattern that could explain a purely post-ictal deficit.",
      ncs: "Normal. The weakness is upper motor neuron, not a plexopathy or radial palsy.",
      cognitive:
        "Bedside language: Broca-type aphasia. Cannot name or repeat well. Follows midline commands with the left limbs.",
      blood:
        "Glucose 6.2 mmol/L. Platelets and coagulation are normal. Troponin is normal. LDL cholesterol is raised.",
      csf: "Colorless fluid without xanthochromia; protein and cells are normal. This does not support subarachnoid hemorrhage or meningitis.",
    },
    answer: "Stroke",
    acceptedAnswers: [
      "ischemic stroke",
      "ischaemic stroke",
      "CVA",
      "cerebrovascular accident",
      "left MCA stroke",
      "middle cerebral artery stroke",
      "brain infarct",
      "cerebral infarction",
    ],
    explanation:
      "Sudden focal cortical signs (aphasia plus right face/arm) in a person with vascular risk factors, a hyperdense MCA, and DWI restriction are an acute ischemic left MCA stroke. Todd's paresis follows a witnessed seizure and should improve; EEG here is slowing without an ictal pattern. Migraine aura is usually positive sensory/visual symptoms in a younger patient without an arterial cutoff. Conversion disorder does not produce a hyperdense MCA or DWI lesion.",
    distractors: ["Seizure with Todd's paralysis", "Migraine with aura", "Functional neurological disorder"],
  },
  {
    id: "mg-01",
    disorder: "Myasthenia gravis",
    category: "Generalized diseases of muscle or peripheral nerves",
    difficulty: "medium",
    history:
      "I'm thirty-four. For four months my eyelids droop by evening, and double vision comes when I drive home. Chewing steak makes my jaw tired. Last week after climbing stairs my voice went nasal. Mornings are better. I have not had limb numbness. I was treated for a cold and the symptoms worsened for a day on the antibiotic. I am not pregnant. No family muscle disease. Swallowing liquids sometimes makes me cough.",
    presentation:
      "Bilateral ptosis that worsens on sustained upgaze. Fatigable proximal arm weakness. Pupils equal and reactive. An ice-pack test improves the ptosis. No wasting, no fasciculations, and tendon reflexes are preserved. Sensation is intact.",
    tests: {
      ct: "Chest CT shows no thymoma. Lung fields are clear. Brain CT is normal.",
      pet_spect: "No FDG-avid mediastinal mass. PET is not a first-line test for myasthenia.",
      mri: "Brain and orbit MRI are normal. No cavernous sinus lesion to explain fatigable diplopia.",
      eeg: "Normal EEG.",
      ncs: "Repetitive nerve stimulation of nasalis at 3 Hz shows an 18% decrement. Single-fiber EMG shows increased jitter. Sensory NCS are normal.",
      cognitive: "Normal cognition. The fatigue is motor, not attentional.",
      blood: "Acetylcholine-receptor antibodies are strongly positive. TSH is normal. CK is normal.",
      csf: "Normal CSF. This is not a central demyelinating syndrome.",
    },
    answer: "Myasthenia gravis",
    acceptedAnswers: ["MG", "myasthenia", "autoimmune myasthenia gravis", "ocular-bulbar myasthenia gravis"],
    explanation:
      "Fatigable ptosis, diplopia, and bulbar weakness with a decrement, jitter, and AChR antibodies are typical myasthenia gravis. Lambert-Eaton usually has reduced reflexes, autonomic dryness, and increment after exercise, often with a cancer workup. Botulism is acute, descending, and often with poorly reactive pupils after spoiled food. Miller Fisher syndrome adds ataxia and areflexia with ophthalmoplegia, not fatigable evening ptosis with positive AChR antibodies.",
    distractors: ["Lambert-Eaton myasthenic syndrome", "Botulism", "Miller Fisher syndrome"],
  },
  {
    id: "als-01",
    disorder: "Amyotrophic lateral sclerosis",
    category: "Generalized diseases of muscle or peripheral nerves",
    difficulty: "hard",
    history:
      "I'm fifty-eight. For eight months my right hand has wasted and I drop keys. My legs cramp at night and I have noticed twitching in my thighs. Speech is a bit slurred when I am tired. I have no numbness and no pain. Swallowing thin liquids has started to catch. I still walk, but I trip on curbs. There is no similar illness in the family. I do not have a heavy metal exposure that I know of.",
    presentation:
      "Split-hand wasting, fasciculations in four limbs and the tongue, a brisk jaw jerk, and a spastic catch in the legs. Sensation is completely intact. Extraocular movements are full. There is no bladder involvement.",
    tests: {
      ct: "Brain and cervical CT show no obvious compressive myelopathy. Soft-tissue detail is limited on CT.",
      pet_spect: "Mild frontal hypometabolism, nonspecific. Not required to establish the motor diagnosis.",
      mri: "Brain may show T2 corticospinal hyperintensity. Cervical cord: no stenosis and no syrinx. Brainstem otherwise normal.",
      eeg: "Normal EEG.",
      ncs: "Sensory responses are normal. Motor amplitudes are reduced in the wasted hand. EMG shows active denervation and reinnervation in cervical, thoracic, and lumbosacral myotomes, including thoracic paraspinals.",
      cognitive: "Mild frontal disinhibition on a bedside screen; otherwise oriented.",
      blood: "CK is only mildly elevated. B12, TSH, SPEP, HIV, and Lyme serology are normal.",
      csf: "Normal protein and cells, which argues against an inflammatory polyradiculopathy.",
    },
    answer: "Amyotrophic lateral sclerosis",
    acceptedAnswers: ["ALS", "motor neuron disease", "MND", "Lou Gehrig's disease", "Lou Gehrig disease"],
    explanation:
      "Mixed upper and lower motor neuron signs spanning several regions, tongue fasciculations, intact sensation, and EMG denervation including thoracic paraspinals are the common ALS pattern. Cervical myelopathy can mix UMN and LMN signs in the arms but should not fibrillate the tongue or thoracic paraspinals, and MRI would show stenosis. Multifocal motor neuropathy is purely lower motor, often with conduction block, and is treatable. Primary lateral sclerosis is upper motor neuron only, without wasting and fasciculations.",
    distractors: ["Cervical myelopathy", "Multifocal motor neuropathy", "Primary lateral sclerosis"],
  },
  {
    id: "dmd-01",
    disorder: "Duchenne muscular dystrophy",
    category: "Generalized diseases of muscle or peripheral nerves",
    difficulty: "medium",
    history:
      "I'm six. I walked late and I still cannot run like the other children. When I get up from the floor I have to push on my knees. People say my calves are big. I do not hurt. School letters are hard. Mum says her brothers used wheelchairs as teenagers and one died when breathing got weak. I fall in the playground. Stairs are the worst. I do not feel numb. I eat well.",
    presentation:
      "Boy with calf pseudohypertrophy, lumbar lordosis, and a positive Gowers sign. Waddling gait. Knee jerks are reduced. No sensory level. The tongue is not fasciculating. The spine is straight today.",
    tests: {
      ct: "Head CT is normal. CT does not show the muscle pattern needed for this diagnosis.",
      pet_spect: "PET/SPECT is not used in the standard pediatric muscular dystrophy workup and is non-diagnostic here.",
      mri: "Thigh muscle MRI shows fatty replacement of adductors and quadriceps with relative sparing of sartorius, typical of a dystrophinopathy. Brain MRI is unremarkable.",
      eeg: "Normal EEG.",
      ncs: "Sensory NCS are normal. EMG is myopathic, without a decrement of myasthenia and without the neurogenic recruitment of SMA.",
      cognitive: "Mild difficulty with phonological tasks. There is no developmental regression.",
      blood:
        "CK is 18,000 U/L. AST and ALT are raised from muscle. Blood DNA shows a dystrophin gene deletion.",
      csf: "Normal CSF. This is not an inflammatory CNS process.",
    },
    answer: "Duchenne muscular dystrophy",
    acceptedAnswers: ["DMD", "Duchenne", "Duchenne dystrophy", "dystrophinopathy", "Duchenne's muscular dystrophy"],
    explanation:
      "A young boy with Gowers sign, calf pseudohypertrophy, a very high CK, maternal-line family history, and a dystrophin deletion is Duchenne muscular dystrophy. Becker dystrophy uses the same gene but presents later and milder; this early, severe course is Duchenne. Spinal muscular atrophy is neurogenic with fasciculations and a normal or modest CK, not this muscle MRI pattern. Inflammatory myopathy is painful, subacute, and not an X-linked childhood story with calf hypertrophy.",
    distractors: ["Becker muscular dystrophy", "Spinal muscular atrophy", "Inflammatory myopathy"],
  },
  {
    id: "ep-01",
    disorder: "Epilepsy",
    category: "Epilepsy",
    difficulty: "medium",
    history:
      "I'm twenty-two. For a year I have spells that start with a rising stomach feeling and a smell of burning rubber, then I stare and pick at my shirt. Afterwards I am confused for ten minutes. Last month I woke on the floor with a bitten tongue and wet trousers; my roommate heard a cry and stiffening. I drink on weekends. I had a febrile seizure as a toddler. I am otherwise well and I work in a shop.",
    presentation:
      "Between events the exam is normal: no papilledema, no focal weakness, no meningism. A well-healed lateral tongue laceration is visible. Vital signs are normal. There is no post-ictal Todd paresis today.",
    tests: {
      ct: "Normal CT. No hemorrhage or mass.",
      pet_spect:
        "Interictal FDG-PET, if obtained in a surgical workup, shows left anterior temporal hypometabolism.",
      mri: "Left hippocampal sclerosis: atrophy and T2 hyperintensity of the hippocampus. No tumor.",
      eeg: "Left anterior temporal sharp waves in drowsiness. This is not the generalized spike-wave of absence epilepsy.",
      ncs: "Normal nerve conduction studies.",
      cognitive: "Mild verbal memory inefficiency. Orientation is intact.",
      blood:
        "Glucose, electrolytes, and toxicology are unremarkable after the last event. There is no metabolic trigger that fully explains recurrent unprovoked seizures.",
      csf: "Normal cells and protein. HSV PCR is negative. This is not encephalitis.",
    },
    answer: "Epilepsy",
    acceptedAnswers: [
      "temporal lobe epilepsy",
      "focal epilepsy",
      "focal seizures",
      "complex partial seizures",
      "focal impaired awareness seizures",
      "mesial temporal lobe epilepsy",
      "seizure disorder",
    ],
    explanation:
      "Recurrent unprovoked events with an epigastric/olfactory aura, automatisms, a bilateral tonic-clonic seizure, hippocampal sclerosis, and temporal sharp waves are mesial temporal lobe epilepsy. Syncope lacks a rising aura and tongue bite of this kind, and EEG/MRI would be unrevealing. Psychogenic non-epileptic seizures can mimic convulsions but do not produce hippocampal sclerosis or epileptiform EEG. Panic attacks are not followed by a witnessed tonic phase and incontinence with an epileptogenic MRI lesion.",
    distractors: ["Syncope", "Psychogenic non-epileptic seizures", "Panic attacks"],
  },
  {
    id: "men-01",
    disorder: "Meningitis",
    category: "Infection",
    difficulty: "easy",
    history:
      "I'm nineteen. For two days I have had the worst headache of my life, fever, and vomiting. Light hurts my eyes. My neck is stiff. I am a university student in a dormitory. I am not HIV-positive that I know of. I have not travelled. This morning I felt confused about the date. I do not use IV drugs. I had a sore throat last week. I have no ear pain that I recall. I came because I could not sit up.",
    presentation:
      "Febrile and photophobic, with nuchal rigidity and a positive Kernig sign. No papilledema. A few petechiae on the legs. No focal weakness. Glasgow Coma Scale 14. Tympanic membranes are clear.",
    tests: {
      ct: "CT before lumbar puncture: no mass effect and no abscess. Sinuses are clear.",
      pet_spect: "PET/SPECT is not indicated in acute bacterial meningitis and adds no acute diagnostic value.",
      mri: "Leptomeningeal enhancement. No established infarct. No subdural empyema.",
      eeg: "Diffuse slowing consistent with an encephalopathic state. No status epilepticus pattern.",
      ncs: "Normal nerve conduction studies.",
      cognitive: "Inattentive and slow. This is an acute confusional state, not a chronic amnestic dementia.",
      blood:
        "WBC 18 × 10^9/L with neutrophilia. CRP is high. Blood glucose is normal, which makes the low CSF glucose more meaningful. Cultures are pending.",
      csf: "Cloudy CSF. WBC 1200 with neutrophil predominance, protein 2.1 g/L, glucose 1.2 mmol/L (low versus serum). Gram-positive diplococci. Opening pressure is raised.",
    },
    answer: "Meningitis",
    acceptedAnswers: [
      "bacterial meningitis",
      "acute bacterial meningitis",
      "pneumococcal meningitis",
      "meningococcal meningitis",
      "pyogenic meningitis",
    ],
    explanation:
      "Acute fever, neck stiffness, photophobia, and a neutrophil-rich, low-glucose CSF with organisms is acute bacterial meningitis — here a pneumococcal-type Gram stain in a young adult. Subarachnoid hemorrhage can cause thunderclap headache and neck stiffness but not this CSF formula or fever with diplococci. Viral meningitis has a lymphocytic CSF and normal glucose. Migraine does not produce fever, petechiae, or this lumbar puncture.",
    distractors: ["Subarachnoid hemorrhage", "Viral meningitis", "Migraine"],
  },
  {
    id: "wks-01",
    disorder: "Wernicke-Korsakoff syndrome",
    category: "Addiction and substances of abuse",
    difficulty: "medium",
    history:
      "I'm fifty-six. I have drunk heavily for twenty years. For weeks I have been unsteady, and my eyes feel wrong. The hostel staff say I invent stories about visitors who never came. I cannot recall what I ate this morning. I had vomiting last month and ate poorly. I do not think I am confused, but they brought me in. I have lost weight. My hands tingle at night. I have no fever. I still want a drink.",
    presentation:
      "Bilateral sixth-nerve palsy and nystagmus, ataxic gait, and profound disorientation. Confabulates a hospital outing that did not occur. Pupils are reactive. No meningism. Cachectic. Peripheral sensory loss in a stocking pattern.",
    tests: {
      ct: "Cerebral atrophy, especially of the vermis. No acute hemorrhage or large subdural collection.",
      pet_spect: "Thalamic and mammillary hypometabolism. Helpful if MRI is unavailable, not required when MRI is classic.",
      mri: "T2/FLAIR hyperintensity in periaqueductal grey and mammillary bodies. This is not an isolated hippocampal Alzheimer pattern.",
      eeg: "Diffuse slowing. Not the triphasic-wave dominance of frank hepatic coma.",
      ncs: "Axonal sensory-motor polyneuropathy, consistent with alcohol-related neuropathy.",
      cognitive:
        "Cannot recall four words at one minute. Confabulation is prominent. Attention is better than memory, so this is not delirium alone.",
      blood:
        "Low thiamine. Macrocytosis. Mildly raised GGT. Glucose is normal. Ammonia is not in a coma range.",
      csf: "Normal cells and protein. This is not meningitis.",
    },
    answer: "Wernicke-Korsakoff syndrome",
    acceptedAnswers: [
      "Wernicke-Korsakoff",
      "Wernicke Korsakoff",
      "Wernicke's encephalopathy",
      "Wernicke encephalopathy",
      "Korsakoff syndrome",
      "Korsakoff's syndrome",
      "Korsakoff psychosis",
      "WKS",
    ],
    explanation:
      "The classic triad of ophthalmoplegia, ataxia, and confusion, plus dense amnesia with confabulation in a person with alcohol use and low thiamine, and mammillary T2 change, is Wernicke-Korsakoff syndrome. Alzheimer disease is a slower cortical amnesia without acute ophthalmoplegia or this midbrain MRI. Hepatic encephalopathy is a fluctuating delirium with a metabolic EEG/ammonia picture, not a fixed Korsakoff amnesia. Bilateral chronic subdural hematomas would show on CT, which they do not.",
    distractors: ["Alzheimer's disease", "Hepatic encephalopathy", "Chronic subdural hematoma"],
  },
  {
    id: "ulnar-01",
    disorder: "Ulnar nerve injury",
    category: "Peripheral nerve injury",
    difficulty: "medium",
    history:
      "I'm forty-one. Three months after I broke my left elbow I noticed the little finger going numb, and I keep catching that finger when I put my hand in a pocket. Grip on a key is weak. I wake with the elbow sore if I sleep with it bent. I do not have neck pain. My legs are fine. I work at a desk and I lean on that elbow. The problem has not spread to the thumb.",
    presentation:
      "Ulnar clawing of the ring and little fingers, a positive Froment sign, and sensory loss on the palmar little finger and ulnar half of the ring finger. Dorsal ulnar cutaneous sensation is also reduced. Neck exam and lower limbs are normal. No Horner syndrome.",
    tests: {
      ct: "Elbow CT shows a healed condylar injury with some callus. Cervical CT does not show a convincing bony foraminal spur.",
      pet_spect: "Normal PET/SPECT. This modality does not localise an entrapment neuropathy.",
      mri: "Ulnar nerve T2 hyperintensity and enlargement at the cubital tunnel. Cervical cord and roots are unremarkable. Brain is normal.",
      eeg: "Normal EEG.",
      ncs: "Focal slowing and conduction block of the ulnar motor response across the elbow. Ulnar sensory SNAP is reduced. Median and radial studies are normal. EMG: denervation in FDI and ADM; flexor carpi ulnaris is involved.",
      cognitive: "Normal cognition.",
      blood: "Glucose, HbA1c, and TSH are normal. No systemic neuropathy screen is abnormal.",
      csf: "Normal CSF. This is not Guillain-Barré or myelitis.",
    },
    answer: "Ulnar nerve injury",
    acceptedAnswers: [
      "ulnar neuropathy",
      "ulnar nerve palsy",
      "ulnar neuropathy at the elbow",
      "cubital tunnel syndrome",
      "tardy ulnar palsy",
      "ulnar entrapment",
      "left ulnar neuropathy",
    ],
    explanation:
      "Clawing of 4–5, Froment sign, and sensory loss including the dorsal ulnar cutaneous territory after an elbow injury, with conduction block at the cubital tunnel, is an ulnar nerve lesion at the elbow. A C8–T1 radiculopathy usually adds neck pain or a broader myotomal map and would not show focal slowing across the elbow. Thoracic outlet syndrome is more likely to involve thenar median-innervated muscles and often the medial forearm. ALS would not produce a sensory SNAP loss or a focal elbow conduction block.",
    distractors: ["C8-T1 radiculopathy", "Thoracic outlet syndrome", "Amyotrophic lateral sclerosis"],
  },
  {
    id: "cjd-01",
    disorder: "Creutzfeldt-Jakob disease",
    category: "Prion disease",
    difficulty: "hard",
    history:
      "I'm sixty-three. Four months ago I started losing words and misplacing things, and it has moved fast — my wife says I am a different person since spring. I jerk when a door slams, my whole body, and the jerks are getting worse. I stagger now and I have stopped driving. I see shapes at the edge of the room that are not there. No head injury. I drink rarely. Nobody in my family had dementia. I have had no fever.",
    presentation:
      "Marked cognitive decline over months with a startle-sensitive myoclonus of the trunk and limbs. Gait ataxia and dysmetria. Increased tone with brisk reflexes. Visual misperceptions are reported. No fever, no neck stiffness, no papilloedema. Ophthalmoplegia is absent.",
    tests: {
      ct: "Mild generalised volume loss for age. No hemorrhage, mass, hydrocephalus, or large infarct.",
      pet_spect: "FDG-PET shows patchy cortical hypometabolism that does not fit the temporoparietal pattern of Alzheimer disease.",
      mri: "DWI and FLAIR hyperintensity along the cortical ribbon with involvement of the caudate and putamen. No enhancement, no mass, ventricles are normal in size.",
      eeg: "Generalised periodic sharp wave complexes at roughly one per second on a slow background.",
      ncs: "Motor and sensory conduction studies are normal.",
      cognitive: "MoCA 12/30 with severe attentional and visuospatial failure. Rapid decline documented across two visits eight weeks apart.",
      blood: "Thyroid, B12, sodium, calcium, liver function, and autoimmune encephalitis antibodies are unremarkable.",
      csf: "Cell count and glucose normal, protein mildly raised. RT-QuIC is positive and 14-3-3 protein is elevated. No oligoclonal bands.",
    },
    answer: "Creutzfeldt-Jakob disease",
    acceptedAnswers: [
      "CJD",
      "Creutzfeldt Jakob disease",
      "sporadic CJD",
      "prion disease",
      "sporadic Creutzfeldt-Jakob disease",
    ],
    explanation:
      "A dementia that progresses over months rather than years, together with startle myoclonus, ataxia, cortical ribboning on DWI, periodic sharp waves on EEG, and a positive RT-QuIC, is sporadic Creutzfeldt-Jakob disease. Alzheimer disease is the main trap because it also causes amnesia, but it unfolds over years and produces neither myoclonus this early nor these MRI and EEG findings. Autoimmune encephalitis can look similarly rapid, yet antibodies are negative and there is no CSF inflammation. Hashimoto encephalopathy would be expected to show thyroid abnormalities.",
    distractors: ["Alzheimer's disease", "Autoimmune encephalitis", "Hashimoto encephalopathy"],
  },
  {
    id: "nph-01",
    disorder: "Normal pressure hydrocephalus",
    category: "CSF disorders",
    difficulty: "medium",
    history:
      "I'm seventy-four. For a year my feet have felt stuck to the floor, as if the ground holds them; turning is the worst part and I shuffle with my legs apart. I have fallen twice. In the last few months I have been wetting myself before I can reach the bathroom, which shames me. My thinking is slower and I forget appointments, but I still know my family and my own history. No tremor. No stroke that I know of. No head injury.",
    presentation:
      "A wide-based, magnetic gait with short steps and marked difficulty turning. Urinary urge incontinence. Mild psychomotor slowing with relatively preserved recall for the degree of gait failure. No rest tremor, no cogwheel rigidity. Fundoscopy shows no papilloedema.",
    tests: {
      ct: "Ventriculomegaly out of proportion to cortical atrophy. No hemorrhage, no mass, no infarct.",
      pet_spect: "FDG-PET does not show the temporoparietal or posterior cingulate pattern of Alzheimer disease, and striatal tracer studies are not diagnostic here.",
      mri: "Enlarged lateral and third ventricles with a rounded frontal horn contour, an Evans index above 0.3, tight high-convexity sulci, and an upwardly bowed corpus callosum. The aqueduct is patent and there is no obstructing lesion.",
      eeg: "Mild diffuse slowing. No epileptiform discharges.",
      ncs: "Normal motor and sensory studies. No peripheral neuropathy to explain the gait.",
      cognitive: "MoCA 23/30 with a frontal-subcortical profile: slowed processing and poor set-shifting, with recall improved by cueing.",
      blood: "B12, TSH, glucose, and syphilis serology are normal.",
      csf: "Opening pressure is at the upper end of normal. Cells, protein, and glucose are normal. After removing 40 mL, gait speed and turning improve markedly for two days.",
    },
    answer: "Normal pressure hydrocephalus",
    acceptedAnswers: [
      "NPH",
      "hydrocephalus",
      "normal-pressure hydrocephalus",
      "communicating hydrocephalus",
      "idiopathic normal pressure hydrocephalus",
    ],
    explanation:
      "Gait failure first, then incontinence and subcortical slowing, with ventricles too large for the degree of atrophy and clear improvement after a large-volume tap, is normal pressure hydrocephalus — and it matters because shunting can reverse it. Alzheimer disease is the trap, but there memory leads rather than gait, cueing does not rescue recall, and a tap changes nothing. Parkinson disease can also shuffle, yet it brings rest tremor and cogwheel rigidity and responds to dopamine, not to CSF drainage. Obstructive hydrocephalus is excluded by a patent aqueduct and a proportionally enlarged fourth ventricle.",
    distractors: ["Alzheimer's disease", "Parkinson's disease", "Obstructive hydrocephalus"],
  },
  {
    id: "tbi-01",
    disorder: "Traumatic brain injury",
    category: "Trauma",
    difficulty: "easy",
    history:
      "I'm twenty-two. I came off my bike without a helmet three days ago, hit the right side of my head, and I am told I was out for about a minute. I cannot remember the ride or the ambulance. Since then my head aches constantly, bright light and noise are unbearable, and I feel sick. I am irritable and cannot concentrate on a screen for more than a few minutes. My mother says I ask the same questions. No fever, no neck stiffness, no weakness, no fits.",
    presentation:
      "Alert and oriented, GCS 15 now, with post-traumatic amnesia covering the event. Scalp abrasion and tenderness over the right temporal region. Slowed processing on bedside testing. Pupils equal and reactive, no focal weakness, no meningism, no papilloedema. Reflexes symmetric with downgoing toes.",
    tests: {
      ct: "Small right temporal cortical contusion with a trace of overlying subarachnoid blood. No extra-axial collection needing evacuation, no skull fracture, no midline shift.",
      pet_spect: "Not indicated acutely and adds nothing to management in this setting.",
      mri: "Gradient-echo and susceptibility sequences confirm the temporal contusion and show a few punctate foci at the grey-white junction, in keeping with mild diffuse axonal injury. No mass lesion, no infarct, ventricles normal.",
      eeg: "Normal background for age. No epileptiform discharges, so no evidence of post-traumatic seizures.",
      ncs: "Normal motor and sensory studies.",
      cognitive: "Deficits in sustained attention, processing speed, and delayed recall, with preserved language and no visuospatial failure.",
      blood: "Full blood count, coagulation, electrolytes, glucose, and alcohol screen are unremarkable.",
      csf: "Not performed. There is no fever or meningism, and lumbar puncture is contraindicated after acute head trauma with an intracranial lesion.",
    },
    answer: "Traumatic brain injury",
    acceptedAnswers: [
      "TBI",
      "traumatic brain injury with contusion",
      "cerebral contusion",
      "head injury",
      "mild traumatic brain injury",
      "concussion with contusion",
    ],
    explanation:
      "Direct head impact with loss of consciousness, post-traumatic amnesia, a contusion on CT, and microhaemorrhages at the grey-white junction is traumatic brain injury; the persisting headache, light sensitivity, irritability, and slowed thinking are the expected post-concussive course. An epidural haematoma is the dangerous mimic to exclude, but that would show a lens-shaped extra-axial collection and a deteriorating conscious level rather than a stable GCS of 15. Meningitis is ruled out by the absence of fever and neck stiffness. A migraine would not explain amnesia for the event or imaging findings.",
    distractors: ["Epidural hematoma", "Bacterial meningitis", "Migraine with aura"],
  },
  {
    id: "sci-01",
    disorder: "Cervical spinal cord injury",
    category: "Trauma",
    difficulty: "medium",
    history:
      "I'm nineteen. I dived into shallow water yesterday and struck my head on the bottom. I have not been able to move my legs since, and my arms are weak below the shoulders and elbows — I can bend my elbows but I cannot straighten them or grip. From about my collarbones down I feel almost nothing, and I could not tell when the nurse touched my legs. I have not passed urine. My neck hurts. I never lost consciousness and my thinking is clear.",
    presentation:
      "Flaccid tetraparesis with elbow flexion preserved, absent wrist and hand power, and no movement in the legs. A sensory level at C6 to pinprick and light touch. Areflexia below the lesion with retained biceps jerk, absent bulbocavernosus reflex, and a distended bladder. Diaphragmatic breathing is adequate. Cranial nerves are intact.",
    tests: {
      ct: "Cervical CT shows a burst fracture of C6 with retropulsion of bone into the canal. No skull fracture and no intracranial hemorrhage.",
      pet_spect: "Not indicated and contributes nothing in acute trauma.",
      mri: "Cord signal change and swelling centred at C6 with canal narrowing and anterior cord compression. No epidural abscess or tumour. Brain imaging is normal.",
      eeg: "Normal EEG. Consciousness is unaffected, which fits a lesion below the brainstem.",
      ncs: "Absent motor responses in the legs and reduced responses in the hands, with normal proximal upper-limb studies. No demyelinating features and no conduction block to suggest Guillain-Barré syndrome.",
      cognitive: "Fully alert and oriented with normal cognition.",
      blood: "Full blood count, electrolytes, and creatine kinase are consistent with acute trauma. No inflammatory markers of infection.",
      csf: "Not performed. Lumbar puncture is unnecessary and unsafe here, and there is no clinical suspicion of infection.",
    },
    answer: "Cervical spinal cord injury",
    acceptedAnswers: [
      "spinal cord injury",
      "traumatic spinal cord injury",
      "cervical cord injury",
      "C6 spinal cord injury",
      "traumatic cervical myelopathy",
      "tetraplegia from spinal cord injury",
    ],
    explanation:
      "A dive into shallow water, a C6 burst fracture, a clean sensory level, and flaccid areflexic weakness below it locate the lesion in the cervical cord — the early flaccidity and areflexia are spinal shock, and tone and reflexes will rise later. Guillain-Barré syndrome is the ascending-weakness mimic, but it does not produce a sharp sensory level or a bony fracture, and nerve conduction shows no demyelination. A brainstem stroke would involve cranial nerves and consciousness. Transverse myelitis presents over hours to days with inflammatory CSF rather than instantly after impact.",
    distractors: ["Guillain-Barré syndrome", "Brainstem stroke", "Transverse myelitis"],
  },
  {
    id: "tourette-01",
    disorder: "Tourette syndrome",
    category: "Neurodevelopmental disorders",
    difficulty: "medium",
    history:
      "I'm eleven. Since I was seven I blink hard and jerk my head to one side, and this year I started making a throat noise and sometimes a short bark that embarrasses me in class. It comes in waves — bad for a few weeks, then quieter. I get a feeling that builds up, like an itch I have to answer, and doing it brings relief. I can hold it in during a test but then it bursts out afterwards. I check things over and over too. I sleep fine and I am doing well at school.",
    presentation:
      "Multiple motor tics, including forceful blinking and head jerks, together with vocal tics of throat clearing and barking, present for more than a year with a waxing and waning course. Tics are suppressible, preceded by a premonitory urge, and increase with stress. Strength, reflexes, coordination, and gait are normal. There is no chorea and no dystonic posturing at rest.",
    tests: {
      ct: "Normal for age. No structural lesion, no calcification.",
      pet_spect: "Research studies show altered cortico-striato-thalamo-cortical activity, but imaging is not used to make this diagnosis clinically.",
      mri: "No caudate atrophy, no basal ganglia signal change, no demyelination. Structurally normal brain.",
      eeg: "Normal awake EEG with no epileptiform discharges, so these events are not seizures.",
      ncs: "Normal motor and sensory studies.",
      cognitive: "Normal intelligence and academic attainment. Screening is positive for obsessive-compulsive traits and mild inattention.",
      blood: "Copper, ceruloplasmin, and liver function are normal, excluding Wilson disease. Streptococcal serology and inflammatory markers are unremarkable.",
      csf: "Not performed. There is no encephalopathy, fever, or focal deficit to justify it.",
    },
    answer: "Tourette syndrome",
    acceptedAnswers: [
      "Tourette's",
      "Tourettes",
      "Tourette's syndrome",
      "Tourette disorder",
      "Gilles de la Tourette syndrome",
      "chronic tic disorder with vocal and motor tics",
    ],
    explanation:
      "Both motor and vocal tics lasting more than a year in a child, with a premonitory urge, brief suppressibility, and a waxing and waning course on a normal examination, define Tourette syndrome. Huntington disease is the movement-disorder trap, but its chorea cannot be suppressed or preceded by an urge, and it comes with caudate atrophy and cognitive decline. Focal seizures are excluded by a normal EEG and by the fact that these movements can be held back voluntarily. Wilson disease is excluded by normal copper studies and the absence of dystonia and liver disease.",
    distractors: ["Huntington's disease", "Focal seizures", "Wilson disease"],
  },
  {
    id: "radial-01",
    disorder: "Radial nerve injury",
    category: "Peripheral nerve injury",
    difficulty: "medium",
    history:
      "I'm thirty-five. I fell asleep on a hard chair with my right arm hooked over the back of it after a long night, and when I woke my wrist would not lift. That was two days ago. My hand hangs down and I cannot straighten my fingers or lift my wrist, and gripping is weak because of the position. The back of my hand between the thumb and index finger feels numb. My elbow straightens normally and my shoulder is fine. I have no neck pain and my legs are normal.",
    presentation:
      "Wrist drop with inability to extend the wrist, fingers at the metacarpophalangeal joints, or the thumb. Grip appears weak but improves when the wrist is passively supported. Sensory loss over the dorsal first web space. Triceps power and the triceps reflex are preserved. Neck examination and lower limbs are normal.",
    tests: {
      ct: "No humeral fracture. Cervical CT shows no foraminal narrowing.",
      pet_spect: "Normal. This modality does not localise a compressive mononeuropathy.",
      mri: "T2 hyperintensity of the radial nerve in the spiral groove of the humerus. The cervical cord and roots are unremarkable and the brachial plexus is normal.",
      eeg: "Normal EEG.",
      ncs: "Conduction block of the radial motor response across the spiral groove with a normal response distal to it. Superficial radial sensory amplitude is reduced. Median and ulnar studies are normal. EMG shows reduced recruitment in the extensors with a spared triceps.",
      cognitive: "Normal cognition.",
      blood: "Glucose, HbA1c, and vasculitis screen are normal, so there is no systemic cause for a mononeuropathy.",
      csf: "Normal CSF and not required. This is neither Guillain-Barré syndrome nor myelitis.",
    },
    answer: "Radial nerve injury",
    acceptedAnswers: [
      "radial neuropathy",
      "radial nerve palsy",
      "Saturday night palsy",
      "radial nerve compression at the spiral groove",
      "wrist drop from radial nerve injury",
      "right radial neuropathy",
    ],
    explanation:
      "Wrist and finger extension failure with sensory loss in the dorsal first web space after the arm was compressed against a hard edge, plus conduction block at the spiral groove, is a radial nerve lesion — and the spared triceps places the compression below its branches. A C7 radiculopathy is the usual trap, but it typically brings neck pain, a weak triceps with a depressed triceps reflex, and no focal block on nerve conduction. An ulnar lesion would claw the ring and little fingers and spare wrist extension. A central lesion such as a stroke would give increased tone and brisk reflexes rather than an isolated wrist drop with a sensory patch.",
    distractors: ["C7 radiculopathy", "Ulnar nerve injury", "Cortical stroke"],
  },
  {
    id: "rett-01",
    disorder: "Rett syndrome",
    category: "Neurodevelopmental disorders",
    difficulty: "hard",
    history:
      "This history is given by the mother of a four-year-old girl. She developed normally at first: she sat, walked at thirteen months, and said about twenty words. Between eighteen months and two years we lost all of it. The words went first and never came back, and she stopped using her hands for toys. Now she wrings and clasps her hands almost constantly and puts them to her mouth. Her head seemed to stop growing in the second year. She breathes fast and then holds her breath when she is awake, never in sleep, and she has had two seizures. She is not in pain and she still smiles at me.",
    presentation:
      "A four-year-old girl with acquired microcephaly, absent speech, and loss of purposeful hand use, replaced by continuous hand-wringing and mouthing stereotypies. Gait is stiff and wide-based. Episodes of hyperventilation alternating with breath-holding occur only while awake. Truncal ataxia and bruxism are present. Eye contact and social smiling are preserved. No organomegaly and no coarse features.",
    tests: {
      ct: "Mildly small brain volume without malformation, hemorrhage, or calcification.",
      pet_spect: "Not diagnostic and not part of standard assessment.",
      mri: "Slightly reduced cerebral volume with normal gyral pattern. No leukodystrophy, no basal ganglia lesion, no cortical malformation, and no structural cause for regression.",
      eeg: "Slow background with multifocal epileptiform discharges, consistent with the reported seizures. No hypsarrhythmia.",
      ncs: "Normal motor and sensory conduction, which argues against a peripheral neuropathy or a neuromuscular disorder.",
      cognitive: "Severe global impairment with absent expressive language. Communication is largely through eye gaze, which is comparatively preserved.",
      blood: "Lactate, ammonia, amino acids, organic acids, and thyroid studies are normal, making a metabolic disorder unlikely. Genetic testing identifies a pathogenic MECP2 mutation.",
      csf: "Normal cells, protein, and glucose. No evidence of infection or inflammation.",
    },
    answer: "Rett syndrome",
    acceptedAnswers: ["Rett's syndrome", "Retts", "Rett disorder", "MECP2-related Rett syndrome"],
    explanation:
      "Normal early development followed by regression in the second year, loss of speech and of purposeful hand use, hand-wringing stereotypies, deceleration of head growth, waking-only breathing irregularities, and a MECP2 mutation is Rett syndrome, which affects girls almost exclusively. Autism spectrum disorder is the closest mimic, but it does not produce acquired microcephaly, loss of hand function with wringing stereotypies, or this breathing pattern, and social engagement here is preserved. Angelman syndrome brings a happy demeanour with ataxia but not the regression from acquired skills with hand-use loss. A metabolic leukodystrophy would show abnormal metabolic screening and white-matter change on MRI.",
    distractors: ["Autism spectrum disorder", "Angelman syndrome", "Metabolic leukodystrophy"],
  },
  {
    id: "down-01",
    disorder: "Down syndrome",
    category: "Neurodevelopmental disorders",
    difficulty: "easy",
    history:
      "This history is given by the parents of a nine-month-old boy. He was floppy from birth — he felt like he might slip through our hands — and he still cannot sit without support. He smiles and babbles and he knows us well. Feeding was slow at first because his tongue seemed to push the milk out. He was noted at birth to have a heart murmur and a hole in the heart was found on a scan. He has had two chest infections. There was no birth trauma and no seizures. Our older daughter is developing normally.",
    presentation:
      "Generalised hypotonia with head lag and delayed gross motor milestones. Upslanting palpebral fissures with epicanthic folds, a flat nasal bridge, a single transverse palmar crease, a wide sandal gap, and relative macroglossia. A systolic murmur is audible. Social smiling and babbling are present, and there is no organomegaly, no regression of acquired skills, and no fasciculation.",
    tests: {
      ct: "Head CT is normal for age with no hemorrhage, malformation, or hydrocephalus.",
      pet_spect: "Not indicated in the assessment of an infant with hypotonia and dysmorphism.",
      mri: "Structurally normal brain with mildly small cerebellum. No malformation of cortical development and no white-matter disease.",
      eeg: "Normal for age. No epileptiform activity and no burst suppression.",
      ncs: "Normal motor and sensory conduction with normal amplitudes and no denervation, which excludes spinal muscular atrophy and a congenital neuropathy as the cause of the floppiness.",
      cognitive: "Global developmental delay on structured assessment, with social and communicative skills stronger than gross motor skills.",
      blood: "Karyotype shows trisomy 21. Thyroid function is borderline and a full blood count is normal.",
      csf: "Normal and not required, as there is no fever, encephalopathy, or focal deficit.",
    },
    answer: "Down syndrome",
    acceptedAnswers: [
      "trisomy 21",
      "Down's syndrome",
      "Downs syndrome",
      "Down syndrome (trisomy 21)",
    ],
    explanation:
      "Central hypotonia from birth with the characteristic facial and hand features, a congenital heart defect, global delay, and a karyotype showing trisomy 21 is Down syndrome; the weakness here is central rather than neuromuscular, which is why nerve conduction is normal. Spinal muscular atrophy is the crucial mimic for a floppy infant, but it brings tongue fasciculation, absent reflexes, and denervation on electrophysiology, and it does not cause dysmorphic features. Prader-Willi syndrome also presents with neonatal hypotonia and poor feeding but without these facial features or a normal karyotype finding of trisomy 21. Congenital hypothyroidism can cause hypotonia and macroglossia, yet thyroid studies here do not explain the picture and would not produce the karyotype result.",
    distractors: ["Spinal muscular atrophy", "Prader-Willi syndrome", "Congenital hypothyroidism"],
  },
  {
    id: "mdd-01",
    disorder: "Major depressive disorder",
    category: "Psychiatric disorders",
    difficulty: "easy",
    history:
      "I'm forty-two. For about two months I have not wanted to get out of bed. Food has no taste, I have lost interest in the garden that used to be the point of the week, and I wake at four in the morning with the same heavy feeling. I feel worthless and I have thought that my family would be better off without me, though I have no plan. I still know the date and I can recall a shopping list if someone prompts me — I just cannot be bothered to try. I have never had a week of needing no sleep or spending wildly. I do not drink. My thyroid was checked last year. This did not start after a bereavement.",
    presentation:
      "A middle-aged woman who sits still, speaks softly, and takes a long time to answer. Affect is flat and she becomes tearful when asked about the garden. She is oriented to person, place, and date. No tremor, no restlessness, no pressured speech, and no psychotic content. Gait and reflexes are normal. She does not look thyrotoxic or myxoedematous.",
    tests: {
      ct: "Normal. No mass, hemorrhage, or infarct.",
      pet_spect: "Not indicated in a first episode of depression without cognitive red flags.",
      mri: "Unremarkable. No hippocampal atrophy, no strategic infarct, no white-matter disease out of proportion to age.",
      eeg: "Normal awake EEG. No slowing that would suggest an encephalopathy.",
      ncs: "Not indicated. There is no weakness or sensory loss.",
      cognitive:
        "MMSE 28/30. She answers 'I don't know' on delayed recall, then retrieves all three words with a category cue. Attention and language are intact. The profile is of poor effort and low mood, not an amnestic encoding failure.",
      blood: "Normal TSH, B12, and metabolic panel. Nothing to suggest hypothyroidism or a reversible medical mimic.",
      csf: "Not indicated. There is no headache, fever, or focal deficit.",
    },
    answer: "Major depressive disorder",
    acceptedAnswers: [
      "depression",
      "major depression",
      "unipolar depression",
      "clinical depression",
      "MDD",
      "depressive episode",
    ],
    explanation:
      "Weeks of anhedonia, early-morning waking, worthlessness, and passive death wishes with preserved orientation and cued recall, and without a manic episode, is a major depressive episode. Alzheimer's disease is the memory-clinic trap, but it produces an encoding failure that cueing does not rescue and it does not start as two months of anhedonia in a 42-year-old with a normal MRI. Hypothyroidism can slow and sadden, but TSH is normal and the examination is not myxoedematous. Bipolar disorder requires a manic or hypomanic episode, which she has never had.",
    distractors: ["Alzheimer's disease", "Hypothyroidism", "Bipolar affective disorder"],
  },
  {
    id: "scz-01",
    disorder: "Schizophrenia",
    category: "Psychiatric disorders",
    difficulty: "medium",
    history:
      "I'm twenty-three. For the last eight months I have been sure that two neighbours are sending comments about me through the television, and I hear a running commentary on what I am doing even when the set is off. I left university because I could not concentrate, I barely leave my room, and I have stopped washing. My speech has become vague according to my mother. I do not use stimulants or cannabis now — I stopped a year ago. I have not had a week of needing no sleep or feeling unusually grand. There were no seizures and no head injury.",
    presentation:
      "A young man with reduced facial expression, poor eye contact, and a flat, monotonous voice. He describes third-person auditory hallucinations and a delusion of reference from the television, held with conviction. Speech is concrete and slightly derailed but not pressured. Orientation is intact. No tremor, no nystagmus, no focal weakness. Pupils are normal. Urine is not tested in the room; he does not appear intoxicated.",
    tests: {
      ct: "Normal. No mass, hemorrhage, or temporal lesion.",
      pet_spect: "Not part of the standard work-up for a first psychotic episode.",
      mri: "Unremarkable. No temporal-lobe mass, no hippocampal sclerosis, no infarct. Imaging does not make or exclude this diagnosis.",
      eeg: "Normal. No epileptiform discharges that would support temporal-lobe seizures as the source of the voices.",
      ncs: "Not indicated.",
      cognitive:
        "Orientation and delayed recall are preserved. Working memory, processing speed, and verbal fluency are clearly reduced, which is the common cognitive signature of a psychotic illness rather than a delirium or an amnestic dementia.",
      blood: "Normal TSH, B12, glucose, and a negative urine toxicology screen. No metabolic explanation for the psychosis.",
      csf: "Not indicated. There is no fever, headache, or rapidly progressive encephalopathy.",
    },
    answer: "Schizophrenia",
    acceptedAnswers: [
      "schizophrenic disorder",
      "paranoid schizophrenia",
      "first-episode schizophrenia",
    ],
    explanation:
      "More than six months of third-person commentary hallucinations, a delusion of reference, negative symptoms, and functional decline in a young adult, with a normal MRI, a normal EEG, and a negative drug screen, is schizophrenia. A manic episode with psychosis would come with decreased need for sleep, pressured speech, and grandiosity, which are absent, and it would not last eight months as a single untreated high. Temporal-lobe epilepsy can produce brief experiential phenomena, but not a continuous running commentary for months with a normal EEG and MRI. Stimulant or cannabis psychosis is excluded by the timeline and the negative screen.",
    distractors: ["Bipolar affective disorder", "Temporal lobe epilepsy", "Substance-induced psychosis"],
  },
  {
    id: "bp-01",
    disorder: "Bipolar affective disorder",
    category: "Psychiatric disorders",
    difficulty: "medium",
    history:
      "I'm thirty-one. Two years ago I was low for months — I slept too much, I could not work, I thought I was a failure. Then last spring I went a week on three hours of sleep a night, I talked so fast my friends could not interrupt, I maxed two credit cards buying equipment for a business I was sure would make me famous, and I felt better than I ever had. I did not think I was ill. My partner brought me in because I had started a third project at 3 a.m. I do not use cocaine. The high lasted about ten days and then I crashed again. I am not hearing voices today.",
    presentation:
      "A young adult who is currently mildly subdued rather than elated. Speech is of normal rate today. Mood is low but he can smile at a joke. No rest tremor, no pressured speech in the clinic, no hallucinations. When asked about last spring he describes that week with some pride and little insight that it was abnormal. Sleep in the clinic history is currently long, not short. Neurological examination is normal.",
    tests: {
      ct: "Normal. No mass or hemorrhage.",
      pet_spect: "Not indicated.",
      mri: "Unremarkable. No frontal lesion that would explain disinhibition, no white-matter disease.",
      eeg: "Normal. These episodes are not seizures.",
      ncs: "Not indicated.",
      cognitive:
        "When well, cognition is intact. During the documented high, bedside testing showed distractibility and a flight of ideas rather than an amnestic gap. Today's MMSE is 29/30 with intact delayed recall.",
      blood: "Normal TSH and a negative urine toxicology screen, so neither thyrotoxicosis nor stimulant use accounts for the week of reduced sleep and spending.",
      csf: "Not indicated.",
    },
    answer: "Bipolar affective disorder",
    acceptedAnswers: [
      "bipolar disorder",
      "bipolar I",
      "bipolar I disorder",
      "manic-depressive illness",
      "manic depression",
      "bipolar affective disorder type 1",
    ],
    explanation:
      "A clear week of decreased need for sleep, pressured speech, grandiosity, and damaging spending, followed by depressive episodes, is bipolar affective disorder — the mania is what distinguishes it from unipolar depression, which this history also contains. ADHD is chronic from childhood and does not come in a discrete week of needing almost no sleep. Schizophrenia can include mood colouring, but the core here is a time-limited manic episode with later depression, not months of hallucinations and negative symptoms. The normal toxicology and TSH close the two medical mimics of a first manic week.",
    distractors: ["Major depressive disorder", "ADHD", "Schizophrenia"],
  },
  {
    id: "asd-01",
    disorder: "Autism spectrum disorder",
    category: "Neurodevelopmental disorders",
    difficulty: "medium",
    history:
      "This history is given by the parents of a six-year-old boy. He sat and walked on time and he has never lost a skill. He still barely points to share interest, he lines up his cars by colour for an hour, and a change of route to school produces a meltdown. He talks, but mostly to recite bus timetables, and he does not back-and-forth with other children. Eye contact has always been brief. He has no seizures. His head has grown along the usual curve. He uses his hands for toys and for feeding. Hearing is normal.",
    presentation:
      "A six-year-old boy with limited eye contact, little pointing to share, and speech that is fluent but used to lecture rather than to converse. He becomes distressed when the order of toys is changed. Purposeful hand use is intact; there is no hand-wringing and no hyperventilation. Head circumference is on the 50th centile. Gait, tone, and reflexes are normal. He does not appear dysmorphic.",
    tests: {
      ct: "Normal. No malformation or calcification.",
      pet_spect: "Not indicated in the assessment of a child with a lifelong social-communication pattern.",
      mri: "Unremarkable. No cortical malformation, no white-matter disease, no structural explanation.",
      eeg: "Normal. No epileptiform activity.",
      ncs: "Not indicated.",
      cognitive:
        "Uneven profile: verbal knowledge about his special interest is strong, while reciprocal social communication and flexible problem-solving are clearly impaired. There is no regression and no global collapse of previously acquired skills.",
      blood: "Normal metabolic screen and thyroid function. Genetic testing is not required to make this diagnosis and is non-diagnostic here.",
      csf: "Not indicated.",
    },
    answer: "Autism spectrum disorder",
    acceptedAnswers: [
      "autism",
      "ASD",
      "autistic spectrum disorder",
      "autistic disorder",
      "childhood autism",
    ],
    explanation:
      "Lifelong deficits in reciprocal social communication plus restricted, repetitive behaviour, without regression, without loss of hand use, and with a normal head size, is autism spectrum disorder. Rett syndrome is the important regression mimic, but it occurs in girls, takes away speech and purposeful hand use in the second year, and adds acquired microcephaly and waking breathing irregularity — none of which are present. Intellectual disability alone does not produce this specific social-communication and sameness pattern with islands of strong factual knowledge. Social anxiety can look like shyness in older children, but it does not produce lining-up rituals from toddlerhood or a failure to point to share.",
    distractors: ["Rett syndrome", "Intellectual disability", "Social anxiety disorder"],
  },
  {
    id: "gad-01",
    disorder: "Anxiety disorder",
    category: "Psychiatric disorders",
    difficulty: "easy",
    history:
      "I'm twenty-eight. For as long as I can remember I have worried about everything — work, health, the children, whether I locked the door — and for the last year it has been every day, most of the day. I feel wound up, my shoulders ache, I startle, and I cannot get to sleep because my mind will not stop. I do not have attacks of sudden terror with a racing heart that come out of nowhere. I do not wash or check in a ritual. I have not had a panic-level trauma. I still enjoy things when I can settle. My periods are regular and I do not have palpitations at rest.",
    presentation:
      "A tense young woman with a furrowed brow and restless hands. Speech is normal in rate. She is oriented and not depressed in affect once the interview is going. Resting pulse is 72. Palms are slightly sweaty. Thyroid is not enlarged. No tremor of thyrotoxicosis, no compulsive washing in the room, no avoidance of a particular reminder. Reflexes are symmetric.",
    tests: {
      ct: "Normal. No mass or hemorrhage.",
      pet_spect: "Not indicated.",
      mri: "Unremarkable. No lesion. Imaging does not diagnose an anxiety disorder.",
      eeg: "Normal.",
      ncs: "Not indicated.",
      cognitive:
        "Attention is pulled toward worry themes and she loses her place when asked to keep a string of numbers in mind, but delayed recall of a word list is intact once she is brought back to the task. There is no amnesia and no psychotic content.",
      blood: "Normal TSH and a normal metabolic panel, so thyrotoxicosis is not the driver of the tension and insomnia.",
      csf: "Not indicated.",
    },
    answer: "Anxiety disorder",
    acceptedAnswers: [
      "generalised anxiety disorder",
      "generalized anxiety disorder",
      "GAD",
      "generalised anxiety",
      "generalized anxiety",
      "anxiety",
    ],
    explanation:
      "Persistent, hard-to-control worry on most days for more than six months, with muscle tension and insomnia, without panic attacks as the main event, without rituals, and without a trauma, is a generalised anxiety disorder. Hyperthyroidism is the medical mimic of tension and poor sleep, but the pulse is quiet and TSH is normal. Panic disorder is discrete surges of terror, which she does not describe. OCD would add time-consuming rituals that she performs to neutralise an obsession, and those are absent.",
    distractors: ["Hyperthyroidism", "Panic disorder", "Obsessive-compulsive disorder"],
  },
  {
    id: "ocd-01",
    disorder: "Obsessive-compulsive disorder",
    category: "Psychiatric disorders",
    difficulty: "medium",
    history:
      "I'm nineteen. For three years I have had thoughts that I will contaminate my family if I do not wash, and I know the thoughts are mine and that they are excessive, but I still wash my hands until they crack. It takes two hours to leave the house. If I try to stop, the anxiety climbs until I give in. I do not hear a voice telling me to wash — it is my own thought. I have never been high for a week. I am still at college, just barely. I do not have tics.",
    presentation:
      "A young adult with chapped, reddened hands and delayed arrival because of washing. He describes contamination obsessions as his own thoughts, with insight that they are unreasonable, and washing compulsions that he cannot postpone without a surge of anxiety. Speech is normal. No auditory hallucinations, no tics, no pressured speech. Neurological examination is otherwise normal.",
    tests: {
      ct: "Normal.",
      pet_spect: "Not part of standard assessment. Research imaging is not used to make this diagnosis.",
      mri: "Unremarkable. No cingulate or striatal lesion, and no finding that would confirm or exclude the diagnosis.",
      eeg: "Normal.",
      ncs: "Not indicated.",
      cognitive:
        "Intelligence is intact. The interview is dominated by the time cost of the rituals and by intact insight that the contamination fear is excessive. There is no formal thought disorder and no cognitive decline.",
      blood: "Normal. No metabolic explanation.",
      csf: "Not indicated.",
    },
    answer: "Obsessive-compulsive disorder",
    acceptedAnswers: [
      "OCD",
      "obsessive compulsive disorder",
      "obsessive-compulsive disorder",
    ],
    explanation:
      "Intrusive contamination thoughts recognised as his own, paired with washing compulsions that take hours and that he resists only at the cost of anxiety, is obsessive-compulsive disorder. Schizophrenia is the psychosis trap, but a running commentary or a delusion held without insight is not this picture — he knows the fear is excessive and he does not hear a voice. Generalised anxiety is free-floating worry without this specific obsession-compulsion loop. Tourette syndrome can travel with OCD, but the diagnosis of Tourette needs motor and vocal tics, which he does not have.",
    distractors: ["Schizophrenia", "Anxiety disorder", "Tourette syndrome"],
  },
  {
    id: "ptsd-01",
    disorder: "Post-traumatic stress disorder",
    category: "Psychiatric disorders",
    difficulty: "medium",
    history:
      "I'm twenty-six. Fourteen months ago I was in a bus crash. Since then I have nightmares of the impact several nights a week, I jump at a slammed door, and I will not get on a bus. Images of the wreck come in the daytime uninvited and I feel as if it is happening again. I have been irritable and I cannot concentrate at work. I did not have these problems before the crash. I do not drink to blackout. I was not knocked out and I walked away. The symptoms have been like this for over a year, not just the first few weeks.",
    presentation:
      "A young adult who is tense, scans the room, and startles when a trolley passes. Mood is irritable rather than persistently empty. She can describe the crash in detail when asked, then cuts herself off. Orientation and language are intact. No focal weakness, no headache in the clinic, no wound. She declines a seat facing away from the door.",
    tests: {
      ct: "Normal. No hemorrhage or skull fracture. Done at the time of the crash and repeated; both were unremarkable.",
      pet_spect: "Not indicated.",
      mri: "Unremarkable. No contusion, no diffuse axonal injury, no lesion that would explain the nightmares and avoidance.",
      eeg: "Normal.",
      ncs: "Not indicated.",
      cognitive:
        "Attention is pulled to threat cues and she loses her place on a digit span when a door closes. Autobiographical memory of the crash is vivid rather than lost. Delayed recall of a neutral word list is intact. The pattern is hyperarousal and intrusion, not a post-traumatic amnesia or a progressive dementia.",
      blood: "Normal. Toxicology is negative.",
      csf: "Not indicated.",
    },
    answer: "Post-traumatic stress disorder",
    acceptedAnswers: [
      "PTSD",
      "post traumatic stress disorder",
      "posttraumatic stress disorder",
      "post-traumatic stress",
    ],
    explanation:
      "A named trauma, then more than a month — here more than a year — of re-experiencing, avoidance of buses, hyperarousal, and poor concentration, with a normal MRI after a crash she walked away from, is post-traumatic stress disorder. Generalised anxiety is chronic worry without a defining trauma and without flashbacks of a specific event. Major depression can follow trauma but does not by itself produce nightmares of the impact and avoidance of the situation. A traumatic brain injury would require loss of consciousness or imaging evidence of injury, and it would not produce this specific re-experiencing and avoidance pattern as its main face.",
    distractors: ["Anxiety disorder", "Major depressive disorder", "Traumatic brain injury"],
  },
];
