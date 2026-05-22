import { useStore } from '@tanstack/react-form'

import type { FeatureFlag } from '../libs/types'
import { useFormContext } from './context'

export const useFormValues = <T>(selector: (values: FeatureFlag) => T): T => {
  const form = useFormContext()
  return useStore(
    /*
     * Since our form state is deeply nested because of the Group schema, we need to cast the store to any
     * to avoid type errors. This is because Typescript overloads when it tries to infer recursive types with many fields.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    form.store as any,
    (snapshot: unknown) =>
      selector((snapshot as { values: FeatureFlag }).values),
  )
}
