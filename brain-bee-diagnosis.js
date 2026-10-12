import { cases } from "./brain-bee-cases.js";
import { caseAz } from "./brain-bee-az.js";

var UI = {
  progress: { en: "Case", az: "Hal" },
  of: { en: "of", az: " / " },
  complete: { en: "Session complete", az: "Sessiya bitdi" },
  scored: { en: "You scored", az: "Nəticəniz" },
  restart: { en: "New randomised session", az: "Yeni qarışıq sessiya" },
  none: { en: "No cases loaded.", az: "Hal yüklənmədi." },
  history: { en: "History", az: "Tarixçə" },
  presentation: { en: "Presentation", az: "Müayinə" },
  pick: { en: "Select exactly 3 tests", az: "Dəqiq 3 test seçin" },
  reveal: { en: "Show the 3 results", az: "3 nəticəni göstər" },
  chosen: { en: "Chosen results", az: "Seçilmiş nəticələr" },
  diagnosis: { en: "Diagnosis", az: "Diaqnoz" },
  placeholder: {
    en: "Type the disorder — no list is given",
    az: "Pozğunluğu yazın — siyahı verilmir",
  },
  submit: { en: "Submit diagnosis", az: "Diaqnozu göndər" },
  correct: { en: "Correct", az: "Düzgün" },
  incorrect: { en: "Incorrect —", az: "Səhv —" },
  missedTitle: { en: "What you did not order", az: "Sifariş etmədiyiniz testlər" },
  missedHint: {
    en: "The two most informative tests among those you left unselected:",
    az: "Seçmədiyiniz testlər arasında ən məlumatlı iki nəticə:",
  },
  next: { en: "Next case", az: "Növbəti hal" },
  neuroimg: { en: "Neuroimaging", az: "Neyrogörüntüləmə" },
  neurophys: { en: "Neurophysiological", az: "Neyrofizioloji" },
  cognitive: { en: "Cognitive Measures", az: "Koqnitiv ölçülər" },
  biofluid: { en: "Biofluid Biomarkers", az: "Biofluid biomarkerləri" },
  cogBtn: { en: "Cognitive measures", az: "Koqnitiv ölçülər" },
};

var TEST_GROUPS = [
  {
    titleKey: "neuroimg",
    items: [
      { key: "ct", en: "CT", az: "KT" },
      { key: "pet_spect", en: "PET/SPECT", az: "PET/SPECT" },
      { key: "mri", en: "MRI", az: "MRT" },
    ],
  },
  {
    titleKey: "neurophys",
    items: [
      { key: "eeg", en: "EEG", az: "EEQ" },
      { key: "ncs", en: "NCS", az: "Sinir keçiriciliyi" },
    ],
  },
  {
    titleKey: "cognitive",
    items: [{ key: "cognitive", en: "Cognitive measures", az: "Koqnitiv ölçülər" }],
    single: true,
  },
  {
    titleKey: "biofluid",
    items: [
      { key: "blood", en: "Blood", az: "Qan" },
      { key: "csf", en: "CSF", az: "OBM" },
    ],
  },
];

var LOW_YIELD =
  /^(normal\b|unremarkable)|not (indicated|used|typically|a first-line|part of|informative)|adds no acute|does not (localise|show)|insensitive|limited on ct|göstəriş yoxdur|diqqətəlayiq deyil|bir hissəsi deyil/i;

function lang() {
  return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
}

function t(key) {
  var row = UI[key];
  if (!row) return key;
  return lang() === "az" ? row.az : row.en;
}

function testLabel(item) {
  return lang() === "az" ? item.az : item.en;
}

function labelForKey(key) {
  var found = key;
  TEST_GROUPS.forEach(function (g) {
    g.items.forEach(function (it) {
      if (it.key === key) found = testLabel(it);
    });
  });
  return found;
}

function viewCase(c) {
  var az = caseAz[c.id];
  if (lang() !== "az" || !az) return c;
  return {
    history: az.history || c.history,
    presentation: az.presentation || c.presentation,
    tests: az.tests || c.tests,
    explanation: az.explanation || c.explanation,
    answer: az.answer || c.answer,
  };
}

function shuffle(list) {
  var a = list.slice();
  var i;
  for (i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
  }
  return a;
}

function words(s) {
  return String(s).trim().toLowerCase().replace(/\s+/g, " ");
}

function isMatch(input, c) {
  var n = words(input);
  if (!n) return false;
  var az = caseAz[c.id] || {};
  var opts = [c.answer]
    .concat(c.acceptedAnswers || [])
    .concat(az.answer ? [az.answer] : [])
    .concat(az.acceptedAnswers || [])
    .map(words);
  return opts.indexOf(n) !== -1;
}

function yieldScore(text) {
  var raw = String(text || "");
  if (LOW_YIELD.test(raw.trim())) return 0;
  var hits = raw.match(
    /atroph|lesion|dawson|oligoclon|decrement|jitter|sharp wave|restrict|dwi|antibod|elevat|reduc|enhanc|hypomet|infarct|hyperdense|pleocyt|glucose 1|ck is|thiamine|datscan|dopamin|hippocamp|caudate|denerv|conduction|gram-positive|neutrophil|sclerosis|mammillary|periaqueduct|dystrophin|cag|wbc 1|cloudy|fibrillat|myopath|tau|amyloid|atrof|zədələnm|azalmış|artmış|müsbət/gi
  );
  return 3 + (hits ? hits.length : 0);
}

function twoMissed(c, selected) {
  var tests = viewCase(c).tests;
  var keys = Object.keys(c.tests).filter(function (k) {
    return selected.indexOf(k) === -1;
  });
  keys.sort(function (a, b) {
    return yieldScore(tests[b] || c.tests[b]) - yieldScore(tests[a] || c.tests[a]);
  });
  return keys.slice(0, 2);
}

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

var deck = shuffle(cases);
var index = 0;
var correct = 0;
var attempted = 0;
var selected = [];
var phase = "tests";
var lastOk = false;
var missed = [];

var app = document.getElementById("bb-app");
var progressEl = document.getElementById("bb-progress");
var scoreEl = document.getElementById("bb-score");

function current() {
  return deck[index];
}

function updateChrome() {
  if (!deck.length) {
    progressEl.textContent = t("none");
  } else if (index >= deck.length) {
    progressEl.textContent = t("complete");
  } else {
    progressEl.textContent = t("progress") + " " + (index + 1) + " " + t("of") + " " + deck.length;
  }
  scoreEl.textContent = correct + " / " + attempted;
}

function render() {
  updateChrome();
  if (!deck.length) {
    app.innerHTML = '<p class="bb-hint">' + esc(t("none")) + "</p>";
    return;
  }
  if (index >= deck.length) {
    app.innerHTML =
      '<div class="bb-panel">' +
      '<h2 class="about-block__title">' +
      esc(t("complete")) +
      "</h2>" +
      '<p class="bb-hint">' +
      esc(t("scored")) +
      " " +
      correct +
      " / " +
      attempted +
      ".</p>" +
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-restart">' +
      esc(t("restart")) +
      "</button></div></div>";
    document.getElementById("bb-restart").addEventListener("click", restart);
    return;
  }

  var raw = current();
  var c = viewCase(raw);
  var html = "";
  html += '<article class="bb-panel"><p class="bb-panel__label">' + esc(t("history")) + "</p>";
  html += '<p class="bb-panel__text">' + esc(c.history) + "</p></article>";
  html += '<article class="bb-panel"><p class="bb-panel__label">' + esc(t("presentation")) + "</p>";
  html += '<p class="bb-panel__text">' + esc(c.presentation) + "</p></article>";

  if (phase === "tests") {
    html +=
      '<p class="bb-hint">' +
      esc(t("pick")) +
      " (" +
      selected.length +
      " / 3).</p>";
    TEST_GROUPS.forEach(function (g) {
      html += '<div class="bb-test-group">';
      html += '<h2 class="bb-test-group__title">' + esc(t(g.titleKey)) + "</h2>";
      html += '<div class="bb-test-row' + (g.single ? " bb-test-row--single" : "") + '">';
      g.items.forEach(function (it) {
        var on = selected.indexOf(it.key) !== -1;
        var locked = selected.length >= 3 && !on;
        html +=
          '<button type="button" class="bb-chip' +
          (on ? " is-on" : "") +
          '" data-test="' +
          it.key +
          '"' +
          (locked ? " disabled" : "") +
          ">" +
          esc(testLabel(it)) +
          "</button>";
      });
      html += "</div></div>";
    });
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-reveal"' +
      (selected.length === 3 ? "" : " disabled") +
      ">" +
      esc(t("reveal")) +
      "</button></div>";
  }

  if (phase === "diagnose" || phase === "feedback") {
    html += '<h2 class="about-block__title">' + esc(t("chosen")) + "</h2>";
    selected.forEach(function (k) {
      html += '<article class="bb-result">';
      html += '<p class="bb-result__name">' + esc(labelForKey(k)) + "</p>";
      html += '<p class="bb-result__body">' + esc(c.tests[k]) + "</p>";
      html += "</article>";
    });
  }

  if (phase === "diagnose") {
    html += '<form class="bb-panel" id="bb-dx-form">';
    html += '<label class="bb-field"><span class="bb-field__label">' + esc(t("diagnosis")) + "</span>";
    html +=
      '<input class="bb-input" id="bb-dx" name="diagnosis" autocomplete="off" required placeholder="' +
      esc(t("placeholder")) +
      '" /></label>';
    html +=
      '<div class="bb-actions"><button type="submit" class="about-action">' +
      esc(t("submit")) +
      "</button></div></form>";
  }

  if (phase === "feedback") {
    html += '<article class="bb-panel bb-feedback ' + (lastOk ? "is-ok" : "is-no") + '">';
    html +=
      '<p class="bb-panel__label">' +
      (lastOk ? esc(t("correct")) : esc(t("incorrect")) + " " + esc(c.answer)) +
      "</p>";
    html += '<p class="bb-panel__text">' + esc(c.explanation) + "</p></article>";
    html += '<h2 class="about-block__title">' + esc(t("missedTitle")) + "</h2>";
    html += '<p class="bb-hint">' + esc(t("missedHint")) + "</p>";
    missed.forEach(function (k) {
      html += '<article class="bb-result">';
      html += '<p class="bb-result__name">' + esc(labelForKey(k)) + "</p>";
      html += '<p class="bb-result__body">' + esc(c.tests[k]) + "</p>";
      html += "</article>";
    });
    html +=
      '<div class="bb-actions"><button type="button" class="about-action" id="bb-next">' +
      esc(t("next")) +
      "</button></div>";
  }

  app.innerHTML = html;
  bind();
}

function bind() {
  app.querySelectorAll(".bb-chip").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var key = btn.getAttribute("data-test");
      var i = selected.indexOf(key);
      if (i !== -1) selected.splice(i, 1);
      else if (selected.length < 3) selected.push(key);
      render();
    });
  });
  var reveal = document.getElementById("bb-reveal");
  if (reveal) {
    reveal.addEventListener("click", function () {
      if (selected.length !== 3) return;
      phase = "diagnose";
      render();
      var input = document.getElementById("bb-dx");
      if (input) input.focus();
    });
  }
  var form = document.getElementById("bb-dx-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("bb-dx");
      var c = current();
      lastOk = isMatch(input.value, c);
      attempted += 1;
      if (lastOk) correct += 1;
      missed = twoMissed(c, selected);
      phase = "feedback";
      render();
    });
  }
  var next = document.getElementById("bb-next");
  if (next) {
    next.addEventListener("click", function () {
      index += 1;
      selected = [];
      phase = "tests";
      lastOk = false;
      missed = [];
      render();
    });
  }
}

function restart() {
  deck = shuffle(cases);
  index = 0;
  correct = 0;
  attempted = 0;
  selected = [];
  phase = "tests";
  lastOk = false;
  missed = [];
  render();
}

window.__neyronAfterSetLang = function () {
  render();
};

render();
