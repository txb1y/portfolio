import { Project } from "@/data/portfolio";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Github } from "lucide-react";

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
          {/* Social icons for Telegram Email Bot */}
          {project.id === "telegram-email-bot" && (
            <div className="flex gap-3 mt-6">
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass transition-all hover:scale-110 hover:bg-violet-500/20" aria-label="GitHub">
                  <Github className="w-5 h-5 text-foreground" />
                </a>
              )}
              {project.telegramUrl && (
                <a href={project.telegramUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass transition-all hover:scale-110 hover:bg-violet-500/20" aria-label="Telegram">
                  <svg className="w-5 h-5 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9.036 16.498l-.398 3.13c.57 0 .816-.244 1.115-.54l2.67-2.557 5.537 4.04c1.014.56 1.736.265 1.99-.94l3.61-16.84c.33-1.53-.553-2.13-1.54-1.76L2.36 9.47c-1.49.58-1.47 1.41-.254 1.78l4.6 1.44 10.68-6.74c.5-.32.96-.14.58.2l-8.66 7.82z" /></svg>
                </a>
              )}
            </div>
          )}
        </div>
      </a>
    </div>
  );
}
