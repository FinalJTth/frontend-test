import { SwitchField } from '../fields/switch-field'
import { TextField } from '../fields/text-field'
import { TextareaField } from '../fields/textarea-field'
import { SectionCard } from '../shared/section-card'

export const MetadataSection = () => {
  return (
    <SectionCard
      step={1}
      title="Flag Metadata"
      description="ตั้งชื่อ, คำอธิบาย, และสถานะการใช้งานของ Flag"
    >
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <TextField name="name" label="Flag Name *" placeholder="my-new-feature" className="md:col-span-2" />
          <TextField name="version" label="Version" placeholder="1.0.0" />
        </div>

        <TextareaField name="description" label="Description" placeholder="Flag นี้ใช้ทำอะไร?" rows={3} />

        <SwitchField
          name="enabled"
          label="Enabled"
          description="ปิดเพื่อให้ defaultRule ใช้กับผู้ใช้ทุกคน"
        />
      </div>
    </SectionCard>
  )
}
