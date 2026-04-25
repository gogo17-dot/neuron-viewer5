(function () {
  var CACHE_KEY = "neyron_discoveries_feed_v1";
  var CACHE_MS = 45 * 60 * 1000;
  var REFRESH_MS = 45 * 60 * 1000;
  var MIN_CARDS = 4;
  var GRID_SELECTOR = ".discovery-grid";

  var lastWorks = null;
  var lastThumbs = null;

  function getLang() {
    return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
  }

  function stripXmlish(s) {
    if (!s || typeof s !== "string") return "";
    return s
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function getTranslateProxyUrl() {
    if (typeof window !== "undefined" && window.__NEYRON_TRANSLATE_PROXY_URL) {
      return String(window.__NEYRON_TRANSLATE_PROXY_URL).trim();
    }
    try {
      var v = localStorage.getItem("neyron_translate_proxy_url");
      return v ? String(v).trim() : "";
    } catch (e) {
      return "";
    }
  }

  function getGoogleTranslateKey() {
    if (typeof window !== "undefined" && window.__NEYRON_GOOGLE_TRANSLATE_KEY) {
      return String(window.__NEYRON_GOOGLE_TRANSLATE_KEY).trim();
    }
    try {
      var v = localStorage.getItem("neyron_google_translate_key");
      return v ? String(v).trim() : "";
    } catch (e) {
      return "";
    }
  }

  function hashStr(s) {
    var h = 0;
    var i;
    for (i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return String(h);
  }

  function transCacheKey(kind, doi, text) {
    return "neyron_tr_" + kind + "_" + doi + "_" + hashStr(text).slice(0, 12);
  }

  function readTransCache(key) {
    try {
      return sessionStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function writeTransCache(key, val) {
    try {
      sessionStorage.setItem(key, val);
    } catch (e) {
      /* ignore */
    }
  }

  function translateTextsGoogle(texts, apiKey) {
    return fetch(
      "https://translation.googleapis.com/language/translate/v2?key=" + encodeURIComponent(apiKey),
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          q: texts,
          source: "en",
          target: "az",
          format: "text",
        }),
        credentials: "omit",
      }
    )
      .then(function (r) {
        if (!r.ok) throw new Error("google translate " + r.status);
        return r.json();
      })
      .then(function (j) {
        var tr = (j.data && j.data.translations) || [];
        return tr.map(function (t) {
          return (t && t.translatedText) || "";
        });
      });
  }

  function translateTextsProxy(texts, proxyUrl) {
    return fetch(proxyUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ texts: texts, source: "en", target: "az" }),
      credentials: "omit",
    })
      .then(function (r) {
        if (!r.ok) throw new Error("translate proxy " + r.status);
        return r.json();
      })
      .then(function (j) {
        var arr = j.translations;
        if (!Array.isArray(arr)) {
          arr = j.translatedTexts;
        }
        if (!Array.isArray(arr) || arr.length !== texts.length) {
          throw new Error("translate proxy bad response");
        }
        return arr;
      });
  }

  function translateWorks(works) {
    var proxy = getTranslateProxyUrl();
    var key = getGoogleTranslateKey();
    if (!proxy && !key) {
      return Promise.resolve(works);
    }

    var batchTexts = [];
    var applyFns = [];
    var n = Math.min(MIN_CARDS, works.length);
    var wi;

    for (wi = 0; wi < n; wi++) {
      (function (w) {
        var tk = transCacheKey("t", w.doi, w.title);
        var cachedT = readTransCache(tk);
        if (cachedT) {
          w.titleAz = cachedT;
        } else {
          batchTexts.push(w.title);
          applyFns.push(function (txt) {
            w.titleAz = txt;
            writeTransCache(tk, txt);
          });
        }

        var bk = transCacheKey("b", w.doi, w.enBlurb);
        var cachedB = readTransCache(bk);
        if (cachedB) {
          w.blurbAzGoogle = cachedB;
        } else {
          batchTexts.push(w.enBlurb);
          applyFns.push(function (txt) {
            w.blurbAzGoogle = txt;
            writeTransCache(bk, txt);
          });
        }
      })(works[wi]);
    }

    if (!batchTexts.length) {
      return Promise.resolve(works);
    }

    var req = proxy ? translateTextsProxy(batchTexts, proxy) : translateTextsGoogle(batchTexts, key);
    return req
      .then(function (out) {
        var i;
        for (i = 0; i < applyFns.length; i++) {
          if (out[i] != null) {
            applyFns[i](out[i]);
          }
        }
        return works;
      })
      .catch(function () {
        return works;
      });
  }

  function readCache() {
    try {
      var raw = sessionStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      var o = JSON.parse(raw);
      if (!o || !o.t || !Array.isArray(o.works) || !Array.isArray(o.thumbs)) return null;
      if (Date.now() - o.t > CACHE_MS) return null;
      if (o.works.length < MIN_CARDS) return null;
      return o;
    } catch (e) {
      return null;
    }
  }

  function writeCache(works, thumbs) {
    try {
      sessionStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ t: Date.now(), works: works, thumbs: thumbs })
      );
    } catch (e) {
      /* ignore quota */
    }
  }

  function hashPick(str, n) {
    var h = 0;
    var i;
    for (i = 0; i < str.length; i++) {
      h = (h << 5) - h + str.charCodeAt(i);
      h |= 0;
    }
    return Math.abs(h) % Math.max(1, n);
  }

  function normalizeWork(it) {
    if (!it || !it.DOI) return null;
    var titleArr = it.title;
    var title =
      Array.isArray(titleArr) && titleArr.length
        ? stripXmlish(String(titleArr[0]))
        : "";
    if (!title) return null;
    var ct = it["container-title"];
    var journal = Array.isArray(ct) && ct.length ? stripXmlish(String(ct[0])) : "";
    var srcDate = it.issued || it["published-print"] || it["published-online"];
    var parts = srcDate && srcDate["date-parts"] && srcDate["date-parts"][0];
    var year = parts && parts[0] ? String(parts[0]) : "";
    var ab = stripXmlish(it.abstract || "");
    if (ab.length > 240) ab = ab.slice(0, 237) + "…";
    if (!ab) {
      ab =
        journal && year
          ? journal + ", " + year + " — recent neuroscience research (Crossref)."
          : "Recent peer-reviewed neuroscience (Crossref).";
    }
    var azBlurb =
      journal && year
        ? "Beyin və sinir sistemi üzrə son məqalələrdən biri — " + journal + ", " + year + ". Mətn Crossref bazasından (ingilis dilindədir)."
        : "Son neyroelm məqalələrindən biri (Crossref mənbəsi, ingilis dilində).";
    return { doi: it.DOI, title: title, journal: journal, year: year, enBlurb: ab, azBlurb: azBlurb };
  }

  function fetchCrossrefWorks() {
    var d = new Date();
    d.setMonth(d.getMonth() - 18);
    var y = d.getFullYear();
    var mo = d.getMonth() + 1;
    var da = d.getDate();
    var m = mo < 10 ? "0" + mo : String(mo);
    var day = da < 10 ? "0" + da : String(da);
    var fromDate = y + "-" + m + "-" + day;
    var url =
      "https://api.crossref.org/works?" +
      new URLSearchParams({
        query: "brain neuroscience synapse cognition",
        filter: "type:journal-article,from-pub-date:" + fromDate,
        rows: "12",
        sort: "published",
        order: "desc",
        mailto: "hello@neyron.atlas.az",
      }).toString();
    return fetch(url, { credentials: "omit" })
      .then(function (r) {
        if (!r.ok) throw new Error("crossref " + r.status);
        return r.json();
      })
      .then(function (j) {
        var items = (j.message && j.message.items) || [];
        var out = [];
        var i;
        for (i = 0; i < items.length; i++) {
          var w = normalizeWork(items[i]);
          if (w) out.push(w);
        }
        return out;
      });
  }

  function fetchCommonsThumbs() {
    var url =
      "https://commons.wikimedia.org/w/api.php?" +
      new URLSearchParams({
        action: "query",
        generator: "categorymembers",
        gcmtitle: "Category:Neuroscience",
        gcmnamespace: "6",
        gcmtype: "file",
        gcmlimit: "36",
        prop: "imageinfo",
        iiprop: "url|mime|thumburl",
        iiurlwidth: "330",
        format: "json",
        origin: "*",
      }).toString();
    return fetch(url, { credentials: "omit" })
      .then(function (r) {
        if (!r.ok) throw new Error("commons " + r.status);
        return r.json();
      })
      .then(function (j) {
        var pages = (j.query && j.query.pages) || {};
        var list = [];
        var k;
        for (k in pages) {
          if (!Object.prototype.hasOwnProperty.call(pages, k)) continue;
          var p = pages[k];
          if (!p || !p.imageinfo || !p.imageinfo[0]) continue;
          var ii = p.imageinfo[0];
          var mime = ii.mime || "";
          if (mime.indexOf("image/") !== 0) continue;
          var u = ii.thumburl || ii.url;
          if (!u) continue;
          var alt = (p.title || "Neuroscience").replace(/^File:/, "").replace(/_/g, " ");
          list.push({ url: u, alt: alt });
        }
        return list;
      });
  }

  function cardTitleForLang(w) {
    var az = getLang() === "az";
    if (az && w.titleAz) return w.titleAz;
    return w.title;
  }

  function cardBlurbForLang(w) {
    var az = getLang() === "az";
    if (az && w.blurbAzGoogle) return w.blurbAzGoogle;
    if (az) return w.azBlurb;
    return w.enBlurb;
  }

  function renderCardsDom(works, thumbs) {
    var grid = document.querySelector(GRID_SELECTOR);
    if (!grid || !works || works.length < MIN_CARDS) return false;
    var tn = thumbs && thumbs.length ? thumbs.length : 0;
    var frag = document.createDocumentFragment();
    var i;
    for (i = 0; i < MIN_CARDS; i++) {
      var w = works[i];
      var ti = tn ? thumbs[hashPick(w.doi + String(i), tn)] : null;
      var imgUrl = ti ? ti.url : "";
      var imgAlt = ti ? ti.alt : "Neuroscience";

      var art = document.createElement("article");
      art.className = "discovery-card";
      art.setAttribute("role", "listitem");

      var a = document.createElement("a");
      a.className = "discovery-card__media";
      a.href = "https://doi.org/" + w.doi;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.setAttribute("aria-label", cardTitleForLang(w) + " (opens in new tab)");

      var img = document.createElement("img");
      img.src = imgUrl || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
      img.alt = imgAlt;
      img.width = 330;
      img.height = 220;
      img.loading = "lazy";
      img.decoding = "async";
      if (imgUrl) {
        img.addEventListener("error", function once() {
          img.removeEventListener("error", once);
          img.src =
            "https://commons.wikimedia.org/wiki/Special:FilePath/Connectome.jpg?width=330";
        });
      }
      a.appendChild(img);

      var body = document.createElement("div");
      body.className = "discovery-card__body";
      var h4 = document.createElement("h4");
      h4.className = "discovery-card__name";
      h4.textContent = cardTitleForLang(w);
      var p = document.createElement("p");
      p.className = "discovery-card__text";
      p.textContent = cardBlurbForLang(w);
      body.appendChild(h4);
      body.appendChild(p);
      art.appendChild(a);
      art.appendChild(body);
      frag.appendChild(art);
    }
    grid.innerHTML = "";
    grid.appendChild(frag);
    lastWorks = works;
    lastThumbs = thumbs;
    return true;
  }

  function renderCards(works, thumbs) {
    if (!works || works.length < MIN_CARDS) {
      return Promise.resolve(false);
    }
    return translateWorks(works).then(function (tw) {
      return renderCardsDom(tw, thumbs);
    });
  }

  function rerenderLang() {
    if (!lastWorks || !lastWorks.length) return;
    var grid = document.querySelector(GRID_SELECTOR);
    if (!grid) return;
    var cards = grid.querySelectorAll(".discovery-card");
    var i;
    for (i = 0; i < cards.length && i < lastWorks.length; i++) {
      var w = lastWorks[i];
      var h4 = cards[i].querySelector(".discovery-card__name");
      var p = cards[i].querySelector(".discovery-card__text");
      if (h4) h4.textContent = cardTitleForLang(w);
      if (p) p.textContent = cardBlurbForLang(w);
    }
  }

  function maybeRetranslateForAz() {
    if (getLang() !== "az") return;
    if (!lastWorks || !lastWorks.length) return;
    if (!getTranslateProxyUrl() && !getGoogleTranslateKey()) return;
    var needs = false;
    var i;
    for (i = 0; i < Math.min(MIN_CARDS, lastWorks.length); i++) {
      if (!lastWorks[i].titleAz || !lastWorks[i].blurbAzGoogle) {
        needs = true;
        break;
      }
    }
    if (!needs) return;
    translateWorks(lastWorks).then(function () {
      rerenderLang();
    });
  }

  function runFetch() {
    return Promise.all([fetchCrossrefWorks(), fetchCommonsThumbs()])
      .then(function (pair) {
        var works = pair[0];
        var thumbs = pair[1] || [];
        if (!works || works.length < MIN_CARDS) return false;
        writeCache(works.slice(0, 12), thumbs);
        return renderCards(works, thumbs);
      })
      .catch(function () {
        return false;
      });
  }

  function init() {
    var cached = readCache();
    if (cached && cached.works.length >= MIN_CARDS) {
      renderCards(cached.works, cached.thumbs).then(function () {
        maybeRetranslateForAz();
      });
    }
    runFetch().then(function (ok) {
      if (!ok && cached && cached.works.length >= MIN_CARDS) {
        /* keep cache render */
      } else if (ok) {
        maybeRetranslateForAz();
      }
    });

    setInterval(function () {
      if (document.visibilityState !== "visible") return;
      runFetch();
    }, REFRESH_MS);

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible") return;
      var c = readCache();
      if (!c) {
        runFetch();
      }
    });
  }

  window.__neyronRerenderDiscoveriesForLang = function () {
    rerenderLang();
    maybeRetranslateForAz();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
