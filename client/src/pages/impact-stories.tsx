import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Leaf, GraduationCap, Stethoscope, Quote, Play, Calendar, MapPin } from "lucide-react";

export default function ImpactStories() {
  const featuredStories = [
    {
      id: 1,
      title: "Clean Water Transforms Kenyan Village",
      category: "Health",
      location: "Nakuru County, Kenya",
      date: "March 2024",
      excerpt: "How a simple borehole project brought clean water to 500 families and reduced child mortality by 40%.",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      icon: Stethoscope,
      color: "bg-red-500",
      impact: "500 families now have clean water access",
      quote: "Before this project, I would walk 5 kilometres every day to fetch water. Now my children can go to school instead of helping me carry water.",
      speaker: "Sarah Wanjiku, Local Resident",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Solar Classroom Lights Up Rural Education",
      category: "Education",
      location: "Arusha Region, Tanzania",
      date: "February 2024",
      excerpt: "Solar panels bring electricity to a remote school, enabling evening classes and computer training.",
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=400&fit=crop",
      icon: GraduationCap,
      color: "bg-blue-500",
      impact: "200 students can now study after dark",
      quote: "The solar panels changed everything. Now we can have evening classes and our students can study for their national exams.",
      speaker: "David Mwanza, Head Teacher",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Anti-Poaching Unit Saves Rhino Population",
      category: "Conservation",
      location: "Maasai Mara, Kenya",
      date: "January 2024",
      excerpt: "Community-led conservation efforts result in zero rhino poaching incidents for 18 months.",
      image: "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=600&h=400&fit=crop",
      icon: Leaf,
      color: "bg-green-500",
      impact: "18 months with zero rhino poaching",
      quote: "Working with the local Maasai community has been key. They are the best guardians of our wildlife.",
      speaker: "James Kimani, Conservation Officer",
      readTime: "6 min read"
    }
  ];

  const quickStats = [
    { number: "50,000+", label: "Lives Directly Impacted", icon: Users },
    { number: "150+", label: "Projects Completed", icon: Heart },
    { number: "£2.3M", label: "Funds Deployed", icon: Heart },
    { number: "12", label: "Countries Reached", icon: MapPin }
  ];

  const impactAreas = [
    {
      title: "Health Impact",
      description: "Improving healthcare access and outcomes across rural Africa",
      stats: [
        "25 health clinics supported",
        "15,000 people with improved healthcare access",
        "40% reduction in child mortality rates",
        "8 clean water projects completed"
      ],
      icon: Stethoscope,
      color: "bg-red-500"
    },
    {
      title: "Education Impact",
      description: "Expanding educational opportunities for children and adults",
      stats: [
        "45 schools supported",
        "8,000 students reached",
        "120 teachers trained",
        "95% primary school completion rate"
      ],
      icon: GraduationCap,
      color: "bg-blue-500"
    },
    {
      title: "Conservation Impact",
      description: "Protecting wildlife and promoting sustainable practices",
      stats: [
        "80,000 hectares under protection",
        "Zero poaching incidents (18 months)",
        "500 local conservation jobs created",
        "30% increase in wildlife populations"
      ],
      icon: Leaf,
      color: "bg-green-500"
    }
  ];

  const testimonials = [
    {
      quote: "This platform connected our lodge with a local school project. Our guests love seeing the direct impact of their safari on education.",
      name: "Michael Roberts",
      role: "Safari Lodge Owner",
      company: "Serengeti Eco Lodge",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&face"
    },
    {
      quote: "The transparency and regular updates give us confidence that our corporate donations are creating real change.",
      name: "Emily Chen",
      role: "CSR Director",
      company: "Global Tech Solutions",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&face"
    },
    {
      quote: "Being able to visit the projects we support during our Kenya trip made our donation feel so much more meaningful.",
      name: "James & Maria Thompson",
      role: "Private Donors",
      company: "UK Supporters",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge className="bg-white text-primary mb-6 text-lg px-4 py-2">
            Impact Stories
          </Badge>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Real Stories of<br />
            <span className="text-accent">Lasting Change</span>
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Discover how your support creates meaningful impact across African communities 
            through authentic stories from the ground.
          </p>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Stories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Featured Impact Stories
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Real stories from the communities and projects you help support.
            </p>
          </div>
          
          <div className="space-y-12">
            {featuredStories.map((story, index) => (
              <Card key={story.id} className="overflow-hidden">
                <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={`relative ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <img 
                      src={story.image}
                      alt={story.title}
                      className="w-full h-80 lg:h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Play className="h-16 w-16 text-white" />
                    </div>
                    <Badge className={`absolute top-4 left-4 ${story.color} text-white`}>
                      {story.category}
                    </Badge>
                  </div>
                  <div className={`p-8 ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4 mr-2" />
                      {story.date}
                      <span className="mx-2">•</span>
                      <MapPin className="h-4 w-4 mr-2" />
                      {story.location}
                      <span className="mx-2">•</span>
                      {story.readTime}
                    </div>
                    
                    <h3 className="text-2xl font-serif font-bold mb-4">{story.title}</h3>
                    <p className="text-muted-foreground mb-6">{story.excerpt}</p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <div className="flex items-center mb-2">
                        <story.icon className="h-5 w-5 text-primary mr-2" />
                        <span className="font-semibold text-sm">Impact Highlight</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{story.impact}</p>
                    </div>
                    
                    <div className="border-l-4 border-primary pl-4 mb-6">
                      <Quote className="h-6 w-6 text-primary mb-2" />
                      <p className="italic text-muted-foreground mb-3">"{story.quote}"</p>
                      <p className="text-sm font-medium">— {story.speaker}</p>
                    </div>
                    
                    <Button className="bg-primary hover:bg-primary/90">
                      Read Full Story
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact by Category */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Impact Across Our Three Pillars
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Measurable outcomes across Health, Education, and Conservation initiatives.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {impactAreas.map((area, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className={`${area.color} w-16 h-16 rounded-full flex items-center justify-center mb-4`}>
                    <area.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl">{area.title}</CardTitle>
                  <p className="text-muted-foreground">{area.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {area.stats.map((stat, statIndex) => (
                      <li key={statIndex} className="flex items-center">
                        <div className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0"></div>
                        <span className="text-sm">{stat}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              What Our Partners Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Hear from tour operators, businesses, and donors about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <p className="text-muted-foreground mb-6 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Be Part of the Next Success Story
          </h2>
          <p className="text-xl text-green-100 mb-8">
            Your support can create the next inspiring impact story. 
            Join our community of changemakers today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100" asChild>
              <a href="/projects">Browse Projects</a>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <a href="/contact">Share Your Story</a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}