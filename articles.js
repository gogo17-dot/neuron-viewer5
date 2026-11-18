/**
 * AXON Articles page (neuron-viewer5/articles.html).
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
    originAll: { en: 'All research', az: 'Bütün tədqiqatlar' },
    originAz: { en: '🇦🇿 From Azerbaijan', az: '🇦🇿 Azərbaycandan' },
    originIntl: { en: 'International', az: 'Beynəlxalq' },
    originBadge: { en: 'Research from Azerbaijan', az: 'Azərbaycan tədqiqatı' },
    originCount: { en: '{n} papers by researchers in Azerbaijan', az: 'Azərbaycandakı tədqiqatçıların {n} məqaləsi' },
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
      pmid: '3390028',
      topics: ['vestibular', 'clinical', 'neuroanatomy'],
      summary: {
        en: 'This short classic introduces the bedside head-impulse test — a quick way to spot unilateral semicircular-canal failure. If you are exploring the vestibular labyrinth or brainstem relays in the atlas, it connects anatomy to a manoeuvre still used in clinics every day. Worth reading for anyone learning how peripheral vestibular loss looks at the bedside rather than only on a diagram.',
        az: 'Bu qısa klassik yazı yataq başı head-impulse testini təqdim edir — birtərəfli yarımdairevi kanal çatışmazlığını tez tapmaq üçün. Atlasda vestibulyar labirint və ya beyin gövdəsi keçidlərinə baxırsınızsa, anatomiyanı klinikada hələ də istifadə olunan manevrlə bağlayır. Vestibulyar itkini yalnız sxemdən deyil, yataq başından öyrənmək istəyənlər üçün faydalıdır.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/3390028/',
    },
    {
      id: 'lempert-vm-criteria-2012',
      title: 'Vestibular migraine: diagnostic criteria',
      authors: ['Thomas Lempert', 'Jes Olesen', 'Joseph Furman', 'et al.'],
      journal: 'Journal of Vestibular Research',
      year: 2012,
      doi: '10.3233/VES-2012-0453',
      pmid: '23142830',
      topics: ['vestibular', 'migraine', 'clinical'],
      summary: {
        en: 'The Bárány Society / IHS consensus criteria that made “vestibular migraine” a workable clinical diagnosis. Read this when you want the checklist behind the label — episode length, migrainous features, and what must be excluded. Ideal companion to the vestibular and brainstem atlas modules.',
        az: 'Bárány Cəmiyyəti / IHS konsensus meyarları «vestibulyar miqren»i işlək klinik diaqnoz etdi. Epizod müddəti, miqren xüsusiyyətləri və nəyin istisna edilməli olduğunu bilmək istəyəndə oxuyun. Vestibulyar və beyin gövdəsi atlas modulları ilə yaxşı cütlükdür.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/23142830/',
    },
    {
      id: 'furman-vestibular-migraine-2013',
      title: 'Vestibular migraine: clinical aspects and pathophysiology',
      authors: ['Joseph M. Furman', 'Dawn A. Marcus', 'Carey D. Balaban'],
      journal: 'The Lancet Neurology',
      year: 2013,
      doi: '10.1016/S1474-4422(13)70107-8',
      pmid: '23769597',
      topics: ['vestibular', 'migraine', 'clinical'],
      summary: {
        en: 'A clear review of how migraine and the vestibular system collide — symptoms, proposed mechanisms, and why patients often bounce between ENT and neurology. Useful if you are mapping inner-ear and brainstem structures and want the clinical “why it matters” layer. Linked only; we do not host the publisher PDF.',
        az: 'Miqren və vestibulyar sistemin necə toqquşduğuna dair aydın icmal — simptomlar, ehtimal olunan mexanizmlər və xəstələrin niyə KBB ilə nevrologiya arasında qaldığı. Daxili qulaq və beyin gövdəsi strukturlarını xəritələyib klinik «niyə vacibdir» qatını istəyənlər üçün faydalıdır. Yalnız keçid; nəşriyyat PDF-ini host etmirik.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/23769597/',
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
        az: 'BMC açıq girişli tədqiqat (Europe PMC: CC BY) vestibulyar miqreni hücumlararası dövrdə belə incə eşitmə-beyin gövdəsi dəyişiklikləri ilə bağlayır. Atlasda aşağı kollikulus və koklear nüvələrin yanında oxuyun. Pulsuz tam mətnə keçid; PDF-i burada güzgüləmirik.',
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
      pmid: '30914780',
      topics: ['vestibular', 'neuroanatomy', 'brainstem'],
      summary: {
        en: 'A modern systems view of how vestibular signals are processed for perception and movement — from labyrinth through brainstem nuclei to higher circuits. Use it after you have clicked through the semicircular canals and vestibular nuclei: it explains what those nodes are computing in real motion.',
        az: 'Vestibulyar siqnalların qavrayış və hərəkət üçün necə işləndiyinin müasir sistem baxışı — labirintdən beyin gövdəsi nüvələrinə və yuxarı dövrələrə. Yarımdairevi kanallar və vestibulyar nüvələri kliklədikdən sonra oxuyun: real hərəkətdə bu düyünlərin nə hesab etdiyini izah edir.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/30914780/',
    },
    {
      id: 'dieterich-brandt-vestibular-cortex-2015',
      title: 'The vestibular cortex: its locations, functions, and disorders',
      authors: ['Thomas Brandt', 'Marianne Dieterich'],
      journal: 'Annals of the New York Academy of Sciences',
      year: 1999,
      doi: '10.1111/j.1749-6632.1999.tb09193.x',
      pmid: '10372080',
      topics: ['vestibular', 'cortex', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Maps where vestibular information lands in human cortex and what goes wrong in cortical vestibular syndromes. Bridges peripheral anatomy in the atlas to parietal and insular networks you cannot see in a temporal-bone model alone.',
        az: 'Vestibulyar məlumatın insan qabığında harada yerləşdiyini və kortikal vestibulyar sindromlarda nəyin pozulduğunu xəritələyir. Atlasdakı periferik anatomiyanı tək temporal sümük modelində görünməyən parietal və insular şəbəkələrə bağlayır.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/10372080/',
    },
    {
      id: 'sherman-guillery-thalamus-2011',
      title: 'Distinct functions for direct and transthalamic corticocortical connections',
      authors: ['S. Murray Sherman', 'R. W. Guillery'],
      journal: 'Journal of Neurophysiology',
      year: 2011,
      doi: '10.1152/jn.00429.2011',
      pmid: '21676936',
      topics: ['diencephalon', 'neuroanatomy', 'cortex'],
      summary: {
        en: 'A crisp argument that thalamus is not only a simple relay — it shapes how cortex talks to cortex. Pair with the diencephalon viewer when you click thalamic nuclei and want the functional story behind the grey blobs.',
        az: 'Talamusun yalnız sadə rele olmadığını — qabığın qabıqla necə danışdığını formalaşdırdığını aydın göstərən arqument. Diensefalon baxışında talamik nüvələri klikləyəndə boz ləkələrin arxasındakı funksional hekayəni istəyənlər üçün.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/21676936/',
    },
    {
      id: 'prasad-galetta-optic-pathway-2011',
      title: 'Anatomy and physiology of the afferent visual system',
      authors: ['Sashank Prasad', 'Steven L. Galetta'],
      journal: 'Handbook of Clinical Neurology',
      year: 2011,
      doi: '10.1016/B978-0-444-52903-9.00007-8',
      pmid: '21601061',
      topics: ['visual', 'neuroanatomy', 'clinical'],
      summary: {
        en: 'Retina → optic nerve → chiasm → tract → LGN → radiation → V1, with the lesion logic clinicians use for field cuts. Read beside the visual pathway viewer so each clickable segment gets a clinical sentence.',
        az: 'Retina → optic sinir → xiazma → trakt → LGN → radiasiya → V1 və klinisistlərin sahə qüsurları üçün istifadə etdiyi zədələnmə məntiqi. Görmə yolu baxışı ilə oxuyun ki, hər kliklənən seqment klinik cümlə alsın.',
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/21601061/',
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
        az: 'İnsan beyin gövdəsi və beyincəyinin yüksək ayırdetməli 7T MRT-si kimyəvi arxitektura ilə (xolinergik, serotonergik, katexolaminergik hüceyrələr). Beyin gövdəsi atlası boz ləkə kimi görünəndə oxuyun: hüceyrə qruplarını adlandırır və görüntüləmə ilə uyğunlaşdırır. Europe PMC: açıq giriş, CC BY — yenə də yalnız keçid.',
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
        en: 'Modern review of dura, arachnoid, and pia as living interfaces — barriers, lymphatics, and neuroimmune roles — not just three membranes. Pair with the meninges viewer when you want why those layers matter clinically. Europe PMC: CC BY; link-only on AXON.',
        az: 'Dura, araxnoid və pia-nın canlı interfeys kimi müasir icmalı — maneələr, limfatika və neyroimmun rollar — yalnız üç membran deyil. Meninges baxışı ilə oxuyun ki, bu qatların klinik əhəmiyyətini görün. Europe PMC: CC BY; AXON-da yalnız keçid.',
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
        az: 'On iki kranial sinirin ön beyin və beyin gövdəsinə nisbətən necə yerləşdiyini öyrənmək üçün qısa tədris yazısı — cranial nerves atlasını fırladarkən praktik yoldaş. Europe PMC: açıq giriş, CC BY; yalnız keçid.',
      },
      access: 'link',
      sourceUrl: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9054994/',
    },
    {
      id: 'evensmoen-fornix-white-matter-2025',
      title: 'Inferior and Middle Longitudinal Fasciculus and Fornix Support Allocentric Representation',
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
    /* ---- Research from Azerbaijan: papers led by researchers at Azerbaijani institutions (PubMed). Summaries are AXON commentary. ---- */
    {
      id: 'az-41642101',
      title: "Electroencephalographic findings and 5-year risk of posttraumatic epilepsy after mild traumatic brain injury: insights from Second Karabakh War veterans",
      authors: ["Javid Shafiyev", "Ömer Karadaş", "Gardashkhan Karımzada", "et al."],
      journal: "Epilepsia",
      year: 2026,
      doi: "10.1002/epi.70137",
      pmid: '41642101',
      topics: ["epilepsy", "trauma", "clinical"],
      origin: 'az',
      summary: {
        en: "Follows 2,000 veterans of the Second Karabakh War for five years to ask whether a mild head injury raises the later risk of epilepsy, and whether early EEG findings and blast injuries predict it. A rare long-term study from Azerbaijan on a question every neurology student meets.",
        az: "İkinci Qarabağ müharibəsinin 2000 veteranını beş il izləyərək yüngül kəllə-beyin travmasının sonradan epilepsiya riskini artırıb-artırmadığını, erkən EEG tapıntılarının və partlayış travmasının bunu proqnozlaşdırıb-proqnozlaşdırmadığını araşdırır. Hər nevrologiya tələbəsinin qarşılaşdığı suala Azərbaycandan nadir uzunmüddətli cavab.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/41642101/',
    },
    {
      id: 'az-40954435',
      title: "Long-term outcomes of mild traumatic brain injury in veterans of the second Nagorno-Karabakh war",
      authors: ["Javid Shafiyev", "Anar İsmayılov", "Azar Aliyev", "et al."],
      journal: "Neurological Sciences",
      year: 2025,
      doi: "10.1007/s10072-025-08509-9",
      pmid: '40954435',
      topics: ["trauma", "clinical"],
      origin: 'az',
      summary: {
        en: "Tracks headache, memory problems, dizziness, tinnitus, sleep trouble and irritability in 1,280 veterans after a mild brain injury, comparing blast and non-blast injuries. Shows what “concussion symptoms” look like over years, not days.",
        az: "Yüngül beyin travmasından sonra 1280 veteranda baş ağrısı, yaddaş problemləri, başgicəllənmə, qulaq küyü, yuxu pozuntusu və əsəbiliyi izləyir, partlayış və digər travmaları müqayisə edir. “Beyin silkələnməsi əlamətlərinin” günlərlə yox, illərlə necə davam etdiyini göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/40954435/',
    },
    {
      id: 'az-42760997',
      title: "Healthcare providers' perspectives on headache care in Azerbaijan: results of a national cross-sectional survey",
      authors: ["Sarkhan Amirguliyev", "Aynur Özge", "Derya Uludüz", "et al."],
      journal: "Frontiers in Neurology",
      year: 2026,
      doi: "10.3389/fneur.2026.1886668",
      pmid: '42760997',
      topics: ["migraine", "clinical"],
      origin: 'az',
      summary: {
        en: "A national survey of 333 neurologists, family doctors, pharmacists and paediatricians on how headaches are diagnosed and treated in Azerbaijan. Useful for seeing how brain science turns into everyday care in our own health system.",
        az: "Azərbaycanda baş ağrılarının necə diaqnoz qoyulub müalicə olunduğuna dair 333 nevroloq, ailə həkimi, əczaçı və pediatr arasında aparılmış milli sorğu. Beyin elminin öz səhiyyə sistemimizdə gündəlik qayğıya necə çevrildiyini görmək üçün faydalıdır.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/42760997/',
    },
    {
      id: 'az-42127663',
      title: "Clinical spectrum and genetic landscape of Duchenne muscular dystrophy in Azerbaijan",
      authors: ["Aytan Mammadbayli", "Madina Taghiyeva"],
      journal: "European Journal of Paediatric Neurology",
      year: 2026,
      doi: "10.1016/j.ejpn.2026.05.002",
      pmid: '42127663',
      topics: ["genetics", "clinical"],
      origin: 'az',
      summary: {
        en: "The first nationwide group of boys with Duchenne muscular dystrophy in Azerbaijan, studied at the Azerbaijan Medical University: muscle strength, timed motor tests and the gene mutations behind the disease. A clear example of how genes, nerves and muscles connect.",
        az: "Azərbaycanda Duşen əzələ distrofiyası olan oğlanların ilk ölkə miqyaslı qrupu, Azərbaycan Tibb Universitetində öyrənilib: əzələ gücü, vaxtlı hərəki testlər və xəstəliyin arxasındakı gen mutasiyaları. Genlərin, sinirlərin və əzələlərin necə bağlı olduğunu aydın göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/42127663/',
    },
    {
      id: 'az-39926687',
      title: "Clinical and epidemiological characteristics of multiple sclerosis in the southern region of the Republic of Azerbaijan",
      authors: ["Rahim R. Aliyev", "Shahla N. Mehtiyeva", "Rana K. Shiraliyeva"],
      journal: "Pakistan Journal of Medical Sciences",
      year: 2025,
      doi: "10.12669/pjms.41.2.11373",
      pmid: '39926687',
      topics: ["multiple sclerosis", "epidemiology"],
      origin: 'az',
      summary: {
        en: "Ten years (2013–2022) of multiple sclerosis cases in southern Azerbaijan, with incidence and prevalence calculated for a population of about 930,000. Shows how common this immune attack on myelin is in our region.",
        az: "Cənubi Azərbaycanda on illik (2013–2022) dağınıq skleroz halları; təxminən 930 min nəfərlik əhali üçün yeni hal və yayılma göstəriciləri hesablanıb. Mielinə qarşı bu immun hücumun bölgəmizdə nə qədər yayıldığını göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/39926687/',
    },
    {
      id: 'az-22229328',
      title: "The prevalence of epilepsy in the Nakhichevan Autonomous Republic of Azerbaijan",
      authors: ["Sharif I. Magalov", "Nusrat F. Hasanov", "Nargiz X. Azizova", "et al."],
      journal: "CNS & Neurological Disorders – Drug Targets",
      year: 2012,
      doi: "10.2174/187152712800269768",
      pmid: '22229328',
      topics: ["epilepsy", "epidemiology"],
      origin: 'az',
      summary: {
        en: "Researchers went door to door in 69 villages and towns of the Sharur district (about 114,000 people) to count people with epilepsy, using a capture–recapture method. A good lesson in how disease numbers are actually measured.",
        az: "Tədqiqatçılar Şərur rayonunun 69 kənd və qəsəbəsində (təxminən 114 min nəfər) qapı-qapı gəzərək epilepsiyalı insanları “tutma–təkrar tutma” üsulu ilə sayıblar. Xəstəlik rəqəmlərinin əslində necə ölçüldüyünə dair yaxşı dərs.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/22229328/',
    },
    {
      id: 'az-34932290',
      title: "[Incidence and prevalence of Parkinson's disease in Baku]",
      authors: ["F. N. Aliyeva"],
      journal: "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
      year: 2021,
      doi: "10.17116/jnevro202112111177",
      pmid: '34932290',
      topics: ["parkinson", "epidemiology"],
      origin: 'az',
      summary: {
        en: "How many people in Baku were diagnosed with Parkinson’s disease from 2010 to 2019, and how that number changed, with patients examined at the Azerbaijan Medical University neurology clinic. Written in Russian; pairs with AXON’s basal ganglia and dopamine pathways.",
        az: "2010–2019-cu illərdə Bakıda neçə nəfərə Parkinson xəstəliyi diaqnozu qoyulduğu və bu rəqəmin necə dəyişdiyi; xəstələr Azərbaycan Tibb Universitetinin nevrologiya klinikasında müayinə olunub. Rus dilindədir; AXON-dakı bazal nüvələr və dopamin yolları ilə birlikdə oxuyun.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/34932290/',
    },
    {
      id: 'az-41932156',
      title: "Seizure control, delivery, and neonatal outcomes according to parity in women with epilepsy: a prospective cohort study",
      authors: ["Shahla Melikova", "Aytan Mammadbayli"],
      journal: "Epilepsy Research",
      year: 2026,
      doi: "10.1016/j.eplepsyres.2026.107791",
      pmid: '41932156',
      topics: ["epilepsy", "pregnancy", "clinical"],
      origin: 'az',
      summary: {
        en: "Compares 112 pregnant women with epilepsy with 285 women without it, looking at first versus later pregnancies, seizure control and the health of the babies. Part of a long-running Baku research line on epilepsy and pregnancy.",
        az: "Epilepsiyası olan 112 hamilə qadını epilepsiyası olmayan 285 qadınla müqayisə edir: ilk və sonrakı hamiləliklər, tutmaların nəzarəti və körpələrin sağlamlığı. Bakıda epilepsiya və hamiləlik üzrə uzun müddətdir davam edən tədqiqat xəttinin bir hissəsi.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/41932156/',
    },
    {
      id: 'az-40783352',
      title: "Factors predicting seizure control and delivery outcomes in women with epilepsy with planned and unplanned pregnancy",
      authors: ["S. Melikova", "A. Mammadbayli", "A. Guekht"],
      journal: "Revue Neurologique",
      year: 2025,
      doi: "10.1016/j.neurol.2025.07.006",
      pmid: '40783352',
      topics: ["epilepsy", "pregnancy", "clinical"],
      origin: 'az',
      summary: {
        en: "Eight years of follow-up of 112 pregnant women with epilepsy, asking whether planning a pregnancy changes seizure control and birth outcomes. Shows why neurologists ask about seizures in the year before pregnancy.",
        az: "Epilepsiyası olan 112 hamilə qadının səkkiz illik izlənməsi: hamiləliyin planlaşdırılması tutmaların nəzarətinə və doğuş nəticələrinə təsir edirmi? Nevroloqların niyə hamiləlikdən əvvəlki ildəki tutmaları soruşduğunu göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/40783352/',
    },
    {
      id: 'az-32805607',
      title: "New-onset epilepsy in pregnant women: clinical features and delivery outcomes",
      authors: ["Shahla Melikova", "Hijran Bagirova", "Sharif Magalov"],
      journal: "Seizure",
      year: 2020,
      doi: "10.1016/j.seizure.2020.08.004",
      pmid: '32805607',
      topics: ["epilepsy", "pregnancy", "clinical"],
      origin: 'az',
      summary: {
        en: "Looks at the rare women whose very first seizure happens during pregnancy, followed by a neurologist and an obstetrician in Baku. Explains why a first seizure in pregnancy needs careful investigation.",
        az: "İlk tutması məhz hamiləlik zamanı baş verən nadir qadınlara baxır; onlar Bakıda nevroloq və mama-ginekoloq tərəfindən izlənib. Hamiləlikdə ilk tutmanın niyə diqqətlə araşdırılmalı olduğunu izah edir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32805607/',
    },
    {
      id: 'az-29981006',
      title: "The course of epilepsy and seizure control in pregnant women",
      authors: ["Shahla Melikova", "Hijran Bagirova", "Sharif Magalov"],
      journal: "Acta Neurologica Belgica",
      year: 2018,
      doi: "10.1007/s13760-018-0974-0",
      pmid: '29981006',
      topics: ["epilepsy", "pregnancy", "clinical"],
      origin: 'az',
      summary: {
        en: "Follows 105 pregnant women with epilepsy (2013–2017): for some, seizures became more frequent, for others less, and some stayed seizure-free. A clear picture of how unpredictable epilepsy can be during pregnancy.",
        az: "Epilepsiyası olan 105 hamilə qadını izləyir (2013–2017): bəzilərində tutmalar tezləşib, bəzilərində azalıb, bəziləri isə tutmasız qalıb. Hamiləlik zamanı epilepsiyanın nə qədər gözlənilməz ola biləcəyinin aydın mənzərəsi.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/29981006/',
    },
    {
      id: 'az-32207734',
      title: "[The problem of depression in women with epilepsy during pregnancy and after childbirth]",
      authors: ["S. Ya. Melikova"],
      journal: "Zhurnal Nevrologii i Psikhiatrii imeni S.S. Korsakova",
      year: 2019,
      doi: "10.17116/jnevro201911911270",
      pmid: '32207734',
      topics: ["epilepsy", "mental health", "pregnancy"],
      origin: 'az',
      summary: {
        en: "A review of why depression and anxiety are more common in women with epilepsy during pregnancy and after birth, and how medicines affect mother and baby. Written in Russian; links brain disease with mood.",
        az: "Epilepsiyası olan qadınlarda hamiləlik zamanı və doğuşdan sonra depressiya və narahatlığın niyə daha çox rast gəlindiyi, dərmanların ana və körpəyə təsiri haqqında icmal. Rus dilindədir; beyin xəstəliyini əhval-ruhiyyə ilə bağlayır.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/32207734/',
    },
    {
      id: 'az-28993543',
      title: "Psychiatric and behavioural problems in children and adolescents with epilepsy",
      authors: ["K. A. Salayev", "B. Sanne", "R. Salayev"],
      journal: "East Asian Archives of Psychiatry",
      year: 2017,
      pmid: '28993543',
      topics: ["epilepsy", "mental health", "children"],
      origin: 'az',
      summary: {
        en: "Compares children with epilepsy from a medical centre in Azerbaijan with children from three schools, using a standard questionnaire for parents. Shows that epilepsy is not only about seizures but also about attention, emotions and behaviour.",
        az: "Azərbaycandakı tibb mərkəzindən epilepsiyalı uşaqları üç məktəbin şagirdləri ilə valideynlər üçün standart sorğu vasitəsilə müqayisə edir. Epilepsiyanın yalnız tutmalarla deyil, diqqət, emosiyalar və davranışla da bağlı olduğunu göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/28993543/',
    },
    {
      id: 'az-40536825',
      title: "The effectiveness of cognitive processing therapy for posttraumatic stress disorder in Azerbaijan",
      authors: ["Jamila Ismayilova", "Josef I. Ruzek", "Gunel Muradova", "et al."],
      journal: "Journal of Traumatic Stress",
      year: 2025,
      doi: "10.1002/jts.23183",
      pmid: '40536825',
      topics: ["mental health", "trauma"],
      origin: 'az',
      summary: {
        en: "A pilot project in which local clinicians gave cognitive processing therapy to 103 people with PTSD in Azerbaijan, measuring symptoms over three months. A look at how talking therapy changes the way the brain handles traumatic memories.",
        az: "Yerli klinisistlərin Azərbaycanda TSSP olan 103 nəfərə koqnitiv emal terapiyası tətbiq etdiyi və simptomları üç ay ərzində ölçdüyü pilot layihə. Danışıq terapiyasının beynin travmatik xatirələri emal etmə tərzini necə dəyişdiyinə baxış.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/40536825/',
    },
    {
      id: 'az-38501640',
      title: "Determination of the severity of traumatic brain injuries by methods of radiation diagnostics",
      authors: ["G. Gasimzade"],
      journal: "Georgian Medical News",
      year: 2024,
      pmid: '38501640',
      topics: ["trauma", "imaging"],
      origin: 'az',
      summary: {
        en: "Compares CT and MRI in nearly 1,000 injured patients to see which finds traumatic brain injuries best. A practical companion to AXON’s brain-scan pages.",
        az: "Təxminən 1000 xəsarət almış xəstədə kəllə-beyin travmalarını hansı üsulun daha yaxşı aşkar etdiyini görmək üçün KT və MRT-ni müqayisə edir. AXON-un beyin skanları səhifələri ilə praktik cütlük.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/38501640/',
    },
    {
      id: 'az-26048608',
      title: "A blackhole over brain: interdural hematoma — a challenging diagnosis",
      authors: ["Rasim Babayev", "Murat Şakir Ekşi"],
      journal: "Neurologia i Neurochirurgia Polska",
      year: 2015,
      doi: "10.1016/j.pjnns.2015.04.005",
      pmid: '26048608',
      topics: ["neurosurgery", "imaging", "meninges"],
      origin: 'az',
      summary: {
        en: "A case report of a very rare bleed that forms between two layers of the dura mater, with a review of how it is diagnosed and treated. Read it alongside the meninges atlas.",
        az: "Sərt beyin qişasının (dura) iki qatı arasında yaranan çox nadir qansızmanın klinik halı və onun diaqnoz və müalicəsinə dair icmal. Beyin qişaları atlası ilə birlikdə oxuyun.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/26048608/',
    },
    {
      id: 'az-42573850',
      title: "P2X7 signaling in neuroinflammation: glial crosstalk, redox integration, and therapeutic targeting",
      authors: ["Gunel Ayyubova", "Tamilla Sultanova", "Shahana Gurbanova", "et al."],
      journal: "Journal of Molecular Neuroscience",
      year: 2026,
      doi: "10.1007/s12031-026-02581-2",
      pmid: '42573850',
      topics: ["glia", "inflammation"],
      origin: 'az',
      summary: {
        en: "A review of how ATP released by stressed cells switches glial cells from helping neurons to inflaming the brain, through the P2X7 receptor. Good next step after learning what glia are.",
        az: "Stres altındakı hüceyrələrin buraxdığı ATP-nin P2X7 reseptoru vasitəsilə qliya hüceyrələrini neyronlara kömək etməkdən beyni iltihablaşdırmağa necə keçirdiyinə dair icmal. Qliyanın nə olduğunu öyrəndikdən sonra yaxşı növbəti addım.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/42573850/',
    },
    {
      id: 'az-41596124',
      title: "Roles of reactive oxygen species in relationships between viral infections and Alzheimer's disease and related dementia",
      authors: ["Gunel Ayyubova", "Fariha E. Bablu", "Nazrin Rahimli", "et al."],
      journal: "Antioxidants",
      year: 2026,
      doi: "10.3390/antiox15010066",
      pmid: '41596124',
      topics: ["alzheimer", "dementia"],
      origin: 'az',
      summary: {
        en: "Reviews the evidence that viruses such as herpes and coronaviruses may play a part in Alzheimer’s disease, with oxidative stress as a possible link. Shows how an open research question is argued.",
        az: "Herpes və koronavirus kimi virusların Alzheimer xəstəliyində rol oynaya biləcəyinə dair sübutları, mümkün əlaqə kimi oksidləşdirici stresslə birlikdə nəzərdən keçirir. Açıq elmi sualın necə müzakirə olunduğunu göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/41596124/',
    },
    {
      id: 'az-38398788',
      title: "The role of furin in the pathogenesis of COVID-19-associated neurological disorders",
      authors: ["Gunel Ayyubova", "Sergiy G. Gychka", "Sofia I. Nikolaienko", "et al."],
      journal: "Life",
      year: 2024,
      doi: "10.3390/life14020279",
      pmid: '38398788',
      topics: ["infection", "clinical"],
      origin: 'az',
      summary: {
        en: "Explains how the enzyme furin helps the COVID-19 virus enter cells, and why that may matter for the neurological problems seen in some patients. Connects molecular biology to the nervous system.",
        az: "Furin fermentinin COVID-19 virusunun hüceyrələrə daxil olmasına necə kömək etdiyini və bunun bəzi xəstələrdə görülən nevroloji problemlər üçün niyə vacib ola biləcəyini izah edir. Molekulyar biologiyanı sinir sistemi ilə bağlayır.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/38398788/',
    },
    {
      id: 'az-36637116',
      title: "TREM2 signalling as a multifaceted player in brain homoeostasis and a potential target for Alzheimer's disease treatment",
      authors: ["Gunel Ayyubova"],
      journal: "European Journal of Neuroscience",
      year: 2023,
      doi: "10.1111/ejn.15914",
      pmid: '36637116',
      topics: ["alzheimer", "glia"],
      origin: 'az',
      summary: {
        en: "A single-author review on TREM2, a receptor on microglia (the brain’s immune cells) whose mutations raise the risk of late-onset Alzheimer’s disease. Shows how genetics points researchers to new treatment targets.",
        az: "Mutasiyaları gec başlayan Alzheimer xəstəliyi riskini artıran, mikroqliyada (beynin immun hüceyrələri) yerləşən TREM2 reseptoru haqqında tək müəllifli icmal. Genetikanın tədqiqatçıları yeni müalicə hədəflərinə necə yönəltdiyini göstərir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/36637116/',
    },
    {
      id: 'az-38304064',
      title: "Impact of dihydropyrimidinase-related protein 2 in memory formation on rats and its possible role in neuronal back remodeling",
      authors: ["Arif A. Mekhtiev", "Shamsiyya M. Asadova"],
      journal: "IBRO Neuroscience Reports",
      year: 2024,
      doi: "10.1016/j.ibneur.2024.01.001",
      pmid: '38304064',
      topics: ["memory", "hippocampus", "experimental"],
      origin: 'az',
      summary: {
        en: "Rat experiments from Baku on a protein complex that seems to act as a brake on memory: blocking it with antibodies strengthened learning and changed growth factors in the hippocampus. Continues a research line started decades ago.",
        az: "Bakıda siçovullar üzərində aparılmış təcrübələr: yaddaşa “əyləc” kimi təsir edən zülal kompleksi antikorlarla bloklananda öyrənmə güclənib və hippokampda böyümə faktorları dəyişib. Onilliklər əvvəl başlanmış tədqiqat xəttinin davamıdır.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/38304064/',
    },
    {
      id: 'az-11177230',
      title: "Detection of protein with anticonsolidation properties in the rat brain",
      authors: ["A. A. Mekhtiev"],
      journal: "Bulletin of Experimental Biology and Medicine",
      year: 2000,
      doi: "10.1007/BF02766081",
      pmid: '11177230',
      topics: ["memory", "experimental"],
      origin: 'az',
      summary: {
        en: "Describes isolating a rat brain protein that disturbed memory consolidation when injected, suggesting nerve cells have a molecular switch for storing memories. The starting point of the line above.",
        az: "Yeridildikdə yaddaşın möhkəmlənməsini pozan siçovul beyni zülalının ayrılmasını təsvir edir; sinir hüceyrələrində xatirələri saxlamaq üçün molekulyar açar olduğunu güman edir. Yuxarıdakı tədqiqat xəttinin başlanğıcı.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/11177230/',
    },
    {
      id: 'az-15587807',
      title: "Selective effects of antibodies to protein SMP-69 on the activity of defensive behavior command neurons in the common snail",
      authors: ["A. A. Mekhtiev", "S. A. Kozyrev", "V. P. Nikitin", "et al."],
      journal: "Neuroscience and Behavioral Physiology",
      year: 2004,
      doi: "10.1023/b:neab.0000038129.66735.ad",
      pmid: '15587807',
      topics: ["neurons", "experimental"],
      origin: 'az',
      summary: {
        en: "Uses the snail’s large, easy-to-record “command neurons” for defensive behaviour to test how the same memory-related protein changes a neuron’s excitability. A classic simple-animal approach to learning.",
        az: "Müdafiə davranışının ilbizdəki iri, asan qeydə alınan “komanda neyronlarından” istifadə edərək eyni yaddaş zülalının neyronun oyanıqlığını necə dəyişdiyini yoxlayır. Öyrənməni sadə heyvanlarda öyrənməyin klassik yolu.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/15587807/',
    },
    {
      id: 'az-42570284',
      title: "Investigation of the efficacy of stem cell therapy in a rat model of cyclophosphamide-induced neurotoxicity",
      authors: ["Javid Sardarzada", "Aytaj Jafarzade", "Elvan Anadol", "et al."],
      journal: "Restorative Neurology and Neuroscience",
      year: 2026,
      doi: "10.1177/09226028261470927",
      pmid: '42570284',
      topics: ["stem cells", "experimental"],
      origin: 'az',
      summary: {
        en: "Tests whether stem cells from the umbilical cord can protect the rat nervous system from damage caused by a common chemotherapy drug. An example of how new treatments are tried in animals first.",
        az: "Göbək ciyəsindən alınan kök hüceyrələrin geniş istifadə olunan kimyaterapiya dərmanının siçovul sinir sisteminə vurduğu zərərdən qoruya bilib-bilmədiyini yoxlayır. Yeni müalicələrin əvvəlcə heyvanlarda necə sınaqdan keçirildiyinə nümunə.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/42570284/',
    },
    {
      id: 'az-26638002',
      title: "Activity of phosphate-dependent glutaminase in the brain of rats exposed to prenatal hypoxia during organogenesis",
      authors: ["L. B. Gadirova", "T. M. Agaev"],
      journal: "Bulletin of Experimental Biology and Medicine",
      year: 2015,
      doi: "10.1007/s10517-015-3123-2",
      pmid: '26638002',
      topics: ["development", "experimental"],
      origin: 'az',
      summary: {
        en: "Measures an enzyme that makes the neurotransmitter glutamate in different brain regions of rats whose mothers lacked oxygen during pregnancy, from birth to six months. Links brain development, oxygen and chemistry.",
        az: "Anaları hamiləlik zamanı oksigen çatışmazlığı yaşamış siçovulların müxtəlif beyin nahiyələrində doğuşdan altı aylığa qədər glutamat neyromediatorunu hazırlayan fermenti ölçür. Beynin inkişafını, oksigeni və kimyanı bağlayır.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/26638002/',
    },
    {
      id: 'az-31512425',
      title: "[Peculiarities of the functional state of the brain in long-livers and their relatives]",
      authors: ["U. F. Hashimova", "A. R. Allahverdiyev", "E. O. Bayramova", "et al."],
      journal: "Advances in Gerontology",
      year: 2019,
      pmid: '31512425',
      topics: ["eeg", "ageing"],
      origin: 'az',
      summary: {
        en: "Compares the EEG brain rhythms (delta, theta, alpha, beta) of rural Azerbaijani long-livers, their relatives and families without long-livers. Azerbaijan is famous for its long-livers; written in Russian.",
        az: "Kənddə yaşayan azərbaycanlı uzunömürlülərin, onların qohumlarının və uzunömürlü olmayan ailələrin EEG beyin ritmlərini (delta, teta, alfa, beta) müqayisə edir. Azərbaycan uzunömürlüləri ilə məşhurdur; rus dilindədir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/31512425/',
    },
    {
      id: 'az-14502975',
      title: "[Neurophysiological study of short-latency potentials in central structures of visual system and their relations to additional oscillations in retina]",
      authors: ["N. M. Rzaeva"],
      journal: "Rossiiskii Fiziologicheskii Zhurnal imeni I.M. Sechenova",
      year: 2003,
      pmid: '14502975',
      topics: ["vision", "experimental"],
      origin: 'az',
      summary: {
        en: "Recordings in rabbits from the retina, lateral geniculate body, superior colliculus and visual cortex show very early electrical signals after a flash of light. Follows the same stations as AXON’s visual pathway atlas; written in Russian.",
        az: "Dovşanlarda retina, lateral dizəbənzər cisim, yuxarı təpəcik və görmə qabığından aparılmış qeydlər işıq çaxmasından sonra çox erkən elektrik siqnallarını göstərir. AXON-un görmə yolu atlasındakı eyni stansiyaları izləyir; rus dilindədir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/14502975/',
    },
    {
      id: 'az-8065559',
      title: "Influence of motivational centers of the hypothalamus on the functioning of the visual area of cerebral cortex",
      authors: ["N. A. Gadzhieva", "A. I. Dmitrenko"],
      journal: "Neuroscience and Behavioral Physiology",
      year: 1994,
      doi: "10.1007/BF02355680",
      pmid: '8065559',
      topics: ["vision", "hypothalamus", "experimental"],
      origin: 'az',
      summary: {
        en: "Shows that stimulating hunger- and motivation-related nuclei of the hypothalamus first blocks, then boosts, the visual cortex’s response to a flash of light. Motivation literally changes what the cortex sees.",
        az: "Hipotalamusun aclıq və motivasiya ilə bağlı nüvələrinin stimullaşdırılmasının görmə qabığının işıq çaxmasına cavabını əvvəlcə bloklayıb, sonra gücləndirdiyini göstərir. Motivasiya qabığın gördüyünü sözün həqiqi mənasında dəyişir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/8065559/',
    },
    {
      id: 'az-2755608',
      title: "Changes in reactivity of neurons of the visual cortex under influence of the posterolateral hypothalamus and the nuclei of the midbrain raphe",
      authors: ["G. G. Gasanov", "Z. G. Mamedov", "N. F. Samedova"],
      journal: "Neuroscience and Behavioral Physiology",
      year: 1989,
      doi: "10.1007/BF01190464",
      pmid: '2755608',
      topics: ["vision", "serotonin", "experimental"],
      origin: 'az',
      summary: {
        en: "Classic Baku physiology: how the hypothalamus and the serotonin-producing raphe nuclei change the way single visual-cortex neurons respond to repeated light. Pairs with AXON’s serotonin pathway.",
        az: "Klassik Bakı fiziologiyası: hipotalamus və serotonin hazırlayan tikiş (rafe) nüvələri ayrı-ayrı görmə qabığı neyronlarının təkrarlanan işığa cavabını necə dəyişir. AXON-dakı serotonin yolu ilə cütləşir.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/2755608/',
    },
    {
      id: 'az-8413915',
      title: "A comparative analysis of learning and exploratory behavior of rats with varying resistance to stressor influences and the level of brain monoamines",
      authors: ["K. Yu. Ismailova", "T. P. Semenova", "A. E. Fast", "et al."],
      journal: "Neuroscience and Behavioral Physiology",
      year: 1993,
      doi: "10.1007/BF01183026",
      pmid: '8413915',
      topics: ["stress", "learning", "experimental"],
      origin: 'az',
      summary: {
        en: "Rats that resist stress learned and explored differently from stress-sensitive rats, and the study compared levels of brain monoamines such as dopamine and serotonin in the two groups. An early look at why individuals cope with stress differently.",
        az: "Stresə davamlı siçovullar stresə həssas olanlardan fərqli öyrənib və kəşf ediblər; tədqiqat iki qrupda dopamin və serotonin kimi beyin monoaminlərinin səviyyəsini də müqayisə edib. İnsanların stresin öhdəsindən niyə fərqli gəldiyinə erkən baxış.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/8413915/',
    },
    {
      id: 'az-1977096',
      title: "Influence of neurohypophyseal peptides on the formation of active avoidance conditioned reflex behavior",
      authors: ["R. Sh. Ibragimov"],
      journal: "Neuroscience and Behavioral Physiology",
      year: 1990,
      doi: "10.1007/BF01195453",
      pmid: '1977096',
      topics: ["hormones", "hippocampus", "experimental"],
      origin: 'az',
      summary: {
        en: "Vasopressin and oxytocin, the hormones of the posterior pituitary, were injected into the hippocampus of rats: one helped learning to avoid danger, the other had the opposite effect. Hormones and memory in one experiment.",
        az: "Arxa hipofizin hormonları olan vazopressin və oksitosin siçovulların hippokampına yeridilib: biri təhlükədən qaçmağı öyrənməyə kömək edib, digəri əks təsir göstərib. Hormonlar və yaddaş bir təcrübədə.",
      },
      access: 'link',
      sourceUrl: 'https://pubmed.ncbi.nlm.nih.gov/1977096/',
    },
  ];

  var sortMode = 'year';
  var activeTopic = null;
  var activeOrigin = null; /* null | 'az' | 'intl' */
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
    if (activeOrigin === 'az' && article.origin !== 'az') return false;
    if (activeOrigin === 'intl' && article.origin === 'az') return false;
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

    var originRoot = document.getElementById('articles-origin');
    if (originRoot) {
      originRoot.replaceChildren();
      [[null, UI.originAll], ['az', UI.originAz], ['intl', UI.originIntl]].forEach(function (o) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'articles-topic articles-origin__btn' + (activeOrigin === o[0] ? ' is-active' : '');
        b.textContent = localized(o[1]);
        b.addEventListener('click', function () {
          activeOrigin = o[0];
          render();
        });
        originRoot.appendChild(b);
      });
      var note = document.getElementById('articles-origin-note');
      if (note) {
        var n = ARTICLES.filter(function (a) { return a.origin === 'az'; }).length;
        note.textContent = fill(localized(UI.originCount), { n: String(n) });
      }
    }

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

  /* Readers don't need licence plumbing in every summary; the page footer covers access rules. */
  var ACCESS_NOTE = /(Europe PMC|CC BY|CC-BY|Creative Commons|link-?only|linked only|linked, not hosted|not hosted|host (the|edir)|PDF|keçid(lə)? veril|yalnız keçid|host etmirik|host edilmir|lisenziya|nəşriyyat PDF)/i;
  function cleanSummary(text) {
    var parts = String(text || '').match(/[^.!?]+[.!?]+(\s|$)|[^.!?]+$/g) || [text];
    var kept = parts.filter(function (p) { return !ACCESS_NOTE.test(p); });
    return (kept.length ? kept : parts).join('').trim();
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
    hint.textContent = cleanSummary(localized(article.summary));

    var tags = document.createElement('div');
    tags.className = 'article-choice-card__tags';
    (article.topics || []).forEach(function (topic) {
      var span = document.createElement('span');
      span.className = 'article-choice-card__tag';
      span.textContent = topic;
      tags.appendChild(span);
    });

    if (article.origin === 'az') {
      var az = document.createElement('span');
      az.className = 'article-choice-card__tag article-choice-card__tag--az';
      az.textContent = '🇦🇿 ' + localized(UI.originBadge);
      tags.insertBefore(az, tags.firstChild);
    }

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
