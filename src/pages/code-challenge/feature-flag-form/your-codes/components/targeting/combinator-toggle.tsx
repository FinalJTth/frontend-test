import { cn } from '#/lib/utils'

import type { Combinator } from '../../libs/types'

const OPTIONS = ['AND', 'OR'] as const

interface CombinatorToggleProps {
  value: Combinator
  onChange: (next: Combinator) => void
}

export const CombinatorToggle = ({ value, onChange }: CombinatorToggleProps) => {
  return (
    <div className="bg-muted inline-flex rounded-md p-0.5 text-xs font-semibold">
      {OPTIONS.map((op) => (
        <button
          key={op}
          type="button"
          onClick={() => onChange(op)}
          className={cn(
            'rounded px-3 py-1 transition-colors',
            value === op
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground',
          )}
        >
          {op}
        </button>
      ))}
    </div>
  )
}
