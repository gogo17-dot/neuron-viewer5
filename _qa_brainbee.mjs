import { chromium } from "playwright";
import { cases } from "./brain-bee-cases.js";
import { caseAz } from "./brain-bee-az.js";

const BASE = "http://127.0.0.1:8090";
const problems = [];
const note = (m) => console.log("  " + m);

const browser = await chromium.launch({ headless: true });
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
page.setDefaultTimeout(20000);
page.on("pageerror", (e) => problems.push("JS ERROR: " + e.message));
page.on("console", (m) => {
  if (m.type() === "error") problems.push("CONSOLE: " + m.text().slice(0, 160));
});

async function answerCurrent(correctly) {
  const idx = await page.evaluate(() => {
    const btns = [...document.querySelectorAll("#bb-quiz .bb-choice")];
    return btns.length;
  });
  if (!idx) return null;
  // find the correct display index from the engine's own deck
  const correctIdx = await page.evaluate(() => window.__probeCorrect());
  const pick = correctly ? correctIdx : (correctIdx + 1) % 4;
  await page.locator("#bb-quiz .bb-choice").nth(pick).click();
  await page.locator("#bb-quiz-check").click();
  return pick;
}

console.log("\n1. HUB QUIZ");
await page.goto(BASE + "/brain-bee.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(500);

const BANK_TARGET = 300;
const bankInfo = await page.evaluate(() => {
  const bySub = {};
  let anatomy = 0;
  let fn = 0;
  const ids = new Set();
  const dupes = [];
  const incomplete = [];
  for (const q of BB_QUESTIONS) {
    if (q.topic === "anatomy") anatomy += 1;
    else fn += 1;
    bySub[q.topic + "/" + q.sub] = (bySub[q.topic + "/" + q.sub] || 0) + 1;
    if (ids.has(q.id)) dupes.push(q.id);
    ids.add(q.id);
    const strings = [q.q, q.why, ...q.choices];
    if (q.choices.length !== 4 || strings.some((s) => !s || !s.en || !s.az)) incomplete.push(q.id);
  }
  return { total: BB_QUESTIONS.length, anatomy, fn, bySub, dupes, incomplete };
});
note("bank size: " + bankInfo.total + " (anatomy " + bankInfo.anatomy + " / function " + bankInfo.fn + ")");
if (bankInfo.total !== BANK_TARGET) {
  problems.push("bank is " + bankInfo.total + ", target " + BANK_TARGET);
}
if (bankInfo.anatomy !== bankInfo.fn) problems.push("anatomy/function split broken: " + bankInfo.anatomy + " vs " + bankInfo.fn);
if (bankInfo.dupes.length) problems.push("duplicate question ids: " + bankInfo.dupes.join(", "));
if (bankInfo.incomplete.length) problems.push("incomplete questions: " + bankInfo.incomplete.join(", "));

// Subtopic proportions must stay a whole multiple of the original 100-question
// bank, so every expansion pass keeps the same emphasis rather than drifting.
const BASE_SUBS = {
  "anatomy/cortex": 10,
  "anatomy/brainstem": 8,
  "anatomy/cerebellum": 4,
  "anatomy/basal-ganglia": 3,
  "anatomy/limbic": 5,
  "anatomy/diencephalon": 2,
  "anatomy/ventricles-meninges": 6,
  "anatomy/white-matter": 6,
  "anatomy/cranial-nerves": 6,
  "function/neuron-ap": 10,
  "function/synapse-nt": 10,
  "function/sensory": 12,
  "function/motor": 8,
  "function/memory": 6,
  "function/sleep-attention-emotion": 4,
};
const multiples = new Set();
for (const [key, base] of Object.entries(BASE_SUBS)) {
  const have = bankInfo.bySub[key] || 0;
  if (have % base !== 0) problems.push("subtopic " + key + " is " + have + ", not a multiple of " + base);
  else multiples.add(have / base);
}
note("subtopic multiples present: " + [...multiples].sort().join(", ") + " (want a single value)");
for (const key of Object.keys(bankInfo.bySub)) {
  if (!(key in BASE_SUBS)) problems.push("unknown subtopic in bank: " + key);
}

const chips = await page.locator("#bb-quiz .articles-topic").allInnerTexts();
note("filter chips: " + chips.join(" / "));
if (chips.length !== 4) problems.push("expected 4 chips, got " + chips.length);

await page.evaluate(() => {
  window.__probeCorrect = () => {
    const btns = [...document.querySelectorAll("#bb-quiz .bb-choice")];
    const qText = document.querySelector(".bb-quiz-q").textContent.trim();
    const q = BB_QUESTIONS.find((x) => x.q.en.trim() === qText || x.q.az.trim() === qText);
    const answerText = q.choices[q.answer].en.trim();
    return btns.findIndex((b) => {
      const t = b.textContent.trim();
      const orig = q.choices.find((c) => c.en.trim() === t || c.az.trim() === t);
      return orig && orig.en.trim() === answerText;
    });
  };
});

// answer 3 wrong so the missed queue fills
for (let i = 0; i < 3; i++) {
  await page.evaluate(() => {
    window.__probeCorrect = window.__probeCorrect;
  });
  await answerCurrent(false);
  await page.locator("#bb-quiz-next").click();
  await page.waitForTimeout(120);
}
const seenText = await page.locator("#bb-quiz .bb-score--muted").innerText();
note("seen counter: " + seenText.replace(/\n/g, " "));
if (!new RegExp("3 / " + bankInfo.total).test(seenText)) problems.push("seen counter wrong: " + seenText);

const missedChip = await page.locator("#bb-quiz .articles-topic").nth(3).innerText();
note("missed chip: " + missedChip);
if (!/\(3\)/.test(missedChip)) problems.push("missed chip count wrong: " + missedChip);

// persistence across reload
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(400);
const afterReload = await page.locator("#bb-quiz .articles-topic").nth(3).innerText();
note("missed chip after reload: " + afterReload);
if (!/\(3\)/.test(afterReload)) problems.push("progress did not persist: " + afterReload);

// review missed: answer one correctly twice -> leaves queue
await page.locator("#bb-quiz .articles-topic").nth(3).click();
await page.waitForTimeout(200);
const missedDeck = await page.evaluate(() => document.querySelectorAll("#bb-quiz .bb-choice").length);
note("review-missed deck rendered choices: " + missedDeck);

await page.evaluate(() => {
  window.__probeCorrect = () => {
    const btns = [...document.querySelectorAll("#bb-quiz .bb-choice")];
    const qText = document.querySelector(".bb-quiz-q").textContent.trim();
    const q = BB_QUESTIONS.find((x) => x.q.en.trim() === qText || x.q.az.trim() === qText);
    const answerText = q.choices[q.answer].en.trim();
    return btns.findIndex((b) => {
      const t = b.textContent.trim();
      const orig = q.choices.find((c) => c.en.trim() === t || c.az.trim() === t);
      return orig && orig.en.trim() === answerText;
    });
  };
});

const firstMissedQ = await page.locator(".bb-quiz-q").innerText();
await answerCurrent(true);
await page.locator("#bb-quiz-next").click();
await page.waitForTimeout(150);
let stillThere = await page.locator("#bb-quiz .articles-topic").nth(3).innerText();
note("after 1 correct, chip: " + stillThere + " (should still be 3)");
if (!/\(3\)/.test(stillThere)) problems.push("question left queue after only one correct answer");

// second correct pass on the same question via a fresh missed deck
await page.locator("#bb-quiz .articles-topic").nth(3).click();
await page.waitForTimeout(150);
for (let i = 0; i < 3; i++) {
  const qNow = await page.locator(".bb-quiz-q").innerText();
  if (qNow === firstMissedQ) {
    await answerCurrent(true);
    break;
  }
  await answerCurrent(true);
  await page.locator("#bb-quiz-next").click();
  await page.waitForTimeout(120);
}
await page.waitForTimeout(150);
const chipNow = await page.evaluate(() => BB.missedIds().length);
note("missed ids after two correct streak: " + chipNow);
if (chipNow > 2) problems.push("streak of 2 did not clear a question: " + chipNow);

// AZ switch
await page.locator("#lang-az").click();
await page.waitForTimeout(400);
const azQ = await page.locator(".bb-quiz-q").innerText();
note("AZ question renders: " + azQ.slice(0, 60));
const azChips = await page.locator("#bb-quiz .articles-topic").allInnerTexts();
note("AZ chips: " + azChips.join(" / "));
if (azChips.join(" ").includes("Review missed")) problems.push("chips did not translate to AZ");
await page.locator("#lang-en").click();
await page.waitForTimeout(300);

// theme
await page.locator("#theme-toggle").click();
await page.waitForTimeout(300);
const dayTheme = await page.evaluate(() => document.documentElement.getAttribute("data-theme"));
note("theme toggles to: " + dayTheme);
await page.locator("#theme-toggle").click();
await page.waitForTimeout(200);

const particles = await page.locator("#bg-particles").count();
note("particle canvas on hub: " + particles + " (want 0)");
if (particles) problems.push("particle canvas still on hub");

const soon = await page.locator(".atlas-choice-card--soon").count();
note("coming-soon cards: " + soon + " (want 0)");
if (soon) problems.push("coming-soon cards remain");

console.log("\n2. WRITTEN TEST");
await page.goto(BASE + "/brain-bee-exam.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(400);
await page.locator("#bb-exam-start").click();
await page.waitForTimeout(400);
const examCount = await page.evaluate(() => document.querySelector("#bb-exam .bb-score").textContent);
note("exam header: " + examCount);
if (!/50/.test(examCount)) problems.push("exam not 50 questions: " + examCount);

const t1 = await page.locator("#bb-timer").innerText();
await page.waitForTimeout(2100);
const t2 = await page.locator("#bb-timer").innerText();
note("timer " + t1 + " -> " + t2);
if (t1 === t2) problems.push("exam timer not counting down");

// answer 5, check no feedback leaks
for (let i = 0; i < 5; i++) {
  await page.locator("#bb-exam .bb-choice").first().click();
  await page.waitForTimeout(80);
  const leaked = await page.locator("#bb-exam .bb-choice.is-right, #bb-exam .bb-choice.is-wrong").count();
  if (leaked) problems.push("exam leaked feedback mid-test");
  const nextBtn = page.locator("#bb-exam-next");
  if (await nextBtn.count()) await nextBtn.click();
  await page.waitForTimeout(80);
}
const answered = await page.locator("#bb-exam .bb-score--muted").innerText();
note("answered counter: " + answered.replace(/\n/g, " "));

page.once("dialog", (d) => d.accept());
await page.locator("#bb-exam-finish").click();
await page.waitForTimeout(500);
const resultText = await page.locator("#bb-exam .bb-score").first().innerText();
note("result: " + resultText.replace(/\n/g, " "));
const rows = await page.locator(".bb-breakdown__row").count();
note("per-topic rows: " + rows);
if (!rows) problems.push("no per-topic breakdown");
const missedBlocks = await page.locator(".bb-missed").count();
note("mistake review blocks: " + missedBlocks);
if (!(await page.locator("#bb-exam-again").count())) problems.push("no new-exam button");

console.log("\n3. LIVE JUDGING");
await page.goto(BASE + "/brain-bee-live.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(400);
await page.locator("#bb-live-start").click();
await page.waitForTimeout(400);
const lt1 = await page.locator("#bb-live-timer").innerText();
await page.waitForTimeout(2100);
const lt2 = await page.locator("#bb-live-timer").innerText();
note("live timer " + lt1 + " -> " + lt2);
if (parseInt(lt1, 10) <= parseInt(lt2, 10)) problems.push("live timer not counting down");

await page.evaluate(() => {
  window.__liveCorrect = () => {
    const btns = [...document.querySelectorAll("#bb-live .bb-choice")];
    const qText = document.querySelector(".bb-quiz-q").textContent.trim();
    const q = BB_QUESTIONS.find((x) => x.q.en.trim() === qText || x.q.az.trim() === qText);
    const answerText = q.choices[q.answer].en.trim();
    return btns.findIndex((b) => {
      const t = b.textContent.trim();
      const orig = q.choices.find((c) => c.en.trim() === t || c.az.trim() === t);
      return orig && orig.en.trim() === answerText;
    });
  };
});

// two deliberate wrong answers should end the round
for (let i = 0; i < 2; i++) {
  const ci = await page.evaluate(() => window.__liveCorrect());
  await page.locator("#bb-live .bb-choice").nth((ci + 1) % 4).click();
  await page.locator("#bb-live-lock").click();
  await page.waitForTimeout(250);
  const strikes = await page.locator(".bb-strike.is-on").count();
  note("strikes after wrong #" + (i + 1) + ": " + strikes);
  const nextBtn = page.locator("#bb-live-next");
  if (i === 0) {
    if (!(await nextBtn.count())) problems.push("no next button after first strike");
    await nextBtn.click();
    await page.waitForTimeout(250);
    await page.evaluate(() => {
      window.__liveCorrect = window.__liveCorrect;
    });
  }
}
const ended = await page.locator("#bb-live-again").count();
note("round ended after 2 strikes: " + (ended ? "yes" : "NO"));
if (!ended) problems.push("round did not end after two strikes");

console.log("\n4. NEUROANATOMY IDENTIFICATION");
await page.goto(BASE + "/brain-bee-anatomy.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(400);

const bank = await page.evaluate(async () => {
  const MANIFESTS = {
    brainstem: "brainstem/brainstemManifest.js",
    "cranial-nerves": "cranial-nerves/cranialNervesManifest.js",
    limbic: "limbic/limbicManifest.js",
    ventricles: "ventricles/ventriclesManifest.js",
    "white-matter": "white-matter/whiteMatterManifest.js",
    "cerebral-cortex": "cerebral-cortex/cerebralCortexManifest.js",
    "visual-pathway": "visual-pathway/visualPathwayManifest.js",
    "ear-pathway": "ear-pathway/earPathwayManifest.js",
    diencephalon: "diencephalon/diencephalonManifest.js",
    "basal-ganglia": "basal-ganglia/basalGangliaManifest.js",
    cerebellum: "cerebellum/cerebellumManifest.js",
    meninges: "meninges/meningesManifest.js",
  };
  const MIN = {
    brainstem: 13,
    "cranial-nerves": 15,
    limbic: 15,
    ventricles: 7,
    "white-matter": 15,
    "cerebral-cortex": 12,
    "visual-pathway": 15,
    "ear-pathway": 15,
    diencephalon: 14,
    "basal-ganglia": 6,
    cerebellum: 15,
    meninges: 6,
  };
  function meshKeys(text) {
    const keys = new Set();
    for (const m of text.matchAll(/'([^']+)\.glb'/g)) keys.add(m[1]);
    for (const m of text.matchAll(/key:\s*'([^']+)'/g)) keys.add(m[1]);
    return keys;
  }
  const meshesByViewer = {};
  for (const [id, href] of Object.entries(MANIFESTS)) {
    const text = await fetch(href).then((r) => r.text());
    meshesByViewer[id] = meshKeys(text);
  }
  const ids = new Set();
  const bad = [];
  const byViewer = {};
  BB_STRUCTURES.forEach((s) => {
    if (ids.has(s.id)) bad.push("duplicate id " + s.id);
    ids.add(s.id);
    byViewer[s.viewer] = (byViewer[s.viewer] || 0) + 1;
    const meshes = meshesByViewer[s.viewer];
    if (!meshes) bad.push(s.id + " unknown viewer " + s.viewer);
    else if (!meshes.has(s.mesh)) bad.push(s.id + " mesh not in manifest: " + s.mesh);
    ["name", "note"].forEach((k) => {
      if (!s[k] || !s[k].en || !s[k].az) bad.push(s.id + " missing " + k + " en/az");
    });
    if (!s.accept || !s.accept.en.length || !s.accept.az.length) bad.push(s.id + " missing accepted spellings");
  });
  function meshSide(mesh) {
    if (/_L$/i.test(mesh) || /\.l$/i.test(mesh)) return "L";
    if (/_R$/i.test(mesh) || /\.r$/i.test(mesh)) return "R";
    return null;
  }
  function coreMesh(mesh) {
    return mesh.replace(/^\d+_/, "").replace(/_[LR]$/i, "").replace(/\.[lr]$/i, "");
  }
  function hasSideToken(str, lang) {
    const f = BB.fold(str);
    if (lang === "en") return /\b(left|right)\b/.test(f);
    return /\b(sol|sag)\b/.test(f);
  }
  const CORTEX_MESHES = new Set([
    "Frontal_lobe.l",
    "Frontal_lobe.r",
    "Parietal_lobe.l",
    "Parietal_lobe.r",
    "Temporal_lobe.l",
    "Temporal_lobe.r",
    "Occipital_lobe.l",
    "Occipital_lobe.r",
    "Insula.l",
    "Insula.r",
    "Limbic_lobe.l",
    "Limbic_lobe.r",
  ]);
  BB_STRUCTURES.forEach((s) => {
    if (s.viewer === "cerebral-cortex" && !CORTEX_MESHES.has(s.mesh)) {
      bad.push(s.id + " is not a cortical mesh: " + s.mesh);
    }
  });
  const pairGroups = new Map();
  BB_STRUCTURES.forEach((s) => {
    const side = meshSide(s.mesh);
    if (!side) return;
    const key = s.viewer + "::" + coreMesh(s.mesh);
    if (!pairGroups.has(key)) pairGroups.set(key, { L: [], R: [] });
    pairGroups.get(key)[side].push(s);
  });
  pairGroups.forEach((pair) => {
    if (!pair.L.length || !pair.R.length) return;
    [...pair.L, ...pair.R].forEach((s) => {
      if (!hasSideToken(s.name.en, "en")) bad.push(s.id + " EN name missing side");
      if (!hasSideToken(s.name.az, "az")) bad.push(s.id + " AZ name missing side");
      s.accept.en.forEach((a) => {
        if (!hasSideToken(a, "en")) bad.push(s.id + " EN accept unsided " + JSON.stringify(a));
      });
      s.accept.az.forEach((a) => {
        if (!hasSideToken(a, "az")) bad.push(s.id + " AZ accept unsided " + JSON.stringify(a));
      });
    });
  });
  Object.entries(MIN).forEach(([viewer, min]) => {
    const n = byViewer[viewer] || 0;
    if (n < min) bad.push(viewer + " has " + n + " structures, need " + min);
  });
  return { count: BB_STRUCTURES.length, byViewer, bad };
});
note("structures: " + bank.count + ", data problems: " + (bank.bad.length || "none"));
if (bank.byViewer) {
  Object.keys(bank.byViewer)
    .sort()
    .forEach((v) => note("  " + v + ": " + bank.byViewer[v]));
}
if ((bank.byViewer.brainstem || 0) < 13) problems.push("fewer than 13 brainstem structures: " + bank.byViewer.brainstem);
bank.bad.forEach((b) => problems.push("structure data: " + b));

const anatParticles = await page.locator("#bg-particles").count();
if (anatParticles) problems.push("particle canvas on anatomy page");

const modeChips = await page.locator("#bb-anatomy-head [data-mode]").allInnerTexts();
note("mode chips: " + modeChips.join(" / "));
if (modeChips.length !== 2) problems.push("expected 2 mode chips, got " + modeChips.length);

const viewerChips = await page.locator("#bb-anatomy-head [data-viewer]").allInnerTexts();
note("viewer chips: " + viewerChips.join(" / "));
const expectedViewers = await page.evaluate(() => [...new Set(BB_STRUCTURES.map((s) => s.viewer))].length);
if (viewerChips.length !== expectedViewers) {
  problems.push("viewer chips " + viewerChips.length + " vs unique viewers " + expectedViewers);
}
if (!(await page.locator('#bb-anatomy-head [data-viewer="brainstem"].is-active').count())) {
  problems.push("brainstem is not the default viewer");
}

const mcqSeenBefore = await page.evaluate(() => BB.seenCount());

await page.locator("#bb-anatomy-start").click();
await page.waitForFunction(() => window.__bbAnatomy.ready(), null, { timeout: 60000 });
note("brainstem models loaded");

const stageBox = await page.locator("#bb-anatomy-stage").boundingBox();
note("stage size: " + Math.round(stageBox.width) + "x" + Math.round(stageBox.height));
if (stageBox.height < 200 || stageBox.height > 900) problems.push("stage height looks wrong: " + stageBox.height);
const canvasBox = await page.locator("#bb-stage-canvas").boundingBox();
note("canvas size: " + Math.round(canvasBox.width) + "x" + Math.round(canvasBox.height));
if (Math.abs(canvasBox.width - stageBox.width) > 4 || Math.abs(canvasBox.height - stageBox.height) > 4) {
  problems.push("canvas does not match its stage box");
}

// a click on the model must not give the answer away
await page.mouse.click(canvasBox.x + canvasBox.width / 2, canvasBox.y + canvasBox.height / 2);
await page.waitForTimeout(200);
if (await page.locator(".bb-result__name").count()) problems.push("clicking the model revealed the answer");

async function currentStructure() {
  return page.evaluate(() => {
    const id = window.__bbAnatomy.currentId();
    return BB_STRUCTURES.find((s) => s.id === id);
  });
}

// exact display name -> correct
let s = await currentStructure();
await page.fill("#bb-anatomy-input", s.name.en);
await page.locator("#bb-anatomy-check").click();
await page.waitForTimeout(150);
if (!(await page.locator(".bb-feedback.is-ok").count())) problems.push("exact name not accepted: " + s.name.en);
const revealed = await page.locator(".bb-result__name").innerText();
note("exact name accepted, reveal shows: " + revealed.slice(0, 60));
if (!(await page.locator(".bb-result__body").innerText()).trim()) problems.push("no function note on reveal");

// accent-folded Azerbaijani spelling -> correct
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(200);
s = await currentStructure();
const folded = s.accept.az[0].replace(/ə/g, "e").replace(/ı/g, "i").replace(/ş/g, "s").replace(/ç/g, "c").replace(/ğ/g, "g").replace(/ö/g, "o").replace(/ü/g, "u").toUpperCase();
await page.fill("#bb-anatomy-input", folded);
await page.keyboard.press("Enter");
await page.waitForTimeout(150);
if (!(await page.locator(".bb-feedback.is-ok").count())) problems.push("accent-folded AZ spelling rejected: " + folded);
note("accent-folded AZ spelling accepted: " + folded);

// wrong answer -> missed queue, and the MCQ counters must not move
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(200);
s = await currentStructure();
await page.fill("#bb-anatomy-input", "corpus callosum");
await page.locator("#bb-anatomy-check").click();
await page.waitForTimeout(150);
if (!(await page.locator(".bb-feedback.is-no").count())) problems.push("wrong answer marked correct");
const missState = await page.evaluate((id) => ({
  wrong: BB.structureStats(id).wrong,
  missed: BB.missedStructures("brainstem").length,
  mcqSeen: BB.seenCount(),
}), s.id);
note("after a miss: wrong=" + missState.wrong + ", missed queue=" + missState.missed);
if (missState.wrong !== 1) problems.push("miss not recorded for " + s.id);
if (!missState.missed) problems.push("missed structure did not enter the review queue");
if (missState.mcqSeen !== mcqSeenBefore) problems.push("structure drill leaked into the MCQ seen counter");

const missedChipAnat = await page.locator("#bb-anatomy-head [data-mode]").nth(1).innerText();
note("missed chip: " + missedChipAnat);
if (!/\(\d+\)/.test(missedChipAnat)) problems.push("missed chip shows no count: " + missedChipAnat);

// give up -> counts as a miss
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(200);
s = await currentStructure();
await page.locator("#bb-anatomy-giveup").click();
await page.waitForTimeout(150);
const gaveUp = await page.evaluate((id) => BB.structureStats(id).wrong, s.id);
if (gaveUp !== 1) problems.push("show-me did not count as a miss");
note("show-me counts as a miss");

// AZ switch mid-drill keeps the scene alive and translates the UI
await page.locator("#lang-az").click();
await page.waitForTimeout(400);
const azPrompt = await page.locator("#bb-anatomy-head [data-mode]").first().innerText();
note("AZ mode chip: " + azPrompt);
if (/All structures/.test(azPrompt)) problems.push("anatomy chips did not translate to AZ");
const azViewer = await page.locator('#bb-anatomy-head [data-viewer="brainstem"]').innerText();
note("AZ viewer chip: " + azViewer);
if (!/Beyin sapı/.test(azViewer)) problems.push("viewer chips did not translate to AZ: " + azViewer);
if (!(await page.evaluate(() => window.__bbAnatomy.ready()))) problems.push("scene lost on language switch");
await page.locator("#lang-en").click({ noWaitAfter: true });
await page.waitForTimeout(300);

await page.locator("#theme-toggle").click({ noWaitAfter: true });
await page.waitForTimeout(1500);
note("theme after toggle: " + (await page.evaluate(() => document.documentElement.getAttribute("data-theme"))));
note("ready after theme: " + (await page.evaluate(() => window.__bbAnatomy.ready())));
if (!(await page.evaluate(() => window.__bbAnatomy.ready()))) problems.push("scene lost on theme switch");
await page.locator("#theme-toggle").click({ noWaitAfter: true });
await page.waitForTimeout(800);
note("theme restored: " + (await page.evaluate(() => document.documentElement.getAttribute("data-theme"))));

// Drain via in-page clicks so Playwright does not wait on a navigation
// that Three.js asset reloads can look like.
await page.evaluate(async () => {
  for (let i = 0; i < 80; i++) {
    const st = window.__bbAnatomy.state();
    if (st === "done") return;
    const id = st === "revealed" ? "bb-anatomy-next" : "bb-anatomy-giveup";
    const el = document.getElementById(id);
    if (el) el.click();
    await new Promise((r) => setTimeout(r, 40));
  }
});
const summary = await page.locator("#bb-anatomy-again").count();
note("summary reached: " + (summary ? "yes" : "NO"));
if (!summary) problems.push("drill never reached the summary");
if ((await page.locator("#bb-anatomy-stage").isVisible()) === true) problems.push("stage still visible on the summary");

console.log("\n4b. CRANIAL NERVES THROUGH THE SAME DRILL");
await page.locator('#bb-anatomy-head [data-viewer="cranial-nerves"]').click();
await page.waitForTimeout(300);
const switched = await page.evaluate(() => window.__bbAnatomy.viewer());
note("viewer after chip: " + switched);
if (switched !== "cranial-nerves") problems.push("viewer chip did not switch: " + switched);
await page.locator("#bb-anatomy-start").click();
await page.waitForFunction(() => window.__bbAnatomy.ready(), null, { timeout: 90000 });
note("cranial-nerve models loaded");
const cnCanvas = await page.locator("#bb-stage-canvas").boundingBox();
await page.mouse.click(cnCanvas.x + cnCanvas.width / 2, cnCanvas.y + cnCanvas.height / 2);
await page.waitForTimeout(200);
if (await page.locator(".bb-result__name").count()) problems.push("CN: clicking the model revealed the answer");
s = await currentStructure();
note("CN first id: " + (s && s.id) + " viewer=" + (s && s.viewer));
if (!s || s.viewer !== "cranial-nerves") problems.push("CN drill is not on a cranial-nerve structure");
await page.fill("#bb-anatomy-input", s.name.en);
await page.locator("#bb-anatomy-check").click();
await page.waitForTimeout(150);
if (!(await page.locator(".bb-feedback.is-ok").count())) problems.push("CN exact name not accepted: " + s.name.en);
await page.locator("#bb-anatomy-next").click();
await page.waitForTimeout(200);
s = await currentStructure();
const foldedCn = s.accept.az[0]
  .replace(/ə/g, "e")
  .replace(/ı/g, "i")
  .replace(/ş/g, "s")
  .replace(/ç/g, "c")
  .replace(/ğ/g, "g")
  .replace(/ö/g, "o")
  .replace(/ü/g, "u")
  .toUpperCase();
await page.fill("#bb-anatomy-input", foldedCn);
await page.keyboard.press("Enter");
await page.waitForTimeout(150);
if (!(await page.locator(".bb-feedback.is-ok").count())) problems.push("CN accent-folded AZ spelling rejected: " + foldedCn);
note("CN accent-folded AZ accepted: " + foldedCn);
await page.locator("#lang-az").click({ noWaitAfter: true });
await page.waitForTimeout(400);
const azCnChip = await page.locator('#bb-anatomy-head [data-viewer="cranial-nerves"]').innerText();
note("AZ CN chip: " + azCnChip);
if (!/Kəllə sinirləri/.test(azCnChip)) problems.push("CN viewer chip did not translate to AZ: " + azCnChip);
if (!(await page.evaluate(() => window.__bbAnatomy.ready()))) problems.push("CN scene lost on language switch");
await page.locator("#lang-en").click({ noWaitAfter: true });
await page.waitForTimeout(300);

console.log("\n5. HUB LINKS TO THE DRILL");
await page.goto(BASE + "/brain-bee.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(300);
const anatCard = await page.locator('.atlas-choice-card[href="brain-bee-anatomy.html"]').count();
note("neuroanatomy card on hub: " + anatCard);
if (!anatCard) problems.push("no neuroanatomy card on the hub");
const roundsProse = await page.locator("#bb-quiz ~ .about-block p").first().innerText();
if (/Three of them/.test(roundsProse)) problems.push("hub still says only three rounds are rehearsed here");

console.log("\n6. DIAGNOSIS PAGE STILL WORKS");
await page.goto(BASE + "/brain-bee-diagnosis.html", { waitUntil: "domcontentloaded" });
await page.waitForTimeout(600);
const chipsDx = await page.locator(".bb-chip").count();
note("test chips: " + chipsDx);
if (chipsDx < 8) problems.push("diagnosis page test chips missing");
const dxParticles = await page.locator("#bg-particles").count();
if (dxParticles) problems.push("particles still on diagnosis page");

const CASE_TARGET = 27;
const PSYCH_IDS = ["mdd-01", "scz-01", "bp-01", "asd-01", "gad-01", "ocd-01", "ptsd-01"];
note("cases: " + cases.length + " (target " + CASE_TARGET + ")");
if (cases.length !== CASE_TARGET) problems.push("case bank is " + cases.length + ", target " + CASE_TARGET);
const missingAz = cases.filter((c) => !caseAz[c.id]).map((c) => c.id);
if (missingAz.length) problems.push("cases missing AZ overlay: " + missingAz.join(", "));
const extraAz = Object.keys(caseAz).filter((id) => !cases.some((c) => c.id === id));
if (extraAz.length) problems.push("AZ overlay without English case: " + extraAz.join(", "));
for (const id of PSYCH_IDS) {
  if (!cases.some((c) => c.id === id)) problems.push("missing psychiatric case " + id);
}
const incompleteCases = cases.filter((c) => {
  const keys = ["ct", "pet_spect", "mri", "eeg", "ncs", "cognitive", "blood", "csf"];
  return keys.some((k) => !c.tests || !c.tests[k]) || !c.history || !c.presentation || !c.explanation;
});
if (incompleteCases.length) problems.push("incomplete cases: " + incompleteCases.map((c) => c.id).join(", "));

await browser.close();
console.log("\n=== " + (problems.length ? "PROBLEMS" : "ALL CLEAR") + " ===");
problems.forEach((p) => console.log("- " + p));
process.exit(problems.length ? 1 : 0);
