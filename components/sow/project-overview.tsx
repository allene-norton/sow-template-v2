import { Card, CardContent } from "@/components/ui/card"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"

interface ProjectOverviewProps {
  overview: string
}

export function ProjectOverview({ overview }: ProjectOverviewProps) {
  return (
    <Card className="mb-8 border-l-4 border-l-green-800 bg-gray-50">
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold text-green-800 mb-4">Project Overview</h2>
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{overview}</ReactMarkdown>
        </div>
      </CardContent>
    </Card>
  )
}
