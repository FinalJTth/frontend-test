import { Label } from '#/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '#/components/ui/select'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../form'
import { FieldError } from '../shared/field-error'

interface SelectFieldProps<T extends string> {
  name: string
  options: ReadonlyArray<T>
  label?: React.ReactNode
  placeholder?: string
  className?: string
  onChange?: (value: T) => void
}

export const SelectField = <T extends string = string>({
  name,
  options,
  label,
  placeholder,
  className,
  onChange,
}: SelectFieldProps<T>) => {
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
          <Select
            /*
             * Always pass a defined string so Radix stays in controlled mode.
             * Effectively avoid `uncontrolled -> controlled` warning.
             */
            value={(field.state.value as T | undefined) ?? ('' as T)}
            disabled={options.length === 0}
            onValueChange={(v) => {
              field.handleChange(v as T)
              field.handleBlur()
              onChange?.(v as T)
            }}
          >
            <SelectTrigger id={field.name} className="w-full">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
              {options.map((opt) => (
                <SelectItem key={opt} value={opt}>
                  {opt}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError field={field} />
        </div>
      )}
    </form.Field>
  )
}
