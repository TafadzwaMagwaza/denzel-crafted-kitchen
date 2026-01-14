import { ChefHat, Heart, Facebook, Instagram, Mail, GraduationCap } from "lucide-react";
import chefLogo from "@/assets/chef-logo.png";

const Footer = () => {
  const socialLinks = [
    {
      name: "Facebook",
      icon: <Facebook className="h-4 w-4" />,
      url: "https://www.facebook.com/denzel.moyo.12?mibextid=ZbWKwL",
      color: "hover:text-blue-500"
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-4 w-4" />,
      url: "https://www.instagram.com/chef_denzel_16?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
      color: "hover:text-pink-500"
    },
    {
      name: "Threads",
      icon: <Instagram className="h-4 w-4" />, // Using Instagram icon as Threads is similar
      url: "https://www.threads.com/@chef_denzel_16?xmt=AQF0xNLNzlslPC9IOrdngB0YpmTag-uLz3YfkA4H240wcqg",
      color: "hover:text-gray-400"
    },
    {
      name: "Email",
      icon: <Mail className="h-4 w-4" />,
      url: "mailto:denzelchef97@gmail.com",
      color: "hover:text-red-500"
    }
  ];

  const culinarySchool = {
    name: "Capsicum Culinary Studio",
    instagram: "https://www.instagram.com/capsicumcooking?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    handle: "@capsicumcooking"
  };

  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 items-start">
          {/* Logo and Tagline */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
              <img src={chefLogo} alt="Chef Denzel Moyo" className="h-8 w-8" />
              <span className="font-serif text-xl font-bold">Denzel Moyo</span>
            </div>
            <p className="text-primary-foreground/80 text-sm mb-4">
              Elevated dining experiences. South Africa–based, internationally available.
            </p>
            
            {/* Social Media Links */}
            <div className="flex space-x-4 justify-center md:justify-start">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-primary-foreground/70 transition-colors duration-300 ${social.color} transform hover:scale-110`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <nav className="space-y-2">
              <a href="#home" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Home
              </a>
              <a href="#services" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Services
              </a>
              <a href="#gallery" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Gallery
              </a>
              <a href="#about" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                About
              </a>
              <a href="#testimonials" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Testimonials
              </a>
              <a href="#contact" className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Contact
              </a>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p>Cape Town & Surrounds</p>
              <p>+27 (0) 123 456 789</p>
              <p>hello@denzelmoyo.com</p>
              <p>denzelchef97@gmail.com</p>
            </div>
          </div>

          {/* Culinary Education */}
          <div className="text-center md:text-left">
            <h4 className="font-semibold mb-4 flex items-center justify-center md:justify-start">
              <GraduationCap className="h-4 w-4 mr-2" />
              Culinary Education
            </h4>
            <div className="space-y-2 text-sm text-primary-foreground/80">
              <p className="font-medium">Capsicum Culinary Studio</p>
              <a
                href={culinarySchool.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors"
              >
                {culinarySchool.handle}
              </a>
              <p className="text-xs text-primary-foreground/60 mt-2">
                Trained at one of South Africa's premier culinary institutions
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 Denzel Moyo Private Chef Services. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-2 text-primary-foreground/60 text-sm">
              <span>Made with</span>
              <Heart className="h-3 w-3 fill-current" />
              <span>for exceptional cuisine</span>
              <ChefHat className="h-3 w-3" />
            </div>
          </div>

          {/* Additional Social Links */}
          <div className="mt-4 flex justify-center space-x-6">
            <div className="flex items-center space-x-2 text-primary-foreground/60 text-xs">
              <span>Follow on social media:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-primary-foreground/50 hover:text-primary-foreground transition-colors ${social.color}`}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;