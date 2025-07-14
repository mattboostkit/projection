import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building2, TrendingUp, FileBarChart, Globe, Users, Target } from "lucide-react";

export default function PortalCommercial() {
  const benefits = [
    "CSR impact tracking & reporting",
    "Employee engagement programmes",
    "Sustainability reporting compliance", 
    "Brand partnership opportunities",
    "Tax-efficient giving structures",
    "Quarterly impact assessments",
  ];

  const features = [
    {
      icon: FileBarChart,
      title: "ESG Reporting",
      description: "Comprehensive reports that meet international sustainability standards and stakeholder requirements.",
    },
    {
      icon: Users,
      title: "Employee Engagement",
      description: "Involve your team in meaningful impact through volunteer programmes and matched giving schemes.",
    },
    {
      icon: Target,
      title: "SDG Alignment", 
      description: "Map your contributions to UN Sustainable Development Goals with measurable outcomes.",
    },
    {
      icon: TrendingUp,
      title: "Impact Analytics",
      description: "Real-time dashboards showing the social and environmental impact of your corporate giving.",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Support projects across multiple African countries to diversify your impact portfolio.",
    },
    {
      icon: Building2,
      title: "Brand Integration",
      description: "Co-branded marketing opportunities that showcase your commitment to social responsibility.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative text-white">
        <div className="absolute inset-0 bg-cover bg-center" 
             style={{backgroundImage: "url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&h=1080&fit=crop')"}}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <Badge className="bg-white text-secondary mb-6 text-lg px-4 py-2">
              Commercial Partners Portal
            </Badge>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
              Scale Your Corporate<br />
              <span className="text-accent">Social Impact</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Partner with us to create meaningful, measurable change across African communities 
              while meeting your ESG objectives and engaging your stakeholders.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg" asChild>
                <a href="/contact">Explore Partnership</a>
              </Button>
              <Button size="lg" className="bg-white/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white/30 px-8 py-4 text-lg transition-all" asChild>
                <a href="/contact">Get Started Today</a>
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
              Corporate Partnership Benefits
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Transform your corporate social responsibility with transparent, impactful partnerships across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                <CheckCircle className="h-6 w-6 text-secondary flex-shrink-0" />
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
              Enterprise Solutions
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools designed for corporate partners seeking meaningful social impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-secondary/10 rounded-lg">
                      <feature.icon className="h-6 w-6 text-secondary" />
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

      {/* Partnership Tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Partnership Levels
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Choose the partnership level that best fits your corporate giving strategy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Impact Partner */}
            <Card className="border-2 border-gray-200">
              <CardHeader className="text-center">
                <Badge variant="secondary" className="mb-2">Impact Partner</Badge>
                <CardTitle className="font-serif text-2xl">£10,000 - £50,000</CardTitle>
                <p className="text-muted-foreground">Annual commitment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Quarterly impact reports</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Project selection guidance</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">ESG reporting support</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Brand recognition</span>
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </CardContent>
            </Card>

            {/* Strategic Partner */}
            <Card className="border-2 border-secondary shadow-lg transform scale-105">
              <CardHeader className="text-center">
                <Badge className="bg-secondary text-white mb-2">Strategic Partner</Badge>
                <CardTitle className="font-serif text-2xl">£50,000 - £200,000</CardTitle>
                <p className="text-muted-foreground">Annual commitment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">All Impact Partner benefits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Employee engagement programmes</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Co-branded marketing opportunities</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Site visit opportunities</span>
                  </li>
                </ul>
                <Button className="w-full bg-secondary hover:bg-secondary-600">Recommended</Button>
              </CardContent>
            </Card>

            {/* Transformation Partner */}
            <Card className="border-2 border-accent">
              <CardHeader className="text-center">
                <Badge className="bg-accent text-white mb-2">Transformation Partner</Badge>
                <CardTitle className="font-serif text-2xl">£200,000+</CardTitle>
                <p className="text-muted-foreground">Annual commitment</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">All Strategic Partner benefits</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Custom project development</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Executive advisory board seat</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Global summit invitations</span>
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm">Thought leadership opportunities</span>
                  </li>
                </ul>
                <Button className="w-full bg-accent hover:bg-accent-600">Contact Sales</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Ready to Transform Your CSR Strategy?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join forward-thinking companies creating measurable social impact across African communities.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent-600 text-white px-8 py-4 text-lg">
              Schedule Partnership Call
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary px-8 py-4 text-lg">
              Download Impact Report
            </Button>
          </div>

          <div className="mt-12 text-center">
            <p className="text-blue-100 mb-4">Trusted by leading companies worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-70">
              <div className="text-sm">FTSE 100 Partners</div>
              <div className="text-sm">B-Corp Certified</div>
              <div className="text-sm">UN Global Compact Signatory</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
