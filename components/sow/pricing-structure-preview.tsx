import { Card, CardContent } from "@/components/ui/card"
import type { ProjectData } from "../../sow-template-types"

interface PricingStructurePreviewProps {
  data: ProjectData
  discountedPrepRate: number
  discountedAutomationRate: number
}

export function PricingStructurePreview({
  data,
  discountedPrepRate,
  discountedAutomationRate,
}: PricingStructurePreviewProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4 border-b-2 border-gray-200 pb-2">Pricing Structure Estimate</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-800 text-white">
                <th className="border border-gray-300 p-3 text-left">Service Type</th>
                <th className="border border-gray-300 p-3 text-left">Full Rate</th>
                <th className="border border-gray-300 p-3 text-left">Discount</th>
                <th className="border border-gray-300 p-3 text-left">Final Rate</th>
                <th className="border border-gray-300 p-3 text-left">Hours</th>
                <th className="border border-gray-300 p-3 text-left">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr className="even:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  Preparation & Workspace Setup
                  {data.prepDiscountNote && (
                    <div className="text-xs italic text-gray-600 mt-1">{data.prepDiscountNote}</div>
                  )}
                </td>
                <td className="border border-gray-300 p-3">${data.prepRate.toFixed(2)}/hr</td>
                <td className="border border-gray-300 p-3">
                  {data.prepDiscount > 0 ? `${data.prepDiscount}%` : "None"}
                </td>
                <td className="border border-gray-300 p-3">${discountedPrepRate.toFixed(2)}/hr</td>
                <td className="border border-gray-300 p-3">{data.prepHours}</td>
                <td className="border border-gray-300 p-3">{(data.prepHours * discountedPrepRate).toFixed(2)}</td>
              </tr>
              <tr className="even:bg-gray-50">
                <td className="border border-gray-300 p-3">
                  Automation Configuration
                  {data.automationDiscountNote && (
                    <div className="text-xs italic text-gray-600 mt-1">{data.automationDiscountNote}</div>
                  )}
                </td>
                <td className="border border-gray-300 p-3">${data.automationRate.toFixed(2)}/hr</td>
                <td className="border border-gray-300 p-3">
                  {data.automationDiscount > 0 ? `${data.automationDiscount}%` : "None"}
                </td>
                <td className="border border-gray-300 p-3">${discountedAutomationRate.toFixed(2)}/hr</td>
                <td className="border border-gray-300 p-3">{data.automationHours}</td>
                <td className="border border-gray-300 p-3">
                  {(data.automationHours * discountedAutomationRate).toFixed(2)}
                </td>
              </tr>
              <tr className="bg-green-50 font-bold">
                <td className="border border-gray-300 p-3" colSpan={5}>
                  Total Project Cost
                </td>
                <td className="border border-gray-300 p-3">${data.totalCost.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
