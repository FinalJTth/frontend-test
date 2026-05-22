import { Editor } from '@monaco-editor/react'
import { useStore } from '@tanstack/react-form'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

import { useFormContext, useFormValues } from '../../form'
import { stringifyFlag } from '../../libs/serializer'
import { ValidityBadge } from './validity-badge'

export const JsonPreview = () => {
  const form = useFormContext()
  const [copied, setCopied] = useState(false)
  const json = useFormValues(stringifyFlag)
  // Single bool — read straight from the store instead of a dedicated hook.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const isValid = useStore(form.store as any, (s: any) => s.isValid as boolean)

  const onCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="lg:sticky lg:top-4 flex h-[calc(100vh-2rem)] flex-col gap-0 overflow-hidden p-0">
      <CardHeader className="border-border bg-card flex flex-row items-center justify-between gap-2 space-y-0 border-b px-4 py-3">
        <div className="flex items-center gap-2">
          <CardTitle className="text-muted-foreground font-mono text-sm">
            expected.json
          </CardTitle>
          <ValidityBadge isValid={isValid} />
        </div>
        <Button size="sm" variant="outline" onClick={onCopy} className="h-7 gap-1.5 text-xs">
          {copied ? <><Check className="size-3" /> คัดลอกแล้ว</> : <><Copy className="size-3" /> คัดลอก</>}
        </Button>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden p-0">
        <Editor
          height="100%"
          language="json"
          theme="vs-dark"
          value={json}
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 13,
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            renderLineHighlight: 'none',
          }}
        />
      </CardContent>
    </Card>
  )
}
