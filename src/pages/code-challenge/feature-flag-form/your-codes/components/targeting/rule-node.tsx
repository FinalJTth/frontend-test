import { GripVertical, Trash2 } from 'lucide-react'

import { Button } from '#/components/ui/button'

import { operatorSchema } from '../../libs/schema'
import type { Operator } from '../../libs/types'
import { SelectField } from '../fields/select-field'
import { TextField } from '../fields/text-field'
import type { DragHandleProps } from '../shared/sortable-list'

interface RuleNodeProps {
  name: string
  onRemove: () => void
  dragHandle?: DragHandleProps
}

export const RuleNode = ({ name, onRemove, dragHandle }: RuleNodeProps) => {
  return (
    <div className="bg-background flex items-start gap-2 rounded-md border p-2">
      <button
        type="button"
        className="text-muted-foreground hover:text-foreground mt-2 cursor-grab touch-none"
        {...dragHandle?.attributes}
        {...dragHandle?.listeners}
      >
        <GripVertical className="size-4" />
      </button>

      <div className="grid flex-1 grid-cols-12 gap-2">
        <TextField name={`${name}.field`} placeholder="field (e.g. country)" className="col-span-4" />
        <SelectField<Operator> name={`${name}.operator`} options={operatorSchema.options} className="col-span-3" />
        <TextField name={`${name}.value`} placeholder="value" className="col-span-5" />
      </div>

      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="text-muted-foreground hover:text-destructive"
        onClick={onRemove}
      >
        <Trash2 className="size-4" />
      </Button>
    </div>
  )
}
