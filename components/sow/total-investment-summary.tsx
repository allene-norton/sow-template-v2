import { Card, CardContent } from "@/components/ui/card"
import type { ProjectData } from "../../sow-template-types"

interface TotalInvestmentSummaryProps {
  data: ProjectData
}

export function TotalInvestmentSummary({ data }: TotalInvestmentSummaryProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="bg-green-50 border border-green-800 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-800">Estimated Total Investment: ${data.totalCost.toFixed(2)}</div>
          <div className="text-lg text-gray-600 mt-1">
            {data.depositPercentage}% Deposit: ${data.depositAmount.toFixed(2)}
          </div>
          <div className="text-sm text-gray-600 mt-2">Estimated completion: {data.totalHours} hours</div>
        </div>
      </CardContent>
    </Card>
  )
}
