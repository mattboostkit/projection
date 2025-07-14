import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Users, Heart, BarChart3, Shield, CheckCircle, ArrowRight, Globe, Target } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Discover Projects",
      description: "Browse our curated collection of verified African social and environmental projects across Health, Education, and Conservation.",
      icon: Search,
      details: [
        "Filter by location, cause, or impact area",
        "Read detailed project descriptions and goals",
        "View partner organisation profiles",
        "See real-time funding progress"
      ]
    },
    {
      number: "02",
      title: "Choose Your Support",
      description: "Select how you want to contribute - through direct donations, tour operator partnerships, or corporate sponsorship.",
      icon: Heart,
      details: [
        "One-time or recurring donations",
        "Tour operator integration packages",
        "Corporate partnership programmes",
        "Flexible contribution amounts"
      ]
    },
    {
      number: "03",
      title: "Track Your Impact",
      description: "Receive regular updates on how your contribution is creating change, with detailed impact reports and project milestones.",
      icon: BarChart3,
      details: [
        "Quarterly impact reports",
        "Photo and video updates from projects",
        "Direct messages from beneficiaries",
        "Measurable outcome tracking"
      ]
    }
  ];

  const userTypes = [
    {
      title: "Tour Operators",
      description: "Integrate meaningful impact into your safari and tourism experiences",
      icon: Globe,
      color: "bg-primary",
      benefits: [
        "Enhance guest experience with authentic community connections",
        "Differentiate your business with verified responsible tourism",
        "Access marketing materials and certification",
        "Provide guests with personalised impact reports"
      ],
      cta: "Join as Partner",
      href: "/portal/tour-operators"
    },
    {
      title: "Corporate Partners",
      description: "Scale your CSR impact with transparent, measurable contributions",
      icon: Target,
      color: "bg-secondary",
      benefits: [
        "Meet ESG objectives with verified impact metrics",
        "Engage employees through meaningful giving programmes",
        "Access detailed sustainability reporting",
        "Support UN Sustainable Development Goals"
      ],
      cta: "Explore Partnership",
      href: "/portal/commercial"
    },
    {
      title: "Individual Donors",
      description: "Create personal change with complete transparency on your impact",
      icon: Users,
      color: "bg-accent",
      benefits: [
        "Choose exactly which projects to support",
        "Receive regular updates on your impact",
        "Connect directly with project beneficiaries",
        "Tax-efficient giving options available"
      ],
      cta: "Start Giving",
      href: "/portal/donors"
    }
  ];

  const verification = [
    {
      title: "Project Verification",
      description: "Every project undergoes rigorous due diligence before joining our platform.",
      steps: ["Initial application review", "Financial audit and verification", "Site visit and assessment", "Community impact evaluation"]
    },
    {
      title: "Impact Tracking",
      description: "We use standardised metrics to measure and report on project outcomes.",
      steps: ["Baseline data collection", "Regular progress monitoring", "Third-party verification", "Quarterly impact reporting"]
    },
    {
      title: "Fund Transparency",
      description: "100% of donations reach projects, with complete transparency on fund allocation.",
      steps: ["Direct project transfers", "Real-time fund tracking", "Public financial reporting", "Independent auditing"]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white text-primary mb-6 text-lg px-4 py-2">
            How It Works
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Creating Impact Through<br />
            <span className="text-accent">Transparent Partnership</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Our platform connects tourism, business, and philanthropy to create 
            sustainable change across African communities.
          </p>
        </div>
      </section>

      {/* Main Steps Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Simple Steps to Create Change
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Whether you're a tour operator, corporate partner, or individual donor, 
              creating impact is straightforward and transparent.
            </p>
          </div>
          
          <div className="space-y-16">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center gap-12">
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <div className="flex items-center mb-6">
                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <step.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    {step.description}
                  </p>
                  <ul className="space-y-3">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`lg:w-1/2 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <Card className="p-8 bg-gray-50">
                    <div className="aspect-video bg-white rounded-lg flex items-center justify-center">
                      <step.icon className="h-24 w-24 text-primary" />
                    </div>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Choose Your Impact Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Different ways to engage with our platform based on your goals and capabilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {userTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden">
                <div className={`${type.color} text-white p-6`}>
                  <type.icon className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-serif font-bold mb-3">{type.title}</h3>
                  <p className="opacity-90">{type.description}</p>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3 mb-6">
                    {type.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" asChild>
                    <a href={type.href}>
                      {type.cta}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Our Verification Process
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Rigorous standards ensure every project meets our criteria for impact, 
              transparency, and sustainable change.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {verification.map((item, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6">{item.description}</p>
                  <div className="space-y-3">
                    {item.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center">
                        <div className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Common questions about how our platform works and creates impact.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How do you verify projects?</h3>
                <p className="text-muted-foreground mb-3">
                  Every project undergoes financial auditing, site visits, and community impact assessment 
                  before joining our platform. We also conduct regular monitoring visits.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">What percentage goes to projects?</h3>
                <p className="text-muted-foreground mb-3">
                  100% of donations reach projects, minus payment processing fees (typically 2-3%). 
                  Our operational costs are covered through partnership fees and grants.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">How often do I get updates?</h3>
                <p className="text-muted-foreground mb-3">
                  All supporters receive quarterly impact reports with photos, metrics, and stories 
                  from the projects they support. Major milestones are shared immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Can I visit the projects?</h3>
                <p className="text-muted-foreground mb-3">
                  Many projects welcome visitors, especially those connected through tour operators. 
                  We can arrange visits as part of your African travel experience.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Start Creating Impact?
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Join thousands of travellers, businesses, and donors making a real difference across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <a href="/projects">Browse Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="/contact">Get Started Today</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}