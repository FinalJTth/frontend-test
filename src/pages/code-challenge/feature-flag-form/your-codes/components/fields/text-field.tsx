import { Input } from '#/components/ui/input'
import { Label } from '#/components/ui/label'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../form'
import { FieldError } from '../shared/field-error'

interface TextFieldProps {
  name: string
  label?: React.ReactNode
  placeholder?: string
  className?: string
}

export const TextField = ({ name, label, placeholder, className }: TextFieldProps) => {
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
            value={field.state.value as string}
            onChange={(e) => field.handleChange(e.target.value)}
            onBlur={field.handleBlur}
            placeholder={placeholder}
          />
          <FieldError field={field} />
        </div>
      )}
    </form.Field>
  )
}
