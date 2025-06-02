
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const OrderStatus = () => {
  const [searchData, setSearchData] = useState({
    email: '',
    phone: ''
  });
  const [foundOrders, setFoundOrders] = useState([]);
  const [searched, setSearched] = useState(false);

  const handleInputChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value
    });
  };

  const searchOrders = (e) => {
    e.preventDefault();
    
    if (!searchData.email && !searchData.phone) {
      toast({
        title: "Error",
        description: "Please enter either email or phone number.",
        variant: "destructive"
      });
      return;
    }

    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const matchedOrders = orders.filter(order => 
      (searchData.email && order.userEmail.toLowerCase() === searchData.email.toLowerCase()) ||
      (searchData.phone && order.phone === searchData.phone)
    );

    setFoundOrders(matchedOrders);
    setSearched(true);

    if (matchedOrders.length === 0) {
      toast({
        title: "No Orders Found",
        description: "No orders found with the provided information.",
        variant: "destructive"
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'delivered':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-green-800 mb-8 text-center">
          Track Your Order
        </h1>
        
        <div className="max-w-2xl mx-auto">
          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-green-800">Find Your Order</CardTitle>
              <p className="text-gray-600">
                Enter your email address or phone number to track your order status.
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={searchOrders} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={searchData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                  />
                </div>
                
                <div className="text-center text-gray-500">
                  OR
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={searchData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Search Orders
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searched && (
            <div className="space-y-4">
              {foundOrders.length > 0 ? (
                <>
                  <h2 className="text-2xl font-semibold text-green-800 mb-4">
                    Your Orders ({foundOrders.length})
                  </h2>
                  {foundOrders.map((order) => (
                    <Card key={order.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-semibold text-green-800">
                              Order #{order.id}
                            </h3>
                            <p className="text-gray-600">
                              Placed on {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <Badge className={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Items</h4>
                            <div className="space-y-1">
                              {order.items.map((item) => (
                                <p key={item.id} className="text-sm text-gray-600">
                                  {item.name} x{item.quantity}
                                </p>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-700 mb-2">Total</h4>
                            <p className="text-lg font-semibold text-green-600">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t pt-4">
                          <h4 className="font-medium text-gray-700 mb-2">Delivery Address</h4>
                          <p className="text-gray-600">{order.address}</p>
                        </div>
                        
                        {order.status.toLowerCase() === 'pending' && (
                          <div className="bg-yellow-50 p-4 rounded mt-4">
                            <p className="text-yellow-800 text-sm">
                              📦 Your order is being processed. We'll update the status once it's ready for delivery.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'approved' && (
                          <div className="bg-green-50 p-4 rounded mt-4">
                            <p className="text-green-800 text-sm">
                              ✅ Your order has been approved and is being prepared for delivery.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'delivered' && (
                          <div className="bg-blue-50 p-4 rounded mt-4">
                            <p className="text-blue-800 text-sm">
                              🚚 Your order has been delivered! We hope you enjoy your pickles.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'rejected' && (
                          <div className="bg-red-50 p-4 rounded mt-4">
                            <p className="text-red-800 text-sm">
                              ❌ We're sorry, but there was an issue with your order. Please contact us for more information.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card>
                  <CardContent className="p-8 text-center">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      No Orders Found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any orders with the provided information.
                    </p>
                    <p className="text-sm text-gray-500">
                      Please double-check your email address or phone number and try again.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderStatus;
