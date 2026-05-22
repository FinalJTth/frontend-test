import { stringifyCondition } from './stringify-condition'
import type { FeatureFlag, Variation } from './types'

const normalizeVariationValue = (v: Variation): unknown => {
  if (v.type === 'json') {
    try {
      return JSON.parse(v.value)
    } catch {
      return v.value
    }
  }
  return v.value
}

export const toGoFeatureFlag = (flag: FeatureFlag) => {
  const variations = Object.fromEntries(
    flag.variations.map((v) => [v.key, normalizeVariationValue(v)]),
  )

  const targeting = flag.targeting.map((t) => ({
    name: t.name,
    query: stringifyCondition(t.condition),
    percentage: t.percentage,
    variation: t.variation,
  }))

  const body: Record<string, unknown> = {}
  if (flag.description) body.description = flag.description
  if (flag.version) body.version = flag.version
  if (!flag.enabled) body.disable = true
  body.variations = variations
  body.targeting = targeting
  body.defaultRule = flag.defaultRule

  return {
    flags: {
      [flag.name]: body,
    },
  }
}

export const stringifyFlag = (flag: FeatureFlag): string =>
  JSON.stringify(toGoFeatureFlag(flag), null, 2)
