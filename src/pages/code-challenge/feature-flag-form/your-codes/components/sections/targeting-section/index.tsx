import { Plus } from 'lucide-react'

import { Button } from '#/components/ui/button'

import { useFormContext } from '../../../form'
import { createTargeting } from '../../../libs/defaults'
import type { Targeting } from '../../../libs/types'
import { SectionCard } from '../../shared/section-card'
import { SortableItem, SortableList } from '../../shared/sortable-list'
import { TargetingRuleCard } from './targeting-rule-card'

export const TargetingSection = () => {
  const form = useFormContext()
  return (
    <SectionCard
      step={3}
      title="Targeting Rules"
      description="ลำดับมีผล: ตัวบนสุดทำงานก่อน"
      action={
        <form.Field name="targeting" mode="array">
          {(field) => (
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={() => field.pushValue(createTargeting(field.state.value.length + 1))}
            >
              <Plus className="size-4" /> เพิ่มกฎ
            </Button>
          )}
        </form.Field>
      }
    >
      <form.Field name="targeting" mode="array">
        {(field) => {
          const rules = field.state.value as Targeting[]
          if (rules.length === 0) {
            return (
              <p className="text-muted-foreground rounded-md border border-dashed p-4 text-center text-sm">
                ยังไม่มีกฎ ผู้ใช้ทุกคนจะได้รับ default variation
              </p>
            )
          }
          return (
            <div className="space-y-3">
              <SortableList
                ids={rules.map((t) => t.id)}
                onReorder={(from, to) => field.moveValue(from, to)}
              >
                {rules.map((t, index) => (
                  <SortableItem key={t.id} id={t.id}>
                    {(handle) => (
                      <TargetingRuleCard
                        index={index}
                        onRemove={() => field.removeValue(index)}
                        dragHandle={handle}
                      />
                    )}
                  </SortableItem>
                ))}
              </SortableList>
            </div>
          )
        }}
      </form.Field>
    </SectionCard>
  )
}
