
import { portfolioData } from "@/data/portfolio";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { TypewriterText } from "./TypewriterText";

export const HomeHero = () => {
  const { name, role, tagline, socialLinks } = portfolioData;
  
  return (
    <section id="home" className="min-h-[60vh] flex flex-col justify-center relative pt-16 md:pt-20 pb-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl animate-float animate-delay-300" />
      </div>
      
      <div className="relative z-10 flex flex-col space-y-4 md:space-y-6 max-w-4xl">
        <span className="text-violet-400 font-mono text-sm md:text-base animate-fade-in">
          Hello, I'm
        </span>
        
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight animate-fade-in animate-delay-100">
          <span className="text-gradient">{name}</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground/80 animate-fade-in animate-delay-200">
          <TypewriterText 
            phrases={[
              "Frontend Dev",
              "AI x UI/UX Enthusiast",
              "Building Aesthetic Digital Experiences"
            ]}
            typingSpeed={70}
            pauseDuration={2000}
          />
        </h2>
        
        <p className="text-muted-foreground text-base md:text-lg max-w-2xl animate-fade-in animate-delay-300">
          {tagline}
        </p>
        
        <div className="flex items-center space-x-4 animate-fade-in animate-delay-400">
          {socialLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-2 rounded-full glass transition-all hover:scale-110 hover:bg-violet-500/20"
              aria-label={link.name}
            >
              <link.icon className="w-5 h-5 text-foreground" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
