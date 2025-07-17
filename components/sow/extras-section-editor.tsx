import { Card, CardContent } from "@/components/ui/card"
import { ExcludedItemsEditor } from "./excluded-items-editor"
import { FutureEnhancementsEditor } from "./future-enhancements-editor"
import type { ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface ExtrasSectionEditorProps {
  data: ProjectData
  setData: Dispatch<SetStateAction<ProjectData>>
}

export function ExtrasSectionEditor({ data, setData }: ExtrasSectionEditorProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <ExcludedItemsEditor excludedItems={data.excludedItems} setData={setData} />
        <FutureEnhancementsEditor futureEnhancements={data.futureEnhancements} setData={setData} />
      </CardContent>
    </Card>
  )
}
