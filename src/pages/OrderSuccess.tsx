
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const orderId = location.state?.orderId;
    if (orderId) {
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const foundOrder = orders.find(o => o.id === orderId);
      setOrder(foundOrder);
    }
  }, [location.state]);

  if (!order) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold text-gray-800">Order not found</h1>
          <Button 
            onClick={() => navigate('/')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-white"
          >
            Go Home
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
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="mb-8">
            <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-lg text-gray-600">
              Thank you for your order. We've received your request and will process it soon.
            </p>
          </div>

          {/* Order Details */}
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="text-green-800">Order Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Order ID</h4>
                    <p className="text-green-600 font-mono">#{order.id}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">Order Date</h4>
                    <p>{new Date(order.date).toLocaleDateString()}</p>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Items Ordered</h4>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.name} x{item.quantity}</span>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span className="text-green-600">${order.total}</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Delivery Address</h4>
                  <p className="text-gray-600">{order.address}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-700">Contact Number</h4>
                  <p className="text-gray-600">{order.phone}</p>
                </div>
                
                {order.notes && (
                  <div>
                    <h4 className="font-medium text-gray-700">Special Instructions</h4>
                    <p className="text-gray-600">{order.notes}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="text-left mb-8">
            <CardHeader>
              <CardTitle className="text-green-800">What's Next?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">1</span>
                  <div>
                    <h4 className="font-medium">Order Confirmation</h4>
                    <p className="text-gray-600 text-sm">You'll receive an email confirmation shortly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">2</span>
                  <div>
                    <h4 className="font-medium">Order Processing</h4>
                    <p className="text-gray-600 text-sm">We'll prepare your fresh pickles with care</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-3 mt-0.5">3</span>
                  <div>
                    <h4 className="font-medium">Delivery</h4>
                    <p className="text-gray-600 text-sm">Your order will be delivered in 2-3 business days</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button 
              onClick={() => navigate('/order-status')}
              className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white mr-0 md:mr-4"
            >
              Track Your Order
            </Button>
            <Button 
              onClick={() => navigate('/products')}
              variant="outline"
              className="w-full md:w-auto border-green-600 text-green-600"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrderSuccess;
