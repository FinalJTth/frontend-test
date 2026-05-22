import Header from '#/components/features/header'

import { JsonPreview } from './components/json-preview'
import { DefaultRuleSection } from './components/sections/default-rule-section'
import { MetadataSection } from './components/sections/metadata-section'
import { TargetingSection } from './components/sections/targeting-section'
import { VariationsSection } from './components/sections/variations-section'
import { useFormContext } from './form'

const YourCode = () => {
  const form = useFormContext()

  return (
    <section>
      <Header
        title="เขียนโค้ดของคุณที่นี่"
        subTitle="กรอกข้อมูลด้านซ้าย แล้วดู GoFeatureFlag JSON อัปเดตทันทีด้านขวา"
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            form.handleSubmit()
          }}
          className="space-y-5"
        >
          <MetadataSection />
          <VariationsSection />
          <TargetingSection />
          <DefaultRuleSection />
        </form>
        <JsonPreview />
      </div>
    </section>
  )
}

export default YourCode
