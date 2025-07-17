"use client"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download } from "lucide-react" // Removed FileDown
import { BasicInfoEditor } from "./basic-info-editor"
import { RequirementsSectionEditor } from "./requirements-section-editor"
import { WorkspaceSetupSectionEditor } from "./workspace-setup-section-editor"
import { CoreAutomationsSectionEditor } from "./core-automations-section-editor"
import { ExtrasSectionEditor } from "./extras-section-editor"
import type { ProjectData, AutomationItem, SetupItem } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface EditInterfaceProps {
  data: ProjectData
  setData: Dispatch<SetStateAction<ProjectData>>
  totalSoftwareCost: number
  totalSetupHours: number
  totalAutomationHours: number // Added this prop
  discountedPrepRate: number
  discountedAutomationRate: number
  addAutomation: () => void
  removeAutomation: (id: string) => void
  updateAutomation: (id: string, field: keyof AutomationItem, value: any) => void
  addSetup: () => void
  removeSetup: (id: string) => void
  updateSetup: (id: string, field: keyof SetupItem, value: any) => void
  setIsEditing: (editing: boolean) => void
  generateHTML: () => void
}

export function EditInterface({
  data,
  setData,
  totalSoftwareCost,
  totalSetupHours,
  totalAutomationHours, // Receive this prop
  discountedPrepRate,
  discountedAutomationRate,
  addAutomation,
  removeAutomation,
  updateAutomation,
  addSetup,
  removeSetup,
  updateSetup,
  setIsEditing,
  generateHTML,
}: EditInterfaceProps) {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit SOW Template</h1>
        <div className="flex gap-2">
          <Button onClick={() => setIsEditing(false)} variant="outline">
            Preview
          </Button>
          <Button onClick={generateHTML} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Download HTML
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="requirements">Requirements</TabsTrigger>
          <TabsTrigger value="setups">Setups</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="extras">Extras</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <BasicInfoEditor
            data={data}
            setData={setData}
            totalSetupHours={totalSetupHours}
            totalAutomationHours={totalAutomationHours} // Pass to BasicInfoEditor
            discountedPrepRate={discountedPrepRate}
            discountedAutomationRate={discountedAutomationRate}
          />
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6">
          <RequirementsSectionEditor data={data} totalSoftwareCost={totalSoftwareCost} setData={setData} />
        </TabsContent>

        <TabsContent value="setups" className="space-y-4">
          <WorkspaceSetupSectionEditor
            setups={data.setups}
            addSetup={addSetup}
            updateSetup={updateSetup}
            removeSetup={removeSetup}
          />
        </TabsContent>

        <TabsContent value="automations" className="space-y-4">
          <CoreAutomationsSectionEditor
            automations={data.automations}
            addAutomation={addAutomation}
            updateAutomation={updateAutomation}
            removeAutomation={removeAutomation}
          />
        </TabsContent>

        <TabsContent value="extras" className="space-y-6">
          <ExtrasSectionEditor data={data} setData={setData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
