"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MarkdownEditor } from "@/components/markdown-editor"
import type { ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface BasicInfoEditorProps {
  data: ProjectData
  setData: Dispatch<SetStateAction<ProjectData>>
  totalSetupHours: number
  totalAutomationHours: number // Added this prop
  discountedPrepRate: number
  discountedAutomationRate: number
}

export function BasicInfoEditor({
  data,
  setData,
  totalSetupHours,
  totalAutomationHours, // Receive this prop
  discountedPrepRate,
  discountedAutomationRate,
}: BasicInfoEditorProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div>
          <Label htmlFor="title">Project Title</Label>
          <Input
            id="title"
            value={data.title}
            onChange={(e) => setData((prev) => ({ ...prev, title: e.target.value }))}
          />
        </div>

        <div>
          <Label htmlFor="subtitle">Subtitle</Label>
          <Input
            id="subtitle"
            value={data.subtitle}
            onChange={(e) => setData((prev) => ({ ...prev, subtitle: e.target.value }))}
          />
        </div>

        <MarkdownEditor
          id="overview"
          label="Project Overview"
          value={data.overview}
          onChange={(value) => setData((prev) => ({ ...prev, overview: value }))}
          rows={4}
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Preparation & Workspace Setup</h3>
            <div>
              <Label htmlFor="prepRate">Full Rate ($/hr)</Label>
              <Input
                id="prepRate"
                type="number"
                value={data.prepRate}
                onChange={(e) => setData((prev) => ({ ...prev, prepRate: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="prepDiscount">Discount (%)</Label>
              <Input
                id="prepDiscount"
                type="number"
                min="0"
                max="100"
                value={data.prepDiscount}
                onChange={(e) => setData((prev) => ({ ...prev, prepDiscount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="prepDiscountNote">Discount Note (optional)</Label>
              <Input
                id="prepDiscountNote"
                value={data.prepDiscountNote}
                onChange={(e) => setData((prev) => ({ ...prev, prepDiscountNote: e.target.value }))}
                placeholder="e.g., Early bird discount"
              />
            </div>
            <div className="bg-gray-50 p-2 rounded text-sm">
              <strong>Final Rate: ${discountedPrepRate.toFixed(2)}/hr</strong>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-green-800">Automation Configuration</h3>
            <div>
              <Label htmlFor="automationRate">Full Rate ($/hr)</Label>
              <Input
                id="automationRate"
                type="number"
                value={data.automationRate}
                onChange={(e) => setData((prev) => ({ ...prev, automationRate: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="automationDiscount">Discount (%)</Label>
              <Input
                id="automationDiscount"
                type="number"
                min="0"
                max="100"
                value={data.automationDiscount}
                onChange={(e) => setData((prev) => ({ ...prev, automationDiscount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="automationDiscountNote">Discount Note (optional)</Label>
              <Input
                id="automationDiscountNote"
                value={data.automationDiscountNote}
                onChange={(e) => setData((prev) => ({ ...prev, automationDiscountNote: e.target.value }))}
                placeholder="e.g., Volume discount"
              />
            </div>
            <div className="bg-gray-50 p-2 rounded text-sm">
              <strong>Final Rate: ${discountedAutomationRate.toFixed(2)}/hr</strong>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="prepHours">Preparation Hours (from Setups)</Label>
            <Input
              id="prepHours"
              type="number"
              step="0.25"
              value={data.prepHours.toFixed(2)} // Display calculated value
              disabled // Make read-only
            />
          </div>
          <div>
            <Label htmlFor="automationHours">Automation Hours (from Automations)</Label>
            <Input
              id="automationHours"
              type="number"
              step="0.25"
              value={data.automationHours.toFixed(2)} // Display calculated value
              disabled // Make read-only
            />
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-green-800 mb-4">Project Totals (Calculated, Editable)</h3>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="totalCost">Total Cost ($)</Label>
              <Input
                id="totalCost"
                type="number"
                step="0.01"
                value={data.totalCost}
                onChange={(e) => setData((prev) => ({ ...prev, totalCost: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="depositAmount">Deposit Amount ($)</Label>
              <Input
                id="depositAmount"
                type="number"
                step="0.01"
                value={data.depositAmount}
                onChange={(e) => setData((prev) => ({ ...prev, depositAmount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <Label htmlFor="totalHours">Total Hours</Label>
              <Input
                id="totalHours"
                type="number"
                step="0.25"
                value={data.totalHours}
                onChange={(e) => setData((prev) => ({ ...prev, totalHours: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <Label htmlFor="depositPercentage">Deposit Percentage (%)</Label>
              <Input
                id="depositPercentage"
                type="number"
                value={data.depositPercentage}
                onChange={(e) => setData((prev) => ({ ...prev, depositPercentage: Number(e.target.value) }))}
              />
            </div>
          </div>
          <div className="mt-4 text-sm text-gray-600">
            <p>Note: Values above are auto-calculated but can be manually overridden.</p>
            <p>Total Setup Hours: {totalSetupHours.toFixed(2)}</p>
            <p>Total Automation Hours: {totalAutomationHours.toFixed(2)}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
