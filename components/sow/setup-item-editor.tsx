"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Minus } from "lucide-react"
import { MarkdownEditor } from "@/components/markdown-editor" // Import MarkdownEditor
import type { SetupItem } from "../../sow-template-types"

interface SetupItemEditorProps {
  setup: SetupItem
  index: number
  updateSetup: (id: string, field: keyof SetupItem, value: any) => void
  removeSetup: (id: string) => void
}

export function SetupItemEditor({ setup, index, updateSetup, removeSetup }: SetupItemEditorProps) {
  return (
    <Card>
      <CardContent className="p-4 space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Setup #{index + 1}</h3>
          <Button variant="destructive" size="sm" onClick={() => removeSetup(setup.id)}>
            <Minus className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Title</Label>
            <Input value={setup.title} onChange={(e) => updateSetup(setup.id, "title", e.target.value)} />
          </div>

          <div>
            <Label>Hours</Label>
            <Input
              type="number"
              step="0.25"
              value={setup.hours}
              onChange={(e) => updateSetup(setup.id, "hours", Number(e.target.value))}
            />
          </div>
        </div>

        <MarkdownEditor
          label="Description"
          value={setup.description}
          onChange={(value) => updateSetup(setup.id, "description", value)}
          rows={3}
        />

        <MarkdownEditor
          label="Workflow (one step per line)"
          value={setup.workflow || ""}
          onChange={(value) => updateSetup(setup.id, "workflow", value)}
          placeholder="1. Step one\n2. Step two\n3. Step three"
          rows={4}
        />

        <MarkdownEditor
          label="Requirements (optional)"
          value={setup.requirements || ""}
          onChange={(value) => updateSetup(setup.id, "requirements", value)}
          rows={3}
        />
      </CardContent>
    </Card>
  )
}
