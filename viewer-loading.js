/*
 * AXON 3D viewers: phone-friendly loading.
 * 1. Before the viewer starts, decide how much detail this device can handle
 *    (read by each viewer.js through window.__axonMaxDpr / window.__axonLowEnd).
 * 2. Replace the plain "Loading… 3/25" line with a clear bilingual progress card.
 * 3. If 3D cannot start (no WebGL, models fail), show a friendly message with
 *    other ways to learn the same thing, instead of an empty screen.
 * Load as a classic script in <head>, before the viewer modules.
 */
(function () {
  "use strict";
  var nav = navigator;
  var coarse = window.matchMedia && matchMedia("(pointer: coarse)").matches;
  var small = Math.min(screen.width || 9999, screen.height || 9999) < 900;
  var mobile = coarse && small;
  var mem = nav.deviceMemory || 8;
  var cores = nav.hardwareConcurrency || 8;
  var saveData = !!(nav.connection && nav.connection.saveData);
  var lowEnd = saveData || mem <= 4 || cores <= 4;
  /* Fewer pixels = much less work for the graphics chip. Phones still look sharp at 1.5. */
  window.__axonLowEnd = lowEnd && mobile;
  window.__axonMaxDpr = lowEnd && mobile ? 1 : mobile ? 1.5 : 2;

  var webgl = (function () {
    try {
      var c = document.createElement("canvas");
      return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
    } catch (e) { return false; }
  })();

  var T = {
    title: ["Loading the 3D model…", "3D model yüklənir…"],
    parts: ["{a} of {b} parts", "{a} / {b} hissə"],
    slow: ["On a slow connection this can take a little while — it is worth the wait.", "Zəif internetdə bir az vaxt apara bilər — gözləməyə dəyər."],
    failT: ["3D could not start on this device", "3D bu cihazda açılmadı"],
    failNoGL: ["Your browser or device does not support 3D graphics (WebGL). Try another browser, such as Chrome, or a computer.", "Brauzerin və ya cihazın 3D qrafikanı (WebGL) dəstəkləmir. Başqa brauzeri (məsələn, Chrome) və ya kompüteri sına."],
    failLoad: ["The 3D models did not load. Check your internet connection and try again.", "3D modellər yüklənmədi. İnternet bağlantını yoxla və yenidən cəhd et."],
    retry: ["Try again", "Yenidən cəhd et"],
    alt: ["Learn it another way:", "Başqa yolla öyrən:"],
    lessons: ["Lessons", "Dərslər"],
    practice: ["Practice questions", "Məşq sualları"],
    scans: ["Brain scans", "Beyin skanları"],
  };
  function L() { return document.documentElement.lang === "az" ? 1 : 0; }
  function t(k) { return T[k][L()]; }

  var css =
    ".axl{position:fixed;left:50%;top:50%;z-index:60;transform:translate(-50%,-50%);width:min(320px,calc(100vw - 40px));box-sizing:border-box;padding:1.1rem 1.2rem;border:1px solid var(--border,rgba(0,255,140,.25));border-radius:16px;background:rgba(4,16,22,.92);color:#e8fff4;font-family:Inter,system-ui,sans-serif;text-align:center;box-shadow:0 18px 50px rgba(0,0,0,.45);transition:opacity .35s ease;pointer-events:none}" +
    "html[data-theme=day] .axl{background:rgba(255,250,242,.96);color:#2a1a08}" +
    ".axl.is-gone{opacity:0}" +
    ".axl__ring{width:34px;height:34px;margin:0 auto .7rem;border:3px solid rgba(0,255,140,.2);border-top-color:#00ff8c;border-radius:50%;animation:axl-spin .9s linear infinite}" +
    ".axl__t{margin:0;font-size:.98rem;font-weight:700}" +
    ".axl__bar{height:6px;margin:.8rem 0 .4rem;border-radius:99px;background:rgba(0,255,140,.15);overflow:hidden}" +
    ".axl__bar i{display:block;height:100%;width:0;border-radius:99px;background:#00ff8c;transition:width .3s ease}" +
    ".axl__n{margin:0;font-size:.78rem;opacity:.75}" +
    ".axl__slow{margin:.6rem 0 0;font-size:.78rem;line-height:1.45;opacity:.75}" +
    ".axl--fail{pointer-events:auto;text-align:left}" +
    ".axl--fail .axl__t{margin-bottom:.4rem}" +
    ".axl--fail p{margin:.3rem 0;font-size:.85rem;line-height:1.5}" +
    ".axl__btn{display:inline-block;margin:.6rem 0 .3rem;padding:.45rem .9rem;border:0;border-radius:999px;background:#00ff8c;color:#02100a;font:700 .82rem Inter,system-ui,sans-serif;cursor:pointer}" +
    ".axl__links{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.3rem}" +
    ".axl__links a{padding:.3rem .65rem;border:1px solid rgba(0,255,140,.35);border-radius:999px;color:inherit;font-size:.78rem;text-decoration:none}" +
    "#loading-banner.axl-src{position:absolute!important;width:1px!important;height:1px!important;overflow:hidden!important;clip:rect(0 0 0 0)!important;opacity:0!important}" +
    "@keyframes axl-spin{to{transform:rotate(360deg)}}" +
    "@media (prefers-reduced-motion:reduce){.axl__ring{animation:none}}";

  var box, banner, done = false, failed = false, prog = [0, 0], slowTimer, failKind = "load";
  var base = (document.currentScript && document.currentScript.src || "").replace(/viewer-loading\.js.*$/, "");

  function render() {
    if (!box) return;
    if (failed) {
      box.className = "axl axl--fail";
      box.innerHTML =
        '<p class="axl__t"></p><p class="axl__why"></p>' +
        '<button type="button" class="axl__btn"></button>' +
        '<p class="axl__alt"></p><div class="axl__links">' +
        '<a href="' + base + 'brain-bee-lessons.html"></a><a href="' + base + 'practice.html"></a><a href="' + base + 'brain-scans/index.html"></a></div>';
      box.querySelector(".axl__t").textContent = t("failT");
      box.querySelector(".axl__why").textContent = t(failKind === "gl" ? "failNoGL" : "failLoad");
      var b = box.querySelector(".axl__btn");
      b.textContent = t("retry");
      b.onclick = function () { location.reload(); };
      box.querySelector(".axl__alt").textContent = t("alt");
      var a = box.querySelectorAll(".axl__links a");
      a[0].textContent = t("lessons"); a[1].textContent = t("practice"); a[2].textContent = t("scans");
      return;
    }
    var pct = prog[1] ? Math.round((100 * prog[0]) / prog[1]) : 4;
    box.querySelector(".axl__t").textContent = t("title");
    box.querySelector(".axl__bar i").style.width = Math.max(4, pct) + "%";
    box.querySelector(".axl__n").textContent = prog[1] ? t("parts").replace("{a}", prog[0]).replace("{b}", prog[1]) : "";
    var s = box.querySelector(".axl__slow");
    if (s) s.textContent = t("slow");
  }

  /* No progress for a long time (for example the viewer code itself never loaded): stop spinning and explain. */
  var stallTimer;
  function stall() {
    clearTimeout(stallTimer);
    stallTimer = setTimeout(function () { if (!done && !failed) fail("load"); }, 60000);
  }

  function finish() {
    clearTimeout(stallTimer);
    if (done) return;
    done = true;
    clearTimeout(slowTimer);
    if (box && !failed) {
      box.classList.add("is-gone");
      setTimeout(function () { if (box && !failed) box.remove(); }, 400);
    }
  }

  function fail(kind) {
    if (done && !failed) return; /* a late error after the model loaded: leave the working viewer alone */
    failed = true;
    failKind = kind || "load";
    clearTimeout(slowTimer);
    render();
  }

  function read() {
    if (!banner) return;
    var txt = banner.textContent || "";
    var m = txt.match(/(\d+)\s*\/\s*(\d+)/);
    if (m && (+m[1] !== prog[0] || +m[2] !== prog[1])) { prog = [+m[1], +m[2]]; stall(); }
    if (/could not|failed|startup error|yüklənmədi|xəta/i.test(txt) && !banner.hidden) { fail("load"); return; }
    if (banner.hidden || getComputedStyle(banner).display === "none") finish();
    else render();
  }

  function init() {
    banner = document.getElementById("loading-banner");
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    if (webgl && !banner) { done = true; return; } /* page has its own loading: only the no-3D fallback is needed */
    box = document.createElement("div");
    box.className = "axl";
    box.setAttribute("role", "status");
    box.setAttribute("aria-live", "polite");
    box.innerHTML = '<div class="axl__ring"></div><p class="axl__t"></p><div class="axl__bar"><i></i></div><p class="axl__n"></p>';
    document.body.appendChild(box);
    if (banner) banner.classList.add("axl-src");
    if (!webgl) { fail("gl"); return; }
    new MutationObserver(read).observe(banner, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["hidden", "style", "class"] });
    slowTimer = setTimeout(function () {
      if (done || failed || !box) return;
      var p = document.createElement("p");
      p.className = "axl__slow";
      box.appendChild(p);
      render();
    }, 9000);
    stall();
    render();
    read();
  }

  new MutationObserver(function () { render(); }).observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
