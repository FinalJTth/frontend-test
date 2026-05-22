import { useFormValues } from '../../form'
import { SelectField } from '../fields/select-field'
import { SectionCard } from '../shared/section-card'

export const DefaultRuleSection = () => {
  const variationKeys = useFormValues((v) =>
    v.variations.map((x) => x.key).filter(Boolean),
  )

  return (
    <SectionCard
      step={4}
      title="Default Rule"
      description="ค่าที่ส่งคืนเมื่อไม่มี Targeting Rule ใดตรง"
    >
      <SelectField
        name="defaultRule.variation"
        label="Fallback Variation *"
        options={variationKeys}
        placeholder="เลือก Variation..."
        className="md:max-w-xs"
      />
    </SectionCard>
  )
}
