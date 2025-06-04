
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Eye, Filter, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Products = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('user') !== null;
  
  const [products] = useState([
    {
      id: 1,
      name: "Classic Dill Pickles",
      price: 8.99,
      category: "dill",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Traditional dill pickles with a perfect crunch and authentic flavor.",
      rating: 4.8,
      reviews: 124
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Fire up your taste buds with these bold and spicy jalapeño pickles.",
      rating: 4.9,
      reviews: 98
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Sweet and tangy with a hint of onion, perfect for sandwiches.",
      rating: 4.7,
      reviews: 156
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      category: "dill",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Rich garlic flavor in every bite, following traditional kosher methods.",
      rating: 4.8,
      reviews: 89
    },
    {
      id: 5,
      name: "Spicy Habanero Heat",
      price: 11.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "For the brave! Intense habanero heat with incredible flavor.",
      rating: 4.6,
      reviews: 67
    },
    {
      id: 6,
      name: "Honey Mustard Pickles",
      price: 8.49,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Unique blend of honey and mustard creates a delightful taste.",
      rating: 4.5,
      reviews: 78
    }
  ]);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const filteredProducts = products.filter(product => {
    const categoryMatch = categoryFilter === "all" || product.category === categoryFilter;
    const priceMatch = priceFilter === "all" || 
      (priceFilter === "under10" && product.price < 10) ||
      (priceFilter === "over10" && product.price >= 10);
    
    return categoryMatch && priceMatch;
  });

  const addToCart = (product, e) => {
    e.stopPropagation();
    
    if (!isLoggedIn) {
      toast({
        title: "Login Required",
        description: "Please login to add items to your cart.",
        variant: "destructive"
      });
      return;
    }

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    toast({
      title: "Added to Cart! 🛒",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-gray to-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold text-gradient-navy mb-6">
            Premium Pickle Collection
          </h1>
          <p className="text-charcoal/70 text-xl max-w-3xl mx-auto leading-relaxed">
            Handcrafted with <span className="text-gradient-gold font-semibold">love and tradition</span> in Hyderabad, 
            each jar tells a story of authentic flavors and premium quality
          </p>
          <div className="flex items-center justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-gold text-gold" />
            ))}
            <span className="text-charcoal/70 ml-2 text-lg">4.8/5 Average Rating</span>
          </div>
        </div>
        
        {/* Premium Filters */}
        <div className="flex flex-col md:flex-row gap-6 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex-1">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gold w-5 h-5" />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12 pl-10 bg-white/80 backdrop-blur-sm">
                  <SelectValue placeholder="Filter by Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="dill">Dill Pickles</SelectItem>
                  <SelectItem value="spicy">Spicy Pickles</SelectItem>
                  <SelectItem value="sweet">Sweet Pickles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex-1">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12 bg-white/80 backdrop-blur-sm">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under10">Under ₹800</SelectItem>
                <SelectItem value="over10">₹800 and Above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Premium Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover-lift cursor-pointer border-0 bg-white/90 backdrop-blur-sm premium-shadow hover:premium-shadow-lg transition-all duration-500 animate-scale-in-premium overflow-hidden"
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Premium Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      className="bg-white/95 text-deep-navy hover:bg-white hover:text-gold rounded-full p-3 backdrop-blur-sm premium-shadow"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="btn-gold text-deep-navy rounded-full p-3 premium-shadow"
                      onClick={(e) => addToCart(product, e)}
                      disabled={!isLoggedIn}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-premium text-gold px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider premium-shadow">
                      {product.category}
                    </span>
                  </div>
                  
                  {/* Rating Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-white/95 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 premium-shadow">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-deep-navy font-semibold text-sm">{product.rating}</span>
                      <span className="text-charcoal/60 text-xs">({product.reviews})</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-charcoal mb-3 text-xl group-hover:text-gradient-gold transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-charcoal/70 text-sm mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-3xl font-bold text-gradient-gold">
                      ₹{(product.price * 80).toFixed(0)}
                    </p>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-gold text-gold" />
                      <span className="text-charcoal/70 text-sm">{product.rating}</span>
                    </div>
                  </div>
                  <Button 
                    size="sm"
                    className="w-full btn-premium text-gold border-gold hover:bg-gold hover:text-deep-navy transition-all duration-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/product/${product.id}`);
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 animate-fade-in-up">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                <span className="text-4xl">🥒</span>
              </div>
              <h3 className="text-3xl font-bold text-gradient-navy mb-4">No pickles found</h3>
              <p className="text-charcoal/70 mb-8 text-lg">Try adjusting your filters to discover more delicious options.</p>
              <Button 
                onClick={() => {
                  setCategoryFilter("all");
                  setPriceFilter("all");
                }}
                className="btn-gold text-deep-navy px-8 py-3"
              >
                Clear All Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
