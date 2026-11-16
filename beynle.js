/* Beynle — one brain structure a day, guessed from clues. Data: beynle-data.js + brain-bee-structures.js */
import { DRILL_VIEWER_BY_ID } from "./brain-bee-anatomy-viewers.js";

var MAX = 6;
var LS = "axon_beynle_v1";
var UI = {
  puzzle: { en: "Puzzle", az: "Tapmaca" },
  clue: { en: "Clue", az: "İpucu" },
  atlasClue: { en: "It is in this atlas:", az: "Bu atlasdadır:" },
  placeholder: { en: "Type a brain structure…", az: "Beyin strukturunu yaz…" },
  guess: { en: "Guess", az: "Təxmin et" },
  left: { en: "guesses left", az: "təxmin qalıb" },
  correct: { en: "Correct", az: "Düzdür" },
  near: { en: "Same atlas", az: "Eyni atlas" },
  far: { en: "Other atlas", az: "Başqa atlas" },
  pick: { en: "Pick a structure from the list.", az: "Siyahıdan struktur seç." },
  dup: { en: "You already guessed that.", az: "Bunu artıq yazmısan." },
  none: { en: "No match — try another spelling.", az: "Uyğun gəlmədi — başqa cür yaz." },
  won: { en: "You got it!", az: "Tapdın!" },
  lost: { en: "Not this time. The answer was:", az: "Bu dəfə alınmadı. Cavab:" },
  open: { en: "Open it in the 3D atlas →", az: "3D atlasda aç →" },
  share: { en: "Share result", az: "Nəticəni paylaş" },
  copied: { en: "Copied — paste it anywhere.", az: "Kopyalandı — istənilən yerə yapışdır." },
  next: { en: "Next Beynle in", az: "Növbəti Beynle" },
  played: { en: "Played", az: "Oynanılıb" },
  winPct: { en: "Win %", az: "Qələbə %" },
  streak: { en: "Streak", az: "Seriya" },
  best: { en: "Best", az: "Ən yaxşı" },
};

function lang() { return document.documentElement.lang === "az" ? "az" : "en"; }
function t(k) { return UI[k][lang()]; }
function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
function fold(s) {
  return String(s).toLowerCase()
    .replace(/ə/g, "e").replace(/ı/g, "i").replace(/ö/g, "o").replace(/ü/g, "u").replace(/ğ/g, "g").replace(/ş/g, "s").replace(/ç/g, "c")
    .normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, " ").trim();
}

/* ---------- the guess list: every drill structure, sides merged ---------- */
var LIST = [];
var BY_KEY = {};
(window.BB_STRUCTURES || []).forEach(function (s) {
  var en = s.name.en.replace(/, (left|right)$/i, "");
  var az = s.name.az.replace(/^(Sağ|Sol) /, "");
  az = az.charAt(0).toLocaleUpperCase("az") + az.slice(1);
  var e = BY_KEY[en];
  if (!e) {
    e = BY_KEY[en] = { key: en, en: en, az: az, viewers: [], words: [], note: s.note, viewer: s.viewer };
    LIST.push(e);
  }
  if (e.viewers.indexOf(s.viewer) < 0) e.viewers.push(s.viewer);
  [en, az].concat(s.accept.en, s.accept.az).forEach(function (w) {
    var f = fold(w).replace(/\b(left|right|sag|sol)\b/g, "").replace(/\s+/g, " ").trim();
    if (f && e.words.indexOf(f) < 0) e.words.push(f);
  });
});
function vLabel(id) { var v = DRILL_VIEWER_BY_ID[id]; return v ? v.label[lang()] : id; }
function nm(e) { return lang() === "az" ? e.az : e.en; }

/* ---------- today’s puzzle (Baku time) ---------- */
function bakuDate(d) {
  var p = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Baku", year: "numeric", month: "2-digit", day: "2-digit" }).format(d);
  return p.slice(0, 10);
}
var TODAY = bakuDate(new Date());
var DAY = Math.round((Date.parse(TODAY + "T00:00:00Z") - Date.parse(window.BEYNLE_EPOCH + "T00:00:00Z")) / 864e5) + 1;
if (DAY < 1) DAY = 1;
var P = window.BEYNLE_PUZZLES[(DAY - 1) % window.BEYNLE_PUZZLES.length];
var ANS = BY_KEY[P.a];
if (!ANS) console.error("[beynle] answer not in structure list:", P.a);

/* ---------- saved state ---------- */
function load() { try { return JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { return {}; } }
function save() { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} }
var store = load();
store.days = store.days || {};
store.stats = store.stats || { played: 0, wins: 0, streak: 0, best: 0, last: 0, dist: [0, 0, 0, 0, 0, 0] };
var game = store.days[DAY] || { g: [], done: false, won: false };
store.days[DAY] = game;

function mark(key) {
  if (key === ANS.key) return "hit";
  var g = BY_KEY[key];
  return g.viewers.some(function (v) { return ANS.viewers.indexOf(v) >= 0; }) ? "near" : "far";
}

/* ---------- elements ---------- */
var $ = function (id) { return document.getElementById(id); };
var elNum = $("bn-num"), elClues = $("bn-clues"), elRows = $("bn-rows"), elForm = $("bn-form"), elIn = $("bn-input"),
  elSug = $("bn-sug"), elMsg = $("bn-msg"), elLeft = $("bn-left"), elEnd = $("bn-end"), elBtn = $("bn-go");
var sugs = [], sugAt = 0, msgKey = "";

function render() {
  elNum.textContent = t("puzzle") + " #" + DAY;
  var wrong = game.g.filter(function (k) { return k !== ANS.key; }).length;
  var shown = game.done ? 5 : Math.min(1 + wrong, 5);
  var h = "";
  for (var i = 0; i < shown; i++) {
    if (i < 4) h += '<li class="bn-clue"><span class="bn-clue__n">' + t("clue") + " " + (i + 1) + "</span>" + esc(P.c[i][lang() === "az" ? 1 : 0]) + "</li>";
    else h += '<li class="bn-clue bn-clue--atlas"><span class="bn-clue__n">' + t("clue") + " 5</span>" + esc(t("atlasClue")) + " <strong>" + esc(ANS.viewers.map(vLabel).join(" · ")) + "</strong></li>";
  }
  elClues.innerHTML = h;
  elRows.innerHTML = game.g.map(function (k) {
    var m = mark(k), g = BY_KEY[k];
    var tag = m === "hit" ? t("correct") : m === "near" ? t("near") + " · " + vLabel(ANS.viewers.filter(function (v) { return g.viewers.indexOf(v) >= 0; })[0]) : t("far") + " · " + vLabel(g.viewers[0]);
    return '<li class="bn-row bn-row--' + m + '"><span class="bn-row__sq" aria-hidden="true"></span><span class="bn-row__name">' + esc(nm(g)) + '</span><span class="bn-row__tag">' + esc(tag) + "</span></li>";
  }).join("");
  elForm.hidden = game.done;
  elIn.placeholder = t("placeholder");
  elBtn.textContent = t("guess");
  elLeft.textContent = game.done ? "" : MAX - game.g.length + " " + t("left");
  elMsg.textContent = msgKey ? t(msgKey) : "";
  renderEnd();
}

function renderEnd() {
  if (!game.done) { elEnd.hidden = true; return; }
  var v = DRILL_VIEWER_BY_ID[ANS.viewer];
  var s = store.stats;
  elEnd.hidden = false;
  elEnd.innerHTML =
    '<p class="bn-end__head">' + esc(game.won ? t("won") : t("lost")) + "</p>" +
    '<p class="bn-end__name">' + esc(nm(ANS)) + (lang() === "az" ? ' <span>' + esc(ANS.en) + "</span>" : ' <span>' + esc(ANS.az) + "</span>") + "</p>" +
    '<p class="bn-end__note">' + esc(ANS.note[lang()] || ANS.note.en) + "</p>" +
    (v ? '<p><a class="bn-end__link" href="' + v.atlasHref + '">' + esc(t("open")) + "</a></p>" : "") +
    '<div class="bn-stats">' +
      [["played", s.played], ["winPct", s.played ? Math.round((100 * s.wins) / s.played) : 0], ["streak", s.streak], ["best", s.best]]
        .map(function (x) { return '<div><strong>' + x[1] + "</strong><span>" + esc(t(x[0])) + "</span></div>"; }).join("") +
    "</div>" +
    '<div class="bn-end__actions"><button type="button" class="about-action" id="bn-share">' + esc(t("share")) + '</button>' +
    '<span class="bn-end__next">' + esc(t("next")) + ' <strong id="bn-clock"></strong></span></div>' +
    '<p class="bn-end__copied" id="bn-copied" role="status"></p>';
  $("bn-share").onclick = share;
  tick();
}

function tick() {
  var el = $("bn-clock");
  if (!el) return;
  var now = new Date();
  var baku = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Baku" }));
  var left = 864e5 - ((baku.getHours() * 60 + baku.getMinutes()) * 60 + baku.getSeconds()) * 1000;
  var hh = Math.floor(left / 36e5), mm = Math.floor((left % 36e5) / 6e4), ss = Math.floor((left % 6e4) / 1000);
  el.textContent = String(hh).padStart(2, "0") + ":" + String(mm).padStart(2, "0") + ":" + String(ss).padStart(2, "0");
  if (left < 1500) setTimeout(function () { location.reload(); }, 1600);
}
setInterval(tick, 1000);

function shareText() {
  var sq = game.g.map(function (k) { var m = mark(k); return m === "hit" ? "🟩" : m === "near" ? "🟨" : "⬜"; }).join("");
  return "Beynle #" + DAY + " 🧠 " + (game.won ? game.g.length : "X") + "/" + MAX + "\n" + sq + "\naxon.az/beynle.html";
}
function share() {
  var text = shareText();
  var done = function () { $("bn-copied").textContent = t("copied"); };
  if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) {
    navigator.share({ text: text }).catch(function () {});
    return;
  }
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
  else { fallbackCopy(text); done(); }
}
function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text; document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  ta.remove();
}

/* ---------- guessing ---------- */
function findMatches(q) {
  var f = fold(q);
  if (!f) return [];
  var scored = [];
  LIST.forEach(function (e) {
    if (game.g.indexOf(e.key) >= 0) return;
    var best = 0;
    var names = [fold(e.en), fold(e.az)];
    names.forEach(function (w) {
      if (w.indexOf(f) === 0) best = Math.max(best, 5);
      else if (w.indexOf(" " + f) > 0) best = Math.max(best, 4);
    });
    e.words.forEach(function (w) {
      if (w.indexOf(f) === 0) best = Math.max(best, 3);
      else if (w.indexOf(" " + f) > 0) best = Math.max(best, 2);
      else if (w.indexOf(f) > 0) best = Math.max(best, 1);
    });
    if (best) scored.push([best, e]);
  });
  scored.sort(function (a, b) { return b[0] - a[0]; });
  return scored.slice(0, 8).map(function (x) { return x[1]; });
}
function showSug() {
  sugs = findMatches(elIn.value);
  sugAt = 0;
  elSug.hidden = !sugs.length;
  elIn.setAttribute("aria-expanded", sugs.length ? "true" : "false");
  elSug.innerHTML = sugs.map(function (e, i) {
    var other = lang() === "az" ? e.en : e.az;
    return '<li role="option" id="bn-opt-' + i + '" data-i="' + i + '"' + (i === sugAt ? ' class="is-on" aria-selected="true"' : "") + ">" + esc(nm(e)) + "<small>" + esc(other) + "</small></li>";
  }).join("");
}
function moveSug(d) {
  if (!sugs.length) return;
  sugAt = (sugAt + d + sugs.length) % sugs.length;
  [].forEach.call(elSug.children, function (li, i) { li.classList.toggle("is-on", i === sugAt); li.setAttribute("aria-selected", i === sugAt ? "true" : "false"); });
  elIn.setAttribute("aria-activedescendant", "bn-opt-" + sugAt);
}
function submit(e) {
  if (game.done) return;
  var exact = LIST.filter(function (x) { return x.words.indexOf(fold(elIn.value)) >= 0; })[0];
  if (!e) {
    if (exact && game.g.indexOf(exact.key) < 0) e = exact;
    else if (sugs.length) e = sugs[sugAt];
  }
  if (!e) { msgKey = elIn.value.trim() ? "none" : "pick"; if (exact) msgKey = "dup"; render(); return; }
  if (game.g.indexOf(e.key) >= 0) { msgKey = "dup"; render(); return; }
  msgKey = "";
  game.g.push(e.key);
  if (e.key === ANS.key || game.g.length >= MAX) finish(e.key === ANS.key);
  save();
  elIn.value = "";
  elSug.hidden = true;
  render();
  if (!game.done) elIn.focus();
  if (window.goatcounter && window.goatcounter.count && game.done) {
    try { window.goatcounter.count({ path: "beynle-" + (game.won ? "won" : "lost"), title: "Beynle #" + DAY, event: true }); } catch (x) {}
  }
}
function finish(won) {
  game.done = true; game.won = won;
  var s = store.stats;
  s.played++;
  if (won) {
    s.wins++;
    s.dist[game.g.length - 1]++;
    s.streak = s.last === DAY - 1 ? s.streak + 1 : 1;
    s.last = DAY;
    s.best = Math.max(s.best, s.streak);
  } else { s.streak = 0; }
}

elForm.addEventListener("submit", function (ev) { ev.preventDefault(); submit(null); });
elIn.addEventListener("input", function () { msgKey = ""; elMsg.textContent = ""; showSug(); });
elIn.addEventListener("keydown", function (ev) {
  if (ev.key === "ArrowDown") { ev.preventDefault(); moveSug(1); }
  else if (ev.key === "ArrowUp") { ev.preventDefault(); moveSug(-1); }
  else if (ev.key === "Escape") { elSug.hidden = true; }
});
elSug.addEventListener("mousedown", function (ev) {
  var li = ev.target.closest("li");
  if (!li) return;
  ev.preventDefault();
  submit(sugs[+li.getAttribute("data-i")]);
});
document.addEventListener("click", function (ev) { if (!elForm.contains(ev.target)) elSug.hidden = true; });

new MutationObserver(function () { render(); if (!elSug.hidden) showSug(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
render();

/* QA hook: list answers missing from the structure list (should be empty). */
window.__beynleCheck = function () {
  return window.BEYNLE_PUZZLES.filter(function (p) { return !BY_KEY[p.a]; }).map(function (p) { return p.a; });
};
