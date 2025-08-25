import { useParams } from "react-router-dom"
import { ProjectHeader } from "./components/project-header"
import { ProjectInfo } from "./components/project-info"
import { SubProjects } from "./components/sub-projects"
import { PartsTracker } from "./components/parts-tracker"
import { PhotoUpload } from "./components/photo-upload"
import { Card } from "@/components/ui/card"

// Mock data - in real app this would come from API based on project_id
const getProjectData = (id: string) => ({
  id,
  title: "1985 Trek 720 Touring Bike",
  description: "Complete restoration of a classic touring bicycle with original Shimano components",
  status: "in-progress" as const,
  nextStep: "Install new brake cables and housing",
  startDate: "2024-01-15",
  targetDate: "2024-03-15",
  workStartedDate: "2024-01-20",
  client: "John Smith",
  estimatedCost: "$850",
  actualCost: "$467",
  notes: "Frame in excellent condition. Original Shimano 600 components. Customer wants to keep vintage aesthetic.",
})

export default function ProjectDetail() {
  const { project_id } = useParams<{ project_id: string }>()
  
  if (!project_id) {
    return <div>Project not found</div>
  }

  const project = getProjectData(project_id)

  return (
    <div className="min-h-screen bg-background">
      <ProjectHeader project={project} />
      
      <main className="p-6 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Project Info */}
          <ProjectInfo project={project} />
          
          {/* Photo Upload */}
          <PhotoUpload projectId={project.id} />
        </div>

        {/* Sub Projects */}
        <SubProjects projectId={project.id} />

        {/* Parts Tracker */}
        <PartsTracker projectId={project.id} />
      </main>
    </div>
  )
}