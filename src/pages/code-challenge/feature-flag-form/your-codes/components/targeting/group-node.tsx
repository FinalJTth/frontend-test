import { FolderPlus, GripVertical, Plus, Trash2 } from 'lucide-react'

import { Button } from '#/components/ui/button'
import { cn } from '#/lib/utils'

import { useFormContext } from '../../form'
import { createGroup, createRule } from '../../libs/defaults'
import type { Combinator, Group, Rule } from '../../libs/types'
import { FieldError } from '../shared/field-error'
import { SortableItem, SortableList, type DragHandleProps } from '../shared/sortable-list'
import { CombinatorToggle } from './combinator-toggle'
import { RuleNode } from './rule-node'

const DEPTH_ACCENTS = ['border-l-blue-500/70', 'border-l-purple-500/70', 'border-l-amber-500/70'] as const

interface GroupNodeProps {
  name: string
  depth: number
  onRemove?: () => void
  dragHandle?: DragHandleProps
}

export const GroupNode = ({ name, depth, onRemove, dragHandle }: GroupNodeProps) => {
  const form = useFormContext()
  const accent = DEPTH_ACCENTS[depth % DEPTH_ACCENTS.length]

  return (
    <div className={cn('bg-muted/30 space-y-3 rounded-lg border border-l-4 p-3', accent)}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {dragHandle && (
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground cursor-grab touch-none"
              {...dragHandle.attributes}
              {...dragHandle.listeners}
            >
              <GripVertical className="size-4" />
            </button>
          )}
          <span className="text-muted-foreground text-xs font-semibold uppercase tracking-wider">
            {depth === 0 ? 'Match' : 'Group'}
          </span>
          <form.Field name={`${name}.combinator`}>
            {(field) => (
              <CombinatorToggle
                value={field.state.value as Combinator}
                onChange={field.handleChange}
              />
            )}
          </form.Field>
        </div>
        {onRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-muted-foreground hover:text-destructive h-7"
          >
            <Trash2 className="size-3" /> ลบกลุ่ม
          </Button>
        )}
      </div>

      <form.Field name={`${name}.children`} mode="array">
        {(field) => {
          // During mid-reorder of a list mixed with Rules and Groups, there is
          // a brief window where the `field` can resolve to a sibling Rule (no `.children`).
          // If we don't guard against this, the `children` will be undefined, and throw an error.
          const children = (field.state.value ?? []) as Array<Rule | Group>
          return (
            <div className="space-y-2">
              <SortableList
                ids={children.map((c) => c.id)}
                onReorder={(from, to) => field.moveValue(from, to)}
              >
                {children.map((child, index) => {
                  const childName = `${name}.children[${index}]`
                  return (
                    <SortableItem key={child.id} id={child.id}>
                      {(handle) =>
                        child.kind === 'rule' ? (
                          <RuleNode
                            name={childName}
                            onRemove={() => field.removeValue(index)}
                            dragHandle={handle}
                          />
                        ) : (
                          <GroupNode
                            name={childName}
                            depth={depth + 1}
                            onRemove={() => field.removeValue(index)}
                            dragHandle={handle}
                          />
                        )
                      }
                    </SortableItem>
                  )
                })}
              </SortableList>

              <FieldError field={field} />

              <div className="flex flex-wrap gap-2 pt-1">
                <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue(createRule())} className="h-7">
                  <Plus className="size-3" /> เพิ่มกฎ
                </Button>
                <Button type="button" variant="outline" size="sm" onClick={() => field.pushValue(createGroup())} className="h-7">
                  <FolderPlus className="size-3" /> เพิ่มกลุ่ม
                </Button>
              </div>
            </div>
          )
        }}
      </form.Field>
    </div>
  )
}
