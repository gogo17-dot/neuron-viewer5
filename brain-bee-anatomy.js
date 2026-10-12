/**
 * Neuroanatomy identification drill.
 *
 * Viewer, scene module and framing meshes come from brain-bee-anatomy-viewers.js.
 * The loop below is viewer-agnostic: one structure is lit, everything else drops
 * to a ghost, and the student types the name with no options offered. Every
 * scene is built with `interactive: false` so a tap on the model cannot reveal
 * the answer through the atlas popup.
 *
 * Progress lives in the structure half of neyron_bb_progress (BB.recordStructure),
 * kept apart from the multiple-choice counters.
 */
import * as THREE from "three";
import { initTheme, getTheme } from "./brainstem/theme.js";
import { DRILL_VIEWERS, DRILL_VIEWER_BY_ID, DEFAULT_VIEWER_ID } from "./brain-bee-anatomy-viewers.js";

var UI = {
  intro: {
    en: "One structure is lit on the model and you type what it is. There is no list to choose from, exactly as in the identification round. English, Azerbaijani, Latin forms and the usual abbreviations all count, and spelling is checked loosely enough that a missing accent will not fail you.",
    az: "Modeldə bir struktur işıqlanır və siz onun nə olduğunu yazırsınız. Tanınma turunda olduğu kimi, seçim siyahısı yoxdur. İngilis, Azərbaycan, latın formaları və adi qısaltmalar qəbul edilir; yazılış yumşaq yoxlanılır, buraxılmış hərf işarəsi sizi kəsməyəcək.",
  },
  start: { en: "Start drill", az: "Məşqə başla" },
  all: { en: "All structures", az: "Bütün strukturlar" },
  missed: { en: "Review missed", az: "Səhvləri təkrarla" },
  orbit: {
    en: "Drag to turn the model, scroll to zoom. The lit structure is the one to name.",
    az: "Modeli çevirmək üçün sürüşdürün, yaxınlaşdırmaq üçün fırladın. İşıqlanan struktur adlandırılmalıdır.",
  },
  prompt: { en: "Name the lit structure.", az: "İşıqlanan strukturun adını yazın." },
  label: { en: "Your answer", az: "Cavabınız" },
  placeholder: { en: "Type the name", az: "Adını yazın" },
  hint: {
    en: "Type in either language. Latin names and standard abbreviations are accepted.",
    az: "İstənilən dildə yazın. Latın adları və standart qısaltmalar qəbul edilir.",
  },
  check: { en: "Check", az: "Yoxla" },
  giveUp: { en: "Show me", az: "Cavabı göstər" },
  right: { en: "Correct", az: "Düzgün" },
  wrong: { en: "Not this one", az: "Bu deyil" },
  youTyped: { en: "You wrote", az: "Siz yazdınız" },
  answerIs: { en: "Answer", az: "Cavab" },
  next: { en: "Next structure", az: "Növbəti struktur" },
  results: { en: "See results", az: "Nəticələrə bax" },
  recentre: { en: "Recentre view", az: "Görüntünü mərkəzləşdir" },
  position: { en: "Structure", az: "Struktur" },
  of: { en: "of", az: "/" },
  score: { en: "Correct", az: "Düzgün" },
  seen: { en: "named", az: "adlandırılıb" },
  done: { en: "Drill complete", az: "Məşq bitdi" },
  doneText: { en: "You named {r} of {n} correctly.", az: "{n} strukturdan {r}-ni düzgün adlandırdınız." },
  stillMissing: { en: "Worth another pass", az: "Yenidən baxmağa dəyər" },
  perfect: {
    en: "Every structure named on the first try. Take the same drill again in a day or two to see whether it stuck.",
    az: "Bütün strukturları ilk cəhddə adlandırdınız. Bir-iki gündən sonra eyni məşqi təkrarlayıb yadda qaldığını yoxlayın.",
  },
  again: { en: "Run it again", az: "Yenidən başla" },
  reviewMissed: { en: "Drill the missed ones", az: "Səhvləri məşq et" },
  emptyMissed: {
    en: "Nothing to review yet. Structures you get wrong collect here, and each one leaves the queue once you name it correctly twice in a row.",
    az: "Hələ təkrarlanacaq struktur yoxdur. Səhv adlandırdığınız strukturlar burada toplanır və ardıcıl iki dəfə düzgün cavabdan sonra siyahıdan çıxır.",
  },
  reset: { en: "Reset progress", az: "Gedişatı sıfırla" },
  resetAsk: {
    en: "Clear your saved progress and missed queue?",
    az: "Saxlanmış gedişat və səhvlər siyahısı silinsin?",
  },
};

var viewerId = DEFAULT_VIEWER_ID;
var sceneGen = 0;

var state = "intro";
var mode = "all";
var deck = [];
var di = 0;
var draft = "";
var lastOk = null;
var lastTyped = "";
var right = 0;
var attempted = 0;
var missedThisRun = [];

var scene = null;
var modelsReady = false;
var viewDistance = 0;

function currentSpec() {
  return DRILL_VIEWER_BY_ID[viewerId] || DRILL_VIEWERS[0];
}

function t(key) {
  var spec = currentSpec();
  if (spec.copy && spec.copy[key]) return BB.loc(spec.copy[key]);
  return BB.loc(UI[key]);
}

function fill(key, values) {
  return t(key).replace(/\{(\w+)\}/g, function (_, name) {
    return values[name];
  });
}

function headEl() {
  return document.getElementById("bb-anatomy-head");
}

function bodyEl() {
  return document.getElementById("bb-anatomy");
}

function stageEl() {
  return document.getElementById("bb-anatomy-stage");
}

function current() {
  return deck[di];
}

function acceptedFor(s) {
  return [s.name.en, s.name.az].concat(s.accept.en, s.accept.az);
}

function pool() {
  if (mode === "missed") return BB.missedStructures(viewerId);
  return BB.structuresFor(viewerId);
}

function buildDeck() {
  deck = BB.shuffle(pool());
  di = 0;
  draft = "";
  lastOk = null;
  lastTyped = "";
  right = 0;
  attempted = 0;
  missedThisRun = [];
}

/* ---------- 3D ---------- */

function setNote(text) {
  var el = document.getElementById("bb-stage-note");
  if (el) el.textContent = text;
}

function fitRenderer() {
  if (!scene) return;
  var box = stageEl();
  if (!box) return;
  var w = box.clientWidth;
  var h = box.clientHeight;
  if (!w || !h) return;
  scene.camera.aspect = w / h;
  scene.camera.updateProjectionMatrix();
  // The atlas viewer sizes itself to the window, which leaves inline width and
  // height on the canvas; sizing with the style update on overwrites those so
  // the canvas matches this panel instead of overflowing it.
  scene.renderer.setSize(w, h);
}

function assemblyGroup() {
  var spec = currentSpec();
  if (spec.group) return spec.group(scene);
  return scene.assemblyRoot || scene.brainstemGroup;
}

function measureBox(box) {
  if (!box || box.isEmpty()) return null;
  var size = box.getSize(new THREE.Vector3());
  var fovRad = (scene.camera.fov * Math.PI) / 180;
  return {
    center: box.getCenter(new THREE.Vector3()),
    fit: Math.max(size.x, size.y, size.z) / (2 * Math.tan(fovRad / 2)),
  };
}

function measure(object) {
  return measureBox(new THREE.Box3().setFromObject(object));
}

function measureCore() {
  var box = new THREE.Box3();
  var keys = currentSpec().frameKeys || [];
  keys.forEach(function (key) {
    var entry = scene.structures.get(key);
    if (entry) box.expandByObject(entry.root);
  });
  return measureBox(box) || measure(assemblyGroup());
}

/**
 * Centre the lit structure but keep ghost context in frame: a small nucleus is
 * pulled closer, never so close that the surrounding model is lost, because
 * working out where you are is half of the round.
 */
function focusOn(meshName) {
  if (!scene || !modelsReady) return;
  var entry = scene.structures.get(meshName);
  if (!entry) return;
  var m = measure(entry.root);
  if (!m) return;

  var distance = Math.min(viewDistance, Math.max(m.fit * 5, viewDistance * 0.3));
  var direction = new THREE.Vector3(0.18, 0.12, 1).normalize();

  scene.camera.position.copy(m.center).addScaledVector(direction, distance);
  scene.camera.near = Math.max(distance / 1000, 0.001);
  scene.camera.far = Math.max(viewDistance * 20, distance * 20);
  scene.camera.updateProjectionMatrix();
  scene.controls.target.copy(m.center);
  scene.controls.minDistance = Math.max(distance * 0.2, 0.01);
  scene.controls.maxDistance = Math.max(viewDistance * 4, distance * 2);
  scene.controls.update();
}

/**
 * The atlas lights a selection by pushing emissive to 0.55, which reads well on
 * the night background but washes the structure out to near-white on the cream
 * day background. Day mode leans on the saturated base colour instead.
 */
function tuneHighlight() {
  if (!scene || !scene.selectedName) return;
  var entry = scene.structures.get(scene.selectedName);
  if (!entry) return;
  var day = document.documentElement.getAttribute("data-theme") === "day";
  entry.meshes.forEach(function (mesh) {
    var mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    mats.forEach(function (mat) {
      mat.emissiveIntensity = day ? 0.18 : 0.75;
    });
  });
}

function showCurrent() {
  var s = current();
  if (!s || !scene) return;
  scene.selectStructure(s.mesh);
  tuneHighlight();
  focusOn(s.mesh);
}

function onLoadProgress(loaded, total, done, failed) {
  if (!scene || scene.__drillViewer !== viewerId) return;
  if (!done) {
    setNote(t("loading") + " " + loaded + "/" + total);
    return;
  }
  if (failed >= total || loaded === 0) {
    setNote(t("loadFail"));
    return;
  }
  modelsReady = true;
  var core = measureCore();
  viewDistance = core ? core.fit * 1.85 : 0;
  setNote(t("orbit"));
  fitRenderer();
  showCurrent();
}

function tearDownScene() {
  if (scene) {
    try {
      scene.dispose();
    } catch (e) {
      /* renderer may already be gone */
    }
    scene = null;
  }
  modelsReady = false;
  viewDistance = 0;
  var old = document.getElementById("bb-stage-canvas");
  if (!old || !old.parentNode) return;
  var next = document.createElement("canvas");
  next.id = old.id;
  next.className = old.className;
  old.parentNode.replaceChild(next, old);
}

function ensureScene() {
  var spec = currentSpec();
  if (scene && scene.__drillViewer === spec.id) return;
  var token = ++sceneGen;
  tearDownScene();
  var canvas = document.getElementById("bb-stage-canvas");
  if (!canvas) return;
  setNote(t("loading"));
  spec.loadScene().then(function (Scene) {
    if (token !== sceneGen) return;
    scene = new Scene(canvas, {
      theme: getTheme(),
      interactive: false,
      onLoadProgress: onLoadProgress,
    });
    scene.__drillViewer = spec.id;
    scene.onResize = fitRenderer;
    fitRenderer();
  });
}

function showStage(show) {
  var box = stageEl();
  if (!box) return;
  box.hidden = !show;
}

/* ---------- flow ---------- */

function start() {
  buildDeck();
  if (!deck.length) {
    state = "empty";
    render();
    return;
  }
  state = "asking";
  showStage(true);
  ensureScene();
  render();
  showCurrent();
}

function setViewer(id) {
  if (!DRILL_VIEWER_BY_ID[id] || id === viewerId) return;
  viewerId = id;
  sceneGen += 1;
  tearDownScene();
  showStage(false);
  state = "intro";
  mode = "all";
  render();
}

function submit(gaveUp) {
  var s = current();
  if (!s) return;
  var typed = gaveUp ? "" : draft;
  if (!gaveUp && !typed.trim()) return;

  lastOk = gaveUp ? false : BB.answerMatches(typed, acceptedFor(s));
  lastTyped = typed;
  attempted += 1;
  if (lastOk) right += 1;
  else missedThisRun.push(s);
  BB.recordStructure(s.id, lastOk);
  state = "revealed";
  render();
}

function next() {
  di += 1;
  draft = "";
  lastOk = null;
  lastTyped = "";
  if (di >= deck.length) {
    state = "done";
    showStage(false);
    if (scene) scene.clearSelection();
    render();
    return;
  }
  state = "asking";
  render();
  showCurrent();
}

function setMode(value) {
  if (mode === value) return;
  mode = value;
  if (state === "intro") {
    render();
    return;
  }
  start();
}

/* ---------- rendering ---------- */

function viewerChipsHtml() {
  var html =
    '<div class="articles-topics bb-anatomy-viewers" role="group" aria-label="Atlas">';
  DRILL_VIEWERS.forEach(function (spec) {
    if (!BB.structuresFor(spec.id).length) return;
    html +=
      '<button type="button" class="articles-topic' +
      (viewerId === spec.id ? " is-active" : "") +
      '" data-viewer="' +
      spec.id +
      '">' +
      BB.esc(BB.loc(spec.label)) +
      "</button>";
  });
  return html + "</div>";
}

function chipsHtml() {
  var html = '<div class="articles-topics bb-quiz-filters" role="group">';
  ["all", "missed"].forEach(function (value) {
    var label = BB.esc(t(value));
    if (value === "missed") {
      var n = BB.missedStructures(viewerId).length;
      if (n) label += " (" + n + ")";
    }
    html +=
      '<button type="button" class="articles-topic' +
      (mode === value ? " is-active" : "") +
      '" data-mode="' +
      value +
      '">' +
      label +
      "</button>";
  });
  return html + "</div>";
}

function toolbarHtml() {
  var total = BB.structuresFor(viewerId).length;
  var html = '<div class="bb-toolbar">';
  if (state === "asking" || state === "revealed") {
    html +=
      '<p class="bb-score">' +
      BB.esc(t("position")) +
      " " +
      Math.min(di + 1, deck.length) +
      " " +
      BB.esc(t("of")) +
      " " +
      deck.length +
      "</p>";
    html +=
      '<p class="bb-score">' +
      BB.esc(t("score")) +
      ' <span class="bb-score__n">' +
      right +
      " / " +
      attempted +
      "</span></p>";
  }
  html +=
    '<p class="bb-score bb-score--muted"><span class="bb-score__n">' +
    BB.structuresSeenCount(viewerId) +
    " / " +
    total +
    "</span> " +
    BB.esc(t("seen")) +
    "</p></div>";
  return html;
}

function resetHtml() {
  return (
    '<p class="bb-reset"><button type="button" class="bb-linkbtn" id="bb-anatomy-reset">' +
    BB.esc(t("reset")) +
    "</button></p>"
  );
}

function renderIntro() {
  return (
    '<article class="bb-panel"><p class="bb-panel__text">' +
    BB.esc(t("intro")) +
    '</p><p class="bb-panel__text bb-panel__text--dim">' +
    BB.esc(t("weight")) +
    '</p><div class="bb-actions"><button type="button" class="about-action" id="bb-anatomy-start">' +
    BB.esc(t("start")) +
    "</button></div></article>" +
    resetHtml()
  );
}

function renderEmpty() {
  return (
    '<article class="bb-panel"><p class="bb-panel__text">' +
    BB.esc(t("emptyMissed")) +
    "</p></article>" +
    resetHtml()
  );
}

function renderAsking() {
  return (
    '<p class="bb-quiz-q">' +
    BB.esc(t("prompt")) +
    '</p><div class="bb-field"><label class="bb-field__label" for="bb-anatomy-input">' +
    BB.esc(t("label")) +
    '</label><input class="bb-input" id="bb-anatomy-input" type="text" autocomplete="off" autocapitalize="off" spellcheck="false" data-en-placeholder="' +
    BB.esc(UI.placeholder.en) +
    '" data-az-placeholder="' +
    BB.esc(UI.placeholder.az) +
    '" placeholder="' +
    BB.esc(t("placeholder")) +
    '" value="' +
    BB.esc(draft) +
    '" /></div><p class="bb-hint">' +
    BB.esc(t("hint")) +
    '</p><div class="bb-actions"><button type="button" class="about-action" id="bb-anatomy-check"' +
    (draft.trim() ? "" : " disabled") +
    ">" +
    BB.esc(t("check")) +
    '</button><button type="button" class="about-action about-action--ghost" id="bb-anatomy-giveup">' +
    BB.esc(t("giveUp")) +
    '</button><button type="button" class="about-action about-action--ghost" id="bb-anatomy-recentre">' +
    BB.esc(t("recentre")) +
    "</button></div>"
  );
}

function renderRevealed() {
  var s = current();
  var html =
    '<article class="bb-panel bb-feedback ' +
    (lastOk ? "is-ok" : "is-no") +
    '"><p class="bb-panel__label">' +
    BB.esc(lastOk ? t("right") : t("wrong")) +
    "</p>";

  if (!lastOk && lastTyped.trim()) {
    html +=
      '<p class="bb-panel__text bb-panel__text--dim">' +
      BB.esc(t("youTyped")) +
      ": " +
      BB.esc(lastTyped) +
      "</p>";
  }

  html +=
    '<div class="bb-result"><p class="bb-result__name">' +
    BB.esc(t("answerIs")) +
    ": " +
    BB.esc(BB.loc(s.name)) +
    '</p><p class="bb-result__body">' +
    BB.esc(BB.loc(s.note)) +
    "</p></div>";

  html +=
    '<p class="bb-see"><a class="bb-link" href="' +
    currentSpec().atlasHref +
    '">' +
    BB.esc(t("openAtlas")) +
    "</a></p></article>";

  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-anatomy-next">' +
    BB.esc(di + 1 >= deck.length ? t("results") : t("next")) +
    '</button><button type="button" class="about-action about-action--ghost" id="bb-anatomy-recentre">' +
    BB.esc(t("recentre")) +
    "</button></div>";

  return html;
}

function renderDone() {
  var html =
    '<article class="bb-panel"><h2 class="bb-panel__title">' +
    BB.esc(t("done")) +
    '</h2><p class="bb-panel__text">' +
    BB.esc(fill("doneText", { r: right, n: deck.length })) +
    "</p>";

  if (missedThisRun.length) {
    html += '<p class="bb-panel__text bb-panel__text--dim">' + BB.esc(t("stillMissing")) + ":</p>";
    html += '<ul class="bb-breakdown">';
    missedThisRun.forEach(function (s) {
      html += '<li class="bb-missed__line">' + BB.esc(BB.loc(s.name)) + "</li>";
    });
    html += "</ul>";
  } else {
    html += '<p class="bb-panel__text bb-panel__text--dim">' + BB.esc(t("perfect")) + "</p>";
  }

  html +=
    '<div class="bb-actions"><button type="button" class="about-action" id="bb-anatomy-again">' +
    BB.esc(t("again")) +
    "</button>";
  if (BB.missedStructures(viewerId).length) {
    html +=
      '<button type="button" class="about-action about-action--ghost" id="bb-anatomy-review">' +
      BB.esc(t("reviewMissed")) +
      "</button>";
  }
  html += "</div></article>" + resetHtml();
  return html;
}

function bind() {
  var host = document.getElementById("page");
  if (!host) return;

  host.querySelectorAll("[data-viewer]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setViewer(btn.getAttribute("data-viewer"));
    });
  });

  host.querySelectorAll("[data-mode]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setMode(btn.getAttribute("data-mode"));
    });
  });

  var reset = document.getElementById("bb-anatomy-reset");
  if (reset) {
    reset.addEventListener("click", function () {
      if (!window.confirm(t("resetAsk"))) return;
      BB.reset();
      render();
    });
  }

  var startBtn = document.getElementById("bb-anatomy-start");
  if (startBtn) startBtn.addEventListener("click", start);

  var input = document.getElementById("bb-anatomy-input");
  if (input) {
    input.addEventListener("input", function () {
      var wasEmpty = !draft.trim();
      draft = input.value;
      var check = document.getElementById("bb-anatomy-check");
      if (check && wasEmpty !== !draft.trim()) check.disabled = !draft.trim();
    });
    input.addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      event.preventDefault();
      submit(false);
    });
  }

  var check = document.getElementById("bb-anatomy-check");
  if (check) {
    check.addEventListener("click", function () {
      submit(false);
    });
  }

  var giveUp = document.getElementById("bb-anatomy-giveup");
  if (giveUp) {
    giveUp.addEventListener("click", function () {
      submit(true);
    });
  }

  var recentre = document.getElementById("bb-anatomy-recentre");
  if (recentre) {
    recentre.addEventListener("click", function () {
      var s = current();
      if (s) focusOn(s.mesh);
    });
  }

  var nextBtn = document.getElementById("bb-anatomy-next");
  if (nextBtn) nextBtn.addEventListener("click", next);

  var again = document.getElementById("bb-anatomy-again");
  if (again) again.addEventListener("click", start);

  var review = document.getElementById("bb-anatomy-review");
  if (review) {
    review.addEventListener("click", function () {
      mode = "missed";
      start();
    });
  }
}

function render() {
  if (!bodyEl()) return;
  headEl().innerHTML = viewerChipsHtml() + chipsHtml() + toolbarHtml();

  if (state === "intro") bodyEl().innerHTML = renderIntro();
  else if (state === "empty") bodyEl().innerHTML = renderEmpty();
  else if (state === "asking") bodyEl().innerHTML = renderAsking();
  else if (state === "revealed") bodyEl().innerHTML = renderRevealed();
  else bodyEl().innerHTML = renderDone();

  bind();
  fitRenderer();

  if (state === "asking") {
    var input = document.getElementById("bb-anatomy-input");
    if (input) input.focus({ preventScroll: true });
  }
}

initTheme(function (theme) {
  if (!scene) return;
  scene.setTheme(theme);
  tuneHighlight();
});

// Read-only hooks for the QA script: which structure is up and whether the
// models have finished loading. Deliberately no answer helper.
window.__bbAnatomy = {
  ready: function () {
    return modelsReady;
  },
  state: function () {
    return state;
  },
  viewer: function () {
    return viewerId;
  },
  currentId: function () {
    var s = current();
    return s ? s.id : null;
  },
  remaining: function () {
    return deck.length - di;
  },
};

window.__neyronAfterSetLang = function () {
  render();
  if (modelsReady) setNote(t("orbit"));
};

window.addEventListener("resize", fitRenderer);

render();
