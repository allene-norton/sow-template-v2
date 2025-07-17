"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import { MarkdownEditor } from "@/components/markdown-editor" // Import MarkdownEditor
import type { FutureEnhancement, ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface FutureEnhancementsEditorProps {
  futureEnhancements: FutureEnhancement[]
  setData: Dispatch<SetStateAction<ProjectData>>
}

export function FutureEnhancementsEditor({ futureEnhancements, setData }: FutureEnhancementsEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Label className="text-lg font-medium">Future Enhancements</Label>
        <Button
          onClick={() => {
            const newItem: FutureEnhancement = {
              id: Date.now().toString(),
              title: "New enhancement",
              notes: "",
            }
            setData((prev) => ({
              ...prev,
              futureEnhancements: [...prev.futureEnhancements, newItem],
            }))
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Enhancement
        </Button>
      </div>

      {futureEnhancements.map((item, index) => (
        <Card key={item.id} className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Enhancement #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    futureEnhancements: prev.futureEnhancements.filter((i) => i.id !== item.id),
                  }))
                }}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Title</Label>
              <Input
                value={item.title}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    futureEnhancements: prev.futureEnhancements.map((i) =>
                      i.id === item.id ? { ...i, title: e.target.value } : i,
                    ),
                  }))
                }}
              />
            </div>

            <MarkdownEditor
              label="Notes/Suggestions (optional)"
              value={item.notes || ""}
              onChange={(value) => {
                setData((prev) => ({
                  ...prev,
                  futureEnhancements: prev.futureEnhancements.map((i) =>
                    i.id === item.id ? { ...i, notes: value } : i,
                  ),
                }))
              }}
              placeholder="Add notes or suggestions for this enhancement..."
              rows={3}
            />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
