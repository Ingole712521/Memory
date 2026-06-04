function normalize(value) {
  return String(value || "").toLowerCase().replace(/[^a-z0-9.]+/g, " ").trim()
}

function tokens(value) {
  return new Set(normalize(value).split(/\s+/).filter((token) => token.length >= 3))
}

const FIELD_SYNONYMS = {
  "food restrictions": ["diet.preference", "diet.allergy", "diet.restriction", "nutrition.allergy"],
  "diet restrictions": ["diet.preference", "diet.allergy", "diet.restriction", "nutrition.allergy"],
  "fitness goal": ["fitness.goal", "fitness.training_goal", "health.goal"],
  "preferred username": ["profile.username", "identity.preferred_username"],
  "email": ["profile.email", "identity.email"]
}

export const semanticMatchingExamples = [
  {
    app_field: "food restrictions",
    memact_fields: ["diet.preference", "diet.allergy"],
    reason: "Food restriction onboarding can use accepted diet preference and allergy memory."
  }
]

export function matchRequestedFields(requestedFields = [], memoryRecords = [], options = {}) {
  const threshold = Number(options.threshold ?? 0.12)
  return requestedFields.map((field) => {
    const fieldText = typeof field === "string" ? field : field.description || field.field_path || field.name
    const requested = tokens(fieldText)
    const synonymFields = FIELD_SYNONYMS[normalize(fieldText)] || []
    const matches = memoryRecords
      .map((memory) => {
        const fieldPath = memory.field_path || memory.path || ""
        const searchable = [
          fieldPath,
          memory.category,
          memory.label,
          memory.summary,
          memory.value,
          ...(memory.themes || [])
        ].join(" ")
        const candidate = tokens(searchable)
        let overlap = 0
        for (const token of requested) {
          if (candidate.has(token)) overlap += 1
        }
        const lexical = requested.size ? overlap / requested.size : 0
        const synonymBoost = synonymFields.includes(fieldPath) ? 0.72 : 0
        const score = Math.max(lexical, synonymBoost)
        return { field, memory, score }
      })
      .filter((match) => match.score >= threshold)
      .sort((left, right) => right.score - left.score)
    return { field, matches }
  })
}

