
import { Link } from "react-router-dom";
import { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > 10);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = useMemo(() => [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Education", id: "education" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ], []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-4 px-4 md:px-8 transition-all duration-300",
        isScrolled ? "bg-background/80 backdrop-blur-md shadow-md" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-semibold text-gradient">Portfolio</Link>
        
        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMenu}
          className="md:hidden"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className="text-sm font-medium transition-colors hover:text-violet-400 cursor-pointer"
            >
              {link.name}
            </button>
          ))}
          <Link to="/projects" className="text-sm font-medium transition-colors hover:text-violet-400">
            All Projects
          </Link>
        </nav>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-md md:hidden">
          <nav className="flex flex-col items-center justify-center h-full space-y-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-lg font-medium transition-colors hover:text-violet-400 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
            <Link 
              to="/projects" 
              className="text-lg font-medium transition-colors hover:text-violet-400"
              onClick={() => setIsMenuOpen(false)}
            >
              All Projects
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
