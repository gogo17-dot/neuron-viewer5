/**
 * Shared UI: language, theme, mobile nav, active nav link (data-page on <body>).
 */
(function () {
  var LS_LANG = "neyron_lang";
  var LS_THEME = "neyron_theme";

  function setNavActive() {
    var page = document.body.getAttribute("data-page");
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach(function (el) {
      el.classList.toggle("is-active", el.getAttribute("data-nav") === page);
    });
  }

  function getLang() {
    return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
  }

  function setLang(lang) {
    document.documentElement.lang = lang === "az" ? "az" : "en";
    localStorage.setItem(LS_LANG, lang === "az" ? "az" : "en");
    document.querySelectorAll("[data-en][data-az]").forEach(function (el) {
      el.textContent = lang === "az" ? el.getAttribute("data-az") : el.getAttribute("data-en");
    });
    var en = document.getElementById("lang-en");
    var az = document.getElementById("lang-az");
    if (en) en.classList.toggle("is-active", lang !== "az");
    if (az) az.classList.toggle("is-active", lang === "az");
    document.querySelectorAll("[data-tooltip-en]").forEach(function (el) {
      var a = el.getAttribute("data-tooltip-en");
      var b = el.getAttribute("data-tooltip-az");
      if (a && b) el.title = lang === "az" ? b + " / " + a : a + " / " + b;
    });
    setNavActive();
    if (typeof window.__neyronPostStructuresLang === "function") {
      window.__neyronPostStructuresLang();
    }
    if (typeof window.__neyronAfterSetLang === "function") {
      window.__neyronAfterSetLang(lang);
    }
  }

  function initLang() {
    var stored = localStorage.getItem(LS_LANG);
    setLang(stored === "az" ? "az" : "en");
  }

  function setTheme(theme) {
    var t = theme === "day" ? "day" : "night";
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(LS_THEME, t);
    if (typeof window.__neyronApplyViewTheme === "function") {
      window.__neyronApplyViewTheme(t);
    }
    if (typeof window.__neyronPostStructuresTheme === "function") {
      window.__neyronPostStructuresTheme();
    }
    if (typeof window.__neuronAtlasApplyTheme === "function") {
      window.__neuronAtlasApplyTheme(t);
    }
  }

  function initTheme() {
    var stored = localStorage.getItem(LS_THEME);
    var prefers = stored === "day" || stored === "night" ? stored : "night";
    setTheme(prefers);
  }

  function syncNavMenuOpenClass() {
    var nt = document.getElementById("nav-toggle");
    if (!nt) return;
    document.body.classList.toggle("nav-menu-open", nt.checked);
  }

  var langEn = document.getElementById("lang-en");
  var langAz = document.getElementById("lang-az");
  if (langEn) langEn.addEventListener("click", function () { setLang("en"); });
  if (langAz) langAz.addEventListener("click", function () { setLang("az"); });

  var themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      setTheme(cur === "day" ? "night" : "day");
    });
  }

  var navToggle = document.getElementById("nav-toggle");
  if (navToggle) navToggle.addEventListener("change", syncNavMenuOpenClass);

  document.querySelectorAll(".nav-center a").forEach(function (a) {
    a.addEventListener("click", function () {
      var nt = document.getElementById("nav-toggle");
      if (nt) nt.checked = false;
      syncNavMenuOpenClass();
    });
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 900) {
      var nt = document.getElementById("nav-toggle");
      if (nt) nt.checked = false;
      document.body.classList.remove("nav-menu-open");
    }
  });

  initLang();
  initTheme();

  if (document.querySelector(".io-fade")) {
    if (typeof IntersectionObserver !== "undefined") {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) e.target.classList.add("io-visible");
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      document.querySelectorAll(".io-fade").forEach(function (el) {
        io.observe(el);
      });
    } else {
      document.querySelectorAll(".io-fade").forEach(function (el) {
        el.classList.add("io-visible");
      });
    }
  }

  window.__neyronSiteShellSetLang = setLang;
  window.__neyronSiteShellSetTheme = setTheme;
})();
