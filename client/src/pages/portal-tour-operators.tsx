import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, BarChart3, FileText, Globe, Camera, Award } from "lucide-react";

export default function PortalTourOperators() {
  const benefits = [
    "Project verification & monitoring",
    "Client impact reports",
    "Marketing materials & support",
    "Responsible tourism certification",
    "Direct community partnerships",
    "Transparent impact tracking",
  ];

  const features = [
    {
      icon: BarChart3,
      title: "Impact Analytics",
      description: "Detailed reporting on how your clients' contributions create measurable change in local communities.",
    },
    {
      icon: FileText,
      title: "Client Reports",
      description: "Provide your guests with personalised impact reports showing the difference their safari made.",
    },
    {
      icon: Globe,
      title: "Project Network",
      description: "Access to vetted projects across Kenya, Tanzania, South Africa, and other safari destinations.",
    },
    {
      icon: Camera,
      title: "Marketing Assets",
      description: "Professional photos, videos, and content to showcase your responsible tourism commitments.",
    },
    {
      icon: Award,
      title: "Certification",
      description: "Responsible tourism certification to differentiate your business in the market.",
    },
    {
      icon: Users,
      title: "Community Partners",
      description: "Direct partnerships with local communities and conservation organisations.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&h=1080&fit=crop')"}}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white text-primary mb-6 text-lg px-4 py-2">
              Tour Operators Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Enhance Your Safari<br />
              <span className="text-accent">with Purpose</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Connect your responsible tourism offerings with verified African conservation 
              and community projects. Show your clients the lasting impact of their safari experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg" asChild>
                <a href="/contact">Join Our Network</a>
              </Button>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 px-8 py-4 text-lg transition-all" asChild>
                <a href="/contact">Schedule Demo</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Why Choose Projection?
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your safari business with authentic community connections and measurable conservation impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Powerful Tools for Tour Operators
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Everything you need to integrate meaningful social impact into your safari experiences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="font-serif">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Simple integration with your existing safari operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Partner with Us</h3>
              <p className="text-muted-foreground">
                Join our network of responsible tour operators and choose projects that align with your safari routes.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Integrate Impact</h3>
              <p className="text-muted-foreground">
                Include project visits or donations as part of your safari packages, with full transparency for guests.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-serif font-bold mb-2">Track & Report</h3>
              <p className="text-muted-foreground">
                Provide guests with detailed impact reports and use our marketing materials to promote your responsible tourism.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Make Safari More Meaningful?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join leading safari operators who are already creating lasting impact through responsible tourism partnerships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-lg">
              Get Started Today
            </Button>
            <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 text-lg transition-all">
              Download Partnership Guide
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-green-100 mb-4">Trusted by leading safari operators across Africa</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-sm">Kenya Wildlife Service Partner</div>
              <div className="text-sm">Tanzania Tourism Board Certified</div>
              <div className="text-sm">IUCN Conservation Partner</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
