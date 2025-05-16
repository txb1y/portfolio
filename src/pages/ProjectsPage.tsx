
import { portfolioData } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { cn } from "@/lib/utils";

export default function ProjectsPage() {
  const { projects } = portfolioData;
  
  return (
    <div className="min-h-screen pt-20 md:pt-28 pb-10 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="relative mb-8 md:mb-12">
        <div className="absolute top-1/2 -left-64 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl" />
        <div className="relative z-10">
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight animate-fade-in">
            <span className="text-gradient">Projects</span>
          </h1>
          <p className="text-muted-foreground mt-2 md:mt-4 max-w-2xl text-sm md:text-base animate-fade-in animate-delay-100">
            Explore my latest work and personal projects. Each project showcases different skills and technologies.
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            className={cn(`animate-fade-in`, {
              'animate-delay-100': index % 3 === 0,
              'animate-delay-200': index % 3 === 1,
              'animate-delay-300': index % 3 === 2,
            })}
          />
        ))}
      </div>
    </div>
  );
}
