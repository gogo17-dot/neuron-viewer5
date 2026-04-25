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
