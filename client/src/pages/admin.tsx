import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from "@/components/ui/alert-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertProjectSchema, type Project } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Plus, CheckCircle, Edit, Trash2, Eye, MapPin } from "lucide-react";
import { z } from "zod";
import { formatCurrency } from "@/lib/utils";

const projectFormSchema = insertProjectSchema.extend({
  goalAmount: z.string().min(1, "Goal amount is required"),
  currency: z.string().default("GBP"),
});

export default function Admin() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState("view");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch all projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ["/api/projects"],
    queryFn: async () => {
      const response = await fetch("/api/projects");
      if (!response.ok) throw new Error("Failed to fetch projects");
      return response.json() as Promise<Project[]>;
    },
  });

  const form = useForm<z.infer<typeof projectFormSchema>>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      shortDescription: "",
      pillar: "",
      location: "",
      country: "",
      goalAmount: "",
      partnerOrganisation: "",
      partnerLogo: "",
      projectImage: "",
    },
  });

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async (data: z.infer<typeof projectFormSchema>) => {
      return apiRequest("POST", "/api/projects", data);
    },
    onSuccess: () => {
      toast({
        title: "Project Created Successfully!",
        description: "The new project has been added to the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      form.reset();
      setIsSubmitting(false);
      setActiveTab("view");
    },
    onError: () => {
      toast({
        title: "Failed to Create Project",
        description: "There was an error creating the project. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  // Update project mutation
  const updateProjectMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: z.infer<typeof projectFormSchema> }) => {
      return apiRequest("PUT", `/api/projects/${id}`, data);
    },
    onSuccess: () => {
      toast({
        title: "Project Updated Successfully!",
        description: "The project has been updated.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setEditingProject(null);
      form.reset();
      setIsSubmitting(false);
      setActiveTab("view");
    },
    onError: () => {
      toast({
        title: "Failed to Update Project",
        description: "There was an error updating the project. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id: number) => {
      return apiRequest("DELETE", `/api/projects/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Project Deleted Successfully!",
        description: "The project has been removed from the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Failed to Delete Project",
        description: "There was an error deleting the project. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Seed projects mutation
  const seedProjectsMutation = useMutation({
    mutationFn: async () => {
      return apiRequest("POST", "/api/projects/seed");
    },
    onSuccess: () => {
      toast({
        title: "Sample Projects Added!",
        description: "All sample projects have been restored to the platform.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
    },
    onError: () => {
      toast({
        title: "Failed to Add Sample Projects",
        description: "There was an error adding the sample projects. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof projectFormSchema>) => {
    setIsSubmitting(true);
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data });
    } else {
      createProjectMutation.mutate(data);
    }
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    form.reset({
      title: project.title,
      description: project.description,
      shortDescription: project.shortDescription,
      pillar: project.pillar,
      location: project.location,
      country: project.country,
      goalAmount: project.goalAmount?.toString() || "",
      partnerOrganisation: project.partnerOrganisation,
      partnerLogo: project.partnerLogo || "",
      projectImage: project.projectImage,
    });
    setActiveTab("create");
  };

  const handleDeleteProject = (projectId: number) => {
    deleteProjectMutation.mutate(projectId);
  };

  const resetForm = () => {
    setEditingProject(null);
    form.reset({
      title: "",
      description: "",
      shortDescription: "",
      pillar: "",
      location: "",
      country: "",
      goalAmount: "",
      partnerOrganisation: "",
      partnerLogo: "",
      projectImage: "",
    });
  };

  const pillars = [
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "conservation", label: "Conservation" },
  ];

  const [customCountry, setCustomCountry] = useState("");
  const [showCustomCountry, setShowCustomCountry] = useState(false);

  const countries = [
    { value: "kenya", label: "Kenya" },
    { value: "tanzania", label: "Tanzania" },
    { value: "uganda", label: "Uganda" },
    { value: "rwanda", label: "Rwanda" },
    { value: "botswana", label: "Botswana" },
    { value: "south-africa", label: "South Africa" },
    { value: "namibia", label: "Namibia" },
    { value: "zambia", label: "Zambia" },
    { value: "ethiopia", label: "Ethiopia" },
    { value: "ghana", label: "Ghana" },
    { value: "morocco", label: "Morocco" },
    { value: "madagascar", label: "Madagascar" },
    { value: "custom", label: "Add New Country..." },
  ];

  const currencies = [
    { value: "GBP", label: "£ GBP" },
    { value: "USD", label: "$ USD" },
    { value: "EUR", label: "€ EUR" },
    { value: "ZAR", label: "R ZAR" },
    { value: "KES", label: "KSh KES" },
    { value: "TZS", label: "TSh TZS" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary/80 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Project Administration
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Manage projects across our three pillars of impact: Health, Education, and Conservation. 
            Create and edit projects to showcase meaningful work across Africa.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="view">Manage Projects</TabsTrigger>
              <TabsTrigger value="create">
                {editingProject ? "Edit Project" : "Add New Project"}
              </TabsTrigger>
            </TabsList>

            {/* View/Manage Projects Tab */}
            <TabsContent value="view" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between font-serif text-2xl">
                    <span className="flex items-center">
                      <Eye className="h-6 w-6 mr-2 text-primary" />
                      Project Management
                    </span>
                    <div className="flex gap-2">
                      <Button 
                        onClick={() => seedProjectsMutation.mutate()}
                        variant="outline"
                        disabled={seedProjectsMutation.isPending}
                        className="border-primary text-primary hover:bg-primary hover:text-white"
                      >
                        {seedProjectsMutation.isPending ? "Adding..." : "Restore Sample Projects"}
                      </Button>
                      <Button 
                        onClick={() => {
                          resetForm();
                          setActiveTab("create");
                        }}
                        className="bg-primary hover:bg-primary/90"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Project
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {projects?.map((project) => (
                        <Card key={project.id} className="relative overflow-hidden">
                          <div className="aspect-video relative">
                            <img 
                              src={project.projectImage} 
                              alt={project.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-2 right-2 flex gap-1">
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={() => handleEditProject(project)}
                                className="h-8 w-8 p-0"
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => {
                                  if (window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
                                    handleDeleteProject(project.id);
                                  }
                                }}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline" className="capitalize">
                                {project.pillar}
                              </Badge>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 mr-1" />
                                {project.country}
                              </div>
                            </div>
                            <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2">
                              {project.title}
                            </h3>
                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                              {project.shortDescription}
                            </p>
                            <div className="flex justify-between items-center text-sm">
                              <span className="font-medium">
                                Goal: {formatCurrency(project.goalAmount?.toString() || "0")}
                              </span>
                              <span className="text-muted-foreground">
                                Raised: {formatCurrency(project.currentAmount?.toString() || "0")}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Create/Edit Project Tab */}
            <TabsContent value="create">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center font-serif text-2xl">
                    {editingProject ? (
                      <>
                        <Edit className="h-6 w-6 mr-2 text-primary" />
                        Edit Project: {editingProject.title}
                      </>
                    ) : (
                      <>
                        <Plus className="h-6 w-6 mr-2 text-primary" />
                        Add New Project
                      </>
                    )}
                  </CardTitle>
                  {editingProject && (
                    <Button
                      variant="outline"
                      onClick={resetForm}
                      className="w-fit"
                    >
                      Cancel Edit
                    </Button>
                  )}
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="title"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter project title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="pillar"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pillar</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a pillar" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {pillars.map((pillar) => (
                                    <SelectItem key={pillar.value} value={pillar.value}>
                                      {pillar.label}
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
                          name="location"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Location</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter specific location" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="country"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Country</FormLabel>
                              {showCustomCountry ? (
                                <div className="flex gap-2">
                                  <FormControl>
                                    <Input
                                      placeholder="Enter country name"
                                      value={customCountry}
                                      onChange={(e) => {
                                        setCustomCountry(e.target.value);
                                        field.onChange(e.target.value);
                                      }}
                                    />
                                  </FormControl>
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                      setShowCustomCountry(false);
                                      setCustomCountry("");
                                      field.onChange("");
                                    }}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              ) : (
                                <Select
                                  onValueChange={(value) => {
                                    if (value === "custom") {
                                      setShowCustomCountry(true);
                                    } else {
                                      field.onChange(value);
                                    }
                                  }}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a country" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent className="max-h-60">
                                    {countries.map((country) => (
                                      <SelectItem key={country.value} value={country.value}>
                                        {country.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="goalAmount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Goal Amount</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="25000" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="currency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Currency</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value || "GBP"}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select currency" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {currencies.map((currency) => (
                                    <SelectItem key={currency.value} value={currency.value}>
                                      {currency.label}
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
                          name="partnerOrganisation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Partner Organisation</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter organisation name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="shortDescription"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Short Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Brief overview of the project (2-3 sentences)"
                                className="resize-none"
                                rows={3}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Detailed description of the project, its goals, and impact"
                                className="resize-none"
                                rows={6}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="projectImage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Image URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://example.com/image.jpg" {...field} />
                              </FormControl>
                              <p className="text-xs text-muted-foreground">
                                Ideal resolution: 800x600px (4:3 aspect ratio) for best display quality
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="partnerLogo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Partner Logo URL (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="https://example.com/logo.jpg" 
                                  {...field} 
                                  value={field.value ?? ""}
                                />
                              </FormControl>
                              <p className="text-xs text-muted-foreground">
                                Ideal resolution: 200x200px (square) for consistent partner logo display
                              </p>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="flex justify-end space-x-4">
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => form.reset()}
                          disabled={isSubmitting}
                        >
                          Clear Form
                        </Button>
                        <Button 
                          type="submit" 
                          className="bg-primary hover:bg-primary/90"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            "Processing..."
                          ) : editingProject ? (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Update Project
                            </>
                          ) : (
                            <>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Create Project
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
}