
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Search, Package, Mail, Phone, MapPin, Calendar } from "lucide-react";

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
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'delivered':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return '⏳';
      case 'approved':
        return '✅';
      case 'rejected':
        return '❌';
      case 'delivered':
        return '🚚';
      default:
        return '📦';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-gray to-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12 animate-fade-in-up">
          <div className="w-20 h-20 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-6 animate-glow">
            <Package className="w-10 h-10 text-gold" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-navy mb-4">
            Track Your Order
          </h1>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
            Enter your details below to check the status of your <span className="text-gradient-gold font-semibold">Lara Pickles</span> order
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto">
          {/* Premium Search Form */}
          <Card className="mb-8 premium-shadow hover:premium-shadow-lg transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
            
            <CardHeader className="text-center pb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-gold/20 to-dark-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-2xl font-bold text-gradient-navy">Find Your Order</CardTitle>
              <p className="text-charcoal/70">
                Enter your email address or phone number to track your order status
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={searchOrders} className="space-y-6">
                <div className="animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="email" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gold" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={searchData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email address"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12"
                  />
                </div>
                
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gold/30 to-gold/30"></div>
                    <span className="text-charcoal/60 font-medium px-4">OR</span>
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent via-gold/30 to-gold/30"></div>
                  </div>
                </div>
                
                <div className="animate-fade-in-right" style={{ animationDelay: '0.5s' }}>
                  <Label htmlFor="phone" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <Phone className="w-4 h-4 text-gold" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={searchData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12"
                  />
                </div>
                
                <div className="animate-scale-in-premium" style={{ animationDelay: '0.6s' }}>
                  <Button 
                    type="submit" 
                    className="w-full btn-gold text-deep-navy font-semibold h-12 text-lg"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Orders
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Premium Search Results */}
          {searched && (
            <div className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              {foundOrders.length > 0 ? (
                <>
                  <h2 className="text-3xl font-bold text-gradient-navy mb-6 text-center">
                    Your Orders ({foundOrders.length})
                  </h2>
                  {foundOrders.map((order, index) => (
                    <Card key={order.id} className="premium-shadow hover:premium-shadow-lg transition-all duration-500 border-0 bg-white/90 backdrop-blur-sm animate-scale-in-premium" style={{ animationDelay: `${0.1 * index}s` }}>
                      <CardContent className="p-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                          <div>
                            <h3 className="text-2xl font-bold text-gradient-navy mb-2">
                              Order #{order.id}
                            </h3>
                            <div className="flex items-center gap-2 text-charcoal/70">
                              <Calendar className="w-4 h-4 text-gold" />
                              <span>Placed on {new Date(order.date).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <Badge className={`${getStatusColor(order.status)} font-semibold px-4 py-2 text-sm border`}>
                            <span className="mr-2">{getStatusIcon(order.status)}</span>
                            {order.status.toUpperCase()}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div className="bg-gradient-to-r from-gold/5 to-dark-gold/5 p-4 rounded-lg border border-gold/20">
                            <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                              <Package className="w-4 h-4 text-gold" />
                              Order Items
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item) => (
                                <div key={item.id} className="flex justify-between items-center text-sm">
                                  <span className="text-charcoal/80">{item.name}</span>
                                  <span className="font-medium text-charcoal">x{item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="bg-gradient-to-r from-gold/5 to-dark-gold/5 p-4 rounded-lg border border-gold/20">
                            <h4 className="font-semibold text-charcoal mb-3">Order Total</h4>
                            <p className="text-3xl font-bold text-gradient-gold">
                              ${order.total}
                            </p>
                          </div>
                        </div>
                        
                        <div className="border-t border-gold/20 pt-6">
                          <h4 className="font-semibold text-charcoal mb-3 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gold" />
                            Delivery Address
                          </h4>
                          <p className="text-charcoal/70 bg-gradient-to-r from-gold/5 to-dark-gold/5 p-3 rounded-lg border border-gold/20">{order.address}</p>
                        </div>
                        
                        {/* Status Messages */}
                        {order.status.toLowerCase() === 'pending' && (
                          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-lg border border-yellow-200 mt-6">
                            <p className="text-yellow-800 font-medium">
                              📦 Your order is being processed. We'll update the status once it's ready for delivery.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'approved' && (
                          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg border border-green-200 mt-6">
                            <p className="text-green-800 font-medium">
                              ✅ Your order has been approved and is being prepared for delivery.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'delivered' && (
                          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200 mt-6">
                            <p className="text-blue-800 font-medium">
                              🚚 Your order has been delivered! We hope you enjoy your premium pickles.
                            </p>
                          </div>
                        )}
                        
                        {order.status.toLowerCase() === 'rejected' && (
                          <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-lg border border-red-200 mt-6">
                            <p className="text-red-800 font-medium">
                              ❌ We're sorry, but there was an issue with your order. Please contact us for more information.
                            </p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </>
              ) : (
                <Card className="premium-shadow border-0 bg-white/90 backdrop-blur-sm">
                  <CardContent className="p-12 text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-gold/20 to-dark-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Package className="w-10 h-10 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-gradient-navy mb-4">
                      No Orders Found
                    </h3>
                    <p className="text-charcoal/70 mb-6 text-lg">
                      We couldn't find any orders with the provided information.
                    </p>
                    <p className="text-sm text-charcoal/60 mb-8">
                      Please double-check your email address or phone number and try again.
                    </p>
                    <Button 
                      onClick={() => {
                        setSearchData({ email: '', phone: '' });
                        setSearched(false);
                      }}
                      className="btn-gold text-deep-navy px-6 py-2"
                    >
                      Try Again
                    </Button>
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
