
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TestimonialsSection from "@/components/TestimonialsSection";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Truck, Shield, Heart, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Classic Dill Pickles",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Traditional dill pickles with a perfect crunch and authentic flavor",
      rating: 4.9
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Fire up your taste buds with these premium spicy pickles",
      rating: 4.8
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Sweet and tangy with a hint of caramelized onion",
      rating: 4.9
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Rich garlic flavor infused in every premium bite",
      rating: 4.7
    }
  ]);

  const handleExploreProducts = () => {
    toast({
      title: "Premium Collection Awaits! ✨",
      description: "Discover our handcrafted pickle varieties...",
    });
    setTimeout(() => navigate('/products'), 500);
  };

  const handleTrackOrder = () => {
    toast({
      title: "Order Tracking",
      description: "Check your premium order status",
    });
    setTimeout(() => navigate('/order-status'), 500);
  };

  const handleViewAllProducts = () => {
    toast({
      title: "Complete Collection! 🌟",
      description: "Explore our entire premium range",
    });
    setTimeout(() => navigate('/products'), 500);
  };

  const handleProductClick = (productId: number, productName: string) => {
    toast({
      title: `${productName} Selected!`,
      description: "View premium details and add to cart",
    });
    setTimeout(() => navigate(`/product/${productId}`), 500);
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-cream via-warm-gray to-cream py-24 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute bottom-32 right-20 w-24 h-24 bg-deep-navy/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gold/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in-up">
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full premium-shadow border border-gold/20">
                <Sparkles className="w-5 h-5 text-gold animate-glow" />
                <span className="text-charcoal font-medium">Premium Artisanal Pickles</span>
                <Sparkles className="w-5 h-5 text-gold animate-glow" />
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
              <span className="text-gradient-navy block">Lara</span>
              <span className="text-gradient-gold block">Pickles</span>
            </h1>
            
            <div className="text-lg md:text-xl text-charcoal/70 mb-4">
              <span className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full premium-shadow border border-gold/20">
                <Award className="w-5 h-5 text-gold" />
                Handcrafted in the Heart of Hyderabad
                <Heart className="w-5 h-5 text-gold" />
              </span>
            </div>
            
            <p className="text-xl md:text-2xl text-charcoal/80 mb-12 max-w-4xl mx-auto leading-relaxed animate-slide-in-blur" style={{ animationDelay: '0.3s' }}>
              Experience the perfect harmony of tradition and premium quality. Each jar tells a story of authentic Hyderabadi flavors, crafted with the finest ingredients and generations of expertise.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-scale-in-premium" style={{ animationDelay: '0.6s' }}>
              <Button 
                onClick={handleExploreProducts}
                className="btn-gold text-deep-navy px-12 py-6 text-xl font-bold rounded-full hover-glow text-center"
              >
                Discover Premium Collection ✨
              </Button>
              <Button 
                onClick={handleTrackOrder}
                className="btn-premium text-cream px-12 py-6 text-xl font-semibold rounded-full text-center"
              >
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 animate-fade-in-up">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full">
                <Star className="w-5 h-5 text-gold" />
                <span className="text-charcoal font-medium">Premium Selection</span>
              </div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="text-gradient-navy">Featured</span>
              <br />
              <span className="text-gradient-gold">Delicacies</span>
            </h2>
            <p className="text-charcoal/70 text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our most celebrated pickle varieties, each meticulously crafted using authentic Hyderabadi traditions and premium ingredients
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group hover-lift cursor-pointer border-0 bg-white premium-shadow hover:premium-shadow-lg transition-all duration-500 animate-scale-in-premium overflow-hidden"
                style={{ animationDelay: `${0.15 * index}s` }}
                onClick={() => handleProductClick(product.id, product.name)}
              >
                <CardContent className="p-0 relative">
                  <div className="relative overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-1 premium-shadow">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-sm font-bold text-charcoal">{product.rating}</span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-gold text-deep-navy px-4 py-2 rounded-full font-bold premium-shadow animate-glow">
                      ₹{(product.price * 80).toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-charcoal mb-3 text-xl group-hover:text-deep-navy transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-charcoal/70 leading-relaxed line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-charcoal/60 bg-gold/10 px-2 py-1 rounded-full">Premium</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <Button 
              onClick={handleViewAllProducts}
              className="btn-premium text-cream px-16 py-6 text-lg font-semibold rounded-full"
            >
              View Complete Premium Collection
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-cream py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20 animate-fade-in-up">
              <div className="flex justify-center mb-6">
                <div className="flex items-center gap-2 bg-gold/20 px-4 py-2 rounded-full">
                  <Award className="w-5 h-5 text-gold" />
                  <span className="text-charcoal font-medium">Why Choose Excellence</span>
                </div>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8">
                <span className="text-gradient-navy">Crafted with</span>
                <br />
                <span className="text-gradient-gold">Passion & Precision</span>
              </h2>
              <p className="text-charcoal/70 text-xl max-w-3xl mx-auto leading-relaxed">
                From the vibrant streets of Hyderabad, we bring you pickles that celebrate authentic flavors, traditional craftsmanship, and uncompromising quality
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
                <div className="w-24 h-24 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:animate-glow transition-all duration-500 premium-shadow">
                  <Heart className="text-deep-navy text-4xl" />
                </div>
                <h3 className="font-bold text-charcoal mb-6 text-2xl">Premium Ingredients</h3>
                <p className="text-charcoal/70 leading-relaxed text-lg">
                  Hand-selected vegetables from Telangana's finest farms, combined with authentic spices and traditional recipes passed down through generations.
                </p>
              </div>
              
              <div className="text-center group animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-24 h-24 bg-gradient-to-br from-deep-navy to-rich-navy rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 premium-shadow">
                  <Award className="text-gold text-4xl" />
                </div>
                <h3 className="font-bold text-charcoal mb-6 text-2xl">Artisanal Craftsmanship</h3>
                <p className="text-charcoal/70 leading-relaxed text-lg">
                  Time-honored Hyderabadi techniques refined over decades, ensuring each jar delivers the perfect balance of flavor, texture, and authenticity.
                </p>
              </div>
              
              <div className="text-center group animate-fade-in-right" style={{ animationDelay: '0.6s' }}>
                <div className="w-24 h-24 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:animate-glow transition-all duration-500 premium-shadow">
                  <Truck className="text-deep-navy text-4xl" />
                </div>
                <h3 className="font-bold text-charcoal mb-6 text-2xl">Premium Delivery</h3>
                <p className="text-charcoal/70 leading-relaxed text-lg">
                  Swift, secure delivery across Hyderabad and beyond, with premium packaging that preserves freshness and ensures your pickles arrive in perfect condition.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      <Footer />
    </div>
  );
};

export default Index;
