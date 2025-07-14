import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

export default function UserPortals() {
  const portals = [
    {
      id: "tour-operators",
      title: "Tour Operators",
      description: "Enhance your responsible tourism offerings by connecting directly with verified local projects and showing tangible impact to your clients.",
      bgGradient: "bg-gradient-to-br from-primary to-green-600",
      textColor: "text-white",
      buttonBg: "bg-white text-primary hover:bg-gray-100",
      features: [
        "Project verification & monitoring",
        "Client impact reports", 
        "Marketing materials & support"
      ],
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      alt: "Safari tour operators",
      href: "/portal/tour-operators"
    },
    {
      id: "commercial",
      title: "Commercial Partners", 
      description: "Scale your corporate social responsibility impact with transparent, measurable contributions to African development initiatives.",
      bgGradient: "bg-gradient-to-br from-secondary to-blue-600",
      textColor: "text-white",
      buttonBg: "bg-white text-secondary hover:bg-gray-100",
      features: [
        "CSR impact tracking",
        "Employee engagement programmes",
        "Sustainability reporting"
      ],
      image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      alt: "Commercial partners",
      href: "/portal/commercial"
    },
    {
      id: "donors",
      title: "Private Donors",
      description: "Make a personal difference with direct donations to causes you care about, with full transparency on how your contribution creates change.",
      bgGradient: "bg-gradient-to-br from-accent to-orange-600", 
      textColor: "text-white",
      buttonBg: "bg-white text-accent hover:bg-gray-100",
      features: [
        "Choose your impact areas",
        "Regular progress updates",
        "Tax-efficient giving options"
      ],
      image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=200",
      alt: "Private donors",
      href: "/portal/donors"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            Join Our Community
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Whether you're a tour operator, commercial partner, or individual donor, find your place in our mission to create positive change.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portals.map((portal) => (
            <div key={portal.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200">
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={portal.image} 
                  alt={portal.alt}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 ${portal.bgGradient} opacity-80`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-serif font-bold mb-4 text-gray-900">
                  {portal.title}
                </h3>
                
                <p className="mb-6 text-gray-600">
                  {portal.description}
                </p>
                
                <ul className="space-y-2 mb-6 text-gray-600">
                  {portal.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckCircle className="h-4 w-4 mr-3 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-colors"
                  asChild
                >
                  <Link href={portal.href}>
                    {portal.id === "tour-operators" && "Join as a Tour Operator"}
                    {portal.id === "commercial" && "Become a Partner"}
                    {portal.id === "donors" && "Start Donating"}
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
