"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { SetupItemEditor } from "./setup-item-editor"
import type { SetupItem } from "../../sow-template-types"

interface WorkspaceSetupSectionEditorProps {
  setups: SetupItem[]
  addSetup: () => void
  updateSetup: (id: string, field: keyof SetupItem, value: any) => void
  removeSetup: (id: string) => void
}

export function WorkspaceSetupSectionEditor({
  setups,
  addSetup,
  updateSetup,
  removeSetup,
}: WorkspaceSetupSectionEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Workspace Setups</h2>
        <Button onClick={addSetup}>
          <Plus className="w-4 h-4 mr-2" />
          Add Setup
        </Button>
      </div>

      {setups.map((setup, index) => (
        <SetupItemEditor
          key={setup.id}
          setup={setup}
          index={index}
          updateSetup={updateSetup}
          removeSetup={removeSetup}
        />
      ))}
    </div>
  )
}
