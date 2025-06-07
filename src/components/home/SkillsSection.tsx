
import { portfolioData } from "@/data/portfolio";
import { Badge } from "@/components/ui/badge";
import { Code, Users } from "lucide-react";

export const SkillsSection = () => {
  const { skills } = portfolioData;
  
  return (
    <section id="skills" className="py-10 scroll-mt-20">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Skills</h2>
      
      <div className="glass p-4 md:p-6 rounded-lg animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center mb-3">
              <Code className="mr-2 h-4 w-4 text-violet-400" />
              <h3 className="text-base font-medium">Programming Languages</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.languages.map((skill, index) => (
                <Badge key={index} className={`${skill.color} text-white text-xs px-2 py-0.5`}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Code className="mr-2 h-4 w-4 text-violet-400" />
              <h3 className="text-base font-medium">Frameworks & Tools</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.frameworks.map((skill, index) => (
                <Badge key={index} className={`${skill.color} text-white text-xs px-2 py-0.5`}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
          
          <div>
            <div className="flex items-center mb-3">
              <Users className="mr-2 h-4 w-4 text-violet-400" />
              <h3 className="text-base font-medium">Soft Skills</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.softSkills.map((skill, index) => (
                <Badge key={index} className={`${skill.color} text-white text-xs px-2 py-0.5`}>
                  {skill.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
