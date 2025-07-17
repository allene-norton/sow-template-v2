"use client"

import { Button } from "@/components/ui/button"
import { FileText, Download } from "lucide-react" // Removed FileDown
import { SOWHeader } from "./sow-header"
import { ProjectOverview } from "./project-overview"
import { RequirementsSectionPreview } from "./requirements-section-preview"
import { WorkspaceSetupSectionPreview } from "./workspace-setup-section-preview"
import { CoreAutomationsSectionPreview } from "./core-automations-section-preview"
import { ExtrasSectionPreview } from "./extras-section-preview"
import { PricingStructurePreview } from "./pricing-structure-preview"
import { TotalInvestmentSummary } from "./total-investment-summary"
import { SOWFooter } from "./sow-footer"
import type { ProjectData } from "../../sow-template-types"

interface PreviewInterfaceProps {
  data: ProjectData
  totalSoftwareCost: number
  discountedPrepRate: number
  discountedAutomationRate: number
  setIsEditing: (editing: boolean) => void
  generateHTML: () => void
}

export function PreviewInterface({
  data,
  totalSoftwareCost,
  discountedPrepRate,
  discountedAutomationRate,
  setIsEditing,
  generateHTML,
}: PreviewInterfaceProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <SOWHeader title={data.title} subtitle={data.subtitle} />
      <ProjectOverview overview={data.overview} />
      <RequirementsSectionPreview data={data} totalSoftwareCost={totalSoftwareCost} />
      <WorkspaceSetupSectionPreview setups={data.setups} />
      <CoreAutomationsSectionPreview automations={data.automations} />
      <ExtrasSectionPreview data={data} />
      <PricingStructurePreview
        data={data}
        discountedPrepRate={discountedPrepRate}
        discountedAutomationRate={discountedAutomationRate}
      />
      <TotalInvestmentSummary data={data} />

      <div className="flex gap-4 mb-8">
        <Button onClick={() => setIsEditing(true)} className="bg-green-800 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          Edit Template
        </Button>
        <Button onClick={generateHTML} variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Download HTML
        </Button>
      </div>

      <SOWFooter />
    </div>
  )
}
