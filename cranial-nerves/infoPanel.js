import {
  STRUCTURE_RELATIONS,
  splitClinicalText,
} from './structureUiMeta.js';
import cerebralCortexStructures from './cerebralCortexStructures.js';
import brainstemDetailStructures from './brainstemDetailStructures.js';
import earPathwayStructures, {
  EAR_PATHWAY_RELATIONS,
} from './earPathwayStructures.js';
import ventriclesStructures, {
  VENTRICLES_RELATIONS,
} from './ventriclesStructures.js';
import whiteMatterStructures, {
  WHITE_MATTER_RELATIONS,
} from './whiteMatterStructures.js';
import limbicStructures, {
  LIMBIC_RELATIONS,
} from './limbicStructures.js';
import cranialNervesStructures, {
  CRANIAL_NERVES_RELATIONS,
} from './cranialNervesStructures.js';
import { BRAIN_STRUCTURE_META } from './brainStructureMeta.js';


let currentLang = 'en';
let currentKey = null;
let detailExpanded = false;

const PANEL_UI = {
  en: { clinicalDetail: 'Clinical detail', showLess: 'Show less', related: 'Related' },
  az: { clinicalDetail: 'Klinik təfərrüat', showLess: 'Daha az göstər', related: 'Əlaqəli' },
};

export function getLang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

export function setInfoPanelLang(lang) {
  currentLang = lang === 'az' ? 'az' : 'en';
  const moreBtn = document.getElementById('info-more');
  if (moreBtn && !moreBtn.hidden) {
    moreBtn.textContent = detailExpanded
      ? PANEL_UI[currentLang].showLess
      : PANEL_UI[currentLang].clinicalDetail;
  }
  const heading = document.getElementById('info-related-heading');
  if (heading) heading.textContent = PANEL_UI[currentLang].related;
  if (currentKey && panelEl && !panelEl.hidden) {
    // re-show with same payload keys if last shown stored on panel
    const last = panelEl.__lastPayload;
    if (last) showInfoPanel(last, { keepDetail: true });
  }
}

function pickLocalized(data, field) {
  if (!data) return '';
  if (currentLang === 'az') {
    const az = data[field + 'Az'];
    if (az) return az;
  }
  return data[field] || '';
}

let panelEl = null;
let titleEl = null;
let categoryEl = null;
let overviewEl = null;
let detailEl = null;
let detailWrapEl = null;
let relatedEl = null;
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
  if (cranialNervesStructures[key]?.category) return cranialNervesStructures[key].category;
  if (limbicStructures[key]?.category) return limbicStructures[key].category;
  if (whiteMatterStructures[key]?.category) return whiteMatterStructures[key].category;
  if (ventriclesStructures[key]?.category) return ventriclesStructures[key].category;
  if (earPathwayStructures[key]?.category) return earPathwayStructures[key].category;
  if (brainstemDetailStructures[key]) return 'Brainstem';
  const meta = BRAIN_STRUCTURE_META[key];
  if (!meta) return 'Anatomy';
  if (meta.category === 'cortex') return 'Cerebral cortex';
  if (meta.category === 'overview') return 'Overview';
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

function resolveRelated(key) {
  const explicit =
    CRANIAL_NERVES_RELATIONS[key] ||
    LIMBIC_RELATIONS[key] ||
    WHITE_MATTER_RELATIONS[key] ||
    VENTRICLES_RELATIONS[key] ||
    EAR_PATHWAY_RELATIONS[key] ||
    STRUCTURE_RELATIONS[key] ||
    [];
  const seen = new Set([key]);
  const out = [];

  const pushKey = (relKey) => {
    if (!relKey || seen.has(relKey)) return;
    const data =
      cranialNervesStructures[relKey] ||
      limbicStructures[relKey] ||
      whiteMatterStructures[relKey] ||
      ventriclesStructures[relKey] ||
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
      moreBtn.textContent = detailExpanded ? PANEL_UI[currentLang].showLess : PANEL_UI[currentLang].clinicalDetail;
      moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
    }
  });
}

export function showInfoPanel(payload, { keepDetail = false } = {}) {
  const { key, title, description, titleAz, descriptionAz, category, categoryAz } = payload || {};
  if (panelEl) panelEl.__lastPayload = payload;
  currentKey = key;
  currentLang = getLang();
  if (!panelEl || !titleEl || !overviewEl) return;

  const fullDescription = (currentLang === 'az' && descriptionAz) ? descriptionAz : (description || '');
  const { overview, detail } = splitClinicalText(fullDescription);
  titleEl.textContent = displayTitle(key, (currentLang === 'az' && titleAz) ? titleAz : title);
  if (categoryEl) {
    categoryEl.textContent =
      (currentLang === 'az' && categoryAz) ? categoryAz : (category || categoryLabel(key));
  }
  overviewEl.textContent = overview || fullDescription || description || '';

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

  panelEl.hidden = false;
}

export function hideInfoPanel() {
  if (!panelEl) return;
  panelEl.hidden = true;
}
