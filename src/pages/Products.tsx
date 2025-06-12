
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star } from "lucide-react";

const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");

  const products = [
    {
      id: 1,
      name: "Classic Dill Pickles",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Traditional dill pickles with a perfect crunch and authentic flavor. Made with fresh cucumbers and aromatic dill.",
      rating: 4.9,
      category: "classic"
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Fire up your taste buds with these premium spicy pickles. Perfect heat level with authentic jalapeño flavor.",
      rating: 4.8,
      category: "spicy"
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Sweet and tangy with a hint of caramelized onion. A perfect balance of flavors that melts in your mouth.",
      rating: 4.9,
      category: "sweet"
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Rich garlic flavor infused in every premium bite. Traditional kosher preparation with modern twist.",
      rating: 4.7,
      category: "garlic"
    },
    {
      id: 5,
      name: "Mango Pickle Delight",
      price: 10.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Authentic Hyderabadi mango pickle with traditional spices. A burst of tangy and spicy flavors.",
      rating: 4.8,
      category: "traditional"
    },
    {
      id: 6,
      name: "Lemon Pickle Special",
      price: 8.49,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Tangy lemon pickle with aromatic spices. Made with fresh lemons and traditional Hyderabadi recipes.",
      rating: 4.6,
      category: "traditional"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === "all" || product.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      default:
        return a.name.localeCompare(b.name);
    }
  });

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-premium py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-gradient-gold">Premium</span>
              <br />
              <span className="text-cream">Pickle Collection</span>
            </h1>
            <p className="text-cream/80 text-xl max-w-3xl mx-auto leading-relaxed">
              Discover our handcrafted pickle varieties, each made with authentic Hyderabadi traditions and the finest ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search pickles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gold focus:border-gold h-12"
              />
            </div>

            {/* Filters */}
            <div className="flex gap-4">
              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="w-48 border-gold focus:border-gold h-12">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="classic">Classic</SelectItem>
                  <SelectItem value="spicy">Spicy</SelectItem>
                  <SelectItem value="sweet">Sweet</SelectItem>
                  <SelectItem value="garlic">Garlic</SelectItem>
                  <SelectItem value="traditional">Traditional</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 border-gold focus:border-gold h-12">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {sortedProducts.length > 0 ? (
            <>
              <div className="text-center mb-12 animate-fade-in-up">
                <div className="flex justify-center mb-4">
                  <div className="flex items-center gap-2 bg-gold/10 px-4 py-2 rounded-full">
                    <Star className="w-5 h-5 text-gold" />
                    <span className="text-charcoal font-medium">
                      {sortedProducts.length} Premium Pickles
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
                <Search className="w-12 h-12 text-deep-navy" />
              </div>
              <h3 className="text-3xl font-bold text-gradient-navy mb-4">No Pickles Found</h3>
              <p className="text-charcoal/70 text-lg mb-8">
                Try adjusting your search or filter criteria
              </p>
              <Button 
                onClick={() => {
                  setSearchTerm("");
                  setFilterBy("all");
                }}
                className="btn-gold text-deep-navy px-8 py-3"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;
