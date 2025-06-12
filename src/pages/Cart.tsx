
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Cart Updated",
      description: "Item quantity has been updated.",
    });
  };

  const removeItem = (id: number) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const proceedToOrder = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to your cart before placing an order.",
        variant: "destructive"
      });
      return;
    }

    if (!user) {
      toast({
        title: "Login Required",
        description: "Please login to place an order.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }

    setLoading(true);
    // Simulate order processing
    setTimeout(() => {
      localStorage.setItem('cart', '[]');
      setLoading(false);
      toast({
        title: "Order Placed!",
        description: "Your order has been placed successfully.",
      });
      navigate('/order-success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-cream">
        <Navbar />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center py-20 animate-fade-in-up">
            <div className="w-24 h-24 bg-gradient-gold rounded-full flex items-center justify-center mx-auto mb-8 animate-glow">
              <ShoppingBag className="w-12 h-12 text-deep-navy" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient-navy mb-6">
              Your Cart is Empty
            </h1>
            <p className="text-charcoal/70 text-xl mb-8 max-w-md mx-auto">
              Looks like you haven't added any delicious pickles to your cart yet.
            </p>
            <Button 
              onClick={() => navigate('/products')}
              className="btn-gold text-deep-navy px-8 py-4 text-lg font-semibold"
            >
              Discover Our Pickles
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-navy mb-4">
            Shopping Cart
          </h1>
          <p className="text-charcoal/70 text-lg">
            Review your premium pickle selection
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item, index) => (
              <Card 
                key={item.id}
                className="hover-lift bg-white border-0 premium-shadow animate-scale-in-premium"
                style={{ animationDelay: `${0.1 * index}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg premium-shadow"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-bold text-charcoal mb-2 text-xl">{item.name}</h3>
                      <p className="text-charcoal/70 mb-4">₹{(item.price * 80).toFixed(0)} each</p>
                      
                      <div className="flex items-center gap-3">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          size="sm"
                          variant="outline"
                          className="h-10 w-10 p-0 border-gold hover:bg-gold hover:text-deep-navy"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-20 h-10 text-center border-gold focus:border-gold"
                          min="0"
                        />
                        
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          size="sm"
                          variant="outline"
                          className="h-10 w-10 p-0 border-gold hover:bg-gold hover:text-deep-navy"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-bold text-gold mb-4 text-2xl">
                        ₹{((item.price * 80) * item.quantity).toFixed(0)}
                      </p>
                      <Button
                        onClick={() => removeItem(item.id)}
                        size="sm"
                        variant="outline"
                        className="text-red-600 border-red-600 hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Order Summary */}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="bg-white border-0 premium-shadow sticky top-24">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gradient-navy mb-6">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-charcoal/80">
                      <span>{item.name} x{item.quantity}</span>
                      <span>₹{((item.price * 80) * item.quantity).toFixed(0)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gold/20 pt-6 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-semibold text-charcoal">Total:</span>
                    <span className="text-2xl font-bold text-gold">
                      ₹{(getTotalPrice() * 80).toFixed(0)}
                    </span>
                  </div>
                  <p className="text-charcoal/60 text-sm mt-2">
                    Free delivery across Hyderabad
                  </p>
                </div>
                
                <Button 
                  onClick={proceedToOrder}
                  disabled={loading}
                  className="w-full btn-gold text-deep-navy font-semibold text-lg py-4 mb-4"
                >
                  {loading ? 'Processing...' : 'Place Order'}
                </Button>
                
                <Button 
                  onClick={() => navigate('/products')}
                  variant="outline"
                  className="w-full border-gold text-gold hover:bg-gold hover:text-deep-navy"
                >
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Cart;
