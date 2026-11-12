/**
 * Lezyon ovçusu (Lesion hunter).
 *
 * A round is 10 random cases from lezyon-data.js. Each case is a short patient
 * story; the player taps where the damage is on the whole-brain model that the
 * cerebral-cortex atlas uses. Scoring:
 *   - a target structure: 70 + up to 30 for speed (30 s per case)
 *   - the right structure on the wrong side: 30
 *   - anything else: up to 40, falling with distance from the nearest target
 *   - time out: 0
 * The best round total is kept in this browser only.
 */
import * as THREE from "three";
import { LESION_CASES } from "./lezyon-data.js";

var ROUND = 10;
var CASE_SECONDS = 30;
var BEST_KEY = "axon_lezyon_best";
var CORE_KEYS = ["Frontal_lobe.l", "Frontal_lobe.r", "Occipital_lobe.l", "Occipital_lobe.r", "Temporal_lobe.l", "Temporal_lobe.r", "Cerebellum", "Brainstem"];
var WHITE_MATTER = ["Ventricles_WhiteMatter_White matter of telencephalon.l", "Ventricles_WhiteMatter_White matter of telencephalon.r"];

var UI = {
  loading: { en: "Loading the 3D brain…", az: "3D beyin yüklənir…" },
  loadingN: { en: "Loading the 3D brain… {n}%", az: "3D beyin yüklənir… {n}%" },
  loadFail: { en: "The 3D brain did not load. Check your connection and reload the page.", az: "3D beyin yüklənmədi. İnterneti yoxlayıb səhifəni yeniləyin." },
  start: { en: "Start the round", az: "Raundu başlat" },
  startWait: { en: "Loading the brain…", az: "Beyin yüklənir…" },
  caseN: { en: "Patient {i} of {n}", az: "Pasiyent {i} / {n}" },
  score: { en: "Score", az: "Xal" },
  tapHint: { en: "Where is the damage? Tap it on the brain. Drag to rotate, pinch or scroll to zoom.", az: "Zədə haradadır? Beyində ona toxun. Fırlatmaq üçün sürüşdür, yaxınlaşdırmaq üçün iki barmaqla və ya təkərlə böyüt." },
  lookHint: { en: "The answer is lit up. Turn the brain to look at it from every side.", az: "Cavab işıqlanıb. Beyni fırladıb ona hər tərəfdən bax." },
  surface: { en: "Surface", az: "Səth" },
  deep: { en: "Deep", az: "Dərin" },
  resetView: { en: "Reset view", az: "Görünüşü sıfırla" },
  left: { en: "Left", az: "Sol" },
  right: { en: "Right", az: "Sağ" },
  exact: { en: "Found it!", az: "Tapdın!" },
  wrongSide: { en: "Right structure — wrong side.", az: "Struktur düzdür — amma tərəf səhvdir." },
  close: { en: "Close, but not quite.", az: "Yaxın idi, amma tam yox." },
  miss: { en: "Not there.", az: "Orada deyil." },
  timeout: { en: "Time's up.", az: "Vaxt bitdi." },
  youTapped: { en: "You tapped: {name}", az: "Toxunduğun yer: {name}" },
  answer: { en: "Answer", az: "Cavab" },
  points: { en: "+{p} points", az: "+{p} xal" },
  next: { en: "Next patient", az: "Növbəti pasiyent" },
  finish: { en: "See my result", az: "Nəticəmə bax" },
  fromBank: { en: "From the Brain Bee diagnosis bank", az: "Brain Bee diaqnoz bankından" },
  doneTitle: { en: "Round complete", az: "Raund bitdi" },
  doneScore: { en: "{s} / {max} points", az: "{s} / {max} xal" },
  doneFound: { en: "You found the damage in {k} of {n} patients.", az: "{n} pasiyentdən {k}-sində zədəni tapdın." },
  best: { en: "Your best: {b}", az: "Ən yaxşı nəticən: {b}" },
  newBest: { en: "New personal best!", az: "Yeni şəxsi rekord!" },
  again: { en: "Play again", az: "Yenidən oyna" },
  share: { en: "Share my score", az: "Nəticəmi paylaş" },
  copied: { en: "Copied — paste it anywhere.", az: "Kopyalandı — istədiyin yerə yapışdır." },
  shareText: {
    en: "AXON · Lesion hunter: I found the damage in {k} of {n} patients ({s}/{max}). Can you beat me? 🧠",
    az: "AXON · Lezyon ovçusu: {n} pasiyentdən {k}-sində zədəni tapdım ({s}/{max}). Məni keçə bilərsən? 🧠",
  },
  review: { en: "Study these in the 3D atlas →", az: "Bunları 3D atlasda öyrən →" },
};

/* ---------- small helpers ---------- */

function lang() {
  return document.documentElement.lang === "az" ? "az" : "en";
}
function t(key, vars) {
  var s = (UI[key] && UI[key][lang()]) || "";
  if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
  return s;
}
function L(obj) {
  return obj ? obj[lang()] || obj.en : "";
}
function $(id) {
  return document.getElementById(id);
}
function el(tag, cls, text) {
  var e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
}
function shuffle(a) {
  for (var i = a.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var x = a[i]; a[i] = a[j]; a[j] = x;
  }
  return a;
}
function sideless(key) {
  return key.replace(/\.(l|r)$/, "");
}
function readBest() {
  try { return parseInt(localStorage.getItem(BEST_KEY) || "0", 10) || 0; } catch (e) { return 0; }
}
function writeBest(v) {
  try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {}
}

/* ---------- state ---------- */

var scene = null;
var structMeta = null; // cerebralCortexStructures: key -> {title, titleAz}
var ready = false;
var failed = false;
var deepMode = false;
var home = null; // {pos, target}
var brainSize = 1;

var deck = [];
var idx = 0;
var total = 0;
var found = 0;
var state = "intro"; // intro | asking | revealed | done
var caseStart = 0;
var timerRaf = 0;
var last = null; // {verdict, points, tappedKey}
var marker = null;
var newBest = false;

var raycaster = new THREE.Raycaster();
var pointer = new THREE.Vector2();

/* ---------- 3D ---------- */

function stage() { return $("lz-stage"); }

function fitRenderer() {
  if (!scene) return;
  var box = stage();
  var w = box.clientWidth, h = box.clientHeight;
  if (!w || !h) return;
  scene.camera.aspect = w / h;
  scene.camera.updateProjectionMatrix();
  scene.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  scene.renderer.setSize(w, h);
}

function entry(key) {
  return scene && scene.structures.get(key);
}

function frameHome() {
  if (!scene) return;
  var box = new THREE.Box3();
  CORE_KEYS.forEach(function (k) { var e = entry(k); if (e) box.expandByObject(e.root); });
  if (box.isEmpty()) box.setFromObject(scene.assemblyRoot);
  var size = box.getSize(new THREE.Vector3());
  var center = box.getCenter(new THREE.Vector3());
  brainSize = Math.max(size.x, size.y, size.z) || 1;
  /* Fit the whole brain whichever side is tighter: height on a wide
   * screen, width on a phone held upright. */
  var vfov = (scene.camera.fov * Math.PI) / 180;
  var hfov = 2 * Math.atan(Math.tan(vfov / 2) * (scene.camera.aspect || 1));
  var dist = (brainSize / (2 * Math.tan(Math.min(vfov, hfov) / 2))) * 1.15;
  if (!home) {
    /* In this model +z is the front and +x the left. Start from the left
     * front, a little above: the lobes of the left (usually language)
     * hemisphere are in view and the player turns it for the rest. */
    var dir = new THREE.Vector3(1, 0.35, 0.6).normalize();
    home = { pos: center.clone().addScaledVector(dir, dist), target: center.clone(), dist: dist };
  }
  scene.camera.position.copy(home.pos);
  scene.camera.near = Math.max(dist / 1000, 0.001);
  scene.camera.far = dist * 20;
  scene.camera.updateProjectionMatrix();
  scene.controls.target.copy(home.target);
  scene.controls.minDistance = dist * 0.25;
  scene.controls.maxDistance = dist * 3;
  scene.controls.update();
}

function applyMode() {
  if (!scene) return;
  scene.setLayerVisible("cortex", !deepMode);
  WHITE_MATTER.forEach(function (k) { var e = entry(k); if (e) e.root.visible = !deepMode; });
  $("lz-mode-surface").classList.toggle("is-on", !deepMode);
  $("lz-mode-deep").classList.toggle("is-on", deepMode);
  $("lz-mode-surface").setAttribute("aria-pressed", String(!deepMode));
  $("lz-mode-deep").setAttribute("aria-pressed", String(deepMode));
}

function setMode(deep) {
  deepMode = deep;
  applyMode();
  if (state === "revealed") highlightTargets(current().targets);
}

/** The nearest visible structure under the pointer. Three's raycaster ignores
 * `visible`, so hidden layers are skipped here by hand. */
function pick(ev) {
  var rect = scene.canvas.getBoundingClientRect();
  pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
  raycaster.setFromCamera(pointer, scene.camera);
  var best = null;
  scene.structures.forEach(function (e, key) {
    if (!e.root.visible) return;
    var hits = raycaster.intersectObject(e.root, true);
    for (var i = 0; i < hits.length; i++) {
      if (!hits[i].object.visible) continue;
      if (!best || hits[i].distance < best.distance) best = { key: key, point: hits[i].point, distance: hits[i].distance };
      break;
    }
  });
  return best;
}

function nameOf(key) {
  var m = structMeta && structMeta[key];
  if (!m) return key;
  if (lang() === "az" && m.titleAz) return m.titleAz;
  var s = String(m.title || key).toLowerCase();
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function setHover(key) {
  if (!scene || state !== "asking") return;
  if (scene.hoveredName === key) return;
  scene.setHovered(key);
}

function clearMarker() {
  if (marker && scene) {
    scene.scene.remove(marker);
    marker.geometry.dispose();
    marker.material.dispose();
  }
  marker = null;
}

function dropMarker(point, good) {
  clearMarker();
  var g = new THREE.SphereGeometry(brainSize * 0.018, 20, 14);
  var m = new THREE.MeshBasicMaterial({ color: good ? 0x00ff8c : 0xff4d4d, depthTest: false, transparent: true, opacity: 0.95 });
  marker = new THREE.Mesh(g, m);
  marker.renderOrder = 999;
  marker.position.copy(point);
  scene.scene.add(marker);
}

/** Light up every target and fade the rest. */
function highlightTargets(keys) {
  var on = {};
  keys.forEach(function (k) { on[k] = true; });
  var day = document.documentElement.getAttribute("data-theme") === "day";
  scene.structures.forEach(function (e, key) {
    var isOn = !!on[key];
    if (isOn) e.root.visible = true;
    e.meshes.forEach(function (mesh) {
      var mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      mats.forEach(function (mat) {
        var base = (mat.userData && mat.userData.baseColor) || mat.color;
        if (isOn) {
          mat.transparent = false; mat.opacity = 1; mat.depthWrite = true;
          mat.emissive.copy(base); mat.emissiveIntensity = day ? 0.25 : 0.75;
        } else {
          mat.transparent = true; mat.opacity = 0.1; mat.depthWrite = false;
          mat.emissive.copy(base).multiplyScalar(0.08); mat.emissiveIntensity = 0.08;
        }
      });
    });
  });
}

function resetLook() {
  if (!scene) return;
  scene.hoveredName = null;
  scene.clearSelection(); // restores every material
  applyMode();
}

function distanceToTargets(point, keys) {
  var d = Infinity;
  keys.forEach(function (k) {
    var e = entry(k);
    if (!e) return;
    var b = new THREE.Box3().setFromObject(e.root);
    d = Math.min(d, b.distanceToPoint(point));
  });
  return d;
}

/* L / R tags that follow the hemispheres as the brain turns. */
function updateSideTags() {
  var tl = $("lz-tag-l"), tr = $("lz-tag-r");
  if (!scene || !ready) { tl.hidden = tr.hidden = true; return; }
  var rect = stage().getBoundingClientRect();
  function place(key, tag) {
    var e = entry(key);
    if (!e) { tag.hidden = true; return null; }
    var c = new THREE.Box3().setFromObject(e.root).getCenter(new THREE.Vector3());
    c.project(scene.camera);
    return { x: (c.x * 0.5 + 0.5) * rect.width, y: (-c.y * 0.5 + 0.5) * rect.height, z: c.z };
  }
  var a = place("Temporal_lobe.l", tl), b = place("Temporal_lobe.r", tr);
  if (!a || !b) return;
  function put(tag, p, top) {
    tag.hidden = false;
    tag.style.transform = "translate(" + Math.round(Math.min(rect.width - 48, Math.max(8, p.x - 20))) + "px," + Math.round(top) + "px)";
  }
  var top = Math.min(rect.height - 40, Math.max(56, Math.min(a.y, b.y) - 70));
  /* +x is the brain's left. Looking from one side, the hemispheres overlap,
   * so only the one facing us is named. */
  var view = scene.camera.position.clone().sub(scene.controls.target).normalize();
  if (Math.abs(view.x) < 0.6) {
    put(tl, a, top);
    put(tr, b, top);
  } else {
    var nearLeft = view.x > 0;
    put(nearLeft ? tl : tr, nearLeft ? a : b, top);
    (nearLeft ? tr : tl).hidden = true;
  }
}

function tagLoop() {
  updateSideTags();
  requestAnimationFrame(tagLoop);
}

function bindTaps() {
  var canvas = scene.canvas;
  var down = null;
  canvas.addEventListener("pointerdown", function (e) {
    down = { x: e.clientX, y: e.clientY, t: e.timeStamp, id: e.pointerId };
  });
  canvas.addEventListener("pointerup", function (e) {
    if (!down || down.id !== e.pointerId) return;
    var moved = Math.hypot(e.clientX - down.x, e.clientY - down.y);
    /* Event timestamps, not handler time, so a busy frame on a slow phone
     * does not turn a tap into a "hold". */
    var quick = e.timeStamp - down.t < 700;
    down = null;
    if (moved > 8 || !quick) return;
    onTap(e);
  });
  var pending = null;
  canvas.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse") return;
    pending = e;
  });
  canvas.addEventListener("pointerleave", function () { pending = null; setHover(null); canvas.style.cursor = ""; });
  (function hoverLoop() {
    if (pending && ready && state === "asking") {
      var hit = pick(pending);
      setHover(hit ? hit.key : null);
      canvas.style.cursor = hit ? "crosshair" : "";
      pending = null;
    }
    requestAnimationFrame(hoverLoop);
  })();
}

function loadScene() {
  var canvas = $("lz-canvas");
  setNote(t("loading"));
  Promise.all([
    import("./cerebral-cortex/CerebralCortexScene.js"),
    import("./cerebral-cortex/cerebralCortexStructures.js"),
  ]).then(function (mods) {
    structMeta = mods[1].default;
    var day = document.documentElement.getAttribute("data-theme") === "day";
    scene = new mods[0].CerebralCortexScene(canvas, {
      theme: day ? "light" : "dark",
      interactive: false,
      onLoadProgress: function (loaded, totalN, done, failedN) {
        if (!done) {
          setNote(t("loadingN", { n: Math.round((loaded / Math.max(1, totalN)) * 100) }));
          return;
        }
        if (failedN >= totalN || loaded === 0) {
          failed = true;
          setNote(t("loadFail"));
          render();
          return;
        }
        ready = true;
        fitRenderer();
        frameHome();
        applyMode();
        setNote(t("tapHint"));
        render();
      },
    });
    scene.onResize = fitRenderer;
    window.addEventListener("resize", fitRenderer);
    fitRenderer();
    bindTaps();
    tagLoop();
  }).catch(function () {
    failed = true;
    setNote(t("loadFail"));
    render();
  });
}

/** Scroll so `node` sits just below the fixed site nav. */
function scrollToEl(node) {
  if (!node) return;
  var nav = document.querySelector(".site-nav");
  var offset = (nav ? nav.getBoundingClientRect().height : 64) + 12;
  var y = node.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
}

function setNote(text) {
  var n = $("lz-note");
  if (n) n.textContent = text;
}

/* ---------- game flow ---------- */

function current() { return deck[idx]; }

function startRound() {
  if (!ready) return;
  deck = shuffle(LESION_CASES.slice()).slice(0, ROUND);
  idx = 0; total = 0; found = 0; newBest = false;
  beginCase();
}

function beginCase() {
  state = "asking";
  last = null;
  clearMarker();
  deepMode = false;
  resetLook();
  frameHome();
  caseStart = performance.now();
  render();
  tick();
  scrollToEl($("lz-hud"));
}

function tick() {
  cancelAnimationFrame(timerRaf);
  if (state !== "asking") return;
  var left = CASE_SECONDS - (performance.now() - caseStart) / 1000;
  var bar = $("lz-timebar"), num = $("lz-time");
  if (bar) bar.style.transform = "scaleX(" + Math.max(0, left / CASE_SECONDS) + ")";
  if (num) num.textContent = Math.max(0, Math.ceil(left)) + "s";
  if (left <= 0) { resolve(null); return; }
  timerRaf = requestAnimationFrame(tick);
}

function onTap(e) {
  if (state !== "asking" || !ready) return;
  var hit = pick(e);
  if (!hit) return; // tapped empty space — ignore
  resolve(hit);
}

function resolve(hit) {
  if (state !== "asking") return;
  cancelAnimationFrame(timerRaf);
  var c = current();
  var leftSec = Math.max(0, CASE_SECONDS - (performance.now() - caseStart) / 1000);
  var verdict, points = 0;
  if (!hit) {
    verdict = "timeout";
  } else if (c.targets.indexOf(hit.key) !== -1) {
    verdict = "exact";
    points = 70 + Math.round((30 * leftSec) / CASE_SECONDS);
    found += 1;
  } else if (c.targets.some(function (k) { return sideless(k) === sideless(hit.key) && /\.(l|r)$/.test(k); })) {
    verdict = "wrongSide";
    points = 30;
  } else {
    var d = distanceToTargets(hit.point, c.targets);
    var frac = Math.max(0, 1 - d / (0.35 * brainSize));
    points = Math.round(40 * frac);
    verdict = points >= 20 ? "close" : "miss";
  }
  total += points;
  last = { verdict: verdict, points: points, tappedKey: hit ? hit.key : null };
  state = "revealed";
  scene.setHovered(null);
  if (hit) dropMarker(hit.point, verdict === "exact");
  highlightTargets(c.targets);
  render();
  var r = $("lz-result");
  if (r && r.scrollIntoView && window.innerWidth < 900) r.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function nextCase() {
  idx += 1;
  if (idx >= deck.length) {
    state = "done";
    clearMarker();
    resetLook();
    var best = readBest();
    if (total > best) { writeBest(total); newBest = true; }
    render();
    scrollToEl($("lz-app"));
    return;
  }
  beginCase();
}

function share() {
  var text = t("shareText", { k: found, n: deck.length, s: total, max: deck.length * 100 });
  var url = "https://axon.az/lezyon.html";
  if (navigator.share) {
    navigator.share({ title: "AXON", text: text, url: url }).catch(function () {});
    return;
  }
  var full = text + " " + url;
  var ok = function () { var s = $("lz-shared"); if (s) s.textContent = t("copied"); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(full).then(ok, function () {});
}

/* ---------- rendering ---------- */

function render() {
  var app = $("lz-app");
  var hud = $("lz-hud");
  var storyBox = $("lz-story");
  var result = $("lz-result");
  var tools = $("lz-tools");
  app.innerHTML = "";
  result.innerHTML = "";
  result.hidden = true;

  $("lz-mode-surface").textContent = t("surface");
  $("lz-mode-deep").textContent = t("deep");
  $("lz-reset").textContent = t("resetView");
  $("lz-tag-l").textContent = t("left");
  $("lz-tag-r").textContent = t("right");
  if (ready && !failed) setNote(state === "revealed" ? t("lookHint") : t("tapHint"));

  var playing = state === "asking" || state === "revealed";
  hud.hidden = !playing;
  storyBox.hidden = !playing;
  tools.hidden = !ready;

  if (state === "intro") {
    var b = el("button", "about-action lz-start", ready ? t("start") : failed ? t("loadFail") : t("startWait"));
    b.type = "button";
    b.disabled = !ready;
    b.addEventListener("click", startRound);
    app.appendChild(b);
    var best = readBest();
    if (best) app.appendChild(el("p", "lz-best", t("best", { b: best + " / " + ROUND * 100 })));
    return;
  }

  if (state === "done") {
    var card = el("div", "lz-done");
    card.appendChild(el("p", "lz-done__kicker", t("doneTitle")));
    card.appendChild(el("p", "lz-done__score", t("doneScore", { s: total, max: deck.length * 100 })));
    card.appendChild(el("p", "lz-done__found", t("doneFound", { k: found, n: deck.length })));
    card.appendChild(el("p", "lz-best", newBest ? t("newBest") : t("best", { b: readBest() + " / " + ROUND * 100 })));
    var row = el("div", "about-actions");
    var sh = el("button", "about-action", t("share")); sh.type = "button"; sh.addEventListener("click", share);
    var again = el("button", "about-action about-action--ghost", t("again")); again.type = "button"; again.addEventListener("click", startRound);
    row.appendChild(sh); row.appendChild(again);
    card.appendChild(row);
    var shared = el("p", "lz-shared"); shared.id = "lz-shared"; shared.setAttribute("role", "status");
    card.appendChild(shared);
    var atlas = el("a", "lz-link", t("review")); atlas.href = "cerebral-cortex/index.html";
    card.appendChild(atlas);
    app.appendChild(card);
    hud.hidden = true; storyBox.hidden = true;
    return;
  }

  var c = current();
  $("lz-case").textContent = t("caseN", { i: idx + 1, n: deck.length });
  $("lz-score-label").textContent = t("score");
  $("lz-score").textContent = String(total);
  $("lz-story-text").textContent = L(c.story);
  var src = $("lz-story-src");
  src.hidden = !c.bank;
  src.textContent = c.bank ? t("fromBank") : "";
  $("lz-timer").hidden = state !== "asking";

  if (state === "revealed") {
    result.hidden = false;
    var v = last.verdict;
    var head = el("div", "lz-verdict lz-verdict--" + (v === "exact" ? "good" : v === "close" || v === "wrongSide" ? "mid" : "bad"));
    head.appendChild(el("span", "lz-verdict__text", t(v)));
    head.appendChild(el("span", "lz-verdict__pts", t("points", { p: last.points })));
    result.appendChild(head);
    if (last.tappedKey && v !== "exact") result.appendChild(el("p", "lz-tapped", t("youTapped", { name: nameOf(last.tappedKey) })));
    var ans = el("p", "lz-answer");
    ans.appendChild(el("strong", null, t("answer") + ": "));
    ans.appendChild(document.createTextNode(L(c.answer)));
    result.appendChild(ans);
    result.appendChild(el("p", "lz-why", L(c.why)));
    var nb = el("button", "about-action lz-next", idx + 1 >= deck.length ? t("finish") : t("next"));
    nb.type = "button";
    nb.addEventListener("click", nextCase);
    result.appendChild(nb);
  }
}

/* ---------- wiring ---------- */

$("lz-mode-surface").addEventListener("click", function () { setMode(false); });
$("lz-mode-deep").addEventListener("click", function () { setMode(true); });
$("lz-reset").addEventListener("click", function () { frameHome(); });

/* Re-render text when the EN/AZ toggle changes <html lang>; follow the theme. */
new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
new MutationObserver(function () {
  if (!scene) return;
  var day = document.documentElement.getAttribute("data-theme") === "day";
  scene.setTheme(day ? "light" : "dark");
  if (state === "revealed") highlightTargets(current().targets);
}).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

/* Test hook for automated checks; off unless this browser opts in. */
try {
  if (localStorage.getItem("axon_lz_test") === "1") {
    window.__lezyonTest = {
      start: function (ids) {
        startRound();
        if (ids) { deck = ids.map(function (id) { return LESION_CASES.filter(function (c) { return c.id === id; })[0]; }); idx = 0; beginCase(); }
      },
      setDeep: setMode,
      /** Screen point of the given structure's surface nearest the camera, or null. */
      pointOn: function (key) {
        var e = entry(key);
        if (!e) return null;
        var rect = scene.canvas.getBoundingClientRect();
        var c = new THREE.Box3().setFromObject(e.root).getCenter(new THREE.Vector3()).project(scene.camera);
        var x0 = (c.x * 0.5 + 0.5) * rect.width, y0 = (-c.y * 0.5 + 0.5) * rect.height;
        for (var r = 0; r < 120; r += 4) {
          for (var a = 0; a < 6.28; a += 0.5) {
            var x = x0 + r * Math.cos(a), y = y0 + r * Math.sin(a);
            var hit = pick({ clientX: rect.left + x, clientY: rect.top + y });
            if (hit && hit.key === key) return { x: rect.left + x, y: rect.top + y };
            if (r === 0) break;
          }
        }
        return null;
      },
      view: function (dir) {
        frameHome();
        var d = new THREE.Vector3(dir[0], dir[1], dir[2]).normalize();
        scene.camera.position.copy(home.target).addScaledVector(d, home.dist);
        scene.controls.update();
      },
      resetClock: function () { caseStart = performance.now(); },
      info: function () { return { state: state, last: last, total: total, found: found, idx: idx, n: deck.length }; },
    };
  }
} catch (e) {}

render();
loadScene();
