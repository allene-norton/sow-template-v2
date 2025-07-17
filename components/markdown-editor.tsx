"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface MarkdownEditorProps {
  id?: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
  disabled?: boolean
}

export function MarkdownEditor({
  id,
  label,
  value,
  onChange,
  placeholder,
  rows = 5,
  disabled = false,
}: MarkdownEditorProps) {
  const [activeTab, setActiveTab] = useState("edit")

  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="edit">
          <Textarea
            id={id}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            rows={rows}
            className="min-h-[120px]"
            disabled={disabled}
          />
        </TabsContent>
        <TabsContent
          value="preview"
          className="border rounded-md p-4 min-h-[120px] bg-muted/20"
        >
          <div className="prose prose-sm max-w-none dark:prose-invert">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {value || "*Nothing to preview*"}
            </ReactMarkdown>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
