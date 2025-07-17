import { Card, CardContent } from "@/components/ui/card"
import { ExcludedItemsPreview } from "./excluded-items-preview"
import { FutureEnhancementsPreview } from "./future-enhancements-preview"
import type { ProjectData } from "../../sow-template-types"

interface ExtrasSectionPreviewProps {
  data: ProjectData
}

export function ExtrasSectionPreview({ data }: ExtrasSectionPreviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b-2 border-gray-200 pb-2">
          Future Enhancements
        </h2>
        <ExcludedItemsPreview excludedItems={data.excludedItems} />
        <FutureEnhancementsPreview futureEnhancements={data.futureEnhancements} />
      </CardContent>
    </Card>
  )
}
