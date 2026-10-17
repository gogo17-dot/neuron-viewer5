var EXAM_LENGTH = 50;
var EXAM_SECONDS = 25 * 60;

var T = {
  intro: {
    en: "Fifty questions drawn at random from the whole bank, twenty-five minutes on the clock, and no feedback until you finish. Move freely between questions and change answers while time remains.",
    az: "Bütün bankdan təsadüfi seçilmiş əlli sual, saatda iyirmi beş dəqiqə və bitirənə qədər heç bir geri bildirim. Vaxt qaldıqca suallar arasında sərbəst gəzin və cavabları dəyişin.",
  },
  start: { en: "Start exam", az: "İmtahana başla" },
  q: { en: "Question", az: "Sual" },
  of: { en: "of", az: "/" },
  answered: { en: "answered", az: "cavablandı" },
  back: { en: "Back", az: "Geri" },
  next: { en: "Next", az: "Növbəti" },
  finish: { en: "Finish", az: "Bitir" },
  finishAsk: {
    en: "Finish the exam and see your score?",
    az: "İmtahanı bitirib nəticəni görmək istəyirsiniz?",
  },
  timeUp: { en: "Time is up. The exam was submitted automatically.", az: "Vaxt bitdi. İmtahan avtomatik təhvil verildi." },
  result: { en: "Result", az: "Nəticə" },
  breakdown: { en: "By topic", az: "Mövzular üzrə" },
  mistakes: { en: "What you missed", az: "Səhv etdikləriniz" },
  correctIs: { en: "Correct answer", az: "Düzgün cavab" },
  yourAnswer: { en: "Your answer", az: "Sizin cavabınız" },
  blank: { en: "left blank", az: "boş buraxıldı" },
  again: { en: "New exam", az: "Yeni imtahan" },
  perfect: { en: "Nothing missed. Every question correct.", az: "Səhv yoxdur. Bütün suallar düzgündür." },
  weakest: {
    en: "Weakest topics first — take those into the practice drills.",
    az: "Ən zəif mövzular əvvəldədir — onları məşq tapşırıqlarına aparın.",
  },
};

var state = "intro";
var deck = [];
var answers = [];
var qi = 0;
var remaining = EXAM_SECONDS;
var ticker = null;
var autoSubmitted = false;

function t(key) {
  return BB.loc(T[key]);
}

function root() {
  return document.getElementById("bb-exam");
}

function clock(secs) {
  var m = Math.floor(secs / 60);
  var s = secs % 60;
  return m + ":" + (s < 10 ? "0" + s : s);
}

function startExam() {
  deck = BB.deckFrom(BB_QUESTIONS).slice(0, EXAM_LENGTH);
  answers = deck.map(function () {
    return null;
  });
  qi = 0;
  remaining = EXAM_SECONDS;
  autoSubmitted = false;
  state = "running";
  stopTicker();
  ticker = window.setInterval(tick, 1000);
  render();
}

function stopTicker() {
  if (ticker) {
    window.clearInterval(ticker);
    ticker = null;
  }
}

function tick() {
  remaining -= 1;
  if (remaining <= 0) {
    remaining = 0;
    autoSubmitted = true;
    finish();
    return;
  }
  var el = document.getElementById("bb-timer");
  if (el) el.textContent = clock(remaining);
}

function finish() {
  stopTicker();
  deck.forEach(function (item, i) {
    if (answers[i] != null) BB.record(item.q.id, answers[i] === item.correct);
  });
  state = "done";
  render();
}

function answeredCount() {
  return answers.filter(function (a) {
    return a != null;
  }).length;
}

function renderIntro() {
  var html = "";
  html += '<article class="bb-panel"><p class="bb-panel__text">' + BB.esc(t("intro")) + "</p>";
  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-exam-start">' +
    BB.esc(t("start")) +
    "</button></div></article>";
  root().innerHTML = html;
  document.getElementById("bb-exam-start").addEventListener("click", startExam);
}

function renderRunning() {
  var item = deck[qi];
  var q = item.q;
  var html = "";

  html +=
    '<div class="bb-toolbar"><p class="bb-score">' +
    BB.esc(t("q")) +
    " " +
    (qi + 1) +
    " " +
    BB.esc(t("of")) +
    " " +
    deck.length +
    '</p><p class="bb-score bb-score--muted"><span class="bb-score__n">' +
    answeredCount() +
    " / " +
    deck.length +
    "</span> " +
    BB.esc(t("answered")) +
    '</p><p class="bb-score bb-clock"><span class="bb-score__n" id="bb-timer">' +
    clock(remaining) +
    "</span></p></div>";

  html += '<p class="bb-quiz-q">' + BB.esc(BB.loc(q.q)) + "</p>";
  html += '<div class="bb-choice-list">';
  item.order.forEach(function (originalIndex, displayIndex) {
    html +=
      '<button type="button" class="bb-choice' +
      (answers[qi] === displayIndex ? " is-on" : "") +
      '" data-i="' +
      displayIndex +
      '">' +
      BB.esc(BB.loc(q.choices[originalIndex])) +
      "</button>";
  });
  html += "</div>";

  html += '<div class="bb-actions">';
  if (qi > 0) {
    html += '<button type="button" class="about-action about-action--ghost" id="bb-exam-back">' + BB.esc(t("back")) + "</button>";
  }
  if (qi < deck.length - 1) {
    html += '<button type="button" class="about-action" id="bb-exam-next">' + BB.esc(t("next")) + "</button>";
  }
  html += '<button type="button" class="about-action" id="bb-exam-finish">' + BB.esc(t("finish")) + "</button>";
  html += "</div>";

  root().innerHTML = html;

  root().querySelectorAll(".bb-choice").forEach(function (btn) {
    btn.addEventListener("click", function () {
      answers[qi] = parseInt(btn.getAttribute("data-i"), 10);
      render();
    });
  });
  var back = document.getElementById("bb-exam-back");
  if (back) {
    back.addEventListener("click", function () {
      qi -= 1;
      render();
    });
  }
  var next = document.getElementById("bb-exam-next");
  if (next) {
    next.addEventListener("click", function () {
      qi += 1;
      render();
    });
  }
  document.getElementById("bb-exam-finish").addEventListener("click", function () {
    if (!window.confirm(t("finishAsk"))) return;
    finish();
  });
}

function renderDone() {
  var score = 0;
  var bySub = {};
  var missed = [];

  deck.forEach(function (item, i) {
    var sub = item.q.sub;
    if (!bySub[sub]) bySub[sub] = { right: 0, total: 0 };
    bySub[sub].total += 1;
    if (answers[i] === item.correct) {
      score += 1;
      bySub[sub].right += 1;
    } else {
      missed.push({ item: item, given: answers[i] });
    }
  });

  var html = "";
  if (autoSubmitted) html += '<p class="bb-hint">' + BB.esc(t("timeUp")) + "</p>";

  html +=
    '<div class="bb-toolbar"><p class="bb-score">' +
    BB.esc(t("result")) +
    ' <span class="bb-score__n">' +
    score +
    " / " +
    deck.length +
    '</span></p><p class="bb-score bb-score--muted"><span class="bb-score__n">' +
    Math.round((score / deck.length) * 100) +
    "%</span></p></div>";

  var subs = Object.keys(bySub).sort(function (a, b) {
    return bySub[a].right / bySub[a].total - bySub[b].right / bySub[b].total;
  });
  html += '<article class="bb-panel"><h2 class="bb-panel__title">' + BB.esc(t("breakdown")) + "</h2>";
  html += '<p class="bb-panel__text">' + BB.esc(t("weakest")) + "</p>";
  html += '<ul class="bb-breakdown">';
  subs.forEach(function (sub) {
    var row = bySub[sub];
    var pct = Math.round((row.right / row.total) * 100);
    html +=
      '<li class="bb-breakdown__row"><span class="bb-breakdown__name">' +
      BB.esc(BB.loc(BB.subLabel(sub))) +
      '</span><span class="bb-breakdown__bar" aria-hidden="true"><span style="width:' +
      pct +
      '%"></span></span><span class="bb-breakdown__n">' +
      row.right +
      " / " +
      row.total +
      "</span></li>";
  });
  html += "</ul></article>";

  html += '<article class="bb-panel"><h2 class="bb-panel__title">' + BB.esc(t("mistakes")) + "</h2>";
  if (!missed.length) {
    html += '<p class="bb-panel__text">' + BB.esc(t("perfect")) + "</p>";
  } else {
    missed.forEach(function (entry) {
      var q = entry.item.q;
      var rightText = BB.loc(q.choices[q.answer]);
      var givenText =
        entry.given == null ? t("blank") : BB.loc(q.choices[entry.item.order[entry.given]]);
      html += '<div class="bb-missed">';
      html += '<p class="bb-missed__q">' + BB.esc(BB.loc(q.q)) + "</p>";
      html +=
        '<p class="bb-missed__line"><span class="bb-missed__tag">' +
        BB.esc(t("correctIs")) +
        "</span> " +
        BB.esc(rightText) +
        "</p>";
      html +=
        '<p class="bb-missed__line bb-missed__line--dim"><span class="bb-missed__tag">' +
        BB.esc(t("yourAnswer")) +
        "</span> " +
        BB.esc(givenText) +
        "</p>";
      html += '<p class="bb-missed__why">' + BB.whyHtml(BB.loc(q.why)) + "</p>";
      if (q.see) {
        html +=
          '<p class="bb-see"><a class="bb-link" href="' +
          BB.esc(q.see.href) +
          '">' +
          BB.esc(BB.loc(q.see)) +
          "</a></p>";
      }
      html += "</div>";
    });
  }
  html += "</article>";

  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-exam-again">' +
    BB.esc(t("again")) +
    "</button></div>";

  root().innerHTML = html;
  document.getElementById("bb-exam-again").addEventListener("click", startExam);
}

function render() {
  if (!root()) return;
  if (state === "intro") return renderIntro();
  if (state === "running") return renderRunning();
  return renderDone();
}

window.__neyronAfterSetLang = function () {
  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
