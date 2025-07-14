import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Globe, Users, Award, Target, TrendingUp, CheckCircle } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "Complete visibility into how every donation is used and the impact it creates."
    },
    {
      icon: Heart,
      title: "Authenticity",
      description: "Direct partnerships with vetted local organisations and communities."
    },
    {
      icon: Globe,
      title: "Sustainability",
      description: "Long-term solutions that create lasting change in communities."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "Collaborative approach connecting tourism, business, and philanthropy."
    }
  ];

  const teamMembers = [
    {
      name: "Tim Golds",
      role: "Founder & CEO",
      background: "Former safari guide turned social entrepreneur with 15 years in African conservation.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=300&h=300&fit=crop"
    },
    {
      name: "Cora Valentine Golds",
      role: "Partnerships Lead",
      background: "Expert in sustainable development and stakeholder engagement with extensive NGO experience.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=300&h=300&fit=crop"
    }
  ];

  const achievements = [
    { number: "150+", label: "Projects Funded" },
    { number: "£2.3M", label: "Raised to Date" },
    { number: "50,000+", label: "Lives Impacted" },
    { number: "35", label: "Partner Organisations" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="bg-white text-primary mb-6 text-lg px-4 py-2">
              About Projection
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              Shining the Light on<br />
              <span className="text-accent">African Innovation</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              We connect responsible tourism with authentic African social and environmental projects, 
              creating sustainable impact across Health, Education, and Conservation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Projection was born from a simple observation: Africa is home to incredible innovation, 
                resilience, and community-driven solutions. Yet many visitors leave without truly 
                understanding or supporting these grassroots initiatives.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                We bridge this gap by connecting safari operators, commercial partners, and individual 
                donors with verified local projects that are creating real, measurable change.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>100% of donations reach projects (minus payment fees)</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Quarterly impact reports for all donors</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-3" />
                  <span>Direct relationships with project leaders</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&w=600&h=400&fit=crop"
                alt="African community project"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">5 Years</div>
                  <div className="text-sm text-gray-600">Creating Impact</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Our Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              These principles guide every partnership we form and every project we support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Our Impact So Far
            </h2>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Five years of connecting tourism with meaningful change across Africa.
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold mb-2">{achievement.number}</div>
                <div className="text-green-100">{achievement.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Our diverse team brings together expertise in tourism, development, and technology.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index}>
                <CardContent className="p-6 text-center">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-primary font-medium mb-3">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.background}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join our community of changemakers creating sustainable impact across Africa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
              <a href="/projects">Browse Projects</a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="/contact">Get in Touch</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}