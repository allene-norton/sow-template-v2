import { Card, CardContent } from "@/components/ui/card"
import { SetupItemPreview } from "./setup-item-preview"
import type { SetupItem } from "../../sow-template-types"

interface WorkspaceSetupSectionPreviewProps {
  setups: SetupItem[]
}

export function WorkspaceSetupSectionPreview({ setups }: WorkspaceSetupSectionPreviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b-2 border-gray-200 pb-2">Workspace Setup</h2>
        {setups.map((setup, index) => (
          <SetupItemPreview key={setup.id} setup={setup} index={index} />
        ))}
      </CardContent>
    </Card>
  )
}
