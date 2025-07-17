import type { SoftwareRequirement } from "../../sow-template-types"

interface SoftwareRequirementsPreviewProps {
  softwareRequirements: SoftwareRequirement[]
  totalSoftwareCost: number
}

export function SoftwareRequirementsPreview({
  softwareRequirements,
  totalSoftwareCost,
}: SoftwareRequirementsPreviewProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Software Requirements</h3>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-2 text-left font-semibold">Software</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Plan Type</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Estimated Monthly Cost</th>
              <th className="border border-gray-300 p-2 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            {softwareRequirements.map((software) => (
              <tr key={software.id} className="even:bg-gray-50">
                <td className="border border-gray-300 p-2">{software.name}</td>
                <td className="border border-gray-300 p-2">{software.planType}</td>
                <td className="border border-gray-300 p-2">${software.estimatedCost.toFixed(2)}</td>
                <td className="border border-gray-300 p-2">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${software.purchased ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                  >
                    {software.purchased ? "Purchased" : "Not Purchased"}
                  </span>
                </td>
              </tr>
            ))}
            <tr className="bg-gray-100 font-semibold">
              <td className="border border-gray-300 p-2" colSpan={3}>
                Total Monthly Software Cost
              </td>
              <td className="border border-gray-300 p-2">${totalSoftwareCost.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
