import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ThreePillars from "@/components/three-pillars";
import ProjectCard from "@/components/project-card";
import UserPortals from "@/components/user-portals";
import ImpactDashboard from "@/components/impact-dashboard";
import Footer from "@/components/footer";
import { useQuery } from "@tanstack/react-query";
import { Project } from "@shared/schema";
import { Link } from "wouter";

export default function Home() {
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const { data: globalStats, isLoading: statsLoading } = useQuery({
    queryKey: ["/api/stats/global"],
  });

  const featuredProjects = projects.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <HeroSection globalStats={globalStats} isLoading={statsLoading} />
      <ThreePillars />
      
      {/* Featured Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Featured Projects
              </h2>
              <p className="text-lg text-muted-foreground">
                Discover impactful initiatives making a difference across Africa
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/projects">
              <span className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-600 transition-colors inline-block cursor-pointer">
                View All Projects
              </span>
            </Link>
          </div>
        </div>
      </section>

      <UserPortals />
      <ImpactDashboard />
      <Footer />
    </div>
  );
}
