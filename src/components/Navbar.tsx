
import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarClock, Menu, X } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled ? "glass py-4 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a href="/" className="flex items-center space-x-2">
          <CalendarClock className="h-6 w-6 text-primary" />
          <span className="font-display font-medium text-xl tracking-tight">VATcompli</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#services" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Services
          </a>
          <a href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Pricing
          </a>
          <a href="#booking" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            Book a Call
          </a>
          <a href="#news" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">
            VAT News
          </a>
          <Button size="sm" className="ml-4">
            Contact
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-foreground p-2 rounded-full hover:bg-secondary transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card absolute top-full left-0 right-0 p-4 m-2 rounded-2xl animate-fade-in">
          <nav className="flex flex-col space-y-4 p-2">
            <a 
              href="#services" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Services
            </a>
            <a 
              href="#pricing" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </a>
            <a 
              href="#booking" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book a Call
            </a>
            <a 
              href="#news" 
              className="text-sm font-medium p-2 hover:bg-secondary/50 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              VAT News
            </a>
            <Button className="w-full">
              Contact
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
