/*
 * AXON guided tour — step-by-step help bubbles for the harder pages.
 * Use: <script src="tour.js?v=1" data-tour="hh" defer></script>
 * The tour opens once on a visitor’s first visit; the “Guide” button replays it.
 * Steps whose element is missing or hidden are skipped automatically.
 */
(function () {
  "use strict";

  var T = {
    hh: [
      { t: ["A neuron you can test", "Sınaya biləcəyin neyron"],
        x: ["This is a working model of one neuron. You give it a small electric push and watch it fire an action potential — the signal neurons use to talk to each other. This short guide shows what each part does.",
            "Bu, bir neyronun işləyən modelidir. Ona kiçik elektrik təkani verirsən və onun fəaliyyət potensialı yaratmasını izləyirsən — neyronların bir-biri ilə danışmaq üçün istifadə etdiyi siqnal. Bu qısa bələdçi hər hissənin nə etdiyini göstərir."] },
      { el: "#hh-plot",
        t: ["The graph", "Qrafik"],
        x: ["Top panel: the voltage across the membrane (V). Bottom panel: the “gates” of the ion channels — m (sodium gate that opens fast), h (sodium gate that closes) and n (potassium gate that opens slowly). Time runs from left to right.",
            "Üst panel: membrandakı gərginlik (V). Alt panel: ion kanallarının “qapıları” — m (sürətlə açılan natrium qapısı), h (bağlanan natrium qapısı) və n (yavaş açılan kalium qapısı). Zaman soldan sağa axır."] },
      { el: ".hh-stage__meta",
        t: ["Live numbers", "Canlı rəqəmlər"],
        x: ["The current values of V, m, h and n, and whether the neuron is resting or firing right now.",
            "V, m, h və n-in hazırkı qiymətləri və neyronun indi sakit olduğu, yoxsa siqnal verdiyi."] },
      { el: "#hh-inject",
        t: ["Give it a push", "Təkan ver"],
        x: ["Press Inject to send one short pulse of current. With the default settings the neuron fires one spike — watch V shoot up and fall back, and the gates move in the bottom panel.",
            "Qısa cərəyan impulsu göndərmək üçün “Ver” düyməsini bas. Standart ayarlarla neyron bir dəfə siqnal verir — V-nin sürətlə qalxıb enməsinə və alt paneldə qapıların hərəkətinə bax."] },
      { el: "#hh-amp", up: 1,
        t: ["How strong, how long", "Nə qədər güclü, nə qədər uzun"],
        x: ["Amplitude sets how strong the push is, Duration how long it lasts. Make it too weak and nothing happens — the neuron only fires once it passes its threshold. Try lowering it step by step.",
            "Amplituda təkanın gücünü, Müddət isə nə qədər davam etdiyini təyin edir. Çox zəif etsən heç nə baş vermir — neyron yalnız həddini keçəndə siqnal verir. Onu addım-addım azaltmağı sına."] },
      { el: "#hh-paired",
        t: ["Two pushes in a row", "Ardıcıl iki təkan"],
        x: ["Paired pulse sends two pushes, separated by the Pair interval. When they come too close, the second spike fails: the sodium gate h has not recovered yet. This is the refractory period.",
            "Cüt impuls “Cüt interval” qədər aralı iki təkan göndərir. Onlar çox yaxın olanda ikinci siqnal alınmır: natrium qapısı h hələ bərpa olunmayıb. Bu, refrakter dövrdür."] },
      { el: "#hh-ttx", up: 1,
        t: ["Block the channels", "Kanalları blokla"],
        x: ["TTX (a puffer-fish toxin) blocks sodium channels, so no spike can start. TEA blocks potassium channels, so the voltage comes back down much more slowly. Turn one on, press Inject and compare.",
            "TTX (kirpi balığı zəhəri) natrium kanallarını bloklayır, ona görə siqnal başlaya bilmir. TEA kalium kanallarını bloklayır, ona görə gərginlik daha yavaş enir. Birini aç, “Ver” bas və müqayisə et."] },
      { el: ".hh-model",
        t: ["Which neuron?", "Hansı neyron?"],
        x: ["Squid axon uses the original 1952 Hodgkin–Huxley equations from the squid’s giant nerve fibre. Mammalian-like uses faster settings, closer to neurons in our own cortex.",
            "Kalamar aksonu kalamarın nəhəng sinir lifindən alınmış orijinal 1952 Hodgkin–Huxley tənliklərini istifadə edir. Məməlilərə oxşar rejim bizim beyin qabığımızdakı neyronlara daha yaxın, daha sürətli ayarlardır."] },
      { el: "#hh-temp-wrap",
        t: ["Temperature", "Temperatur"],
        x: ["Warmer channels open and close faster, so the spike gets shorter. The squid lives in cold water — try warming it up.",
            "İsti olanda kanallar daha tez açılıb-bağlanır, ona görə siqnal qısalır. Kalamar soyuq suda yaşayır — onu qızdırmağı sına."] },
      { el: ".hh-prose",
        t: ["Why it looks like that", "Niyə belə görünür"],
        x: ["Below the simulator, this section explains each phase of the spike in plain words. Read it after you have played with the buttons. That’s it — enjoy experimenting!",
            "Simulyatorun altında bu bölmə siqnalın hər mərhələsini sadə dillə izah edir. Düymələrlə oynadıqdan sonra oxu. Hamısı budur — təcrübələrdən zövq al!"] },
    ],

    lif: [
      { t: ["The simplest spiking neuron", "Ən sadə siqnal verən neyron"],
        x: ["This model treats a neuron like a leaky bucket: current fills it up, charge slowly leaks out, and when the level reaches a threshold the neuron fires and resets. Here is how to use it.",
            "Bu model neyronu deşik vedrə kimi təsvir edir: cərəyan onu doldurur, yük yavaş-yavaş axıb gedir, səviyyə həddə çatanda isə neyron siqnal verib sıfırlanır. Ondan necə istifadə edəcəyin budur."] },
      { el: "#ndyn-plot",
        t: ["The graph", "Qrafik"],
        x: ["The membrane voltage over time. Each time it reaches the threshold you see a spike, then it drops back and starts climbing again.",
            "Zamanla membran gərginliyi. Hər dəfə həddə çatanda siqnal görürsən, sonra gərginlik düşür və yenidən qalxmağa başlayır."] },
      { el: "#ndyn-i",
        t: ["Injected current", "Verilən cərəyan"],
        x: ["Drag this to the right. Small currents only nudge the voltage up; a bigger current pushes it over the threshold and the neuron starts firing — and the stronger the current, the faster it fires.",
            "Bunu sağa çək. Kiçik cərəyan gərginliyi bir az qaldırır; daha böyük cərəyan onu həddən keçirir və neyron siqnal verməyə başlayır — cərəyan nə qədər güclüdürsə, bir o qədər tez-tez."] },
      { el: "#ndyn-th",
        t: ["Threshold", "Hədd"],
        x: ["The voltage at which the neuron fires. A lower threshold makes it fire more easily.",
            "Neyronun siqnal verdiyi gərginlik. Hədd aşağı olanda neyron daha asan siqnal verir."] },
      { el: "#ndyn-spikes",
        t: ["Spike counter", "Siqnal sayğacı"],
        x: ["Counts how many times the neuron has fired.", "Neyronun neçə dəfə siqnal verdiyini sayır."] },
      { el: "#ndyn-toggle",
        t: ["Pause and reset", "Fasilə və sıfırlama"],
        x: ["Pause freezes the graph so you can look closely; Reset starts again from rest.",
            "Fasilə qrafiki dondurur ki, diqqətlə baxasan; Sıfırla sakit vəziyyətdən yenidən başladır."] },
      { el: "#ndyn-overview",
        t: ["What you are seeing", "Nə görürsən"],
        x: ["A short explanation of the model. When you are ready for real ion channels, open the Neuron simulator. Have fun!",
            "Modelin qısa izahı. Əsl ion kanallarına hazır olanda Neyron simulyatorunu aç. Uğurlar!"] },
    ],

    scans: [
      { t: ["Real brain scans", "Əsl beyin skanları"],
        x: ["Real MRI and CT scans of the human brain that you can move through slice by slice, with an optional coloured atlas on top. Here is how it works.",
            "İnsan beyninin əsl MRT və KT skanları — onları kəsik-kəsik vərəqləyə, üstünə rəngli atlas qoya bilərsən. Necə işlədiyi budur."] },
      { el: "#row-scan",
        t: ["Choose a scan", "Skan seç"],
        x: ["T1, T2, FLAIR, CT, angiography and more: each type shows the brain’s tissues and blood vessels in a different way. “More” opens extra scans.",
            "T1, T2, FLAIR, KT, angioqrafiya və s.: hər növ beyin toxumalarını və damarlarını fərqli göstərir. “Daha çox” əlavə skanları açır."] },
      { el: "#row-atlas",
        t: ["Add an atlas", "Atlas əlavə et"],
        x: ["An atlas colours in the brain regions on top of the scan, so you can see where each structure is.",
            "Atlas beyin nahiyələrini skanın üstündə rəngləyir ki, hər strukturun harada olduğunu görəsən."] },
      { el: "#opacity-wrap",
        t: ["Atlas opacity", "Atlasın şəffaflığı"],
        x: ["Make the colours stronger or fainter to see the scan underneath.",
            "Altındakı skanı görmək üçün rəngləri gücləndir və ya zəiflət."] },
      { el: "#row-view",
        t: ["Change the view", "Görünüşü dəyiş"],
        x: ["Axial looks from above, coronal from the front, sagittal from the side. Multiplanar shows all three at once, and 3D shows a volume.",
            "Aksial yuxarıdan, koronal öndən, sagittal yandan baxır. Multiplanar üçünü birdən, 3D isə həcmi göstərir."] },
      { el: "#gl",
        t: ["Click on the brain", "Beynə toxun"],
        x: ["Click or tap anywhere on the scan to move the crosshair there. With an atlas on, the name of the region under the crosshair appears below. Explore!",
            "Nişangahı ora aparmaq üçün skanın istənilən yerinə toxun. Atlas açıqdırsa, nişangahın altındakı nahiyənin adı aşağıda görünür. Kəşf et!"] },
    ],

    cortex: [
      { t: ["The 3D cerebral cortex", "3D beyin qabığı"],
        x: ["A 3D model of the brain’s surface and the structures beneath it. A few quick tips to get around.",
            "Beyin səthinin və altındakı strukturların 3D modeli. Rahat istifadə üçün bir neçə qısa məsləhət."] },
      { el: "#scene",
        t: ["Turn and zoom", "Fırlat və böyüt"],
        x: ["Drag to rotate the brain. Scroll or pinch to zoom. Tap any part to see its name and what it does.",
            "Beyni fırlatmaq üçün sürüşdür. Böyütmək üçün təkərlə və ya iki barmaqla. Adını və funksiyasını görmək üçün istənilən hissəyə toxun."] },
      { el: "#structure-browser-toggle",
        t: ["Find a structure", "Struktur tap"],
        x: ["Open the list to search for a structure by name and jump straight to it.",
            "Strukturu adına görə axtarmaq və birbaşa ona keçmək üçün siyahını aç."] },
      { el: "#explode-control",
        t: ["Isolate", "Ayır"],
        x: ["Slide this to pull the layers apart and see what is hidden inside.",
            "İçəridə gizlənəni görmək üçün qatları bir-birindən aralamaq üçün bunu sürüşdür."] },
      { el: "#reset-view",
        t: ["Reset the view", "Görünüşü sıfırla"],
        x: ["Lost? This puts the brain back to the starting position. When you open a structure, “View on MRI” shows it on a real scan. Enjoy exploring!",
            "Azdın? Bu, beyni başlanğıc vəziyyətinə qaytarır. Bir struktur açanda “MRT-də bax” onu əsl skanda göstərir. Kəşfdən zövq al!"] },
    ],

    synapse: [
      { t: ["Inside a synapse", "Sinapsın içində"],
        x: ["A synapse is the tiny gap where one neuron passes its message to the next. This 3D model lets you set one off and watch it work.",
            "Sinaps bir neyronun mesajını növbətiyə ötürdüyü kiçik boşluqdur. Bu 3D model onu işə salıb necə işlədiyini izləməyə imkan verir."] },
      { el: "#canvas-container",
        t: ["Look around", "Ətrafa bax"],
        x: ["Drag to rotate and zoom. Tap any part — vesicles, receptors, channels — to read what it does.",
            "Fırlatmaq və böyütmək üçün sürüşdür. Nə iş gördüyünü oxumaq üçün istənilən hissəyə — veziküllərə, reseptorlara, kanallara — toxun."] },
      { el: "#btn-fire",
        t: ["Activate the synapse", "Sinapsı aktivləşdir"],
        x: ["Press to send a signal: watch the vesicles release neurotransmitter into the gap and the receptors on the other side respond.",
            "Siqnal göndərmək üçün bas: veziküllərin boşluğa neyromediator buraxmasına və qarşı tərəfdəki reseptorların cavab verməsinə bax."] },
      { el: "#auto-signal",
        t: ["Automatic", "Avtomatik"],
        x: ["Tick “auto” to keep firing again and again on its own.", "Siqnalın özü-özünə təkrarlanması üçün “avto”nu işarələ."] },
      { el: "#btn-synapse-help",
        t: ["More information", "Ətraflı məlumat"],
        x: ["Info explains step by step what happens when the synapse is activated. Enjoy!",
            "“Məlumat” sinaps aktivləşəndə nə baş verdiyini addım-addım izah edir. Zövq al!"] },
    ],
  };

  var UI = {
    next: ["Next", "Növbəti"],
    back: ["Back", "Geri"],
    done: ["OK, got it", "Oldu, başa düşdüm"],
    skip: ["Skip", "Keç"],
    guide: ["Guide", "Bələdçi"],
    step: ["{i} of {n}", "{i} / {n}"],
  };

  var me = document.currentScript;
  var name = me && me.getAttribute("data-tour");
  var raw = T[name];
  if (!raw) return;
  var KEY = "axon_tour_" + name;

  function L() { return document.documentElement.lang === "az" ? 1 : 0; }
  function u(k) { return UI[k][L()]; }
  function seen() { try { return localStorage.getItem(KEY) === "1"; } catch (e) { return true; } }
  function markSeen() { try { localStorage.setItem(KEY, "1"); } catch (e) {} }

  var css =
    ".ax-tour-btn{position:fixed;right:14px;top:72px;z-index:900;display:inline-flex;align-items:center;gap:.4rem;padding:.5rem .85rem;border:1px solid var(--accent,#00ff8c);border-radius:999px;background:var(--card-bg,#06141c);color:var(--accent,#00ff8c);font:600 .8rem Inter,system-ui,sans-serif;cursor:pointer;box-shadow:0 6px 20px rgba(0,0,0,.35)}" +
    ".ax-tour-btn b{display:grid;place-items:center;width:1.2rem;height:1.2rem;border-radius:50%;background:var(--accent,#00ff8c);color:#02100a;font-size:.75rem}" +
    ".ax-tour{position:fixed;inset:0;z-index:2000}" +
    ".ax-tour__shade{position:fixed;inset:0;background:rgba(2,10,16,.72)}" +
    ".ax-tour__hole{position:fixed;border-radius:12px;box-shadow:0 0 0 200vmax rgba(2,10,16,.72);outline:2px solid var(--accent,#00ff8c);outline-offset:2px;transition:all .3s ease;pointer-events:none}" +
    ".ax-tour__box{position:fixed;width:min(360px,calc(100vw - 24px));box-sizing:border-box;padding:1rem 1.1rem .9rem;border:1px solid var(--accent,#00ff8c);border-radius:14px;background:var(--card-bg,#06141c);color:var(--text,#e8fff5);box-shadow:0 18px 50px rgba(0,0,0,.5);font-family:Inter,system-ui,sans-serif;transition:top .3s ease,left .3s ease}" +
    "html[data-theme=day] .ax-tour__box{background:#fffaf2}" +
    ".ax-tour__n{margin:0 0 .25rem;font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:var(--accent,#00ff8c)}" +
    ".ax-tour__t{margin:0 0 .4rem;font-size:1.05rem;font-weight:700}" +
    ".ax-tour__x{margin:0;font-size:.9rem;line-height:1.5;color:var(--text,#e8fff5)}" +
    ".ax-tour__bar{display:flex;align-items:center;gap:.5rem;margin-top:.9rem}" +
    ".ax-tour__bar button{font:600 .82rem Inter,system-ui,sans-serif;border-radius:999px;padding:.45rem .9rem;cursor:pointer}" +
    ".ax-tour__skip{margin-right:auto;border:0;background:none;color:var(--text-muted,#8aa)}" +
    ".ax-tour__back{border:1px solid var(--border,rgba(255,255,255,.2));background:none;color:var(--text,#e8fff5)}" +
    ".ax-tour__next{border:0;background:var(--accent,#00ff8c);color:#02100a}" +
    ".ax-tour__dots{display:flex;gap:4px;margin-top:.7rem}.ax-tour__dots i{width:6px;height:6px;border-radius:50%;background:var(--border,rgba(255,255,255,.25))}.ax-tour__dots i.on{background:var(--accent,#00ff8c)}" +
    "@media (max-width:640px){.ax-tour-btn{right:10px;top:66px;padding:.35rem}.ax-tour-btn span{display:none}.ax-tour-btn b{width:1.5rem;height:1.5rem;font-size:.9rem}}" +
    "@media (prefers-reduced-motion:reduce){.ax-tour__hole,.ax-tour__box{transition:none}}";

  var root, hole, box, steps, i, raf, hidden = [];

  function find(s) {
    var el = s.el && document.querySelector(s.el);
    for (var k = 0; el && k < (s.up || 0); k++) el = el.parentElement;
    return el;
  }
  function visible(el) {
    if (!el) return false;
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden";
  }
  function buildSteps() {
    return raw.filter(function (s) { return !s.el || visible(find(s)); });
  }

  function start() {
    steps = buildSteps();
    if (!steps.length) return;
    i = 0;
    root = document.createElement("div");
    root.className = "ax-tour";
    root.setAttribute("role", "dialog");
    root.setAttribute("aria-modal", "true");
    root.setAttribute("aria-label", u("guide"));
    root.innerHTML = '<div class="ax-tour__shade"></div><div class="ax-tour__hole" hidden></div><div class="ax-tour__box" aria-live="polite"></div>';
    document.body.appendChild(root);
    hole = root.querySelector(".ax-tour__hole");
    box = root.querySelector(".ax-tour__box");
    root.querySelector(".ax-tour__shade").addEventListener("click", function () {});
    document.addEventListener("keydown", onKey, true);
    hidden = [].slice.call(document.querySelectorAll("#viewer-tip,.viewer-tip")).filter(function (e) { return e.style.display !== "none"; });
    hidden.forEach(function (e) { e.style.display = "none"; });
    show();
  }

  function finish() {
    markSeen();
    cancelAnimationFrame(raf);
    document.removeEventListener("keydown", onKey, true);
    if (root) root.remove();
    root = null;
    hidden.forEach(function (e) { e.style.display = ""; });
    hidden = [];
  }

  function onKey(e) {
    if (!root) return;
    if (e.key === "Escape") { e.preventDefault(); finish(); }
    else if (e.key === "ArrowRight" || e.key === "Enter") { e.preventDefault(); go(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
  }

  function go(d) {
    if (i + d >= steps.length) { finish(); return; }
    if (i + d < 0) return;
    i += d;
    show();
  }

  function show() {
    var s = steps[i], l = L(), last = i === steps.length - 1;
    var dots = steps.map(function (_, k) { return "<i" + (k === i ? ' class="on"' : "") + "></i>"; }).join("");
    box.innerHTML =
      '<p class="ax-tour__n">' + u("step").replace("{i}", i + 1).replace("{n}", steps.length) + "</p>" +
      '<p class="ax-tour__t"></p><p class="ax-tour__x"></p>' +
      '<div class="ax-tour__bar">' +
      (last ? "" : '<button type="button" class="ax-tour__skip">' + u("skip") + "</button>") +
      (i > 0 ? '<button type="button" class="ax-tour__back">' + u("back") + "</button>" : "") +
      '<button type="button" class="ax-tour__next">' + (last ? u("done") : u("next") + " →") + "</button></div>" +
      '<div class="ax-tour__dots">' + dots + "</div>";
    box.querySelector(".ax-tour__t").textContent = s.t[l];
    box.querySelector(".ax-tour__x").textContent = s.x[l];
    if (last) box.querySelector(".ax-tour__bar").style.justifyContent = "flex-end";
    var sk = box.querySelector(".ax-tour__skip"); if (sk) sk.onclick = finish;
    var bk = box.querySelector(".ax-tour__back"); if (bk) bk.onclick = function () { go(-1); };
    var nx = box.querySelector(".ax-tour__next"); nx.onclick = function () { go(1); };
    setTimeout(function () { try { nx.focus({ preventScroll: true }); } catch (e) {} }, 0);

    var el = find(s);
    root.querySelector(".ax-tour__shade").style.display = el ? "none" : "block";
    hole.hidden = !el;
    if (el) {
      var r = el.getBoundingClientRect();
      if (r.top < 70 || r.bottom > innerHeight - 20) el.scrollIntoView({ block: "center", behavior: "smooth" });
    }
    cancelAnimationFrame(raf);
    (function track() { place(el); raf = requestAnimationFrame(track); })();
  }

  function place(el) {
    var bw = box.offsetWidth, bh = box.offsetHeight, W = innerWidth, H = innerHeight, gap = 12;
    if (!el) {
      box.style.left = Math.max(12, (W - bw) / 2) + "px";
      box.style.top = Math.max(12, (H - bh) / 2) + "px";
      return;
    }
    var r = el.getBoundingClientRect(), pad = 6;
    var top = Math.max(4, r.top - pad), left = Math.max(4, r.left - pad);
    var bottom = Math.min(H - 4, r.bottom + pad), right = Math.min(W - 4, r.right + pad);
    hole.style.top = top + "px"; hole.style.left = left + "px";
    hole.style.width = Math.max(0, right - left) + "px"; hole.style.height = Math.max(0, bottom - top) + "px";
    var y;
    if (bottom + gap + bh < H - 8) y = bottom + gap;
    else if (top - gap - bh > 8) y = top - gap - bh;
    else y = H - bh - 12; /* big element: sit at the bottom of the screen over it */
    var x = Math.min(Math.max(12, r.left + r.width / 2 - bw / 2), W - bw - 12);
    box.style.top = y + "px"; box.style.left = x + "px";
  }

  function addButton() {
    var b = document.createElement("button");
    b.type = "button";
    b.className = "ax-tour-btn";
    b.innerHTML = "<b>?</b><span></span>";
    var label = function () { b.querySelector("span").textContent = u("guide"); b.setAttribute("aria-label", u("guide")); };
    label();
    b.addEventListener("click", function () { if (!root) start(); });
    document.body.appendChild(b);
    new MutationObserver(function () { label(); if (root) show(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["lang"] });
  }

  function init() {
    var st = document.createElement("style");
    st.textContent = css;
    document.head.appendChild(st);
    addButton();
    if (!seen()) setTimeout(function () { if (!root) start(); }, 2000);
  }

  window.AxonTour = { start: function () { if (!root) start(); } };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
