import { Card, CardContent } from "@/components/ui/card"
import { SoftwareRequirementsEditor } from "./software-requirements-editor"
import { CredentialRequirementsEditor } from "./credential-requirements-editor"
import type { ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface RequirementsSectionEditorProps {
  data: ProjectData
  totalSoftwareCost: number
  setData: Dispatch<SetStateAction<ProjectData>>
}

export function RequirementsSectionEditor({ data, totalSoftwareCost, setData }: RequirementsSectionEditorProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <SoftwareRequirementsEditor
          softwareRequirements={data.softwareRequirements}
          totalSoftwareCost={totalSoftwareCost}
          setData={setData}
        />
        <CredentialRequirementsEditor credentialRequirements={data.credentialRequirements} setData={setData} />
      </CardContent>
    </Card>
  )
}
