var UI = {
  all: { en: "All", az: "Hamısı" },
  anatomy: { en: "Anatomy", az: "Anatomiya" },
  function: { en: "Function", az: "Funksiya" },
  missed: { en: "Review missed", az: "Səhvləri təkrarla" },
  next: { en: "Next", az: "Növbəti" },
  restart: { en: "Restart", az: "Yenidən" },
  check: { en: "Check", az: "Yoxla" },
  score: { en: "Score", az: "Nəticə" },
  q: { en: "Question", az: "Sual" },
  of: { en: "of", az: "/" },
  done: { en: "Practice round complete.", az: "Məşq turu bitdi." },
  pick: { en: "Choose an answer, then check.", az: "Cavab seçin, sonra yoxlayın." },
  seen: { en: "seen", az: "baxılıb" },
  reset: { en: "Reset progress", az: "Gedişatı sıfırla" },
  resetAsk: {
    en: "Clear your saved progress and missed-question queue?",
    az: "Saxlanmış gedişat və səhv suallar siyahısı silinsin?",
  },
  emptyMissed: {
    en: "Nothing to review yet. Missed questions collect here, and each one leaves the queue after you answer it correctly twice in a row.",
    az: "Hələ təkrarlanacaq sual yoxdur. Səhv cavablandırdığınız suallar burada toplanır və ardıcıl iki dəfə düzgün cavabdan sonra siyahıdan çıxır.",
  },
  clearedMissed: {
    en: "Missed queue cleared — every one of them answered correctly twice in a row.",
    az: "Səhvlər siyahısı təmizləndi — hər biri ardıcıl iki dəfə düzgün cavablandırıldı.",
  },
};

var filter = "all";
var deck = [];
var qi = 0;
var picked = null;
var revealed = false;
var correct = 0;
var attempted = 0;

function t(key) {
  return BB.loc(UI[key]);
}

function pool() {
  if (filter === "missed") return BB.missedQuestions();
  return BB.byTopic(filter);
}

function rebuildDeck() {
  deck = BB.deckFrom(pool());
  qi = 0;
  picked = null;
  revealed = false;
}

function current() {
  return deck[qi];
}

function toolbarHtml() {
  return (
    '<div class="bb-toolbar"><p class="bb-score">' +
    BB.esc(t("q")) +
    " " +
    (deck.length ? Math.min(qi + 1, deck.length) : 0) +
    " " +
    BB.esc(t("of")) +
    " " +
    deck.length +
    '</p><p class="bb-score">' +
    BB.esc(t("score")) +
    ' <span class="bb-score__n">' +
    correct +
    " / " +
    attempted +
    '</span></p><p class="bb-score bb-score--muted"><span class="bb-score__n">' +
    BB.seenCount() +
    " / " +
    BB.total() +
    "</span> " +
    BB.esc(t("seen")) +
    "</p></div>"
  );
}

function filtersHtml() {
  var html = '<div class="articles-topics bb-quiz-filters" role="group">';
  ["all", "anatomy", "function", "missed"].forEach(function (f) {
    var label = BB.esc(t(f === "missed" ? "missed" : f));
    if (f === "missed") {
      var n = BB.missedIds().length;
      if (n) label += " (" + n + ")";
    }
    html +=
      '<button type="button" class="articles-topic' +
      (filter === f ? " is-active" : "") +
      '" data-filter="' +
      f +
      '">' +
      label +
      "</button>";
  });
  html += "</div>";
  return html;
}

function render() {
  var root = document.getElementById("bb-quiz");
  if (!root) return;
  var html = filtersHtml() + toolbarHtml();

  if (!deck.length) {
    var msg = filter === "missed" ? (BB.missedIds().length ? "emptyMissed" : "emptyMissed") : "done";
    html += '<article class="bb-panel"><p class="bb-panel__text">' + BB.esc(t(msg)) + "</p></article>";
    html += resetHtml();
    root.innerHTML = html;
    bindShell(root);
    return;
  }

  if (qi >= deck.length) {
    html += '<div class="bb-panel"><p class="bb-panel__text">';
    html += BB.esc(filter === "missed" && !BB.missedIds().length ? t("clearedMissed") : t("done"));
    html += "</p>";
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-quiz-restart">' +
      BB.esc(t("restart")) +
      "</button></div></div>";
    html += resetHtml();
    root.innerHTML = html;
    bindShell(root);
    document.getElementById("bb-quiz-restart").addEventListener("click", function () {
      correct = 0;
      attempted = 0;
      rebuildDeck();
      render();
    });
    return;
  }

  var item = current();
  var q = item.q;
  html += '<p class="bb-quiz-q">' + BB.esc(BB.loc(q.q)) + "</p>";
  html += '<div class="bb-choice-list">';
  item.order.forEach(function (originalIndex, displayIndex) {
    var cls = "bb-choice";
    if (revealed) {
      if (displayIndex === item.correct) cls += " is-right";
      else if (displayIndex === picked) cls += " is-wrong";
    } else if (picked === displayIndex) cls += " is-on";
    html +=
      '<button type="button" class="' +
      cls +
      '" data-i="' +
      displayIndex +
      '"' +
      (revealed ? " disabled" : "") +
      ">" +
      BB.esc(BB.loc(q.choices[originalIndex])) +
      "</button>";
  });
  html += "</div>";

  if (!revealed) {
    html += '<p class="bb-hint">' + BB.esc(t("pick")) + "</p>";
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-quiz-check"' +
      (picked == null ? " disabled" : "") +
      ">" +
      BB.esc(t("check")) +
      "</button></div>";
  } else {
    html += '<article class="bb-panel"><p class="bb-panel__text">' + BB.esc(BB.loc(q.why)) + "</p>";
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
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-quiz-next">' +
      BB.esc(t("next")) +
      "</button></div>";
  }

  html += resetHtml();
  root.innerHTML = html;
  bindShell(root);

  root.querySelectorAll(".bb-choice").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (revealed) return;
      picked = parseInt(btn.getAttribute("data-i"), 10);
      render();
    });
  });
  var check = document.getElementById("bb-quiz-check");
  if (check) {
    check.addEventListener("click", function () {
      if (picked == null) return;
      var item = current();
      var wasCorrect = picked === item.correct;
      attempted += 1;
      if (wasCorrect) correct += 1;
      BB.record(item.q.id, wasCorrect);
      revealed = true;
      render();
    });
  }
  var next = document.getElementById("bb-quiz-next");
  if (next) {
    next.addEventListener("click", function () {
      qi += 1;
      picked = null;
      revealed = false;
      render();
    });
  }
}

function resetHtml() {
  return (
    '<p class="bb-reset"><button type="button" class="bb-linkbtn" id="bb-reset">' +
    BB.esc(t("reset")) +
    "</button></p>"
  );
}

function bindShell(root) {
  root.querySelectorAll("[data-filter]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      filter = btn.getAttribute("data-filter");
      correct = 0;
      attempted = 0;
      rebuildDeck();
      render();
    });
  });
  var reset = document.getElementById("bb-reset");
  if (reset) {
    reset.addEventListener("click", function () {
      if (!window.confirm(t("resetAsk"))) return;
      BB.reset();
      correct = 0;
      attempted = 0;
      rebuildDeck();
      render();
    });
  }
}

rebuildDeck();

window.__neyronAfterSetLang = function () {
  render();
};

document.querySelectorAll("[data-bb-filter]").forEach(function (a) {
  a.addEventListener("click", function () {
    var f = a.getAttribute("data-bb-filter");
    if (!f) return;
    filter = f;
    correct = 0;
    attempted = 0;
    rebuildDeck();
    render();
  });
});

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", render);
} else {
  render();
}
