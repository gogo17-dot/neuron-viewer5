var BB = (function () {
  var STORE_KEY = "neyron_bb_progress";
  var CLEAR_STREAK = 2;

  // v2 added `s`, a separate map for named-structure drills. They are kept apart
  // from `q` so the multiple-choice counters ("x / N seen", Review missed) keep
  // counting questions only. A v1 store still reads fine: `s` is filled in here.
  function emptyStore() {
    return { v: 2, q: {}, s: {} };
  }

  function readStore() {
    try {
      var raw = window.localStorage.getItem(STORE_KEY);
      if (!raw) return emptyStore();
      var parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || !parsed.q) return emptyStore();
      if (!parsed.s || typeof parsed.s !== "object") parsed.s = {};
      parsed.v = 2;
      return parsed;
    } catch (e) {
      return emptyStore();
    }
  }

  function writeStore(store) {
    try {
      window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
    } catch (e) {
      /* private mode or full quota: practice still works, it just will not persist */
    }
  }

  function statsIn(map, id) {
    var rec = map[id];
    return {
      seen: rec && rec.seen ? rec.seen : 0,
      right: rec && rec.right ? rec.right : 0,
      wrong: rec && rec.wrong ? rec.wrong : 0,
      streak: rec && rec.streak ? rec.streak : 0,
    };
  }

  function recordIn(bucket, id, wasCorrect) {
    var store = readStore();
    var map = store[bucket];
    var rec = map[id] || { seen: 0, right: 0, wrong: 0, streak: 0 };
    rec.seen += 1;
    if (wasCorrect) {
      rec.right += 1;
      rec.streak += 1;
    } else {
      rec.wrong += 1;
      rec.streak = 0;
    }
    map[id] = rec;
    writeStore(store);
  }

  function countSeen(map) {
    var n = 0;
    Object.keys(map).forEach(function (id) {
      if (map[id] && map[id].seen > 0) n += 1;
    });
    return n;
  }

  function statsFor(id) {
    return statsIn(readStore().q, id);
  }

  function record(id, wasCorrect) {
    recordIn("q", id, wasCorrect);
  }

  function seenCount() {
    return countSeen(readStore().q);
  }

  function isMissed(id) {
    var s = statsFor(id);
    return s.wrong > 0 && s.streak < CLEAR_STREAK;
  }

  function missedIds() {
    var q = readStore().q;
    return Object.keys(q).filter(isMissed);
  }

  function structureStats(id) {
    return statsIn(readStore().s, id);
  }

  function recordStructure(id, wasCorrect) {
    recordIn("s", id, wasCorrect);
  }

  function structuresSeenCount(viewer) {
    var s = readStore().s;
    if (!viewer) return countSeen(s);
    var n = 0;
    structuresFor(viewer).forEach(function (item) {
      if (s[item.id] && s[item.id].seen > 0) n += 1;
    });
    return n;
  }

  function isStructureMissed(id) {
    var s = structureStats(id);
    return s.wrong > 0 && s.streak < CLEAR_STREAK;
  }

  function structuresFor(viewer) {
    if (typeof BB_STRUCTURES === "undefined") return [];
    return BB_STRUCTURES.filter(function (s) {
      return s.viewer === viewer;
    });
  }

  function missedStructures(viewer) {
    return structuresFor(viewer).filter(function (s) {
      return isStructureMissed(s.id);
    });
  }

  function reset() {
    try {
      window.localStorage.removeItem(STORE_KEY);
    } catch (e) {
      /* nothing to clear */
    }
  }

  function lang() {
    return document.documentElement.getAttribute("lang") === "az" ? "az" : "en";
  }

  function loc(obj) {
    if (!obj) return "";
    return lang() === "az" ? obj.az || obj.en : obj.en;
  }

  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function shuffle(list) {
    var a = list.slice();
    var i;
    for (i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  // Questions inherited a heavy bias toward answer index 0, so every card gets
  // its own display order and the correct index is resolved through it.
  function makeItem(question) {
    var order = shuffle(
      question.choices.map(function (_, i) {
        return i;
      })
    );
    return {
      q: question,
      order: order,
      correct: order.indexOf(question.answer),
    };
  }

  function deckFrom(questions) {
    return shuffle(questions).map(makeItem);
  }

  function questions() {
    return typeof BB_QUESTIONS === "undefined" ? [] : BB_QUESTIONS;
  }

  function byTopic(topic) {
    if (topic === "all") return questions().slice();
    return questions().filter(function (q) {
      return q.topic === topic;
    });
  }

  function missedQuestions() {
    return questions().filter(function (q) {
      return isMissed(q.id);
    });
  }

  // Typed answers are compared with spelling and accents folded away, so
  // "Dəhliz-ilbiz siniri", "dehliz ilbiz siniri" and "Dehliz  Ilbiz Siniri"
  // all reduce to one string. Azerbaijani letters fold to their ASCII base so a
  // student on an English keyboard is not punished for it.
  var FOLD = {
    ə: "e",
    ı: "i",
    İ: "i",
    ş: "s",
    ç: "c",
    ğ: "g",
    ö: "o",
    ü: "u",
    é: "e",
    æ: "e",
  };

  function fold(s) {
    return String(s == null ? "" : s)
      .toLowerCase()
      .replace(/[əıİşçğöüéæ]/g, function (ch) {
        return FOLD[ch] || ch;
      })
      .replace(/[’'`]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .replace(/^(the|a|an)\s+/, "")
      .trim();
  }

  function answerMatches(input, accepted) {
    var typed = fold(input);
    if (!typed) return false;
    return accepted.some(function (option) {
      return fold(option) === typed;
    });
  }

  function subLabel(sub) {
    return SUBS[sub] || { en: sub, az: sub };
  }

  var SUBS = {
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
  };

  return {
    statsFor: statsFor,
    record: record,
    seenCount: seenCount,
    isMissed: isMissed,
    missedIds: missedIds,
    missedQuestions: missedQuestions,
    reset: reset,
    lang: lang,
    loc: loc,
    esc: esc,
    shuffle: shuffle,
    makeItem: makeItem,
    deckFrom: deckFrom,
    byTopic: byTopic,
    subLabel: subLabel,
    total: function () {
      return questions().length;
    },
    structureStats: structureStats,
    recordStructure: recordStructure,
    structuresSeenCount: structuresSeenCount,
    isStructureMissed: isStructureMissed,
    structuresFor: structuresFor,
    missedStructures: missedStructures,
    fold: fold,
    answerMatches: answerMatches,
  };
})();
