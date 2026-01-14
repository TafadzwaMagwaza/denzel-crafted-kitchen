import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { toast } = useToast();

  const navItems = [
    { name: "Home", id: "home" },
    { name: "Services", id: "services" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Testimonials", id: "testimonials" },
    { name: "Contact", id: "contact" },
  ];

  const serviceItems = [
    { name: "Private Dinners & Events", id: "services" },
    { name: "Estate Placement", id: "services" },
    { name: "Safari Dining", id: "services" },
    { name: "Meal Prep", id: "services" },
    { name: "Corporate Catering", id: "services" },
  ];

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    } else {
      // Fallback for mobile or if element not found
      window.location.hash = sectionId;
      setIsOpen(false);
    }
  };

  const handleBookCall = () => {
    const calendlyLink = import.meta.env.VITE_CALENDLY_LINK;
    if (calendlyLink) {
      window.open(calendlyLink, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Booking Link Not Available",
        description: "Please contact me directly to schedule a consultation.",
      });
      scrollToSection('contact');
    }
  };

  const handleCallNow = () => {
    window.location.href = 'tel:+27123456789';
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" 
        : "bg-background/80 backdrop-blur-md border-b border-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="flex items-center justify-center w-8 h-8 bg-warm-gold rounded-full">
              <ChefHat className="h-5 w-5 text-background" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold text-foreground leading-none">
                Denzel Moyo
              </span>
              <span className="text-xs text-foreground/60 leading-none">Private Chef</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="text-foreground/80 hover:text-foreground hover:bg-warm-gold/10 transition-colors"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </Button>
            ))}
            
            {/* Services Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-1 text-foreground/80 hover:text-foreground hover:bg-warm-gold/10">
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-background/95 backdrop-blur-lg border-border z-50 min-w-48">
                {serviceItems.map((item) => (
                  <DropdownMenuItem 
                    key={item.name}
                    className="cursor-pointer text-foreground/80 hover:text-foreground hover:bg-warm-gold/10"
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Call Now Button */}
            <Button 
              variant="ghost" 
              size="sm"
              className="text-warm-gold hover:text-warm-gold hover:bg-warm-gold/10"
              onClick={handleCallNow}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>

            {/* Primary CTA */}
            <Button 
              variant="default" 
              size="sm" 
              className="bg-warm-gold hover:bg-warm-gold/90 text-background ml-2"
              onClick={handleBookCall}
            >
              Book Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-warm-gold/10 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6 text-foreground" /> : <Menu className="h-6 w-6 text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-border mt-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="w-full justify-start text-foreground/80 hover:text-foreground hover:bg-warm-gold/10"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </Button>
            ))}
            
            {/* Mobile Services Section */}
            <div className="px-4 py-2 text-sm font-semibold text-foreground/60 border-t border-border mt-2 pt-4">
              Services
            </div>
            {serviceItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start text-foreground/60 hover:text-foreground hover:bg-warm-gold/10 pl-8"
                onClick={() => scrollToSection(item.id)}
              >
                {item.name}
              </Button>
            ))}

            {/* Mobile Call Button */}
            <Button 
              variant="ghost" 
              className="w-full justify-start text-warm-gold hover:text-warm-gold hover:bg-warm-gold/10"
              onClick={handleCallNow}
            >
              <Phone className="h-4 w-4 mr-2" />
              Call Now
            </Button>

            {/* Mobile CTA */}
            <Button 
              variant="default" 
              className="w-full bg-warm-gold hover:bg-warm-gold/90 text-background mt-4"
              onClick={handleBookCall}
            >
              Book Consultation
            </Button>

            {/* Quick Contact Info */}
            <div className="px-4 py-3 bg-background/50 rounded-lg mt-4">
              <div className="text-xs text-foreground/60 space-y-1">
                <div>Available Now</div>
                <div>Cape Town & Surrounds</div>
                <div>+27 (0) 123 456 789</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;