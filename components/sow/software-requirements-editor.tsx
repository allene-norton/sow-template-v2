"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch" // Import Switch
import { Plus, Minus } from "lucide-react"
import type { SoftwareRequirement, ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface SoftwareRequirementsEditorProps {
  softwareRequirements: SoftwareRequirement[]
  totalSoftwareCost: number
  setData: Dispatch<SetStateAction<ProjectData>>
}

export function SoftwareRequirementsEditor({
  softwareRequirements,
  totalSoftwareCost,
  setData,
}: SoftwareRequirementsEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Label className="text-lg font-medium">Software Requirements</Label>
        <Button
          onClick={() => {
            const newSoftware: SoftwareRequirement = {
              id: Date.now().toString(),
              name: "New Software",
              planType: "Basic",
              estimatedCost: 0,
              purchased: false, // Default to not purchased
            }
            setData((prev) => ({
              ...prev,
              softwareRequirements: [...prev.softwareRequirements, newSoftware],
            }))
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Software
        </Button>
      </div>

      {softwareRequirements.map((software, index) => (
        <Card key={software.id} className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Software #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    softwareRequirements: prev.softwareRequirements.filter((s) => s.id !== software.id),
                  }))
                }}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label>Software Name</Label>
                <Input
                  value={software.name}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      softwareRequirements: prev.softwareRequirements.map((s) =>
                        s.id === software.id ? { ...s, name: e.target.value } : s,
                      ),
                    }))
                  }}
                />
              </div>

              <div>
                <Label>Plan Type</Label>
                <Input
                  value={software.planType}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      softwareRequirements: prev.softwareRequirements.map((s) =>
                        s.id === software.id ? { ...s, planType: e.target.value } : s,
                      ),
                    }))
                  }}
                  disabled={software.purchased} // Disable if purchased
                />
              </div>

              <div>
                <Label>Estimated Monthly Cost ($)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={software.estimatedCost}
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      softwareRequirements: prev.softwareRequirements.map((s) =>
                        s.id === software.id ? { ...s, estimatedCost: Number(e.target.value) } : s,
                      ),
                    }))
                  }}
                  disabled={software.purchased} // Disable if purchased
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id={`purchased-${software.id}`}
                checked={software.purchased}
                onCheckedChange={(checked) => {
                  setData((prev) => ({
                    ...prev,
                    softwareRequirements: prev.softwareRequirements.map((s) =>
                      s.id === software.id ? { ...s, purchased: checked } : s,
                    ),
                  }))
                }}
              />
              <Label htmlFor={`purchased-${software.id}`}>Purchased</Label>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="bg-gray-50 p-3 rounded text-sm font-medium">
        Total Monthly Software Cost: ${totalSoftwareCost.toFixed(2)}
      </div>
    </div>
  )
}
