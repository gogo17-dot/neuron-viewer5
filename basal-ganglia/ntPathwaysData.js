// Neurotransmitter pathway overlay — content.
//
// Anchors are named points that ntOverlay.js places relative to the loaded
// meshes (so they follow the model if centring changes). `mesh` anchors light
// a real GLB; `virtual` anchors are nuclei or targets that are NOT modelled in
// 3D and are drawn as a marker at an approximate position.
//
// description: first paragraph = overview, everything after \n\n = clinical
// detail (same convention as basalGangliaStructures.js / popup.js).

export const NT_SYSTEMS = [
  {
    id: 'dopamine',
    label: { en: 'Dopamine', az: 'Dopamin' },
    color: { dark: 0xffb547, light: 0xc26a00 },
  },
  {
    id: 'serotonin',
    label: { en: 'Serotonin', az: 'Serotonin' },
    color: { dark: 0xd08cff, light: 0x8a2be2 },
  },
  {
    id: 'norepinephrine',
    label: { en: 'Norepinephrine', az: 'Noradrenalin' },
    color: { dark: 0x4cc9f0, light: 0x0077b6 },
  },
  {
    id: 'acetylcholine',
    label: { en: 'Acetylcholine', az: 'Asetilxolin' },
    color: { dark: 0x9ef01a, light: 0x2b9348 },
  },
];

/** Label text for every anchor that can appear on screen. */
export const NT_ANCHOR_LABELS = {
  SN: { en: 'Substantia nigra (pars compacta)', az: 'Qara maddə (kompakt hissə)' },
  VTA: { en: 'Ventral tegmental area', az: 'Ventral tegmental sahə' },
  ARC: { en: 'Arcuate nucleus (hypothalamus)', az: 'Qövsvari nüvə (hipotalamus)' },
  RAPHE: { en: 'Raphe nuclei', az: 'Rafe nüvələri' },
  LC: { en: 'Locus coeruleus', az: 'Mavi ləkə (locus coeruleus)' },
  NBM: { en: 'Nucleus basalis of Meynert', az: 'Meynertin bazal nüvəsi' },
  SEPTUM: { en: 'Medial septal nucleus', az: 'Medial septal nüvə' },
  CAUDATE: { en: 'Caudate', az: 'Kaudat nüvə' },
  PUTAMEN: { en: 'Putamen', az: 'Putamen' },
  NAC: { en: 'Nucleus accumbens', az: 'Akkumbens nüvəsi' },
  AMYG: { en: 'Amygdala', az: 'Amiqdala' },
  PFC: { en: 'Prefrontal cortex', az: 'Prefrontal qabıq' },
  PIT: { en: 'Anterior pituitary', az: 'Ön hipofiz' },
  CORTEX: { en: 'Cerebral cortex', az: 'Beyin qabığı' },
  HIPPO: { en: 'Hippocampus', az: 'Hipokamp' },
  THAL: { en: 'Thalamus', az: 'Talamus' },
  HYPO: { en: 'Hypothalamus', az: 'Hipotalamus' },
  CEREB: { en: 'Cerebellum', az: 'Beyincik' },
  SPINAL: { en: 'Spinal cord', az: 'Onurğa beyni' },
};

/**
 * sources / targets are anchor ids. `lit` = real meshes to light.
 * Arrow is drawn from every source to every target, bilateral anchors
 * pair left-to-left / right-to-right.
 */
export const NT_PATHWAYS = [
  {
    id: 'nigrostriatal',
    system: 'dopamine',
    name: { en: 'Nigrostriatal', az: 'Nigrostriar' },
    sources: ['SN'],
    targets: ['CAUDATE', 'PUTAMEN'],
    lit: ['Substantia_nigra', 'Caudate_nucleus', 'Putamen'],
    title: 'NIGROSTRIATAL PATHWAY',
    titleAz: 'Nigrostriar yol',
    description:
      'Substantia nigra pars compacta → dorsal striatum (caudate and putamen). The largest dopamine pathway in the brain. Dopamine acting on D1 receptors excites the direct pathway and on D2 receptors inhibits the indirect pathway; both effects make it easier to start and keep up voluntary movement.\n\nParkinson disease: pars compacta neurons die, and motor signs (bradykinesia, rigidity, resting tremor) appear once most striatal dopamine is lost. Levodopa replaces it. Antipsychotics that block D2 receptors here cause extrapyramidal side effects: acute dystonia, akathisia, drug-induced parkinsonism and, with long use, tardive dyskinesia.',
    descriptionAz:
      'Qara maddənin kompakt hissəsi → dorsal striatum (kaudat nüvə və putamen). Beyində ən böyük dopamin yoludur. Dopamin D1 reseptorları vasitəsilə düz yolu oyadır, D2 reseptorları vasitəsilə dolayı yolu tormozlayır; hər iki təsir iradi hərəkətə başlamağı və onu davam etdirməyi asanlaşdırır.\n\nParkinson xəstəliyi: kompakt hissənin neyronları ölür, striatumdakı dopaminin çox hissəsi itəndə motor əlamətlər (bradikineziya, rigidlik, sakitlik tremoru) üzə çıxır. Levodopa onu əvəz edir. Burada D2 reseptorlarını bloklayan antipsixotiklər ekstrapiramid yan təsirlər törədir: kəskin distoniya, akatiziya, dərmanla yaranan parkinsonizm və uzunmüddətli istifadədə tardiv diskineziya.',
  },
  {
    id: 'mesolimbic',
    system: 'dopamine',
    name: { en: 'Mesolimbic', az: 'Mezolimbik' },
    sources: ['VTA'],
    targets: ['NAC', 'AMYG', 'HIPPO'],
    lit: [],
    title: 'MESOLIMBIC PATHWAY',
    titleAz: 'Mezolimbik yol',
    description:
      'Ventral tegmental area → nucleus accumbens (ventral striatum), with branches to the amygdala and hippocampus. The core of the reward system: it signals reward prediction and drives motivation and reinforcement learning.\n\nOveractivity here is linked to the positive symptoms of schizophrenia (hallucinations, delusions); D2 blockade by antipsychotics reduces them. Nearly all addictive drugs (cocaine, amphetamine, nicotine, opioids, alcohol) raise dopamine in the nucleus accumbens directly or indirectly.',
    descriptionAz:
      'Ventral tegmental sahə → akkumbens nüvəsi (ventral striatum), amiqdala və hipokampa da şaxələr verir. Mükafat sisteminin özəyidir: mükafat gözləntisini bildirir, motivasiyanı və möhkəmləndirici öyrənməni idarə edir.\n\nBu yolun həddindən artıq aktivliyi şizofreniyanın pozitiv simptomları (hallüsinasiyalar, sayıqlamalar) ilə əlaqələndirilir; antipsixotiklərin D2 blokadası onları azaldır. Demək olar ki, bütün asılılıq yaradan maddələr (kokain, amfetamin, nikotin, opioidlər, alkoqol) akkumbens nüvəsində dopamini birbaşa və ya dolayı yolla artırır.',
  },
  {
    id: 'mesocortical',
    system: 'dopamine',
    name: { en: 'Mesocortical', az: 'Mezokortikal' },
    sources: ['VTA'],
    targets: ['PFC'],
    lit: [],
    title: 'MESOCORTICAL PATHWAY',
    titleAz: 'Mezokortikal yol',
    description:
      'Ventral tegmental area → prefrontal cortex. Supports working memory, planning, attention and the emotional side of decision-making.\n\nUnderactivity here is linked to the negative symptoms (flat affect, low motivation, social withdrawal) and cognitive symptoms of schizophrenia, which D2 blockers do not improve and can worsen. Prefrontal dopamine is also a target of ADHD stimulants such as methylphenidate.',
    descriptionAz:
      'Ventral tegmental sahə → prefrontal qabıq. İşçi yaddaşı, planlaşdırmanı, diqqəti və qərar qəbulunun emosional tərəfini dəstəkləyir.\n\nBu yolun zəif aktivliyi şizofreniyanın neqativ simptomları (emosional kütlük, motivasiya azlığı, sosial təcrid) və kognitiv simptomları ilə əlaqələndirilir; D2 blokatorları bunları yaxşılaşdırmır, hətta pisləşdirə bilər. Prefrontal dopamin həm də metilfenidat kimi DEHS (ADHD) stimulyatorlarının hədəfidir.',
  },
  {
    id: 'tuberoinfundibular',
    system: 'dopamine',
    name: { en: 'Tuberoinfundibular', az: 'Tuberoinfundibulyar' },
    sources: ['ARC'],
    targets: ['PIT'],
    lit: [],
    title: 'TUBEROINFUNDIBULAR PATHWAY',
    titleAz: 'Tuberoinfundibulyar yol',
    description:
      'Arcuate nucleus of the hypothalamus → median eminence → anterior pituitary (via the portal blood). Here dopamine works as a hormone: it constantly inhibits prolactin release from lactotroph cells.\n\nDrugs that block D2 receptors (many antipsychotics, metoclopramide) remove this brake and cause hyperprolactinaemia: galactorrhoea, amenorrhoea, gynaecomastia and sexual dysfunction. A pituitary stalk lesion does the same. Dopamine agonists (cabergoline, bromocriptine) are the first-line treatment for prolactinoma.',
    descriptionAz:
      'Hipotalamusun qövsvari nüvəsi → median eminensiya → ön hipofiz (portal qan vasitəsilə). Burada dopamin hormon kimi işləyir: laktotrof hüceyrələrdən prolaktinin ifrazını daim tormozlayır.\n\nD2 reseptorlarını bloklayan dərmanlar (bir çox antipsixotiklər, metoklopramid) bu tormozu aradan qaldırır və hiperprolaktinemiya törədir: qalaktoreya, amenoreya, ginekomastiya və cinsi disfunksiya. Hipofiz ayaqcığının zədələnməsi də eyni nəticəni verir. Dopamin aqonistləri (kabergolin, bromokriptin) prolaktinomanın birinci sıra müalicəsidir.',
  },
  {
    id: 'raphe',
    system: 'serotonin',
    name: { en: 'Raphe projections', az: 'Rafe proyeksiyaları' },
    sources: ['RAPHE'],
    targets: ['CORTEX', 'HIPPO', 'PUTAMEN', 'THAL', 'HYPO', 'CEREB', 'SPINAL'],
    lit: [],
    title: 'SEROTONIN (RAPHE) SYSTEM',
    titleAz: 'Serotonin (rafe) sistemi',
    description:
      'Raphe nuclei along the midline of the brainstem → almost the whole CNS. The rostral group (dorsal and median raphe, in the midbrain and upper pons) projects up to the cortex, hippocampus, basal ganglia, thalamus and hypothalamus. The caudal group (raphe magnus, pallidus, obscurus) projects down to the cerebellum and spinal cord. Serotonin tunes mood, the sleep–wake cycle, appetite and pain; the descending fibres help suppress pain signals in the dorsal horn.\n\nSSRIs (fluoxetine, sertraline) block the serotonin transporter and are first-line drugs for depression and anxiety disorders. Too much serotonin activity, often from combining serotonergic drugs, causes serotonin syndrome: agitation, hyperthermia, clonus and hyperreflexia. Classic psychedelics such as LSD act mainly as 5-HT2A agonists.',
    descriptionAz:
      'Beyin gövdəsinin orta xətti boyunca yerləşən rafe nüvələri → demək olar ki, bütün MSS. Rostral qrup (orta beyində və körpünün yuxarı hissəsində dorsal və median rafe) yuxarıya — qabığa, hipokampa, bazal qanqliyalara, talamusa və hipotalamusa proyeksiya verir. Kaudal qrup (böyük, solğun və qaranlıq rafe nüvələri) aşağıya — beyinciyə və onurğa beyninə gedir. Serotonin əhval-ruhiyyəni, yuxu–oyaqlıq dövrünü, iştahı və ağrını tənzimləyir; enən liflər arxa buynuzda ağrı siqnallarını boğmağa kömək edir.\n\nSSRİ-lər (fluoksetin, sertralin) serotonin daşıyıcısını bloklayır və depressiya və narahatlıq pozuntularında birinci sıra dərmanlardır. Serotonin aktivliyinin həddindən artıq olması, çox vaxt serotonergik dərmanların birlikdə qəbulundan, serotonin sindromu yaradır: həyəcan, hipertermiya, klonus və hiperrefleksiya. LSD kimi klassik psixodeliklər əsasən 5-HT2A aqonistləri kimi təsir edir.',
  },
  {
    id: 'coeruleus',
    system: 'norepinephrine',
    name: { en: 'Locus coeruleus projections', az: 'Mavi ləkə proyeksiyaları' },
    sources: ['LC'],
    targets: ['CORTEX', 'HIPPO', 'THAL', 'HYPO', 'CEREB', 'SPINAL'],
    lit: ['Locus_coeruleus'],
    title: 'NOREPINEPHRINE (LOCUS COERULEUS) SYSTEM',
    titleAz: 'Noradrenalin (mavi ləkə) sistemi',
    description:
      'Locus coeruleus, a small nucleus in the dorsal pons beside the floor of the fourth ventricle → cortex, hippocampus, thalamus, hypothalamus, cerebellum and spinal cord. A few thousand neurons on each side supply most of the brain\'s norepinephrine. The system raises arousal, focuses attention and drives the brain\'s side of the stress response; it is most active when awake and alert and nearly silent in REM sleep.\n\nThe locus coeruleus degenerates early in both Alzheimer and Parkinson disease. SNRIs and some ADHD drugs (atomoxetine, stimulants) increase norepinephrine signalling. In opioid withdrawal the locus coeruleus becomes overactive, which is why the α2 agonist clonidine eases the symptoms.',
    descriptionAz:
      'Mavi ləkə — körpünün dorsal hissəsində, IV mədəciyin dibinin yanında kiçik nüvə → qabıq, hipokamp, talamus, hipotalamus, beyincik və onurğa beyni. Hər tərəfdə cəmi bir neçə min neyron beynin noradrenalininin çox hissəsini təmin edir. Sistem oyaqlığı artırır, diqqəti cəmləyir və stres reaksiyasının beyin tərəfini idarə edir; oyaq və ayıq olanda ən aktiv, REM yuxusunda isə demək olar ki, səssizdir.\n\nMavi ləkə həm Alzheimer, həm də Parkinson xəstəliyində erkən degenerasiyaya uğrayır. SNRİ-lər və bəzi DEHS (ADHD) dərmanları (atomoksetin, stimulyatorlar) noradrenalin siqnalını gücləndirir. Opioid abstinensiyasında mavi ləkə həddindən artıq aktivləşir; buna görə α2 aqonisti klonidin simptomları yüngülləşdirir.',
  },
  {
    id: 'basalForebrain',
    system: 'acetylcholine',
    name: { en: 'Basal forebrain projections', az: 'Bazal ön beyin proyeksiyaları' },
    sources: ['NBM', 'SEPTUM'],
    targets: ['CORTEX', 'HIPPO', 'AMYG'],
    pairs: [
      ['NBM', 'CORTEX'],
      ['NBM', 'AMYG'],
      ['SEPTUM', 'HIPPO'],
    ],
    lit: [],
    title: 'ACETYLCHOLINE (BASAL FOREBRAIN) SYSTEM',
    titleAz: 'Asetilxolin (bazal ön beyin) sistemi',
    description:
      'Nucleus basalis of Meynert (under the globus pallidus) → the whole neocortex and the amygdala; medial septal nucleus → hippocampus. Cortical acetylcholine sharpens attention and helps lay down new memories. A second cholinergic group in the brainstem (pedunculopontine and laterodorsal tegmental nuclei) projects to the thalamus and controls arousal and REM sleep.\n\nIn Alzheimer disease the nucleus basalis loses its neurons early, and cortical acetylcholine falls. That is the basis for cholinesterase inhibitors (donepezil, rivastigmine, galantamine), which give modest symptom relief. Drugs with strong anticholinergic effects can cause confusion and delirium, especially in older people.',
    descriptionAz:
      'Meynertin bazal nüvəsi (solğun kürənin altında) → bütün neokorteks və amiqdala; medial septal nüvə → hipokamp. Qabıqdakı asetilxolin diqqəti kəskinləşdirir və yeni xatirələrin yaranmasına kömək edir. Beyin gövdəsində ikinci xolinergik qrup (pedunkulopontin və laterodorsal tegmental nüvələr) talamusa proyeksiya verir, oyaqlığı və REM yuxusunu idarə edir.\n\nAlzheimer xəstəliyində bazal nüvə neyronlarını erkən itirir və qabıqda asetilxolin azalır. Xolinesteraza inhibitorlarının (donepezil, rivastiqmin, qalantamin) istifadəsi buna əsaslanır; onlar simptomları bir qədər yüngülləşdirir. Güclü antixolinergik təsiri olan dərmanlar, xüsusən yaşlı insanlarda, çaşqınlıq və delirium törədə bilər.',
  },
];

export const NT_UI = {
  en: {
    heading: 'Neurotransmitter pathways',
    hide: 'Hide pathways',
    note: 'Dashed circles are nuclei or targets not in this 3D model; their positions are approximate. Arrows are schematic, not real fibre routes.',
  },
  az: {
    heading: 'Neyromediator yolları',
    hide: 'Yolları gizlət',
    note: 'Qırıq xətli dairələr bu 3D modeldə olmayan nüvələr və ya hədəflərdir; yerləri təxminidir. Oxlar sxematikdir, real lif yolları deyil.',
  },
};
