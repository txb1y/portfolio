
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Layout() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-xs text-muted-foreground px-4">
        <div className="max-w-7xl mx-auto">
          <p>© {new Date().getFullYear()} Bharathi Portfolio. All rights reserved.</p>
        </div>
      </footer>

      {/* Scroll to top button */}
      <Button
        variant="outline"
        size="icon"
        className={cn(
          "fixed bottom-4 right-4 z-40 rounded-full shadow-md transition-all duration-300 opacity-0 translate-y-10",
          showScrollTop && "opacity-100 translate-y-0"
        )}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-4 w-4" />
      </Button>
    </div>
  );
}
