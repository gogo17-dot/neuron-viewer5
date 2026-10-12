const MIN_EASE = 1.3
const DEFAULT_EASE = 2.5
const MIXED_NEW_RATIO = 0.7
const MAX_EDIT_DISTANCE = 2
const ATTEMPTS_KEY = "bb_practice_attempts"
const REVIEWS_KEY = "bb_practice_reviews"
const DRILL_KEY = "bb_practice_drill"

export const MOCK_SECTION_WEIGHTS = {}
export { DRILL_KEY }

// One label per moduleId, EN+AZ. moduleId is the fine-grained topic (the same
// taxonomy as brain-bee-core.js's SUBS map) so weak-area tracking and the
// mistake log group by actual unit, not just "anatomy"/"function". Every key
// used by a Question.moduleId must have an entry here — an unlabeled module
// still works, it just falls back to printing the raw id.
export const MODULE_LABELS = {
  cortex: { en: "Cortex & lobes", az: "Qabıq və paylar" },
  brainstem: { en: "Brainstem", az: "Beyin sapı" },
  cerebellum: { en: "Cerebellum", az: "Beyincik" },
  "basal-ganglia": { en: "Basal ganglia", az: "Bazal qanqliyalar" },
  limbic: { en: "Limbic system", az: "Limbik sistem" },
  diencephalon: { en: "Diencephalon", az: "Diensefalon" },
  "ventricles-meninges": { en: "Ventricles & meninges", az: "Mədəciklər və meninges" },
  "white-matter": { en: "White matter", az: "Ağ maddə" },
  "cranial-nerves": { en: "Cranial nerves", az: "Kəllə sinirləri" },
  "neuron-ap": { en: "Neuron & action potential", az: "Neyron və fəaliyyət potensialı" },
  "synapse-nt": { en: "Synapse & transmitters", az: "Sinaps və transmitterlər" },
  sensory: { en: "Sensory systems", az: "Sensor sistemlər" },
  motor: { en: "Motor control", az: "Motor nəzarət" },
  memory: { en: "Memory & learning", az: "Yaddaş və öyrənmə" },
  "sleep-attention-emotion": { en: "Sleep, attention, emotion", az: "Yuxu, diqqət, emosiya" },
  "neural-development": { en: "Neural development", az: "Sinir inkişafı" },
  "critical-periods": { en: "Critical periods", az: "Kritik dövrlər" },
  neuroplasticity: { en: "Neuroplasticity", az: "Neyroplastiklik" },
  "language-brain": { en: "Language & the brain", az: "Dil və beyin" },
  stress: { en: "Stress", az: "Stress" },
  aging: { en: "Aging", az: "Qocalma" },
  "kinds-of-research": { en: "Kinds of research", az: "Tədqiqat növləri" },
  addiction: { en: "Addiction", az: "Asılılıq" },
  "potential-therapies": { en: "Potential therapies", az: "Potensial müalicələr" },
  diagnosis: { en: "Patient diagnosis", az: "Pasiyent diaqnozu" },
  neuroethics: { en: "Neuroethics", az: "Neyroetika" },
}

export function moduleLabel(moduleId) {
  return MODULE_LABELS[moduleId] || { en: moduleId, az: moduleId }
}

// First-seen moduleId order from BRAIN-BEE-CURRICULUM.md (Brain Facts
// chapters 1.1 → 16). Unknown ids (demo fixtures) sort last.
export const CURRICULUM_MODULE_ORDER = [
  "neuron-ap",
  "synapse-nt",
  "ventricles-meninges",
  "cortex",
  "diencephalon",
  "limbic",
  "basal-ganglia",
  "brainstem",
  "cranial-nerves",
  "cerebellum",
  "white-matter",
  "neural-development",
  "critical-periods",
  "neuroplasticity",
  "sensory",
  "memory",
  "language-brain",
  "motor",
  "sleep-attention-emotion",
  "stress",
  "aging",
  "kinds-of-research",
  "diagnosis",
  "addiction",
  "potential-therapies",
  "neuroethics",
]

// Lesson slugs that have a practice pool. Chapter number is the link label
// so this file does not duplicate lesson titles.
export const CURRICULUM_LESSONS = [
  { id: "neuron-structure", chapter: "1.1", moduleId: "neuron-ap" },
  { id: "neuron-action-potential", chapter: "1.2", moduleId: "neuron-ap" },
  { id: "neuron-conduction", chapter: "1.3", moduleId: "neuron-ap" },
  { id: "synapse-transmitters", chapter: "1.4", moduleId: "synapse-nt" },
  { id: "brain-overview", chapter: "1.5", moduleId: "ventricles-meninges" },
  { id: "cortex-lobes", chapter: "1.6", moduleId: "cortex" },
  { id: "diencephalon", chapter: "1.7", moduleId: "diencephalon" },
  { id: "limbic-system", chapter: "1.8", moduleId: "limbic" },
  { id: "basal-ganglia", chapter: "1.9", moduleId: "basal-ganglia" },
  { id: "brainstem", chapter: "1.10", moduleId: "brainstem" },
  { id: "cranial-nerves", chapter: "1.11", moduleId: "cranial-nerves" },
  { id: "cerebellum", chapter: "1.12", moduleId: "cerebellum" },
  { id: "white-matter", chapter: "1.13", moduleId: "white-matter" },
  { id: "neural-development", chapter: "2.1", moduleId: "neural-development" },
  { id: "critical-periods", chapter: "2.2", moduleId: "critical-periods" },
  { id: "neuroplasticity", chapter: "2.3", moduleId: "neuroplasticity" },
  { id: "vision", chapter: "3.1", moduleId: "sensory" },
  { id: "hearing-balance", chapter: "3.2", moduleId: "sensory" },
  { id: "taste-smell-touch-pain", chapter: "3.3", moduleId: "sensory" },
  { id: "learning-memory", chapter: "4.1", moduleId: "memory" },
  { id: "language-brain", chapter: "4.2", moduleId: "language-brain" },
  { id: "movement", chapter: "5", moduleId: "motor" },
  { id: "sleep", chapter: "6.1", moduleId: "sleep-attention-emotion" },
  { id: "attention-emotion", chapter: "6.2", moduleId: "sleep-attention-emotion" },
  { id: "stress", chapter: "7", moduleId: "stress" },
  { id: "aging", chapter: "8", moduleId: "aging" },
  { id: "kinds-of-research", chapter: "9", moduleId: "kinds-of-research" },
  { id: "childhood-disorders", chapter: "10", moduleId: "diagnosis" },
  { id: "addiction", chapter: "11", moduleId: "addiction" },
  { id: "degenerative-disorders", chapter: "12", moduleId: "diagnosis" },
  { id: "psychiatric-disorders", chapter: "13", moduleId: "diagnosis" },
  { id: "injury-illness", chapter: "14", moduleId: "diagnosis" },
  { id: "potential-therapies", chapter: "15", moduleId: "potential-therapies" },
  { id: "neuroethics", chapter: "16", moduleId: "neuroethics" },
]

export function compareModuleIds(a, b) {
  const ia = CURRICULUM_MODULE_ORDER.indexOf(a)
  const ib = CURRICULUM_MODULE_ORDER.indexOf(b)
  const ra = ia < 0 ? CURRICULUM_MODULE_ORDER.length : ia
  const rb = ib < 0 ? CURRICULUM_MODULE_ORDER.length : ib
  if (ra !== rb) return ra - rb
  return String(a).localeCompare(String(b))
}

export function lessonsForModule(moduleId) {
  if (!moduleId) return []
  return CURRICULUM_LESSONS.filter((row) => row.moduleId === moduleId)
}

export function normalizeAnswer(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim()
    .replace(/\s+/g, " ")
}

export function levenshtein(a, b) {
  if (a === b) return 0
  if (!a) return b.length
  if (!b) return a.length
  const prev = Array.from({ length: b.length + 1 }, (_, j) => j)
  const cur = new Array(b.length + 1)
  for (let i = 1; i <= a.length; i++) {
    cur[0] = i
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost)
    }
    for (let j = 0; j <= b.length; j++) prev[j] = cur[j]
  }
  return prev[b.length]
}

export function answersMatch(input, accepted) {
  const typed = normalizeAnswer(input)
  const target = normalizeAnswer(accepted)
  if (!typed || !target) return false
  if (typed === target) return true
  return levenshtein(typed, target) <= MAX_EDIT_DISTANCE
}

export function gradeAnswer(question, userAnswer) {
  const explanation = question.explanation
  const typed = String(userAnswer ?? "")
  if (question.type === "mcq") {
    const correct = Boolean(question.correctChoiceId) && typed === question.correctChoiceId
    return { correct, matched: correct ? question.correctChoiceId ?? null : null, explanation }
  }
  const candidates = question.acceptedAnswers ?? []
  const matched = candidates.find((option) => answersMatch(typed, option)) ?? null
  return { correct: Boolean(matched), matched, explanation }
}

export function initialReviewState(questionId, now = new Date()) {
  return {
    questionId,
    easeFactor: DEFAULT_EASE,
    intervalDays: 0,
    dueDate: now.toISOString(),
    lapses: 0,
    repetitions: 0,
  }
}

export function scheduleReview(reviewState, wasCorrect, now = new Date()) {
  if (!wasCorrect) {
    return {
      ...reviewState,
      easeFactor: Math.max(MIN_EASE, Math.round((reviewState.easeFactor - 0.2) * 100) / 100),
      intervalDays: 1,
      dueDate: addDays(now, 1).toISOString(),
      lapses: reviewState.lapses + 1,
      repetitions: 0,
    }
  }
  const repetitions = reviewState.repetitions + 1
  let intervalDays = 1
  if (repetitions === 2) intervalDays = 6
  else if (repetitions > 2) intervalDays = Math.max(1, Math.round(reviewState.intervalDays * reviewState.easeFactor))
  return {
    ...reviewState,
    easeFactor: Math.min(3, Math.round((reviewState.easeFactor + 0.1) * 100) / 100),
    intervalDays,
    dueDate: addDays(now, intervalDays).toISOString(),
    repetitions,
  }
}

export function isDue(review, now = new Date()) {
  return new Date(review.dueDate).getTime() <= now.getTime()
}

export function buildSession(input) {
  const count = Math.max(0, Math.floor(input.count))
  const now = input.now ?? new Date()
  const random = input.random ?? Math.random
  const bank = (input.questions ?? []).filter((q) =>
    input.moduleIds?.length ? input.moduleIds.includes(q.moduleId) : true,
  )
  const reviews = input.reviews ?? []
  const reviewById = new Map(reviews.map((r) => [r.questionId, r]))
  const unseen = bank.filter((q) => !reviewById.has(q.id))
  const due = bank.filter((q) => {
    const state = reviewById.get(q.id)
    return state ? isDue(state, now) : false
  })

  let selected = []
  if (input.questionIds?.length) {
    const want = new Set(input.questionIds)
    const picked = input.questionIds.map((id) => bank.find((q) => q.id === id)).filter(Boolean)
    const rest = bank.filter((q) => want.has(q.id) && !picked.some((p) => p.id === q.id))
    selected = take(shuffle([...picked, ...rest], random), count || want.size)
  } else if (input.mode === "learn") {
    selected = take(sortEasiest(unseen, random), count)
  } else if (input.mode === "review") {
    selected = take(shuffle(due, random), count)
  } else if (input.mode === "mixed") {
    const newCount = Math.round(count * MIXED_NEW_RATIO)
    const dueCount = count - newCount
    const newQs = take(sortEasiest(unseen, random), newCount)
    const dueQs = take(
      shuffle(
        due.filter((q) => !newQs.some((n) => n.id === q.id)),
        random,
      ),
      dueCount,
    )
    selected = [...newQs, ...dueQs]
    if (selected.length < count) {
      const used = new Set(selected.map((q) => q.id))
      selected = take([...selected, ...sortEasiest([...unseen, ...due].filter((q) => !used.has(q.id)), random)], count)
    }
  } else {
    selected = pickMock(bank, count, random)
  }

  const timed = input.mode === "mock"
  return {
    mode: input.mode,
    timed,
    questions: selected,
    timeLimitSeconds: timed ? selected.reduce((sum, q) => sum + (q.timeLimitSeconds || 0), 0) : 0,
  }
}

export function accuracyByModule(attempts, questions) {
  const byId = new Map(questions.map((q) => [q.id, q]))
  const stats = new Map()
  for (const attempt of attempts) {
    const moduleId = byId.get(attempt.questionId)?.moduleId || "unknown"
    const row = stats.get(moduleId) || { correct: 0, total: 0 }
    row.total += 1
    if (attempt.correct) row.correct += 1
    stats.set(moduleId, row)
  }
  return [...stats.entries()]
    .map(([moduleId, row]) => ({
      moduleId,
      correct: row.correct,
      total: row.total,
      accuracy: row.total ? row.correct / row.total : 0,
    }))
    .sort((a, b) => a.accuracy - b.accuracy || b.total - a.total || a.moduleId.localeCompare(b.moduleId))
}

export function mistakesByModule(attempts, questions) {
  const byId = new Map(questions.map((q) => [q.id, q]))
  const groups = new Map()
  for (const attempt of attempts.filter((a) => !a.correct)) {
    const moduleId = byId.get(attempt.questionId)?.moduleId || "unknown"
    const list = groups.get(moduleId) || []
    list.push(attempt)
    groups.set(moduleId, list)
  }
  const rank = new Map(accuracyByModule(attempts, questions).map((row, i) => [row.moduleId, i]))
  return [...groups.entries()]
    .map(([moduleId, list]) => ({
      moduleId,
      attempts: list,
      questionIds: [...new Set(list.map((a) => a.questionId))],
    }))
    .sort((a, b) => (rank.get(a.moduleId) ?? 99) - (rank.get(b.moduleId) ?? 99))
}

export function createLocalStorageAdapter(storage) {
  const store = storage ?? (typeof localStorage === "undefined" ? memoryStore() : localStorage)
  return {
    getAttempts: () => readJson(store, ATTEMPTS_KEY, []),
    replaceAttempts: (attempts) => {
      store.setItem(ATTEMPTS_KEY, JSON.stringify(attempts))
    },
    saveAttempt: (attempt) => {
      const next = readJson(store, ATTEMPTS_KEY, [])
      next.push(attempt)
      store.setItem(ATTEMPTS_KEY, JSON.stringify(next))
    },
    getReviews: () => Object.values(readJson(store, REVIEWS_KEY, {})),
    getReview: (questionId) => readJson(store, REVIEWS_KEY, {})[questionId] ?? null,
    saveReview: (state) => {
      const all = readJson(store, REVIEWS_KEY, {})
      all[state.questionId] = state
      store.setItem(REVIEWS_KEY, JSON.stringify(all))
    },
  }
}

export function recordAttempt(adapter, attempt) {
  adapter.saveAttempt(attempt)
}

export function backfillAttemptModuleIds(adapter, questions) {
  const byId = new Map(questions.map((q) => [q.id, q.moduleId]))
  const attempts = adapter.getAttempts()
  let changed = false
  const next = attempts.map((attempt) => {
    if (attempt.moduleId || !byId.has(attempt.questionId)) return attempt
    changed = true
    return { ...attempt, moduleId: byId.get(attempt.questionId) }
  })
  if (changed && typeof adapter.replaceAttempts === "function") adapter.replaceAttempts(next)
  return next
}

export function applyReview(adapter, questionId, wasCorrect, now = new Date()) {
  const current = adapter.getReview(questionId) ?? initialReviewState(questionId, now)
  const next = scheduleReview(current, wasCorrect, now)
  adapter.saveReview(next)
  return next
}

export function readDrill() {
  try {
    const raw = sessionStorage.getItem(DRILL_KEY)
    if (!raw) return null
    sessionStorage.removeItem(DRILL_KEY)
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function writeDrill(questionIds) {
  sessionStorage.setItem(DRILL_KEY, JSON.stringify({ questionIds }))
}

function pickMock(pool, count, random) {
  if (!pool.length || count <= 0) return []
  const byTier = new Map()
  for (const q of pool) {
    const list = byTier.get(q.tier) || []
    list.push(q)
    byTier.set(q.tier, list)
  }
  const tiers = [...byTier.keys()].sort((a, b) => a - b)
  const picked = []
  const used = new Set()
  if (count >= tiers.length) {
    for (const tier of tiers) {
      const choice = weightedPick((byTier.get(tier) || []).filter((q) => !used.has(q.id)), random)
      if (choice) {
        picked.push(choice)
        used.add(choice.id)
      }
    }
  }
  picked.push(...take(weightedShuffle(pool.filter((q) => !used.has(q.id)), random), count - picked.length))
  return take(picked, count)
}

function sortEasiest(list, random) {
  const grouped = new Map()
  for (const q of list) {
    const bucket = grouped.get(q.difficulty) || []
    bucket.push(q)
    grouped.set(q.difficulty, bucket)
  }
  const out = []
  for (const difficulty of [...grouped.keys()].sort((a, b) => a - b)) {
    out.push(...shuffle(grouped.get(difficulty) || [], random))
  }
  return out
}

function moduleWeight(moduleId) {
  const weight = MOCK_SECTION_WEIGHTS[moduleId]
  return weight == null || weight <= 0 ? 1 : weight
}

function weightedPick(list, random) {
  if (!list.length) return null
  let ticket = random() * list.reduce((sum, q) => sum + moduleWeight(q.moduleId), 0)
  for (const q of list) {
    ticket -= moduleWeight(q.moduleId)
    if (ticket <= 0) return q
  }
  return list[list.length - 1]
}

function weightedShuffle(list, random) {
  const remaining = list.slice()
  const out = []
  while (remaining.length) {
    const pick = weightedPick(remaining, random)
    if (!pick) break
    out.push(pick)
    remaining.splice(remaining.findIndex((q) => q.id === pick.id), 1)
  }
  return out
}

function shuffle(list, random) {
  const out = list.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    const tmp = out[i]
    out[i] = out[j]
    out[j] = tmp
  }
  return out
}

function take(list, n) {
  return n >= list.length ? list.slice() : list.slice(0, n)
}

function addDays(from, days) {
  return new Date(from.getTime() + days * 24 * 60 * 60 * 1000)
}

function readJson(storage, key, fallback) {
  try {
    const raw = storage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

function memoryStore() {
  const data = new Map()
  return {
    get length() {
      return data.size
    },
    clear: () => data.clear(),
    getItem: (key) => data.get(key) ?? null,
    key: (index) => [...data.keys()][index] ?? null,
    removeItem: (key) => data.delete(key),
    setItem: (key, value) => data.set(key, String(value)),
  }
}
