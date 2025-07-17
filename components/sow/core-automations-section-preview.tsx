import { Card, CardContent } from "@/components/ui/card"
import { AutomationItemPreview } from "./automation-item-preview"
import type { AutomationItem } from "../../sow-template-types"

interface CoreAutomationsSectionPreviewProps {
  automations: AutomationItem[]
}

export function CoreAutomationsSectionPreview({ automations }: CoreAutomationsSectionPreviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b-2 border-gray-200 pb-2">Core Automations</h2>
        {automations.map((automation, index) => (
          <AutomationItemPreview key={automation.id} automation={automation} index={index} />
        ))}
      </CardContent>
    </Card>
  )
}
