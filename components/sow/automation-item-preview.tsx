import type { AutomationItem } from "../../sow-template-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface AutomationItemPreviewProps {
  automation: AutomationItem
  index: number
}

export function AutomationItemPreview({ automation, index }: AutomationItemPreviewProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="text-green-800 font-medium mb-2">
        Automation #{index + 1}: {automation.title}
      </h4>
      <div className="flex justify-between bg-gray-200 p-2 rounded text-sm mb-2">
        <span>
          Build: {automation.buildHours}h | Testing: {automation.testingHours}h | Cleanup: {automation.cleanupHours}h
        </span>
        <span className="font-medium">
          Total: {automation.buildHours + automation.testingHours + automation.cleanupHours}h
        </span>
      </div>
      <div className="prose prose-sm max-w-none mb-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{automation.description}</ReactMarkdown>
      </div>
      {automation.workflow && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-2">
          <strong className="text-blue-800">Workflow:</strong>
          <div className="prose prose-sm max-w-none mt-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{automation.workflow}</ReactMarkdown>
          </div>
        </div>
      )}
      {automation.requirements && (
        <div className="bg-yellow-100 border border-yellow-300 p-2 rounded mb-2">
          <strong className="text-yellow-800">Required:</strong>{" "}
          <div className="prose prose-sm max-w-none inline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{automation.requirements}</ReactMarkdown>
          </div>
        </div>
      )}
      {automation.suggestions && (
        <div className="bg-blue-100 border border-blue-300 p-2 rounded">
          <strong className="text-blue-800">Suggestion:</strong>{" "}
          <div className="prose prose-sm max-w-none inline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{automation.suggestions}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}
