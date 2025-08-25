import { useState, useEffect } from "react";
import { ProjectCard } from "@/components/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, SortAsc, Plus, Package } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";

import bikeProject1 from "@/assets/bike-project-1.jpg";
import bikeProject2 from "@/assets/bike-project-2.jpg";
import bikeProject3 from "@/assets/bike-project-3.jpg";
import bikeProject4 from "@/assets/bike-project-4.jpg";
import bikeProject5 from "@/assets/bike-project-5.jpg";
import bikeProject6 from "@/assets/bike-project-6.jpg";

interface Project {
  id: string;
  title: string;
  description: string;
  status: "not-started" | "in-progress" | "completed" | "on-hold";
  nextStep: string;
  startDate: string;
  targetDate: string;
  imageUrl: string;
}

const AllProjects = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Initialize status filter from URL params
  useEffect(() => {
    const statusParam = searchParams.get("status");
    if (statusParam && ["not-started", "in-progress", "completed", "on-hold"].includes(statusParam)) {
      setStatusFilter(statusParam);
    }
  }, [searchParams]);

  // Sample data - in a real app this would come from your backend
  const allProjects: Project[] = [
    {
      id: "1",
      title: "1985 Trek 720 Touring Bike",
      description: "Complete restoration of a classic touring bicycle with original Shimano components",
      status: "in-progress",
      nextStep: "Install new brake cables and housing",
      startDate: "2024-01-15",
      targetDate: "2024-03-15",
      imageUrl: bikeProject1,
    },
    {
      id: "2", 
      title: "1992 Specialized Rockhopper",
      description: "Frame restoration and complete component upgrade for mountain bike",
      status: "not-started",
      nextStep: "Strip paint and assess frame condition",
      startDate: "2024-02-01",
      targetDate: "2024-04-30",
      imageUrl: bikeProject2,
    },
    {
      id: "3",
      title: "Vintage Peugeot Road Bike",
      description: "Classic French road bike with original Reynolds tubing",
      status: "completed",
      nextStep: "Final quality check and delivery",
      startDate: "2023-11-01",
      targetDate: "2024-01-30",
      imageUrl: bikeProject3,
    },
    {
      id: "4",
      title: "Custom Fixed Gear Build",
      description: "Building a custom single-speed bike from vintage steel frame",
      status: "on-hold",
      nextStep: "Waiting for custom wheels to arrive",
      startDate: "2024-01-20",
      targetDate: "2024-03-01",
      imageUrl: bikeProject4,
    },
    {
      id: "5",
      title: "1970s Schwinn Continental",
      description: "Restoration of classic 10-speed road bike with period-correct components",
      status: "in-progress",
      nextStep: "Rebuild rear derailleur and adjust shifting",
      startDate: "2024-02-10",
      targetDate: "2024-04-15",
      imageUrl: bikeProject5,
    },
    {
      id: "6",
      title: "Modern Gravel Bike Upgrade",
      description: "Upgrading components on 2018 gravel bike for better performance",
      status: "not-started",
      nextStep: "Order new 1x drivetrain components",
      startDate: "2024-03-01",
      targetDate: "2024-05-01",
      imageUrl: bikeProject6,
    },
  ];

  const filteredAndSortedProjects = allProjects
    .filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "all" || project.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;
      
      switch (sortBy) {
        case "title":
          aValue = a.title;
          bValue = b.title;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        case "startDate":
          aValue = new Date(a.startDate);
          bValue = new Date(b.startDate);
          break;
        case "targetDate":
          aValue = new Date(a.targetDate);
          bValue = new Date(b.targetDate);
          break;
        default:
          aValue = a.title;
          bValue = b.title;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

  const getStatusCount = (status: string) => {
    return allProjects.filter(p => p.status === status).length;
  };

  // Update URL when status filter changes
  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    if (value === "all") {
      searchParams.delete("status");
    } else {
      searchParams.set("status", value);
    }
    setSearchParams(searchParams);
  };

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">All Projects</h1>
            <p className="text-muted-foreground">
              Manage and track all your bicycle restoration projects
            </p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => navigate("/projects/new")}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold">{allProjects.length}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{getStatusCount("not-started")}</div>
              <div className="text-sm text-muted-foreground">Not Started</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{getStatusCount("in-progress")}</div>
              <div className="text-sm text-muted-foreground">In Progress</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{getStatusCount("completed")}</div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">{getStatusCount("on-hold")}</div>
              <div className="text-sm text-muted-foreground">On Hold</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search Projects</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="not-started">Not Started</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on-hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-by">Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                  <SelectItem value="status">Status</SelectItem>
                  <SelectItem value="startDate">Start Date</SelectItem>
                  <SelectItem value="targetDate">Target Date</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sort-order">Sort Order</Label>
              <Button
                variant="outline"
                onClick={toggleSortOrder}
                className="w-full justify-start"
              >
                <SortAsc className={`h-4 w-4 mr-2 ${sortOrder === "desc" ? "rotate-180" : ""}`} />
                {sortOrder === "asc" ? "Ascending" : "Descending"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            Projects ({filteredAndSortedProjects.length})
          </h2>
          {(searchTerm || statusFilter !== "all") && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setStatusFilter("all");
                setSortBy("title");
                setSortOrder("asc");
                searchParams.delete("status");
                setSearchParams(searchParams);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredAndSortedProjects.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No projects found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || statusFilter !== "all" 
                  ? "Try adjusting your search or filter criteria"
                  : "Start by creating your first restoration project"
                }
              </p>
              <Button onClick={() => navigate("/projects/new")}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Project
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                status={project.status}
                nextStep={project.nextStep}
                startDate={project.startDate}
                targetDate={project.targetDate}
                imageUrl={project.imageUrl}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProjects;