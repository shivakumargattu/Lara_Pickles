
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Eye } from "lucide-react";
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
      description: "Traditional dill pickles with a perfect crunch and authentic flavor."
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Fire up your taste buds with these bold and spicy jalapeño pickles."
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Sweet and tangy with a hint of onion, perfect for sandwiches."
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      category: "dill",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Rich garlic flavor in every bite, following traditional kosher methods."
    },
    {
      id: 5,
      name: "Spicy Habanero Heat",
      price: 11.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "For the brave! Intense habanero heat with incredible flavor."
    },
    {
      id: 6,
      name: "Honey Mustard Pickles",
      price: 8.49,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Unique blend of honey and mustard creates a delightful taste."
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Our Premium Pickles Collection
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Handcrafted with love in Hyderabad, each jar tells a story of tradition and flavor
          </p>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="flex-1">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full border-emerald-200 focus:border-emerald-400 transition-all duration-300">
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
          
          <div className="flex-1">
            <Select value={priceFilter} onValueChange={setPriceFilter}>
              <SelectTrigger className="w-full border-emerald-200 focus:border-emerald-400 transition-all duration-300">
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

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border-0 bg-white/80 backdrop-blur-sm animate-fade-in overflow-hidden"
              style={{ animationDelay: `${0.1 * index}s` }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <CardContent className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Action Buttons */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <Button
                      size="sm"
                      className="bg-white/90 text-emerald-600 hover:bg-white hover:text-emerald-700 rounded-full p-2 backdrop-blur-sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/product/${product.id}`);
                      }}
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-full p-2 shadow-lg"
                      onClick={(e) => addToCart(product, e)}
                      disabled={!isLoggedIn}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider shadow-lg">
                      {product.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-bold text-gray-800 mb-2 text-xl group-hover:text-emerald-600 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ₹{(product.price * 80).toFixed(0)}
                    </p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        className="border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/product/${product.id}`);
                        }}
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🥒</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No pickles found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to discover more delicious options.</p>
              <Button 
                onClick={() => {
                  setCategoryFilter("all");
                  setPriceFilter("all");
                }}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white"
              >
                Clear Filters
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
