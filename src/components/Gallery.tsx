import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ZoomIn, ChevronLeft, ChevronRight, X, Download, Share2, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Import existing images
import burgerDish from "@/assets/burger-dish.jpg";
import dessertGlass from "@/assets/dessert-glass.jpg";
import chocolateDessert from "@/assets/chocolate-dessert.jpg";
import grilledPrawns from "@/assets/grilled-prawns.jpg";
import fishChips from "@/assets/fish-chips.jpg";
import seafoodPlatter1 from "@/assets/seafood-platter-1.jpg";
import seafoodPlatter2 from "@/assets/seafood-platter-2.jpg";
import iceCreamDessert from "@/assets/ice-cream-dessert.jpg";

// Import new images (existing in your project)
import stackMeat3 from "@/assets/stack-meat3.jpg";
import platter from "@/assets/platter.jpg";
import platter2 from "@/assets/platter2.jpg";
import green from "@/assets/green.jpg";
import fruit from "@/assets/fruit.jpg";
import dessert3 from "@/assets/dessert3.jpg";
import dessert from "@/assets/dessert.jpg";

// Import the 10 newly provided images
import img00074 from "@/assets/image00074.jpeg";
import img00011 from "@/assets/image00011.jpeg";
import img00070 from "@/assets/image00070.jpeg";
import img00029 from "@/assets/image00029.jpeg";
import img00066 from "@/assets/image00066.jpeg";
import img00006 from "@/assets/image00006.jpeg";
import img00035 from "@/assets/image00035.jpeg";
import img00062 from "@/assets/image00062.jpeg";
import img00061 from "@/assets/image00061.jpeg";
import img00057 from "@/assets/image00057.jpeg";

const Gallery = () => {
  const { toast } = useToast();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [isFullPortfolio, setIsFullPortfolio] = useState(false);

  const galleryItems = [
    {
      src: burgerDish,
      title: "Gourmet Burger & Sweet Potato Fries",
      category: "Mains",
      description: "Premium beef patty with artisan brioche bun, aged cheddar, and house-made sweet potato fries",
      tags: ["Signature", "Comfort Food", "Gourmet"]
    },
    {
      src: grilledPrawns,
      title: "Grilled Prawns with Herb Oil",
      category: "Seafood",
      description: "Fresh tiger prawns grilled to perfection, drizzled with extra virgin olive oil and fresh herbs",
      tags: ["Fresh", "Mediterranean", "Grilled"]
    },
    {
      src: dessertGlass,
      title: "Artisanal Glass Dessert",
      category: "Desserts",
      description: "Layered dessert featuring vanilla panna cotta, berry compote, and caramelized nuts",
      tags: ["Elegant", "Layered", "Signature"]
    },
    {
      src: seafoodPlatter1,
      title: "Mediterranean Seafood Platter",
      category: "Seafood",
      description: "Assorted seafood including oysters, prawns, calamari, and mussels with citrus dressing",
      tags: ["Feast", "Mediterranean", "Fresh"]
    },
    {
      src: chocolateDessert,
      title: "Chocolate Sphere Dessert",
      category: "Desserts",
      description: "Dark chocolate sphere filled with chocolate mousse, served with warm caramel sauce",
      tags: ["Dramatic", "Chocolate", "Interactive"]
    },
    {
      src: fishChips,
      title: "Beer Battered Fish & Chips",
      category: "Mains",
      description: "Traditional beer-battered hake with triple-cooked chips and mushy peas",
      tags: ["Classic", "Crispy", "Traditional"]
    },
    {
      src: seafoodPlatter2,
      title: "Chef's Signature Seafood Board",
      category: "Seafood",
      description: "Premium seafood selection featuring lobster, scallops, and smoked salmon",
      tags: ["Premium", "Signature", "Luxury"]
    },
    {
      src: iceCreamDessert,
      title: "Artisan Ice Cream Creation",
      category: "Desserts",
      description: "House-made vanilla bean ice cream with seasonal fruits and edible flowers",
      tags: ["Artisan", "Seasonal", "Elegant"]
    },
    // New gallery items
    {
      src: stackMeat3,
      title: "Stacked Premium Meat Cuts",
      category: "Mains",
      description: "Perfectly grilled and stacked premium meat cuts with roasted vegetables and jus reduction",
      tags: ["Premium", "Grilled", "Stacked"]
    },
    {
      src: platter,
      title: "Artisan Sharing Platter",
      category: "Platters",
      description: "Curated selection of meats, cheeses, fresh fruits, and artisan breads for sharing",
      tags: ["Sharing", "Artisan", "Premium"]
    },
    {
      src: platter2,
      title: "Deluxe Charcuterie Board",
      category: "Platters",
      description: "Exquisite charcuterie board featuring cured meats, aged cheeses, pickles, and accompaniments",
      tags: ["Luxury", "Charcuterie", "Sharing"]
    },
    {
      src: green,
      title: "Garden Fresh Salad",
      category: "Vegetarian",
      description: "Vibrant salad with seasonal greens, edible flowers, and house-made vinaigrette",
      tags: ["Fresh", "Healthy", "Vegetarian"]
    },
    {
      src: fruit,
      title: "Tropical Fruit Display",
      category: "Platters",
      description: "Artfully arranged seasonal tropical fruits with honey-lime drizzle and mint",
      tags: ["Fresh", "Tropical", "Healthy"]
    },
    {
      src: dessert3,
      title: "Signature Dessert Creation",
      category: "Desserts",
      description: "Chef's special dessert featuring multiple textures and flavor profiles",
      tags: ["Signature", "Creative", "Indulgent"]
    },
    {
      src: dessert,
      title: "Classic Dessert Perfection",
      category: "Desserts",
      description: "Timeless dessert executed with modern techniques and premium ingredients",
      tags: ["Classic", "Refined", "Elegant"]
    },

    // Newly added dishes (mapped to provided images in order)
    {
      src: img00011,
      title: "Seafood Bowl",
      category: "Seafood",
      description: "Assorted fresh seafood served over seasoned rice and greens with a bright citrus-ponzu drizzle",
      tags: ["Fresh", "Bowl", "Seafood"]
    },
    {
      src: img00070,
      title: "Pavlova with Fresh Berries",
      category: "Desserts",
      description: "Crisp meringue shell, soft marshmallow center, whipped cream, and seasonal berries",
      tags: ["Meringue", "Light", "Berries"]
    },
    {
      src: img00062,
      title: "Seafood Surf & Turf",
      category: "Mains",
      description: "Grilled prawns paired with tender steak, herb butter, and roasted seasonal vegetables",
      tags: ["Surf & Turf", "Grilled", "Indulgent"]
    },
    {
      src: img00066,
      title: "Tiger Prawns with Carrot Purée & Potato Pancake",
      category: "Seafood",
      description: "Butterflied tiger prawns served on silky carrot purée with a crisp potato pancake",
      tags: ["Fine Dining", "Prawns", "Seafood"]
    },
    {
      src: img00061,
      title: "Smoky Roasted Butternut Soup with Crispy Bacon & Basil Oil",
      category: "Soups",
      description: "Velvety roasted butternut enhanced with smoked notes, topped with crispy bacon and basil oil",
      tags: ["Comfort", "Smoky", "Soup"]
    },
    {
      src: img00006,
      title: "Vanilla Cake",
      category: "Desserts",
      description: "Classic vanilla sponge layered with vanilla bean buttercream",
      tags: ["Classic", "Baking", "Vanilla"]
    },
    {
      src: img00035,
      title: "Margherita Pizza topped with Prosciutto",
      category: "Mains",
      description: "San Marzano tomatoes, fior di latte, basil, finished with ribbons of prosciutto",
      tags: ["Italian", "Pizza", "Crispy Crust"]
    },
    {
      src: img00074,
      title: "Broccoli, Strawberry & Halloumi Salad",
      category: "Vegetarian",
      description: "Charred broccoli, sweet strawberries, grilled halloumi, toasted nuts, and a balsamic glaze",
      tags: ["Fresh", "Salad", "Vegetarian"]
    },
    {
      src: img00057,
      title: "Chocolate Swiss Roll",
      category: "Desserts",
      description: "Soft cocoa sponge rolled with rich chocolate cream and a dusting of cacao",
      tags: ["Chocolate", "Swiss Roll", "Classic"]
    },
    {
      src: img00029,
      title: "Chocolate & Vanilla Cake Loaf",
      category: "Desserts",
      description: "Marbled chocolate-vanilla loaf with a delicate glaze",
      tags: ["Marble", "Loaf", "Baking"]
    },
  ];

  // Additional portfolio items for full portfolio view
  const portfolioItems = [
    ...galleryItems,
    // Additional showcase items when viewing full portfolio
    {
      src: stackMeat3,
      title: "Wagyu Beef Tower",
      category: "Mains",
      description: "A5 Wagyu beef prepared three ways, stacked with truffle potato mille-feuille",
      tags: ["Ultra-Premium", "Wagyu", "Signature"]
    },
    {
      src: platter,
      title: "Safari Sunset Board",
      category: "Platters",
      description: "South African inspired platter with biltong, droëwors, and local cheeses",
      tags: ["Safari", "Local", "Heritage"]
    },
    {
      src: green,
      title: "Microgreens Garden",
      category: "Vegetarian",
      description: "Living microgreens salad harvested tableside with edible soil and flowers",
      tags: ["Interactive", "Farm-to-Table", "Innovative"]
    },
    {
      src: dessert,
      title: "Deconstructed Lemon Tart",
      category: "Desserts",
      description: "Modern interpretation of classic lemon tart with molecular lemon pearls",
      tags: ["Modern", "Molecular", "Citrus"]
    }
  ];

  const categories = ["All", "Mains", "Seafood", "Desserts", "Platters", "Vegetarian", "Soups"];

  const filteredItems = activeCategory === "All" 
    ? (isFullPortfolio ? portfolioItems : galleryItems)
    : (isFullPortfolio ? portfolioItems : galleryItems).filter(item => item.category === activeCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "ArrowLeft") {
        handlePrevious();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImageClick = (imageSrc: string, index: number) => {
    setSelectedImage(imageSrc);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % filteredItems.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(filteredItems[nextIndex].src);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(filteredItems[prevIndex].src);
  };

  const toggleFavorite = (index: number) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(index)) {
      newFavorites.delete(index);
      toast({
        title: "Removed from favorites",
        description: "Item removed from your favorites",
      });
    } else {
      newFavorites.add(index);
      toast({
        title: "Added to favorites",
        description: "Item added to your favorites",
      });
    }
    setFavorites(newFavorites);
  };

  const handleDownload = () => {
    if (selectedImage) {
      const link = document.createElement('a');
      link.href = selectedImage;
      link.download = `chef-denzel-${filteredItems[currentIndex].title.replace(/\s+/g, '-').toLowerCase()}.jpg`;
      link.click();
      toast({
        title: "Download Started",
        description: "Image is being downloaded",
      });
    }
  };

  const handleShare = async () => {
    const currentItem = filteredItems[currentIndex];
    const shareData = {
      title: currentItem.title,
      text: `Check out this amazing dish by Chef Denzel Moyo: ${currentItem.description}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied",
        description: "Gallery link copied to clipboard",
      });
    }
  };

  const handleViewFullPortfolio = () => {
    setIsFullPortfolio(true);
    toast({
      title: "Full Portfolio View",
      description: "Now viewing complete culinary portfolio",
    });
  };

  return (
    <>
      <section id="gallery" className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
              Culinary Masterpieces
            </h2>
            <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
              Every dish tells a story. Browse through my signature creations and 
              experience the artistry that goes into each culinary masterpiece.
            </p>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-gold">{portfolioItems.length}+</div>
              <div className="text-foreground/70 text-sm">Dishes Created</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-gold">{categories.length}</div>
              <div className="text-foreground/70 text-sm">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-warm-gold">{favorites.size}</div>
              <div className="text-foreground/70 text-sm">Favorites</div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className="transition-all duration-300"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {filteredItems.map((item, index) => (
              <Card 
                key={index} 
                className="group overflow-hidden border-none shadow-soft hover:shadow-elegant transition-all duration-500 cursor-pointer relative"
                onClick={() => handleImageClick(item.src, index)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-hero opacity-0 group-hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <ZoomIn className="h-8 w-8 text-background" />
                  </div>
                  <div className="absolute top-2 right-2 flex gap-1">
                    <span className="bg-warm-gold text-primary text-xs px-2 py-1 rounded-full font-medium">
                      {item.category}
                    </span>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-6 w-6 bg-background/80 hover:bg-background"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(index);
                      }}
                    >
                      <Heart 
                        className={`h-3 w-3 ${favorites.has(index) ? 'fill-red-500 text-red-500' : 'text-foreground'}`} 
                      />
                    </Button>
                  </div>
                  {/* Tags */}
                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                    {item.tags.slice(0, 2).map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-background/80 text-foreground text-xs px-2 py-1 rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-2 line-clamp-2">{item.title}</h3>
                  <p className="text-foreground/60 text-xs line-clamp-2">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* View More / Back Button */}
          <div className="text-center">
            {!isFullPortfolio ? (
              <Button 
                size="lg" 
                variant="outline" 
                className="group"
                onClick={handleViewFullPortfolio}
              >
                View Full Portfolio
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            ) : (
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setIsFullPortfolio(false)}
                >
                  Back to Featured
                </Button>
                <Button 
                  size="lg"
                  onClick={() => {
                    sessionStorage.setItem('selectedService', JSON.stringify({
                      eventType: 'consultation',
                      serviceTitle: 'Menu Consultation'
                    }));
                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Book a Tasting
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-primary/95 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div 
            className="relative max-w-6xl max-h-[90vh] w-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Container */}
            <div className="relative flex-1 flex items-center justify-center">
              <img
                src={selectedImage}
                alt={filteredItems[currentIndex]?.title}
                className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-elegant"
              />
              
              {/* Navigation Arrows */}
              <Button
                variant="secondary"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={handlePrevious}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background"
                onClick={handleNext}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>

              {/* Action Buttons */}
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleDownload}
                  className="bg-background/80 hover:bg-background"
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-background/80 hover:bg-background"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => toggleFavorite(currentIndex)}
                  className="bg-background/80 hover:bg-background"
                >
                  <Heart 
                    className={`h-4 w-4 ${favorites.has(currentIndex) ? 'fill-red-500 text-red-500' : ''}`} 
                  />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={() => setSelectedImage(null)}
                  className="bg-background/80 hover:bg-background"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Image Info */}
            <div className="bg-background/90 backdrop-blur-sm p-6 rounded-b-lg mt-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-xl font-bold text-foreground">
                  {filteredItems[currentIndex]?.title}
                </h3>
                <span className="bg-warm-gold text-primary text-sm px-3 py-1 rounded-full font-medium">
                  {filteredItems[currentIndex]?.category}
                </span>
              </div>
              <p className="text-foreground/70 mb-3">
                {filteredItems[currentIndex]?.description}
              </p>
              <div className="flex flex-wrap gap-1 mb-4">
                {filteredItems[currentIndex]?.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="bg-warm-gold/20 text-warm-gold text-xs px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-foreground/60 text-sm">
                {currentIndex + 1} of {filteredItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Gallery;