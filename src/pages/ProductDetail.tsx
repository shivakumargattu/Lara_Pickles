
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ArrowLeft, Plus, Minus, Heart, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in real app this would come from API
  const product = {
    id: parseInt(id || "1"),
    name: "Classic Dill Pickles",
    price: 8.99,
    image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
    description: "Traditional dill pickles with a perfect crunch and authentic flavor. Made with fresh cucumbers and aromatic dill.",
    rating: 4.9,
    reviews: 127,
    category: "Classic",
    ingredients: ["Fresh Cucumbers", "Dill", "Garlic", "Vinegar", "Sea Salt", "Natural Spices"],
    nutritionFacts: {
      calories: 5,
      sodium: "230mg",
      carbs: "1g",
      fiber: "0g",
      sugars: "0g"
    },
    features: [
      "100% Natural Ingredients",
      "No Artificial Preservatives",
      "Handcrafted in Small Batches",
      "Traditional Hyderabadi Recipe",
      "Premium Quality Guaranteed"
    ]
  };

  const addToCart = () => {
    setIsAdding(true);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setTimeout(() => {
      setIsAdding(false);
      toast({
        title: "Added to Cart! 🥒",
        description: `${quantity} ${product.name}(s) added to your cart.`,
      });
    }, 800);
  };

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from Favorites" : "Added to Favorites",
      description: isFavorite ? "Item removed from your favorites." : "Item added to your favorites.",
    });
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Link Copied!",
        description: "Product link copied to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          onClick={() => navigate('/products')}
          variant="outline"
          className="mb-8 border-gold text-gold hover:bg-gold hover:text-deep-navy animate-fade-in-left"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="animate-fade-in-left">
            <div className="relative">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-96 md:h-[500px] object-cover rounded-2xl premium-shadow"
              />
              <Badge className="absolute top-4 left-4 bg-gradient-gold text-deep-navy font-bold px-4 py-2">
                Premium Quality
              </Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  onClick={toggleFavorite}
                  size="sm"
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-gold hover:bg-gold hover:text-deep-navy"
                >
                  <Heart className={`w-4 h-4 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  onClick={shareProduct}
                  size="sm"
                  variant="outline"
                  className="bg-white/90 backdrop-blur-sm border-gold hover:bg-gold hover:text-deep-navy"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="animate-fade-in-right">
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="border-gold text-gold mb-4">
                  {product.category}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold text-gradient-navy mb-4">
                  {product.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
                    ))}
                  </div>
                  <span className="text-charcoal/70">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="text-3xl font-bold text-gold mb-6">
                ₹{(product.price * 80).toFixed(0)}
                <span className="text-lg text-charcoal/60 ml-2">per jar</span>
              </div>

              <p className="text-charcoal/80 text-lg leading-relaxed">
                {product.description}
              </p>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="text-charcoal font-medium">Quantity:</span>
                <div className="flex items-center gap-3">
                  <Button
                    onClick={() => updateQuantity(quantity - 1)}
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 border-gold hover:bg-gold hover:text-deep-navy"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="text-xl font-semibold text-charcoal w-8 text-center">
                    {quantity}
                  </span>
                  <Button
                    onClick={() => updateQuantity(quantity + 1)}
                    size="sm"
                    variant="outline"
                    className="h-10 w-10 p-0 border-gold hover:bg-gold hover:text-deep-navy"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={addToCart}
                disabled={isAdding}
                className="w-full btn-gold text-deep-navy font-semibold text-lg py-4"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {isAdding ? 'Adding to Cart...' : `Add ${quantity} to Cart - ₹${((product.price * 80) * quantity).toFixed(0)}`}
              </Button>

              {/* Product Features */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-gold" />
                    <span className="text-charcoal/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {/* Ingredients */}
          <Card className="bg-white border-0 premium-shadow animate-fade-in-up">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gradient-navy mb-6">Ingredients</h3>
              <div className="grid grid-cols-2 gap-3">
                {product.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full"></div>
                    <span className="text-charcoal/80">{ingredient}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Nutrition Facts */}
          <Card className="bg-white border-0 premium-shadow animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gradient-navy mb-6">Nutrition Facts</h3>
              <div className="space-y-3">
                {Object.entries(product.nutritionFacts).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-center">
                    <span className="text-charcoal/80 capitalize">{key}:</span>
                    <span className="font-semibold text-charcoal">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
