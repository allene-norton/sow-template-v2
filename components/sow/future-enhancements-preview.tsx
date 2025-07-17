import type { FutureEnhancement } from "../../sow-template-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface FutureEnhancementsPreviewProps {
  futureEnhancements: FutureEnhancement[]
}

export function FutureEnhancementsPreview({ futureEnhancements }: FutureEnhancementsPreviewProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Workspace Enhancements (Not Included in MVP)</h3>
      {futureEnhancements.map((enhancement) => (
        <div key={enhancement.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          <h4 className="font-medium text-gray-800 mb-2">{enhancement.title}</h4>
          {enhancement.notes && (
            <div className="bg-blue-100 border border-blue-300 p-2 rounded text-sm">
              <strong className="text-blue-800">Notes:</strong>{" "}
              <div className="prose prose-sm max-w-none inline">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{enhancement.notes}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
