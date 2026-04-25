import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { PART_DESCRIPTIONS } from "./partDescriptions.js";

const PART_DESCRIPTIONS_AZ = {
  Soma: {
    name: "Soma",
    desc: "Soma (hüceyrə gövdəsi, perikaryon) nüvəni və biosintetik orqanelllərin çoxunu saxlayan neyron hissəsidir. Əsas funksiyası dendritlərdən gələn elektrik və biokimyəvi siqnalları inteqrasiya etmək, hüceyrəni saxlamaq və bütün neyron üçün zülal və membran təchizatıdır. İşıq mikroskopiyasında soma diametri hüceyrə tipindən asılıdır: məsələn kiçik serebellar granula hüceyrələrində təxminən 5–8 mikrometr, bir çox kortikal piramidal somalarda təxminən 10–30 mikrometr, iri motor və ya Purkinje neyronlarında isə istisna hallarda təxminən 100 mikrometrə yaxın və ya daha böyük ölçülərə çata bilər. Standart tək ölçü yoxdur, çünki forma dövrə roluna uyğunlaşır. Transkripsiya və translasyon metabolik yükünün böyük hissəsi somada cəmləndiyi üçün soma sinaptik gücün uzunmüddətli dəyişiklikləri ilə sıx bağlıdır.",
  },
  Nucleus: {
    name: "Nüvə",
    desc: "Nüvə genomu saxlayır və transkripsiyanı aparır: DNT-RNT, RNT emalı və sitoplazmaya translasyon üçün ixrac. Neyronlarda nüvə adətən dairəvi və ya ovaldır; bir çox orta ölçülü mərkəzi neyronlarda diametri təxminən 5–10 mikrometr səviyyəsindədir, iri neyronlarda isə daha böyük ola bilər (təxminən 15–20 mikrometrə qədər və daha böyük nüvələr mümkündür). Nüvə zarı transkripsiya və splicingi sitoplazmadakı translasyondan ayırır. Beynin çox regionlarında yetkin neyronlar postmitotik olduğundan nüvə bölünməyə hazırlaşmır; əksinə, plastislik, təmir və metabolizmi onilliklər boyu dəstəkləyən gen ifadə proqramlarını davam etdirir. Xromatin quruluşu fəaliyyət və təcrübəyə cavab verir.",
  },
  Dendrites: {
    name: "Dendritlər",
    desc: "Dendritlər budaqlı proseslərdir və əksər excitator və inhibitor sinaptik girişi qəbul edib siqnalları soma və akson ilkin seqmentinə yönləndirir. Somaya yaxın proximal dendrit çöhrəsi adətən təxminən 1–5 mikrometr qalınlığında olur, sonra incə distal budaqlara keçir ki, eni bir mikrometrdən az ola bilər. Tək dendritik ağac neyron tipindən asılı olaraq onlarla mikrometrdən təxminən millimetrə qədər və ya daha çox məsafəni əhatə edə bilər. Funksional olaraq dendritlər sinaptik potensialların passiv yayılmasını aparır, bir çox hüceyrədə isə aktiv gücləndirmə (dendrit spike, gərginliyə həssas kanallar) ilə girişin yeri və zamanı çıxışa təsir edir. Minlərlə yığılan sinaps üçün əsas anatomik substratdırlar.",
  },
  "Dendritic Spine": {
    name: "Dendritik Tikan",
    desc: "Dendritik tikan dendrit çöhrəsindən çıxan kiçik postsinaptik çıxıntıdır və adətən başında bir excitator sinaps daşıyır. Memalıların korteksi və hipokampusunda elektron mikroskopiya ilə ölçüləndə tikan başının diametri adətən təxminən 0.5–1.0 mikrometr (tikan sinfinə görə dəyişir), boyunun diametri təxminən 0.05–0.3 mikrometr, boyunun uzunluğu isə incə, göbələk və ya qısa formadan asılı olaraq təxminən 0.05–2 mikrometr aralığında olur. Boyun biokimyəvi və elektrik “boğazı” rolunu oynayır: baş kompartimentində kalsium və siqnal molekulları bütün dendritlə dərhal tarazlanmır. Fəaliyyətə cavab olaraq tikalar yenidən qurulur; ona görə də öyrənmə və yaddaşın sinaptik modellərində mərkəzi yer tuturlar.",
  },
  "Axon Hillock": {
    name: "Akson Təpəciyi",
    desc: "Akson təpəciyi somanın aksona keçdiyi daralan zonadır. Funksional olaraq dərhal aşağı axındakı akson ilkin seqmentlə birlikdə işləyir; burada gərginliyə həssas natrium kanallarının çox yüksək sıxlığı olduğuna görə adətən aksiyon potensialları məhz burada başlanır. Təpəcik və ilkin seqment birlikdə bir çox hüceyrə tipində akson boyu təxminən onlarla mikrometr məsafəni əhatə edir (ilkin seqmentin uzunluğu üçün təxminən 20–100 mikrometr aralığı tez-tez göstərilir, hüceyrədən asılıdır). Bu bölgənin vəzifəsi dendrit və somadan gələn ümumi sinaptik sürünməni hədd ilə müqayisə etmək və hədd keçəndə regenerativ natrium spike-i başlatmaqdır. Burada və ya ilkin seqmentdə həddin aşağı düşməsi hiperexcitabilitəyə töhfə verə bilər.",
  },
  Axon: {
    name: "Akson",
    desc: "Akson başlanğıc zonasından presinaptik terminala qədər aksiyon potensiallarının sürətli və etibarlı ötürülməsi üçün ixtisaslaşmış tək uzun prosesdir. Uzunluq yerli interneyronlarda millimetrin altından insanın aşağı motor neyronunda onurğadan əzələyə qədər bir metrdən çoxa qədər dəyişir. Diametr də geniş aralıqdadır: iri mielinli periferik motor aksonları təxminən 10–20 mikrometr səviyyəsində ola bilər, bir çox kortikal aksonlar isə adətən submikrometr ilə bir neçə mikrometr arasında olur. Ötürülmə sürəti diametr və mielinləşmə ilə artır; mielinli liflər saniyədə onlarla metr səviyyəsində keçirə bilər, nazik mielinsiz C lifləri isə yavaşdır. Akson həmçinin mikrotubullar boyu orqanelle, mRNK və membran zülallarını hər iki istiqamətdə daşıyır.",
  },
  "Myelin Sheath": {
    name: "Mielin Qılafı",
    desc: "Periferik sinir sistemində mielin qılafı Şvan hüceyrəsinin membranlarının akson seqmenti ətrafında konsentrik bükülməsindən yaranan, lipidlərlə zəngin və sıxılmış zülallar (məsələn mielin zülalı sıfır) təbəqəsidir. Bir mielinləşdirici Şvan hüceyrəsi adətən bir internodal seqmenti əhatə edir; insan periferik sinirində internodal uzunluq lif sinfindən asılı olaraq təxminən yüzlərlə mikrometrdən bir neçə millimetrə qədər ola bilər. Qılaf altındakı akson membranını elektrik cəhətdən izolyasiya edir ki, aksiyon potensialı həmin məsafə boyu fasiləsiz yenilənməsin. Bu, bir vahid uzunluq üçün tutumu azaldır və Ranvye düyünləri arasında saltator keçiriciliyə imkan verir — oxşar xarici diametrli mielinsiz liflə müqayisədə sürəti və enerji səmərəliliyini böyük artırır. Demielinizasiya xəstəlikləri bu geometriyanı pozur.",
  },
  "Node of Ranvier": {
    name: "Ranvye Düyünü",
    desc: "Ranvye düyünü iki mielin internodu arasında akson plazma membranının açıq qaldığı və gərginliyə həssas natrium kanallarının (və digər kanalların) sıx yığın olduğu qısa boşluqdur. Lif boyu üzrə hər düyünün uzunluğu adətən təxminən 0.5–2 mikrometr aralığındadır (növ və lif tipindən asılıdır). Gələn aksiyon potensialı düyünü kifayət qədər depolarizasiya edir ki, növbəti internoda elektrotonik yayılma ilə növbəti düyündə yenidən spike başlatsın; bu ardıcıl regenerasiya saltator keçiricilikdir. Düyünlər dekorativ boşluq deyil, dalğanın aktiv bərpa stansiyalarıdır. Nodal kanal klastrları və ya paranodal birləşmələr pozulsa, keçiricilik bloklana və ya kəsik-kəsik ola bilər.",
  },
  "Axon Terminal": {
    name: "Akson Terminası",
    desc: "Akson terminası aksonun (və ya budağının) sonunda gələn aksiyon potensialını nörotransmitter ifrazına çevirən presinaptik ixtisaslaşmadır. Terminallar tez-tez şişkinlik zəncirləri kimi təşkil olunur; mərkəzi dövrələrdə tək sinaptik düymələr adətən təxminən 1–5 mikrometr enində olur, əlaqə tipindən asılı olaraq geniş yayılır. İçəridə sinaptik vezikullar (onlarla nanometr diametr), aktiv zona aparatı, mitoxondriumlar və kalsium kanalları var. Aksiyon potensialı daxil olanda gərginliyə həssas kalsium kanalları açılır, lokal kalsium mikrosaniyə–millisaniyə miqyasında artır və vezikullar aktiv zonada birləşərək yarığa transmitter buraxır. Çox neyronlar hədəflərinə məhz bu kimyəvi siqnalla birləşir.",
  },
  "Synaptic Bouton": {
    name: "Sinaptik Düymə",
    desc: "Sinaptik düymə postsinaptik tərəflə aralarında dar sinaptik yarıq (mərkəzi sinapslarda tez-tez onlarla nanometr eni) olan soğanabənzər presinaptik sonlanmadır. Düymələr nörotransmitteri sinaptik vezikullarda saxlayır (klassik kiçik şəffaf vezikullar adətən onlarla nanometr diametrindədir) və onları postsinaptik reseptorların qarşısında düzülmüş zülallı aktiv zona membranına yerləşdirir. Tək akson bir neçədən minlərlə düyməyə qədər sinaps yarada bilər. Hər düymə vezikul hovuzları və kalsium dinamikası əsasında öz qısamüddətli plastisliyini (facilitasiya, depressiya) idarə edə bilər; ona görə neyron vahid çıxış qurğusu deyil, yayılmış ifrazə məntəqələri şəbəkəsidir.",
  },
  Mitochondria: {
    name: "Mitoxondriya",
    desc: "Mitoxondriumlar xarici və daxili membranlı orqanellelərdir; oksidativ fosforilasiya ilə ATP bərpa edir, həmçinin kalsium idarəçiliyi, lipid metabolizmi və siqnal yollarında iştirak edir. Neyronlarda adətən uzunsov olur və metabolik tələbatla uyğunlaşmaq üçün dendrit və aksonlar boyu daşınır; toxuma şəkillərində uzunluq təxminən 0.5–5 mikrometr, en isə orientasiya və füzyon-fissiya vəziyyətindən asılı olaraq adətən submikrometrdən təxminən bir mikrometrə qədər olur. Beyin bədənin istirahət qlükozasının böyük hissəsini istehlak edir; mitoxondriumlar ion nasosu, vezikul dövrü və sitoskelet daşınması üçün ATP təmin edir. Disfunksiya və ya keyfiyyət nəzarətinin pozulması bir çox neyrodegenerativ vəziyyətlərlə əlaqələndirilir.",
  },
  "Nissl Body": {
    name: "Nissl Cisimciyi",
    desc: "Nissl cisimcikləri soma və proximal dendritlərdə bazofil topaclar kimi görünür və ribosomlarla örtülü kobud endoplazmatik retikulum yığınları ilə sərbəst polisomlara uyğun gəlir. Ayrıca orqanelle kimi tək sabit “uzunluq və en” yoxdur, çünki paylanmış fabriklərdir: bir-birinə qarışmış bir çox RER sisternası və Golji zonası. Onların funksiyası keçiricilik, reseptorlar, struktur zülalları və neyroötürülmə ilə plastislik üçün zülal sintezidir. Akson zədələnməsindən sonra Nissl maddəsinin nizamlı paylanması xromatolizdə dağıla bilər; bu, hüceyrənin stres və təmir proqramlarına keçdiyinin sitoloji əlamətidir.",
  },
  "Schwann Cell": {
    name: "Şvan Hüceyrəsi",
    desc: "Şvan hüceyrələri periferik sinir sisteminin mielinləşdirici qliyasıdır. Bir mielinləşdirici Şvan hüceyrəsi adətən bir aksonun bir seqmentini sarıyır və akson boyu üzrə mielin internodu yaradır; internodal uzunluq lif kalibrindən asılı olaraq təxminən yüzlərlə mikrometrdən təxminən millimetrə qədər ola bilər. Hüceyrə gövdəsinin ölçüsü təxminən onlarla mikrometr səviyyəsindədir. Şvan hüceyrələri membranı akson ətrafında çox bükür və kompakt mielin üçün bükülmələr arası sitoplazmanı istisna edir. Kiçik aksonları sarmayan mielinsiz örtücü Şvan hüceyrələri də var. Periferik sinir əzməsi və ya kəsilməsindən sonra Şvan hüceyrələri zədələri təmizləməyə, bazal membran izlərinə və trofik siqnallarla regrowth-a kömək edir; buna görə də bir çox mərkəzi aksonlardan yaxşı periferik regenerasiya mümkün olur.",
  },
};

const panel = document.getElementById("info-panel");
const panelName = document.getElementById("panel-name");
const panelDesc = document.getElementById("panel-desc");
const closeBtn = document.getElementById("panel-close");

/** Part key for the open info panel — keeps hover tooltip text in sync when picking through (double-click). */
let panelOpenPickLabel = null;

if (closeBtn && panel) {
  closeBtn.addEventListener("click", () => {
    panel.style.right = "-320px";
    panelOpenPickLabel = null;
  });
}

let currentLang = "en";

function setLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang === "az" ? "az" : "en";

  const descriptions = lang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
  /** Prefer the mesh key from the last click (incl. double-click depth) so title + body stay aligned. */
  if (panelOpenPickLabel && panelName && panelDesc) {
    const data = descriptions[panelOpenPickLabel];
    if (data) {
      panelName.textContent = data.name;
      panelDesc.textContent = data.desc;
    }
  } else {
    const currentName = panelName ? panelName.textContent : "";
    if (currentName && panelName && panelDesc) {
      for (const key in PART_DESCRIPTIONS) {
        if (
          PART_DESCRIPTIONS[key].name === currentName ||
          PART_DESCRIPTIONS_AZ[key]?.name === currentName
        ) {
          const data = descriptions[key];
          if (data) {
            panelName.textContent = data.name;
            panelDesc.textContent = data.desc;
          }
          break;
        }
      }
    }
  }
  if (panelOpenPickLabel) {
    const tip = document.querySelector(".neyron-hover-tooltip");
    if (tip) {
      tip.textContent = tooltipNames[lang][panelOpenPickLabel] || panelOpenPickLabel;
    }
  }
  document.querySelectorAll(".neuron-atlas-chrome [data-en][data-az]").forEach(function (el) {
    el.textContent = lang === "az" ? el.getAttribute("data-az") : el.getAttribute("data-en");
  });
}

window.setLang = setLang;

const tooltipNames = {
  en: {
    Soma: "Soma",
    Nucleus: "Nucleus",
    Dendrites: "Dendrites",
    "Dendritic Spine": "Dendritic Spine",
    "Axon Hillock": "Axon Hillock",
    Axon: "Axon",
    "Myelin Sheath": "Myelin Sheath",
    "Node of Ranvier": "Node of Ranvier",
    "Axon Terminal": "Axon Terminal",
    "Synaptic Bouton": "Synaptic Bouton",
    Mitochondria: "Mitochondria",
    "Nissl Body": "Nissl Body",
    "Schwann Cell": "Schwann Cell",
  },
  az: {
    Soma: "Soma",
    Nucleus: "Nüvə",
    Dendrites: "Dendritlər",
    "Dendritic Spine": "Dendritik Tikan",
    "Axon Hillock": "Akson Təpəciyi",
    Axon: "Akson",
    "Myelin Sheath": "Mielin Qılafı",
    "Node of Ranvier": "Ranvye Düyünü",
    "Axon Terminal": "Akson Terminası",
    "Synaptic Bouton": "Sinaptik Düymə",
    Mitochondria: "Mitoxondriya",
    "Nissl Body": "Nissl Cisimciyi",
    "Schwann Cell": "Şvan Hüceyrəsi",
  },
};

/** Matches NEYRON opening hero neuron (day). */
const NEYRON_DAY_PHYS = {
  color: 0xc93840,
  emissive: 0x501820,
  emissiveIntensity: 0.26,
  roughness: 0.34,
  metalness: 0.52,
  clearcoat: 0.16,
  clearcoatRoughness: 0.42,
};

const nightMaterialSnapshots = new WeakMap();

function snapshotMaterialState(m) {
  if (m.isMeshPhysicalMaterial) {
    return {
      t: "physical",
      color: m.color.getHex(),
      emissive: m.emissive.getHex(),
      emissiveIntensity: m.emissiveIntensity,
      roughness: m.roughness,
      metalness: m.metalness,
      clearcoat: m.clearcoat,
      clearcoatRoughness: m.clearcoatRoughness,
      sheen: m.sheen,
      sheenColor: m.sheenColor.getHex(),
      sheenRoughness: m.sheenRoughness,
      transparent: m.transparent,
      opacity: m.opacity,
      transmission: m.transmission,
      ior: m.ior,
      thickness: m.thickness,
      depthWrite: m.depthWrite,
      side: m.side,
    };
  }
  if (m.isMeshBasicMaterial) {
    return { t: "basic", color: m.color.getHex(), opacity: m.opacity, transparent: m.transparent };
  }
  return null;
}

function restoreMaterialState(m, snap) {
  if (!snap) return;
  if (snap.t === "physical" && m.isMeshPhysicalMaterial) {
    m.color.setHex(snap.color);
    m.emissive.setHex(snap.emissive);
    m.emissiveIntensity = snap.emissiveIntensity;
    m.roughness = snap.roughness;
    m.metalness = snap.metalness;
    m.clearcoat = snap.clearcoat;
    m.clearcoatRoughness = snap.clearcoatRoughness;
    if (snap.sheen !== undefined) {
      m.sheen = snap.sheen;
      m.sheenColor.setHex(snap.sheenColor);
      m.sheenRoughness = snap.sheenRoughness;
    }
    m.transparent = snap.transparent;
    m.opacity = snap.opacity;
    m.transmission = snap.transmission;
    m.ior = snap.ior;
    m.thickness = snap.thickness;
    m.depthWrite = snap.depthWrite;
    m.side = snap.side;
  } else if (snap.t === "basic" && m.isMeshBasicMaterial) {
    m.color.setHex(snap.color);
    m.opacity = snap.opacity;
    m.transparent = snap.transparent;
  }
}

function applyDayPhysicalHeroLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(NEYRON_DAY_PHYS.color);
  m.emissive.setHex(NEYRON_DAY_PHYS.emissive);
  m.emissiveIntensity = NEYRON_DAY_PHYS.emissiveIntensity;
  m.roughness = NEYRON_DAY_PHYS.roughness;
  m.metalness = NEYRON_DAY_PHYS.metalness;
  m.clearcoat = NEYRON_DAY_PHYS.clearcoat;
  m.clearcoatRoughness = NEYRON_DAY_PHYS.clearcoatRoughness;
  m.transmission = 0;
  if (m.opacity < 0.98) {
    m.transparent = true;
    m.opacity = 0.28;
    m.depthWrite = false;
  } else {
    m.opacity = 1;
    m.transparent = false;
    m.depthWrite = true;
  }
}

/** NEYRON day accent — dendrites & spines (matches hero orange tone). */
const NEYRON_DAY_DENDRITE = {
  color: 0xe05a10,
  emissive: 0x502208,
  emissiveIntensity: 0.34,
  roughness: 0.34,
  metalness: 0.48,
  clearcoat: 0.18,
  clearcoatRoughness: 0.4,
};

function applyDayDendriteSpineLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(NEYRON_DAY_DENDRITE.color);
  m.emissive.setHex(NEYRON_DAY_DENDRITE.emissive);
  m.emissiveIntensity = NEYRON_DAY_DENDRITE.emissiveIntensity;
  m.roughness = NEYRON_DAY_DENDRITE.roughness;
  m.metalness = NEYRON_DAY_DENDRITE.metalness;
  m.clearcoat = NEYRON_DAY_DENDRITE.clearcoat;
  m.clearcoatRoughness = NEYRON_DAY_DENDRITE.clearcoatRoughness;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Node of Ranvier — day: periwinkle / blue-violet (pops vs yellow myelin + teal axon). */
function applyDayRanvierSilkLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0x5c68e8);
  m.emissive.setHex(0x1c1a48);
  m.emissiveIntensity = 0.34;
  m.roughness = 0.2;
  m.metalness = 0.4;
  m.clearcoat = 0.72;
  m.clearcoatRoughness = 0.16;
  m.sheen = 0.55;
  m.sheenColor.setHex(0xe4e8ff);
  m.sheenRoughness = 0.34;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/**
 * Axon + terminal branches (day) — deep teal/cyan complements dendrite orange;
 * slight warm emissive ties the palette without matching orange.
 */
function applyDayAxonLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0x1a6d78);
  m.emissive.setHex(0x5c3818);
  m.emissiveIntensity = 0.24;
  m.roughness = 0.24;
  m.metalness = 0.42;
  m.clearcoat = 0.68;
  m.clearcoatRoughness = 0.2;
  m.sheen = 0.42;
  m.sheenColor.setHex(0xbee8ea);
  m.sheenRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Myelin sheaths — saturated yellow, distinct from axon / gold nodes (day). */
function applyDayMyelinYellowLook(m) {
  if (!m.isMeshPhysicalMaterial) return;
  m.color.setHex(0xefd21a);
  m.emissive.setHex(0x5a4a08);
  m.emissiveIntensity = 0.34;
  m.roughness = 0.3;
  m.metalness = 0.22;
  m.clearcoat = 0.58;
  m.clearcoatRoughness = 0.2;
  m.sheen = 0.4;
  m.sheenColor.setHex(0xfff6b8);
  m.sheenRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

/** Nucleus / mitochondria / Nissl inside translucent soma — not hero red (day). */
function applyDaySomaInteriorLook(m, lab) {
  if (!m.isMeshPhysicalMaterial) return;
  if (lab === "Nucleus") {
    m.color.setHex(0x3a58d8);
    m.emissive.setHex(0x182a70);
    m.emissiveIntensity = 0.52;
  } else if (lab === "Mitochondria") {
    m.color.setHex(0xe83848);
    m.emissive.setHex(0x601018);
    m.emissiveIntensity = 0.48;
  } else if (lab === "Nissl Body") {
    m.color.setHex(0x9b40cc);
    m.emissive.setHex(0x381058);
    m.emissiveIntensity = 0.5;
  } else {
    applyDayPhysicalHeroLook(m);
    return;
  }
  m.roughness = 0.38;
  m.metalness = 0.42;
  m.clearcoat = 0.22;
  m.clearcoatRoughness = 0.42;
  m.transmission = 0;
  m.opacity = 1;
  m.transparent = false;
  m.depthWrite = true;
}

window.addEventListener("message", (e) => {
  const d = e.data;
  if (!d || d.source !== "neyron-parent") return;
  if (d.type === "theme" && (d.theme === "day" || d.theme === "night")) {
    if (typeof window.__neuronAtlasApplyTheme === "function") {
      window.__neuronAtlasApplyTheme(d.theme);
    }
  }
  if (d.type === "lang" && (d.lang === "en" || d.lang === "az")) {
    setLang(d.lang);
  }
});

function random(a, b) {
  return a + Math.random() * (b - a);
}

function lerpVec(a, b, t) {
  return a.clone().lerp(b, t);
}

/** First labeled ancestor (same chain `userData.label` uses for picking). */
function findRootLabelMesh(obj) {
  let o = obj;
  while (o) {
    if (o.userData && o.userData.label) {
      return o;
    }
    o = o.parent;
  }
  return null;
}

/** One ray entry per distinct labeled object (drops duplicate front/back hits on the same mesh). */
function buildOrderedUniqueLabelHits(intersections) {
  const out = [];
  let lastRoot = null;
  for (let i = 0; i < intersections.length; i++) {
    const rootM = findRootLabelMesh(intersections[i].object);
    if (!rootM) {
      continue;
    }
    if (rootM === lastRoot) {
      continue;
    }
    out.push(intersections[i]);
    lastRoot = rootM;
  }
  return out;
}

/**
 * Tube along curve with radius linearly interpolated from r0 to r1 over arc length.
 * @param innerTubeSegments subdivisions along each short chord (higher = smoother joins)
 */
function createTaperedTubeGeometry(
  curve,
  tubularSegments,
  r0,
  r1,
  radialSegments,
  innerTubeSegments = 4
) {
  const geoms = [];
  for (let i = 0; i < tubularSegments; i++) {
    const u0 = i / tubularSegments;
    const u1 = (i + 1) / tubularSegments;
    const p0 = curve.getPointAt(u0);
    const p1 = curve.getPointAt(u1);
    const rad0 = r0 + (r1 - r0) * u0;
    const rad1 = r0 + (r1 - r0) * u1;
    const seg = new THREE.LineCurve3(p0, p1);
    const midR = (rad0 + rad1) * 0.5;
    const g = new THREE.TubeGeometry(seg, innerTubeSegments, midR, radialSegments, false);
    geoms.push(g);
  }
  return mergeGeometries(geoms);
}

function init() {
  const root = document.getElementById("root");
  if (!root) return;
  root.innerHTML = "";
  const wrap = document.createElement("div");
  wrap.className = "neuron-scene";
  root.appendChild(wrap);

  const tooltip = document.createElement("div");
  tooltip.className = "neyron-hover-tooltip";
  tooltip.style.cssText = `
    position: fixed;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.35);
    color: #ffffff;
    font-family: monospace;
    font-size: 11px;
    letter-spacing: 0.15em;
    padding: 5px 12px;
    border-radius: 4px;
    pointer-events: none;
    display: none;
    text-transform: uppercase;
    z-index: 200;
  `;
  document.body.appendChild(tooltip);

  const scene = new THREE.Scene();
  const nightBg = 0x000000;
  scene.background = new THREE.Color(nightBg);
  const fog = new THREE.FogExp2(nightBg, 0.008);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );
  camera.position.set(0, 2, 16);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  wrap.appendChild(renderer.domElement);

  renderer.domElement.addEventListener("click", (e) => {
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    const clickRaycaster = new THREE.Raycaster();
    clickRaycaster.setFromCamera(mouse, camera);

    const allMeshes = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.userData.label) {
        allMeshes.push(obj);
      }
    });

    const hits = clickRaycaster.intersectObjects(allMeshes, false);

    if (hits.length > 0) {
      const stack = buildOrderedUniqueLabelHits(hits);
      if (stack.length === 0) {
        return;
      }
      /** `e.detail`: 1 = front hit, 2+ = next distinct labeled object along the ray (double-click). */
      const detail = e.detail || 1;
      const pickIndex =
        stack.length === 1 ? 0 : (detail - 1) % stack.length;
      const rootPick = findRootLabelMesh(stack[pickIndex].object);
      const label = rootPick ? rootPick.userData.label : null;
      if (!label) {
        return;
      }
      const descriptions = currentLang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
      const data = descriptions[label];
      if (data && panel && panelName && panelDesc) {
        panelOpenPickLabel = label;
        panelName.textContent = data.name;
        panelDesc.textContent = data.desc;
        panel.style.right = "max(12px, env(safe-area-inset-right, 0px))";
      }
    }
  });

  /** Native double-click: pick second distinct structure along ray (same as 2nd click `detail`). */
  renderer.domElement.addEventListener("dblclick", (e) => {
    const mouse = new THREE.Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );
    const cr = new THREE.Raycaster();
    cr.setFromCamera(mouse, camera);
    const pickMeshes = [];
    scene.traverse((obj) => {
      if (obj.isMesh && obj.userData.label) {
        pickMeshes.push(obj);
      }
    });
    const dh = cr.intersectObjects(pickMeshes, false);
    if (!dh.length) return;
    const st = buildOrderedUniqueLabelHits(dh);
    if (st.length < 2) return;
    const root2 = findRootLabelMesh(st[1].object);
    const lab2 = root2 ? root2.userData.label : null;
    if (!lab2) return;
    const descriptions2 = currentLang === "en" ? PART_DESCRIPTIONS : PART_DESCRIPTIONS_AZ;
    const data2 = descriptions2[lab2];
    if (data2 && panel && panelName && panelDesc) {
      panelOpenPickLabel = lab2;
      panelName.textContent = data2.name;
      panelDesc.textContent = data2.desc;
      panel.style.right = "max(12px, env(safe-area-inset-right, 0px))";
    }
  });

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.35;
  if ("enableDollyOnDoubleClick" in controls) {
    controls.enableDollyOnDoubleClick = false;
  }
  controls.mouseButtons = {
    LEFT: THREE.MOUSE.ROTATE,
    MIDDLE: THREE.MOUSE.DOLLY,
    RIGHT: THREE.MOUSE.PAN,
  };

  const neuronGroup = new THREE.Group();
  scene.add(neuronGroup);

  const rayMeshes = [];

  function registerLabel(mesh, label) {
    mesh.userData.label = label;
    rayMeshes.push(mesh);
  }

  // --- 1. SOMA ---
  const somaGeom = new THREE.SphereGeometry(1.2, 48, 48);
  const posAttr = somaGeom.attributes.position;
  for (let i = 0; i < posAttr.count; i++) {
    const x = posAttr.getX(i);
    const y = posAttr.getY(i);
    const z = posAttr.getZ(i);
    const noise = 1 + 0.07 * Math.sin(x * 4) * Math.cos(y * 3.7) * Math.sin(z * 5);
    posAttr.setXYZ(i, x * noise, y * noise, z * noise);
  }
  posAttr.needsUpdate = true;
  somaGeom.computeVertexNormals();

  const soma = new THREE.Mesh(somaGeom);
  soma.material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x2de89a),
    emissive: new THREE.Color(0x000000),
    emissiveIntensity: 0,
    roughness: 0.0,
    metalness: 0.0,
    transmission: 0.95,
    thickness: 0.3,
    ior: 1.2,
    transparent: true,
    opacity: 0.3,
    side: THREE.DoubleSide,
    depthWrite: false,
    clearcoat: 0.0,
  });
  soma.material.color.set(0x1a6b52);
  soma.material.emissive = new THREE.Color(0x3a1510);
  soma.material.transmission = 0.6;
  soma.material.opacity = 0.45;
  soma.material.depthWrite = false;
  soma.material.side = THREE.DoubleSide;
  neuronGroup.add(soma);
  registerLabel(soma, "Soma");

  const somaInteriorLight = new THREE.PointLight(0x7ecfb3, 1.5, 3);
  somaInteriorLight.position.set(0, 0, 0);
  neuronGroup.add(somaInteriorLight);

  // --- 2. NUCLEUS ---
  const nucleusGeom = new THREE.SphereGeometry(0.48, 24, 24);
  const nucleusMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x5577ee),
    emissive: new THREE.Color(0x1a2860),
    emissiveIntensity: 0.85,
    transparent: true,
    opacity: 0.92,
  });
  const nucleus = new THREE.Mesh(nucleusGeom, nucleusMat);
  nucleus.position.set(0.05, 0.05, 0);
  nucleus.renderOrder = 1;
  neuronGroup.add(nucleus);
  registerLabel(nucleus, "Nucleus");

  const mitoBodyMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf06068),
    emissive: new THREE.Color(0x701018),
    emissiveIntensity: 0.58,
    roughness: 0.45,
  });
  const mitoCristaMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf06068),
    emissive: new THREE.Color(0x601010),
    emissiveIntensity: 0.45,
    roughness: 0.45,
  });

  function makeMitochondrionMesh() {
    const body = new THREE.SphereGeometry(0.12, 12, 12);
    body.scale(1, 0.5, 0.5);
    const numCristae = Math.random() < 0.5 ? 2 : 3;
    const cristaOffsets = [
      [0.065, 0.01, 0.025],
      [-0.055, 0.035, -0.02],
      [0.015, -0.045, 0.035],
    ];
    const parts = [body];
    for (let i = 0; i < numCristae; i++) {
      const cg = new THREE.SphereGeometry(0.04, 6, 6);
      cg.scale(0.85, 0.4, 1.1);
      cg.translate(cristaOffsets[i][0], cristaOffsets[i][1], cristaOffsets[i][2]);
      parts.push(cg);
    }
    const merged = mergeGeometries(parts, true);
    const mats = [mitoBodyMat];
    for (let i = 0; i < numCristae; i++) mats.push(mitoCristaMat);
    return new THREE.Mesh(merged, mats);
  }

  const mitoConfigs = [
    { pos: new THREE.Vector3(-0.5, 0.3, 0.2), scale: new THREE.Vector3(1.0, 0.45, 0.45) },
    { pos: new THREE.Vector3(0.4, -0.3, 0.4), scale: new THREE.Vector3(0.9, 0.4, 0.5) },
    { pos: new THREE.Vector3(-0.2, 0.5, -0.3), scale: new THREE.Vector3(1.1, 0.42, 0.42) },
  ];
  for (const cfg of mitoConfigs) {
    const mito = makeMitochondrionMesh();
    mito.position.copy(cfg.pos);
    mito.scale.copy(cfg.scale);
    mito.renderOrder = 1;
    registerLabel(mito, "Mitochondria");
    neuronGroup.add(mito);
  }

  const nisslMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xa56dd4),
    emissive: new THREE.Color(0x401868),
    emissiveIntensity: 0.58,
    roughness: 0.62,
    transparent: true,
    opacity: 0.88,
  });
  const nisslPositions = [
    new THREE.Vector3(0.55, 0.4, 0.1),
    new THREE.Vector3(-0.55, 0.35, 0.2),
    new THREE.Vector3(0.3, -0.55, 0.3),
    new THREE.Vector3(-0.3, -0.5, -0.2),
    new THREE.Vector3(0.5, 0.1, -0.5),
    new THREE.Vector3(-0.4, 0.2, 0.55),
  ];
  for (const np of nisslPositions) {
    const ng = new THREE.SphereGeometry(0.08, 8, 8);
    const nPos = ng.attributes.position;
    for (let i = 0; i < nPos.count; i++) {
      const x = nPos.getX(i);
      const y = nPos.getY(i);
      const z = nPos.getZ(i);
      const s = 1 + 0.15 * Math.random();
      nPos.setXYZ(i, x * s, y * s, z * s);
    }
    nPos.needsUpdate = true;
    ng.computeVertexNormals();
    const nissl = new THREE.Mesh(ng, nisslMat);
    nissl.position.copy(np);
    nissl.renderOrder = 1;
    registerLabel(nissl, "Nissl Body");
    neuronGroup.add(nissl);
  }

  const dendriteMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x7ecfb3),
    emissive: new THREE.Color(0x0a2a1a),
    emissiveIntensity: 0.25,
    roughness: 0.5,
  });
  const spineMat = new THREE.MeshPhysicalMaterial({
    color: 0x5dcaa5,
    emissive: 0x0a2a1a,
    emissiveIntensity: 0.25,
    roughness: 0.5,
  });

  const spineGeomShared = new THREE.SphereGeometry(0.035, 10, 10);

  // --- 3. DENDRITES ---
  function makeDendrite(start, direction, radius, depth) {
    if (depth <= 0 || radius < 0.015) return;

    const dir = direction.clone().normalize();
    const len = random(1.0, 1.6) * (depth / 5);
    const end = start.clone().add(dir.clone().multiplyScalar(len));
    const mid = lerpVec(start, end, 0.5);
    mid.add(
      new THREE.Vector3(random(-0.1, 0.1), random(-0.1, 0.1), random(-0.1, 0.1))
    );
    const q1 = lerpVec(start, mid, 0.45);
    q1.add(new THREE.Vector3(random(-0.035, 0.035), random(-0.035, 0.035), random(-0.035, 0.035)));
    const q2 = lerpVec(mid, end, 0.55);
    q2.add(new THREE.Vector3(random(-0.035, 0.035), random(-0.035, 0.035), random(-0.035, 0.035)));

    const curve = new THREE.CatmullRomCurve3(
      [start.clone(), q1, mid, q2, end.clone()],
      false,
      "centripetal"
    );
    const tubeGeom = createTaperedTubeGeometry(curve, 28, radius, radius * 0.7, 12, 8);
    const branchMesh = new THREE.Mesh(tubeGeom, dendriteMat);
    neuronGroup.add(branchMesh);
    registerLabel(branchMesh, "Dendrites");

    const spineCount = Math.floor(random(3, 5));
    for (let s = 0; s < spineCount; s++) {
      const t = random(0.15, 0.85);
      const spinePos = curve.getPointAt(t);
      const spine = new THREE.Mesh(spineGeomShared, spineMat);
      spine.position.copy(spinePos);
      neuronGroup.add(spine);
      registerLabel(spine, "Dendritic Spine");
    }

    const spreadMin = 0.4;
    const spreadMax = 0.7;
    for (let c = 0; c < 2; c++) {
      const axis = new THREE.Vector3(random(-1, 1), random(-0.2, 1), random(-1, 1)).normalize();
      const angle = random(spreadMin, spreadMax);
      const q = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      const childDir = dir.clone().applyQuaternion(q).normalize();
      makeDendrite(end.clone(), childDir, radius * 0.65, depth - 1);
    }
  }

  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < 9; i++) {
    const t = (i + 0.5) / 9;
    const y = 0.2 + t * 0.75;
    const ringR = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    const dir = new THREE.Vector3(
      Math.cos(theta) * ringR,
      y,
      Math.sin(theta) * ringR
    ).normalize();
    const start = dir.clone().multiplyScalar(1.15);
    makeDendrite(start, dir, 0.22, 6);
  }

  // --- 4. AXON HILLOCK (tapered tube from soma bottom to axon start) ---
  const hillockCurve = new THREE.LineCurve3(
    new THREE.Vector3(0, -1.2, 0),
    new THREE.Vector3(0, -1.8, 0)
  );
  const hillockGeom = createTaperedTubeGeometry(hillockCurve, 14, 0.28, 0.16, 8, 5);
  const hillockMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xe8c07a),
    emissive: 0x2a1000,
    emissiveIntensity: 0.3,
  });
  const hillock = new THREE.Mesh(hillockGeom, hillockMat);
  neuronGroup.add(hillock);
  registerLabel(hillock, "Axon Hillock");

  // --- 5. AXON ---
  const axonPoints = [new THREE.Vector3(0, -1.8, 0)];
  for (let i = 1; i < 20; i++) {
    const prev = axonPoints[axonPoints.length - 1];
    const dy = 0.55 + random(0, 0.1);
    axonPoints.push(
      new THREE.Vector3(
        prev.x + random(-0.06, 0.06),
        prev.y - dy,
        prev.z + random(-0.04, 0.04)
      )
    );
  }
  const axonCurve = new THREE.CatmullRomCurve3(axonPoints);
  const axonGeom = new THREE.TubeGeometry(axonCurve, 72, 0.09, 10, false);
  const axonMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x2f6f86),
    emissive: new THREE.Color(0x061c28),
    emissiveIntensity: 0.42,
    roughness: 0.26,
    metalness: 0.2,
    clearcoat: 0.85,
    clearcoatRoughness: 0.16,
    sheen: 0.32,
    sheenColor: new THREE.Color(0x9fd4e8),
    sheenRoughness: 0.48,
  });
  const axonMesh = new THREE.Mesh(axonGeom, axonMat);
  neuronGroup.add(axonMesh);
  registerLabel(axonMesh, "Axon");

  const myelinMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf2d830),
    emissive: new THREE.Color(0x4a3a06),
    emissiveIntensity: 0.4,
    roughness: 0.36,
    metalness: 0.14,
    clearcoat: 0.56,
    clearcoatRoughness: 0.26,
    sheen: 0.32,
    sheenColor: new THREE.Color(0xfff4a8),
    sheenRoughness: 0.48,
  });
  const nodeMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xd67cff),
    emissive: new THREE.Color(0x5a1088),
    emissiveIntensity: 0.82,
    roughness: 0.16,
    metalness: 0.44,
    clearcoat: 0.9,
    clearcoatRoughness: 0.09,
    sheen: 0.62,
    sheenColor: new THREE.Color(0xf2e0ff),
    sheenRoughness: 0.32,
  });

  const upRef = new THREE.Vector3(0, 1, 0);

  const myelinGeomShared = new THREE.CylinderGeometry(0.155, 0.155, 0.55, 12);
  const schwannShellGeomShared = new THREE.SphereGeometry(1, 12, 12);
  /* Slightly thicker torus + smoother segments so small nodes read on dark backgrounds */
  const nodeGeomShared = new THREE.TorusGeometry(0.1, 0.024, 8, 18);

  const schwannMat = new THREE.MeshPhysicalMaterial({
    color: 0x9fe1cb,
    emissive: 0x0a2a1a,
    emissiveIntensity: 0.15,
    roughness: 0.6,
    transparent: true,
    opacity: 0.35,
    side: THREE.DoubleSide,
  });

  // --- 6 & 7. MYELIN + NODES OF RANVIER ---
  const myelinTValues = [];
  for (let k = 0; k < 12; k++) {
    myelinTValues.push(0.06 + ((0.88 - 0.06) * (k + 0.5)) / 12);
  }

  for (let k = 0; k < 12; k++) {
    const t = myelinTValues[k];
    const pt = axonCurve.getPointAt(t);
    const tangent = axonCurve.getTangentAt(t).normalize();
    const myelin = new THREE.Mesh(myelinGeomShared, myelinMat);
    myelin.position.copy(pt);
    myelin.quaternion.setFromUnitVectors(upRef, tangent);
    neuronGroup.add(myelin);
    registerLabel(myelin, "Myelin Sheath");

    if (k % 2 === 0) {
      const schwann = new THREE.Mesh(schwannShellGeomShared, schwannMat);
      schwann.position.copy(pt);
      schwann.quaternion.copy(myelin.quaternion);
      schwann.scale.set(0.22, 0.38, 0.22);
      registerLabel(schwann, "Schwann Cell");
      neuronGroup.add(schwann);
    }

    if (k < 11) {
      const tNext = myelinTValues[k + 1];
      const tGap = (t + tNext) * 0.5;
      const pGap = axonCurve.getPointAt(tGap);
      const tanGap = axonCurve.getTangentAt(tGap).normalize();
      const nodeMesh = new THREE.Mesh(nodeGeomShared, nodeMat);
      nodeMesh.position.copy(pGap);
      nodeMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tanGap);
      neuronGroup.add(nodeMesh);
      registerLabel(nodeMesh, "Node of Ranvier");
    }
  }

  // --- 8. AXON TERMINALS ---
  const axonEnd = axonCurve.getPoint(1.0);
  const angles = [0, 1.05, 2.1, 3.14, 4.19, 5.24];
  const boutonMat = new THREE.MeshPhysicalMaterial({
    color: 0xd4537e,
    emissive: 0x440011,
    emissiveIntensity: 0.6,
    clearcoat: 1.0,
  });
  const boutonGeomShared = new THREE.SphereGeometry(0.13, 16, 16);

  for (const ang of angles) {
    const endPt = new THREE.Vector3(
      axonEnd.x + Math.cos(ang) * 0.7,
      axonEnd.y - random(0.3, 0.8),
      axonEnd.z + Math.sin(ang) * 0.7
    );
    const termCurve = new THREE.CatmullRomCurve3([axonEnd.clone(), endPt.clone()]);
    const termGeom = new THREE.TubeGeometry(termCurve, 10, 0.028, 6, false);
    const termMesh = new THREE.Mesh(termGeom, axonMat);
    neuronGroup.add(termMesh);
    registerLabel(termMesh, "Axon Terminal");

    const bouton = new THREE.Mesh(boutonGeomShared, boutonMat);
    bouton.position.copy(endPt);
    neuronGroup.add(bouton);
    registerLabel(bouton, "Synaptic Bouton");
  }

  // --- 9. ACTION POTENTIAL PULSE ---
  const pulseCoreGeom = new THREE.SphereGeometry(0.2, 16, 16);
  const pulseCoreMat = new THREE.MeshBasicMaterial({ color: 0x00ffcc });
  const pulseCore = new THREE.Mesh(pulseCoreGeom, pulseCoreMat);

  const pulseHaloGeom = new THREE.SphereGeometry(0.4, 16, 16);
  const pulseHaloMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.18,
    side: THREE.BackSide,
  });
  const pulseHalo = new THREE.Mesh(pulseHaloGeom, pulseHaloMat);

  const pulseLight = new THREE.PointLight(0x00ffcc, 5, 3);
  const pulseGroup = new THREE.Group();
  pulseGroup.add(pulseCore, pulseHalo, pulseLight);
  neuronGroup.add(pulseGroup);

  let pulseT = 0;

  neuronGroup.updateMatrixWorld(true);
  const neuronBounds = new THREE.Box3().setFromObject(neuronGroup);
  const neuronSphere = neuronBounds.getBoundingSphere(new THREE.Sphere());
  const neuronCenter = neuronSphere.center.clone();
  const neuronRadius = Math.max(neuronSphere.radius, 0.5);
  const fovRad = (camera.fov * Math.PI) / 180;
  const fitPadding = 1.22;
  const fitDist = (neuronRadius / Math.sin(fovRad / 2)) * fitPadding;
  const viewDir = new THREE.Vector3(0.42, 0.2, 1).normalize();
  camera.position.copy(neuronCenter.clone().add(viewDir.multiplyScalar(fitDist)));
  camera.near = Math.max(0.05, fitDist / 1000);
  camera.far = Math.max(500, fitDist * 15);
  camera.updateProjectionMatrix();
  controls.target.copy(neuronCenter);
  controls.update();

  // --- 10. LIGHTING ---
  const ambLight = new THREE.AmbientLight(0x1a3050, 2.05);
  scene.add(ambLight);
  const hemiLight = new THREE.HemisphereLight(0x8eb4d4, 0x0c1828, 0.65);
  scene.add(hemiLight);

  const somaGlow = new THREE.PointLight(0x7ecfb3, 4.2, 24);
  somaGlow.position.set(0, 0, 0);
  scene.add(somaGlow);

  const dirLight = new THREE.DirectionalLight(0x9ed0f0, 2.45);
  dirLight.position.set(-5, 4, -6);
  scene.add(dirLight);

  const fillLight = new THREE.DirectionalLight(0xa8c8e8, 1.1);
  fillLight.position.set(6, 2, 8);
  scene.add(fillLight);

  const accentLight = new THREE.PointLight(0x00ffcc, 1.15, 35);
  accentLight.position.set(3, -3, 5);
  scene.add(accentLight);

  // --- 11. NEURAL NETWORK BACKGROUND ---
  const netGroup = new THREE.Group();
  scene.add(netGroup);
  const netRadius = 16;
  const netNodes = [];
  const netNodeMat = new THREE.MeshBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.35,
  });

  for (let n = 0; n < 50; n++) {
    const theta = random(0, Math.PI * 2);
    const phi = Math.acos(random(-1, 1));
    const r = netRadius * Math.cbrt(Math.random());
    const p = new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    );
    const ng = new THREE.SphereGeometry(0.05, 6, 6);
    const nm = new THREE.Mesh(ng, netNodeMat);
    nm.position.copy(p);
    netGroup.add(nm);
    netNodes.push({
      base: p.clone(),
      mesh: nm,
      phase: random(0, Math.PI * 2),
      freq: random(0.4, 1.2),
      amp: 0.35,
    });
  }

  const netEdges = [];
  const lineVerts = [];
  for (let i = 0; i < netNodes.length; i++) {
    for (let j = i + 1; j < netNodes.length; j++) {
      if (netNodes[i].base.distanceTo(netNodes[j].base) < 5) {
        netEdges.push(i, j);
        lineVerts.push(
          netNodes[i].base.x,
          netNodes[i].base.y,
          netNodes[i].base.z,
          netNodes[j].base.x,
          netNodes[j].base.y,
          netNodes[j].base.z
        );
      }
    }
  }
  const lineGeom = new THREE.BufferGeometry();
  const linePos = new Float32Array(lineVerts);
  lineGeom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
  const lineMat = new THREE.LineBasicMaterial({
    color: 0x00ffcc,
    transparent: true,
    opacity: 0.06,
  });
  const netLines = new THREE.LineSegments(lineGeom, lineMat);
  netGroup.add(netLines);

  // --- 12. STAR FIELD ---
  const starPositions = new Float32Array(1000 * 3);
  for (let s = 0; s < 1000; s++) {
    const u = Math.random() * 2 - 1;
    const t = Math.random() * Math.PI * 2;
    const rr = 90 * Math.cbrt(Math.random());
    const sq = Math.sqrt(1 - u * u);
    starPositions[s * 3] = rr * sq * Math.cos(t);
    starPositions[s * 3 + 1] = rr * u;
    starPositions[s * 3 + 2] = rr * sq * Math.sin(t);
  }
  const starGeom = new THREE.BufferGeometry();
  starGeom.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
  const starMat = new THREE.PointsMaterial({
    color: 0xc8dcff,
    size: 0.055,
    transparent: true,
    opacity: 0.8,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const stars = new THREE.Points(starGeom, starMat);
  scene.add(stars);

  function registerNightMaterialsFromGroup(group) {
    group.traverse((o) => {
      if (!o.isMesh || !o.material) return;
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      for (const mat of mats) {
        if (nightMaterialSnapshots.has(mat)) continue;
        const s = snapshotMaterialState(mat);
        if (s) nightMaterialSnapshots.set(mat, s);
      }
    });
  }

  registerNightMaterialsFromGroup(neuronGroup);

  let atlasViewTheme = "night";

  function applyAtlasTheme(theme) {
    const isDay = theme === "day";
    atlasViewTheme = theme;
    document.body.classList.toggle("atlas-day", isDay);
    document.documentElement.classList.toggle("atlas-day", isDay);

    if (isDay) {
      scene.background.setHex(0xffffff);
      fog.color.setHex(0xffffff);
      fog.density = 0.0016;
      starMat.color.setHex(0xff7722);
      starMat.opacity = 0.48;
      netNodeMat.color.setHex(0xff8833);
      netNodeMat.opacity = 0.62;
      lineMat.color.setHex(0xe05a10);
      lineMat.opacity = 0.16;
      accentLight.color.setHex(0xff9944);
      accentLight.intensity = 0.95;
      renderer.toneMappingExposure = 1.05;
      ambLight.color.setHex(0xffffff);
      ambLight.intensity = 0.58;
      hemiLight.color.setHex(0xfffaf6);
      hemiLight.groundColor.setHex(0xf0ebe6);
      hemiLight.intensity = 0.62;
      somaGlow.color.setHex(0xffb088);
      somaGlow.intensity = 3.2;
      somaInteriorLight.color.setHex(0xffaa88);
      somaInteriorLight.intensity = 1.35;
      dirLight.color.setHex(0xfff5f0);
      dirLight.intensity = 2.2;
      fillLight.color.setHex(0xffffff);
      fillLight.intensity = 0.58;
      neuronGroup.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        const lab = o.userData.label;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) {
          if (mat.isMeshPhysicalMaterial) {
            if (lab === "Dendrites" || lab === "Dendritic Spine") {
              applyDayDendriteSpineLook(mat);
            } else if (lab === "Nucleus" || lab === "Mitochondria" || lab === "Nissl Body") {
              applyDaySomaInteriorLook(mat, lab);
            } else if (lab === "Node of Ranvier") {
              applyDayRanvierSilkLook(mat);
            } else if (lab === "Axon" || lab === "Axon Terminal") {
              applyDayAxonLook(mat);
            } else if (lab === "Myelin Sheath") {
              applyDayMyelinYellowLook(mat);
            } else {
              applyDayPhysicalHeroLook(mat);
            }
          } else if (mat.isMeshBasicMaterial && mat !== pulseCoreMat && mat !== pulseHaloMat) {
            mat.color.setHex(0xe05a10);
            if (mat.opacity < 1) mat.opacity = 0.2;
          }
        }
      });
      const heroSig = 0xc93840;
      pulseCoreMat.color.setHex(heroSig);
      pulseHaloMat.color.setHex(heroSig);
      pulseLight.color.setHex(heroSig);
    } else {
      scene.background.setHex(nightBg);
      fog.color.setHex(nightBg);
      fog.density = 0.008;
      starMat.color.setHex(0xc8dcff);
      starMat.opacity = 0.8;
      netNodeMat.color.setHex(0x00ffcc);
      netNodeMat.opacity = 0.35;
      lineMat.color.setHex(0x00ffcc);
      lineMat.opacity = 0.06;
      pulseCoreMat.color.setHex(0x00ffcc);
      pulseHaloMat.color.setHex(0x00ffcc);
      pulseLight.color.setHex(0x00ffcc);
      accentLight.color.setHex(0x00ffcc);
      accentLight.intensity = 1.15;
      renderer.toneMappingExposure = 1.25;
      ambLight.color.setHex(0x1a3050);
      ambLight.intensity = 2.05;
      hemiLight.color.setHex(0x8eb4d4);
      hemiLight.groundColor.setHex(0x0c1828);
      hemiLight.intensity = 0.65;
      somaGlow.color.setHex(0x7ecfb3);
      somaGlow.intensity = 4.2;
      somaInteriorLight.color.setHex(0x7ecfb3);
      somaInteriorLight.intensity = 1.5;
      dirLight.color.setHex(0x9ed0f0);
      dirLight.intensity = 2.45;
      fillLight.color.setHex(0xa8c8e8);
      fillLight.intensity = 1.1;
      neuronGroup.traverse((o) => {
        if (!o.isMesh || !o.material) return;
        const mats = Array.isArray(o.material) ? o.material : [o.material];
        for (const mat of mats) {
          restoreMaterialState(mat, nightMaterialSnapshots.get(mat));
        }
      });
    }
    if (typeof setLang === "function") setLang(currentLang);
  }

  window.__neuronAtlasApplyTheme = applyAtlasTheme;

  const qs = new URLSearchParams(window.location.search);
  const urlTheme = qs.get("theme");
  let initialTheme = "night";
  if (urlTheme === "day" || urlTheme === "night") {
    initialTheme = urlTheme;
  } else {
    try {
      const lsT = localStorage.getItem("neyron_theme");
      if (lsT === "day" || lsT === "night") initialTheme = lsT;
    } catch (e) {}
  }
  applyAtlasTheme(initialTheme);

  const urlLang = qs.get("lang");
  if (urlLang === "en" || urlLang === "az") {
    setLang(urlLang);
  } else {
    try {
      const lsL = localStorage.getItem("neyron_lang");
      if (lsL === "az" || lsL === "en") setLang(lsL);
    } catch (e) {}
  }

  scene.traverse((obj) => {
    if (obj.isMesh) {
      if (obj === soma) {
        obj.renderOrder = 999;
      } else {
        obj.renderOrder = 0;
      }
    }
  });

  // --- 13. HOVER LABELS ---
  const raycaster = new THREE.Raycaster();
  const pointerNdc = new THREE.Vector2(2, 2);
  let lastClientX = -1;
  let lastClientY = -1;

  function onPointerMove(event) {
    pointerNdc.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointerNdc.y = -(event.clientY / window.innerHeight) * 2 + 1;
    lastClientX = event.clientX;
    lastClientY = event.clientY;
  }
  window.addEventListener("mousemove", onPointerMove);

  renderer.domElement.addEventListener("pointerdown", () => {
    controls.autoRotate = false;
  });
  window.addEventListener("pointerup", () => {
    controls.autoRotate = true;
  });
  renderer.domElement.addEventListener("pointerleave", () => {
    controls.autoRotate = true;
    pointerNdc.set(2, 2);
    tooltip.style.display = "none";
  });

  const clock = new THREE.Clock();
  let netLineFrame = 0;

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    if (atlasViewTheme === "day") {
      somaGlow.intensity = 2.85 + 0.55 * Math.sin(time * 1.4);
    } else {
      somaGlow.intensity = 3.6 + 1.1 * Math.sin(time * 1.4);
    }

    pulseT += 0.003;
    if (pulseT >= 1.0) pulseT -= 1.0;
    const pulsePos = axonCurve.getPointAt(pulseT);
    pulseGroup.position.copy(pulsePos);

    for (const node of netNodes) {
      const o = node.amp * Math.sin(time * node.freq + node.phase);
      node.mesh.position.set(
        node.base.x + o * 0.3,
        node.base.y + o * 0.25,
        node.base.z + o * 0.28
      );
    }
    netLineFrame++;
    if (netLineFrame % 2 === 0) {
      const lp = lineGeom.attributes.position;
      let vi = 0;
      for (let e = 0; e < netEdges.length; e += 2) {
        const a = netNodes[netEdges[e]].mesh.position;
        const b = netNodes[netEdges[e + 1]].mesh.position;
        lp.setXYZ(vi++, a.x, a.y, a.z);
        lp.setXYZ(vi++, b.x, b.y, b.z);
      }
      lp.needsUpdate = true;
    }

    raycaster.setFromCamera(pointerNdc, camera);
    const hits = raycaster.intersectObjects(rayMeshes, false);
    if (panelOpenPickLabel) {
      const displayName =
        tooltipNames[currentLang][panelOpenPickLabel] || panelOpenPickLabel;
      tooltip.textContent = displayName;
      tooltip.style.display = "block";
      tooltip.style.left = `${lastClientX + 15}px`;
      tooltip.style.top = `${lastClientY + 15}px`;
    } else if (hits.length > 0 && hits[0].object.userData.label) {
      const label = hits[0].object.userData.label;
      const displayName = tooltipNames[currentLang][label] || label;
      tooltip.textContent = displayName;
      tooltip.style.display = "block";
      tooltip.style.left = `${lastClientX + 15}px`;
      tooltip.style.top = `${lastClientY + 15}px`;
    } else {
      tooltip.style.display = "none";
    }

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

init();
