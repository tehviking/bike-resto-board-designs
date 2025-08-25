import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import { z } from "zod";
import { CalendarIcon, Plus, Trash2, ArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const projectFormSchema = z.object({
  title: z.string().min(1, "Project title is required").max(100, "Title must be less than 100 characters"),
  description: z.string().min(10, "Description must be at least 10 characters").max(500, "Description must be less than 500 characters"),
  status: z.enum(["not-started", "in-progress", "completed", "on-hold"], {
    required_error: "Please select a project status"
  }),
  start_date: z.date({
    required_error: "Start date is required"
  }),
  target_completion_date: z.date({
    required_error: "Target completion date is required"
  }),
  sub_projects: z.array(z.object({
    title: z.string().min(1, "Sub-project title is required"),
    description: z.string().optional(),
    estimated_hours: z.number().min(0).optional()
  })).optional(),
  initial_parts: z.array(z.object({
    name: z.string().min(1, "Part name is required"),
    category: z.string().min(1, "Category is required"),
    estimated_cost: z.number().min(0, "Cost must be positive").optional(),
    supplier: z.string().optional(),
    notes: z.string().optional()
  })).optional()
});

type ProjectFormData = z.infer<typeof projectFormSchema>;

const ProjectForm = () => {
  const navigate = useNavigate();
  const { project_id } = useParams();
  const isEditing = Boolean(project_id);
  
  const form = useForm<ProjectFormData>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "not-started",
      start_date: new Date(),
      target_completion_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      sub_projects: [],
      initial_parts: []
    }
  });

  const { fields: subProjectFields, append: appendSubProject, remove: removeSubProject } = useFieldArray({
    control: form.control,
    name: "sub_projects"
  });

  const { fields: partFields, append: appendPart, remove: removePart } = useFieldArray({
    control: form.control,
    name: "initial_parts"
  });

  const onSubmit = (data: ProjectFormData) => {
    console.log("Form submitted:", data);
    toast.success(isEditing ? "Project updated successfully!" : "Project created successfully!");
    // In a real app, this would make an API call
    navigate(isEditing ? `/admin/project/${project_id}` : "/");
  };

  const handleCancel = () => {
    navigate(isEditing ? `/admin/project/${project_id}` : "/");
  };

  const statusOptions = [
    { value: "not-started", label: "Not Started" },
    { value: "in-progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
    { value: "on-hold", label: "On Hold" }
  ];

  const partCategories = [
    "Frame & Fork",
    "Drivetrain", 
    "Braking",
    "Wheels & Tires",
    "Cockpit",
    "Comfort",
    "Accessories",
    "Tools & Supplies"
  ];

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={handleCancel}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to {isEditing ? "Project" : "Dashboard"}
        </Button>
        
        <h1 className="text-3xl font-bold mb-2">
          {isEditing ? "Edit Project" : "Create New Project"}
        </h1>
        <p className="text-muted-foreground">
          {isEditing 
            ? "Update the details for your bicycle restoration project"
            : "Set up a new bicycle restoration project with all the essential details"
          }
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Project Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="project_title">Project Title *</FormLabel>
                    <FormControl>
                      <Input
                        id="project_title"
                        name="project[title]"
                        placeholder="e.g., 1985 Trek 720 Touring Bike"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Give your project a descriptive name that includes the bike model and year if known
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="project_description">Description *</FormLabel>
                    <FormControl>
                      <Textarea
                        id="project_description"
                        name="project[description]"
                        placeholder="Describe the restoration scope, condition, and goals..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Provide details about the bike's condition, restoration goals, and any special considerations
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="project_status">Status *</FormLabel>
                      <Select 
                        name="project[status]"
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger id="project_status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {statusOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor="project_start_date">Start Date *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              id="project_start_date"
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <input 
                        type="hidden" 
                        name="project[start_date]" 
                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="target_completion_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel htmlFor="project_target_date">Target Completion *</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              id="project_target_date"
                              variant="outline"
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < form.getValues("start_date")}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <input 
                        type="hidden" 
                        name="project[target_completion_date]" 
                        value={field.value ? format(field.value, "yyyy-MM-dd") : ""} 
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          {/* Sub-Projects Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Sub-Projects</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Break down your restoration into manageable phases (optional)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendSubProject({ title: "", description: "", estimated_hours: undefined })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Sub-Project
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {subProjectFields.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No sub-projects added yet. Click "Add Sub-Project" to get started.
                </p>
              ) : (
                <div className="space-y-4">
                  {subProjectFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Sub-Project {index + 1}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSubProject(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`sub_projects.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Title *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Frame restoration"
                                  name={`project[sub_projects_attributes][${index}][title]`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`sub_projects.${index}.estimated_hours`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Hours</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  name={`project[sub_projects_attributes][${index}][estimated_hours]`}
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name={`sub_projects.${index}.description`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe the work involved in this phase..."
                                name={`project[sub_projects_attributes][${index}][description]`}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Initial Parts Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Initial Parts List</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Add parts you know you'll need for this restoration (optional)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => appendPart({ name: "", category: "", estimated_cost: undefined, supplier: "", notes: "" })}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Part
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {partFields.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">
                  No parts added yet. Click "Add Part" to start building your parts list.
                </p>
              ) : (
                <div className="space-y-4">
                  {partFields.map((field, index) => (
                    <div key={field.id} className="p-4 border rounded-lg space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline">Part {index + 1}</Badge>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removePart(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <FormField
                          control={form.control}
                          name={`initial_parts.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Part Name *</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Brake cables"
                                  name={`project[initial_parts_attributes][${index}][name]`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`initial_parts.${index}.category`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Category *</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {partCategories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <input 
                                type="hidden" 
                                name={`project[initial_parts_attributes][${index}][category]`} 
                                value={field.value} 
                              />
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`initial_parts.${index}.estimated_cost`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Estimated Cost</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="0.01"
                                  placeholder="0.00"
                                  name={`project[initial_parts_attributes][${index}][estimated_cost]`}
                                  {...field}
                                  onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name={`initial_parts.${index}.supplier`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Supplier</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g., Local bike shop"
                                  name={`project[initial_parts_attributes][${index}][supplier]`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name={`initial_parts.${index}.notes`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Notes</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Any special requirements..."
                                  name={`project[initial_parts_attributes][${index}][notes]`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update Project" : "Create Project"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProjectForm;