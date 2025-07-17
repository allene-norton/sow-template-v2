"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AutomationItemEditor } from "./automation-item-editor"
import type { AutomationItem } from "../../sow-template-types"

interface CoreAutomationsSectionEditorProps {
  automations: AutomationItem[]
  addAutomation: () => void
  updateAutomation: (id: string, field: keyof AutomationItem, value: any) => void
  removeAutomation: (id: string) => void
}

export function CoreAutomationsSectionEditor({
  automations,
  addAutomation,
  updateAutomation,
  removeAutomation,
}: CoreAutomationsSectionEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Core Automations</h2>
        <Button onClick={addAutomation}>
          <Plus className="w-4 h-4 mr-2" />
          Add Automation
        </Button>
      </div>

      {automations.map((automation, index) => (
        <AutomationItemEditor
          key={automation.id}
          automation={automation}
          index={index}
          updateAutomation={updateAutomation}
          removeAutomation={removeAutomation}
        />
      ))}
    </div>
  )
}
