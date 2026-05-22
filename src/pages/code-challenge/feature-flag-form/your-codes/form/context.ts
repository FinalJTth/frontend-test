import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

import type { FlagFormApi } from './types'

const { fieldContext, formContext, useFormContext: rawUseFormContext } =
  createFormHookContexts()

export const useFormContext = rawUseFormContext as unknown as () => FlagFormApi

export const { useAppForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext,
})
