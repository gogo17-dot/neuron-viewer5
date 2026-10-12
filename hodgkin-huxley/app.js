/**
 * NEYRON — Hodgkin–Huxley squid giant axon teaching simulator.
 * Forward Euler, dt = 0.01 ms. Classic 1952 parameters, modern sign convention.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("hh-plot");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  // —— Mode-dependent parameters ——
  var MODE = "squid";
  var Cm = 1.0;
  var gNaMax = 120.0;
  var gKMax = 36.0;
  var gL = 0.3;
  var ENa = 50.0;
  var EK = -77.0;
  var EL = -54.387;
  var useQ10 = true;

  var Q10 = 3.0;
  var TREF = 6.3;
  var DT = 0.01; // ms
  var WINDOW_MS = 50;
  var N = Math.round(WINDOW_MS / DT); // 5000
  var STEPS_PER_FRAME_1X = 33; // ≈20 ms sim / s wall at 60 fps

  var V0 = -65.0;
  var M0 = 0.0529;
  var H0 = 0.5961;
  var N0 = 0.3177;

  var PRESETS = {
    squid: {
      Cm: 1.0,
      gNa: 120.0,
      gK: 36.0,
      gL: 0.3,
      ENa: 50.0,
      EK: -77.0,
      EL: -54.387,
      V0: -65.0,
      M0: 0.0529,
      H0: 0.5961,
      N0: 0.3177,
      temp: 6.3,
      useQ10: true,
      amp: 10,
    },
    // Cortical-style Na/K rate set (Pospischil-like teaching parameters)
    mammal: {
      Cm: 1.0,
      gNa: 100.0,
      gK: 80.0,
      gL: 0.1,
      ENa: 50.0,
      EK: -100.0,
      EL: -67.0,
      V0: -66.591,
      M0: 0.01604,
      H0: 0.9955,
      N0: 0.04028,
      temp: 37,
      useQ10: false,
      amp: 15,
    },
  };

  var MODE_COPY = {
    en: {
      squidHint: "Classic Hodgkin–Huxley squid giant axon (1952) at cold reference temperature.",
      mammalHint: "Faster cortical-style Na⁺/K⁺ rate equations — teaching approximation, not a full morphologically detailed cell.",
      squidNote:
        "Model note (Squid): classic Hodgkin–Huxley squid giant axon at 6.3 °C. Switch to Mammalian-like for a faster cortical-style Na⁺/K⁺ rate set — still a single-compartment teaching scaffold.",
      mammalNote:
        "Model note (Mammalian-like): cortical-style Na⁺/K⁺ kinetics (teaching rate set). Rest sits near −67 mV; spikes are narrower/faster than cold squid. Still one compartment — not a reconstructed cortical morphology.",
    },
    az: {
      squidHint: "Klassik Hodgkin–Huxley kalamar nəhəng aksonu (1952), soyuq istinad temperaturunda.",
      mammalHint: "Daha sürətli kortikal üslubda Na⁺/K⁺ sürət tənlikləri — tədris yaxınlaşması, tam morfoloji hüceyrə deyil.",
      squidNote:
        "Model qeydi (Kalamar): klassik Hodgkin–Huxley kalamar nəhəng aksonu, 6.3 °C. Daha sürətli kortikal üslub üçün Məməlilərə oxşar rejimini seçin — yenə tək kompartmentli tədris skeleti.",
      mammalNote:
        "Model qeydi (Məməlilərə oxşar): kortikal üslubda Na⁺/K⁺ kinetikası (tədris sürət dəsti). Sakitlik ~−67 mV; spike-lar soyuq kalamardan dar/sürətlidir. Yenə bir kompartment — rekonstruksiya olunmuş kortikal morfologiya deyil.",
    },
  };

  // —— State ——
  var V = V0;
  var m = M0;
  var h = H0;
  var n = N0;
  var tSim = 0;
  var tempC = 6.3;
  var amp = 10;
  var dur = 1;
  var gap = 5;
  var holdI = 0;
  var holdOn = false;
  var ttx = false;
  var tea = false;
  var showI = false;
  var speed = 1;
  var pulses = []; // {t0, t1, a}

  var bufV = new Float32Array(N);
  var bufM = new Float32Array(N);
  var bufH = new Float32Array(N);
  var bufN = new Float32Array(N);
  var bufINa = new Float32Array(N);
  var bufIK = new Float32Array(N);
  var head = 0;
  for (var i = 0; i < N; i++) {
    bufV[i] = V0;
    bufM[i] = M0;
    bufH[i] = H0;
    bufN[i] = N0;
    bufINa[i] = 0;
    bufIK[i] = 0;
  }

  var elV = document.getElementById("hh-v");
  var elM = document.getElementById("hh-m");
  var elH = document.getElementById("hh-h");
  var elN = document.getElementById("hh-n");
  var elStatus = document.getElementById("hh-status");
  var elAmp = document.getElementById("hh-amp");
  var elAmpVal = document.getElementById("hh-amp-val");
  var elDur = document.getElementById("hh-dur");
  var elDurVal = document.getElementById("hh-dur-val");
  var elGap = document.getElementById("hh-gap");
  var elGapVal = document.getElementById("hh-gap-val");
  var elHold = document.getElementById("hh-hold");
  var elHoldVal = document.getElementById("hh-hold-val");
  var elHoldOn = document.getElementById("hh-hold-on");
  var elTemp = document.getElementById("hh-temp");
  var elTempVal = document.getElementById("hh-temp-val");
  var elPhi = document.getElementById("hh-phi-val");
  var elShowI = document.getElementById("hh-show-i");
  var btnTtx = document.getElementById("hh-ttx");
  var btnTea = document.getElementById("hh-tea");
  var btnInject = document.getElementById("hh-inject");
  var btnPaired = document.getElementById("hh-paired");
  var btnReset = document.getElementById("hh-reset");
  var legIna = document.getElementById("hh-leg-ina");
  var legIk = document.getElementById("hh-leg-ik");

  var STATUS = {
    en: { resting: "Resting", stim: "Stimulus", rising: "Rising", falling: "Falling", ahp: "AHP" },
    az: { resting: "Sakit", stim: "Stimul", rising: "Yüksələn", falling: "Enən", ahp: "AHP" },
  };

  function lang() {
    return document.documentElement.lang === "az" ? "az" : "en";
  }

  function prettyNeg(v, digits) {
    var d = digits == null ? 1 : digits;
    var fixed = v.toFixed(d);
    if (fixed === "-0.0" || fixed === "-0.00") fixed = "0." + "0".repeat(d);
    return fixed.replace("-", "−");
  }

  function setStatus(key) {
    if (!elStatus) return;
    var L = STATUS[lang()] || STATUS.en;
    elStatus.textContent = L[key] || key;
    elStatus.setAttribute("data-en", STATUS.en[key] || key);
    elStatus.setAttribute("data-az", STATUS.az[key] || key);
    elStatus.dataset.state = key;
  }

  function phiOf(T) {
    return Math.pow(Q10, (T - TREF) / 10);
  }

  function ratesSquid(Vv, phi) {
    var am, bm, ah, bh, an, bn;
    if (Math.abs(Vv + 40) < 1e-6) am = 1.0;
    else am = (0.1 * (Vv + 40)) / (1 - Math.exp(-(Vv + 40) / 10));
    bm = 4.0 * Math.exp(-(Vv + 65) / 18);

    ah = 0.07 * Math.exp(-(Vv + 65) / 20);
    bh = 1.0 / (1 + Math.exp(-(Vv + 35) / 10));

    if (Math.abs(Vv + 55) < 1e-6) an = 0.1;
    else an = (0.01 * (Vv + 55)) / (1 - Math.exp(-(Vv + 55) / 10));
    bn = 0.125 * Math.exp(-(Vv + 65) / 80);

    return {
      am: am * phi,
      bm: bm * phi,
      ah: ah * phi,
      bh: bh * phi,
      an: an * phi,
      bn: bn * phi,
    };
  }

  /** Cortical-style teaching rates (Pospischil-like), absolute mV. */
  function ratesMammal(Vv) {
    var am, bm, ah, bh, an, bn;
    if (Math.abs(Vv + 54) < 1e-6) am = 1.28;
    else am = (0.32 * (Vv + 54)) / (1 - Math.exp(-(Vv + 54) / 4));
    if (Math.abs(Vv + 27) < 1e-6) bm = 1.4;
    else bm = (0.28 * (Vv + 27)) / (Math.exp((Vv + 27) / 5) - 1);

    ah = 0.128 * Math.exp(-(Vv + 50) / 18);
    bh = 4.0 / (1 + Math.exp(-(Vv + 27) / 5));

    if (Math.abs(Vv + 52) < 1e-6) an = 0.16;
    else an = (0.032 * (Vv + 52)) / (1 - Math.exp(-(Vv + 52) / 5));
    bn = 0.5 * Math.exp(-(Vv + 57) / 40);

    return { am: am, bm: bm, ah: ah, bh: bh, an: an, bn: bn };
  }

  function ratesNow(Vv) {
    if (MODE === "mammal") return ratesMammal(Vv);
    return ratesSquid(Vv, useQ10 ? phiOf(tempC) : 1);
  }

  function stimAt(t) {
    var I = holdOn ? holdI : 0;
    for (var i = 0; i < pulses.length; i++) {
      var p = pulses[i];
      if (t >= p.t0 && t < p.t1) I += p.a;
    }
    // prune old pulses occasionally
    if (pulses.length > 8) {
      pulses = pulses.filter(function (p) {
        return p.t1 > t - 1;
      });
    }
    return I;
  }

  function schedulePulse(t0, duration, amplitude) {
    pulses.push({ t0: t0, t1: t0 + duration, a: amplitude });
  }

  function stepOnce() {
    var r = ratesNow(V);
    var gNa = ttx ? 0 : gNaMax;
    var gK = tea ? 0 : gKMax;
    var Istim = stimAt(tSim);

    var INa = gNa * m * m * m * h * (V - ENa);
    var IK = gK * n * n * n * n * (V - EK);
    var IL = gL * (V - EL);

    var dV = (Istim - INa - IK - IL) / Cm;
    var dm = r.am * (1 - m) - r.bm * m;
    var dh = r.ah * (1 - h) - r.bh * h;
    var dn = r.an * (1 - n) - r.bn * n;

    V += dV * DT;
    m += dm * DT;
    h += dh * DT;
    n += dn * DT;

    // clamp gates to [0,1] against tiny numerical overshoot
    if (m < 0) m = 0;
    else if (m > 1) m = 1;
    if (h < 0) h = 0;
    else if (h > 1) h = 1;
    if (n < 0) n = 0;
    else if (n > 1) n = 1;

    tSim += DT;

    bufV[head] = V;
    bufM[head] = m;
    bufH[head] = h;
    bufN[head] = n;
    bufINa[head] = INa;
    bufIK[head] = IK;
    head = (head + 1) % N;

    // status heuristic
    if (Istim > 0.5) setStatus("stim");
    else if (V > 0) setStatus("rising");
    else if (V < V0 - 2 && n > 0.35) setStatus("ahp");
    else if (V > V0 + 8 && dV < 0) setStatus("falling");
    else if (Math.abs(V - V0) < 1.5 && Math.abs(m - M0) < 0.03) setStatus("resting");
  }

  function themeColors() {
    var day = document.documentElement.getAttribute("data-theme") === "day";
    return {
      day: day,
      bg: day ? "#fffef4" : "rgba(6, 14, 26, 0.55)",
      grid: day ? "rgba(42, 26, 8, 0.1)" : "rgba(126, 207, 179, 0.1)",
      axis: day ? "rgba(42, 26, 8, 0.5)" : "rgba(200, 240, 224, 0.4)",
      rest: day ? "rgba(42, 26, 8, 0.35)" : "rgba(200, 240, 224, 0.28)",
      zero: day ? "rgba(42, 26, 8, 0.22)" : "rgba(200, 240, 224, 0.18)",
      v: day ? "#e05a10" : "#00ff8c",
      m: day ? "#1a6fd4" : "#5ec8ff",
      h: day ? "#c93840" : "#ff6b7a",
      n: day ? "#7a3fd4" : "#c9a0ff",
      ina: day ? "#1a6fd4" : "#5ec8ff",
      ik: day ? "#7a3fd4" : "#c9a0ff",
      panelBorder: day ? "rgba(42, 26, 8, 0.12)" : "rgba(126, 207, 179, 0.15)",
      label: day ? "rgba(42, 26, 8, 0.55)" : "rgba(200, 240, 224, 0.5)",
    };
  }

  function resizeCanvas() {
    var wrap = canvas.parentElement;
    if (!wrap) return;
    var w = Math.max(280, Math.floor(wrap.clientWidth - 2));
    var panels = showI ? 3 : 2;
    var h = Math.max(320, Math.min(640, Math.floor(w * (panels === 3 ? 0.72 : 0.58))));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawTrace(buf, padL, padT, plotW, plotH, vmin, vmax, color, lineW) {
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = lineW || 2;
    ctx.lineJoin = "round";
    for (var i = 0; i < N; i++) {
      var idx = (head + i) % N;
      var x = padL + (i / (N - 1)) * plotW;
      var y = padT + ((vmax - buf[idx]) / (vmax - vmin)) * plotH;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }

  function drawPanelBox(padL, padT, plotW, plotH, colors) {
    ctx.strokeStyle = colors.panelBorder;
    ctx.lineWidth = 1;
    ctx.strokeRect(padL - 0.5, padT - 0.5, plotW + 1, plotH + 1);
  }

  function drawHLine(padL, padT, plotW, plotH, vmin, vmax, val, color, dash) {
    var y = padT + ((vmax - val) / (vmax - vmin)) * plotH;
    ctx.save();
    if (dash) ctx.setLineDash(dash);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padL, y);
    ctx.lineTo(padL + plotW, y);
    ctx.stroke();
    ctx.restore();
  }

  function draw() {
    var colors = themeColors();
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (w < 2 || h < 2) return;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, w, h);

    var padL = 48;
    var padR = 14;
    var padTop = 18;
    var padBot = 22;
    var gapY = 10;
    var panels = showI ? 3 : 2;
    var plotW = w - padL - padR;
    var usable = h - padTop - padBot - gapY * (panels - 1);
    var hV = Math.floor(usable * (showI ? 0.38 : 0.52));
    var hG = Math.floor(usable * (showI ? 0.34 : 0.48));
    var hI = showI ? usable - hV - hG : 0;

    var y0 = padTop;
    var y1 = y0 + hV + gapY;
    var y2 = y1 + hG + gapY;

    // —— Voltage panel ——
    drawPanelBox(padL, y0, plotW, hV, colors);
    // grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    [-80, -40, 0, 40].forEach(function (tick) {
      var yy = y0 + ((50 - tick) / (50 - -90)) * hV;
      ctx.beginPath();
      ctx.moveTo(padL, yy);
      ctx.lineTo(padL + plotW, yy);
      ctx.stroke();
    });
    drawHLine(padL, y0, plotW, hV, -90, 50, V0, colors.rest, [4, 4]);
    drawHLine(padL, y0, plotW, hV, -90, 50, 0, colors.zero, [2, 4]);
    drawTrace(bufV, padL, y0, plotW, hV, -90, 50, colors.v, 2.25);

    ctx.fillStyle = colors.axis;
    ctx.font = '11px "Share Tech Mono", ui-monospace, monospace';
    ctx.textAlign = "right";
    ctx.fillText(prettyNeg(Math.round(V0), 0), padL - 6, y0 + ((50 - V0) / 140) * hV + 4);
    ctx.fillText("0", padL - 6, y0 + ((50 - 0) / 140) * hV + 4);
    ctx.fillText("+40", padL - 6, y0 + ((50 - 40) / 140) * hV + 4);
    ctx.fillStyle = colors.label;
    ctx.textAlign = "left";
    ctx.fillText("V (mV)", padL + 6, y0 + 12);

    // —— Gating panel ——
    drawPanelBox(padL, y1, plotW, hG, colors);
    ctx.strokeStyle = colors.grid;
    [0.25, 0.5, 0.75].forEach(function (tick) {
      var yy = y1 + ((1 - tick) / 1) * hG;
      ctx.beginPath();
      ctx.moveTo(padL, yy);
      ctx.lineTo(padL + plotW, yy);
      ctx.stroke();
    });
    drawTrace(bufM, padL, y1, plotW, hG, 0, 1, colors.m, 2.4);
    drawTrace(bufH, padL, y1, plotW, hG, 0, 1, colors.h, 2.4);
    drawTrace(bufN, padL, y1, plotW, hG, 0, 1, colors.n, 2.4);

    ctx.fillStyle = colors.axis;
    ctx.textAlign = "right";
    ctx.fillText("1", padL - 6, y1 + 4);
    ctx.fillText("0", padL - 6, y1 + hG);
    ctx.fillStyle = colors.label;
    ctx.textAlign = "left";
    ctx.fillText("m  h  n", padL + 6, y1 + 12);

    // inline legend inside gating panel
    var lx = padL + plotW - 118;
    var ly = y1 + 14;
    [
      [colors.m, "m"],
      [colors.h, "h"],
      [colors.n, "n"],
    ].forEach(function (pair, i) {
      ctx.fillStyle = pair[0];
      ctx.fillRect(lx + i * 38, ly - 6, 12, 3);
      ctx.fillStyle = colors.axis;
      ctx.textAlign = "left";
      ctx.fillText(pair[1], lx + i * 38 + 15, ly);
    });

    // —— Current panel (optional) ——
    if (showI) {
      drawPanelBox(padL, y2, plotW, hI, colors);
      var imin = -800;
      var imax = 800;
      ctx.strokeStyle = colors.grid;
      drawHLine(padL, y2, plotW, hI, imin, imax, 0, colors.zero, [2, 3]);
      drawTrace(bufINa, padL, y2, plotW, hI, imin, imax, colors.ina, 1.8);
      drawTrace(bufIK, padL, y2, plotW, hI, imin, imax, colors.ik, 1.8);
      ctx.fillStyle = colors.label;
      ctx.textAlign = "left";
      ctx.fillText("I (µA/cm²)", padL + 6, y2 + 12);
      ctx.fillStyle = colors.axis;
      ctx.textAlign = "right";
      ctx.fillText("0", padL - 6, y2 + ((imax - 0) / (imax - imin)) * hI + 4);
    }

    // shared time axis label
    ctx.fillStyle = colors.label;
    ctx.textAlign = "right";
    ctx.font = '10px "Share Tech Mono", ui-monospace, monospace';
    ctx.fillText("50 ms →", padL + plotW, h - 6);
  }

  function updateReadouts() {
    if (elV) elV.textContent = prettyNeg(V, 1);
    if (elM) elM.textContent = m.toFixed(2);
    if (elH) elH.textContent = h.toFixed(2);
    if (elN) elN.textContent = n.toFixed(2);
  }

  function syncPhi() {
    if (!elPhi) return;
    elPhi.textContent = useQ10 ? phiOf(tempC).toFixed(2) : "—";
  }

  function syncModeCopy() {
    var L = MODE_COPY[lang()] || MODE_COPY.en;
    var hint = document.getElementById("hh-mode-hint");
    var note = document.getElementById("hh-model-note");
    var tempNote = document.getElementById("hh-temp-mammal-note");
    var tempWrap = document.getElementById("hh-temp-wrap");
    if (MODE === "mammal") {
      if (hint) {
        hint.textContent = L.mammalHint;
        hint.setAttribute("data-en", MODE_COPY.en.mammalHint);
        hint.setAttribute("data-az", MODE_COPY.az.mammalHint);
      }
      if (note) {
        note.textContent = L.mammalNote;
        note.setAttribute("data-en", MODE_COPY.en.mammalNote);
        note.setAttribute("data-az", MODE_COPY.az.mammalNote);
      }
      if (tempWrap) tempWrap.hidden = true;
      if (tempNote) tempNote.hidden = false;
    } else {
      if (hint) {
        hint.textContent = L.squidHint;
        hint.setAttribute("data-en", MODE_COPY.en.squidHint);
        hint.setAttribute("data-az", MODE_COPY.az.squidHint);
      }
      if (note) {
        note.textContent = L.squidNote;
        note.setAttribute("data-en", MODE_COPY.en.squidNote);
        note.setAttribute("data-az", MODE_COPY.az.squidNote);
      }
      if (tempWrap) tempWrap.hidden = false;
      if (tempNote) tempNote.hidden = true;
    }
  }

  function applyPreset(mode) {
    var p = PRESETS[mode] || PRESETS.squid;
    MODE = mode === "mammal" ? "mammal" : "squid";
    Cm = p.Cm;
    gNaMax = p.gNa;
    gKMax = p.gK;
    gL = p.gL;
    ENa = p.ENa;
    EK = p.EK;
    EL = p.EL;
    V0 = p.V0;
    M0 = p.M0;
    H0 = p.H0;
    N0 = p.N0;
    useQ10 = !!p.useQ10;
    tempC = p.temp;
    amp = p.amp;

    if (elAmp) {
      elAmp.value = String(amp);
      if (elAmpVal) elAmpVal.textContent = amp.toFixed(1);
    }
    if (elTemp) {
      elTemp.value = String(MODE === "squid" ? tempC : 6.3);
      if (elTempVal) elTempVal.textContent = MODE === "mammal" ? "37" : tempC.toFixed(1);
    }
    syncPhi();
    syncModeCopy();

    document.querySelectorAll(".hh-model__btn").forEach(function (btn) {
      var on = btn.getAttribute("data-mode") === MODE;
      btn.classList.toggle("is-active", on);
      btn.classList.toggle("hh-btn--ghost", !on);
    });

    resetState();
  }

  function resetState() {
    V = V0;
    m = M0;
    h = H0;
    n = N0;
    tSim = 0;
    pulses = [];
    head = 0;
    for (var i = 0; i < N; i++) {
      bufV[i] = V0;
      bufM[i] = M0;
      bufH[i] = H0;
      bufN[i] = N0;
      bufINa[i] = 0;
      bufIK[i] = 0;
    }
    setStatus("resting");
    updateReadouts();
    draw();
  }

  function frame() {
    var steps = Math.max(1, Math.round(STEPS_PER_FRAME_1X * speed));
    for (var s = 0; s < steps; s++) stepOnce();
    updateReadouts();
    draw();
    requestAnimationFrame(frame);
  }

  // —— UI wiring ——
  function bindSlider(input, label, parse, apply, digits) {
    if (!input) return;
    input.addEventListener("input", function () {
      var v = parse(input.value);
      apply(v);
      if (label) label.textContent = typeof digits === "number" ? v.toFixed(digits) : String(v);
    });
  }

  bindSlider(
    elAmp,
    elAmpVal,
    parseFloat,
    function (v) {
      amp = v;
    },
    1
  );
  bindSlider(
    elDur,
    elDurVal,
    parseFloat,
    function (v) {
      dur = v;
    },
    1
  );
  bindSlider(
    elGap,
    elGapVal,
    parseFloat,
    function (v) {
      gap = v;
    },
    1
  );
  bindSlider(
    elHold,
    elHoldVal,
    parseFloat,
    function (v) {
      holdI = v;
    },
    1
  );
  bindSlider(
    elTemp,
    elTempVal,
    parseFloat,
    function (v) {
      tempC = v;
      syncPhi();
    },
    1
  );

  if (elHoldOn) {
    elHoldOn.addEventListener("change", function () {
      holdOn = !!elHoldOn.checked;
    });
  }
  if (elShowI) {
    elShowI.addEventListener("change", function () {
      showI = !!elShowI.checked;
      if (legIna) {
        legIna.hidden = !showI;
        legIna.classList.toggle("is-hidden", !showI);
      }
      if (legIk) {
        legIk.hidden = !showI;
        legIk.classList.toggle("is-hidden", !showI);
      }
      resizeCanvas();
      draw();
    });
  }

  function setToggle(btn, on) {
    if (!btn) return;
    btn.setAttribute("aria-pressed", on ? "true" : "false");
    btn.classList.toggle("is-active", on);
    btn.classList.toggle("hh-btn--ghost", !on);
  }

  if (btnTtx) {
    btnTtx.addEventListener("click", function () {
      ttx = !ttx;
      setToggle(btnTtx, ttx);
    });
  }
  if (btnTea) {
    btnTea.addEventListener("click", function () {
      tea = !tea;
      setToggle(btnTea, tea);
    });
  }

  if (btnInject) {
    btnInject.addEventListener("click", function () {
      schedulePulse(tSim, dur, amp);
    });
  }
  if (btnPaired) {
    btnPaired.addEventListener("click", function () {
      schedulePulse(tSim, dur, amp);
      schedulePulse(tSim + gap, dur, amp);
    });
  }
  if (btnReset) {
    btnReset.addEventListener("click", resetState);
  }

  document.querySelectorAll(".hh-model__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyPreset(btn.getAttribute("data-mode") || "squid");
    });
  });

  document.querySelectorAll(".hh-speed__btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      speed = parseFloat(btn.getAttribute("data-speed")) || 1;
      document.querySelectorAll(".hh-speed__btn").forEach(function (b) {
        var active = b === btn;
        b.classList.toggle("is-active", active);
        b.classList.toggle("hh-btn--ghost", !active);
      });
    });
  });

  window.__neyronAfterSetLang = function () {
    var key = (elStatus && elStatus.dataset.state) || "resting";
    setStatus(key);
    syncModeCopy();
  };

  window.__neyronApplyViewTheme = function () {
    draw();
  };

  window.addEventListener("resize", function () {
    resizeCanvas();
    draw();
  });

  // init
  dur = parseFloat(elDur && elDur.value) || 1;
  gap = parseFloat(elGap && elGap.value) || 5;
  holdI = parseFloat(elHold && elHold.value) || 0;
  applyPreset("squid");
  setToggle(btnTtx, false);
  setToggle(btnTea, false);
  resizeCanvas();
  requestAnimationFrame(frame);

  // Expose a tiny test hook for smoke checks (no UI)
  window.__hhTest = {
    step: stepOnce,
    reset: resetState,
    applyPreset: applyPreset,
    getState: function () {
      return { V: V, m: m, h: h, n: n, t: tSim, mode: MODE };
    },
    setBlockers: function (ttxOn, teaOn) {
      ttx = !!ttxOn;
      tea = !!teaOn;
      setToggle(btnTtx, ttx);
      setToggle(btnTea, tea);
    },
    pulse: function (a, d) {
      schedulePulse(tSim, d == null ? dur : d, a == null ? amp : a);
    },
    runMs: function (ms) {
      var steps = Math.round(ms / DT);
      for (var i = 0; i < steps; i++) stepOnce();
    },
  };
})();
