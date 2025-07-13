import { useState, useEffect, useRef } from "react";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "@/components/CertificateCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, Award, ExternalLink, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export const CertificationsSection = () => {
  const [isAutoScrolling, setIsAutoScrolling] = useState(true);
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const scrollSpeed = 0.5; // pixels per frame - right to left scrolling

  // Duplicate certificates for seamless infinite scroll
  const duplicatedCertificates = [...certificates, ...certificates];

  // Auto-scroll logic with perfect infinite loop (right to left)
  useEffect(() => {
    if (!isAutoScrolling) return;

    let lastTimestamp = 0;
    const targetFPS = 60;
    const frameInterval = 1000 / targetFPS;

    const autoScroll = (timestamp: number) => {
      const container = scrollContainerRef.current;
      if (!container) {
        animationFrameRef.current = requestAnimationFrame(autoScroll);
        return;
      }

      // Throttle to 60fps for smooth scrolling
      if (timestamp - lastTimestamp >= frameInterval) {
        const maxScrollLeft = container.scrollWidth / 2; // Half because we duplicated
        const currentScroll = container.scrollLeft;
        
        // Scroll left to right (add scrollSpeed)
        const newScrollPosition = currentScroll + scrollSpeed;
        
        // Reset to beginning when reaching halfway point (seamless loop for left-to-right)
        if (newScrollPosition >= maxScrollLeft) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft = newScrollPosition;
        }

        lastTimestamp = timestamp;
      }

      animationFrameRef.current = requestAnimationFrame(autoScroll);
    };

    // Start auto-scrolling after a brief delay
    const startTimeout = setTimeout(() => {
      const container = scrollContainerRef.current;
      if (container) {
        // Start from the end for right-to-left scrolling
        const maxScrollLeft = container.scrollWidth / 2;
        container.scrollLeft = maxScrollLeft;
      }
      animationFrameRef.current = requestAnimationFrame(autoScroll);
    }, 1000);

    return () => {
      clearTimeout(startTimeout);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAutoScrolling]);

  // Handle certificate click
  const handleCertificateClick = (certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  // Cleanup animation frame
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <section id="certifications" className="py-12 scroll-mt-20">
      <div className="flex justify-between items-end mb-8">
        <div className="flex items-center">
          <Award className="mr-3 h-6 w-6 text-violet-400" />
          <h2 className="text-2xl md:text-3xl font-semibold">Certifications</h2>
        </div>
        <Link to="/certifications">
          <Button variant="link" className="text-violet-400 group">
            View All
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>      
      {/* Scroll Container */}
      <div className="relative">
        {/* Gradient Overlays for scroll indication */}
        <div className="absolute left-0 top-0 w-8 h-full bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 w-8 h-full bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        
        {/* Certificates Scroll Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 md:gap-6 overflow-hidden certificate-scroll pb-4 pointer-events-none"
        >
          {duplicatedCertificates.map((certificate, index) => (
            <div
              key={`${certificate.id}-${index}`}
              className={cn(
                "w-56 sm:w-64 md:w-80 lg:w-96 flex-shrink-0 pointer-events-auto",
                index < certificates.length && "animate-fade-in",
                {
                  'animate-delay-100': index === 0,
                  'animate-delay-200': index === 1,
                  'animate-delay-300': index === 2,
                  'animate-delay-400': index === 3,
                }
              )}
            >
              <CertificateCard
                certificate={certificate}
                onClick={() => handleCertificateClick(certificate)}
              />
            </div>
          ))}
        </div>

        {/* Scroll Indicators */}
        <div className="flex justify-center mt-6 gap-2">
          {certificates.map((_, index) => (
            <div
              key={index}
              className="h-1.5 w-1.5 rounded-full bg-violet-400/30 animate-pulse"
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl w-full h-[90vh] p-0 overflow-hidden">
          {selectedCertificate && (
            <div className="relative w-full h-full bg-white dark:bg-gray-900">
              {/* Close button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 dark:bg-white/10 backdrop-blur-sm hover:bg-black/20 dark:hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Certificate Image */}
              <div className="w-full h-full flex items-center justify-center p-8">
                <img
                  src={selectedCertificate.imageUrl}
                  alt={selectedCertificate.title}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  onError={(e) => {
                    e.currentTarget.src = "/images/certificates/certificate-placeholder.svg";
                  }}
                />
              </div>
              
              {/* Certificate Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{selectedCertificate.title}</h3>
                <p className="text-violet-300 font-medium mb-1">{selectedCertificate.issuer}</p>
                <p className="text-sm opacity-80">Issued: {selectedCertificate.year} • ID: {selectedCertificate.certificateId}</p>
                {selectedCertificate.credentialUrl && (
                  <a
                    href={selectedCertificate.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-3 text-sm text-violet-300 hover:text-violet-200 transition-colors"
                  >
                    Verify Credential
                    <ExternalLink className="ml-1 w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
