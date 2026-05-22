import type { ReactNode } from 'react'

interface FieldShape<TValue = unknown> {
  name: string
  state: {
    value: TValue
    meta: {
      errors: ReadonlyArray<unknown>
      isTouched: boolean
    }
  }
  handleChange: (next: TValue) => void
  handleBlur: () => void
  pushValue: (value: TValue extends ReadonlyArray<infer U> ? U : never) => void
  removeValue: (index: number) => void
  moveValue: (fromIndex: number, toIndex: number) => void
}

/*
 * Build a facade because tanstack-form's deep field-path inference
 * can't model the recursive Group schema. Zod still validates at runtime properly.
 */
export interface FlagFormApi {
  Field: React.FC<{
    name: string
    mode?: 'array'
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: (field: FieldShape<any>) => ReactNode
  }>
  store: unknown
  handleSubmit: () => void
  getFieldValue: (name: string) => unknown
  setFieldValue: (name: string, value: unknown) => void
}
