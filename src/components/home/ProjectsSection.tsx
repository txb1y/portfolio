
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const ProjectsSection = () => {
  const { projects } = portfolioData;
  const featuredProjects = projects.slice(0, 3);
  
  return (
    <section id="projects" className="py-12 scroll-mt-20">
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl md:text-3xl font-semibold">Featured Projects</h2>
        <Link to="/projects">
          <Button variant="link" className="text-violet-400 group">
            View All
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
        {featuredProjects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            className={cn(`animate-fade-in`, {
              'animate-delay-100': index === 0,
              'animate-delay-200': index === 1,
              'animate-delay-300': index === 2,
            })}
          />
        ))}
      </div>
    </section>
  );
};
