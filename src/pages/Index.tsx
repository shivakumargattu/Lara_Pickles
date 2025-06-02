
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const navigate = useNavigate();
  const [featuredProducts] = useState([
    {
      id: 1,
      name: "Classic Dill Pickles",
      price: 8.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Traditional dill pickles with a perfect crunch"
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Fire up your taste buds with these spicy pickles"
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Sweet and tangy with a hint of onion"
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop",
      description: "Rich garlic flavor in every bite"
    }
  ]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 to-green-100 py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Premium Artisanal Pickles
          </h1>
          <p className="text-lg md:text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Handcrafted with love using the finest ingredients. Experience the perfect blend of tradition and flavor in every jar.
          </p>
          <Button 
            onClick={() => navigate('/products')}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
          >
            Shop Now
          </Button>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-green-800 mb-12">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                <CardContent className="p-0">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-green-800 mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                    <p className="text-lg font-bold text-green-600">${product.price}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button 
              onClick={() => navigate('/products')}
              variant="outline"
              className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            >
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-green-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">
              Why Choose Our Pickles?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🥒</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Fresh Ingredients</h3>
                <p className="text-gray-600">Only the finest, locally-sourced vegetables</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">🏺</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">Traditional Methods</h3>
                <p className="text-gray-600">Time-honored recipes passed down generations</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-2xl">💚</span>
                </div>
                <h3 className="font-semibold text-green-800 mb-2">No Preservatives</h3>
                <p className="text-gray-600">All natural with no artificial additives</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
