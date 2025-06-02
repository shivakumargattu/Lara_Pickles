
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [orderData, setOrderData] = useState({
    address: '',
    phone: '',
    notes: ''
  });

  const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const handleInputChange = (e) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!orderData.address || !orderData.phone) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Create order
    const order = {
      id: Date.now(),
      userId: user.id,
      userEmail: user.email,
      items: cartItems,
      total: getTotalPrice(),
      address: orderData.address,
      phone: orderData.phone,
      notes: orderData.notes,
      status: 'Pending',
      date: new Date().toISOString()
    };

    // Save order to localStorage (in real app this would be sent to backend)
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));

    // Clear cart
    localStorage.removeItem('cart');

    // Redirect to success page
    navigate('/order-success', { state: { orderId: order.id } });
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
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    Confirm Order
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
                  {cartItems.map((item) => (
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
                  
                  <div className="bg-green-50 p-4 rounded">
                    <h4 className="font-medium text-green-800 mb-2">Customer Information</h4>
                    <p className="text-sm text-gray-700">{user.name}</p>
                    <p className="text-sm text-gray-700">{user.email}</p>
                  </div>
                  
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
