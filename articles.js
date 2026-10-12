/**
 * NEYRON Articles page (neuron-viewer5/articles.html).
 *
 * ACCESS TIERS (legal rule — drives the UI via `access` field)
 * -----------------------------------------------------------
 * 'host'   ONLY when: PMC/publisher Open Access + explicit CC licence that
 *          allows redistribution (prefer CC BY / BY-SA; BY-NC needs the same
 *          NonCommercial site rule as books) AND the PDF is stored under
 *          public/papers/ with attribution. Never host subscription PDFs,
 *          “free PDF” uploads without a licence, or Bookshelf search-only works.
 * 'link'   Default for the teaching shelf: PubMed / PMC / publisher URL.
 *          Free-to-read is NOT the same as redistributable. Link even when
 *          Europe PMC reports `license=cc by` until we deliberately mirror.
 * 'author' Own publications → host accepted manuscript only if policy allows;
 *          note which version.
 *
 * Summaries must be ORIGINAL commentary — never publisher abstracts.
 *
 * Licence checks for this shelf used Europe PMC `license` + `isOpenAccess`
 * fields (and publisher licence pages). Re-check before flipping any entry
 * from 'link' → 'host'.
 */
(function () {
  function getLang() {
    return document.documentElement.getAttribute('lang') === 'az' ? 'az' : 'en';
  }

  function localized(field) {
    if (!field || typeof field !== 'object') return '';
    var lang = getLang();
    return field[lang] || field.en || '';
  }

  var UI = {
    topicAll: { en: 'All topics', az: 'Bütün mövzular' },
    empty: { en: 'No articles match these filters.', az: 'Bu filtrlərə uyğun məqalə yoxdur.' },
    emptyLibrary: {
      en: 'No articles yet — add entries in articles.js.',
      az: 'Hələ məqalə yoxdur — articles.js-ə əlavə edin.',
    },
    count: { en: 'Showing {shown} of {total}', az: '{total} məqalədən {shown} göstərilir' },
    download: { en: 'Download PDF', az: 'PDF yüklə' },
    pubmed: { en: 'View on PubMed', az: 'PubMed-də bax' },
    publisher: { en: 'View at publisher', az: 'Nəşriyyatda bax' },
    copy: { en: 'Copy citation', az: 'Sitatı kopyala' },
    copied: { en: 'Copied', az: 'Kopyalandı' },
    version: { en: 'Version', az: 'Versiya' },
  };

  function fill(template, vars) {
    var s = template;
    Object.keys(vars || {}).forEach(function (k) {
      s = s.split('{' + k + '}').join(String(vars[k]));
    });
    return s;
  }

  /*
   * Curated teaching shelf — not a dump of everything free on PubMed.
   * Prefer free full text (PMC / CC) when possible; entries stay access:'link'
   * unless deliberately mirrored under public/papers/ with a verified CC.
   * Summaries are ORIGINAL commentary.
   */
  var ARTICLES = [
    {
      id: 'halmagyi-curthoys-1988',
      title: 'A clinical sign of canal paresis',
      authors: ['G. M. Halmagyi', 'I. S. Curthoys'],
      journal: 'Archives of Neurology',
      year: 1988,
      doi: '10.1001/archneur.1988.00520310043015',
      pmid: '3395204',
      topics: ['vestibular', 'clinical', 'neuroanatomy'],
      summary: {
        en: 'This short classic introduces the bedside head-impulse test — a quick way to spot unilateral semicircular-canal failure. If you are exploring the vestibular labyrinth or brainstem relays in the atlas, it connects anatomy to a manoeuvre still used in clinics every day. Worth reading for anyone learning how peripheral vestibular loss looks at the bedside rather than only on a diagram.',
        az: 'Bu qısa klassik yazı yataq başı head-impulse testini təqdim edir — birtərəfli yarımdairevi kanal çatışmazlığını tez tapmaq üçün. Atlasda vestibulyar labirint və ya beyin sapı keçidlərinə baxırsınızsa, anatomiyanı klinikada hələ də istifadə olunan manevrlə bağlayır. Vestibulyar itkini yalnız sxemdən deyil, yataq başından öyrənmək istəyənlər üçün faydalıdır.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/3395204/',
    },
    {
      id: 'lempert-vm-criteria-2012',
      title: 'Vestibular migraine: diagnostic criteria',
      authors: ['Thomas Lempert', 'Jose A. Lopez-Escamez', 'et al.'],
      journal: 'Journal of Vestibular Research',
      year: 2012,
      doi: '10.3233/VES-2012-0453',
      pmid: '23000604',
      topics: ['vestibular', 'migraine', 'clinical'],
      summary: {
        en: 'The Bárány Society / IHS consensus criteria that made “vestibular migraine” a workable clinical diagnosis. Read this when you want the checklist behind the label — episode length, migrainous features, and what must be excluded. Ideal companion to the vestibular and brainstem atlas modules.',
        az: 'Bárány Cəmiyyəti / IHS konsensus meyarları «vestibulyar miqren»i işlək klinik diaqnoz etdi. Epizod müddəti, miqren xüsusiyyətləri və nəyin istisna edilməli olduğunu bilmək istəyəndə oxuyun. Vestibulyar və beyin sapı atlas modulları ilə yaxşı cütlükdür.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/23000604/',
    },
    {
      id: 'furman-vestibular-migraine-2013',
      title: 'Vestibular migraine: clinical aspects and pathophysiology',
      authors: ['Joseph M. Furman', 'Dawn A. Marcus', 'Carey D. Balaban'],
      journal: 'The Lancet Neurology',
      year: 2013,
      doi: '10.1016/S1474-4422(13)70107-8',
      pmid: '23726665',
      topics: ['vestibular', 'migraine', 'clinical'],
      summary: {
        en: 'A clear review of how migraine and the vestibular system collide — symptoms, proposed mechanisms, and why patients often bounce between ENT and neurology. Useful if you are mapping inner-ear and brainstem structures and want the clinical “why it matters” layer. Linked only; we do not host the publisher PDF.',
        az: 'Miqren və vestibulyar sistemin necə toqquşduğuna dair aydın icmal — simptomlar, ehtimal olunan mexanizmlər və xəstələrin niyə KBB ilə nevrologiya arasında qaldığı. Daxili qulaq və beyin sapı strukturlarını xəritələyib klinik «niyə vacibdir» qatını istəyənlər üçün faydalıdır. Yalnız keçid; nəşriyyat PDF-ini host etmirik.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/23726665/',
    },
    {
      id: 'lopez-escamez-meniere-2015',
      title: 'Diagnostic criteria for Menière’s disease',
      authors: ['Jose A. Lopez-Escamez', 'John Carey', 'et al.'],
      journal: 'Journal of Vestibular Research',
      year: 2015,
      doi: '10.3233/VES-150549',
      pmid: '25882471',
      topics: ['vestibular', 'clinical', 'auditory'],
      summary: {
        en: 'Consensus criteria for Menière’s disease — episodic vertigo plus fluctuating hearing symptoms from the same ear. Helps you separate endolymphatic hydrops phenotypes from vestibular migraine when you study the labyrinth in 3D. Short, practical, and still the reference language in clinics.',
        az: 'Menière xəstəliyi üçün konsensus meyarları — eyni qulaqdan gələn epizodik başgicəllənmə və dəyişkən eşitmə simptomları. Labirinti 3D-də öyrənərkən endolimfatik hidropsu vestibulyar miqrendən ayırmağa kömək edir. Qısa, praktiki və klinikada hələ də istinad dilidir.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/25882471/',
    },
    {
      id: 'pickles-auditory-pathway-2015',
      title: 'Auditory pathways: anatomy and physiology',
      authors: ['James O. Pickles'],
      journal: 'Handbook of Clinical Neurology',
      year: 2015,
      doi: '10.1016/B978-0-444-62630-1.00001-9',
      pmid: '25726260',
      topics: ['auditory', 'neuroanatomy', 'brainstem'],
      summary: {
        en: 'A compact tour from cochlea to cortex — nuclei, crossings, and what each station is doing with sound. Pair it with the auditory pathway viewer: the chapter is a prose map of the same stations you can click in 3D. Link-only access to the publisher page via PubMed.',
        az: 'Kokleadan qabığa qədər yığcam yol — nüvələr, çarpazlaşmalar və hər stansiyanın səslə nə etdiyi. Eşitmə yolu baxışı ilə birlikdə oxuyun: fəsil 3D-də kliklədiyiniz stansiyaların mətn xəritəsidir. PubMed vasitəsilə nəşriyyata yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/25726260/',
    },
    {
      id: 'takeuti-vm-abr-2019',
      title: 'Auditory brainstem function in women with vestibular migraine: a controlled study',
      authors: ['Aline A. Takeuti', 'Maria L. Favero', 'et al.'],
      journal: 'BMC Neurology',
      year: 2019,
      doi: '10.1186/s12883-019-1368-5',
      pmid: '31248379',
      topics: ['vestibular', 'migraine', 'auditory', 'brainstem'],
      summary: {
        en: 'BMC open-access study (Europe PMC licence: CC BY) linking vestibular migraine to subtle auditory-brainstem changes even between attacks. Great beside the inferior colliculus and cochlear nuclei in the atlas. We link the free full text; we do not mirror the PDF here.',
        az: 'BMC açıq girişli tədqiqat (Europe PMC: CC BY) vestibulyar miqreni hücumlararası dövrdə belə incə eşitmə-beyin sapı dəyişiklikləri ilə bağlayır. Atlasda aşağı kollikulus və koklear nüvələrin yanında oxuyun. Pulsuz tam mətnə keçid; PDF-i burada güzgüləmirik.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6595618/',
    },
    {
      id: 'cullen-vestibular-2019',
      title: 'Vestibular processing during natural self-motion: implications for perception and action',
      authors: ['Kathleen E. Cullen'],
      journal: 'Nature Reviews Neuroscience',
      year: 2019,
      doi: '10.1038/s41583-019-0153-1',
      pmid: '30914775',
      topics: ['vestibular', 'neuroanatomy', 'brainstem'],
      summary: {
        en: 'A modern systems view of how vestibular signals are processed for perception and movement — from labyrinth through brainstem nuclei to higher circuits. Use it after you have clicked through the semicircular canals and vestibular nuclei: it explains what those nodes are computing in real motion.',
        az: 'Vestibulyar siqnalların qavrayış və hərəkət üçün necə işləndiyinin müasir sistem baxışı — labirintdən beyin sapı nüvələrinə və yuxarı dövrələrə. Yarımdairevi kanallar və vestibulyar nüvələri kliklədikdən sonra oxuyun: real hərəkətdə bu düyünlərin nə hesab etdiyini izah edir.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/30914775/',
    },
    {
      id: 'dieterich-brandt-vestibular-cortex-2015',
      title: 'The vestibular cortex: its locations, functions, and disorders',
      authors: ['Marianne Dieterich', 'Thomas Brandt'],
      journal: 'Annals of the New York Academy of Sciences',
      year: 2015,
      doi: '10.1111/nyas.12585',
      pmid: '25721483',
      topics: ['vestibular', 'cortex', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Maps where vestibular information lands in human cortex and what goes wrong in cortical vestibular syndromes. Bridges peripheral anatomy in the atlas to parietal and insular networks you cannot see in a temporal-bone model alone.',
        az: 'Vestibulyar məlumatın insan qabığında harada yerləşdiyini və kortikal vestibulyar sindromlarda nəyin pozulduğunu xəritələyir. Atlasdakı periferik anatomiyanı tək temporal sümük modelində görünməyən parietal və insular şəbəkələrə bağlayır.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/25721483/',
    },
    {
      id: 'sherman-guillery-thalamus-2011',
      title: 'Distinct functions for direct and transthalamic corticocortical connections',
      authors: ['S. Murray Sherman', 'R. W. Guillery'],
      journal: 'Journal of Neurophysiology',
      year: 2011,
      doi: '10.1152/jn.00429.2011',
      pmid: '21697476',
      topics: ['diencephalon', 'neuroanatomy', 'cortex'],
      summary: {
        en: 'A crisp argument that thalamus is not only a simple relay — it shapes how cortex talks to cortex. Pair with the diencephalon viewer when you click thalamic nuclei and want the functional story behind the grey blobs.',
        az: 'Talamusun yalnız sadə rele olmadığını — qabığın qabıqla necə danışdığını formalaşdırdığını aydın göstərən arqument. Diensefalon baxışında talamik nüvələri klikləyəndə boz ləkələrin arxasındakı funksional hekayəni istəyənlər üçün.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/21697476/',
    },
    {
      id: 'prasad-galetta-optic-pathway-2011',
      title: 'Anatomy and physiology of the afferent visual system',
      authors: ['Sashank Prasad', 'Steven L. Galetta'],
      journal: 'Handbook of Clinical Neurology',
      year: 2011,
      doi: '10.1016/B978-0-444-52903-9.00007-8',
      pmid: '21601060',
      topics: ['visual', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Retina → optic nerve → chiasm → tract → LGN → radiation → V1, with the lesion logic clinicians use for field cuts. Read beside the visual pathway viewer so each clickable segment gets a clinical sentence.',
        az: 'Retina → optic sinir → xiazma → trakt → LGN → radiasiya → V1 və klinisistlərin sahə qüsurları üçün istifadə etdiyi zədələnmə məntiqi. Görmə yolu baxışı ilə oxuyun ki, hər kliklənən seqment klinik cümlə alsın.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/21601060/',
    },
    {
      id: 'agostinelli-brainstem-atlas-2023',
      title: 'Human Brainstem and Cerebellum Atlas: Chemoarchitecture and Cytoarchitecture Paired to MRI',
      authors: ['Lindsay J. Agostinelli', 'Scott C. Seaman', 'et al.'],
      journal: 'Journal of Neuroscience',
      year: 2023,
      doi: '10.1523/JNEUROSCI.0587-22.2022',
      pmid: '36442999',
      topics: ['brainstem', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'High-resolution 7T MRI of a human brainstem and cerebellum paired with chemoarchitecture (cholinergic, serotonergic, catecholaminergic cells). Use it when the brainstem atlas feels like anonymous grey: this paper names cell groups and matches them to imaging. Europe PMC: open access, CC BY — we still link only.',
        az: 'İnsan beyin sapı və beyincəyinin yüksək ayırdetməli 7T MRT-si kimyəvi arxitektura ilə (xolinergik, serotonergik, katexolaminergik hüceyrələr). Beyin sapı atlası boz ləkə kimi görünəndə oxuyun: hüceyrə qruplarını adlandırır və görüntüləmə ilə uyğunlaşdırır. Europe PMC: açıq giriş, CC BY — yenə də yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9838717/',
    },
    {
      id: 'joost-meninges-neuroimmune-2026',
      title: 'The meninges as a neuroimmune interface: structure, barriers and roles in CNS disease',
      authors: ['S. Joost', 'H. Kaddatz', 'et al.'],
      journal: 'Fluids and Barriers of the CNS',
      year: 2026,
      doi: '10.1186/s12987-026-00795-5',
      pmid: '41845445',
      topics: ['meninges', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Modern review of dura, arachnoid, and pia as living interfaces — barriers, lymphatics, and neuroimmune roles — not just three membranes. Pair with the meninges viewer when you want why those layers matter clinically. Europe PMC: CC BY; link-only on NEYRON.',
        az: 'Dura, araxnoid və pia-nın canlı interfeys kimi müasir icmalı — maneələr, limfatika və neyroimmun rollar — yalnız üç membran deyil. Meninges baxışı ilə oxuyun ki, bu qatların klinik əhəmiyyətini görün. Europe PMC: CC BY; NEYRON-da yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12998060/',
    },
    {
      id: 'zedde-leptomeninges-2025',
      title: 'Leptomeninges: Anatomy, Mechanisms of Disease and Neuroimaging',
      authors: ['Marialuisa Zedde', 'Rosario Pascarella'],
      journal: 'Neurology International',
      year: 2025,
      doi: '10.3390/neurolint17120203',
      pmid: '41441222',
      topics: ['meninges', 'neuroanatomy', 'clinical', 'ventricles'],
      summary: {
        en: 'Focused tour of arachnoid and pia — cisterns, CSF routes, and imaging of leptomeningeal disease. Bridges the meninges and ventricles modules: subarachnoid space is where those two stories meet. MDPI open access, CC BY (Europe PMC); linked, not hosted.',
        az: 'Araxnoid və pia-ya fokussli baxış — sisternlər, CSF yolları və leptomeningeal xəstəliklərin görüntülənməsi. Meninges və mədəcik modullarını bağlayır: subaraxnoid boşluq bu iki hekayənin görüş yeridir. MDPI açıq giriş, CC BY; keçid, host yox.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12736031/',
    },
    {
      id: 'marin-gabaergic-cortex-2025',
      title: 'Development of GABAergic Interneurons in the Human Cerebral Cortex',
      authors: ['Oscar Marín'],
      journal: 'European Journal of Neuroscience',
      year: 2025,
      doi: '10.1111/ejn.70136',
      pmid: '40356226',
      topics: ['cortex', 'neuroanatomy'],
      summary: {
        en: 'How inhibitory interneurons are built into human cortex — useful depth after you have clicked lobes and gyri in the cerebral cortex viewer. Open access with CC BY (Europe PMC); we link the free full text rather than hosting the PDF.',
        az: 'İnsan qabığında inhibisiyaedici interneyronların necə qurulduğu — cerebral cortex baxışında paylar və qıvrımları kliklədikdən sonra dərinlik üçün. Açıq giriş, CC BY; PDF host etmədən keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12069972/',
    },
    {
      id: 'quinn-cranial-nerves-craft-2022',
      title: 'A Crafty Approach for Learning the Topographical Anatomy of the Cranial Nerves',
      authors: ['Lisa Quinn'],
      journal: 'Medical Science Educator',
      year: 2022,
      doi: '10.1007/s40670-022-01529-6',
      pmid: '35528297',
      topics: ['cranial-nerves', 'brainstem', 'neuroanatomy'],
      summary: {
        en: 'Short teaching piece on learning how the twelve cranial nerves sit relative to forebrain and brainstem — a practical companion while you rotate the cranial-nerves atlas. Europe PMC: open access, CC BY; link-only.',
        az: 'On iki kranial sinirin ön beyin və beyin sapına nisbətən necə yerləşdiyini öyrənmək üçün qısa tədris yazısı — cranial nerves atlasını fırladarkən praktik yoldaş. Europe PMC: açıq giriş, CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9054994/',
    },
    {
      id: 'evensmoen-fornix-white-matter-2025',
      title: 'Inferior and Middle Longitudinal Fasciculus and Fornix Support Allocentric Spatial Learning',
      authors: ['Hallvard R. Evensmoen', 'Lars M. Rimol', 'Asta Håberg'],
      journal: 'Hippocampus',
      year: 2025,
      doi: '10.1002/hipo.70031',
      pmid: '40771024',
      topics: ['white-matter', 'limbic', 'neuroanatomy'],
      summary: {
        en: 'Diffusion MRI evidence that major temporal white-matter pathways (including fornix) support map-like spatial learning. Read beside the white-matter and limbic viewers when tracts stop being abstract ribbons. Europe PMC: CC BY; linked only.',
        az: 'Əsas temporal ağ maddə yollarının (forniks daxil) xəritəyə bənzər məkan öyrənməsini dəstəklədiyinə dair diffuziya MRT sübutu. Ağ maddə və limbic baxışlarında traktlar mücərrəd lent olmaqdan çıxanda oxuyun. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12329484/',
    },
    {
      id: 'pellegrini-choroid-plexus-2024',
      title: 'Breakthroughs in choroid plexus and CSF biology from the first European Choroid plexus Scientific Forum (ECSF)',
      authors: ['Laura Pellegrini', 'Violeta Silva-Vargas', 'Annarita Patrizi'],
      journal: 'Fluids and Barriers of the CNS',
      year: 2024,
      doi: '10.1186/s12987-024-00546-4',
      pmid: '38773599',
      topics: ['ventricles', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'A field snapshot of choroid plexus and CSF biology — production, barriers, and why the ventricles are not empty plumbing. Pair with the ventricles atlas when you click choroid plexus and want the living-tissue story. Europe PMC: CC BY; link-only.',
        az: 'Xoroid pleksus və CSF biologiyasının sahə icmalı — istehsal, maneələr və mədəciklərin niyə boş boru olmadığı. Ventricles atlasında xoroid pleksusu klikləyəndə canlı toxuma hekayəsi üçün. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11106960/',
    },
    {
      id: 'calcagni-visual-pathway-edx-2024',
      title: 'Electrodiagnostic tests of the visual pathway and applications in neuro-ophthalmology',
      authors: ['Antonio Calcagni', 'Magella M. Neveu', 'et al.'],
      journal: 'Eye',
      year: 2024,
      doi: '10.1038/s41433-024-03154-6',
      pmid: '38862643',
      topics: ['visual', 'clinical', 'neuroanatomy'],
      summary: {
        en: 'How ERG, VEP and related tests interrogate the same stations you click in the visual pathway viewer — retina to cortex with clinical endpoints. Europe PMC: open access, CC BY; we link rather than host.',
        az: 'ERG, VEP və əlaqəli testlərin görmə yolu baxışında kliklədiyiniz stansiyaları (retinadan qabığa) klinik son nöqtələrlə necə yoxladığı. Europe PMC: açıq giriş, CC BY; host etmədən keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11306601/',
    },
    {
      id: 'arnts-intralaminar-thalamus-2023',
      title: 'The intralaminar thalamus: a review of its role as a target in functional neurosurgery',
      authors: ['H. Arnts', 'S. E. Coolen', 'et al.'],
      journal: 'Brain Communications',
      year: 2023,
      doi: '10.1093/braincomms/fcad003',
      pmid: '37292456',
      topics: ['diencephalon', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Intralaminar thalamic nuclei as arousal and network hubs — and why neurosurgeons care. Use beside the diencephalon viewer when thalamic labels need a functional and surgical layer. Europe PMC: CC BY; link-only.',
        az: 'İntralaminar talamik nüvələr oyandırma və şəbəkə düyünləri kimi — və neyrocərrahların niyə maraqlı olduğu. Diensefalon baxışında talamik etiketlərə funksional və cərrahi qat lazım olanda. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10244065/',
    },
    {
      id: 'biesbroek-thalamus-cognition-2024',
      title: 'When the central integrator disintegrates: A review of the role of the thalamus in cognition and dementia',
      authors: ['J. Matthijs Biesbroek', 'M. G. Verhagen', 'et al.'],
      journal: "Alzheimer's & Dementia",
      year: 2024,
      doi: '10.1002/alz.13563',
      pmid: '38041861',
      topics: ['diencephalon', 'clinical', 'neuroanatomy'],
      summary: {
        en: 'Thalamus as a cognitive integrator — and what fails in dementia syndromes. Bridges atlas anatomy to the clinical “why this nucleus matters” question. Europe PMC: CC BY; linked only.',
        az: 'Talamus idrak inteqratoru kimi — və demensiya sindromlarında nəyin pozulduğu. Atlas anatomiyasını klinik «bu nüvə niyə vacibdir» sualına bağlayır. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10984498/',
    },
    {
      id: 'coviello-immature-cortex-2022',
      title: 'Phenotype and Distribution of Immature Neurons in the Human Cerebral Cortex Layer II',
      authors: ['S. Coviello', 'Y. Gramuntell', 'et al.'],
      journal: 'Frontiers in Neuroanatomy',
      year: 2022,
      doi: '10.3389/fnana.2022.851432',
      pmid: '35464133',
      topics: ['cortex', 'neuroanatomy'],
      summary: {
        en: 'Maps immature neurons lingering in human cortical layer II — a reminder that cortex is not a finished slab once you leave the textbook. Pair with the cerebral cortex viewer for cellular depth. Europe PMC: CC BY; link-only.',
        az: 'İnsan qabığının II qatında qalan yetişməmiş neyronları xəritələyir — qabıq dərslikdən çıxan kimi bitmiş lövhə deyil. Cerebral cortex baxışı ilə hüceyrə dərinliyi üçün. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9027810/',
    },
    {
      id: 'libreros-cranial-nerves-2024',
      title: 'On the Cranial Nerves',
      authors: ['H. M. Libreros-Jiménez', 'J. Manzo', 'et al.'],
      journal: 'NeuroSci',
      year: 2024,
      doi: '10.3390/neurosci5010002',
      pmid: '39483811',
      topics: ['cranial-nerves', 'brainstem', 'neuroanatomy'],
      summary: {
        en: 'Open overview of the twelve cranial nerves — origins, courses, and functional roles — written as a readable companion to the cranial-nerves atlas. MDPI NeuroSci, Europe PMC licence CC BY; we link the free full text.',
        az: 'On iki kranial sinirin açıq icmalı — mənşə, gedişat və funksional rollar — cranial nerves atlasına oxunaqlı yoldaş. MDPI NeuroSci, Europe PMC: CC BY; pulsuz tam mətnə keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11523702/',
    },
    {
      id: 'shimizu-bbb-2024',
      title: 'Blood-Brain Barrier Disruption in Neuroimmunological Disease',
      authors: ['Fumitaka Shimizu', 'Masayuki Nakamori'],
      journal: 'International Journal of Molecular Sciences',
      year: 2024,
      doi: '10.3390/ijms251910625',
      pmid: '39408955',
      topics: ['meninges', 'clinical', 'neuroanatomy'],
      summary: {
        en: 'How the blood–brain barrier fails in neuroimmune disease — useful clinical depth after you have learned dura/arachnoid/pia as containers. Ties barrier biology to the meninges story. Europe PMC: CC BY; link-only.',
        az: 'Neyroimmun xəstəlikdə qan-beyin maneəsinin necə pozulduğu — dura/araxnoid/pia-nı qab kimi öyrəndikdən sonra klinik dərinlik. Maneə biologiyasını meninges hekayəsinə bağlayır. Europe PMC: CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC11476930/',
    },
    {
      id: 'leon-synapse-m6a-2021',
      title: 'Neuronal Glycoprotein M6a: An Emerging Molecule in Chemical Synapse Formation and Dysfunction',
      authors: ['A. León', 'G. I. Aparicio', 'C. Scorticati'],
      journal: 'Frontiers in Synaptic Neuroscience',
      year: 2021,
      doi: '10.3389/fnsyn.2021.661681',
      pmid: '34017241',
      topics: ['synapse', 'neuroanatomy'],
      summary: {
        en: 'A focused look at molecules that help build and stabilise chemical synapses — good depth after the synapse viewer’s big-picture anatomy. Europe PMC: CC BY; linked, not hosted.',
        az: 'Kimyəvi sinapsların qurulmasına və sabitləşməsinə kömək edən molekullara fokus — synapse baxışının ümumi anatomiyasından sonra dərinlik üçün. Europe PMC: CC BY; keçid, host yox.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8129562/',
    },
  ];

  var sortMode = 'year';
  var activeTopic = null;
  var searchQuery = '';

  function formatAuthors(authors) {
    if (!authors || !authors.length) return '';
    if (authors.length <= 3) return authors.join(', ');
    return authors.slice(0, 3).join(', ') + ' et al.';
  }

  function formatCitation(article) {
    var authors = formatAuthors(article.authors);
    var doi = article.doi ? ' https://doi.org/' + article.doi : '';
    var pmid = article.pmid ? ' PMID: ' + article.pmid + '.' : '';
    return (authors + '. ' + article.title + '. ' + article.journal + '. ' + article.year + '.' + doi + pmid).trim();
  }

  function actionsForArticle(article) {
    if (article.access === 'host') {
      return [
        { label: localized(UI.download), href: article.pdfUrl || '#', external: false, download: !!article.pdfUrl },
        { label: localized(UI.publisher), href: article.sourceUrl, external: true, download: false },
      ];
    }
    if (article.access === 'author') {
      var actions = [];
      if (article.pdfUrl) {
        actions.push({
          label: localized(UI.download),
          href: article.pdfUrl,
          external: false,
          download: true,
        });
      }
      actions.push({
        label: localized(UI.publisher),
        href: article.sourceUrl,
        external: true,
        download: false,
      });
      return actions;
    }
    if (article.access === 'link') {
      var url = article.sourceUrl || '';
      var isPmc = /pmc\.ncbi\.nlm\.nih\.gov|europepmc\.org/i.test(url);
      var isPubmed = /pubmed\.ncbi\.nlm\.nih\.gov/i.test(url) || (!isPmc && !!article.pmid);
      return [
        {
          label: localized(isPmc ? UI.publisher : isPubmed ? UI.pubmed : UI.publisher),
          href:
            url ||
            (article.pmid ? 'https://pubmed.ncbi.nlm.nih.gov/' + article.pmid + '/' : '#'),
          external: true,
          download: false,
        },
      ];
    }
    throw new Error('Unknown access tier: ' + article.access);
  }

  function matchesFilters(article) {
    if (activeTopic && (article.topics || []).indexOf(activeTopic) === -1) return false;
    var q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    var hay = [
      article.title,
      formatAuthors(article.authors),
      (article.authors || []).join(' '),
      article.journal,
      localized(article.summary),
    ]
      .concat(article.topics || [])
      .join(' ')
      .toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function sortedArticles(list) {
    var out = list.slice();
    if (sortMode === 'title') {
      out.sort(function (a, b) {
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      });
    } else {
      out.sort(function (a, b) {
        return b.year - a.year || a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      });
    }
    return out;
  }

  function allTopics(list) {
    var set = {};
    list.forEach(function (a) {
      (a.topics || []).forEach(function (t) {
        set[t] = true;
      });
    });
    return Object.keys(set).sort();
  }

  function renderTopics() {
    var root = document.getElementById('articles-topics');
    if (!root) return;
    root.replaceChildren();

    var allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = 'articles-topic' + (activeTopic == null ? ' is-active' : '');
    allBtn.setAttribute('data-en', UI.topicAll.en);
    allBtn.setAttribute('data-az', UI.topicAll.az);
    allBtn.textContent = localized(UI.topicAll);
    allBtn.addEventListener('click', function () {
      activeTopic = null;
      render();
    });
    root.appendChild(allBtn);

    allTopics(ARTICLES).forEach(function (topic) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'articles-topic' + (activeTopic === topic ? ' is-active' : '');
      btn.textContent = topic;
      btn.addEventListener('click', function () {
        activeTopic = activeTopic === topic ? null : topic;
        render();
      });
      root.appendChild(btn);
    });
  }

  function renderCard(article) {
    var card = document.createElement('article');
    card.className = 'atlas-choice-card article-choice-card';
    card.dataset.access = article.access;

    var title = document.createElement('h3');
    title.className = 'atlas-choice-card__title';
    title.textContent = article.title;

    var meta = document.createElement('p');
    meta.className = 'article-choice-card__meta';
    meta.textContent = [formatAuthors(article.authors), article.journal, String(article.year)]
      .filter(Boolean)
      .join(' · ');

    var hint = document.createElement('p');
    hint.className = 'atlas-choice-card__hint';
    hint.textContent = localized(article.summary);

    var tags = document.createElement('div');
    tags.className = 'article-choice-card__tags';
    (article.topics || []).forEach(function (topic) {
      var span = document.createElement('span');
      span.className = 'article-choice-card__tag';
      span.textContent = topic;
      tags.appendChild(span);
    });

    if (article.access === 'host' && article.licence) {
      var badge = document.createElement('span');
      badge.className = 'article-choice-card__licence';
      badge.textContent = article.licence;
      tags.appendChild(badge);
    }

    if (article.access === 'author' && article.versionNote) {
      var note = document.createElement('p');
      note.className = 'article-choice-card__version';
      note.textContent = localized(UI.version) + ': ' + article.versionNote;
    }

    var actions = document.createElement('div');
    actions.className = 'article-choice-card__actions';

    actionsForArticle(article).forEach(function (action, i) {
      var a = document.createElement('a');
      a.className = i === 0 ? 'atlas-choice-card__cta' : 'article-choice-card__link';
      a.href = action.href;
      a.textContent = action.label.replace(/\s*$/, '') + (i === 0 ? ' →' : '');
      if (action.external) {
        a.target = '_blank';
        a.rel = 'noopener noreferrer';
      }
      if (action.download) a.setAttribute('download', '');
      actions.appendChild(a);
    });

    var copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'article-choice-card__copy';
    copyBtn.textContent = localized(UI.copy);
    copyBtn.addEventListener('click', function () {
      var text = formatCitation(article);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function () {
          copyBtn.textContent = localized(UI.copied);
          setTimeout(function () {
            copyBtn.textContent = localized(UI.copy);
          }, 1600);
        });
      } else {
        window.prompt(localized(UI.copy), text);
      }
    });
    actions.appendChild(copyBtn);

    card.appendChild(title);
    card.appendChild(meta);
    card.appendChild(hint);
    if (tags.childNodes.length) card.appendChild(tags);
    if (typeof note !== 'undefined' && note) card.appendChild(note);
    card.appendChild(actions);
    return card;
  }

  function renderList() {
    var listRoot = document.getElementById('articles-list');
    var emptyEl = document.getElementById('articles-empty');
    var countEl = document.getElementById('articles-count');
    if (!listRoot || !emptyEl || !countEl) return;

    var filtered = sortedArticles(ARTICLES.filter(matchesFilters));
    listRoot.replaceChildren.apply(listRoot, filtered.map(renderCard));

    var empty = filtered.length === 0;
    emptyEl.hidden = !empty;
    if (ARTICLES.length === 0) {
      emptyEl.hidden = false;
      emptyEl.textContent = localized(UI.emptyLibrary);
    } else if (empty) {
      emptyEl.textContent = localized(UI.empty);
    }

    countEl.hidden = ARTICLES.length === 0;
    if (ARTICLES.length > 0) {
      countEl.textContent = fill(localized(UI.count), {
        shown: String(filtered.length),
        total: String(ARTICLES.length),
      });
    }
  }

  function syncSortButtons() {
    document.querySelectorAll('.articles-sort__btn').forEach(function (btn) {
      btn.classList.toggle('is-active', btn.getAttribute('data-sort') === sortMode);
    });
  }

  function syncPlaceholders() {
    var search = document.getElementById('articles-search');
    if (!search) return;
    var lang = getLang();
    var ph =
      lang === 'az'
        ? search.getAttribute('data-az-placeholder')
        : search.getAttribute('data-en-placeholder');
    if (ph) search.placeholder = ph;
  }

  function render() {
    renderTopics();
    renderList();
    syncSortButtons();
    syncPlaceholders();
  }

  document.getElementById('articles-search')?.addEventListener('input', function (ev) {
    searchQuery = ev.target.value || '';
    renderList();
  });

  document.querySelectorAll('.articles-sort__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      sortMode = btn.getAttribute('data-sort') === 'title' ? 'title' : 'year';
      render();
    });
  });

  var prev = window.__neyronAfterSetLang;
  window.__neyronAfterSetLang = function (lang) {
    if (typeof prev === 'function') prev(lang);
    render();
  };

  render();
})();
