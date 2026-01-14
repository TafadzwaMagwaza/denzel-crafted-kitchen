import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Play, Award, Clock, MapPin, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import heroKitchen from "@/assets/hero-kitchen.jpg";
import chefPortrait from "@/assets/chef-portrait.jpg"; // Add a professional chef portrait

const Hero = () => {
  const { toast } = useToast();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  const specialties = [
    "Private Dinners",
    "Safari Feasts", 
    "Estate Placements",
    "Corporate Events",
    "Wedding Catering",
    "Wellness Menus"
  ];

  // Typewriter effect for specialties
  useEffect(() => {
    if (currentIndex < specialties.length) {
      const currentSpecialty = specialties[currentIndex];
      let charIndex = 0;
      
      const typingInterval = setInterval(() => {
        if (charIndex <= currentSpecialty.length) {
          setTypedText(currentSpecialty.substring(0, charIndex));
          charIndex++;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentIndex((prev) => (prev + 1) % specialties.length);
          }, 2000);
        }
      }, 100);

      return () => clearInterval(typingInterval);
    }
  }, [currentIndex]);

  const handleBookExperience = () => {
    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Let's Create Your Culinary Experience",
        description: "Fill out the form below and I'll get back to you within 24 hours.",
      });
    }
  };

  const handleExploreServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWatchVideo = () => {
    setIsVideoPlaying(true);
    toast({
      title: "Culinary Journey",
      description: "Experience the art of fine dining through my story.",
    });
  };

  const quickBookings = [
    {
      icon: <Clock className="h-4 w-4" />,
      label: "15-min Consultation",
      action: () => window.open(import.meta.env.VITE_CALENDLY_LINK, '_blank')
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      label: "Emergency Booking",
      action: () => window.location.href = 'tel:+27123456789'
    }
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background with Multiple Layers */}
      <div className="absolute inset-0">
        <img
          src={heroKitchen}
          alt="Private Chef Denzel Moyo in his kitchen"
          className="w-full h-full object-cover transform scale-105 animate-zoom-slow"
        />
        {/* Multi-layer gradient for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/70"></div>
        <div className="absolute inset-0 bg-gradient-hero"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-4 h-4 bg-warm-gold rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-warm-gold/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-warm-gold/50 rounded-full animate-ping"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Column - Main Content */}
          <div className="text-left">
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="flex items-center space-x-1 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-warm-gold/30">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-warm-gold text-warm-gold" />
                ))}
                <span className="ml-2 text-foreground font-semibold text-sm">Rated 5-Stars</span>
              </div>
              <div className="flex items-center space-x-1 bg-background/20 backdrop-blur-sm rounded-full px-4 py-2 border border-warm-gold/30">
                <Award className="h-4 w-4 text-warm-gold" />
                <span className="ml-2 text-foreground font-semibold text-sm">Award-Winning</span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Experience
              <br />
              <span className="text-warm-gold bg-gradient-to-r from-warm-gold to-amber-400 bg-clip-text text-transparent">
                Michelin-Level
              </span>
              <br />
              Private Dining
            </h1>

            {/* Dynamic Specialty Text */}
            <div className="mb-6">
              <p className="text-xl md:text-2xl text-foreground/80 font-light">
                Specializing in{" "}
                <span className="text-warm-gold font-semibold min-h-[2rem] inline-block">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </p>
            </div>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-foreground/80 mb-8 leading-relaxed max-w-2xl">
              Formerly of Capsicum Culinary Studio, I bring world-class culinary artistry to your home, 
              estate, or special event. Every dish tells a story of passion, precision, and perfection.
            </p>

            {/* Key Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {[
                "100% Custom Menu Design",
                "Locally-Sourced Ingredients",
                "Dietary Accommodations",
                "White-Glove Service"
              ].map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-warm-gold flex-shrink-0" />
                  <span className="text-foreground/80 text-sm">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8">
              <Button 
                size="lg" 
                className="bg-warm-gold hover:bg-warm-gold/90 text-background font-semibold group px-8 py-6 text-base"
                onClick={handleBookExperience}
              >
                Reserve Your Table
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-foreground/30 text-foreground hover:bg-warm-gold hover:text-background hover:border-warm-gold px-8 py-6 text-base backdrop-blur-sm"
                onClick={handleWatchVideo}
              >
                <Play className="mr-2 h-4 w-4" />
                My Story
              </Button>
            </div>

            {/* Quick Booking Options */}
            <div className="flex flex-wrap gap-3 mb-8">
              {quickBookings.map((booking, index) => (
                <button
                  key={index}
                  onClick={booking.action}
                  className="flex items-center space-x-2 bg-background/20 backdrop-blur-sm rounded-lg px-4 py-3 border border-foreground/20 hover:border-warm-gold hover:bg-warm-gold/10 transition-all duration-300 group"
                >
                  {booking.icon}
                  <span className="text-foreground/80 text-sm group-hover:text-foreground">{booking.label}</span>
                </button>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-start gap-8 text-foreground/70">
              <div className="text-left">
                <div className="font-bold text-2xl text-warm-gold">500+</div>
                <div className="text-sm">Memorable Events</div>
              </div>
              <div className="text-left">
                <div className="font-bold text-2xl text-warm-gold">98%</div>
                <div className="text-sm">Client Satisfaction</div>
              </div>
              <div className="text-left">
                <div className="font-bold text-2xl text-warm-gold">10+</div>
                <div className="text-sm">Years Excellence</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual Elements */}
          <div className="relative">
            {/* Chef Portrait */}
            <div className="relative group">
              <img
                src={chefPortrait}
                alt="Chef Denzel Moyo - Award-Winning Private Chef"
                className="w-full max-w-md mx-auto rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Floating Badges */}
              <div className="absolute -top-4 -right-4 bg-warm-gold text-background px-4 py-2 rounded-full shadow-lg transform rotate-6">
                <span className="font-semibold text-sm">Available Now</span>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-background/90 backdrop-blur-sm text-foreground px-4 py-2 rounded-full shadow-lg transform -rotate-6">
                <span className="font-semibold text-sm">Capsicum Trained</span>
              </div>
            </div>

            {/* Testimonial Card */}
            <div className="absolute -bottom-8 -left-8 bg-background/90 backdrop-blur-sm rounded-xl p-6 shadow-2xl max-w-xs border border-warm-gold/20">
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-warm-gold text-warm-gold" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm italic mb-3">
                "Chef Denzel transformed our anniversary into an unforgettable culinary journey. Absolute perfection!"
              </p>
              <div className="text-foreground font-semibold text-sm">— Sarah & James</div>
              <div className="text-foreground/60 text-xs">Private Dinner Clients</div>
            </div>

            {/* Availability Indicator */}
            <div className="absolute top-8 right-8 bg-background/90 backdrop-blur-sm rounded-full p-4 shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-foreground text-sm font-semibold">Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center text-foreground/60">
          <span className="text-sm mb-2">Explore More</span>
          <ArrowRight className="h-5 w-5 transform rotate-90" />
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            <div className="bg-background rounded-2xl p-8 text-center">
              <h3 className="font-serif text-2xl font-bold text-foreground mb-4">My Culinary Journey</h3>
              <p className="text-foreground/70 mb-6">
                Video content coming soon! In the meantime, let's discuss how I can create your perfect dining experience.
              </p>
              <Button onClick={() => setIsVideoPlaying(false)} className="bg-warm-gold hover:bg-warm-gold/90">
                Close Preview
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;