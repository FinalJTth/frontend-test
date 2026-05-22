import { Editor } from '@monaco-editor/react'
import { Check, Copy } from 'lucide-react'
import { useState } from 'react'

import { Button } from '#/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '#/components/ui/card'

import { useFormValues } from '../form'
import { stringifyFlag } from '../libs/serializer'

export const JsonPreview = () => {
  const [copied, setCopied] = useState(false)
  const json = useFormValues(stringifyFlag)

  const onCopy = async () => {
    await navigator.clipboard.writeText(json)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <Card className="lg:sticky lg:top-4 flex h-[calc(100vh-2rem)] flex-col gap-0 overflow-hidden p-0">
      <CardHeader className="border-border bg-card flex flex-row items-center justify-between gap-2 space-y-0 border-b px-4 py-3">
        <CardTitle className="text-muted-foreground font-mono text-sm">
          expected.json
        </CardTitle>
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
