/**
 * NEYRON Publish — multi-step proposal wizard.
 * Never auto-publishes. Web3Forms if keyed, else mailto REVIEW_EMAIL.
 */
(function () {
  var TOTAL_STEPS = 5;
  var step = 0;

  var STEP_NAMES = [
    { en: 'Getting started', az: 'Başlanğıc' },
    { en: 'Work details', az: 'Əsər məlumatları' },
    { en: 'Rights and access', az: 'Hüquqlar və giriş' },
    { en: 'Reader summary', az: 'Oxucu xülasəsi' },
    { en: 'Review and submit', az: 'Yoxla və göndər' },
  ];

  function getLang() {
    return document.documentElement.getAttribute('lang') === 'az' ? 'az' : 'en';
  }

  function localized(field) {
    if (!field || typeof field !== 'object') return '';
    var lang = getLang();
    return field[lang] || field.en || '';
  }

  function cfg() {
    return window.NEYRON_PUBLISH || {};
  }

  var UI = {
    stepOf: { en: 'Step {n} of {total}', az: 'Addım {n} / {total}' },
    needEmail: {
      en: 'Set REVIEW_EMAIL in publish-config.js so submissions can reach you.',
      az: 'Göndərişlərin sizə çatması üçün publish-config.js-də REVIEW_EMAIL təyin edin.',
    },
    sending: { en: 'Sending…', az: 'Göndərilir…' },
    sent: {
      en: 'Sent successfully. Nothing is published until it is reviewed.',
      az: 'Uğurla göndərildi. Yoxlanılana qədər heç nə dərc olunmur.',
    },
    mailtoHint: {
      en: 'Your mail app will open with the proposal. Send the message to complete submission.',
      az: 'Poçt proqramınız təkliflə açılacaq. Göndərişi tamamlamaq üçün mesajı göndərin.',
    },
    err: {
      en: 'Could not send. Check the form or try again.',
      az: 'Göndərilə bilmədi. Formanı yoxlayın və ya yenidən cəhd edin.',
    },
    required: {
      en: 'Please complete the required fields on this step.',
      az: 'Bu addımdakı məcburi sahələri doldurun.',
    },
    dash: { en: '—', az: '—' },
  };

  var statusTimer = null;

  var REVIEW_LABELS = {
    workType: { en: 'Type', az: 'Növ' },
    contactName: { en: 'Name', az: 'Ad' },
    contactEmail: { en: 'Email', az: 'E-poçt' },
    title: { en: 'Title', az: 'Başlıq' },
    authors: { en: 'Authors', az: 'Müəlliflər' },
    year: { en: 'Year', az: 'İl' },
    journal: { en: 'Journal', az: 'Jurnal' },
    doi: { en: 'DOI', az: 'DOI' },
    pmid: { en: 'PMID', az: 'PMID' },
    sourceUrl: { en: 'Link', az: 'Keçid' },
    publisher: { en: 'Publisher', az: 'Nəşriyyat' },
    bookId: { en: 'ISBN / URL', az: 'ISBN / URL' },
    bookFormat: { en: 'Format', az: 'Format' },
    atlasRegion: { en: 'Structure', az: 'Struktur' },
    modelUrl: { en: 'Model link', az: 'Model keçidi' },
    modelFormat: { en: 'Model format', az: 'Model formatı' },
    viewerCredit: { en: 'Viewer credit', az: 'Baxış krediti' },
    licence: { en: 'Licence', az: 'Lisenziya' },
    hosting: { en: 'Hosting', az: 'Host' },
    summary: { en: 'Summary', az: 'Xülasə' },
    notes: { en: 'Notes', az: 'Qeydlər' },
  };

  function $(id) {
    return document.getElementById(id);
  }

  function fill(template, vars) {
    var s = localized(template);
    Object.keys(vars || {}).forEach(function (k) {
      s = s.split('{' + k + '}').join(String(vars[k]));
    });
    return s;
  }

  function setStatus(msg, kind) {
    var el = $('publish-status');
    if (!el) return;
    if (statusTimer) {
      clearTimeout(statusTimer);
      statusTimer = null;
    }
    el.hidden = !msg;
    el.textContent = msg || '';
    el.className = 'publish-status' + (kind ? ' publish-status--' + kind : '');
  }

  /** Brief success banner (~5s), then clear. */
  function flashSuccess(msg) {
    setStatus(msg || localized(UI.sent), 'ok');
    var el = $('publish-status');
    if (el) {
      try {
        el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      } catch (_) {}
    }
    statusTimer = setTimeout(function () {
      setStatus('', '');
      statusTimer = null;
    }, 5000);
  }

  function workType() {
    var checked = document.querySelector('input[name="workType"]:checked');
    return (checked && checked.value) || 'article';
  }

  function typeList(attr) {
    return String(attr || '')
      .split(',')
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function panelMatchesType(el, type) {
    var notTypes = typeList(el.getAttribute('data-not-type'));
    if (notTypes.length && notTypes.indexOf(type) >= 0) return false;
    var forTypes = typeList(el.getAttribute('data-for-type'));
    if (forTypes.length) return forTypes.indexOf(type) >= 0;
    return true;
  }

  function setPanelActive(el, on) {
    el.hidden = !on;
    el.querySelectorAll('input, textarea, select').forEach(function (field) {
      if (on) field.removeAttribute('disabled');
      else field.setAttribute('disabled', 'disabled');
    });
  }

  function syncTypePanels() {
    var type = workType();
    document.querySelectorAll('[data-for-type], [data-not-type]').forEach(function (panel) {
      setPanelActive(panel, panelMatchesType(panel, type));
    });
  }

  function stepName(i) {
    if (i === 3 && workType() === 'atlas') {
      return { en: 'Credit and notes', az: 'Kredit və qeydlər' };
    }
    return STEP_NAMES[i];
  }

  function currentStepEl() {
    return document.querySelector('.publish-step[data-step="' + step + '"]');
  }

  function validateStep() {
    var panel = currentStepEl();
    if (!panel) return true;
    var fields = panel.querySelectorAll('input, textarea, select');
    for (var i = 0; i < fields.length; i += 1) {
      var field = fields[i];
      if (field.disabled || field.name === 'company_website') continue;
      if (!field.checkValidity()) {
        field.reportValidity();
        setStatus(localized(UI.required), 'err');
        return false;
      }
    }
    setStatus('', '');
    return true;
  }

  function renderReview() {
    var form = $('publish-form');
    var fd = new FormData(form);
    var type = String(fd.get('workType') || 'article');
    var keys;
    if (type === 'book') {
      keys = [
        'workType',
        'contactName',
        'contactEmail',
        'title',
        'authors',
        'year',
        'publisher',
        'bookId',
        'bookFormat',
        'licence',
        'hosting',
        'summary',
        'notes',
      ];
    } else if (type === 'atlas') {
      keys = [
        'workType',
        'contactName',
        'contactEmail',
        'title',
        'authors',
        'year',
        'atlasRegion',
        'modelUrl',
        'modelFormat',
        'licence',
        'hosting',
        'viewerCredit',
        'notes',
      ];
    } else {
      keys = [
        'workType',
        'contactName',
        'contactEmail',
        'title',
        'authors',
        'year',
        'journal',
        'doi',
        'pmid',
        'sourceUrl',
        'licence',
        'hosting',
        'summary',
        'notes',
      ];
    }

    var dl = $('publish-review');
    dl.replaceChildren();
    keys.forEach(function (key) {
      var raw = fd.get(key);
      var value = raw == null || String(raw).trim() === '' ? localized(UI.dash) : String(raw);
      if (key === 'workType') {
        if (value === 'book') {
          value = localized({ en: 'Book / textbook', az: 'Kitab / dərslik' });
        } else if (value === 'atlas') {
          value = localized({ en: '3D atlas structure', az: '3D atlas strukturu' });
        } else {
          value = localized({ en: 'Research article', az: 'Tədqiqat məqaləsi' });
        }
      }
      if (key === 'viewerCredit') {
        value =
          value === 'yes'
            ? localized({
                en: 'Yes — show © name and year in the corner',
                az: 'Bəli — küncdə © ad və il göstərilsin',
              })
            : value === 'no'
              ? localized({ en: 'No — no credit line', az: 'Xeyr — kredit sətri yoxdur' })
              : value;
      }
      var dt = document.createElement('dt');
      dt.textContent = localized(REVIEW_LABELS[key] || { en: key, az: key });
      var dd = document.createElement('dd');
      dd.textContent = value;
      dl.appendChild(dt);
      dl.appendChild(dd);
    });
  }

  function goTo(next) {
    step = Math.max(0, Math.min(TOTAL_STEPS - 1, next));
    document.querySelectorAll('.publish-step').forEach(function (panel) {
      var i = Number(panel.getAttribute('data-step'));
      var on = i === step;
      panel.hidden = !on;
      panel.classList.toggle('is-active', on);
    });

    var progressFill = $('publish-progress-fill');
    if (progressFill) progressFill.style.width = ((step + 1) / TOTAL_STEPS) * 100 + '%';

    var label = $('publish-step-label');
    if (label) label.textContent = fill(UI.stepOf, { n: step + 1, total: TOTAL_STEPS });

    var nameEl = $('publish-step-name');
    if (nameEl) {
      var sn = stepName(step);
      nameEl.setAttribute('data-en', sn.en);
      nameEl.setAttribute('data-az', sn.az);
      nameEl.textContent = localized(sn);
    }

    var back = $('publish-back');
    var nextBtn = $('publish-next');
    var send = $('publish-send');
    if (back) back.hidden = step === 0;
    if (nextBtn) nextBtn.hidden = step === TOTAL_STEPS - 1;
    if (send) send.hidden = step !== TOTAL_STEPS - 1;

    if (step === TOTAL_STEPS - 1) renderReview();

    var shell = document.querySelector('.publish-shell');
    if (shell) shell.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function collectPayload(form) {
    var fd = new FormData(form);
    var type = String(fd.get('workType') || 'article');
    var lines = [
      'NEYRON proposal (manual review required)',
      'Type: ' + type,
      'Submitted: ' + new Date().toISOString(),
      '',
      'Contact name: ' + fd.get('contactName'),
      'Contact email: ' + fd.get('contactEmail'),
      '',
      'Title: ' + fd.get('title'),
      'Authors: ' + fd.get('authors'),
      'Year: ' + fd.get('year'),
    ];

    if (type === 'article') {
      lines.push(
        'Journal: ' + fd.get('journal'),
        'DOI: ' + fd.get('doi'),
        'PMID: ' + fd.get('pmid'),
        'URL: ' + fd.get('sourceUrl'),
      );
    } else if (type === 'atlas') {
      lines.push(
        'Structure / topic: ' + fd.get('atlasRegion'),
        'Model link: ' + fd.get('modelUrl'),
        'Model format: ' + fd.get('modelFormat'),
      );
    } else {
      lines.push(
        'Publisher: ' + fd.get('publisher'),
        'ISBN / URL: ' + fd.get('bookId'),
        'Format: ' + fd.get('bookFormat'),
      );
    }

    lines.push('', 'Licence: ' + fd.get('licence'), 'Hosting preference: ' + fd.get('hosting'), '');

    if (type === 'atlas') {
      lines.push(
        'Show © name/year in viewer corner: ' + fd.get('viewerCredit'),
        '',
        'Notes for reviewer:',
        String(fd.get('notes') || ''),
        '',
        'Rights confirmed: ' + (fd.get('rightsOk') ? 'yes' : 'no'),
        'Understands review-before-publish: ' + (fd.get('reviewOk') ? 'yes' : 'no'),
      );
    } else {
      lines.push(
        'Own-words summary:',
        String(fd.get('summary') || ''),
        '',
        'Notes for reviewer:',
        String(fd.get('notes') || ''),
        '',
        'Rights confirmed: ' + (fd.get('rightsOk') ? 'yes' : 'no'),
        'Understands review-before-publish: ' + (fd.get('reviewOk') ? 'yes' : 'no'),
        'Original summary: ' + (fd.get('summaryOk') ? 'yes' : 'no'),
      );
    }

    return {
      type: type,
      subject: '[NEYRON] ' + type + ' proposal: ' + fd.get('title'),
      body: lines.join('\n'),
      contactEmail: String(fd.get('contactEmail') || ''),
      contactName: String(fd.get('contactName') || ''),
    };
  }

  function sendMailto(payload) {
    var email = String(cfg().REVIEW_EMAIL || '').trim();
    if (!email) {
      setStatus(localized(UI.needEmail), 'err');
      return;
    }
    window.location.href =
      'mailto:' +
      encodeURIComponent(email) +
      '?subject=' +
      encodeURIComponent(payload.subject) +
      '&body=' +
      encodeURIComponent(payload.body);
    setStatus(localized(UI.mailtoHint), 'ok');
  }

  function sendWeb3Forms(payload, form, btn) {
    var key = String(cfg().WEB3FORMS_ACCESS_KEY || '').trim();
    var email = String(cfg().REVIEW_EMAIL || '').trim();
    btn.disabled = true;
    setStatus(localized(UI.sending), 'pending');

    var data = {
      access_key: key,
      subject: payload.subject,
      from_name: payload.contactName || 'NEYRON submitter',
      email: payload.contactEmail,
      message: payload.body,
    };
    if (email) data.to = email;

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res.json().then(function (json) {
          return { ok: res.ok && json.success, json: json };
        });
      })
      .then(function (result) {
        if (!result.ok) throw new Error((result.json && result.json.message) || 'fail');
        form.reset();
        syncTypePanels();
        goTo(0);
        flashSuccess(localized(UI.sent));
      })
      .catch(function () {
        setStatus(localized(UI.err) + ' ' + localized(UI.mailtoHint), 'err');
        sendMailto(payload);
      })
      .finally(function () {
        btn.disabled = false;
      });
  }

  function onSubmit(ev) {
    ev.preventDefault();
    if (step !== TOTAL_STEPS - 1) return;
    if (!validateStep()) return;

    var form = ev.target;
    if (form.querySelector('[name="company_website"]').value) {
      form.reset();
      syncTypePanels();
      goTo(0);
      flashSuccess(localized(UI.sent));
      return;
    }

    var payload = collectPayload(form);
    var btn = $('publish-send');
    var key = String(cfg().WEB3FORMS_ACCESS_KEY || '').trim();
    var email = String(cfg().REVIEW_EMAIL || '').trim();

    if (!email && !key) {
      setStatus(localized(UI.needEmail), 'err');
      return;
    }

    if (key) sendWeb3Forms(payload, form, btn);
    else sendMailto(payload);
  }

  function refreshLangBits() {
    var nameEl = $('publish-step-name');
    if (nameEl) nameEl.textContent = localized(stepName(step));
    var label = $('publish-step-label');
    if (label) label.textContent = fill(UI.stepOf, { n: step + 1, total: TOTAL_STEPS });
    if (step === TOTAL_STEPS - 1) renderReview();
  }

  function init() {
    var form = $('publish-form');
    if (!form) return;

    form.querySelectorAll('input[name="workType"]').forEach(function (radio) {
      radio.addEventListener('change', function () {
        syncTypePanels();
        refreshLangBits();
      });
    });

    $('publish-next').addEventListener('click', function () {
      if (!validateStep()) return;
      goTo(step + 1);
    });
    $('publish-back').addEventListener('click', function () {
      setStatus('', '');
      goTo(step - 1);
    });
    form.addEventListener('submit', onSubmit);

    syncTypePanels();
    goTo(0);
  }

  init();

  window.__neyronAfterSetLang = function () {
    refreshLangBits();
  };
})();
