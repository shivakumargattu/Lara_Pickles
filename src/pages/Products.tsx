
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Products = () => {
  const navigate = useNavigate();
  
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-8 text-center">
          Our Premium Pickles
        </h1>
        
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full">
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
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter by Price" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under10">Under $10</SelectItem>
                <SelectItem value="over10">$10 and Above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="font-semibold text-green-800 mb-2 text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-bold text-green-600">${product.price}</p>
                    <Button 
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No products found matching your filters.</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Products;
