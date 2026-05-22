import { Label } from '#/components/ui/label'
import { Switch } from '#/components/ui/switch'

import { useFormContext } from '../../form'

interface SwitchFieldProps {
  name: string
  label: React.ReactNode
  description?: React.ReactNode
}

export const SwitchField = ({ name, label, description }: SwitchFieldProps) => {
  const form = useFormContext()
  return (
    <form.Field name={name}>
      {(field) => (
        <div className="flex items-center justify-between gap-3 rounded-lg border p-3">
          <div className="space-y-0.5">
            <Label htmlFor={field.name} className="text-sm font-medium">
              {label}
            </Label>
            {description && (
              <p className="text-muted-foreground text-xs">{description}</p>
            )}
          </div>
          <Switch
            id={field.name}
            checked={field.state.value as boolean}
            onCheckedChange={field.handleChange}
          />
        </div>
      )}
    </form.Field>
  )
}
