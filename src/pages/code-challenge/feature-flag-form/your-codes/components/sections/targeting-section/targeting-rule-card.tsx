import { GripVertical, Trash2 } from 'lucide-react'

import { Badge } from '#/components/ui/badge'
import { Button } from '#/components/ui/button'
import { Label } from '#/components/ui/label'

import { useFormValues } from '../../../form'
import { stringifyCondition } from '../../../libs/stringify-condition'
import { NumberField } from '../../fields/number-field'
import { SelectField } from '../../fields/select-field'
import { TextField } from '../../fields/text-field'
import type { DragHandleProps } from '../../shared/sortable-list'
import { GroupNode } from '../../targeting/group-node'

interface TargetingRuleCardProps {
  index: number
  onRemove: () => void
  dragHandle?: DragHandleProps
}

export const TargetingRuleCard = ({ index, onRemove, dragHandle }: TargetingRuleCardProps) => {
  const variationKeys = useFormValues((v) =>
    Array.from(new Set(v.variations.map((x) => x.key).filter(Boolean))),
  )
  const previewQuery = useFormValues((v) =>
    stringifyCondition(v.targeting[index].condition),
  )

  return (
    <div className="bg-card space-y-3 rounded-lg border p-3 shadow-sm">
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground mt-2 cursor-grab touch-none"
          {...dragHandle?.attributes}
          {...dragHandle?.listeners}
        >
          <GripVertical className="size-4" />
        </button>

        <div className="flex flex-1 items-center gap-2">
          <Badge variant="secondary" className="shrink-0">
            #{index + 1}
          </Badge>
          <TextField
            name={`targeting[${index}].name`}
            placeholder="Rule name"
            className="max-w-xs flex-1"
          />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground hover:text-destructive shrink-0"
          onClick={onRemove}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <NumberField name={`targeting[${index}].percentage`} label="Rollout %" min={0} max={100} />
        <SelectField
          name={`targeting[${index}].variation`}
          label="Serve Variation *"
          options={variationKeys}
          placeholder="เลือก Variation..."
        />
      </div>

      <div>
        <Label className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
          Condition
        </Label>
        <div className="mt-1.5">
          <GroupNode name={`targeting[${index}].condition`} depth={0} />
        </div>
        {previewQuery && (
          <pre className="bg-muted text-muted-foreground mt-2 overflow-x-auto rounded px-2 py-1 font-mono text-xs">
            query: {previewQuery}
          </pre>
        )}
      </div>
    </div>
  )
}
