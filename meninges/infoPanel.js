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
import visualPathwayStructures, {
  VISUAL_PATHWAY_RELATIONS,
} from './visualPathwayStructures.js';
import diencephalonStructures, {
  DIENCEPHALON_RELATIONS,
} from './diencephalonStructures.js';
import meningesStructures, {
  MENINGES_RELATIONS,
} from './meningesStructures.js';
import { BRAIN_STRUCTURE_META } from './brainStructureMeta.js';

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
let detailExpanded = false;
let currentKey = null;
let currentLang = 'en';

const UI = {
  en: {
    clinicalDetail: 'Clinical detail',
    showLess: 'Show less',
    related: 'Related',
  },
  az: {
    clinicalDetail: 'Klinik təfərrüat',
    showLess: 'Daha az göstər',
    related: 'Əlaqəli',
  },
};

export function getLang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

export function setInfoPanelLang(lang) {
  currentLang = lang === 'az' ? 'az' : 'en';
  if (moreBtn && !moreBtn.hidden) {
    moreBtn.textContent = detailExpanded
      ? UI[currentLang].showLess
      : UI[currentLang].clinicalDetail;
  }
  const heading = document.getElementById('info-related-heading');
  if (heading) heading.textContent = UI[currentLang].related;
  if (currentKey && !panelEl?.hidden) {
    const data = meningesStructures[currentKey];
    if (data) {
      showInfoPanel({ key: currentKey, ...data });
    }
  }
}

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

function localizedTitle(key, data) {
  if (!data) return displayTitle(key);
  if (currentLang === 'az' && data.titleAz) return data.titleAz;
  return displayTitle(key, data.title);
}

function localizedCategory(key) {
  const data = meningesStructures[key];
  if (data) {
    if (currentLang === 'az') return data.categoryAz || data.category || 'Anatomiya';
    return data.category || 'Anatomy';
  }
  if (diencephalonStructures[key]?.category) return diencephalonStructures[key].category;
  if (visualPathwayStructures[key]?.category) return visualPathwayStructures[key].category;
  if (cranialNervesStructures[key]?.category) return cranialNervesStructures[key].category;
  if (limbicStructures[key]?.category) return limbicStructures[key].category;
  if (whiteMatterStructures[key]?.category) return whiteMatterStructures[key].category;
  if (ventriclesStructures[key]?.category) return ventriclesStructures[key].category;
  if (earPathwayStructures[key]?.category) return earPathwayStructures[key].category;
  if (brainstemDetailStructures[key]) return currentLang === 'az' ? 'Beyin gövdəsi' : 'Brainstem';
  const meta = BRAIN_STRUCTURE_META[key];
  if (!meta) return currentLang === 'az' ? 'Anatomiya' : 'Anatomy';
  if (meta.category === 'cortex') return currentLang === 'az' ? 'Serebral korteks' : 'Cerebral cortex';
  if (meta.category === 'overview') return currentLang === 'az' ? 'İcmal' : 'Overview';
  if (meta.category === 'commissures') return currentLang === 'az' ? 'Komissura' : 'Commissure';
  if (meta.category === 'cranial_nerves') return currentLang === 'az' ? 'Kəllə siniri' : 'Cranial nerve';
  if (meta.subgroup === 'BasalForebrain') return currentLang === 'az' ? 'Bazal ön beyin' : 'Basal forebrain';
  if (meta.subgroup === 'Diencephalon') return 'Diencephalon';
  if (meta.subgroup === 'Striatum') return currentLang === 'az' ? 'Bazal qanqliya' : 'Basal ganglia';
  if (meta.subgroup === 'Ventricles' || /Ventricles/i.test(key)) {
    return currentLang === 'az' ? 'Mədəciklər və ağ maddə' : 'Ventricles & white matter';
  }
  return currentLang === 'az' ? 'Subkortikal' : 'Subcortical';
}

function localizedDescription(data) {
  if (!data) return '';
  if (currentLang === 'az') return data.descriptionAz || data.description || '';
  return data.description || '';
}

function resolveRelated(key) {
  const explicit =
    MENINGES_RELATIONS[key] ||
    DIENCEPHALON_RELATIONS[key] ||
    VISUAL_PATHWAY_RELATIONS[key] ||
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
      meningesStructures[relKey] ||
      diencephalonStructures[relKey] ||
      visualPathwayStructures[relKey] ||
      cranialNervesStructures[relKey] ||
      limbicStructures[relKey] ||
      whiteMatterStructures[relKey] ||
      ventriclesStructures[relKey] ||
      earPathwayStructures[relKey] ||
      cerebralCortexStructures[relKey] ||
      brainstemDetailStructures[relKey];
    if (!data) return;
    seen.add(relKey);
    out.push({ key: relKey, title: localizedTitle(relKey, data) });
  };

  for (const rel of explicit) pushKey(rel);

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
  currentLang = getLang();
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
      moreBtn.textContent = detailExpanded
        ? UI[currentLang].showLess
        : UI[currentLang].clinicalDetail;
      moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
    }
  });
}

export function showInfoPanel({ key, title, description, titleAz, descriptionAz, category, categoryAz }) {
  if (!panelEl || !titleEl || !overviewEl) return;

  currentKey = key;
  currentLang = getLang();

  const data = meningesStructures[key] || {
    title,
    titleAz,
    description,
    descriptionAz,
    category,
    categoryAz,
  };

  const fullDescription = localizedDescription(data);
  const { overview, detail } = splitClinicalText(fullDescription);
  titleEl.textContent = localizedTitle(key, data);
  if (categoryEl) categoryEl.textContent = localizedCategory(key);
  overviewEl.textContent = overview || fullDescription || '';

  const keepExpanded = detailExpanded;
  if (detailEl) detailEl.textContent = detail;
  if (detailWrapEl) detailWrapEl.hidden = !keepExpanded || !detail;
  if (moreBtn) {
    const hasDetail = Boolean(detail);
    moreBtn.hidden = !hasDetail;
    moreBtn.textContent = keepExpanded
      ? UI[currentLang].showLess
      : UI[currentLang].clinicalDetail;
    moreBtn.setAttribute('aria-expanded', keepExpanded && hasDetail ? 'true' : 'false');
    if (!hasDetail) detailExpanded = false;
  }

  if (relatedEl) {
    relatedEl.replaceChildren();
    const related = resolveRelated(key);
    const heading = document.getElementById('info-related-heading');
    if (heading) {
      heading.hidden = related.length === 0;
      heading.textContent = UI[currentLang].related;
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
  currentKey = null;
  detailExpanded = false;
}
