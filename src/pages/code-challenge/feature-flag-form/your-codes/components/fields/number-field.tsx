import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../form'
import { FieldError } from '../shared/field-error'

interface NumberFieldProps {
  name: string
  label?: React.ReactNode
  min?: number
  max?: number
  className?: string
}

export const NumberField = ({ name, label, min, max, className }: NumberFieldProps) => {
  const form = useFormContext()
  return (
    <form.Field name={name}>
      {(field) => (
        <div className={cn('space-y-1.5', className)}>
          {label && (
            <Label htmlFor={field.name} className="text-sm font-medium">
              {label}
            </Label>
          )}
          <Input
            id={field.name}
            type="number"
            value={String(field.state.value as number)}
            onChange={(e) => field.handleChange(Number(e.target.value))}
            onBlur={field.handleBlur}
            min={min}
            max={max}
          />
          <FieldError field={field} />
        </div>
      )}
    </form.Field>
  )
}
