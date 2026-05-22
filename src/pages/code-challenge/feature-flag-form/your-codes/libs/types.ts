import type z from 'zod'
import type {
  defaultRuleSchema,
  featureFlagSchema,
  ruleSchema,
  targetingSchema,
  variationSchema,
  variationTypeSchema,
} from './schema'

export type VariationType = z.infer<typeof variationTypeSchema>

export type Operator = '==' | '!=' | '>' | '<' | 'in'

export type Combinator = 'AND' | 'OR'

export type Group = {
  id: string
  kind: 'group'
  combinator: Combinator
  children: Array<Rule | Group>
}

export type Rule = z.infer<typeof ruleSchema>
export type Variation = z.infer<typeof variationSchema>
export type Targeting = z.infer<typeof targetingSchema>
export type DefaultRule = z.infer<typeof defaultRuleSchema>
export type FeatureFlag = z.infer<typeof featureFlagSchema>
