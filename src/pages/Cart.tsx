
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
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
    navigate('/place-order');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-3xl font-bold text-green-800 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any pickles to your cart yet.</p>
            <Button 
              onClick={() => navigate('/products')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Shop Pickles
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    
                    <div className="flex-1">
                      <h3 className="font-semibold text-green-800 mb-1">{item.name}</h3>
                      <p className="text-gray-600 text-sm mb-2">${item.price} each</p>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 0)}
                          className="w-16 h-8 text-center"
                          min="0"
                        />
                        
                        <Button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          size="sm"
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className="font-semibold text-green-600 mb-2">
                        ${(item.price * item.quantity).toFixed(2)}
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
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Order Summary</h3>
                
                <div className="space-y-2 mb-4">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.name} x{item.quantity}</span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">${getTotalPrice()}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={proceedToOrder}
                  className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
                >
                  Place Order
                </Button>
                
                <Button 
                  onClick={() => navigate('/products')}
                  variant="outline"
                  className="w-full mt-2 border-green-600 text-green-600"
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
