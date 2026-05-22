import { formOptions } from '@tanstack/react-form'

import { createDefaultFlag } from '../libs/defaults'
import { featureFlagSchema } from '../libs/schema'

export const flagFormOptions = formOptions({
  defaultValues: createDefaultFlag(),
  validators: {
    onChange: featureFlagSchema,
  },
})
