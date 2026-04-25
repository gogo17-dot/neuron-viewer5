/**
 * 2D neural-style particle field (reads --accent from CSS each frame for theme sync).
 */
(function () {
  var pCanvas = document.getElementById("bg-particles");
  if (!pCanvas) return;
  var pCtx = pCanvas.getContext("2d");
  if (!pCtx) return;

  var particles = [];
  var P_COUNT = 60;
  var CONNECT = 110;

  function resizeParticles() {
    pCanvas.width = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }

  function hexToRgb(hex) {
    var h = hex.replace("#", "");
    if (h.length === 3) {
      h = h[0] + h[0] + h[1] + h[1] + h[2] + h[2];
    }
    var n = parseInt(h, 16);
    return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
  }

  function particleColors() {
    var root = getComputedStyle(document.documentElement);
    var accent = root.getPropertyValue("--accent").trim() || "#00ff8c";
    var rgb = hexToRgb(accent);
    var theme = document.documentElement.getAttribute("data-theme");
    var aLine = theme === "day" ? 0.3 : 0.4;
    var aDot = theme === "day" ? 0.45 : 0.35;
    return {
      line: "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + aLine + ")",
      dot: "rgba(" + rgb.r + "," + rgb.g + "," + rgb.b + "," + aDot + ")",
    };
  }

  function initParticles() {
    particles.length = 0;
    for (var i = 0; i < P_COUNT; i++) {
      particles.push({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
      });
    }
  }

  function tickParticles() {
    var cols = particleColors();
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    var i, j, p, q, dx, dy, d;
    for (i = 0; i < P_COUNT; i++) {
      p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > pCanvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > pCanvas.height) p.vy *= -1;
    }
    for (i = 0; i < P_COUNT; i++) {
      for (j = i + 1; j < P_COUNT; j++) {
        p = particles[i];
        q = particles[j];
        dx = p.x - q.x;
        dy = p.y - q.y;
        d = Math.sqrt(dx * dx + dy * dy);
        if (d < CONNECT) {
          pCtx.strokeStyle = cols.line;
          pCtx.lineWidth = 1 - d / CONNECT;
          pCtx.beginPath();
          pCtx.moveTo(p.x, p.y);
          pCtx.lineTo(q.x, q.y);
          pCtx.stroke();
        }
      }
    }
    pCtx.fillStyle = cols.dot;
    for (i = 0; i < P_COUNT; i++) {
      p = particles[i];
      pCtx.beginPath();
      pCtx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
      pCtx.fill();
    }
    requestAnimationFrame(tickParticles);
  }

  resizeParticles();
  initParticles();
  window.addEventListener("resize", function () {
    resizeParticles();
    initParticles();
  });
  tickParticles();
})();
