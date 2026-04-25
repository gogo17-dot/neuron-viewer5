/**
 * Loads neuronatlas/index.html in the iframe. URL is resolved with the URL API
 * relative to the current page so GitHub Pages project sites (/repo/...) resolve correctly.
 */
(function () {
  var iframe = document.getElementById("atlas-full-embed");
  if (!iframe) return;

  function neuronatlasIndexUrl() {
    var u = new URL("neuronatlas/index.html", document.baseURI || window.location.href);
    var th = document.documentElement.getAttribute("data-theme") === "day" ? "day" : "night";
    u.searchParams.set("theme", th);
    return u;
  }

  function embedOrigin() {
    return window.location.origin;
  }

  function embedSrc() {
    return neuronatlasIndexUrl().toString();
  }

  function postThemeToEmbed() {
    try {
      if (!iframe.contentWindow) return;
      var theme = document.documentElement.getAttribute("data-theme") === "day" ? "day" : "night";
      iframe.contentWindow.postMessage(
        { source: "neyron-parent", type: "theme", theme: theme },
        embedOrigin()
      );
    } catch (err) {}
  }

  function postLangToEmbed() {
    try {
      if (!iframe.contentWindow) return;
      var lang = document.documentElement.lang === "az" ? "az" : "en";
      iframe.contentWindow.postMessage(
        { source: "neyron-parent", type: "lang", lang: lang },
        embedOrigin()
      );
    } catch (err) {}
  }

  function syncEmbedFromParent() {
    postThemeToEmbed();
    postLangToEmbed();
  }

  window.__neyronPostStructuresTheme = postThemeToEmbed;
  window.__neyronPostStructuresLang = postLangToEmbed;

  iframe.addEventListener("load", syncEmbedFromParent);
  iframe.src = embedSrc();
})();
