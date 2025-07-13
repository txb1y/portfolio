import { Certificate } from "@/data/certificates";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CertificateCardProps {
  certificate: Certificate;
  className?: string;
  onClick?: () => void;
}

export function CertificateCard({ certificate, className, onClick }: CertificateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl glass transition-all duration-300 h-full group cursor-pointer flex-shrink-0",
        "hover:scale-[1.02] hover:shadow-[0_8px_25px_rgba(155,135,245,0.3)]",
        isHovered ? "scale-[1.02]" : "",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      style={{ 
        transformStyle: "preserve-3d",
        transform: isHovered ? "perspective(1000px) rotateY(3deg) rotateX(1deg)" : "perspective(1000px) rotateY(0) rotateX(0)",
      }}
    >
      {/* Certificate Image */}
      <div className="relative h-32 sm:h-40 md:h-48 lg:h-52 overflow-hidden bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-900/20 dark:to-violet-800/20">
        <img
          src={certificate.imageUrl}
          alt={certificate.title}
          loading="lazy"
          decoding="async"
          className={cn(
            "w-full h-full object-cover transition-all duration-500",
            imageLoaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
            isHovered ? "scale-110" : ""
          )}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Fallback to a placeholder or default certificate image
            e.currentTarget.src = "/images/certificates/certificate-placeholder.svg";
            setImageLoaded(true);
          }}
        />
        
        {/* Overlay on hover */}
        <div className={cn(
          "absolute inset-0 bg-black/20 transition-opacity duration-300",
          isHovered ? "opacity-100" : "opacity-0"
        )}>
          <div className="absolute top-3 right-3">
            <span className={cn(
              "text-white transition-transform duration-300 drop-shadow-lg",
              isHovered ? "translate-x-1 -translate-y-1 scale-110" : ""
            )}>
              <ExternalLink size={20} />
            </span>
          </div>
        </div>
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-r from-violet-200/50 via-violet-300/50 to-violet-200/50 dark:from-violet-800/30 dark:via-violet-700/30 dark:to-violet-800/30 animate-pulse" />
        )}
      </div>

      {/* Certificate Info */}
      <div className="p-3 sm:p-4 md:p-5 border-t-2 border-violet-500/30">
        <div className="flex justify-between items-start mb-2 md:mb-3">
          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-foreground tracking-tight leading-tight line-clamp-2">
            {certificate.title}
          </h3>
          <span className="text-xs md:text-sm text-muted-foreground font-medium ml-2 flex-shrink-0">
            {certificate.year}
          </span>
        </div>
        
        <p className="text-xs sm:text-sm md:text-base text-violet-400 dark:text-violet-300 font-medium mb-2 md:mb-3">
          {certificate.issuer}
        </p>
        
        <p className="text-xs text-muted-foreground/80 font-mono">
          ID: {certificate.certificateId}
        </p>
      </div>
    </div>
  );
}
