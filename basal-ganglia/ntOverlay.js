/**
 * Neurotransmitter pathway overlay for the basal ganglia viewer.
 *
 * Lights the real meshes a pathway uses (substantia nigra, striatum, locus
 * coeruleus), puts dashed markers on nuclei that are not modelled (VTA, raphe,
 * arcuate, nucleus basalis…), and draws schematic arrows with travelling
 * pulses from source to target. Anchor points are computed from the loaded
 * mesh bounding boxes, so they follow the model if its centring changes.
 */
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { NT_SYSTEMS, NT_PATHWAYS, NT_ANCHOR_LABELS, NT_UI } from './ntPathwaysData.js';

const MESH_ANCHORS = {
  SN: 'Substantia_nigra',
  LC: 'Locus_coeruleus',
  CAUDATE: 'Caudate_nucleus',
  PUTAMEN: 'Putamen',
};

const VIEW_DIR = new THREE.Vector3(1, 0.32, 0.3).normalize();

function lang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

function systemById(id) {
  return NT_SYSTEMS.find((s) => s.id === id);
}

export class NTOverlay {
  /**
   * @param {import('./BasalGangliaScene.js').BasalGangliaScene} scene
   * @param {{ host: HTMLElement, onShowInfo: (payload) => void, onHideInfo: () => void }} opts
   */
  constructor(scene, { host, onShowInfo, onHideInfo }) {
    this.s = scene;
    this.host = host;
    this.onShowInfo = onShowInfo;
    this.onHideInfo = onHideInfo;
    this.activeId = null;
    this.anchors = null;
    this.group = new THREE.Group();
    this.group.name = 'ntOverlay';
    this.s.scene.add(this.group);
    this.pulses = [];
    this.tween = null;
    this.clock = new THREE.Clock();

    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.domElement.className = 'nt-labels';
    host.appendChild(this.labelRenderer.domElement);
    this.resize();
    window.addEventListener('resize', () => this.resize());

    this.buildPanel();
    this.s.frameHooks.push(() => this.tick());
  }

  /* ---------- anchors ---------- */

  box(key) {
    const entry = this.s.structures.get(key);
    if (!entry) return null;
    const b = new THREE.Box3().setFromObject(entry.root, true);
    return b.isEmpty() ? null : b;
  }

  /** Returns { id: { points: Vector3[], mesh?: string, virtual: boolean } } */
  computeAnchors() {
    const V = (x, y, z) => new THREE.Vector3(x, y, z);
    const sn = this.box('Substantia_nigra');
    const lc = this.box('Locus_coeruleus');
    const cau = this.box('Caudate_nucleus');
    const put = this.box('Putamen');
    const gp = this.box('Globus_pallidus');
    const stn = this.box('Subthalamic_nucleus');
    const pag = this.box('Periaqueductal_grey');
    if (!sn || !cau || !put) return null;

    const c = (b) => b.getCenter(new THREE.Vector3());
    const sz = (b) => b.getSize(new THREE.Vector3());
    const mid = c(cau).x;
    const snC = c(sn);
    const snS = sz(sn);
    const cauC = c(cau);
    const putC = c(put);
    const putS = sz(put);
    const lcC = lc ? c(lc) : V(mid, snC.y - 0.02, snC.z + 0.02);
    const lcS = lc ? sz(lc) : V(0.016, 0.005, 0.016);
    const gpC = gp ? c(gp) : putC.clone();
    const gpS = gp ? sz(gp) : putS.clone();
    const stnC = stn ? c(stn) : snC.clone().add(V(0, 0.004, 0));
    const pagC = pag ? c(pag) : snC.clone().add(V(0, -0.012, 0));
    const side = (p, dx) => [V(mid - dx, p.y, p.z), V(mid + dx, p.y, p.z)];    // Anterior = −z in this atlas (striatum sits at lower z than the midbrain).
    const front = cau.min.z;
    const top = cau.max.y;

    const arc = V(mid, stn ? stn.min.y - 0.003 : snC.y - 0.006, sn.min.z - 0.009);

    return {
      mid,
      SN: { points: side(snC, snS.x * 0.3), mesh: MESH_ANCHORS.SN },
      LC: { points: side(lcC, lcS.x * 0.3), mesh: MESH_ANCHORS.LC },
      CAUDATE: { points: side(V(0, cauC.y + 0.006, front + 0.016), sz(cau).x * 0.2), mesh: MESH_ANCHORS.CAUDATE },
      PUTAMEN: { points: side(putC, putS.x * 0.38), mesh: MESH_ANCHORS.PUTAMEN },
      VTA: { points: side(V(0, snC.y - 0.002, snC.z - 0.002), 0.0035), virtual: true },
      ARC: { points: [arc], virtual: true },
      PIT: { points: [V(mid, arc.y - 0.013, arc.z - 0.004)], virtual: true },
      RAPHE: { points: [V(mid, pagC.y - 0.006, pagC.z + 0.001)], virtual: true },
      NBM: { points: side(V(0, gp ? gp.min.y - 0.003 : putC.y - 0.012, gpC.z), gpS.x * 0.3), virtual: true },
      SEPTUM: { points: [V(mid, cauC.y + 0.002, front + 0.012)], virtual: true },
      NAC: { points: side(V(0, put.min.y - 0.001, front + 0.01), 0.0095), virtual: true },
      AMYG: { points: side(V(0, put.min.y - 0.01, cauC.z - 0.006), putS.x * 0.4), virtual: true },
      HIPPO: { points: side(V(0, put.min.y - 0.012, snC.z + 0.004), putS.x * 0.42), virtual: true },
      THAL: { points: side(V(0, stnC.y + 0.013, stnC.z + 0.002), 0.009), virtual: true },
      HYPO: { points: [V(mid, arc.y + 0.004, arc.z + 0.001)], virtual: true },
      PFC: { points: side(V(0, top + 0.02, front - 0.03), 0.014), virtual: true },
      CORTEX: {
        points: [
          V(mid - 0.045, top + 0.02, cauC.z - 0.018),
          V(mid + 0.045, top + 0.02, cauC.z + 0.016),
          V(mid, top + 0.035, front - 0.01),
          V(mid, top + 0.03, snC.z + 0.03),
        ],
        virtual: true,
        fan: true,
      },
      CEREB: { points: [V(mid, lcC.y - 0.008, lcC.z + 0.028)], virtual: true },
      SPINAL: { points: [V(mid, lcC.y - 0.055, lcC.z - 0.004)], virtual: true },
    };
  }

  /* ---------- drawing ---------- */

  clearDrawing() {
    for (const child of [...this.group.children]) {
      child.traverse((o) => {
        if (o.isCSS2DObject) o.element.remove();
        o.geometry?.dispose();
        o.material?.dispose?.();
      });
      this.group.remove(child);
    }
    this.pulses = [];
  }

  colorFor(pathway) {
    const sys = systemById(pathway.system);
    return new THREE.Color(sys.color[this.s.theme] ?? sys.color.dark);
  }

  addLabel(id, point, color, { virtual, isSource }) {
    const el = document.createElement('div');
    el.className = `nt-label${virtual ? ' nt-label--virtual' : ''}${isSource ? ' nt-label--source' : ''}`;
    el.style.setProperty('--nt-color', `#${color.getHexString()}`);
    const dot = document.createElement('span');
    dot.className = 'nt-label__dot';
    const text = document.createElement('span');
    text.className = 'nt-label__text';
    text.dataset.anchor = id;
    text.textContent = NT_ANCHOR_LABELS[id]?.[lang()] ?? id;
    el.append(dot, text);
    const obj = new CSS2DObject(el);
    obj.position.copy(point);
    this.group.add(obj);
  }

  addArrow(a, b, color) {
    const dist = a.distanceTo(b);
    const midP = a.clone().lerp(b, 0.5);
    // Bow the arrow away from the midline and slightly up so parallel arrows separate.
    const bow = new THREE.Vector3(Math.sign(midP.x || 1) * 0.35, 0.45, 0).normalize().multiplyScalar(dist * 0.22);
    const curve = new THREE.QuadraticBezierCurve3(a, midP.add(bow), b);
    const r = 0.00042;
    const mat = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.55,
      depthTest: false,
      depthWrite: false,
    });
    const tube = new THREE.Mesh(new THREE.TubeGeometry(curve, 40, r, 6, false), mat);
    tube.renderOrder = 20;
    this.group.add(tube);

    const head = new THREE.Mesh(
      new THREE.ConeGeometry(r * 3.4, r * 10, 12),
      new THREE.MeshBasicMaterial({ color, depthTest: false, depthWrite: false, transparent: true, opacity: 0.9 }),
    );
    const tEnd = 0.93;
    head.position.copy(curve.getPointAt(tEnd));
    head.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), curve.getTangentAt(tEnd).normalize());
    head.renderOrder = 21;
    this.group.add(head);

    const pulseGeo = new THREE.SphereGeometry(r * 2.6, 10, 8);
    for (let i = 0; i < 3; i += 1) {
      const p = new THREE.Mesh(
        pulseGeo,
        new THREE.MeshBasicMaterial({
          color: color.clone().lerp(new THREE.Color(0xffffff), this.s.theme === 'light' ? 0 : 0.35),
          depthTest: false,
          depthWrite: false,
          transparent: true,
        }),
      );
      p.renderOrder = 22;
      this.group.add(p);
      this.pulses.push({ mesh: p, curve, offset: i / 3, speed: 0.32 / Math.max(dist / 0.04, 0.6) });
    }
  }

  draw(pathway) {
    this.clearDrawing();
    if (!this.anchors) this.anchors = this.computeAnchors();
    const A = this.anchors;
    if (!A) return;
    const color = this.colorFor(pathway);

    const pairs = pathway.pairs || pathway.sources.flatMap((s) => pathway.targets.map((t) => [s, t]));
    for (const [sId, tId] of pairs) {
      const src = A[sId];
      const tgt = A[tId];
      if (!src || !tgt) continue;
      if (src.points.length === 2 && tgt.points.length === 2) {
        this.addArrow(src.points[0], tgt.points[0], color);
        this.addArrow(src.points[1], tgt.points[1], color);
      } else {
        const mid = A.mid;
        for (const sp of src.points) {
          let targets = tgt.points;
          if (tgt.fan && src.points.length === 2) {
            // Bilateral source into a fan: each side feeds its own hemisphere plus the midline points.
            targets = tgt.points.filter(
              (tp) => Math.abs(tp.x - mid) < 0.005 || Math.sign(tp.x - mid) === Math.sign(sp.x - mid),
            );
          }
          for (const tp of targets) this.addArrow(sp, tp, color);
        }
      }
    }

    const sources = new Set(pathway.sources);
    const ids = new Set(pairs.flat());
    for (const id of ids) {
      const anchor = A[id];
      if (!anchor) continue;
      // Label once (viewer-facing side for bilateral, first point for a fan).
      const labelPoint = anchor.fan
        ? anchor.points[2]
        : anchor.points[anchor.points.length - 1];
      this.addLabel(id, labelPoint, color, { virtual: anchor.virtual, isSource: sources.has(id) });
      if (anchor.virtual) {
        // Unlabelled dashed dots on the other bilateral / fan points.
        anchor.points.forEach((p) => {
          if (p === labelPoint) return;
          const el = document.createElement('div');
          el.className = `nt-label nt-label--virtual nt-label--bare${sources.has(id) ? ' nt-label--source' : ''}`;
          el.style.setProperty('--nt-color', `#${color.getHexString()}`);
          const dot = document.createElement('span');
          dot.className = 'nt-label__dot';
          el.append(dot);
          const obj = new CSS2DObject(el);
          obj.position.copy(p);
          this.group.add(obj);
        });
      }
    }

    this.frameOn(pathway, pairs);
  }

  frameOn(pathway, pairs) {
    const box = new THREE.Box3();
    for (const id of new Set(pairs.flat())) this.anchors[id]?.points.forEach((p) => box.expandByPoint(p));
    // Always keep the core basal ganglia in shot so small pathways don't zoom in absurdly.
    for (const key of new Set([...pathway.lit, 'Caudate_nucleus', 'Putamen', 'Substantia_nigra'])) {
      const b = this.box(key);
      if (b) box.union(b);
    }
    if (box.isEmpty()) return;
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const cam = this.s.camera;
    const fov = (cam.fov * Math.PI) / 180;
    const aspect = Math.max(cam.aspect, 0.4);
    const tan = 2 * Math.tan(fov / 2);
    // Lateral view: screen height ≈ y extent, screen width ≈ z extent.
    const dist = Math.max(size.y / tan, size.z / (tan * Math.min(aspect, 1.5)), 0.05) * 1.3 + size.x * 0.5;
    // The info popup covers the right of the canvas on desktop; nudge the model left of centre.
    if (window.innerWidth > 900) {
      const right = new THREE.Vector3().crossVectors(VIEW_DIR.clone().negate(), new THREE.Vector3(0, 1, 0)).normalize();
      center.add(right.multiplyScalar(dist * 0.12));
    }
    const toPos = center.clone().add(VIEW_DIR.clone().multiplyScalar(dist));
    this.tween = {
      t0: performance.now(),
      dur: 750,
      fromPos: cam.position.clone(),
      fromTarget: this.s.controls.target.clone(),
      toPos,
      toTarget: center,
    };
    const c = this.s.controls;
    c.minDistance = Math.min(c.minDistance, dist * 0.25);
    c.maxDistance = Math.max(c.maxDistance, dist * 4);
    cam.far = Math.max(cam.far, dist * 20);
    cam.updateProjectionMatrix();
  }

  tick() {
    if (this.tween) {
      const tw = this.tween;
      const k = Math.min((performance.now() - tw.t0) / tw.dur, 1);
      const e = 1 - Math.pow(1 - k, 3);
      this.s.camera.position.lerpVectors(tw.fromPos, tw.toPos, e);
      this.s.controls.target.lerpVectors(tw.fromTarget, tw.toTarget, e);
      if (k >= 1) this.tween = null;
    }
    const t = this.clock.getElapsedTime();
    for (const p of this.pulses) {
      const u = (t * p.speed + p.offset) % 1;
      p.mesh.position.copy(p.curve.getPointAt(u));
      p.mesh.material.opacity = Math.sin(u * Math.PI) * 0.95;
    }
    this.labelRenderer.render(this.s.scene, this.s.camera);
  }

  resize() {
    const r = this.s.canvas.getBoundingClientRect();
    this.labelRenderer.setSize(Math.max(r.width, 1), Math.max(r.height, 1));
  }

  /* ---------- state ---------- */

  show(id) {
    const pathway = NT_PATHWAYS.find((p) => p.id === id);
    if (!pathway || !this.s.ready) return;
    this.activeId = id;
    this.s.setHighlight(pathway.lit.length ? pathway.lit : ['__none__']);
    this.draw(pathway);
    this.onShowInfo?.(pathway);
    this.syncPanel();
  }

  /** @param {boolean} notify also hide the info popup and restore the scene */
  clear(notify = true) {
    if (!this.activeId) return;
    this.activeId = null;
    this.tween = null;
    this.clearDrawing();
    if (notify) {
      this.s.setHighlight(null);
      this.onHideInfo?.();
    }
    this.syncPanel();
  }

  setTheme() {
    if (this.activeId) this.draw(NT_PATHWAYS.find((p) => p.id === this.activeId));
  }

  setLang() {
    this.renderPanelText();
    this.group.traverse((o) => {
      if (!o.isCSS2DObject) return;
      const text = o.element.querySelector('.nt-label__text');
      if (text) text.textContent = NT_ANCHOR_LABELS[text.dataset.anchor]?.[lang()] ?? text.dataset.anchor;
    });
  }

  /* ---------- panel ---------- */

  buildPanel() {
    const panel = document.createElement('aside');
    panel.className = 'nt-panel';
    panel.setAttribute('aria-label', 'Neurotransmitter pathways');
    const collapsed = window.matchMedia('(max-width: 640px)').matches;
    panel.innerHTML = `
      <button type="button" class="nt-panel__head" aria-expanded="${collapsed ? 'false' : 'true'}">
        <span class="nt-panel__heading"></span><span class="nt-panel__chev" aria-hidden="true">▾</span>
      </button>
      <div class="nt-panel__body" ${collapsed ? 'hidden' : ''}></div>`;
    const body = panel.querySelector('.nt-panel__body');
    for (const sys of NT_SYSTEMS) {
      const group = document.createElement('div');
      group.className = 'nt-group';
      group.style.setProperty('--nt-color-dark', `#${sys.color.dark.toString(16).padStart(6, '0')}`);
      group.style.setProperty('--nt-color-light', `#${sys.color.light.toString(16).padStart(6, '0')}`);
      const h = document.createElement('p');
      h.className = 'nt-group__name';
      h.dataset.system = sys.id;
      group.append(h);
      for (const pw of NT_PATHWAYS.filter((p) => p.system === sys.id)) {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'nt-chip';
        b.dataset.pathway = pw.id;
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', () => (this.activeId === pw.id ? this.clear() : this.show(pw.id)));
        group.append(b);
      }
      body.append(group);
    }
    const hide = document.createElement('button');
    hide.type = 'button';
    hide.className = 'nt-hide';
    hide.hidden = true;
    hide.addEventListener('click', () => this.clear());
    const note = document.createElement('p');
    note.className = 'nt-note';
    body.append(hide, note);

    const head = panel.querySelector('.nt-panel__head');
    head.addEventListener('click', () => {
      const open = head.getAttribute('aria-expanded') !== 'true';
      head.setAttribute('aria-expanded', open ? 'true' : 'false');
      body.hidden = !open;
    });

    this.panel = panel;
    this.host.appendChild(panel);
    this.renderPanelText();
  }

  renderPanelText() {
    const L = lang();
    const p = this.panel;
    p.querySelector('.nt-panel__heading').textContent = NT_UI[L].heading;
    p.querySelector('.nt-hide').textContent = NT_UI[L].hide;
    p.querySelector('.nt-note').textContent = NT_UI[L].note;
    p.querySelectorAll('.nt-group__name').forEach((el) => {
      el.textContent = systemById(el.dataset.system).label[L];
    });
    p.querySelectorAll('.nt-chip').forEach((el) => {
      el.textContent = NT_PATHWAYS.find((x) => x.id === el.dataset.pathway).name[L];
    });
  }

  syncPanel() {
    this.panel.querySelectorAll('.nt-chip').forEach((el) => {
      const on = el.dataset.pathway === this.activeId;
      el.classList.toggle('is-active', on);
      el.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    this.panel.querySelector('.nt-hide').hidden = !this.activeId;
  }
}
