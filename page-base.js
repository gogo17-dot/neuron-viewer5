/**
 * Inserts <base href="…/"> so relative links (articles.html, atlas.html, neuronatlas/…)
 * resolve from the folder that contains the current page. Fixes GitHub Pages project
 * sites and extensionless URLs like /repo/atlas-neuron → base /repo/.
 */
(function () {
  if (document.querySelector("base[data-neyron-base]")) return;

  function directoryForPagePath(pathname) {
    var p = pathname || "/";
    if (p.endsWith("/")) {
      return p;
    }
    var lastSlash = p.lastIndexOf("/");
    var last = lastSlash >= 0 ? p.slice(lastSlash + 1) : p;
    var knownFile = /\.(html?|css|js|json|svg|png|jpe?g|webp|gif|ico|glb|woff2?)(\?.*)?$/i.test(last);
    if (knownFile) {
      return lastSlash >= 0 ? p.slice(0, lastSlash + 1) : "/";
    }
    if (lastSlash <= 0) {
      return p + "/";
    }
    return p.slice(0, lastSlash + 1);
  }

  try {
    var dir = directoryForPagePath(window.location.pathname);
    var b = document.createElement("base");
    b.setAttribute("data-neyron-base", "1");
    b.href = dir;
    document.head.insertBefore(b, document.head.firstChild);
  } catch (e) {}
})();

/**
 * Apply the saved theme and language before first paint. Pages ship with
 * data-theme="night"; without this, light-theme visitors saw a dark frame
 * and a 0.5s fade. site-shell.js still owns toggling later.
 */
(function () {
  try {
    var t = localStorage.getItem("neyron_theme");
    if (t === "day" || t === "night") document.documentElement.setAttribute("data-theme", t);
    var l = localStorage.getItem("neyron_lang");
    /* First visit: open in Azerbaijani. The EN/AZ toggle still switches and is remembered. */
    if (l !== "az" && l !== "en") {
      l = "az";
      localStorage.setItem("neyron_lang", l);
    }
    document.documentElement.lang = l;
  } catch (e) {}
})();

/**
 * Visitor counter (GoatCounter, no cookies). Counts only on the live site,
 * not on local copies or previews.
 */
(function () {
  try {
    var h = location.hostname;
    if (h !== "axon.az" && h !== "www.axon.az") return;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.setAttribute("data-goatcounter", "https://omarg.goatcounter.com/count");
    document.head.appendChild(s);
  } catch (e) {}
})();

/**
 * Installable app: register the service worker (live site only) and wire up
 * the "Install AXON" button in the homepage footer when the browser allows it.
 * On iPhone/iPad there is no install prompt, so the button shows how to use
 * Share → Add to Home Screen instead.
 */
(function () {
  try {
    var h = location.hostname;
    var live = h === "axon.az" || h === "www.axon.az";
    var testing = false;
    try { testing = localStorage.getItem("axon_sw_test") === "1"; } catch (e) {}
    if ("serviceWorker" in navigator && (live || testing)) {
      window.addEventListener("load", function () {
        navigator.serviceWorker.register("/sw.js").catch(function () {});
      });
    }

    var standalone = (window.matchMedia && window.matchMedia("(display-mode: standalone)").matches) || navigator.standalone === true;
    if (standalone) return;
    var deferred = null;
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

    function az() { return document.documentElement.lang === "az"; }
    function btn() { return document.getElementById("install-app"); }
    function show() { var b = btn(); if (b) b.hidden = false; }

    window.addEventListener("beforeinstallprompt", function (e) {
      e.preventDefault();
      deferred = e;
      show();
    });
    window.addEventListener("appinstalled", function () {
      deferred = null;
      var b = btn(); if (b) b.hidden = true;
    });

    document.addEventListener("DOMContentLoaded", function () {
      var b = btn();
      if (!b) return;
      if (ios) show();
      b.addEventListener("click", function () {
        if (deferred) {
          deferred.prompt();
          deferred.userChoice.then(function () { deferred = null; b.hidden = true; }).catch(function () {});
          return;
        }
        var tip = document.getElementById("install-tip");
        if (tip) {
          tip.textContent = az()
            ? "Safari-də aşağıdakı “Paylaş” düyməsinə, sonra “Əsas ekrana əlavə et”ə toxunun."
            : "In Safari, tap the Share button, then “Add to Home Screen”.";
          tip.hidden = false;
        }
      });
    });
  } catch (e) {}
})();
