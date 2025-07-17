"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Minus } from "lucide-react"
import { MarkdownEditor } from "@/components/markdown-editor" // Import MarkdownEditor
import type { AutomationItem } from "../../sow-template-types"

interface AutomationItemEditorProps {
  automation: AutomationItem
  index: number
  updateAutomation: (id: string, field: keyof AutomationItem, value: any) => void
  removeAutomation: (id: string) => void
}

export function AutomationItemEditor({
  automation,
  index,
  updateAutomation,
  removeAutomation,
}: AutomationItemEditorProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Automation #{index + 1}</h3>
          <Button variant="destructive" size="sm" onClick={() => removeAutomation(automation.id)}>
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        <div>
          <Label>Title</Label>
          <Input value={automation.title} onChange={(e) => updateAutomation(automation.id, "title", e.target.value)} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <Label>Build Hours</Label>
            <Input
              type="number"
              step="0.25"
              value={automation.buildHours}
              onChange={(e) => updateAutomation(automation.id, "buildHours", Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Testing Hours</Label>
            <Input
              type="number"
              step="0.25"
              value={automation.testingHours}
              onChange={(e) => updateAutomation(automation.id, "testingHours", Number(e.target.value))}
            />
          </div>

          <div>
            <Label>Cleanup Hours</Label>
            <Input
              type="number"
              step="0.25"
              value={automation.cleanupHours}
              onChange={(e) => updateAutomation(automation.id, "cleanupHours", Number(e.target.value))}
            />
          </div>
        </div>

        <MarkdownEditor
          label="Description"
          value={automation.description}
          onChange={(value) => updateAutomation(automation.id, "description", value)}
          rows={3}
        />

        <MarkdownEditor
          label="Workflow (one step per line)"
          value={automation.workflow || ""}
          onChange={(value) => updateAutomation(automation.id, "workflow", value)}
          placeholder="1. Step one\n2. Step two\n3. Step three"
          rows={5}
        />

        <MarkdownEditor
          label="Requirements (optional)"
          value={automation.requirements || ""}
          onChange={(value) => updateAutomation(automation.id, "requirements", value)}
          rows={3}
        />

        <MarkdownEditor
          label="Suggestions (optional)"
          value={automation.suggestions || ""}
          onChange={(value) => updateAutomation(automation.id, "suggestions", value)}
          rows={3}
        />

        <div className="bg-gray-50 p-2 rounded text-sm">
          <strong>Total Hours: {automation.buildHours + automation.testingHours + automation.cleanupHours}</strong>
        </div>
      </CardContent>
    </Card>
  )
}
