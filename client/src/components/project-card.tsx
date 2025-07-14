import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Star, MapPin } from "lucide-react";
import { Project } from "@shared/schema";
import { formatCurrency, formatPercentage } from "@/lib/utils";
import { Link } from "wouter";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const progressPercentage = formatPercentage(project.currentAmount, project.goalAmount);
  
  const pillarColors: Record<string, string> = {
    health: "bg-red-500",
    education: "bg-secondary",
    conservation: "bg-primary",
  };

  const pillarButtonColors: Record<string, string> = {
    health: "bg-red-500 hover:bg-red-600",
    education: "bg-secondary hover:bg-secondary-600", 
    conservation: "bg-primary hover:bg-primary-600",
  };

  return (
    <Card className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative">
        <img 
          src={project.projectImage} 
          alt={project.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <Badge className={`${pillarColors[project.pillar]} text-white capitalize`}>
            {project.pillar}
          </Badge>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {project.country}
          </div>
        </div>
        
        <h3 className="text-xl font-serif font-bold text-foreground mb-3 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-muted-foreground mb-4 line-clamp-3 text-sm leading-relaxed">
          {project.shortDescription}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span>Funding Progress</span>
            <span>{progressPercentage}% of {formatCurrency(project.goalAmount)}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
        
        {/* Trust Indicators */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <img 
              src={project.partnerLogo || "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?w=32&h=32&fit=crop&crop=face"} 
              alt={project.partnerOrganisation}
              className="w-8 h-8 rounded-full object-cover"
            />
            <span className="text-sm text-muted-foreground font-medium">
              {project.partnerOrganisation}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-400 fill-current" />
            <span className="text-sm text-muted-foreground font-medium">
              {project.rating}
            </span>
          </div>
        </div>
        
        <Button 
          className={`w-full ${pillarButtonColors[project.pillar]} text-white font-semibold transition-colors`}
          asChild
        >
          <Link href={`/projects/${project.id}`}>
            Support This Project
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
