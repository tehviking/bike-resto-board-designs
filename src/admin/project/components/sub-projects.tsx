import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { StatusBadge } from "@/components/ui/status-badge"
import { Plus, Edit, Trash2, Save, X } from "lucide-react"
import { useState } from "react"

interface SubProject {
  id: string
  title: string
  description: string
  status: "not-started" | "in-progress" | "completed" | "on-hold"
  estimatedHours: string
  actualHours: string
}

interface SubProjectsProps {
  projectId: string
}

// Mock data
const mockSubProjects: SubProject[] = [
  {
    id: "1",
    title: "Frame Restoration",
    description: "Strip paint, sand, prime, and repaint frame",
    status: "completed",
    estimatedHours: "8",
    actualHours: "10"
  },
  {
    id: "2", 
    title: "Drivetrain Overhaul",
    description: "Clean, adjust, and replace worn drivetrain components",
    status: "in-progress",
    estimatedHours: "6",
    actualHours: "4"
  },
  {
    id: "3",
    title: "Wheel Building",
    description: "Build new wheels with upgraded hubs and rims",
    status: "not-started",
    estimatedHours: "4",
    actualHours: "0"
  }
]

export function SubProjects({ projectId }: SubProjectsProps) {
  const [subProjects, setSubProjects] = useState<SubProject[]>(mockSubProjects)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setSubProjects(prev => prev.filter(sp => sp.id !== id))
  }

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Sub-Projects</CardTitle>
        <Button size="sm" onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Sub-Project
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Sub-Project Form */}
        {isAdding && (
          <Card className="border-dashed">
            <CardContent className="pt-4">
              <form method="post" action={`/admin/projects/${projectId}/sub_projects`} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">New Sub-Project</h4>
                  <div className="flex gap-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => setIsAdding(false)}>
                      <X className="h-4 w-4" />
                    </Button>
                    <Button type="submit" size="sm">
                      <Save className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sub_project_title">Title</Label>
                    <Input 
                      id="sub_project_title"
                      name="sub_project[title]" 
                      placeholder="Sub-project title"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sub_project_status">Status</Label>
                    <Select name="sub_project[status]" defaultValue="not-started">
                      <SelectTrigger id="sub_project_status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="not-started">Not Started</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="on-hold">On Hold</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sub_project_description">Description</Label>
                  <Textarea 
                    id="sub_project_description"
                    name="sub_project[description]" 
                    placeholder="Describe the sub-project work"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sub_project_estimated_hours">Estimated Hours</Label>
                    <Input 
                      id="sub_project_estimated_hours"
                      name="sub_project[estimated_hours]" 
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="sub_project_actual_hours">Actual Hours</Label>
                    <Input 
                      id="sub_project_actual_hours"
                      name="sub_project[actual_hours]" 
                      type="number"
                      min="0"
                      step="0.5"
                      placeholder="0"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Sub-Projects List */}
        {subProjects.map((subProject) => (
          <Card key={subProject.id} className="border">
            <CardContent className="pt-4">
              {editingId === subProject.id ? (
                <form method="post" action={`/admin/projects/${projectId}/sub_projects/${subProject.id}`} className="space-y-4">
                  <input type="hidden" name="_method" value="patch" />
                  
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-medium">Edit Sub-Project</h4>
                    <div className="flex gap-2">
                      <Button type="button" size="sm" variant="outline" onClick={() => setEditingId(null)}>
                        <X className="h-4 w-4" />
                      </Button>
                      <Button type="submit" size="sm">
                        <Save className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`sub_project_title_${subProject.id}`}>Title</Label>
                      <Input 
                        id={`sub_project_title_${subProject.id}`}
                        name="sub_project[title]" 
                        defaultValue={subProject.title}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`sub_project_status_${subProject.id}`}>Status</Label>
                      <Select name="sub_project[status]" defaultValue={subProject.status}>
                        <SelectTrigger id={`sub_project_status_${subProject.id}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="not-started">Not Started</SelectItem>
                          <SelectItem value="in-progress">In Progress</SelectItem>
                          <SelectItem value="on-hold">On Hold</SelectItem>
                          <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`sub_project_description_${subProject.id}`}>Description</Label>
                    <Textarea 
                      id={`sub_project_description_${subProject.id}`}
                      name="sub_project[description]" 
                      defaultValue={subProject.description}
                      rows={2}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor={`sub_project_estimated_hours_${subProject.id}`}>Estimated Hours</Label>
                      <Input 
                        id={`sub_project_estimated_hours_${subProject.id}`}
                        name="sub_project[estimated_hours]" 
                        type="number"
                        min="0"
                        step="0.5"
                        defaultValue={subProject.estimatedHours}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`sub_project_actual_hours_${subProject.id}`}>Actual Hours</Label>
                      <Input 
                        id={`sub_project_actual_hours_${subProject.id}`}
                        name="sub_project[actual_hours]" 
                        type="number"
                        min="0"
                        step="0.5"
                        defaultValue={subProject.actualHours}
                      />
                    </div>
                  </div>
                </form>
              ) : (
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <h4 className="font-medium">{subProject.title}</h4>
                      <StatusBadge status={subProject.status}>
                        {subProject.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                      </StatusBadge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setEditingId(subProject.id)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <form method="post" action={`/admin/projects/${projectId}/sub_projects/${subProject.id}`} className="inline">
                        <input type="hidden" name="_method" value="delete" />
                        <Button 
                          type="submit"
                          size="sm" 
                          variant="outline" 
                          className="text-destructive hover:text-destructive"
                          onClick={(e) => {
                            e.preventDefault()
                            if (confirm('Are you sure you want to delete this sub-project?')) {
                              handleDelete(subProject.id)
                            }
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3">{subProject.description}</p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Estimated: </span>
                      <span className="font-medium">{subProject.estimatedHours}h</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Actual: </span>
                      <span className="font-medium">{subProject.actualHours}h</span>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {subProjects.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sub-projects yet. Click "Add Sub-Project" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}