# Brain Bee — review prep for a human native speaker + a human SME

This file exists to make an hour of a native Azerbaijani speaker's time and
an hour of a subject-matter expert's time count. It is not a native-speaker
review and not an SME review — both of those still need to happen by an
actual human. Nothing here is a verdict; every finding is a flag with a
"Human: keep / change / delete" column left for a person to fill in. Nothing
in this file has been applied to `brain-bee-lessons-data.js`,
`brain-bee-gap-questions.js`, or `brain-bee-questions.js` — those files are
untouched by this pass.

Scope: the same three source files Omar named — `brain-bee-lessons-data.js`
(34 lessons), `brain-bee-gap-questions.js` (102 questions), and
`brain-bee-questions.js` (300 questions, AZ strings only — this pass did not
re-read or re-judge the English content of the frozen 300). The 27 diagnosis
cases (`brain-bee-cases.js`) are a separate file not covered here.

---

## Part 1: Terminology lock

**Method**: every AZ string in the three files was extracted (2,539
EN/AZ sentence-or-field pairs — 127 from lessons, 612 from the gap bank, 1,800
from the main bank) and searched against roughly 140 candidate neuroscience
terms, each with a set of plausible Azerbaijani spelling/translation variants,
to find places where the same English concept is rendered two different ways,
or where a single Azerbaijani word is standing in for two different English
concepts. Every hit that looked like a real collision was individually opened
and read in context — not just pattern-matched — before being kept, because
several early candidates turned out to be false positives once read in
context: **`tutma`** (matched as a candidate translation of "seizure," but
in every real instance it meant "grasp," "occur," or "attack" — idiomatic
uses of a common word, not a seizure-terminology inconsistency — dropped);
**`bazal nüvə`** ("Meynert's basal nucleus," a real but different structure
from the basal ganglia — matched by an overly broad search pattern, dropped,
not actually a basal-ganglia spelling issue); **`ventrikul`** (a substring
hit inside "paraventrikulyar nüvə," a hypothalamic nucleus name — unrelated
to the ventricle cavities — dropped); **`MRI`** (matched as a lowercase
substring inside the unrelated Azerbaijani word "əmri" — "of its command" —
in several motor-system sentences — dropped; the real imaging-abbreviation
terminology, `MRT`, turned out fully consistent once the false hits were
removed). Reporting these here rather than silently discarding them, in case
it's useful signal about where automated search misleads on this corpus.

**What this means for the row count**: this corpus was authored by one AI
across a handful of sessions rather than assembled by many independent human
translators over years, which is exactly the situation where terminology
usually stays more consistent than in most real-world corpora. After
discarding false positives, genuine collisions across ~140 audited terms and
2,539 sentence pairs came out to **13 rows**, not the ~80 originally
estimated. That's a real result, not an incomplete pass — the search covered
the full anatomy/physiology vocabulary (neuron, synapse, membrane potentials,
all major structures, cranial nerves, sleep stages, addiction/psychiatric/
degenerative-disease vocabulary, neuroethics/imaging vocabulary) and a wide
net of plausible spelling variants for each. If a narrower or wider net is
wanted, say so and it can be re-run — but padding this table with clean,
single-form terms just to hit a number would defeat its purpose.

Skipped as "clean, don't need a row" after checking (partial list — the terms
that came back with a single consistent form across every occurrence found):
myelin, axon, dendrite, synapse, neurotransmitter, receptor, glia,
astrocyte/oligodendrocyte/microglia, amygdala, thalamus, hypothalamus,
cerebellum, brainstem, action potential, resting potential, long-term
potentiation (all 4 occurrences: "uzunmüddətli potensiasiya"), Wernicke
("Vernike" throughout), arachnoid mater ("araxnoid" throughout), vegetative
state, minimally conscious state, brain death, locked-in syndrome (each only
1 occurrence, but consistent with itself), prefrontal cortex, myelin sheath,
plasticity, DBS/TMS (abbreviation-after-first-use is expected, not flagged).

### Collision table

| English (canonical) | AZ forms already used (quoted, with file + id) | Count | Recommended AZ | Why / uncertainty | Human: keep A / keep B / use recommended / other |
|---|---|---|---|---|---|
| Broca's area / Broca | **"Broka"** — `brain-bee-lessons-data.js` (`cortex-lobes`, `language-brain`) and 17 more, incl. `brain-bee-gap-questions.js` `language-brocas`. **"Broca"** — `brain-bee-questions.js` `lim-limbic-ring.why`: "...Broca bu adı qabırğalı cismi ilə..." | A: 19 / B: 1 | "Broka" (A) | The single "Broca" instance reads like a leftover raw-English spelling rather than a deliberate choice — everywhere else the Azerified form is used. Low uncertainty. | |
| Hippocampus | **"hippokamp"** (double p) — `brain-bee-lessons-data.js` `limbic-system` and 36 more. **"hipokamp"** (single p) — `brain-bee-questions.js` `wm-cingulum.q` ("...parahipokampal nahiyə...") and 19 more. | A: 37 / B: 20 | Uncertain — lean "hippokamp" (majority) | Not an overwhelming majority (37 vs 20, both used many times over). This is a genuine double-consonant transliteration question a native speaker should settle against whatever Azerbaijani textbooks/dictionaries actually use, not something to infer from occurrence count alone. | |
| Cerebral cortex | **"beyin qabığı"** (descriptive calque) — `brain-bee-lessons-data.js` `brainstem`, and 5 more. **"kortek(s)"** (loanword, incl. "Neokorteksdə") — `brain-bee-questions.js` `layer5-output.q` and 3 more. | A: 6 / B: 4 | Uncertain — may not be a true collision | These may not be true synonyms in every context: "korteks" often appears in compounds ("neokorteks," "prefrontal korteks" pattern) where "beyin qabığı" would read oddly, while "beyin qabığı" is the natural term in descriptive lesson prose. Flag for a human to confirm whether this is inconsistency or legitimate register-switching. | |
| Dopamine | **"dofamin"** — `brain-bee-lessons-data.js` `synapse-transmitters` and 22 more. **"dopamin"** — `brain-bee-questions.js` `bg-parkinson.choice[3]` ("dopaminergik neyronları") and 15 more. | A: 23 / B: 16 | Uncertain — defer to human | Azerbaijani has historically varied between "f" and "p" for this class of loanword; which is the current standard (school/university textbooks, INN drug-naming convention) isn't something to guess from a text-frequency count. | |
| Hemorrhagic (stroke) | **"hemorragik"** — `brain-bee-lessons-data.js` `injury-illness.body[0]`. **"qansızma"** — `brain-bee-questions.js` `bs-medulla-vital.q` ("...bir neçə millimetrlik qansızma..."). | A: 1 / B: 1 | Possibly not a real collision | Small sample (n=2 total). "Qansızma" is a noun ("a bleed"/"bleeding event"), "hemorragik" is the adjective form ("hemorrhagic [stroke]") — these may be correct in their own grammatical roles rather than competing translations of the same word. Flag to confirm rather than treat as an error. | |
| Vestibular system/apparatus | **"vestibulyar aparat"** — `brain-bee-lessons-data.js` `hearing-balance.body[1]`. **"vestibulyar sistem"** — `brain-bee-gap-questions.js` `addiction-amygdala-craving.choice[3]`. | A: 1 / B: 1 | Uncertain — possible convention: "aparat" | Small sample (n=2). Russian-influenced Azerbaijani medical usage often prefers "aparat" ("apparatus") for this structure; flagging that as a possible tiebreaker, not asserting it. | |
| Spinal cord | **"onurğa beyni"** (lit. "spinal brain") — `brain-bee-lessons-data.js` `neuron-structure.body[0]` and 22 more. **"onurğa iliyi"** (lit. "spinal marrow") — `brain-bee-questions.js` `bs-superior-colliculus.choice[3]` and 26 more. | A: 23 / B: 27 | Uncertain — lean "onurğa iliyi" | Close to an even split across 50 total occurrences, which makes this the highest-volume real collision found. Both terms are attested for "spinal cord" in Azerbaijani, but I'm not confident which one is the standard anatomical term vs. a looser/older calque — this genuinely needs a native/SME call, not a guess from frequency. | |
| Dura mater / pia mater (meninges) | **Full Latin** — "dura mater," "pia mater" — `brain-bee-lessons-data.js` `brain-overview.body[0]` (the lesson's own introduction of the meninges keeps all three Latin names untranslated). **Short Latin, capitalized** — "Dura," "Pia," "araxnoid" — `brain-bee-questions.js` `bg-components.choice[0]`, `men-layers.why`. **Fully translated** — "sərt qişa" (×7), "yumşaq qişa" (×2) — throughout the rest of `brain-bee-questions.js`. | 3 distinct conventions across 12 total occurrences | No single "correct" form — this is a style decision, not an error | A student who only reads the lesson meets "dura mater"/"pia mater" in Latin and never sees "sərt qişa"/"yumşaq qişa" until they hit a practice question — that's a real usability gap regardless of which term is "more correct." Worth deciding once: keep Latin throughout (teaches the international terms), translate throughout (more accessible), or explicitly gloss both the first time each appears. | |
| Corpus callosum | **"corpus callosum"** (untranslated Latin) — `brain-bee-lessons-data.js` `white-matter.body[0]`, `brain-bee-gap-questions.js` `language-split-brain.q`, `brain-bee-questions.js` `cingulate.q` and `.why`. **"qabırğalı cisim"** (lit. "ribbed body") — `brain-bee-questions.js` `wm-split-brain.q` and `.why`. | A: 4 / B: 1 (one full item, stem+explanation both) | "corpus callosum" (A) — and flag B as a likely mistranslation | "Qabırğalı" derives from "qabırğa" (rib) — it doesn't correspond to "callosum" (Latin for tough/calloused). This reads like a genuine translation slip rather than a deliberate alternate term, unlike the other rows here. Flagging only, not correcting — a human should confirm before anything changes. | |
| Nociceptor | **"ağrı reseptor(u/ları)"** (lit. "pain receptor") — `brain-bee-questions.js` `sn-adaptation-phasic.choice[3]`. **"nosiseptor(lar)"** (loanword) — same question item, `sn-adaptation-phasic.why`. | A: 1 / B: 1 | "nosiseptor" | Same question uses both terms for the same thing in the choice text vs. the explanation text — that's the clearest single-item inconsistency found in this pass, independent of which term is "better." | |
| REM sleep | **"sürətli göz hərəkəti"** (spelled out: "rapid eye movement") — `brain-bee-lessons-data.js` `sleep.body[0]` (the lesson's own definition). **"REM yuxu"** (abbreviated loanword) — `brain-bee-questions.js` `rem-atonia.q`, `sae-rem-behaviour` (×3 more). | A: 1 / B: 4 | "REM yuxu" (B) as the working term | Same pattern as dura/pia mater: the lesson spells the concept out once, every question afterward uses the shorthand. Not wrong, but worth a human call on whether the lesson should also introduce "REM" as the term students will actually see in practice. | |
| Trigeminal nerve (CN V) | **"trigeminal"** (Latin/English gloss, alongside the Roman numeral) — `brain-bee-lessons-data.js` `cranial-nerves.body[1]`: "V (trigeminal) üz hissiyyatını daşıyır...". **"üçlü sinir"** (translated: "triple nerve") — `brain-bee-questions.js` `cn-v1-cornea.why`, `cn-trigeminal-motor.q`, `bs-wallenberg.why`, `sn-flavour.choice[2]`. | A: 1 / B: 4 | "üçlü sinir" (B) as the working term | Every other cranial nerve in this lesson is given its translated Azerbaijani name, not just glossed in Latin — "trigeminal" here reads like an outlier rather than a deliberate choice. Low-to-medium uncertainty. | |

**13 collision rows total.** No recommendation above has been applied
anywhere — `keep A / keep B / use recommended / other` is for a human to
fill in.

---

## Part 2: Rebuilt review packet

Same triage rule as before: precise number, drug/clinical claim, legal citation, cited date, or hedged/contested-science language. Rebuilt fresh from the live source files (not from the old `.docx`, which is no longer on disk here) — the live files and my memory of the old packet agree on both counts (8 lesson paragraphs, 46 questions), so there was nothing to reconcile. Nothing below has been applied to `brain-bee-lessons-data.js`, `brain-bee-gap-questions.js`, or `brain-bee-questions.js`.

**Source-attribution honesty note**: for items citing a specific study, researcher, court case, or approval date, "sourced" below means the claim already names its own citation and that citation is well-known/broadly reliable — it does **not** mean I re-verified it against a primary source in this pass. Fresh verification is Part 3's job, not this one. Where nothing beyond general domain knowledge grounds a claim, it's marked "not previously sourced" rather than invented.

### LESSON FLAGS (8 of 73 paragraphs)

#### `neuron-structure` (chapter 1.1) — The neuron: structure

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: precise number, cited date, hedged/contested-science language
- **EN**: Neurons don't work alone. Glial cells do the support work alongside them, and in the human brain there are roughly as many of them as neurons — older textbook estimates that glia outnumber neurons 10-to-1 came from less rigorous counting methods and have since been revised down by direct stereological counts (a widely cited 2009 study put both figures at roughly 86 billion). Astrocytes maintain the chemical environment around synapses, microglia are the nervous system's immune cells, and — as above — oligodendrocytes and Schwann cells build myelin. None of them fire action potentials themselves, which is the subject of the next lesson.
- **AZ**: Neyronlar tək işləmir. Qlial hüceyrələr onlarla yanaşı dəstək işini görür və insan beynində onların sayı təxminən neyronların sayı qədərdir — qlial hüceyrələrin neyronları 10 dəfə üstələdiyi barədə köhnə dərslik təxminləri daha az dəqiq sayma metodlarından qaynaqlanırdı və birbaşa stereoloji sayımlarla aşağı düzəldilib (geniş istinad edilən 2009-cu il tədqiqatı hər iki rəqəmi təxminən 86 milyard olaraq müəyyən edib). Astrositlər sinapslar ətrafındakı kimyəvi mühiti saxlayır, mikroqlia sinir sisteminin immun hüceyrələridir və — yuxarıda deyildiyi kimi — oliqodendrositlər və Şvann hüceyrələri mielini qurur. Heç biri özü fəaliyyət potensialı yaratmır — bu, növbəti dərsin mövzusudur.
- **Source used / last checked**: Sourced — Azevedo et al. 2009 stereological count (~86 billion neurons, ~85 billion non-neuronal cells). This exact figure was an explicit correction made earlier in this project, replacing an original "glia outnumber neurons 10:1" claim (see BRAIN-BEE-CURRICULUM.md, "Current state").
- **What would make it wrong**: A larger/more recent stereological recount revising the ~86B figures, or a stricter reading noting the Azevedo estimate isn't exactly 1:1 (86.1B neurons vs. ~84.6B non-neuronal cells) — "roughly as many" is defensible but not exact.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `synapse-transmitters` (chapter 1.4) — Synapses & neurotransmitters

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: drug/clinical claim
- **EN**: The signal is stopped by reuptake (transporters pull neurotransmitter back into the presynaptic terminal — the target of SSRIs, for serotonin), enzymatic breakdown (acetylcholinesterase clears acetylcholine at the neuromuscular junction), or simple diffusion away from the cleft. Other major neurotransmitters worth knowing by name and rough effect: dopamine (reward, movement — depleted in Parkinson's disease), norepinephrine (arousal, alertness), and serotonin (mood, sleep regulation).
- **AZ**: Siqnal geri udulma (daşıyıcılar neyrotransmitteri presinaptik terminala geri çəkir — serotonin üçün SSRİ-lərin hədəfi), fermentativ parçalanma (asetilxolinesteraza neyromuskulyar qovşaqda asetilxolini təmizləyir) və ya sadəcə yarıqdan uzaqlaşan diffuziya ilə dayandırılır. Adı və təxmini təsiri ilə bilinməli digər əsas neyrotransmitterlər: dofamin (mükafat, hərəkət — Parkinson xəstəliyində azalır), noradrenalin (oyanıqlıq, diqqətlilik) və serotonin (əhval-ruhiyyə, yuxu tənzimi).
- **Source used / last checked**: Not previously sourced to a specific citation — standard neuropharmacology textbook content (SSRI mechanism, acetylcholinesterase at the neuromuscular junction, dopamine depletion in Parkinson's).
- **What would make it wrong**: If SSRIs were mischaracterized as acting on dopamine rather than serotonin reuptake, or Parkinson's dopamine loss described as increased rather than depleted — neither error is present, but these are the failure modes worth a second look.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `brain-overview` (chapter 1.5) — Whole-brain orientation: meninges & ventricles

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: precise number
- **EN**: Three membrane layers, the meninges, wrap the entire central nervous system between the skull/vertebrae and the nervous tissue itself. From outside in: the dura mater is a tough, fibrous outer layer (in the skull it forms folds like the falx cerebri, separating the two hemispheres, and the tentorium cerebelli, separating the cerebrum from the cerebellum); the arachnoid mater is a thin, web-like middle layer; and the pia mater is a delicate membrane that hugs the brain's surface directly. Cerebrospinal fluid (CSF) fills the subarachnoid space between arachnoid and pia, cushioning the brain and reducing its effective weight from about 1,400 grams to roughly 50.
- **AZ**: Üç membran qatı, meninges, bütün mərkəzi sinir sistemini kəllə/onurğa sütunu ilə sinir toxuması arasında əhatə edir. Xaricdən içəriyə: dura mater — sərt, lifli xarici qat (kəllədə iki yarımkürəni ayıran falx cerebri, kiçik beyni böyük beyindən ayıran tentorium cerebelli kimi qatlar yaradır); arachnoid mater — nazik, hörümçək toru bənzər orta qat; pia mater isə beynin səthinə birbaşa yapışan nazik membrandır. Beyin-onurğa beyni mayesi (BOM) arachnoid və pia arasındakı subarachnoid boşluğu doldurur, beyni yastıqlayır və onun effektiv çəkisini təxminən 1400 qramdan təxminən 50 qrama endirir.
- **Source used / last checked**: Not previously sourced to a specific citation — the ~1,400g → ~50g CSF-buoyancy figure is a commonly repeated neuroanatomy factoid, not independently verified against a primary source in this project.
- **What would make it wrong**: Different sources cite different buoyancy-adjusted figures (some closer to 25g); if the underlying Archimedes-principle calculation for average CSF/brain density differs meaningfully from ~50g, this number would need revision.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `cortex-lobes` (chapter 1.6) — Cortex & lobes

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: precise number
- **EN**: The cerebral cortex is the brain's outer, wrinkled sheet of gray matter — about 2-4 millimeters thick, but folded into gyri (ridges) and sulci (grooves) to pack roughly 2,000-2,500 square centimeters (a quarter of a square meter or so — about two-thirds of it hidden inside the folds) of surface area into the skull. Each hemisphere has four lobes. The frontal lobe (bounded behind by the central sulcus) handles voluntary movement (primary motor cortex, the precentral gyrus), planning, and decision-making, and contains Broca's area, involved in speech production. The parietal lobe (behind the central sulcus) processes touch, pressure, temperature, and pain via the primary somatosensory cortex (postcentral gyrus), and integrates that with vision and hearing for spatial awareness.
- **AZ**: Beyin qabığı beynin xarici, qırışıq boz maddə təbəqəsidir — təxminən 2-4 millimetr qalınlığında, lakin təxminən 2,000-2,500 kvadrat santimetr (kvadrat metrin dörddə biri qədər — təxminən üçdə ikisi qırışların içində gizlənir) səth sahəsini kəllədə sığdırmaq üçün girus (təpəciklər) və sulkuslara (şırımlar) qatlanmışdır. Hər yarımkürə dörd paydan ibarətdir. Frontal pay (arxadan mərkəzi şırımla hüdudlanır) könüllü hərəkəti (əsas motor qabığı, presentral girus), planlaşdırmanı və qərar qəbulunu idarə edir və nitq istehsalında iştirak edən Broka nahiyəsini ehtiva edir. Parietal pay (mərkəzi şırımın arxasında) toxunma, təzyiq, temperatur və ağrını əsas somatosensor qabıq (postsentral girus) vasitəsilə emal edir və bunu məkan qavrayışı üçün görmə və eşitmə ilə birləşdirir.
- **Source used / last checked**: Sourced — this figure (2,000-2,500 cm², ~1/4 m²) was an explicit correction made earlier in this project, checked against WebMD and NCBI Bookshelf after the original draft overstated it at ~1.5 m² (see BRAIN-BEE-CURRICULUM.md, "Current state").
- **What would make it wrong**: Cortical surface-area estimates vary by measurement method (MRI-based vs. classical dissection) across the literature, roughly 1,300-2,500 cm² depending on source — a stricter reviewer might want the specific study/method this range is drawn from cited explicitly.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `cerebellum` (chapter 1.12) — Cerebellum

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: precise number, cited date
- **EN**: The cerebellum ("little brain") sits behind the brainstem and, despite being only about 10% of the brain's volume, contains roughly 80% of all its neurons (a widely cited 2009 stereological count put it at about 69 of the brain's 86 billion — several times more than the cerebral cortex holds), packed into its own densely folded cortex. It doesn't initiate movement — the cortex and basal ganglia do that — but it continuously compares the movement that was intended against the movement that's actually happening and fine-tunes it in real time, which is why cerebellar damage doesn't cause paralysis but does cause ataxia: clumsy, poorly coordinated movement and a wide-based, unsteady gait.
- **AZ**: Beyincik ("kiçik beyin") beyin sapının arxasında yerləşir və beynin həcminin yalnız təxminən 10%-ni təşkil etsə də, bütün neyronların təxminən 80%-ni ehtiva edir (geniş istinad edilən 2009-cu il stereoloji sayım beynin 86 milyard neyronundan təxminən 69 milyardının burada olduğunu göstərib — beyin qabığından bir neçə dəfə çox), öz sıx qatlanmış qabığında toplanmışdır. Hərəkəti başlatmır — bunu qabıq və bazal qanqliyalar edir — lakin nəzərdə tutulan hərəkəti faktiki baş verən hərəkətlə daim müqayisə edir və real vaxtda dəqiqləşdirir, buna görə beyincik zədəsi iflic yaratmır, lakin ataksiya yaradır: bacarıqsız, zəif koordinasiya olunmuş hərəkət və geniş əsaslı, qeyri-sabit yeriş.
- **Source used / last checked**: Sourced — same Azevedo et al. 2009 study as neuron-structure (~69 of 86 billion neurons in the cerebellum). This was an explicit correction made earlier in this project, replacing an original "more than half" claim (see BRAIN-BEE-CURRICULUM.md, "Current state").
- **What would make it wrong**: A different stereological methodology producing a different neuron-count ratio; the claim rests on a single (widely cited) study, not a consensus range across multiple studies.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `psychiatric-disorders` (chapter 13) — Psychiatric disorders

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: drug/clinical claim, hedged/contested-science language
- **EN**: Psychiatric disorders are diagnosed by symptom patterns rather than a definitive biomarker test, but neuroscience has identified consistent biological correlates. Major depressive disorder is associated with altered activity in the prefrontal cortex and limbic structures and with monoamine neurotransmitter systems — the basis for SSRI medications, though the simple "chemical imbalance" framing is now considered an oversimplification. Schizophrenia involves altered dopamine signaling alongside structural differences including modestly enlarged ventricles and reduced gray matter volume.
- **AZ**: Psixiatrik pozğunluqlar dəqiq biomarker testi ilə deyil, simptom nümunələri ilə diaqnoz qoyulur, lakin neyroelm ardıcıl bioloji korrelyasiyalar müəyyən edib. Böyük depressiv pozğunluq prefrontal qabıq və limbik strukturlarda dəyişmiş fəaliyyət və monoamin neyrotransmitter sistemləri ilə əlaqələndirilir — SSRİ dərmanlarının əsası, baxmayaraq ki, sadə "kimyəvi disbalans" çərçivəsi indi həddindən artıq sadələşdirmə hesab olunur. Şizofreniya dəyişmiş dofamin siqnalını, həmçinin mülayim şəkildə böyümüş mədəciklər və azalmış boz maddə həcmini əhatə edən struktur fərqlərini əhatə edir.
- **Source used / last checked**: Not previously sourced to a specific citation — reflects mainstream contemporary psychiatric-neuroscience framing ("chemical imbalance is an oversimplification" is now the standard view; the schizophrenia dopamine/ventricle/gray-matter findings are broadly replicated group-level results).
- **What would make it wrong**: "Modestly enlarged ventricles and reduced gray matter volume" describes a group-level statistical finding, not an individual diagnostic marker. As worded it doesn't claim otherwise, but a reviewer should confirm it doesn't read as implying a single brain scan can diagnose schizophrenia.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `potential-therapies` (chapter 15) — Potential Therapies

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: drug/clinical claim, hedged/contested-science language
- **EN**: Deep brain stimulation (DBS) — implanting electrodes that deliver continuous electrical stimulation to a specific target, most established for advanced Parkinson's disease — can dramatically reduce tremor and rigidity by disrupting the abnormal, overly synchronized neural activity these circuits produce in disease, and is now explored for conditions including severe depression. Gene therapy aims to correct or compensate for a disease-causing mutation directly, and has reached approved clinical use for a small number of rare inherited neurological conditions, though delivering treatment safely to the nervous system remains a major hurdle.
- **AZ**: Dərin beyin stimulyasiyası (DBS) — müəyyən bir hədəfə davamlı elektrik stimulyasiyası verən elektrodların implantasiyası, ən çox inkişaf etmiş Parkinson xəstəliyində qurulmuşdur — bu dövrələrin xəstəlikdə yaratdığı anormal, həddindən artıq sinxronlaşmış sinir fəaliyyətini pozaraq tremoru və sərtliyi əhəmiyyətli dərəcədə azalda bilər və indi ağır depressiya daxil olmaqla digər vəziyyətlər üçün araşdırılır. Gen terapiyası xəstəliyə səbəb olan mutasiyanı birbaşa düzəltmək və ya kompensasiya etməyi hədəfləyir və kiçik sayda nadir irsi nevroloji vəziyyət üçün təsdiqlənmiş klinik istifadəyə çatıb, baxmayaraq ki, müalicəni təhlükəsiz şəkildə sinir sisteminə çatdırmaq əsas maneə olaraq qalır.
- **Source used / last checked**: Not previously sourced to a specific citation for this summary paragraph — DBS-for-Parkinson's and gene-therapy-for-rare-disease are both well-established and were broadly accurate as of when written.
- **What would make it wrong**: This is a fast-moving field — new DBS indications and new gene-therapy approvals happen most years, so "a small number of rare inherited neurological conditions" and "now explored for severe depression" could both go stale without becoming exactly false. A currency check (Part 3), not a fact check.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### `neuroethics` (chapter 16) — Neuroethics

- **File**: `brain-bee-lessons-data.js`
- **Why flagged**: hedged/contested-science language
- **EN**: Neuroethics examines the ethical questions raised by neuroscience research and its applications. Neuroimaging raises questions of cognitive liberty and privacy: as brain-reading technology improves, who should access information about a person's thoughts or mental states, including contested uses like fMRI-based lie detection, which is not currently reliable as courtroom evidence but is nonetheless marketed commercially. Cognitive enhancement in healthy people raises fairness questions alongside safety and consent questions, especially for children.
- **AZ**: Neyroetika neyroelm tədqiqatının və onun tətbiqlərinin qaldırdığı etik sualları araşdırır. Neyrogörüntüləmə koqnitiv azadlıq və məxfilik sualları qaldırır: beyin oxuma texnologiyası təkmilləşdikcə, kimin bir insanın düşüncələri və ya zehni vəziyyətləri haqqında məlumata çatması lazımdır, buraya fMRT əsaslı yalan aşkarlama kimi mübahisəli istifadələr də daxildir, bu hazırda məhkəmə sübutu kimi etibarlı deyil, lakin buna baxmayaraq kommersiya olaraq satılır. Sağlam insanlarda koqnitiv gücləndirmə bərabərlik sualları, xüsusən uşaqlarda təhlükəsizlik və razılıq sualları qaldırır.
- **Source used / last checked**: Partially sourced — the fMRI-lie-detection admissibility claim is grounded in the same United States v. Semrau (2012) case cited explicitly in the gap-question bank (neuroethics-fmri-lie-detection, below); this lesson paragraph doesn't cite the case itself.
- **What would make it wrong**: If a U.S. court has since admitted fMRI lie-detection evidence (would contradict "not currently reliable as courtroom evidence"), or the legal landscape has shifted since the Semrau precedent — exactly the kind of claim Part 3's fresh search pass should re-check.
- **Possible AZ mistranslation**: —
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

### QUESTION FLAGS (46 of 402 questions)

#### Module: `addiction` (3 flagged)

**`addiction-opioid-mechanism`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Opioids increase dopamine activity in the mesolimbic pathway primarily by:
- **EN why**: Opioids act on mu-opioid receptors, which in the VTA inhibit local GABAergic interneurons that normally restrain dopamine neuron firing — removing that restraint ("disinhibition") indirectly increases dopamine release, a different mechanism from cocaine's direct transporter blockade.
- **AZ stem**: Opioidlər mezolimbik yolda dofamin fəaliyyətini əsasən necə artırır?
- **AZ why**: Opioidlər, VTA-da normalda dofamin neyronlarının atəşini məhdudlaşdıran yerli QAYT-ergik interneyronları inhibə edən mu-opioid reseptorlarına təsir edir — bu məhdudiyyətin aradan qaldırılması ("disinhibisiya") dolayı yolla dofamin buraxılışını artırır, bu kokainin birbaşa daşıyıcı blokadasından fərqli mexanizmdir.
- **Source used / last checked**: Not previously sourced — standard addiction neuroscience (mu-opioid-receptor disinhibition in the VTA is well-established, textbook content).
- **What would make it wrong**: Not applicable — well-established mechanism, correctly distinguished from cocaine's direct transporter mechanism.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`addiction-cocaine-amphetamine`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Cocaine and amphetamine both increase synaptic dopamine, but through different mechanisms: cocaine primarily blocks dopamine reuptake, while amphetamine additionally:
- **EN why**: Cocaine blocks the dopamine transporter (DAT), preventing reuptake and leaving more dopamine in the synapse. Amphetamine does that too, but also reverses the transporter's normal direction, actively pumping additional dopamine out of the neuron into the synapse — a stronger, dual mechanism.
- **AZ stem**: Kokain və amfetamin hər ikisi sinaptik dofamini artırır, lakin fərqli mexanizmlər vasitəsilə: kokain əsasən dofamin geri alınmasını bloklayır, amfetamin isə əlavə olaraq nə edir?
- **AZ why**: Kokain dofamin daşıyıcısını (DAT) bloklayır, geri alınmanın qarşısını alır və sinapsda daha çox dofamin qalmasına səbəb olur. Amfetamin də bunu edir, lakin əlavə olaraq daşıyıcının normal istiqamətini tərsinə çevirir, neyrondan sinapsa əlavə dofamini aktiv şəkildə vurur — daha güclü, ikili mexanizm.
- **Source used / last checked**: Not previously sourced — standard, well-established pharmacology (cocaine as DAT blocker, amphetamine as blocker-plus-reverser).
- **What would make it wrong**: Not applicable — a standard, well-supported mechanistic distinction.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`addiction-nicotine-mechanism`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Nicotine increases mesolimbic dopamine activity by acting directly on:
- **EN why**: Nicotine acts directly on nicotinic acetylcholine receptors located on VTA dopamine neurons (and nearby interneurons), directly exciting the dopamine pathway — a distinct mechanism from the transporter-blocking action of cocaine or amphetamine.
- **AZ stem**: Nikotin mezolimbik dofamin fəaliyyətini birbaşa nəyə təsir edərək artırır?
- **AZ why**: Nikotin, VTA dofamin neyronlarında (və yaxınlıqdakı interneyronlarda) yerləşən nikotinik asetilxolin reseptorlarına birbaşa təsir edərək dofamin yolunu birbaşa həyəcanlandırır — kokain və ya amfetaminin daşıyıcı-bloklama fəaliyyətindən fərqli bir mexanizm.
- **Source used / last checked**: Not previously sourced — standard, well-established pharmacology.
- **What would make it wrong**: Not applicable — well-established mechanism.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `aging` (3 flagged)

**`aging-neurogenesis-debate`** — gap-bank, hedged/contested-science language, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Adult human hippocampal neurogenesis — the idea that new neurons continue to be born in the hippocampus throughout adult life — is:
- **EN why**: Eriksson et al. (1998) provided influential early evidence for adult human hippocampal neurogenesis. But the question remains genuinely contested: Sorrells et al. (2018) reported that neurogenesis drops to undetectable levels in adults, while other groups (e.g., Boldrini et al. 2018, Moreno-Jiménez et al. 2019) report continued evidence for it using different methods — a real, active scientific debate rather than settled consensus.
- **AZ stem**: Yetkin insan hippokamp neyrogenezi — yeni neyronların yetkin həyat boyu hippokampda doğulmaqda davam etməsi fikri — nədir?
- **AZ why**: Eriksson və həmkarları (1998) yetkin insan hippokamp neyrogenezi üçün təsirli erkən sübut təqdim etdi. Lakin bu sual həqiqətən mübahisəlidir: Sorrells və həmkarları (2018) yetkinlərdə neyrogenezin aşkarlanmayan səviyyəyə düşdüyünü bildirdi, digər qruplar isə (məsələn, Boldrini və həmkarları 2018, Moreno-Himenes və həmkarları 2019) fərqli üsullardan istifadə edərək onun davam etdiyinə dair sübutlar bildirir — bu, həll edilmiş konsensusdan çox, real, aktiv elmi mübahisədir.
- **Source used / last checked**: Sourced — this exact claim was independently verified against a 2026 paper during this project and left as-is because it already matched current consensus (see BRAIN-BEE-CURRICULUM.md, "Current state"). The specific citations named in the item (Eriksson 1998, Sorrells et al. 2018, Boldrini et al. 2018, Moreno-Jiménez et al. 2019) were not individually re-checked against their primary papers, though the overall "genuinely contested" framing was confirmed current as of that check.
- **What would make it wrong**: This is a fast-moving, genuinely unsettled research area — if a more recent, larger, or more methodologically decisive study has shifted the balance of evidence since the 2026 check, the framing here could go stale faster than most other items in this file.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`aging-fluid-crystallized`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: The distinction between "fluid intelligence" (novel reasoning, processing speed) and "crystallized intelligence" (accumulated knowledge, vocabulary) is most closely associated with psychologist:
- **EN why**: Raymond Cattell (later elaborated by John Horn) proposed the fluid/crystallized intelligence distinction. In normal aging, fluid intelligence typically declines while crystallized intelligence tends to remain stable or even improve — matching the lesson's point that processing speed slows while crystallized knowledge holds steady.
- **AZ stem**: "Maye zəka" (yeni fikirləşmə, emal sürəti) ilə "kristallaşmış zəka" (toplanmış bilik, lüğət) arasındakı fərq ən çox hansı psixoloqla əlaqələndirilir?
- **AZ why**: Reymond Kattell (sonradan Con Horn tərəfindən daha da inkişaf etdirilmiş) maye/kristallaşmış zəka fərqini irəli sürdü. Normal qocalmada maye zəka adətən azalır, kristallaşmış zəka isə sabit qalır və ya hətta yaxşılaşır — bu, dərsin emal sürətinin yavaşladığı, kristallaşmış biliyin isə sabit qaldığı fikri ilə uyğundur.
- **Source used / last checked**: Not previously sourced to a specific citation — Cattell (and Horn's later elaboration) is the standard, uncontested attribution for the fluid/crystallized intelligence distinction; flagged here likely from incidental hedge-pattern matching rather than genuine scientific controversy.
- **What would make it wrong**: Not applicable as contested science — the only realistic risk is attribution precision (Cattell originated it, Horn elaborated it; the item correctly credits both).
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`aging-eriksson-method`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Eriksson and colleagues' influential 1998 study of adult human hippocampal neurogenesis used which labeling method to identify newly born cells?
- **EN why**: Eriksson et al. (1998, Nature Medicine) examined postmortem brain tissue from cancer patients who had received BrdU — a marker that labels dividing cells — during their cancer treatment, finding BrdU-labeled (newly born) cells in the adult hippocampus.
- **AZ stem**: Eriksson və həmkarlarının yetkin insan hippokamp neyrogenezi üzərində 1998-ci ildə apardığı təsirli tədqiqat, yeni doğulan hüceyrələri müəyyən etmək üçün hansı işarələmə üsulundan istifadə edib?
- **AZ why**: Eriksson və həmkarları (1998, Nature Medicine) xərçəng müalicəsi zamanı bölünən hüceyrələri işarələyən BrdU almış xərçəng pasiyentlərinin ölümdən sonrakı beyin toxumasını araşdıraraq, yetkin hippokampda BrdU ilə işarələnmiş (yeni doğulan) hüceyrələr tapdı.
- **Source used / last checked**: Sourced by specific citation within the item itself — Eriksson et al., Nature Medicine, 1998, BrdU labeling method. Related to the neurogenesis-debate item above; the 2026 verification check covered the broader debate, but I can't confirm from the documented record whether this specific methodological detail (BrdU, journal name) was itself independently checked.
- **What would make it wrong**: If the journal or labeling method were misremembered — a specific, checkable methodological detail worth confirming against the primary paper.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `basal-ganglia` (1 flagged)

**`bg-output-nuclei`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: Which structures form the main basal ganglia output to the thalamus?
- **EN why**: The internal pallidal segment and the reticulata of the substantia nigra hold the thalamus under steady inhibition, which is exactly why they are the targets of pallidal deep brain stimulation. Caudate and putamen are tempting as the best-known basal ganglia, but they are the input side, receiving from the whole cortex.
- **AZ stem**: Bazal qanqliyaların talamusa əsas çıxışını hansı strukturlar təşkil edir?
- **AZ why**: Solğun cismin daxili seqmenti və qara substansiyanın retikulyar hissəsi talamusu davamlı tormozlanma altında saxlayır — məhz buna görə pallidal dərin beyin stimulyasiyasının hədəfi olurlar. Quyruqlu nüvə və putamen ən tanınmış bazal qanqliyalar kimi cəlbedicidir, lakin onlar bütün qabıqdan siqnal alan giriş tərəfidir.
- **Source used / last checked**: Not previously sourced — standard basal ganglia circuitry (GPi/SNr as the inhibitory output to thalamus, a real DBS target).
- **What would make it wrong**: If the direct/indirect pathway framing were reversed, or caudate/putamen incorrectly described as an output rather than input structure — not the case here.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `brainstem` (1 flagged)

**`bs-periaqueductal-grey`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: Which midbrain region produces powerful analgesia when stimulated and mediates much of the effect of opioids?
- **EN why**: The periaqueductal grey surrounds the cerebral aqueduct and drives a descending pathway through the raphe nuclei that damps pain transmission in the dorsal horn, which is where opioid analgesia largely begins. The substantia nigra is tempting as the famous midbrain nucleus, but it belongs to the movement circuit and has no role in pain modulation.
- **AZ stem**: Stimullaşdırıldıqda güclü ağrıkəsici təsir verən və opioidlərin təsirinin böyük hissəsini həyata keçirən orta beyin nahiyəsi hansıdır?
- **AZ why**: Su kəməri ətrafı boz maddə beyin su kəmərini əhatə edir və raphe nüvələri vasitəsilə enən yolu işə salır; bu yol arxa buynuzda ağrı ötürülməsini boğur, opioid analgeziyası da əsasən oradan başlayır. Qara substansiya məşhur orta beyin nüvəsi kimi cəlbedicidir, lakin o hərəkət dövrəsinə aiddir və ağrının modulyasiyasında rolu yoxdur.
- **Source used / last checked**: Not previously sourced — standard, well-established pain-pathway physiology (PAG-raphe descending pathway, opioid site of action).
- **What would make it wrong**: Not applicable — settled physiology; the only realistic error would be misattributing the descending pain-control pathway to a different midbrain structure, which isn't the case here.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `cortex` (2 flagged)

**`ctx-gyri-surface`** — main-bank, precise number

- **File**: `brain-bee-questions.js`
- **EN stem**: What does folding the cortex into gyri and sulci mainly achieve?
- **EN why**: The cortical sheet is much wider than the inside of the skull, so it only fits by crumpling, and roughly two-thirds of it ends up hidden in the walls and floors of sulci — which is why surface inspection alone misses most of the cortex. Separating grey from white matter is not the reason: smooth-brained animals manage that arrangement without any folds.
- **AZ stem**: Qabığın qırış və şırımlara qatlanması əsasən nəyə xidmət edir?
- **AZ why**: Qabıq təbəqəsi kəllənin daxili səthindən qat-qat genişdir, ona görə yalnız qırışaraq yerləşir və təxminən üçdə ikisi şırımların divar və dibində gizlənir — məhz buna görə yalnız səthə baxmaqla qabığın böyük hissəsi gözdən qaçır. Boz maddəni ağ maddədən ayırmaq səbəb deyil: hamar beyinli heyvanlar bunu heç bir qırış olmadan bacarır.
- **Source used / last checked**: Not previously sourced independently — same "roughly two-thirds hidden in folds" figure as the cortex-lobes lesson paragraph above; not independently verified against a primary source.
- **What would make it wrong**: Same caveat as cortex-lobes above: this two-thirds figure is commonly repeated but the precise fraction depends on the same measurement-method variation.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`ctx-fusiform-faces`** — main-bank, hedged/contested-science language

- **File**: `brain-bee-questions.js`
- **EN stem**: A man recognises a cat, a car and a spoon at a glance but cannot pick his daughter’s face out from a stranger’s, though her voice identifies her at once. Which region is damaged?
- **EN why**: Face recognition depends on a patch of ventral temporal cortex on the fusiform gyrus, and losing it gives prosopagnosia while recognition of other objects carries on normally. Primary visual cortex is tempting because the complaint is visual, but a lesion there blanks part of the field rather than leaving sharp vision with a single category missing.
- **AZ stem**: Kişi pişiyi, avtomobili və qaşığı bir baxışda tanıyır, lakin qızının üzünü yad adamın üzündən ayıra bilmir; səsi isə onu dərhal tanıdır. Hansı sahə zədələnib?
- **AZ why**: Üz tanıma iyəbənzər qırışdaki ventral temporal qabıq sahəsindən asılıdır və onun itkisi prozopaqnoziya verir, digər obyektlərin tanınması isə normal davam edir. İlkin görmə qabığı cəlbedicidir, çünki şikayət görmə ilə bağlıdır, lakin oradaki zədə sahənin bir hissəsini söndürür, itigörməni saxlayıb yalnız bir kateqoriyanı aradan qaldırmır.
- **Source used / last checked**: Not previously sourced — the fusiform face area / prosopagnosia link is well-established, though whether face processing is a dedicated "module" or part of a more distributed system is a genuine, longstanding debate in cognitive neuroscience that this item doesn't get into.
- **What would make it wrong**: If a lesion elsewhere (e.g. occipital face area, or a more distributed network) were claimed to fully explain isolated prosopagnosia with intact general object recognition — the classic fusiform account is well-supported but not the complete modern picture.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `critical-periods` (1 flagged)

**`critical-periods-nobel`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: David Hubel and Torsten Wiesel's monocular deprivation studies in kittens, which demonstrated critical-period plasticity in the visual cortex, contributed to a Nobel Prize in Physiology or Medicine they shared with:
- **EN why**: Hubel and Wiesel shared the 1981 Nobel Prize in Physiology or Medicine — one quarter each — for their work on visual system information processing, with the other half going to Roger Sperry for his split-brain research on hemispheric specialization.
- **AZ stem**: Devid Hubel və Torsten Vizelin pişik balaları üzərində apardığı, görmə qabığında kritik dövr plastikliyini nümayiş etdirən monokulyar məhrumiyyət tədqiqatları, onların kiminlə bölüşdüyü Nobel mükafatına töhfə verdi?
- **AZ why**: Hubel və Vizel 1981-ci il Fiziologiya və ya Tibb üzrə Nobel mükafatını — hər biri dörddə bir — görmə sistemi məlumat emalı üzrə işlərinə görə bölüşdülər, mükafatın digər yarısı isə yarımkürələrin funksional ixtisaslaşması üzrə split-beyin tədqiqatına görə Rocer Speriyə verildi.
- **Source used / last checked**: Sourced by specific citation within the item itself — 1981 Nobel Prize in Physiology or Medicine (Hubel & Wiesel sharing half, Sperry the other half). Not independently re-verified against the official Nobel record in this project, though well-known and frequently cited.
- **What would make it wrong**: If the year or prize split were misremembered — a specific, checkable historical fact, exactly the kind Part 3 should verify against the Nobel Prize's own record rather than memory.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `kinds-of-research` (2 flagged)

**`research-patch-clamp`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: The patch-clamp technique, which allows researchers to record the tiny electrical currents flowing through individual ion channels, was developed by Erwin Neher and Bert Sakmann, who won a Nobel Prize for it in:
- **EN why**: Neher and Sakmann won the 1991 Nobel Prize in Physiology or Medicine for developing the patch-clamp technique, which made it possible to record the function of single ion channels — a foundational tool for cellular electrophysiology.
- **AZ stem**: Fərdi ion kanalları vasitəsilə axan kiçik elektrik cərəyanlarını qeyd etməyə imkan verən patç-klamp texnikası Ervin Neher və Bert Zakman tərəfindən hazırlanıb, onlar bunun üçün hansı ildə Nobel mükafatı alıblar?
- **AZ why**: Neher və Zakman, tək ion kanallarının funksiyasını qeyd etməyi mümkün edən patç-klamp texnikasını hazırladıqları üçün 1991-ci il Fiziologiya və ya Tibb üzrə Nobel mükafatını aldılar — hüceyrə elektrofiziologiyası üçün əsas vasitə.
- **Source used / last checked**: Sourced by specific citation within the item itself — 1991 Nobel Prize in Physiology or Medicine, Neher & Sakmann. Not independently re-verified against the official Nobel record in this project, though well-known and frequently cited.
- **What would make it wrong**: If the year were misremembered — specific, checkable historical fact.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`research-eeg-timing`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: A researcher needs to know exactly when — down to the millisecond — a brain response occurs after a stimulus, but doesn't need to pinpoint precisely where. The best-suited tool from this chapter is:
- **EN why**: EEG's core strength is millisecond-scale temporal resolution, making it well-suited to questions about precise timing, even though its spatial resolution — pinpointing exactly where in the brain a signal originates — is comparatively poor.
- **AZ stem**: Tədqiqatçı stimuldan sonra beyin cavabının dəqiq nə vaxt — millisaniyəyə qədər — baş verdiyini bilməlidir, lakin dəqiq harada olduğunu müəyyən etməyə ehtiyacı yoxdur. Bu fəsildən ən uyğun alət hansıdır?
- **AZ why**: EEG-nin əsas gücü millisaniyə miqyaslı zaman ayırdetməsidir, bu onu dəqiq vaxtlama sualları üçün uyğun edir, baxmayaraq ki, onun məkan ayırdetməsi — siqnalın beyində dəqiq haradan qaynaqlandığını müəyyən etmək — nisbətən zəifdir.
- **Source used / last checked**: Not previously sourced to a specific citation — EEG's millisecond-scale temporal resolution vs. poor spatial resolution is standard, uncontested methods-teaching content.
- **What would make it wrong**: Not applicable as contested science — the temporal/spatial resolution tradeoff described is accurate and standard.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `language-brain` (3 flagged)

**`language-lateralization-pct`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: In roughly what proportion of right-handed people is language processing concentrated in the left hemisphere?
- **EN why**: Language is lateralized to the left hemisphere in roughly 95% of right-handed people — a strong but not absolute pattern; left-handed and ambidextrous people show somewhat more variable, though still often left-dominant, lateralization.
- **AZ stem**: Sağ əlli insanların təxminən hansı hissəsində dil emalı sol yarımkürədə cəmləşib?
- **AZ why**: Dil sağ əlli insanların təxminən 95%-də sol yarımkürədə lateralizasiya olunub — güclü, lakin mütləq olmayan bir nümunə; solaxay və hər iki əldən istifadə edən insanlarda lateralizasiya bir qədər daha dəyişkəndir, baxmayaraq ki, çox vaxt yenə sol üstünlüklüdür.
- **Source used / last checked**: Not previously sourced to a specific citation — the ~95%/right-handed figure is a commonly cited approximation in the lateralization literature, not independently verified against a primary source in this project.
- **What would make it wrong**: Commonly cited figures for right-handed left-hemisphere dominance range roughly 90-96% depending on the study and how dominance is measured (Wada test vs. fMRI); "95%" is within that range but not a single universally agreed number.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`language-split-brain`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Roger Sperry's split-brain research — studying patients whose corpus callosum had been surgically severed — provided key evidence for:
- **EN why**: In split-brain patients, information presented to only one hemisphere (via one visual field) could no longer be shared with the other, revealing that the two hemispheres are functionally specialized — including for language, largely a left-hemisphere function — work for which Sperry shared the 1981 Nobel Prize.
- **AZ stem**: Rocer Sperinin split-beyin tədqiqatı — corpus callosumu cərrahi yolla kəsilmiş pasiyentlər üzərində aparılan tədqiqat — nə üçün əsas sübut təqdim etdi?
- **AZ why**: Split-beyin pasiyentlərində, yalnız bir yarımkürəyə (bir görmə sahəsi vasitəsilə) təqdim edilən məlumat artıq digəri ilə paylaşıla bilmirdi, bu da iki yarımkürənin funksional cəhətdən ixtisaslaşdığını — o cümlədən, əsasən sol yarımkürə funksiyası olan dil üçün — üzə çıxardı, bu iş üçün Speri 1981-ci il Nobel mükafatını bölüşdü.
- **Source used / last checked**: Sourced by specific citation within the item itself — same 1981 Nobel Prize as critical-periods-nobel above. Not independently re-verified in this project.
- **What would make it wrong**: Same as critical-periods-nobel — a specific, checkable historical fact worth a Part 3 re-check rather than trusting memory.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`language-foxp2`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Mutations in the FOXP2 gene, studied extensively in a multi-generational family known as the "KE family," are linked to:
- **EN why**: FOXP2 mutations in the KE family are linked to a severe speech and language disorder involving both grammatical difficulties and impaired orofacial motor coordination needed for articulate speech. FOXP2 is sometimes popularly called "the language gene," though that's a simplification — it's a transcription factor with broader developmental roles beyond language alone.
- **AZ stem**: "KE ailəsi" adlanan çoxnəsilli ailədə geniş öyrənilən FOXP2 genindəki mutasiyalar nə ilə əlaqələndirilir?
- **AZ why**: KE ailəsindəki FOXP2 mutasiyaları həm qrammatik çətinliklər, həm də aydın nitq üçün lazım olan üz-ağız motor koordinasiyasının pozulmasını əhatə edən ağır nitq və dil pozğunluğu ilə əlaqələndirilir. FOXP2 bəzən populyar şəkildə "dil geni" adlandırılır, baxmayaraq ki, bu sadələşdirmədir — o, təkcə dildən kənar daha geniş inkişaf rollarına malik transkripsiya faktorudur.
- **Source used / last checked**: Not previously sourced to a specific citation — KE family FOXP2 research is well-established (Lai et al. and others); the item's own hedge about the "language gene" label being a simplification is accurate and appropriately cautious.
- **What would make it wrong**: Not applicable as a factual error — appropriately hedged as-is.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `motor` (2 flagged)

**`mo-mirror-neurons`** — main-bank, hedged/contested-science language

- **File**: `brain-bee-questions.js`
- **EN stem**: Recordings in monkey premotor cortex found neurons that fire both when the animal grasps a peanut and when it watches someone else grasp one. What is notable about this?
- **EN why**: The finding matters because it shows motor representations being engaged by perception, which has driven a great deal of work on imitation and action understanding — though claims about empathy and language go far beyond what the recordings themselves establish. Mind reading is tempting as a headline, but the cells respond to observed movement, not to intentions in the abstract.
- **AZ stem**: Meymunun premotor qabığından qeydlər göstərdi ki, bəzi neyronlar həm heyvan fıstıq götürəndə, həm də başqasının götürməsini seyr edəndə işə düşür. Bunun əhəmiyyəti nədir?
- **AZ why**: Tapıntının əhəmiyyəti motor təmsillərin qavrayışla işə düşməsini göstərməsidir; bu, təqlid və hərəkətin anlaşılması üzrə çoxlu tədqiqata təkan verib — empatiya və dillə bağlı iddialar isə qeydlərin özünün təsdiqlədiyindən xeyli irəli gedir. Fikir oxuma başlıq kimi cəlbedicidir, lakin hüceyrələr mücərrəd niyyətlərə deyil, müşahidə olunan hərəkətə cavab verir.
- **Source used / last checked**: Not previously sourced — the underlying primate premotor recordings (Rizzolatti and colleagues) are well-established; the item's own hedge ("claims about empathy and language go far beyond what the recordings themselves establish") already reflects a real, ongoing debate about mirror-neuron overreach in the literature — accurately framed as contested rather than settled.
- **What would make it wrong**: Not applicable as a factual error — if anything this item already models appropriately skeptical framing; the risk would be if it were read as endorsing stronger claims than it states.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`mo-levodopa`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: Parkinson’s disease is treated with L-DOPA rather than with dopamine itself. Why?
- **EN why**: Dopamine itself is excluded by the barrier, but L-DOPA is an amino acid that a transporter carries into the brain, where the remaining nigrostriatal neurons decarboxylate it into working transmitter. Calling L-DOPA a stronger agonist is tempting, but it does not bind dopamine receptors at all — it is inert until converted.
- **AZ stem**: Parkinson xəstəliyi dopaminin özü ilə deyil, L-DOPA ilə müalicə olunur. Niyə?
- **AZ why**: Dopaminin özünü maneə buraxmır, L-DOPA isə daşıyıcının beyinə keçirdiyi amin turşusudur; orada qalan niqrostriatal neyronlar onu dekarboksilləşdirib işlək transmitterə çevirir. L-DOPA-nı daha güclü aqonist adlandırmaq cəlbedicidir, lakin o dopamin reseptorlarına ümumiyyətlə bağlanmır — çevrilməyənə qədər təsirsizdir.
- **Source used / last checked**: Not previously sourced — standard, well-established pharmacology (L-DOPA crosses the blood-brain barrier via an amino acid transporter; dopamine itself does not).
- **What would make it wrong**: Not applicable — settled and commonly taught; correctly describes L-DOPA as inert until decarboxylated rather than as a direct dopamine agonist.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `neural-development` (1 flagged)

**`neural-dev-apoptosis`** — gap-bank, precise number

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: During normal brain development, roughly what proportion of the neurons initially produced ultimately die through programmed cell death (apoptosis) before adulthood?
- **EN why**: Neural development massively overproduces neurons, and roughly half of them are eliminated through programmed cell death — a normal process thought to fine-tune circuits by pruning neurons that failed to make appropriate, functional connections.
- **AZ stem**: Normal beyin inkişafı zamanı ilkin istehsal olunan neyronların təxminən hansı hissəsi yetkinliyə çatana qədər proqramlaşdırılmış hüceyrə ölümü (apoptoz) yolu ilə məhv olur?
- **AZ why**: Sinir inkişafı neyronları həddindən artıq istehsal edir və onların təxminən yarısı proqramlaşdırılmış hüceyrə ölümü ilə aradan qaldırılır — bu, uyğun, funksional əlaqələr qura bilməyən neyronları kəsərək dövrələri incə tənzimləyən normal bir proses hesab olunur.
- **Source used / last checked**: Not previously sourced to a specific citation — "roughly half" is a commonly cited approximation in developmental neuroscience for programmed neuronal death, not independently verified against a primary source in this project.
- **What would make it wrong**: The actual fraction varies substantially by species and brain region studied; "roughly half" is a reasonable ballpark but is often cited for specific neuron populations, not uniformly across the whole developing nervous system.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `neuroethics` (6 flagged)

**`neuroethics-3rs-origin`** — gap-bank, hedged/contested-science language, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: The "3Rs" principle in animal research ethics (Replacement, Reduction, Refinement) was first proposed by:
- **EN why**: Zoologist William Russell and microbiologist Rex Burch introduced Replacement, Reduction, and Refinement in their 1959 book The Principles of Humane Experimental Technique. The framework remains the standard reference point for animal research ethics and oversight today.
- **AZ stem**: Heyvanlar üzərində aparılan tədqiqatların etikasında "3R" prinsipini (Əvəzetmə, Azaltma, Təkmilləşdirmə) ilk dəfə kim təklif edib?
- **AZ why**: Zoolog Uilyam Rassel və mikrobioloq Reks Börç, 1959-cu ildə nəşr olunan "The Principles of Humane Experimental Technique" kitabında Əvəzetmə, Azaltma və Təkmilləşdirmə prinsiplərini təqdim etdilər. Bu çərçivə bu gün də heyvan tədqiqatlarının etikası və nəzarəti üçün əsas istinad nöqtəsi olaraq qalır.
- **Source used / last checked**: Sourced by specific citation within the item itself — Russell & Burch, The Principles of Humane Experimental Technique, 1959. Not independently re-verified against a primary source in this project; a well-known citation in research-ethics literature.
- **What would make it wrong**: If the publication year or authorship were misattributed — not apparent here, this is a widely and consistently cited origin point for the 3Rs framework.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroethics-fmri-lie-detection`** — gap-bank, cited date, legal citation

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: As of the early 2020s, how have U.S. federal courts generally treated fMRI-based lie detection evidence?
- **EN why**: In United States v. Semrau (6th Cir. 2012), the court excluded fMRI lie-detection evidence under Federal Rule of Evidence 702, citing the lack of real-world validation and established error rates outside controlled lab studies — it has not been accepted as reliable evidence in any U.S. court.
- **AZ stem**: 2020-ci illərin əvvəlinə olan vəziyyətə görə, ABŞ federal məhkəmələri fMRT əsaslı yalan aşkarlama sübutlarına ümumilikdə necə yanaşıb?
- **AZ why**: United States v. Semrau işində (6-cı Dairə Apellyasiya Məhkəməsi, 2012) məhkəmə fMRT əsaslı yalan aşkarlama sübutunu Federal Sübut Qaydası 702-yə əsasən istisna etdi, çünki bu üsul yalnız nəzarət olunan laboratoriya şəraitində yoxlanılmışdı və real dünya şəraitində müəyyən edilmiş xəta dərəcələri yox idi — heç bir ABŞ məhkəməsində etibarlı sübut kimi qəbul edilməyib.
- **Source used / last checked**: Sourced by specific citation within the item itself — United States v. Semrau, 6th Cir. 2012. Not independently re-verified against the case text or current case law in this project — exactly the kind of item Part 3's fresh search pass should re-check, since courtroom-admissibility law can change.
- **What would make it wrong**: If a different or more recent case has since addressed fMRI lie-detection admissibility, or the circuit/year/rule number is misremembered — legal citations are high-precision claims where a small error (wrong circuit, wrong FRE number) reads as more authoritative than it should if wrong.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroethics-cognitive-enhancers`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Which two prescription drugs are most frequently discussed in the neuroethics literature as "cognitive enhancers" used off-label by healthy people?
- **EN why**: Modafinil (a wakefulness-promoting agent) and methylphenidate (a stimulant normally prescribed for ADHD) are the two drugs most consistently studied and debated as off-label cognitive enhancers in healthy adults, raising questions about fairness, coercion, and long-term safety.
- **AZ stem**: Neyroetika ədəbiyyatında sağlam insanlar tərəfindən "koqnitiv gücləndirici" kimi qeyri-rəsmi istifadə olunan hansı iki resept dərmanı ən çox müzakirə olunur?
- **AZ why**: Modafinil (oyaqlığı artıran vasitə) və metilfenidat (adətən DEHB üçün təyin olunan stimulyator) sağlam yetkinlərdə koqnitiv gücləndirici kimi ən çox öyrənilən və müzakirə olunan iki dərmandır, bu da ədalət, məcburiyyət və uzunmüddətli təhlükəsizliklə bağlı suallar doğurur.
- **Source used / last checked**: Not previously sourced — modafinil and methylphenidate are the two most commonly discussed off-label cognitive enhancers in the neuroethics literature; general knowledge, not tied to one citation.
- **What would make it wrong**: Not applicable — well-established as the two most-discussed examples; a stricter reviewer might want a specific survey/prevalence citation rather than "most frequently discussed."
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroethics-dbs-personality`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Deep brain stimulation of the subthalamic nucleus for Parkinson's disease has been documented, in a subset of patients, to cause:
- **EN why**: A subset of patients receiving subthalamic nucleus DBS for Parkinson's disease experience personality or mood changes — including hypomania, impulsivity, or apathy — well documented in the neuroethics literature, which asks whether such changes threaten a patient's sense of identity or authenticity.
- **AZ stem**: Parkinson xəstəliyi üçün subtalamik nüvənin dərin beyin stimulyasiyası bəzi xəstələrdə sənədləşdirilmiş şəkildə nəyə səbəb olub?
- **AZ why**: Parkinson xəstəliyi üçün subtalamik nüvəyə dərin beyin stimulyasiyası alan bəzi xəstələrdə şəxsiyyət və ya əhval-ruhiyyə dəyişiklikləri — o cümlədən hipomaniya, impulsivlik və ya apatiya — müşahidə olunub, bu neyroetika ədəbiyyatında geniş sənədləşdirilib və xəstənin şəxsiyyət hissinin təhlükə altında olub-olmadığı sualını doğurur.
- **Source used / last checked**: Not previously sourced to one citation — subthalamic DBS personality/mood effects (hypomania, impulsivity, apathy) are well-documented across multiple case series in the neuroethics and movement-disorders literature.
- **What would make it wrong**: Not applicable as a general claim — well-supported; the item already correctly scopes this to "a subset of patients."
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroethics-propranolol-reconsolidation`** — gap-bank, hedged/contested-science language, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Giving propranolol while a patient verbally recalls a traumatic memory has been studied as a way to:
- **EN why**: Reactivating a memory makes it temporarily labile again ("reconsolidation"). Giving the beta-blocker propranolol during this window is proposed to blunt the memory's emotional and physiological intensity — not erase its content — and has shown modest effects in PTSD trials, raising "memory editing" ethics debates about authenticity and identity.
- **AZ stem**: Xəstə travmatik xatirəni şifahi şəkildə xatırlayarkən propranolol verilməsi nəyin üsulu kimi öyrənilib?
- **AZ why**: Xatirənin yenidən aktivləşdirilməsi onu müvəqqəti olaraq yenidən dəyişkən edir ("yenidənkonsolidasiya"). Bu pəncərə zamanı beta-bloker propranolol verilməsi xatirənin emosional və fizioloji intensivliyini azaltmaq üçün təklif olunur — məzmununu silmək üçün deyil — və PTSB sınaqlarında məhdud, lakin real təsir göstərib, bu da "yaddaş redaktəsi" ilə bağlı özünəməxsusluq və şəxsiyyət haqqında etik müzakirələr doğurur.
- **Source used / last checked**: Not previously sourced to a specific trial — "modest effects in PTSD trials" is a fair, appropriately hedged summary of a genuinely mixed clinical-trial literature on propranolol reconsolidation-blockade; not independently re-verified against specific trial results in this project.
- **What would make it wrong**: "Modest effects" could be read as overstating or understating the actual trial literature, which has included both positive and null results — exactly the kind of claim where a fresh look at recent trial data (Part 3) would be worthwhile rather than trusting the original characterization.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroethics-neurorights-chile`** — gap-bank, cited date, legal citation

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: In 2021, which country became the first to constitutionally recognize "neurorights" — legal protections for mental privacy, identity, and free will from neurotechnology?
- **EN why**: Chile's Ley 21.383 (2021) amended Article 19 of its constitution to extend the right to physical and mental integrity to brain activity and the information derived from it, making it the first country to constitutionally enshrine neurorights.
- **AZ stem**: 2021-ci ildə hansı ölkə "neyrohüquqları" — neyrotexnologiyadan zehni məxfiliyi, şəxsiyyəti və iradə azadlığını qoruyan hüquqi müdafiələri — konstitusiyasında ilk dəfə tanıyan ölkə oldu?
- **AZ why**: Çilinin 21.383 saylı Qanunu (2021) ölkənin konstitusiyasının 19-cu maddəsini dəyişdirərək fiziki və zehni bütövlük hüququnu beyin fəaliyyətinə və ondan əldə edilən məlumata da şamil etdi — bu, konstitusiyasında neyrohüquqları təsbit edən ilk ölkə oldu.
- **Source used / last checked**: Sourced by specific citation within the item itself — Chile's Ley 21.383 (2021), amending Article 19. Not independently re-verified against the statute text in this project.
- **What would make it wrong**: If the law number, year, or constitutional article were misremembered, or another country has since passed something similar that would complicate the "first country" claim — legal/legislative citations are exactly where a small transcription error looks most authoritative if wrong.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `neuron-ap` (1 flagged)

**`refractory`** — main-bank, hedged/contested-science language

- **File**: `brain-bee-questions.js`
- **EN stem**: During the absolute refractory period no stimulus, however strong, can fire a second spike. Why?
- **EN why**: An inactivated NaV channel is not merely closed; it is locked shut until the membrane repolarizes. That refractory window is what forces spikes to travel one way down the axon and sets the maximum firing rate.
- **AZ stem**: Mütləq refrakter dövrdə heç bir stimul, nə qədər güclü olsa da, ikinci impulsu yarada bilmir. Niyə?
- **AZ why**: İnaktivləşmiş NaV kanalı sadəcə bağlı deyil — membran repolyarizə olana qədər kilidlidir. Bu refrakter pəncərə impulsları akson boyunca yalnız bir istiqamətdə getməyə məcbur edir və maksimum atış tezliyini müəyyən edir.
- **Source used / last checked**: Not previously sourced — this is settled ion-channel physiology (NaV inactivation), not contested. Flagged here only because the regex matched the phrase "however strong," an idiom ("no matter how strong"), not a hedge about scientific uncertainty — noting the false trigger rather than hiding it.
- **What would make it wrong**: Not applicable as "contested science" — the physiology is standard. The only real precision question: this describes the axonal/somatic action-potential mechanism specifically, not graded potentials elsewhere in the neuron.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `neuroplasticity` (5 flagged)

**`neuroplasticity-ltp-discovery`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Long-term potentiation (LTP) — a lasting strengthening of synaptic transmission after repeated, coordinated activity — was first demonstrated in the rabbit hippocampus by:
- **EN why**: Bliss and Lømo's landmark 1973 papers, recording from the dentate gyrus of the rabbit hippocampus, provided the first clear demonstration of LTP — still the best-studied cellular mechanism believed to underlie learning and memory.
- **AZ stem**: Uzunmüddətli potensiasiya (LTP) — təkrarlanan, koordinasiyalı fəaliyyətdən sonra sinaptik ötürmənin davamlı güclənməsi — ilk dəfə dovşan hippokampında kim tərəfindən nümayiş etdirilib?
- **AZ why**: Blis və Lomonun 1973-cü ilin əlamətdar məqalələri, dovşan hippokampının dentat qirusundan qeydiyyat aparmaqla, LTP-nin ilk aydın nümayişini təqdim etdi — bu, öyrənmə və yaddaşın əsasında dayandığına inanılan ən yaxşı öyrənilmiş hüceyrə mexanizmi olaraq qalır.
- **Source used / last checked**: Sourced by specific citation within the item itself — Bliss & Lømo, 1973. Not independently re-verified against the primary papers in this project, though this is the standard, frequently cited origin point for LTP.
- **What would make it wrong**: If the year or species (rabbit vs. another animal) were misremembered.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroplasticity-hebb`** — gap-bank, hedged/contested-science language, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: The summary "neurons that fire together, wire together" is a popular paraphrase of a 1949 postulate proposed by:
- **EN why**: Donald Hebb's 1949 book The Organization of Behavior proposed that when one neuron repeatedly helps fire another, the connection between them strengthens — the theoretical basis for what's now called Hebbian plasticity, later popularly summarized as "fire together, wire together."
- **AZ stem**: "Birlikdə atəş edən neyronlar birlikdə simlənir" xülasəsi 1949-cu ildə kim tərəfindən təklif olunan postulatın populyar parafrazasıdır?
- **AZ why**: Donald Hebbin 1949-cu ildə nəşr olunan "The Organization of Behavior" kitabı, bir neyron təkrarən digərinin atəşinə kömək etdikdə, aralarındakı əlaqənin güclənəcəyini irəli sürdü — indi Hebb plastikliyi adlanan, sonradan populyar şəkildə "birlikdə atəş edən, birlikdə simlənir" kimi xülasə olunan nəzəri əsas.
- **Source used / last checked**: Sourced by specific citation within the item itself — Donald Hebb, The Organization of Behavior, 1949. Not independently re-verified against the primary text in this project, though a standard, well-known citation.
- **What would make it wrong**: If the publication year were misremembered, or the popular "fire together, wire together" phrase were incorrectly attributed as Hebb's own wording rather than a later paraphrase — the item correctly frames it as a paraphrase, not a direct quote.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroplasticity-maguire`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Eleanor Maguire's study of licensed London taxi drivers, who must memorize the city's complex street layout ("The Knowledge"), found that experienced drivers had measurably:
- **EN why**: Maguire and colleagues (PNAS, 2000) found that licensed London taxi drivers had larger posterior hippocampi than controls, correlating with years of navigation experience — a landmark demonstration of experience-driven structural plasticity in the adult human brain.
- **AZ stem**: Eleanor Maguirein, şəhərin mürəkkəb küçə planını əzbərləməli olan lisenziyalı London taksi sürücüləri ("The Knowledge") üzərində apardığı tədqiqat təcrübəli sürücülərdə ölçülə bilən nəyi aşkar etdi?
- **AZ why**: Maguire və həmkarları (PNAS, 2000) lisenziyalı London taksi sürücülərinin nəzarət qrupuna nisbətən daha böyük arxa hippokamplara malik olduğunu, bunun naviqasiya təcrübəsinin illəri ilə əlaqəli olduğunu aşkar etdi — yetkin insan beynində təcrübə ilə idarə olunan struktur plastikliyinin əlamətdar nümayişi.
- **Source used / last checked**: Sourced by specific citation within the item itself — Maguire et al., PNAS 2000. Not independently re-verified against the primary paper in this project, though a well-known, frequently cited study.
- **What would make it wrong**: If the journal, year, or specific finding (posterior vs. anterior hippocampal volume) were misremembered — the direction of the effect (larger posterior hippocampus, correlated with experience) is the well-known headline result.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroplasticity-phantom-limb`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Cortical remapping after amputation is thought to contribute to phantom limb sensations, in which patients feel sensation in a missing limb — a phenomenon studied extensively, including "mirror box" therapy, by:
- **EN why**: V.S. Ramachandran's mirror box work proposed that visual feedback — a mirror reflection making the intact limb appear to occupy the missing limb's position — could help resolve some phantom limb sensations, including phantom pain, by resolving a mismatch between the brain's remapped body representation and visual input.
- **AZ stem**: Amputasiyadan sonra kortikal yenidən xəritələmənin, pasiyentlərin olmayan ətraqda hiss duyduğu fantom ətraq hisslərinə töhfə verdiyi düşünülür — bu hadisə, o cümlədən "güzgü qutusu" terapiyası, geniş şəkildə kim tərəfindən öyrənilib?
- **AZ why**: V.S. Ramaçandranın güzgü qutusu işi, vizual əks əlaqənin — güzgü əksinin sağlam ətrafı olmayan ətrafın mövqeyində göstərməsi — beynin yenidən xəritələnmiş bədən təmsili ilə vizual giriş arasındakı uyğunsuzluğu həll edərək bəzi fantom ətraq hisslərini, o cümlədən fantom ağrısını, aradan qaldırmağa kömək edə biləcəyini irəli sürdü.
- **Source used / last checked**: Not previously sourced to a specific citation — Ramachandran's mirror-box work is well-known and correctly attributed; the hedge ("could help resolve some phantom limb sensations") is appropriate since mirror therapy's effectiveness varies across patients and studies.
- **What would make it wrong**: Not applicable as a factual error — appropriately hedged as-is.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`neuroplasticity-stroke`** — gap-bank, hedged/contested-science language

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: In stroke recovery, intensive, targeted rehabilitation can lead to partial recovery of a lost function because:
- **EN why**: Plasticity persists into adulthood, and after a stroke, undamaged cortical areas can partially reorganize to take over some functions of the damaged region — the neural basis for why intensive, targeted rehabilitation can produce real, though usually partial, functional recovery.
- **AZ stem**: İnsult bərpasında intensiv, hədəflənmiş reabilitasiya itirilmiş funksiyanın qismən bərpasına səbəb ola bilər, çünki:
- **AZ why**: Plastiklik yetkinliyə qədər davam edir və insultdan sonra zədələnməmiş kortikal sahələr zədələnmiş nahiyənin bəzi funksiyalarını qismən yenidən təşkil edərək öz üzərinə götürə bilir — bu, intensiv, hədəflənmiş reabilitasiyanın niyə real, adətən qismən, funksional bərpa yarada bilməsinin sinir əsasıdır.
- **Source used / last checked**: Not previously sourced to a specific citation — general, well-established stroke-recovery neuroscience.
- **What would make it wrong**: Not applicable — appropriately hedged ("usually partial") and not overstating recovery potential.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `potential-therapies` (8 flagged)

**`therapies-dbs-mechanism`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Deep brain stimulation (DBS) for Parkinson's disease works by:
- **EN why**: DBS delivers continuous electrical stimulation to a specific target, disrupting the abnormal, overly synchronized neural activity these circuits produce in Parkinson's disease — reducing tremor and rigidity without physically removing tissue or replacing lost neurons.
- **AZ stem**: Parkinson xəstəliyi üçün dərin beyin stimulyasiyası (DBS) necə işləyir?
- **AZ why**: DBS müəyyən bir hədəfə davamlı elektrik stimulyasiyası verir, bu dövrələrin Parkinson xəstəliyində yaratdığı anormal, həddindən artıq sinxronlaşmış sinir fəaliyyətini pozur — toxumanı fiziki olaraq çıxarmadan və ya itirilmiş neyronları əvəz etmədən tremoru və sərtliyi azaldır.
- **Source used / last checked**: Not previously sourced — standard, well-established DBS mechanism description; overlaps with the potential-therapies lesson paragraph above.
- **What would make it wrong**: Not applicable — well-established as written.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-dbs-targets`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: The two most common brain targets for deep brain stimulation in Parkinson's disease are the subthalamic nucleus and the:
- **EN why**: The subthalamic nucleus (STN) and the globus pallidus internus (GPi) are the two standard, most common DBS targets for Parkinson's disease, both part of the basal ganglia circuitry involved in movement.
- **AZ stem**: Parkinson xəstəliyində dərin beyin stimulyasiyası üçün ən çox istifadə olunan iki beyin hədəfi subtalamik nüvə və nədir?
- **AZ why**: Subtalamik nüvə (STN) və daxili qlobus pallidus (GPi) Parkinson xəstəliyi üçün iki standart, ən çox istifadə olunan DBS hədəfidir, hər ikisi hərəkətdə iştirak edən bazal qanqliya dövrəsinin bir hissəsidir.
- **Source used / last checked**: Not previously sourced — standard, well-established (STN and GPi are in fact the two most common Parkinson's DBS targets).
- **What would make it wrong**: Not applicable — accurate and standard.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-gene-therapy-zolgensma`** — gap-bank, cited date, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Zolgensma (onasemnogene abeparvovec), an FDA-approved gene therapy for spinal muscular atrophy, delivers a corrective gene using:
- **EN why**: Zolgensma delivers a functional copy of the SMN1 gene using an AAV9 viral vector, approved by the FDA in 2019 for young children with spinal muscular atrophy — one of the small number of approved gene therapies for a rare inherited neurological condition mentioned in this chapter.
- **AZ stem**: Onurğa beyni əzələ atrofiyası üçün FDA tərəfindən təsdiqlənmiş gen terapiyası olan Zolgensma (onasemnogen abeparvovek) düzəldici geni necə çatdırır?
- **AZ why**: Zolgensma, SMN1 geninin funksional nüsxəsini AAV9 viral vektoru istifadə edərək çatdırır, 2019-cu ildə FDA tərəfindən onurğa beyni əzələ atrofiyası olan kiçik uşaqlar üçün təsdiqlənib — bu fəsildə qeyd olunan nadir irsi nevroloji vəziyyət üçün təsdiqlənmiş az sayda gen terapiyasından biri.
- **Source used / last checked**: Sourced by specific citation within the item itself — Zolgensma, FDA approval 2019, AAV9 vector, SMN1 gene. Not independently re-verified against the current FDA record in this project — exactly the kind of item (a specific drug/approval fact) Part 3 should re-check, since approval status and label details can change.
- **What would make it wrong**: If the FDA approval year, viral vector, or target gene were misremembered, or anything about the approval (indication, age range) has changed since 2019 — drug-approval facts are high-precision and worth a direct currency check.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-bci-braingate`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Research demonstrating that a paralyzed patient could control a robotic arm to reach and grasp objects using only an implanted brain-computer interface was published by the BrainGate consortium (Hochberg et al.) in the journal Nature around:
- **EN why**: Hochberg and colleagues' landmark 2012 Nature paper demonstrated that people with tetraplegia could use an implanted intracortical microelectrode array to control a robotic arm for reaching and grasping — a major proof-of-concept for neuroprosthetic brain-computer interfaces.
- **AZ stem**: İflic olmuş pasiyentin yalnız implantasiya olunmuş beyin-kompüter interfeysindən istifadə edərək robot qolu ilə əşyaları tutmaq üçün idarə edə bildiyini göstərən tədqiqat BrainGate konsorsiumu (Hochberg və həmkarları) tərəfindən Nature jurnalında təxminən nə vaxt nəşr olunub?
- **AZ why**: Hochberg və həmkarlarının əlamətdar 2012-ci il Nature məqaləsi, tetraplegiyalı insanların robot qolu tutma və götürmə üçün idarə etmək məqsədilə implantasiya olunmuş kortikal daxili mikroelektrod massivindən istifadə edə bildiyini göstərdi — neyroprotez beyin-kompüter interfeysləri üçün əsas konsepsiya sübutu.
- **Source used / last checked**: Sourced by specific citation within the item itself — Hochberg et al., Nature, 2012, BrainGate consortium. Not independently re-verified against the primary paper in this project, though well-known and frequently cited.
- **What would make it wrong**: If the year or journal were misremembered — specific, checkable citation.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-tms-approval`** — gap-bank, cited date

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Transcranial magnetic stimulation (TMS), a non-invasive therapy using magnetic pulses to stimulate brain activity, received FDA clearance for treatment-resistant depression around:
- **EN why**: The FDA cleared the first TMS device for adults with depression who had not responded to prior antidepressant treatment in 2008 — a non-invasive alternative that doesn't require surgery or the systemic effects of medication.
- **AZ stem**: Beyin fəaliyyətini stimullaşdırmaq üçün maqnit impulslarından istifadə edən invaziv olmayan terapiya olan transkranial maqnit stimulyasiyası (TMS) müalicəyə davamlı depressiya üçün FDA icazəsini təxminən nə vaxt alıb?
- **AZ why**: FDA, 2008-ci ildə əvvəlki antidepressant müalicəsinə cavab verməyən yetkinlərdə depressiya üçün ilk TMS cihazına icazə verdi — cərrahiyyə və ya dərmanın sistemli təsirlərini tələb etməyən invaziv olmayan alternativ.
- **Source used / last checked**: Sourced by specific citation within the item itself — FDA clearance for TMS in treatment-resistant depression, 2008. Not independently re-verified against the current FDA record in this project — worth a Part 3 currency check since device clearances and indications can be updated.
- **What would make it wrong**: If the year is misremembered, or TMS has since received additional or different FDA clearances (e.g. for OCD, not mentioned here) that would make this description read as incomplete rather than wrong.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-gene-therapy-hurdle`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: According to this chapter, the major hurdle for gene therapy in neurological conditions is:
- **EN why**: While gene therapy has reached approved clinical use for a small number of rare inherited neurological conditions, delivering the therapy safely to the nervous system — getting the corrective genetic material to the right cells without unacceptable risk — remains a major, ongoing hurdle.
- **AZ stem**: Bu fəslə görə, nevroloji vəziyyətlərdə gen terapiyasının əsas maneəsi nədir?
- **AZ why**: Gen terapiyası kiçik sayda nadir irsi nevroloji vəziyyət üçün təsdiqlənmiş klinik istifadəyə çatsa da, müalicəni təhlükəsiz şəkildə sinir sisteminə çatdırmaq — düzəldici genetik materialı düzgün hüceyrələrə qəbuledilməz risk olmadan çatdırmaq — əsas, davam edən maneə olaraq qalır.
- **Source used / last checked**: Not previously sourced — general, well-established framing (safe CNS delivery is broadly recognized as the central challenge for neurological gene therapy).
- **What would make it wrong**: Not applicable as a specific factual claim — an accurate general characterization of the field, not a single-source claim.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-dbs-depression`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Beyond Parkinson's disease, deep brain stimulation is now also being explored as a potential treatment for:
- **EN why**: While DBS is most established for advanced Parkinson's disease, it's also being explored for other conditions, including severe depression — extending the same principle of disrupting abnormal circuit activity to a different set of disorders.
- **AZ stem**: Parkinson xəstəliyindən əlavə, dərin beyin stimulyasiyası indi hansı vəziyyət üçün potensial müalicə kimi araşdırılır?
- **AZ why**: DBS ən çox inkişaf etmiş Parkinson xəstəliyində qurulmuş olsa da, o, digər vəziyyətlər üçün də araşdırılır, o cümlədən ağır depressiya — anormal dövrə fəaliyyətini pozma prinsipini fərqli bir pozğunluqlar toplusuna genişləndirərək.
- **Source used / last checked**: Not previously sourced — accurate; DBS for treatment-resistant depression is an active research area (not FDA-approved as a standard treatment, which the item doesn't claim).
- **What would make it wrong**: If this were read as implying DBS is an approved depression treatment rather than still being explored — the wording ("now also being explored") is careful not to overclaim; worth confirming that phrasing stays accurate as the field moves.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`therapies-stem-cell-experimental`** — gap-bank, drug/clinical claim

- **File**: `brain-bee-gap-questions.js`
- **EN stem**: Among the potential therapies discussed in this chapter, which is most accurately described as still "largely experimental," facing the added challenge of correct functional integration rather than mere survival?
- **EN why**: Of the therapies discussed, stem cell replacement is singled out as still largely experimental, because a transplanted neuron must not just survive but correctly integrate into existing circuitry — a harder bar than most other stem cell applications need to clear, unlike DBS (already well-established for Parkinson's) or the handful of approved gene therapies.
- **AZ stem**: Bu fəsildə müzakirə olunan potensial müalicələr arasında, hansı ən dəqiq şəkildə hələ də "əsasən eksperimental" kimi təsvir olunur, sadəcə sağ qalmaqdan çox düzgün funksional inteqrasiya əlavə çətinliyi ilə üzləşərək?
- **AZ why**: Müzakirə olunan müalicələr arasında, kök hüceyrə əvəzetməsi hələ də əsasən eksperimental kimi seçilir, çünki transplantasiya olunmuş neyron təkcə sağ qalmamalı, mövcud dövrəyə düzgün inteqrasiya olmalıdır — bu, Parkinson üçün artıq yaxşı qurulmuş DBS-dən və ya təsdiqlənmiş bir neçə gen terapiyasından fərqli olaraq, əksər digər kök hüceyrə tətbiqlərinin keçməli olduğundan daha çətin bir standartdır.
- **Source used / last checked**: Not previously sourced — accurate, general characterization; stem-cell neural-replacement therapy is indeed still largely experimental as of when this was written.
- **What would make it wrong**: A fast-moving field — if a stem-cell-based neurological therapy has since reached approved clinical use, "still largely experimental" could go stale, similar to the potential-therapies lesson paragraph's currency risk above.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `sleep-attention-emotion` (1 flagged)

**`sae-glymphatic`** — main-bank, hedged/contested-science language

- **File**: `brain-bee-questions.js`
- **EN stem**: One proposed reason sleep is biologically necessary is that during sleep the brain:
- **EN why**: Work in animals shows cerebrospinal fluid exchanging with interstitial fluid along perivascular routes and clearing solutes, including amyloid, more effectively during sleep than waking — one strand of the link between poor sleep and neurodegeneration, though the human picture is still being worked out. Stopping energy use is tempting, but the sleeping brain is only slightly less active and REM is as costly as waking.
- **AZ stem**: Yuxunun bioloji zərurət olmasının irəli sürülən səbəblərindən biri odur ki, yuxu zamanı beyin:
- **AZ why**: Heyvanlarda aparılan işlər göstərir ki, onurğa-beyin mayesi damarətrafı yollarla toxumaarası maye ilə mübadilə edir və maddələri, o cümlədən amiloidi, yuxu zamanı oyaqlıqdan daha səmərəli təmizləyir — pis yuxu ilə neyrodegenerasiya arasındaki əlaqənin bir ipucu, insanda mənzərə isə hələ araşdırılır. Enerji istifadəsinin dayanması cəlbedicidir, lakin yatan beyin yalnız bir qədər az aktivdir və REM oyaqlıq qədər bahalıdır.
- **Source used / last checked**: Not previously sourced to a specific citation — the animal glymphatic-clearance findings (Nedergaard and colleagues' line of work) are well-known; the item correctly hedges that "the human picture is still being worked out," which is accurate — glymphatic clearance in living humans is less established than in mouse models.
- **What would make it wrong**: Not applicable as a factual error — the hedge is appropriate. Worth confirming in Part 3 whether more recent human-imaging evidence has strengthened the case, since this area has been moving quickly.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `synapse-nt` (4 flagged)

**`serotonin-raphe`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: Serotonergic neurons that modulate mood, appetite and sleep are clustered in the:
- **EN why**: A small set of raphe neurons sends axons almost everywhere in the brain, which is how a handful of cells can shift whole-brain state. SSRIs work upstream of the receptor by blocking reuptake, so more serotonin lingers in the cleft.
- **AZ stem**: Əhval-ruhiyyə, iştah və yuxunu modulyasiya edən serotoninergik neyronlar harada toplanıb?
- **AZ why**: Az sayda rafe neyronu aksonlarını beynin demək olar ki, hər yerinə göndərir — bir neçə hüceyrə beləcə bütün beynin vəziyyətini dəyişə bilir. SSRI-lar reseptordan əvvəl işləyir: geri sorulmanı bloklayır və yarıqda daha çox serotonin qalır.
- **Source used / last checked**: Not previously sourced — standard neuropharmacology (raphe nuclei as the serotonergic hub, SSRI mechanism).
- **What would make it wrong**: If SSRIs were described as acting directly on the raphe nuclei rather than on serotonin reuptake transporters generally — not the case here, accurate as written.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`sy-reuptake`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: How is the action of serotonin or dopamine in the cleft normally brought to an end?
- **EN why**: Monoamines are recycled by specific reuptake transporters, which is exactly what an SSRI blocks in order to leave serotonin acting for longer. Enzymatic destruction in the cleft is tempting because acetylcholinesterase works that way at the neuromuscular junction, but the monoamine systems are built around recovery rather than disposal.
- **AZ stem**: Sinaps yarığında serotonin və ya dopaminin təsiri normalda necə sona çatır?
- **AZ why**: Monoaminlər xüsusi geri udma daşıyıcıları ilə təkrar istifadəyə qaytarılır — SSRİ məhz bunu bloklayır ki, serotonin daha uzun müddət təsir göstərsin. Yarıqda fermentlə parçalanma cəlbedicidir, çünki sinir-əzələ birləşməsində asetilxolinesteraza belə işləyir, lakin monoamin sistemləri məhv etmə yerinə geri qaytarma üzərində qurulub.
- **Source used / last checked**: Not previously sourced — standard synaptic pharmacology.
- **What would make it wrong**: If acetylcholinesterase-style enzymatic breakdown were claimed for monoamines — the item explicitly and correctly rules this out.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`sy-opioid-receptors`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: Why does the human brain have receptors that morphine, a poppy alkaloid, fits so precisely?
- **EN why**: Endorphins and enkephalins are the native ligands of a pain-modulating system in the periaqueductal grey and dorsal horn, and the plant molecule simply happens to fit the same binding site — the discovery that led directly to finding the endogenous opioids. Co-evolution with poppies is tempting as a story, but populations that never met the plant have identical receptors.
- **AZ stem**: İnsan beynində xaşxaş alkaloidi olan morfinin bu qədər dəqiq uyğunlaşdığı reseptorlar niyə var?
- **AZ why**: Endorfinlər və enkefalinlər su kəməri ətrafı boz maddə ilə arxa buynuzdaki ağrı modulyasiya sisteminin öz liqandlarıdır; bitki molekulu sadəcə eyni bağlanma yerinə uyğun gəlir — bu kəşf birbaşa daxili opioidlərin tapılmasına gətirib çıxardı. Xaşxaşla birgə təkamül hekayə kimi cəlbedicidir, lakin bu bitki ilə heç vaxt qarşılaşmamış populyasiyalarda da reseptorlar eynidir.
- **Source used / last checked**: Not previously sourced — standard endogenous-opioid-system teaching point.
- **What would make it wrong**: Not applicable — well-established; "populations that never met the plant have identical receptors" is accurate and correctly used to rule out a co-evolution myth.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

**`sy-agonist-antagonist`** — main-bank, drug/clinical claim

- **File**: `brain-bee-questions.js`
- **EN stem**: A drug binds a receptor without activating it and prevents the natural transmitter from binding. It is:
- **EN why**: An antagonist occupies the site and blocks signalling, which is how curare paralyses muscle at the nicotinic receptor and how naloxone reverses an opioid overdose within a minute. A reuptake inhibitor is tempting because it also changes transmission, but it acts on the transporter and increases the transmitter's effect rather than blocking it.
- **AZ stem**: Dərman reseptora bağlanır, lakin onu aktivləşdirmir və təbii transmitterin bağlanmasına mane olur. Bu:
- **AZ why**: Antaqonist bağlanma yerini tutur və siqnalı bloklayır — kürarenin nikotinik reseptorda əzələni iflic etməsi və nalokson-un opioid dozasını bir dəqiqə içində geri qaytarması belə işləyir. Geri udma inhibitoru cəlbedicidir, çünki o da ötürülməni dəyişir, lakin daşıyıcıya təsir edir və transmitterin təsirini bloklamaq yerinə artırır.
- **Source used / last checked**: Not previously sourced — standard pharmacology (antagonist mechanism; curare and naloxone are common teaching examples).
- **What would make it wrong**: If naloxone's reversal timescale ("within a minute") were significantly off — naloxone is in fact fast-acting (IV onset ~1-2 minutes), so this is a reasonable approximation, not flagged as likely wrong.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `ventricles-meninges` (1 flagged)

**`vm-csf-turnover`** — main-bank, precise number

- **File**: `brain-bee-questions.js`
- **EN stem**: How does the standing volume of CSF compare with the amount produced each day?
- **EN why**: Roughly 150 mL circulates at any moment while about 500 mL is secreted per day, so the whole volume is replaced three or four times daily — which is why an obstruction raises pressure within hours rather than weeks. Equal figures are the tempting guess, but they would leave no room for the continuous absorption happening at the granulations.
- **AZ stem**: Onurğa-beyin mayesinin mövcud həcmi gün ərzində hasil olunan miqdarla necə müqayisə olunur?
- **AZ why**: Hər an təxminən 150 mL dövr edir, gün ərzində isə təxminən 500 mL ifraz olunur — deməli bütün həcm gündə üç-dörd dəfə əvəzlənir və buna görə tutulma təzyiqi həftələr deyil, saatlar içində qaldırır. Bərabər rəqəmlər cəlbedici təxmindir, lakin onlar dənəciklərdə davam edən fasiləsiz sorulmaya yer qoymazdı.
- **Source used / last checked**: Not previously sourced to a specific citation — commonly cited CSF physiology figures (~150 mL total volume, ~400-500 mL/day production), not independently verified against a primary source in this project.
- **What would make it wrong**: Cited CSF production-rate figures vary somewhat by source (400-600 mL/day is also seen); if a stricter source gives a different daily volume, the "three or four times daily" turnover conclusion could shift.
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

#### Module: `white-matter` (1 flagged)

**`internal-capsule`** — main-bank, precise number

- **File**: `brain-bee-questions.js`
- **EN stem**: Why can a stroke in the internal capsule barely 1 cm across paralyse an entire side of the body?
- **EN why**: Projection fibres from a wide sheet of cortex converge into a compact bundle between the thalamus and basal ganglia, so a tiny lacunar infarct hits fibres for face, arm and leg at once. The cell bodies stay up in cortical layer V — the capsule holds their axons, not the neurons themselves.
- **AZ stem**: Niyə daxili kapsulda cəmi 1 sm-lik insult bədənin bütün bir tərəfini iflic edə bilər?
- **AZ why**: Qabığın geniş sahəsindən gələn proyeksiya lifləri talamus və bazal qanqliyalar arasında sıx dəstəyə yığılır — ona görə kiçik lakunar infarkt üz, qol və qıç liflərini birdən vurur. Hüceyrə cisimləri qabığın V qatında qalır — kapsulda neyronlar deyil, onların aksonları var.
- **Source used / last checked**: Not previously sourced — standard neuroanatomy teaching point about internal-capsule fiber density; the "1 cm" figure is illustrative/typical for a lacunar infarct rather than a cited measurement.
- **What would make it wrong**: If "barely 1 cm" overstates how small a capsular lesion needs to be to cause complete hemiplegia — real lacunar infarcts vary in size; a stricter phrasing might say "a few millimeters to about a centimeter."
- **Possible AZ mistranslation**: none noted
- **Human SME**: keep / change / delete —
- **Human AZ**: keep / change / delete —

---

*(Part 3 — the second search pass on these packet items — not started yet. Stopping here per Omar's instructions to report after each part.)*
