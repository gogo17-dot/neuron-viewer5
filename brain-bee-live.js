var SECONDS_PER_Q = 45;
var STRIKES_ALLOWED = 2;

var T = {
  intro: {
    en: "One question at a time, forty-five seconds each, and two wrong answers end the round. Running out of time counts as a wrong answer, exactly as hesitating does on stage.",
    az: "Bir dəfəyə bir sual, hər birinə qırx beş saniyə və iki səhv cavab turu bitirir. Vaxtın bitməsi səhv cavab sayılır — səhnədə tərəddüd etmək kimi.",
  },
  start: { en: "Start round", az: "Tura başla" },
  strikes: { en: "Strikes", az: "Səhvlər" },
  streak: { en: "Correct", az: "Düzgün" },
  answer: { en: "Lock in", az: "Təsdiqlə" },
  next: { en: "Next question", az: "Növbəti sual" },
  right: { en: "Correct.", az: "Düzgün." },
  wrong: { en: "Wrong.", az: "Səhv." },
  timeout: { en: "Out of time — counted as a strike.", az: "Vaxt bitdi — səhv sayıldı." },
  out: { en: "Round over", az: "Tur bitdi" },
  outText: {
    en: "Two strikes. You answered {n} correctly before going out.",
    az: "İki səhv. Çıxmadan əvvəl {n} düzgün cavab verdiniz.",
  },
  cleared: {
    en: "You answered the entire bank without going out. That is the whole of it — {n} questions.",
    az: "Bütün bankı səhvsiz bitirdiniz. Bu, hamısıdır — {n} sual.",
  },
  again: { en: "New round", az: "Yeni tur" },
  best: { en: "Best run", az: "Ən yaxşı nəticə" },
};

var BEST_KEY = "neyron_bb_live_best";

var state = "intro";
var deck = [];
var qi = 0;
var picked = null;
var strikes = 0;
var streak = 0;
var remaining = SECONDS_PER_Q;
var ticker = null;
var lastOutcome = null;

function t(key) {
  return BB.loc(T[key]);
}

function fill(key, n) {
  return t(key).replace("{n}", n);
}

function root() {
  return document.getElementById("bb-live");
}

function readBest() {
  try {
    var v = parseInt(window.localStorage.getItem(BEST_KEY), 10);
    return isNaN(v) ? 0 : v;
  } catch (e) {
    return 0;
  }
}

function writeBest(n) {
  try {
    if (n > readBest()) window.localStorage.setItem(BEST_KEY, String(n));
  } catch (e) {
    /* progress simply will not persist */
  }
}

function startRound() {
  deck = BB.deckFrom(BB_QUESTIONS);
  qi = 0;
  picked = null;
  strikes = 0;
  streak = 0;
  lastOutcome = null;
  state = "running";
  beginTimer();
  render();
}

function beginTimer() {
  stopTicker();
  remaining = SECONDS_PER_Q;
  ticker = window.setInterval(tick, 1000);
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
    stopTicker();
    resolve(null);
    return;
  }
  var el = document.getElementById("bb-live-timer");
  if (el) el.textContent = String(remaining);
}

function resolve(choiceIndex) {
  stopTicker();
  var item = deck[qi];
  var wasCorrect = choiceIndex != null && choiceIndex === item.correct;
  BB.record(item.q.id, wasCorrect);

  if (wasCorrect) {
    streak += 1;
    lastOutcome = "right";
  } else {
    strikes += 1;
    lastOutcome = choiceIndex == null ? "timeout" : "wrong";
  }

  if (strikes >= STRIKES_ALLOWED) {
    writeBest(streak);
    state = "out";
  } else {
    state = "feedback";
  }
  render();
}

function advance() {
  qi += 1;
  picked = null;
  if (qi >= deck.length) {
    writeBest(streak);
    state = "cleared";
    render();
    return;
  }
  state = "running";
  beginTimer();
  render();
}

function statusHtml() {
  var dots = "";
  var i;
  for (i = 0; i < STRIKES_ALLOWED; i++) {
    dots += '<span class="bb-strike' + (i < strikes ? " is-on" : "") + '" aria-hidden="true"></span>';
  }
  return (
    '<div class="bb-toolbar"><p class="bb-score">' +
    BB.esc(t("streak")) +
    ' <span class="bb-score__n">' +
    streak +
    '</span></p><p class="bb-score">' +
    BB.esc(t("strikes")) +
    ' <span class="bb-strikes">' +
    dots +
    '</span></p><p class="bb-score bb-clock"><span class="bb-score__n" id="bb-live-timer">' +
    (state === "running" ? remaining : 0) +
    "</span></p></div>"
  );
}

function renderIntro() {
  var best = readBest();
  var html = '<article class="bb-panel"><p class="bb-panel__text">' + BB.esc(t("intro")) + "</p>";
  if (best) {
    html += '<p class="bb-panel__text bb-panel__text--dim">' + BB.esc(t("best")) + ": " + best + "</p>";
  }
  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-live-start">' +
    BB.esc(t("start")) +
    "</button></div></article>";
  root().innerHTML = html;
  document.getElementById("bb-live-start").addEventListener("click", startRound);
}

function renderQuestion(locked) {
  var item = deck[qi];
  var q = item.q;
  var html = statusHtml();
  html += '<p class="bb-quiz-q">' + BB.esc(BB.loc(q.q)) + "</p>";
  html += '<div class="bb-choice-list">';
  item.order.forEach(function (originalIndex, displayIndex) {
    var cls = "bb-choice";
    if (locked) {
      if (displayIndex === item.correct) cls += " is-right";
      else if (displayIndex === picked) cls += " is-wrong";
    } else if (picked === displayIndex) cls += " is-on";
    html +=
      '<button type="button" class="' +
      cls +
      '" data-i="' +
      displayIndex +
      '"' +
      (locked ? " disabled" : "") +
      ">" +
      BB.esc(BB.loc(q.choices[originalIndex])) +
      "</button>";
  });
  html += "</div>";

  if (!locked) {
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-live-lock"' +
      (picked == null ? " disabled" : "") +
      ">" +
      BB.esc(t("answer")) +
      "</button></div>";
  } else {
    var head = lastOutcome === "right" ? t("right") : lastOutcome === "timeout" ? t("timeout") : t("wrong");
    html += '<article class="bb-panel"><p class="bb-panel__title">' + BB.esc(head) + "</p>";
    html += '<p class="bb-panel__text">' + BB.whyHtml(BB.loc(q.why)) + "</p>";
    if (q.see) {
      html +=
        '<p class="bb-see"><a class="bb-link" href="' +
        BB.esc(q.see.href) +
        '">' +
        BB.esc(BB.loc(q.see)) +
        "</a></p>";
    }
    html += "</article>";
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-live-next">' +
      BB.esc(t("next")) +
      "</button></div>";
  }

  root().innerHTML = html;

  if (!locked) {
    root().querySelectorAll(".bb-choice").forEach(function (btn) {
      btn.addEventListener("click", function () {
        picked = parseInt(btn.getAttribute("data-i"), 10);
        render();
      });
    });
    document.getElementById("bb-live-lock").addEventListener("click", function () {
      if (picked == null) return;
      resolve(picked);
    });
  } else {
    document.getElementById("bb-live-next").addEventListener("click", advance);
  }
}

function renderEnd(cleared) {
  var html = statusHtml();
  html += '<article class="bb-panel"><h2 class="bb-panel__title">' + BB.esc(cleared ? t("cleared").split(".")[0] : t("out")) + "</h2>";
  html += '<p class="bb-panel__text">' + BB.esc(cleared ? fill("cleared", deck.length) : fill("outText", streak)) + "</p>";
  html += '<p class="bb-panel__text bb-panel__text--dim">' + BB.esc(t("best")) + ": " + readBest() + "</p>";
  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-live-again">' +
    BB.esc(t("again")) +
    "</button></div></article>";
  root().innerHTML = html;
  document.getElementById("bb-live-again").addEventListener("click", startRound);
}

function render() {
  if (!root()) return;
  if (state === "intro") return renderIntro();
  if (state === "running") return renderQuestion(false);
  if (state === "feedback") return renderQuestion(true);
  return renderEnd(state === "cleared");
}

window.__neyronAfterSetLang = function () {
  render();
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
