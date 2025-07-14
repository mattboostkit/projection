import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Heart, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function ImpactDashboard() {
  // Mock user stats for demonstration
  const userStats = {
    totalDonated: "1,240",
    projectsSupported: 7,
    livesImpacted: 142,
    carbonOffset: "2.1",
  };

  const recentActivity = [
    {
      id: 1,
      project: "Maasai Mara Elephant Protection",
      update: "15 elephants successfully relocated from conflict zones",
      date: "2 days ago",
      icon: Leaf,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      id: 2,
      project: "Kilimanjaro Rural Schools",
      update: "New classroom construction completed",
      date: "1 week ago", 
      icon: Users,
      iconColor: "text-secondary",
      bgColor: "bg-secondary/10",
    },
    {
      id: 3,
      project: "Mobile Health Clinics",
      update: "500 patients treated this month",
      date: "2 weeks ago",
      icon: Heart,
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Track Your Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            See exactly how your donations are making a difference with our comprehensive impact tracking dashboard.
          </p>
        </div>

        <Card className="shadow-lg overflow-hidden">
          <CardHeader className="bg-primary text-white">
            <CardTitle className="font-serif text-xl">Your Impact Dashboard</CardTitle>
            <p className="text-green-100 text-sm">Real-time progress tracking across all your supported projects</p>
          </CardHeader>

          <CardContent className="p-6">
            {/* Impact Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">
                  £{userStats.totalDonated}
                </div>
                <div className="text-sm text-muted-foreground">Total Donated</div>
                <TrendingUp className="h-5 w-5 text-primary mx-auto mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">
                  {userStats.projectsSupported}
                </div>
                <div className="text-sm text-muted-foreground">Projects Supported</div>
                <Heart className="h-5 w-5 text-secondary mx-auto mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">
                  {userStats.livesImpacted}
                </div>
                <div className="text-sm text-muted-foreground">Lives Impacted</div>
                <Users className="h-5 w-5 text-accent mx-auto mt-2" />
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  {userStats.carbonOffset}t
                </div>
                <div className="text-sm text-muted-foreground">CO₂ Offset</div>
                <Leaf className="h-5 w-5 text-green-600 mx-auto mt-2" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-serif font-bold text-foreground">Recent Activity</h4>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/dashboard">View Full Dashboard</Link>
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className={`w-12 h-12 ${activity.bgColor} rounded-full flex items-center justify-center`}>
                      <activity.icon className={`h-6 w-6 ${activity.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-foreground">{activity.project}</div>
                      <div className="text-sm text-muted-foreground">{activity.update}</div>
                    </div>
                    <div className="text-sm text-muted-foreground">{activity.date}</div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <Button className="bg-primary hover:bg-primary-600 text-white" asChild>
                  <Link href="/dashboard">
                    View Complete Impact Dashboard
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
