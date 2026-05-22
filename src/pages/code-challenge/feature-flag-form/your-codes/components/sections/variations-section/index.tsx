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

  // Read+write the variations array imperatively when the button is clicked
  // so this button doesn't need its own subscription to the array. The list
  // below already subscribes via the `form.Field` for rendering.
  const onAddVariation = () => {
    const current = form.getFieldValue('variations') as Variation[]
    const next = createBooleanVariation(nextVariationKey(current), false)
    form.setFieldValue('variations', [...current, next])
  }

  return (
    <SectionCard
      step={2}
      title="Variations"
      description="กำหนดค่าที่ Flag จะ return (key → value)"
      action={
        <Button type="button" size="sm" variant="outline" onClick={onAddVariation}>
          <Plus className="size-4" /> เพิ่ม Variation
        </Button>
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
