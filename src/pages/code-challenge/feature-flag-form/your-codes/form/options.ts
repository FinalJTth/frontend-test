import { formOptions } from '@tanstack/react-form'

import { createDefaultFlag } from '../libs/defaults'
import { featureFlagSchema } from '../libs/schema'

export const flagFormOptions = formOptions({
  defaultValues: createDefaultFlag(),
  validators: {
    /*
     *`onMount` runs the schema once at startup so `state.isValid` reflects
     * the real validation state immediately
     */
    onMount: featureFlagSchema,
    onChange: featureFlagSchema,
  },
})
