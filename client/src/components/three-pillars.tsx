import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Heart, GraduationCap, Leaf, ArrowRight } from "lucide-react";

export default function ThreePillars() {
  const { data: healthProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { pillar: "health" }],
  });

  const { data: educationProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { pillar: "education" }],
  });

  const { data: conservationProjects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects", { pillar: "conservation" }],
  });

  const pillars = [
    {
      id: "health",
      title: "Health",
      description: "Supporting healthcare infrastructure, medical training, and community health programmes across rural and urban communities.",
      icon: Heart,
      color: "red",
      bgColor: "bg-red-50 hover:bg-red-100",
      textColor: "text-red-600",
      buttonColor: "text-red-600 hover:text-red-700",
      projectCount: healthProjects.length,
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Healthcare initiatives in Africa"
    },
    {
      id: "education", 
      title: "Education",
      description: "Building schools, training teachers, and providing educational resources to ensure every child has access to quality learning.",
      icon: GraduationCap,
      color: "blue",
      bgColor: "bg-blue-50 hover:bg-blue-100",
      textColor: "text-secondary",
      buttonColor: "text-secondary hover:text-blue-700",
      projectCount: educationProjects.length,
      image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Education initiatives in Africa"
    },
    {
      id: "conservation",
      title: "Conservation", 
      description: "Protecting wildlife, preserving ecosystems, and supporting sustainable practices that benefit both nature and communities.",
      icon: Leaf,
      color: "green",
      bgColor: "bg-green-50 hover:bg-green-100",
      textColor: "text-primary",
      buttonColor: "text-primary hover:text-green-700",
      projectCount: conservationProjects.length,
      image: "https://images.unsplash.com/photo-1551969014-7d2c4cddf0b6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=300",
      alt: "Conservation initiatives in Africa"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Our Three Pillars of Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover how your donations create meaningful change across Health, Education, and Conservation initiatives throughout Africa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="group cursor-pointer h-full">
              <div className={`${pillar.bgColor} rounded-xl p-8 text-center hover:shadow-lg transition-all duration-300 h-full flex flex-col`}>
                <img 
                  src={pillar.image} 
                  alt={pillar.alt}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
                
                <div className={`${pillar.textColor} text-4xl mb-4`}>
                  <pillar.icon className="h-10 w-10 mx-auto" />
                </div>
                
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                  {pillar.title}
                </h3>
                
                <p className="text-muted-foreground mb-6 flex-grow">
                  {pillar.description}
                </p>
                
                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold">
                    {pillar.projectCount} active projects
                  </span>
                </div>
                
                <Button
                  variant="ghost"
                  className={`${pillar.buttonColor} transition-colors p-0 h-auto font-semibold mt-auto`}
                  asChild
                >
                  <a href={`/projects?pillar=${pillar.id}`}>
                    Explore {pillar.title} Projects 
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
