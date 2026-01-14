import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Quote, ChevronLeft, ChevronRight, Play, Filter, Award, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import jSomethingImg from "@/assets/j-something.jpg";

const Testimonials = () => {
  const { toast } = useToast();
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<number | null>(null);

  const testimonials = [
    {
      id: 1,
      name: "Patels Family",
      event: "Anniversary Dinner",
      rating: 5,
      text: "So sweet, I loved his energy and smiles. He was so attentive and enthusiastic about his cooking and presentation. I hope he does really well in his first future culinary journey!",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b882?w=100&h=100&fit=crop&crop=face",
      type: "private-dinner",
      date: "2024-03-15",
      featured: true
    },
    {
  id: 2,
  name: "J Something",
  event: "Corporate Event",
  rating: 5,
  text: "Our client dinner was a huge success thanks to Denzel's exceptional culinary skills. Every dish was a work of art, and his professional service impressed all our guests. We've already booked him for our next event.",
   image: jSomethingImg,
  type: "corporate",
  date: "2024-02-28",
  featured: true
},
    {
      id: 3,
      name: "Robert & Linda Johnson",
      event: "Holiday Family Gathering",
      rating: 5,
      text: "Denzel catered our family Christmas dinner and it was magical. He accommodated all our dietary restrictions with grace and created dishes that had everyone asking for seconds. The presentation was absolutely stunning.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      type: "family",
      date: "2023-12-25",
      featured: false
    },
    {
      id: 4,
      name: "Emma Wilson",
      event: "Birthday Celebration",
      rating: 5,
      text: "My 30th birthday dinner was beyond my wildest dreams. Denzel created a tasting menu that told the story of my travels through food. Each course was more incredible than the last. Pure culinary artistry!",
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=face",
      type: "birthday",
      date: "2024-01-12",
      featured: true
    },
    {
      id: 5,
      name: "David Chen",
      event: "Wedding Anniversary",
      rating: 5,
      text: "We hired Denzel for our 25th wedding anniversary, and he delivered an experience that we'll treasure forever. The food was exceptional, but it was his warmth and genuine care that made the evening truly special.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      type: "anniversary",
      date: "2024-02-14",
      featured: false
    },
    {
      id: 6,
      name: "Amanda Rodriguez",
      event: "Dinner Party",
      rating: 5,
      text: "Denzel catered my housewarming dinner party and made me look like the perfect host! Every guest was blown away by the quality and creativity of the food. I can't recommend him highly enough.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      type: "dinner-party",
      date: "2024-03-08",
      featured: false
    },
    {
      id: 7,
      name: "Mark & Sophia Williams",
      event: "Safari Bush Dinner",
      rating: 5,
      text: "The safari dinner experience was absolutely breathtaking. Denzel created a feast in the middle of nature that surpassed any five-star restaurant. The flavors, the setting, the service - everything was perfect.",
      image: "https://images.unsplash.com/photo-1504593811423-6dd665756598?w=100&h=100&fit=crop&crop=face",
      type: "safari",
      date: "2024-01-30",
      featured: true
    },
    {
      id: 8,
      name: "Thomas Reynolds",
      event: "Estate Placement",
      rating: 5,
      text: "Having Denzel as our private chef for the season was a game-changer. His meal prep service and daily dinners transformed our family's health and dining experience. Professional, discreet, and incredibly talented.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=100&h=100&fit=crop&crop=face",
      type: "estate",
      date: "2024-02-20",
      featured: true
    }
  ];

  const eventTypes = [
    { id: "all", label: "All Events", count: testimonials.length },
    { id: "private-dinner", label: "Private Dinners", count: testimonials.filter(t => t.type === "private-dinner").length },
    { id: "corporate", label: "Corporate Events", count: testimonials.filter(t => t.type === "corporate").length },
    { id: "safari", label: "Safari Dining", count: testimonials.filter(t => t.type === "safari").length },
    { id: "estate", label: "Estate Placement", count: testimonials.filter(t => t.type === "estate").length },
    { id: "featured", label: "Featured", count: testimonials.filter(t => t.featured).length }
  ];

  const filteredTestimonials = activeFilter === "all" 
    ? testimonials 
    : activeFilter === "featured"
    ? testimonials.filter(t => t.featured)
    : testimonials.filter(t => t.type === activeFilter);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || filteredTestimonials.length <= 3) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= filteredTestimonials.length - 3 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, filteredTestimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= filteredTestimonials.length - 3 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? filteredTestimonials.length - 3 : prevIndex - 1
    );
  };

  const handleShareTestimonial = (testimonial: any) => {
    const shareText = `Check out this amazing review for Chef Denzel Moyo: "${testimonial.text}" - ${testimonial.name}`;
    
    if (navigator.share) {
      navigator.share({
        title: `Testimonial from ${testimonial.name}`,
        text: shareText,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(shareText);
      toast({
        title: "Testimonial Copied",
        description: "Review text copied to clipboard",
      });
    }
  };

  const handleBookFromTestimonial = (testimonialType: string) => {
    sessionStorage.setItem('selectedService', JSON.stringify({
      eventType: testimonialType,
      serviceTitle: testimonialType.replace('-', ' ')
    }));
    
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      toast({
        title: "Book Similar Experience",
        description: "Let's create your own unforgettable dining experience!",
      });
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="flex items-center space-x-1 bg-warm-gold/20 backdrop-blur-sm rounded-full px-4 py-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-warm-gold text-warm-gold" />
              ))}
              <span className="ml-2 text-foreground font-medium">Rated 5-Stars by 50+ Clients</span>
            </div>
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Rave Reviews From Delighted Clients
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Discover why clients consistently rate their experiences with Chef Denzel as 
            exceptional. Every review tells a story of culinary excellence and unforgettable moments.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <div className="flex items-center space-x-2 text-foreground/70 mr-4">
            <Filter className="h-4 w-4" />
            <span className="text-sm font-medium">Filter by:</span>
          </div>
          {eventTypes.map((type) => (
            <Button
              key={type.id}
              variant={activeFilter === type.id ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setActiveFilter(type.id);
                setCurrentIndex(0);
              }}
              className="transition-all duration-300"
            >
              {type.label}
              <span className="ml-2 bg-warm-gold/20 text-warm-gold text-xs px-2 py-1 rounded-full">
                {type.count}
              </span>
            </Button>
          ))}
        </div>

        {/* Testimonials Carousel */}
        <div className="relative mb-12">
          {/* Navigation Arrows */}
          {filteredTestimonials.length > 3 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-warm-gold/30 hover:bg-warm-gold/10"
                onClick={prevTestimonial}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-10 bg-background/80 backdrop-blur-sm border-warm-gold/30 hover:bg-warm-gold/10"
                onClick={nextTestimonial}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonials.slice(currentIndex, currentIndex + 3).map((testimonial, index) => (
              <Card 
                key={testimonial.id} 
                className="p-6 shadow-soft border-none bg-gradient-warm hover:shadow-elegant transition-all duration-500 group relative overflow-hidden"
              >
                {/* Featured Badge */}
                {testimonial.featured && (
                  <div className="absolute top-4 right-4">
                    <Award className="h-5 w-5 text-warm-gold" />
                  </div>
                )}

                {/* Quote Icon */}
                <div className="flex justify-between items-start mb-4">
                  <Quote className="h-6 w-6 text-warm-gold opacity-60" />
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-warm-gold text-warm-gold" />
                    ))}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground/70 mb-6 leading-relaxed italic line-clamp-4 group-hover:line-clamp-none transition-all duration-300">
                  "{testimonial.text}"
                </p>

                {/* Client Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-warm-gold/30"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{testimonial.name}</h4>
                    <p className="text-foreground/60 text-sm">{testimonial.event}</p>
                    <div className="flex items-center space-x-1 text-foreground/50 text-xs mt-1">
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-background text-xs"
                    onClick={() => handleBookFromTestimonial(testimonial.type)}
                  >
                    Book Similar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-foreground/60 hover:text-warm-gold"
                    onClick={() => handleShareTestimonial(testimonial)}
                  >
                    Share
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Carousel Indicators */}
          {filteredTestimonials.length > 3 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: Math.ceil(filteredTestimonials.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === Math.floor(currentIndex / 3) 
                      ? 'bg-warm-gold' 
                      : 'bg-warm-gold/30'
                  }`}
                  onClick={() => setCurrentIndex(index * 3)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-warm-gold/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2 group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-warm-gold">500+</div>
              <div className="text-foreground/70 text-sm">Events Catered</div>
            </div>
            <div className="space-y-2 group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-warm-gold">50+</div>
              <div className="text-foreground/70 text-sm">5-Star Reviews</div>
            </div>
            <div className="space-y-2 group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-warm-gold">98%</div>
              <div className="text-foreground/70 text-sm">Client Satisfaction</div>
            </div>
            <div className="space-y-2 group hover:transform hover:scale-105 transition-transform duration-300">
              <div className="text-3xl font-bold text-warm-gold">10+</div>
              <div className="text-foreground/70 text-sm">Years Experience</div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-8 pt-8 border-t border-warm-gold/20">
            <h3 className="font-serif text-xl font-bold text-foreground mb-4">
              Ready to Create Your Own 5-Star Experience?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              Join the hundreds of satisfied clients who have transformed their special moments 
              into unforgettable culinary journeys with Chef Denzel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-warm-gold hover:bg-warm-gold/90 text-background"
                onClick={() => {
                  sessionStorage.setItem('selectedService', JSON.stringify({
                    eventType: 'consultation',
                    serviceTitle: 'Consultation'
                  }));
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Book Your Experience
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-background"
                onClick={() => window.open(import.meta.env.VITE_CALENDLY_LINK, '_blank')}
              >
                <Play className="mr-2 h-4 w-4" />
                Watch Testimonial Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;