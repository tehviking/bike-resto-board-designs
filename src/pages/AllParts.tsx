import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Search, Package, DollarSign, Clock, CheckCircle, Truck, AlertCircle } from "lucide-react";
import { useState } from "react";

interface Part {
  id: string;
  name: string;
  category: string;
  status: "needed" | "ordered" | "received" | "installed";
  cost: number;
  supplier: string;
  projectTitle: string;
  projectId: string;
  orderedDate?: string;
  projectedArrival?: string;
  receivedDate?: string;
  installedDate?: string;
}

const AllParts = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  // Sample data - would come from API
  const allParts: Part[] = [
    {
      id: "1",
      name: "Campagnolo Super Record Crankset",
      category: "Drivetrain",
      status: "ordered",
      cost: 450.00,
      supplier: "Competitive Cyclist",
      projectTitle: "1985 Peugeot PX-10",
      projectId: "1",
      orderedDate: "2024-01-15",
      projectedArrival: "2024-01-25"
    },
    {
      id: "2", 
      name: "Brooks B17 Saddle - Honey",
      category: "Comfort",
      status: "received",
      cost: 125.00,
      supplier: "Brooks England",
      projectTitle: "1985 Peugeot PX-10",
      projectId: "1",
      orderedDate: "2024-01-10",
      receivedDate: "2024-01-20"
    },
    {
      id: "3",
      name: "Shimano 105 Brake Calipers",
      category: "Braking",
      status: "installed",
      cost: 85.00,
      supplier: "Local Bike Shop",
      projectTitle: "1978 Raleigh Competition",
      projectId: "2",
      orderedDate: "2024-01-05",
      receivedDate: "2024-01-12",
      installedDate: "2024-01-18"
    },
    {
      id: "4",
      name: "Cinelli Stem - 110mm",
      category: "Cockpit",
      status: "needed",
      cost: 75.00,
      supplier: "",
      projectTitle: "1972 Colnago Super",
      projectId: "3"
    },
    {
      id: "5",
      name: "Continental Grand Prix 5000 Tires",
      category: "Wheels & Tires",
      status: "ordered",
      cost: 120.00,
      supplier: "Chain Reaction Cycles",
      projectTitle: "1978 Raleigh Competition", 
      projectId: "2",
      orderedDate: "2024-01-20",
      projectedArrival: "2024-01-30"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "needed": return <AlertCircle className="h-4 w-4" />;
      case "ordered": return <Clock className="h-4 w-4" />;
      case "received": return <Truck className="h-4 w-4" />;
      case "installed": return <CheckCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "needed": return "destructive";
      case "ordered": return "secondary";
      case "received": return "default";
      case "installed": return "default";
      default: return "secondary";
    }
  };

  const filteredParts = allParts.filter(part => {
    const matchesSearch = part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.projectTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         part.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || part.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || part.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = [...new Set(allParts.map(part => part.category))];
  const totalCost = filteredParts.reduce((sum, part) => sum + part.cost, 0);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">All Parts</h1>
        <p className="text-muted-foreground">
          Manage parts across all restoration projects
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Parts</p>
                <p className="text-2xl font-bold">{filteredParts.length}</p>
              </div>
              <Package className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">${totalCost.toFixed(2)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">On Order</p>
                <p className="text-2xl font-bold">
                  {allParts.filter(p => p.status === "ordered").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Installed</p>
                <p className="text-2xl font-bold">
                  {allParts.filter(p => p.status === "installed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-muted-foreground" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Parts</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by name, project, or supplier..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="needed">Needed</SelectItem>
                  <SelectItem value="ordered">Ordered</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="installed">Installed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category-filter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Parts List */}
      <Card>
        <CardHeader>
          <CardTitle>Parts ({filteredParts.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredParts.map((part, index) => (
              <div key={part.id}>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium">{part.name}</h3>
                      <Badge variant={getStatusVariant(part.status)} className="flex items-center gap-1">
                        {getStatusIcon(part.status)}
                        {part.status}
                      </Badge>
                      <Badge variant="outline">{part.category}</Badge>
                    </div>
                    
                    <div className="text-sm text-muted-foreground">
                      <span className="font-medium">Project:</span> {part.projectTitle}
                      {part.supplier && (
                        <>
                          {" • "}
                          <span className="font-medium">Supplier:</span> {part.supplier}
                        </>
                      )}
                    </div>

                    {part.orderedDate && (
                      <div className="text-sm text-muted-foreground">
                        <span className="font-medium">Ordered:</span> {part.orderedDate}
                        {part.projectedArrival && !part.receivedDate && (
                          <>
                            {" • "}
                            <span className="font-medium">Expected:</span> {part.projectedArrival}
                          </>
                        )}
                        {part.receivedDate && (
                          <>
                            {" • "}
                            <span className="font-medium">Received:</span> {part.receivedDate}
                          </>
                        )}
                        {part.installedDate && (
                          <>
                            {" • "}
                            <span className="font-medium">Installed:</span> {part.installedDate}
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-semibold">${part.cost.toFixed(2)}</div>
                    <Button variant="outline" size="sm" className="mt-2">
                      View Project
                    </Button>
                  </div>
                </div>
                {index < filteredParts.length - 1 && <Separator className="my-2" />}
              </div>
            ))}

            {filteredParts.length === 0 && (
              <div className="text-center py-8">
                <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No parts found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AllParts;