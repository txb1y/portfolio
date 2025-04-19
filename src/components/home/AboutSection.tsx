
import { portfolioData } from "@/data/portfolio";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Building, Users } from "lucide-react";

export const AboutSection = () => {
  const { name, about } = portfolioData;
  
  return (
    <section id="about" className="py-4 scroll-mt-16">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">About Me</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 animate-fade-in flex justify-center md:justify-start">
          <Avatar className="w-40 h-40 md:w-48 md:h-48 rounded-full border-2 border-violet-400/30 shadow-lg">
            <AvatarImage 
              src={about.photo} 
              alt={name}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl">{name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="md:col-span-2 space-y-2 animate-fade-in animate-delay-100">
          <div className="glass p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Building className="mr-2 text-violet-400" />
              <h3 className="text-lg font-medium">Academic Background</h3>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{about.academic}</p>
          </div>
          
          <div className="glass p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Users className="mr-2 text-violet-400" />
              <h3 className="text-lg font-medium">Interests & Goals</h3>
            </div>
            <p className="text-muted-foreground text-sm md:text-base">{about.interests}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
