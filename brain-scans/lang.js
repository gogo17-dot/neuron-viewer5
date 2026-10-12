const STORAGE_KEY = 'neyron_scans_lang';

const STRINGS = {
  en: {
    'nav.back': '← Atlases',
    'scans.title': 'Brain scans',
    'scans.hintDefault': 'Click and drag to move the crosshair. Right-drag adjusts brightness and contrast.',
    'scans.row.scan': 'Scan',
    'scans.row.overlay': 'Overlay',
    'scans.row.view': 'View',
    'scans.opacity': 'opacity',
    'scans.region': 'Region',
    'scans.mni': 'MNI (mm)',
    'scans.voxel': 'Voxel',
    'scans.intensity': 'Intensity',
    'scans.loadingViewer': 'Loading viewer…',
    'scans.loading': 'Loading {name}…',
    'scans.loadError': 'Could not load {file}. Check your connection, or the file may have moved. ({error})',
    'scans.webglError':
      'Could not start the viewer. This page needs WebGL 2.0 — try Chrome or Firefox. On Safari you may need to enable WebGL 2.0 in settings.',
    'scans.labelsUnavailable': '(labels unavailable)',
    'scans.hint.drag': 'drag · move crosshair',
    'scans.hint.right': 'right-drag · brightness / contrast',
    'scans.hint.scroll': 'scroll · change slice',
    'scans.frame': 'time',
    'scans.frameVal': '{frame} / {total}',
    'scans.overlayLocked':
      'Atlas overlays only align on the MRI template (MNI space). Switch back to MRI template to label regions.',
    'scans.tip':
      'Coloured atlas regions are on. The crosshair starts on a labelled structure — drag to explore.',
    'scans.tipGotIt': 'Got it',
    'scans.open3d': 'Open in Brain structures →',
    'scans.openMri': 'View on MRI →',
    'note.putamen': 'Putamen — motor and habit circuits of the basal ganglia; often involved in movement disorders.',
    'note.caudate': 'Caudate — goal-directed action and associative striatum; borders the lateral ventricle.',
    'note.accumbens': 'Nucleus accumbens — ventral striatum hub for reward and motivation.',
    'note.pallidum': 'Globus pallidus — major basal-ganglia output (GPe/GPi) shaping thalamic motor drive.',
    'note.sn': 'Substantia nigra — dopamine source for the striatum; loss here is central to Parkinson disease.',
    'note.stn': 'Subthalamic nucleus — key node in the indirect pathway; a common deep-brain stimulation target.',
    'note.red': 'Red nucleus — midbrain motor relay linked to the rubrospinal system.',
    'note.thalamus': 'Thalamus — gateway relaying sensory and motor information to cortex.',
    'note.hippo': 'Hippocampal formation — episodic memory encoding; vulnerable in temporal-lobe epilepsy and Alzheimer disease.',
    'note.amygdala': 'Amygdala — threat, emotion, and autonomic responses in the medial temporal lobe.',
    'note.v1': 'Primary visual cortex (V1) — first cortical stage of conscious vision, around the calcarine sulcus.',
    'note.a1': 'Primary auditory cortex (Heschl) — first cortical stage of hearing in the superior temporal plane.',
    'note.m1': 'Primary motor cortex — voluntary movement; the precentral homunculus.',
    'note.s1': 'Primary somatosensory cortex — touch and proprioception on the postcentral gyrus.',
    'note.cerebellum': 'Cerebellum — coordination, timing, and motor learning across lobules and deep nuclei.',
    'scans.footer':
      'Imaging data courtesy of Chris Rorden, McCausland Center for Brain Imaging (CC&nbsp;BY-NC&nbsp;4.0), the ICBM&nbsp;152 Nonlinear atlases, and the respective atlas authors. Rendering by <a href="https://niivue.com" target="_blank" rel="noopener">NiiVue</a>. For education only — not for diagnostic use.',
    'view.multi': 'Multiplanar',
    'view.axial': 'Axial',
    'view.coronal': 'Coronal',
    'view.sagittal': 'Sagittal',
    'view.render': '3D',
    'atlas.none': 'None',
    'atlas.cit': 'Subcortical',
    'atlas.cereb': 'Cerebellum',
    'atlas.pd25': 'Midbrain',
    'atlas.jul': 'Cortex',
    'scan.mni152': 'MRI template',
    'scan.t1': 'MRI T1',
    'scan.t2': 'MRI T2',
    'scan.pd': 'Proton density',
    'scan.mra': 'Angiography',
    'scan.gd': 'Contrast',
    'scan.ct': 'CT',
    'scan.flair': 'FLAIR',
    'scan.dwi': 'DWI',
    'scan.activation': 'Activation',
    'scan.asl': 'Perfusion',
    'scans.more': 'More',
    'scans.less': 'Less',
    'nav.3d': 'Brain structures',
    'nav.ear': 'Auditory',
    'note.generic':
      '{name} — atlas parcel at the crosshair. Drag nearby to compare neighbouring regions.',
    'note.v2': 'Secondary visual cortex (V2) — surrounds V1 and begins feature integration for form and contour.',
    'note.broca': 'Inferior frontal (Broca neighbourhood) — speech production and articulation planning in the dominant hemisphere.',
    'note.insula': 'Insula — interoception, salience, and autonomic / visceral awareness deep in the Sylvian fissure.',
    'note.ofc': 'Orbitofrontal cortex — reward evaluation, social value, and decision making on the ventral frontal surface.',
    'note.cingulate': 'Cingulate cortex — attention, affect, and drive along the medial wall above the corpus callosum.',
    'note.ipl': 'Inferior parietal lobule — spatial attention, multimodal association, and language-related networks.',
    'note.spl': 'Superior parietal lobule — visuomotor coordination, spatial orientation, and reaching.',
    'note.hypothalamus': 'Hypothalamus — autonomic, endocrine, and homeostatic control at the base of the diencephalon.',
    'note.habenula': 'Habenula — epithalamic node linking limbic input to midbrain monoamine systems; involved in aversion and mood.',
    'note.parabrachial': 'Parabrachial region — brainstem relay for visceral sensation, taste, and autonomic / affective integration.',
    'note.vta': 'Ventral tegmental area — midbrain dopamine source for reward and motivational circuits.',
    'atlasPage.title': 'Atlases',
    'atlasPage.lead': 'Select a structure to explore in 3D, or open the MRI scan viewer.',
    'atlasPage.neuron.title': 'Neuron & Synapse',
    'atlasPage.neuron.body': 'Cellular structure of neurons, synaptic transmission, and network dynamics.',
    'atlasPage.neuron.tag': 'Coming soon',
    'atlasPage.scans.title': 'Brain scans',
    'atlasPage.scans.body':
      'Interactive MRI (incl. FLAIR/DWI), CT, activation maps and atlas overlays — multiplanar and 3D.',
    'atlasPage.scans.tag': 'Explore',
    'atlasPage.brain.title': 'Brain structures',
    'atlasPage.brain.body': 'Interactive cerebral hemisphere structures with clinical notes.',
    'atlasPage.brain.tag': 'Explore',
    'atlasPage.ear.title': 'Auditory pathway',
    'atlasPage.ear.body': 'From the auricle to auditory cortex — middle ear, cochlea, and brainstem relays.',
    'atlasPage.ear.tag': 'Explore',
  },
  az: {
    'nav.back': '← Atlaslar',
    'scans.title': 'Beyin skanları',
    'scans.hintDefault':
      'Kursoru hərəkət etdirmək üçün klikləyib sürükləyin. Sağ sürükləmə parlaqlıq və kontrastı dəyişir.',
    'scans.row.scan': 'Skan',
    'scans.row.overlay': 'Üst qat',
    'scans.row.view': 'Görünüş',
    'scans.opacity': 'şəffaflıq',
    'scans.region': 'Region',
    'scans.mni': 'MNI (mm)',
    'scans.voxel': 'Voksel',
    'scans.intensity': 'İntensivlik',
    'scans.loadingViewer': 'Baxış yüklənir…',
    'scans.loading': '{name} yüklənir…',
    'scans.loadError':
      '{file} yüklənmədi. İnternet bağlantınızı yoxlayın, və ya fayl köçürülmüş ola bilər. ({error})',
    'scans.webglError':
      'Baxış başladıla bilmədi. Bu səhifə WebGL 2.0 tələb edir — Chrome və ya Firefox sınayın. Safari-də WebGL 2.0-ı ayarlardan aktiv etmək lazım ola bilər.',
    'scans.labelsUnavailable': '(etiketlər mövcud deyil)',
    'scans.hint.drag': 'sürüklə · kursor',
    'scans.hint.right': 'sağ sürüklə · parlaqlıq / kontrast',
    'scans.hint.scroll': 'scroll · dilim dəyiş',
    'scans.frame': 'zaman',
    'scans.frameVal': '{frame} / {total}',
    'scans.overlayLocked':
      'Atlas üst qatları yalnız MRI şablonunda (MNI fəzası) düzgün oturur. Regionları görmək üçün MRI şablona qayıdın.',
    'scans.tip':
      'Rəngli atlas regionları açıqdır. Kursor etiketlənmiş strukturda başlayır — kəşf üçün sürükləyin.',
    'scans.tipGotIt': 'Anladım',
    'scans.open3d': 'Beyin strukturlarında aç →',
    'scans.openMri': 'MRI-də bax →',
    'note.putamen': 'Putamen — bazal qanqliyaların motor və vərdiş dövrləri; hərəkət pozuntularında tez-tez iştirak edir.',
    'note.caudate': 'Kaudat — məqsədyönlü hərəkət və assosiativ striatum; yan mədəciyə bitişikdir.',
    'note.accumbens': 'Nüvə akkumbens — mükafat və motivasiya üçün ventral striatum mərkəzi.',
    'note.pallidum': 'Qlobal pallidus — talamusa motor siqnalları formalaşdıran əsas çıxış (GPe/GPi).',
    'note.sn': 'Substantia nigra — striatuma dopamin mənbəyi; itkisi Parkinson xəstəliyinin mərkəzindədir.',
    'note.stn': 'Subtalamik nüvə — dolayı yolun əsas düyünü; dərin beyin stimulyasiyasının tez-tez hədəfi.',
    'note.red': 'Qırmızı nüvə — rubrospinal sistemlə bağlı orta beyin motor keçidi.',
    'note.thalamus': 'Talamus — sensor və motor məlumatı qabığa ötürən qapı.',
    'note.hippo': 'Hippokamp formasiyası — epizodik yaddaş; temporal epilepsiya və Alzheimerdə həssasdır.',
    'note.amygdala': 'Amiqdala — medial temporal payda təhlükə, emosiya və avtonom cavablar.',
    'note.v1': 'Birinci dərəcəli görmə qabığı (V1) — şüurlu görmənin ilk kortikal mərhələsi, kalkarin şırım ətrafında.',
    'note.a1': 'Birinci dərəcəli eşitmə qabığı (Heschl) — eşitmənin ilk kortikal mərhələsi.',
    'note.m1': 'Birinci dərəcəli motor qabıq — ixtiyari hərəkət; precentral homunkulus.',
    'note.s1': 'Birinci dərəcəli somatosensor qabıq — toxunma və propriosepsiya, postcentral qırışda.',
    'note.cerebellum': 'Beyincik — lobullar və dərin nüvələr üzrə koordinasiya, zamanlama və motor öyrənmə.',
    'scans.footer':
      'Görüntü məlumatları Chris Rorden, McCausland Center for Brain Imaging (CC&nbsp;BY-NC&nbsp;4.0), ICBM&nbsp;152 Nonlinear atlasları və müvafiq atlas müəlliflərinin izni ilə. Render: <a href="https://niivue.com" target="_blank" rel="noopener">NiiVue</a>. Yalnız tədris məqsədilə — diaqnostika üçün deyil.',
    'view.multi': 'Multiplanar',
    'view.axial': 'Aksial',
    'view.coronal': 'Koronal',
    'view.sagittal': 'Sağittal',
    'view.render': '3D',
    'atlas.none': 'Yox',
    'atlas.cit': 'Subkortikal',
    'atlas.cereb': 'Beyincik',
    'atlas.pd25': 'Orta beyin',
    'atlas.jul': 'Korteks',
    'scan.mni152': 'MRI şablon',
    'scan.t1': 'MRI T1',
    'scan.t2': 'MRI T2',
    'scan.pd': 'Proton sıxlığı',
    'scan.mra': 'Angioqrafiya',
    'scan.gd': 'Kontrast',
    'scan.ct': 'KT',
    'scan.flair': 'FLAIR',
    'scan.dwi': 'DWI',
    'scan.activation': 'Aktivasiya',
    'scan.asl': 'Perfüziya',
    'scans.more': 'Daha çox',
    'scans.less': 'Daha az',
    'nav.3d': 'Beyin strukturları',
    'nav.ear': 'Eşitmə',
    'note.generic':
      '{name} — kursorun altındakı atlas sahəsi. Qonşu strukturları müqayisə etmək üçün yaxınlığa sürükləyin.',
    'note.v2': 'İkinci dərəcəli görmə qabığı (V2) — V1-i əhatə edir və forma inteqrasiyasına başlayır.',
    'note.broca': 'Aşağı frontal (Broca ətrafı) — dominant yarımkürədə nitq istehsalı və artikulyasiya planı.',
    'note.insula': 'Insula — Silviy şırımının dərinində interosepsiya, salience və avtonom fərqindəlik.',
    'note.ofc': 'Orbitofrontal qabıq — ventral frontal səthdə mükafat qiymətləndirməsi və qərarvermə.',
    'note.cingulate': 'Sinqulyat qabıq — corpus callosum üstündə diqqət, affekt və motivasiya.',
    'note.ipl': 'Aşağı parietal pay — məkan diqqəti, multimodal assosiasiya və dil şəbəkələri.',
    'note.spl': 'Yuxarı parietal pay — vizuomotor koordinasiya və məkan oriyentasiyası.',
    'note.hypothalamus': 'Hipotalamus — diensefalon əsasında avtonom, endokrin və homeostatik nəzarət.',
    'note.habenula': 'Habenula — limbik girişi orta beyin monoamin sistemlərinə bağlayan epitalamik düyün.',
    'note.parabrachial': 'Parabraxial bölgə — visseral hiss, dad və avtonom/affektiv inteqrasiya üçün beyin sapı keçidi.',
    'note.vta': 'Ventral tegmental sahə — mükafat və motivasiya üçün orta beyin dopamin mənbəyi.',
    'atlasPage.title': 'Atlaslar',
    'atlasPage.lead': '3D kəşf üçün struktur seçin, və ya MRT skan baxışını açın.',
    'atlasPage.neuron.title': 'Neyron və Sinaps',
    'atlasPage.neuron.body': 'Neyronların hüceyrə quruluşu, sinaptik ötürmə və şəbəkə dinamikası.',
    'atlasPage.neuron.tag': 'Tezliklə',
    'atlasPage.scans.title': 'Beyin skanları',
    'atlasPage.scans.body':
      'Brauzerdə interaktiv MRT, KT, aktivasiya xəritələri və atlas üst qatları — multiplanar və 3D.',
    'atlasPage.scans.tag': 'Kəşf et',
    'atlasPage.brain.title': 'Beyin strukturları',
    'atlasPage.brain.body': 'Klinik qeydlərlə interaktiv beyin yarımkürəsi strukturları.',
    'atlasPage.brain.tag': 'Kəşf et',
    'atlasPage.ear.title': 'Eşitmə yolu',
    'atlasPage.ear.body': 'Qulaqcıqdan eşitmə qabığına — orta qulaq, koklea və beyin sapı keçidləri.',
    'atlasPage.ear.tag': 'Kəşf et',
  },
};

const listeners = new Set();

export function getLang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

export function setLang(lang) {
  const next = lang === 'az' ? 'az' : 'en';
  document.documentElement.lang = next;
  localStorage.setItem(STORAGE_KEY, next);
  applyDomStrings();
  for (const fn of listeners) fn(next);
}

export function t(key, vars = {}) {
  const table = STRINGS[getLang()] || STRINGS.en;
  let s = table[key] ?? STRINGS.en[key] ?? key;
  for (const [k, v] of Object.entries(vars)) {
    s = s.replaceAll(`{${k}}`, String(v));
  }
  return s;
}

export function onLangChange(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

function applyDomStrings() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (!key) return;
    if (el.hasAttribute('data-i18n-html')) {
      el.innerHTML = t(key);
    } else {
      el.textContent = t(key);
    }
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
    const key = el.getAttribute('data-i18n-aria');
    if (key) el.setAttribute('aria-label', t(key));
  });
}

export function initLang(onChange) {
  const siteLang = localStorage.getItem('neyron_lang');
  const saved = localStorage.getItem(STORAGE_KEY);
  const initial =
    siteLang === 'az' || siteLang === 'en'
      ? siteLang
      : saved === 'az' || saved === 'en'
        ? saved
        : 'en';
  document.documentElement.lang = initial;

  const toggle = document.getElementById('lang-toggle');
  if (toggle) {
    const sync = () => {
      const lang = getLang();
      toggle.setAttribute('aria-pressed', lang === 'az' ? 'true' : 'false');
      toggle.textContent = lang === 'az' ? 'AZ' : 'EN';
      applyDomStrings();
      onChange?.(lang);
    };

    toggle.addEventListener('click', () => {
      setLang(getLang() === 'en' ? 'az' : 'en');
      sync();
    });

    sync();
  } else {
    applyDomStrings();
    onChange?.(getLang());
  }

  if (onChange) listeners.add(onChange);
}

// Prefer site-shell language when available.
export function syncFromSiteShell(lang) {
  const next = lang === 'az' ? 'az' : 'en';
  try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
  document.documentElement.lang = next;
  applyDomStrings();
  listeners.forEach((fn) => fn(next));
}
