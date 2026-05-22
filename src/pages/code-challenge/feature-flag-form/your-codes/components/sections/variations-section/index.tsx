import { Plus } from 'lucide-react'

import { Button } from '#/components/ui/button'

import { useFormContext } from '../../../form'
import { createBooleanVariation, nextVariationKey } from '../../../libs/defaults'
import type { Variation } from '../../../libs/types'
import { FieldError } from '../../shared/field-error'
import { SectionCard } from '../../shared/section-card'
import { SortableItem, SortableList } from '../../shared/sortable-list'
import { VariationRow } from './variation-row'

export const VariationsSection = () => {
  const form = useFormContext()
  return (
    <SectionCard
      step={2}
      title="Variations"
      description="กำหนดค่าที่ Flag จะ return (key → value)"
      action={
        <form.Field name="variations" mode="array">
          {(field) => (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() =>
                field.pushValue(
                  createBooleanVariation(nextVariationKey(field.state.value as Variation[]), false),
                )
              }
            >
              <Plus className="size-4" /> เพิ่ม Variation
            </Button>
          )}
        </form.Field>
      }
    >
      <form.Field name="variations" mode="array">
        {(field) => {
          const variations = field.state.value as Variation[]
          return (
            <div className="space-y-2">
              <SortableList
                ids={variations.map((v) => v.id)}
                onReorder={(from, to) => field.moveValue(from, to)}
              >
                {variations.map((v, index) => (
                  <SortableItem key={v.id} id={v.id}>
                    {(handle) => (
                      <VariationRow
                        index={index}
                        canRemove={variations.length > 1}
                        onRemove={() => field.removeValue(index)}
                        dragHandle={handle}
                      />
                    )}
                  </SortableItem>
                ))}
              </SortableList>
              <FieldError field={field} />
            </div>
          )
        }}
      </form.Field>
    </SectionCard>
  )
}
