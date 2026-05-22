import type { FeatureFlag, Group, Rule, Targeting, Variation } from './types'

const uid = (): string => crypto.randomUUID()

export const createRule = (): Rule => ({
  id: uid(),
  kind: 'rule',
  field: '',
  operator: '==',
  value: '',
})

export const createGroup = (): Group => ({
  id: uid(),
  kind: 'group',
  combinator: 'AND',
  children: [createRule()],
})

export const createTargeting = (index: number): Targeting => ({
  id: uid(),
  name: `Rule ${index}`,
  percentage: 100,
  variation: '',
  condition: createGroup(),
})

export const createBooleanVariation = (key: string, value: boolean): Variation => ({
  id: uid(),
  key,
  type: 'boolean',
  value,
})

// Pick the smallest `variation_N` that isn't already in use, so add/remove/add
// cycles don't reuse a freshly-deleted key.
export const nextVariationKey = (existing: ReadonlyArray<Variation>): string => {
  const taken = new Set(existing.map((v) => v.key))
  for (let i = 1; i <= existing.length + 1; i++) {
    const candidate = `variation_${i}`
    if (!taken.has(candidate)) return candidate
  }
  return `variation_${existing.length + 1}`
}

export const createDefaultFlag = (): FeatureFlag => ({
  name: '',
  description: '',
  version: '1.0.0',
  enabled: true,
  variations: [
    createBooleanVariation('on', true),
    createBooleanVariation('off', false),
  ],
  targeting: [],
  defaultRule: { variation: 'off' },
})
