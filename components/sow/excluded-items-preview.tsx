import type { ExcludedItem } from "../../sow-template-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ExcludedItemsPreviewProps {
  excludedItems: ExcludedItem[]
}

export function ExcludedItemsPreview({ excludedItems }: ExcludedItemsPreviewProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium text-gray-800 mb-3">Additional Features (Not Included in MVP)</h3>
      {excludedItems.map((item) => (
        <div key={item.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          <h4 className="font-medium text-gray-800 mb-2">{item.title}</h4>
          {item.notes && (
            <div className="bg-blue-100 border border-blue-300 p-2 rounded text-sm">
              <strong className="text-blue-800">Notes:</strong>{" "}
              <div className="prose prose-sm max-w-none inline">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{item.notes}</ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
