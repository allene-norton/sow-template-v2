import type { SetupItem } from "../../sow-template-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface SetupItemPreviewProps {
  setup: SetupItem
  index: number
}

export function SetupItemPreview({ setup, index }: SetupItemPreviewProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <h4 className="text-green-800 font-medium mb-2">
        Setup #{index + 1}: {setup.title}
      </h4>
      <div className="flex justify-between bg-gray-200 p-2 rounded text-sm mb-2">
        <span>Time:</span>
        <span className="font-medium">{setup.hours} hours</span>
      </div>
      <div className="prose prose-sm max-w-none mb-2">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{setup.description}</ReactMarkdown>
      </div>
      {setup.workflow && (
        <div className="bg-blue-50 border border-blue-200 p-3 rounded mb-2">
          <strong className="text-blue-800">Workflow:</strong>
          <div className="prose prose-sm max-w-none mt-2">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{setup.workflow}</ReactMarkdown>
          </div>
        </div>
      )}
      {setup.requirements && (
        <div className="bg-yellow-100 border border-yellow-300 p-2 rounded">
          <strong className="text-yellow-800">Required:</strong>{" "}
          <div className="prose prose-sm max-w-none inline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{setup.requirements}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}
