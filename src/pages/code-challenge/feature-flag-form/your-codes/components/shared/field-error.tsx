interface FieldLike {
  state: {
    meta: {
      errors: ReadonlyArray<unknown>
      isTouched: boolean
    }
  }
}

export const FieldError = ({ field }: { field: FieldLike }) => {
  const { errors, isTouched } = field.state.meta
  if (!isTouched || errors.length === 0) return null
  const message = (errors[0] as { message?: string }).message
  if (!message) return null
  return <p className="text-destructive mt-1 text-xs">{message}</p>
}
