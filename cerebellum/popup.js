let popupEl = null;
let titleEl = null;
let overviewEl = null;
let detailEl = null;
let detailWrapEl = null;
let moreBtn = null;
let closeBtn = null;
let onClose = null;
let detailExpanded = false;
let currentLang = 'en';
/** @type {{ title?: string, titleAz?: string, description?: string, descriptionAz?: string } | null} */
let lastPayload = null;

const UI = {
  en: { clinicalDetail: 'Clinical detail', showLess: 'Show less' },
  az: { clinicalDetail: 'Klinik təfərrüat', showLess: 'Daha az göstər' },
};

function getLang() {
  return document.documentElement.lang === 'az' ? 'az' : 'en';
}

function splitClinicalText(description = '') {
  const parts = String(description)
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return { overview: parts[0] || '', detail: parts.slice(1).join('\n\n') };
}

function resolveText(payload) {
  if (!payload) return { title: '', description: '' };
  const az = currentLang === 'az';
  return {
    title: (az && payload.titleAz) || payload.title || '',
    description: (az && payload.descriptionAz) || payload.description || '',
  };
}

export function setPopupLang(lang) {
  currentLang = lang === 'az' ? 'az' : 'en';
  if (lastPayload && popupEl && !popupEl.hidden) {
    showPopup(lastPayload, { keepDetail: true });
  }
}

export function initPopup(closeCallback) {
  onClose = closeCallback;
  popupEl = document.getElementById('structure-popup');
  titleEl = document.getElementById('popup-title');
  overviewEl = document.getElementById('popup-overview') || document.getElementById('popup-body');
  detailEl = document.getElementById('popup-detail');
  detailWrapEl = document.getElementById('popup-detail-wrap');
  moreBtn = document.getElementById('popup-more');
  closeBtn = document.getElementById('popup-close');
  if (!popupEl) return;

  closeBtn?.addEventListener('click', () => {
    hidePopup();
    onClose?.();
  });
  moreBtn?.addEventListener('click', () => {
    detailExpanded = !detailExpanded;
    if (detailWrapEl) detailWrapEl.hidden = !detailExpanded;
    if (moreBtn) {
      moreBtn.textContent = detailExpanded ? UI[currentLang].showLess : UI[currentLang].clinicalDetail;
      moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
    }
  });
}

/**
 * @param {object|string} payloadOrTitle structure payload, or legacy title string
 * @param {string|{keepDetail?: boolean}} [descriptionOrOpts] legacy description, or options
 * @param {{keepDetail?: boolean}} [maybeOpts]
 */
export function showPopup(payloadOrTitle, descriptionOrOpts, maybeOpts) {
  if (!popupEl || !titleEl || !overviewEl) return;

  let payload;
  let keepDetail = false;

  if (payloadOrTitle && typeof payloadOrTitle === 'object') {
    payload = payloadOrTitle;
    keepDetail = Boolean(descriptionOrOpts?.keepDetail);
  } else {
    payload = {
      title: payloadOrTitle || '',
      description: typeof descriptionOrOpts === 'string' ? descriptionOrOpts : '',
    };
    keepDetail = Boolean(maybeOpts?.keepDetail || descriptionOrOpts?.keepDetail);
  }

  lastPayload = payload;
  currentLang = getLang();
  const { title, description } = resolveText(payload);
  const { overview, detail } = splitClinicalText(description);

  titleEl.textContent = title;
  overviewEl.textContent = overview || description || '';
  if (detailEl) detailEl.textContent = detail;

  const wasExpanded = keepDetail && detailExpanded;
  detailExpanded = Boolean(wasExpanded && detail);
  if (detailWrapEl) detailWrapEl.hidden = !detailExpanded;
  if (moreBtn) {
    const has = Boolean(detail);
    moreBtn.hidden = !has;
    moreBtn.textContent = detailExpanded ? UI[currentLang].showLess : UI[currentLang].clinicalDetail;
    moreBtn.setAttribute('aria-expanded', detailExpanded ? 'true' : 'false');
  }
  popupEl.hidden = false;
}

export function hidePopup() {
  if (!popupEl) return;
  popupEl.hidden = true;
  lastPayload = null;
  detailExpanded = false;
}
