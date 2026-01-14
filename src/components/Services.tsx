import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, Heart, Calendar, ChefHat, Salad, Users, TreePine, Plane, Building2, ClipboardList,
  X, Download, Phone, Mail
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample menu data
const sampleMenus = {
  "private-dinner": {
    title: "Private Dinner Experience",
    description: "An exquisite multi-course dining experience perfect for intimate gatherings",
    courses: [
      {
        name: "Welcome Amuse-Bouche",
        items: ["Truffle arancini", "Smoked salmon blini", "Herbed goat cheese tartlet"]
      },
      {
        name: "Starter",
        items: ["Seared scallops with cauliflower purée", "Beetroot carpaccio with goat cheese", "Burrata with heirloom tomatoes"]
      },
      {
        name: "Main Course",
        items: ["Beef Wellington with red wine reduction", "Herb-crusted rack of lamb", "Wild mushroom risotto with truffle"]
      },
      {
        name: "Dessert",
        items: ["Chocolate fondant with vanilla ice cream", "Lemon tart with berry compote", "Cheese selection with artisan crackers"]
      }
    ],
    price: "From R1,500 per person"
  },
  "safari": {
    title: "Safari Bush Dinner",
    description: "An unforgettable outdoor dining experience under the African sky",
    courses: [
      {
        name: "Campfire Starters",
        items: ["Biltong and droëwors platter", "Grilled boerewors skewers", "Sweet potato and corn fritters"]
      },
      {
        name: "Main Braai",
        items: ["Marinated sosaties (kebabs)", "Braaibroodjies (grilled sandwiches)", "Potjie kos (slow-cooked stew)"]
      },
      {
        name: "Traditional Sides",
        items: ["Pap and sous", "Braaied mielies", "Fresh garden salad"]
      },
      {
        name: "Dessert",
        items: ["Malva pudding with custard", "Koeksisters", "Amarula cream pots"]
      }
    ],
    price: "From R800 per person"
  },
  "wellness": {
    title: "Wellness & Special Diet Menu",
    description: "Nutritionally balanced meals tailored to your dietary requirements",
    courses: [
      {
        name: "Breakfast Options",
        items: ["Chia seed pudding with berries", "Avocado and egg breakfast bowl", "Green smoothie bowl"]
      },
      {
        name: "Lunch Selections",
        items: ["Quinoa salad with roasted vegetables", "Grilled chicken with sweet potato", "Zucchini noodle pasta"]
      },
      {
        name: "Dinner Choices",
        items: ["Baked fish with steamed greens", "Lentil and vegetable curry", "Turkey meatballs with zucchini noodles"]
      },
      {
        name: "Snacks & Extras",
        items: ["Raw energy balls", "Vegetable crudités with hummus", "Herbal teas and infused waters"]
      }
    ],
    price: "Custom pricing based on requirements"
  }
};

const Services = () => {
  const { toast } = useToast();
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [showMenuModal, setShowMenuModal] = useState(false);

  const services = [
    {
      icon: <Home className="h-8 w-8" />,
      title: "Estate & Travelling Private Chef",
      description: "For high‑net‑worth families with multiple residences. I handle menu planning, provisioning, pantry management, and daily service — travelling with you to each home.",
      features: [
        "Full‑time or seasonal placement",
        "Wellness menus tailored to household",
        "Staffing coordination available",
        "NDAs and security protocols"
      ],
      cta: "Enquire about Estate Placement",
      eventType: "estate-placement"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Private Dinners & Events",
      description: "Romantic dinners, birthdays, anniversaries, and intimate gatherings designed to create unforgettable memories.",
      features: [
        "Multi‑course plated dinners",
        "Chef's Table with tableside storytelling",
        "Wine or cocktail pairings",
        "2-15 guests"
      ],
      cta: "Plan Your Private Dinner",
      eventType: "private-dinner"
    },
    {
      icon: <Salad className="h-8 w-8" />,
      title: "Meal Prep & Subscriptions",
      description: "Healthy, chef‑crafted meals for the week, customized to your goals and dietary requirements.",
      features: [
        "3–5 day weekly plans",
        "Athlete and wellness‑focused programs",
        "Macro tracking available",
      ],
      cta: "Start Your Meal Plan",
      eventType: "meal-prep"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Catering for Small Events (20–50)",
      description: "Perfect for brunches, corporate lunches, and family functions with full-service execution.",
      features: [
        "Full menu design and execution",
        "Service staff available",
        "Setup, service, and cleanup",
        "Customizable packages"
      ],
      cta: "Get a Quote",
      eventType: "small-event"
    },
    {
      icon: <ChefHat className="h-8 w-8" />,
      title: "Special Diet & Lifestyle Support",
      description: "Menus tailored for specific health needs or training programs in collaboration with your dietitian.",
      features: [
        "Keto, vegan, diabetic‑friendly",
        "Gluten‑free, low‑FODMAP",
        "Athlete nutrition plans",
        "Medical diet compliance"
      ],
      cta: "Discuss Your Requirements",
      eventType: "special-diet"
    },
    {
      icon: <TreePine className="h-8 w-8" />,
      title: "Safari & Outdoor Dining",
      description: "Bush dinners, beach picnics, or mountain brunches — ideal for couples, influencers, and tourists.",
      features: [
        "Curated off‑grid menus",
        "Mobile kitchen setup",
        "Lodge partnerships",
        "Optional photographer"
      ],
      cta: "Book Safari Experience",
      eventType: "safari"
    },
    {
      icon: <Plane className="h-8 w-8" />,
      title: "Travel Chef for Villas & Celebrities",
      description: "Short‑term bookings for luxury Airbnbs, villas, private game reserves, and high‑profile guests.",
      features: [
        "NDAs and concierge coordination",
        "International availability",
        "Custom travel packages"
      ],
      cta: "Enquire for Travel Dates",
      eventType: "travel-chef"
    },
    // {
    //   icon: <Building2 className="h-8 w-8" />,
    //   title: "Corporate & Home Partnerships",
    //   description: "Reliable culinary support for busy professionals, Airbnb hosts, and small offices.",
    //   features: [
    //     "Weekly/Monthly retainers",
    //     "Branded menu cards",
    //     "Consistent service standards",
    //     "Flexible scheduling"
    //   ],
    //   cta: "Request Partnership Info",
    //   eventType: "corporate"
    // },
    {
      icon: <ClipboardList className="h-8 w-8" />,
      title: "Menu Planning & Consultation",
      description: "From pantry audits to custom seasonal menus, I design culinary roadmaps for your lifestyle.",
      features: [
        "Menu consultation sessions",
        "Grocery shopping service",
        "Table setting and styling",
        "Seasonal menu design"
      ],
      cta: "Book Consultation",
      eventType: "consultation"
    }
  ];

  // Scroll to contact form and pre-fill service type
  const handleServiceEnquiry = (eventType: string, serviceTitle: string) => {
    // Store the selected service in sessionStorage for the contact form to read
    sessionStorage.setItem('selectedService', JSON.stringify({
      eventType,
      serviceTitle
    }));

    // Scroll to contact section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      toast({
        title: "Let's Discuss Your " + serviceTitle,
        description: "Please fill out the contact form below and I'll get back to you within 24 hours.",
      });
    } else {
      toast({
        title: "Contact Section Not Found",
        description: "Please navigate to the contact section manually.",
        variant: "destructive",
      });
    }
  };

  // Handle consultation booking
  const handleBookConsultation = () => {
    const calendlyLink = import.meta.env.VITE_CALENDLY_LINK;
    if (calendlyLink) {
      window.open(calendlyLink, '_blank', 'noopener,noreferrer');
    } else {
      toast({
        title: "Consultation Booking",
        description: "Please contact me directly to schedule a consultation.",
        variant: "default",
      });
      handleServiceEnquiry('consultation', 'Consultation');
    }
  };

  // Handle sample menu viewing
  const handleViewSampleMenus = () => {
    setSelectedMenu(null);
    setShowMenuModal(true);
  };

  // Handle specific menu selection
  const handleSelectMenu = (menuType: string) => {
    setSelectedMenu(menuType);
  };

  // Download sample menu as PDF (simulated)
  const handleDownloadMenu = () => {
    if (selectedMenu && sampleMenus[selectedMenu as keyof typeof sampleMenus]) {
      toast({
        title: "Menu Download Started",
        description: "Your sample menu is being prepared for download.",
      });
      
      // Simulate download delay
      setTimeout(() => {
        toast({
          title: "Menu Downloaded",
          description: "Check your downloads folder for the sample menu PDF.",
        });
      }, 2000);
    }
  };

  // Contact directly via phone
  const handleCallNow = () => {
    window.location.href = 'tel:+27123456789';
  };

  // Contact directly via email
  const handleEmailNow = () => {
    window.location.href = 'mailto:hello@denzelmoyo.com?subject=Service Enquiry&body=Hi Denzel, I would like to enquire about your services.';
  };

  return (
    <section id="services" className="py-20 bg-gradient-warm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Elevated Dining Services
          </h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            From estate placements to safari feasts, I offer comprehensive culinary services tailored to your lifestyle, 
            wherever you are in the world.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <Card key={index} className="p-6 shadow-elegant border-none bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-500 flex flex-col group">
              <div className="flex items-start space-x-3 mb-4">
                <div className="flex-shrink-0 p-3 bg-warm-gold/20 rounded-xl text-warm-gold group-hover:bg-warm-gold/30 transition-colors">
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-foreground mb-2">{service.title}</h3>
                </div>
              </div>
              
              <p className="text-foreground/70 mb-4 text-sm leading-relaxed">{service.description}</p>

              <div className="mb-4 flex-grow">
                <h4 className="font-semibold text-foreground mb-2 text-sm">What's Included:</h4>
                <ul className="space-y-1">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="text-foreground/70 text-sm flex items-center">
                      <div className="w-1.5 h-1.5 bg-warm-gold rounded-full mr-2 flex-shrink-0"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button 
                size="sm" 
                className="w-full mt-auto bg-warm-gold hover:bg-warm-gold/90 text-white transition-colors"
                onClick={() => handleServiceEnquiry(service.eventType, service.title)}
              >
                {service.cta}
              </Button>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="p-8 shadow-elegant border-none bg-gradient-accent backdrop-blur-sm max-w-4xl mx-auto">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4">
              Ready for an Unforgettable Culinary Experience?
            </h3>
            <p className="text-foreground/70 mb-6 text-lg">
              Let's discuss your vision and create a bespoke dining experience that exceeds every expectation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                size="lg" 
                className="bg-warm-gold hover:bg-warm-gold/90 text-white px-8"
                onClick={handleBookConsultation}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Book a Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white px-8"
                onClick={handleViewSampleMenus}
              >
                <ClipboardList className="w-4 h-4 mr-2" />
                View Sample Menus
              </Button>
            </div>
            
            {/* Quick Contact Options */}
            <div className="mt-6 pt-6 border-t border-warm-gold/30">
              <p className="text-foreground/70 mb-3">Prefer to contact directly?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white"
                  onClick={handleCallNow}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Call Now
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white"
                  onClick={handleEmailNow}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email Now
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Sample Menus Modal */}
        {showMenuModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-background rounded-2xl shadow-elegant max-w-4xl w-full max-h-[90vh] overflow-hidden border border-border">
              {/* Header */}
              <div className="bg-gradient-accent text-foreground p-6">
                <div className="flex justify-between items-center">
                  <h3 className="font-serif text-2xl font-bold">Sample Menus</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-foreground hover:bg-background/20"
                    onClick={() => setShowMenuModal(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 max-h-[70vh] overflow-y-auto">
                {!selectedMenu ? (
                  // Menu Selection
                  <div className="grid md:grid-cols-3 gap-6">
                    {Object.entries(sampleMenus).map(([key, menu]) => (
                      <Card 
                        key={key}
                        className="p-6 text-center cursor-pointer hover:shadow-elegant transition-shadow border-2 border-transparent hover:border-warm-gold bg-background/80 backdrop-blur-sm"
                        onClick={() => handleSelectMenu(key)}
                      >
                        <div className="w-12 h-12 bg-warm-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                          <ChefHat className="w-6 h-6 text-warm-gold" />
                        </div>
                        <h4 className="font-serif text-lg font-bold text-foreground mb-2">{menu.title}</h4>
                        <p className="text-foreground/70 text-sm mb-4">{menu.description}</p>
                        <p className="text-warm-gold font-semibold">{menu.price}</p>
                      </Card>
                    ))}
                  </div>
                ) : (
                  // Selected Menu Details
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h4 className="font-serif text-2xl font-bold text-foreground mb-2">
                          {sampleMenus[selectedMenu as keyof typeof sampleMenus]?.title}
                        </h4>
                        <p className="text-foreground/70">
                          {sampleMenus[selectedMenu as keyof typeof sampleMenus]?.description}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleDownloadMenu}
                          className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedMenu(null)}
                          className="border-warm-gold text-warm-gold hover:bg-warm-gold hover:text-white"
                        >
                          Back to Menus
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {sampleMenus[selectedMenu as keyof typeof sampleMenus]?.courses.map((course, index) => (
                        <Card key={index} className="p-6 border-l-4 border-warm-gold bg-background/80 backdrop-blur-sm">
                          <h5 className="font-serif text-lg font-bold text-foreground mb-3">{course.name}</h5>
                          <ul className="space-y-2">
                            {course.items.map((item, itemIndex) => (
                              <li key={itemIndex} className="text-foreground/70 flex items-center">
                                <div className="w-1.5 h-1.5 bg-warm-gold rounded-full mr-3"></div>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </Card>
                      ))}
                    </div>

                    <div className="mt-8 p-4 bg-warm-gold/10 rounded-lg border border-warm-gold/20">
                      <p className="text-foreground text-center">
                        <strong>Note:</strong> This is a sample menu. All menus are customized based on your preferences, 
                        dietary requirements, and seasonal availability.
                      </p>
                    </div>

                    <div className="mt-6 flex justify-center gap-4">
                      <Button 
                        onClick={() => handleServiceEnquiry(selectedMenu, sampleMenus[selectedMenu as keyof typeof sampleMenus]?.title || 'Menu')}
                        className="bg-warm-gold hover:bg-warm-gold/90 text-white"
                      >
                        Enquire About This Menu
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Services;