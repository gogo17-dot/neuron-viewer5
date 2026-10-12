/**
 * Assigns real tier/difficulty values to every MCQ in the bank, replacing
 * the uniform tier:1/difficulty:1 that _port_practice_bank.mjs has hard-
 * coded since the engine had no per-item difficulty signal to draw on.
 *
 * Method (documented so it can be second-guessed and improved, not treated
 * as ground truth): a heuristic score per question, built from proxies for
 * a rough three-level rubric —
 *
 *   1 (recall)      — name/identify a single directly-stated fact; wrong
 *                      choices are easy to eliminate on general knowledge.
 *   2 (application)  — connect two related facts, a mechanism, or a
 *                      comparison between genuinely confusable options.
 *   3 (analysis)     — nuance, hedged/contested science, inverse logic
 *                      (NOT/EXCEPT), or fine-grained discrimination between
 *                      very similar distractors.
 *
 * Signals used as proxies for that rubric (none of them perfect alone,
 * combined into one score):
 *   - choice similarity: average pairwise word-overlap across the 4
 *     choices. Distractors that share most of their vocabulary with the
 *     correct answer are harder to eliminate than obviously-unrelated ones
 *     (compare "central sulcus / lateral sulcus / calcarine sulcus /
 *     parieto-occipital sulcus" against "fluent aphasia / visual acuity /
 *     balance and gait / smell identification").
 *   - inverse logic: stem asks for the false/excluded option (NOT, EXCEPT,
 *     LEAST likely) — this flips the usual elimination strategy and is
 *     harder regardless of the underlying fact.
 *   - hedge/nuance language in the explanation ("though", "still being
 *     worked out", "current evidence suggests", "classically thought",
 *     "debate") — a marker that the fact itself is contested, recently
 *     revised, or more nuanced than a flat definition.
 *   - stem and explanation length — longer, multi-clause prompts and
 *     justifications correlate with more reasoning steps.
 *   - numeric precision — an exact percentage, count, or unit that must be
 *     recalled precisely, not just a rough concept.
 *
 * Deliberately NOT used: citing a year or a named study. It looked like a
 * good difficulty proxy until a check showed *zero* year-mentions anywhere
 * in the 300-item main bank versus 82 across the 102-item gap bank — that's
 * an authorship-style difference (the gap bank was written citing sources
 * for verifiability), not a difficulty difference, and scoring on it would
 * have systematically over-tiered every gap-chapter question regardless of
 * real difficulty. Bucketing is also done separately per source bank
 * (below) rather than on one global scale, for the same reason: it corrects
 * for any remaining scale difference between the two writing styles while
 * still preserving real between-module difficulty variation within each
 * bank.
 *
 * This is a first pass, not a substitute for real difficulty data (what
 * students actually get wrong). See BRAIN-BEE-CURRICULUM.md's "Honest
 * limitations" for the caveat, and _bank_stats.mjs-style: re-tag from real
 * attempt data once it exists, don't hand-tune thresholds further by eye.
 *
 * Usage: node _tag_difficulty.mjs           # writes tier/difficulty into
 *                                            # brain-bee-questions.js and
 *                                            # brain-bee-gap-questions.js
 *        node _tag_difficulty.mjs --report  # score/bucket report only,
 *                                            # no file writes
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const reportOnly = process.argv.includes("--report");

function loadVar(file, varName) {
  const src = readFileSync(join(here, file), "utf8");
  return new Function(src + `; return ${varName};`)();
}

const STOPWORDS = new Set(
  "a an the of in on at to for with and or is are was were be been being this that these those which what who whom its it as by from into than then most least also not does do did".split(
    " ",
  ),
);

function words(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[’'"“”.,:;!?()\/]/g, " ")
    .split(/\s+/)
    .filter((w) => w && !STOPWORDS.has(w));
}

function jaccard(a, b) {
  const sa = new Set(a);
  const sb = new Set(b);
  if (!sa.size || !sb.size) return 0;
  let inter = 0;
  for (const w of sa) if (sb.has(w)) inter++;
  return inter / (sa.size + sb.size - inter);
}

function avgPairwiseSimilarity(choiceWordLists) {
  let sum = 0;
  let n = 0;
  for (let i = 0; i < choiceWordLists.length; i++) {
    for (let j = i + 1; j < choiceWordLists.length; j++) {
      sum += jaccard(choiceWordLists[i], choiceWordLists[j]);
      n++;
    }
  }
  return n ? sum / n : 0;
}

const NEGATION_RE = /\b(NOT|EXCEPT)\b|\bleast likely\b/i;
const HEDGE_RE =
  /\b(though|however|debate|contested|controvers|proposed|still being (worked out|studied|debated)|current(ly)? (thought|understood)|evidence suggests|not fully understood|some researchers|more recent(ly)?|classically thought|revised|remains? unclear|is still unclear)\b/i;
const NUMERIC_RE = /\b\d+(\.\d+)?\s?(%|percent|ms|mm|cm|mL|Hz|billion|million)\b/i;

function scoreQuestion(q) {
  const stem = q.q?.en || "";
  const why = q.why?.en || "";
  const choiceWordLists = (q.choices || []).map((c) => words(c.en));

  let score = 0;
  const sim = avgPairwiseSimilarity(choiceWordLists);
  score += sim * 3; // confusable distractors are the strongest signal

  if (NEGATION_RE.test(stem)) score += 2;
  if (HEDGE_RE.test(why)) score += 0.5; // weak weight — biased toward whoever's writing style hedges more
  if (NUMERIC_RE.test(stem) || NUMERIC_RE.test(why) || (q.choices || []).some((c) => NUMERIC_RE.test(c.en))) score += 1;

  const stemWords = words(stem).length;
  if (stemWords > 25) score += 1;
  if (stemWords > 40) score += 1;

  const whyWords = words(why).length;
  if (whyWords > 60) score += 1;
  if (whyWords > 100) score += 1;

  return { score, sim };
}

function bucketize(scored) {
  // scored: [{id, score}], sorted ascending by score. Tercile-ish split,
  // biased toward more easy/mid than hard (a first-time exam bank should
  // look like a pyramid, not a uniform spread).
  const sorted = [...scored].sort((a, b) => a.score - b.score);
  const n = sorted.length;
  const cut1 = Math.floor(n * 0.45); // bottom 45% -> tier 1
  const cut2 = Math.floor(n * 0.8); // next 35% -> tier 2, top 20% -> tier 3
  const byId = new Map();
  sorted.forEach((row, i) => {
    const level = i < cut1 ? 1 : i < cut2 ? 2 : 3;
    byId.set(row.id, level);
  });
  return byId;
}

function tagBank(bank) {
  const scored = bank.map((q) => ({ id: q.id, ...scoreQuestion(q) }));
  const levelById = bucketize(scored);
  return { scored, levelById };
}

function report(name, bank, scored, levelById) {
  const byModuleLevel = new Map();
  for (const q of bank) {
    const level = levelById.get(q.id);
    const key = q.sub;
    const row = byModuleLevel.get(key) || { 1: 0, 2: 0, 3: 0 };
    row[level]++;
    byModuleLevel.set(key, row);
  }
  console.log(`\n=== ${name} (${bank.length} items) ===`);
  const counts = { 1: 0, 2: 0, 3: 0 };
  for (const q of bank) counts[levelById.get(q.id)]++;
  console.log(`Overall: tier1=${counts[1]}  tier2=${counts[2]}  tier3=${counts[3]}`);
  for (const [mod, row] of [...byModuleLevel.entries()].sort()) {
    console.log(`  ${mod.padEnd(24)} 1:${row[1]}  2:${row[2]}  3:${row[3]}`);
  }
}

function insertTierDifficulty(file, levelById) {
  let text = readFileSync(join(here, file), "utf8");
  let insertions = 0;
  // Source files use CRLF line endings — capture the actual newline used
  // (nl) and echo it back rather than assuming \n, or every inserted line
  // (and the file as a whole) ends up with mixed line endings.
  text = text.replace(
    /id: "([^"]+)",(\r?\n)(\s+)topic: "([^"]+)",\r?\n\s+sub: "([^"]+)",\r?\n/g,
    (match, id, nl, indent, topic, sub) => {
      const level = levelById.get(id);
      if (level == null) return match; // leave untouched, will be caught by verification
      insertions++;
      return `id: "${id}",${nl}${indent}topic: "${topic}",${nl}${indent}sub: "${sub}",${nl}${indent}tier: ${level},${nl}${indent}difficulty: ${level},${nl}`;
    },
  );
  return { text, insertions };
}

function main() {
  const mainBank = loadVar("brain-bee-questions.js", "BB_QUESTIONS");
  const gapBank = loadVar("brain-bee-gap-questions.js", "BB_GAP_QUESTIONS");

  // Bucketed separately per source bank, not on one combined scale — see
  // the file header for why (the two banks' scores aren't on the same
  // scale due to writing-style differences, not real difficulty).
  const mainScored = mainBank.map((q) => ({ id: q.id, ...scoreQuestion(q) }));
  const gapScored = gapBank.map((q) => ({ id: q.id, ...scoreQuestion(q) }));
  const mainLevelById = bucketize(mainScored);
  const gapLevelById = bucketize(gapScored);
  const levelById = new Map([...mainLevelById, ...gapLevelById]);

  report("brain-bee-questions.js (main bank)", mainBank, mainScored, mainLevelById);
  report("brain-bee-gap-questions.js (gap bank)", gapBank, gapScored, gapLevelById);

  if (reportOnly) return;

  const { text: mainText, insertions: mainIns } = insertTierDifficulty("brain-bee-questions.js", levelById);
  const { text: gapText, insertions: gapIns } = insertTierDifficulty("brain-bee-gap-questions.js", levelById);

  if (mainIns !== mainBank.length) {
    console.error(`ABORT: only tagged ${mainIns}/${mainBank.length} in brain-bee-questions.js`);
    process.exitCode = 1;
    return;
  }
  if (gapIns !== gapBank.length) {
    console.error(`ABORT: only tagged ${gapIns}/${gapBank.length} in brain-bee-gap-questions.js`);
    process.exitCode = 1;
    return;
  }

  writeFileSync(join(here, "brain-bee-questions.js"), mainText);
  writeFileSync(join(here, "brain-bee-gap-questions.js"), gapText);
  console.log(`\nWrote tier/difficulty into brain-bee-questions.js (${mainIns}) and brain-bee-gap-questions.js (${gapIns}).`);
}

main();
