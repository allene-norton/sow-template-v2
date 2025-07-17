"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Plus, Minus } from "lucide-react"
import { MarkdownEditor } from "@/components/markdown-editor" // Import MarkdownEditor
import type { CredentialRequirement, ProjectData } from "../../sow-template-types"
import type { Dispatch, SetStateAction } from "react"

interface CredentialRequirementsEditorProps {
  credentialRequirements: CredentialRequirement[]
  setData: Dispatch<SetStateAction<ProjectData>>
}

export function CredentialRequirementsEditor({ credentialRequirements, setData }: CredentialRequirementsEditorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Label className="text-lg font-medium">Credential Requirements</Label>
        <Button
          onClick={() => {
            const newCredential: CredentialRequirement = {
              id: Date.now().toString(),
              name: "New Credential",
              description: "Description of required access",
              hasAccess: false,
            }
            setData((prev) => ({
              ...prev,
              credentialRequirements: [...prev.credentialRequirements, newCredential],
            }))
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Credential
        </Button>
      </div>

      {credentialRequirements.map((credential, index) => (
        <Card key={credential.id} className="mb-4">
          <CardContent className="p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Credential #{index + 1}</h4>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => {
                  setData((prev) => ({
                    ...prev,
                    credentialRequirements: prev.credentialRequirements.filter((c) => c.id !== credential.id),
                  }))
                }}
              >
                <Minus className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Credential Name</Label>
              <Input
                value={credential.name}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    credentialRequirements: prev.credentialRequirements.map((c) =>
                      c.id === credential.id ? { ...c, name: e.target.value } : c,
                    ),
                  }))
                }}
              />
            </div>

            <MarkdownEditor
              label="Description"
              value={credential.description}
              onChange={(value) => {
                setData((prev) => ({
                  ...prev,
                  credentialRequirements: prev.credentialRequirements.map((c) =>
                    c.id === credential.id ? { ...c, description: value } : c,
                  ),
                }))
              }}
              placeholder="Describe what access or credentials are needed..."
              disabled={credential.hasAccess}
              rows={3}
            />

            <div className="flex items-center space-x-2 mt-4">
              <Switch
                id={`has-access-${credential.id}`}
                checked={credential.hasAccess}
                onCheckedChange={(checked) => {
                  setData((prev) => ({
                    ...prev,
                    credentialRequirements: prev.credentialRequirements.map((c) =>
                      c.id === credential.id ? { ...c, hasAccess: checked } : c,
                    ),
                  }))
                }}
              />
              <Label htmlFor={`has-access-${credential.id}`}>
                {credential.hasAccess ? "Has Access" : "Requires Access"}
              </Label>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
