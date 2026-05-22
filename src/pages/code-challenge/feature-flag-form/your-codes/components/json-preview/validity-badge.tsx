import { CircleAlert, CircleCheck } from 'lucide-react'

import { cn } from '#/lib/utils'

interface ValidityBadgeProps {
  isValid: boolean
}

export const ValidityBadge = ({ isValid }: ValidityBadgeProps) => (
  <span
    className={cn(
      'inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide',
      isValid
        ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
        : 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400',
    )}
    title={isValid ? 'Schema is valid' : 'Schema has errors — see the fields on the left'}
  >
    {isValid ? <CircleCheck className="size-3" /> : <CircleAlert className="size-3" />}
    {isValid ? 'Valid' : 'Invalid'}
  </span>
)
