import { useStore } from '@tanstack/react-form'

import type { FeatureFlag } from '../libs/types'
import { useFormContext } from './context'

export const useFormValues = <T>(selector: (values: FeatureFlag) => T): T => {
  const form = useFormContext()
  return useStore(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.store as any,
    (snapshot: unknown) =>
      selector((snapshot as { values: FeatureFlag }).values),
  )
}
