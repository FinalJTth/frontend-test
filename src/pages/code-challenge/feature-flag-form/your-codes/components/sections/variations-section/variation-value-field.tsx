import { Input } from '#/components/ui/input'
import { Switch } from '#/components/ui/switch'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../../form'
import type { VariationType } from '../../../libs/types'
import { FieldError } from '../../shared/field-error'

interface VariationValueFieldProps {
  index: number
  type: VariationType
}

export const VariationValueField = ({ index, type }: VariationValueFieldProps) => {
  const form = useFormContext()
  const name = `variations[${index}].value`

  if (type === 'boolean') {
    return (
      <form.Field name={name}>
        {(field) => (
          <div className="flex items-center gap-2 px-2 py-1.5">
            <Switch checked={field.state.value as boolean} onCheckedChange={field.handleChange} />
            <span className="text-muted-foreground text-xs">{field.state.value ? 'true' : 'false'}</span>
          </div>
        )}
      </form.Field>
    )
  }

  if (type === 'number') {
    return (
      <form.Field name={name}>
        {(field) => (
          <>
            <Input
              type="number"
              value={String(field.state.value as number)}
              onChange={(e) => field.handleChange(Number(e.target.value))}
              onBlur={field.handleBlur}
            />
            <FieldError field={field} />
          </>
        )}
      </form.Field>
    )
  }

  return (
    <form.Field name={name}>
      {(field) => (
        <>
          <Input
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={type === 'json' ? '{"foo": "bar"}' : 'value'}
            className={cn(type === 'json' && 'font-mono text-xs')}
          />
          <FieldError field={field} />
        </>
      )}
    </form.Field>
  )
}
