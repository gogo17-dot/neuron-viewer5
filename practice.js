import { diagnosisCases as seedCases, questions as seedQuestions } from "./practice-data.js"
import { demoCases, demoQuestions } from "./practice-demo.js"
import {
  answersMatch,
  applyReview,
  backfillAttemptModuleIds,
  buildSession,
  compareModuleIds,
  createLocalStorageAdapter,
  gradeAnswer,
  lessonsForModule,
  moduleLabel,
  readDrill,
  recordAttempt,
} from "./practice-engine.js"

const params = new URLSearchParams(location.search)
const demo = params.get("demo") === "1"
const questions = demo ? demoQuestions : seedQuestions
const diagnosisCases = demo ? demoCases : seedCases
const adapter = createLocalStorageAdapter()
backfillAttemptModuleIds(adapter, questions)

if (demo) {
  const mistakesLink = document.getElementById("bb-mistakes-link")
  if (mistakesLink) mistakesLink.setAttribute("href", "practice-mistakes.html?demo=1")
}

const UI = {
  learn: { en: "Learn", az: "Öyrən" },
  review: { en: "Review", az: "Təkrar" },
  mixed: { en: "Mixed", az: "Qarışıq" },
  mock: { en: "Mock", az: "Sınaq" },
  start: { en: "Start session", az: "Sessiyaya başla" },
  empty: {
    en: "No questions loaded yet. Add items to the bank, or open this page with ?demo=1 to check the flow.",
    az: "Hələ sual yüklənməyib. Banka əlavə edin, və ya axını yoxlamaq üçün səhifəni ?demo=1 ilə açın.",
  },
  q: { en: "Question", az: "Sual" },
  of: { en: "of", az: "/" },
  check: { en: "Check", az: "Yoxla" },
  next: { en: "Next", az: "Növbəti" },
  done: { en: "Session complete.", az: "Sessiya bitdi." },
  scored: { en: "You scored", az: "Nəticəniz" },
  again: { en: "New session", az: "Yeni sessiya" },
  mistakes: { en: "Open mistake log", az: "Səhv jurnalını aç" },
  correct: { en: "Correct", az: "Düzgün" },
  incorrect: { en: "Incorrect", az: "Səhv" },
  why: { en: "Explanation", az: "İzah" },
  readWhy: { en: "Read the explanation before continuing.", az: "Davam etməzdən əvvəl izahı oxuyun." },
  history: { en: "History", az: "Tarixçə" },
  presentation: { en: "Presentation", az: "Müayinə" },
  continue: { en: "Continue", az: "Davam" },
  tests: { en: "Select tests — results appear as you choose. You cannot add more after you diagnose.", az: "Test seçin — nəticə seçəndə görünür. Diaqnozdan sonra əlavə test olmaz." },
  diagnose: { en: "Diagnosis", az: "Diaqnoz" },
  submitDx: { en: "Submit diagnosis", az: "Diaqnozu göndər" },
  typeDx: { en: "Type the disorder", az: "Pozğunluğu yazın" },
  pick: { en: "Choose an answer.", az: "Cavab seçin." },
  type: { en: "Type an answer", az: "Cavab yazın" },
  click: { en: "Click the labelled region.", az: "İşarələnmiş sahəyə klikləyin." },
  allModules: { en: "All modules", az: "Bütün modullar" },
  drill: { en: "Drill from your misses", az: "Səhvlərdən məşq" },
  startLessons: { en: "Start with the lessons →", az: "Dərslərdən başla →" },
  readFirst: { en: "Read the lesson first →", az: "Əvvəl dərsi oxu →" },
  lesson: { en: "Lesson", az: "Dərs" },
}

const app = document.getElementById("bb-app")
const progressEl = document.getElementById("bb-progress")
const clockEl = document.getElementById("bb-clock")
const scoreEl = document.getElementById("bb-score")

const modes = ["learn", "review", "mixed", "mock"]
let mode = params.get("mode") || "learn"
let moduleId = params.get("module") || ""
let screen = "setup"
let session = null
let qi = 0
let revealed = false
let lastGrade = null
let picked = null
let dxPhase = "history"
let selectedTests = []
let testsLocked = false
let remaining = 0
let ticker = null
let startedAt = 0
let correct = 0
let attempted = 0
const drill = readDrill()

function lang() {
  return document.documentElement.getAttribute("lang") === "az" ? "az" : "en"
}

function t(key) {
  const row = UI[key]
  if (!row) return key
  return lang() === "az" ? row.az : row.en
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

/* Explanation display: first sentence in bold (the key reason), rest as detail. Text unchanged. */
// Returns [lead, rest]; lead is the first sentence, rest may be "".
function splitLead(s) {
  s = String(s == null ? "" : s);
  var re = /[.!?](?=\s+["“(]?[A-ZÀ-ÖØ-ÞÇƏĞİÖŞÜ0-9])/g, m;
  while ((m = re.exec(s))) {
    var before = s.slice(0, m.index + 1);
    var word = (before.match(/(\S+)$/) || [""])[0];
    if (/^(e\.g|i\.e|vs|approx|cf|etc|Dr|St|Mr|Ms|No|Fig|ca)\.$/i.test(word)) continue;
    if (/\.[A-Za-z]\.$/.test(word)) continue;          // "e.g." variants
    var lead = before.trim(), rest = s.slice(m.index + 1).trim();
    if (lead.split(/\s+/).length < 3) continue;        // too short to stand alone
    return [lead, rest];
  }
  return [s.trim(), ""];
}

function whyHtml(text) {
  const parts = splitLead(text)
  return "<strong>" + esc(parts[0]) + "</strong>" + (parts[1] ? " " + esc(parts[1]) : "")
}

function current() {
  return session?.questions[qi] || null
}

// Bilingual fields in practice-data.js are {en, az} objects (a plain string is
// also accepted so the English-only ?demo=1 fixtures keep working unchanged).
function pick(value) {
  if (value == null) return ""
  if (typeof value === "object") return value[lang()] || value.en || ""
  return value
}

function shuffled(list) {
  const out = (list || []).slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Choice display order for the question currently on screen. Fixed once per
// question (set in resetItem) and only re-picked for text on language
// toggle — reshuffling on every render would make the option the student
// just clicked jump to a different row.
let choiceOrder = null

// Resolves the current question into the active UI language for rendering
// and grading. acceptedAnswers always includes both languages' accepted
// spellings, same as the older quiz engine, so the student can type in
// either language regardless of which one the interface is showing.
function localizeCurrent() {
  const q = current()
  if (!q) return q
  const acceptedEn = Array.isArray(q.acceptedAnswers) ? q.acceptedAnswers : q.acceptedAnswers?.en || []
  const acceptedAz = Array.isArray(q.acceptedAnswers) ? [] : q.acceptedAnswers?.az || []
  return {
    ...q,
    prompt: pick(q.prompt),
    explanation: pick(q.explanation),
    choices: (choiceOrder || q.choices || []).map((c) => ({ ...c, text: pick(c.text) })),
    acceptedAnswers: [...acceptedEn, ...acceptedAz],
    hotspots: (q.hotspots || []).map((h) => ({ ...h, label: pick(h.label) })),
  }
}

function seeHtml(q) {
  if (!q?.see) return ""
  return (
    '<p class="bb-hint"><a href="' +
    esc(q.see.href) +
    '">' +
    esc(pick(q.see)) +
    "</a></p>"
  )
}

function localizeCase(c) {
  if (!c) return c
  return {
    ...c,
    history: pick(c.history),
    presentation: pick(c.presentation),
    availableTests: (c.availableTests || []).map((row) => ({ ...row, name: pick(row.name), result: pick(row.result) })),
    correctDisorder: pick(c.correctDisorder),
    explanation: pick(c.explanation),
    candidateDisorders: (c.candidateDisorders || []).map((d) => pick(d)),
  }
}

function dxCase(question) {
  return localizeCase(diagnosisCases.find((c) => c.id === question.id) || null)
}

function clock(secs) {
  const n = Math.max(0, secs)
  const m = Math.floor(n / 60)
  const s = n % 60
  return m + ":" + (s < 10 ? "0" + s : "" + s)
}

function stopTicker() {
  if (ticker) {
    window.clearInterval(ticker)
    ticker = null
  }
}

function startTicker() {
  stopTicker()
  const q = current()
  remaining = q?.timeLimitSeconds || 45
  startedAt = Date.now()
  ticker = window.setInterval(tick, 1000)
  clockEl.textContent = clock(remaining)
}

function tick() {
  remaining -= 1
  clockEl.textContent = clock(remaining)
  if (remaining <= 0 && !revealed) submitAnswer("")
}

function startSession(opts) {
  session = buildSession({
    moduleIds: opts.questionIds ? [] : moduleId ? [moduleId] : [],
    count: opts.count ?? 10,
    mode,
    questions,
    reviews: adapter.getReviews(),
    questionIds: opts.questionIds,
  })
  qi = 0
  correct = 0
  attempted = 0
  screen = session.questions.length ? "run" : "empty"
  resetItem()
  if (screen === "run") startTicker()
  if (window.BBProgress) window.BBProgress.touchActivity()
  render()
}

function resetItem() {
  revealed = false
  lastGrade = null
  picked = null
  selectedTests = []
  testsLocked = false
  const q = current()
  choiceOrder = q?.type === "mcq" ? shuffled(q.choices || []) : null
  dxPhase = q?.type === "diagnosis" ? "history" : "ask"
}

function submitAnswer(userAnswer) {
  if (revealed) return
  const raw = current()
  if (!raw) return
  const q = localizeCurrent()
  stopTicker()
  const secondsTaken = Math.max(1, Math.round((Date.now() - startedAt) / 1000))
  lastGrade = gradeAnswer(q, userAnswer)
  if (q.type === "diagnosis") {
    const c = dxCase(q)
    if (c) {
      const opts = [c.correctDisorder, ...(q.acceptedAnswers || [])]
      const hit = opts.find((opt) => answersMatch(userAnswer, opt)) || null
      lastGrade = { correct: Boolean(hit), matched: hit, explanation: c.explanation || q.explanation }
    }
  }
  revealed = true
  attempted += 1
  if (lastGrade.correct) correct += 1
  recordAttempt(adapter, {
    questionId: raw.id,
    moduleId: raw.moduleId || "",
    correct: lastGrade.correct,
    userAnswer: String(userAnswer ?? ""),
    secondsTaken,
    timestamp: new Date().toISOString(),
  })
  applyReview(adapter, q.id, lastGrade.correct)
  if (window.BBProgress) window.BBProgress.touchActivity({ correct: lastGrade.correct })
  render()
}

function goNext() {
  if (!revealed) return
  qi += 1
  if (qi >= session.questions.length) {
    screen = "done"
    stopTicker()
    render()
    return
  }
  resetItem()
  startTicker()
  render()
}

function feedbackExplanation() {
  const raw = current()
  if (!raw) return lastGrade?.explanation || ""
  if (raw.type === "diagnosis") {
    const c = dxCase(raw)
    return c?.explanation || pick(raw.explanation)
  }
  return pick(raw.explanation) || lastGrade?.explanation || ""
}

function feedbackHtml() {
  if (!revealed || !lastGrade) return ""
  return (
    '<div class="bb-panel bb-feedback ' +
    (lastGrade.correct ? "is-ok" : "is-no") +
    '"><p class="bb-panel__label">' +
    esc(lastGrade.correct ? t("correct") : t("incorrect")) +
    '</p><p class="bb-panel__label">' +
    esc(t("why")) +
    '</p><p class="bb-panel__text">' +
    whyHtml(feedbackExplanation()) +
    "</p>" +
    (lastGrade.correct ? "" : '<p class="bb-hint">' + esc(t("readWhy")) + "</p>") +
    "</div>" +
    seeHtml(current())
  )
}

function nextHtml() {
  if (!revealed) return ""
  return (
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-next">' +
    esc(t("next")) +
    "</button></div>"
  )
}

function lessonHintHtml() {
  if (demo) return ""
  if (!moduleId) {
    return '<p class="bb-hint"><a href="brain-bee-lessons.html">' + esc(t("startLessons")) + "</a></p>"
  }
  const list = lessonsForModule(moduleId)
  if (!list.length) return ""
  const links = list
    .map(
      (row) =>
        '<a href="brain-bee-lessons.html?lesson=' +
        esc(row.id) +
        '">' +
        esc(t("lesson") + " " + row.chapter) +
        "</a>",
    )
    .join(" · ")
  return '<p class="bb-hint">' + esc(t("readFirst")) + " " + links + "</p>"
}

function renderSetup() {
  const mods = [...new Set(questions.map((q) => q.moduleId))].sort(compareModuleIds)
  let html = '<div class="articles-topics bb-quiz-filters" role="group">'
  modes.forEach((m) => {
    html +=
      '<button type="button" class="articles-topic' +
      (mode === m ? " is-active" : "") +
      '" data-mode="' +
      m +
      '">' +
      esc(t(m)) +
      "</button>"
  })
  html += "</div>"
  if (mods.length) {
    html += '<div class="articles-topics bb-quiz-filters" role="group">'
    html +=
      '<button type="button" class="articles-topic' +
      (!moduleId ? " is-active" : "") +
      '" data-module="">' +
      esc(t("allModules")) +
      "</button>"
    mods.forEach((id) => {
      html +=
        '<button type="button" class="articles-topic' +
        (moduleId === id ? " is-active" : "") +
        '" data-module="' +
        esc(id) +
        '">' +
        esc(pick(moduleLabel(id))) +
        "</button>"
    })
    html += "</div>"
  }
  if (!questions.length) {
    html += '<article class="bb-panel"><p class="bb-panel__text">' + esc(t("empty")) + "</p></article>"
  }
  html += lessonHintHtml()
  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-start"' +
    (questions.length ? "" : " disabled") +
    ">" +
    esc(t("start")) +
    "</button></div>"
  if (drill?.questionIds?.length) {
    html += '<p class="bb-hint">' + esc(t("drill")) + "</p>"
  }
  app.innerHTML = html
}

function renderMcq(q) {
  let html = '<p class="bb-quiz-q">' + esc(q.prompt) + "</p><div class=\"bb-choice-list\">"
  ;(q.choices || []).forEach((c) => {
    let cls = "bb-choice"
    if (revealed) {
      if (c.id === q.correctChoiceId) cls += " is-right"
      else if (c.id === picked) cls += " is-wrong"
    } else if (picked === c.id) cls += " is-on"
    html +=
      '<button type="button" class="' +
      cls +
      '" data-choice="' +
      esc(c.id) +
      '"' +
      (revealed ? " disabled" : "") +
      ">" +
      esc(c.text) +
      "</button>"
  })
  html += "</div>"
  if (!revealed) html += '<p class="bb-hint">' + esc(t("pick")) + "</p>"
  return html
}

function renderShort(q) {
  let html = '<p class="bb-quiz-q">' + esc(q.prompt) + "</p>"
  html +=
    '<label class="bb-field"><span class="bb-field__label">' +
    esc(t("type")) +
    '</span><input class="bb-input" id="bb-input" ' +
    (revealed ? "disabled " : "") +
    "/></label>"
  if (!revealed) {
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-check">' +
      esc(t("check")) +
      "</button></div>"
  }
  return html
}

function renderImage(q) {
  let html = '<p class="bb-quiz-q">' + esc(q.prompt) + "</p>"
  html += '<p class="bb-hint">' + esc(t("click")) + "</p>"
  html += '<div class="bb-hotspot-map">'
  html += '<img src="' + esc(q.imageUrl || "logo.png") + '" alt="">'
  ;(q.hotspots || []).forEach((h) => {
    const size = Math.max(28, h.r * 2)
    let cls = "bb-chip"
    if (revealed && lastGrade) {
      if (normalizeLabel(h.label) === normalizeLabel(lastGrade.matched || q.acceptedAnswers?.[0] || "")) cls += " is-on"
      else if (picked === h.label) cls += " is-on"
    }
    html +=
      '<button type="button" class="' +
      cls +
      '" data-hotspot="' +
      esc(h.label) +
      '" style="left:' +
      h.x +
      "%;top:" +
      h.y +
      "%;width:" +
      size +
      "px;height:" +
      size +
      'px"' +
      (revealed ? " disabled" : "") +
      " aria-label=\"" +
      esc(h.label) +
      '"></button>'
  })
  html += "</div>"
  return html
}

function normalizeLabel(s) {
  return String(s || "").trim().toLowerCase()
}

function renderDiagnosis(q) {
  const c = dxCase(q)
  if (!c) return '<p class="bb-hint">' + esc(t("empty")) + "</p>"
  let html = '<p class="bb-quiz-q">' + esc(q.prompt) + "</p>"
  html +=
    '<div class="bb-panel"><p class="bb-panel__label">' +
    esc(t("history")) +
    '</p><p class="bb-panel__text">' +
    esc(c.history) +
    "</p></div>"
  if (c.presentation) {
    html +=
      '<div class="bb-panel"><p class="bb-panel__label">' +
      esc(t("presentation")) +
      '</p><p class="bb-panel__text">' +
      esc(c.presentation) +
      "</p></div>"
  }
  if (dxPhase === "history") {
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-dx-continue">' +
      esc(t("continue")) +
      "</button></div>"
    return html
  }
  html += '<p class="bb-hint">' + esc(t("tests")) + "</p>"
  html += '<div class="bb-test-row">'
  const max = c.maxTests || 2
  const locked = testsLocked || selectedTests.length >= max
  c.availableTests.forEach((test) => {
    const on = selectedTests.includes(test.id)
    html +=
      '<button type="button" class="bb-chip' +
      (on ? " is-on" : "") +
      '" data-test="' +
      esc(test.id) +
      '"' +
      (locked && !on ? " disabled" : "") +
      ">" +
      esc(test.name) +
      "</button>"
  })
  html += "</div>"
  selectedTests.forEach((id) => {
    const test = c.availableTests.find((row) => row.id === id)
    if (!test) return
    html +=
      '<div class="bb-result"><p class="bb-result__name">' +
      esc(test.name) +
      '</p><p class="bb-result__body">' +
      esc(test.result) +
      "</p></div>"
  })
  if (dxPhase === "dx-tests" && selectedTests.length && selectedTests.length < max && !testsLocked) {
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-dx-lock">' +
      esc(t("diagnose")) +
      "</button></div>"
  }
  if (dxPhase === "dx-diagnose" || testsLocked || selectedTests.length >= max) {
    html += '<p class="bb-panel__label">' + esc(t("diagnose")) + "</p>"
    if ((c.candidateDisorders || []).length) {
      html += '<div class="bb-choice-list">'
      c.candidateDisorders.forEach((name) => {
        let cls = "bb-choice"
        if (revealed) {
          if (name === c.correctDisorder) cls += " is-right"
          else if (picked === name) cls += " is-wrong"
        } else if (picked === name) cls += " is-on"
        html +=
          '<button type="button" class="' +
          cls +
          '" data-dx="' +
          esc(name) +
          '"' +
          (revealed ? " disabled" : "") +
          ">" +
          esc(name) +
          "</button>"
      })
      html += "</div>"
    } else {
      html +=
        '<label class="bb-field"><span class="bb-field__label">' +
        esc(t("typeDx")) +
        '</span><input class="bb-input" id="bb-input" ' +
        (revealed ? "disabled " : "") +
        "/></label>"
      if (!revealed) {
        html +=
          '<div class="bb-actions"><button type="button" class="about-action" id="bb-check">' +
          esc(t("submitDx")) +
          "</button></div>"
      }
    }
  }
  return html
}

function renderRun() {
  if (!current()) {
    screen = "done"
    render()
    return
  }
  const q = localizeCurrent()
  progressEl.textContent = t("q") + " " + (qi + 1) + " " + t("of") + " " + session.questions.length
  scoreEl.textContent = correct + " / " + attempted
  let html = ""
  if (q.type === "mcq") html = renderMcq(q)
  else if (q.type === "image_id") html = renderImage(q)
  else if (q.type === "diagnosis") html = renderDiagnosis(q)
  else html = renderShort(q)
  html += feedbackHtml()
  html += nextHtml()
  app.innerHTML = html
}

function renderDone() {
  stopTicker()
  progressEl.textContent = t("done")
  clockEl.textContent = "—"
  scoreEl.textContent = correct + " / " + attempted
  app.innerHTML =
    '<div class="bb-panel"><p class="bb-panel__text">' +
    esc(t("done")) +
    " " +
    esc(t("scored")) +
    " " +
    correct +
    " / " +
    attempted +
    '.</p><div class="bb-actions"><button type="button" class="about-action" id="bb-again">' +
    esc(t("again")) +
    '</button><a class="about-action about-action--ghost" href="practice-mistakes.html' +
    (demo ? "?demo=1" : "") +
    '">' +
    esc(t("mistakes")) +
    "</a></div></div>"
}

function render() {
  if (screen === "setup") {
    progressEl.textContent = "—"
    clockEl.textContent = "—"
    scoreEl.textContent = "0 / 0"
    renderSetup()
  } else if (screen === "empty") {
    app.innerHTML = '<article class="bb-panel"><p class="bb-panel__text">' + esc(t("empty")) + "</p></article>"
  } else if (screen === "done") renderDone()
  else renderRun()
  if (window.BBProgress) window.BBProgress.refreshPracticeChrome()
}

app.addEventListener("click", (e) => {
  const btn = e.target.closest("button")
  if (!btn) return
  if (btn.dataset.mode) {
    mode = btn.dataset.mode
    render()
    return
  }
  if (btn.hasAttribute("data-module")) {
    moduleId = btn.getAttribute("data-module") || ""
    render()
    return
  }
  if (btn.id === "bb-start") {
    startSession({ questionIds: drill?.questionIds, count: drill?.questionIds ? 0 : 10 })
    return
  }
  if (btn.id === "bb-again") {
    screen = "setup"
    render()
    return
  }
  if (btn.id === "bb-next") {
    goNext()
    return
  }
  if (btn.id === "bb-dx-continue") {
    dxPhase = "dx-tests"
    render()
    return
  }
  if (btn.id === "bb-dx-lock") {
    testsLocked = true
    dxPhase = "dx-diagnose"
    render()
    return
  }
  if (btn.dataset.choice && !revealed) {
    picked = btn.dataset.choice
    submitAnswer(btn.dataset.choice)
    return
  }
  if (btn.dataset.hotspot && !revealed) {
    picked = btn.dataset.hotspot
    submitAnswer(btn.dataset.hotspot)
    return
  }
  if (btn.dataset.test && !testsLocked && !revealed) {
    const q = current()
    const c = q && dxCase(q)
    const max = c?.maxTests || 2
    if (!selectedTests.includes(btn.dataset.test) && selectedTests.length < max) {
      selectedTests = selectedTests.concat(btn.dataset.test)
      if (selectedTests.length >= max) {
        testsLocked = true
        dxPhase = "dx-diagnose"
      }
      render()
    }
    return
  }
  if (btn.dataset.dx && !revealed) {
    picked = btn.dataset.dx
    testsLocked = true
    submitAnswer(btn.dataset.dx)
    return
  }
  if (btn.id === "bb-check") {
    const q = current()
    if (q?.type === "mcq") submitAnswer(picked || "")
    else if (q?.type === "diagnosis") submitAnswer(picked || document.getElementById("bb-input")?.value || "")
    else submitAnswer(document.getElementById("bb-input")?.value || "")
  }
})

app.addEventListener("keydown", (e) => {
  if (e.key !== "Enter" || revealed) return
  if (e.target.id === "bb-input") {
    e.preventDefault()
    submitAnswer(e.target.value || "")
  }
})

window.__neyronAfterSetLang = render

if (drill?.questionIds?.length && questions.length) startSession({ questionIds: drill.questionIds, count: 0 })
else render()
