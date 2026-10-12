import {
  STRUCTURE_RELATIONS,
  splitClinicalText,
} from './structureUiMeta.js';
import cerebralCortexStructures from './cerebralCortexStructures.js';
import brainstemDetailStructures from './brainstemDetailStructures.js';
import earPathwayStructures, {
  EAR_PATHWAY_RELATIONS,
} from './earPathwayStructures.js';
import { BRAIN_STRUCTURE_META } from './brainStructureMeta.js';
import { hasScanLink, scansUrlForStructure } from './scanBridge.js';

let detailExpanded = false;
let currentLang = 'en';
let currentKey = null;

const PANEL_UI = {
  en: { clinicalDetail: 'Clinical detail', showLess: 'Show less', related: 'Related', scan: 'View on MRI →' },
  az: { clinicalDetail: 'Klinik təfərrüat', showLess: 'Daha az göstər', related: 'Əlaqəli', scan: 'MRT-də bax →' },
};

export function getLang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

export function setInfoPanelLang(lang) {
  currentLang = lang === 'az' ? 'az' : 'en';
  const moreBtnEl = document.getElementById('info-more');
  if (moreBtnEl && !moreBtnEl.hidden) {
    moreBtnEl.textContent = detailExpanded
      ? PANEL_UI[currentLang].showLess
      : PANEL_UI[currentLang].clinicalDetail;
  }
  const heading = document.getElementById('info-related-heading');
  if (heading) heading.textContent = PANEL_UI[currentLang].related;
  if (scanLinkEl && !scanLinkEl.hidden) scanLinkEl.textContent = PANEL_UI[currentLang].scan;
  if (currentKey && panelEl && !panelEl.hidden) {
    const last = panelEl.__lastPayload;
    if (last) showInfoPanel(last, { keepDetail: true });
  }
}


let panelEl = null;
let titleEl = null;
let categoryEl = null;
let overviewEl = null;
let detailEl = null;
let detailWrapEl = null;
let relatedEl = null;
let scanLinkEl = null;
let closeBtn = null;
let moreBtn = null;
let onClose = null;
let onRelatedSelect = null;

function displayTitle(key, rawTitle) {
  const source = rawTitle || String(key).replace(/^\d+_/, '').replace(/_/g, ' ');
  return source
    .toLowerCase()
    .replace(/\b\w/g, (ch) => ch.toUpperCase())
    .replace(/\bViii\b/g, 'VIII')
    .replace(/\bIi\b/g, 'II')
    .replace(/\bIii\b/g, 'III')
    .replace(/\bHeschl'S\b/g, "Heschl's");
}

function categoryLabel(key) {
  if (brainstemDetailStructures[key]) return 'Brainstem';
  if (key === 'Brainstem') return 'Brainstem';
  const meta = BRAIN_STRUCTURE_META[key];
  if (meta) {
    if (meta.category === 'cortex') return 'Cerebral cortex';
    if (meta.category === 'overview') {
      if (/Cerebellum/i.test(key)) return 'Cerebellum';
      if (/Brainstem/i.test(key)) return 'Brainstem';
      return 'Overview';
    }
    if (meta.category === 'commissures') return 'Commissure';
    if (meta.category === 'cranial_nerves') return 'Cranial nerve';
    if (meta.subgroup === 'BasalForebrain') return 'Basal forebrain';
    if (meta.subgroup === 'Diencephalon') return 'Diencephalon';
    if (meta.subgroup === 'Striatum') return 'Basal ganglia';
    if (meta.subgroup === 'Ventricles' || /Ventricles/i.test(key)) {
      return 'Ventricles & white matter';
    }
    return 'Subcortical';
  }
  if (earPathwayStructures[key]?.category) return earPathwayStructures[key].category;
  return 'Anatomy';
}

function resolveRelated(key) {
  const explicit =
    STRUCTURE_RELATIONS[key] || EAR_PATHWAY_RELATIONS[key] || [];
  const seen = new Set([key]);
  const out = [];

  const pushKey = (relKey) => {
    if (!relKey || seen.has(relKey)) return;
    const data =
      earPathwayStructures[relKey] ||
      cerebralCortexStructures[relKey] ||
      brainstemDetailStructures[relKey];
    if (!data) return;
    seen.add(relKey);
    out.push({ key: relKey, title: displayTitle(relKey, data.title) });
  };

  for (const rel of explicit) pushKey(rel);

  // Same anatomical group as soft fallback.
  const meta = BRAIN_STRUCTURE_META[key];
  if (out.length < 4 && meta) {
    for (const [otherKey, otherMeta] of Object.entries(BRAIN_STRUCTURE_META)) {
      if (out.length >= 4) break;
      if (otherKey === key) continue;
      const sameGroup =
        (meta.subgroup && meta.subgroup === otherMeta.subgroup) ||
        (!meta.subgroup && meta.category === otherMeta.category);
      if (sameGroup) pushKey(otherKey);
    }
  }

  return out.slice(0, 4);
}

export function initInfoPanel({ onClose: closeCb, onRelatedSelect: relatedCb } = {}) {
  onClose = closeCb;
  onRelatedSelect = relatedCb;
  panelEl = document.getElementById('info-panel');
  titleEl = document.getElementById('info-title');
  categoryEl = document.getElementById('info-category');
  overviewEl = document.getElementById('info-overview');
  detailEl = document.getElementById('info-detail');
  detailWrapEl = document.getElementById('info-detail-wrap');
  relatedEl = document.getElementById('info-related');
  scanLinkEl = document.getElementById('info-scan-link');
  closeBtn = document.getElementById('info-close');
  moreBtn = document.getElementById('info-more');

  if (!panelEl) return;

  closeBtn?.addEventListener('click', () => {
    hideInfoPanel();
    onClose?.();
  });

  moreBtn?.addEventListener('click', () => {
    detailExpanded = !detailExpanded;
    if (detailWrapEl) detailWrapEl.hidden = !detailExpanded;
    if (moreBtn) {
      moreBtn.textContent = detailExpanded
        ? PANEL_UI[currentLang].showLess
        : PANEL_UI[currentLang].clinicalDetail;
      moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
    }
  });
}

function pickLocalized(data, field) {
  if (!data) return '';
  if (currentLang === 'az') {
    const az = data[`${field}Az`];
    if (az) return az;
  }
  return data[field] || '';
}

function structureSource(key) {
  return (
    cerebralCortexStructures[key] ||
    brainstemDetailStructures[key] ||
    earPathwayStructures[key] ||
    null
  );
}

const BRAINSTEM_DRILL_NOTE = {
  en: 'Detailed segments are shown: select midbrain, pons, or medulla for a closer look. Close the panel or click empty space to return.',
  az: 'Ətraflı seqmentlər göstərilir: daha yaxından baxmaq üçün midbrain, pons və ya medulla seçin. Panelə bağlayın və ya boş yerə klikləyərək qayıdın.',
};

export function showInfoPanel(payload, { keepDetail = false } = {}) {
  if (!panelEl || !titleEl || !overviewEl) return;
  currentLang = getLang();
  const { key, title, description } = payload || {};
  const source = structureSource(key);
  const resolvedTitle = pickLocalized(source, 'title') || title;
  const resolvedDescription = pickLocalized(source, 'description') || description || '';
  const resolvedCategory = pickLocalized(source, 'category') || categoryLabel(key);

  const { overview, detail } = splitClinicalText(resolvedDescription);
  titleEl.textContent = displayTitle(key, resolvedTitle);
  if (categoryEl) categoryEl.textContent = resolvedCategory;

  let overviewText = overview || resolvedDescription || '';
  if (key === 'Brainstem') {
    const note = BRAINSTEM_DRILL_NOTE[currentLang] || BRAINSTEM_DRILL_NOTE.en;
    if (!/Detailed segments are shown|Ətraflı seqmentlər/i.test(overviewText)) {
      overviewText = `${overviewText}\n\n${note}`;
    }
  }
  overviewEl.textContent = overviewText;

  const wasExpanded = keepDetail && detailExpanded;
  detailExpanded = Boolean(wasExpanded && detail);
  if (detailEl) detailEl.textContent = detail;
  if (detailWrapEl) detailWrapEl.hidden = !detailExpanded;
  if (moreBtn) {
    const hasDetail = Boolean(detail);
    moreBtn.hidden = !hasDetail;
    moreBtn.textContent = detailExpanded
      ? PANEL_UI[currentLang].showLess
      : PANEL_UI[currentLang].clinicalDetail;
    moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
  }

  if (relatedEl) {
    relatedEl.replaceChildren();
    const related = resolveRelated(key);
    const heading = document.getElementById('info-related-heading');
    if (heading) {
      heading.hidden = related.length === 0;
      heading.textContent = PANEL_UI[currentLang].related;
    }

    for (const item of related) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'info-panel__chip';
      btn.textContent = item.title;
      btn.addEventListener('click', () => onRelatedSelect?.(item.key));
      relatedEl.appendChild(btn);
    }
  }

  if (scanLinkEl) {
    const href = hasScanLink(key) ? scansUrlForStructure(key) : null;
    if (href) {
      scanLinkEl.href = href;
      scanLinkEl.hidden = false;
      scanLinkEl.textContent = PANEL_UI[currentLang].scan;
    } else {
      scanLinkEl.hidden = true;
      scanLinkEl.removeAttribute('href');
    }
  }

  panelEl.__lastPayload = payload;
  currentKey = key;
  panelEl.hidden = false;
}

export function hideInfoPanel() {
  if (!panelEl) return;
  panelEl.hidden = true;
  if (scanLinkEl) {
    scanLinkEl.hidden = true;
    scanLinkEl.removeAttribute('href');
  }
}

