import type { CredentialRequirement } from "../../sow-template-types"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface CredentialRequirementsPreviewProps {
  credentialRequirements: CredentialRequirement[]
}

export function CredentialRequirementsPreview({ credentialRequirements }: CredentialRequirementsPreviewProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-800 mb-3">Credential Requirements</h3>
      {credentialRequirements.map((credential) => (
        <div key={credential.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-3">
          <h4 className="font-medium text-green-800 mb-2">
            {credential.name}{" "}
            <span
              className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${
                credential.hasAccess ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {credential.hasAccess ? "Has Access" : "Needs Access"}
            </span>
          </h4>
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{credential.description}</ReactMarkdown>
          </div>
        </div>
      ))}
    </div>
  )
}
