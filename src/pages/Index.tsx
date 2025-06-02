
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Award, Truck } from "lucide-react";

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
      <section className="relative bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <div className="w-full h-full bg-emerald-600 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                Lara Pickles
              </span>
            </h1>
            <div className="text-lg md:text-xl text-gray-600 mb-4">
              <span className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                📍 Proudly serving Hyderabad with authentic flavors
              </span>
            </div>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
              Handcrafted with love using the finest ingredients. Experience the perfect blend of tradition and flavor in every jar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-bounce-in" style={{ animationDelay: '0.4s' }}>
              <Button 
                onClick={() => navigate('/products')}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-10 py-4 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Our Pickles 🥒
              </Button>
              <Button 
                onClick={() => navigate('/order-status')}
                variant="outline"
                className="border-2 border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white px-10 py-4 text-xl font-semibold rounded-full transition-all duration-300"
              >
                Track Your Order
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}>
          <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-70"></div>
        </div>
        <div className="absolute bottom-32 right-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '4s' }}>
          <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-60"></div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 md:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Featured Delicacies
              </span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most loved pickle varieties, each crafted with authentic Hyderabadi tradition
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <Card 
                key={product.id} 
                className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 cursor-pointer border-0 bg-white shadow-lg animate-scale-in overflow-hidden"
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold">4.9</span>
                    </div>
                    
                    {/* Price Badge */}
                    <div className="absolute bottom-4 left-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                      ₹{(product.price * 80).toFixed(0)}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-emerald-600 transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-16 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-12 py-4 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              View All Our Pickles
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 py-20 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Why Choose Lara Pickles?
                </span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                From the heart of Hyderabad, we bring you pickles that celebrate authentic flavors and traditional craftsmanship
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center group animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-white text-3xl">🥒</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-4 text-xl">Fresh Ingredients</h3>
                <p className="text-gray-600 leading-relaxed">
                  Only the finest, locally-sourced vegetables from Telangana's fertile farms
                </p>
              </div>
              
              <div className="text-center group animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Award className="text-white text-3xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-4 text-xl">Traditional Methods</h3>
                <p className="text-gray-600 leading-relaxed">
                  Time-honored Hyderabadi recipes passed down through generations
                </p>
              </div>
              
              <div className="text-center group animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <Truck className="text-white text-3xl" />
                </div>
                <h3 className="font-bold text-gray-800 mb-4 text-xl">Fast Delivery</h3>
                <p className="text-gray-600 leading-relaxed">
                  Quick delivery across Hyderabad and surrounding areas with care
                </p>
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
