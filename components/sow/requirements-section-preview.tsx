import { Card, CardContent } from "@/components/ui/card"
import { SoftwareRequirementsPreview } from "./software-requirements-preview"
import { CredentialRequirementsPreview } from "./credential-requirements-preview"
import type { ProjectData } from "../../sow-template-types"

interface RequirementsSectionPreviewProps {
  data: ProjectData
  totalSoftwareCost: number
}

export function RequirementsSectionPreview({ data, totalSoftwareCost }: RequirementsSectionPreviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b-2 border-gray-200 pb-2">Requirements</h2>
        <SoftwareRequirementsPreview
          softwareRequirements={data.softwareRequirements}
          totalSoftwareCost={totalSoftwareCost}
        />
        <CredentialRequirementsPreview credentialRequirements={data.credentialRequirements} />
      </CardContent>
    </Card>
  )
}
