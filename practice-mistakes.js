import { questions as seedQuestions } from "./practice-data.js"
import { demoQuestions } from "./practice-demo.js"
import {
  accuracyByModule,
  backfillAttemptModuleIds,
  createLocalStorageAdapter,
  lessonsForModule,
  mistakesByModule,
  moduleLabel,
  writeDrill,
} from "./practice-engine.js"

const demo = new URLSearchParams(location.search).get("demo") === "1"
const questions = demo ? demoQuestions : seedQuestions
const adapter = createLocalStorageAdapter()
backfillAttemptModuleIds(adapter, questions)

if (demo) {
  const practiceLink = document.getElementById("bb-practice-link")
  if (practiceLink) practiceLink.setAttribute("href", "practice.html?demo=1")
}

const UI = {
  weak: { en: "Weak areas", az: "Zəif sahələr" },
  weakHint: {
    en: "Accuracy per module. Worst three first.",
    az: "Modul üzrə dəqiqlik. Ən zəif üçü əvvəldə.",
  },
  empty: {
    en: "No misses yet. Wrong answers from practice sessions collect here.",
    az: "Hələ səhv yoxdur. Məşq sessiyalarındakı səhv cavablar burada toplanır.",
  },
  drill: { en: "Drill these", az: "Bunları məşq et" },
  miss: { en: "miss", az: "səhv" },
  misses: { en: "misses", az: "səhv" },
  yourAnswer: { en: "Your answer", az: "Sizin cavabınız" },
  lesson: { en: "Lesson", az: "Dərs" },
  showing: { en: "Showing misses for this topic.", az: "Bu mövzunun səhvləri göstərilir." },
  showAll: { en: "Show all", az: "Hamısını göstər" },
}

const app = document.getElementById("bb-app")

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

function pick(value) {
  if (value == null) return ""
  if (typeof value === "object") return value[lang()] || value.en || ""
  return value
}

function promptFor(id) {
  return pick(questions.find((q) => q.id === id)?.prompt) || id
}

function displayAnswer(attempt) {
  const raw = attempt.userAnswer || ""
  const q = questions.find((item) => item.id === attempt.questionId)
  if (q?.type === "mcq") {
    const choice = (q.choices || []).find((c) => c.id === raw)
    if (choice) return pick(choice.text) || raw
  }
  return raw || "—"
}

function pct(n) {
  return Math.round(n * 100) + "%"
}

function lessonLinksHtml(moduleId) {
  const list = lessonsForModule(moduleId)
  if (!list.length) return ""
  return list
    .map(
      (row) =>
        '<a class="about-action about-action--ghost" href="brain-bee-lessons.html?lesson=' +
        esc(row.id) +
        '">' +
        esc(t("lesson") + " " + row.chapter) +
        "</a>",
    )
    .join("")
}

function render() {
  const attempts = adapter.getAttempts()
  const filterModule = new URLSearchParams(location.search).get("module") || ""
  const weak = accuracyByModule(attempts, questions)
  let groups = mistakesByModule(attempts, questions)
  if (filterModule) groups = groups.filter((group) => group.moduleId === filterModule)
  let html = ""
  html += '<div class="about-block"><h2 class="about-block__title">' + esc(t("weak")) + "</h2>"
  html += '<p>' + esc(t("weakHint")) + "</p></div>"
  if (filterModule) {
    html +=
      '<p class="bb-hint">' +
      esc(t("showing")) +
      ' <a href="practice-mistakes.html' +
      (demo ? "?demo=1" : "") +
      '">' +
      esc(t("showAll")) +
      "</a></p>"
  }
  if (!weak.length) {
    html += '<article class="bb-panel"><p class="bb-panel__text">' + esc(t("empty")) + "</p></article>"
    app.innerHTML = html
    return
  }
  html += '<div class="bb-breakdown">'
  weak.forEach((row, i) => {
    html +=
      '<div class="bb-breakdown__row"><span class="bb-breakdown__name">' +
      (i < 3 ? "· " : "") +
      esc(pick(moduleLabel(row.moduleId))) +
      '</span><span class="bb-breakdown__bar"><span style="width:' +
      pct(row.accuracy) +
      '"></span></span><span class="bb-breakdown__n">' +
      row.correct +
      " / " +
      row.total +
      " · " +
      pct(row.accuracy) +
      "</span></div>"
  })
  html += "</div>"
  if (!groups.length && filterModule) {
    html += '<article class="bb-panel"><p class="bb-panel__text">' + esc(t("empty")) + "</p></article>"
    app.innerHTML = html
    return
  }
  groups.forEach((group) => {
    html +=
      '<article class="bb-missed" id="bb-missed-' +
      esc(group.moduleId) +
      '"><p class="bb-missed__q">' +
      esc(pick(moduleLabel(group.moduleId)))
    html +=
      ' · ' +
      group.attempts.length +
      " " +
      (group.attempts.length === 1 ? t("miss") : t("misses")) +
      '</p><div class="bb-actions"><button type="button" class="about-action" data-drill="' +
      esc(group.questionIds.join(",")) +
      '">' +
      esc(t("drill")) +
      "</button>" +
      lessonLinksHtml(group.moduleId) +
      "</div>"
    group.attempts.forEach((attempt) => {
      html +=
        '<p class="bb-missed__line"><span class="bb-missed__tag">' +
        esc(t("yourAnswer")) +
        "</span> " +
        esc(displayAnswer(attempt)) +
        "</p>"
      html += '<p class="bb-missed__why">' + esc(promptFor(attempt.questionId)) + "</p>"
    })
    html += "</article>"
  })
  app.innerHTML = html
}

app.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-drill]")
  if (!btn) return
  const ids = btn.getAttribute("data-drill").split(",").filter(Boolean)
  writeDrill(ids)
  location.href = "practice.html" + (demo ? "?demo=1" : "")
})

window.__neyronAfterSetLang = render
render()
