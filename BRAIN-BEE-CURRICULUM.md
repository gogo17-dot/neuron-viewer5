# Brain Bee curriculum — architecture

Companion to `BRAIN-BEE-HANDOFF.md`. That file covers the original five-mode
site (300 MCQs / 149 structures / 27 cases, closed for content). This file
covers the second layer: turning the practice engine that a prior session
built empty (`practice-engine.js`, `practice.js`, `practice-mistakes.js`,
`practice-data.js`) into something that behaves like Khan Academy's SAT
course — adaptive practice, spaced review, weak-area tracking — instead of a
flat quiz. Read this before touching `practice-*` files.

## Why a second engine

The original quiz (`brain-bee-quiz.js`) is a flat deck with two filters (topic,
review-missed) and no memory of *when* you last saw an item. The engine built
in the prior session already had the missing piece: `buildSession` supports
`learn` (unseen, easiest first), `review` (due items only, via a lite SM-2
scheduler), `mixed` (70/30 new:due), and `mock` (timed, tier-weighted), plus
`accuracyByModule` / `mistakesByModule` for a real weak-areas view. That's the
Khan Academy shape. It just had no content and no bilingual support — both
fixed this session.

## Curriculum order — parts, chapters, lessons

**Revision note:** the chapter table this section used to have was built by
walking our own `moduleId` list and giving it a rationale — it matched what
we'd already coded, not the real Brain Bee syllabus. The real reference for
the IBB's format is [thebrainbee.org/competition](https://thebrainbee.org/competition/)
and [thebrainbee.org/faq](https://thebrainbee.org/faq/); the real reference
for content coverage is the Society for Neuroscience's *Brain Facts* book,
the IBB's own recommended study text (table of contents cross-checked
against a copy posted on soinc.org). The structure below follows *Brain
Facts*'s six parts and sixteen chapters, chunked further into 34 lessons
small enough to read in one sitting. Parts, chapters, and lesson topics are
real; MCQ/identification counts are ours, tracking what already has practice
content behind a lesson vs. what doesn't yet ("no practice yet"). As of this
revision every lesson below is written — see "What this means for content
work" for what that does and doesn't cover.

| Part | Chapters |
| --- | --- |
| 1. Introduction to the Brain | 1. Brain Basics · 2. The Developing Brain |
| 2. Sensing, Thinking, and Behaving | 3. Senses & Perception · 4. Learning, Memory & Language · 5. Movement · 6. Sleep |
| 3. Across the Lifespan | 7. Stress · 8. The Aging Brain |
| 4. Brain Research | 9. Kinds of Research |
| 5. Diseases and Disorders | 10. Childhood disorders · 11. Addiction · 12. Degenerative disorders · 13. Psychiatric disorders · 14. Brain injury & illness |
| 6. Treating Brain Disorders | 15. Potential Therapies · 16. Neuroethics |

Same rule as before: this order is a **recommendation for first-time,
start-to-finish study**, not a gate. `learn`/`mixed`/`review`, the topic
filter, and mistake-log drilling stay free-jump. The IBB's other rounds
(written test, neuroanatomy identification, live judging) are formats, not
chapters — they draw from across this whole list rather than owning a slot.

### Part 1 — Introduction to the Brain

**Chapter 1 — Brain Basics** (13 lessons; every one already has ported
practice content)

| Lesson | Title | `moduleId` | MCQ / id | Status |
| --- | --- | --- | --- | --- |
| 1.1 | The neuron: structure | `neuron-ap` | 30 / — | **Written — live** |
| 1.2 | Resting potential & the action potential | `neuron-ap` | (shares 30) | **Written** |
| 1.3 | Conduction: myelin & saltatory conduction | `neuron-ap` | (shares 30) | **Written** |
| 1.4 | Synapses & neurotransmitters | `synapse-nt` | 30 / — | **Written** |
| 1.5 | Whole-brain orientation: meninges & ventricles | `ventricles-meninges` | 18 / 13 | **Written** |
| 1.6 | Cortex & lobes | `cortex` | 30 / 12 | **Written** |
| 1.7 | Diencephalon | `diencephalon` | 6 / 14 | **Written** |
| 1.8 | Limbic system | `limbic` | 15 / 15 | **Written** |
| 1.9 | Basal ganglia | `basal-ganglia` | 9 / 6 | **Written** |
| 1.10 | Brainstem | `brainstem` | 24 / 13 | **Written** |
| 1.11 | Cranial nerves | `cranial-nerves` | 18 / 15 | **Written** |
| 1.12 | Cerebellum | `cerebellum` | 12 / 15 | **Written** |
| 1.13 | White matter & tracts | `white-matter` | 18 / 16 | **Written** |

**Chapter 2 — The Developing Brain** (3 lessons; all three now have original
gap-chapter MCQs — see "New content: the gap-chapter bank")

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 2.1 | Neural development & migration | `neural-development` | **Written — 10 original MCQs** |
| 2.2 | Critical periods | `critical-periods` | **Written — 10 original MCQs** |
| 2.3 | Neuroplasticity | `neuroplasticity` | **Written — 10 original MCQs** |

### Part 2 — Sensing, Thinking, and Behaving

**Chapter 3 — Senses & Perception** (3 lessons, all drawing on the existing
`sensory` pool — 36 MCQ / 30 id, visual + ear pathway)

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 3.1 | Vision | `sensory` | **Written** |
| 3.2 | Hearing & balance | `sensory` | **Written** |
| 3.3 | Taste, smell, touch & pain | `sensory` | **Written** |

**Chapter 4 — Learning, Memory & Language** (2 lessons)

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 4.1 | Learning & memory | `memory` (18 / —) | **Written** |
| 4.2 | Language & the brain | `language-brain` | **Written — 10 original MCQs** |

**Chapter 5 — Movement** (1 lesson)

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 5 | Movement | `motor` (24 / —) | **Written** |

**Chapter 6 — Sleep** (2 lessons, sharing the `sleep-attention-emotion` pool
— 12 MCQ / —)

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 6.1 | Sleep | `sleep-attention-emotion` | **Written** |
| 6.2 | Attention & emotion | `sleep-attention-emotion` | **Written** |

### Part 3 — Across the Lifespan

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 7 | Stress | `stress` | **Written — 10 original MCQs** |
| 8 | The Aging Brain | `aging` | **Written — 10 original MCQs** |

### Part 4 — Brain Research

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 9 | Kinds of Research | `kinds-of-research` | **Written — 10 original MCQs** |

### Part 5 — Diseases and Disorders

All five chapters point at the diagnosis round's content except Addiction,
which has no ported content at all.

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 10 | Childhood disorders | `diagnosis` (27 cases, shared) | **Written** — partial practice coverage |
| 11 | Addiction | `addiction` | **Written — 10 original MCQs** |
| 12 | Degenerative disorders | `diagnosis` (shared) | **Written** — partial practice coverage |
| 13 | Psychiatric disorders | `diagnosis` (shared) | **Written** — partial practice coverage |
| 14 | Brain injury & illness | `diagnosis` (shared) | **Written** — partial practice coverage |

The 27 diagnosis cases aren't tagged by which of these four chapters they
belong to — "partial coverage" means *some* of the 27 fit each chapter, not
that each chapter has its own dedicated case pool. Splitting the case bank
by chapter is unstarted work.

### Part 6 — Treating Brain Disorders

| Lesson | Title | `moduleId` | Status |
| --- | --- | --- | --- |
| 15 | Potential Therapies | `potential-therapies` | **Written — 10 original MCQs** |
| 16 | Neuroethics | `neuroethics` | **Written — 12 original MCQs** (the pilot chapter — first gap chapter closed) |

### What this means for content work

**All 34 lessons are now written** (`brain-bee-lessons-data.js`), **and all
34 now sit in front of real practice content.** 10 of them (`moduleId: null`
— all of chapter 2, plus single lessons inside chapters 4, 7, 8, 9, 11, 15,
16) originally had real lesson text but no MCQs or identification items
behind them. All 10 have since been closed with original, fact-checked MCQs
in `brain-bee-gap-questions.js`: chapter 16 (Neuroethics, 12 questions) as a
pilot first, then the other 9 (2.1–2.3, 4.2, 7, 8, 9, 11, 15; 10 questions
each) in the same format once the pilot's quality/pattern was validated. No
lesson in the curriculum shows a "no practice yet" note anymore — every one
ends in a real "practice this" CTA.

Writing all 34 lessons up front — rather than one at a time, gated on
practice content existing — was a deliberate choice: a student working
through the curriculum in order should never hit a dead "not written yet"
chapter, even in a content gap. What was still missing for the gap chapters
was **new MCQ authoring**, which is now done for all 10 — see "New content:
the gap-chapter bank" below. The old "cycle closed" rule from
`BRAIN-BEE-HANDOFF.md` freezes MCQ/case authoring for the already-ported
300+27 bank; it never blocked writing lesson text, and it didn't block new
MCQ authoring for these gap chapters either, since that covered a real hole
in the syllabus, not padding an already-complete one.

Lesson quality note, for whoever picks this up next: all 34 lessons were
drafted in one pass from established neuroscience knowledge (not copied from
a specific source), at 2-4 paragraphs each, in English and Azerbaijani. They
have not been reviewed by a subject-matter expert or a native Azerbaijani
speaker for terminology accuracy — treat them as a strong first draft, not a
final-checked reference, especially before a student relies on them for
exam-level factual claims (exact numbers, drug names, disease criteria).

## Lesson format — `.bb-lesson`

Spec, now validated against a real lesson (1.1) rather than guessed in the
abstract.

- **Data**: `brain-bee-lessons-data.js` exports a plain `BB_LESSONS` array
  (script tag, no build step — same convention as `brain-bee-questions.js`).
  Each entry: `id` (slug, stable — used in `?lesson=`), `chapter` (string,
  matches the tables above, e.g. `"1.1"` or `"5"`), `part`/`chapterTitle`/
  `title` (`{en, az}`), `moduleId` (string or `null` for a gap chapter),
  `body` (array of block objects — currently only `{ type: "p", text:
  {en, az} }` paragraphs; empty array means "not written yet"), an optional
  `see` (`{ href, en, az }`, an internal link — usually into a 3D viewer),
  and an optional `video` (`{ youtubeId, title: {en, az} }`).
- **Video discipline**: `youtubeId` must be a real, checked video (same rule
  the old chapter table used) — never a guessed ID. Embedded via
  `youtube-nocookie.com/embed/<id>` inside a `<details class="bb-lesson-video">`
  disclosure, collapsed by default, so an unwatched video doesn't push
  practice below the fold.

### Reference videos, all 34 lessons

All 34 lessons now carry a `video` field — the 31 that had none got one this
pass, on top of the 3 (1.1, 1.4, 1.5) that already did. Every one was
verified real before being written in, using YouTube's official `oembed`
endpoint (`youtube.com/oembed?url=...&format=json`) — a successful response
confirms the video is live, public, and embeddable, and returns its exact
title and channel name, which is stronger evidence than a search-result
snippet. Verification happened twice, independently: once by the research
pass that found each candidate, and a second time by re-fetching every
single one of the 31 oembed URLs myself before touching the file — nothing
was written in on the strength of a report alone.

Sources, in order of preference: 2-Minute Neuroscience (Neuroscientifically
Challenged) for short focused anatomy/mechanism topics, Crash Course
Anatomy & Physiology or Crash Course Psychology for broader overviews,
Khan Academy, Osmosis, or TED for the rest. One TED talk (Nita Farahany, on
cognitive liberty and mental privacy) covers the neuroethics lesson. One
video initially got reused across two lessons (critical-periods and
language-brain both matched the same Crash Course Psychology language
episode, since it happens to cover the critical-period concept via the
Genie case study) — caught before writing anything in, and replaced for
critical-periods with a dedicated video from Children's Minnesota
("Sensitive Periods in Brain Development") so no two lessons share a video.

A few of the 31 are good-but-imperfect topic matches rather than a perfect
fit, flagged here rather than hidden: `white-matter`'s video covers gray vs.
white matter generally, not the three tract categories the lesson itself
covers; `taste-smell-touch-pain`'s video covers only taste and smell, not
touch or pain; `attention-emotion`'s video covers only the attention half;
`aging`'s video emphasizes cognitive ability more than the volumetric
details the lesson opens with; `kinds-of-research`'s video is general
psychological research methods, not neuroimaging-tool-specific; `cranial-nerves`'s
video says "Anatomy & Physiology" in its title but is in fact hosted on the
Neuroscientifically Challenged channel, not Crash Course A&P — a real,
verified, on-topic video, just a title that could read as a mismatch at a
glance. None of these are wrong, just not a perfect one-to-one match — a
real video that's 90% on-topic beats no video, but they're worth a second
look if someone wants tighter fits later.

### Azerbaijani reference videos (`videoAz`), 11 of 34 lessons

Separate from the English `video` field above: 11 lessons now also carry a
`videoAz` field, same shape (`{ youtubeId, title: { en, az } }`), added only
where a genuine Azerbaijani-language video actually exists — not a second
empty slot on all 34. The English `video` field is untouched everywhere;
`videoAz` is additive.

**Hunt method**: three research passes covered all 34 lessons (split
roughly 1.1–2.3, 3.1–6.2, 7–16), each briefed to (a) distinguish genuine
Azerbaijani from Turkish or Uzbek — Azerbaijani orthography uses "ə" (schwa)
constantly and neither Turkish nor Uzbek has that letter at all, and
Azerbaijani-specific vocabulary (`xəstəlik` not Turkish `hastalık`, `müəllim`
not `öğretmen`, `məktəb` not `okul`, `yaddaş` not `hafıza`) is stronger
evidence than title text alone — best confirmed by the channel's own
identity (an explicit "Azərbaycan"/"Azərbaycanca" name, a known Azerbaijani
institution, a named Azerbaijani doctor/teacher), (b) never use `video.edu.az`
or any non-YouTube host as a `youtubeId`, and (c) report "no hit" rather than
force a topic match — a "handful, not 34" was the explicit expectation going
in. The three passes returned 12 candidate ids across 12 lessons plus a lead
on `video.edu.az` (Azerbaijan's Ministry of Education video portal) for
early-anatomy topics.

**Independent re-verification**: every one of the 12 candidate ids was
re-fetched by me, independently, against YouTube's oembed endpoint
(`youtube.com/oembed?url=...&format=json`) before any of them were trusted —
the same two-pass discipline used for the English videos. All 12 came back
live, public, and embeddable. 11 were written into `brain-bee-lessons-data.js`
as `videoAz`; one was rejected on format grounds (below), not verification
grounds.

**The 11 hits**:

| Lesson | `videoAz.youtubeId` | Azerbaijani title | Channel | Note |
|---|---|---|---|---|
| limbic-system (1.8) | `bFiu6bS1dzY` | Emosiyalar: Limbik sistem | Khan Academy Azərbaycanca | official channel, clean match |
| vision (3.1) | `534jhFpUIys` | Görmə analizatoru. Gözün quruluşu. Göz xəstəlikləri. | Biologiya Raqif müəllim | school-biology explainer |
| hearing-balance (3.2) | `RDKArsjXxrs` | Eşitmə analizatoru. Müvazinət orqanı. Qulaq. | Biologiya Raqif müəllim | same channel as vision; backup candidate `vDjKtJcrMpU` (Nubar Qurbanova) also verified live if this one is ever swapped |
| learning-memory (4.1) | `4nRNo6ZHK9c` | 9-cu sinif: Emosiyalar və yaddaş | Kəmalə İslam | grade-9 lesson video; covers memory paired with emotion, not a pure memory-only video — good-but-imperfect, same honesty standard as the English list above |
| language-brain (4.2) | `Ke_bWJP5fiM` | Nitq və beyin: Afaziya və bölünmüş beyinli pasientlər | Khan Academy Azərbaycanca | official channel; direct match (aphasia, split-brain) |
| sleep (6.1) | `Br_ZZZSS8qM` | IX sinif: Emosiyalar və yuxu | 298 nömrəli məktəb (Dağdəmirova Sahibə) | grade-9 school lesson; covers sleep paired with emotion — good-but-imperfect |
| stress (7) | `VXwvwkG8QD4` | Stress hormonu: Kortizol — bir çox xəstəliklərin səbəbkarı | Baku Integrative Medicine Clinic | direct match (cortisol/HPA axis) |
| degenerative-disorders (12) | `BH_81ODJjKM` | Parkinson xəstəliyinin ilkin əlamətləri nədir? | İctimai TV | Azerbaijan's public broadcaster; covers Parkinson's only — lesson also covers Alzheimer's, not covered by this video |
| childhood-disorders (10) | `IZZns6TsBgw` | Uşaqlarda autizm spektr pozuntusu: Səbəblər və simptomlar | Baku Integrative Medicine Clinic | covers autism only — lesson also covers ADHD, not covered by this video |
| psychiatric-disorders (13) | `WZ09TUEyf5I` | Şizofreniya nədir? Əlamətləri, səbəbləri və müalicəsi | Dr. Aytən Namazova (psychiatrist) | covers schizophrenia only — lesson also covers depression and bipolar disorder; two verified backups exist if a mood-disorder emphasis is preferred instead: `e4w57NJlzXA` (bipolar) and `nInTer1NhX8` (depression), same channel style |
| injury-illness (14) | `lR1KoWtzgUM` | Beyin qan dövranı pozğunluqları | Master Studio / Nevropatoloq Jalə Qarayeva | covers stroke/circulation disorders — lesson also covers TBI, not covered by this video |

Only one `videoAz` per lesson is wired into the schema, so where a lesson's
topic is broader than any single Azerbaijani video found (psychiatric-disorders,
degenerative-disorders, childhood-disorders, injury-illness), the table above
names verified backups in the note column rather than inventing a way to
show more than one — same "don't invent coverage to look complete" rule as
the English pass.

**Rejected — `cortex-lobes`**: a real, on-topic candidate exists
(`jnbZcDMJMKg`, "İnsan anatomiyası kafedrası - Baş beyin qabığı (VII mühazirə,
I hissə)" from Azerbaijan Medical University's own channel) and it passed
oembed verification. Not used: it's Part I of a formal university anatomy
lecture ("mühazirə"), not a short lesson-level explainer, which is the
opposite of what was asked for here. Left out rather than shipped as a
compromise — worth reconsidering only if someone specifically wants a
deeper-dive AZ resource for this lesson later.

**The other 23 lessons**: no genuine Azerbaijani-language video was found at
a usable depth. This lines up with what was flagged going in — there is no
Azerbaijani Crash Course or 2-Minute Neuroscience equivalent, so most
candidates surfaced during the hunt were either Turkish or Uzbek content
that failed the "ə" / vocabulary / channel-identity check (filtered out, not
used), or generic school-biology material that didn't actually match a
lesson's specific topic (e.g., a general "beyin" overview standing in for a
specific disorder or mechanism — rejected rather than force-fit). The topic
areas flagged in advance as unlikely to have coverage — neuroethics,
potential-therapies, kinds-of-research, addiction, diagnosis, aging,
most of Part 4 (Brain Research) and Part 6 (Treating Brain Disorders) — did
in fact come back empty. English remains the only video for all 23; nothing
was invented to look more complete than it is.

**`video.edu.az` (Azerbaijan's Ministry of Education video portal)**: flagged
during the hunt as a real, non-YouTube Azerbaijani-language source with a
biology section organized by grade (`video.edu.az/ders/17`), plausible for
early anatomy/nervous-system content. Its player is not embeddable the way
YouTube is, and its catalog isn't reachable by a simple page fetch — it needs
someone to click through by grade level in a real browser to find and confirm
individual clip URLs. No clip ids from this source were captured with
enough confidence to list here, so none were used and none are claimed.
This is a legitimate lead for a future pass, not a dead end — per Cursor's
standing rule, any clip found there must be listed as a plain link ("AZ
link, not embeddable pending check"), never written into a `youtubeId`
field.

**QA**: `qa_all_videos.mjs` now also checks (10/10 new checks, 15/15 total)
that `videoAz` is present on exactly these 11 lessons, every one is
well-formed, no `videoAz` id duplicates another `videoAz` id or an English
`video` id, and all 34 lessons kept their English `video` field. Live oembed
liveness isn't re-checked by the script itself (this sandbox's network
policy blocks direct requests to youtube.com, same reason the English pass
never added a live-fetch check either) — it's verified out-of-band and
recorded above; the script prints each `videoAz` id's oembed URL for a quick
manual re-check if one is ever swapped.

- **Rendering** (`brain-bee-lessons.js`): reuses existing site classes
  rather than inventing new ones — `.about-block` for prose, `.atlas-choice-card`
  for both the lesson index grid and the per-part/chapter grouping. A lesson
  with `body: []` renders as `.atlas-choice-card--soon` (visually disabled,
  labelled "Not written yet") and is deliberately **not** an `<a>` tag, so
  there's no dead link to click. A written lesson is a real `<a>` into
  `brain-bee-lessons.html?lesson=<id>`.
- **Practice handoff**: every lesson with a `moduleId` ends in a CTA into
  `practice.html?module=<moduleId>`, so "read, then drill" stays one click.
  A gap lesson (`moduleId: null`) shows an honest "no practice yet" note
  instead of a dead or misleading link.
- **i18n**: identical rule to the rest of the site — every string is
  `{en, az}`, resolved via the same `pick()`/`document.documentElement.lang`
  pattern as `practice.js`, re-rendered on `window.__neyronAfterSetLang`.

## Engine fields → curriculum concepts

| Field | Meaning | Status |
| --- | --- | --- |
| `moduleId` | The **unit** — one fine-grained topic (`cranial-nerves`, `neuron-ap`, `diagnosis`, …), same taxonomy as the old quiz's `sub`/`SUBS` map. Drives weak-area grouping and the setup screen's topic picker. | Populated for every ported item |
| `tags` | Extra labels for filtering (currently `[moduleId, topic]` for MCQs, `[diagnosis, category-slug]` for cases) | Populated but not yet surfaced in the UI |
| `tier` | Exam-stage difficulty, 1/2/3, gates `mock` mode's per-tier sampling | **Real 1/2/3 values, heuristically tagged — see "Real tier/difficulty tags" and Limitations** |
| `difficulty` | Drives `learn` mode's easiest-first ordering | **Real 1/2/3 values, same tagging pass as `tier` — see Limitations** |
| `levels` | Which contest stage an item belongs to (`local`/`national`/`international`) | Set to all three for every item; not yet read anywhere in `buildSession` — inert metadata today, reserved for a future level filter |
| `prompt` / `explanation` / choice `text` / `acceptedAnswers` | `{ en, az }` bilingual objects (or `{ en:[...], az:[...] }` for accepted answers) | **New this session** — the engine as built had none of this; see below |

This moduleId choice is a change from the demo fixtures, which used
`moduleId: "anatomy" | "function" | "disease"` (coarse) with the real topic
in `tags`. Fine-grained `moduleId` was chosen instead because
`accuracyByModule` / `mistakesByModule` group by `moduleId` — "you're weak in
cranial nerves" is an actionable weak-area row; "you're weak in anatomy" is
not. `?module=` in the URL and the setup screen's topic buttons now filter by
this same fine-grained id.

## Content: ported, not invented

`practice-data.js` is now generated, not hand-authored. Every fact and every
EN/AZ string in it already existed and was vetted on the site:

- 300 MCQs ← `brain-bee-questions.js` (`BB_QUESTIONS`)
- 27 diagnosis cases ← `brain-bee-cases.js` (`cases`) merged with the AZ
  overlay in `brain-bee-az.js` (`caseAz`)

`_port_practice_bank.mjs` does the reshape and writes `practice-data.js`.
**Do not hand-edit `practice-data.js`** — it says so in its own header. If a
source bank changes, re-run:

```bash
node _port_practice_bank.mjs          # writes practice-data.js
node _port_practice_bank.mjs --check  # validates only, no write
```

The check step verifies: no duplicate ids, every MCQ's authored answer index
resolves to a real choice, and every prompt/explanation/choice/accepted-answer
has both EN and AZ. It exits non-zero and lists every problem if any of that
fails — treat it like `_bank_stats.mjs`'s gate, run it before trusting a
regenerated bank.

Diagnosis cases keep the real round's rule: no `candidateDisorders` list is
ported, so `practice.js` falls back to the free-typed answer box, matching
"no word bank" for that round. `maxTests` is set to 3 (the real round), not
the demo fixture's 2.

### Real tier/difficulty tags

Every MCQ (both `brain-bee-questions.js` and `brain-bee-gap-questions.js`)
now carries a real `tier`/`difficulty` value (1/2/3, always equal to each
other — see "Honest limitations" for why they're not modeled separately),
tagged by `_tag_difficulty.mjs` and read straight through by
`_port_practice_bank.mjs` instead of the old hard-coded `tier: 1,
difficulty: 1` for every item. This is what `pickMock`'s per-tier sampling
and `learn` mode's easiest-first ordering were built for but had nothing
real to act on.

Method, in short (full rationale is in `_tag_difficulty.mjs`'s header —
read that before re-tagging or adjusting weights): a heuristic score per
question built from how similar its four choices are to each other (the
strongest signal — "central sulcus / lateral sulcus / calcarine sulcus /
parieto-occipital sulcus" is harder to pick apart than "fluent aphasia /
visual acuity / balance and gait / smell identification"), whether the stem
inverts the usual logic (NOT/EXCEPT), whether the explanation hedges or
flags contested science, stem/explanation length, and numeric precision.
Buckets are cut at roughly 45% tier 1 / 35% tier 2 / 20% tier 3 — a pyramid,
not an even split, matching what an intro-heavy exam bank should look like.

One real trap found and corrected while building this: an early version
scored a citation-style signal (a named study or year) as evidence of
difficulty. A quick check showed *zero* year-mentions anywhere in the
300-item main bank versus 82 across the 102-item gap bank — an authorship
difference (the gap bank was written citing sources for verifiability, the
main bank wasn't), not a difficulty difference. Scoring on it would have
systematically over-tiered every gap-chapter question regardless of real
difficulty, so it was dropped. For the same reason, bucketing is done
separately per source bank (each gets its own 45/35/20 split) rather than
on one combined scale, so a difference in writing style between the two
banks can't masquerade as a difference in difficulty.

Re-run after any source bank change:

```bash
node _tag_difficulty.mjs --report   # score/bucket report, no file writes
node _tag_difficulty.mjs            # writes tier/difficulty into both banks
node _port_practice_bank.mjs        # re-run after, to fold the new tags into practice-data.js
```

Diagnosis cases don't have this yet — they still default to tier 1 /
difficulty 1 in `_port_practice_bank.mjs`. Case difficulty would need a
different rubric (presentation typicality, not choice confusability) and
wasn't attempted this pass.

### New content: the gap-chapter bank

`brain-bee-gap-questions.js` (`BB_GAP_QUESTIONS`) is the one deliberate
exception to "ported, not invented." It holds genuinely new, original MCQs
written for the curriculum's gap chapters — content that never existed on
the site before, because those chapters had no practice content to port
from. It is a **separate file from `brain-bee-questions.js` on purpose**:
`brain-bee-quiz.js` (the old, frozen flat quiz) only reads `BB_QUESTIONS`,
so new gap-chapter content added here never touches the frozen 300-item
bank — `_port_practice_bank.mjs` folds both files into `practice-data.js`,
but only the new engine ever sees `BB_GAP_QUESTIONS`. Same rule as the
lesson text: every fact was web-search-verified before writing, every
question is original wording (not copied from Brain Facts or any exam
bank, per `BRAIN-BEE-HANDOFF.md`'s hard rule), and the AZ is
machine-translated, not native-speaker-checked — sources for each batch are
listed in the file's own header comment.

First batch (pilot): 12 MCQs for chapter 16 (Neuroethics), covering the 3Rs
animal-research framework, fMRI lie detection's exclusion from US courts
(*United States v. Semrau*), neuroenhancement drugs, neurolaw and
culpability, neural privacy/mental integrity, disorders-of-consciousness
terminology (locked-in syndrome, vegetative state, minimally conscious
state), DBS personality change, propranolol and memory reconsolidation, and
Chile's 2021 constitutional neurorights amendment.

Second batch: 90 more MCQs (10 each) closing the remaining 9 gap chapters:

- `neural-development` — neurulation timing, Rakic's radial unit hypothesis,
  neural crest derivatives, lissencephaly/LIS1, peak prenatal neurogenesis
  rate, migration errors and epilepsy, radial glia as neural stem cells,
  primary brain vesicles, developmental apoptosis, tangential vs. radial
  interneuron migration.
- `critical-periods` — Hubel & Wiesel's 1981 Nobel, adult vs. juvenile
  monocular deprivation, Lorenz imprinting, songbird vocal learning,
  amblyopia treatment urgency, language deprivation vs. late L2 learning,
  ocular dominance columns, the general definition of a critical period,
  cochlear implant timing, the open-then-close structure of critical
  periods.
- `neuroplasticity` — Bliss & Lømo's 1973 discovery of LTP, Hebb's 1949
  postulate, Maguire's London taxi driver study, Merzenich's cortical
  remapping work, Ramachandran's mirror-box work on phantom limb, LTD,
  plasticity-driven stroke rehabilitation, the scales plasticity operates
  at, adult vs. critical-period plasticity magnitude, NMDA receptors in LTP
  induction.
- `language-brain` — Broca's aphasia, Wernicke's aphasia, conduction
  aphasia and the arcuate fasciculus, the ~95% left-lateralization rate in
  right-handers, Sperry's split-brain work and 1981 Nobel, FOXP2 and the KE
  family, lateralization of sign language, left-handers' more variable
  lateralization, aphasia vs. dysarthria, and the anatomical locations of
  Broca's and Wernicke's areas.
- `stress` — the HPA axis hormonal sequence, Cannon's "fight or flight,"
  Selye's General Adaptation Syndrome, Sapolsky's baboon/hippocampal work,
  McEwen's allostatic load, cortisol negative feedback, HPA vs. SAM
  response speed, chronic-stress effects, the adrenal gland's dual role,
  and framing the stress response as adaptive-but-costly under chronic
  activation.
- `aging` — the adult human hippocampal neurogenesis debate (explicitly
  framed as contested — Eriksson et al. 1998 vs. Sorrells et al. 2018 vs.
  Boldrini et al. 2018/Moreno-Jiménez et al. 2019, not presented as
  settled), Cattell's fluid/crystallized intelligence, Stern's cognitive
  reserve, the definition of MCI, white- vs. gray-matter aging rates,
  lifestyle factors, when brain volume decline typically begins, why
  normal-vs-disease distinction matters clinically, Eriksson's BrdU
  methodology, and crystallized knowledge's relative stability.
- `kinds-of-research` — the fMRI spatial/temporal tradeoff, the EEG
  temporal/spatial tradeoff, lesion studies, the invasiveness of
  single-unit recording, PET/FDG mechanism, Neher & Sakmann's 1991 Nobel
  for patch-clamp, optogenetics (opsins, credited across the Deisseroth/
  Boyden/Miesenböck labs rather than a single inventor), combining methods
  to establish necessity vs. sufficiency, the general invasiveness-vs-
  precision tradeoff, and EEG's use case for millisecond timing.
- `addiction` — the mesolimbic VTA→nucleus accumbens pathway, the
  definition of tolerance, the prefrontal cortex's role in impulse control,
  the amygdala's role in craving and relapse, the opioid mechanism (mu-
  receptor-mediated disinhibition), cocaine vs. amphetamine's different
  transporter mechanisms, nicotine's action on nicotinic receptors, the
  ~40-60% genetic-risk estimate (NIDA-cited), addiction as a disease-model
  framing, and the treatment implications of stress/environmental relapse
  triggers.
- `potential-therapies` — DBS's mechanism, DBS's common targets (STN/GPi),
  Zolgensma as an AAV9 gene therapy, the BrainGate/Hochberg et al. 2012
  Nature robotic-arm study, the integration challenge facing stem cell
  therapy, TMS's 2008 FDA approval, the delivery hurdle facing gene
  therapy, the general definition of neuroprosthetics/BCIs, DBS being
  explored for depression, and framing stem cell therapy as the most
  experimental of the therapies covered.

Every fact in both batches (102 questions total) was web-search-verified
before writing — see the file's own header comment for the full source
list per batch. `brain-bee-lessons-data.js`'s corresponding 10 lessons all
moved from `moduleId: null` to their real slugs.

**Still needed for these new modules to look finished, not just function**:
`practice-engine.js`'s `MODULE_LABELS` (and `CURRICULUM_MODULE_ORDER` /
`CURRICULUM_LESSONS`, if those are what drive the setup screen's curriculum
sort) need entries for all 10 new moduleIds (`neuroethics`,
`neural-development`, `critical-periods`, `neuroplasticity`,
`language-brain`, `stress`, `aging`, `kinds-of-research`, `addiction`,
`potential-therapies`) — deliberately not added here to avoid touching a
file mid-integration-work; each currently falls back to showing its raw id
as its own label, which works but isn't polished.

## What changed in the engine this session

The engine as handed off could not have shown this content correctly even
once it existed — it had no language layer:

- `practice.js` / `practice-mistakes.js` gained a `pick()` / `localize*()`
  layer that resolves `{en,az}` fields to the active UI language (reading
  `document.documentElement.lang`, same as the old quiz) and re-renders on
  `window.__neyronAfterSetLang`, matching site convention. Plain strings
  (the `?demo=1` fixtures) still work unchanged — `pick()` passes them
  through.
- Grading always accepts **both** languages' spellings regardless of which
  one the interface is showing, same rule as `BB.answerMatches` in the old
  engine.
- MCQ choice display order is now reshuffled per question (`resetItem`,
  cached in `choiceOrder` so it doesn't jump mid-question) — correctness is
  checked by the choice's stable `id`, not its screen position. The old
  engine had this (`BB.makeItem`); the new one didn't, which matters more
  here than in a flat quiz because SM-2 review means the *same* question
  resurfaces on a later date — a fixed position would let a student
  memorise "always B" instead of the content.
- Module names in the setup screen and the mistake log now show a real
  label (`MODULE_LABELS` / `moduleLabel()` in `practice-engine.js`, all 15
  existing topics plus `diagnosis`) instead of the raw `moduleId` string.
- MCQ feedback shows the same optional "see in 3D →" link the old quiz has,
  when a ported item carries one (`q.see`).
- The diagnosis round now shows a **Presentation** panel alongside History
  (the real round's cases always had both; the engine only wired History).

## Current state

- 429 questions in `practice-data.js`: 300 original MCQ (tier 1, all
  topics) + 102 new gap-chapter MCQ (tier 1, 10 modules) + 27 diagnosis.
- All bilingual, all gated by `_port_practice_bank.mjs --check`.
- `learn` / `review` / `mixed` / `mock` all have real content to draw from
  for the first time. `review` and `mixed` won't show anything until a
  student has actually attempted items (SM-2 state starts empty).
- Mistake log groups by the same 15-topic + diagnosis taxonomy as the old
  quiz's `SUBS` map.
- `image_id` question type still has zero real content (only the demo
  hotspot fixture) — nothing in the source banks maps to it.
- All 34 lessons are written and wired into the main prep flow: the hub
  leads with "Start here → Lessons" ahead of practice, the setup screen
  sorts topics by curriculum order (`CURRICULUM_MODULE_ORDER` in
  `practice-engine.js`) instead of alphabetically, and both the setup
  screen and the mistake log show "Read the lesson first →" links into the
  matching chapter. Gap-chapter lessons and diagnosis lessons that share
  the 27-case pool say so honestly rather than showing a fake drill button.
- Cursor closed the "two practice paths competing on the hub" gap from the
  last review (`brain-bee.html`, not touched by any Claude pass — see
  "Cursor-owned files" implicit throughout this doc). New hub order: (1) a
  single full-width "Start here → Lessons" card, copy noting every chapter
  now has a practice pool; (2) practice — timed practice and the mistake
  log, copy referencing the new tiers ("Learn starts easier, mock draws
  from all three"); (3) the IBB world sections (3D identification, written
  test, diagnosis, live judging) framed as contest formats, not a second
  syllabus; (4) the old flat 300-item Anatomy/Function quiz, kept (not
  deleted) at `#bb-quiz`/`#bb-practice` but demoted to an "extra, not the
  curriculum path" card after the IBB sections — the Function filter still
  works; (5) official resources. The old three-card Anatomy/Function/
  Disease "Study map" is gone.
- One factual correction made post-review: lesson 1.1 originally said glia
  "outnumber" neurons (the old ~10:1 estimate); fixed to reflect the
  widely-cited 2009 stereological count putting both at roughly 86 billion
  — Cursor caught this while wiring the UI and flagged it rather than
  editing lesson text itself.
- Self-review pass (AI-assisted, web-search-verified, not a substitute for
  SME/native-speaker review — see "Honest limitations" below) covered all
  34 lessons and found two more factual errors, both fixed in EN and AZ:
  lesson 1.6 (`cortex-lobes`) said the cortex has "roughly 1.5 square
  meters" of surface area — checked sources (WebMD, NCBI Bookshelf) put it
  at roughly 2,000–2,500 cm² (about a quarter of a square meter), off by
  6–7x; lesson 1.12 (`cerebellum`) said it "contains more than half of all
  [the brain's] neurons" — the same 2009 stereological count used for the
  glia fix puts it at roughly 80% (about 69 of 86 billion), several times
  more than the cerebral cortex, not just over half. One other checkable
  claim (hippocampal neurogenesis in the aging lesson) was verified against
  a 2026 paper and left as-is — it already matched current consensus. No
  other clear factual errors surfaced in a full read of all 34 lessons, but
  this was one AI's pass with search verification on checkable numeric
  claims, not exhaustive fact-checking of every sentence.
- **All 10 gap chapters are now closed.** 102 original, web-search-verified
  MCQs across a new source bank (`brain-bee-gap-questions.js`) kept
  separate from the frozen 300-question bank — see "New content: the
  gap-chapter bank" above. Piloted with chapter 16 (Neuroethics, 12
  questions) first, then the other 9 (2.1–2.3, 4.2, 7, 8, 9, 11, 15; 10
  questions each) once the pilot's format was validated. Every one of the
  34 lessons in `brain-bee-lessons-data.js` now has a non-null `moduleId`
  and ends in a real "practice this" link — zero content gaps remain in
  the practice layer. Verified end-to-end with a Playwright smoke test
  driving each of the 9 new modules through the actual `practice.html` UI
  (not just structural validation of the source bank).
- **All 34 lessons now have a verified reference video** (see "Reference
  videos, all 34 lessons" above) — up from 3. Every id was confirmed real
  via YouTube's oembed API twice (once by the sourcing pass, once
  independently before writing), so none are guessed. Lesson QA suite
  extended with a dedicated video-embed test (`qa_all_videos.mjs`) spot-checking
  both old and new videos actually render in the browser with the right
  embed URL; full lesson suite re-run clean (18/18). (`qa_all_videos.mjs`
  later grew `videoAz` checks too — see the current 15/15 total below.)
- **A review packet exists for the still-missing SME + native-AZ pass**
  (`Brain_Bee_Review_Packet.docx`, delivered to Omar, not committed into
  the site since it's a working document for a future reviewer, not site
  content). It doesn't ask anyone to re-read all 34 lessons and 402
  questions — it flags the 8 lesson paragraphs and 46 questions (about
  12% of the content) that carry a precise number, a drug/clinical claim,
  a legal citation, a cited date, or hedged/contested-science language,
  with English and Azerbaijani shown side by side and blank columns for a
  fact-checker and a native-speaker reviewer. This doesn't replace a full
  review — it triages where a reviewer's limited time matters most.
- **11 of 34 lessons now also have a genuine Azerbaijani-language reference
  video** (`videoAz`, additive alongside the existing English `video` field
  — see "Azerbaijani reference videos" above for the full hit list,
  rejections, and method). Sourced via three research passes across all 34
  lessons, each id independently re-verified via oembed before writing, same
  two-pass discipline as the English videos. One real candidate
  (`cortex-lobes`) was found but rejected for being a formal university
  lecture rather than a short explainer. The other 23 lessons genuinely have
  no usable Azerbaijani video available — not filled in to look complete.
  `qa_all_videos.mjs` extended accordingly (15/15); full lesson suite
  re-run clean (18/18).
- **All 402 MCQs now have real tier/difficulty tags** (180 tier 1 / 141
  tier 2 / 81 tier 3), replacing the uniform `tier: 1, difficulty: 1` every
  ported item previously got. Tagged by a new script, `_tag_difficulty.mjs`
  — see "Real tier/difficulty tags" above for the method and a bias it
  found and corrected. Verified with a new logic-level test
  (`qa_tiering.mjs`, 7/7) confirming this isn't inert metadata: `mock`
  sessions now actually draw from all 3 tiers instead of only tier 1, and
  `learn` sessions now actually order easiest-to-hardest instead of every
  item tying at the same difficulty. Existing regression suites (lessons
  18/18, practice engine 14/14) re-run clean.

## Honest limitations — do not paper over these

- **Tiering is real but heuristic, not ground truth.** All 402 MCQs now
  have `tier`/`difficulty` in {1,2,3} (see "Real tier/difficulty tags"),
  but the tags come from a content-based scoring heuristic (choice
  similarity, negation, hedge language, length, numeric precision), not
  from what students actually get wrong. It's a defensible first pass —
  spot-checked against intuition on both banks, and one authorship-style
  bias (citation density) was caught and removed before tagging — but a
  question judged "tier 1" by this heuristic isn't guaranteed easy for a
  real student, especially where the underlying content is niche or
  advanced but happens to have easily-eliminated distractors (e.g. most of
  the neuroethics module scored tier 1 by this method, even though the
  subject matter itself — legal cases, contested science — reads as
  advanced). The 27 diagnosis cases still default to tier 1 / difficulty 1
  — they weren't tagged this pass; see "Real tier/difficulty tags" for
  why. Re-tiering from real attempt data, once it exists, should supersede
  this heuristic rather than be reconciled against it.
- **`levels` is inert.** Every item claims all three contest levels; nothing
  in `buildSession` filters by it. Wire a level filter or drop the field —
  don't leave it looking functional when it isn't.
- **Lesson layer is 34/34 written and self-reviewed once, but still not
  SME- or native-speaker-checked.** `brain-bee-lessons.html`/`.js`/
  `-data.js` render real bilingual text for every lesson in the curriculum
  table, each with a "practice this" CTA where a `moduleId` exists and an
  honest "no practice yet" note where it doesn't. All 34 lessons now have a
  verified `video` field (see "Reference videos, all 34 lessons" below), and
  11 of 34 also have a genuine Azerbaijani `videoAz` (see "Azerbaijani
  reference videos" below) — every id, in both fields, was confirmed real
  via YouTube's oembed API both by the research pass and independently by a
  second pass before being written in, never guessed. The lesson text was drafted in one
  AI-assisted pass, then given a second AI-assisted pass that web-searched
  and verified every checkable numeric/factual claim (see "Current state"
  above for what that found and fixed). That's real signal, not nothing —
  but it is still not the same as a subject-matter expert reading the text,
  and the Azerbaijani has never been checked by a native speaker. Treat
  facts and terminology as verified-where-checkable-and-checked, and
  translations as a strong first draft, not final-checked.
- **`image_id` has no real content.** Would need atlas plates or diagrams
  turned into hotspot coordinates — not attempted this session.
- **No visual curriculum/skill-tree.** Cursor collapsed the hub down to one
  obvious door (Lessons first, then practice, then the IBB contest-format
  sections, with the old flat Anatomy/Function/Disease quiz demoted to an
  "extra, not the curriculum path" card after IBB rather than competing
  with the curriculum) — see the note below this list for the full new
  hub order. What's still missing is a page that shows the 16 chapters as
  a course outline with per-unit mastery, not just a single door into
  Lessons. The setup screen's topic picker (with real labels) is the
  closest thing today.
- **Diagnosis low-yield styling didn't carry over.** The old round
  (`brain-bee-diagnosis.js`) visually distinguishes a test result that
  starts with "Normal"/"Unremarkable" or contains "not indicated" /
  "göstəriş yoxdur" / "diqqətəlayiq deyil". `practice.js`'s diagnosis
  renderer doesn't do this yet — same information is present in the ported
  data, just not styled.

## Azerbaijani / SME review prep

`BRAIN-BEE-REVIEW-PREP.md` is the working file for the still-open native
Azerbaijani and subject-matter-expert review flagged throughout this doc —
flags only, nothing applied to lesson or question source. Part 1
(terminology lock: a 13-row glossary of genuine EN↔AZ terminology
collisions across all three content files, methodology and false positives
documented) is done; Parts 2 (rebuilt content-risk packet) and 3 (fresh
search-verification pass on that packet) are queued behind it. This is not
the review itself — it's what makes an hour of a real reviewer's time count.

## Next steps, in rough priority order

1. All 402 MCQs now have real `tier`/`difficulty` values from a content-
   based heuristic (`_tag_difficulty.mjs`) rather than a uniform guess — see
   "Real tier/difficulty tags" and its Honest limitations entry. The
   heuristic is a first pass, not ground truth: get real students using
   `learn`/`mixed`/`mock` mode and let mistake-log data accumulate, then
   re-tier from what they actually get stuck on, superseding the heuristic
   rather than reconciling against it.
2. All 34 lessons are written, and a second AI-assisted pass has
   web-search-verified every checkable numeric/factual claim (two errors
   found and fixed — see "Current state"). Highest-value remaining lesson
   work: a subject-matter expert reading the text for accuracy beyond what
   search-verification can catch, and a native Azerbaijani speaker checking
   the translations — neither has happened yet, though `Brain_Bee_Review_Packet.docx`
   (see "Current state") now exists to make that pass efficient whenever
   someone is available to do it. Video sourcing is **done** — all 34
   lessons have a verified English reference video (see "Reference videos,
   all 34 lessons"), up from 3, and 11 of 34 also have a genuine Azerbaijani
   one (see "Azerbaijani reference videos") — the other 23 genuinely have no
   usable Azerbaijani video available, not a gap left to fill. Worth a
   future look: `video.edu.az` (Azerbaijan's Ministry of Education portal,
   flagged but not itemized this pass — see that section) as a possible
   source for the early-anatomy lessons still missing an AZ video. Gap-chapter MCQ authoring is **done** — all 10 gap chapters (2.1–2.3,
   4.2, 7, 8, 9, 11, 15, 16) now have original, verified MCQs in
   `brain-bee-gap-questions.js` (see "New content: the gap-chapter bank"),
   so every lesson ends in real practice, not a "no practice yet" note.
   The `MODULE_LABELS` / `CURRICULUM_MODULE_ORDER` / `CURRICULUM_LESSONS`
   follow-up flagged earlier is done — all 10 new module ids have real
   EN/AZ labels and a curriculum-order slot now.
3. Decide whether `levels` becomes a real filter (e.g. a "which stage are
   you prepping for" toggle on the setup screen) or gets removed.
4. A curriculum/skill-tree view on the hub, listing the 16 chapters above
   in order with per-unit progress, once there's more than one lesson to
   show it across.
5. Low-yield test styling in the diagnosis round, and `image_id` content if
   atlas plates get prepared for it.

## Hard rules (unchanged, apply here too)

- Every new string needs AZ — this includes anything added to
  `practice-*.js`, not just ported content.
- Don't hand-edit `practice-data.js`; edit a source bank and re-run the port
  script, or add a new ported source and extend
  `_port_practice_bank.mjs`.
- `tier`/`difficulty` are now real (see "Real tier/difficulty tags"), but
  they're a documented heuristic, not measured student difficulty — don't
  present them as more authoritative than that, and don't hand-tune
  `_tag_difficulty.mjs`'s thresholds by eye to make a particular module's
  spread "look right." Re-tier from real attempt data when it exists;
  don't fabricate further differentiation in the meantime.
