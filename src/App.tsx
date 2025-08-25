import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import Dashboard from "./admin/dashboard/Dashboard";
import ProjectDetail from "./admin/project/ProjectDetail";
import ProjectForm from "./pages/ProjectForm";
import Inspiration from "./pages/Inspiration";
import AllParts from "./pages/AllParts";
import AllProjects from "./pages/AllProjects";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1 overflow-hidden">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/admin/project/:project_id" element={<ProjectDetail />} />
                <Route path="/admin/project/:project_id/edit" element={<ProjectForm />} />
                <Route path="/projects/new" element={<ProjectForm />} />
                <Route path="/projects" element={<AllProjects />} />
                <Route path="/parts" element={<AllParts />} />
                <Route path="/inspiration" element={<Inspiration />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
