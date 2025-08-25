import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2, Save, X, Package } from "lucide-react"
import { useState } from "react"

interface Part {
  id: string
  name: string
  partNumber: string
  description: string
  status: "needed" | "ordered" | "received" | "installed"
  supplier: string
  cost: string
  orderDate?: string
  receivedDate?: string
  installedDate?: string
  notes: string
}

interface PartsTrackerProps {
  projectId: string
}

// Mock data
const mockParts: Part[] = [
  {
    id: "1",
    name: "Brake Cable Set",
    partNumber: "BC-7900",
    description: "Shimano 105 brake cable and housing set",
    status: "received",
    supplier: "Bike Shop Supply",
    cost: "$24.99",
    orderDate: "2024-01-22",
    receivedDate: "2024-01-25",
    notes: "Quality cables, good fit"
  },
  {
    id: "2",
    name: "Chain",
    partNumber: "CN-HG95",
    description: "Shimano HG95 10-speed chain",
    status: "ordered",
    supplier: "Chain Reaction Cycles",
    cost: "$35.00",
    orderDate: "2024-01-23",
    notes: "Expedited shipping requested"
  },
  {
    id: "3",
    name: "Bar Tape",
    partNumber: "BT-CORK-BR",
    description: "Brooks leather bar tape in brown",
    status: "needed",
    supplier: "",
    cost: "$45.00",
    notes: "Customer wants brown to match saddle"
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

export function PartsTracker({ projectId }: PartsTrackerProps) {
  const [parts, setParts] = useState<Part[]>(mockParts)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setParts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <Card className="bg-gradient-card shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Parts Tracker
        </CardTitle>
        <Button size="sm" onClick={() => setIsAdding(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Add Part
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Add New Part Form */}
        {isAdding && (
          <Card className="border-dashed">
            <CardContent className="pt-4">
              <form method="post" action={`/admin/projects/${projectId}/parts`} className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-medium">New Part</h4>
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
                    <Label htmlFor="part_name">Part Name</Label>
                    <Input 
                      id="part_name"
                      name="part[name]" 
                      placeholder="e.g., Brake Cable Set"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="part_number">Part Number</Label>
                    <Input 
                      id="part_number"
                      name="part[part_number]" 
                      placeholder="e.g., BC-7900"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="part_description">Description</Label>
                  <Textarea 
                    id="part_description"
                    name="part[description]" 
                    placeholder="Detailed description of the part"
                    rows={2}
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="part_status">Status</Label>
                    <Select name="part[status]" defaultValue="needed">
                      <SelectTrigger id="part_status">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="needed">Needed</SelectItem>
                        <SelectItem value="ordered">Ordered</SelectItem>
                        <SelectItem value="received">Received</SelectItem>
                        <SelectItem value="installed">Installed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="part_supplier">Supplier</Label>
                    <Input 
                      id="part_supplier"
                      name="part[supplier]" 
                      placeholder="e.g., Bike Shop Supply"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="part_cost">Cost</Label>
                    <Input 
                      id="part_cost"
                      name="part[cost]" 
                      placeholder="$0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="part_order_date">Order Date</Label>
                    <Input 
                      id="part_order_date"
                      name="part[order_date]" 
                      type="date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="part_received_date">Received Date</Label>
                    <Input 
                      id="part_received_date"
                      name="part[received_date]" 
                      type="date"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="part_installed_date">Installed Date</Label>
                    <Input 
                      id="part_installed_date"
                      name="part[installed_date]" 
                      type="date"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="part_notes">Notes</Label>
                  <Textarea 
                    id="part_notes"
                    name="part[notes]" 
                    placeholder="Any additional notes about this part"
                    rows={2}
                  />
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Parts List */}
        <div className="space-y-3">
          {parts.map((part) => (
            <Card key={part.id} className="border">
              <CardContent className="pt-4">
                {editingId === part.id ? (
                  <form method="post" action={`/admin/projects/${projectId}/parts/${part.id}`} className="space-y-4">
                    <input type="hidden" name="_method" value="patch" />
                    
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">Edit Part</h4>
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
                        <Label htmlFor={`part_name_${part.id}`}>Part Name</Label>
                        <Input 
                          id={`part_name_${part.id}`}
                          name="part[name]" 
                          defaultValue={part.name}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`part_number_${part.id}`}>Part Number</Label>
                        <Input 
                          id={`part_number_${part.id}`}
                          name="part[part_number]" 
                          defaultValue={part.partNumber}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`part_description_${part.id}`}>Description</Label>
                      <Textarea 
                        id={`part_description_${part.id}`}
                        name="part[description]" 
                        defaultValue={part.description}
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`part_status_${part.id}`}>Status</Label>
                        <Select name="part[status]" defaultValue={part.status}>
                          <SelectTrigger id={`part_status_${part.id}`}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="needed">Needed</SelectItem>
                            <SelectItem value="ordered">Ordered</SelectItem>
                            <SelectItem value="received">Received</SelectItem>
                            <SelectItem value="installed">Installed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`part_supplier_${part.id}`}>Supplier</Label>
                        <Input 
                          id={`part_supplier_${part.id}`}
                          name="part[supplier]" 
                          defaultValue={part.supplier}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`part_cost_${part.id}`}>Cost</Label>
                        <Input 
                          id={`part_cost_${part.id}`}
                          name="part[cost]" 
                          defaultValue={part.cost}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`part_order_date_${part.id}`}>Order Date</Label>
                        <Input 
                          id={`part_order_date_${part.id}`}
                          name="part[order_date]" 
                          type="date"
                          defaultValue={part.orderDate}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`part_received_date_${part.id}`}>Received Date</Label>
                        <Input 
                          id={`part_received_date_${part.id}`}
                          name="part[received_date]" 
                          type="date"
                          defaultValue={part.receivedDate}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`part_installed_date_${part.id}`}>Installed Date</Label>
                        <Input 
                          id={`part_installed_date_${part.id}`}
                          name="part[installed_date]" 
                          type="date"
                          defaultValue={part.installedDate}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`part_notes_${part.id}`}>Notes</Label>
                      <Textarea 
                        id={`part_notes_${part.id}`}
                        name="part[notes]" 
                        defaultValue={part.notes}
                        rows={2}
                      />
                    </div>
                  </form>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-medium">{part.name}</h4>
                          <Badge className={getStatusColor(part.status)}>
                            {part.status.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                          </Badge>
                        </div>
                        {part.partNumber && (
                          <p className="text-sm text-muted-foreground">Part #: {part.partNumber}</p>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingId(part.id)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <form method="post" action={`/admin/projects/${projectId}/parts/${part.id}`} className="inline">
                          <input type="hidden" name="_method" value="delete" />
                          <Button 
                            type="submit"
                            size="sm" 
                            variant="outline" 
                            className="text-destructive hover:text-destructive"
                            onClick={(e) => {
                              e.preventDefault()
                              if (confirm('Are you sure you want to delete this part?')) {
                                handleDelete(part.id)
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </form>
                      </div>
                    </div>

                    {part.description && (
                      <p className="text-sm text-muted-foreground mb-3">{part.description}</p>
                    )}

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      {part.supplier && (
                        <div>
                          <span className="text-muted-foreground">Supplier: </span>
                          <span className="font-medium">{part.supplier}</span>
                        </div>
                      )}
                      {part.cost && (
                        <div>
                          <span className="text-muted-foreground">Cost: </span>
                          <span className="font-medium">{part.cost}</span>
                        </div>
                      )}
                      {part.orderDate && (
                        <div>
                          <span className="text-muted-foreground">Ordered: </span>
                          <span className="font-medium">{new Date(part.orderDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {part.receivedDate && (
                        <div>
                          <span className="text-muted-foreground">Received: </span>
                          <span className="font-medium">{new Date(part.receivedDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>

                    {part.notes && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm"><span className="text-muted-foreground">Notes: </span>{part.notes}</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {parts.length === 0 && !isAdding && (
          <div className="text-center py-8 text-muted-foreground">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No parts tracked yet. Click "Add Part" to get started.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}