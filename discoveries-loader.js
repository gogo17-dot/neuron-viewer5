/**
 * Loads discoveries.json, shuffles, shows a random subset each visit.
 * NEYRON home: replace static .discovery-grid inner HTML with an empty grid, then:
 *   <script src="discoveries-loader.js" defer></script>
 * Optional on .discovery-grid: data-slot-count="4" data-discoveries-src="discoveries.json"
 */
(function () {
  var GRID_SELECTOR = ".discovery-grid";
  var DEFAULT_SRC = "discoveries.json";
  var DEFAULT_SLOT_COUNT = 4;

  function escAttr(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function applyLang(container) {
    var lang = document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
    container.querySelectorAll("[data-en][data-az]").forEach(function (el) {
      el.textContent =
        lang === "az" ? el.getAttribute("data-az") : el.getAttribute("data-en");
    });
  }

  function cardHtml(item) {
    var nameAz = item.nameAz || item.nameEn;
    var textAz = item.textAz || item.textEn;
    return (
      '<article class="discovery-card" role="listitem">' +
      '<a class="discovery-card__media" href="' +
      escAttr(item.link) +
      '" target="_blank" rel="noopener noreferrer" aria-label="' +
      escAttr(item.ariaLabel) +
      '">' +
      '<img src="' +
      escAttr(item.imgSrc) +
      '" alt="' +
      escAttr(item.imgAlt) +
      '" width="330" height="220" loading="lazy" decoding="async" />' +
      "</a>" +
      '<div class="discovery-card__body">' +
      '<h4 class="discovery-card__name" data-en="' +
      escAttr(item.nameEn) +
      '" data-az="' +
      escAttr(nameAz) +
      '"></h4>' +
      '<p class="discovery-card__text" data-en="' +
      escAttr(item.textEn) +
      '" data-az="' +
      escAttr(textAz) +
      '"></p>' +
      "</div></article>"
    );
  }

  function bustUrl(base) {
    var sep = base.indexOf("?") >= 0 ? "&" : "?";
    return base + sep + "_=" + Date.now();
  }

  function run() {
    var grid = document.querySelector(GRID_SELECTOR);
    if (!grid) return;

    var rawCount = grid.getAttribute("data-slot-count");
    var count = parseInt(rawCount, 10);
    if (!count || count < 1) count = DEFAULT_SLOT_COUNT;

    var src = grid.getAttribute("data-discoveries-src") || DEFAULT_SRC;

    fetch(bustUrl(src), { cache: "no-store" })
      .then(function (r) {
        if (!r.ok) throw new Error("discoveries fetch failed");
        return r.json();
      })
      .then(function (items) {
        if (!Array.isArray(items) || !items.length) return;
        var pick = shuffle(items).slice(0, Math.min(count, items.length));
        grid.innerHTML = pick.map(cardHtml).join("");
        applyLang(grid);
      })
      .catch(function () {
        grid.setAttribute("data-discoveries-error", "1");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }
})();
