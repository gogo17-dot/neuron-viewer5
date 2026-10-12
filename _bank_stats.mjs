/**
 * Reads brain-bee-questions.js and reports the bank's shape: topic split,
 * subtopic counts, authored answer-index spread, `see` link coverage and any
 * duplicate ids. Also prints identification-drill display-name stems that
 * appear in more than one viewer (report only — not a gate).
 *
 * Also gates the choice-order rotation: an explanation that points at an answer
 * by position ("the first option", "cavab B") silently becomes wrong the moment
 * choices are reordered, so any such string fails the run and must be rewritten
 * to name the distractor by content before anything is rotated.
 *
 * Matching is Unicode-aware (`\p{L}` lookarounds, `u` flag). JS `\b` does not
 * treat Ü/Ə/Ş as word characters, so an AZ-only "Üçüncü variant" would slip
 * through a `\b` gate. Letter suffixes like "cavab B" require real whitespace
 * so "cavabdır" is not a hit.
 *
 * Exits non-zero if a gate fails. Optional argv: path to a questions file
 * (used by the planted-string scratch test).
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";

const L = String.raw`(?<!\p{L})`;
const R = String.raw`(?!\p{L})`;

export const POSITIONAL = [
  // English — require a gap before a letter/digit suffix so "optional" is not a hit
  new RegExp(`${L}(?:the\\s+)?(?:first|second|third|fourth|last|final|top|bottom)\\s+(?:option|choice|answer|response|one)${R}`, "iu"),
  new RegExp(`${L}option\\s+(?:one|two|three|four|[1-4]|[a-d])${R}`, "iu"),
  new RegExp(`${L}choice\\s+(?:one|two|three|four|[1-4]|[a-d])${R}`, "iu"),
  new RegExp(`${L}answer\\s+[a-d]${R}`, "iu"),
  new RegExp(`${L}(?:above|below)\\s+(?:option|choice|answer)${R}`, "iu"),
  new RegExp(`${L}the\\s+(?:one|answer)\\s+(?:above|below)${R}`, "iu"),
  // Azerbaijani — same lookarounds so Ü/Ə/Ş count as letters
  new RegExp(`${L}(?:birinci|ikinci|üçüncü|dördüncü|sonuncu|axırıncı)\\s+(?:variant|cavab|seçim)${R}`, "iu"),
  new RegExp(`${L}variant\\s+[1-4]${R}`, "iu"),
  new RegExp(`${L}cavab\\s+[a-d]${R}`, "iu"),
  new RegExp(`${L}(?:yuxarıdaki|aşağıdaki)\\s+(?:variant|cavab)${R}`, "iu"),
];

export function positionalHits(text) {
  const hits = [];
  if (!text) return hits;
  for (const re of POSITIONAL) {
    re.lastIndex = 0;
    const hit = text.match(re);
    if (hit) hits.push(hit[0].trim());
  }
  return hits;
}

function runFixtures() {
  const fixtures = [
    { text: "Üçüncü variant uzaqlaşdırıcı sinir nüvəsini orta beyinə qaldırır.", want: true, note: "AZ-only, leading Ü" },
    { text: "Ən yaxın səhv dördüncü seçim idi.", want: true, note: "AZ dördüncü seçim" },
    { text: "Birinci variant limbik strukturlardır.", want: true, note: "AZ birinci variant" },
    { text: "cəlbedici cavabdır, lakin motor deyil.", want: false, note: "cavabdır must not match" },
    { text: "The first option lists limbic structures.", want: true, note: "EN first option" },
    { text: "The third option shifts the abducens nucleus.", want: true, note: "EN third option" },
    { text: "answer B is the distractor.", want: true, note: "EN answer letter" },
    { text: "optional extras do not count.", want: false, note: "optional ≠ option" },
  ];
  const failed = [];
  for (const f of fixtures) {
    const hits = positionalHits(f.text);
    const got = hits.length > 0;
    if (got !== f.want) {
      failed.push(
        f.note + " — want " + (f.want ? "HIT" : "clean") + ", got " + JSON.stringify(hits)
      );
    }
  }
  if (failed.length) {
    console.log("FIXTURE GATE FAILED:");
    for (const line of failed) console.log("  " + line);
    process.exit(1);
  }
  console.log("positional fixtures: all " + fixtures.length + " passed");
}

runFixtures();

const file = process.argv[2] || "brain-bee-questions.js";
const src = readFileSync(file, "utf8");
const BB_QUESTIONS = new Function(src + "; return BB_QUESTIONS;")();

const bySub = new Map();
const byTopic = new Map();
const answers = [0, 0, 0, 0];
const ids = new Map();
let withSee = 0;

for (const q of BB_QUESTIONS) {
  byTopic.set(q.topic, (byTopic.get(q.topic) || 0) + 1);
  const key = q.topic + " / " + q.sub;
  bySub.set(key, (bySub.get(key) || 0) + 1);
  answers[q.answer] += 1;
  ids.set(q.id, (ids.get(q.id) || 0) + 1);
  if (q.see) withSee += 1;
}

const total = BB_QUESTIONS.length;
console.log("file: " + file);
console.log("total: " + total);
for (const [topic, n] of byTopic) console.log("  " + topic + ": " + n);
console.log("\nsubtopics:");
for (const [key, n] of [...bySub.entries()].sort()) {
  console.log("  " + key.padEnd(34) + n);
}
console.log(
  "\nauthored answer index: " +
    answers.map((n, i) => i + ":" + n + " (" + ((n / total) * 100).toFixed(1) + "%)").join("  ")
);
console.log("see links: " + withSee + " / " + total);

const failures = [];

const dupes = [...ids.entries()].filter(([, n]) => n > 1);
console.log("duplicate ids: " + (dupes.length ? dupes.map(([id]) => id).join(", ") : "none"));
if (dupes.length) failures.push("duplicate ids");

const incomplete = BB_QUESTIONS.filter(
  (q) =>
    !q.q?.en || !q.q?.az || !q.why?.en || !q.why?.az || q.choices.length !== 4 ||
    q.choices.some((c) => !c.en || !c.az)
);
console.log("incomplete entries: " + (incomplete.length ? incomplete.map((q) => q.id).join(", ") : "none"));
if (incomplete.length) failures.push("incomplete entries");

const positional = [];
for (const q of BB_QUESTIONS) {
  for (const [lang, text] of [["en", q.why.en], ["az", q.why.az]]) {
    for (const phrase of positionalHits(text)) {
      positional.push({ id: q.id, lang, phrase });
    }
  }
}

if (positional.length) {
  console.log("\nPOSITIONAL REFERENCES IN EXPLANATIONS — rotation is unsafe:");
  for (const p of positional) console.log("  " + p.id + " [" + p.lang + "] " + JSON.stringify(p.phrase));
  console.log(
    "  Rewrite these to name the distractor by content, then re-run. " +
      positional.length + " string(s) affected."
  );
  failures.push("positional references");
} else {
  console.log("positional references in explanations: none (rotation safe)");
}

const mustSee = BB_QUESTIONS.filter(
  (q) => q.topic === "anatomy" && (q.sub === "cerebellum" || q.sub === "basal-ganglia")
);
const missingSee = mustSee.filter((q) => !q.see?.href);
console.log(
  "anatomy cerebellum + basal-ganglia see links: " +
    (mustSee.length - missingSee.length) +
    " / " +
    mustSee.length
);
if (missingSee.length) {
  console.log("  missing: " + missingSee.map((q) => q.id).join(", "));
  failures.push("anatomy cerebellum/basal-ganglia must have see links");
}

// Report only — do not fail. The same EN stem on two viewers is a separate
// progress record and can queue twice in Review missed. Omar decides which
// overlaps stay.
try {
  const structPath = join(dirname(file), "brain-bee-structures.js");
  const BB_STRUCTURES = new Function(
    readFileSync(structPath, "utf8") + "; return BB_STRUCTURES;"
  )();
  function stemName(en) {
    return String(en || "")
      .toLowerCase()
      .replace(/[()]/g, " ")
      .replace(/\b(left|right)\b/g, " ")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }
  const groups = new Map();
  for (const s of BB_STRUCTURES) {
    const stem = stemName(s.name?.en);
    if (!stem) continue;
    if (!groups.has(stem)) groups.set(stem, []);
    groups.get(stem).push(s);
  }
  const cross = [...groups.entries()]
    .map(([stem, items]) => {
      const viewers = [...new Set(items.map((s) => s.viewer))];
      return { stem, items, viewers };
    })
    .filter((g) => g.viewers.length > 1)
    .sort((a, b) => a.stem.localeCompare(b.stem));
  console.log(
    "\ncross-viewer structure stems: " +
      (cross.length ? cross.length + " (report only, not a gate)" : "none")
  );
  for (const g of cross) {
    console.log("  " + g.stem + "  [" + g.viewers.join(", ") + "]");
    for (const s of g.items) {
      console.log("    " + s.viewer + " / " + s.id + "  " + JSON.stringify(s.name.en));
    }
  }
} catch (err) {
  console.log("\ncross-viewer structure stems: skipped (" + err.message + ")");
}

if (failures.length) {
  console.log("\nFAILED: " + failures.join(", "));
  process.exit(1);
}
