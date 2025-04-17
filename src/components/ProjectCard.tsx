
import { Project } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

export function ProjectCard({ project, className }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl glass transition-all duration-300 h-full group",
        isHovered ? "scale-[1.02]" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        transformStyle: "preserve-3d",
        transform: isHovered ? "perspective(1000px) rotateY(5deg) rotateX(2deg)" : "perspective(1000px) rotateY(0) rotateX(0)",
      }}
    >
      <a href={project.linkedinUrl || project.demoUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
        <div className="p-5 md:p-6 border-t-2 border-violet-500/30">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-foreground tracking-tight">{project.title}</h3>
            <span className={cn(
              "text-violet-400 transition-transform duration-300",
              isHovered ? "translate-x-1 -translate-y-1" : ""
            )}>
              <ArrowUpRight size={18} />
            </span>
          </div>
          
          <p className="text-xs md:text-sm text-muted-foreground mb-5">{project.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-auto">
            {project.technologies.map((tech, index) => (
              <span 
                key={index} 
                className={cn(
                  "px-1.5 py-0.5 rounded-full text-xs font-medium text-white",
                  tech.color
                )}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}
