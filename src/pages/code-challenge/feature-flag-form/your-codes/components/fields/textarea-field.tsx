import { Label } from '#/components/ui/label'
import { Textarea } from '#/components/ui/textarea'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../form'
import { FieldError } from '../shared/field-error'

interface TextareaFieldProps {
  name: string
  label?: React.ReactNode
  placeholder?: string
  rows?: number
  className?: string
}

export const TextareaField = ({ name, label, placeholder, rows = 3, className }: TextareaFieldProps) => {
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
          <Textarea
            id={field.name}
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
            rows={rows}
          />
          <FieldError field={field} />
        </div>
      )}
    </form.Field>
  )
}
