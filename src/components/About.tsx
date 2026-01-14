import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChefHat, Heart, Award, Utensils, GraduationCap, MapPin, Clock, Users, Play, X, Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import chefWithCake from "@/assets/chef-with-cake.jpg";

const About = () => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState("story");

  const values = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Passion for Excellence",
      description: "Every dish is crafted with love and attention to detail, ensuring an extraordinary culinary experience."
    },
    {
      icon: <ChefHat className="h-6 w-6" />,
      title: "Culinary Artistry",
      description: "Combining traditional techniques with modern innovation to create visually stunning and delicious cuisine."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Premium Quality",
      description: "I source only the finest ingredients, working with local suppliers to ensure freshness and sustainability."
    },
    {
      icon: <Utensils className="h-6 w-6" />,
      title: "Personalized Service",
      description: "Each menu is tailored to your preferences, dietary requirements, and the unique story of your event."
    }
  ];

  const timeline = [
    {
      year: "2014",
      title: "Culinary Education",
      description: "Graduated from Capsicum Culinary Studio with honors",
      icon: <GraduationCap className="h-4 w-4" />
    },
    {
      year: "2015-2017",
      title: "Professional Development",
      description: "Worked in premium restaurants and luxury hotels across South Africa",
      icon: <ChefHat className="h-4 w-4" />
    },
    {
      year: "2018",
      title: "Private Chef Career",
      description: "Started private chef services for high-net-worth families",
      icon: <Users className="h-4 w-4" />
    },
    {
      year: "2020-Present",
      title: "International Recognition",
      description: "Expanded services internationally with safari dining and travel chef offerings",
      icon: <Award className="h-4 w-4" />
    }
  ];

  const stats = [
    { number: "500+", label: "Events Catered", icon: <Utensils className="h-4 w-4" /> },
    { number: "50+", label: "5-Star Reviews", icon: <Award className="h-4 w-4" /> },
    { number: "10+", label: "Years Experience", icon: <Clock className="h-4 w-4" /> },
    { number: "100+", label: "Repeat Clients", icon: <Users className="h-4 w-4" /> }
  ];

  const certifications = [
    "Food Safety Certification",
    "Advanced Culinary Techniques",
    "Nutrition and Dietary Planning",
    "Wine Pairing Specialist"
  ];

  const handleBookConsultation = () => {
    const calendlyLink = import.meta.env.VITE_CALENDLY_LINK;
    if (calendlyLink) {
      window.open(calendlyLink, '_blank', 'noopener,noreferrer');
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        toast({
          title: "Let's Discuss Your Event",
          description: "Please fill out the contact form below.",
        });
      }
    }
  };

  const handleDownloadPortfolio = () => {
    toast({
      title: "Portfolio Download",
      description: "Your chef portfolio is being prepared for download.",
    });
    // Simulate download
    setTimeout(() => {
      toast({
        title: "Portfolio Ready",
        description: "Check your downloads for the PDF portfolio.",
      });
    }, 2000);
  };

  const handleWatchStory = () => {
    setIsVideoPlaying(true);
  };

  return (
    <section id="about" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            The Art of Culinary Excellence
          </h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Discover the passion, precision, and personality behind every unforgettable dining experience
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start mb-16">
          {/* Image Side */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-elegant group">
              <img
                src={chefWithCake}
                alt="Chef Denzel Moyo with signature dessert"
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              {/* Play Video Button */}
              <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button 
                  size="icon" 
                  className="bg-warm-gold hover:bg-warm-gold/90 text-background rounded-full w-16 h-16"
                  onClick={handleWatchStory}
                >
                  <Play className="h-6 w-6" />
                </Button>
              </div>
            </div>
            
            {/* Floating Stats */}
            <div className="absolute -bottom-6 -right-6 bg-warm-gold text-primary p-6 rounded-2xl shadow-elegant">
              <div className="text-center">
                <div className="font-bold text-2xl">10+</div>
                <div className="text-sm font-medium">Years of Excellence</div>
              </div>
            </div>

            {/* Location Badge */}
            <div className="absolute -top-4 -left-4 bg-background/90 backdrop-blur-sm text-foreground p-4 rounded-2xl shadow-elegant border border-warm-gold/20">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-warm-gold" />
                <div>
                  <div className="font-semibold text-sm">Based in</div>
                  <div className="text-xs text-foreground/70">Mpumalanga</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-background/50 backdrop-blur-sm rounded-lg p-1 mb-6">
              {[
                { id: "story", label: "My Story" },
                { id: "experience", label: "Experience" },
                { id: "philosophy", label: "Philosophy" }
              ].map((tab) => (
                <Button
                  key={tab.id}
                  variant={activeTab === tab.id ? "default" : "ghost"}
                  size="sm"
                  className={`flex-1 ${activeTab === tab.id ? "bg-warm-gold text-background" : "text-foreground/70"}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </Button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="mb-6">
              {activeTab === "story" && (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
                    From Capsicum to Culinary Artistry
                  </h3>
                  <p className="text-foreground/80 text-lg mb-4 leading-relaxed">
                    My culinary journey began at Capsicum Culinary Studio, where I developed a foundation of 
                    classical techniques and modern innovation. What started as a passion for creating beautiful 
                    food evolved into a dedication to crafting unforgettable dining experiences.
                  </p>
                  <p className="text-foreground/70 mb-4 leading-relaxed">
                    {isExpanded ? (
                      <>
                        Over the past decade, I've had the privilege of working with discerning clients across 
                        South Africa and internationally. From intimate private dinners in Camps Bay to elaborate 
                        safari feasts in the bushveld, each event has taught me that exceptional cuisine is about 
                        more than just taste—it's about creating memories.
                        <br /><br />
                        My approach combines technical precision with artistic flair, ensuring every dish tells 
                        a story. I believe in using locally-sourced, seasonal ingredients to create menus that 
                        are not only delicious but also sustainable and reflective of their environment.
                      </>
                    ) : (
                      "Today, I specialize in creating bespoke dining experiences for clients who appreciate the finer things in life. Whether it's a romantic dinner for two, a corporate event, or a full-time estate placement, I bring the same level of passion and precision to every plate."
                    )}
                  </p>
                  <Button
                    variant="link"
                    className="text-warm-gold hover:text-warm-gold/80 p-0 h-auto"
                    onClick={() => setIsExpanded(!isExpanded)}
                  >
                    {isExpanded ? "Read Less" : "Read Full Story"}
                  </Button>
                </div>
              )}

              {activeTab === "experience" && (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                    Culinary Journey & Expertise
                  </h3>
                  <div className="space-y-4">
                    {timeline.map((item, index) => (
                      <div key={index} className="flex space-x-4">
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 bg-warm-gold rounded-full flex items-center justify-center text-background">
                            {item.icon}
                          </div>
                          {index < timeline.length - 1 && (
                            <div className="w-0.5 h-full bg-warm-gold/30 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-warm-gold">{item.year}</span>
                            <span className="font-semibold text-foreground">{item.title}</span>
                          </div>
                          <p className="text-foreground/70 text-sm">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "philosophy" && (
                <div>
                  <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
                    My Culinary Philosophy
                  </h3>
                  <div className="space-y-4">
                    <p className="text-foreground/80 leading-relaxed">
                      I believe that exceptional dining is a multisensory experience that engages taste, sight, 
                      and emotion. Every element—from ingredient selection to final presentation—is carefully 
                      considered to create harmony on the plate.
                    </p>
                    <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-2">Certifications & Specializations</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {certifications.map((cert, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-warm-gold rounded-full"></div>
                            <span className="text-foreground/70 text-sm">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Values Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {values.map((value, index) => (
                <Card key={index} className="p-4 border-none shadow-soft bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-warm-gold/20 rounded-lg text-warm-gold">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{value.title}</h3>
                      <p className="text-foreground/70 text-sm">{value.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-warm-gold hover:bg-warm-gold/90 text-background group flex-1"
                onClick={handleBookConsultation}
              >
                Book Consultation
                <ChefHat className="ml-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-300" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-background flex-1"
                onClick={handleDownloadPortfolio}
              >
                <Download className="mr-2 h-4 w-4" />
                Portfolio
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-background/50 backdrop-blur-sm rounded-2xl p-8 border border-warm-gold/20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group hover:transform hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-warm-gold/20 rounded-full text-warm-gold">
                    {stat.icon}
                  </div>
                </div>
                <div className="font-serif text-3xl font-bold text-foreground mb-1">{stat.number}</div>
                <div className="text-foreground/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-background rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-serif text-2xl font-bold text-foreground">My Culinary Journey</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsVideoPlaying(false)}
                className="text-foreground hover:bg-warm-gold/10"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video bg-primary/20 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <Play className="h-16 w-16 text-warm-gold mx-auto mb-4" />
                <p className="text-foreground/70 mb-4">Video content coming soon!</p>
                <p className="text-foreground/60 text-sm">
                  In the meantime, let's discuss how I can create your perfect dining experience.
                </p>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <Button 
                onClick={handleBookConsultation}
                className="bg-warm-gold hover:bg-warm-gold/90"
              >
                Book a Consultation
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;