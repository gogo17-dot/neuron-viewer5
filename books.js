/**
 * NEYRON Book page (neuron-viewer5/book.html).
 *
 * LICENCE RULES (do not loosen without re-checking the source page)
 * ----------------------------------------------------------------
 * licenceTier: 'hostable' | 'link-only'
 *
 * HOSTABLE — only when ALL are true:
 *   1. Explicit redistribution licence on the source (CC BY / BY-SA / BY-NC /
 *      BY-NC-SA, or public domain / CC0), OR the author’s own work.
 *   2. File actually present under public/books/.
 *   3. Attribution string kept on the card + footer list.
 *
 * LINK-ONLY — free-to-read at source, © without redistribution, search-only
 * Bookshelf, or CC confirmed but PDF not yet mirrored here. Never store a
 * local copy for link-only titles.
 *
 * NONCOMMERCIAL (NC) CONSTRAINT
 * Hosted NC titles (Henley, Hedges, OpenStax Behavioral, and any future
 * BY-NC / BY-NC-SA mirrors) mean this site must NOT carry advertising or
 * sell products/services tied to those materials while the files remain.
 * Gray’s Anatomy (1918) is public domain.
 *
 * Button labels are derived from each entry's `licenceTier` field.
 */
(function () {
  function getLang() {
    return document.documentElement.getAttribute('lang') === 'az' ? 'az' : 'en';
  }

  function localized(field) {
    if (!field || typeof field !== 'object') return '';
    var lang = getLang();
    return field[lang] || field.en || '';
  }

  var UI = {
    licence: { en: 'Licence:', az: 'Lisenziya:' },
    chapters: { en: 'Chapters', az: 'Fəsillər' },
    readHere: { en: 'Read here', az: 'Burada oxu' },
    readAtSource: { en: 'Read at source', az: 'Mənbədə oxu' },
  };

  /*
   * Foundations / Intro Neuroscience / OpenStax Behavioral Neuroscience are
   * NonCommercial — no ads or sales while they remain in public/books/.
   */
  var AUTHOR_BOOK = {
    id: 'author-featured',
    licenceTier: 'hostable',
    authorFeatured: true,
    // Open in-browser only — never attach a download attribute.
    allowDownload: false,
    title: 'A Healthy Mind',
    authors: 'Omar Garagozov',
    year: 2026,
    description: {
      en:
        'Most people go through life never truly experiencing the true inner peace and never reaching their peak mental strength that they were meant to acquire. A Healthy Mind explores the science and philosophy behind mental strength, tracing the history of neuroscience to reveal how the brain shapes who we are and how we can reshape it. Through practical exercises (including mindfulness and neuroplasticity techniques), this book guides you toward confidence, and genuine inner peace. Your mind is your power—learn to use it.',
      az:
        'Çoxları həyatı əsl daxili sakitliyi heç vaxt yaşamadan və əldə etməli olduqları zirvə zehni gücə heç vaxt çatmadan keçirirlər. A Healthy Mind zehni gücün arxasındakı elm və fəlsəfəni araşdırır, neyroelm tarixini izləyərək beynin bizi necə formalaşdırdığını və onu necə yenidən formalaşdıra biləcəyimizi göstərir. Praktik məşqlərlə (mindfulness və neyroplastiklik üsulları daxil olmaqla) bu kitab sizi inam və həqiqi daxili sakitliyə yönəldir. Zehniniz sizin gücünüzdür — ondan istifadə etməyi öyrənin.',
    },
    licenceLabel: 'All rights reserved · read on NEYRON',
    attribution: 'A Healthy Mind © Omar Garagozov. All rights reserved. Read on NEYRON (no download).',
    localPath: 'public/books/a-healthy-mind.pdf',
  };

  var LIBRARY_BOOKS = [
    {
      id: 'henley-foundations',
      licenceTier: 'hostable',
      title: 'Foundations of Neuroscience',
      authors: 'Casey Henley, Michigan State University',
      year: 2021,
      description: {
        en: 'An undergraduate introduction to neuron structure, communication, sensory and motor systems, and behaviour. Written for students new to neuroscience, with short chapters and self-check quizzes.',
        az: 'Neyron quruluşu, rabitə, sensor və motor sistemlər, davranış haqqında bakalavr səviyyəli giriş. Neyroelmə yeni olan tələbələr üçün qısa fəsillər və özünü yoxlama sualları ilə.',
      },
      licenceLabel: 'CC BY-NC-SA 4.0',
      attribution:
        'Foundations of Neuroscience © 2021 by Casey Henley, licensed under CC BY-NC-SA 4.0.',
      sourceUrl: 'https://openbooks.lib.msu.edu/neuroscience/',
      localPath: 'public/books/foundations-of-neuroscience.pdf',
    },
    {
      id: 'hedges-intro',
      licenceTier: 'hostable',
      title: 'Introduction to Neuroscience',
      authors: 'Valerie Hedges, Michigan State University',
      year: 2022,
      description: {
        en: 'A clear, classroom-ready open textbook covering core neuroscience concepts for early undergraduates. Builds from cellular foundations toward systems and behaviour.',
        az: 'Erkən bakalavrlar üçün əsas neyroelm anlayışlarını əhatə edən aydın, dərsə uyğun açıq dərslik. Hüceyrə əsaslarından sistem və davranışa doğru qurulub.',
      },
      licenceLabel: 'CC BY-NC-SA',
      attribution:
        'Introduction to Neuroscience © 2022 by Valerie Hedges, licensed under CC BY-NC-SA.',
      sourceUrl: 'https://openbooks.lib.msu.edu/introneuroscience1',
      localPath: 'public/books/introduction-to-neuroscience.pdf',
    },
    {
      id: 'openstax-behavioral',
      licenceTier: 'hostable',
      title: 'Introduction to Behavioral Neuroscience',
      authors:
        'Elizabeth D. Kirby, Melissa J. Glenn, Noah J. Sandstrom & Christina L. Williams (OpenStax)',
      year: 2024,
      description: {
        en: 'OpenStax’s free college textbook on how nervous systems produce behaviour — from molecules and cells to circuits, cognition, and clinical context. Peer-reviewed and designed for introductory courses.',
        az: 'OpenStax-ın sinir sistemlərinin davranışı necə yaratdığı haqqında pulsuz kolleksiya dərsliyi — molekullardan və hüceyrələrdən dövrələrə, idraka və klinik kontekstə. Peer-review olunmuş giriş kursu materialı.',
      },
      licenceLabel: 'CC BY-NC-SA 4.0',
      attribution:
        'Introduction to Behavioral Neuroscience by Kirby, Glenn, Sandstrom & Williams. OpenStax. Access for free at https://openstax.org/books/introduction-behavioral-neuroscience/pages/1-introduction. Licensed under CC BY-NC-SA 4.0.',
      sourceUrl: 'https://openstax.org/details/books/introduction-behavioral-neuroscience',
      localPath: 'public/books/introduction-behavioral-neuroscience.pdf',
    },
    {
      id: 'gray-anatomy',
      licenceTier: 'hostable',
      title: 'Anatomy of the Human Body',
      authors: 'Henry Gray',
      year: 1918,
      description: {
        en: 'The classic Gray’s Anatomy edition on Project Gutenberg — public-domain descriptive anatomy still useful as a historical and structural reference alongside modern atlases.',
        az: 'Project Gutenberg-dəki klassik Gray’s Anatomy nəşri — müasir atlaslarla yanaşı tarixi və struktur istinad kimi faydalı ictimai domendə təsviri anatomiya.',
      },
      licenceLabel: 'Public domain',
      attribution:
        'Anatomy of the Human Body by Henry Gray (1918). Public domain. Project Gutenberg ebook #8172.',
      sourceUrl: 'https://www.gutenberg.org/ebooks/8172',
      localPath: 'public/books/anatomy-of-the-human-body.epub',
    },
    {
      id: 'neuroscience-online',
      licenceTier: 'link-only',
      title: 'Neuroscience Online',
      authors: 'UTHealth Houston, McGovern Medical School',
      year: '—',
      description: {
        en: 'Open-access electronic textbook: cellular, systems, and behavioural neuroscience in modular chapters. © McGovern Medical School — free to read at source; no Creative Commons redistribution licence, so we do not mirror files.',
        az: 'Açıq girişli elektron dərslik: hüceyrə, sistem və davranış neyroelmi modul fəsillərdə. © McGovern Medical School — mənbədə pulsuz oxunur; yenidən yayım üçün CC lisenziyası yoxdur, ona görə faylları güzgüləmirik.',
      },
      licenceLabel: '© free to read at source (not redistributable)',
      attribution:
        'Neuroscience Online © 1997–present, McGovern Medical School at UTHealth, Department of Neurobiology and Anatomy. Linked only; not mirrored.',
      sourceUrl: 'https://nba.uth.tmc.edu/neuroscience/',
    },
    {
      id: 'neuroanatomy-online',
      licenceTier: 'link-only',
      title: 'Neuroanatomy Online',
      authors: 'UTHealth Houston, McGovern Medical School',
      year: '—',
      description: {
        en: 'Companion open-access neuroanatomy laboratory to Neuroscience Online — structures, pathways, and clinical orientation. Same © as Neuroscience Online; link-only.',
        az: 'Neuroscience Online-un açıq girişli neyroanatomiya laboratoriyası — strukturlar, yollar və klinik oriyentasiya. Eyni müəllif hüququ; yalnız keçid.',
      },
      licenceLabel: '© free to read at source (not redistributable)',
      attribution:
        'Neuroanatomy Online © McGovern Medical School at UTHealth, Department of Neurobiology and Anatomy. Linked only; not mirrored.',
      sourceUrl: 'https://nba.uth.tmc.edu/neuroanatomy/',
    },
    {
      id: 'open-neuro-initiative',
      licenceTier: 'link-only',
      title: 'Open Neuroscience Initiative',
      authors: 'Austin Lim, DePaul University',
      year: 2021,
      description: {
        en: 'Undergraduate introductory neuroscience OER (16 chapters). Licence verified: CC BY-NC 4.0 — sharing for non-commercial use is allowed with attribution. Kept link-only here until a clean PDF mirror is added under public/books/; do not host without the NC site rule.',
        az: 'Bakalavr giriş neyroelmi OER (16 fəsil). Lisenziya təsdiqlənib: CC BY-NC 4.0 — qeyri-kommersiya paylaşım atributla icazəlidir. public/books/ altına təmiz PDF güzgü əlavə olunana qədər burada yalnız keçid; NC sayt qaydası olmadan host etməyin.',
      },
      licenceLabel: 'CC BY-NC 4.0 (link until mirrored)',
      attribution:
        'Open Neuroscience Initiative © Austin Lim. Licensed under CC BY-NC 4.0 (https://creativecommons.org/licenses/by-nc/4.0/). Read at source; local mirror deferred.',
      sourceUrl: 'https://www.austinlim.com/open-neuroscience-initiative',
    },
    {
      id: 'leclair-preclinical',
      licenceTier: 'link-only',
      title: 'Neuroscience for Pre-Clinical Students',
      authors: 'Renée J. LeClair (Virginia Tech Carilion School of Medicine)',
      year: 2022,
      description: {
        en: 'Short USMLE-aligned text on neuroenergetics and neurotransmitters (not a full anatomy atlas). Licence verified: CC BY-NC-SA 4.0. Link-only until mirrored; NC+SA rules apply if hosted later.',
        az: 'Neyroenergetika və neyromediatorlar haqqında qısa USMLE uyğun mətn (tam anatomiya atlası deyil). Lisenziya təsdiqlənib: CC BY-NC-SA 4.0. Güzgü olunana qədər yalnız keçid; host edilsə NC+SA qaydaları keçərlidir.',
      },
      licenceLabel: 'CC BY-NC-SA 4.0 (link until mirrored)',
      attribution:
        'LeClair, Renée J. (2022). Neuroscience for Pre-Clinical Students. https://doi.org/10.21061/neuroscience. Licensed under CC BY-NC-SA 4.0. Linked only; local mirror deferred.',
      sourceUrl: 'https://doi.org/10.21061/neuroscience',
    },
    {
      id: 'cobb-biological-basis',
      licenceTier: 'link-only',
      title: 'Biological Basis of Behavior',
      authors: 'Caroline Cobb (Virginia Commonwealth University)',
      year: 2024,
      description: {
        en: 'Graduate-oriented behavioural neuroscience OER: neurons, neuroanatomy methods, drugs and behaviour, rhythms, emotion, learning, and psychopathology. Licence verified: CC BY-NC 4.0 on VCU Pressbooks — link-only; NC site rule if ever mirrored.',
        az: 'Magistr səviyyəli davranış neyroelmi OER: neyronlar, neyroanatomiya metodları, dərman və davranış, ritmlər, emosiyalar, öyrənmə və psixopatologiya. Lisenziya təsdiqlənib: CC BY-NC 4.0 (VCU Pressbooks) — yalnız keçid; güzgü olunsa NC qaydası.',
      },
      licenceLabel: 'CC BY-NC 4.0 (link until mirrored)',
      attribution:
        'Biological Basis of Behavior © 2024 by Caroline Cobb (Amey). Licensed under CC BY-NC 4.0. https://pressbooks.library.vcu.edu/psyc629/ Linked only; local mirror deferred.',
      sourceUrl: 'https://pressbooks.library.vcu.edu/psyc629/',
    },
  ];

  function actionForBook(book) {
    if (book.licenceTier === 'hostable') {
      return {
        label: localized(UI.readHere),
        href: book.localPath || '#',
        external: false,
        // Default hostable titles may download; author book sets allowDownload: false.
        download:
          book.allowDownload !== false &&
          Boolean(book.localPath && book.localPath !== '#'),
      };
    }
    if (book.licenceTier === 'link-only') {
      return {
        label: localized(UI.readAtSource),
        href: book.sourceUrl || '#',
        external: true,
        download: false,
      };
    }
    throw new Error('Unknown licenceTier for book "' + book.id + '": ' + book.licenceTier);
  }

  function renderBookCard(book) {
    var action = actionForBook(book);
    var article = document.createElement('article');
    article.className = 'book-card';
    if (book.placeholder) article.classList.add('book-card--placeholder');
    if (book.authorFeatured) article.classList.add('book-card--author');
    article.dataset.licenceTier = book.licenceTier;
    article.dataset.bookId = book.id;

    var meta = document.createElement('p');
    meta.className = 'book-card__meta';
    meta.textContent = [book.authors, book.year].filter(Boolean).join(' · ');

    var title = document.createElement('h3');
    title.className = 'book-card__title';
    title.textContent = book.title;

    var desc = document.createElement('p');
    desc.className = 'book-card__desc';
    desc.textContent = localized(book.description);

    var licence = document.createElement('p');
    licence.className = 'book-card__licence';
    var licenceLabel = document.createElement('span');
    licenceLabel.className = 'book-card__licence-label';
    licenceLabel.setAttribute('data-en', UI.licence.en);
    licenceLabel.setAttribute('data-az', UI.licence.az);
    licenceLabel.textContent = localized(UI.licence);
    licence.appendChild(licenceLabel);
    licence.appendChild(document.createTextNode(' ' + book.licenceLabel));

    var attribution = document.createElement('p');
    attribution.className = 'book-card__attribution';
    attribution.textContent = book.attribution;

    var actions = document.createElement('div');
    actions.className = 'book-card__actions';
    var link = document.createElement('a');
    link.className = 'book-card__btn';
    link.href = action.href;
    link.textContent = action.label;
    link.setAttribute('data-en', UI.readHere.en);
    link.setAttribute('data-az', UI.readHere.az);
    if (book.licenceTier === 'link-only') {
      link.setAttribute('data-en', UI.readAtSource.en);
      link.setAttribute('data-az', UI.readAtSource.az);
    }
    if (action.external) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    if (action.download) link.setAttribute('download', '');
    if (book.placeholder) {
      link.setAttribute('aria-disabled', 'true');
      link.addEventListener('click', function (ev) {
        ev.preventDefault();
      });
    }
    actions.appendChild(link);

    article.appendChild(meta);
    article.appendChild(title);
    article.appendChild(desc);
    article.appendChild(licence);
    article.appendChild(attribution);
    article.appendChild(actions);

    if (book.chapters && book.chapters.length) {
      var chapWrap = document.createElement('div');
      chapWrap.className = 'book-card__chapters';
      var chapHeading = document.createElement('h4');
      chapHeading.className = 'book-card__chapters-heading';
      chapHeading.setAttribute('data-en', UI.chapters.en);
      chapHeading.setAttribute('data-az', UI.chapters.az);
      chapHeading.textContent = localized(UI.chapters);
      var list = document.createElement('ul');
      book.chapters.forEach(function (ch, i) {
        var li = document.createElement('li');
        var a = document.createElement('a');
        a.href = '#';
        a.className = 'book-card__chapter-link';
        a.textContent = localized(ch);
        a.dataset.chapterIndex = String(i);
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
        });
        li.appendChild(a);
        list.appendChild(li);
      });
      chapWrap.appendChild(chapHeading);
      chapWrap.appendChild(list);
      article.appendChild(chapWrap);
    }

    return article;
  }

  function renderLists() {
    var authorRoot = document.getElementById('author-books');
    var libraryRoot = document.getElementById('library-books');
    var attrRoot = document.getElementById('books-attributions');
    if (!authorRoot || !libraryRoot || !attrRoot) return;

    authorRoot.replaceChildren(renderBookCard(AUTHOR_BOOK));
    libraryRoot.replaceChildren.apply(
      libraryRoot,
      LIBRARY_BOOKS.map(renderBookCard),
    );

    var all = [AUTHOR_BOOK].concat(LIBRARY_BOOKS);
    attrRoot.replaceChildren.apply(
      attrRoot,
      all.map(function (book) {
        var li = document.createElement('li');
        li.textContent = book.attribution;
        return li;
      }),
    );
  }

  function refreshDynamicStrings() {
    var byId = {};
    byId[AUTHOR_BOOK.id] = AUTHOR_BOOK;
    LIBRARY_BOOKS.forEach(function (b) {
      byId[b.id] = b;
    });

    document.querySelectorAll('.book-card[data-book-id]').forEach(function (card) {
      var book = byId[card.dataset.bookId];
      if (!book) return;
      var desc = card.querySelector('.book-card__desc');
      if (desc) desc.textContent = localized(book.description);
      var licenceLabel = card.querySelector('.book-card__licence-label');
      if (licenceLabel) licenceLabel.textContent = localized(UI.licence);
      var btn = card.querySelector('.book-card__btn');
      if (btn) btn.textContent = actionForBook(book).label;
      var chapHeading = card.querySelector('.book-card__chapters-heading');
      if (chapHeading) chapHeading.textContent = localized(UI.chapters);
      card.querySelectorAll('.book-card__chapter-link').forEach(function (a) {
        var idx = Number(a.dataset.chapterIndex);
        if (book.chapters && book.chapters[idx]) {
          a.textContent = localized(book.chapters[idx]);
        }
      });
    });
  }

  renderLists();
  window.__neyronAfterSetLang = function () {
    refreshDynamicStrings();
  };
})();
