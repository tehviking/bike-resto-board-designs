import { useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"
import { 
  Wrench, 
  LayoutDashboard, 
  Package, 
  Clock, 
  CheckCircle, 
  PauseCircle,
  Settings,
  Plus,
  Palette,
  Cog
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "All Projects", url: "/projects", icon: Package },
  { title: "All Parts", url: "/parts", icon: Cog },
  { title: "Inspiration", url: "/inspiration", icon: Palette },
]

const statusItems = [
  { title: "Not Started", url: "/projects?status=not-started", icon: Clock },
  { title: "In Progress", url: "/projects?status=in-progress", icon: Wrench },
  { title: "Completed", url: "/projects?status=completed", icon: CheckCircle },
  { title: "On Hold", url: "/projects?status=on-hold", icon: PauseCircle },
]

const settingsItems = [
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const { state } = useSidebar()
  const location = useLocation()
  const navigate = useNavigate()
  const currentPath = location.pathname
  const isCollapsed = state === "collapsed"

  const isActive = (path: string) => currentPath === path
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-accent text-primary font-medium" : "hover:bg-accent/50"

  return (
    <Sidebar
      className={isCollapsed ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="font-semibold text-lg">BikeRestore</h2>
            </div>
          )}
          {isCollapsed && (
            <div className="flex justify-center">
              <Wrench className="h-6 w-6 text-primary" />
            </div>
          )}
        </div>

        {/* Add New Project Button */}
        <div className="p-4">
          <Button 
            variant="primary" 
            className={isCollapsed ? "w-full p-2" : "w-full"}
            size={isCollapsed ? "icon" : "default"}
            onClick={() => navigate("/projects/new")}
          >
            <Plus className="h-4 w-4" />
            {!isCollapsed && <span>Add Project</span>}
          </Button>
        </div>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Main</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Status Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>By Status</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {statusItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}