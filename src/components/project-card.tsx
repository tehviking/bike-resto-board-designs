import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Calendar, ArrowRight } from "lucide-react"

type ProjectStatus = "not-started" | "in-progress" | "completed" | "on-hold"

interface ProjectCardProps {
  id: string
  title: string
  description?: string
  status: ProjectStatus
  nextStep?: string
  startDate?: string
  targetDate?: string
  imageUrl?: string
}

const statusLabels: Record<ProjectStatus, string> = {
  "not-started": "Not Started",
  "in-progress": "In Progress",
  "completed": "Completed",
  "on-hold": "On Hold",
}

export function ProjectCard({
  id,
  title,
  description,
  status,
  nextStep,
  startDate,
  targetDate,
  imageUrl,
}: ProjectCardProps) {
  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1 flex-1">
            <CardTitle className="text-lg font-semibold line-clamp-1">
              {title}
            </CardTitle>
            {description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            )}
          </div>
          <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-4">
          {/* Status Badge */}
          <div className="flex items-center justify-between">
            <StatusBadge status={status}>
              {statusLabels[status]}
            </StatusBadge>
            {targetDate && (
              <div className="flex items-center text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                {targetDate}
              </div>
            )}
          </div>

          {/* Next Step */}
          {nextStep && (
            <div className="space-y-2">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Next Step
              </div>
              <div className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                <span className="text-sm text-foreground">{nextStep}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          )}

          {/* Project Image */}
          {imageUrl && (
            <div className="aspect-video rounded-md overflow-hidden bg-muted">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}