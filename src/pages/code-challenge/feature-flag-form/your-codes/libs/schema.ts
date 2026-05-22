import { z } from 'zod'
import type { Group } from './types'

export const operatorSchema = z.enum(['==', '!=', '>', '<', 'in'])

export const variationTypeSchema = z.enum(['boolean', 'string', 'number', 'json'])

export const ruleSchema = z.object({
  id: z.string(),
  kind: z.literal('rule'),
  field: z.string().min(1, 'กรุณาระบุ field'),
  operator: operatorSchema,
  value: z.string().min(1, 'กรุณาระบุค่า'),
})

// Both type slots are Group: tanstack-form needs input and output shapes
// to match. Plain z.lazy() leaves the input as `unknown` which trips it up.
export const groupSchema: z.ZodType<Group, Group> = z.lazy(() => z.object({
  id: z.string(),
  kind: z.literal('group'),
  combinator: z.enum(['AND', 'OR']),
  children: z.array(z.union([ruleSchema, groupSchema])).min(1, 'กลุ่มต้องมีกฎอย่างน้อยหนึ่งข้อ'),
}))

export const variationSchema = z.discriminatedUnion('type', [
  z.object({ id: z.string(), key: z.string().min(1, 'กรุณาระบุ key'), type: z.literal('boolean'), value: z.boolean() }),
  z.object({ id: z.string(), key: z.string().min(1, 'กรุณาระบุ key'), type: z.literal('string'),  value: z.string() }),
  z.object({ id: z.string(), key: z.string().min(1, 'กรุณาระบุ key'), type: z.literal('number'),  value: z.number() }),
  z.object({ id: z.string(), key: z.string().min(1, 'กรุณาระบุ key'), type: z.literal('json'),    value: z.string().refine(
    (s) => {
      try { JSON.parse(s); return true } catch { return false }
    },
    { message: 'ต้องเป็น JSON ที่ถูกต้อง' },
  ) }),
])

export const targetingSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'กรุณาระบุชื่อ'),
  condition: groupSchema,
  percentage: z.number().min(0).max(100),
  variation: z.string().min(1, 'กรุณาเลือก Variation'),
})

export const defaultRuleSchema = z.object({
  variation: z.string().min(1, 'กรุณาเลือก Variation'),
})

// `enabled` is positive-coded in the form state; the serializer flips it
// back to GoFeatureFlag's `disable`.
export const featureFlagSchema = z.object({
  name: z.string().min(1, 'กรุณาระบุชื่อ'),
  description: z.string().optional(),
  version: z.string().optional(),
  enabled: z.boolean(),
  variations: z.array(variationSchema).min(1, 'ต้องมี Variation อย่างน้อยหนึ่งรายการ'),
  targeting: z.array(targetingSchema),
  defaultRule: defaultRuleSchema,
}).superRefine((flag, ctx) => {
  const keys = new Set<string>()
  flag.variations.forEach((v, i) => {
    if (keys.has(v.key)) {
      ctx.addIssue({
        code: 'custom',
        path: ['variations', i, 'key'],
        message: `key ซ้ำ "${v.key}"`,
      })
    }
    keys.add(v.key)
  })

  if (flag.defaultRule.variation && !keys.has(flag.defaultRule.variation)) {
    ctx.addIssue({
      code: 'custom',
      path: ['defaultRule', 'variation'],
      message: `ไม่พบ Variation "${flag.defaultRule.variation}"`,
    })
  }

  flag.targeting.forEach((t, i) => {
    if (t.variation && !keys.has(t.variation)) {
      ctx.addIssue({
        code: 'custom',
        path: ['targeting', i, 'variation'],
        message: `ไม่พบ Variation "${t.variation}"`,
      })
    }
  })
})
