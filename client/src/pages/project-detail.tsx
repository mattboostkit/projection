import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Project, insertDonationSchema } from "@shared/schema";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Star, Heart, Share2, Calendar, Users, Target } from "lucide-react";

const donationFormSchema = insertDonationSchema.extend({
  amount: z.string().min(1, "Amount is required"),
});

export default function ProjectDetail() {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: project, isLoading } = useQuery<Project>({
    queryKey: [`/api/projects/${id}`],
  });

  const form = useForm<z.infer<typeof donationFormSchema>>({
    resolver: zodResolver(donationFormSchema),
    defaultValues: {
      userId: 1, // Mock user ID
      projectId: parseInt(id || "0"),
      amount: "",
      isRecurring: false,
      message: "",
    },
  });

  const onSubmit = (data: z.infer<typeof donationFormSchema>) => {
    // Redirect to secure Stripe checkout
    const checkoutUrl = `/checkout?amount=${data.amount}&projectId=${project?.id}&projectTitle=${encodeURIComponent(project?.title || '')}`;
    window.location.href = checkoutUrl;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200"></div>
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-8 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="h-96 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The project you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <a href="/projects">Browse All Projects</a>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const progressPercentage = formatPercentage(project.currentAmount, project.goalAmount);
  const pillarColors: Record<string, string> = {
    health: "bg-red-500",
    education: "bg-blue-500", 
    conservation: "bg-green-500",
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Image */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={project.projectImage}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto">
            <Badge className={`${pillarColors[project.pillar]} text-white mb-4 capitalize`}>
              {project.pillar}
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">
              {project.title}
            </h1>
            <div className="flex items-center text-white text-lg">
              <MapPin className="h-5 w-5 mr-2" />
              {project.location}, {project.country}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Project Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">About This Project</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </CardContent>
            </Card>

            {/* Partner Organisation */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Partner Organisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <img
                    src={project.partnerLogo || "https://via.placeholder.com/64"}
                    alt={project.partnerOrganisation}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{project.partnerOrganisation}</h3>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-muted-foreground">
                        {project.rating} rating
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Project Impact */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Expected Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary mb-1">
                      {Math.floor(parseFloat(project.goalAmount) * 0.1)}
                    </div>
                    <div className="text-sm text-muted-foreground">Lives Impacted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary mb-1">12</div>
                    <div className="text-sm text-muted-foreground">Months Duration</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Communities</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Donation Card */}
          <div className="space-y-6">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="font-serif">Support This Project</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress */}
                <div>
                  <div className="flex justify-between text-sm text-muted-foreground mb-2">
                    <span>Funding Progress</span>
                    <span>{progressPercentage}% of {formatCurrency(project.goalAmount)}</span>
                  </div>
                  <Progress value={progressPercentage} className="h-3" />
                  <div className="mt-2 text-2xl font-bold text-primary">
                    {formatCurrency(project.currentAmount)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    raised of {formatCurrency(project.goalAmount)} goal
                  </div>
                </div>

                {/* Donation Form */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary hover:bg-primary-600 text-white">
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle className="font-serif">Make a Donation</DialogTitle>
                    </DialogHeader>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="amount"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Donation Amount (£)</FormLabel>
                              <FormControl>
                                <Input placeholder="50" {...field} type="number" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="recurringFrequency"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Donation Type</FormLabel>
                              <Select onValueChange={(value) => {
                                field.onChange(value);
                                form.setValue("isRecurring", value !== "one-time");
                              }}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select donation type" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="one-time">One-time donation</SelectItem>
                                  <SelectItem value="monthly">Monthly recurring</SelectItem>
                                  <SelectItem value="quarterly">Quarterly recurring</SelectItem>
                                  <SelectItem value="annually">Annual recurring</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Leave a message of support..."
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full"
                        >
                          Proceed to Secure Payment
                        </Button>
                      </form>
                    </Form>
                  </DialogContent>
                </Dialog>

                {/* Share */}
                <Button variant="outline" className="w-full">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share Project
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
