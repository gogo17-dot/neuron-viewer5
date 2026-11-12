/**
 * Lezyon ovçusu (Lesion hunter) — cases.
 *
 * Each case is a short clinical story; the player taps where the damage is on
 * the whole-brain model from cerebral-cortex/. `targets` are mesh keys from
 * cerebral-cortex/cerebralCortexManifest.js (filename without .glb) that earn
 * full credit. Keys ending .l / .r are left / right (the structure titles in
 * cerebralCortexStructures.js say LEFT / RIGHT). `bank` names the case in
 * brain-bee-cases.js that the story is drawn from, when there is one; the rest
 * are classic, textbook lesion syndromes.
 */
export const LESION_CASES = [
  {
    id: "left-mca",
    bank: "stroke-01",
    targets: ["Frontal_lobe.l", "Insula.l"],
    story: {
      en: "A 67-year-old right-handed man suddenly struggles to get his words out: his speech comes in short, effortful fragments, yet he understands everything you say. His right face and right arm are weak.",
      az: "67 yaşlı sağəlli kişi qəfildən sözləri çətinliklə deyir: nitqi qısa, zəhmətli parçalar şəklindədir, amma dediyiniz hər şeyi anlayır. Üzünün və qolunun sağ tərəfi zəifdir.",
    },
    answer: {
      en: "Left frontal lobe and insula (left middle cerebral artery territory)",
      az: "Sol frontal pay və insula (sol orta beyin arteriyasının sahəsi)",
    },
    why: {
      en: "In almost all right-handed people, language lives in the left hemisphere. Broken, effortful speech with good understanding is Broca's area in the left inferior frontal lobe; the face-and-arm weakness comes from the motor cortex beside it. Both are supplied by the left middle cerebral artery.",
      az: "Sağəlli insanların demək olar ki, hamısında nitq sol yarımkürədədir. Anlama saxlanıldığı halda qırıq-qırıq, zəhmətli nitq sol aşağı frontal paydakı Broka sahəsinin zədəsidir; üz və qol zəifliyi onun yanındakı motor qabıqdan gəlir. Hər ikisini sol orta beyin arteriyası qidalandırır.",
    },
  },
  {
    id: "wernicke",
    targets: ["Temporal_lobe.l"],
    story: {
      en: "A 72-year-old woman suddenly starts talking fluently, but her sentences make no sense and are full of made-up words. She cannot follow simple instructions and does not seem to notice anything is wrong. She has no weakness.",
      az: "72 yaşlı qadın qəfildən axıcı danışmağa başlayır, amma cümlələrinin mənası yoxdur və uydurma sözlərlə doludur. Sadə tapşırıqları yerinə yetirə bilmir və nəyinsə səhv olduğunu sanki hiss etmir. Zəifliyi yoxdur.",
    },
    answer: {
      en: "Left temporal lobe (Wernicke's area)",
      az: "Sol temporal pay (Vernike sahəsi)",
    },
    why: {
      en: "Fluent but meaningless speech with poor understanding is Wernicke's aphasia: damage to the back of the left superior temporal gyrus, where heard words are matched to their meaning.",
      az: "Axıcı, amma mənasız nitq və zəif anlama Vernike afaziyasıdır: eşidilən sözlərin mənası ilə əlaqələndirildiyi sol yuxarı temporal qırışın arxa hissəsinin zədəsi.",
    },
  },
  {
    id: "neglect",
    targets: ["Parietal_lobe.r"],
    story: {
      en: "After a stroke, a 70-year-old man eats only the food on the right half of his plate, shaves only the right side of his face and ignores people standing on his left. His eyesight and both arms work.",
      az: "İnsultdan sonra 70 yaşlı kişi boşqabın yalnız sağ yarısındakı yeməyi yeyir, üzünün yalnız sağ tərəfini qırxır və solunda dayanan adamlara fikir vermir. Görməsi və hər iki qolu işləyir.",
    },
    answer: { en: "Right parietal lobe", az: "Sağ parietal pay" },
    why: {
      en: "Ignoring one half of space is hemispatial neglect. The right parietal lobe attends to both sides of space, so damage there causes left-sided neglect — far more often and more severely than the reverse.",
      az: "Məkanın bir yarısına fikir verməmək hemispasial neqlektdir. Sağ parietal pay məkanın hər iki tərəfinə diqqət yetirir, ona görə onun zədəsi sol tərəfli neqlekt yaradır — bunun əksindən çox daha tez-tez və ağır.",
    },
  },
  {
    id: "occipital",
    targets: ["Occipital_lobe.r"],
    story: {
      en: "A 64-year-old woman keeps bumping into door frames on her left. Testing shows she has lost the left half of what she sees in both eyes, but the very centre of her vision is spared.",
      az: "64 yaşlı qadın tez-tez sol tərəfdəki qapı çərçivələrinə dəyir. Müayinə göstərir ki, hər iki gözdə görmə sahəsinin sol yarısını itirib, amma görmənin tam mərkəzi qorunub.",
    },
    answer: { en: "Right occipital lobe", az: "Sağ oksipital pay" },
    why: {
      en: "Each occipital lobe sees the opposite half of the world, from both eyes. Losing the same left half in both eyes points behind the optic chiasm, to the right visual pathway; a spared centre is typical of a posterior cerebral artery stroke in the occipital cortex.",
      az: "Hər oksipital pay dünyanın əks yarısını hər iki gözdən görür. Hər iki gözdə eyni sol yarının itməsi görmə kəsişməsindən arxaya — sağ görmə yoluna işarə edir; mərkəzin qorunması oksipital qabıqda arxa beyin arteriyası insultu üçün tipikdir.",
    },
  },
  {
    id: "chiasm",
    targets: ["Diencephalon_Optic chiasm.l", "Diencephalon_Optic chiasm.r"],
    story: {
      en: "A 45-year-old man keeps clipping cars on both sides while driving. He has lost the outer half of vision in each eye. A scan shows a pituitary tumour growing upwards.",
      az: "45 yaşlı kişi maşın sürərkən tez-tez hər iki tərəfdəki maşınlara toxunur. Hər gözdə görmənin xarici yarısını itirib. Skan yuxarıya doğru böyüyən hipofiz şişini göstərir.",
    },
    answer: { en: "Optic chiasm", az: "Görmə kəsişməsi (optik xiazma)" },
    why: {
      en: "Fibres from the inner half of each retina — which see the outer half of the world — cross at the optic chiasm, just above the pituitary. A tumour pushing up squeezes these crossing fibres and both outer halves are lost: bitemporal hemianopia.",
      az: "Hər torlu qişanın daxili yarısından — dünyanın xarici yarısını görən hissədən — gələn liflər hipofizin düz üstündəki görmə kəsişməsində çarpazlaşır. Yuxarı itələyən şiş bu lifləri sıxır və hər iki xarici yarı itir: bitemporal hemianopiya.",
    },
  },
  {
    id: "cerebellum",
    targets: ["Cerebellum"],
    story: {
      en: "A 50-year-old man walks with a wide, staggering gait as if drunk, though he has not been drinking. When he reaches for a cup, his right hand shakes more the closer it gets, and he overshoots.",
      az: "50 yaşlı kişi içki içməsə də, sərxoş kimi geniş addımlarla, səndələyərək yeriyir. Fincana uzananda sağ əli yaxınlaşdıqca daha çox titrəyir və hədəfi keçib gedir.",
    },
    answer: { en: "Cerebellum (right side)", az: "Beyincik (sağ tərəf)" },
    why: {
      en: "A staggering gait, a tremor that grows as the hand nears its target and overshooting are cerebellar signs. Unlike the cortex, each half of the cerebellum controls the same side of the body, so right-hand signs point to the right cerebellum.",
      az: "Səndələyən yeriş, əl hədəfə yaxınlaşdıqca artan titrəmə və hədəfi keçmək beyincik əlamətləridir. Qabıqdan fərqli olaraq beyinciyin hər yarısı bədənin eyni tərəfini idarə edir, ona görə sağ əldəki əlamətlər sağ beyinciyə işarə edir.",
    },
  },
  {
    id: "parkinson",
    bank: "pd-01",
    targets: ["Brainstem", "Striatum_Putamen.l", "Striatum_Lentiform nucleus.l"],
    story: {
      en: "A 64-year-old man's right hand shakes when it rests in his lap and calms when he reaches for something. He has become slow, shuffles when he walks, and his face looks less expressive.",
      az: "64 yaşlı kişinin sağ əli dizinin üstündə rahat duranda titrəyir, nəyəsə uzananda sakitləşir. Hərəkətləri yavaşlayıb, ayaqlarını sürüyərək yeriyir, üzü daha az ifadəli görünür.",
    },
    answer: {
      en: "Substantia nigra in the midbrain, and its target, the left putamen",
      az: "Orta beyindəki qara maddə və onun hədəfi — sol putamen",
    },
    why: {
      en: "Parkinson's disease is the loss of dopamine neurons in the substantia nigra of the midbrain. Their endings in the putamen run short of dopamine — worse on the left in this patient's scan, matching the right-hand symptoms. On this model the midbrain is part of the brainstem.",
      az: "Parkinson xəstəliyi orta beyindəki qara maddənin dopamin neyronlarının itməsidir. Onların putamendəki sonluqlarında dopamin azalır — bu xəstənin skanında solda daha çox, sağ əldəki əlamətlərə uyğun. Bu modeldə orta beyin beyin gövdəsinin bir hissəsidir.",
    },
  },
  {
    id: "huntington",
    bank: "hd-01",
    targets: ["Striatum_Caudate nucleus.l", "Striatum_Caudate nucleus.r"],
    story: {
      en: "A 43-year-old woman has developed restless, jerky, dance-like movements she cannot control. She has also become irritable and forgetful. Her father had the same illness.",
      az: "43 yaşlı qadında idarə edə bilmədiyi narahat, qırıq-qırıq, rəqsəbənzər hərəkətlər yaranıb. O, həm də əsəbi və unutqan olub. Atasında da eyni xəstəlik olub.",
    },
    answer: { en: "Caudate nucleus (both sides)", az: "Quyruqlu nüvə (hər iki tərəf)" },
    why: {
      en: "Huntington's disease is an inherited CAG-repeat disorder that destroys neurons of the striatum, the caudate nucleus first, releasing involuntary chorea. Scans show flattened caudate heads and widened frontal horns of the ventricles.",
      az: "Hantinqton xəstəliyi irsi CAG-təkrar pozğunluğudur: striatumun, ilk növbədə quyruqlu nüvənin neyronlarını məhv edir və istəksiz xoreya yaradır. Skanlarda quyruqlu nüvənin başı yastılaşır, mədəciklərin ön buynuzları genişlənir.",
    },
  },
  {
    id: "alzheimer",
    bank: "ad-01",
    targets: ["Limbic_lobe.l", "Limbic_lobe.r", "Temporal_lobe.l", "Temporal_lobe.r"],
    story: {
      en: "A 76-year-old woman keeps asking the same questions, forgets conversations from the day before and gets lost on streets she has known for years. It has crept on slowly over two years.",
      az: "76 yaşlı qadın eyni sualları təkrar-təkrar verir, dünənki söhbətləri unudur və illərdir tanıdığı küçələrdə azır. Bu, iki il ərzində yavaş-yavaş artıb.",
    },
    answer: {
      en: "Hippocampus, in the medial temporal lobe",
      az: "Hipokamp — medial temporal payda",
    },
    why: {
      en: "Alzheimer's disease starts in the entorhinal cortex and hippocampus, which lay down new memories — that is why recent memory goes first. On this model the hippocampus sits in the medial temporal / limbic lobe.",
      az: "Alzheymer xəstəliyi yeni xatirələri yaradan entorinal qabıq və hipokampdan başlayır — buna görə ilk növbədə yaxın yaddaş pozulur. Bu modeldə hipokamp medial temporal / limbik paydadır.",
    },
  },
  {
    id: "temporal-epilepsy",
    bank: "ep-01",
    targets: ["Limbic_lobe.l", "Limbic_lobe.r", "Temporal_lobe.l", "Temporal_lobe.r"],
    story: {
      en: "A 28-year-old man has attacks that begin with a rising feeling in his stomach and a strange smell. Then he stares, smacks his lips and does not respond for about a minute.",
      az: "28 yaşlı kişidə tutmalar mədədə qalxan bir hiss və qəribə qoxu ilə başlayır. Sonra o, bir nöqtəyə baxır, dodaqlarını marçıldadır və təxminən bir dəqiqə cavab vermir.",
    },
    answer: {
      en: "Medial temporal lobe (hippocampus) — in this patient, the left",
      az: "Medial temporal pay (hipokamp) — bu xəstədə sol tərəf",
    },
    why: {
      en: "A rising stomach feeling, odd smells, staring and lip-smacking are the signature of mesial temporal lobe epilepsy. This patient's MRI showed a shrunken, scarred left hippocampus (hippocampal sclerosis). The story alone cannot tell you the side, so either side counts.",
      az: "Mədədə qalxan hiss, qəribə qoxular, bir nöqtəyə baxmaq və dodaq marçıldatmaq mezial temporal pay epilepsiyasının tipik əlamətləridir. Bu xəstənin MRT-si sol hipokampın kiçilib çapıqlaşdığını göstərib (hipokampal skleroz). Yalnız hekayədən tərəfi bilmək olmur, ona görə hər iki tərəf qəbul olunur.",
    },
  },
  {
    id: "korsakoff",
    bank: "wks-01",
    targets: ["Diencephalon_Mamillary body.l", "Diencephalon_Mamillary body.r"],
    story: {
      en: "A 52-year-old man who has drunk heavily for years becomes confused, walks unsteadily and has trouble moving his eyes. Weeks later he cannot form new memories and fills the gaps with invented stories.",
      az: "İllərdir çox içki içən 52 yaşlı kişi çaşqın olur, səndələyərək yeriyir və gözlərini hərəkət etdirməkdə çətinlik çəkir. Həftələr sonra yeni xatirələr yarada bilmir və boşluqları uydurma hekayələrlə doldurur.",
    },
    answer: { en: "Mammillary bodies", az: "Məməyəbənzər cisimlər (mamillyar cisimlər)" },
    why: {
      en: "Wernicke–Korsakoff syndrome is thiamine (vitamin B1) deficiency. It damages the mammillary bodies and the thalamus around the third ventricle — key relays in the memory circuit. Making up stories (confabulation) fills the memory gaps.",
      az: "Vernike–Korsakov sindromu tiamin (B1 vitamini) çatışmazlığıdır. O, üçüncü mədəciyin ətrafındakı məməyəbənzər cisimləri və talamusu — yaddaş dövrəsinin əsas ötürücülərini zədələyir. Uydurma hekayələr (konfabulyasiya) yaddaş boşluqlarını doldurur.",
    },
  },
  {
    id: "nph",
    bank: "nph-01",
    targets: [
      "Ventricles_WhiteMatter_Lateral ventricle.l",
      "Ventricles_WhiteMatter_Lateral ventricle.r",
      "Diencephalon_Third ventricle",
    ],
    story: {
      en: "A 74-year-old man's walking has become slow and 'magnetic', as if his feet were glued to the floor. Then he began having bladder accidents, and his thinking slowed down.",
      az: "74 yaşlı kişinin yerişi yavaşlayıb və “maqnitli” olub — sanki ayaqları yerə yapışıb. Sonra sidiyini saxlaya bilməmə başlayıb və düşüncəsi ləngiyib.",
    },
    answer: { en: "The ventricles (enlarged)", az: "Mədəciklər (genişlənmiş)" },
    why: {
      en: "Normal pressure hydrocephalus: the ventricles swell with cerebrospinal fluid and stretch the nearby fibres that run to the legs and bladder. Gait first, then incontinence and slow thinking — and draining the fluid can reverse it.",
      az: "Normal təzyiqli hidrosefaliya: mədəciklər beyin-onurğa beyni mayesi ilə genişlənir və ayaqlara və sidik kisəsinə gedən yaxın lifləri dartır. Əvvəl yeriş, sonra sidik saxlamama və yavaş düşüncə — mayeni axıtmaq bunu geri qaytara bilər.",
    },
  },
  {
    id: "tbi",
    bank: "tbi-01",
    targets: ["Temporal_lobe.r"],
    story: {
      en: "A 19-year-old footballer was knocked out by a hard blow to his right temple. He has headaches, light hurts his eyes, and he cannot remember the match. His CT shows a small bruise of the brain right under the blow.",
      az: "19 yaşlı futbolçu sağ gicgahına güclü zərbədən huşunu itirib. Başı ağrıyır, işıq gözlərini incidir və matçı xatırlamır. KT zərbənin düz altında beynin kiçik əzilməsini göstərir.",
    },
    answer: { en: "Right temporal lobe", az: "Sağ temporal pay" },
    why: {
      en: "A contusion is a bruise of the brain's surface. The temporal lobe lies right under the temple and rests against the rough bone of the middle cranial fossa, so it bruises easily in head injuries.",
      az: "Kontuziya beyin səthinin əzilməsidir. Temporal pay gicgahın düz altında yerləşir və orta kəllə çuxurunun kələ-kötür sümüyünə söykənir, ona görə baş travmalarında asanlıqla əzilir.",
    },
  },
  {
    id: "hm",
    targets: ["Limbic_lobe.l", "Limbic_lobe.r", "Temporal_lobe.l", "Temporal_lobe.r"],
    story: {
      en: "After an operation to stop his seizures in 1953, a 27-year-old man could still talk, reason and remember his childhood — but he could never form a new memory again. He met his doctors as strangers every day.",
      az: "1953-cü ildə tutmalarını dayandırmaq üçün edilən əməliyyatdan sonra 27 yaşlı kişi danışa, düşünə və uşaqlığını xatırlaya bilirdi — amma bir daha heç vaxt yeni xatirə yarada bilmədi. Həkimlərini hər gün yad adam kimi qarşılayırdı.",
    },
    answer: {
      en: "Medial temporal lobes on both sides (hippocampus)",
      az: "Hər iki tərəfdə medial temporal paylar (hipokamp)",
    },
    why: {
      en: "This is patient H.M. (Henry Molaison). Surgeons removed most of the hippocampus and nearby medial temporal cortex on both sides. He showed that the hippocampus is needed to form new long-term memories, but not to keep old ones.",
      az: "Bu, H.M. (Henri Molezon) adlı pasiyentdir. Cərrahlar hər iki tərəfdə hipokampın və yaxındakı medial temporal qabığın çox hissəsini çıxardılar. O göstərdi ki, hipokamp yeni uzunmüddətli xatirələr yaratmaq üçün lazımdır, amma köhnələri saxlamaq üçün yox.",
    },
  },
  {
    id: "gage",
    targets: ["Frontal_lobe.l"],
    story: {
      en: "In 1848 an iron rod shot through a railway foreman's head, entering below his left eye and leaving through the top of his skull. He survived and could walk and talk, but his friends said he was 'no longer Gage': impulsive, rude and unable to stick to plans.",
      az: "1848-ci ildə dəmir yolu ustasının başından dəmir çubuq keçdi: sol gözünün altından girib kəllənin təpəsindən çıxdı. O sağ qaldı, yeriyə və danışa bilirdi, amma dostları deyirdi ki, o “artıq Geyc deyil”: impulsiv, kobud oldu və planlarına sadiq qala bilmirdi.",
    },
    answer: {
      en: "Left frontal lobe (prefrontal cortex)",
      az: "Sol frontal pay (prefrontal qabıq)",
    },
    why: {
      en: "Phineas Gage's injury destroyed much of his left prefrontal cortex, which plans, holds back impulses and shapes social behaviour. His case was one of the first clues that personality depends on the frontal lobes.",
      az: "Fineas Geycin zədəsi planlaşdıran, impulsları saxlayan və sosial davranışı formalaşdıran sol prefrontal qabığının çox hissəsini məhv etdi. Onun halı şəxsiyyətin frontal paylardan asılı olduğunun ilk sübutlarından biri oldu.",
    },
  },
  {
    id: "gerstmann",
    targets: ["Parietal_lobe.l"],
    story: {
      en: "A 58-year-old right-handed teacher suddenly cannot do simple sums, cannot write, cannot tell left from right, and cannot name which of her fingers you touch.",
      az: "58 yaşlı sağəlli müəllimə qəfildən sadə hesablamaları edə, yaza, sağı soldan ayıra və hansı barmağına toxunduğunuzu deyə bilmir.",
    },
    answer: {
      en: "Left parietal lobe (angular gyrus)",
      az: "Sol parietal pay (bucaq qırışı)",
    },
    why: {
      en: "These four signs together are Gerstmann syndrome. They come from damage to the angular gyrus of the dominant — usually left — parietal lobe, where numbers, writing, fingers and body sides are mapped.",
      az: "Bu dörd əlamət birlikdə Gerstman sindromudur. Rəqəmlərin, yazının, barmaqların və bədən tərəflərinin xəritələndiyi dominant — adətən sol — parietal payın bucaq qırışının zədəsindən yaranır.",
    },
  },
  {
    id: "thalamus",
    targets: ["Diencephalon_Thalamus.r"],
    story: {
      en: "A 66-year-old man suddenly feels numb over the whole left side of his body — face, arm and leg — but has no weakness at all.",
      az: "66 yaşlı kişi qəfildən bədəninin bütün sol tərəfində — üzündə, qolunda və ayağında — keyimə hiss edir, amma heç bir zəifliyi yoxdur.",
    },
    answer: { en: "Right thalamus", az: "Sağ talamus" },
    why: {
      en: "Touch and pain from the whole opposite half of the body relay through the thalamus on their way to the cortex. A small stroke there causes pure sensory loss on the opposite side, with no weakness.",
      az: "Bədənin bütün əks yarısından gələn toxunma və ağrı qabığa gedərkən talamusdan keçir. Oradakı kiçik insult əks tərəfdə zəiflik olmadan yalnız hissiyyat itkisi yaradır.",
    },
  },
  {
    id: "split-brain",
    targets: ["Corpus callosum"],
    story: {
      en: "After surgery for severe epilepsy, a woman holds a key in her left hand behind a screen. She cannot say what it is — yet her left hand picks the key out of a pile of objects.",
      az: "Ağır epilepsiyaya görə əməliyyatdan sonra qadın arakəsmənin arxasında sol əlində açar tutur. Onun nə olduğunu deyə bilmir — amma sol əli əşyalar yığınından açarı seçir.",
    },
    answer: { en: "Corpus callosum", az: "Döyənəkli cisim (korpus kallozum)" },
    why: {
      en: "The left hand reports to the right hemisphere, but speech lives in the left. With the corpus callosum cut, the two hemispheres cannot share what they know — the classic split-brain finding of Sperry and Gazzaniga.",
      az: "Sol əl sağ yarımkürəyə məlumat göndərir, nitq isə soldadır. Döyənəkli cisim kəsiləndə iki yarımkürə bildiklərini bölüşə bilmir — Sperri və Qazzaniqanın klassik “bölünmüş beyin” kəşfi.",
    },
  },
  {
    id: "amygdala",
    targets: ["BasalForebrain_Amygdaloid body.l", "BasalForebrain_Amygdaloid body.r"],
    story: {
      en: "A woman with a rare disease that has turned a small structure deep in both temporal lobes to calcium feels no fear. She handles snakes, walks into danger and cannot recognise fear on other people's faces.",
      az: "Nadir xəstəlik hər iki temporal payın dərinliyindəki kiçik bir strukturu kalsiumlaşdırıb və bu qadın qorxu hiss etmir. İlanları əlinə alır, təhlükəyə gedir və başqalarının üzündəki qorxunu tanıya bilmir.",
    },
    answer: { en: "Amygdala (both sides)", az: "Badamcıq — amiqdala (hər iki tərəf)" },
    why: {
      en: "Patient S.M. has Urbach–Wiethe disease, which destroyed both amygdalae. She showed that the amygdala is needed to feel fear and to read it in other people's faces.",
      az: "S.M. adlı pasiyentdə hər iki amiqdalanı məhv edən Urbax–Vite xəstəliyi var. O göstərdi ki, qorxunu hiss etmək və başqalarının üzündə oxumaq üçün amiqdala lazımdır.",
    },
  },
  {
    id: "acoustic-neuroma",
    targets: ["Vestibulocochlear nerve (VIII).r"],
    story: {
      en: "A 49-year-old woman has slowly lost hearing in her right ear, with ringing in it and some unsteadiness. Her left ear is normal.",
      az: "49 yaşlı qadın sağ qulağında eşitməni yavaş-yavaş itirib, qulağında küy var və bir az səndələyir. Sol qulağı normaldır.",
    },
    answer: {
      en: "Right vestibulocochlear nerve (cranial nerve VIII)",
      az: "Sağ dəhliz-ilbiz siniri (VIII kəllə siniri)",
    },
    why: {
      en: "One-sided hearing loss with ringing and imbalance suggests a vestibular schwannoma (acoustic neuroma): a benign tumour on the nerve that carries hearing and balance from that ear.",
      az: "Bir tərəfli eşitmə itkisi, küy və tarazlıq pozğunluğu vestibulyar şvannomaya (akustik nevroma) işarə edir: həmin qulaqdan eşitmə və tarazlıq məlumatını daşıyan sinirdə xoşxassəli şiş.",
    },
  },
  {
    id: "hypothalamus",
    targets: ["Diencephalon_Hypothalamus"],
    story: {
      en: "After an operation for a tumour at the base of the brain, a 14-year-old boy is hungry all the time and gains weight fast, and his body temperature and sleep have become erratic.",
      az: "Beynin əsasındakı şişə görə əməliyyatdan sonra 14 yaşlı oğlan daim acdır və sürətlə çəki yığır, bədən temperaturu və yuxusu isə nizamsız olub.",
    },
    answer: { en: "Hypothalamus", az: "Hipotalamus" },
    why: {
      en: "The hypothalamus sets hunger, body temperature and the sleep–wake cycle. Damage to it — often from a craniopharyngioma or its surgery — causes hypothalamic obesity and unstable temperature.",
      az: "Hipotalamus aclığı, bədən temperaturunu və yuxu–oyanıqlıq dövrünü tənzimləyir. Onun zədəsi — çox vaxt kraniofaringioma və ya onun əməliyyatı nəticəsində — hipotalamik piylənmə və qeyri-sabit temperatur yaradır.",
    },
  },
];
