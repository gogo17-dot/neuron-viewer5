/**
 * NEYRON — basic leaky integrate-and-fire teaching sim.
 * τ dV/dt = -(V - E_L) + R·I ; spike & reset when V ≥ V_th.
 */
(function () {
  "use strict";

  var canvas = document.getElementById("ndyn-plot");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");

  var elV = document.getElementById("ndyn-v");
  var elSpikes = document.getElementById("ndyn-spikes");
  var elStatus = document.getElementById("ndyn-status");
  var elI = document.getElementById("ndyn-i");
  var elIVal = document.getElementById("ndyn-i-val");
  var elTh = document.getElementById("ndyn-th");
  var elThVal = document.getElementById("ndyn-th-val");
  var btnToggle = document.getElementById("ndyn-toggle");
  var btnReset = document.getElementById("ndyn-reset");
  var btnMore = document.getElementById("ndyn-more");
  var detailWrap = document.getElementById("ndyn-detail-wrap");

  var E_L = -70;
  var V_RESET = -70;
  var V_PEAK = 30;
  var TAU_MS = 20;
  var R = 20; // MΩ teaching scale so ~1 nA → ~20 mV drive
  var REFRAC_MS = 3;
  var DT_MS = 0.05;
  var WINDOW_MS = 800;
  var N = Math.floor(WINDOW_MS / DT_MS);

  var V = E_L;
  var Vth = -55;
  var I = 0;
  var refracLeft = 0;
  var spikeCount = 0;
  var spiking = false;
  var spikeDrawLeft = 0;
  var running = true;
  var buf = new Float32Array(N);
  var head = 0;
  for (var i = 0; i < N; i++) buf[i] = E_L;

  var STATUS = {
    en: { resting: "Resting", charging: "Integrating", spike: "Spike!", refrac: "Refractory" },
    az: { resting: "Sakit", charging: "İnteqrasiya", spike: "Spike!", refrac: "Refrakter" },
  };
  var BTN = {
    en: { pause: "Pause", resume: "Resume", more: "Clinical detail", less: "Show less" },
    az: { pause: "Fasilə", resume: "Davam", more: "Klinik təfərrüat", less: "Daha az göstər" },
  };

  function lang() {
    return document.documentElement.lang === "az" ? "az" : "en";
  }

  function setStatus(key) {
    if (!elStatus) return;
    var L = STATUS[lang()] || STATUS.en;
    var text = L[key] || key;
    elStatus.textContent = text;
    elStatus.setAttribute("data-en", STATUS.en[key] || key);
    elStatus.setAttribute("data-az", STATUS.az[key] || key);
    elStatus.dataset.state = key;
  }

  function syncToggleLabel() {
    if (!btnToggle) return;
    var L = BTN[lang()] || BTN.en;
    var t = running ? L.pause : L.resume;
    btnToggle.textContent = t;
    btnToggle.setAttribute("data-en", running ? BTN.en.pause : BTN.en.resume);
    btnToggle.setAttribute("data-az", running ? BTN.az.pause : BTN.az.resume);
  }

  function prettyNeg(v) {
    var fixed = v.toFixed(1);
    if (fixed === "-0.0") fixed = "0.0";
    return fixed.replace("-", "−");
  }

  function stepOnce() {
    if (spikeDrawLeft > 0) {
      spikeDrawLeft -= DT_MS;
      V = V_PEAK;
      spiking = true;
      if (spikeDrawLeft <= 0) {
        V = V_RESET;
        spiking = false;
        refracLeft = REFRAC_MS;
      }
    } else if (refracLeft > 0) {
      refracLeft -= DT_MS;
      V = V_RESET;
      setStatus("refrac");
    } else {
      // τ dV/dt = -(V - E_L) + R I
      var dV = ((-(V - E_L) + R * I) / TAU_MS) * DT_MS;
      V += dV;
      if (V >= Vth) {
        spikeCount += 1;
        spikeDrawLeft = 1.2;
        V = V_PEAK;
        spiking = true;
        setStatus("spike");
      } else if (I > 0.05) {
        setStatus("charging");
      } else {
        setStatus("resting");
      }
    }

    buf[head] = V;
    head = (head + 1) % N;
  }

  function themeColors() {
    var day = document.documentElement.getAttribute("data-theme") === "day";
    return {
      day: day,
      bg: day ? "#fffef4" : "rgba(6, 14, 26, 0.55)",
      grid: day ? "rgba(42, 26, 8, 0.12)" : "rgba(126, 207, 179, 0.12)",
      axis: day ? "rgba(42, 26, 8, 0.45)" : "rgba(200, 240, 224, 0.35)",
      trace: day ? "#e05a10" : "#00ff8c",
      thresh: day ? "rgba(224, 90, 16, 0.55)" : "rgba(0, 255, 140, 0.45)",
      rest: day ? "rgba(42, 26, 8, 0.28)" : "rgba(200, 240, 224, 0.22)",
      spike: day ? "#c93840" : "#7af0e0",
    };
  }

  function resizeCanvas() {
    var wrap = canvas.parentElement;
    if (!wrap) return;
    var w = Math.max(280, Math.floor(wrap.clientWidth - 2));
    var h = Math.max(220, Math.min(420, Math.floor(w * 0.38)));
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function draw() {
    var colors = themeColors();
    var w = canvas.clientWidth;
    var h = canvas.clientHeight;
    if (w < 2 || h < 2) return;

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = colors.bg;
    ctx.fillRect(0, 0, w, h);

    var padL = 44;
    var padR = 12;
    var padT = 16;
    var padB = 28;
    var plotW = w - padL - padR;
    var plotH = h - padT - padB;
    var vmin = -80;
    var vmax = 40;

    function yOf(v) {
      return padT + ((vmax - v) / (vmax - vmin)) * plotH;
    }

    // grid
    ctx.strokeStyle = colors.grid;
    ctx.lineWidth = 1;
    [-70, -55, -40, 0, 30].forEach(function (tick) {
      var y = yOf(tick);
      ctx.beginPath();
      ctx.moveTo(padL, y);
      ctx.lineTo(padL + plotW, y);
      ctx.stroke();
    });

    // rest & threshold guides
    ctx.setLineDash([4, 4]);
    ctx.strokeStyle = colors.rest;
    ctx.beginPath();
    ctx.moveTo(padL, yOf(E_L));
    ctx.lineTo(padL + plotW, yOf(E_L));
    ctx.stroke();
    ctx.strokeStyle = colors.thresh;
    ctx.beginPath();
    ctx.moveTo(padL, yOf(Vth));
    ctx.lineTo(padL + plotW, yOf(Vth));
    ctx.stroke();
    ctx.setLineDash([]);

    // labels
    ctx.fillStyle = colors.axis;
    ctx.font = '11px "Share Tech Mono", ui-monospace, monospace';
    ctx.textAlign = "right";
    ctx.fillText(prettyNeg(E_L), padL - 6, yOf(E_L) + 4);
    ctx.fillText(prettyNeg(Vth), padL - 6, yOf(Vth) + 4);
    ctx.fillText("0", padL - 6, yOf(0) + 4);

    // trace
    ctx.beginPath();
    ctx.strokeStyle = colors.trace;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    for (var i = 0; i < N; i++) {
      var idx = (head + i) % N;
      var x = padL + (i / (N - 1)) * plotW;
      var y = yOf(buf[idx]);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // highlight if currently in drawn spike
    if (spiking) {
      ctx.fillStyle = colors.spike;
      ctx.beginPath();
      ctx.arc(padL + plotW - 2, yOf(V_PEAK), 3.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function updateReadouts() {
    if (elV) elV.textContent = prettyNeg(V);
    if (elSpikes) elSpikes.textContent = String(spikeCount);
    if (elIVal) elIVal.textContent = I.toFixed(2);
    if (elThVal) elThVal.textContent = prettyNeg(Vth);
  }

  var acc = 0;
  var last = performance.now();

  function frame(now) {
    var wall = Math.min(48, now - last);
    last = now;
    if (running) {
      // simulate ~ realtime: 1 wall ms ≈ 1 sim ms (sped slightly for feel)
      acc += wall * 1.15;
      var guard = 0;
      while (acc >= DT_MS && guard < 400) {
        stepOnce();
        acc -= DT_MS;
        guard++;
      }
    }
    updateReadouts();
    draw();
    requestAnimationFrame(frame);
  }

  if (elI) {
    elI.addEventListener("input", function () {
      I = parseFloat(elI.value) || 0;
      updateReadouts();
    });
  }
  if (elTh) {
    elTh.addEventListener("input", function () {
      Vth = parseFloat(elTh.value) || -55;
      updateReadouts();
      draw();
    });
  }
  if (btnToggle) {
    btnToggle.addEventListener("click", function () {
      running = !running;
      syncToggleLabel();
    });
  }
  if (btnReset) {
    btnReset.addEventListener("click", function () {
      V = E_L;
      refracLeft = 0;
      spikeDrawLeft = 0;
      spiking = false;
      spikeCount = 0;
      head = 0;
      for (var i = 0; i < N; i++) buf[i] = E_L;
      setStatus("resting");
      updateReadouts();
      draw();
    });
  }
  if (btnMore && detailWrap) {
    btnMore.addEventListener("click", function () {
      var open = detailWrap.hidden;
      detailWrap.hidden = !open;
      btnMore.setAttribute("aria-expanded", open ? "true" : "false");
      var L = BTN[lang()] || BTN.en;
      btnMore.textContent = open ? L.less : L.more;
      btnMore.setAttribute("data-en", open ? BTN.en.less : BTN.en.more);
      btnMore.setAttribute("data-az", open ? BTN.az.less : BTN.az.more);
    });
  }

  window.__neyronAfterSetLang = function () {
    syncToggleLabel();
    var key = (elStatus && elStatus.dataset.state) || "resting";
    setStatus(key);
    if (btnMore && detailWrap) {
      var open = !detailWrap.hidden;
      var L = BTN[lang()] || BTN.en;
      btnMore.textContent = open ? L.less : L.more;
    }
  };

  window.__neyronApplyViewTheme = function () {
    draw();
  };

  window.addEventListener("resize", function () {
    resizeCanvas();
    draw();
  });

  I = parseFloat(elI && elI.value) || 0;
  Vth = parseFloat(elTh && elTh.value) || -55;
  resizeCanvas();
  setStatus("resting");
  syncToggleLabel();
  updateReadouts();
  requestAnimationFrame(frame);
})();
