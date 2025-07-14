import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Heart, BarChart3, Gift, Calendar, Users } from "lucide-react";

export default function PortalDonors() {
  const benefits = [
    "Choose your impact areas",
    "Regular progress updates",
    "Tax-efficient giving options",
    "Connect with like-minded donors",
    "Visit supported projects",
    "Personalised impact reports",
  ];

  const givingOptions = [
    {
      icon: Heart,
      title: "One-Time Donations",
      description: "Make an immediate impact with flexible donation amounts to projects you care about most.",
      features: ["Choose any amount", "Instant impact", "Project selection", "Receipt provided"],
    },
    {
      icon: Calendar,
      title: "Monthly Giving",
      description: "Create sustained impact through regular monthly contributions that help projects plan long-term.",
      features: ["Flexible amounts", "Easy management", "Predictable support", "Greater impact"],
    },
    {
      icon: Gift,
      title: "Special Occasions",
      description: "Make donations in honour of special moments or as meaningful gifts for friends and family.",
      features: ["Honour donations", "Gift certificates", "Celebration giving", "Memorial donations"],
    },
  ];

  const impactAreas = [
    {
      title: "Health",
      description: "Support healthcare infrastructure, medical training, and community health programmes.",
      color: "bg-red-500",
      projects: 23,
    },
    {
      title: "Education", 
      description: "Fund schools, teacher training, and educational resources for African children.",
      color: "bg-blue-500",
      projects: 41,
    },
    {
      title: "Conservation",
      description: "Protect wildlife, preserve ecosystems, and support sustainable community practices.",
      color: "bg-green-500",
      projects: 63,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=1920&h=1080&fit=crop')"}}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white text-accent mb-6 text-lg px-4 py-2">
              Private Donors Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Make a Personal<br />
              <span className="text-white">Difference</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Create meaningful change across African communities with complete transparency 
              on how your generosity transforms lives and protects our planet.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg" asChild>
                <a href="/contact">Start Giving Today</a>
              </Button>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 px-8 py-4 text-lg transition-all" asChild>
                <a href="/projects">Explore Projects</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Areas */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Choose Your Impact Area
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Direct your donations to the causes that matter most to you across our three pillars of impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader>
                  <div className={`w-12 h-12 ${area.color} rounded-lg flex items-center justify-center mb-4`}>
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="font-serif text-xl">{area.title}</CardTitle>
                  <Badge variant="secondary">{area.projects} active projects</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{area.description}</p>
                  <Button className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    Explore {area.title} Projects
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Flexible Giving Options
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose how you want to give, whether it's a one-time donation or ongoing support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {givingOptions.map((option, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <option.icon className="h-6 w-6 text-accent" />
                    </div>
                    <CardTitle className="font-serif">{option.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{option.description}</p>
                  <ul className="space-y-2">
                    {option.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full">Learn More</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Why Donors Choose Projection
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Experience the difference of transparent, impactful giving with personal connection to your chosen causes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-white rounded-lg shadow-sm">
                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0" />
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Tracking */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Track Your Impact in Real-Time
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                See exactly how your donations create change with our comprehensive impact tracking dashboard. 
                Follow project progress, read updates from the field, and witness the transformation you're helping to create.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="h-6 w-6 text-accent" />
                  <span className="font-medium">Real-time project progress updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-accent" />
                  <span className="font-medium">Stories from beneficiary communities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-6 w-6 text-accent" />
                  <span className="font-medium">Personalised impact calculations</span>
                </div>
              </div>

              <Button className="mt-6 bg-accent hover:bg-accent-600" size="lg">
                View Sample Dashboard
              </Button>
            </div>

            <div className="bg-gray-50 rounded-lg p-8">
              <h3 className="font-serif font-bold text-xl mb-4">Your Impact Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Donated</span>
                  <span className="font-bold text-2xl text-accent">£1,240</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Projects Supported</span>
                  <span className="font-bold text-2xl text-primary">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Lives Impacted</span>
                  <span className="font-bold text-2xl text-secondary">142</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Carbon Offset</span>
                  <span className="font-bold text-2xl text-green-600">2.1t CO₂</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Start Making a Difference?
          </h2>
          <p className="text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
            Join thousands of compassionate donors creating lasting change across African communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-accent hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              Browse Projects
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-accent px-8 py-4 text-lg">
              Sign Up for Updates
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-orange-100 mb-4">100% of your donation goes directly to projects</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-sm">Charity Commission Registered</div>
              <div className="text-sm">GiveWell Recommended</div>
              <div className="text-sm">Transparent Impact Reporting</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
