
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  
  const isLoggedIn = localStorage.getItem('user') !== null;

  const products = [
    {
      id: 1,
      name: "Classic Dill Pickles",
      price: 8.99,
      category: "dill",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "Our signature classic dill pickles are made using a time-honored recipe that has been passed down through generations. Each cucumber is carefully selected for its perfect size and crispness, then brined in our special blend of dill, garlic, and spices. The result is a pickle with the perfect balance of tangy and savory flavors, with a satisfying crunch that will keep you coming back for more. These pickles are perfect as a snack, side dish, or sandwich topping."
    },
    {
      id: 2,
      name: "Spicy Jalapeño Pickles",
      price: 9.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "For those who love heat with their flavor, our Spicy Jalapeño Pickles deliver the perfect kick. Fresh jalapeños are combined with our signature pickling blend and a touch of extra spice to create a pickle that's both hot and flavorful. The heat builds gradually, allowing you to enjoy the complex flavors before the spice hits. These pickles are excellent on their own, chopped into salads, or as a fiery addition to your favorite burger or sandwich."
    },
    {
      id: 3,
      name: "Sweet Bread & Butter",
      price: 7.99,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "A delightful twist on the traditional pickle, our Sweet Bread & Butter pickles offer a perfect balance of sweet and tangy flavors. Made with fresh cucumbers, onions, and our special blend of sweet spices, these pickles have a unique taste that's both nostalgic and refreshing. The hint of sweetness makes them an excellent complement to savory dishes, and they're particularly popular on sandwiches and burgers where they add a bright, flavorful contrast."
    },
    {
      id: 4,
      name: "Garlic Kosher Pickles",
      price: 9.49,
      category: "dill",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "Our Garlic Kosher Pickles are prepared following traditional kosher methods, ensuring both authenticity and exceptional flavor. Each pickle is infused with generous amounts of fresh garlic, creating a bold, aromatic taste that garlic lovers will adore. The pickling process follows time-tested kosher guidelines, resulting in pickles that are not only delicious but also true to tradition. The robust garlic flavor makes these pickles a standout choice for those who appreciate bold, authentic tastes."
    },
    {
      id: 5,
      name: "Spicy Habanero Heat",
      price: 11.99,
      category: "spicy",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "WARNING: These are not for the faint of heart! Our Spicy Habanero Heat pickles are crafted for serious heat enthusiasts who don't want to sacrifice flavor for fire. Fresh habanero peppers are carefully balanced with our signature pickling blend to create a pickle that delivers intense heat while maintaining complex, nuanced flavors. Each bite provides a rush of endorphin-inducing spice that will challenge even the most seasoned spice lovers. Proceed with caution and have milk ready!"
    },
    {
      id: 6,
      name: "Honey Mustard Pickles",
      price: 8.49,
      category: "sweet",
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=600&h=400&fit=crop",
      description: "A unique and innovative creation, our Honey Mustard Pickles combine the tangy goodness of traditional pickles with the sweet and savory flavors of honey mustard. This creative blend results in a pickle that's both familiar and surprisingly new. The natural sweetness of honey perfectly complements the sharp tang of mustard and the crisp freshness of the pickle, creating a flavor profile that's complex yet approachable. These pickles are perfect for adventurous eaters and make an excellent conversation starter at any gathering."
    }
  ];

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const addToCart = () => {
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
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Product not found</h1>
          <Button 
            onClick={() => navigate('/products')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            Back to Products
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          onClick={() => navigate('/products')}
          variant="outline"
          className="mb-6 border-green-600 text-green-600"
        >
          ← Back to Products
        </Button>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div>
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
          
          {/* Product Details */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-4">
              {product.name}
            </h1>
            
            <p className="text-2xl font-bold text-green-600 mb-6">
              ${product.price}
            </p>
            
            <div className="mb-6">
              <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium capitalize">
                {product.category} Pickle
              </span>
            </div>
            
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="space-y-4">
              <Button 
                onClick={addToCart}
                disabled={!isLoggedIn}
                className={`w-full md:w-auto px-8 py-3 text-lg ${
                  isLoggedIn 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
              >
                {isLoggedIn ? 'Add to Cart' : 'Login Required to Add to Cart'}
              </Button>
              
              {!isLoggedIn && (
                <p className="text-sm text-gray-600">
                  <Button 
                    onClick={() => navigate('/login')}
                    variant="link"
                    className="text-green-600 p-0 h-auto"
                  >
                    Login
                  </Button>
                  {' '}or{' '}
                  <Button 
                    onClick={() => navigate('/register')}
                    variant="link"
                    className="text-green-600 p-0 h-auto"
                  >
                    register
                  </Button>
                  {' '}to add items to your cart.
                </p>
              )}
            </div>
            
            {/* Product Features */}
            <div className="mt-8 border-t pt-8">
              <h3 className="text-lg font-semibold text-green-800 mb-4">Product Features</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ Made with fresh, locally-sourced ingredients</li>
                <li>✓ No artificial preservatives or additives</li>
                <li>✓ Traditional pickling methods</li>
                <li>✓ Perfect crunch and flavor balance</li>
                <li>✓ Handcrafted in small batches</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
