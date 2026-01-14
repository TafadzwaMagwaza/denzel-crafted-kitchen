import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
// Make sure to create the service file below for this import to work
import { sendContactEmail, type ContactFormData } from "@/services/contactService";

const Contact = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guests: "",
    message: ""
  });

  // ✅ Pre-fill form if user selected a service
  useEffect(() => {
    const selectedService = sessionStorage.getItem("selectedService");
    if (selectedService) {
      try {
        const { eventType, serviceTitle } = JSON.parse(selectedService);
        setFormData(prev => ({
          ...prev,
          eventType: eventType || "",
          message: `I'm interested in your ${serviceTitle} service. ${prev.message}`,
        }));
        sessionStorage.removeItem("selectedService");
      } catch (e) {
        console.error("Error parsing selected service", e);
      }
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      toast({
        title: "Missing Information",
        description: "Please fill in your Name, Email, and a Message.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await sendContactEmail(formData);
      
      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Denzel will get back to you within 24 hours.",
          className: "bg-green-800 text-white border-none"
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventType: "",
          eventDate: "",
          guests: "",
          message: ""
        });
      } else {
        throw new Error(result.error || "Failed to send");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Message Failed",
        description: "There was a problem connecting. Please try emailing directly.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleBookCall = () => {
    const calendlyLink = import.meta.env.VITE_CALENDLY_LINK;
    if (calendlyLink) {
      window.open(calendlyLink, "_blank", "noopener,noreferrer");
    } else {
      // Fallback if link isn't set
      window.location.href = "mailto:denzelchef97@gmail.com";
    }
  };

  const isFormValid = () =>
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.message.trim() !== "" &&
    /\S+@\S+\.\S+/.test(formData.email);

  const contactInfo = [
    {
      icon: <MapPin className="h-5 w-5" />,
      title: "Service Area",
      details: ["Gauteng province, Western Cape & Surrounds", "Travel available"],
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Phone",
      details: ["+27 62 872 3919"],
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: "Email",
      details: ["denzelchef97@gmail.com"],
    },
    {
      icon: <Clock className="h-5 w-5" />,
      title: "Response Time",
      details: ["Within 24 hours", "7 days a week"],
    },
  ];

  return (
    <section id="contact" className="py-20 bg-[#0f0f0f] text-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
            Let's Create Something Amazing Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Ready to plan your unforgettable culinary experience? Get in touch to discuss your vision, 
            and I'll create a custom proposal just for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <Card className="p-8 bg-[#1b1b1b] border border-gray-800 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-white mb-6">Get In Touch</h3>
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 p-2 bg-amber-500/10 rounded-lg text-amber-400">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                      {item.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-400 text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-xl p-6 text-center text-white">
                <h4 className="font-semibold mb-2">Quick Consultation</h4>
                <p className="text-amber-100 text-sm mb-4">
                  Need to discuss your event urgently? Book a 15-minute consultation call.
                </p>
                <Button
                  size="sm"
                  className="w-full bg-white text-amber-600 hover:bg-gray-200"
                  onClick={handleBookCall}
                >
                  Book Call Now
                </Button>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8 bg-[#1b1b1b] border border-gray-800 shadow-lg">
              <h3 className="font-serif text-xl font-bold text-white mb-6">Tell Me About Your Event</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-gray-300">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      required
                      className="mt-1 bg-[#111] border-gray-700 text-gray-100 placeholder-gray-500"
                      placeholder="Enter your full name"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="mt-1 bg-[#111] border-gray-700 text-gray-100 placeholder-gray-500"
                      placeholder="your.email@example.com"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="mt-1 bg-[#111] border-gray-700 text-gray-100 placeholder-gray-500"
                      placeholder="+27 (0) 123 456 789"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="eventType" className="text-gray-300">Event Type</Label>
                    <Select
                      value={formData.eventType}
                      onValueChange={(value) => handleInputChange("eventType", value)}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="mt-1 bg-[#111] border-gray-700 text-gray-100">
                        <SelectValue placeholder="Select event type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1b1b1b] text-gray-100 border-gray-700">
                        <SelectItem value="estate-placement">Estate & Travelling Private Chef</SelectItem>
                        <SelectItem value="private-dinner">Private Dinners & Events</SelectItem>
                        <SelectItem value="meal-prep">Meal Prep & Subscriptions</SelectItem>
                        <SelectItem value="small-event">Catering for Small Events (20-50)</SelectItem>
                        <SelectItem value="special-diet">Special Diet & Lifestyle Support</SelectItem>
                        <SelectItem value="safari">Safari & Outdoor Dining</SelectItem>
                        <SelectItem value="travel-chef">Travel Chef for Villas</SelectItem>
                        <SelectItem value="corporate">Corporate & Home Partnerships</SelectItem>
                        <SelectItem value="consultation">Menu Planning & Consultation</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="eventDate" className="text-gray-300">Preferred Event Date</Label>
                    <Input
                      id="eventDate"
                      type="date"
                      value={formData.eventDate}
                      onChange={(e) => handleInputChange("eventDate", e.target.value)}
                      className="mt-1 bg-[#111] border-gray-700 text-gray-100"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="guests" className="text-gray-300">Number of Guests</Label>
                    <Input
                      id="guests"
                      type="number"
                      value={formData.guests}
                      onChange={(e) => handleInputChange("guests", e.target.value)}
                      placeholder="How many guests?"
                      className="mt-1 bg-[#111] border-gray-700 text-gray-100 placeholder-gray-500"
                      min="1"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="message" className="text-gray-300">Tell Me About Your Vision *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleInputChange("message", e.target.value)}
                    rows={5}
                    placeholder="Describe your event, dietary preferences, or any special requests..."
                    required
                    className="mt-1 bg-[#111] border-gray-700 text-gray-100 placeholder-gray-500"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full group bg-amber-600 hover:bg-amber-700 text-white"
                  disabled={!isFormValid() || isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send My Inquiry
                      <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </>
                  )}
                </Button>

                <p className="text-gray-400 text-sm text-center">
                  * Required fields. I'll respond within 24 hours with a custom proposal for your event.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;