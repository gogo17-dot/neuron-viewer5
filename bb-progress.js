/**
 * Shared Brain Bee habit/progress state (client-side only).
 * Key: bb_habit. Mistake counts read bb_practice_attempts (same log as
 * practice-mistakes.js). No streak existed before this file.
 */
(function (root) {
  var STORE_KEY = "bb_habit";
  var ATTEMPTS_KEY = "bb_practice_attempts";
  var TOTAL = 34;

  var LESSONS = [
    { id: "neuron-structure", chapter: "1.1", moduleId: "neuron-ap", title: { en: "The neuron: structure", az: "Neyron: quruluşu" } },
    { id: "neuron-action-potential", chapter: "1.2", moduleId: "neuron-ap", title: { en: "Resting potential & the action potential", az: "İstirahət potensialı və fəaliyyət potensialı" } },
    { id: "neuron-conduction", chapter: "1.3", moduleId: "neuron-ap", title: { en: "Conduction: myelin & saltatory conduction", az: "Keçirilmə: mielin və saltatorik keçirilmə" } },
    { id: "synapse-transmitters", chapter: "1.4", moduleId: "synapse-nt", title: { en: "Synapses & neurotransmitters", az: "Sinapslar və neyrotransmitterlər" } },
    { id: "brain-overview", chapter: "1.5", moduleId: "ventricles-meninges", title: { en: "Whole-brain orientation: meninges & ventricles", az: "Bütöv beyinə giriş: meninges və mədəciklər" } },
    { id: "cortex-lobes", chapter: "1.6", moduleId: "cortex", title: { en: "Cortex & lobes", az: "Qabıq və paylar" } },
    { id: "diencephalon", chapter: "1.7", moduleId: "diencephalon", title: { en: "Diencephalon", az: "Diensefalon" } },
    { id: "limbic-system", chapter: "1.8", moduleId: "limbic", title: { en: "Limbic system", az: "Limbik sistem" } },
    { id: "basal-ganglia", chapter: "1.9", moduleId: "basal-ganglia", title: { en: "Basal ganglia", az: "Bazal qanqliyalar" } },
    { id: "brainstem", chapter: "1.10", moduleId: "brainstem", title: { en: "Brainstem", az: "Beyin sapı" } },
    { id: "cranial-nerves", chapter: "1.11", moduleId: "cranial-nerves", title: { en: "Cranial nerves", az: "Kəllə sinirləri" } },
    { id: "cerebellum", chapter: "1.12", moduleId: "cerebellum", title: { en: "Cerebellum", az: "Beyincik" } },
    { id: "white-matter", chapter: "1.13", moduleId: "white-matter", title: { en: "White matter & tracts", az: "Ağ maddə və yollar" } },
    { id: "neural-development", chapter: "2.1", moduleId: "neural-development", title: { en: "Neural development & migration", az: "Sinir sisteminin inkişafı və miqrasiyası" } },
    { id: "critical-periods", chapter: "2.2", moduleId: "critical-periods", title: { en: "Critical periods", az: "Kritik dövrlər" } },
    { id: "neuroplasticity", chapter: "2.3", moduleId: "neuroplasticity", title: { en: "Neuroplasticity", az: "Neyroplastiklik" } },
    { id: "vision", chapter: "3.1", moduleId: "sensory", title: { en: "Vision", az: "Görmə" } },
    { id: "hearing-balance", chapter: "3.2", moduleId: "sensory", title: { en: "Hearing & balance", az: "Eşitmə və tarazlıq" } },
    { id: "taste-smell-touch-pain", chapter: "3.3", moduleId: "sensory", title: { en: "Taste, smell, touch & pain", az: "Dad, qoxu, toxunma və ağrı" } },
    { id: "learning-memory", chapter: "4.1", moduleId: "memory", title: { en: "Learning & memory", az: "Öyrənmə və yaddaş" } },
    { id: "language-brain", chapter: "4.2", moduleId: "language-brain", title: { en: "Language & the brain", az: "Dil və beyin" } },
    { id: "movement", chapter: "5", moduleId: "motor", title: { en: "Movement", az: "Hərəkət" } },
    { id: "sleep", chapter: "6.1", moduleId: "sleep-attention-emotion", title: { en: "Sleep", az: "Yuxu" } },
    { id: "attention-emotion", chapter: "6.2", moduleId: "sleep-attention-emotion", title: { en: "Attention & emotion", az: "Diqqət və emosiya" } },
    { id: "stress", chapter: "7", moduleId: "stress", title: { en: "Stress", az: "Stress" } },
    { id: "aging", chapter: "8", moduleId: "aging", title: { en: "Aging", az: "Qocalma" } },
    { id: "kinds-of-research", chapter: "9", moduleId: "kinds-of-research", title: { en: "Kinds of Research", az: "Tədqiqat növləri" } },
    { id: "childhood-disorders", chapter: "10", moduleId: "diagnosis", title: { en: "Childhood disorders", az: "Uşaqlıq pozğunluqları" } },
    { id: "addiction", chapter: "11", moduleId: "addiction", title: { en: "Addiction", az: "Asılılıq" } },
    { id: "degenerative-disorders", chapter: "12", moduleId: "diagnosis", title: { en: "Degenerative disorders", az: "Degenerativ xəstəliklər" } },
    { id: "psychiatric-disorders", chapter: "13", moduleId: "diagnosis", title: { en: "Psychiatric disorders", az: "Psixiatrik pozğunluqlar" } },
    { id: "injury-illness", chapter: "14", moduleId: "diagnosis", title: { en: "Injury & illness", az: "Zədə və xəstəlik" } },
    { id: "potential-therapies", chapter: "15", moduleId: "potential-therapies", title: { en: "Potential Therapies", az: "Potensial müalicələr" } },
    { id: "neuroethics", chapter: "16", moduleId: "neuroethics", title: { en: "Neuroethics", az: "Neyroetika" } },
  ];

  var MODULE_LABELS = {
    cortex: { en: "Cortex & lobes", az: "Qabıq və paylar" },
    brainstem: { en: "Brainstem", az: "Beyin sapı" },
    cerebellum: { en: "Cerebellum", az: "Beyincik" },
    "basal-ganglia": { en: "Basal ganglia", az: "Bazal qanqliyalar" },
    limbic: { en: "Limbic system", az: "Limbik sistem" },
    diencephalon: { en: "Diencephalon", az: "Diensefalon" },
    "ventricles-meninges": { en: "Ventricles & meninges", az: "Mədəciklər və meninges" },
    "white-matter": { en: "White matter", az: "Ağ maddə" },
    "cranial-nerves": { en: "Cranial nerves", az: "Kəllə sinirləri" },
    "neuron-ap": { en: "Neuron & action potential", az: "Neyron və fəaliyyət potensialı" },
    "synapse-nt": { en: "Synapse & transmitters", az: "Sinaps və transmitterlər" },
    sensory: { en: "Sensory systems", az: "Sensor sistemlər" },
    motor: { en: "Motor control", az: "Motor nəzarət" },
    memory: { en: "Memory & learning", az: "Yaddaş və öyrənmə" },
    "sleep-attention-emotion": { en: "Sleep, attention, emotion", az: "Yuxu, diqqət, emosiya" },
    "neural-development": { en: "Neural development", az: "Sinir inkişafı" },
    "critical-periods": { en: "Critical periods", az: "Kritik dövrlər" },
    neuroplasticity: { en: "Neuroplasticity", az: "Neyroplastiklik" },
    "language-brain": { en: "Language & the brain", az: "Dil və beyin" },
    stress: { en: "Stress", az: "Stress" },
    aging: { en: "Aging", az: "Qocalma" },
    "kinds-of-research": { en: "Kinds of research", az: "Tədqiqat növləri" },
    addiction: { en: "Addiction", az: "Asılılıq" },
    "potential-therapies": { en: "Potential therapies", az: "Potensial müalicələr" },
    diagnosis: { en: "Patient diagnosis", az: "Pasiyent diaqnozu" },
    neuroethics: { en: "Neuroethics", az: "Neyroetika" },
  };

  var UI = {
    streak: { en: "streak", az: "silsilə" },
    dayStreak: { en: "-day streak", az: " günlük silsilə" },
    best: { en: "Best", az: "Ən yaxşı" },
    days: { en: "days", az: "gün" },
    day: { en: "day", az: "gün" },
    startStreak: { en: "Start a streak", az: "Silsiləyə başla" },
    continue: { en: "Continue where you left off", az: "Qaldığınız yerdən davam" },
    startHere: { en: "Start here", az: "Buradan başla" },
    weakest: { en: "Weakest topic", az: "Ən zəif mövzu" },
    noMisses: { en: "No open mistakes", az: "Açıq səhv yoxdur" },
    miss: { en: "mistake waiting", az: "səhv gözləyir" },
    misses: { en: "mistakes waiting", az: "səhv gözləyir" },
    review: { en: "Review", az: "Bax" },
    curriculum: { en: "Curriculum", az: "Kurikulum" },
    ofChapters: { en: "of 34 chapters", az: "/ 34 fəsil" },
    continuePill: { en: "Continue", az: "Davam" },
    upNext: { en: "Up next", az: "Növbəti" },
    done: { en: "Done", az: "Bitib" },
    missReview: { en: "mistakes to review", az: "səhvə baxın" },
    missReviewOne: { en: "mistake to review", az: "səhvə baxın" },
    beatBest: { en: "more correct beats your best day", az: "daha düzgün cavab ən yaxşı günü keçir" },
    streakTile: { en: "Streak", az: "Silsilə" },
  };

  function lang() {
    return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
  }

  function t(key) {
    var row = UI[key];
    if (!row) return key;
    return lang() === "az" ? row.az : row.en;
  }

  function pick(value) {
    if (value == null) return "";
    if (typeof value === "object") return value[lang()] || value.en || "";
    return value;
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function todayKey(now) {
    var d = now || new Date();
    var y = d.getFullYear();
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  function addDays(key, delta) {
    var parts = key.split("-").map(Number);
    var d = new Date(parts[0], parts[1] - 1, parts[2]);
    d.setDate(d.getDate() + delta);
    return todayKey(d);
  }

  function emptyState() {
    return {
      streak: 0,
      best: 0,
      lastDay: "",
      lastLessonId: "",
      lastLessonAt: 0,
      opened: {},
      done: {},
      todayCorrect: 0,
      todayCorrectDay: "",
      bestDayCorrect: 0,
    };
  }

  function load() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      if (!raw) return emptyState();
      var data = JSON.parse(raw);
      var base = emptyState();
      Object.keys(base).forEach(function (k) {
        if (data[k] != null) base[k] = data[k];
      });
      if (!base.opened || typeof base.opened !== "object") base.opened = {};
      if (!base.done || typeof base.done !== "object") base.done = {};
      return base;
    } catch (e) {
      return emptyState();
    }
  }

  function save(state) {
    localStorage.setItem(STORE_KEY, JSON.stringify(state));
  }

  function rollTodayCorrect(state, now) {
    var today = todayKey(now);
    if (state.todayCorrectDay !== today) {
      if (state.todayCorrect > (state.bestDayCorrect || 0)) state.bestDayCorrect = state.todayCorrect;
      state.todayCorrect = 0;
      state.todayCorrectDay = today;
    }
  }

  function applyStreak(state, now) {
    var today = todayKey(now);
    if (state.lastDay === today) return state;
    if (state.lastDay === addDays(today, -1)) state.streak = (state.streak || 0) + 1;
    else state.streak = 1;
    state.lastDay = today;
    if (state.streak > (state.best || 0)) state.best = state.streak;
    return state;
  }

  function touchActivity(opts) {
    var state = load();
    var now = new Date();
    rollTodayCorrect(state, now);
    applyStreak(state, now);
    if (opts && opts.correct) {
      state.todayCorrect = (state.todayCorrect || 0) + 1;
      if (state.todayCorrect > (state.bestDayCorrect || 0)) state.bestDayCorrect = state.todayCorrect;
    }
    save(state);
    return state;
  }

  function lessonById(id) {
    for (var i = 0; i < LESSONS.length; i++) if (LESSONS[i].id === id) return LESSONS[i];
    return null;
  }

  function lessonTitle(row) {
    if (!row) return "";
    var title = row.title;
    if (typeof BB_LESSONS !== "undefined") {
      for (var i = 0; i < BB_LESSONS.length; i++) {
        if (BB_LESSONS[i].id === row.id) {
          title = BB_LESSONS[i].title || title;
          break;
        }
      }
    }
    return title ? row.chapter + " " + pick(title) : row.chapter;
  }

  function markLessonOpened(id) {
    if (!lessonById(id)) return load();
    var state = load();
    var now = new Date();
    rollTodayCorrect(state, now);
    applyStreak(state, now);
    state.lastLessonId = id;
    state.lastLessonAt = Date.now();
    state.opened[id] = Date.now();
    save(state);
    return state;
  }

  function markLessonDone(id) {
    if (!lessonById(id)) return load();
    var state = load();
    state.done[id] = Date.now();
    if (!state.opened[id]) state.opened[id] = Date.now();
    save(state);
    return state;
  }

  function readAttempts() {
    try {
      var raw = localStorage.getItem(ATTEMPTS_KEY);
      if (!raw) return [];
      var list = JSON.parse(raw);
      return Array.isArray(list) ? list : [];
    } catch (e) {
      return [];
    }
  }

  function missCountsByModule() {
    var counts = {};
    readAttempts().forEach(function (a) {
      if (a.correct) return;
      var mid = a.moduleId;
      if (!mid) return;
      counts[mid] = (counts[mid] || 0) + 1;
    });
    return counts;
  }

  function weakestModule() {
    var counts = missCountsByModule();
    var bestId = "";
    var bestN = 0;
    Object.keys(counts).forEach(function (id) {
      if (counts[id] > bestN) {
        bestN = counts[id];
        bestId = id;
      }
    });
    if (!bestId) return null;
    return { moduleId: bestId, count: bestN, label: MODULE_LABELS[bestId] || { en: bestId, az: bestId } };
  }

  function continueLesson(state) {
    state = state || load();
    if (state.lastLessonId && lessonById(state.lastLessonId) && !state.done[state.lastLessonId]) {
      return lessonById(state.lastLessonId);
    }
    for (var i = 0; i < LESSONS.length; i++) {
      if (!state.done[LESSONS[i].id]) return LESSONS[i];
    }
    return LESSONS[LESSONS.length - 1];
  }

  function snapshot() {
    var state = load();
    var doneCount = 0;
    LESSONS.forEach(function (row) {
      if (state.done[row.id]) doneCount += 1;
    });
    var cont = continueLesson(state);
    var weak = weakestModule();
    var misses = missCountsByModule();
    var remaining = Math.max(0, (state.bestDayCorrect || 0) - (state.todayCorrect || 0));
    return {
      state: state,
      doneCount: doneCount,
      total: TOTAL,
      continueLesson: cont,
      weakest: weak,
      misses: misses,
      beatRemaining: remaining,
      showBeat: remaining > 0 && remaining <= 8 && (state.bestDayCorrect || 0) > 0,
    };
  }

  function lessonCardState(id) {
    var snap = snapshot();
    var row = lessonById(id);
    var opened = !!(snap.state.opened[id] || snap.state.done[id]);
    var done = !!snap.state.done[id];
    var isContinue = snap.continueLesson && snap.continueLesson.id === id && !done;
    var status = done ? "done" : isContinue ? "next" : "todo";
    var mid = row ? row.moduleId : "";
    return {
      status: status,
      opened: opened,
      done: done,
      mistakes: mid ? snap.misses[mid] || 0 : 0,
      bar: done ? 100 : opened ? 50 : 0,
    };
  }

  function flameSvg() {
    return (
      '<svg class="bb-habit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M12 3c2 3 3 5 3 8a3 3 0 1 1-6 0c0-2 2-5 3-8z" />' +
      '<path d="M8 14c0 2.2 1.8 5 4 5s4-2.8 4-5" />' +
      "</svg>"
    );
  }

  function checkSvg() {
    return (
      '<svg class="bb-habit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M5 12l5 5L20 7" />' +
      "</svg>"
    );
  }

  function arrowSvg() {
    return (
      '<svg class="bb-habit__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
      '<path d="M5 12h14M13 6l6 6-6 6" />' +
      "</svg>"
    );
  }

  function stripHtml(variant) {
    var snap = snapshot();
    var compact = variant === "compact";
    var streakLabel =
      snap.state.streak > 0
        ? snap.state.streak + t("dayStreak")
        : t("startStreak");
    var bestN = snap.state.best || 0;
    var bestLine = t("best") + ": " + bestN + " " + (bestN === 1 ? t("day") : t("days"));
    var cont = snap.continueLesson;
    var contHref = cont ? "brain-bee-lessons.html?lesson=" + encodeURIComponent(cont.id) : "brain-bee-lessons.html";
    var contKicker = snap.state.lastLessonId ? t("continue") : t("startHere");
    var contTitle = lessonTitle(cont);
    var weak = snap.weakest;
    var weakHref = weak
      ? "practice-mistakes.html?module=" + encodeURIComponent(weak.moduleId)
      : "practice-mistakes.html";
    var weakCount = weak ? weak.count : 0;
    var weakNoun = weakCount === 1 ? t("miss") : t("misses");
    var pct = Math.round((snap.doneCount / TOTAL) * 100);

    var html = '<div class="bb-habit' + (compact ? " bb-habit--compact" : "") + '">';
    html +=
      '<div class="bb-habit__cell">' +
      flameSvg() +
      '<p class="bb-habit__kicker">' +
      esc(t("streakTile")) +
      "</p><p class=\"bb-habit__value\">" +
      esc(streakLabel) +
      '</p><p class="bb-habit__meta">' +
      esc(bestLine) +
      "</p></div>";
    html +=
      '<a class="bb-habit__cell bb-habit__cell--link" href="' +
      esc(contHref) +
      '">' +
      arrowSvg() +
      '<p class="bb-habit__kicker">' +
      esc(contKicker) +
      "</p><p class=\"bb-habit__value\">" +
      esc(contTitle) +
      "</p></a>";
    if (weak) {
      html +=
        '<a class="bb-habit__cell bb-habit__cell--link" href="' +
        esc(weakHref) +
        '">' +
        arrowSvg() +
        '<p class="bb-habit__kicker">' +
        esc(t("weakest")) +
        "</p><p class=\"bb-habit__value\">" +
        esc(pick(weak.label)) +
        '</p><p class="bb-habit__meta">' +
        weakCount +
        " " +
        esc(weakNoun) +
        " · " +
        esc(t("review")) +
        "</p></a>";
    } else {
      html +=
        '<div class="bb-habit__cell"><p class="bb-habit__kicker">' +
        esc(t("weakest")) +
        "</p><p class=\"bb-habit__value bb-habit__value--muted\">" +
        esc(t("noMisses")) +
        "</p></div>";
    }
    html +=
      '<div class="bb-habit__cell"><p class="bb-habit__kicker">' +
      esc(t("curriculum")) +
      "</p><p class=\"bb-habit__value\">" +
      snap.doneCount +
      " " +
      esc(t("ofChapters")) +
      '</p><div class="bb-habit__bar" role="progressbar" aria-valuemin="0" aria-valuemax="34" aria-valuenow="' +
      snap.doneCount +
      '"><span style="width:' +
      pct +
      '%"></span></div></div>';
    html += "</div>";
    return html;
  }

  function mount() {
    document.querySelectorAll("[data-bb-habit]").forEach(function (el) {
      el.innerHTML = stripHtml(el.getAttribute("data-bb-habit") || "full");
    });
    refreshPracticeChrome();
  }

  function beatBannerHtml() {
    var snap = snapshot();
    if (!snap.showBeat) return "";
    return (
      '<p class="bb-habit-nudge">' +
      esc(snap.beatRemaining + " " + t("beatBest")) +
      "</p>"
    );
  }

  function refreshPracticeChrome() {
    var tile = document.getElementById("bb-habit-streak");
    if (tile) {
      var snap = snapshot();
      var n = snap.state.streak || 0;
      tile.innerHTML =
        '<span data-en="Streak" data-az="Silsilə">' +
        esc(t("streakTile")) +
        '</span> <span class="bb-score__n">' +
        n +
        "</span>";
    }
    var slot = document.getElementById("bb-habit-nudge");
    if (slot) slot.innerHTML = beatBannerHtml();
  }

  function cardExtrasHtml(id) {
    var info = lessonCardState(id);
    var bits = "";
    if (info.status === "done") {
      bits += '<span class="bb-lesson-card__badge">' + checkSvg() + " " + esc(t("done")) + "</span>";
    } else if (info.status === "next") {
      bits +=
        '<span class="bb-lesson-card__pill">' +
        esc(info.opened ? t("continuePill") : t("upNext")) +
        "</span>";
      bits +=
        '<span class="bb-lesson-card__mini" aria-hidden="true"><span style="width:' +
        info.bar +
        '%"></span></span>';
    }
    if (info.mistakes) {
      bits +=
        '<span class="bb-lesson-card__miss"><span class="bb-lesson-card__dot"></span>' +
        info.mistakes +
        " " +
        esc(info.mistakes === 1 ? t("missReviewOne") : t("missReview")) +
        "</span>";
    }
    return bits ? '<div class="bb-lesson-card__extras">' + bits + "</div>" : "";
  }

  function cardClass(id, base) {
    var info = lessonCardState(id);
    var cls = base || "atlas-choice-card";
    if (info.status === "done") cls += " is-lesson-done";
    else if (info.status === "next") cls += " is-lesson-next";
    return cls;
  }

  var prevLang = root.__neyronAfterSetLang;
  root.__neyronAfterSetLang = function () {
    if (typeof prevLang === "function") prevLang();
    mount();
  };

  root.BBProgress = {
    LESSONS: LESSONS,
    load: load,
    snapshot: snapshot,
    touchActivity: touchActivity,
    markLessonOpened: markLessonOpened,
    markLessonDone: markLessonDone,
    lessonCardState: lessonCardState,
    cardClass: cardClass,
    cardExtrasHtml: cardExtrasHtml,
    stripHtml: stripHtml,
    beatBannerHtml: beatBannerHtml,
    mount: mount,
    refreshPracticeChrome: refreshPracticeChrome,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})(typeof window !== "undefined" ? window : this);
