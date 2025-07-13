
import { portfolioData } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Download, Mail } from "lucide-react";

export const ContactSection = () => {
  const { resume, contact } = portfolioData;
  
  return (
    <section id="contact" className="py-10 scroll-mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-4 md:p-6 rounded-lg animate-fade-in">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Resume</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-4">{resume.description}</p>
          <a 
            href={resume.fileUrl} 
            download="BHARATHI-Resume" 
            className="inline-flex"
          >
            <Button className="group">
              Download CV
              <Download className="ml-2 h-4 w-4 transition-transform group-hover:translate-y-1" />
            </Button>
          </a>
        </div>
        
        <div className="glass p-4 md:p-6 rounded-lg animate-fade-in animate-delay-100">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Contact Me</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-4">{contact.message}</p>
          <a 
            href={`mailto:${contact.email}`}
            className="inline-flex"
          >
            <Button variant="outline" className="group">
              <Mail className="mr-2 h-4 w-4" />
              {contact.email}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};
