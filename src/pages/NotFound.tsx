
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8">
      <div className="relative space-y-6 text-center">
        <div className="absolute -z-10 inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/20 rounded-full filter blur-3xl" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-gradient animate-fade-in">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold animate-fade-in animate-delay-100">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto animate-fade-in animate-delay-200">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link to="/">
          <Button variant="default" className="mt-4 animate-fade-in animate-delay-300">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
