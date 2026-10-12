// Keys match exported .glb filenames (without extension).
// Overview is the first paragraph; Clinical detail is everything after \n\n.

const cerebellumStructures = {
  Culmen: {
    title: 'CULMEN (ANTERIOR VERMIS I–IV)',
    titleAz: 'Culmen (ön vermis I–IV)',
    description:
      'The culmen is the peak of the superior vermis. In this atlas the mesh is SUIT lobules I–IV at the midline, so it also contains the lingula and central lobule — the thin anterior leaflets against the superior medullary velum. Together they are paleocerebellum: spinocerebellar input for postural tone and gait.\n\nOn mid-sagittal MRI the culmen is the landmark just in front of the primary fissure. Anterior-lobe degeneration (classically alcohol-related) hits this region and produces a wide-based, unsteady gait with relatively spared arms. The hemispheric partners of I–IV are the wings of the central lobule in this model.',
    descriptionAz:
      'Culmen yuxarı vermisin zirvəsidir. Bu atlasda mesh SUIT-in orta xətt I–IV lobullarıdır, ona görə lingula və mərkəzi lobulu da ehtiva edir — yuxarı medullar yelkənə söykənən nazik ön lövhələr. Birlikdə paleoserebellumdur: duruş tonusu və yeriş üçün spinoserebellar giriş.\n\nOrta saggital MRT-də culmen birincili yarığın düz önündəki nişandır. Ön pay degenerasiyası (klassik olaraq alkoqolla bağlı) bu bölgəni tutur və qolları nisbətən qoruyaraq geniş əsaslı, dayanıqsız yeriş verir. I–IV-ün yarımkürə tərəfdaşları bu modeldə mərkəzi lobulun qanadlarıdır.',
  },
  Wing_of_central_lobule: {
    title: 'WING OF CENTRAL LOBULE (ALA LOBULI CENTRALIS)',
    titleAz: 'Mərkəzi lobulun qanadı (ala lobuli centralis)',
    description:
      'The wing of the central lobule is the paired hemispheric extension of anterior-lobe vermis (SUIT I–IV lateral to the midline). It flanks the superior vermis and participates in anterior-lobe circuits that regulate antigravity tone and gait.\n\nOn surface anatomy it defines the superior cerebellar outline just behind the midbrain. Anterior-lobe disease that looks “vermis-only” on a midline slice often involves these wings as well; that is why gait ataxia from alcohol-related degeneration is not purely a vermis story.',
    descriptionAz:
      'Mərkəzi lobulun qanadı ön pay vermisinin (SUIT I–IV, orta xəttdən yan) cüt yarımkürə uzantısıdır. Yuxarı vermisi yanlardan tutur və antigravitasiya tonusu ilə yerişi tənzimləyən ön pay dövrələrində iştirak edir.\n\nSəth anatomiyasında orta beyinin dərhal arxasında yuxarı beyincik konturunu müəyyən edir. Orta xətt kəsiyində «yalnız vermis» görünən ön pay xəstəliyi çox vaxt bu qanadları da tutur — alkoqolla bağlı degenerasiyadan yeriş ataksiyasının sırf vermis hekayəsi olmamasının səbəbi budur.',
  },
  Anterior_quadrangular_lobule: {
    title: 'ANTERIOR QUADRANGULAR LOBULE',
    titleAz: 'Ön dördbucaqlı lobul',
    description:
      'The anterior quadrangular lobule is the hemispheric part of the anterior lobe continuous with the culmen (SUIT lobule V). It receives spinocerebellar afferents and contributes to regulation of muscle tone, posture, and gait.\n\nAnterior-lobe disease — classically from alcohol-related degeneration — preferentially affects this region and produces a wide-based, unsteady gait. SCA infarct can involve the superior hemispheric surface here; look for accompanying vermis and dentate involvement on MRI.',
    descriptionAz:
      'Ön dördbucaqlı lobul culmen ilə davam edən ön payın yarımkürə hissəsidir (SUIT lobul V). Spinoserebellar afferentlər alır və əzələ tonusu, duruş və yerişin tənzimlənməsinə töhfə verir.\n\nÖn pay xəstəliyi — klassik olaraq alkoqolla bağlı degenerasiya — bu bölgəni üstün tutur və geniş əsaslı, dayanıqsız yeriş verir. SCA infarktı burada yuxarı yarımkürə səthini tuta bilər; MRT-də eyni zamanda vermis və dişli nüvə iştirakına baxın.',
  },
  Declive: {
    title: 'DECLIVE',
    titleAz: 'Declive',
    description:
      'The declive (lobule VI) is the first vermian lobule of the posterior lobe, lying immediately behind the primary fissure and continuous with the simple / posterior quadrangular lobule laterally. It contributes to coordination of skilled movement and is part of the neocerebellar vermis.\n\nIts position just caudal to the culmen makes it easy to identify on mid-sagittal MRI. Posterior-lobe vermis lesions here mix gait change with oculomotor and cognitive-affective features more than the purely postural picture of the anterior lobe.',
    descriptionAz:
      'Declive (lobul VI) posterior payın birinci vermis lobuludur, birincili yarığın dərhal arxasında yerləşir və yanda sadə / arxa dördbucaqlı lobulla davam edir. Bacarıqlı hərəkətin koordinasiyasına töhfə verir və neoserebellar vermisin hissəsidir.\n\nCulmenin dərhal kaudalındakı mövqeyi onu orta saggital MRT-də asan tanıdır. Buradakı posterior pay vermis zədələri yeriş dəyişikliyini ön payın sırf postural mənzərəsindən çox okülomotor və kognitiv-affektiv xüsusiyyətlərlə qarışdırır.',
  },
  Posterior_quadrangular_lobule: {
    title: 'POSTERIOR QUADRANGULAR LOBULE (SIMPLE LOBULE)',
    titleAz: 'Arxa dördbucaqlı lobul (sadə lobul)',
    description:
      'The posterior quadrangular (simple) lobule is the hemispheric continuation of the declive (lobule VI), lying just behind the primary fissure. It is part of the neocerebellum and participates in coordination of voluntary, skilled movement.\n\nIt forms much of the superior surface of each cerebellar hemisphere between the anterior lobe and the semilunar lobules. Pontocerebellar infarct and SCA/AICA territory stroke can involve this surface; the clinical picture is ipsilateral limb dysmetria rather than isolated truncal ataxia.',
    descriptionAz:
      'Arxa dördbucaqlı (sadə) lobul declive-in (lobul VI) yarımkürə davamıdır, birincili yarığın dərhal arxasında yerləşir. Neoserebellumun hissəsidir və ixtiyari, bacarıqlı hərəkətin koordinasiyasında iştirak edir.\n\nÖn pay ilə yarımaysal lobullar arasında hər beyincik yarımkürəsinin yuxarı səthinin çoxunu əmələ gətirir. Pontoserebellar infarkt və SCA/AICA hövzəsi insultu bu səthi tuta bilər; klinik mənzərə təcrid olunmuş gövdə ataksiyasından çox ipsilateral ətraf dismetriyasıdır.',
  },
  Folium_of_vermis: {
    title: 'FOLIUM OF VERMIS',
    titleAz: 'Vermisin foliumu',
    description:
      'The folium of the vermis (lobule VIIA / SUIT vermis Crus I) is a narrow transverse ridge of the posterior vermis, continuous laterally with the superior semilunar lobule. Together with the tuber it forms much of the visible “crown” of the posterior vermis.\n\nIt participates in oculomotor and cognitive-affective cerebellar networks of the posterior lobe. Midline tumours in children that start in the vermis often expand through folium and tuber into the fourth ventricle.',
    descriptionAz:
      'Vermisin foliumu (lobul VIIA / SUIT vermis Crus I) posterior vermisin nazik eninə silsiləsidir, yanda yuxarı yarımaysal lobulla davam edir. Tuber ilə birlikdə posterior vermisin görünən «tacının» çoxunu əmələ gətirir.\n\nPosterior payın okülomotor və kognitiv-affektiv beyincik şəbəkələrində iştirak edir. Uşaqlarda vermisdə başlayan orta xətt şişləri tez-tez folium və tuber vasitəsilə dördüncü mədəciyə genişlənir.',
  },
  Superior_semilunar_lobule: {
    title: 'SUPERIOR SEMILUNAR LOBULE (CRUS I)',
    titleAz: 'Yuxarı yarımaysal lobul (crus I)',
    description:
      'The superior semilunar lobule (crus I) is a large crescentic lobule on the superior–posterior cerebellar hemisphere, continuous with the folium of the vermis. It is a major neocerebellar region linked via pontocerebellar fibres to cerebral association cortex.\n\nIt contributes to planning and fine coordination of complex limb and oculomotor acts, and is increasingly implicated in cerebellar cognitive networks. Hemispherectomy-scale damage here produces ipsilateral dysmetria and intention tremor of the arm.',
    descriptionAz:
      'Yuxarı yarımaysal lobul (crus I) yuxarı–arxa beyincik yarımkürəsində böyük aypara lobuldur, vermisin foliumu ilə davam edir. Pontoserebellar liflər vasitəsilə assosiasiya qabığına bağlı əsas neoserebellar bölgədir.\n\nMürəkkəb ətraf və okülomotor hərəkətlərin planlanması və incə koordinasiyasına töhfə verir və getdikcə beyincik kognitiv şəbəkələrində iştirakı göstərilir. Burada yarımkürə miqyaslı zədə qolun ipsilateral dismetriya və məqsədli tremorunu verir.',
  },
  Tuber_of_vermis: {
    title: 'TUBER OF VERMIS',
    titleAz: 'Vermisin tuberı',
    description:
      'The tuber of the vermis (lobule VIIB) sits just below the folium on the posterior vermis and expands laterally into the inferior semilunar lobule. In this atlas it also includes SUIT vermis VIIb. It is part of the posterior lobe involved in higher-order cerebellar functions including eye-movement control and aspects of cognition.\n\nOn sagittal views it forms the rounded bulge of the mid-posterior vermis. Paediatric midline tumours and Chiari-related crowding both distort this region toward the fourth ventricle and foramen magnum.',
    descriptionAz:
      'Vermisin tuberı (lobul VIIB) posterior vermisdə foliumun dərhal altında oturur və yanda aşağı yarımaysal lobula genişlənir. Bu atlasda SUIT vermis VIIb-ni də ehtiva edir. Göz hərəkəti nəzarəti və koqnisyanın aspektləri daxil olmaqla yüksək səviyyəli beyincik funksiyalarında iştirak edən posterior payın hissəsidir.\n\nSaggital görünüşlərdə orta-arxa vermisin yuvarlaq qabarığını əmələ gətirir. Pediatrik orta xətt şişləri və Chiari ilə bağlı sıxlıq bu bölgəni dördüncü mədəcik və foramen magnuma doğru əyir.',
  },
  Inferior_semilunar_lobule: {
    title: 'INFERIOR SEMILUNAR LOBULE (CRUS II)',
    titleAz: 'Aşağı yarımaysal lobul (crus II)',
    description:
      'The inferior semilunar lobule (crus II) occupies much of the inferior–posterior cerebellar hemisphere and is continuous with the tuber of the vermis. Like crus I, it is neocerebellum heavily connected to cerebral cortex through the middle cerebellar peduncle.\n\nIt supports skilled motor coordination and cerebellar cognitive networks. PICA infarct classically involves the inferior hemisphere including crus II and can produce vertigo, lateropulsion, and ipsilateral limb ataxia without brainstem long-tract signs when the infarct is cerebellar-only.',
    descriptionAz:
      'Aşağı yarımaysal lobul (crus II) aşağı–arxa beyincik yarımkürəsinin çoxunu tutur və vermisin tuberı ilə davam edir. Crus I kimi, orta beyincik ayaqcığı vasitəsilə qabıqla sıx bağlı neoserebellumdur.\n\nBacarıqlı motor koordinasiyasını və beyincik kognitiv şəbəkələrini dəstəkləyir. PICA infarktı klassik olaraq crus II daxil olmaqla aşağı yarımkürəni tutur və infarkt yalnız beyincikdə olanda beyin gövdəsi uzun trakt əlamətləri olmadan vertigo, lateropulsiya və ipsilateral ətraf ataksiyası verə bilər.',
  },
  Gracile_lobule: {
    title: 'GRACILE LOBULE',
    titleAz: 'Zərif lobul',
    description:
      'The gracile lobule is a slender hemispheric lobule of the inferior cerebellum, associated here with SUIT VIIb territory near the pyramis of the vermis. It participates in posterior-lobe coordination of distal limb movement.\n\nOn surface anatomy it lies between the inferior semilunar lobule and the biventral lobule. Inferior cerebellar infarct and tonsillar crowding can involve it together with neighbouring lobules; isolated signs are uncommon.',
    descriptionAz:
      'Zərif lobul aşağı beyinciyin nazik yarımkürə lobuludur, burada vermisin pyramisinə yaxın SUIT VIIb ərazisi ilə bağlıdır. Distal ətraf hərəkətinin posterior pay koordinasiyasında iştirak edir.\n\nSəth anatomiyasında aşağı yarımaysal lobul ilə ikiqarınlı lobul arasında yerləşir. Aşağı beyincik infarktı və badamcıq sıxlığı onu qonşu lobullarla birlikdə tuta bilər; təcrid olunmuş əlamətlər nadirdir.',
  },
  Pyramis_of_vermis: {
    title: 'PYRAMIS OF VERMIS',
    titleAz: 'Vermisin pyramisi',
    description:
      'The pyramis (lobule VIII) is a triangular lobule on the inferior vermis, continuous laterally with the biventral lobule. It belongs to the posterior lobe and receives substantial spinal and brainstem input related to limb and axial coordination.\n\nIt is a reliable inferior vermian landmark above the uvula and tonsils. Inferior vermis lesions mix gait and limb ataxia; medulloblastoma and ependymoma of the fourth ventricle often expand against this surface.',
    descriptionAz:
      'Pyramis (lobul VIII) aşağı vermisdə üçbucaq lobuldur, yanda ikiqarınlı lobulla davam edir. Posterior paya aiddir və ətraf ilə ox koordinasiyasına bağlı əhəmiyyətli onurğa və beyin gövdəsi girişi alır.\n\nUvula və badamcıqların üstündə etibarlı aşağı vermis nişanıdır. Aşağı vermis zədələri yeriş və ətraf ataksiyasını qarışdırır; dördüncü mədəciyin medulloblastoması və ependimoması tez-tez bu səthə qarşı genişlənir.',
  },
  Biventral_lobule: {
    title: 'BIVENTRAL LOBULE',
    titleAz: 'İkiqarınlı lobul',
    description:
      'The biventral lobule is a two-bellied lobule on the inferior cerebellar hemisphere (SUIT VIIIa/b), continuous with the pyramis and sitting near the tonsil. It belongs to the posterior lobe and contributes to limb coordination.\n\nIts inferior position makes it relevant when interpreting mass effect, tonsillar herniation, and inferior cerebellar infarcts (PICA). Swelling here can crowd the tonsil toward the foramen magnum.',
    descriptionAz:
      'İkiqarınlı lobul aşağı beyincik yarımkürəsində ikiqarınlı lobuldur (SUIT VIIIa/b), pyramis ilə davam edir və badamcığa yaxın oturur. Posterior paya aiddir və ətraf koordinasiyasına töhfə verir.\n\nAşağı mövqeyi kütlə təsiri, badamcıq herniyası və aşağı beyincik infarktlarını (PICA) şərh edərkən onu vacib edir. Buradakı şişlik badamcığı foramen magnuma doğru sıxa bilər.',
  },
  Uvula_of_vermis: {
    title: 'UVULA OF VERMIS',
    titleAz: 'Vermisin uvulası',
    description:
      'The uvula (lobule IX) is a rounded inferior vermian lobule hanging above the cerebellar tonsils and nodule. It is closely linked to vestibular and postural circuits of the vestibulocerebellum.\n\nClinically, uvular and tonsillar descent through the foramen magnum is the hallmark of Chiari type I malformation. Inferior vermis tumours and PICA vermian infarct also distort this landmark on sagittal MRI.',
    descriptionAz:
      'Uvula (lobul IX) beyincik badamcıqları və nodulun üstündə asılan yuvarlaq aşağı vermis lobuludur. Vestibuloserebellumun vestibulyar və postural dövrələri ilə sıx bağlıdır.\n\nKlinik olaraq, uvula və badamcıqların foramen magnumdan enməsi Chiari I malformasiyasının əlamətidir. Aşağı vermis şişləri və PICA vermis infarktı da saggital MRT-də bu nişanı əyir.',
  },
  Tonsil_of_cerebellum: {
    title: 'TONSIL OF CEREBELLUM',
    titleAz: 'Beyincik badamcığı',
    description:
      'The cerebellar tonsil is a rounded lobule on the inferior medial hemisphere (SUIT IX hemisphere), flanking the uvula beside the foramen magnum. It is clinically critical: downward tonsillar herniation compresses the medulla and can be life-threatening.\n\nIn Chiari I malformation the tonsils are ectopically low; swelling from infarct or haemorrhage can drive acute tonsillar descent. Lumbar puncture is dangerous when a posterior-fossa mass and high intracranial pressure threaten this path — dropping lumbar pressure can cone the tonsils onto the respiratory centres.',
    descriptionAz:
      'Beyincik badamcığı aşağı medial yarımkürədə yuvarlaq lobuldur (SUIT IX yarımkürə), foramen magnum yanında uvulanı yanlardan tutur. Klinik cəhətdən kritikdir: aşağıya badamcıq herniyası uzunsov beyini sıxır və həyati təhlükə yarada bilər.\n\nChiari I malformasiyasında badamcıqlar ektopik olaraq aşağıdadır; infarkt və ya qanaxmadan şişlik kəskin badamcıq enməsini sürə bilər. Arxa çuxur kütləsi və yüksək kəllədaxili təzyiq bu yolu təhdid edəndə lomber punksiya təhlükəlidir — lomber təzyiqin düşməsi badamcıqları tənəffüs mərkəzlərinin üstünə konusa sala bilər.',
  },
  Nodule_of_vermis: {
    title: 'NODULE OF VERMIS',
    titleAz: 'Vermisin nodulu',
    description:
      'The nodule (lobule X) is the most caudal vermian lobule and the midline component of the flocculonodular lobe — the archicerebellum. Together with the flocculus it is the primary cerebellar centre for vestibular reflexes, gaze stability, and balance.\n\nNodular lesions classically produce truncal ataxia and impaired vestibulo-ocular control. Midline paediatric tumours in the fourth ventricle sit against the nodule; nystagmus and unsteadiness out of proportion to limb dysmetria point here rather than to the lateral hemispheres.',
    descriptionAz:
      'Nodul (lobul X) ən kaudal vermis lobuludur və flokkulonodulyar payın — arxiserebellumun — orta xətt tərkib hissəsidir. Flokkulus ilə birlikdə vestibulyar reflekslər, baxış sabitliyi və tarazlıq üçün əsas beyincik mərkəzidir.\n\nNodulyar zədələr klassik olaraq gövdə ataksiyası və pozulmuş vestibulo-okulyar nəzarət verir. Dördüncü mədəcikdəki pediatrik orta xətt şişləri nodula söykənir; ətraf dismetriyasına uyğun gəlməyən nistagm və dayanıqsızlıq lateral yarımkürələrdən çox bura işarə edir.',
  },
  Flocculus: {
    title: 'FLOCCULUS',
    titleAz: 'Flokkulus',
    description:
      'The flocculus is a small, paired lobule of the flocculonodular lobe lying on the inferior cerebellar surface beside the middle cerebellar peduncle (SUIT lobule X hemisphere). It is the hemispheric partner of the nodule and a core vestibulocerebellar structure controlling gaze holding, smooth pursuit, and vestibulo-ocular reflexes.\n\nFloccular lesions produce gaze-evoked nystagmus and impaired visual–vestibular coordination. AICA infarct and CPA tumours (vestibular schwannoma, meningioma) can involve the flocculus; the bedside clue is eye-movement failure out of proportion to limb ataxia.',
    descriptionAz:
      'Flokkulus orta beyincik ayaqcığı yanında aşağı beyincik səthində yerləşən flokkulonodulyar payın kiçik, cüt lobuludur (SUIT lobul X yarımkürə). Nodulun yarımkürə tərəfdaşıdır və baxış saxlama, hamar izləmə və vestibulo-okulyar refleksləri idarə edən əsas vestibuloserebellar strukturdur.\n\nFlokkulyar zədələr baxışla oyadılan nistagm və pozulmuş vizual–vestibulyar koordinasiya verir. AICA infarktı və CPA şişləri (vestibulyar şvannoma, meningioma) flokkulusi tuta bilər; klinik ipucu ətraf ataksiyasına uyğun gəlməyən göz hərəkəti pozuntusudur.',
  },
  Superior_cerebellar_peduncle: {
    title: 'SUPERIOR CEREBELLAR PEDUNCLE',
    titleAz: 'Yuxarı beyincik ayaqcığı',
    description:
      'The superior cerebellar peduncle is the primary output pathway of the cerebellum, carrying fibres from the deep cerebellar nuclei (chiefly the dentate) upward to decussate in the caudal midbrain before reaching the contralateral red nucleus and thalamus. This is the first of the two crossings that make cerebellar signs ipsilateral.\n\nIt contrasts with the middle and inferior peduncles, which are predominantly input pathways. Midbrain stroke, SCA infarct, and the superior cerebellar decussation in the tegmentum are the clinical settings where this stalk is the localising clue.',
    descriptionAz:
      'Yuxarı beyincik ayaqcığı beyinciyin əsas çıxış yoludur, dərin beyincik nüvələrindən (əsasən dişli nüvə) lifləri yuxarı aparır, kaudal orta beyində çarpazlaşır, sonra əks qırmızı nüvə və talamusa çatır. Beyincik əlamətlərini ipsilateral edən iki çarpazlaşmanın birincisidir.\n\nƏsasən giriş yolları olan orta və aşağı ayaqcıqlardan fərqlənir. Orta beyin insultu, SCA infarktı və tegmentumdakı yuxarı beyincik çarpazı bu sapın lokalizasiya ipucu olduğu klinik şəraitlərdir.',
  },
  Middle_cerebellar_peduncle: {
    title: 'MIDDLE CEREBELLAR PEDUNCLE',
    titleAz: 'Orta beyincik ayaqcığı',
    description:
      'The middle cerebellar peduncle is the principal pathway for pontocerebellar fibres, carrying information from the pontine nuclei into the cerebellar hemispheres. It forms the large lateral bulge of the pons and is the largest of the three cerebellar peduncles.\n\nIt is critical for coordinating planned, skilled movement by relaying motor planning signals from cortex to cerebellum. Pontine MSA, lacunar infarct, and CPA mass effect all hit this stalk; the result is ipsilateral ataxia without the vestibular flavour of inferior-peduncle disease.',
    descriptionAz:
      'Orta beyincik ayaqcığı pontoserebellar liflərin əsas yoludur, pons nüvələrindən məlumatı beyincik yarımkürələrinə aparır. Ponsun böyük yan qabarığını əmələ gətirir və üç beyincik ayaqcığının ən böyüyüdür.\n\nQabıqdan beyinciyə motor planlama siqnallarını ötürərək planlaşdırılmış, bacarıqlı hərəkətin koordinasiyası üçün kritikdir. Pontin MSA, lakunar infarkt və CPA kütlə təsiri hamısı bu sapı tutur; nəticə aşağı ayaqcıq xəstəliyinin vestibulyar çalarından məhrum ipsilateral ataksiyadır.',
  },
  Inferior_cerebellar_peduncle: {
    title: 'INFERIOR CEREBELLAR PEDUNCLE',
    titleAz: 'Aşağı beyincik ayaqcığı',
    description:
      'The inferior cerebellar peduncle is a major cerebellar input pathway, carrying proprioceptive, vestibular, and olivary information from the spinal cord and medulla into the cerebellum. It connects the medulla and upper cord to the cerebellar hemisphere and vermis.\n\nIt is essential for balance, posture, and coordination of ongoing movement. Lateral medullary (Wallenberg) infarction classically involves this peduncle and produces ipsilateral ataxia plus vestibular signs; output to thalamus does not travel here — that is the superior peduncle.',
    descriptionAz:
      'Aşağı beyincik ayaqcığı əsas beyincik giriş yoludur, onurğa iliyi və uzunsov beyindən proprioseptiv, vestibulyar və olivar məlumatı beyinciyə gətirir. Uzunsov beyin və yuxarı onurğa iliyini beyincik yarımkürəsi və vermislə birləşdirir.\n\nTarazlıq, duruş və davam edən hərəkətin koordinasiyası üçün zəruridir. Lateral medulyar (Wallenberg) infarkt klassik olaraq bu ayaqcığı tutur və ipsilateral ataksiya plus vestibulyar əlamətlər verir; talamusa çıxış buradan getmir — o, yuxarı ayaqcıqdır.',
  },
  Dentate_nucleus: {
    title: 'DENTATE NUCLEUS',
    titleAz: 'Dişli nüvə',
    description:
      'The dentate nucleus is the largest and most lateral of the deep cerebellar nuclei, sitting within the white matter of each cerebellar hemisphere. It is the principal cerebellar output nucleus for planning and timing of skilled, voluntary movement: its neurons project through the superior cerebellar peduncle to the contralateral red nucleus and thalamus, then to motor and premotor cortex.\n\nDentate lesions or degeneration disrupt fine motor coordination and are implicated in many forms of cerebellar ataxia. Hypertensive haemorrhage into the dentate, Friedreich and other degenerative ataxias, and dentate calcification on CT are the usual clinical faces of this nucleus.',
    descriptionAz:
      'Dişli nüvə dərin beyincik nüvələrinin ən böyüyü və ən lateralıdır, hər beyincik yarımkürəsinin ağ maddəsində oturur. Bacarıqlı, ixtiyari hərəkətin planlanması və zamanlaması üçün əsas beyincik çıxış nüvəsidir: neyronları yuxarı beyincik ayaqcığı vasitəsilə əks qırmızı nüvə və talamusa, sonra motor və premotor qabığa proyeksiya edir.\n\nDişli nüvə zədəsi və ya degenerasiyası incə motor koordinasiyanı pozur və bir çox beyincik ataksiyasında iştirak edir. Dişli nüvəyə hipertenziv qanaxma, Fridreyx və digər degenerativ ataksiyalar və KT-də dişli nüvə kalsifikasiyası bu nüvənin adi klinik üzləridir.',
  },
  Interposed_nucleus: {
    title: 'INTERPOSED NUCLEUS (GLOBOSE + EMBOLIFORM)',
    titleAz: 'Ara nüvə (qloboz + emboliform)',
    description:
      'The interposed nucleus comprises the globose and emboliform nuclei fused into one paired deep grey-mass on each side, lying medial to the dentate and lateral to the fastigial nucleus. It is a key output station for limb coordination and receives input from the intermediate zone of the cerebellar cortex.\n\nClinically, interposed nucleus dysfunction contributes to limb ataxia, dysmetria, and intention tremor — the classic signs of intermediate cerebellar pathway disease, as opposed to the truncal picture of fastigial/vermal disease.',
    descriptionAz:
      'Ara nüvə hər tərəfdə dişli nüvənin medialında və fastigial nüvənin lateralında bir cüt dərin boz kütləyə birləşmiş qloboz və emboliform nüvələrdən ibarətdir. Ətraf koordinasiyası üçün əsas çıxış stansiyasıdır və beyincik qabığının ara zonasından giriş alır.\n\nKlinik olaraq, ara nüvə disfunksiyası ətraf ataksiyası, dismetriya və məqsədli tremor verir — fastigial/vermis xəstəliyinin gövdə mənzərəsindən fərqli olaraq ara beyincik yolu xəstəliyinin klassik əlamətləri.',
  },
  Fastigial_nucleus: {
    title: 'FASTIGIAL NUCLEUS (NUCLEUS FASTIGII)',
    titleAz: 'Fastigial nüvə (nucleus fastigii)',
    description:
      'The fastigial nucleus is the most medial deep cerebellar nucleus, lying near the midline within the vermis region deep to the cerebellar cortex. It is the primary output of the spinocerebellum and flocculonodular system, sending fibres to the vestibular nuclei and reticular formation to control posture, balance, and eye–head coordination.\n\nFastigial lesions produce truncal ataxia, gait instability, and vestibular signs rather than the distal limb dysmetria typical of lateral hemispheric (dentate) disease. Midline posterior-fossa surgery and vermian tumours put this nucleus at risk.',
    descriptionAz:
      'Fastigial nüvə ən medial dərin beyincik nüvəsidir, beyincik qabığının dərinliyində vermis bölgəsində orta xəttə yaxın yerləşir. Spinoserebellum və flokkulonodulyar sistemin əsas çıxışıdır, duruş, tarazlıq və göz–baş koordinasiyasını idarə etmək üçün vestibulyar nüvələrə və retikulyar formasiyaya liflər göndərir.\n\nFastigial zədələr lateral yarımkürə (dişli nüvə) xəstəliyinə xas distal ətraf dismetriyası yerinə gövdə ataksiyası, yeriş dayanıqsızlığı və vestibulyar əlamətlər verir. Orta xətt arxa çuxur cərrahiyyəsi və vermis şişləri bu nüvəni riskə atır.',
  },
};

export default cerebellumStructures;
