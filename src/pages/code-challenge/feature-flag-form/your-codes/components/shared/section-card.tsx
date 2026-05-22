import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

interface SectionCardProps {
  step: number
  title: string
  description?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
}

export const SectionCard = ({ step, title, description, action, children }: SectionCardProps) => {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
        <div className="space-y-1">
          <CardTitle className="flex items-center gap-2 text-lg">
            <span className="bg-primary text-primary-foreground inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold">
              {step}
            </span>
            {title}
          </CardTitle>
          {description && (
            <p className="text-muted-foreground text-sm">{description}</p>
          )}
        </div>
        {action}
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
