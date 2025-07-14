import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { UserStats, Donation, Project } from "@shared/schema";
import { Heart, TrendingUp, Users, Leaf, Calendar, MapPin } from "lucide-react";

export default function Dashboard() {
  const mockUserId = 1; // In a real app, this would come from authentication context

  const { data: userStats, isLoading: statsLoading } = useQuery<UserStats>({
    queryKey: [`/api/users/${mockUserId}/stats`],
  });

  const { data: userDonations = [], isLoading: donationsLoading } = useQuery<Donation[]>({
    queryKey: [`/api/users/${mockUserId}/donations`],
  });

  const { data: allProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Mock recent activity data
  const recentActivity = [
    {
      id: 1,
      project: "Maasai Mara Elephant Protection",
      update: "15 elephants successfully relocated from conflict zones",
      date: "2 days ago",
      icon: Leaf,
      color: "text-green-600",
    },
    {
      id: 2,
      project: "Kilimanjaro Rural Schools",
      update: "New classroom construction completed",
      date: "1 week ago",
      icon: Users,
      color: "text-blue-600",
    },
    {
      id: 3,
      project: "Mobile Health Clinics",
      update: "500 patients treated this month",
      date: "2 weeks ago",
      icon: Heart,
      color: "text-red-600",
    },
  ];

  if (statsLoading || donationsLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="animate-pulse">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="h-8 bg-gray-200 rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-gray-200 rounded"></div>
              ))}
            </div>
            <div className="h-96 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary to-green-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Your Impact Dashboard
          </h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Track your contributions and see the real-world impact of your donations across African communities.
          </p>
        </div>
      </section>

      {/* Main Dashboard */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Impact Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">
                {userStats ? formatCurrency(userStats.totalDonated) : "£0"}
              </div>
              <div className="text-sm text-muted-foreground">Total Donated</div>
              <TrendingUp className="h-6 w-6 text-primary mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-secondary mb-2">
                {userStats?.projectsSupported || 0}
              </div>
              <div className="text-sm text-muted-foreground">Projects Supported</div>
              <Heart className="h-6 w-6 text-secondary mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent mb-2">
                {formatNumber(userStats?.livesImpacted || 0)}
              </div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
              <Users className="h-6 w-6 text-accent mx-auto mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {userStats?.carbonOffset || "0"}t
              </div>
              <div className="text-sm text-muted-foreground">CO₂ Offset</div>
              <Leaf className="h-6 w-6 text-green-600 mx-auto mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Detailed View */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="donations">Donation History</TabsTrigger>
            <TabsTrigger value="projects">Supported Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                      <div className={`p-2 rounded-full bg-white ${activity.color}`}>
                        <activity.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-foreground">{activity.project}</div>
                        <div className="text-sm text-muted-foreground">{activity.update}</div>
                      </div>
                      <div className="text-sm text-muted-foreground">{activity.date}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="donations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Donation History</CardTitle>
              </CardHeader>
              <CardContent>
                {userDonations.length === 0 ? (
                  <div className="text-center py-8">
                    <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No donations yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start making a difference by supporting African communities.
                    </p>
                    <a
                      href="/projects"
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors inline-block"
                    >
                      Explore Projects
                    </a>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {userDonations.map((donation) => {
                      const project = allProjects.find(p => p.id === donation.projectId);
                      return (
                        <div key={donation.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div>
                            <div className="font-semibold">{project?.title || "Unknown Project"}</div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(donation.donationDate).toLocaleDateString()}
                              {donation.isRecurring && (
                                <Badge variant="secondary" className="ml-2">
                                  {donation.recurringFrequency}
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-primary">
                              {formatCurrency(donation.amount)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-serif">Supported Projects</CardTitle>
              </CardHeader>
              <CardContent>
                {userStats?.projectsSupported === 0 ? (
                  <div className="text-center py-8">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No projects supported yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Discover impactful projects across Health, Education, and Conservation.
                    </p>
                    <a
                      href="/projects"
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-600 transition-colors inline-block"
                    >
                      Browse Projects
                    </a>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* This would show the actual supported projects */}
                    <div className="text-center py-8 col-span-full">
                      <p className="text-muted-foreground">
                        Supported projects will appear here once you make your first donation.
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
