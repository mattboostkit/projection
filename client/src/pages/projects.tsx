import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import ProjectCard from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Project } from "@shared/schema";
import { Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function Projects() {
  const [selectedPillar, setSelectedPillar] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const filteredProjects = projects.filter(project => {
    // Filter by pillar if selected
    const matchesPillar = !selectedPillar || project.pillar.toLowerCase() === selectedPillar.toLowerCase();
    
    // Filter by search term
    const matchesSearch = !searchTerm || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.country.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesPillar && matchesSearch;
  });

  const pillars = [
    { value: "health", label: "Health", color: "bg-red-500" },
    { value: "education", label: "Education", color: "bg-blue-500" },
    { value: "conservation", label: "Conservation", color: "bg-green-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Discover Projects
          </h1>
          <p className="text-xl text-green-100 max-w-3xl">
            Explore impactful initiatives across Africa in Health, Education, and Conservation. 
            Find projects that align with your values and make a difference.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects, locations, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Pillar Filter */}
            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                <Button
                  variant={selectedPillar === "" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPillar("")}
                >
                  All Pillars
                </Button>
                {pillars.map((pillar) => (
                  <Button
                    key={pillar.value}
                    variant={selectedPillar === pillar.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedPillar(pillar.value)}
                    className={selectedPillar === pillar.value ? `${pillar.color} hover:opacity-90` : ""}
                  >
                    {pillar.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedPillar || searchTerm) && (
            <div className="mt-4 flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active filters:</span>
              {selectedPillar && (
                <Badge variant="secondary" className="capitalize">
                  {selectedPillar}
                  <button 
                    onClick={() => setSelectedPillar("")}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary">
                  Search: "{searchTerm}"
                  <button 
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
                  <div className="w-full h-48 bg-gray-200 rounded-lg mb-6"></div>
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                No projects found
              </h3>
              <p className="text-muted-foreground mb-6">
                Try adjusting your search terms or filters to discover more projects.
              </p>
              <Button onClick={() => { setSelectedPillar(""); setSearchTerm(""); }}>
                Clear All Filters
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {filteredProjects.length} Projects Found
                </h2>
                <p className="text-muted-foreground">
                  Making a difference across Africa through targeted social impact initiatives
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
