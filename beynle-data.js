/**
 * Beynle — the daily brain-structure puzzle.
 *
 * `a` is the answer: the English name of a structure in BB_STRUCTURES once
 * the ", left" / ", right" side is removed (beynle.js builds the guess list
 * the same way and checks that every answer exists in it).
 * `c` holds four clues, hardest first: [English, Azerbaijani].
 * The fifth clue is the structure's atlas, filled in by beynle.js.
 *
 * Puzzle #1 is 16 Nov 2026 (Baku time); after the last entry the list starts again.
 */
var BEYNLE_EPOCH = "2026-11-16";
var BEYNLE_PUZZLES = [
  { a: "Hippocampus", c: [
    ["Patient H.M. could no longer form new long-term memories after this was removed on both sides.", "H.M. adlı xəstə bu struktur hər iki tərəfdən çıxarılandan sonra yeni uzunmüddətli xatirələr yarada bilmədi."],
    ["It sits in the medial temporal lobe, curving along the floor of the lateral ventricle’s temporal horn.", "Medial temporal payda, yan mədəciyin aşağı (temporal) buynuzunun dibi boyunca qıvrılır."],
    ["London taxi drivers who learned the city’s streets had a larger back part of it.", "Şəhərin küçələrini əzbərləyən London taksi sürücülərində bunun arxa hissəsi daha böyük tapılıb."],
    ["Its name comes from the Greek for “seahorse”.", "Adı yunanca “dəniz atı” deməkdir."]] },
  { a: "Medulla oblongata", c: [
    ["The centres that keep you breathing and set heart rate and blood pressure live here.", "Tənəffüsü saxlayan, ürək ritmini və qan təzyiqini tənzimləyən mərkəzlər buradadır."],
    ["The lowest part of the brainstem, continuous with the spinal cord.", "Beyin gövdəsinin ən aşağı hissəsidir, onurğa beyni ilə davam edir."],
    ["Most motor fibres cross to the other side here, at the pyramidal decussation.", "Hərəki liflərin çoxu burada, piramid çarpazında qarşı tərəfə keçir."],
    ["Its Latin name ends in a word meaning “elongated”.", "Latın adı “uzunsov” mənasını verən sözlə bitir."]] },
  { a: "Amygdala", c: [
    ["Patient S.M., with damage to it on both sides, does not show normal fear.", "Hər iki tərəfdə bu struktur zədələnmiş S.M. adlı xəstə normal qorxu hiss etmir."],
    ["A cluster of nuclei deep in the front of the temporal lobe, just in front of the hippocampus.", "Temporal payın ön hissəsinin dərinliyində, hippokampın düz önündə yerləşən nüvələr toplusu."],
    ["It flags threats fast; learning to fear a sound or place depends on it.", "Təhlükəni sürətlə qeydə alır; bir səsdən və ya yerdən qorxmağı öyrənmək ondan asılıdır."],
    ["Its name means “almond” in Greek.", "Adı yunanca “badam” deməkdir."]] },
  { a: "Corpus callosum", c: [
    ["Cutting it to treat epilepsy gave Roger Sperry his famous “split-brain” patients.", "Epilepsiyanı müalicə etmək üçün kəsilməsi Rocer Sperriyə məşhur “bölünmüş beyin” xəstələrini verdi."],
    ["About 200 million axons cross the midline through it.", "Təxminən 200 milyon akson onun vasitəsilə orta xətti keçir."],
    ["The largest white-matter bridge in the brain, arching over the lateral ventricles.", "Beynin ən böyük ağ maddə körpüsüdür, yan mədəciklərin üzərində tağ kimi uzanır."],
    ["It joins the left and right hemispheres; its Latin name means “tough body”.", "Sol və sağ yarımkürələri birləşdirir; latın adı “bərk cisim” deməkdir."]] },
  { a: "Thalamus", c: [
    ["Almost every sense relays here on the way to the cortex — every sense except smell.", "Demək olar ki, bütün hisslər qabığa gedərkən burada releyə uğrayır — qoxudan başqa."],
    ["A paired, egg-shaped mass forming the side walls of the third ventricle.", "Üçüncü mədəciyin yan divarlarını təşkil edən cüt, yumurtavari kütlə."],
    ["Its lateral geniculate part serves vision; its medial geniculate part serves hearing.", "Onun lateral dizəbənzər hissəsi görmə, medial dizəbənzər hissəsi eşitmə üçündür."],
    ["The largest part of the diencephalon; its name is Greek for “inner chamber”.", "Aralıq beynin ən böyük hissəsi; adı yunanca “daxili otaq” deməkdir."]] },
  { a: "Cochlea", c: [
    ["Hair cells along its membrane are tuned to high pitches at the base and low pitches at the tip.", "Membranı boyunca tük hüceyrələri əsasda yüksək, uc hissədə alçaq səslərə köklənib."],
    ["It sits in the inner ear, inside the temporal bone.", "Daxili qulaqda, gicgah sümüyünün içindədir."],
    ["A cochlear implant is placed inside it to restore hearing.", "Eşitməni bərpa etmək üçün koxlear implant onun içinə yerləşdirilir."],
    ["It is coiled about two and a half turns, like a snail shell.", "İlbiz qabığı kimi təxminən iki yarım dövrə burulub."]] },
  { a: "Frontal lobe", c: [
    ["Phineas Gage’s personality changed after an iron rod passed through it.", "Dəmir çubuq buradan keçəndən sonra Finias Geycin xasiyyəti dəyişdi."],
    ["The largest lobe, in front of the central sulcus.", "Ən böyük paydır, mərkəzi şırımın önündədir."],
    ["It holds the primary motor cortex and, usually on the left, Broca’s speech area.", "Birincili motor qabıq və adətən solda Broka nitq sahəsi buradadır."],
    ["It sits right behind your forehead.", "Düz alnının arxasındadır."]] },
  { a: "Substantia nigra", c: [
    ["Losing its dopamine neurons causes the tremor and slowness of Parkinson’s disease.", "Dopamin neyronlarının itməsi Parkinson xəstəliyinin titrəməsinə və ləngliyinə səbəb olur."],
    ["A band of grey matter in the midbrain, just behind the cerebral peduncles.", "Orta beyində, beyin ayaqcıqlarının düz arxasında boz maddə zolağı."],
    ["It works as part of the basal ganglia circuit.", "Bazal nüvələr dövrəsinin bir hissəsi kimi işləyir."],
    ["Neuromelanin makes it look dark; its name means “black substance”.", "Neyromelanin onu tünd göstərir; adı “qara maddə” deməkdir."]] },
  { a: "Optic chiasm", c: [
    ["Fibres from the nose-side half of each retina cross here; the outer-half fibres stay on their side.", "Hər retinanın burun tərəfi yarısından gələn liflər burada çarpazlaşır; xarici yarının lifləri öz tərəfində qalır."],
    ["It sits just above the pituitary gland.", "Hipofiz vəzinin düz üstündədir."],
    ["A pituitary tumour pressing on it takes away both outer halves of vision (bitemporal hemianopia).", "Ona basan hipofiz şişi görmənin hər iki xarici yarısını aparır (bitemporal hemianopiya)."],
    ["Named after the X-shaped Greek letter chi (χ).", "X formalı yunan “xi” (χ) hərfinin adını daşıyır."]] },
  { a: "Vagus nerve (CN X)", c: [
    ["It slows the heart; it is the body’s main parasympathetic nerve.", "Ürəyi yavaşladır; bədənin əsas parasimpatik siniridir."],
    ["It leaves the skull through the jugular foramen.", "Kəlləni vidaj dəliyindən tərk edir."],
    ["It travels down into the chest and abdomen, as far as the gut.", "Döş qəfəsinə və qarına, bağırsağa qədər enir."],
    ["Cranial nerve X; its Latin name means “wandering”.", "X kəllə siniri; latın adı “gəzən, sərgərdan” deməkdir."]] },
  { a: "Hypothalamus", c: [
    ["It controls body temperature, hunger, thirst and the daily sleep–wake clock.", "Bədən istiliyini, aclığı, susuzluğu və gündəlik yuxu–oyaqlıq saatını idarə edir."],
    ["It forms the floor and lower walls of the third ventricle.", "Üçüncü mədəciyin dibini və aşağı divarlarını təşkil edir."],
    ["Through a thin stalk it commands the pituitary gland.", "Nazik bir ayaqcıq vasitəsilə hipofiz vəzinə əmr verir."],
    ["Its name literally means “under the thalamus”.", "Adı hərfi mənada “talamusun altı” deməkdir."]] },
  { a: "Occipital lobe", c: [
    ["Damage here can cause blindness even when both eyes are healthy.", "Buranın zədəsi hər iki göz sağlam olduqda belə korluğa səbəb ola bilər."],
    ["The rearmost lobe of each hemisphere.", "Hər yarımkürənin ən arxa payı."],
    ["The calcarine sulcus runs along its inner surface.", "Daxili səthi boyunca kalkarin şırımı uzanır."],
    ["It holds the primary visual cortex, V1.", "Birincili görmə qabığı (V1) buradadır."]] },
  { a: "Pons", c: [
    ["Fibres from the cortex relay here before crossing to the opposite half of the cerebellum.", "Qabıqdan gələn liflər burada releyə uğrayıb beyinciyin qarşı yarısına keçir."],
    ["The bulging middle segment of the brainstem, between the midbrain and the medulla.", "Beyin gövdəsinin orta, qabarıq hissəsi — orta beyin ilə uzunsov beyin arasında."],
    ["A stroke in its front part can cause “locked-in” syndrome: awake but able to move only the eyes.", "Ön hissəsində insult “qapalı qalma” sindromuna səbəb ola bilər: insan oyaqdır, amma yalnız gözlərini tərpədə bilir."],
    ["Its name is Latin for “bridge”.", "Adı latınca “körpü” deməkdir."]] },
  { a: "Caudate nucleus", c: [
    ["In Huntington’s disease it shrinks early, enough to see on brain scans.", "Hantinqton xəstəliyində erkən kiçilir, beyin skanlarında görünəcək qədər."],
    ["C-shaped, it hugs the wall of the lateral ventricle.", "C formalıdır, yan mədəciyin divarına sıxılıb."],
    ["Together with the putamen it forms the striatum.", "Putamenlə birlikdə striatumu təşkil edir."],
    ["Its name means “having a tail”.", "Adı “quyruqlu” deməkdir."]] },
  { a: "Facial nerve (CN VII)", c: [
    ["Damage to it causes Bell’s palsy: one whole side of the face droops.", "Zədələnməsi Bell iflicinə səbəb olur: üzün bir tərəfi tamamilə sallanır."],
    ["It runs through the temporal bone and exits by the stylomastoid foramen.", "Gicgah sümüyünün içindən keçir və biz-məməyəbənzər dəlikdən çıxır."],
    ["It carries taste from the front two-thirds of the tongue.", "Dilin ön üçdə iki hissəsindən dad hissini daşıyır."],
    ["Cranial nerve VII; it moves the muscles of facial expression.", "VII kəllə siniri; mimika əzələlərini hərəkət etdirir."]] },
  { a: "Locus coeruleus", c: [
    ["The brain’s main source of noradrenaline.", "Beynin əsas noradrenalin mənbəyidir."],
    ["A tiny nucleus in the upper pons, at the floor of the fourth ventricle.", "Yuxarı ponsda, dördüncü mədəciyin dibində kiçik nüvə."],
    ["It drives alertness and goes almost silent during REM sleep.", "Oyanıqlığı artırır və REM yuxusunda demək olar ki, susur."],
    ["Its name means “blue spot”.", "Adı “mavi ləkə” deməkdir."]] },
  { a: "Temporal lobe", c: [
    ["Wernicke’s area, needed to understand speech, is usually in the left one.", "Nitqi başa düşmək üçün lazım olan Vernike sahəsi adətən soldakının içindədir."],
    ["It lies below the lateral (Sylvian) fissure.", "Yan (Silvi) yarığının altında yerləşir."],
    ["The primary auditory cortex sits on its upper surface.", "Birincili eşitmə qabığı onun yuxarı səthindədir."],
    ["It lies beside your temples, which gave it its name.", "Gicgahların yanındadır, adını da buradan alıb."]] },
  { a: "Stapes", c: [
    ["The smallest bone in the human body.", "İnsan bədəninin ən kiçik sümüyüdür."],
    ["Its footplate fits into the oval window of the inner ear.", "Əsası daxili qulağın oval pəncərəsinə oturur."],
    ["In otosclerosis it becomes fixed in place, causing hearing loss.", "Otosklerozda yerində bərkiyir və eşitmə itkisinə səbəb olur."],
    ["The third ear ossicle, named after a stirrup.", "Üçüncü eşitmə sümükcüyü, üzəngiyə bənzədiyi üçün belə adlanır."]] },
  { a: "Insula", c: [
    ["It reads signals from inside your body: heartbeat, hunger, disgust.", "Bədənin içindən gələn siqnalları oxuyur: ürək döyüntüsü, aclıq, iyrənmə."],
    ["Hidden deep inside the lateral fissure, covered by the neighbouring lobes.", "Yan yarığın dərinliyində gizlənib, üstünü qonşu paylar örtür."],
    ["It contains the primary taste cortex.", "Birincili dad qabığı buradadır."],
    ["Its name means “island” in Latin.", "Adı latınca “ada” deməkdir."]] },
  { a: "Mammillary body", c: [
    ["It shrinks in Wernicke–Korsakoff syndrome, caused by a lack of vitamin B1 (thiamine).", "B1 vitamini (tiamin) çatışmazlığından yaranan Vernike–Korsakov sindromunda kiçilir."],
    ["A pair of small round bumps on the underside of the hypothalamus.", "Hipotalamusun alt səthində cüt kiçik yumru qabarıq."],
    ["The fornix ends here, linking it to the hippocampus.", "Forniks burada bitir və onu hippokampla birləşdirir."],
    ["Named for looking like a pair of small breasts.", "Adını kiçik döşlərə bənzəməsindən alıb."]] },
  { a: "Superior colliculus", c: [
    ["It turns your eyes and head toward a sudden flash of light.", "Gözlərini və başını qəfil işığa tərəf çevirir."],
    ["It sits on the back surface (tectum) of the midbrain.", "Orta beynin arxa səthində (tektumda) yerləşir."],
    ["It receives some fibres straight from the retina, skipping the thalamus.", "Liflərin bir hissəsini talamusu keçmədən birbaşa retinadan alır."],
    ["The upper of the two pairs of “little hills” on the midbrain.", "Orta beyindəki iki cüt “təpəcik”dən yuxarıdakı."]] },
  { a: "Trigeminal nerve (CN V)", c: [
    ["It carries touch and pain from the face.", "Üzdən toxunma və ağrı hissini daşıyır."],
    ["Its sensory ganglion rests in a pocket of dura on the petrous part of the temporal bone.", "Hiss düyünü gicgah sümüyünün qayalı hissəsi üzərində dura cibində yerləşir."],
    ["Its motor branch works the chewing muscles.", "Hərəki şaxəsi çeynəmə əzələlərini işlədir."],
    ["Cranial nerve V; it splits into three branches.", "V kəllə siniri; üç şaxəyə bölünür."]] },
  { a: "Putamen", c: [
    ["The most common site of bleeding in the brain caused by high blood pressure.", "Yüksək qan təzyiqinin səbəb olduğu beyin qanaxmasının ən çox rast gəlinən yeri."],
    ["The outer part of the lentiform nucleus, just inside the external capsule.", "Mərcimək nüvəsinin xarici hissəsidir, xarici kapsulun düz içində."],
    ["With the caudate it forms the striatum, key for learned movements and habits.", "Kaudat nüvə ilə birlikdə striatumu təşkil edir; öyrənilmiş hərəkətlər və vərdişlər üçün vacibdir."],
    ["Its name means “shell” or “husk” in Latin.", "Adı latınca “qabıq” deməkdir."]] },
  { a: "Fourth ventricle", c: [
    ["Cerebrospinal fluid leaves the ventricles through openings in it.", "Beyin-onurğa mayesi mədəciklərdən onun dəlikləri vasitəsilə çıxır."],
    ["The pons and medulla lie in front of it, the cerebellum behind.", "Önündə pons və uzunsov beyin, arxasında beyincik var."],
    ["Its floor is diamond-shaped (the rhomboid fossa).", "Dibi romb formalıdır (romboid çuxur)."],
    ["The last of the brain’s four fluid-filled cavities.", "Beynin maye ilə dolu dörd boşluğunun sonuncusu."]] },
  { a: "Parietal lobe", c: [
    ["Damage to the right one can make a person ignore the left side of the world (neglect).", "Sağdakının zədəsi insanın dünyanın sol tərəfini görməzdən gəlməsinə (neqlekt) səbəb ola bilər."],
    ["It lies between the central sulcus and the occipital lobe.", "Mərkəzi şırım ilə oksipital pay arasındadır."],
    ["Its postcentral gyrus is the primary somatosensory cortex.", "Mərkəzarxası qırışığı birincili somatosensor qabıqdır."],
    ["Named after the bone that forms the upper side wall of the skull.", "Kəllənin yan-yuxarı divarını təşkil edən sümüyün adını daşıyır."]] },
  { a: "Subthalamic nucleus", c: [
    ["The most common target for deep brain stimulation in Parkinson’s disease.", "Parkinson xəstəliyində dərin beyin stimulyasiyasının ən çox seçilən hədəfidir."],
    ["A small lens-shaped nucleus just above the substantia nigra.", "Qara substansiyanın düz üstündə kiçik, linzavari nüvə."],
    ["A small stroke here can cause wild flinging movements of one arm (hemiballismus).", "Buradakı kiçik insult bir qolun kəskin atılma hərəkətlərinə (hemiballizm) səbəb ola bilər."],
    ["As its name says, it sits right under the thalamus.", "Adının dediyi kimi, talamusun düz altındadır."]] },
  { a: "Retina", c: [
    ["It holds about 120 million rods and 6 million cones.", "Burada təxminən 120 milyon çöpcük və 6 milyon kolbacıq var."],
    ["It lines the back of the eye.", "Gözün arxa divarını örtür."],
    ["Its blind spot is where the optic nerve leaves.", "Kor nöqtəsi görmə sinirinin çıxdığı yerdir."],
    ["In the embryo it grows out of the brain itself.", "Embrionda birbaşa beynin özündən böyüyüb çıxır."]] },
  { a: "Fornix", c: [
    ["The main output bundle of the hippocampus.", "Hippokampın əsas çıxış lif dəstəsidir."],
    ["It arches under the corpus callosum toward the mammillary bodies.", "Korpus kallozumun altından tağ kimi məməyəbənzər cisimlərə doğru gedir."],
    ["Damage to it on both sides can impair new memory formation.", "Hər iki tərəfdə zədələnməsi yeni xatirələrin yaranmasını poza bilər."],
    ["Its name is Latin for “arch”.", "Adı latınca “tağ” deməkdir."]] },
  { a: "Oculomotor nerve (CN III)", c: [
    ["A lesion leaves the eye looking “down and out”, with a drooping lid and a wide pupil.", "Zədəsi gözü “aşağı və çölə” yönəldir, göz qapağı sallanır, bəbək genişlənir."],
    ["It leaves the midbrain between the two cerebral peduncles.", "Orta beyindən iki beyin ayaqcığı arasından çıxır."],
    ["It carries the parasympathetic fibres that make the pupil smaller.", "Bəbəyi kiçildən parasimpatik lifləri daşıyır."],
    ["Cranial nerve III.", "III kəllə siniri."]] },
  { a: "Globus pallidus", c: [
    ["The main output station of the basal ganglia.", "Bazal nüvələrin əsas çıxış stansiyasıdır."],
    ["The inner part of the lentiform nucleus, on the inner side of the putamen.", "Mərcimək nüvəsinin daxili hissəsidir, putamenin daxili tərəfində."],
    ["Its inner segment is a deep brain stimulation target for dystonia.", "Daxili seqmenti distoniyada dərin beyin stimulyasiyası üçün hədəfdir."],
    ["Its name means “pale globe”.", "Adı “solğun kürə” deməkdir."]] },
  { a: "Cerebral aqueduct", c: [
    ["If it narrows, the ventricles above it swell (hydrocephalus).", "Daralanda üstündəki mədəciklər genişlənir (hidrosefaliya)."],
    ["A narrow channel running through the midbrain.", "Orta beyindən keçən dar kanal."],
    ["The periaqueductal grey surrounds it.", "Onu periakeduktal boz maddə əhatə edir."],
    ["It connects the third and fourth ventricles.", "Üçüncü və dördüncü mədəcikləri birləşdirir."]] },
  { a: "Primary visual cortex (V1)", c: [
    ["Hubel and Wiesel won a Nobel Prize for finding edge-detecting cells here.", "Hubel və Vizel burada kənarları aşkar edən hüceyrələri tapdıqları üçün Nobel mükafatı aldılar."],
    ["It lines the banks of the calcarine sulcus.", "Kalkarin şırımının kənarlarını örtür."],
    ["The left one sees the right half of the visual world.", "Soldakı görmə sahəsinin sağ yarısını görür."],
    ["The first stop for vision in the cortex, also called striate cortex.", "Görmənin qabıqdakı ilk dayanacağı; zolaqlı qabıq da adlanır."]] },
  { a: "Red nucleus", c: [
    ["It lies on the path from the cerebellum’s dentate nucleus to the thalamus.", "Beyinciyin dişli nüvəsindən talamusa gedən yolun üstündədir."],
    ["An oval nucleus in the upper midbrain tegmentum.", "Yuxarı orta beyin örtüyündə (tegmentum) oval nüvə."],
    ["The rubrospinal tract starts here.", "Rubrospinal trakt buradan başlayır."],
    ["A rich blood supply and iron give it a pinkish-red tint.", "Zəngin qan təchizatı və dəmir ona çəhrayı-qırmızı rəng verir."]] },
  { a: "Lateral ventricle", c: [
    ["The largest of the brain’s fluid-filled spaces.", "Beynin maye ilə dolu boşluqlarının ən böyüyü."],
    ["C-shaped, with frontal, occipital and temporal horns.", "C formalıdır; ön, arxa və aşağı (temporal) buynuzları var."],
    ["It drains into the third ventricle through the interventricular foramen.", "Mədəciklərarası dəlik vasitəsilə üçüncü mədəciyə açılır."],
    ["There is one in each hemisphere.", "Hər yarımkürədə bir dənə var."]] },
  { a: "Abducens nerve (CN VI)", c: [
    ["A lesion turns the eye inward and causes double vision when looking to the side.", "Zədəsi gözü içəri döndərir və yana baxanda ikili görməyə səbəb olur."],
    ["It has a long path over the petrous bone and through the cavernous sinus.", "Qayalı sümüyün üzərindən və kavernoz sinusdan keçən uzun yolu var."],
    ["It moves just one muscle: the lateral rectus.", "Yalnız bir əzələni hərəkət etdirir: lateral düz əzələni."],
    ["Cranial nerve VI.", "VI kəllə siniri."]] },
  { a: "Periaqueductal grey", c: [
    ["Stimulating it can switch off pain; morphine acts here.", "Onu stimullaşdırmaq ağrını söndürə bilər; morfin burada da təsir edir."],
    ["It is found in the midbrain.", "Orta beyində yerləşir."],
    ["It organises defensive behaviour like freezing or fleeing.", "Donub qalma və ya qaçma kimi müdafiə davranışını təşkil edir."],
    ["Grey matter wrapped around the cerebral aqueduct.", "Beyin su kəmərini əhatə edən boz maddə."]] },
  { a: "Inferior colliculus", c: [
    ["Almost every sound signal passes through it on the way to the thalamus.", "Demək olar ki, bütün səs siqnalları talamusa gedərkən buradan keçir."],
    ["On the back of the midbrain, just above where the trochlear nerve exits.", "Orta beynin arxasında, blok sinirinin çıxdığı yerin düz üstündə."],
    ["It sends its output to the medial geniculate body.", "Çıxışını medial dizəbənzər cismə göndərir."],
    ["The lower of the two pairs of “little hills” on the midbrain.", "Orta beyindəki iki cüt “təpəcik”dən aşağıdakı."]] },
  { a: "Choroid plexus", c: [
    ["It makes most of the cerebrospinal fluid — about half a litre a day.", "Beyin-onurğa mayesinin çoxunu hazırlayır — gündə təxminən yarım litr."],
    ["Tufts of capillaries hanging into the ventricles.", "Mədəciklərə sallanan kapilyar topaları."],
    ["It often calcifies with age and shows up bright on CT scans.", "Yaşla tez-tez kalsifikasiya olur və KT-də parlaq görünür."],
    ["Its name joins the word for a membrane around the foetus with “network”.", "Adı döl qişasının adı ilə “şəbəkə” sözünü birləşdirir."]] },
  { a: "Lateral geniculate body", c: [
    ["The thalamus’s relay for vision.", "Talamusun görmə releyidir."],
    ["Most optic tract fibres end here.", "Görmə traktı liflərinin çoxu burada bitir."],
    ["It has six layers and sends the optic radiation to V1.", "Altı qatı var və optik radiasiyanı V1-ə göndərir."],
    ["A knee-shaped bump on the outer side of the thalamus.", "Talamusun xarici tərəfində dizəbənzər qabarıq."]] },
  { a: "Olfactory nerve (CN I)", c: [
    ["Its neurons are among the few in the body replaced throughout life.", "Onun neyronları bədəndə ömür boyu yenilənən azsaylı neyronlardandır."],
    ["Its fibres pass through the holes of the cribriform plate.", "Lifləri xəlbirvari lövhənin dəliklərindən keçir."],
    ["A blow to the head can tear it, leaving a person unable to smell (anosmia).", "Başa zərbə onu qopara və qoxu itkisinə (anosmiya) səbəb ola bilər."],
    ["Cranial nerve I.", "I kəllə siniri."]] },
  { a: "Cerebellar tonsil", c: [
    ["If pushed down through the foramen magnum it can crush the breathing centres — a deadly emergency.", "Böyük dəlikdən aşağı sıxışdırılsa, tənəffüs mərkəzlərini əzə bilər — ölümcül təcili vəziyyət."],
    ["A rounded lobule on the underside of the cerebellum, beside the midline.", "Beyinciyin alt səthində, orta xəttin yanında yumru lobul."],
    ["In Chiari I malformation it sits too low.", "Kiari I malformasiyasında həddən artıq aşağıda yerləşir."],
    ["It shares its name with the lymph tissue at the back of the throat.", "Adı boğazın arxasındakı limfa toxuması ilə eynidir."]] },
  { a: "Anterior cingulate gyrus", c: [
    ["It becomes active when you notice an error or a conflict between choices.", "Səhvi və ya seçimlər arasında ziddiyyəti hiss edəndə aktivləşir."],
    ["On the inner surface of the hemisphere, curving around the front of the corpus callosum.", "Yarımkürənin daxili səthində, korpus kallozumun ön hissəsinin ətrafında qıvrılır."],
    ["It handles how unpleasant pain feels rather than where it is.", "Ağrının harada olmasını yox, nə qədər xoşagəlməz olmasını emal edir."],
    ["The front part of the limbic lobe’s “belt” gyrus.", "Limbik payın “kəmər” qırışığının ön hissəsi."]] },
  { a: "Hypoglossal nerve (CN XII)", c: [
    ["If one is damaged, the tongue points toward the injured side when stuck out.", "Biri zədələnəndə çıxarılan dil zədəli tərəfə əyilir."],
    ["It leaves the medulla between the pyramid and the olive.", "Uzunsov beyindən piramid ilə zeytun arasından çıxır."],
    ["It is purely motor and works the tongue muscles.", "Tamamilə hərəki sinirdir, dil əzələlərini işlədir."],
    ["Cranial nerve XII; its name means “under the tongue”.", "XII kəllə siniri; adı “dilin altı” deməkdir."]] },
  { a: "Medial geniculate body", c: [
    ["The thalamus’s relay for hearing.", "Talamusun eşitmə releyidir."],
    ["It receives input from the inferior colliculus.", "Aşağı təpəcikdən siqnal alır."],
    ["It sends its output to Heschl’s gyrus.", "Çıxışını Heşl qırışığına göndərir."],
    ["A knee-shaped bump on the back of the thalamus, toward the middle.", "Talamusun arxasında, ortaya yaxın dizəbənzər qabarıq."]] },
  { a: "Falx cerebri", c: [
    ["A fold of dura that dips down between the two hemispheres.", "İki yarımkürə arasına enən dura qatı."],
    ["The superior sagittal sinus runs along its upper edge.", "Yuxarı kənarı boyunca yuxarı sagittal sinus uzanır."],
    ["It often calcifies and then shows up on CT scans.", "Tez-tez kalsifikasiya olur və onda KT-də görünür."],
    ["Its name means “sickle of the brain”.", "Adı “beynin oraqı” deməkdir."]] },
  { a: "Trochlear nerve (CN IV)", c: [
    ["The only cranial nerve that leaves from the back of the brainstem.", "Beyin gövdəsinin arxasından çıxan yeganə kəllə siniri."],
    ["The thinnest cranial nerve, with the longest path inside the skull.", "Ən nazik kəllə siniridir, kəllə içində ən uzun yolu var."],
    ["A lesion causes double vision when walking downstairs; patients tilt their head to cope.", "Zədəsi pilləkəndən enərkən ikili görməyə səbəb olur; xəstələr başını əyərək uyğunlaşır."],
    ["Cranial nerve IV; it works the superior oblique muscle.", "IV kəllə siniri; yuxarı çəp əzələni işlədir."]] },
  { a: "Auditory cortex (Heschl's gyri)", c: [
    ["It is laid out by pitch, like a piano keyboard (tonotopy).", "Piano klaviaturası kimi səs tezliyinə görə düzülüb (tonotopiya)."],
    ["On the upper surface of the temporal lobe, tucked into the lateral fissure.", "Temporal payın yuxarı səthində, yan yarığın içində gizlənib."],
    ["Its main input comes from the medial geniculate body.", "Əsas siqnalı medial dizəbənzər cisimdən alır."],
    ["The cortex where sound first arrives.", "Səsin ilk çatdığı qabıq sahəsi."]] },
  { a: "Flocculus", c: [
    ["It keeps your view steady while your head moves by tuning the vestibulo-ocular reflex.", "Vestibulo-okulyar refleksi tənzimləyərək baş hərəkət edərkən görüntünü sabit saxlayır."],
    ["A small lobe on the underside of the cerebellum, near the vestibulocochlear nerve.", "Beyinciyin alt səthində, dəhliz-ilbiz sinirinin yanında kiçik pay."],
    ["With the nodule it forms the oldest part of the cerebellum.", "Nodulusla birlikdə beyinciyin ən qədim hissəsini təşkil edir."],
    ["Its name means “little tuft of wool”.", "Adı “kiçik yun topası” deməkdir."]] },
  { a: "Cavernous sinus", c: [
    ["The internal carotid artery and cranial nerve VI run right through it.", "Daxili yuxu arteriyası və VI kəllə siniri onun düz içindən keçir."],
    ["A venous space on each side of the sella turcica, where the pituitary sits.", "Hipofizin oturduğu türk yəhərinin hər iki tərəfində venoz boşluq."],
    ["Nerves III, IV and the first two branches of V run in its side wall.", "III, IV sinirləri və V sinirin ilk iki şaxəsi onun yan divarında gedir."],
    ["A dural venous sinus with a sponge-like, cave-filled inside.", "İçi süngərvari, mağaralı olan dura venoz sinusu."]] },
];
