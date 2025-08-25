import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, DollarSign, ShoppingCart, AlertTriangle } from "lucide-react"
import { Link } from "react-router-dom"

interface Part {
  id: string
  name: string
  partNumber: string
  status: "needed" | "ordered" | "received" | "installed"
  supplier: string
  cost: string
  orderDate?: string
  projectId: string
  projectTitle: string
}

interface Project {
  id: string
  title: string
  partsTotal: number
  finalCost?: number
}

// Mock data for parts across all projects
const mockGlobalParts: Part[] = [
  {
    id: "1",
    name: "Brake Cable Set",
    partNumber: "BC-7900",
    status: "ordered",
    supplier: "Bike Shop Supply",
    cost: "$24.99",
    orderDate: "2024-01-23",
    projectId: "1",
    projectTitle: "1985 Trek 720 Touring Bike"
  },
  {
    id: "2",
    name: "Chain",
    partNumber: "CN-HG95",
    status: "ordered",
    supplier: "Chain Reaction Cycles",
    cost: "$35.00",
    orderDate: "2024-01-23",
    projectId: "1",
    projectTitle: "1985 Trek 720 Touring Bike"
  },
  {
    id: "3",
    name: "Custom Wheels",
    partNumber: "WH-CUSTOM",
    status: "ordered",
    supplier: "Local Wheel Builder",
    cost: "$450.00",
    orderDate: "2024-01-20",
    projectId: "4",
    projectTitle: "Custom Fixed Gear Build"
  },
  {
    id: "4",
    name: "Derailleur Hanger",
    partNumber: "DH-SPEC92",
    status: "needed",
    supplier: "",
    cost: "$15.00",
    projectId: "2",
    projectTitle: "1992 Specialized Rockhopper"
  }
]

// Mock data for project cost summaries
const mockProjectCosts: Project[] = [
  {
    id: "1",
    title: "1985 Trek 720 Touring Bike",
    partsTotal: 285.50,
    finalCost: 450.00
  },
  {
    id: "2",
    title: "1992 Specialized Rockhopper",
    partsTotal: 320.75,
  },
  {
    id: "3",
    title: "Vintage Peugeot Road Bike",
    partsTotal: 180.25,
    finalCost: 350.00
  },
  {
    id: "4",
    title: "Custom Fixed Gear Build",
    partsTotal: 675.00,
  }
]

const getStatusColor = (status: Part["status"]) => {
  switch (status) {
    case "needed": return "bg-gray-100 text-gray-800"
    case "ordered": return "bg-blue-100 text-blue-800"
    case "received": return "bg-green-100 text-green-800"
    case "installed": return "bg-purple-100 text-purple-800"
    default: return "bg-gray-100 text-gray-800"
  }
}

export function PartsOverview() {
  const partsOnOrder = mockGlobalParts.filter(part => part.status === "ordered")
  const partsNeeded = mockGlobalParts.filter(part => part.status === "needed")
  
  const totalPartsValue = mockGlobalParts.reduce((sum, part) => {
    const cost = parseFloat(part.cost.replace('$', '').replace(',', ''))
    return sum + (isNaN(cost) ? 0 : cost)
  }, 0)

  const totalProjectCosts = mockProjectCosts.reduce((sum, project) => sum + project.partsTotal, 0)
  const totalFinalCosts = mockProjectCosts.reduce((sum, project) => sum + (project.finalCost || 0), 0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Parts on Order */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Parts on Order
          </CardTitle>
          <Badge variant="secondary">{partsOnOrder.length} items</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {partsOnOrder.length > 0 ? (
            <>
              {partsOnOrder.slice(0, 5).map((part) => (
                <div key={part.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{part.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {part.projectTitle}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(part.status)} variant="secondary">
                        {part.status}
                      </Badge>
                      {part.orderDate && (
                        <span className="text-xs text-muted-foreground">
                          Ordered {new Date(part.orderDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{part.cost}</p>
                    <p className="text-xs text-muted-foreground">{part.supplier}</p>
                  </div>
                </div>
              ))}
              
              {partsOnOrder.length > 5 && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  +{partsOnOrder.length - 5} more items on order
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No parts currently on order</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Parts Needed */}
      <Card className="bg-gradient-card shadow-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Parts Needed
          </CardTitle>
          <Badge variant="destructive">{partsNeeded.length} items</Badge>
        </CardHeader>
        <CardContent className="space-y-3">
          {partsNeeded.length > 0 ? (
            <>
              {partsNeeded.slice(0, 5).map((part) => (
                <div key={part.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{part.name}</p>
                    <p className="text-sm text-muted-foreground truncate">
                      {part.projectTitle}
                    </p>
                    <Badge className={getStatusColor(part.status)} variant="secondary">
                      {part.status}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{part.cost}</p>
                    <Link to={`/admin/project/${part.projectId}`}>
                      <Button size="sm" variant="outline">
                        View Project
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
              
              {partsNeeded.length > 5 && (
                <p className="text-center text-sm text-muted-foreground py-2">
                  +{partsNeeded.length - 5} more items needed
                </p>
              )}
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>All needed parts have been ordered</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cost Summary */}
      <Card className="bg-gradient-card shadow-card lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Cost Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-primary">
                ${totalPartsValue.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Parts Value</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-secondary">
                ${totalProjectCosts.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Parts Cost (Active Projects)</p>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-2xl font-bold text-accent">
                ${totalFinalCosts.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">Total Final Costs</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-medium">Project Cost Breakdown</h4>
            {mockProjectCosts.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex-1">
                  <Link to={`/admin/project/${project.id}`} className="font-medium hover:underline">
                    {project.title}
                  </Link>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="text-right">
                    <span className="text-muted-foreground">Parts: </span>
                    <span className="font-medium">${project.partsTotal.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-muted-foreground">Final: </span>
                    <span className="font-medium">
                      {project.finalCost ? `$${project.finalCost.toFixed(2)}` : 'Not set'}
                    </span>
                  </div>
                  {project.finalCost && (
                    <div className="text-right">
                      <span className="text-muted-foreground">Diff: </span>
                      <span className={`font-medium ${project.finalCost > project.partsTotal ? 'text-red-600' : 'text-green-600'}`}>
                        ${Math.abs(project.finalCost - project.partsTotal).toFixed(2)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}