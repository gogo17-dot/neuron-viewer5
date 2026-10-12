/**
 * Identification-drill viewer registry.
 *
 * The anatomy page injects scene module, framing meshes and copy from here.
 * Nothing below the drill loop should assume brainstem — if a new atlas needs
 * a branch in brain-bee-anatomy.js, the abstraction is wrong.
 *
 * `frameKeys` are the meshes used to size the camera so a long peripheral
 * structure (vagus, accessory) cannot shrink the rest of the model to a speck.
 * `group` is the bbox fallback when those keys have not loaded yet.
 * `manifestHref` is what QA fetches; mesh names in BB_STRUCTURES must match it.
 */
export const DRILL_VIEWERS = [
  {
    id: "brainstem",
    loadScene: () => import("./brainstem/BrainstemScene.js").then((m) => m.BrainstemScene),
    atlasHref: "brainstem/index.html",
    manifestHref: "brainstem/brainstemManifest.js",
    frameKeys: ["Midbrain", "Pons", "Medulla_oblongata"],
    group: (scene) => scene.brainstemGroup || scene.assemblyRoot,
    label: { en: "Brainstem", az: "Beyin sapı" },
    copy: {
      weight: {
        en: "The brainstem model is a few megabytes and loads in one go, so give it a moment on a slow connection.",
        az: "Beyin sapı modeli bir neçə meqabaytdır və birdəfəyə yüklənir — zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the brainstem model…", az: "Beyin sapı modeli yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the brainstem GLB files are being served.",
        az: "3D modellər yüklənmədi. Beyin sapı GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the brainstem atlas →",
        az: "Bu strukturu beyin sapı atlasında aç →",
      },
    },
  },
  {
    id: "cranial-nerves",
    loadScene: () =>
      import("./cranial-nerves/CranialNervesScene.js").then((m) => m.CranialNervesScene),
    atlasHref: "cranial-nerves/index.html",
    manifestHref: "cranial-nerves/cranialNervesManifest.js",
    frameKeys: ["00_Skull_context", "Brainstem"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Cranial nerves", az: "Kəllə sinirləri" },
    copy: {
      weight: {
        en: "Twelve nerves plus a ghost skull and brainstem — a few extra megabytes. Give it a moment on a slow connection.",
        az: "On iki sinir plus kölgə kəllə və beyin sapı — bir neçə əlavə meqabayt. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the cranial nerve models…", az: "Kəllə siniri modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the cranial-nerve GLB files are being served.",
        az: "3D modellər yüklənmədi. Kəllə siniri GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the cranial nerve atlas →",
        az: "Bu strukturu kəllə sinirləri atlasında aç →",
      },
    },
  },
  {
    id: "limbic",
    loadScene: () => import("./limbic/LimbicScene.js").then((m) => m.LimbicScene),
    atlasHref: "limbic/index.html",
    manifestHref: "limbic/limbicManifest.js",
    frameKeys: ["02_Hippocampus_R", "04_Amygdala_R", "17_Cingulate_gyrus_anterior_R"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Limbic system", az: "Limbik sistem" },
    copy: {
      weight: {
        en: "The limbic models load together. Give them a moment on a slow connection.",
        az: "Limbik modellər birlikdə yüklənir. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the limbic models…", az: "Limbik modellər yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the limbic GLB files are being served.",
        az: "3D modellər yüklənmədi. Limbik GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the limbic atlas →",
        az: "Bu strukturu limbik atlasda aç →",
      },
    },
  },
  {
    id: "ventricles",
    loadScene: () => import("./ventricles/VentriclesScene.js").then((m) => m.VentriclesScene),
    atlasHref: "ventricles/index.html",
    manifestHref: "ventricles/ventriclesManifest.js",
    frameKeys: ["01_Lateral_ventricle_L", "02_Lateral_ventricle_R", "05_Fourth_ventricle"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Ventricles", az: "Mədəciklər" },
    copy: {
      weight: {
        en: "The ventricular models are small and usually appear quickly.",
        az: "Mədəcik modelləri kiçikdir və adətən tez görünür.",
      },
      loading: { en: "Loading the ventricle models…", az: "Mədəcik modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the ventricle GLB files are being served.",
        az: "3D modellər yüklənmədi. Mədəcik GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the ventricle atlas →",
        az: "Bu strukturu mədəcik atlasında aç →",
      },
    },
  },
  {
    id: "meninges",
    loadScene: () => import("./meninges/MeningesScene.js").then((m) => m.MeningesScene),
    atlasHref: "meninges/index.html",
    manifestHref: "meninges/meningesManifest.js",
    frameKeys: ["00_Skull_context", "01_Falx_cerebri", "02_Tentorium_cerebelli_R"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Meninges", az: "Meninges" },
    copy: {
      weight: {
        en: "Falx, tentorium, cavernous sinuses and spinal dura plus a ghost skull. Small files.",
        az: "Falx, tentorium, kavernoz sinuslar və spinal dura plus kölgə kəllə. Kiçik fayllar.",
      },
      loading: { en: "Loading the meninges models…", az: "Meninges modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the meninges GLB files are being served.",
        az: "3D modellər yüklənmədi. Meninges GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the meninges atlas →",
        az: "Bu strukturu meninges atlasında aç →",
      },
    },
  },
  {
    id: "white-matter",
    loadScene: () => import("./white-matter/WhiteMatterScene.js").then((m) => m.WhiteMatterScene),
    atlasHref: "white-matter/index.html",
    manifestHref: "white-matter/whiteMatterManifest.js",
    frameKeys: ["Brainstem", "01_Corpus_callosum"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "White matter", az: "Ağ maddə" },
    copy: {
      weight: {
        en: "Tracts plus a ghost brainstem. Give them a moment on a slow connection.",
        az: "Traktlar plus kölgə beyin sapı. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the white-matter models…", az: "Ağ maddə modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the white-matter GLB files are being served.",
        az: "3D modellər yüklənmədi. Ağ maddə GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the white-matter atlas →",
        az: "Bu strukturu ağ maddə atlasında aç →",
      },
    },
  },
  {
    id: "cerebral-cortex",
    loadScene: () =>
      import("./cerebral-cortex/CerebralCortexScene.js").then((m) => m.CerebralCortexScene),
    atlasHref: "cerebral-cortex/index.html",
    manifestHref: "cerebral-cortex/cerebralCortexManifest.js",
    frameKeys: ["Frontal_lobe.r", "Parietal_lobe.r", "Occipital_lobe.r", "Temporal_lobe.r"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Cerebral cortex", az: "Beyin qabığı" },
    copy: {
      weight: {
        en: "The whole-brain model is heavier than the others. Give it a moment on a slow connection.",
        az: "Tam beyin modeli digərlərindən ağırdır. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the cortex models…", az: "Qabıq modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the cortex GLB files are being served.",
        az: "3D modellər yüklənmədi. Qabıq GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the cortex atlas →",
        az: "Bu strukturu qabıq atlasında aç →",
      },
    },
  },
  {
    id: "visual-pathway",
    loadScene: () =>
      import("./visual-pathway/VisualPathwayScene.js").then((m) => m.VisualPathwayScene),
    atlasHref: "visual-pathway/index.html",
    manifestHref: "visual-pathway/visualPathwayManifest.js",
    frameKeys: ["00_Skull_context", "Brainstem"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Visual pathway", az: "Görmə yolu" },
    copy: {
      weight: {
        en: "Retina to cortex plus a ghost skull. Give it a moment on a slow connection.",
        az: "Torlu qişadan qabığa qədər plus kölgə kəllə. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the visual-pathway models…", az: "Görmə yolu modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the visual-pathway GLB files are being served.",
        az: "3D modellər yüklənmədi. Görmə yolu GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the visual-pathway atlas →",
        az: "Bu strukturu görmə yolu atlasında aç →",
      },
    },
  },
  {
    id: "ear-pathway",
    loadScene: () => import("./ear-pathway/EarPathwayScene.js").then((m) => m.EarPathwayScene),
    atlasHref: "ear-pathway/index.html",
    manifestHref: "ear-pathway/earPathwayManifest.js",
    frameKeys: ["Brainstem", "Temporal_lobe.r", "16_Temporal_bone_petrous_R"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Auditory pathway", az: "Eşitmə yolu" },
    copy: {
      weight: {
        en: "Outer ear to cortex plus temporal bone. Give it a moment on a slow connection.",
        az: "Xarici qulaqdan qabığa qədər plus temporal sümük. Zəif internetdə bir az vaxt verin.",
      },
      loading: { en: "Loading the auditory-pathway models…", az: "Eşitmə yolu modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the ear-pathway GLB files are being served.",
        az: "3D modellər yüklənmədi. Eşitmə yolu GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the auditory-pathway atlas →",
        az: "Bu strukturu eşitmə yolu atlasında aç →",
      },
    },
  },
  {
    id: "diencephalon",
    loadScene: () =>
      import("./diencephalon/DiencephalonScene.js").then((m) => m.DiencephalonScene),
    atlasHref: "diencephalon/index.html",
    manifestHref: "diencephalon/diencephalonManifest.js",
    frameKeys: ["01_Thalamus_L", "01_Thalamus_R", "02_Hypothalamus"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Diencephalon", az: "Diensefalon" },
    copy: {
      weight: {
        en: "Thalamus, hypothalamus and neighbours plus a ghost brainstem.",
        az: "Talamus, hipotalamus və qonşuları plus kölgə beyin sapı.",
      },
      loading: { en: "Loading the diencephalon models…", az: "Diensefalon modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the diencephalon GLB files are being served.",
        az: "3D modellər yüklənmədi. Diensefalon GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the diencephalon atlas →",
        az: "Bu strukturu diensefalon atlasında aç →",
      },
    },
  },
  {
    id: "basal-ganglia",
    loadScene: () =>
      import("./basal-ganglia/BasalGangliaScene.js").then((m) => m.BasalGangliaScene),
    atlasHref: "basal-ganglia/index.html",
    manifestHref: "basal-ganglia/basalGangliaManifest.js",
    frameKeys: ["Caudate_nucleus", "Putamen", "Globus_pallidus"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Basal ganglia", az: "Bazal qanqliyalar" },
    copy: {
      weight: {
        en: "Seven nuclei plus a ghost brainstem. Locus coeruleus and PAG are included for context, not as classical basal ganglia.",
        az: "Yeddi nüvə plus kölgə beyin sapı. Locus coeruleus və PAG kontekst üçün daxildir, klassik bazal qanqliya deyil.",
      },
      loading: { en: "Loading the basal ganglia models…", az: "Bazal qanqliya modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the basal-ganglia GLB files are being served.",
        az: "3D modellər yüklənmədi. Bazal qanqliya GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the basal ganglia atlas →",
        az: "Bu strukturu bazal qanqliya atlasında aç →",
      },
    },
  },
  {
    id: "cerebellum",
    loadScene: () => import("./cerebellum/CerebellumScene.js").then((m) => m.CerebellumScene),
    atlasHref: "cerebellum/index.html",
    manifestHref: "cerebellum/cerebellumManifest.js",
    frameKeys: ["Culmen", "Declive", "Flocculus"],
    group: (scene) => scene.assemblyRoot,
    label: { en: "Cerebellum", az: "Beyincik" },
    copy: {
      weight: {
        en: "Lobules, peduncles and deep nuclei plus a ghost brainstem.",
        az: "Lobullar, ayaqcıqlar və dərin nüvələr plus kölgə beyin sapı.",
      },
      loading: { en: "Loading the cerebellum models…", az: "Beyincik modelləri yüklənir…" },
      loadFail: {
        en: "The 3D models did not load. Check that the cerebellum GLB files are being served.",
        az: "3D modellər yüklənmədi. Beyincik GLB fayllarının verildiyini yoxlayın.",
      },
      openAtlas: {
        en: "Open this structure in the cerebellum atlas →",
        az: "Bu strukturu beyincik atlasında aç →",
      },
    },
  },
];

export const DRILL_VIEWER_BY_ID = Object.fromEntries(DRILL_VIEWERS.map((v) => [v.id, v]));

export const DEFAULT_VIEWER_ID = "brainstem";
