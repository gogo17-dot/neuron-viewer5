/* Beynle — the daily brain word, played like Wordle. Data: beynle-data.js */
(function () {
  var ROWS = 6;
  var LS = "axon_beynle_v2";
  var KEYS = {
    en: ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"],
    az: ["QÜERTYUİOPÖĞ", "ASDFGHJKLIƏ", "ZXCVBNMÇŞ"],
  };
  var UI = {
    puzzle: { en: "Puzzle", az: "Tapmaca" },
    letters: { en: "letters", az: "hərf" },
    hint: { en: "Show a hint", az: "İpucunu göstər" },
    hintLabel: { en: "Hint", az: "İpucu" },
    enter: { en: "ENTER", az: "GİRİŞ" },
    short: { en: "Not enough letters", az: "Hərf azdır" },
    won: ["Genius!", "Magnificent!", "Impressive!", "Splendid!", "Great!", "Phew!"],
    wonAz: ["Dahi!", "Möhtəşəm!", "Təsirli!", "Əla!", "Yaxşı!", "Uf, az qala!"],
    lost: { en: "The word was", az: "Söz bu idi" },
    share: { en: "Share result", az: "Nəticəni paylaş" },
    copied: { en: "Copied — paste it anywhere.", az: "Kopyalandı — istənilən yerə yapışdır." },
    next: { en: "Next Beynle in", az: "Növbəti Beynle" },
    other: { en: "Also play today’s Azerbaijani word →", az: "Bugünkü ingiliscə sözü də oyna →" },
    played: { en: "Played", az: "Oynanılıb" },
    winPct: { en: "Win %", az: "Qələbə %" },
    streak: { en: "Streak", az: "Seriya" },
    best: { en: "Best", az: "Ən yaxşı" },
    dist: { en: "Guess distribution", az: "Cəhdlərin bölgüsü" },
  };

  function lang() { return document.documentElement.lang === "az" ? "az" : "en"; }
  function t(k) { return UI[k][lang()]; }
  function up(ch) { return lang() === "az" ? ch.toLocaleUpperCase("az") : ch.toUpperCase(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  /* ---------- today (Baku time) ---------- */
  function bakuDate(d) {
    return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Baku", year: "numeric", month: "2-digit", day: "2-digit" }).format(d).slice(0, 10);
  }
  var DAY = Math.max(1, Math.round((Date.parse(bakuDate(new Date()) + "T00:00:00Z") - Date.parse(window.BEYNLE_EPOCH + "T00:00:00Z")) / 864e5) + 1);
  var W = window.BEYNLE_WORDS[(DAY - 1) % window.BEYNLE_WORDS.length];

  /* ---------- saved state: one game per language per day ---------- */
  var store;
  try { store = JSON.parse(localStorage.getItem(LS)) || {}; } catch (e) { store = {}; }
  store.games = store.games || {};
  store.stats = store.stats || {};
  function save() { try { localStorage.setItem(LS, JSON.stringify(store)); } catch (e) {} }
  function game() {
    var k = DAY + "-" + lang();
    if (!store.games[k]) store.games[k] = { rows: [], done: false, won: false, hint: false };
    return store.games[k];
  }
  function stats() {
    var l = lang();
    if (!store.stats[l]) store.stats[l] = { played: 0, wins: 0, streak: 0, best: 0, last: 0, dist: [0, 0, 0, 0, 0, 0] };
    return store.stats[l];
  }
  function answer() { return Array.from(W[lang()]); }

  /* Wordle scoring: greens first, then yellows only while that letter is still unused. */
  function score(guess, ans) {
    var res = guess.map(function () { return "absent"; });
    var left = {};
    ans.forEach(function (c, i) { if (guess[i] === c) res[i] = "correct"; else left[c] = (left[c] || 0) + 1; });
    guess.forEach(function (c, i) {
      if (res[i] !== "correct" && left[c]) { res[i] = "present"; left[c]--; }
    });
    return res;
  }

  /* ---------- elements ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var elNum = $("bn-num"), elGrid = $("bn-grid"), elKb = $("bn-kb"), elToast = $("bn-toast"), elEnd = $("bn-end"),
    elHintBtn = $("bn-hint-btn"), elHint = $("bn-hint");
  var cur = [];
  var revealRow = -1;

  function render() {
    var g = game(), ans = answer(), n = ans.length;
    elNum.textContent = t("puzzle") + " #" + DAY + " · " + n + " " + t("letters");
    elGrid.style.setProperty("--n", n);
    var h = "";
    for (var r = 0; r < ROWS; r++) {
      var row = g.rows[r], live = !g.done && r === g.rows.length;
      var sc = row ? score(row, ans) : null;
      h += '<div class="bn-row' + (live && shake ? " is-shake" : "") + '">';
      for (var i = 0; i < n; i++) {
        var ch = row ? row[i] : live ? cur[i] || "" : "";
        var cls = row ? " is-" + sc[i] + (r === revealRow ? " is-flip" : "") : ch ? " is-filled" : "";
        h += '<div class="bn-tile' + cls + '"' + (r === revealRow ? ' style="animation-delay:' + i * 0.22 + 's"' : "") + ">" + esc(ch) + "</div>";
      }
      h += "</div>";
    }
    elGrid.innerHTML = h;
    shake = false;
    renderKb(g, ans);
    elKb.hidden = g.done && revealRow < 0;
    elHintBtn.hidden = g.hint || g.done;
    elHintBtn.textContent = t("hint");
    elHint.hidden = !(g.hint || g.done);
    elHint.innerHTML = "<strong>" + esc(t("hintLabel")) + ":</strong> " + esc(W.h[lang() === "az" ? 1 : 0]);
    renderEnd(g, ans);
  }
  var shake = false;

  function renderKb(g, ans) {
    var best = {};
    var rank = { correct: 3, present: 2, absent: 1 };
    g.rows.forEach(function (row, r) {
      if (r === revealRow) return; /* keys change colour after the tiles have flipped */
      var sc = score(row, ans);
      row.forEach(function (c, i) { if (!best[c] || rank[sc[i]] > rank[best[c]]) best[c] = sc[i]; });
    });
    var rows = KEYS[lang()];
    elKb.innerHTML = rows.map(function (r, ri) {
      var keys = Array.from(r).map(function (c) {
        return '<button type="button" class="bn-key' + (best[c] ? " is-" + best[c] : "") + '" data-k="' + esc(c) + '">' + esc(c) + "</button>";
      }).join("");
      if (ri === rows.length - 1) {
        keys = '<button type="button" class="bn-key bn-key--wide" data-k="ENTER">' + esc(t("enter")) + "</button>" + keys +
          '<button type="button" class="bn-key bn-key--wide" data-k="BACK" aria-label="Backspace">⌫</button>';
      }
      return '<div class="bn-kb__row">' + keys + "</div>";
    }).join("");
  }

  function renderEnd(g, ans) {
    if (!g.done) { elEnd.hidden = true; return; }
    var s = stats();
    var maxD = Math.max.apply(null, s.dist.concat([1]));
    var az = lang() === "az";
    elEnd.hidden = false;
    elEnd.innerHTML =
      '<p class="bn-end__head">' + esc(g.won ? (az ? UI.wonAz : UI.won)[g.rows.length - 1] : t("lost")) + "</p>" +
      '<p class="bn-end__word">' + esc(ans.join("")) + ' <span>' + esc(az ? W.en : W.az) + "</span></p>" +
      '<div class="bn-stats">' +
      [["played", s.played], ["winPct", s.played ? Math.round((100 * s.wins) / s.played) : 0], ["streak", s.streak], ["best", s.best]]
        .map(function (x) { return "<div><strong>" + x[1] + "</strong><span>" + esc(t(x[0])) + "</span></div>"; }).join("") +
      "</div>" +
      '<p class="bn-dist__h">' + esc(t("dist")) + "</p><div class=\"bn-dist\">" +
      s.dist.map(function (v, i) {
        var mine = g.won && g.rows.length === i + 1;
        return '<div class="bn-dist__row"><span>' + (i + 1) + '</span><span class="bn-dist__bar' + (mine ? " is-mine" : "") + '" style="width:' + Math.max(8, Math.round((100 * v) / maxD)) + '%">' + v + "</span></div>";
      }).join("") + "</div>" +
      '<div class="bn-end__actions"><button type="button" class="about-action" id="bn-share">' + esc(t("share")) + "</button>" +
      '<span class="bn-end__next">' + esc(t("next")) + ' <strong id="bn-clock"></strong></span></div>' +
      '<p class="bn-end__copied" id="bn-copied" role="status"></p>' +
      '<p><button type="button" class="bn-other" id="bn-other">' + esc(t("other")) + "</button></p>";
    $("bn-share").onclick = share;
    $("bn-other").onclick = function () {
      var btn = document.getElementById(az ? "lang-en" : "lang-az");
      if (btn) btn.click();
      window.scrollTo({ top: elGrid.getBoundingClientRect().top + window.scrollY - 120, behavior: "smooth" });
    };
    tick();
  }

  function tick() {
    var el = $("bn-clock");
    if (!el) return;
    var baku = new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Baku" }));
    var left = 864e5 - ((baku.getHours() * 60 + baku.getMinutes()) * 60 + baku.getSeconds()) * 1000;
    el.textContent = [Math.floor(left / 36e5), Math.floor((left % 36e5) / 6e4), Math.floor((left % 6e4) / 1000)]
      .map(function (v) { return String(v).padStart(2, "0"); }).join(":");
    if (left < 1500) setTimeout(function () { location.reload(); }, 1600);
  }
  setInterval(tick, 1000);

  function toast(msg) {
    elToast.textContent = msg;
    elToast.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(function () { elToast.classList.remove("is-on"); }, 1400);
  }

  function shareText() {
    var g = game(), ans = answer();
    var grid = g.rows.map(function (row) {
      return score(row, ans).map(function (s) { return s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛"; }).join("");
    }).join("\n");
    return "Beynle #" + DAY + " (" + lang().toUpperCase() + ") " + (g.won ? g.rows.length : "X") + "/" + ROWS + " 🧠\n\n" + grid + "\n\naxon.az/beynle.html";
  }
  function share() {
    var text = shareText();
    var done = function () { $("bn-copied").textContent = t("copied"); };
    if (navigator.share && /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent)) { navigator.share({ text: text }).catch(function () {}); return; }
    if (navigator.clipboard) navigator.clipboard.writeText(text).then(done, function () { copyOld(text); done(); });
    else { copyOld(text); done(); }
  }
  function copyOld(text) {
    var ta = document.createElement("textarea");
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) {}
    ta.remove();
  }

  /* ---------- input ---------- */
  function press(k) {
    var g = game(), n = answer().length;
    if (g.done) return;
    if (k === "ENTER") {
      if (cur.length < n) { shake = true; toast(t("short")); render(); return; }
      g.rows.push(cur.slice());
      cur = [];
      revealRow = g.rows.length - 1;
      var won = g.rows[revealRow].join("") === answer().join("");
      if (won || g.rows.length >= ROWS) finish(g, won);
      save();
      render();
      var r = revealRow;
      setTimeout(function () { if (revealRow === r) { revealRow = -1; render(); } }, n * 220 + 450);
      if (g.done) {
        elEnd.classList.add("is-wait");
        setTimeout(function () { elEnd.classList.remove("is-wait"); }, n * 220 + 700);
        if (!won) setTimeout(function () { toast(answer().join("")); }, n * 220 + 500);
      }
      return;
    }
    revealRow = -1;
    if (k === "BACK") { cur.pop(); render(); return; }
    if (cur.length < n && Array.from(KEYS[lang()].join("")).indexOf(k) >= 0) { cur.push(k); render(); }
  }
  function finish(g, won) {
    g.done = true; g.won = won;
    var s = stats();
    s.played++;
    if (won) {
      s.wins++; s.dist[g.rows.length - 1]++;
      s.streak = s.last === DAY - 1 ? s.streak + 1 : 1;
      s.last = DAY; s.best = Math.max(s.best, s.streak);
    } else s.streak = 0;
    if (window.goatcounter && window.goatcounter.count) {
      try { window.goatcounter.count({ path: "beynle-" + lang() + "-" + (won ? "won" : "lost"), title: "Beynle #" + DAY, event: true }); } catch (x) {}
    }
  }

  elKb.addEventListener("click", function (e) {
    var b = e.target.closest("[data-k]");
    if (b) { press(b.getAttribute("data-k")); b.blur(); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
    if (e.key === "Enter") { e.preventDefault(); press("ENTER"); }
    else if (e.key === "Backspace") { e.preventDefault(); press("BACK"); }
    else if (e.key.length === 1) {
      var c = up(e.key);
      /* On an English keyboard “i” means the dotted İ in Azerbaijani; ı has its own on-screen key. */
      if (Array.from(KEYS[lang()].join("")).indexOf(c) >= 0) press(c);
    }
  });
  elHintBtn.addEventListener("click", function () { game().hint = true; save(); render(); });

  new MutationObserver(function () { cur = []; revealRow = -1; render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  render();
})();
