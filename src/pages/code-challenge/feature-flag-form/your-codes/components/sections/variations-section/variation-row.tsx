import { GripVertical, Trash2 } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

import { useFormContext, useFormValues } from '../../../form'
import { variationTypeSchema } from '../../../libs/schema'
import type { VariationType } from '../../../libs/types'
import { SelectField } from '../../fields/select-field'
import { TextField } from '../../fields/text-field'
import type { DragHandleProps } from '../../shared/sortable-list'
import { VariationValueField } from './variation-value-field'

const TYPE_DEFAULTS: Record<VariationType, string | number | boolean> = {
  boolean: false,
  string: '',
  number: 0,
  json: '{}',
}

interface VariationRowProps {
  index: number
  canRemove: boolean
  onRemove: () => void
  dragHandle?: DragHandleProps
}

export const VariationRow = ({ index, canRemove, onRemove, dragHandle }: VariationRowProps) => {
  const form = useFormContext()
  const type = useFormValues((v) => v.variations[index].type)

  const onTypeChange = (next: VariationType) => {
    form.setFieldValue(`variations[${index}].value`, TYPE_DEFAULTS[next])
  }

  return (
    <div className="bg-card flex items-start gap-2 rounded-lg border p-2">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground mt-2 cursor-grab touch-none"
        {...dragHandle?.attributes}
        {...dragHandle?.listeners}
      >
        <GripVertical className="size-4" />
      </button>

      <div className="grid flex-1 grid-cols-12 gap-2">
        <TextField name={`variations[${index}].key`} placeholder="key (e.g. on)" className="col-span-4" />
        <SelectField<VariationType>
          name={`variations[${index}].type`}
          options={variationTypeSchema.options}
          className="col-span-3"
          onChange={onTypeChange}
        />
        <div className="col-span-5">
          <VariationValueField index={index} type={type} />
        </div>
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className={cn(
          'text-muted-foreground hover:text-destructive',
          !canRemove && 'cursor-not-allowed opacity-40',
        )}
        disabled={!canRemove}
        onClick={onRemove}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
