/**
 * Ports the vetted, bilingual content that already exists on the site into
 * the new practice-engine's Question / DiagnosisCase shapes, and writes the
 * result to practice-data.js.
 *
 * This is mostly a *reshape*, not new authoring: every fact, EN string and
 * AZ string from brain-bee-questions.js (300 MCQs) and brain-bee-cases.js +
 * brain-bee-az.js (27 diagnosis cases) already existed and was vetted on
 * the site. If those source banks change, re-run this script rather than
 * hand-editing practice-data.js.
 *
 * One exception: brain-bee-gap-questions.js (BB_GAP_QUESTIONS) is genuinely
 * new, original content — see that file's header. It's folded in here
 * rather than into brain-bee-questions.js specifically so the frozen
 * five-mode bank (BRAIN-BEE-HANDOFF.md's "closed to new authoring" rule)
 * never sees it: brain-bee-quiz.js (the old flat quiz) only reads
 * BB_QUESTIONS, so new gap-chapter content only ever reaches this engine.
 *
 * Tier/difficulty: ported straight from each source question's own tier/
 * difficulty fields (see _tag_difficulty.mjs, which tags brain-bee-
 * questions.js and brain-bee-gap-questions.js — a heuristic first pass,
 * not real student-attempt data; see BRAIN-BEE-CURRICULUM.md's "Honest
 * limitations"). Diagnosis cases don't carry this signal yet, so they still
 * default to tier: 1 / difficulty: 1 below.
 *
 * Usage: node _port_practice_bank.mjs [--check]
 *   --check   validate only, do not write practice-data.js
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const checkOnly = process.argv.includes("--check");

function loadVar(file, varName) {
  const src = readFileSync(join(here, file), "utf8");
  return new Function(src + `; return ${varName};`)();
}

async function loadEsm(file) {
  return import(join(here, file));
}

const LETTERS = ["a", "b", "c", "d", "e", "f"];

function portQuestions(bank) {
  const seen = new Set();
  const out = [];
  const problems = [];
  for (const q of bank) {
    if (seen.has(q.id)) problems.push(`duplicate id: ${q.id}`);
    seen.add(q.id);
    const choices = q.choices.map((c, i) => ({ id: LETTERS[i], text: { en: c.en, az: c.az } }));
    const correctChoiceId = LETTERS[q.answer];
    if (!choices.some((c) => c.id === correctChoiceId)) problems.push(`${q.id}: answer index out of range`);
    if (!q.q?.en || !q.q?.az) problems.push(`${q.id}: missing prompt EN/AZ`);
    if (!q.why?.en || !q.why?.az) problems.push(`${q.id}: missing explanation EN/AZ`);
    choices.forEach((c, i) => {
      if (!c.text.en || !c.text.az) problems.push(`${q.id}: choice ${i} missing EN/AZ`);
    });
    if (typeof q.tier !== "number" || typeof q.difficulty !== "number") {
      problems.push(`${q.id}: missing tier/difficulty (run _tag_difficulty.mjs)`);
    }
    out.push({
      id: q.id,
      moduleId: q.sub,
      tier: q.tier ?? 1,
      levels: ["local", "national", "international"],
      difficulty: q.difficulty ?? 1,
      type: "mcq",
      timeLimitSeconds: 45,
      tags: [q.sub, q.topic],
      prompt: { en: q.q.en, az: q.q.az },
      explanation: { en: q.why.en, az: q.why.az },
      choices,
      correctChoiceId,
      ...(q.see ? { see: { href: q.see.href, en: q.see.en, az: q.see.az } } : {}),
    });
  }
  return { out, problems };
}

function testRow(id, name, en, az) {
  return { id, name: { en: name.en, az: name.az }, result: { en: en ?? "", az: az ?? "" } };
}

const TEST_NAMES = {
  ct: { en: "CT", az: "KT" },
  pet_spect: { en: "PET / SPECT", az: "PET / SPECT" },
  mri: { en: "MRI", az: "MRT" },
  eeg: { en: "EEG", az: "EEQ" },
  ncs: { en: "Nerve conduction studies", az: "Sinir keçiriciliyi müayinəsi" },
  cognitive: { en: "Cognitive testing", az: "Koqnitiv test" },
  blood: { en: "Blood", az: "Qan" },
  csf: { en: "CSF", az: "BOS" },
};

function portCases(cases, caseAz) {
  const questions = [];
  const diagnosisCases = [];
  const problems = [];
  for (const c of cases) {
    const az = caseAz[c.id];
    if (!az) {
      problems.push(`${c.id}: no AZ entry in brain-bee-az.js`);
      continue;
    }
    const availableTests = Object.keys(TEST_NAMES).map((key) =>
      testRow(key, TEST_NAMES[key], c.tests[key], az.tests?.[key]),
    );
    az.tests &&
      Object.keys(TEST_NAMES).forEach((key) => {
        if (!az.tests[key]) problems.push(`${c.id}: AZ test ${key} missing`);
      });
    if (!az.history) problems.push(`${c.id}: AZ history missing`);
    if (!az.explanation) problems.push(`${c.id}: AZ explanation missing`);
    diagnosisCases.push({
      id: c.id,
      history: { en: c.history, az: az.history },
      presentation: { en: c.presentation, az: az.presentation || "" },
      availableTests,
      maxTests: 3,
      // No candidateDisorders on purpose — the real round has no word bank,
      // so the UI falls back to a typed free-text answer (see practice.js).
      correctDisorder: { en: c.answer, az: az.answer },
      explanation: { en: c.explanation, az: az.explanation },
    });
    questions.push({
      id: c.id,
      moduleId: "diagnosis",
      tier: 1,
      levels: ["local", "national", "international"],
      difficulty: 1,
      type: "diagnosis",
      timeLimitSeconds: 300,
      tags: ["diagnosis", (c.category || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")].filter(
        Boolean,
      ),
      prompt: {
        en: "Read the history, order tests, then name the disorder.",
        az: "Tarixçəni oxuyun, testlər sifariş edin, sonra pozğunluğu adlandırın.",
      },
      explanation: { en: c.explanation, az: az.explanation },
      acceptedAnswers: {
        en: [c.answer, ...(c.acceptedAnswers || [])],
        az: [az.answer, ...(az.acceptedAnswers || [])],
      },
    });
  }
  return { questions, diagnosisCases, problems };
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  const padIn = "  ".repeat(indent + 1);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    return "[\n" + value.map((v) => padIn + serialize(v, indent + 1)).join(",\n") + ",\n" + pad + "]";
  }
  if (value && typeof value === "object") {
    const keys = Object.keys(value);
    if (!keys.length) return "{}";
    return (
      "{\n" +
      keys.map((k) => padIn + k + ": " + serialize(value[k], indent + 1)).join(",\n") +
      ",\n" +
      pad +
      "}"
    );
  }
  return JSON.stringify(value ?? "");
}

async function main() {
  const bank = loadVar("brain-bee-questions.js", "BB_QUESTIONS");
  const { out: mcqQuestions, problems: mcqProblems } = portQuestions(bank);

  const gapBank = loadVar("brain-bee-gap-questions.js", "BB_GAP_QUESTIONS");
  const { out: gapQuestions, problems: gapProblems } = portQuestions(gapBank);

  const casesMod = await loadEsm("brain-bee-cases.js");
  const azMod = await loadEsm("brain-bee-az.js");
  const { questions: dxQuestions, diagnosisCases, problems: dxProblems } = portCases(casesMod.cases, azMod.caseAz);

  const problems = [...mcqProblems, ...gapProblems, ...dxProblems];
  const allIds = new Set();
  for (const q of [...mcqQuestions, ...gapQuestions, ...dxQuestions]) {
    if (allIds.has(q.id)) problems.push(`duplicate id across banks: ${q.id}`);
    allIds.add(q.id);
  }
  console.log(`MCQs ported: ${mcqQuestions.length} (source: ${bank.length})`);
  console.log(`Gap-chapter MCQs ported: ${gapQuestions.length} (source: ${gapBank.length})`);
  console.log(`Diagnosis cases ported: ${diagnosisCases.length} (source: ${casesMod.cases.length})`);
  const byModule = new Map();
  for (const q of [...mcqQuestions, ...gapQuestions, ...dxQuestions]) byModule.set(q.moduleId, (byModule.get(q.moduleId) || 0) + 1);
  console.log("By module:", [...byModule.entries()].map(([k, v]) => `${k}:${v}`).join("  "));

  if (problems.length) {
    console.error(`\n${problems.length} problem(s):`);
    problems.forEach((p) => console.error("  - " + p));
    process.exitCode = 1;
    return;
  }
  console.log("\nAll ported items have EN + AZ, ids are unique, every MCQ answer resolves. (rotation safe: order inherited verbatim from the source bank, not re-derived here)");

  if (checkOnly) return;

  const allQuestions = [...mcqQuestions, ...gapQuestions, ...dxQuestions];
  const header =
    "/**\n" +
    " * GENERATED FILE — do not hand-edit. Ported from brain-bee-questions.js,\n" +
    " * brain-bee-gap-questions.js, and brain-bee-cases.js + brain-bee-az.js by\n" +
    " * _port_practice_bank.mjs.\n" +
    " * Re-run `node _port_practice_bank.mjs` after any source bank changes.\n" +
    " * Every prompt/explanation/choice/acceptedAnswers field is a bilingual\n" +
    " * { en, az } object (or { en:[...], az:[...] } for accepted answers) —\n" +
    " * practice.js resolves it to the active UI language and always accepts\n" +
    " * either language when grading, same convention as the older quiz engine.\n" +
    " */\n";
  const content =
    header +
    "export const questions = " +
    serialize(allQuestions) +
    "\n\nexport const diagnosisCases = " +
    serialize(diagnosisCases) +
    "\n";
  writeFileSync(join(here, "practice-data.js"), content);
  console.log(`\nWrote practice-data.js (${allQuestions.length} questions, ${diagnosisCases.length} cases).`);
}

main();
