/**
 * Lesson content for the Brain Bee curriculum. Plain script, no build step —
 * same convention as brain-bee-questions.js / brain-bee-structures.js.
 *
 * Chapter/part numbering matches BRAIN-BEE-CURRICULUM.md's "Curriculum
 * order — parts, chapters, lessons" section. `body: []` means "not written
 * yet" — brain-bee-lessons.js shows those as honestly disabled, never as
 * faked content. Every prompt-facing string is bilingual ({en, az}).
 *
 * moduleId links a lesson to its practice pool in practice.html
 * (?module=<moduleId>). null means the chapter has no practice content yet
 * — see the "gap" rows in the curriculum doc.
 */
function p(en, az) {
  return { type: "p", text: { en: en, az: az } };
}
var PART_INTRO = { en: "Introduction to the Brain", az: "Beynə giriş" };
var PART_SENSE = { en: "Sensing, Thinking, and Behaving", az: "Hiss etmə, düşünmə və davranış" };
var PART_LIFESPAN = { en: "Across the Lifespan", az: "Həyat boyu" };
var PART_RESEARCH = { en: "Brain Research", az: "Beyin tədqiqatı" };
var PART_DISORDERS = { en: "Diseases and Disorders", az: "Xəstəliklər və pozğunluqlar" };
var PART_TREATING = { en: "Treating Brain Disorders", az: "Beyin xəstəliklərinin müalicəsi" };
var CH_BASICS = { en: "Brain Basics", az: "Beyin əsasları" };

var BB_LESSONS = [
  {
    id: "neuron-structure",
    chapter: "1.1",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "The neuron: structure", az: "Neyron: quruluşu" },
    moduleId: "neuron-ap",
    body: [
      p(
        "A neuron is the basic signaling cell of the nervous system, built to do one job well: receive information, decide whether it matters, and pass a signal on. Four parts do that job. Dendrites are the branching processes that receive input from other neurons. The soma (cell body) holds the nucleus and the machinery that keeps the cell alive, and it is where incoming signals are added together. The axon is a single long process that carries the neuron's output away from the soma — some are barely visible under a microscope, others (like the ones running from your spinal cord to your toes) are over a meter long. Where the axon leaves the soma, at the axon hillock, is where those added-up signals either cross a threshold and fire, or don't.",
        "Neyron sinir sisteminin əsas siqnal hüceyrəsidir və tək bir işi yaxşı yerinə yetirmək üçün qurulub: məlumatı qəbul etmək, onun əhəmiyyətli olub-olmadığına qərar vermək və siqnalı ötürmək. Bunu dörd hissə həyata keçirir. Dendritlər digər neyronlardan girişi qəbul edən budaqlanan çıxıntılardır. Soma (hüceyrə gövdəsi) nüvəni və hüceyrəni canlı saxlayan mexanizmi saxlayır, həm də gələn siqnalların toplandığı yerdir. Akson somadan çıxan tək, uzun çıxıntıdır və neyronun çıxışını daşıyır — bəziləri mikroskop altında çətin görünür, digərləri (məsələn onurğa beynindən ayaq barmaqlarına gedənlər) bir metrdən uzun ola bilər. Aksonun somadan ayrıldığı yer, akson təpəciyi, toplanmış siqnalların həddi keçib-keçmədiyinə və atəşin baş verib-verməyəcəyinə qərar verilən yerdir."
      ),
      p(
        "Most axons are wrapped in myelin, a fatty insulating sheath that speeds up signal conduction. In the central nervous system it's made by oligodendrocytes; in the peripheral nervous system, by Schwann cells. Myelin isn't continuous — it's broken into segments with small gaps called nodes of Ranvier, and the signal effectively jumps from node to node (saltatory conduction) rather than crawling down the whole membrane. That's the difference between a myelinated axon conducting at up to 120 meters per second and an unmyelinated one crawling along at under 2.",
        "Əksər aksonlar keçiriciliyi sürətləndirən yağlı izolyasiya təbəqəsi olan mielinlə örtülüdür. Mərkəzi sinir sistemində onu oliqodendrositlər, periferik sinir sistemində isə Şvann hüceyrələri yaradır. Mielin fasiləsiz deyil — Ranvier düyünləri adlanan kiçik boşluqlarla seqmentlərə bölünür və siqnal membran boyunca sürünmək əvəzinə düyündən düyünə tullanır (saltatorik keçirilmə). Bu, mielinli bir aksonun saniyədə 120 metrə qədər sürətlə, mielinsiz aksonun isə 2 metrdən az sürətlə keçirməsi arasındakı fərqdir."
      ),
      p(
        "At the far end, the axon branches into terminals that release neurotransmitter onto the next cell — the topic of the next lesson. Neurons aren't all one shape: multipolar neurons (one axon, many dendrites) are the most common type in the brain and spinal cord; bipolar neurons (one dendrite, one axon) show up in sensory pathways like the retina; and pseudounipolar neurons, found in sensory ganglia, have a single process that splits in two, carrying signal in from the periphery and on to the spinal cord without a conventional soma in between.",
        "Uzaq ucda akson, növbəti hüceyrəyə neyrotransmitter buraxan terminallara budaqlanır — bu, növbəti dərsin mövzusudur. Neyronların hamısı eyni formada deyil: multipolyar neyronlar (bir akson, çoxlu dendrit) beyin və onurğa beynində ən çox rast gəlinən növdür; bipolyar neyronlar (bir dendrit, bir akson) tor qişa kimi sensor yollarda görünür; psevdounipolyar neyronlar isə sensor qanqliyalarda tapılır və ikiyə bölünən tək bir çıxıntıya malikdir, siqnalı periferiyadan içəri və adi soma olmadan birbaşa onurğa beyninə daşıyır."
      ),
      p(
        "Neurons don't work alone. Glial cells do the support work alongside them, and in the human brain there are roughly as many of them as neurons — older textbook estimates that glia outnumber neurons 10-to-1 came from less rigorous counting methods and have since been revised down by direct stereological counts (a widely cited 2009 study put both figures at roughly 86 billion). Astrocytes maintain the chemical environment around synapses, microglia are the nervous system's immune cells, and — as above — oligodendrocytes and Schwann cells build myelin. None of them fire action potentials themselves, which is the subject of the next lesson.",
        "Neyronlar tək işləmir. Qlial hüceyrələr onlarla yanaşı dəstək işini görür və insan beynində onların sayı təxminən neyronların sayı qədərdir — qlial hüceyrələrin neyronları 10 dəfə üstələdiyi barədə köhnə dərslik təxminləri daha az dəqiq sayma metodlarından qaynaqlanırdı və birbaşa stereoloji sayımlarla aşağı düzəldilib (geniş istinad edilən 2009-cu il tədqiqatı hər iki rəqəmi təxminən 86 milyard olaraq müəyyən edib). Astrositlər sinapslar ətrafındakı kimyəvi mühiti saxlayır, mikroqlia sinir sisteminin immun hüceyrələridir və — yuxarıda deyildiyi kimi — oliqodendrositlər və Şvann hüceyrələri mielini qurur. Heç biri özü fəaliyyət potensialı yaratmır — bu, növbəti dərsin mövzusudur."
      ),
    ],
    see: { href: "neuronatlas/index.html", en: "See the neuron in 3D →", az: "Neyronu 3D-də gör →" },
    video: { youtubeId: "qPix_X-9t7E", title: { en: "The Nervous System, Part 1: Crash Course A&P #8", az: "Sinir sistemi, 1-ci hissə: Crash Course A&P #8 (ingiliscə)" } },
  },
  {
    id: "neuron-action-potential",
    chapter: "1.2",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Resting potential & the action potential", az: "İstirahət potensialı və fəaliyyət potensialı" },
    moduleId: "neuron-ap",
    body: [
      p(
        "At rest, a neuron's inside is about -70 millivolts relative to the outside — the resting membrane potential. This voltage exists because the cell membrane is selectively permeable: sodium-potassium pumps use ATP to push 3 sodium ions out for every 2 potassium ions they bring in, and leak channels let potassium diffuse out more easily than sodium can diffuse in, leaving the inside negatively charged relative to the outside.",
        "İstirahət halında neyronun içi xaricə nisbətən təxminən -70 millivoltdur — istirahət membran potensialı. Bu gərginlik hüceyrə membranının seçici keçiriciliyindən yaranır: natrium-kalium nasosları ATP istifadə edərək hər 2 kalium ionunu içəri gətirdikdə 3 natrium ionunu bayıra çıxarır, sızma kanalları isə kaliumun xaricə, natriumun isə içəriyə diffuziyasından daha asan buraxır və nəticədə hüceyrənin içi xaricə nisbətən mənfi yüklü qalır."
      ),
      p(
        "An action potential is a rapid, all-or-none reversal of this voltage. When depolarization at the axon hillock crosses a threshold (around -55 mV), voltage-gated sodium channels snap open, sodium rushes in, and the membrane potential spikes toward +30 mV. Voltage-gated potassium channels then open (more slowly), potassium rushes out, and the membrane repolarizes — usually overshooting into a brief hyperpolarization before settling back to rest.",
        "Fəaliyyət potensialı bu gərginliyin sürətli, hamısı-ya-heç nə prinsipi ilə tərsinə çevrilməsidir. Akson təpəciyində depolyarizasiya həddi (təxminən -55 mV) keçdikdə gərginliklə idarə olunan natrium kanalları açılır, natrium içəri axır və membran potensialı +30 mV-a doğru sıçrayır. Sonra gərginliklə idarə olunan kalium kanalları (daha yavaş) açılır, kalium xaricə axır və membran repolyarizasiya olunur — adətən qısa müddət istirahət səviyyəsindən aşağı düşür (hiperpolyarizasiya), sonra yenidən istirahət səviyyəsinə qayıdır."
      ),
      p(
        "\"All-or-none\" means a stimulus below threshold produces no spike at all, and any stimulus above threshold produces an identical spike — intensity is coded by firing frequency, not spike size. During the rising phase and part of the falling phase, the neuron can't fire again at all (absolute refractory period), and needs a stronger-than-normal stimulus to fire again for a short window after that (relative refractory period) — together they enforce one-way signal travel down the axon and cap how fast a neuron can fire.",
        "\"Hamısı-ya-heç nə\" o deməkdir ki, hədddən aşağı stimul heç bir sıçrayış yaratmır, hədddən yuxarı istənilən stimul isə eyni sıçrayışı yaradır — intensivlik sıçrayışın ölçüsü ilə deyil, atəş tezliyi ilə kodlanır. Yüksəliş fazasında və düşüş fazasının bir hissəsində neyron ümumiyyətlə yenidən atəş edə bilmir (mütləq refrakter dövr), bundan sonra qısa müddət ərzində yenidən atəş etmək üçün normaldan güclü stimul tələb olunur (nisbi refrakter dövr) — birlikdə bunlar siqnalın akson boyunca yalnız bir istiqamətdə getməsini təmin edir və neyronun nə qədər tez atəş edə biləcəyini məhdudlaşdırır."
      ),
    ],
    see: { href: "neuron-dynamics.html", en: "Try the spike simulator →", az: "Sıçrayış simulyatorunu sınayın →" },
    video: { youtubeId: "W2hHt_PXe5o", title: { en: "2-Minute Neuroscience: Action Potential", az: "2 Dəqiqəlik Neurobilim: Fəaliyyət Potensialı (ingiliscə)" } },
  },
  {
    id: "neuron-conduction",
    chapter: "1.3",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Conduction: myelin & saltatory conduction", az: "Keçirilmə: mielin və saltatorik keçirilmə" },
    moduleId: "neuron-ap",
    body: [
      p(
        "Myelin is a fatty, multilayered wrapping around an axon that acts as electrical insulation, produced by oligodendrocytes in the central nervous system and by Schwann cells in the peripheral nervous system. It isn't continuous — it's laid down in segments called internodes, separated by short unmyelinated gaps called the nodes of Ranvier, where the axon membrane is exposed and packed with voltage-gated sodium channels.",
        "Mielin akson ətrafında elektrik izolyasiyası kimi işləyən yağlı, çoxqatlı örtükdür; mərkəzi sinir sistemində oliqodendrositlər, periferik sinir sistemində isə Şvann hüceyrələri tərəfindən yaradılır. Fasiləsiz deyil — internodlar adlanan seqmentlərlə yerləşdirilir, aralarında akson membranının açıq qaldığı və gərginliklə idarə olunan natrium kanalları ilə dolu olan Ranvier düyünləri adlanan qısa mielinsiz boşluqlar var."
      ),
      p(
        "Under the myelin, current still flows passively along the axon almost instantly, but that passive spread decays with distance. Because the nodes are spaced close enough that the decaying signal from one node is still strong enough to trigger a fresh action potential at the next, the impulse appears to jump from node to node — saltatory conduction (from the Latin saltare, \"to leap\") — rather than regenerating continuously along every point of the membrane.",
        "Mielinin altında cərəyan akson boyunca demək olar ki, ani olaraq passiv şəkildə axır, lakin bu passiv yayılma məsafə ilə zəifləyir. Düyünlər bir-birinə kifayət qədər yaxın yerləşdiyi üçün bir düyündən zəifləyən siqnal növbəti düyündə yeni bir fəaliyyət potensialı yaratmaq üçün hələ də kifayət qədər güclü olur — impuls düyündən düyünə tullanır kimi görünür (saltatorik keçirilmə, latınca saltare — \"tullanmaq\"dan) — membranın hər nöqtəsində fasiləsiz yenidən yaranmaq əvəzinə."
      ),
      p(
        "The payoff is speed and efficiency: a large myelinated axon can conduct at up to 120 meters per second, versus under 2 meters per second for an unmyelinated axon of similar diameter. Loss of myelin disrupts this — in multiple sclerosis, for example, demyelinated patches slow or block conduction, which is why the disease produces such varied neurological symptoms depending on which tracts are affected.",
        "Nəticə sürət və effektivlikdir: böyük mielinli akson saniyədə 120 metrə qədər sürətlə keçirə bilər, oxşar diametrli mielinsiz akson isə saniyədə 2 metrdən az sürətlə. Mielinin itirilməsi bunu pozur — məsələn, çoxlu skleroz zamanı demielinləşmiş sahələr keçirilməni yavaşladır və ya bloklayır, buna görə xəstəlik hansı yolların təsirləndiyindən asılı olaraq çox müxtəlif nevroloji simptomlar yaradır."
      ),
    ],
    video: { youtubeId: "5V7RZwDpmXE", title: { en: "2-Minute Neuroscience: Myelin", az: "2 Dəqiqəlik Neurobilim: Mielin (ingiliscə)" } },
  },
  {
    id: "synapse-transmitters",
    chapter: "1.4",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Synapses & neurotransmitters", az: "Sinapslar və neyrotransmitterlər" },
    moduleId: "synapse-nt",
    body: [
      p(
        "A synapse is the junction where one neuron communicates with the next — most commonly chemically, across a gap of about 20 nanometers called the synaptic cleft. When an action potential reaches the presynaptic terminal, voltage-gated calcium channels open, calcium floods in, and that triggers synaptic vesicles full of neurotransmitter to fuse with the membrane and release their contents by exocytosis.",
        "Sinaps bir neyronun digəri ilə əlaqə saxladığı qovşaqdır — ən çox kimyəvi yolla, sinaptik yarıq adlanan təxminən 20 nanometrlik boşluq üzərindən. Fəaliyyət potensialı presinaptik terminala çatdıqda gərginliklə idarə olunan kalsium kanalları açılır, kalsium içəri axır və bu, neyrotransmitterlə dolu sinaptik vezikulaların membranla birləşərək ekzositoz yolu ilə məzmununu buraxmasına səbəb olur."
      ),
      p(
        "The neurotransmitter diffuses across the cleft and binds receptors on the postsynaptic membrane, producing either an excitatory postsynaptic potential (depolarizing, pushing the next neuron toward firing — commonly via glutamate) or an inhibitory postsynaptic potential (hyperpolarizing, pushing it away from firing — commonly via GABA or glycine). A single neuron integrates thousands of these inputs at once; whether it fires depends on the net sum at the axon hillock.",
        "Neyrotransmitter yarıq boyunca diffuziya edir və postsinaptik membranda reseptorlara birləşir, ya həyəcanlandırıcı postsinaptik potensial yaradır (depolyarizasiya, növbəti neyronu atəşə doğru itələyir — adətən qlutamat vasitəsilə) ya da inhibə edici postsinaptik potensial (hiperpolyarizasiya, atəşdən uzaqlaşdırır — adətən QAYT və ya qlisin vasitəsilə). Tək bir neyron eyni anda minlərlə belə girişi birləşdirir; atəş edib-etməyəcəyi akson təpəciyindəki cəm nəticəsindən asılıdır."
      ),
      p(
        "The signal is stopped by reuptake (transporters pull neurotransmitter back into the presynaptic terminal — the target of SSRIs, for serotonin), enzymatic breakdown (acetylcholinesterase clears acetylcholine at the neuromuscular junction), or simple diffusion away from the cleft. Other major neurotransmitters worth knowing by name and rough effect: dopamine (reward, movement — depleted in Parkinson's disease), norepinephrine (arousal, alertness), and serotonin (mood, sleep regulation).",
        "Siqnal geri udulma (daşıyıcılar neyrotransmitteri presinaptik terminala geri çəkir — serotonin üçün SSRİ-lərin hədəfi), fermentativ parçalanma (asetilxolinesteraza neyromuskulyar qovşaqda asetilxolini təmizləyir) və ya sadəcə yarıqdan uzaqlaşan diffuziya ilə dayandırılır. Adı və təxmini təsiri ilə bilinməli digər əsas neyrotransmitterlər: dofamin (mükafat, hərəkət — Parkinson xəstəliyində azalır), noradrenalin (oyanıqlıq, diqqətlilik) və serotonin (əhval-ruhiyyə, yuxu tənzimi)."
      ),
    ],
    see: { href: "synapse.html", en: "See the synapse in 3D →", az: "Sinapsı 3D-də gör →" },
    video: { youtubeId: "VitFvNvRIIY", title: { en: "The Nervous System, Part 3 - Synapses!: Crash Course A&P #10", az: "Sinir sistemi, 3-cü hissə: Sinapslar! Crash Course A&P #10 (ingiliscə)" } },
  },
  {
    id: "brain-overview",
    chapter: "1.5",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Whole-brain orientation: meninges & ventricles", az: "Bütöv beyinə giriş: meninges və mədəciklər" },
    moduleId: "ventricles-meninges",
    body: [
      p(
        "Three membrane layers, the meninges, wrap the entire central nervous system between the skull/vertebrae and the nervous tissue itself. From outside in: the dura mater is a tough, fibrous outer layer (in the skull it forms folds like the falx cerebri, separating the two hemispheres, and the tentorium cerebelli, separating the cerebrum from the cerebellum); the arachnoid mater is a thin, web-like middle layer; and the pia mater is a delicate membrane that hugs the brain's surface directly. Cerebrospinal fluid (CSF) fills the subarachnoid space between arachnoid and pia, cushioning the brain and reducing its effective weight from about 1,400 grams to roughly 50.",
        "Üç membran qatı, meninges, bütün mərkəzi sinir sistemini kəllə/onurğa sütunu ilə sinir toxuması arasında əhatə edir. Xaricdən içəriyə: dura mater — sərt, lifli xarici qat (kəllədə iki yarımkürəni ayıran falx cerebri, kiçik beyni böyük beyindən ayıran tentorium cerebelli kimi qatlar yaradır); arachnoid mater — nazik, hörümçək toru bənzər orta qat; pia mater isə beynin səthinə birbaşa yapışan nazik membrandır. Beyin-onurğa beyni mayesi (BOM) arachnoid və pia arasındakı subarachnoid boşluğu doldurur, beyni yastıqlayır və onun effektiv çəkisini təxminən 1400 qramdan təxminən 50 qrama endirir."
      ),
      p(
        "CSF itself is made inside four fluid-filled cavities called ventricles — two lateral ventricles (one in each hemisphere), a midline third ventricle, and a fourth ventricle near the brainstem — by tissue called the choroid plexus. It circulates from the lateral ventricles through the interventricular foramina into the third ventricle, down the cerebral aqueduct into the fourth ventricle, then out into the subarachnoid space, where it's eventually reabsorbed into the venous bloodstream. Blockage anywhere along that path causes CSF to build up in the ventricles — hydrocephalus — which is why knowing this pathway matters clinically, not just anatomically.",
        "BOM özü mədəciklər adlanan dörd mayeli boşluqda — hər yarımkürədə bir olmaqla iki yan mədəcik, ortada üçüncü mədəcik və beyin sapı yaxınlığında dördüncü mədəcik — xoroid pleksus adlanan toxuma tərəfindən istehsal olunur. Yan mədəciklərdən mədəciklərarası dəliklər vasitəsilə üçüncü mədəciyə, beyin su kəməri ilə dördüncü mədəciyə axır, sonra subarachnoid boşluğa çıxır və nəhayət venoz qan dövranına sorulur. Bu yolun istənilən yerində tıxanma mədəciklərdə BOM-un yığılmasına səbəb olur — hidrosefaliya — buna görə bu yolu bilmək təkcə anatomik deyil, klinik baxımdan da vacibdir."
      ),
    ],
    see: { href: "ventricles/index.html", en: "See the ventricles in 3D →", az: "Mədəcikləri 3D-də gör →" },
    video: { youtubeId: "q8NtmDrb_qo", title: { en: "Central Nervous System: Crash Course A&P #11", az: "Mərkəzi sinir sistemi: Crash Course A&P #11 (ingiliscə)" } },
  },
  {
    id: "cortex-lobes",
    chapter: "1.6",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Cortex & lobes", az: "Qabıq və paylar" },
    moduleId: "cortex",
    body: [
      p(
        "The cerebral cortex is the brain's outer, wrinkled sheet of gray matter — about 2-4 millimeters thick, but folded into gyri (ridges) and sulci (grooves) to pack roughly 2,000-2,500 square centimeters (a quarter of a square meter or so — about two-thirds of it hidden inside the folds) of surface area into the skull. Each hemisphere has four lobes. The frontal lobe (bounded behind by the central sulcus) handles voluntary movement (primary motor cortex, the precentral gyrus), planning, and decision-making, and contains Broca's area, involved in speech production. The parietal lobe (behind the central sulcus) processes touch, pressure, temperature, and pain via the primary somatosensory cortex (postcentral gyrus), and integrates that with vision and hearing for spatial awareness.",
        "Beyin qabığı beynin xarici, qırışıq boz maddə təbəqəsidir — təxminən 2-4 millimetr qalınlığında, lakin təxminən 2,000-2,500 kvadrat santimetr (kvadrat metrin dörddə biri qədər — təxminən üçdə ikisi qırışların içində gizlənir) səth sahəsini kəllədə sığdırmaq üçün girus (təpəciklər) və sulkuslara (şırımlar) qatlanmışdır. Hər yarımkürə dörd paydan ibarətdir. Frontal pay (arxadan mərkəzi şırımla hüdudlanır) könüllü hərəkəti (əsas motor qabığı, presentral girus), planlaşdırmanı və qərar qəbulunu idarə edir və nitq istehsalında iştirak edən Broka nahiyəsini ehtiva edir. Parietal pay (mərkəzi şırımın arxasında) toxunma, təzyiq, temperatur və ağrını əsas somatosensor qabıq (postsentral girus) vasitəsilə emal edir və bunu məkan qavrayışı üçün görmə və eşitmə ilə birləşdirir."
      ),
      p(
        "The temporal lobe, at the sides, handles hearing (primary auditory cortex) and contains Wernicke's area, involved in language comprehension, plus structures on its medial surface tied to memory. The occipital lobe, at the back, is almost entirely devoted to vision — the primary visual cortex sits along the calcarine sulcus. A fifth region, the insula, is folded deep inside the lateral sulcus rather than sitting on the surface, and contributes to taste, interoception, and emotional processing.",
        "Yan tərəflərdə yerləşən temporal pay eşitməni (əsas eşitmə qabığı) idarə edir və dil anlamasında iştirak edən Vernike nahiyəsini, həmçinin yaddaşla bağlı medial səthindəki strukturları ehtiva edir. Arxada yerləşən oksipital pay demək olar ki, tamamilə görməyə həsr olunub — əsas görmə qabığı kalkarin şırım boyunca yerləşir. Beşinci nahiyə, insula, səthdə deyil, lateral şırımın dərinliyində qatlanıb və dad, interosepsiya (bədənin daxili vəziyyətini hiss etmə) və emosional emalda iştirak edir."
      ),
    ],
    see: { href: "cerebral-cortex/index.html", en: "See the cortex in 3D →", az: "Qabığı 3D-də gör →" },
    video: { youtubeId: "7TK1LpjV5bI", title: { en: "2-Minute Neuroscience: Cerebral Cortex", az: "2 Dəqiqəlik Neurobilim: Baş Beyin Qabığı (ingiliscə)" } },
  },
  {
    id: "diencephalon",
    chapter: "1.7",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Diencephalon", az: "Diensefalon" },
    moduleId: "diencephalon",
    body: [
      p(
        "The diencephalon sits between the cerebral hemispheres and the brainstem, and its two main structures are the thalamus and hypothalamus. The thalamus is a pair of egg-shaped nuclei that act as the brain's relay station: with the exception of smell, every sensory pathway passes through a specific thalamic nucleus before reaching its cortical target, and the thalamus also relays motor signals between the basal ganglia/cerebellum and the motor cortex.",
        "Diensefalon beyin yarımkürələri ilə beyin sapı arasında yerləşir və onun iki əsas strukturu talamus və hipotalamusdur. Talamus beynin relay stansiyası kimi işləyən yumurta formalı nüvələr cütüdür: qoxu istisna olmaqla, hər sensor yol kortikal hədəfinə çatmazdan əvvəl müəyyən bir talamik nüvədən keçir, talamus həmçinin bazal qanqliyalar/beyincik ilə motor qabıq arasında motor siqnalları da ötürür."
      ),
      p(
        "The hypothalamus, just below the thalamus, is small — about the size of an almond — but controls the autonomic nervous system and, via the pituitary gland hanging just beneath it, the endocrine system. It regulates body temperature, hunger and thirst, and the sleep-wake cycle (via its suprachiasmatic nucleus, the body's master clock), mostly by releasing hormones that cause the pituitary to release its own hormones into the bloodstream. Other diencephalic structures worth knowing: the mammillary bodies (memory circuitry) and the epithalamus, which includes the pineal gland (melatonin secretion) and the habenula.",
        "Talamusun altında yerləşən hipotalamus kiçikdir — badam ölçüsündə — lakin avtonom sinir sistemini və onun altında asılan hipofiz vəzi vasitəsilə endokrin sistemi idarə edir. Bədən temperaturunu, aclıq və susuzluğu, yuxu-oyaqlıq dövrünü (bədənin əsas saatı olan suprakiazmatik nüvəsi vasitəsilə), əsasən hipofizin öz hormonlarını qan dövranına buraxmasına səbəb olan hormonlar ifraz edərək tənzimləyir. Bilinməli digər diensefalik strukturlar: mamillar cisimlər (yaddaş dövrəsi) və şam vəzini (melatonin ifrazı) və habenulanı ehtiva edən epitalamus."
      ),
    ],
    see: { href: "diencephalon/index.html", en: "See the diencephalon in 3D →", az: "Diensefalonu 3D-də gör →" },
    video: { youtubeId: "zN90PHaLs4I", title: { en: "Thalamus, hypothalamus, and limbic system | Neural control and coordination | Biology | Khan Academy", az: "Talamus, hipotalamus və limbik sistem | Sinir tənzimi və koordinasiyası | Biologiya | Khan Academy (ingiliscə)" } },
  },
  {
    id: "limbic-system",
    chapter: "1.8",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Limbic system", az: "Limbik sistem" },
    moduleId: "limbic",
    body: [
      p(
        "The limbic system isn't a single structure but a network of interconnected regions handling emotion, memory, and motivation, arranged around the diencephalon. The hippocampus, a curved structure in the medial temporal lobe, is essential for forming new declarative memories and for spatial navigation — the case of patient H.M., who could no longer form new long-term memories after his hippocampi were removed, established this. The amygdala, just in front of the hippocampus, processes emotional salience — especially fear and threat detection — and tags memories with emotional weight, which is why emotionally charged events tend to be remembered more vividly.",
        "Limbik sistem tək bir struktur deyil, diensefalon ətrafında yerləşən, emosiya, yaddaş və motivasiyanı idarə edən qarşılıqlı əlaqəli nahiyələr şəbəkəsidir. Medial temporal payda əyri struktur olan hippokamp yeni deklarativ yaddaşların formalaşması və məkan naviqasiyası üçün vacibdir — hippokampları çıxarıldıqdan sonra yeni uzunmüddətli yaddaş formalaşdıra bilməyən H.M. xəstəsinin nümunəsi bunu sübut etdi. Hippokampın qarşısında yerləşən amiqdala emosional əhəmiyyəti, xüsusən qorxu və təhlükə aşkarlanmasını emal edir və yaddaşları emosional çəki ilə işarələyir, buna görə emosional cəhətdən yüklü hadisələr adətən daha canlı xatırlanır."
      ),
      p(
        "Other limbic structures include the cingulate gyrus (emotion regulation, pain processing, decision-making), the fornix (a fiber tract carrying signals from the hippocampus to the mammillary bodies), and the septal nuclei (reward and pleasure circuitry). Because the limbic system sits at the interface between the diencephalon and the cortex, it lets cognitive appraisal and automatic emotional/physiological response influence each other constantly.",
        "Digər limbik strukturlara singulyat girus (emosiya tənzimi, ağrı emalı, qərar qəbulu), forniks (hippokampdan mamillar cisimlərə siqnal daşıyan lif yolu) və septal nüvələr (mükafat və zövq dövrəsi) daxildir. Limbik sistem diensefalon ilə qabıq arasındakı sərhəddə yerləşdiyi üçün koqnitiv qiymətləndirmə ilə avtomatik emosional/fizioloji reaksiyanın daim bir-birinə təsir etməsinə imkan verir."
      ),
    ],
    see: { href: "limbic/index.html", en: "See the limbic system in 3D →", az: "Limbik sistemi 3D-də gör →" },
    video: { youtubeId: "LNs9ruzoTmI", title: { en: "2-Minute Neuroscience: Limbic System", az: "2 Dəqiqəlik Neurobilim: Limbik Sistem (ingiliscə)" } },
    videoAz: { youtubeId: "bFiu6bS1dzY", title: { en: "Emotions: The Limbic System (Azerbaijani)", az: "Emosiyalar: Limbik sistem" } },
  },
  {
    id: "basal-ganglia",
    chapter: "1.9",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Basal ganglia", az: "Bazal qanqliyalar" },
    moduleId: "basal-ganglia",
    body: [
      p(
        "The basal ganglia are a group of subcortical nuclei — chiefly the caudate nucleus and putamen (together the striatum), the globus pallidus, the subthalamic nucleus, and the substantia nigra — that shape movement without initiating it directly. Rather than commanding specific muscles, they act as a gatekeeper: the cortex proposes a movement, and the basal ganglia's circuitry either releases the brake on it (a \"direct pathway\" that facilitates the intended movement) or reinforces the brake on competing, unwanted movements (an \"indirect pathway\"), so one smooth, selected action gets through instead of several conflicting ones.",
        "Bazal qanqliyalar — əsasən kaudat nüvə və putamen (birlikdə striatum adlanır), qlobus pallidus, subtalamik nüvə və qara maddə (substantia nigra) — hərəkəti birbaşa başlatmadan formalaşdıran subkortikal nüvələr qrupudur. Müəyyən əzələlərə əmr vermək əvəzinə, qapıçı kimi işləyirlər: qabıq bir hərəkət təklif edir, bazal qanqliyaların dövrəsi isə ya ona qoyulan əyləci açır (\"birbaşa yol\" nəzərdə tutulan hərəkəti asanlaşdırır) ya da rəqib, arzuolunmaz hərəkətlərə əyləci gücləndirir (\"dolayı yol\"), beləliklə bir neçə ziddiyyətli hərəkət əvəzinə yalnız bir hamar, seçilmiş hərəkət keçir."
      ),
      p(
        "The substantia nigra supplies dopamine to the striatum, and that dopamine signal balances the direct and indirect pathways. Parkinson's disease — progressive loss of dopamine-producing substantia nigra neurons — is the clearest illustration of what the basal ganglia normally do: without enough dopamine, the indirect (braking) pathway dominates, producing the disease's hallmark slowness of movement, rigidity, and resting tremor. Huntington's disease, by contrast, involves degeneration of the striatum itself and produces the opposite problem — involuntary, excessive movement (chorea).",
        "Qara maddə striatuma dofamin verir və bu dofamin siqnalı birbaşa və dolayı yolları tarazlaşdırır. Parkinson xəstəliyi — dofamin istehsal edən qara maddə neyronlarının tədricən itirilməsi — bazal qanqliyaların normal funksiyasının ən aydın nümunəsidir: kifayət qədər dofamin olmadıqda dolayı (əyləc) yol üstünlük təşkil edir, xəstəliyin xarakterik simptomları olan hərəkət yavaşlığını, sərtliyi və istirahət tremorunu yaradır. Hantinqton xəstəliyi isə striatumun özünün degenerasiyasını əhatə edir və əks problem yaradır — istəyə bağlı olmayan, artıq hərəkət (xoreya)."
      ),
    ],
    see: { href: "basal-ganglia/index.html", en: "See the basal ganglia in 3D →", az: "Bazal qanqliyaları 3D-də gör →" },
    video: { youtubeId: "OD2KPSGZ1No", title: { en: "2-Minute Neuroscience: Basal Ganglia", az: "2 Dəqiqəlik Neurobilim: Bazal Qanqliyalar (ingiliscə)" } },
  },
  {
    id: "brainstem",
    chapter: "1.10",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Brainstem", az: "Beyin sapı" },
    moduleId: "brainstem",
    body: [
      p(
        "The brainstem connects the cerebrum and cerebellum to the spinal cord and is made of three parts, top to bottom: the midbrain, pons, and medulla oblongata. Ten of the twelve cranial nerves attach here (all except I, olfactory, and II, optic), and the brainstem houses the nuclei those nerves connect to. It also carries every ascending sensory tract heading up to the thalamus and every descending motor tract heading down to the spinal cord, making it a bottleneck through which nearly all communication between brain and body must pass.",
        "Beyin sapı böyük beyni və beyinciyi onurğa beyni ilə birləşdirir və yuxarıdan aşağıya üç hissədən ibarətdir: orta beyin, körpü (pons) və uzunsov beyin (medulla oblongata). On iki kəllə sinirindən onu buraya bağlanır (I — qoxu və II — görmə sinirləri istisna olmaqla) və beyin sapı bu sinirlərin qoşulduğu nüvələri saxlayır. Həmçinin talamusa qalxan hər sensor yolu və onurğa beyninə enən hər motor yolu daşıyır, bu da onu beyin ilə bədən arasındakı demək olar ki, bütün rabitənin keçməli olduğu darboğaz edir."
      ),
      p(
        "Beyond relaying, the brainstem's reticular formation — a diffuse network running through all three parts — regulates consciousness and arousal (damage here can cause coma), and dedicated nuclei in the medulla control autonomic functions essential to survival: breathing rhythm, heart rate, and blood pressure. This is why brainstem injury is so much more immediately life-threatening than damage to an equivalent volume of cerebral cortex.",
        "Ötürmədən əlavə, hər üç hissədən keçən diffuz şəbəkə olan beyin sapının retikulyar formasiyası şüuru və oyanıqlığı tənzimləyir (buradakı zədə komaya səbəb ola bilər), uzunsov beyindəki xüsusi nüvələr isə sağ qalmaq üçün vacib avtonom funksiyaları idarə edir: nəfəsalma ritmi, ürək döyüntüsü və qan təzyiqi. Buna görə beyin sapı zədəsi ekvivalent həcmdə beyin qabığı zədəsindən qat-qat daha təhlükəlidir."
      ),
    ],
    see: { href: "brainstem/index.html", en: "See the brainstem in 3D →", az: "Beyin sapını 3D-də gör →" },
    video: { youtubeId: "T2zjlB4ctu4", title: { en: "2-Minute Neuroscience: The Brainstem", az: "2 Dəqiqəlik Neurobilim: Beyin Sapı (ingiliscə)" } },
  },
  {
    id: "cranial-nerves",
    chapter: "1.11",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Cranial nerves", az: "Kəllə sinirləri" },
    moduleId: "cranial-nerves",
    body: [
      p(
        "Twelve pairs of cranial nerves emerge directly from the brain (mostly the brainstem) rather than the spinal cord, numbered I through XII by where they attach, front to back. Three are purely sensory: I (olfactory), II (optic), and VIII (vestibulocochlear, hearing and balance). Five are purely motor: III (oculomotor), IV (trochlear), and VI (abducens) together move the eyeball; XI (accessory) controls neck and shoulder muscles; XII (hypoglossal) moves the tongue.",
        "On iki cüt kəllə siniri onurğa beynindən deyil, birbaşa beyindən (əsasən beyin sapından) çıxır və qoşulduğu yerə görə öndən arxaya I-dən XII-yə qədər nömrələnir. Üçü tamamilə sensordur: I (qoxu siniri), II (görmə siniri) və VIII (vestibulokoxlear sinir, eşitmə və tarazlıq). Beşi tamamilə motordur: III (okulomotor), IV (troxlear) və VI (abdusens) birlikdə göz almasını hərəkət etdirir; XI (əlavə sinir) boyun və çiyin əzələlərini idarə edir; XII (hipoqlossal) dili hərəkət etdirir."
      ),
      p(
        "The rest are mixed. V (trigeminal) carries facial sensation and drives chewing muscles. VII (facial) drives facial expression and carries taste from the front two-thirds of the tongue. IX (glossopharyngeal) handles taste from the back third of the tongue and swallowing. X (vagus) is the longest and most far-reaching — the primary parasympathetic nerve for the heart, lungs, and digestive tract, alongside its role in swallowing and speech.",
        "Qalanları qarışıqdır. V (trigeminal) üz hissiyyatını daşıyır və çeynəmə əzələlərini idarə edir. VII (üz siniri) üz ifadəsini idarə edir və dilin ön üçdə ikisindən dad hissini daşıyır. IX (dilaltı-udlaq siniri) dilin arxa üçdə birindən dad hissini və udmağı idarə edir. X (vaqus) ən uzun və ən geniş təsir dairəsinə malikdir — ürək, ağciyər və həzm traktı üçün əsas parasimpatik sinirdir, həmçinin udma və nitqdə də rol oynayır."
      ),
    ],
    see: { href: "cranial-nerves/index.html", en: "See the cranial nerves in 3D →", az: "Kəllə sinirlərini 3D-də gör →" },
    video: { youtubeId: "lieEQP1GHXU", title: { en: "All 12 Cranial Nerves | Anatomy & Physiology", az: "Bütün 12 Kəllə Siniri | Anatomiya və Fiziologiya (ingiliscə)" } },
  },
  {
    id: "cerebellum",
    chapter: "1.12",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "Cerebellum", az: "Beyincik" },
    moduleId: "cerebellum",
    body: [
      p(
        "The cerebellum (\"little brain\") sits behind the brainstem and, despite being only about 10% of the brain's volume, contains roughly 80% of all its neurons (a widely cited 2009 stereological count put it at about 69 of the brain's 86 billion — several times more than the cerebral cortex holds), packed into its own densely folded cortex. It doesn't initiate movement — the cortex and basal ganglia do that — but it continuously compares the movement that was intended against the movement that's actually happening and fine-tunes it in real time, which is why cerebellar damage doesn't cause paralysis but does cause ataxia: clumsy, poorly coordinated movement and a wide-based, unsteady gait.",
        "Beyincik (\"kiçik beyin\") beyin sapının arxasında yerləşir və beynin həcminin yalnız təxminən 10%-ni təşkil etsə də, bütün neyronların təxminən 80%-ni ehtiva edir (geniş istinad edilən 2009-cu il stereoloji sayım beynin 86 milyard neyronundan təxminən 69 milyardının burada olduğunu göstərib — beyin qabığından bir neçə dəfə çox), öz sıx qatlanmış qabığında toplanmışdır. Hərəkəti başlatmır — bunu qabıq və bazal qanqliyalar edir — lakin nəzərdə tutulan hərəkəti faktiki baş verən hərəkətlə daim müqayisə edir və real vaxtda dəqiqləşdirir, buna görə beyincik zədəsi iflic yaratmır, lakin ataksiya yaradır: bacarıqsız, zəif koordinasiya olunmuş hərəkət və geniş əsaslı, qeyri-sabit yeriş."
      ),
      p(
        "The cerebellum is organized into three functional zones. The vestibulocerebellum coordinates balance and eye movements using vestibular input. The spinocerebellum uses feedback from the body to adjust ongoing movement and posture. The cerebrocerebellum (the largest part in humans) works with the cerebral cortex on planning and timing of complex, learned movements — and increasingly, evidence points to it also contributing to cognitive tasks like language and attention.",
        "Beyincik üç funksional zonaya bölünür. Vestibulyar beyincik vestibulyar girişdən istifadə edərək tarazlığı və göz hərəkətlərini koordinasiya edir. Spinal beyincik davam edən hərəkəti və duruşu tənzimləmək üçün bədəndən gələn əlaqədən istifadə edir. İnsanlarda ən böyük hissə olan serebral beyincik mürəkkəb, öyrənilmiş hərəkətlərin planlaşdırılması və vaxtlaması üzərində beyin qabığı ilə işləyir — və artan sübutlar onun dil və diqqət kimi koqnitiv tapşırıqlara da töhfə verdiyini göstərir."
      ),
    ],
    see: { href: "cerebellum/index.html", en: "See the cerebellum in 3D →", az: "Beyinciyi 3D-də gör →" },
    video: { youtubeId: "Fir-v6EoZNE", title: { en: "2-Minute Neuroscience: Cerebellum", az: "2 Dəqiqəlik Neurobilim: Beyincik (ingiliscə)" } },
  },
  {
    id: "white-matter",
    chapter: "1.13",
    part: PART_INTRO,
    chapterTitle: CH_BASICS,
    title: { en: "White matter & tracts", az: "Ağ maddə və yollar" },
    moduleId: "white-matter",
    body: [
      p(
        "White matter is made of myelinated axons bundled into tracts — it looks white because of all that fatty myelin. Tracts fall into three categories by what they connect. Commissural tracts cross between the two hemispheres — the corpus callosum is the largest. Association tracts connect regions within the same hemisphere — the arcuate fasciculus, for instance, links Broca's and Wernicke's areas and is critical for language.",
        "Ağ maddə yollara birləşdirilmiş mielinli aksonlardan ibarətdir — bütün bu yağlı mielinə görə ağ görünür. Yollar nəyi birləşdirdiyinə görə üç kateqoriyaya bölünür. Komissural yollar iki yarımkürə arasında keçir — ən böyüyü corpus callosum-dur. Assosiativ yollar eyni yarımkürə daxilində nahiyələri birləşdirir — məsələn, arkuat fasikulus Broka və Vernike nahiyələrini birləşdirir və dil üçün kritikdir."
      ),
      p(
        "Projection tracts run vertically, connecting the cortex to lower structures. The corticospinal tract carries voluntary motor commands from the motor cortex down through the brainstem (crossing sides at the medullary pyramids) to the spinal cord. The internal capsule is a dense projection-fiber bottleneck between the thalamus and basal ganglia through which nearly all cortical input and output must pass — a small stroke there can cause disproportionately large deficits.",
        "Proyeksiya yolları şaquli istiqamətdə gedir, qabığı aşağı strukturlara birləşdirir. Kortikospinal yol könüllü motor əmrləri motor qabıqdan beyin sapı boyunca (uzunsov beyin piramidalarında tərəfləri dəyişərək) onurğa beyninə daşıyır. Daxili kapsul talamus və bazal qanqliyalar arasında demək olar ki, bütün kortikal giriş və çıxışın keçməli olduğu sıx proyeksiya-lif darboğazıdır — buradakı kiçik insult qeyri-mütənasib böyük çatışmazlıqlar yarada bilər."
      ),
    ],
    see: { href: "white-matter/index.html", en: "See the white matter tracts in 3D →", az: "Ağ maddə yollarını 3D-də gör →" },
    video: { youtubeId: "ZZQzMeFoZY0", title: { en: "Gray and white matter | Organ Systems | MCAT | Khan Academy", az: "Boz və ağ maddə | Orqan Sistemləri | MCAT | Khan Academy (ingiliscə)" } },
  },

  {
    id: "neural-development",
    chapter: "2.1",
    part: PART_INTRO,
    chapterTitle: { en: "The Developing Brain", az: "İnkişaf edən beyin" },
    title: { en: "Neural development & migration", az: "Sinir sisteminin inkişafı və miqrasiyası" },
    moduleId: "neural-development",
    body: [
      p(
        "The nervous system begins as a flat sheet of ectoderm that folds into the neural tube around week 3-4 of human gestation; the tube's front end swells into primary brain vesicles that go on to become the major divisions of the adult brain. Neurons are produced by neural stem cells lining the tube's inner surface, in a process called neurogenesis, at a staggering rate — an estimated 250,000 neurons per minute at the peak of prenatal development.",
        "Sinir sistemi insan hamiləliyinin təxminən 3-4-cü həftəsində sinir borusuna qatlanan düz ektoderma təbəqəsi kimi başlayır; borunun ön ucu şişərək yetkin beynin əsas bölmələrinə çevrilən əsas beyin qovuqlarına çevrilir. Neyronlar borunun daxili səthini örtən sinir kök hüceyrələri tərəfindən neyrogenez adlanan prosesdə, doğuşdan əvvəlki inkişafın zirvəsində dəqiqədə təxminən 250,000 neyron kimi heyrətamiz sürətlə istehsal olunur."
      ),
      p(
        "Once born, a neuron has to travel — often a long distance — to its final position, a process called migration, commonly guided along radial glial cells that act like scaffolding fibers stretching from the ventricular surface to the outer cortex. Cortical neurons are built in an \"inside-out\" pattern: the earliest-born neurons settle in the deepest cortical layer, and each subsequent wave migrates past the earlier ones to form a more superficial layer. Errors in this process are implicated in several neurodevelopmental and epilepsy-related conditions.",
        "Doğulduqdan sonra neyron son mövqeyinə çatmaq üçün — çox vaxt uzun məsafə — miqrasiya adlanan bir prosesdə hərəkət etməlidir, adətən mədəcik səthindən xarici qabığa qədər uzanan skelet lifləri kimi işləyən radial qlial hüceyrələr boyunca istiqamətləndirilir. Kortikal neyronlar \"içəridən-bayıra\" nümunəsi ilə qurulur: ən erkən doğulan neyronlar ən dərin kortikal qatda yerləşir, sonrakı hər neyron dalğası isə daha səthi bir qat yaratmaq üçün əvvəlkiləri keçərək miqrasiya edir. Bu prosesdəki xətalar bir sıra sinir inkişafı və epilepsiya ilə bağlı vəziyyətlərlə əlaqələndirilir."
      ),
    ],
    video: { youtubeId: "Tp25wrm-AoA", title: { en: "2-Minute Neuroscience: Early Neural development", az: "2 Dəqiqəlik Neurobilim: Erkən Sinir İnkişafı (ingiliscə)" } },
  },
  {
    id: "critical-periods",
    chapter: "2.2",
    part: PART_INTRO,
    chapterTitle: { en: "The Developing Brain", az: "İnkişaf edən beyin" },
    title: { en: "Critical periods", az: "Kritik dövrlər" },
    moduleId: "critical-periods",
    body: [
      p(
        "A critical period is a developmental window during which the nervous system is unusually sensitive to specific kinds of experience, and during which that experience is required to wire a circuit normally — miss the window, and the same experience later often can't fully correct what didn't develop. The classic demonstration comes from Hubel and Wiesel's work on kittens: temporarily depriving one eye of vision during the critical period for the visual cortex permanently reduced that eye's cortical representation, while the same deprivation in an adult animal caused no lasting change.",
        "Kritik dövr sinir sisteminin müəyyən növ təcrübəyə qeyri-adi dərəcədə həssas olduğu və bir dövrənin normal simlənməsi üçün bu təcrübənin tələb olunduğu inkişaf pəncərəsidir — pəncərə qaçırılarsa, eyni təcrübə sonradan tez-tez inkişaf etməyəni tam düzəldə bilmir. Klassik nümayiş Hubel və Wieselin pişik balaları üzərində işindən gəlir: görmə qabığı üçün kritik dövr zamanı bir gözü müvəqqəti olaraq görmədən məhrum etmək həmin gözün kortikal təmsilini daimi olaraq azaldırdı, halbuki eyni məhrumiyyət yetkin heyvanda heç bir uzunmüddətli dəyişiklik yaratmırdı."
      ),
      p(
        "In humans, the clearest example is language: children deprived of language exposure during early childhood typically fail to acquire normal grammar even with intensive intervention later, while second-language acquisition after the critical window tends to leave a detectable accent without approaching the total loss seen with first-language deprivation. Ophthalmology has its own practical critical period: amblyopia (\"lazy eye\") in a child must be treated early, because the visual cortex's capacity to reorganize around the problem narrows sharply after a few years.",
        "İnsanlarda ən aydın nümunə dildir: erkən uşaqlıqda dil təcrübəsindən məhrum olan uşaqlar adətən sonradan intensiv müdaxilə ilə belə normal qrammatikanı mənimsəyə bilmirlər, kritik pəncərədən sonra ikinci dil mənimsəmə isə adətən müəyyən edilə bilən aksent buraxır, lakin birinci dildən məhrumiyyətdə görülən tam itkiyə yaxınlaşmır. Oftalmologiyanın öz praktik kritik dövrü var: uşaqda ambliopiya (\"tənbəl göz\") erkən müalicə olunmalıdır, çünki görmə qabığının problem ətrafında yenidən təşkil olunma qabiliyyəti bir neçə ildən sonra kəskin şəkildə daralır."
      ),
    ],
    video: { youtubeId: "RruZTdqyNPg", title: { en: "Sensitive Periods in Brain Development", az: "Beyin İnkişafında Həssas Dövrlər (ingiliscə)" } },
  },
  {
    id: "neuroplasticity",
    chapter: "2.3",
    part: PART_INTRO,
    chapterTitle: { en: "The Developing Brain", az: "İnkişaf edən beyin" },
    title: { en: "Neuroplasticity", az: "Neyroplastiklik" },
    moduleId: "neuroplasticity",
    body: [
      p(
        "Neuroplasticity is the nervous system's capacity to change its structure and function in response to experience, and it operates at every scale, from single synapses to whole cortical maps. At the synaptic level, long-term potentiation (LTP) — a lasting strengthening of a synapse after repeated, coordinated activity — is the best-studied cellular mechanism believed to underlie learning and memory, captured in the summary \"neurons that fire together, wire together.\" At a larger scale, cortical remapping can occur after injury or amputation: the cortical area that used to represent an amputated finger gets progressively taken over by the representation of neighboring fingers.",
        "Neyroplastiklik sinir sisteminin təcrübəyə cavab olaraq öz strukturunu və funksiyasını dəyişdirmə qabiliyyətidir və tək sinapslardan bütöv kortikal xəritələrə qədər hər miqyasda fəaliyyət göstərir. Sinaptik səviyyədə uzunmüddətli potensiasiya (LTP) — təkrarlanan, koordinasiyalı fəaliyyətdən sonra sinapsın davamlı güclənməsi — öyrənmə və yaddaşın əsasında dayandığına inanılan ən yaxşı öyrənilmiş hüceyrə mexanizmidir, \"birlikdə atəş edən neyronlar birlikdə simlənir\" xülasəsində əks olunur. Daha böyük miqyasda, zədə və ya amputasiyadan sonra kortikal yenidən xəritələmə baş verə bilər: amputasiya olunmuş barmağı təmsil edən kortikal sahə tədricən qonşu barmaqların təmsilinə keçir."
      ),
      p(
        "Plasticity is highest during the critical periods of early development but never disappears entirely — adult brains still show measurable structural change with sustained practice, famously illustrated by London taxi drivers, whose posterior hippocampi are measurably larger than average after years of navigating the city's street layout. This capacity is also central to stroke recovery, where undamaged areas can partially take over functions of a damaged region through intensive, targeted rehabilitation.",
        "Plastiklik erkən inkişafın kritik dövrlərində ən yüksəkdir, lakin heç vaxt tamamilə yox olmur — yetkin beyinlər davamlı məşqlə hələ də ölçülə bilən struktur dəyişikliyi göstərir, bunun məşhur nümunəsi Londonun taksi sürücüləridir, illərlə şəhərin küçə planını naviqasiya etdikdən sonra arxa hippokampları orta hesabla ölçülə bilən dərəcədə daha böyükdür. Bu qabiliyyət insult bərpasında da mərkəzi rol oynayır, burada zədələnməmiş sahələr intensiv, hədəflənmiş reabilitasiya vasitəsilə zədələnmiş nahiyənin funksiyalarını qismən öz üzərinə götürə bilir."
      ),
    ],
    video: { youtubeId: "BFKoCAB6e6w", title: { en: "2-Minute Neuroscience: Neuroplasticity", az: "2 Dəqiqəlik Neurobilim: Neyroplastiklik (ingiliscə)" } },
  },

  {
    id: "vision",
    chapter: "3.1",
    part: PART_SENSE,
    chapterTitle: { en: "Senses & Perception", az: "Hisslər və qavrayış" },
    title: { en: "Vision", az: "Görmə" },
    moduleId: "sensory",
    body: [
      p(
        "Light enters the eye and is focused by the cornea and lens onto the retina, where photoreceptors — rods (dim light, no color) and cones (color) — convert light into electrical signals. Those signals pass through bipolar and ganglion cells, whose axons bundle into the optic nerve. At the optic chiasm, fibers from the nasal half of each retina cross to the opposite side, while fibers from the temporal half stay on the same side — meaning each optic tract carries information about the opposite visual field, not the opposite eye.",
        "İşıq gözə daxil olur və kornea və linza tərəfindən tor qişaya fokuslanır, burada fotoreseptorlar — çubuqlar (zəif işıq, rəngsiz) və kolbalar (rəng) — işığı elektrik siqnallarına çevirir. Bu siqnallar bipolyar və qanqlion hüceyrələrindən keçir, onların aksonları görmə sinirinə birləşir. Görmə xiazmasında hər tor qişanın nazal yarısından gələn liflər əks tərəfə keçir, temporal yarısından gələn liflər isə eyni tərəfdə qalır — bu o deməkdir ki, hər görmə yolu əks gözün deyil, əks görmə sahəsinin məlumatını daşıyır."
      ),
      p(
        "From the optic chiasm, most fibers travel to the lateral geniculate nucleus of the thalamus, then fan out to the primary visual cortex (V1) in the occipital lobe. A smaller branch bypasses the thalamus, going instead to the superior colliculus, which coordinates quick, reflexive eye movements without needing full cortical processing. Damage anywhere along this pathway produces a predictable pattern of vision loss depending on the exact location — a classic localizing tool in neurology.",
        "Görmə xiazmasından əksər liflər talamusun lateral genikulyar nüvəsinə, sonra isə oksipital paydakı əsas görmə qabığına (V1) yayılır. Daha kiçik bir budaq talamusu keçərək tam kortikal emala ehtiyac olmadan sürətli, refleks göz hərəkətlərini koordinasiya edən üstün kollikulusa gedir. Bu yolun istənilən yerindəki zədə dəqiq yerindən asılı olaraq gözlənilən görmə itkisi nümunəsi yaradır — nevrologiyada klassik lokalizasiya vasitəsi."
      ),
    ],
    see: { href: "visual-pathway/index.html", en: "See the visual pathway in 3D →", az: "Görmə yolunu 3D-də gör →" },
    video: { youtubeId: "o0DYP-u1rNM", title: { en: "Vision: Crash Course Anatomy & Physiology #18", az: "Görmə: Crash Course Anatomiya və Fiziologiya #18 (ingiliscə)" } },
    videoAz: { youtubeId: "534jhFpUIys", title: { en: "The Visual Analyzer — Eye Structure & Diseases (Azerbaijani)", az: "Görmə analizatoru. Gözün quruluşu. Göz xəstəlikləri." } },
  },
  {
    id: "hearing-balance",
    chapter: "3.2",
    part: PART_SENSE,
    chapterTitle: { en: "Senses & Perception", az: "Hisslər və qavrayış" },
    title: { en: "Hearing & balance", az: "Eşitmə və tarazlıq" },
    moduleId: "sensory",
    body: [
      p(
        "Sound waves funnel through the outer ear to the tympanic membrane, which vibrates and drives three tiny middle-ear bones — the malleus, incus, and stapes — that amplify the vibration and transmit it to the fluid-filled cochlea. Inside the cochlea, the vibration bends hair cells along the basilar membrane; different frequencies peak at different positions along the cochlea's spiral, and bending those hair cells converts vibration into an electrical signal carried by the vestibulocochlear nerve.",
        "Səs dalğaları xarici qulaqdan keçərək timpanik membrana çatır, o titrəyir və vibrasiyanı gücləndirən və maye ilə dolu koxleaya ötürən üç kiçik orta qulaq sümüyünü — çəkic, zindan və üzəngi — hərəkətə gətirir. Koxlea daxilində vibrasiya bazilyar membran boyunca yerləşən tük hüceyrələrini əyir; müxtəlif tezliklər koxlenin spiralında müxtəlif mövqelərdə zirvəyə çatır, bu tük hüceyrələrinin əyilməsi vibrasiyanı vestibulokoxlear sinir tərəfindən daşınan elektrik siqnalına çevirir."
      ),
      p(
        "That signal travels through the cochlear nuclei and superior olivary complex in the brainstem (where input from both ears is first compared, enabling sound localization) up to the primary auditory cortex. Balance uses the same nerve but a separate organ: the vestibular apparatus, made of three semicircular canals (detecting rotational head movement) and two otolith organs (detecting linear acceleration and head tilt). Its output feeds heavily into the cerebellum and into reflexes that stabilize gaze during head movement.",
        "Bu siqnal beyin sapındakı koxlear nüvələr və üstün olivar kompleksdən keçir (burada hər iki qulaqdan gələn giriş ilk dəfə müqayisə olunur, səsin yerini müəyyən etməyə imkan verir) və əsas eşitmə qabığına çatır. Tarazlıq eyni siniri, lakin ayrı bir orqanı istifadə edir: vestibulyar aparat, üç yarımdairəvi kanaldan (rotasiyalı baş hərəkətini aşkarlayır) və iki otolit orqandan (xətti sürətlənmə və başın əyilməsini aşkarlayır) ibarətdir. Onun çıxışı əsasən beyinciyə və baş hərəkəti zamanı baxışı sabitləşdirən reflekslərə daxil olur."
      ),
    ],
    see: { href: "ear-pathway/index.html", en: "See the ear pathway in 3D →", az: "Eşitmə yolunu 3D-də gör →" },
    video: { youtubeId: "Ie2j7GpC4JU", title: { en: "Hearing & Balance: Crash Course Anatomy & Physiology #17", az: "Eşitmə və Tarazlıq: Crash Course Anatomiya və Fiziologiya #17 (ingiliscə)" } },
    videoAz: { youtubeId: "RDKArsjXxrs", title: { en: "The Auditory Analyzer — Balance Organ & Ear (Azerbaijani)", az: "Eşitmə analizatoru. Müvazinət orqanı. Qulaq." } },
  },
  {
    id: "taste-smell-touch-pain",
    chapter: "3.3",
    part: PART_SENSE,
    chapterTitle: { en: "Senses & Perception", az: "Hisslər və qavrayış" },
    title: { en: "Taste, smell, touch & pain", az: "Dad, qoxu, toxunma və ağrı" },
    moduleId: "sensory",
    body: [
      p(
        "Taste receptors sit in taste buds on the tongue and detect five basic qualities — sweet, salty, sour, bitter, and umami — relaying that information via cranial nerves VII, IX, and X to the medulla, then thalamus, then cortex. Smell is unique among the senses: olfactory receptor neurons send axons directly to the olfactory bulb, bypassing the thalamus entirely and connecting straight into limbic structures like the amygdala — part of why smells trigger emotional memories so directly and vividly.",
        "Dad reseptorları dildəki dad qönçələrində yerləşir və beş əsas keyfiyyəti aşkarlayır — şirin, duzlu, turş, acı və umami — bu məlumatı VII, IX və X kəllə sinirləri vasitəsilə uzunsov beyinə, sonra talamusa, sonra qabığa ötürür. Qoxu hisslər arasında unikaldır: qoxu reseptor neyronları aksonlarını birbaşa qoxu soğanına göndərir, talamusu tamamilə keçərək amiqdala kimi limbik strukturlara birbaşa qoşulur — buna görə qoxular emosional xatirələri bu qədər birbaşa və canlı canlandırır."
      ),
      p(
        "Touch, temperature, and pain are carried by different receptor types and spinal pathways. Fine touch and proprioception travel up the dorsal column-medial lemniscus pathway, crossing sides in the medulla. Pain and temperature travel up the separate spinothalamic tract, crossing sides almost immediately at the spinal cord — this different crossing point is why certain spinal cord injuries produce a striking dissociation: loss of pain/temperature sensation on one side of the body but loss of fine touch on the other (Brown-Séquard syndrome).",
        "Toxunma, temperatur və ağrı müxtəlif reseptor növləri və müxtəlif onurğa beyni yolları ilə daşınır. Nazik toxunma və proprioseptsiya dorsal sütun-medial lemniskus yolu ilə yuxarı gedir, uzunsov beyində tərəfləri dəyişir. Ağrı və temperatur isə ayrı spinotalamik yol ilə yuxarı gedir, onurğa beyni səviyyəsində demək olar ki, dərhal tərəfləri dəyişir — bu fərqli keçid nöqtəsi müəyyən onurğa beyni zədələrinin çarpıcı bir ayrılma yaratmasının səbəbidir: bədənin bir tərəfində ağrı/temperatur hissinin itirilməsi, digər tərəfində isə nazik toxunmanın itirilməsi (Braun-Sekar sindromu)."
      ),
    ],
    video: { youtubeId: "mFm3yA1nslE", title: { en: "Taste & Smell: Crash Course Anatomy & Physiology #16", az: "Dad və Qoxu: Crash Course Anatomiya və Fiziologiya #16 (ingiliscə)" } },
  },

  {
    id: "learning-memory",
    chapter: "4.1",
    part: PART_SENSE,
    chapterTitle: { en: "Learning, Memory & Language", az: "Öyrənmə, yaddaş və dil" },
    title: { en: "Learning & memory", az: "Öyrənmə və yaddaş" },
    moduleId: "memory",
    body: [
      p(
        "Memory isn't one system — it splits broadly into declarative memory (facts and events, consciously recallable, dependent on the hippocampus) and non-declarative or procedural memory (skills and habits, which don't require conscious recall and depend more on the basal ganglia and cerebellum). Declarative memory further splits into semantic memory (general facts) and episodic memory (personally experienced events tied to a specific time and place).",
        "Yaddaş tək bir sistem deyil — geniş şəkildə deklarativ yaddaşa (faktlar və hadisələr, şüurlu şəkildə xatırlana bilən, hippokampdan asılı) və deklarativ olmayan və ya prosedural yaddaşa (şüurlu xatırlamaya ehtiyac duymayan və daha çox bazal qanqliyalar və beyincikdən asılı olan bacarıqlar və vərdişlər) bölünür. Deklarativ yaddaş isə semantik yaddaşa (ümumi faktlar) və epizodik yaddaşa (müəyyən vaxt və yerlə bağlı, şəxsən yaşanmış hadisələr) bölünür."
      ),
      p(
        "At the cellular level, learning depends on synaptic plasticity — most famously long-term potentiation (LTP) in the hippocampus, where repeated, strong stimulation of a synapse increases its future responsiveness. Memory formation isn't instantaneous either: newly formed memories go through consolidation, a stabilization process continuing for hours to years, partly during sleep, when the hippocampus is thought to \"replay\" recent experience to gradually transfer a stable copy into cortical long-term storage.",
        "Hüceyrə səviyyəsində öyrənmə sinaptik plastiklikdən asılıdır — ən məşhuru hippokampdakı uzunmüddətli potensiasiyadır (LTP), burada sinapsın təkrarlanan, güclü stimullaşdırılması onun gələcək cavabdehliyini artırır. Yaddaşın formalaşması da ani deyil: yeni formalaşan xatirələr saatlarla illər davam edən, qismən yuxu zamanı baş verən konsolidasiya prosesindən keçir, bu zaman hippokampın son təcrübəni \"təkrar oynadaraq\" sabit surətini tədricən kortikal uzunmüddətli yaddaşa ötürdüyünə inanılır."
      ),
    ],
    see: { href: "limbic/index.html", en: "See the hippocampus in 3D →", az: "Hippokampı 3D-də gör →" },
    video: { youtubeId: "bSycdIx-C48", title: { en: "How We Make Memories: Crash Course Psychology #13", az: "Yaddaşları Necə Yaradırıq: Crash Course Psixologiya #13 (ingiliscə)" } },
    videoAz: { youtubeId: "4nRNo6ZHK9c", title: { en: "Grade 9: Emotions and Memory (Azerbaijani)", az: "9-cu sinif: Emosiyalar və yaddaş" } },
  },
  {
    id: "language-brain",
    chapter: "4.2",
    part: PART_SENSE,
    chapterTitle: { en: "Learning, Memory & Language", az: "Öyrənmə, yaddaş və dil" },
    title: { en: "Language & the brain", az: "Dil və beyin" },
    moduleId: "language-brain",
    body: [
      p(
        "Language processing is lateralized — concentrated in the left hemisphere in roughly 95% of right-handed people — and centers on two classic regions. Broca's area, in the posterior inferior frontal lobe, is primarily involved in language production; damage there produces Broca's (expressive) aphasia, characterized by slow, effortful, grammatically simplified speech with relatively preserved comprehension.",
        "Dil emalı lateralizasiya olunub — sağ əlli insanların təxminən 95%-də sol yarımkürədə cəmləşib — və iki klassik nahiyəyə əsaslanır. Arxa aşağı frontal payda yerləşən Broka nahiyəsi əsasən dil istehsalında iştirak edir; buradakı zədə Broka (ekspressiv) afaziyasına səbəb olur, nisbətən qorunmuş anlamla yanaşı yavaş, çətinliklə, qrammatik cəhətdən sadələşdirilmiş nitqlə xarakterizə olunur."
      ),
      p(
        "Wernicke's area, in the posterior superior temporal lobe, is primarily involved in comprehension; damage there produces Wernicke's (receptive) aphasia — fluent, grammatically intact-sounding speech that is often nonsensical, with severely impaired comprehension. The two areas are connected by the arcuate fasciculus; damage there specifically produces conduction aphasia — fluent speech and largely intact comprehension, but a striking inability to repeat spoken phrases back accurately.",
        "Arxa üstün temporal payda yerləşən Vernike nahiyəsi əsasən anlamada iştirak edir; buradakı zədə Vernike (reseptiv) afaziyasına səbəb olur — axıcı, qrammatik cəhətdən bütöv səslənən, lakin tez-tez mənasız nitq, ağır dərəcədə pozulmuş anlama ilə birlikdə. Hər iki nahiyə arkuat fasikulus ilə birləşir; məhz buradakı zədə keçirici afaziyaya səbəb olur — axıcı nitq və əsasən qorunmuş anlama, lakin danışılan ifadələri dəqiq təkrarlamaqda çarpıcı bacarıqsızlıq."
      ),
    ],
    video: { youtubeId: "s9shPouRWCs", title: { en: "Language: Crash Course Psychology #16", az: "Dil: Crash Course Psixologiya #16 (ingiliscə)" } },
    videoAz: { youtubeId: "Ke_bWJP5fiM", title: { en: "Speech and the Brain: Aphasia and Split-Brain Patients (Azerbaijani)", az: "Nitq və beyin: Afaziya və bölünmüş beyinli pasientlər" } },
  },

  {
    id: "movement",
    chapter: "5",
    part: PART_SENSE,
    chapterTitle: { en: "Movement", az: "Hərəkət" },
    title: { en: "Movement", az: "Hərəkət" },
    moduleId: "motor",
    body: [
      p(
        "Voluntary movement begins in the primary motor cortex, organized as a \"motor homunculus\" — a distorted map where body parts needing fine control (hands, face, tongue) get disproportionately large cortical representation. From there, the corticospinal tract carries the command down through the brainstem, crossing to the opposite side at the medullary pyramids, down the spinal cord, and out via lower motor neurons that directly innervate muscle fibers — the \"final common pathway\" every movement command has to pass through.",
        "Könüllü hərəkət əsas motor qabığında başlayır, \"motor homunkulus\" kimi təşkil olunur — incə idarəetmə tələb edən bədən hissələrinin (əllər, üz, dil) faktiki ölçülərinə nisbətən qeyri-mütənasib böyük kortikal təmsilə malik olduğu təhrif olunmuş xəritə. Oradan kortikospinal yol əmri beyin sapı boyunca (uzunsov beyin piramidalarında əks tərəfə keçərək), onurğa beyni boyunca aşağı daşıyır və birbaşa əzələ liflərini innervasiya edən aşağı motor neyronlar vasitəsilə çıxarır — hər hərəkət əmrinin keçməli olduğu \"son ortaq yol\"."
      ),
      p(
        "That cortical command doesn't act alone — the basal ganglia gate which movement gets released and suppress competing ones, while the cerebellum continuously compares intended versus actual movement and fine-tunes it in real time. Damage at different points produces distinct patterns: an upper motor neuron lesion causes spastic weakness with increased reflexes, while a lower motor neuron lesion causes flaccid weakness with decreased reflexes and muscle wasting — a distinction with real diagnostic value in localizing a lesion.",
        "Bu kortikal əmr tək işləmir — bazal qanqliyalar hansı hərəkətin buraxılacağını qapılayır və rəqib hərəkətləri boğur, beyincik isə nəzərdə tutulan və faktiki hərəkəti daim müqayisə edir və real vaxtda dəqiqləşdirir. Fərqli nöqtələrdəki zədə fərqli nümunələr yaradır: yuxarı motor neyron zədəsi artmış reflekslərlə spastik zəiflik yaradır, aşağı motor neyron zədəsi isə azalmış reflekslər və əzələ atrofiyası ilə boşalmış zəiflik yaradır — zədənin lokalizasiyasında real diaqnostik dəyəri olan bir fərq."
      ),
    ],
    see: { href: "basal-ganglia/index.html", en: "See the basal ganglia in 3D →", az: "Bazal qanqliyaları 3D-də gör →" },
    video: { youtubeId: "APuiZCxDnTA", title: { en: "2-Minute Neuroscience: Motor Cortex", az: "2 Dəqiqəlik Neurobilim: Motor Qabıq (ingiliscə)" } },
  },

  {
    id: "sleep",
    chapter: "6.1",
    part: PART_SENSE,
    chapterTitle: { en: "Sleep", az: "Yuxu" },
    title: { en: "Sleep", az: "Yuxu" },
    moduleId: "sleep-attention-emotion",
    body: [
      p(
        "Sleep cycles through two fundamentally different states roughly every 90 minutes: non-REM (NREM) sleep, divided into progressively deeper stages (light drowsiness, the bulk of total sleep time marked by sleep spindles and K-complexes, and \"slow-wave\" deep sleep associated with tissue repair), and REM (rapid eye movement) sleep, marked by vivid dreaming, wake-like brain activity, and near-total skeletal muscle paralysis that normally prevents the sleeper from acting out dreams.",
        "Yuxu təxminən hər 90 dəqiqədə bir-birindən əsaslı şəkildə fərqlənən iki vəziyyət arasında dövr edir: qeyri-REM (NREM) yuxusu, tədricən dərinləşən mərhələlərə bölünür (yüngül mürgüləmə, yuxu iyləri və K-kompleksləri ilə xarakterizə olunan ümumi yuxu vaxtının çoxu, toxuma bərpası ilə əlaqəli \"yavaş dalğa\" dərin yuxu) və REM (sürətli göz hərəkəti) yuxusu, canlı yuxu görmə, oyaqlığa bənzər beyin fəaliyyəti və adətən yatan şəxsin yuxuları canlandırmasının qarşısını alan demək olar ki, tam skelet əzələ iflici ilə xarakterizə olunur."
      ),
      p(
        "Sleep is driven by two interacting processes: a homeostatic sleep drive that builds the longer you're awake (tied to accumulating adenosine, which is why caffeine promotes wakefulness), and the circadian rhythm, a roughly 24-hour internal clock run by the hypothalamus's suprachiasmatic nucleus and synchronized daily by light hitting the retina. REM-behavior disorder, where muscle atonia fails and people physically act out dreams, and narcolepsy, where REM-related atonia intrudes into wakefulness, both illustrate what goes wrong when this tightly regulated system breaks down.",
        "Yuxu iki qarşılıqlı təsirli proses tərəfindən idarə olunur: oyaq qaldıqca güclənən homeostatik yuxu tələbatı (toplanan adenozin ilə bağlıdır, buna görə kofein oyaqlığı təşviq edir) və təxminən 24 saatlıq daxili saat olan sirkadian ritm, hipotalamusun suprakiazmatik nüvəsi tərəfindən idarə olunur və tor qişaya düşən işıqla hər gün sinxronlaşdırılır. Əzələ atoniyasının uğursuz olduğu və insanların yuxuları fiziki olaraq canlandırdığı REM-davranış pozğunluğu və REM ilə bağlı atoniyanın oyaqlığa daxil olduğu narkolepsiya, bu sıx tənzimlənən sistem pozulduqda nəyin səhv getdiyini göstərir."
      ),
    ],
    video: { youtubeId: "rMHus-0wFSo", title: { en: "To Sleep, Perchance to Dream: Crash Course Psychology #9", az: "Yatmaq, Bəlkə də Yuxu Görmək: Crash Course Psixologiya #9 (ingiliscə)" } },
    videoAz: { youtubeId: "Br_ZZZSS8qM", title: { en: "Grade 9: Emotions and Sleep (Azerbaijani)", az: "IX sinif: Emosiyalar və yuxu" } },
  },
  {
    id: "attention-emotion",
    chapter: "6.2",
    part: PART_SENSE,
    chapterTitle: { en: "Sleep", az: "Yuxu" },
    title: { en: "Attention & emotion", az: "Diqqət və emosiya" },
    moduleId: "sleep-attention-emotion",
    body: [
      p(
        "Attention isn't a single spotlight but at least two dissociable systems: a top-down, goal-directed system that voluntarily directs focus toward a task-relevant target, and a bottom-up, stimulus-driven system that automatically pulls attention toward something salient regardless of current goals. The reticular activating system in the brainstem provides the underlying arousal both systems need; without it, no amount of salience or goal-direction produces focused attention.",
        "Diqqət tək bir projektor deyil, ən azı iki ayrılan sistemdir: könüllü olaraq diqqəti tapşırığa uyğun hədəfə yönəldən yuxarıdan-aşağı, məqsəd yönümlü sistem və cari məqsədlərdən asılı olmayaraq diqqəti diqqətçəkən bir şeyə avtomatik olaraq çəkən aşağıdan-yuxarı, stimul yönümlü sistem. Beyin sapındakı retikulyar aktivasiya sistemi hər iki sistemin ehtiyac duyduğu əsas oyanıqlığı təmin edir; o olmadan heç bir şey fokuslu diqqət yaratmır."
      ),
      p(
        "Emotion draws on the same limbic circuitry, especially the amygdala for rapid threat appraisal, but two influential models frame how it works. The James-Lange theory proposes physiological arousal comes first and the subjective feeling follows from perceiving it, while the Cannon-Bard theory proposes the feeling and the physiological response are triggered in parallel by the same thalamic signal. Most modern accounts treat emotion as the product of ongoing interaction between subcortical and cortical processing.",
        "Emosiya eyni limbik dövrəyə, xüsusən sürətli təhlükə qiymətləndirməsi üçün amiqdalaya əsaslanır, lakin iki təsirli model onun necə işlədiyini çərçivələyir. Ceyms-Lange nəzəriyyəsi fizioloji oyanıqlığın əvvəl gəldiyini və subyektiv hissin bu oyanıqlığı qavramaqdan yarandığını irəli sürür, Kennon-Bard nəzəriyyəsi isə hiss və fizioloji reaksiyanın eyni talamik siqnal tərəfindən paralel şəkildə yarandığını irəli sürür. Müasir baxışların əksəriyyəti emosiyanı subkortikal və kortikal emal arasında davam edən qarşılıqlı təsirin məhsulu kimi qəbul edir."
      ),
    ],
    see: { href: "limbic/index.html", en: "See the amygdala in 3D →", az: "Amiqdalanı 3D-də gör →" },
    video: { youtubeId: "s4JBqLoY3tY", title: { en: "Divided attention, selective attention, inattentional blindness, & change blindness | Khan Academy", az: "Bölünmüş diqqət, seçici diqqət, diqqətsizlik korluğu və dəyişiklik korluğu | Khan Academy (ingiliscə)" } },
  },

  {
    id: "stress",
    chapter: "7",
    part: PART_LIFESPAN,
    chapterTitle: { en: "Stress", az: "Stress" },
    title: { en: "Stress", az: "Stress" },
    moduleId: "stress",
    body: [
      p(
        "The body's central stress response runs through the hypothalamic-pituitary-adrenal (HPA) axis: a perceived threat triggers the hypothalamus to release corticotropin-releasing hormone, which prompts the pituitary to release ACTH, which prompts the adrenal cortex to release cortisol into the bloodstream. Cortisol mobilizes energy and sharpens short-term alertness, and under normal conditions eventually suppresses its own release by feeding back on the hypothalamus and pituitary.",
        "Bədənin əsas stress reaksiyası hipotalamus-hipofiz-adrenal (HPA) oxu vasitəsilə işləyir: qavranılan təhlükə hipotalamusu kortikotropin-buraxan hormonu buraxmağa vadar edir, bu isə hipofizi ACTH buraxmağa, bu da adrenal qabığı kortizolu qan dövranına buraxmağa vadar edir. Kortizol enerjini mobilizasiya edir və qısamüddətli diqqətliliyi artırır, normal şəraitdə isə nəhayət hipotalamus və hipofizə geri əlaqə göndərərək öz buraxılışını boğur."
      ),
      p(
        "A separate, faster pathway — the sympathetic-adrenal-medullary system — drives the more immediate \"fight or flight\" response: the sympathetic nervous system directly stimulates the adrenal medulla to release adrenaline within seconds, raising heart rate and blood pressure. Both systems are adaptive for short, acute stress, but chronic activation is associated with impaired hippocampal function and memory, a weakened immune response, and increased cardiovascular risk — a genuine physiological risk factor, not just a subjective discomfort.",
        "Ayrı, daha sürətli bir yol — simpatik-adrenal-medullyar sistem — daha ani \"döyüş və ya qaçış\" reaksiyasını işə salır: simpatik sinir sistemi birbaşa adrenal medullanı bir neçə saniyə ərzində adrenalin buraxmağa stimullaşdırır, ürək döyüntüsünü və qan təzyiqini artırır. Hər iki sistem qısa, kəskin stress üçün adaptivdir, lakin xroniki aktivasiya pozulmuş hippokamp funksiyası və yaddaş, zəifləmiş immun cavabı və artmış ürək-damar riski ilə əlaqələndirilir — sadəcə subyektiv narahatlıq deyil, real fizioloji risk faktoru."
      ),
    ],
    video: { youtubeId: "4KbSRXP0wik", title: { en: "Emotion, Stress, and Health: Crash Course Psychology #26", az: "Emosiya, Stress və Sağlamlıq: Crash Course Psixologiya #26 (ingiliscə)" } },
    videoAz: { youtubeId: "VXwvwkG8QD4", title: { en: "The Stress Hormone: Cortisol (Azerbaijani)", az: "Stress hormonu: Kortizol — bir çox xəstəliklərin səbəbkarı" } },
  },
  {
    id: "aging",
    chapter: "8",
    part: PART_LIFESPAN,
    chapterTitle: { en: "Aging", az: "Qocalma" },
    title: { en: "Aging", az: "Qocalma" },
    moduleId: "aging",
    body: [
      p(
        "Healthy brain aging involves gradual, measurable changes distinct from disease: overall brain volume declines modestly from around middle age onward, white matter tends to lose integrity faster than gray matter, and processing speed slows gradually — while crystallized knowledge typically holds steady into old age. Neurogenesis was long thought to stop entirely after early development, but is now known to continue at a reduced rate in at least the hippocampus throughout adult life.",
        "Sağlam beyin qocalması xəstəlikdən fərqli olan tədricən, ölçülə bilən dəyişikliklərdən ibarətdir: ümumi beyin həcmi orta yaşdan etibarən mülayim şəkildə azalır, ağ maddə boz maddədən daha sürətlə bütövlüyünü itirməyə meyllidir, emal sürəti tədricən yavaşlayır — halbuki kristallaşmış bilik adətən gocalıqda da sabit qalır. Neyrogenez uzun müddət erkən inkişafdan sonra tamamilə dayandığı düşünülürdü, lakin indi ən azı hippokampda yetkin həyat boyu azalmış sürətlə davam etdiyi bilinir."
      ),
      p(
        "The line between normal aging and disease matters clinically: mild cognitive impairment (MCI) — a decline greater than expected for age but not severe enough to interfere with daily independence — sits in between, and a meaningful fraction of people with MCI go on to develop dementia while others remain stable. This is one reason lifestyle factors associated with healthier aging — exercise, social engagement, cardiovascular health — get so much research attention: they appear to build \"cognitive reserve,\" a buffer against age- or disease-related change.",
        "Normal qocalma ilə xəstəlik arasındakı sərhəd klinik baxımdan vacibdir: yüngül koqnitiv pozğunluq (YKP) — yaş üçün gözlənilən azalmadan böyük, lakin gündəlik müstəqilliyə mane olacaq qədər ciddi olmayan azalma — ikisinin arasında yerləşir və YKP olan insanların əhəmiyyətli bir hissəsi demensiya inkişaf etdirir, digərləri isə sabit qalır. Buna görə daha sağlam qocalma ilə əlaqəli həyat tərzi amilləri — fiziki fəaliyyət, sosial iştirak, ürək-damar sağlamlığı — bu qədər tədqiqat diqqəti cəlb edir: bunlar yaşla və ya xəstəliklə bağlı dəyişikliyə qarşı \"koqnitiv ehtiyat\" yaratdığı görünür."
      ),
    ],
    video: { youtubeId: "fqe64NjELv8", title: { en: "Aging and cognitive abilities | Processing the Environment | MCAT | Khan Academy", az: "Qocalma və koqnitiv qabiliyyətlər | Ətraf Mühitin Emalı | MCAT | Khan Academy (ingiliscə)" } },
  },

  {
    id: "kinds-of-research",
    chapter: "9",
    part: PART_RESEARCH,
    chapterTitle: { en: "Kinds of Research", az: "Tədqiqat növləri" },
    title: { en: "Kinds of Research", az: "Tədqiqat növləri" },
    moduleId: "kinds-of-research",
    body: [
      p(
        "Neuroscience uses tools that trade spatial and temporal resolution against each other and against invasiveness. Functional MRI measures blood-oxygen-level changes as a proxy for neural activity, giving good spatial resolution (millimeters) but poor temporal resolution (seconds), since it tracks a slow metabolic response rather than electrical activity directly. EEG records electrical activity directly from scalp electrodes, giving excellent temporal resolution (milliseconds) but poor spatial resolution, since the signal is smeared by passing through the skull and scalp.",
        "Neyroelm məkan və zaman ayırdetmə qabiliyyətini bir-biri ilə və nə qədər invaziv olduqları ilə mübadilə edən müxtəlif alətlər istifadə edir. Funksional MRT sinir fəaliyyətinin proksisi kimi qan-oksigen səviyyəsi dəyişikliklərini ölçür, yaxşı məkan ayırdetməsi (millimetr) verir, lakin zəif zaman ayırdetməsi (saniyə) verir, çünki birbaşa elektrik fəaliyyətini deyil, yavaş metabolik cavabı izləyir. EEG elektrik fəaliyyətini birbaşa baş dərisindəki elektrodlardan qeyd edir, əla zaman ayırdetməsi (millisaniyə) verir, lakin zəif məkan ayırdetməsi verir, çünki siqnal kəllə və baş dərisindən keçərkən yayılır."
      ),
      p(
        "More invasive methods trade risk for precision: single-unit recording captures the activity of individual neurons directly, mostly in animal research or in human patients already undergoing surgery. Lesion studies — observing what function is lost when a specific region is damaged — remain one of the oldest and most direct ways to establish that a region is necessary for a function, distinct from merely being active during it, which is what imaging alone can show. Good research design typically combines several of these methods.",
        "Daha invaziv metodlar riski dəqiqliklə mübadilə edir: tək vahid qeydiyyatı fərdi neyronların fəaliyyətini birbaşa tutur, əsasən heyvan tədqiqatlarında və ya artıq cərrahiyyə keçirən insan pasiyentlərində. Zədə tədqiqatları — müəyyən bir beyin nahiyəsi zədələndikdə hansı funksiyanın itirildiyini müşahidə etmək — bir nahiyənin funksiya üçün zəruri olduğunu, sadəcə onun zamanı aktiv olmasından fərqli olaraq, müəyyən etmək üçün ən qədim və ən birbaşa yollardan biri olaraq qalır, ki bunu təkcə görüntüləmə göstərə bilmir. Yaxşı tədqiqat dizaynı adətən bu metodların bir neçəsini birləşdirir."
      ),
    ],
    video: { youtubeId: "hFV71QPvX2I", title: { en: "Psychological Research: Crash Course Psychology #2", az: "Psixoloji Tədqiqat: Crash Course Psixologiya #2 (ingiliscə)" } },
  },

  {
    id: "childhood-disorders",
    chapter: "10",
    part: PART_DISORDERS,
    chapterTitle: { en: "Childhood disorders", az: "Uşaqlıq pozğunluqları" },
    title: { en: "Childhood disorders", az: "Uşaqlıq pozğunluqları" },
    moduleId: "diagnosis",
    body: [
      p(
        "Neurodevelopmental disorders emerge during the developmental period and reflect atypical brain development rather than degeneration of a previously normal brain. Autism spectrum disorder involves differences in social communication and restricted or repetitive behaviors, with wide variation in severity; it has strong genetic underpinnings but no single cause, and neuroimaging shows differences in connectivity between regions rather than damage to any one structure. ADHD involves persistent inattention and/or hyperactivity-impulsivity, associated with altered development of frontostriatal circuits — the same prefrontal cortex/basal ganglia loops involved in impulse control.",
        "Sinir inkişafı pozğunluqları inkişaf dövründə meydana çıxır və əvvəllər normal olan beynin degenerasiyasından deyil, atipik beyin inkişafından qaynaqlanır. Autizm spektri pozğunluğu sosial ünsiyyətdə fərqliliyi və məhdud və ya təkrarlanan davranışları əhatə edir, ciddiyyətdə geniş dəyişkənliklə; güclü genetik əsasları var, lakin tək bir səbəbi yoxdur, neyrogörüntüləmə hər hansı bir strukturun zədəsindən çox nahiyələr arasındakı əlaqədə fərqlər göstərir. DEHP davamlı diqqətsizlik və/və ya hiperaktivlik-impulsivliyi əhatə edir, impuls nəzarətində iştirak edən eyni prefrontal qabıq/bazal qanqliya dövrələrinin dəyişmiş inkişafı ilə əlaqələndirilir."
      ),
      p(
        "Epilepsy in childhood deserves particular attention because several forms are age-specific — some childhood epilepsy syndromes are typically outgrown by adolescence, reflecting how a still-maturing brain's circuits differ from an adult's. Cerebral palsy, by contrast, results from a non-progressive injury to the developing brain, producing lasting motor impairment — but because it's non-progressive, it's fundamentally different from a degenerative disorder, and this distinction (developmental vs. degenerative) is one of the most useful framing tools across this whole chapter.",
        "Uşaqlıqda epilepsiya xüsusi diqqətə layiqdir, çünki bir neçə forma yaşa xasdır — bəzi uşaqlıq epilepsiya sindromları adətən yeniyetməlik dövrünə qədər özbaşına keçir, bu hələ də formalaşmaqda olan beynin dövrələrinin yetkin beynindən necə fərqləndiyini əks etdirir. Serebral iflic isə inkişaf edən beynin proqressiv olmayan zədəsindən qaynaqlanır, davamlı motor pozğunluğu yaradır — lakin proqressiv olmadığı üçün degenerativ pozğunluqdan əsaslı şəkildə fərqlidir, bu fərq (inkişaf ilə bağlı və degenerativ) bu fəslin ən faydalı çərçivələmə vasitələrindən biridir."
      ),
    ],
    video: { youtubeId: "tEBsTX2OVgI", title: { en: "2-Minute Neuroscience: Autism", az: "2 Dəqiqəlik Neurobilim: Autizm (ingiliscə)" } },
    videoAz: { youtubeId: "IZZns6TsBgw", title: { en: "Autism Spectrum Disorder in Children (Azerbaijani)", az: "Uşaqlarda autizm spektr pozuntusu: Səbəblər və simptomlar" } },
  },
  {
    id: "addiction",
    chapter: "11",
    part: PART_DISORDERS,
    chapterTitle: { en: "Addiction", az: "Asılılıq" },
    title: { en: "Addiction", az: "Asılılıq" },
    moduleId: "addiction",
    body: [
      p(
        "Addiction centers on the brain's mesolimbic dopamine system — a pathway from the ventral tegmental area to the nucleus accumbens — which normally reinforces survival-relevant behaviors by releasing dopamine in response to reward. Addictive substances hijack this system, often producing dopamine release far larger than any natural reward, which drives the brain to strongly reinforce drug-seeking behavior over competing, healthier goals. With repeated use, the system down-regulates its own sensitivity — tolerance requiring more of the substance for the same effect.",
        "Asılılıq beynin mezolimbik dofamin sisteminə — ventral tegmental sahədən nukleus akkumbensə gedən yola — əsaslanır, bu yol normalda mükafata cavab olaraq dofamin buraxaraq yaşamaqla bağlı davranışları gücləndirir. Asılılıq yaradan maddələr bu sistemi ələ keçirir, çox vaxt istənilən təbii mükafatdan qat-qat böyük dofamin buraxılışı yaradır, bu isə beyni rəqib, daha sağlam məqsədlərdən üstün olaraq maddə axtarma davranışını güclü şəkildə gücləndirməyə vadar edir. Təkrarlanan istifadə ilə sistem öz həssaslığını aşağı tənzimləyir — eyni təsir üçün daha çox maddə tələb edən tolerantlıq."
      ),
      p(
        "Addiction also progressively recruits and impairs the prefrontal cortex, the region responsible for impulse control — a major reason addiction is now understood as a chronic disease involving altered brain circuitry, not simply a failure of willpower. Withdrawal and craving involve a separate but related process: the amygdala-centered stress system becomes sensitized, so stress and drug-associated cues alike trigger intense craving — part of why relapse rates remain high and why long-term treatment addresses stress and environmental triggers, not only the substance itself.",
        "Asılılıq həmçinin tədricən impuls nəzarətindən məsul olan prefrontal qabığı cəlb edir və pozur — bu, asılılığın indi sadəcə iradə zəifliyi deyil, dəyişmiş beyin dövrəsini əhatə edən xroniki xəstəlik kimi başa düşülməsinin əsas səbəblərindən biridir. Tərgitmə sindromu və güclü istək ayrı, lakin əlaqəli bir prosesi əhatə edir: amiqdala mərkəzli stress sistemi həssaslaşır, beləliklə stress və maddə ilə əlaqəli işarələr eyni dərəcədə intensiv istək yaradır — bu da residiv nisbətlərinin yüksək qalmasının və uzunmüddətli müalicənin yalnız maddənin özünü deyil, stress və ətraf mühit amillərini də əhatə etməsinin səbəbidir."
      ),
    ],
    video: { youtubeId: "343ORgL3kIc", title: { en: "Trauma and Addiction: Crash Course Psychology #31", az: "Travma və Asılılıq: Crash Course Psixologiya #31 (ingiliscə)" } },
  },
  {
    id: "degenerative-disorders",
    chapter: "12",
    part: PART_DISORDERS,
    chapterTitle: { en: "Degenerative disorders", az: "Degenerativ xəstəliklər" },
    title: { en: "Degenerative disorders", az: "Degenerativ xəstəliklər" },
    moduleId: "diagnosis",
    body: [
      p(
        "Neurodegenerative diseases involve progressive loss of neurons, typically tied to the accumulation of misfolded proteins. Alzheimer's disease, the most common cause of dementia, is characterized by amyloid-beta plaques and tau tangles, with neuron loss beginning in the hippocampus — why short-term memory loss is usually the earliest symptom — before spreading through the cortex. Parkinson's disease involves loss of dopamine-producing neurons in the substantia nigra, alongside Lewy body accumulation, producing its hallmark movement symptoms.",
        "Neyrodegenerativ xəstəliklər neyronların tədricən itirilməsini əhatə edir, adətən yanlış qatlanmış zülalların toplanması ilə bağlıdır. Demensiyanın ən çox yayılmış səbəbi olan Altsheymer xəstəliyi amiloid-beta lövhələri və tau düyünləri ilə xarakterizə olunur, neyron itkisi hippokampda başlayır — buna görə qısamüddətli yaddaş itkisi adətən ilk simptomdur — sonra qabıq boyunca yayılır. Parkinson xəstəliyi qara maddədə dofamin istehsal edən neyronların itirilməsini, həmçinin Lewy cisimciklərinin toplanmasını əhatə edir, xarakterik hərəkət simptomlarını yaradır."
      ),
      p(
        "Amyotrophic lateral sclerosis (ALS) selectively degenerates both upper and lower motor neurons, sparing sensory and usually cognitive function, producing progressive muscle weakness and eventually respiratory failure. Huntington's disease is a single-gene, autosomal dominant disorder causing degeneration concentrated in the striatum, producing a combination of movement (chorea), cognitive, and psychiatric symptoms. Across all of these, current treatments largely manage symptoms rather than stop the underlying neurodegeneration.",
        "Amiotrofik lateral skleroz (ALS) seçici olaraq həm yuxarı, həm də aşağı motor neyronları degenerasiya edir, sensor və adətən koqnitiv funksiyanı toxunulmaz saxlayır, proqressiv əzələ zəifliyi, nəhayət tənəffüs çatışmazlığı yaradır. Hantinqton xəstəliyi tək genli, autosomal dominant pozğunluqdur, striatumda cəmlənmiş degenerasiyaya səbəb olur və hərəkət (xoreya), koqnitiv və psixiatrik simptomların kombinasiyasını yaradır. Bunların hamısında cari müalicələr əsasən altında yatan neyrodegenerasiyanı dayandırmaq əvəzinə simptomları idarə edir."
      ),
    ],
    see: { href: "basal-ganglia/index.html", en: "See the basal ganglia in 3D →", az: "Bazal qanqliyaları 3D-də gör →" },
    video: { youtubeId: "I6K10aif0tE", title: { en: "2-Minute Neuroscience: Alzheimer's Disease", az: "2 Dəqiqəlik Neurobilim: Altsheymer Xəstəliyi (ingiliscə)" } },
    videoAz: { youtubeId: "BH_81ODJjKM", title: { en: "Early Symptoms of Parkinson's Disease (Azerbaijani)", az: "Parkinson xəstəliyinin ilkin əlamətləri nədir?" } },
  },
  {
    id: "psychiatric-disorders",
    chapter: "13",
    part: PART_DISORDERS,
    chapterTitle: { en: "Psychiatric disorders", az: "Psixiatrik pozğunluqlar" },
    title: { en: "Psychiatric disorders", az: "Psixiatrik pozğunluqlar" },
    moduleId: "diagnosis",
    body: [
      p(
        "Psychiatric disorders are diagnosed by symptom patterns rather than a definitive biomarker test, but neuroscience has identified consistent biological correlates. Major depressive disorder is associated with altered activity in the prefrontal cortex and limbic structures and with monoamine neurotransmitter systems — the basis for SSRI medications, though the simple \"chemical imbalance\" framing is now considered an oversimplification. Schizophrenia involves altered dopamine signaling alongside structural differences including modestly enlarged ventricles and reduced gray matter volume.",
        "Psixiatrik pozğunluqlar dəqiq biomarker testi ilə deyil, simptom nümunələri ilə diaqnoz qoyulur, lakin neyroelm ardıcıl bioloji korrelyasiyalar müəyyən edib. Böyük depressiv pozğunluq prefrontal qabıq və limbik strukturlarda dəyişmiş fəaliyyət və monoamin neyrotransmitter sistemləri ilə əlaqələndirilir — SSRİ dərmanlarının əsası, baxmayaraq ki, sadə \"kimyəvi disbalans\" çərçivəsi indi həddindən artıq sadələşdirmə hesab olunur. Şizofreniya dəyişmiş dofamin siqnalını, həmçinin mülayim şəkildə böyümüş mədəciklər və azalmış boz maddə həcmini əhatə edən struktur fərqlərini əhatə edir."
      ),
      p(
        "Anxiety disorders center heavily on amygdala hyperreactivity and impaired top-down regulation by the prefrontal cortex, consistent with the broader theme of the prefrontal cortex acting as a brake on faster, automatic subcortical responses. Bipolar disorder involves cycling between mood states and shows a strong genetic component alongside environmental triggers — reinforcing a broader principle: most major psychiatric disorders arise from an interaction between genetic vulnerability and environmental factors, not either alone.",
        "Narahatlıq pozğunluqları əsasən amiqdala hiperreaktivliyinə və prefrontal qabığın bu reaktivliyi yuxarıdan-aşağı tənzimləməsinin pozulmasına əsaslanır, prefrontal qabığın daha sürətli, avtomatik subkortikal reaksiyalara əyləc kimi fəaliyyət göstərməsinin daha geniş mövzusu ilə uyğundur. Bipolyar pozğunluq əhval-ruhiyyə vəziyyətləri arasında dövr etməyi əhatə edir və ətraf mühit amilləri ilə yanaşı güclü genetik komponent göstərir — daha geniş bir prinsipi gücləndirir: əksər əsas psixiatrik pozğunluqlar tək başına deyil, genetik həssaslıq və ətraf mühit amilləri arasındakı qarşılıqlı təsirdən yaranır."
      ),
    ],
    see: { href: "limbic/index.html", en: "See the limbic system in 3D →", az: "Limbik sistemi 3D-də gör →" },
    video: { youtubeId: "ZwMlHkWKDwM", title: { en: "Depressive and Bipolar Disorders: Crash Course Psychology #30", az: "Depressiv və Bipolyar Pozğunluqlar: Crash Course Psixologiya #30 (ingiliscə)" } },
    videoAz: { youtubeId: "WZ09TUEyf5I", title: { en: "What Is Schizophrenia? Symptoms, Causes, Treatment (Azerbaijani)", az: "Şizofreniya nədir? Əlamətləri, səbəbləri və müalicəsi" } },
  },
  {
    id: "injury-illness",
    chapter: "14",
    part: PART_DISORDERS,
    chapterTitle: { en: "Injury & illness", az: "Zədə və xəstəlik" },
    title: { en: "Injury & illness", az: "Zədə və xəstəlik" },
    moduleId: "diagnosis",
    body: [
      p(
        "Stroke comes in two fundamentally different forms requiring opposite emergency treatment: ischemic stroke (about 85% of cases), caused by a blocked vessel starving brain tissue of oxygen, and hemorrhagic stroke, caused by a ruptured vessel bleeding into brain tissue. Because clot-dissolving treatment for an ischemic stroke would worsen a hemorrhagic one, fast brain imaging to distinguish the two is the critical first step in emergency stroke care.",
        "İnsult əks təcili müalicə tələb edən iki əsaslı fərqli formada olur: işemik insult (halların təxminən 85%-i), tıxanmış qan damarının beyin toxumasını oksigendən məhrum etməsindən qaynaqlanır, və hemorragik insult, cırılmış qan damarının beyin toxumasına qan axıtmasından qaynaqlanır. İşemik insult üçün laxta əridən müalicə hemorragik insultu pisləşdirəcəyi üçün, ikisini ayırd etmək üçün sürətli beyin görüntüləməsi təcili insult qulluğunda kritik ilk addımdır."
      ),
      p(
        "Traumatic brain injury ranges from mild (concussion, usually without visible structural damage) to severe (with visible damage, prolonged unconsciousness, and lasting deficits), and beyond the direct impact, a second wave of damage — swelling, inflammation, disrupted blood flow — can continue for days afterward. Meningitis (infection of the meninges) and encephalitis (infection of brain tissue itself) both illustrate how infection can produce neurological symptoms, with location and nature of the infection driving why severity differs so much between the two.",
        "Travmatik beyin zədəsi yüngüldən (kontuziya, adətən görünən struktur zədə olmadan) ağıra (görünən struktur zədə, uzunmüddətli şüursuzluq və davamlı çatışmazlıqlarla) qədər dəyişir, birbaşa zərbə zədəsindən əlavə, şişkinlik, iltihab və pozulmuş qan axını olan ikinci dalğa zədə sonrakı günlərə qədər davam edə bilər. Meningit (meningeslərin infeksiyası) və ensefalit (beyin toxumasının özünün infeksiyası) hər ikisi infeksiyanın necə nevroloji simptomlar yarada biləcəyini göstərir, infeksiyanın yeri və təbiəti ciddiliyin ikisi arasında bu qədər fərqlənməsinin səbəbidir."
      ),
    ],
    see: { href: "brainstem/index.html", en: "See the brainstem in 3D →", az: "Beyin sapını 3D-də gör →" },
    video: { youtubeId: "2IgFri0B85Q", title: { en: "Ischemic Stroke - causes, symptoms, diagnosis, treatment, pathology", az: "İşemik İnsult — səbəbləri, əlamətləri, diaqnozu, müalicəsi, patologiyası (ingiliscə)" } },
    videoAz: { youtubeId: "lR1KoWtzgUM", title: { en: "Disorders of Brain Blood Circulation (Azerbaijani)", az: "Beyin qan dövranı pozğunluqları" } },
  },

  {
    id: "potential-therapies",
    chapter: "15",
    part: PART_TREATING,
    chapterTitle: { en: "Potential Therapies", az: "Potensial müalicələr" },
    title: { en: "Potential Therapies", az: "Potensial müalicələr" },
    moduleId: "potential-therapies",
    body: [
      p(
        "Deep brain stimulation (DBS) — implanting electrodes that deliver continuous electrical stimulation to a specific target, most established for advanced Parkinson's disease — can dramatically reduce tremor and rigidity by disrupting the abnormal, overly synchronized neural activity these circuits produce in disease, and is now explored for conditions including severe depression. Gene therapy aims to correct or compensate for a disease-causing mutation directly, and has reached approved clinical use for a small number of rare inherited neurological conditions, though delivering treatment safely to the nervous system remains a major hurdle.",
        "Dərin beyin stimulyasiyası (DBS) — müəyyən bir hədəfə davamlı elektrik stimulyasiyası verən elektrodların implantasiyası, ən çox inkişaf etmiş Parkinson xəstəliyində qurulmuşdur — bu dövrələrin xəstəlikdə yaratdığı anormal, həddindən artıq sinxronlaşmış sinir fəaliyyətini pozaraq tremoru və sərtliyi əhəmiyyətli dərəcədə azalda bilər və indi ağır depressiya daxil olmaqla digər vəziyyətlər üçün araşdırılır. Gen terapiyası xəstəliyə səbəb olan mutasiyanı birbaşa düzəltmək və ya kompensasiya etməyi hədəfləyir və kiçik sayda nadir irsi nevroloji vəziyyət üçün təsdiqlənmiş klinik istifadəyə çatıb, baxmayaraq ki, müalicəni təhlükəsiz şəkildə sinir sisteminə çatdırmaq əsas maneə olaraq qalır."
      ),
      p(
        "Neuroprosthetics and brain-computer interfaces read neural activity and translate it into control signals for an external device — allowing, in research settings, paralyzed patients to control a robotic arm by thought alone. Stem cell approaches aim to replace neurons lost to injury or degeneration, but face a harder problem than most other stem cell applications: a transplanted neuron has to not just survive, but correctly integrate into existing circuitry — why this remains a promising but still largely experimental approach.",
        "Neyroprotezlər və beyin-kompüter interfeysləri sinir fəaliyyətini oxuyur və onu xarici cihaz üçün idarəetmə siqnallarına çevirir — tədqiqat şəraitində iflic olmuş pasiyentlərə yalnız düşüncə ilə robot qolu idarə etməyə imkan verir. Kök hüceyrə yanaşmaları zədə və ya degenerasiya nəticəsində itirilən neyronları əvəz etməyi hədəfləyir, lakin digər kök hüceyrə tətbiqlərindən daha çətin bir problemlə üzləşir: transplantasiya olunmuş neyron təkcə sağ qalmalı deyil, mövcud dövrəyə düzgün inteqrasiya olmalıdır — buna görə bu, hələ də əsasən eksperimental, lakin ümidverici yanaşma olaraq qalır."
      ),
    ],
    video: { youtubeId: "tgKIbdTWq7o", title: { en: "2-Minute Neuroscience: Deep Brain Stimulation", az: "2 Dəqiqəlik Neurobilim: Dərin Beyin Stimulyasiyası (ingiliscə)" } },
  },
  {
    id: "neuroethics",
    chapter: "16",
    part: PART_TREATING,
    chapterTitle: { en: "Neuroethics", az: "Neyroetika" },
    title: { en: "Neuroethics", az: "Neyroetika" },
    moduleId: "neuroethics",
    body: [
      p(
        "Neuroethics examines the ethical questions raised by neuroscience research and its applications. Neuroimaging raises questions of cognitive liberty and privacy: as brain-reading technology improves, who should access information about a person's thoughts or mental states, including contested uses like fMRI-based lie detection, which is not currently reliable as courtroom evidence but is nonetheless marketed commercially. Cognitive enhancement in healthy people raises fairness questions alongside safety and consent questions, especially for children.",
        "Neyroetika neyroelm tədqiqatının və onun tətbiqlərinin qaldırdığı etik sualları araşdırır. Neyrogörüntüləmə koqnitiv azadlıq və məxfilik sualları qaldırır: beyin oxuma texnologiyası təkmilləşdikcə, kimin bir insanın düşüncələri və ya zehni vəziyyətləri haqqında məlumata çatması lazımdır, buraya fMRT əsaslı yalan aşkarlama kimi mübahisəli istifadələr də daxildir, bu hazırda məhkəmə sübutu kimi etibarlı deyil, lakin buna baxmayaraq kommersiya olaraq satılır. Sağlam insanlarda koqnitiv gücləndirmə bərabərlik sualları, xüsusən uşaqlarda təhlükəsizlik və razılıq sualları qaldırır."
      ),
      p(
        "Neuroscience findings increasingly intersect with the legal system, particularly around criminal responsibility: to what extent should evidence of atypical brain structure affect judgments of culpability, a question courts have handled inconsistently. And as brain-computer interfaces advance, questions of neural data privacy and mental integrity — protecting a person's inner mental life from unauthorized access — are increasingly treated as needing their own dedicated ethical and legal framework, distinct from existing medical privacy law.",
        "Neyroelm tapıntıları getdikcə hüquq sistemi ilə, xüsusən cinayət məsuliyyəti ətrafında kəsişir: atipik beyin strukturunun sübutu günahkarlıq mühakimələrinə nə dərəcədə təsir etməlidir, məhkəmələrin uyğunsuz şəkildə həll etdiyi bir sual. Beyin-kompüter interfeysləri inkişaf etdikcə, sinir məlumatı məxfiliyi və zehni bütövlük sualları — insanın daxili zehni həyatını icazəsiz çatımdan qorumaq — getdikcə mövcud tibbi məxfilik qanunundan fərqli, öz xüsusi etik və hüquqi çərçivəsinə ehtiyac duyulduğu kimi qəbul edilir."
      ),
    ],
    video: { youtubeId: "AHV_BxlNzmM", title: { en: "When technology can read minds, how will we protect our privacy? | Nita Farahany", az: "Texnologiya düşüncələri oxuya bildikdə, məxfiliyimizi necə qoruyacağıq? | Nita Farahany (ingiliscə)" } },
  },
];
