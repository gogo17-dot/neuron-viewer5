# Brain Bee prep — handoff

Context for another AI agent picking up this work.

## Project

NEYRON — bilingual (EN/AZ) 3D neuroscience atlas, live at `atlas.neyron.az`.
Repo root: `C:\Users\Omar Garagozov\neural-network-simulator`
**All canonical UI lives in `neuron-viewer5/`.** Ignore any other copy.

Serve locally:

```bash
cd neuron-viewer5
python -m http.server 8090
# http://127.0.0.1:8090/
```

## Site conventions (must follow)

- Fonts: Cormorant Garamond + Share Tech Mono.
- Theme via `data-theme="night|day"` on `<html>`, stored in `neyron_theme`.
  Night: bg `#020810`, accent `#00ff8c`. Day: bg `#faf8f4`, accent `#e05a10`.
  Always use `var(--accent)` / `var(--bg)` so both themes work.
- Language: every visible string carries `data-en` and `data-az`, and the element's
  inner text repeats the EN value. `site-shell.js` swaps them; lang stored in `neyron_lang`.
  For JS-rendered content, re-apply on `window.__neyronAfterSetLang`.
- Shared chrome on every page: `page-base.js`, `site.css`, `site-shell.js`, site nav, footer.
- Background particles (`particles-bg.js` + `<canvas id="bg-particles">`) are on most pages
  but **deliberately removed from every Brain Bee page**. Don't add them back.
- Bump the `?v=` cache token on `site.css` when CSS changes.

## Brain Bee files

| File | Role |
| --- | --- |
| `neuron-viewer5/brain-bee.html` | Hub: contest explainer, study map, quiz mount `#bb-quiz`, IBB sections, resources |
| `neuron-viewer5/brain-bee-questions.js` | The MCQ bank — 300 questions, `var BB_QUESTIONS = [...]` |
| `neuron-viewer5/brain-bee-core.js` | Shared `BB` helper: localStorage progress, choice shuffling, i18n, sub labels |
| `neuron-viewer5/brain-bee-quiz.js` | Practice UI (All / Anatomy / Function / Review missed) |
| `neuron-viewer5/brain-bee-exam.html` + `-exam.js` | Timed mock: 50 random, no feedback until the end, per-topic breakdown |
| `neuron-viewer5/brain-bee-live.html` + `-live.js` | Live judging drill: 45 s per question, two strikes out |
| `neuron-viewer5/brain-bee-anatomy.html` + `-anatomy.js` | Neuroanatomy identification: a structure is lit on a 3D atlas, answer typed free-text. `-anatomy.js` is an **ES module**. Viewer, scene module, framing meshes and copy are injected from the registry — an `if (viewer === …)` in the drill loop means the abstraction is wrong |
| `neuron-viewer5/brain-bee-anatomy-viewers.js` | Drill viewer registry: `loadScene`, `frameKeys`, `group`, `manifestHref`, EN+AZ copy. Default viewer is brainstem |
| `neuron-viewer5/brain-bee-structures.js` | Structure bank, `var BB_STRUCTURES = [...]` — one entry per drill item, `viewer` namespaced, mesh names from that viewer's manifest |
| `neuron-viewer5/brain-bee-diagnosis.html` | Patient diagnosis round |
| `neuron-viewer5/brain-bee-diagnosis.js` | Diagnosis UI (ES module) |
| `neuron-viewer5/brain-bee-cases.js` | Cases, EN (`export const cases`) — 27 cases |
| `neuron-viewer5/brain-bee-az.js` | AZ overlay for cases (one entry per case id) |
| `neuron-viewer5/site.css` | All `.bb-*` styles |
| `neuron-viewer5/_qa_brainbee.mjs` | Playwright smoke test for every mode |
| `neuron-viewer5/_bank_stats.mjs` | Bank shape + positional-reference gate. Run before any choice-order edit. |
| `neuron-viewer5/_shot_anatomy.mjs` | Throwaway script that screenshots the drill in both themes |
| `neuron-viewer5/practice.html` + `-engine.js` + `.js` | Second practice engine: SM-2-lite spaced review, learn/review/mixed/mock modes. See `BRAIN-BEE-CURRICULUM.md` |
| `neuron-viewer5/practice-data.js` | **Generated** — do not hand-edit. Written by `_port_practice_bank.mjs` |
| `neuron-viewer5/practice-mistakes.html` + `.js` | Weak-areas / mistake log for the second engine |
| `neuron-viewer5/practice-demo.js` | English-only UI fixtures, loaded only with `?demo=1`. Not real content |
| `neuron-viewer5/_port_practice_bank.mjs` | Ports `brain-bee-questions.js` + `brain-bee-cases.js`/`-az.js` into `practice-data.js`. Run after either source bank changes |
| `neuron-viewer5/BRAIN-BEE-CURRICULUM.md` | Architecture of the second practice engine and what's ported into it — read before touching any `practice-*` file |

Load order on any page using the MCQ bank: `brain-bee-questions.js`, then `brain-bee-core.js`,
then the mode script. The identification drill swaps the first for `brain-bee-structures.js` and
does not load the MCQ bank at all, so everything in `brain-bee-core.js` that touches
`BB_QUESTIONS` is guarded with a `typeof` check. Keep it that way.

Also linked from: nav + footer of every page, `index.html` (`.bb-home-strip`), `about.html`, `sitemap.xml`.

## Data shapes

MCQ in `brain-bee-questions.js` (plain `var BB_QUESTIONS = [...]`, no modules):

```js
{
  id: "men-layers",
  topic: "anatomy",              // "anatomy" | "function"
  sub: "ventricles-meninges",    // see the SUBS map in brain-bee-core.js
  q:       { en: "...", az: "..." },
  choices: [{ en: "...", az: "..." }, /* 4 total */],
  answer: 2,                     // 0-based index into choices, as authored
  why:     { en: "...", az: "..." },
  see: { href: "meninges/index.html", en: "See meninges in 3D →", az: "Meningesi 3D-də gör →" },
}
```

`answer` is the index in the authored array. Every mode shuffles choice order per card at
runtime (`BB.makeItem`), so authored answer position does not leak a pattern to the student.
The source array is still kept uniform (75 / 75 / 75 / 75 after the 300-item rotation) so
anyone reading the file does not see a slot bias. `see` is optional — omit it when no 3D
module fits. Cerebellum and basal ganglia anatomy items must carry a `see` link;
`_bank_stats.mjs` fails the run if any of those 21 are linkless.

**Authoring habit to watch on questions 301–400.** Across three expansion passes the natural
drafting pattern was: tempting distractor first, correct answer mid-list, index 3 starved
(~13% before rotation). Author the next block naturally, then rebalance with a mechanical
rotation of the whole bank — do not compensate by stuffing new items into the empty slot.
Before rotating, `node _bank_stats.mjs` must print `positional references in explanations: none
(rotation safe)`. Explanations must name the distractor by content, never by position
("the first option", "Üçüncü variant", "answer B"). The gate uses Unicode letter lookarounds
(`\p{L}`, `u` flag), not JS `\b`, because `\b` does not treat Ü/Ə/Ş as word characters and
would miss an AZ-only positional string. It also requires whitespace before a letter suffix
so `cavabdır` is not a hit. Eight fixtures run at the start of every stats pass; a gate
nobody has seen fail is not proven.

Structure in `brain-bee-structures.js` (plain `var BB_STRUCTURES = [...]`):

```js
{
  id: "brainstem-red-nucleus",
  viewer: "brainstem",           // folder name of the 3D viewer
  mesh: "Red_nucleus",           // object name in the scene = GLB filename without .glb
  name:   { en: "Red nucleus", az: "Qırmızı nüvə (nucleus ruber)" },
  accept: { en: ["red nucleus", "nucleus ruber"], az: ["qırmızı nüvə", "nucleus ruber"] },
  note:   { en: "one line on what it does", az: "..." },
}
```

`mesh` must be read off the actual model — `_qa_brainbee.mjs` checks every `mesh` against
**that entry's** `s.viewer` manifest (`brainstem/brainstemManifest.js`,
`cranial-nerves/cranialNervesManifest.js`, …). Invent a name and the drill silently skips
the structure. Do not pad a viewer with structures the atlas does not subdivide (SUIT has
no separate lingula / central lobule / floccular peduncle; ventricles has seven meshes;
basal ganglia drill has six nuclei — PAG stays, locus coeruleus lives in brainstem;
meninges has six clickable sheets). Answers are matched
through `BB.answerMatches`, which lowercases, strips punctuation and folds `ə ı ş ç ğ ö ü`
to ASCII, so accepted spellings only need one form each. Both languages are always
accepted, whichever way the interface is set. When a structure exists on both sides,
unsided spellings must not be on the accept list or the left copy is the right copy with
a different mesh lit.

Progress lives in `localStorage` under `neyron_bb_progress` as
`{ v: 2, q: { <id>: {...} }, s: { <id>: {...} } }`, each record being
`{ seen, right, wrong, streak }`. **`q` is multiple choice, `s` is named structures** — they are
namespaced apart so the hub's "x / N seen" and Review missed keep counting questions only.
A v1 store (no `s`) still reads: the key is filled in on read. An item is "missed" while
`wrong > 0 && streak < 2`, which is what empties either Review missed queue after two correct
answers in a row. The live drill also keeps a best run in `neyron_bb_live_best`.

Case in `brain-bee-cases.js`:

```js
{
  id: "pd-01",
  disorder: "Parkinson's disease",
  category: "Degenerative diseases",
  difficulty: "medium",
  history: "first-person patient account",
  presentation: "examination findings",
  tests: { ct, pet_spect, mri, eeg, ncs, cognitive, blood, csf },  // all 8 keys
  answer: "Parkinson's disease",
  acceptedAnswers: ["Parkinson's", "PD", /* spelling variants */],
  explanation: "why this, and why each distractor is wrong",
  distractors: ["Essential tremor", /* ... */],
}
```

Psychiatric cases are history-led: most of the eight tests come back normal or non-diagnostic
on purpose, and cognitive is usually the only informative one. Do not invent an MRI finding
to make a psychiatric case solvable. `brain-bee-diagnosis.js` scores a test as low-yield if
the text starts with `Normal` / `Unremarkable` or contains `not indicated` / `göstəriş yoxdur`
/ `diqqətəlayiq deyil`, so keep those stems on the uninformative results.

`see.href` must point at a real page in `neuron-viewer5/`: `meninges/`, `ventricles/`,
`cerebral-cortex/`, `visual-pathway/`, `ear-pathway/`, `cranial-nerves/`, `diencephalon/`,
`limbic/`, `white-matter/`, `brainstem/`, `basal-ganglia/`, `cerebellum/`, `neuronatlas/`,
`synapse.html`, `hodgkin-huxley/`.

## Current state

- 300 MCQs, split exactly 150 anatomy / 150 function. Every subtopic is 3× the original
  100-question bank: cortex 30, brainstem 24, cranial nerves 18, ventricles/meninges 18,
  white matter 18, limbic 15, cerebellum 12, basal ganglia 9, diencephalon 6; neuron/AP 30,
  synapse/NT 30, sensory 36, motor 24, memory 18, sleep-attention-emotion 12.
- Authored answer index after rotation: **0:75  1:75  2:75  3:75**. Runtime shuffling still
  randomises per card. `see` links: 262 / 300. The 38 without a link are function items that
  do not map to a viewer (spinal reflexes, taste, etc.). Anatomy cerebellum (12) and basal
  ganglia (9) are required to have links; `_bank_stats.mjs` fails if any of those 21 is missing.
- All five modes working in EN+AZ, night and day: practice quiz, timed written test, live
  judging drill, patient diagnosis, and neuroanatomy identification.
- Identification drill is viewer-agnostic. `brain-bee-anatomy-viewers.js` injects the scene
  module (`loadScene`), `frameKeys`, group fallback, manifest and copy. The drill constructs
  every scene with `{ theme, interactive: false, onLoadProgress }` — `interactive` defaults
  to `true` on the atlas constructors so the atlas pages themselves are unchanged. Clicking
  the model must not open the atlas popup. Progress is under `s` in `neyron_bb_progress`
  (`BB.recordStructure`); `BB.structuresSeenCount(viewer)` is per-viewer.
- Structure counts (mesh names from manifests, no padding): brainstem 13
  (aqueduct and fourth ventricle live in ventricles), cranial-nerves 15
  (12 right + II/V/VII left), limbic 15, ventricles 7, white-matter 16,
  cerebral-cortex 12 (six lobes × two sides; atlas has nothing finer), visual-pathway 15, ear-pathway 15, diencephalon 14
  (optic tract dropped; visual-pathway + white-matter already cover it),
  basal-ganglia 6 (PAG kept, locus coeruleus dropped — brainstem keeps LC),
  cerebellum 15, meninges 6 (falx, tentorium L/R, cavernous L/R, spinal dura —
  no separate pia/arachnoid in the atlas). Picker order matches the registry.
  Default viewer is brainstem.
- **Cerebral-cortex is 12 because the atlas has six lobes × two sides and
  nothing finer**, not because items were dropped from a richer cortex set.
  The meshes are `Frontal_lobe`, `Parietal_lobe`, `Temporal_lobe`,
  `Occipital_lobe`, `Insula`, `Limbic_lobe`, each `.l` and `.r`. There are no
  gyri, sulci, Heschl, or calcarine meshes. The GLB dump is a whole brain;
  do not refill the drill from thalamus, striatum, hypothalamus, amygdala,
  fornix, corpus callosum, or cerebellum — those are not cortex. Cortex is
  still 30 items in the written bank, the biggest anatomy subtopic; the drill
  is thin exactly where the MCQs are thickest. That is an argument for a
  cortex atlas with real gyri later, not for inventing meshes now.
- **Laterality rule:** if a viewer drills both an L and an R mesh for the same
  structure, every accepted spelling (EN and AZ) must carry the side. Unsided
  answers only where the mesh is midline or the only side present in that
  viewer. So visual-pathway CN II requires side (L and R are both drilled);
  brainstem CN V stays unsided (single mesh). `_qa_brainbee.mjs` asserts this
  for every `_L`/`_R`/`.l`/`.r` pair, and also rejects non-cortical meshes in
  the cerebral-cortex list.
- Identification total: **149** structures (156 − 12 drops − cerebellum-as-cortex
  + 6 left cortical lobes). Cross-viewer stems: **18**, none in cerebral-cortex.
  Remaining overlaps are genuine pathway-vs-neighbourhood pairs; do not merge them.
- `see` links point at viewer pages (`…/index.html`), never at a structure id
  or hash, so dropping a drill entry does not move MCQ links.
- `keepRightSideOnly()` is gone from `ear-pathway/EarPathwayScene.js` (removed before any
  ear structures were authored). Framing uses per-viewer `frameKeys` so a long peripheral
  nerve (vagus, accessory) cannot shrink the rest of the model to a speck.
- Cerebellum viewer at `cerebellum/` (SUIT Anatom lobules + 3 deep nuclei + 3 Z-Anatomy
  peduncles + ghost brainstem). SUIT does not subdivide lingula / central lobule / floccular
  peduncle as separate meshes: midline I–IV is `Culmen`, lateral I–IV is `Wing_of_central_lobule`.
- Basal ganglia viewer at `basal-ganglia/` (7 CIT168/Z-Anatomy structures + ghost brainstem).
- 27 diagnosis cases, each with a full AZ entry. Seven psychiatric/neurodevelopmental
  additions: major depression, schizophrenia, bipolar affective disorder, autism spectrum
  disorder, anxiety disorder, OCD, PTSD. ALS is present (`als-01`). Guillain-Barré is not a
  case of its own (it appears only as a distractor on the spinal-cord injury case).
- Second practice engine (`practice.html`) now has real content: the 300
  MCQs + 27 cases ported bilingually into `practice-data.js` (327 items
  total), with the engine's rendering fixed to actually show AZ (it
  couldn't before this pass). Tier/difficulty are uniformly 1 — see
  `BRAIN-BEE-CURRICULUM.md`'s Limitations section before assuming otherwise.
- Contest explainer copy is final: "The International Brain Bee is a prestigious neuroscience
  competition hosted each year for teenagers all around the globe..." (IBB is ages 13–19.)
- Particles removed from the Brain Bee pages. No "coming soon" cards remain.

### Identification QA traps (already bit us)

- Drain the anatomy deck with **in-page `el.click()`**, not Playwright `locator.click`.
  Three.js asset reloads can look like navigations and hang the locator.
- Theme toggle on the anatomy page: `{ noWaitAfter: true }`.
- Mesh names are checked **per `s.viewer` manifest**. A name that is valid in brainstem
  is not automatically valid in cranial-nerves.
- Test the **AZ path directly**. Two bugs in one week were AZ-only and would not have
  shown up through English (positional regex with Ü; LOW_YIELD “no atrophy”).
- Do not invent meshes the atlas does not subdivide.
- Laterality is a bank-wide rule, not a CN-only special case: both L and R in
  the same viewer → side token required in every EN and AZ accept string.

## Next task

The five-mode cycle described above (300 questions, 27 cases, 149
structures) is still closed to new *authoring* — do not add more original
MCQs, cases, or structures until real students have used it and shown what
they get stuck on.

That freeze does not cover the second practice engine
(`practice-engine.js` / `practice.js` / `practice-mistakes.js` /
`practice-data.js`). It was built empty in a later session and has since
been populated by **porting** the existing 300 MCQs + 27 cases into its
shape (no new facts authored) and given bilingual support it was missing.
See **`BRAIN-BEE-CURRICULUM.md`** for that architecture, what's ported,
and what's still open — read it before touching any `practice-*` file.

Separately, the live content gap remains cortex: 30 written items vs a
12-lobe drill, because the current atlas has nothing finer than lobes.
Build a gyri atlas if the students need it. Do not fake Heschl or calcarine
on the whole-brain dump. Do not refill cerebral-cortex from non-cortical
meshes. Do not re-hard-code a viewer in `brain-bee-anatomy.js`.

## Hard rules

- **Write original questions.** Do not copy items from Brain Facts or any exam bank. Link Brain Facts, never host it.
- **No ANS / neuroscience.az partnership claims.** The Azerbaijan Neuroscience Society hosts the
  national Brain Bee but has not endorsed this. The existing disclaimer stays.
- Keep the "Coming soon" cards honest — remove them rather than fake content.
- Every new string needs an AZ translation.
