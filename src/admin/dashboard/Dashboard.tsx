import { ProjectCard } from "@/components/project-card"
import { DashboardHeader } from "./components/dashboard-header"
import { PartsOverview } from "./components/parts-overview"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Wrench, Package, CheckCircle, PauseCircle } from "lucide-react"

import bikeProject1 from "@/assets/bike-project-1.jpg"
import bikeProject2 from "@/assets/bike-project-2.jpg"
import bikeProject3 from "@/assets/bike-project-3.jpg"
import bikeProject4 from "@/assets/bike-project-4.jpg"
import bikeProject5 from "@/assets/bike-project-5.jpg"
import bikeProject6 from "@/assets/bike-project-6.jpg"

// Sample data - in a real app this would come from your backend
const projects = [
  {
    id: "1",
    title: "1985 Trek 720 Touring Bike",
    description: "Complete restoration of a classic touring bicycle with original Shimano components",
    status: "in-progress" as const,
    nextStep: "Install new brake cables and housing",
    startDate: "2024-01-15",
    targetDate: "2024-03-15",
    imageUrl: bikeProject1,
  },
  {
    id: "2", 
    title: "1992 Specialized Rockhopper",
    description: "Frame restoration and complete component upgrade for mountain bike",
    status: "not-started" as const,
    nextStep: "Strip paint and assess frame condition",
    startDate: "2024-02-01",
    targetDate: "2024-04-30",
    imageUrl: bikeProject2,
  },
  {
    id: "3",
    title: "Vintage Peugeot Road Bike",
    description: "Classic French road bike with original Reynolds tubing",
    status: "completed" as const,
    nextStep: "Final quality check and delivery",
    startDate: "2023-11-01",
    targetDate: "2024-01-30",
    imageUrl: bikeProject3,
  },
  {
    id: "4",
    title: "Custom Fixed Gear Build",
    description: "Building a custom single-speed bike from vintage steel frame",
    status: "on-hold" as const,
    nextStep: "Waiting for custom wheels to arrive",
    startDate: "2024-01-20",
    targetDate: "2024-03-01",
    imageUrl: bikeProject4,
  },
  {
    id: "5",
    title: "1970s Schwinn Continental",
    description: "Restoration of classic 10-speed road bike with period-correct components",
    status: "in-progress" as const,
    nextStep: "Rebuild rear derailleur and adjust shifting",
    startDate: "2024-02-10",
    targetDate: "2024-04-15",
    imageUrl: bikeProject5,
  },
  {
    id: "6",
    title: "Modern Gravel Bike Upgrade",
    description: "Upgrading components on 2018 gravel bike for better performance",
    status: "not-started" as const,
    nextStep: "Order new 1x drivetrain components",
    startDate: "2024-03-01",
    targetDate: "2024-05-01",
    imageUrl: bikeProject6,
  },
]

const stats = [
  {
    title: "Total Projects",
    value: projects.length,
    icon: Package,
    description: "Active restoration projects",
  },
  {
    title: "In Progress",
    value: projects.filter(p => p.status === "in-progress").length,
    icon: Wrench,
    description: "Currently being worked on",
  },
  {
    title: "Completed",
    value: projects.filter(p => p.status === "completed").length,
    icon: CheckCircle,
    description: "Successfully finished",
  },
  {
    title: "On Hold",
    value: projects.filter(p => p.status === "on-hold").length,
    icon: PauseCircle,
    description: "Waiting for parts or decisions",
  },
]

export default function Dashboard() {
  const chartData = [
    {
      status: "Not Started",
      count: projects.filter(p => p.status === "not-started").length,
      fill: "hsl(var(--muted-foreground))",
    },
    {
      status: "In Progress", 
      count: projects.filter(p => p.status === "in-progress").length,
      fill: "hsl(var(--primary))",
    },
    {
      status: "On Hold",
      count: projects.filter(p => p.status === "on-hold").length,
      fill: "hsl(var(--warning))",
    },
    {
      status: "Completed",
      count: projects.filter(p => p.status === "completed").length,
      fill: "hsl(var(--success))",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <main className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-gradient-card shadow-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Status Breakdown */}
        <Card className="bg-gradient-card shadow-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Project Status Overview
              <Badge variant="secondary">{projects.length} Total</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Horizontal Status Bar */}
            <div className="flex h-3 rounded-full overflow-hidden bg-muted">
              {chartData.map((item, index) => {
                const percentage = (item.count / projects.length) * 100
                return item.count > 0 ? (
                  <div
                    key={item.status}
                    className="h-full transition-all duration-300"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.fill,
                    }}
                  />
                ) : null
              })}
            </div>
            
            {/* Status Legend */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {chartData.map((item) => {
                const percentage = projects.length > 0 ? ((item.count / projects.length) * 100).toFixed(1) : 0
                return (
                  <div key={item.status} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span className="text-muted-foreground">{item.status}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-medium">{item.count}</span>
                      <span className="text-muted-foreground">({percentage}%)</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Project Grid */}
        <div className="space-y-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Current Projects</h2>
            <Badge variant="outline">
              {projects.length} Projects
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
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
        </div>

        {/* Parts Overview */}
        <div className="mb-8">
          <PartsOverview />
        </div>
      </main>
    </div>
  )
}