import { useState } from "react";
import { certificates } from "@/data/certificates";
import { CertificateCard } from "@/components/CertificateCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Award, ExternalLink, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CertificationsPage() {
  const [selectedCertificate, setSelectedCertificate] = useState<typeof certificates[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCertificateClick = (certificate: typeof certificates[0]) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen pb-8 px-4 md:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="py-8 md:py-12">
        <Link to="/">
          <Button variant="ghost" className="text-violet-400 group mb-6">
            <ArrowLeft className="mr-1 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Button>
        </Link>
        
        <div className="flex items-center mb-4">
          <Award className="mr-3 h-8 w-8 text-violet-400" />
          <h1 className="text-3xl md:text-4xl font-bold">All Certifications</h1>
        </div>
        
        <p className="text-muted-foreground text-lg max-w-2xl">
          A comprehensive collection of my professional certifications and achievements in technology, 
          demonstrating continuous learning and expertise across various platforms and domains.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
        {certificates.map((certificate, index) => (
          <div
            key={certificate.id}
            className={cn(
              "animate-fade-in",
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
              className="h-full"
            />
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 glass p-6 md:p-8 rounded-lg">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Certification Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400 mb-2">{certificates.length}</div>
            <div className="text-muted-foreground">Total Certifications</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400 mb-2">
              {new Set(certificates.map(cert => cert.issuer)).size}
            </div>
            <div className="text-muted-foreground">Different Providers</div>
          </div>
          
          <div className="text-center">
            <div className="text-3xl font-bold text-violet-400 mb-2">
              {new Date().getFullYear() - Math.min(...certificates.map(cert => parseInt(cert.year))) + 1}
            </div>
            <div className="text-muted-foreground">Years of Learning</div>
          </div>
        </div>
      </div>

      {/* Providers Section */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold mb-6">Certification Providers</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from(new Set(certificates.map(cert => cert.issuer))).map((issuer, index) => (
            <div
              key={issuer}
              className={cn(
                "glass p-4 rounded-lg text-center animate-fade-in",
                {
                  'animate-delay-100': index === 0,
                  'animate-delay-200': index === 1,
                  'animate-delay-300': index === 2,
                  'animate-delay-400': index === 3,
                }
              )}
            >
              <div className="text-sm font-medium text-violet-400 mb-1">{issuer}</div>
              <div className="text-xs text-muted-foreground">
                {certificates.filter(cert => cert.issuer === issuer).length} certification{certificates.filter(cert => cert.issuer === issuer).length > 1 ? 's' : ''}
              </div>
            </div>
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
    </div>
  );
}
