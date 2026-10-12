/**
 * Structures for the neuroanatomy identification drill.
 *
 * `mesh` is the object name inside the loaded scene, which for these viewers is
 * the GLB filename without its extension (BrainstemScene sets root.name = key).
 * `mesh` is taken from that viewer's *Manifest.js — never invented. A name that
 * is not in the manifest makes the drill silently skip the structure, so
 * `_qa_brainbee.mjs` checks every mesh against the matching file.
 *
 * `accept` holds the spellings a typed answer is matched against, after both
 * sides are folded to lowercase ASCII with punctuation stripped, so "Medulla
 * Oblongata", "medulla oblongata" and "medulla-oblongata" all collapse to the
 * same string. List Latin forms, common abbreviations and both English and
 * Azerbaijani wordings; answers in either language are always accepted.
 *
 * Laterality: if this viewer drills both an L and an R mesh for the same
 * structure, every accepted spelling (EN and AZ) must carry the side. Unsided
 * answers are allowed only when the mesh is midline or the only side present.
 * `_qa_brainbee.mjs` asserts this. Cerebral-cortex is cortical meshes only
 * (lobes / insula / limbic lobe) — do not refill it from the whole-brain dump.
 */
var BB_STRUCTURES = [
  {
    id: "brainstem-medulla",
    viewer: "brainstem",
    mesh: "Medulla_oblongata",
    name: { en: "Medulla oblongata", az: "Uzunsov beyin (medulla oblongata)" },
    accept: {
      en: ["medulla oblongata", "medulla", "myelencephalon", "bulb", "medulla oblongata bulb"],
      az: ["uzunsov beyin", "medulla oblongata", "bulbus", "uzunsov beyin medulla oblongata"],
    },
    note: {
      en: "The lowest segment of the brainstem, holding the reticular centres that set breathing, heart rate and blood pressure, the pyramidal decussation, and the nuclei of cranial nerves IX to XII.",
      az: "Beyin sapının ən aşağı hissəsi: tənəffüsü, ürək ritmini və qan təzyiqini təyin edən retikulyar mərkəzləri, piramid çarpazını və IX–XII kəllə sinirlərinin nüvələrini saxlayır.",
    },
  },
  {
    id: "brainstem-pons",
    viewer: "brainstem",
    mesh: "Pons",
    name: { en: "Pons", az: "Pons (beyin körpüsü)" },
    accept: {
      en: ["pons", "pons varolii", "pons cerebri", "ponto"],
      az: ["pons", "körpü", "beyin körpüsü", "pons beyin körpüsü"],
    },
    note: {
      en: "The bulging middle segment, swollen in front by transverse fibres running cortex to cerebellum, carrying the nuclei of cranial nerves V to VIII and much of the sleep-wake machinery.",
      az: "Ortadaki qabarıq hissə: ön tərəfi qabıqdan beyinciyə gedən köndələn liflərlə şişkindir, V–VIII kəllə sinirlərinin nüvələrini və yuxu-oyanıqlıq mexanizminin böyük hissəsini daşıyır.",
    },
  },
  {
    id: "brainstem-midbrain",
    viewer: "brainstem",
    mesh: "Midbrain",
    name: { en: "Midbrain (mesencephalon)", az: "Orta beyin (mezensefalon)" },
    accept: {
      en: ["midbrain", "mid brain", "mesencephalon", "midbrain mesencephalon"],
      az: ["orta beyin", "mezensefalon", "midbrain", "orta beyin mezensefalon"],
    },
    note: {
      en: "The shortest brainstem segment: colliculi on its roof for visual and auditory reflexes, cranial nerve III and IV nuclei in its tegmentum, and descending motor fibres in the crus below.",
      az: "Beyin sapının ən qısa hissəsi: damında görmə və eşitmə reflekslərinə cavabdeh təpəciklər, tegmentumunda III və IV sinir nüvələri, altındaki ayaqcıqda enən motor liflər.",
    },
  },
  {
    id: "brainstem-substantia-nigra",
    viewer: "brainstem",
    mesh: "Substantia_nigra",
    name: { en: "Substantia nigra", az: "Qara substansiya (substantia nigra)" },
    accept: {
      en: ["substantia nigra", "substantia nigra pars compacta", "snpc", "snc", "black substance"],
      az: ["qara substansiya", "substantia nigra", "qara madde", "qara substansiya substantia nigra"],
    },
    note: {
      en: "Pigmented midbrain nucleus whose pars compacta supplies dopamine to the striatum; losing those cells is what produces the rigidity and bradykinesia of Parkinson's disease.",
      az: "Orta beyində piqmentli nüvə; pars compacta hissəsi striatuma dopamin verir və həmin hüceyrələrin itkisi Parkinson xəstəliyindəki rigidlik və bradikineziyanı yaradır.",
    },
  },
  {
    id: "brainstem-red-nucleus",
    viewer: "brainstem",
    mesh: "Red_nucleus",
    name: { en: "Red nucleus", az: "Qırmızı nüvə (nucleus ruber)" },
    accept: {
      en: ["red nucleus", "nucleus ruber", "red nucleus nucleus ruber"],
      az: ["qırmızı nüvə", "nucleus ruber", "qirmizi nuve", "qırmızı nüvə nucleus ruber"],
    },
    note: {
      en: "Rounded tegmental nucleus taking cerebellar and cortical input and giving rise to the rubrospinal tract, which biases limb flexor tone; a reliable landmark on axial midbrain images.",
      az: "Tegmentumda yumru nüvə: beyincik və qabıqdan siqnal alır, ətrafların bükücü tonusuna təsir edən rubrospinal yolu başlayır; orta beyin kəsiklərində etibarlı oriyentirdir.",
    },
  },
  {
    id: "brainstem-superior-colliculus",
    viewer: "brainstem",
    mesh: "Superior_colliculus",
    name: { en: "Superior colliculus", az: "Yuxarı təpəcik (superior colliculus)" },
    accept: {
      en: ["superior colliculus", "superior colliculi", "colliculus superior", "upper colliculus"],
      az: ["yuxarı təpəcik", "üst təpəcik", "superior kollikulus", "yuxari tepecik"],
    },
    note: {
      en: "Upper pair of bumps on the midbrain roof; it fuses visual, auditory and touch maps to swing the eyes and head towards whatever just appeared.",
      az: "Orta beyin damındaki yuxarı cüt qabarıq: görmə, eşitmə və toxunma xəritələrini birləşdirərək gözü və başı yeni görünən stimula çevirir.",
    },
  },
  {
    id: "brainstem-inferior-colliculus",
    viewer: "brainstem",
    mesh: "Inferior_colliculus",
    name: { en: "Inferior colliculus", az: "Aşağı təpəcik (inferior colliculus)" },
    accept: {
      en: ["inferior colliculus", "inferior colliculi", "colliculus inferior", "lower colliculus"],
      az: ["aşağı təpəcik", "alt təpəcik", "inferior kollikulus", "asagi tepecik"],
    },
    note: {
      en: "Lower pair of bumps on the midbrain roof and the compulsory auditory relay: nearly every ascending sound pathway passes through it on the way to the medial geniculate body.",
      az: "Orta beyin damındaki aşağı cüt qabarıq və eşitmənin məcburi ötürücüsü: qalxan səs yollarının hamısı medial dizəbənzər cismə getməzdən əvvəl buradan keçir.",
    },
  },
  {
    id: "brainstem-pyramid",
    viewer: "brainstem",
    mesh: "Pyramid_of_medulla_oblongata",
    name: { en: "Pyramid of the medulla", az: "Uzunsov beynin piramidi" },
    accept: {
      en: [
        "pyramid",
        "pyramids",
        "medullary pyramid",
        "pyramid of medulla",
        "pyramid of the medulla",
        "pyramid of medulla oblongata",
      ],
      az: ["piramid", "medulla piramidi", "uzunsov beynin piramidi", "piramidlər"],
    },
    note: {
      en: "The ridge of corticospinal fibres on the front of the medulla; most of these axons cross to the other side at its lower end, which is why a cortical stroke weakens the opposite body.",
      az: "Uzunsov beynin ön səthində kortikospinal liflərin yaratdığı qabarıq; bu aksonların çoxu aşağı ucunda əks tərəfə keçir, ona görə qabıq insultu bədənin əks tərəfini zəiflədir.",
    },
  },
  {
    id: "brainstem-locus-coeruleus",
    viewer: "brainstem",
    mesh: "Locus_coeruleus",
    name: { en: "Locus coeruleus", az: "Locus coeruleus (mavi ləkə)" },
    accept: {
      en: ["locus coeruleus", "locus ceruleus", "nucleus pigmentosus pontis", "blue spot"],
      az: ["locus coeruleus", "mavi ləkə", "göy ləkə", "mavi leke"],
    },
    note: {
      en: "Small pigmented pontine nucleus that is the brain's main source of noradrenaline, driving arousal, vigilance and the alarm response to stress.",
      az: "Ponsda kiçik piqmentli nüvə: beynin əsas noradrenalin mənbəyidir, oyanıqlığı, diqqətliliyi və stress zamanı həyəcan reaksiyasını idarə edir.",
    },
  },
  {
    id: "brainstem-middle-cerebellar-peduncle",
    viewer: "brainstem",
    mesh: "Middle_cerebellar_peduncle",
    name: { en: "Middle cerebellar peduncle", az: "Orta beyincik ayaqcığı" },
    accept: {
      en: ["middle cerebellar peduncle", "middle cerebellar peduncles", "brachium pontis", "mcp"],
      az: ["orta beyincik ayaqcığı", "orta serebellar ayaqcıq", "brachium pontis", "orta beyincik ayaqciqi"],
    },
    note: {
      en: "The largest of the three cerebellar stalks, carrying pontocerebellar fibres so the cerebellum can compare the movement the cortex ordered with the one actually happening.",
      az: "Üç beyincik ayaqcığının ən böyüyü: pontoserebellar lifləri daşıyır və beyinciyə qabığın əmr etdiyi hərəkəti real baş verənlə müqayisə etməyə imkan verir.",
    },
  },
  {
    id: "brainstem-trigeminal-nerve",
    viewer: "brainstem",
    mesh: "Trigeminal_nerve_V",
    name: { en: "Trigeminal nerve (CN V)", az: "Üçlü sinir (V kəllə siniri)" },
    accept: {
      en: [
        "trigeminal nerve",
        "trigeminal",
        "nervus trigeminus",
        "cn v",
        "cn 5",
        "cranial nerve v",
        "cranial nerve 5",
        "fifth cranial nerve",
      ],
      az: ["üçlü sinir", "trigeminal sinir", "v kəllə siniri", "beşinci kəllə siniri", "uclu sinir"],
    },
    note: {
      en: "The largest cranial nerve, leaving the side of the pons to carry sensation from the whole face and motor supply to the chewing muscles.",
      az: "Ən böyük kəllə siniri: ponsun yan səthindən çıxır, bütün üzdən hissiyyatı gətirir və çeynəmə əzələlərini innervasiya edir.",
    },
  },
  {
    id: "brainstem-vestibulocochlear-nerve",
    viewer: "brainstem",
    mesh: "Vestibulocochlear_nerve_VIII",
    name: { en: "Vestibulocochlear nerve (CN VIII)", az: "Dəhliz-ilbiz siniri (VIII kəllə siniri)" },
    accept: {
      en: [
        "vestibulocochlear nerve",
        "vestibulocochlear",
        "nervus vestibulocochlearis",
        "acoustic nerve",
        "auditory nerve",
        "cn viii",
        "cn 8",
        "cranial nerve viii",
        "cranial nerve 8",
        "eighth cranial nerve",
      ],
      az: [
        "dəhliz-ilbiz siniri",
        "dehliz ilbiz siniri",
        "eşitmə siniri",
        "vestibulokoxlear sinir",
        "viii kəllə siniri",
        "səkkizinci kəllə siniri",
      ],
    },
    note: {
      en: "Carries hearing and balance signals from the inner ear into the brainstem at the pontomedullary junction; a schwannoma on it causes one-sided hearing loss with imbalance.",
      az: "Daxili qulaqdan eşitmə və müvazinət siqnallarını ponto-medulyar birləşmə səviyyəsində beyin sapına gətirir; üzərindəki şvannoma birtərəfli eşitmə itkisi və müvazinət pozğunluğu verir.",
    },
  },
  {
    id: "brainstem-hypoglossal-nucleus",
    viewer: "brainstem",
    mesh: "Nucleus_of_hypoglossal_nerve",
    name: { en: "Hypoglossal nucleus (CN XII)", az: "Dilaltı sinirin nüvəsi (XII)" },
    accept: {
      en: [
        "hypoglossal nucleus",
        "nucleus of hypoglossal nerve",
        "nucleus of the hypoglossal nerve",
        "hypoglossal motor nucleus",
        "nucleus nervi hypoglossi",
        "cn xii nucleus",
        "cn 12 nucleus",
      ],
      az: [
        "dilaltı sinirin nüvəsi",
        "hipoqlossal nüvə",
        "xii sinirin nüvəsi",
        "dilalti sinirin nuvesi",
        "dilaltı sinir nüvəsi",
      ],
    },
    note: {
      en: "Column of motor neurons near the midline floor of the fourth ventricle supplying the tongue; damage wastes that half of the tongue and pushes it towards the weak side on protrusion.",
      az: "Dördüncü mədəciyin dibində, orta xəttə yaxın yerləşən motor neyron sütunu dili innervasiya edir; zədələnmə dilin o yarısını atrofiyaya salır və çıxarılarkən dili zəif tərəfə əyir.",
    },
  },

  /* ---------- cranial nerves (meshes from cranial-nerves/cranialNervesManifest.js) ---------- */
  {
    id: "cn-i-olfactory-r",
    viewer: "cranial-nerves",
    mesh: "01_CN_I_Olfactory_R",
    name: { en: "Olfactory nerve (CN I), right", az: "Sağ qoxu siniri (I kəllə siniri)" },
    accept: {
      en: ["olfactory nerve", "olfactory", "nervus olfactorius", "cn i", "cn 1", "cranial nerve i", "cranial nerve 1", "first cranial nerve", "right olfactory nerve", "olfactory nerve right"],
      az: ["qoxu siniri", "sağ qoxu siniri", "i kəllə siniri", "birinci kəllə siniri", "qoxu siniri sag"],
    },
    note: {
      en: "Filaments through the cribriform plate into the olfactory bulb; it is the only cranial nerve that does not relay in the thalamus. Shearing in trauma causes anosmia, often with CSF leak.",
      az: "Qoxu soğanağına ələk sümüyündən keçən saplar; talamusda sinaps etməyən yeganə kəllə siniridir. Travmada qırılması anozmiya verir, tez-tez onurğa-beyin mayesi sızması ilə.",
    },
  },
  {
    id: "cn-ii-optic-r",
    viewer: "cranial-nerves",
    mesh: "02_CN_II_Optic_R",
    name: { en: "Optic nerve (CN II), right", az: "Sağ görmə siniri (II kəllə siniri)" },
    accept: {
      en: [
        "right optic nerve",
        "optic nerve right",
        "right optic",
        "right nervus opticus",
        "right cn ii",
        "cn ii right",
        "right cn 2",
        "right cranial nerve ii",
        "right second cranial nerve",
      ],
      az: [
        "sağ görmə siniri",
        "sag gorme siniri",
        "sağ ii kəllə siniri",
        "sağ ikinci kəllə siniri",
      ],
    },
    note: {
      en: "Retinal ganglion axons leaving the globe; myelinated by oligodendrocytes, so it is CNS and can demyelinate in multiple sclerosis. Raised intracranial pressure swells the disc as papilloedema.",
      az: "Göz almasından çıxan retinal qanqlion aksonları; oliqodendrositlərlə mielinləşir, ona görə MNT-dir və dağınıq sklerozda demielinləşə bilər. Kəllədaxili təzyiqin artması diski papilloödem kimi şişirdir.",
    },
  },
  {
    id: "cn-ii-optic-l",
    viewer: "cranial-nerves",
    mesh: "02_CN_II_Optic_L",
    name: { en: "Optic nerve (CN II), left", az: "Sol görmə siniri (II kəllə siniri)" },
    accept: {
      en: [
        "left optic nerve",
        "optic nerve left",
        "left optic",
        "left nervus opticus",
        "left cn ii",
        "cn ii left",
        "left cn 2",
        "left cranial nerve ii",
      ],
      az: ["sol görmə siniri", "sol gorme siniri", "sol ii kəllə siniri"],
    },
    note: {
      en: "The left optic nerve carries the left eye's full field to the chiasm; a lesion here blinds that eye and can abolish its pupillary light reflex.",
      az: "Sol görmə siniri sol gözün bütün sahəsini xiazmaya aparır; buradakı zədə o gözü kor edir və işıq refleksini poza bilər.",
    },
  },
  {
    id: "cn-iii-oculomotor-r",
    viewer: "cranial-nerves",
    mesh: "03_CN_III_Oculomotor_R",
    name: { en: "Oculomotor nerve (CN III), right", az: "Sağ gözün hərəkət siniri (III kəllə siniri)" },
    accept: {
      en: ["oculomotor nerve", "oculomotor", "nervus oculomotorius", "cn iii", "cn 3", "cranial nerve iii", "third cranial nerve", "right oculomotor nerve"],
      az: ["gözün hərəkət siniri", "okülomotor sinir", "iii kəllə siniri", "üçüncü kəllə siniri", "sag gozun hereket siniri"],
    },
    note: {
      en: "Supplies four extraocular muscles, levator palpebrae and the pupil constrictor. A compressing aneurysm of the posterior communicating artery classically dilates the pupil first.",
      az: "Dörd gözəlavə əzələni, qaldırıcı göz qapağı əzələsini və bəbəyi daraldan lifləri innervasiya edir. Posterior kommunikant arteriyanın anevrizması klassik olaraq əvvəl bəbəyi genişləndirir.",
    },
  },
  {
    id: "cn-iv-trochlear-r",
    viewer: "cranial-nerves",
    mesh: "04_CN_IV_Trochlear_R",
    name: { en: "Trochlear nerve (CN IV), right", az: "Sağ blok siniri (IV kəllə siniri)" },
    accept: {
      en: ["trochlear nerve", "trochlear", "nervus trochlearis", "cn iv", "cn 4", "cranial nerve iv", "fourth cranial nerve", "right trochlear nerve"],
      az: ["blok siniri", "troxlear sinir", "iv kəllə siniri", "dördüncü kəllə siniri", "sag blok siniri"],
    },
    note: {
      en: "The only cranial nerve to decussate and to leave the brainstem dorsally; it supplies superior oblique. A palsy tilts the head away from the weak side to cancel diplopia.",
      az: "Çarpazlaşıb beyin sapını arxadan tərk edən yeganə kəllə siniri; yuxarı əyri əzələni innervasiya edir. Iflicdə diplopiyanı azaltmaq üçün baş zəif tərəfdən uzağa əyilir.",
    },
  },
  {
    id: "cn-v-trigeminal-r",
    viewer: "cranial-nerves",
    mesh: "05_CN_V_Trigeminal_R",
    name: { en: "Trigeminal nerve (CN V), right", az: "Sağ üçlü sinir (V kəllə siniri)" },
    accept: {
      en: [
        "right trigeminal nerve",
        "trigeminal nerve right",
        "right trigeminal",
        "right nervus trigeminus",
        "right cn v",
        "cn v right",
        "right cn 5",
        "right cranial nerve v",
        "right fifth cranial nerve",
      ],
      az: [
        "sağ üçlü sinir",
        "sag uclu sinir",
        "sağ trigeminal sinir",
        "sağ v kəllə siniri",
        "sağ beşinci kəllə siniri",
      ],
    },
    note: {
      en: "Face sensation and the muscles of mastication. Trigeminal neuralgia is a brief, electric pain, often from vascular compression at the root entry zone.",
      az: "Üz hissiyyatı və çeynəmə əzələləri. Üçlü nevralgiya kök giriş zonasında damar sıxmasından yaranan qısa, elektrik ağrısıdır.",
    },
  },
  {
    id: "cn-v-trigeminal-l",
    viewer: "cranial-nerves",
    mesh: "05_CN_V_Trigeminal_L",
    name: { en: "Trigeminal nerve (CN V), left", az: "Sol üçlü sinir (V kəllə siniri)" },
    accept: {
      en: [
        "left trigeminal nerve",
        "trigeminal nerve left",
        "left trigeminal",
        "left nervus trigeminus",
        "left cn v",
        "cn v left",
        "left cn 5",
        "left cranial nerve v",
      ],
      az: [
        "sol üçlü sinir",
        "sol uclu sinir",
        "sol trigeminal sinir",
        "sol v kəllə siniri",
      ],
    },
    note: {
      en: "The left trigeminal nerve leaves the pons and divides into ophthalmic, maxillary and mandibular divisions for the left face.",
      az: "Sol üçlü sinir ponsdan çıxır və sol üz üçün oftalmik, maksilyar və mandibular şaxələrə bölünür.",
    },
  },
  {
    id: "cn-vi-abducens-r",
    viewer: "cranial-nerves",
    mesh: "06_CN_VI_Abducens_R",
    name: { en: "Abducens nerve (CN VI), right", az: "Sağ uzaqlaşdırıcı sinir (VI kəllə siniri)" },
    accept: {
      en: ["abducens nerve", "abducens", "abducent", "nervus abducens", "cn vi", "cn 6", "cranial nerve vi", "sixth cranial nerve", "right abducens nerve"],
      az: ["uzaqlaşdırıcı sinir", "abdusens siniri", "vi kəllə siniri", "altıncı kəllə siniri", "sag uzaqlasdirici sinir"],
    },
    note: {
      en: "A long intracranial course to lateral rectus; raised pressure can stretch it and produce an inturning eye that is a false localising sign.",
      az: "Lateral düz əzələyə uzanan uzun kəllədaxili yol; təzyiq artımı onu dartıb gözü içə çevirə bilər — yalançı lokalizasiya əlaməti.",
    },
  },
  {
    id: "cn-vii-facial-r",
    viewer: "cranial-nerves",
    mesh: "07_CN_VII_Facial_R",
    name: { en: "Facial nerve (CN VII), right", az: "Sağ üz siniri (VII kəllə siniri)" },
    accept: {
      en: [
        "right facial nerve",
        "facial nerve right",
        "right facial",
        "right nervus facialis",
        "right cn vii",
        "cn vii right",
        "right cn 7",
        "right cranial nerve vii",
        "right seventh cranial nerve",
      ],
      az: [
        "sağ üz siniri",
        "sag uz siniri",
        "sağ fasial sinir",
        "sağ vii kəllə siniri",
        "sağ yeddinci kəllə siniri",
      ],
    },
    note: {
      en: "Muscles of facial expression, taste from the anterior two-thirds of the tongue, and stapedius. A lower-motor-neuron lesion (Bell's palsy) takes the whole half of the face, forehead included.",
      az: "Üz ifadəsi əzələləri, dilin ön üçdə ikisindən dad və stapedius. Aşağı motor neyron zədəsi (Bell iflici) alnı da daxil olmaqla üzün bütün yarısını tutur.",
    },
  },
  {
    id: "cn-vii-facial-l",
    viewer: "cranial-nerves",
    mesh: "07_CN_VII_Facial_L",
    name: { en: "Facial nerve (CN VII), left", az: "Sol üz siniri (VII kəllə siniri)" },
    accept: {
      en: [
        "left facial nerve",
        "facial nerve left",
        "left facial",
        "left nervus facialis",
        "left cn vii",
        "cn vii left",
        "left cn 7",
        "left cranial nerve vii",
      ],
      az: ["sol üz siniri", "sol uz siniri", "sol vii kəllə siniri"],
    },
    note: {
      en: "The left facial nerve loops around the abducens nucleus in the pons before leaving at the cerebellopontine angle.",
      az: "Sol üz siniri ponsda abdusens nüvəsinin ətrafından dolanıb serebellopontin bucaqdan çıxır.",
    },
  },
  {
    id: "cn-viii-vestibulocochlear-r",
    viewer: "cranial-nerves",
    mesh: "08_CN_VIII_Vestibulocochlear_R",
    name: { en: "Vestibulocochlear nerve (CN VIII), right", az: "Sağ dəhliz-ilbiz siniri (VIII kəllə siniri)" },
    accept: {
      en: ["vestibulocochlear nerve", "vestibulocochlear", "nervus vestibulocochlearis", "acoustic nerve", "cn viii", "cn 8", "eighth cranial nerve", "right vestibulocochlear nerve"],
      az: ["dəhliz-ilbiz siniri", "vestibulokoxlear sinir", "viii kəllə siniri", "səkkizinci kəllə siniri", "sag dehliz ilbiz siniri"],
    },
    note: {
      en: "Hearing and balance from the inner ear. A vestibular schwannoma on it causes unilateral hearing loss, tinnitus and later facial numbness.",
      az: "Daxili qulaqdan eşitmə və müvazinət. Üzərindəki vestibular şvannoma birtərəfli eşitmə itkisi, tinnitus və sonra üz keyiməsi verir.",
    },
  },
  {
    id: "cn-ix-glossopharyngeal-r",
    viewer: "cranial-nerves",
    mesh: "09_CN_IX_Glossopharyngeal_R",
    name: { en: "Glossopharyngeal nerve (CN IX), right", az: "Sağ dil-udlaq siniri (IX kəllə siniri)" },
    accept: {
      en: ["glossopharyngeal nerve", "glossopharyngeal", "nervus glossopharyngeus", "cn ix", "cn 9", "ninth cranial nerve", "right glossopharyngeal nerve"],
      az: ["dil-udlaq siniri", "qlossofarengeal sinir", "ix kəllə siniri", "doqquzuncu kəllə siniri", "sag dil udlaq siniri"],
    },
    note: {
      en: "Taste from the posterior third of the tongue, the carotid sinus reflex, and stylopharyngeus. Together with X it drives the gag reflex.",
      az: "Dilin arxa üçdə birindən dad, karotid sinus refleksi və stilofaringeus. X ilə birlikdə öskürmə-qusma refleksini idarə edir.",
    },
  },
  {
    id: "cn-x-vagus-r",
    viewer: "cranial-nerves",
    mesh: "10_CN_X_Vagus_R",
    name: { en: "Vagus nerve (CN X), right", az: "Sağ azan sinir (X kəllə siniri)" },
    accept: {
      en: ["vagus nerve", "vagus", "nervus vagus", "cn x", "cn 10", "tenth cranial nerve", "right vagus nerve", "pneumogastric"],
      az: ["azan sinir", "vagus", "x kəllə siniri", "onuncu kəllə siniri", "sag azan sinir"],
    },
    note: {
      en: "The wanderer: palate, larynx, heart, gut. Unilateral damage hoarsens the voice and drops the palate; bilateral damage is a swallowing and airway emergency.",
      az: "Səyyah: damaq, qırtlaq, ürək, bağırsaq. Birtərəfli zədə səsi boğuqlaşdırır və damağı salır; ikitərəfli zədə udma və tənəffüs təcili haldır.",
    },
  },
  {
    id: "cn-xi-accessory-r",
    viewer: "cranial-nerves",
    mesh: "11_CN_XI_Accessory_R",
    name: { en: "Accessory nerve (CN XI), right", az: "Sağ əlavə sinir (XI kəllə siniri)" },
    accept: {
      en: ["accessory nerve", "accessory", "spinal accessory", "nervus accessorius", "cn xi", "cn 11", "eleventh cranial nerve", "right accessory nerve"],
      az: ["əlavə sinir", "aksesor sinir", "xi kəllə siniri", "on birinci kəllə siniri", "sag elave sinir"],
    },
    note: {
      en: "Spinal root from C1–C5, up through the foramen magnum then out the jugular foramen to trapezius and sternocleidomastoid. A neck-triangle injury weakens shoulder shrug and head turn.",
      az: "C1–C5-dən spinal kök, foramen magnumdan yuxarı, sonra jugular dəlikdən trapezius və sternokleidomastoide. Boyun üçbucağında zədə çiyin qaldırmasını və baş çevirməsini zəiflədir.",
    },
  },
  {
    id: "cn-xii-hypoglossal-r",
    viewer: "cranial-nerves",
    mesh: "12_CN_XII_Hypoglossal_R",
    name: { en: "Hypoglossal nerve (CN XII), right", az: "Sağ dilaltı sinir (XII kəllə siniri)" },
    accept: {
      en: ["hypoglossal nerve", "hypoglossal", "nervus hypoglossus", "cn xii", "cn 12", "twelfth cranial nerve", "right hypoglossal nerve"],
      az: ["dilaltı sinir", "hipoqlossal sinir", "xii kəllə siniri", "on ikinci kəllə siniri", "sag dilalti sinir"],
    },
    note: {
      en: "Tongue muscles. A lower-motor-neuron lesion wastes that half of the tongue and the tip points towards the weak side on protrusion.",
      az: "Dil əzələləri. Aşağı motor neyron zədəsi dilin o yarısını atrofiyaya salır və çıxarılarkən ucu zəif tərəfə işarə edir.",
    },
  },

  /* ---------- limbic (meshes from limbic/limbicManifest.js) ---------- */
  {
    id: "limbic-hippocampus-r",
    viewer: "limbic",
    mesh: "02_Hippocampus_R",
    name: { en: "Hippocampus, right", az: "Sağ hippokamp" },
    accept: {
      en: ["right hippocampus", "hippocampus right", "right hippocampal formation"],
      az: ["sağ hippokamp", "sağ hipokamp", "sag hippokamp"],
    },
    note: {
      en: "Seahorse-shaped formation in the medial temporal lobe that consolidates declarative memory. Bilateral damage produces dense anterograde amnesia; it is also the usual origin of mesial temporal lobe epilepsy.",
      az: "Medial temporal payda deklarativ yaddaşı möhkəmləndirən dəniz atı şəkilli formasiya. İkitərəfli zədə sıx anterograd amneziya verir; mezial temporal epilepsiyanın da adi mənşəyidir.",
    },
  },
  {
    id: "limbic-hippocampus-l",
    viewer: "limbic",
    mesh: "01_Hippocampus_L",
    name: { en: "Hippocampus, left", az: "Sol hippokamp" },
    accept: {
      en: ["left hippocampus", "hippocampus left"],
      az: ["sol hippokamp", "sol hipokamp"],
    },
    note: {
      en: "The left hippocampus is biased toward verbal memory; sclerosis here is a common cause of language-related temporal lobe seizures.",
      az: "Sol hippokamp verbal yaddaşa meyillidir; buradakı skleroz dilə bağlı temporal pay tutmalarının tez-tez səbəbidir.",
    },
  },
  {
    id: "limbic-amygdala-r",
    viewer: "limbic",
    mesh: "04_Amygdala_R",
    name: { en: "Amygdala, right", az: "Sağ amiqdala" },
    accept: {
      en: ["right amygdala", "right amygdaloid", "right corpus amygdaloideum"],
      az: ["sağ amiqdala", "sağ badamvari nüvə", "sag amiqdala"],
    },
    note: {
      en: "Almond-shaped nucleus that tags stimuli with fear and salience. Bilateral loss blunts threat recognition (Klüver–Bucy); it is hyper-reactive in many anxiety states.",
      az: "Stimulları qorxu və əhəmiyyətlə işarələyən badamvari nüvə. İkitərəfli itkisi təhlükə tanımasını korlayır (Klüver–Bucy); bir çox narahatlıq vəziyyətində həddindən artıq reaktivdir.",
    },
  },
  {
    id: "limbic-amygdala-l",
    viewer: "limbic",
    mesh: "03_Amygdala_L",
    name: { en: "Amygdala, left", az: "Sol amiqdala" },
    accept: {
      en: ["left amygdala", "amygdala left"],
      az: ["sol amiqdala", "sol badamvari nüvə"],
    },
    note: {
      en: "The left amygdala sits in front of the hippocampal head and shares the uncus with it on coronal MRI.",
      az: "Sol amiqdala hippokamp başının önündə oturur və koronal MRT-də uncusu onunla paylaşır.",
    },
  },
  {
    id: "limbic-parahippocampal-r",
    viewer: "limbic",
    mesh: "06_Parahippocampal_gyrus_R",
    name: { en: "Parahippocampal gyrus, right", az: "Sağ parahippokampal qırışıq" },
    accept: {
      en: ["parahippocampal gyrus", "parahippocampal", "right parahippocampal gyrus"],
      az: ["parahippokampal qırışıq", "sağ parahippokampal qırışıq", "parahippokampal girus"],
    },
    note: {
      en: "Cortical ribbon wrapping the hippocampus; entorhinal cortex here is the main gateway in and out of hippocampal memory circuits, and an early site of Alzheimer pathology.",
      az: "Hippokampı bürüyən qabıq lenti; buradakı entorinal qabıq hippokamp yaddaş dövrələrinin əsas giriş-çıxışıdır və Alzheimer patologiyasının erkən yeridir.",
    },
  },
  {
    id: "limbic-fornix-r",
    viewer: "limbic",
    mesh: "08_Fornix_R",
    name: { en: "Fornix, right", az: "Sağ forniks" },
    accept: {
      en: ["fornix", "right fornix", "fornix cerebri"],
      az: ["forniks", "sağ forniks", "tağ"],
    },
    note: {
      en: "White-matter arch carrying hippocampal output to the mammillary bodies. Transection or a colloid-cyst stretch of the columns can produce an amnestic syndrome.",
      az: "Hippokamp çıxışını məməyəbənzər cisimlərə aparan ağ maddə tağı. Kəsilməsi və ya kolloid kistanın sütunları dartması amnestik sindrom verə bilər.",
    },
  },
  {
    id: "limbic-mammillary-r",
    viewer: "limbic",
    mesh: "10_Mammillary_body_R",
    name: { en: "Mammillary body, right", az: "Sağ məməyəbənzər cisim" },
    accept: {
      en: ["mammillary body", "mamillary body", "right mammillary body", "corpus mamillare"],
      az: ["məməyəbənzər cisim", "sağ məməyəbənzər cisim", "mamillar cisim"],
    },
    note: {
      en: "Hypothalamic relay on the Papez circuit. Mammillary atrophy and haemorrhage are the classic diencephalic lesions of Wernicke–Korsakoff from thiamine deficiency.",
      az: "Papez dövrəsində hipotalamik ötürücü. Məməyəbənzər atrofiya və qanaxma tiamin çatışmazlığından Wernicke–Korsakoff-un klassik diensefalik zədələridir.",
    },
  },
  {
    id: "limbic-habenula",
    viewer: "limbic",
    mesh: "13_Habenula",
    name: { en: "Habenula", az: "Habenula" },
    accept: {
      en: ["habenula", "habenular nucleus", "habenular nuclei"],
      az: ["habenula", "habenulyar nüvə"],
    },
    note: {
      en: "Small epithalamic pair that signals disappointment to midbrain monoamine nuclei. It is a research target in treatment-resistant depression.",
      az: "Orta beyin monoamin nüvələrinə məyusluğu siqnal verən kiçik epitalamik cüt. Müalicəyə davamlı depressiyada tədqiqat hədəfidir.",
    },
  },
  {
    id: "limbic-septal-nuclei",
    viewer: "limbic",
    mesh: "14_Septal_nuclei",
    name: { en: "Septal nuclei", az: "Septal nüvələr" },
    accept: {
      en: ["septal nuclei", "septal nucleus", "nucleus septalis", "septum nuclei"],
      az: ["septal nüvələr", "septal nuveler", "septum nüvələri"],
    },
    note: {
      en: "Cholinergic cells beside the septum pellucidum that pace the hippocampal theta rhythm used in memory encoding.",
      az: "Yaddaş kodlaşdırmasında istifadə olunan hippokamp teta ritmini idarə edən, şəffaf arakəsmə yanındakı xolinergik hüceyrələr.",
    },
  },
  {
    id: "limbic-septum-pellucidum",
    viewer: "limbic",
    mesh: "15_Septum_pellucidum",
    name: { en: "Septum pellucidum", az: "Şəffaf arakəsmə (septum pellucidum)" },
    accept: {
      en: ["septum pellucidum", "septum", "pellucid septum"],
      az: ["şəffaf arakəsmə", "septum pellucidum", "seffaf arakesme"],
    },
    note: {
      en: "Thin midline membrane between the frontal horns. A cavum septum pellucidum is a common developmental remnant; absence of the septum itself flags holoprosencephaly-spectrum malformations.",
      az: "Frontal buynuzlar arasında nazik orta xətt pərdəsi. Cavum septum pellucidum adi inkişaf qalığıdır; septumun özünün olmaması holoprozensefaliya spektrini işarələyir.",
    },
  },
  {
    id: "limbic-cingulate-ant-r",
    viewer: "limbic",
    mesh: "17_Cingulate_gyrus_anterior_R",
    name: { en: "Anterior cingulate gyrus, right", az: "Sağ ön singulyat qırışıq" },
    accept: {
      en: ["anterior cingulate", "anterior cingulate gyrus", "acc", "right anterior cingulate"],
      az: ["ön singulyat", "ön singulyat qırışıq", "sağ ön singulyat", "anterior singulyat"],
    },
    note: {
      en: "Medial prefrontal belt for conflict monitoring, motivation and affect. Cingulotomy has been used for severe OCD; infarction here can produce akinetic mutism.",
      az: "Konflikt izləmə, motivasiya və affekt üçün medial prefrontal kəmər. Ağır OKB üçün singulotomiya istifadə olunub; buradakı infarkt akinetik mutizm verə bilər.",
    },
  },
  {
    id: "limbic-cingulate-post-r",
    viewer: "limbic",
    mesh: "19_Cingulate_gyrus_posterior_R",
    name: { en: "Posterior cingulate gyrus, right", az: "Sağ arxa singulyat qırışıq" },
    accept: {
      en: ["posterior cingulate", "posterior cingulate gyrus", "pcc", "right posterior cingulate"],
      az: ["arxa singulyat", "arxa singulyat qırışıq", "sağ arxa singulyat", "posterior singulyat"],
    },
    note: {
      en: "Hub of the default-mode network, metabolically greedy and an early hypometabolic site in Alzheimer disease.",
      az: "Defolt-rejim şəbəkəsinin düyünü, metabolik cəhətdən ac və Alzheimer xəstəliyində erkən hipometabolik yerdir.",
    },
  },
  {
    id: "limbic-cingulate-dorsal-r",
    viewer: "limbic",
    mesh: "21_Cingulate_gyrus_dorsal_R",
    name: { en: "Dorsal cingulate gyrus, right", az: "Sağ dorsal singulyat qırışıq" },
    accept: {
      en: ["dorsal cingulate", "dorsal cingulate gyrus", "midcingulate", "right dorsal cingulate"],
      az: ["dorsal singulyat", "dorsal singulyat qırışıq", "sağ dorsal singulyat"],
    },
    note: {
      en: "Mid-cingulate belt linking cognitive control with skeletomotor output; it is the cingulate region most tied to effortful action.",
      az: "Kognitiv nəzarəti skeletomotor çıxışla bağlayan orta singulyat kəməri; səy tələb edən hərəkətlə ən çox bağlı singulyat bölgəsidir.",
    },
  },
  {
    id: "limbic-cingulate-ventral-r",
    viewer: "limbic",
    mesh: "23_Cingulate_gyrus_ventral_R",
    name: { en: "Ventral cingulate gyrus, right", az: "Sağ ventral singulyat qırışıq" },
    accept: {
      en: ["ventral cingulate", "ventral cingulate gyrus", "subgenual cingulate", "right ventral cingulate"],
      az: ["ventral singulyat", "ventral singulyat qırışıq", "sağ ventral singulyat"],
    },
    note: {
      en: "Subcallosal / subgenual cingulate involved in mood and autonomic tone; deep-brain stimulation here has been trialled for depression.",
      az: "Əhval və avtonom tonusda iştirak edən subkallozal / subgenual singulyat; depressiya üçün burada dərin beyin stimulyasiyası sınaqdan keçirilib.",
    },
  },
  {
    id: "limbic-stria-medullaris-r",
    viewer: "limbic",
    mesh: "12_Stria_medullaris_R",
    name: { en: "Stria medullaris, right", az: "Sağ stria medullaris" },
    accept: {
      en: ["stria medullaris", "stria medullaris thalami", "right stria medullaris"],
      az: ["stria medullaris", "sağ stria medullaris", "talamusun stria medullarisi"],
    },
    note: {
      en: "Fibre ridge along the thalamus carrying septal and hypothalamic axons to the habenula.",
      az: "Septal və hipotalamik aksonları habenulaya aparan, talamus boyunca uzanan lif silsiləsi.",
    },
  },

  /* ---------- ventricles (meshes from ventricles/ventriclesManifest.js; atlas has 7, not 15) ---------- */
  {
    id: "vent-lateral-l",
    viewer: "ventricles",
    mesh: "01_Lateral_ventricle_L",
    name: { en: "Lateral ventricle, left", az: "Sol yan mədəcik" },
    accept: {
      en: ["left lateral ventricle", "left ventriculus lateralis"],
      az: ["sol yan mədəcik", "sol lateral mədəcik"],
    },
    note: {
      en: "C-shaped CSF cavity of the left hemisphere. Frontal-horn rounding is an early hydrocephalus sign; caudate atrophy boxes the same horn in Huntington disease.",
      az: "Sol yarımkürənin C-şəkilli onurğa-beyin mayesi boşluğu. Frontal buynuzun yuvarlaqlaşması erkən hidrosefaliya əlamətidir; Hantinqton xəstəliyində kaudat atrofiyası eyni buynuzu kvadratlaşdırır.",
    },
  },
  {
    id: "vent-lateral-r",
    viewer: "ventricles",
    mesh: "02_Lateral_ventricle_R",
    name: { en: "Lateral ventricle, right", az: "Sağ yan mədəcik" },
    accept: {
      en: ["right lateral ventricle", "right ventriculus lateralis"],
      az: ["sağ yan mədəcik", "sağ lateral mədəcik"],
    },
    note: {
      en: "Right-hemisphere CSF cavity with frontal, body, atrium, occipital and temporal horns. Temporal-horn dilatation is a sensitive marker of hippocampal atrophy.",
      az: "Frontal, gövdə, atrium, oksipital və temporal buynuzları olan sağ yarımkürə maye boşluğu. Temporal buynuz genişlənməsi hippokamp atrofiyasının həssas göstəricisidir.",
    },
  },
  {
    id: "vent-third",
    viewer: "ventricles",
    mesh: "03_Third_ventricle",
    name: { en: "Third ventricle", az: "Üçüncü mədəcik" },
    accept: {
      en: ["third ventricle", "3rd ventricle", "iii ventricle", "ventriculus tertius"],
      az: ["üçüncü mədəcik", "3 cu mədəcik", "ucuncu medecik"],
    },
    note: {
      en: "Slit between the two thalami. A colloid cyst at its roof can block both foramina of Monro and cause sudden obstructive hydrocephalus.",
      az: "İki talamus arasındakı yarıq. Damındakı kolloid kista hər iki Monro dəliyini tutub qəfil obstruktiv hidrosefaliya verə bilər.",
    },
  },
  {
    id: "vent-aqueduct",
    viewer: "ventricles",
    mesh: "04_Cerebral_aqueduct",
    name: { en: "Cerebral aqueduct", az: "Beyin su kəməri (aqueductus cerebri)" },
    accept: {
      en: ["cerebral aqueduct", "aqueduct of sylvius", "sylvian aqueduct", "aqueductus cerebri", "aqueduct"],
      az: ["beyin su kəməri", "sylvius su kəməri", "akveduk", "beyin su kemeri"],
    },
    note: {
      en: "The narrow midbrain channel from third to fourth ventricle; stenosis here is a classic cause of obstructive hydrocephalus with a small fourth ventricle.",
      az: "Üçüncü mədəcikdən dördüncüyə orta beyin kanalı; buradakı stenoz kiçik dördüncü mədəcikli obstruktiv hidrosefaliyanın klassik səbəbidir.",
    },
  },
  {
    id: "vent-fourth",
    viewer: "ventricles",
    mesh: "05_Fourth_ventricle",
    name: { en: "Fourth ventricle", az: "Dördüncü mədəcik" },
    accept: {
      en: ["fourth ventricle", "4th ventricle", "iv ventricle", "ventriculus quartus"],
      az: ["dördüncü mədəcik", "4 cu mədəcik", "dorduncu medecik"],
    },
    note: {
      en: "Tent between brainstem and cerebellum. Its lateral and median apertures dump CSF into the cisterns; a medulloblastoma in childhood often fills this space.",
      az: "Beyin sapı ilə beyincik arasındakı çadır. Yan və orta dəlikləri mayeni sisternlərə tökür; uşaqlıqda medulloblastoma tez-tez bu boşluğu doldurur.",
    },
  },
  {
    id: "vent-choroid-l",
    viewer: "ventricles",
    mesh: "06_Choroid_plexus_L",
    name: { en: "Choroid plexus, left", az: "Sol xoroid pleksus" },
    accept: {
      en: ["left choroid plexus", "left choroid"],
      az: ["sol xoroid pleksus", "sol damarlı kələf"],
    },
    note: {
      en: "CSF-secreting tuft in the left lateral ventricle. It can host papillomas and is a common site of age-related calcification on CT.",
      az: "Sol yan mədəcikdə onurğa-beyin mayesi ifraz edən kələf. Papillomalara ev sahibliyi edə bilər və KT-də yaşla bağlı kalsifikasiyanın adi yeridir.",
    },
  },
  {
    id: "vent-choroid-r",
    viewer: "ventricles",
    mesh: "07_Choroid_plexus_R",
    name: { en: "Choroid plexus, right", az: "Sağ xoroid pleksus" },
    accept: {
      en: ["right choroid plexus", "right choroid"],
      az: ["sağ xoroid pleksus", "sağ damarlı kələf"],
    },
    note: {
      en: "Right-sided CSF factory in the atrium of the lateral ventricle, continuous through the foramina of Monro with third-ventricle plexus.",
      az: "Yan mədəciyin atriumunda sağ tərəfli maye fabrikası, Monro dəlikləri vasitəsilə üçüncü mədəcik pleksusu ilə davam edir.",
    },
  },

  /* ---------- white matter (meshes from white-matter/whiteMatterManifest.js) ---------- */
  {
    id: "wm-corpus-callosum",
    viewer: "white-matter",
    mesh: "01_Corpus_callosum",
    name: { en: "Corpus callosum", az: "Korpus kallozum (əzələ cisim)" },
    accept: {
      en: ["corpus callosum", "callosum", "callosal commissure"],
      az: ["korpus kallozum", "əzələ cisim", "kallozum", "ezle cisim"],
    },
    note: {
      en: "The great commissure linking the hemispheres. Splenium lesions can disconnect visual language (alexia without agraphia); agenesis is a developmental malformation.",
      az: "Yarımkürələri birləşdirən böyük komissura. Splenium zədələri görmə dilini ayıra bilər (aqrafiyasız aleksiya); ageneziya inkişaf qüsurudur.",
    },
  },
  {
    id: "wm-anterior-commissure",
    viewer: "white-matter",
    mesh: "02_Anterior_commissure",
    name: { en: "Anterior commissure", az: "Ön komissura" },
    accept: {
      en: ["anterior commissure", "commissura anterior"],
      az: ["ön komissura", "on komissura", "anterior komissura"],
    },
    note: {
      en: "Compact crossing in front of the third ventricle carrying olfactory and temporal fibres; a midline landmark on sagittal MRI.",
      az: "Üçüncü mədəciyin önündə qoxu və temporal lifləri daşıyan sıx çarpaz; saggital MRT-də orta xətt nişanı.",
    },
  },
  {
    id: "wm-posterior-commissure",
    viewer: "white-matter",
    mesh: "03_Posterior_commissure",
    name: { en: "Posterior commissure", az: "Arxa komissura" },
    accept: {
      en: ["posterior commissure", "commissura posterior"],
      az: ["arxa komissura", "posterior komissura"],
    },
    note: {
      en: "Crossing at the junction of the third ventricle and aqueduct; it carries fibres for the consensual pupillary light reflex. A lesion here contributes to Parinaud syndrome.",
      az: "Üçüncü mədəcik ilə su kəmərinin birləşməsindəki çarpaz; razılaşmış işıq refleksinin liflərini daşıyır. Buradakı zədə Parinaud sindromuna töhfə verir.",
    },
  },
  {
    id: "wm-hippocampal-commissure",
    viewer: "white-matter",
    mesh: "04_Hippocampal_commissure",
    name: { en: "Hippocampal commissure", az: "Hippokampal komissura" },
    accept: {
      en: ["hippocampal commissure", "commissure of the fornix", "psalterium"],
      az: ["hippokampal komissura", "forniks komissurası"],
    },
    note: {
      en: "Commissural fibres between the two fornices under the splenium, linking the hippocampi.",
      az: "Spleniumun altında iki forniks arasında hippokampları birləşdirən komissural liflər.",
    },
  },
  {
    id: "wm-fornix-l",
    viewer: "white-matter",
    mesh: "05_Fornix_L",
    name: { en: "Fornix, left", az: "Sol forniks" },
    accept: {
      en: ["left fornix", "left fornix cerebri"],
      az: ["sol forniks", "sol tağ"],
    },
    note: {
      en: "Left hippocampal output arch to the mammillary body; part of the circuit whose interruption causes diencephalic amnesia.",
      az: "Sol hippokamp çıxış tağı məməyəbənzər cismə; kəsilməsi diensefalik amneziya verən dövrənin hissəsidir.",
    },
  },
  {
    id: "wm-fornix-r",
    viewer: "white-matter",
    mesh: "06_Fornix_R",
    name: { en: "Fornix, right", az: "Sağ forniks" },
    accept: {
      en: ["right fornix"],
      az: ["sağ forniks"],
    },
    note: {
      en: "Right crus, body and column of the fornix carrying hippocampal efferents in the Papez circuit.",
      az: "Papez dövrəsində hippokamp eferentlərini daşıyan forniksin sağ crus, gövdə və sütunu.",
    },
  },
  {
    id: "wm-stria-terminalis-l",
    viewer: "white-matter",
    mesh: "07_Stria_terminalis_L",
    name: { en: "Stria terminalis, left", az: "Sol stria terminalis" },
    accept: {
      en: ["left stria terminalis"],
      az: ["sol stria terminalis"],
    },
    note: {
      en: "Amygdala-to-septum / hypothalamus fibre along the thalamostriate groove, a C-shaped companion of the caudate tail.",
      az: "Talamostriat şırım boyunca amiqdaladan septum / hipotalamusa lif, kaudat quyruğunun C-şəkilli yoldaşı.",
    },
  },
  {
    id: "wm-stria-terminalis-r",
    viewer: "white-matter",
    mesh: "08_Stria_terminalis_R",
    name: { en: "Stria terminalis, right", az: "Sağ stria terminalis" },
    accept: {
      en: ["right stria terminalis"],
      az: ["sağ stria terminalis"],
    },
    note: {
      en: "Right stria terminalis in the same groove between thalamus and caudate, carrying extended-amygdala projections.",
      az: "Talamus ilə kaudat arasındakı eyni şırımda, genişlənmiş amiqdala proyeksiyalarını daşıyan sağ stria terminalis.",
    },
  },
  {
    id: "wm-cerebral-peduncle-l",
    viewer: "white-matter",
    mesh: "09_Cerebral_peduncle_L",
    name: { en: "Cerebral peduncle, left", az: "Sol beyin ayaqcığı" },
    accept: {
      en: ["left cerebral peduncle", "left crus cerebri"],
      az: ["sol beyin ayaqcığı", "sol crus cerebri"],
    },
    note: {
      en: "Descending cortical fibres in the left midbrain basis. A lesion here (Weber syndrome when CN III is caught) weakens the opposite body.",
      az: "Sol orta beyin əsasındakı enən qabıq lifləri. Buradakı zədə (III sinir tutulanda Weber sindromu) əks bədəni zəiflədir.",
    },
  },
  {
    id: "wm-cerebral-peduncle-r",
    viewer: "white-matter",
    mesh: "10_Cerebral_peduncle_R",
    name: { en: "Cerebral peduncle, right", az: "Sağ beyin ayaqcığı" },
    accept: {
      en: ["right cerebral peduncle", "right crus cerebri"],
      az: ["sağ beyin ayaqcığı", "sağ crus cerebri"],
    },
    note: {
      en: "Right crus cerebri packed with corticospinal and corticobulbar axons on their way to the pons.",
      az: "Ponsa gedən kortikospinal və kortikobulbar aksonlarla dolu sağ crus cerebri.",
    },
  },
  {
    id: "wm-pyramid-l",
    viewer: "white-matter",
    mesh: "13_Medullary_pyramid_L",
    name: { en: "Medullary pyramid, left", az: "Sol medulyar piramid" },
    accept: {
      en: ["left medullary pyramid", "left pyramid", "left pyramid of medulla"],
      az: ["sol medulyar piramid", "sol piramid", "sol uzunsov beyin piramidi"],
    },
    note: {
      en: "Corticospinal ridge on the left ventral medulla. Most fibres cross at its caudal end, which is why a pyramid lesion above the decussation weakens the opposite limbs.",
      az: "Sol ventral uzunsov beyində kortikospinal silsilə. Liflərin çoxu kaudal ucunda çarpazlaşır, ona görə çarpazdan yuxarı piramid zədəsi əks ətrafları zəiflədir.",
    },
  },
  {
    id: "wm-pyramid-r",
    viewer: "white-matter",
    mesh: "14_Medullary_pyramid_R",
    name: { en: "Medullary pyramid, right", az: "Sağ medulyar piramid" },
    accept: {
      en: ["right medullary pyramid", "right pyramid", "right pyramid of medulla"],
      az: ["sağ medulyar piramid", "sağ piramid", "sağ uzunsov beyin piramidi"],
    },
    note: {
      en: "Right medullary pyramid of corticospinal fibres, continuous with the right cerebral peduncle above.",
      az: "Yuxarıda sağ beyin ayaqcığı ilə davam edən, kortikospinal liflərdən sağ medulyar piramid.",
    },
  },
  {
    id: "wm-scp-l",
    viewer: "white-matter",
    mesh: "15_Superior_cerebellar_peduncle_L",
    name: { en: "Superior cerebellar peduncle, left", az: "Sol yuxarı beyincik ayaqcığı" },
    accept: {
      en: ["left superior cerebellar peduncle", "left scp", "left brachium conjunctivum"],
      az: ["sol yuxarı beyincik ayaqcığı", "sol brachium conjunctivum"],
    },
    note: {
      en: "Main cerebellar output to the opposite red nucleus and thalamus. The two SCPs decussate in the midbrain; a lesion causes ipsilateral limb ataxia.",
      az: "Əks qırmızı nüvə və talamusa əsas beyincik çıxışı. İki SCP orta beyində çarpazlaşır; zədə ipsilateral ətraf ataksiyası verir.",
    },
  },
  {
    id: "wm-scp-r",
    viewer: "white-matter",
    mesh: "16_Superior_cerebellar_peduncle_R",
    name: { en: "Superior cerebellar peduncle, right", az: "Sağ yuxarı beyincik ayaqcığı" },
    accept: {
      en: ["right superior cerebellar peduncle", "right brachium conjunctivum"],
      az: ["sağ yuxarı beyincik ayaqcığı"],
    },
    note: {
      en: "Right superior cerebellar peduncle climbing out of the dentate toward the midbrain decussation.",
      az: "Dişli nüvədən orta beyin çarpazına qalxan sağ yuxarı beyincik ayaqcığı.",
    },
  },
  {
    id: "wm-optic-tract-l",
    viewer: "white-matter",
    mesh: "17_Optic_tract_L",
    name: { en: "Optic tract, left", az: "Sol görmə trakti" },
    accept: {
      en: ["left optic tract"],
      az: ["sol görmə trakti", "sol optik trakt"],
    },
    note: {
      en: "Post-chiasmatic fibres to the left LGN. A lesion here gives a right homonymous hemianopia, often incongruous.",
      az: "Xiazmadan sonra sol LGN-ə liflər. Buradakı zədə sağ homonim hemianopiya verir, tez-tez inkongruent.",
    },
  },
  {
    id: "wm-optic-tract-r",
    viewer: "white-matter",
    mesh: "18_Optic_tract_R",
    name: { en: "Optic tract, right", az: "Sağ görmə trakti" },
    accept: {
      en: ["right optic tract"],
      az: ["sağ görmə trakti", "sağ optik trakt"],
    },
    note: {
      en: "Right optic tract wrapping the cerebral peduncle on its way to the lateral geniculate body.",
      az: "Lateral dizəbənzər cismə gedərkən beyin ayaqcığını dolanan sağ görmə trakti.",
    },
  },

  /* ---------- cerebral cortex: cortical meshes only (lobes L/R). No gyri in the atlas. ---------- */
  {
    id: "ctx-frontal-r",
    viewer: "cerebral-cortex",
    mesh: "Frontal_lobe.r",
    name: { en: "Frontal lobe, right", az: "Sağ frontal pay" },
    accept: {
      en: ["right frontal lobe", "frontal lobe right", "right frontal"],
      az: ["sağ frontal pay", "sağ alın payı", "sag frontal pay"],
    },
    note: {
      en: "Right prefrontal and motor cortex: planning, inhibition, contralateral movement. A lesion here is more about behaviour and left-sided weakness than aphasia.",
      az: "Sağ prefrontal və motor qabıq: planlama, inhibisiya, əks tərəf hərəkəti. Buradakı zədə afaziyadan çox davranış və sol tərəf zəifliyi haqqındadır.",
    },
  },
  {
    id: "ctx-frontal-l",
    viewer: "cerebral-cortex",
    mesh: "Frontal_lobe.l",
    name: { en: "Frontal lobe, left", az: "Sol frontal pay" },
    accept: {
      en: ["left frontal lobe", "frontal lobe left", "left frontal"],
      az: ["sol frontal pay", "sol alın payı"],
    },
    note: {
      en: "Left prefrontal and motor cortex, including Broca's area in most people. A lesion here is the classic non-fluent aphasia plus right-sided weakness.",
      az: "Sol prefrontal və motor qabıq, əksər insanlarda Broca sahəsi daxil. Buradakı zədə klassik qeyri-səlis afaziya plus sağ tərəf zəifliyidir.",
    },
  },
  {
    id: "ctx-parietal-r",
    viewer: "cerebral-cortex",
    mesh: "Parietal_lobe.r",
    name: { en: "Parietal lobe, right", az: "Sağ parietal pay" },
    accept: {
      en: ["right parietal lobe", "parietal lobe right", "right parietal"],
      az: ["sağ parietal pay", "sağ təpə payı", "sag parietal pay"],
    },
    note: {
      en: "Right parietal cortex maps the left body and space. Damage classically produces left neglect, not just numbness.",
      az: "Sağ parietal qabıq sol bədən və fəzanı xəritələyir. Zədə klassik olaraq təkcə keyimə deyil, sol neqlekt verir.",
    },
  },
  {
    id: "ctx-parietal-l",
    viewer: "cerebral-cortex",
    mesh: "Parietal_lobe.l",
    name: { en: "Parietal lobe, left", az: "Sol parietal pay" },
    accept: {
      en: ["left parietal lobe", "parietal lobe left", "left parietal"],
      az: ["sol parietal pay", "sol təpə payı"],
    },
    note: {
      en: "Left parietal cortex for right-body sensation, calculation and language-related praxis. Inferior parietal damage is the Gerstmann cluster: agraphia, acalculia, finger agnosia, left-right confusion.",
      az: "Sağ bədən hissi, hesab və dilə bağlı praksiya üçün sol parietal qabıq. Aşağı parietal zədə Gerstmann dəstəsidir: aqrafiya, akalkuliya, barmaq agnoziyası, sol-sağ qarışıqlığı.",
    },
  },
  {
    id: "ctx-temporal-r",
    viewer: "cerebral-cortex",
    mesh: "Temporal_lobe.r",
    name: { en: "Temporal lobe, right", az: "Sağ temporal pay" },
    accept: {
      en: ["right temporal lobe", "temporal lobe right", "right temporal"],
      az: ["sağ temporal pay", "sağ gəcək payı", "sag temporal pay"],
    },
    note: {
      en: "Right temporal cortex for non-verbal memory, faces and melody. Seizures here may start with déjà vu or a rising epigastric aura.",
      az: "Qeyri-verbal yaddaş, üz və melodiya üçün sağ temporal qabıq. Buradakı tutmalar deja vu və ya qalxan epiqastrik aura ilə başlaya bilər.",
    },
  },
  {
    id: "ctx-temporal-l",
    viewer: "cerebral-cortex",
    mesh: "Temporal_lobe.l",
    name: { en: "Temporal lobe, left", az: "Sol temporal pay" },
    accept: {
      en: ["left temporal lobe", "temporal lobe left", "left temporal"],
      az: ["sol temporal pay", "sol gəcək payı"],
    },
    note: {
      en: "Left temporal cortex, including Wernicke's area in most people, and the usual side for verbal memory and language-related temporal-lobe epilepsy.",
      az: "Sol temporal qabıq, əksər insanlarda Wernicke sahəsi daxil, verbal yaddaş və dilə bağlı temporal epilepsiyanın adi tərəfi.",
    },
  },
  {
    id: "ctx-occipital-r",
    viewer: "cerebral-cortex",
    mesh: "Occipital_lobe.r",
    name: { en: "Occipital lobe, right", az: "Sağ oksipital pay" },
    accept: {
      en: ["right occipital lobe", "occipital lobe right", "right occipital"],
      az: ["sağ oksipital pay", "sağ ənsə payı", "sag oksipital pay"],
    },
    note: {
      en: "Right visual cortex. A lesion gives a left homonymous hemianopia; PCA infarct is the usual stroke.",
      az: "Sağ görmə qabığı. Zədə sol homonim hemianopiya verir; PCA infarktı adi insultdur.",
    },
  },
  {
    id: "ctx-occipital-l",
    viewer: "cerebral-cortex",
    mesh: "Occipital_lobe.l",
    name: { en: "Occipital lobe, left", az: "Sol oksipital pay" },
    accept: {
      en: ["left occipital lobe", "occipital lobe left", "left occipital"],
      az: ["sol oksipital pay", "sol ənsə payı"],
    },
    note: {
      en: "Left visual cortex. A lesion gives a right homonymous hemianopia; alexia without agraphia follows a left occipital infarct plus splenium involvement.",
      az: "Sol görmə qabığı. Zədə sağ homonim hemianopiya verir; aqrafiyasız aleksiya sol oksipital infarkt plus splenium tutulmasından sonra gəlir.",
    },
  },
  {
    id: "ctx-insula-r",
    viewer: "cerebral-cortex",
    mesh: "Insula.r",
    name: { en: "Insula, right", az: "Sağ adacıq (insula)" },
    accept: {
      en: [
        "right insula",
        "insula right",
        "right insular cortex",
        "right island of reil",
      ],
      az: ["sağ adacıq", "sağ insula", "sag adaciq"],
    },
    note: {
      en: "Right insular cortex buried in the Sylvian fissure: interoception, taste and autonomic tone. Stroke here can disturb heart rhythm and pain of the left body.",
      az: "Sylvian yarığında basdırılmış sağ adacıq qabığı: interosepsiya, dad və avtonom tonus. Buradakı insult ürək ritmini və sol bədənin ağrısını poza bilər.",
    },
  },
  {
    id: "ctx-insula-l",
    viewer: "cerebral-cortex",
    mesh: "Insula.l",
    name: { en: "Insula, left", az: "Sol adacıq (insula)" },
    accept: {
      en: [
        "left insula",
        "insula left",
        "left insular cortex",
        "left island of reil",
      ],
      az: ["sol adacıq", "sol insula"],
    },
    note: {
      en: "Left insula, next to language opercula and M2 MCA branches. Stroke here may add dysarthria or aphasia to the usual autonomic and gustatory signs.",
      az: "Sol adacıq, dil operkulumları və M2 MCA şaxələrinin yanında. Buradakı insult adi avtonom və dad əlamətlərinə dizartriya və ya afaziya əlavə edə bilər.",
    },
  },
  {
    id: "ctx-limbic-r",
    viewer: "cerebral-cortex",
    mesh: "Limbic_lobe.r",
    name: { en: "Limbic lobe, right", az: "Sağ limbik pay" },
    accept: {
      en: ["right limbic lobe", "limbic lobe right", "right limbic cortex"],
      az: ["sağ limbik pay", "sag limbik pay"],
    },
    note: {
      en: "Cingulate and parahippocampal cortex of the right hemisphere, the cortical ring of the limbic system.",
      az: "Sağ yarımkürənin singulyat və parahippokampal qabığı, limbik sistemin qabıq halqası.",
    },
  },
  {
    id: "ctx-limbic-l",
    viewer: "cerebral-cortex",
    mesh: "Limbic_lobe.l",
    name: { en: "Limbic lobe, left", az: "Sol limbik pay" },
    accept: {
      en: ["left limbic lobe", "limbic lobe left", "left limbic cortex"],
      az: ["sol limbik pay"],
    },
    note: {
      en: "Left cingulate and parahippocampal cortex. The same limbic ring, biased toward verbal memory and language-tinged affect.",
      az: "Sol singulyat və parahippokampal qabıq. Eyni limbik halqa, verbal yaddaş və dilə boyanmış affektə meyilli.",
    },
  },

  /* ---------- visual pathway (meshes from visual-pathway/visualPathwayManifest.js) ---------- */
  {
    id: "vis-eyeball-r",
    viewer: "visual-pathway",
    mesh: "11_Eyeball_posterior_R",
    name: { en: "Eyeball (posterior), right", az: "Sağ göz alması (arxa)" },
    accept: {
      en: ["eyeball", "eye", "globe", "right eye", "posterior eyeball"],
      az: ["göz alması", "sağ göz", "göz", "sag goz almasi"],
    },
    note: {
      en: "Posterior globe of the right eye, where the retina lines the inner surface and the optic nerve exits at the disc.",
      az: "Sağ gözün arxa alması: torlu qişa daxili səthi örtür və görmə siniri diskdən çıxır.",
    },
  },
  {
    id: "vis-retina-r",
    viewer: "visual-pathway",
    mesh: "01_Retina_R",
    name: { en: "Retina, right", az: "Sağ torlu qişa (retina)" },
    accept: {
      en: ["retina", "right retina"],
      az: ["torlu qişa", "retina", "sağ retina", "sağ torlu qişa"],
    },
    note: {
      en: "Photoreceptor sheet of the right eye. Detachment and vascular occlusion here are ophthalmologic emergencies that the Brain Bee still expects you to localise.",
      az: "Sağ gözün fotoreseptor təbəqəsi. Burada qopma və damar tutulması oftalmoloji təcili hallardır, Brain Bee hələ də lokalizasiyasını gözləyir.",
    },
  },
  {
    id: "vis-optic-n-r",
    viewer: "visual-pathway",
    mesh: "02_Optic_nerve_II_R",
    name: { en: "Optic nerve (CN II), right", az: "Sağ görmə siniri (II)" },
    accept: {
      en: ["right optic nerve", "right cn ii", "right nervus opticus"],
      az: ["sağ görmə siniri", "sağ ii kəllə siniri"],
    },
    note: {
      en: "Right optic nerve from disc to chiasm. Neuritis here dims that eye and hurts on movement; papilloedema is a disc sign of raised pressure.",
      az: "Diskdən xiazmaya sağ görmə siniri. Buradakı nevrit o gözü tutuludur və hərəkətdə ağrıdır; papilloödem təzyiq artımının disk əlamətidir.",
    },
  },
  {
    id: "vis-optic-n-l",
    viewer: "visual-pathway",
    mesh: "02_Optic_nerve_II_L",
    name: { en: "Optic nerve (CN II), left", az: "Sol görmə siniri (II)" },
    accept: {
      en: ["left optic nerve", "left cn ii"],
      az: ["sol görmə siniri"],
    },
    note: {
      en: "Left optic nerve. A complete lesion blinds the left eye; the swinging-flashlight test shows a relative afferent pupillary defect.",
      az: "Sol görmə siniri. Tam zədə sol gözü kor edir; yellənən fənər testi nisbi afferent bəbək defektini göstərir.",
    },
  },
  {
    id: "vis-chiasm-r",
    viewer: "visual-pathway",
    mesh: "03_Optic_chiasm_R",
    name: { en: "Optic chiasm, right", az: "Sağ görmə xiazması" },
    accept: {
      en: ["right optic chiasm", "right chiasm", "right optic chiasma"],
      az: ["sağ görmə xiazması", "sağ xiazma", "sağ optik xiazma"],
    },
    note: {
      en: "Crossing of nasal retinal fibres. A pituitary mass compressing the chiasm classically cuts the bitemporal fields.",
      az: "Nazal retinal liflərin çarpazı. Xiazmanı sıxan hipofiz kütləsi klassik olaraq bitemporal sahələri kəsir.",
    },
  },
  {
    id: "vis-chiasm-l",
    viewer: "visual-pathway",
    mesh: "03_Optic_chiasm_L",
    name: { en: "Optic chiasm, left", az: "Sol görmə xiazması" },
    accept: {
      en: ["left optic chiasm", "left chiasm"],
      az: ["sol görmə xiazması", "sol xiazma"],
    },
    note: {
      en: "Left half of the chiasm in this atlas (the model splits the crossing). Together the two halves are one chiasm sitting above the pituitary.",
      az: "Bu atlasda xiazmanın sol yarısı (model çarpazı bölür). İki yarı birlikdə hipofizin üstündəki tək xiazmadır.",
    },
  },
  {
    id: "vis-tract-r",
    viewer: "visual-pathway",
    mesh: "04_Optic_tract_R",
    name: { en: "Optic tract, right", az: "Sağ görmə trakti" },
    accept: {
      en: ["optic tract", "right optic tract"],
      az: ["görmə trakti", "sağ görmə trakti"],
    },
    note: {
      en: "Post-chiasmatic fibres to the right LGN. Damage yields a left homonymous hemianopia.",
      az: "Xiazmadan sonra sağ LGN-ə liflər. Zədə sol homonim hemianopiya verir.",
    },
  },
  {
    id: "vis-lgn-r",
    viewer: "visual-pathway",
    mesh: "05_Lateral_geniculate_body_R",
    name: { en: "Lateral geniculate body, right", az: "Sağ lateral dizəbənzər cisim" },
    accept: {
      en: [
        "right lateral geniculate",
        "right lateral geniculate body",
        "right lateral geniculate nucleus",
        "right lgn",
      ],
      az: ["sağ lateral dizəbənzər cisim", "sağ lgn", "sağ lateral genikulyat"],
    },
    note: {
      en: "Thalamic visual relay. Six layers keep the two eyes apart before the optic radiations head for calcarine cortex.",
      az: "Talamik görmə ötürücüsü. Altı təbəqə optik radiasiyalar mahmız qabığa getməzdən əvvəl iki gözü ayrı saxlayır.",
    },
  },
  {
    id: "vis-lgn-l",
    viewer: "visual-pathway",
    mesh: "05_Lateral_geniculate_body_L",
    name: { en: "Lateral geniculate body, left", az: "Sol lateral dizəbənzər cisim" },
    accept: {
      en: ["left lateral geniculate", "left lgn"],
      az: ["sol lateral dizəbənzər cisim", "sol lgn", "sol lateral genikulyat"],
    },
    note: {
      en: "Left LGN. A lesion here or in the incoming tract gives a right homonymous field cut.",
      az: "Sol LGN. Burada və ya gələn traktda zədə sağ homonim sahə kəsiyi verir.",
    },
  },
  {
    id: "vis-sc-r",
    viewer: "visual-pathway",
    mesh: "06_Superior_colliculus_R",
    name: { en: "Superior colliculus, right", az: "Sağ yuxarı təpəcik" },
    accept: {
      en: ["superior colliculus", "right superior colliculus", "colliculus superior"],
      az: ["yuxarı təpəcik", "sağ yuxarı təpəcik", "superior kollikulus"],
    },
    note: {
      en: "Midbrain roof map that orients the eyes and head toward a new visual (or auditory) event; not the conscious seeing pathway.",
      az: "Gözü və başı yeni görmə (və ya eşitmə) hadisəsinə çevirən orta beyin damı xəritəsi; şüurlu görmə yolu deyil.",
    },
  },
  {
    id: "vis-v1-r",
    viewer: "visual-pathway",
    mesh: "07_Primary_visual_cortex_V1_R",
    name: { en: "Primary visual cortex (V1), right", az: "Sağ birincili görmə qabığı (V1)" },
    accept: {
      en: [
        "right primary visual cortex",
        "right v1",
        "right striate cortex",
        "right calcarine cortex",
      ],
      az: ["sağ birincili görmə qabığı", "sağ v1", "sağ striar qabıq"],
    },
    note: {
      en: "Calcarine cortex of the right occipital lobe. A lesion here gives a left homonymous hemianopia, often with macular sparing if the occipital pole is fed by MCA.",
      az: "Sağ oksipital payın mahmız qabığı. Buradakı zədə sol homonim hemianopiya verir, oksipital qütb MCA-dan qidalanırsa tez-tez makula qorunması ilə.",
    },
  },
  {
    id: "vis-v1-l",
    viewer: "visual-pathway",
    mesh: "07_Primary_visual_cortex_V1_L",
    name: { en: "Primary visual cortex (V1), left", az: "Sol birincili görmə qabığı (V1)" },
    accept: {
      en: ["left primary visual cortex", "left v1", "left striate cortex"],
      az: ["sol birincili görmə qabığı", "sol v1", "sol striar qabıq"],
    },
    note: {
      en: "Left V1. Damage blinds the right half of both visual fields; alexia without agraphia needs the splenium plus this cortex on the left.",
      az: "Sol V1. Zədə hər iki görmə sahəsinin sağ yarısını kor edir; aqrafiyasız aleksiya solda splenium plus bu qabığı tələb edir.",
    },
  },
  {
    id: "vis-cuneus-r",
    viewer: "visual-pathway",
    mesh: "08_Cuneus_R",
    name: { en: "Cuneus, right", az: "Sağ kuneus" },
    accept: {
      en: ["cuneus", "right cuneus"],
      az: ["kuneus", "sağ kuneus"],
    },
    note: {
      en: "Wedge of cortex above the calcarine sulcus representing the lower visual field.",
      az: "Mahmız şırımın üstündə aşağı görmə sahəsini təmsil edən qabıq pazı.",
    },
  },
  {
    id: "vis-lingual-r",
    viewer: "visual-pathway",
    mesh: "09_Lingual_gyrus_R",
    name: { en: "Lingual gyrus, right", az: "Sağ lingual qırışıq" },
    accept: {
      en: ["lingual gyrus", "right lingual gyrus"],
      az: ["lingual qırışıq", "sağ lingual qırışıq"],
    },
    note: {
      en: "Gyrus below the calcarine sulcus representing the upper visual field; lingual lesions can also disturb colour and word form.",
      az: "Mahmız şırımın altında yuxarı görmə sahəsini təmsil edən qırışıq; lingual zədələr rəng və söz formasını da poza bilər.",
    },
  },
  {
    id: "vis-pole-r",
    viewer: "visual-pathway",
    mesh: "10_Occipital_pole_R",
    name: { en: "Occipital pole, right", az: "Sağ oksipital qütb" },
    accept: {
      en: ["occipital pole", "right occipital pole"],
      az: ["oksipital qütb", "sağ oksipital qütb", "ense qutbu"],
    },
    note: {
      en: "Tip of the occipital lobe, macular vision. Dual MCA/PCA supply is why a PCA infarct often spares central vision.",
      az: "Oksipital payın ucu, makula görməsi. İkili MCA/PCA qidalanması PCA infarktının mərkəzi görməni tez-tez qorumasının səbəbidir.",
    },
  },

  /* ---------- ear pathway (meshes from ear-pathway/earPathwayManifest.js) ---------- */
  {
    id: "ear-auricle-r",
    viewer: "ear-pathway",
    mesh: "01_Auricle_external_ear_R",
    name: { en: "Auricle (pinna), right", az: "Sağ qulaq seyvanı (aurikula)" },
    accept: {
      en: ["auricle", "pinna", "external ear", "right auricle", "right pinna"],
      az: ["qulaq seyvanı", "aurikula", "sağ seyvan", "xarici qulaq"],
    },
    note: {
      en: "Cartilaginous collector that funnels sound into the external acoustic meatus. It also helps you tell whether a sound came from in front or behind.",
      az: "Səsi xarici eşitmə kanalına yönəldən qığırdaqlı toplayıcı. Səsin öndən və ya arxadan gəldiyini ayırd etməyə də kömək edir.",
    },
  },
  {
    id: "ear-tympanic",
    viewer: "ear-pathway",
    mesh: "02_Tympanic_membrane",
    name: { en: "Tympanic membrane", az: "Təbil pərdəsi" },
    accept: {
      en: ["tympanic membrane", "eardrum", "drum", "membrana tympanica"],
      az: ["təbil pərdəsi", "qulaq pərdəsi", "tebil perdesi"],
    },
    note: {
      en: "The eardrum. It converts air pressure waves into ossicular motion; perforation and otitis media are the everyday lesions.",
      az: "Qulaq pərdəsi. Hava təzyiq dalğalarını sümükcük hərəkətinə çevirir; perforasiya və otitis media gündəlik zədələrdir.",
    },
  },
  {
    id: "ear-malleus",
    viewer: "ear-pathway",
    mesh: "03_Malleus",
    name: { en: "Malleus", az: "Çəkic (malleus)" },
    accept: {
      en: ["malleus", "hammer"],
      az: ["çəkic", "malleus", "cekic"],
    },
    note: {
      en: "First ossicle, handle attached to the drum. Cholesteatoma and chronic otitis can erode it.",
      az: "Birinci sümükcük, dəstəyi pərdəyə yapışıqdır. Xolesteatoma və xroniki otit onu eroziya edə bilər.",
    },
  },
  {
    id: "ear-incus",
    viewer: "ear-pathway",
    mesh: "04_Incus",
    name: { en: "Incus", az: "Zindan (incus)" },
    accept: {
      en: ["incus", "anvil"],
      az: ["zindan", "incus"],
    },
    note: {
      en: "Middle ossicle bridging malleus to stapes. Its long process is fragile and a common site of conductive-loss discontinuity.",
      az: "Çəkici üzəngiyə bağlayan orta sümükcük. Uzun çıxıntısı kövrəkdir və keçirici eşitmə itkisində tez-tez qırılan yerdir.",
    },
  },
  {
    id: "ear-stapes",
    viewer: "ear-pathway",
    mesh: "05_Stapes",
    name: { en: "Stapes", az: "Üzəngi (stapes)" },
    accept: {
      en: ["stapes", "stirrup"],
      az: ["üzəngi", "stapes", "uzengi"],
    },
    note: {
      en: "Footplate in the oval window. Otosclerosis fixes it and causes a conductive loss treated by stapedotomy.",
      az: "Oval pəncərədəki taban. Otoskleroz onu bərkidir və stapedotomiya ilə müalicə olunan keçirici itki verir.",
    },
  },
  {
    id: "ear-vestibule",
    viewer: "ear-pathway",
    mesh: "06_Vestibule_oval_window",
    name: { en: "Vestibule (oval window)", az: "Dəhliz (oval pəncərə)" },
    accept: {
      en: ["vestibule", "oval window", "fenestra ovalis", "vestibule of the ear"],
      az: ["dəhliz", "oval pəncərə", "qulaq dəhlizi", "dehliz"],
    },
    note: {
      en: "Central bony chamber of the labyrinth where the stapes footplate meets perilymph; it opens into cochlea and semicircular canals.",
      az: "Labirintin mərkəzi sümük kamerası: üzəngi tabanı perilimfa ilə görüşür; ilbizə və yarımdairəvi kanallara açılır.",
    },
  },
  {
    id: "ear-cochlea",
    viewer: "ear-pathway",
    mesh: "07_Cochlea",
    name: { en: "Cochlea", az: "İlbiz (koxlea)" },
    accept: {
      en: ["cochlea", "cochlear labyrinth"],
      az: ["ilbiz", "koxlea", "qulaq ilbizi"],
    },
    note: {
      en: "Spiral organ of Corti. Base codes high frequencies, apex low; hair-cell loss here is the usual sensorineural hearing loss of ageing and noise.",
      az: "Korti orqanının spirali. Təməli yüksək, zirvəsi alçaq tezlikləri kodlayır; burada tük hüceyrə itkisi yaşlanma və səs-küyün adi sensorineyral eşitmə itkisidir.",
    },
  },
  {
    id: "ear-iam",
    viewer: "ear-pathway",
    mesh: "18_Internal_acoustic_meatus_R_approx",
    name: { en: "Internal acoustic meatus", az: "Daxili eşitmə kanalı" },
    accept: {
      en: ["internal acoustic meatus", "internal auditory meatus", "iam", "internal auditory canal"],
      az: ["daxili eşitmə kanalı", "daxili akustik kanal", "iam"],
    },
    note: {
      en: "Bony canal through the petrous bone for CN VII and VIII. An expanding vestibular schwannoma here is the classic CPA mass.",
      az: "VII və VIII sinirlər üçün petroz sümükdən keçən kanal. Burada böyüyən vestibular şvannoma klassik serebellopontin bucaq kütləsidir.",
    },
  },
  {
    id: "ear-cochlear-n",
    viewer: "ear-pathway",
    mesh: "08_Cochlear_nerve",
    name: { en: "Cochlear nerve", az: "İlbiz siniri (koxlear)" },
    accept: {
      en: ["cochlear nerve", "auditory nerve", "nervus cochlearis"],
      az: ["ilbiz siniri", "koxlear sinir", "eşitmə siniri"],
    },
    note: {
      en: "Spiral-ganglion axons from the organ of Corti, joining vestibular fibres as CN VIII.",
      az: "Korti orqanından spiral qanqlion aksonları, vestibular liflərlə VIII sinir kimi birləşir.",
    },
  },
  {
    id: "ear-cn-viii",
    viewer: "ear-pathway",
    mesh: "09_Vestibulocochlear_nerve_VIII",
    name: { en: "Vestibulocochlear nerve (CN VIII)", az: "Dəhliz-ilbiz siniri (VIII)" },
    accept: {
      en: ["vestibulocochlear nerve", "cn viii", "eighth cranial nerve", "acoustic nerve"],
      az: ["dəhliz-ilbiz siniri", "viii kəllə siniri", "vestibulokoxlear sinir"],
    },
    note: {
      en: "Hearing plus balance into the pontomedullary junction. Schwannoma, fracture of the IAM and meningitis can all hit it.",
      az: "Eşitmə plus müvazinət ponto-medulyar birləşməyə. Şvannoma, IAM sınığı və meningit hamısı onu tuta bilər.",
    },
  },
  {
    id: "ear-cochlear-nuclei",
    viewer: "ear-pathway",
    mesh: "10_Cochlear_nuclei_brainstem",
    name: { en: "Cochlear nuclei", az: "Koxlear nüvələr" },
    accept: {
      en: ["cochlear nuclei", "cochlear nucleus", "nucleus cochlearis"],
      az: ["koxlear nüvələr", "ilbiz nüvələri", "koxlear nuve"],
    },
    note: {
      en: "First brainstem relay of hearing, draped on the inferior cerebellar peduncle. Almost every later auditory station is already binaural; a lesion here can still be one-sided.",
      az: "Eşitmənin ilk beyin sapı ötürücüsü, aşağı beyincik ayaqcığına örtülüb. Sonrakı stansiyaların demək olar ki, hamısı artıq ikiqulaqlıdır; buradakı zədə hələ də birtərəfli ola bilər.",
    },
  },
  {
    id: "ear-soc",
    viewer: "ear-pathway",
    mesh: "11_Superior_olivary_complex",
    name: { en: "Superior olivary complex", az: "Yuxarı zeytun kompleksi" },
    accept: {
      en: ["superior olivary complex", "superior olive", "soc"],
      az: ["yuxarı zeytun kompleksi", "yuxarı oliya", "superior zeytun"],
    },
    note: {
      en: "First major binaural comparator in the pons, computing interaural time and level differences for sound localisation.",
      az: "Ponsda səs lokalizasiyası üçün qulaqlararası vaxt və səviyyə fərqlərini hesablayan ilk əsas ikiqulaqlı müqayisəçi.",
    },
  },
  {
    id: "ear-ic",
    viewer: "ear-pathway",
    mesh: "12_Inferior_colliculus",
    name: { en: "Inferior colliculus", az: "Aşağı təpəcik" },
    accept: {
      en: ["inferior colliculus", "inferior colliculi", "colliculus inferior"],
      az: ["aşağı təpəcik", "inferior kollikulus", "asagi tepecik"],
    },
    note: {
      en: "Obligatory midbrain auditory hub on the way to the medial geniculate body; almost all ascending sound traffic stops here.",
      az: "Medial dizəbənzər cismə gedən yolda məcburi orta beyin eşitmə düyünü; qalxan səs trafğinin demək olar ki, hamısı burada dayanır.",
    },
  },
  {
    id: "ear-mgb",
    viewer: "ear-pathway",
    mesh: "13_Medial_geniculate_body",
    name: { en: "Medial geniculate body", az: "Medial dizəbənzər cisim" },
    accept: {
      en: ["medial geniculate", "medial geniculate body", "medial geniculate nucleus", "mgb"],
      az: ["medial dizəbənzər cisim", "mgb", "medial genikulyat"],
    },
    note: {
      en: "Thalamic auditory relay to Heschl's gyri. A lesion can mute contralateral sound without deafening the ear itself.",
      az: "Heschl qırışıqlarına talamik eşitmə ötürücüsü. Zədə qulağın özünü kar etmədən əks tərəf səsi susdura bilər.",
    },
  },
  {
    id: "ear-auditory-ctx",
    viewer: "ear-pathway",
    mesh: "14_Auditory_cortex_transverse_temporal_gyri",
    name: { en: "Auditory cortex (Heschl's gyri)", az: "Eşitmə qabığı (Heschl qırışıqları)" },
    accept: {
      en: ["auditory cortex", "primary auditory cortex", "heschl", "heschl's gyrus", "transverse temporal gyri", "a1"],
      az: ["eşitmə qabığı", "birincili eşitmə qabığı", "heschl", "heschl qırışıqları"],
    },
    note: {
      en: "Transverse temporal gyri on the superior temporal plane. Left-sided damage can contribute to pure word deafness; bilateral damage is cortical deafness.",
      az: "Yuxarı temporal müstəvidə köndələn temporal qırışıqlar. Sol zədə təmiz söz karlığına töhfə verə bilər; ikitərəfli zədə kortikal karlıqdır.",
    },
  },

  /* ---------- diencephalon (meshes from diencephalon/diencephalonManifest.js) ---------- */
  {
    id: "di-thalamus-l",
    viewer: "diencephalon",
    mesh: "01_Thalamus_L",
    name: { en: "Thalamus, left", az: "Sol talamus" },
    accept: {
      en: ["left thalamus"],
      az: ["sol talamus"],
    },
    note: {
      en: "Left thalamic relay to cortex. Paramedian infarct can produce hypersomnolence and an amnestic confusional state.",
      az: "Qabığa sol talamik ötürücü. Paramedian infarkt hipersomnolensiya və amnestik konfuzional vəziyyət verə bilər.",
    },
  },
  {
    id: "di-thalamus-r",
    viewer: "diencephalon",
    mesh: "01_Thalamus_R",
    name: { en: "Thalamus, right", az: "Sağ talamus" },
    accept: {
      en: ["right thalamus"],
      az: ["sağ talamus"],
    },
    note: {
      en: "Right thalamus. Posterolateral (thalamogeniculate) stroke is the usual Dejerine–Roussy pain syndrome of the opposite body.",
      az: "Sağ talamus. Posterolateral (talamogenikulyat) insult əks bədənin adi Dejerine–Roussy ağrı sindromudur.",
    },
  },
  {
    id: "di-hypothalamus",
    viewer: "diencephalon",
    mesh: "02_Hypothalamus",
    name: { en: "Hypothalamus", az: "Hipotalamus" },
    accept: {
      en: ["hypothalamus"],
      az: ["hipotalamus"],
    },
    note: {
      en: "Walls and floor of the third ventricle: temperature, appetite, osmolality, circadian clock and pituitary releasing factors.",
      az: "Üçüncü mədəciyin divarları və dibi: temperatur, iştaha, osmolallıq, sirkadian saat və hipofiz azadedici faktorları.",
    },
  },
  {
    id: "di-mammillary-l",
    viewer: "diencephalon",
    mesh: "03_Mammillary_body_L",
    name: { en: "Mammillary body, left", az: "Sol məməyəbənzər cisim" },
    accept: {
      en: ["left mammillary body", "left mamillary body"],
      az: ["sol məməyəbənzər cisim", "sol mamillar cisim"],
    },
    note: {
      en: "Left mammillary body on the Papez circuit. Wernicke–Korsakoff haemorrhages here from thiamine deficiency.",
      az: "Papez dövrəsində sol məməyəbənzər cisim. Tiamin çatışmazlığından Wernicke–Korsakoff qanaxmaları burada olur.",
    },
  },
  {
    id: "di-mammillary-r",
    viewer: "diencephalon",
    mesh: "03_Mammillary_body_R",
    name: { en: "Mammillary body, right", az: "Sağ məməyəbənzər cisim" },
    accept: {
      en: ["right mammillary body", "right corpus mamillare"],
      az: ["sağ məməyəbənzər cisim"],
    },
    note: {
      en: "Right hypothalamic mammillary nucleus, a landmark on sagittal MRI just behind the pituitary stalk.",
      az: "Sağ hipotalamik məməyəbənzər nüvə, saggital MRT-də hipofiz ayaqcığının dərhal arxasında nişan.",
    },
  },
  {
    id: "di-habenula",
    viewer: "diencephalon",
    mesh: "04_Habenula",
    name: { en: "Habenula", az: "Habenula" },
    accept: {
      en: ["habenula", "habenular nuclei"],
      az: ["habenula", "habenulyar nüvə"],
    },
    note: {
      en: "Epithalamic pair that reports negative reward prediction to midbrain monoamine cells; a depression-research target.",
      az: "Orta beyin monoamin hüceyrələrinə mənfi mükafat proqnozunu bildirən epitalamik cüt; depressiya tədqiqatı hədəfi.",
    },
  },
  {
    id: "di-lgn-l",
    viewer: "diencephalon",
    mesh: "05_Lateral_geniculate_body_L",
    name: { en: "Lateral geniculate body, left", az: "Sol lateral dizəbənzər cisim" },
    accept: {
      en: ["left lateral geniculate", "left lgn", "left lateral geniculate body"],
      az: ["sol lateral dizəbənzər cisim", "sol lgn"],
    },
    note: {
      en: "Left visual thalamus. Six layers keep the eyes segregated before radiations leave for calcarine cortex.",
      az: "Sol görmə talamusu. Radiasiyalar mahmız qabığa getməzdən əvvəl altı təbəqə gözləri ayrı saxlayır.",
    },
  },
  {
    id: "di-lgn-r",
    viewer: "diencephalon",
    mesh: "05_Lateral_geniculate_body_R",
    name: { en: "Lateral geniculate body, right", az: "Sağ lateral dizəbənzər cisim" },
    accept: {
      en: ["right lateral geniculate", "right lgn", "right lateral geniculate body"],
      az: ["sağ lateral dizəbənzər cisim", "sağ lgn"],
    },
    note: {
      en: "Right LGN. A lesion here or in the optic tract gives a left homonymous hemianopia.",
      az: "Sağ LGN. Burada və ya görmə traktında zədə sol homonim hemianopiya verir.",
    },
  },
  {
    id: "di-mgn-l",
    viewer: "diencephalon",
    mesh: "06_Medial_geniculate_body_L",
    name: { en: "Medial geniculate body, left", az: "Sol medial dizəbənzər cisim" },
    accept: {
      en: ["left medial geniculate", "left mgb"],
      az: ["sol medial dizəbənzər cisim", "sol mgb"],
    },
    note: {
      en: "Left auditory thalamus, last station before Heschl's gyri.",
      az: "Sol eşitmə talamusu, Heschl qırışıqlarından əvvəl son stansiya.",
    },
  },
  {
    id: "di-mgn-r",
    viewer: "diencephalon",
    mesh: "06_Medial_geniculate_body_R",
    name: { en: "Medial geniculate body, right", az: "Sağ medial dizəbənzər cisim" },
    accept: {
      en: ["right medial geniculate", "right mgb"],
      az: ["sağ medial dizəbənzər cisim", "sağ mgb"],
    },
    note: {
      en: "Right medial geniculate body tucked under the pulvinar.",
      az: "Pulvinarın altında gizlənmiş sağ medial dizəbənzər cisim.",
    },
  },
  {
    id: "di-chiasm-r",
    viewer: "diencephalon",
    mesh: "07_Optic_chiasm_R",
    name: { en: "Optic chiasm, right", az: "Sağ görmə xiazması" },
    accept: {
      en: ["optic chiasm", "chiasm", "right optic chiasm"],
      az: ["görmə xiazması", "xiazma", "sağ xiazma"],
    },
    note: {
      en: "Right half of the chiasm in this split model, sitting above the pituitary. Compression here is the bitemporal story.",
      az: "Bu bölünmüş modeldə xiazmanın sağ yarısı, hipofizin üstündə. Burada sıxılma bitemporal hekayədir.",
    },
  },
  {
    id: "di-stria-r",
    viewer: "diencephalon",
    mesh: "09_Stria_medullaris_R",
    name: { en: "Stria medullaris, right", az: "Sağ stria medullaris" },
    accept: {
      en: ["stria medullaris", "stria medullaris thalami"],
      az: ["stria medullaris", "sağ stria medullaris"],
    },
    note: {
      en: "Ridge on the right thalamus taking septal and hypothalamic fibres to the habenula.",
      az: "Septal və hipotalamik lifləri habenulaya aparan sağ talamus silsiləsi.",
    },
  },
  {
    id: "di-post-comm",
    viewer: "diencephalon",
    mesh: "10_Posterior_commissure",
    name: { en: "Posterior commissure", az: "Arxa komissura" },
    accept: {
      en: ["posterior commissure", "commissura posterior"],
      az: ["arxa komissura", "posterior komissura"],
    },
    note: {
      en: "Crossing at the third-ventricle–aqueduct junction for the consensual pupillary light reflex. Involved in Parinaud syndrome when the tectum is compressed.",
      az: "Razılaşmış işıq refleksi üçün üçüncü mədəcik–su kəməri birləşməsindəki çarpaz. Tektum sıxılanda Parinaud sindromunda iştirak edir.",
    },
  },
  {
    id: "di-third-vent",
    viewer: "diencephalon",
    mesh: "11_Third_ventricle",
    name: { en: "Third ventricle", az: "Üçüncü mədəcik" },
    accept: {
      en: ["third ventricle", "3rd ventricle", "ventriculus tertius"],
      az: ["üçüncü mədəcik", "3 cu mədəcik"],
    },
    note: {
      en: "Midline CSF slit whose walls are thalamus and hypothalamus. A colloid cyst at the foramina of Monro is the feared sudden obstruction.",
      az: "Divarları talamus və hipotalamus olan orta xətt maye yarığı. Monro dəliklərindəki kolloid kista qorxulan qəfil tutulmadır.",
    },
  },

  /* ---------- basal ganglia (meshes from basal-ganglia/basalGangliaManifest.js; 7 real nuclei) ---------- */
  {
    id: "bg-caudate",
    viewer: "basal-ganglia",
    mesh: "Caudate_nucleus",
    name: { en: "Caudate nucleus", az: "Kaudat nüvə" },
    accept: {
      en: ["caudate", "caudate nucleus", "nucleus caudatus"],
      az: ["kaudat", "kaudat nüvə", "kaudat nuve"],
    },
    note: {
      en: "C-shaped striatum along the lateral ventricle, input station with the putamen. Head atrophy with boxy frontal horns is Huntington disease on imaging.",
      az: "Yan mədəcik boyunca C-şəkilli striatum, putamen ilə giriş stansiyası. Kvadrat frontal buynuzlarla baş atrofiyası görüntüləmədə Hantinqton xəstəliyidir.",
    },
  },
  {
    id: "bg-putamen",
    viewer: "basal-ganglia",
    mesh: "Putamen",
    name: { en: "Putamen", az: "Putamen" },
    accept: {
      en: ["putamen"],
      az: ["putamen"],
    },
    note: {
      en: "Lateral striatum, the main sensorimotor input. Classic site of hypertensive haemorrhage and of rigidity in some parkinsonian syndromes.",
      az: "Yan striatum, əsas sensorimotor giriş. Hipertenziv qanaxmanın və bəzi parkinsonian sindromlarda rigidliyin klassik yeridir.",
    },
  },
  {
    id: "bg-gp",
    viewer: "basal-ganglia",
    mesh: "Globus_pallidus",
    name: { en: "Globus pallidus", az: "Globus pallidus (solğun cisim)" },
    accept: {
      en: ["globus pallidus", "pallidum", "gp", "pale globe"],
      az: ["globus pallidus", "solğun cisim", "pallidum"],
    },
    note: {
      en: "Medial lentiform output (GPe/GPi). GPi stimulation and pallidotomy treat dystonia and Parkinson motor complications.",
      az: "Medial lentiform çıxış (GPe/GPi). GPi stimulyasiyası və pallidotomiya distoniya və Parkinson motor fəsadlarını müalicə edir.",
    },
  },
  {
    id: "bg-stn",
    viewer: "basal-ganglia",
    mesh: "Subthalamic_nucleus",
    name: { en: "Subthalamic nucleus", az: "Subtalamik nüvə" },
    accept: {
      en: ["subthalamic nucleus", "stn", "corpus luysi", "luys"],
      az: ["subtalamik nüvə", "stn", "lyuis cisimi"],
    },
    note: {
      en: "Drive to GPi in the indirect pathway. An STN lesion produces contralateral hemiballismus; it is also a standard deep-brain-stimulation target in Parkinson disease.",
      az: "Dolayı yolda GPi-yə ötürücü. STN zədəsi əks tərəf hemiballizm verir; Parkinson xəstəliyində də standart dərin beyin stimulyasiyası hədəfidir.",
    },
  },
  {
    id: "bg-sn",
    viewer: "basal-ganglia",
    mesh: "Substantia_nigra",
    name: { en: "Substantia nigra", az: "Qara substansiya (substantia nigra)" },
    accept: {
      en: ["substantia nigra", "sn", "black substance"],
      az: ["qara substansiya", "substantia nigra", "qara madde"],
    },
    note: {
      en: "Midbrain dopamine source to striatum. Pars compacta cell loss is Parkinson's disease; the mesh sits with the basal-ganglia set because it is the circuit's modulator, not a telencephalic nucleus.",
      az: "Striatuma orta beyin dopamin mənbəyi. Pars compacta hüceyrə itkisi Parkinson xəstəliyidir; mesh bazal qanqliya dəstindədir, çünki dövrənin modulatorudur, telensefalik nüvə deyil.",
    },
  },
  {
    id: "bg-pag",
    viewer: "basal-ganglia",
    mesh: "Periaqueductal_grey",
    name: { en: "Periaqueductal grey", az: "Periakeduktal boz maddə (PAG)" },
    accept: {
      en: ["periaqueductal grey", "periaqueductal gray", "pag", "central grey"],
      az: ["periakeduktal boz maddə", "pag", "su kəməri ətrafı boz"],
    },
    note: {
      en: "Midbrain grey around the aqueduct for pain modulation and defensive behaviour. Not a classical basal ganglion; included as a neighbour on this model, not as striatum.",
      az: "Ağrı modulyasiyası və müdafiə davranışı üçün su kəməri ətrafındakı orta beyin bozu. Klassik bazal qanqliya deyil; bu modeldə qonşu kimi daxildir, striatum kimi yox.",
    },
  },

  /* ---------- cerebellum (meshes from cerebellum/cerebellumManifest.js; SUIT names, no fake lingula) ---------- */
  {
    id: "cb-culmen",
    viewer: "cerebellum",
    mesh: "Culmen",
    name: { en: "Culmen", az: "Culmen (ön vermis I–IV)" },
    accept: {
      en: ["culmen", "anterior vermis", "vermis i iv"],
      az: ["culmen", "ön vermis", "kulmen"],
    },
    note: {
      en: "Peak of the superior vermis. In this atlas the mesh is SUIT lobules I–IV at the midline, so it also contains the lingula and central lobule — those are not separate objects here. Anterior-lobe degeneration (classically alcohol) hits this region and unsteadies gait.",
      az: "Yuxarı vermisin zirvəsi. Bu atlasda mesh orta xətt SUIT I–IV lobullarıdır, ona görə lingula və mərkəzi lobulu da ehtiva edir — onlar burada ayrı obyekt deyil. Ön pay degenerasiyası (klassik olaraq alkoqol) bu bölgəni tutur və yerişi pozur.",
    },
  },
  {
    id: "cb-wing",
    viewer: "cerebellum",
    mesh: "Wing_of_central_lobule",
    name: { en: "Wing of the central lobule", az: "Mərkəzi lobulun qanadı" },
    accept: {
      en: ["wing of central lobule", "ala lobuli centralis", "wings of the central lobule"],
      az: ["mərkəzi lobulun qanadı", "ala lobuli centralis", "merkezi lobulun qanadi"],
    },
    note: {
      en: "Hemispheric partner of anterior vermis I–IV in this SUIT export. There is no separate central-lobule mesh; gait ataxia from anterior-lobe disease often involves these wings as well.",
      az: "Bu SUIT ixracında ön vermis I–IV-ün yarımkürə tərəfdaşı. Ayrı mərkəzi lobul meshi yoxdur; ön pay xəstəliyindən yeriş ataksiyası tez-tez bu qanadları da tutur.",
    },
  },
  {
    id: "cb-ant-quad",
    viewer: "cerebellum",
    mesh: "Anterior_quadrangular_lobule",
    name: { en: "Anterior quadrangular lobule", az: "Ön dördbucaqlı lobul" },
    accept: {
      en: ["anterior quadrangular lobule", "lobule v", "quadrangular lobule"],
      az: ["ön dördbucaqlı lobul", "on dordbucaqli lobul"],
    },
    note: {
      en: "Hemispheric anterior lobe (SUIT V), spinocerebellar. Alcohol-related degeneration and SCA infarct both like this superior surface.",
      az: "Yarımkürə ön payı (SUIT V), spinoserebellar. Alkoqolla bağlı degenerasiya və SCA infarktı hər ikisi bu yuxarı səthi sevir.",
    },
  },
  {
    id: "cb-declive",
    viewer: "cerebellum",
    mesh: "Declive",
    name: { en: "Declive", az: "Declive" },
    accept: {
      en: ["declive", "lobule vi", "vermis vi"],
      az: ["declive", "deklive"],
    },
    note: {
      en: "First posterior-lobe vermian lobule, just behind the primary fissure. Easy to name on mid-sagittal MRI.",
      az: "Birincili yarığın dərhal arxasında birinci posterior pay vermis lobulu. Orta saggital MRT-də asan adlandırılır.",
    },
  },
  {
    id: "cb-sup-semilunar",
    viewer: "cerebellum",
    mesh: "Superior_semilunar_lobule",
    name: { en: "Superior semilunar lobule (crus I)", az: "Yuxarı yarımaysal lobul (crus I)" },
    accept: {
      en: ["superior semilunar lobule", "crus i", "crus 1", "ansiform lobule"],
      az: ["yuxarı yarımaysal lobul", "crus i", "yuxari yarimaysal"],
    },
    note: {
      en: "Large neocerebellar crescent linked to association cortex. Hemisphere damage here gives ipsilateral arm dysmetria and intention tremor.",
      az: "Assosiasiya qabığına bağlı böyük neoserebellar aypara. Burada yarımkürə zədəsi ipsilateral qol dismetriyası və məqsədli tremor verir.",
    },
  },
  {
    id: "cb-inf-semilunar",
    viewer: "cerebellum",
    mesh: "Inferior_semilunar_lobule",
    name: { en: "Inferior semilunar lobule (crus II)", az: "Aşağı yarımaysal lobul (crus II)" },
    accept: {
      en: ["inferior semilunar lobule", "crus ii", "crus 2"],
      az: ["aşağı yarımaysal lobul", "crus ii", "asagi yarimaysal"],
    },
    note: {
      en: "Inferior–posterior hemisphere. PICA infarct classically involves crus II and can produce vertigo and ipsilateral limb ataxia without long-tract signs.",
      az: "Aşağı–arxa yarımkürə. PICA infarktı klassik olaraq crus II-ni tutur və uzun trakt əlamətləri olmadan vertigo və ipsilateral ətraf ataksiyası verə bilər.",
    },
  },
  {
    id: "cb-tonsil",
    viewer: "cerebellum",
    mesh: "Tonsil_of_cerebellum",
    name: { en: "Cerebellar tonsil", az: "Beyincik badamcığı (tonsil)" },
    accept: {
      en: ["tonsil", "cerebellar tonsil", "tonsilla cerebelli", "tonsil of cerebellum"],
      az: ["beyincik badamcığı", "tonsil", "serebellar tonsil"],
    },
    note: {
      en: "Inferior medial hemisphere that crowds the foramen magnum in Chiari I and in raised-pressure tonsillar herniation — a life-threatening downward shift.",
      az: "Chiari I-də və təzyiq artımında foramen magnumu sıxan aşağı medial yarımkürə — həyati təhlükəli aşağı sürüşmə.",
    },
  },
  {
    id: "cb-flocculus",
    viewer: "cerebellum",
    mesh: "Flocculus",
    name: { en: "Flocculus", az: "Flokkulus" },
    accept: {
      en: ["flocculus", "floccular lobe"],
      az: ["flokkulus", "flokulus"],
    },
    note: {
      en: "Vestibulocerebellar leaflet beside the CPA. There is no separate floccular-peduncle mesh in SUIT Anatom; this object is the flocculus itself. Lesions cause gaze-holding nystagmus.",
      az: "Serebellopontin bucağın yanındakı vestibuloserebellar lövhə. SUIT Anatom-da ayrı flokkulyar ayaqcıq meshi yoxdur; bu obyekt flokkulusun özüdür. Zədələr baxışı saxlayan nistagm verir.",
    },
  },
  {
    id: "cb-nodule",
    viewer: "cerebellum",
    mesh: "Nodule_of_vermis",
    name: { en: "Nodule of the vermis", az: "Vermisin düyünü (nodulus)" },
    accept: {
      en: ["nodule", "nodulus", "nodule of vermis", "vermis nodule"],
      az: ["vermis düyünü", "nodulus", "nodul"],
    },
    note: {
      en: "Midline vestibulocerebellum facing the fourth ventricle, partner of the flocculus. Medulloblastoma in children often starts in this neighbourhood.",
      az: "Dördüncü mədəciyə baxan orta xətt vestibuloserebellum, flokkulusun tərəfdaşı. Uşaqlarda medulloblastoma tez-tez bu ətrafda başlayır.",
    },
  },
  {
    id: "cb-uvula",
    viewer: "cerebellum",
    mesh: "Uvula_of_vermis",
    name: { en: "Uvula of the vermis", az: "Vermisin dilçəyi (uvula)" },
    accept: {
      en: ["uvula", "uvula of vermis", "vermis uvula"],
      az: ["vermis dilçəyi", "uvula", "dilcek"],
    },
    note: {
      en: "Inferior vermis above the nodule. Midline tumours and Chiari crowding both distort it toward the foramen magnum.",
      az: "Düyünün üstündəki aşağı vermis. Orta xətt şişləri və Chiari sıxlığı hər ikisi onu foramen magnuma doğru əyir.",
    },
  },
  {
    id: "cb-scp",
    viewer: "cerebellum",
    mesh: "Superior_cerebellar_peduncle",
    name: { en: "Superior cerebellar peduncle", az: "Yuxarı beyincik ayaqcığı" },
    accept: {
      en: ["superior cerebellar peduncle", "scp", "brachium conjunctivum"],
      az: ["yuxarı beyincik ayaqcığı", "yuxari beyincik ayaqciqi"],
    },
    note: {
      en: "Main cerebellar output to contralateral red nucleus and thalamus, decussating in the midbrain.",
      az: "Əks qırmızı nüvə və talamusa əsas beyincik çıxışı, orta beyində çarpazlaşır.",
    },
  },
  {
    id: "cb-mcp",
    viewer: "cerebellum",
    mesh: "Middle_cerebellar_peduncle",
    name: { en: "Middle cerebellar peduncle", az: "Orta beyincik ayaqcığı" },
    accept: {
      en: ["middle cerebellar peduncle", "mcp", "brachium pontis"],
      az: ["orta beyincik ayaqcığı", "orta beyincik ayaqciqi"],
    },
    note: {
      en: "Largest stalk, pontocerebellar fibres so the cerebellum can compare the movement cortex ordered with the one that happened.",
      az: "Ən böyük ayaqcıq, pontoserebellar liflər: beyincik qabığın əmr etdiyi hərəkəti baş verənlə müqayisə edir.",
    },
  },
  {
    id: "cb-icp",
    viewer: "cerebellum",
    mesh: "Inferior_cerebellar_peduncle",
    name: { en: "Inferior cerebellar peduncle", az: "Aşağı beyincik ayaqcığı" },
    accept: {
      en: ["inferior cerebellar peduncle", "icp", "restiform body"],
      az: ["aşağı beyincik ayaqcığı", "asagi beyincik ayaqciqi"],
    },
    note: {
      en: "Spinocerebellar and vestibular input from the medulla. Wallenberg (lateral medullary) infarct can involve it and add ipsilateral limb ataxia to the crossed face/body picture.",
      az: "Uzunsov beyindən spinoserebellar və vestibular giriş. Wallenberg (lateral medulyar) infarkt onu tutub çarpaz üz/bədən mənzərəsinə ipsilateral ətraf ataksiyası əlavə edə bilər.",
    },
  },
  {
    id: "cb-dentate",
    viewer: "cerebellum",
    mesh: "Dentate_nucleus",
    name: { en: "Dentate nucleus", az: "Dişli nüvə (nucleus dentatus)" },
    accept: {
      en: ["dentate", "dentate nucleus", "nucleus dentatus"],
      az: ["dişli nüvə", "dentat nüvə", "nucleus dentatus"],
    },
    note: {
      en: "Largest deep cerebellar nucleus, output of the neocerebellum through the superior peduncle. Hypertensive haemorrhage and SCA infarct both reach it.",
      az: "Ən böyük dərin beyincik nüvəsi, neoserebellumun yuxarı ayaqcıq vasitəsilə çıxışı. Hipertenziv qanaxma və SCA infarktı hər ikisi ona çatır.",
    },
  },
  {
    id: "cb-fastigial",
    viewer: "cerebellum",
    mesh: "Fastigial_nucleus",
    name: { en: "Fastigial nucleus", az: "Fastigial nüvə" },
    accept: {
      en: ["fastigial", "fastigial nucleus", "nucleus fastigii"],
      az: ["fastigial nüvə", "fastigial nuve"],
    },
    note: {
      en: "Midline deep nucleus of the vestibulocerebellum, driving axial and ocular postural circuits. Not a floccular peduncle — that subdivision is not in this atlas.",
      az: "Vestibuloserebellumun orta xətt dərin nüvəsi, ox və göz postural dövrələrini idarə edir. Flokkulyar ayaqcıq deyil — o bölgü bu atlasda yoxdur.",
    },
  },

  /* ---------- meninges (meshes from meninges/meningesManifest.js; 6 clickable, no pia/arachnoid) ---------- */
  {
    id: "men-falx",
    viewer: "meninges",
    mesh: "01_Falx_cerebri",
    name: { en: "Falx cerebri", az: "Falx serebri" },
    accept: {
      en: ["falx cerebri", "falx", "cerebral falx"],
      az: ["falx serebri", "falx", "beyin oraqı"],
    },
    note: {
      en: "Sickle of dura in the midline fissure between the hemispheres. A unilateral mass can shove cingulate gyrus under its free edge (subfalcine herniation) and pinch the anterior cerebral artery.",
      az: "Yarımkürələr arasında orta xətt yarığında duranın orağı. Birtərəfli kütlə sinqulyat qırışığı sərbəst kənarının altına itələyə bilər (subfalsin herniya) və ön beyin arteriyasını sıxa bilər.",
    },
  },
  {
    id: "men-tentorium-l",
    viewer: "meninges",
    mesh: "02_Tentorium_cerebelli_L",
    name: { en: "Tentorium cerebelli, left", az: "Sol tentorium serebelli" },
    accept: {
      en: [
        "left tentorium",
        "tentorium left",
        "left tentorium cerebelli",
        "tentorium cerebelli left",
        "left tentorial leaf",
      ],
      az: ["sol tentorium", "sol tentorium serebelli", "sol tentorial yarpaq"],
    },
    note: {
      en: "Left dural shelf between occipital lobe and cerebellum. Its free edge is half of the tentorial notch; uncal herniation through it blows the ipsilateral pupil (CN III) and can kink the PCA.",
      az: "Oksipital pay ilə beyincik arasında sol dural rəf. Sərbəst kənarı tentorial çentiğin yarısıdır; unkal herniya ipsilateral bəbəyi genişləndirir (III sinir) və PCA-nı qıra bilər.",
    },
  },
  {
    id: "men-tentorium-r",
    viewer: "meninges",
    mesh: "02_Tentorium_cerebelli_R",
    name: { en: "Tentorium cerebelli, right", az: "Sağ tentorium serebelli" },
    accept: {
      en: [
        "right tentorium",
        "tentorium right",
        "right tentorium cerebelli",
        "tentorium cerebelli right",
        "right tentorial leaf",
      ],
      az: [
        "sağ tentorium",
        "sag tentorium",
        "sağ tentorium serebelli",
        "sağ tentorial yarpaq",
      ],
    },
    note: {
      en: "Right tentorial leaf, meeting the falx at the straight sinus. Same notch story on this side; Kernohan notch is the opposite peduncle crushed against this free edge.",
      az: "Sağ tentorial yarpaq, falx ilə düz sinusda görüşür. Eyni çentik hekayəsi bu tərəfdə; Kernohan çentiği əks pedunkulun bu sərbəst kənara sıxılmasıdır.",
    },
  },
  {
    id: "men-cavernous-l",
    viewer: "meninges",
    mesh: "03_Cavernous_sinus_L",
    name: { en: "Cavernous sinus, left", az: "Sol kavernoz sinus" },
    accept: {
      en: ["left cavernous sinus", "cavernous sinus left", "left cavernous"],
      az: ["sol kavernoz sinus", "sol kavernoz"],
    },
    note: {
      en: "Left parasellar venous plexus: ICA and CN VI in the lumen, III, IV, V1, V2 in the wall. Thrombosis and carotid-cavernous fistula live here; isolated VI can be the first sign.",
      az: "Sol parasellyar venoz pleksus: DKA və VI lumenində, III, IV, V1, V2 divarda. Tromboz və karotid-kavernoz fistula burada yaşayır; təcrid olunmuş VI ilk əlamət ola bilər.",
    },
  },
  {
    id: "men-cavernous-r",
    viewer: "meninges",
    mesh: "03_Cavernous_sinus_R",
    name: { en: "Cavernous sinus, right", az: "Sağ kavernoz sinus" },
    accept: {
      en: ["right cavernous sinus", "cavernous sinus right", "right cavernous"],
      az: ["sağ kavernoz sinus", "sag kavernoz sinus", "sağ kavernoz"],
    },
    note: {
      en: "Right cavernous sinus, linked across the sella by intercavernous channels, so infection on one side can become bilateral ophthalmoplegia.",
      az: "Sağ kavernoz sinus, sella üzərindən interkavernoz kanallarla bağlıdır, ona görə bir tərəfdəki infeksiya ikitərəfli oftalmoplegiyaya çevrilə bilər.",
    },
  },
  {
    id: "men-spinal-dura",
    viewer: "meninges",
    mesh: "04_Spinal_dura",
    name: { en: "Spinal dura", az: "Spinal dura" },
    accept: {
      en: ["spinal dura", "spinal dura mater", "thecal sac", "dural sac"],
      az: ["spinal dura", "onurğa durası", "tekal kisə"],
    },
    note: {
      en: "Tough sleeve around cord and cauda equina, continuous with cranial dura at the foramen magnum. Lumbar puncture crosses it; an epidural abscess sits outside it and can compress the cord.",
      az: "Onurğa beyni və cauda equina ətrafındakı sərt qol, foramen magnumda kəllə durası ilə davam edir. Bel punksiyası onu keçir; epidural abses onun xaricində oturub beyni sıxa bilər.",
    },
  },
];
