
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section 
      className="relative overflow-hidden bg-hero-gradient section-padding min-h-screen flex items-center"
    >
      <div 
        className="absolute inset-0 bg-gradient-radial from-blue-100/30 to-transparent opacity-60"
        aria-hidden="true"
      />
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-3xl space-y-6">
          <div className="space-y-2">
            <div className="glass inline-block px-4 py-1.5 rounded-full text-xs font-medium text-primary animate-fade-in animate-delay-1">
              Belgian VAT Compliance Experts
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-balance animate-fade-in">
              Simplifying VAT Compliance in Belgium
            </h1>
          </div>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl text-balance animate-fade-in animate-delay-2">
            Navigate the complexities of Belgian VAT regulations with expert guidance and personalized support for your business.
          </p>
          
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-4 animate-fade-in animate-delay-3">
            <Button size="lg" className="group">
              Book a Consultation
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline">
              Learn More
            </Button>
          </div>
        </div>
      </div>
      
      <div 
        className="hidden lg:block absolute bottom-0 right-0 w-1/2 h-4/5 bg-blue-gradient rounded-tl-[80px] opacity-80 transform translate-x-16 translate-y-16"
        aria-hidden="true"
      />
    </section>
  );
}
