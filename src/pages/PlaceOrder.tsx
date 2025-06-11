
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

const PlaceOrder = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orderData, setOrderData] = useState({
    address: '',
    phone: '',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');

  const getTotalPrice = () => {
    return cartItems.reduce((total: number, item: any) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Error",
        description: "Please log in to place an order.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    if (!orderData.address || !orderData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    if (cartItems.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty.",
        variant: "destructive"
      });
      navigate('/cart');
      return;
    }

    setLoading(true);

    try {
      // Create order using the correct column names from the database schema
      const { data: order, error: orderError } = await supabase
        .from('orders')
        .insert({
          user_id: user.id,
          customer_email: user.email || '',
          customer_name: user.user_metadata?.full_name || '',
          shipping_address: orderData.address,
          total_amount: parseFloat(getTotalPrice()),
          status: 'pending'
        })
        .select()
        .single();

      if (orderError) throw orderError;

      // Create order items
      const orderItems = cartItems.map((item: any) => ({
        order_id: order.id,
        product_id: item.id,
        price: item.price,
        quantity: item.quantity
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) throw itemsError;

      // Clear cart
      localStorage.removeItem('cart');

      toast({
        title: "Success!",
        description: "Your order has been placed successfully.",
      });

      // Redirect to success page
      navigate('/order-success', { state: { orderId: order.id } });
    } catch (error: any) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to place order. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Place Your Order</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Delivery Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="address">Delivery Address *</Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={orderData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete delivery address"
                      required
                      className="min-h-20"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={orderData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Special Instructions (Optional)</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={orderData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special delivery instructions or notes"
                      className="min-h-20"
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? 'Processing...' : 'Confirm Order'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-green-800">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-sm text-gray-600">
                          ${item.price} x {item.quantity}
                        </p>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span className="text-green-600">${getTotalPrice()}</span>
                    </div>
                  </div>
                  
                  {user && (
                    <div className="bg-green-50 p-4 rounded">
                      <h4 className="font-medium text-green-800 mb-2">Customer Information</h4>
                      <p className="text-sm text-gray-700">{user.email}</p>
                    </div>
                  )}
                  
                  <div className="bg-yellow-50 p-4 rounded">
                    <h4 className="font-medium text-yellow-800 mb-2">Delivery Information</h4>
                    <p className="text-sm text-gray-700">
                      • Standard delivery: 2-3 business days
                    </p>
                    <p className="text-sm text-gray-700">
                      • Free delivery on orders over $25
                    </p>
                    <p className="text-sm text-gray-700">
                      • You will receive order confirmation via email
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PlaceOrder;
