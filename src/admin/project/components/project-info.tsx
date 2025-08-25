import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Edit, Save, X } from "lucide-react"
import { useState } from "react"

interface ProjectInfoProps {
  project: {
    id: string
    title: string
    description: string
    status: string
    startDate: string
    targetDate: string
    workStartedDate: string
    client: string
    estimatedCost: string
    actualCost: string
    notes: string
  }
}

export function ProjectInfo({ project }: ProjectInfoProps) {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle>Project Information</CardTitle>
        {isEditing ? (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              <X className="h-4 w-4" />
            </Button>
            <Button size="sm" onClick={() => setIsEditing(false)}>
              <Save className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <form className="space-y-4" method="post" action={`/admin/projects/${project.id}`}>
            <input type="hidden" name="_method" value="patch" />
            
            <div className="space-y-2">
              <Label htmlFor="project_title">Title</Label>
              <Input 
                id="project_title"
                name="project[title]" 
                defaultValue={project.title}
                className="font-medium"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_description">Description</Label>
              <Textarea 
                id="project_description"
                name="project[description]" 
                defaultValue={project.description}
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project_status">Status</Label>
                <Select name="project[status]" defaultValue={project.status}>
                  <SelectTrigger id="project_status">
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

              <div className="space-y-2">
                <Label htmlFor="project_client">Client</Label>
                <Input 
                  id="project_client"
                  name="project[client]" 
                  defaultValue={project.client}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project_start_date">Start Date</Label>
                <Input 
                  id="project_start_date"
                  name="project[start_date]" 
                  type="date"
                  defaultValue={project.startDate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_work_started_date">Work Started</Label>
                <Input 
                  id="project_work_started_date"
                  name="project[work_started_date]" 
                  type="date"
                  defaultValue={project.workStartedDate}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_target_date">Target Date</Label>
                <Input 
                  id="project_target_date"
                  name="project[target_date]" 
                  type="date"
                  defaultValue={project.targetDate}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="project_estimated_cost">Estimated Cost</Label>
                <Input 
                  id="project_estimated_cost"
                  name="project[estimated_cost]" 
                  defaultValue={project.estimatedCost}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project_actual_cost">Actual Cost</Label>
                <Input 
                  id="project_actual_cost"
                  name="project[actual_cost]" 
                  defaultValue={project.actualCost}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parts_total">Parts Total</Label>
                <Input 
                  id="parts_total"
                  name="project[parts_total]" 
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue="285.50"
                  readOnly
                  className="bg-muted"
                />
                <p className="text-xs text-muted-foreground">Calculated from parts tracker</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="final_cost">Final Restoration Cost</Label>
                <Input 
                  id="final_cost"
                  name="project[final_cost]" 
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  defaultValue="450.00"
                />
                <p className="text-xs text-muted-foreground">Total cost including labor, misc expenses</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="project_notes">Notes</Label>
              <Textarea 
                id="project_notes"
                name="project[notes]" 
                defaultValue={project.notes}
                rows={3}
              />
            </div>
          </form>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
              <p className="text-sm">{project.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Client</h3>
                <p className="text-sm">{project.client}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Status</h3>
                <p className="text-sm capitalize">{project.status.replace("-", " ")}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Start Date</h3>
                <p className="text-sm">{new Date(project.startDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Work Started</h3>
                <p className="text-sm">{new Date(project.workStartedDate).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Target Date</h3>
                <p className="text-sm">{new Date(project.targetDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Estimated Cost</h3>
                <p className="text-sm">{project.estimatedCost}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Actual Cost</h3>
                <p className="text-sm">{project.actualCost}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Parts Total</h3>
                <p className="text-sm">$285.50</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground">Final Restoration Cost</h3>
                <p className="text-sm">$450.00</p>
                <p className="text-xs text-muted-foreground">+$164.50 over parts cost</p>
              </div>
            </div>

            <div>
              <h3 className="font-medium text-sm text-muted-foreground">Notes</h3>
              <p className="text-sm">{project.notes}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}