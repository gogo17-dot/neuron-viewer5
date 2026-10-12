// Keys match exported .glb filenames (without extension).
// Lookup: basalGangliaStructures[clickedObject.name]
// Overview is the first paragraph; Clinical detail is everything after \n\n.

const basalGangliaStructures = {
  Caudate_nucleus: {
    title: 'CAUDATE NUCLEUS',
    titleAz: 'Kaudat nüvə',
    description:
      'The caudate nucleus is a C-shaped mass of grey matter forming the lateral wall of the lateral ventricle’s body and curving into the temporal horn as the tail. Together with the putamen it makes up the striatum — the main input station of the basal ganglia. It receives dense glutamatergic projections from association cortex and participates in goal-directed action selection, habit learning, and cognitive–motor loops through the direct and indirect pathways.\n\nCaudate atrophy is the imaging hallmark of Huntington disease: the ventricular wall flattens and the frontal horns look boxy. Frontostriatal loops through the caudate are also implicated in obsessive–compulsive disorder and some dysexecutive syndromes. Hypertensive haemorrhage and lenticulostriate infarct can hit the head of caudate; the clinical picture then mixes movement change with abulia rather than a pure hemiparesis.',
    descriptionAz:
      'Kaudat nüvə lateral mədəciyin gövdəsinin yan divarını əmələ gətirən C-şəkilli boz maddə kütləsidir və quyruq kimi temporal buynuza əyilir. Putamen ilə birlikdə striatumu — bazal qanqliyaların əsas giriş stansiyasını — təşkil edir. Assosiasiya qabığından sıx qlutamatergik proyeksiyalar alır və düz və dolayı yollar vasitəsilə məqsədyönlü hərəkət seçimi, vərdiş öyrənməsi və kognitiv–motor dövrələrdə iştirak edir.\n\nKaudat atrofiyası Hantinqton xəstəliyinin görüntüləmə əlamətidir: mədəcik divarı yastılaşır, frontal buynuzlar kvadrat görünür. Kaudatdan keçən frontostriatal dövrələr obsesif-kompulsiv pozuntu və bəzi diseksekutiv sindromlarda da iştirak edir. Hipertenziv qanaxma və lentikulostriat infarkt kaudatın başını tuta bilər; klinik mənzərə o zaman təmiz hemiparezdən çox hərəkət dəyişikliyi ilə abuliyanı qarışdırır.',
  },
  Putamen: {
    title: 'PUTAMEN',
    titleAz: 'Putamen',
    description:
      'The putamen is the lateral, lentiform component of the striatum, separated from the caudate by the internal capsule and continuous with it beneath the capsule toward the nucleus accumbens. It is the primary striatal target of sensorimotor and premotor cortex and is central to selecting and scaling voluntary movement.\n\nPutaminal lesions or degeneration — multiple-system atrophy, vascular disease, methanol or carbon monoxide injury — produce contralateral rigidity, bradykinesia, and dystonia. It is a classic site of hypertensive haemorrhage (the “putaminal bleed”) that can expand into the internal capsule. On MRI the putamen sits lateral to globus pallidus; T2 hypointensity from iron is common with age and exaggerated in some parkinsonian syndromes.',
    descriptionAz:
      'Putamen striatumun yan, mərciyəbənzər tərkib hissəsidir; kaudatdan daxili kapsulla ayrılır və kapsul altında n. accumbensə doğru onunla davam edir. Sensorimotor və premotor qabığın əsas striatal hədəfidir və ixtiyari hərəkətin seçilməsi və miqyası üçün mərkəzidir.\n\nPutaminal zədə və ya degenerasiya — çoxsistem atrofiyası, damar xəstəliyi, metanol və ya karbon monoksid zədələnməsi — əks tərəfdə rigidlik, bradikineziya və distoniya verir. Hipertenziv qanaxmanın klassik yeridir («putaminal qanaxma») və daxili kapsula yayıla bilər. MRT-də putamen globus pallidusun yanındadır; yaşla dəmirdən T2 hipointenslik adi haldır və bəzi parkinsonian sindromlarda güclənir.',
  },
  Globus_pallidus: {
    title: 'GLOBUS PALLIDUS',
    titleAz: 'Globus pallidus (solğun cisim)',
    description:
      'The globus pallidus is the medial “pale globe” of the lentiform nucleus, divided into external (GPe) and internal (GPi) segments by the medial medullary lamina. GPe is a key node of the indirect pathway; GPi, with substantia nigra pars reticulata, is the principal basal-ganglia output to thalamus and brainstem, tonically inhibiting unwanted movement.\n\nPallidal deep-brain stimulation and lesioning (pallidotomy) treat dystonia and Parkinsonian motor complications by modulating this inhibitory output. Isolated GPi injury can cause hemidystonia or hemiballismus-like dyskinesia. On imaging the pallidum is medial to putamen; calcification and manganese deposition (T1 hyperintensity) are recognised here in metabolic and toxic disease.',
    descriptionAz:
      'Globus pallidus lentiform nüvənin medial «solğun kürəsi»dir, medial medullar lövhə ilə xarici (GPe) və daxili (GPi) seqmentlərə bölünür. GPe dolayı yolun əsas düyünüdür; GPi qara maddənin retikulyar hissəsi ilə birlikdə bazal qanqliyaların talamus və beyin gövdəsinə əsas çıxışıdır və istənməyən hərəkəti tonik tormozlayır.\n\nPallidal dərin beyin stimulyasiyası və lezyon (pallidotomiya) bu inhibitor çıxışı tənzimləyərək distoniya və Parkinson motor fəsadlarını müalicə edir. Təcrid olunmuş GPi zədəsi hemidistoniya və ya hemiballizməbənzər diskineziya verə bilər. Görüntüləmədə pallidum putamenin medialındadır; metabolik və toksik xəstəlikdə burada kalsifikasiya və manqan çökməsi (T1 hiperintenslik) tanınır.',
  },
  Subthalamic_nucleus: {
    title: 'SUBTHALAMIC NUCLEUS',
    titleAz: 'Subtalamik nüvə',
    description:
      'The subthalamic nucleus (STN) is a lens-shaped glutamatergic nucleus at the diencephalon–midbrain junction, nestled against the internal capsule above the substantia nigra. It drives the indirect pathway by exciting GPi/SNr, increasing inhibitory basal-ganglia output and suppressing competing motor programmes.\n\nSTN hyperactivity contributes to Parkinsonian bradykinesia; STN deep-brain stimulation is a standard therapy for advanced Parkinson disease, reducing motor fluctuations and tremor. An acute lesion (often a small infarct) of one STN classically produces contralateral hemiballismus — violent flinging of the arm and leg. On MRI it is a small almond on the midbrain–diencephalic border; electrode planning for DBS uses this landmark directly.',
    descriptionAz:
      'Subtalamik nüvə (STN) diensefalon–orta beyin birləşməsində, daxili kapsulə söykənən və qara maddənin üstündə yerləşən linzaya bənzər qlutamatergik nüvədir. GPi/SNr-i oyadaraq dolayı yolu idarə edir, bazal qanqliyaların inhibitor çıxışını artırır və rəqib motor proqramlarını boğur.\n\nSTN hiperaktivliyi Parkinson bradikineziyasına töhfə verir; STN dərin beyin stimulyasiyası irəliləmiş Parkinson xəstəliyi üçün standart müalicədir, motor dalğalanmaları və tremoru azaldır. Bir STN-in kəskin zədəsi (tez-tez kiçik infarkt) klassik olaraq əks tərəf hemiballizm verir — qol və ayağın güclü atılması. MRT-də orta beyin–diensefalon sərhədində kiçik badamcıqdır; DBS elektrod planlaması bu nişandan birbaşa istifadə edir.',
  },
  Substantia_nigra: {
    title: 'SUBSTANTIA NIGRA',
    titleAz: 'Qara maddə (substantia nigra)',
    description:
      'The substantia nigra occupies the midbrain tegmentum and has two main parts: compacta (SNc) and reticulata (SNr). SNc dopaminergic neurons project to the striatum (nigrostriatal pathway), enabling movement by modulating direct and indirect striatal pathways; their loss is the hallmark of Parkinson disease. SNr is a GABAergic output nucleus homologous to GPi, projecting to thalamus and superior colliculus to gate motor and oculomotor commands.\n\nParkinson disease shows neuromelanin loss and nigrosome-1 (“swallow-tail”) sign loss on iron-sensitive MRI. Antipsychotic D2 blockade of this pathway reproduces drug-induced parkinsonism. Midbrain stroke involving SNr/SNc can mix oculomotor palsy with contralateral hemiparesis (Weber) or hemiataxia depending on neighbours hit.',
    descriptionAz:
      'Qara maddə orta beyin tegmentumunu tutur və iki əsas hissədən ibarətdir: kompakt (SNc) və retikulyar (SNr). SNc dopaminergik neyronları striatuma (niqrostriatal yol) proyeksiya edir və düz/dolayı striatal yolları tənzimləyərək hərəkəti mümkün edir; onların itkisi Parkinson xəstəliyinin əlamətidir. SNr GPi-yə homolog GABAergik çıxış nüvəsidir, motor və okülomotor əmrləri idarə etmək üçün talamus və yuxarı təpəciyə gedir.\n\nParkinson xəstəliyində neuromelanin itkisi və dəmirə həssas MRT-də nigrosome-1 («qaranquş quyruğu») əlamətinin itməsi görünür. Bu yolun antipsikotik D2 blokadası dərman mənşəli parkinsonizmi təkrarlayır. SNr/SNc-ni tutan orta beyin insultu qonşu strukturlara görə okülomotor iflici əks hemiparez (Weber) və ya hemiaksiya ilə qarışdıra bilər.',
  },
  Locus_coeruleus: {
    title: 'LOCUS COERULEUS',
    titleAz: 'Locus coeruleus',
    description:
      'The locus coeruleus is a small bilateral nucleus in the rostral pontine tegmentum and the brain’s principal source of noradrenaline. Its diffuse ascending projections modulate arousal, attention, stress responses, and synaptic plasticity across cortex, hippocampus, and cerebellum. It is not a classical basal-ganglia nucleus, but it interfaces with striatal and limbic circuits and is included here from the same CIT168 / Z-Anatomy set as the core loop.\n\nEarly locus coeruleus degeneration is a consistent finding in Parkinson and Alzheimer disease, often before motor or memory symptoms are obvious. Neuromelanin-sensitive MRI can visualise it as a pair of bright dots in the upper pons. Loss of noradrenergic drive contributes to REM-sleep behaviour disorder, autonomic failure, and fluctuating attention in those diseases.',
    descriptionAz:
      'Locus coeruleus rostral pontin tegmentumda kiçik ikitərəfli nüvədir və beynin əsas noradrenalin mənbəyidir. Diffuz yüksələn proyeksiyaları qabıq, hipokamp və beyincikdə oyanıqlığı, diqqəti, stress cavablarını və sinaptik plastikliyi tənzimləyir. Klassik bazal qanqliya nüvəsi deyil, lakin striatal və limbik dövrələrlə kəsişir və burada əsas dövrə ilə eyni CIT168 / Z-Anatomy dəstindən göstərilir.\n\nLocus coeruleusun erkən degenerasiyası Parkinson və Alzheimer xəstəliyində ardıcıl tapıntıdır, çox vaxt motor və ya yaddaş əlamətlərindən əvvəl. Neuromelaninə həssas MRT onu yuxarı ponsda bir cüt parlaq nöqtə kimi göstərə bilər. Noradrenergik drive-ın itkisi bu xəstəliklərdə REM-yuxu davranış pozuntusu, avtonom çatışmazlıq və dalğalanan diqqətə töhfə verir.',
  },
  Periaqueductal_grey: {
    title: 'PERIAQUEDUCTAL GREY',
    titleAz: 'Periakveduktal boz maddə',
    description:
      'The periaqueductal grey (PAG) is a sleeve of grey matter surrounding the cerebral aqueduct in the midbrain. It is a central hub for pain modulation, defensive behaviour, autonomic control, and vocalisation, with descending projections that engage brainstem and spinal antinociceptive pathways. Like locus coeruleus it is not a classical basal-ganglia nucleus; it is in this seven-structure set because CIT168 parcels it with the midbrain neighbours of the loop.\n\nThe PAG receives limbic and basal-ganglia-related input, linking emotional state to motor and autonomic output. It is a target of interest in chronic pain, migraine, and freeze/flight behaviour. Compression around the aqueduct (tumour, stenosis) can mix hydrocephalus with disordered pain and autonomic signs; stimulation and lesions of PAG have been used experimentally for intractable pain.',
    descriptionAz:
      'Periakveduktal boz maddə (PAG) orta beyində serebral akveduktu əhatə edən boz maddə qoludur. Ağrının modulyasiyası, müdafiə davranışı, avtonom nəzarət və vokalizasiya üçün mərkəzi düyündür; enən proyeksiyaları beyin gövdəsi və onurğa antinosiseptiv yollarını işə salır. Locus coeruleus kimi klassik bazal qanqliya nüvəsi deyil; CIT168 onu dövrənin orta beyin qonşuları ilə birlikdə ayırdığı üçün bu yeddi struktur dəstindədir.\n\nPAG limbik və bazal qanqliyalarla bağlı giriş alır, emosional vəziyyəti motor və avtonom çıxışa bağlayır. Xroniki ağrı, miqren və donma/qaçış davranışında maraq hədəfidir. Akvedukt ətrafında sıxılma (şiş, stenoz) hidrosefaliyanı pozulmuş ağrı və avtonom əlamətlərlə qarışdıra bilər; PAG stimulyasiyası və lezyonları davamlı ağrı üçün eksperimental istifadə olunub.',
  },
};

export default basalGangliaStructures;
