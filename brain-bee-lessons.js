/**
 * Renders BB_LESSONS (brain-bee-lessons-data.js) as an index (grouped by
 * part → chapter) or, with ?lesson=<id>, a single lesson. Plain script,
 * same convention as brain-bee-quiz.js — no build step, no ES module.
 *
 * A lesson with an empty `body` is a real roadmap row, not a bug: it is
 * shown disabled on the index and, if reached directly, as an honest
 * "not written yet" state. Never fill it with placeholder text.
 */
(function () {
  var UI = {
    title: { en: "Brain Bee lessons", az: "Brain Bee dərsləri" },
    lead: {
      en: "Short lessons, one chapter at a time. Read first, then practice that chapter — every chapter has a drill.",
      az: "Qısa dərslər, hər dəfə bir fəsil. Əvvəl oxuyun, sonra həmin fəsli məşq edin — hər fəslin məşqi var.",
    },
    notWritten: { en: "Not written yet", az: "Hələ yazılmayıb" },
    noPractice: {
      en: "No practice content exists for this chapter yet.",
      az: "Bu fəsil üçün hələ məşq materialı yoxdur.",
    },
    sharedDx: {
      en: "Practice for this chapter shares the patient-diagnosis pool — not every case belongs here.",
      az: "Bu fəslin məşqi pasiyent-diaqnoz hovuzunu paylaşır — hər hal buraya aid deyil.",
    },
    highlighted: {
      en: "Lessons for this practice topic are highlighted.",
      az: "Bu məşq mövzusunun dərsləri işarələnib.",
    },
    showAll: { en: "Show all lessons", az: "Bütün dərsləri göstər" },
    practiceThis: { en: "Practice this →", az: "Bunu məşq et →" },
    watchEn: { en: "Watch further (external, English)", az: "Ətraflı bax (xarici, ingiliscə)" },
    watchAz: { en: "Watch further (Azerbaijani)", az: "Ətraflı bax (Azərbaycan dilində)" },
    back: { en: "← All lessons", az: "← Bütün dərslər" },
    notFound: { en: "Lesson not found.", az: "Dərs tapılmadı." },
  };

  var app = document.getElementById("bb-lessons-app");
  var lessons = typeof BB_LESSONS === "undefined" ? [] : BB_LESSONS;

  function lang() {
    return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
  }

  function pick(value) {
    if (value == null) return "";
    if (typeof value === "object") return value[lang()] || value.en || "";
    return value;
  }

  function t(key) {
    return pick(UI[key]) || key;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function currentLessonId() {
    return new URLSearchParams(location.search).get("lesson");
  }

  function currentModuleId() {
    return new URLSearchParams(location.search).get("module");
  }

  function renderIndex() {
    var moduleFilter = currentModuleId();
    var html =
      '<div class="tag" data-en="Curriculum" data-az="Kurikulum">Curriculum</div>' +
      '<h1 class="section-title about-title">' + esc(t("title")) + "</h1>" +
      '<p class="section-desc about-lead">' + esc(t("lead")) + "</p>" +
      '<div data-bb-habit="compact"></div>';

    if (moduleFilter) {
      html +=
        '<p class="bb-hint">' +
        esc(t("highlighted")) +
        ' <a href="brain-bee-lessons.html">' +
        esc(t("showAll")) +
        "</a></p>";
    }

    var seenParts = {};
    var seenChapters = {};
    lessons.forEach(function (lesson) {
      var partKey = pick(lesson.part);
      if (!seenParts[partKey]) {
        seenParts[partKey] = true;
        html += '<h2 class="about-block__title" style="margin-top:2rem">' + esc(partKey) + "</h2>";
      }
      var chapterKey = partKey + "::" + pick(lesson.chapterTitle);
      if (!seenChapters[chapterKey]) {
        seenChapters[chapterKey] = true;
        html += '<p class="bb-hint" style="margin-top:0.75rem">' + esc(pick(lesson.chapterTitle)) + "</p>";
        html += '<div class="atlas-choice-grid bb-section-grid">';
      }
      var written = lesson.body && lesson.body.length > 0;
      var cardClass = window.BBProgress
        ? window.BBProgress.cardClass(lesson.id, "atlas-choice-card")
        : "atlas-choice-card";
      if (moduleFilter && lesson.moduleId === moduleFilter) cardClass += " is-lesson-match";
      if (written) {
        html +=
          '<a class="' +
          cardClass +
          '" id="bb-lesson-' +
          esc(lesson.id) +
          '" href="brain-bee-lessons.html?lesson=' +
          esc(lesson.id) +
          '"><h3 class="atlas-choice-card__title">' +
          esc(lesson.chapter) +
          " " +
          esc(pick(lesson.title)) +
          "</h3>";
        if (!lesson.moduleId) {
          html += '<p class="atlas-choice-card__hint">' + esc(t("noPractice")) + "</p>";
        }
        if (window.BBProgress) html += window.BBProgress.cardExtrasHtml(lesson.id);
        html += "</a>";
      } else {
        html +=
          '<div class="atlas-choice-card atlas-choice-card--soon"><h3 class="atlas-choice-card__title">' +
          esc(lesson.chapter) +
          " " +
          esc(pick(lesson.title)) +
          '</h3><p class="atlas-choice-card__hint">' +
          esc(t("notWritten")) +
          "</p></div>";
      }
      var isLastInChapter =
        lessons.indexOf(lesson) === lessons.length - 1 ||
        pick(lessons[lessons.indexOf(lesson) + 1].part) + "::" + pick(lessons[lessons.indexOf(lesson) + 1].chapterTitle) !== chapterKey;
      if (isLastInChapter) html += "</div>";
    });

    app.innerHTML = html;
    var match = app.querySelector(".is-lesson-match");
    if (match) match.scrollIntoView({ block: "center" });
  }

  /* Display-only: break a long paragraph into short chunks of whole
     sentences (~2-3 each). The lesson text itself is unchanged. */
  function sentences(text) {
    var out = [], start = 0, m;
    var re = /[.!?](?=\s+["“(]?[A-ZÀ-ÖØ-ÞÇƏĞİÖŞÜ0-9])/g;
    while ((m = re.exec(text))) {
      var piece = text.slice(start, m.index + 1);
      var word = (piece.match(/(\S+)$/) || [""])[0];
      if (/^(e\.g|i\.e|vs|approx|cf|etc|Dr|St|Mr|Ms|No|Fig|ca)\.$/i.test(word)) continue;
      if (/\.[A-Za-z]\.$/.test(word)) continue;
      out.push(piece.trim());
      start = m.index + 1;
    }
    var rest = text.slice(start).trim();
    if (rest) out.push(rest);
    return out;
  }

  function chunks(text) {
    var words = function (x) { return x.split(/\s+/).filter(Boolean).length; };
    if (words(text) <= 45) return [text];
    var groups = [], cur = [];
    sentences(text).forEach(function (sn) {
      cur.push(sn);
      if (words(cur.join(" ")) >= 30) { groups.push(cur.join(" ")); cur = []; }
    });
    if (cur.length) {
      if (groups.length && words(cur.join(" ")) < 15) groups[groups.length - 1] += " " + cur.join(" ");
      else groups.push(cur.join(" "));
    }
    return groups;
  }

  function bodyHtml(lesson) {
    var html = '<div class="about-block bb-lesson-body">';
    (lesson.body || []).forEach(function (block) {
      if (block.type === "p") {
        chunks(String(pick(block.text) || "")).forEach(function (c) {
          html += "<p>" + esc(c) + "</p>";
        });
      }
    });
    html += "</div>";
    return html;
  }

  function seeHtml(lesson) {
    if (!lesson.see) return "";
    return '<p class="bb-hint"><a href="' + esc(lesson.see.href) + '">' + esc(pick(lesson.see)) + "</a></p>";
  }

  function oneVideoHtml(video, summaryKey) {
    if (!video || !video.youtubeId) return "";
    return (
      '<details class="bb-lesson-video"><summary>' +
      esc(t(summaryKey)) +
      '</summary><div class="bb-lesson-video__frame"><iframe src="https://www.youtube-nocookie.com/embed/' +
      esc(video.youtubeId) +
      '" title="' +
      esc(pick(video.title)) +
      '" loading="lazy" allowfullscreen></iframe></div><p class="bb-hint">' +
      esc(pick(video.title)) +
      "</p></details>"
    );
  }

  function videoHtml(lesson) {
    var en = oneVideoHtml(lesson.video, "watchEn");
    var az = oneVideoHtml(lesson.videoAz, "watchAz");
    if (!en && !az) return "";
    if (lang() === "az" && az) return az + en;
    return en + az;
  }

  function practiceHtml(lesson) {
    if (!lesson.moduleId) {
      return '<p class="bb-hint">' + esc(t("noPractice")) + "</p>";
    }
    var note =
      lesson.moduleId === "diagnosis"
        ? '<p class="bb-hint">' + esc(t("sharedDx")) + "</p>"
        : "";
    return (
      note +
      '<div class="bb-actions"><a class="about-action" href="practice.html?module=' +
      esc(lesson.moduleId) +
      '" data-bb-done="' +
      esc(lesson.id) +
      '">' +
      esc(t("practiceThis")) +
      "</a></div>"
    );
  }

  function renderDetail(lesson) {
    if (!lesson) {
      app.innerHTML = '<p class="bb-hint">' + esc(t("notFound")) + '</p><p><a class="about-action about-action--ghost" href="brain-bee-lessons.html">' + esc(t("back")) + "</a></p>";
      return;
    }
    var html =
      '<div class="tag">' + esc(pick(lesson.part)) + " · " + esc(pick(lesson.chapterTitle)) + "</div>" +
      '<h1 class="section-title about-title">' + esc(lesson.chapter) + " " + esc(pick(lesson.title)) + "</h1>";

    if (lesson.body && lesson.body.length) {
      html += bodyHtml(lesson) + seeHtml(lesson) + videoHtml(lesson) + practiceHtml(lesson);
    } else {
      html += '<p class="bb-hint">' + esc(t("notWritten")) + "</p>";
    }
    html += '<p><a class="about-action about-action--ghost" href="brain-bee-lessons.html">' + esc(t("back")) + "</a></p>";
    app.innerHTML = html;
  }

  function render() {
    var id = currentLessonId();
    if (id) {
      var lesson = lessons.filter(function (l) {
        return l.id === id;
      })[0];
      if (lesson && window.BBProgress) window.BBProgress.markLessonOpened(lesson.id);
      renderDetail(lesson);
    } else {
      renderIndex();
    }
    if (window.BBProgress) window.BBProgress.mount();
  }

  window.__neyronAfterSetLang = render;
  app.addEventListener("click", function (e) {
    var link = e.target.closest("a[data-bb-done]");
    if (!link || !window.BBProgress) return;
    window.BBProgress.markLessonDone(link.getAttribute("data-bb-done"));
  });
  render();
})();
