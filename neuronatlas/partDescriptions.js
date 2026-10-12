export const PART_DESCRIPTIONS = {
  Soma: {
    name: "Soma",
    desc:
      "The soma (cell body, or perikaryon) holds the nucleus and most biosynthetic organelles. It integrates synaptic drive arriving from the dendritic tree, maintains the neuron metabolically, and supplies proteins and membrane to axons and dendrites.\n\nSize varies by cell class: cerebellar granule somata are often roughly 5–8 µm, many cortical pyramidal somata about 10–30 µm, and large motor or Purkinje neurons can reach tens of micrometres up to ~100 µm. Form follows circuit role — there is no single “standard” soma.\n\nClinical meaning: chromatolysis (dispersal of Nissl substance) after axotomy shows the soma shifting into a repair program. Viral inclusions, Lewy bodies, and many neurodegenerative protein aggregates accumulate preferentially in the soma. Somatic hyperexcitability (altered leak, Na⁺, or Ca²⁺ currents) contributes to epilepsy and pain syndromes. On routine histology and Golgi impregnations, soma shape and size help classify neuron types for neuropathologic diagnosis.",
  },
  Nucleus: {
    name: "Nucleus",
    desc:
      "The nucleus stores the genome and runs transcription (DNA→RNA), RNA processing, and export for translation. In many medium-sized central neurons it is round–oval and about 5–10 µm across; large neurons can have larger nuclei. The nuclear envelope separates nuclear RNA work from cytosolic translation.\n\nMature CNS neurons are largely post-mitotic, so the nucleus sustains decades of gene-expression programs for plasticity, repair, and metabolism rather than preparing for division. Activity-dependent chromatin remodeling links experience to lasting transcriptional change.\n\nClinical meaning: nuclear inclusions (e.g. huntingtin, ataxin, TDP-43 mislocalization patterns) are diagnostic clues in neurodegeneration. Neuronal nuclear antigen (NeuN) staining marks most mature neurons in tissue. Radiation, chemotherapy, and some toxins preferentially injure nuclear DNA and transcription. In viral encephalitides, intranuclear inclusions (Cowdry bodies) support specific diagnoses.",
  },
  Dendrites: {
    name: "Dendrites",
    desc:
      "Dendrites are branched receiving processes that collect most excitatory and inhibitory synapses and route those signals toward the soma and axon initial segment. Proximal shafts are often ~1–5 µm thick; distal branches taper below 1 µm. A dendritic tree can span tens of micrometres to a millimetre or more depending on cell type.\n\nFunctionally they support passive electrotonic spread and, in many neurons, active dendritic spikes so that synapse location and timing shape output. They are the main anatomical substrate for integrating thousands of inputs.\n\nClinical meaning: dendritic beading and loss are early markers of ischemic, traumatic, and excitotoxic injury. Developmental disorders and schizophrenia research emphasize altered dendritic branching and spine density. Epileptogenic foci often show dysmorphic dendrites. Antiepileptic and anesthetic drugs that enhance dendritic inhibition (GABA_A) reduce seizure spread. On EEG/MEG timescales, summed dendritic currents generate much of the extracellular field recorded clinically.",
  },
  "Dendritic Spine": {
    name: "Dendritic Spine",
    desc:
      "A dendritic spine is a small postsynaptic protrusion that typically hosts one excitatory synapse on its head. Spine heads are commonly ~0.5–1.0 µm; necks ~0.05–0.3 µm diameter and ~0.05–2 µm long (thin, mushroom, or stubby classes). The neck is a biochemical and electrical bottleneck that partly isolates calcium and signalling in the head.\n\nSpines grow, shrink, appear, and disappear with activity — a structural correlate of learning and memory at the synaptic level.\n\nClinical meaning: spine loss is a hallmark of Alzheimer disease, chronic stress models, and many neurodevelopmental disorders (e.g. fragile X, Rett — altered spine morphology). Excess spines or immature spines appear in some autism-spectrum models. Synaptic pruning failure or excess is a leading developmental hypothesis. Stimulants, antidepressants, and enriched experience can remodel spine density — linking pharmacology to microanatomy.",
  },
  "Axon Hillock": {
    name: "Axon Hillock",
    desc:
      "The axon hillock is the tapering soma–axon transition, continuous with the axon initial segment (AIS) just downstream. The AIS is the usual action-potential initiation site because of a very high density of voltage-gated Na⁺ channels. Hillock + AIS often span ~20–100 µm along the axon (cell-dependent).\n\nThis region compares summed synaptic drive against threshold and, when threshold is crossed, launches a regenerative Na⁺ spike into the axon.\n\nClinical meaning: AIS plasticity (length and position) changes excitability after seizures, injury, and demyelination. Channelopathies (SCN1A, SCN2A, SCN8A and related) that alter Na⁺ channels at the AIS cause epilepsy and developmental encephalopathy. Ectopic spike initiation outside the AIS can produce neuropathic pain and ectopic discharges after nerve injury. Some antiepileptic drugs preferentially stabilize inactivated Na⁺ channels that are enriched here.",
  },
  Axon: {
    name: "Axon",
    desc:
      "The axon is a single long process specialized for rapid, reliable action-potential conduction from the initiation zone to terminals. Length ranges from sub-millimetre local axons to >1 m for human lower-motor neurons. Diameter spans thin cortical axons (sub-µm to a few µm) to large myelinated motor axons (~10–20 µm). Conduction velocity rises with diameter and myelination.\n\nAxons also run anterograde and retrograde transport of organelles, mRNA, and proteins along microtubules.\n\nClinical meaning: axonopathy and Wallerian degeneration follow transection, compression, ischemia, and toxic/metabolic injury (e.g. diabetes, B12 deficiency, chemotherapeutics). Transport failure is implicated in ALS, hereditary spastic paraplegia, and some neuropathies. Conduction block (focal demyelination without axon loss) explains reversible deficits in Guillain–Barré and MS plaques. Nerve-conduction studies measure axonal vs demyelinating patterns that guide diagnosis and prognosis.",
  },
  "Myelin Sheath": {
    name: "Myelin Sheath",
    desc:
      "In the PNS, myelin is stacked Schwann-cell membrane wrapped concentrically around one axon internode (rich in lipids and compact myelin proteins such as P0). Internodal length is often hundreds of micrometres to ~1–2 mm. Myelin lowers membrane capacitance and enables saltatory conduction between nodes of Ranvier — much faster and more efficient than an unmyelinated fibre of similar outer diameter.\n\nIn the CNS the analogous wrap is made by oligodendrocytes (one cell myelinates many axons).\n\nClinical meaning: demyelinating disease (MS, NMO spectrum, Guillain–Barré/CIDP) slows or blocks conduction and produces conduction block, temporal dispersion, and prolonged distal latencies on EMG/NCS and visual/somatosensory evoked potentials. Remyelination can restore function; chronic demyelination predisposes to secondary axon loss. Leukodystrophies are genetic myelin disorders. Vitamin B12 deficiency and some toxins cause demyelinating or mixed neuropathies.",
  },
  "Node of Ranvier": {
    name: "Node of Ranvier",
    desc:
      "A node of Ranvier is a short (~0.5–2 µm) gap between myelin internodes where axonal membrane is exposed and densely packed with voltage-gated Na⁺ (and other) channels. Arriving current depolarizes the node enough to launch a fresh spike that jumps to the next node — saltatory conduction.\n\nParanodal junctions seal myelin to the axon and cluster channels correctly.\n\nClinical meaning: nodal/paranodal antibody syndromes (e.g. anti-neurofascin, anti-contactin) cause treatable inflammatory neuropathies with conduction failure. Demyelination that strips paranodes disperses Na⁺ channels and can block conduction even before frank axon loss. Cooling and ischemia preferentially impair nodal excitability. Some local anesthetics and antiepileptics act strongly on nodal Na⁺ channels. MRI of “black holes” and chronic MS lesions often reflects irreversible axonal injury downstream of repeated nodal failure.",
  },
  "Axon Terminal": {
    name: "Axon Terminal",
    desc:
      "The axon terminal converts an invading action potential into chemical transmission. Boutons are often ~1–5 µm across in central circuits (specialized synapses can be larger). They contain synaptic vesicles, active-zone proteins, mitochondria, and voltage-gated Ca²⁺ channels. Ca²⁺ entry triggers SNARE-mediated vesicle fusion and transmitter release into the cleft.\n\nClinical meaning: botulinum and tetanus toxins cleave SNAREs and paralyze release (flaccid vs spastic patterns). Lambert–Eaton myasthenic syndrome autoantibodies attack P/Q-type Ca²⁺ channels and weaken release. Aminoglycosides and Mg²⁺ excess also impair Ca²⁺-dependent release. Synaptic vesicle cycling defects appear in some epilepsies and neurodevelopmental disorders. Clinically used bots (botulinum toxin A) therapeutically weaken overactive terminals in dystonia, spasticity, and migraine.",
  },
  "Synaptic Bouton": {
    name: "Synaptic Bouton",
    desc:
      "A synaptic bouton is a bulb-shaped release site facing a postsynaptic partner across a cleft tens of nanometres wide. Vesicles dock at the active zone opposite postsynaptic receptors. One axon may form from one to many thousands of boutons, each with its own short-term plasticity (facilitation/depression).\n\nClinical meaning: bouton loss or dystrophic boutons are seen in Alzheimer disease and aging cortex. Homeostatic scaling redistributes synaptic weights across boutons after activity change. Neuromodulators (dopamine, serotonin, ACh) often act at boutons to change release probability — the substrate of many psychiatric drugs (SSRIs, antipsychotics, cholinesterase inhibitors). Quantal analysis in clinical electrophysiology (e.g. neuromuscular jitter on single-fibre EMG) reflects bouton-level release reliability.",
  },
  Mitochondria: {
    name: "Mitochondria",
    desc:
      "Mitochondria regenerate ATP by oxidative phosphorylation and help handle Ca²⁺, lipids, and signalling. In neurons they are often elongated (~0.5–5 µm long, sub-µm to ~1 µm thick) and trafficked along axons and dendrites to match demand. The brain’s high glucose use depends on mitochondrial ATP for ion pumps, vesicle cycling, and transport.\n\nClinical meaning: mitochondrial encephalomyopathies (MELAS, MERRF, Leigh), optic neuropathies (LHON), and toxin/drug injury (e.g. reverse-transcriptase inhibitors, some antibiotics) present with stroke-like episodes, myopathy, seizures, or vision loss. Mitochondrial dysfunction and impaired mitophagy are central themes in Parkinson disease, and bioenergetic failure amplifies excitotoxic neuron death in stroke. Elevated CSF lactate can hint at mitochondrial or hypoxic injury.",
  },
  "Nissl Body": {
    name: "Nissl Body",
    desc:
      "Nissl bodies are basophilic clumps of rough ER and polysomes in the soma and proximal dendrites — the neuron’s protein factories for channels, receptors, enzymes, and structural proteins. They are distributed cisternae, not a single organelle with fixed length/width.\n\nAfter axonal injury, Nissl substance disperses (chromatolysis) as the cell redirects transcription toward stress and repair.\n\nClinical meaning: Nissl (cresyl violet) stains remain standard in neuropathology to count neurons and recognize chromatolysis, ischemic red neurons, and cortical laminar necrosis. Loss of Nissl substance marks irreversible hypoxic–ischemic injury. Motor neuron diseases show chromatolytic and atrophic somata. Ribosomal stress and ER unfolded-protein responses link Nissl integrity to neurodegeneration and ALS research.",
  },
  "Schwann Cell": {
    name: "Schwann Cell",
    desc:
      "Schwann cells are the myelinating glia of the peripheral nervous system. One myelinating Schwann cell wraps one internode of one axon (internode hundreds of µm to ~1 mm+). Non-myelinating Schwann cells ensheath small axons in Remak bundles. After crush or cut they clear debris, maintain basal-lamina tubes, and release trophic signals that support axon regrowth — a key reason PNS regeneration outpaces much of the CNS.\n\nClinical meaning: Charcot–Marie–Tooth demyelinating neuropathies (e.g. CMT1A/PMP22) are Schwann-cell genetic diseases. Guillain–Barré and CIDP attack myelin/Schwann membranes with conduction block. Schwannomas (including vestibular schwannoma) are tumours of Schwann cells. Leprosy preferentially injures Schwann cells and cutaneous nerves. Surgical nerve repair aims to align Schwann tubes so regenerating axons find distal targets.",
  },
};

export const PART_DESCRIPTIONS_AZ = {
  Soma: {
    name: "Soma",
    desc:
      "Soma (hüceyrə gövdəsi, perikaryon) nüvəni və biosintetik orqanellərin çoxunu saxlayır. Dendritik ağacdan gələn sinaptik sürücünü inteqrasiya edir, neyronu metabolik saxlayır və akson/dendritlərə zülal və membran təchiz edir.\n\nÖlçü hüceyrə tipindən asılıdır: serebellar granula somaları tez-tez ~5–8 µm, bir çox kortikal piramidal somalar ~10–30 µm, iri motor və ya Purkinje neyronları isə onlarla mikrometrdən ~100 µm-ə qədər ola bilər. Forma dövrə roluna uyğunlaşır — tək “standart” soma yoxdur.\n\nKlinik məna: aksonotomiya sonrası xromatoliz (Nissl maddəsinin dağılması) somanın təmir proqramına keçdiyini göstərir. Virus inklüzyaları, Levi cisimcikləri və bir çox neyrodegenerativ zülal aqreqatları üstünlük olaraq somada toplanır. Somatik hiperexcitabilitə (sızma, Na⁺ və ya Ca²⁺ cərəyanlarının dəyişməsi) epilepsiya və ağrı sindromlarına töhfə verir. Histologiyada soma forması və ölçüsü neyron tipini təsnif etməyə kömək edir.",
  },
  Nucleus: {
    name: "Nüvə",
    desc:
      "Nüvə genomu saxlayır və transkripsiyanı aparır (DNT→RNT), RNT emalı və translasyon üçün ixrac. Bir çox orta ölçülü mərkəzi neyronlarda dairəvi–oval və ~5–10 µm enindədir; iri neyronlarda daha böyük ola bilər. Nüvə zarı nüvə RNT işini sitoplazma translasyondan ayırır.\n\nYetkin MNS neyronları əsasən postmitotikdir — nüvə onilliklər boyu plastiklik, təmir və metabolizm proqramlarını davam etdirir. Fəaliyyətdən asılı xromatin yenidənqurulması təcrübəni davamlı transkripsiya dəyişikliyinə bağlayır.\n\nKlinik məna: nüvə inklüzyaları (məs. huntingtin, ataksin, TDP-43 yanlış lokalizasiyası) neyrodegenerasiyada diaqnostik ipucudur. NeuN boyaması yetkin neyronları işarələyir. Radiasiya, kimyaterapiya və bəzi toksinlər nüvə DNT-sinə üstünlük verir. Virus ensefalitlərində nüvədaxili inklüzyalar (Cowdry) diaqnozu dəstəkləyir.",
  },
  Dendrites: {
    name: "Dendritlər",
    desc:
      "Dendritlər əksər həyəcanlandırıcı və inhibitor sinapsları toplayıb siqnalları soma və akson ilkin seqmentinə yönləndirən budaqlı qəbul prosesləridir. Proksimal çöhrələr tez-tez ~1–5 µm qalınlığında, distal budaqlar 1 µm-dən nazik olur. Dendritik ağac hüceyrə tipindən asılı olaraq onlarla mikrometrdən millimetrə qədər uzana bilər.\n\nFunksional olaraq passiv elektrotonik yayılma və bir çox neyronda aktiv dendrit spike-ləri dəstəkləyir — sinaps yeri və zamanı çıxışı formalaşdırır.\n\nKlinik məna: dendrit “boncuqlaşması” və itkisi işemiya, travma və eksitotoksik zədələnmənin erkən əlamətidir. İnkişaf pozğunluqları və şizofreniya tədqiqatları dəyişmiş budaqlanma və tikan sıxlığını vurğulayır. Epileptoqen ocaqlarda dismorfik dendritlər olur. GABA_A-nı gücləndirən antiepileptik və anesteziklər dendritik inhibisiyanı artırır. Kliniki EEG/MEG-də qeydə alınan sahə potensiallarının böyük hissəsi cəmlənmiş dendritik cərəyanlardan yaranır.",
  },
  "Dendritic Spine": {
    name: "Dendritik Tikan",
    desc:
      "Dendritik tikan adətən başında bir həyəcanlandırıcı sinaps daşıyan kiçik postsinaptik çıxıntıdır. Başlar tez-tez ~0.5–1.0 µm; boyunlar ~0.05–0.3 µm diametr və ~0.05–2 µm uzunluqda (incə, göbələk, qısa). Boyun biokimyəvi və elektrik boğazıdır — başdakı kalsiumu qismən təcrid edir.\n\nFəaliyyətlə böyüyür, kiçilir, yaranır və yox olur — öyrənmə və yaddaşın sinaptik səviyyədə struktur korrelyatı.\n\nKlinik məna: tikan itkisi Alzheimer, xroniki stress və bir çox neyroinkişaf pozğunluğunun (fraqil X, Rett) əlamətidir. Bəzi autizm modellərində həddindən artıq və ya yetişməmiş tikanlar olur. Sinaptik budama uğursuzluğu və ya artıqlığı aparıcı inkişaf fərziyyəsidir. Stimulyatorlar, antidepresanlar və zəngin təcrübə tikan sıxlığını yenidən qura bilər.",
  },
  "Axon Hillock": {
    name: "Akson Təpəciyi",
    desc:
      "Akson təpəciyi soma–akson keçidinin daralan zonasıdır və dərhal aşağıdakı akson ilkin seqmentlə (AIS) davam edir. AIS gərginliyə həssas Na⁺ kanallarının çox yüksək sıxlığı səbəbindən adətən aksiyon potensialının başlanma yeridir. Təpəcik + AIS tez-tez akson boyu ~20–100 µm əhatə edir.\n\nBu bölgə cəmlənmiş sinaptik sürücünü hədd ilə müqayisə edir və hədd keçəndə regenerativ Na⁺ spike-i aksona buraxır.\n\nKlinik məna: AIS plastikliyi (uzunluq və mövqe) qıcolma, zədələnmə və demielinizasiyadan sonra həyəcanlılığı dəyişir. AIS Na⁺ kanalopatiyaları (SCN1A, SCN2A, SCN8A) epilepsiya və inkişaf ensefalopatiyasına səbəb olur. AIS-dən kənar ektopik spike-lər neyropatik ağrı və sinir zədələnməsindən sonra ektopik boşalmalar yaradır. Bəzi antiepileptiklər burada zəngin olan inaktivləşmiş Na⁺ kanallarını sabitləşdirir.",
  },
  Axon: {
    name: "Akson",
    desc:
      "Akson başlanma zonasından terminallara sürətli, etibarlı aksiyon potensialı keçiriciliyi üçün ixtisaslaşmış tək uzun prosesdir. Uzunluq submillimetr yerli aksonlardan insan aşağı motor neyronunda >1 m-ə qədərdir. Diametr nazik kortikal aksonlardan (~sub-µm–bir neçə µm) iri mielinli motor aksonlara (~10–20 µm) qədərdir. Ötürülmə sürəti diametr və mielinlə artır.\n\nAkson həmçinin mikrotubullar boyu orqanellərin, mRNT və zülalların anteroqrad və retrokad daşınmasını aparır.\n\nKlinik məna: aksonopatiya və Wallerian degenerasiya kəsilmə, sıxılma, işemiya və toksik/metabolik zədələnmədən (diabet, B12 çatışmazlığı, kimyaterapiya) sonra gəlir. Daşınma uğursuzluğu ALS, irsi spastik paraplegiya və bəzi neyropatiyalarda iştirak edir. Keçiricilik bloku (akson itkisi olmadan fokus demielinizasiya) Guillain–Barré və MS lövhələrində geridönən defisitləri izah edir. Sinir keçiricilik tədqiqatları aksonal və demielinizasiya nümunələrini ayırır.",
  },
  "Myelin Sheath": {
    name: "Mielin Qılafı",
    desc:
      "PSS-də mielin bir akson internodu ətrafında konsentrik bükülmüş Şvan hüceyrə membranı yığınıdır (lipidlər və P0 kimi kompakt mielin zülalları ilə zəngin). İnternodal uzunluq tez-tez yüzlərlə µm–~1–2 mm-dir. Mielin membran tutumunu azaldır və Ranvye düyünləri arasında saltator keçiriciliyə imkan verir — oxşar diametrli mielinsiz lifdən çox sürətli və səmərəlidir.\n\nMNS-də oxşar sarıma oliqodendrositlər tərəfindən edilir (bir hüceyrə çox aksonu mielinləşdirir).\n\nKlinik məna: demielinizasiya xəstəlikləri (MS, NMO spektri, Guillain–Barré/CIDP) keçiriciliyi yavaşladır və ya bloklayır; EMG/NKS və çağırılmış potensiallarda keçiricilik bloku, temporal dispersiya və uzanmış distal latensiyalar verir. Remielinizasiya funksiyanı bərpa edə bilər; xroniki demielinizasiya ikincili akson itkisinə meylləndirir. Leykodistrofiyalar genetik mielin pozğunluqlarıdır.",
  },
  "Node of Ranvier": {
    name: "Ranvye Düyünü",
    desc:
      "Ranvye düyünü mielin internodları arasında akson membranının açıq qaldığı və gərginliyə həssas Na⁺ (və digər) kanallarla sıx dolu qısa (~0.5–2 µm) boşluqdur. Gələn cərəyan düyünü kifayət qədər depolarizasiya edir ki, növbəti düyünə tullanaraq yeni spike başlatsın — saltator keçiricilik.\n\nParanodal birləşmələr mielini aksona möhürləyir və kanalları düzgün yığır.\n\nKlinik məna: nodal/paranodal anticisim sindromları (anti-neurofascin, anti-kontaktin) müalicəolunan iltihabi neyropatiyalara səbəb olur. Paranodları soyaraq Na⁺ kanallarını dağıdan demielinizasiya akson itkisinədək keçiriciliyi bloklaya bilər. Soyutma və işemiya nodal həyəcanlılığı üstünlük olaraq pozur. Bəzi lokal anesteziklər və antiepileptiklər nodal Na⁺ kanallarına güclü təsir edir.",
  },
  "Axon Terminal": {
    name: "Akson Terminası",
    desc:
      "Akson terminası gələn aksiyon potensialını kimyəvi ötürülməyə çevirir. Mərkəzi dövrələrdə boutonlar tez-tez ~1–5 µm enindədir. Sinaptik vezikullar, aktiv zona zülalları, mitoxondriumlar və gərginliyə həssas Ca²⁺ kanalları ehtiva edir. Ca²⁺ girişi SNARE vasitəli vezikul füzyonunu və yarığa transmitter ifrazını işə salır.\n\nKlinik məna: botulinum və tetanus toksinləri SNARE-ləri parçalayır və ifrazı iflic edir. Lambert–Eaton miastenik sindromu P/Q tip Ca²⁺ kanallarına qarşı autoanticisimlərlə ifrazı zəiflədir. Aminoqlikozidlər və artıq Mg²⁺ də Ca²⁺-asılı ifrazı pozur. Kliniki botulinum toksini A distoniya, spastiklik və miqrendə həddindən aktiv terminalları zəiflədir.",
  },
  "Synaptic Bouton": {
    name: "Sinaptik Düymə",
    desc:
      "Sinaptik düymə onlarla nanometr enində yarıq üzərindən postsinaptik tərəflə üzbəüz soğanabənzər ifraz yeridir. Vezikullar postsinaptik reseptorların qarşısındakı aktiv zonada söykənir. Bir akson bir neçədən minlərlə düyməyə qədər yarada bilər; hər birinin öz qısamüddətli plastikliyi var.\n\nKlinik məna: düymə itkisi və distrofik düymələr Alzheimer və yaşlanan korteksdə görünür. Homeostatik miqyaslama fəaliyyət dəyişikliyindən sonra sinaptik çəkiləri yenidən paylayır. Neyromodulyatorlar (dopamin, serotonin, ACh) ifraz ehtimalını dəyişdirir — bir çox psixiatrik dərmanın (SSRI, antipsixotiklər, xolinesteraza inhibitorları) substratı. Tək lif EMG-də neuromuscular jitter düymə səviyyəsində ifraz etibarlılığını əks etdirir.",
  },
  Mitochondria: {
    name: "Mitoxondriya",
    desc:
      "Mitoxondriumlar oksidativ fosforilasiya ilə ATP bərpa edir və Ca²⁺, lipidlər və siqnallaşmada iştirak edir. Neyronlarda tez-tez uzunsov (~0.5–5 µm uzunluq) olur və tələbata uyğun akson/dendrit boyu daşınır. Beynin yüksək qlükoza istifadəsi ion nasosları, vezikul dövrü və daşınma üçün mitoxondrial ATP-yə bağlıdır.\n\nKlinik məna: mitoxondrial ensefalomiyopatiyalar (MELAS, MERRF, Leigh), optik neyropatiyalar (LHON) və toksin/dərman zədələnməsi insultabənzər epizodlar, miopatiya, qıcolma və ya görmə itkisi ilə təzahür edir. Mitoxondrial disfunksiya Parkinson xəstəliyində mərkəzi mövzudur; bioenergetik uğursuzluq insultada eksitotoksik neyron ölümünü gücləndirir. Yüksək BSS laktatı mitoxondrial və ya hipoksik zədələnməyə işarə edə bilər.",
  },
  "Nissl Body": {
    name: "Nissl Cisimciyi",
    desc:
      "Nissl cisimcikləri soma və proksimal dendritlərdə kobud ER və polisomların bazofil topaclarıdır — kanallar, reseptorlar, fermentlər və struktur zülallar üçün zülal fabrikləri. Sabit uzunluq/en olan tək orqanelle deyil, paylanmış sisternalardır.\n\nAkson zədələnməsindən sonra Nissl maddəsi dağılır (xromatoliz) — hüceyrə transkripsiyanı stres və təmirə yönəldir.\n\nKlinik məna: Nissl (krezil bənövşəyi) boyaları neyropatologiyada neyron saymaq, xromatoliz, işemik qırmızı neyron və kortikal laminar nekrozu tanımaq üçün standartdır. Nissl itkisi geridönməz hipoksik–işemik zədələnməni göstərir. Motor neyron xəstəliklərində xromatolitik və atrofik somalar görünür.",
  },
  "Schwann Cell": {
    name: "Şvan Hüceyrəsi",
    desc:
      "Şvan hüceyrələri periferik sinir sisteminin mielinləşdirici qliyasıdır. Bir mielinləşdirici Şvan hüceyrəsi bir aksonun bir internodunu sarıyır (yüzlərlə µm–~1 mm+). Mielinsiz Şvan hüceyrələri kiçik aksonları Remak dəstələrində örtür. Əzmə/kəsilmədən sonra zibilləri təmizləyir, bazal membran borularını saxlayır və akson yenidən böyüməsini dəstəkləyən trofik siqnallar buraxır — PSS regenerasiyasının MNS-dən üstün olmasının əsas səbəbi.\n\nKlinik məna: Charcot–Marie–Tooth demielinizasiya neyropatiyaları (məs. CMT1A/PMP22) Şvan genetik xəstəlikləridir. Guillain–Barré və CIDP mielin/Şvan membranlarına hücum edir. Şvannomalar (o cümlədən vestibular) Şvan şişləridir. Cüzam Şvan hüceyrələrini və dəri sinirlərini üstünlük olaraq zədələyir. Sinir təmiri regenerasiya edən aksonların distal hədəfləri tapması üçün Şvan borularını düzləndirməyi hədəfləyir.",
  },
};
