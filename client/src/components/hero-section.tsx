import { Button } from "@/components/ui/button";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface HeroSectionProps {
  globalStats?: {
    totalProjects: number;
    totalDonated: string;
    totalLivesImpacted: number;
  };
  isLoading?: boolean;
}

export default function HeroSection({ globalStats, isLoading }: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-r from-primary to-green-600 text-white">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080')"
        }}
      />
      
      {/* Dark gradient overlay ON TOP of the image for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/60"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 leading-tight">
            Connecting Conservation<br />
            <span className="text-accent">with Communities</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-white">
            Bridge the gap between responsible tourism and African social impact projects. 
            Support Health, Education, and Conservation initiatives that create lasting change.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="bg-accent text-white hover:bg-accent-600 transition-colors shadow-lg px-8 py-4 text-lg font-semibold"
              asChild
            >
              <a href="/projects">Explore Projects</a>
            </Button>
            <Button 
              size="lg"
              variant="outline" 
              className="border-2 border-white text-white hover:bg-white hover:text-primary transition-colors px-8 py-4 text-lg font-semibold bg-transparent"
              asChild
            >
              <a href="/about">Learn More</a>
            </Button>
          </div>

          {/* Impact Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                {isLoading ? "..." : globalStats?.totalProjects || 127}
              </div>
              <div className="text-lg font-medium">Projects Supported</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                {isLoading ? "..." : globalStats ? formatCurrency(globalStats.totalDonated) : "£2.4M"}
              </div>
              <div className="text-lg font-medium">Total Donated</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-accent mb-1">
                {isLoading ? "..." : globalStats ? `${formatNumber(globalStats.totalLivesImpacted)}+` : "45,000+"}
              </div>
              <div className="text-lg font-medium">Lives Impacted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
