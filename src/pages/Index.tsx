
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import BookingCalendar from '@/components/BookingCalendar';
import NewsSection from '@/components/NewsSection';

const Index = () => {
  // Animate elements when they come into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    // Observe all elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <BookingCalendar />
      <NewsSection />
      
      {/* Footer */}
      <footer className="bg-blue-gradient/20 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4 md:col-span-2">
              <h3 className="font-display font-medium text-lg">VATcompli</h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Expert VAT compliance services for businesses operating in Belgium. 
                Simplifying complex regulations with personalized guidance.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Services</a></li>
                <li><a href="#booking" className="text-muted-foreground hover:text-primary transition-colors">Book a Call</a></li>
                <li><a href="#news" className="text-muted-foreground hover:text-primary transition-colors">VAT News</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-muted-foreground">Brussels, Belgium</li>
                <li><a href="tel:+3222222222" className="text-muted-foreground hover:text-primary transition-colors">+32 2 222 22 22</a></li>
                <li><a href="mailto:info@vatcompli.be" className="text-muted-foreground hover:text-primary transition-colors">info@vatcompli.be</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              © 2023 VATcompli. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
