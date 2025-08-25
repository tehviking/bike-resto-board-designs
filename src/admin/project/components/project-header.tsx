import { Button } from "@/components/ui/button"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ArrowLeft, Edit, Archive, Trash2 } from "lucide-react"
import { StatusBadge } from "@/components/ui/status-badge"
import { useNavigate } from "react-router-dom"

interface ProjectHeaderProps {
  project: {
    id: string
    title: string
    status: "not-started" | "in-progress" | "completed" | "on-hold"
  }
}

export function ProjectHeader({ project }: ProjectHeaderProps) {
  const navigate = useNavigate()

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex items-center gap-4">
          <SidebarTrigger className="lg:hidden" />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/")}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          <div className="h-6 w-px bg-border" />
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-xl font-semibold">{project.title}</h1>
              <StatusBadge status={project.status}>
                {project.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
              </StatusBadge>
            </div>
            <p className="text-sm text-muted-foreground">
              Project #{project.id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Archive className="h-4 w-4" />
            Archive
          </Button>
          <Button variant="outline" size="sm" className="gap-2 text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
    </header>
  )
}