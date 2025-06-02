
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";

const AdminOrders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin-login');
      return;
    }

    // Load orders
    const loadedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(loadedOrders);
  }, [navigate]);

  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    
    toast({
      title: "Success",
      description: `Order status updated to ${newStatus}`,
    });
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

  const filteredOrders = orders.filter(order => 
    statusFilter === "all" || order.status.toLowerCase() === statusFilter
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-green-800 mb-2">Order Management</h1>
            <p className="text-gray-600">Manage customer orders and update status</p>
          </div>
          <Button 
            onClick={() => navigate('/admin')}
            variant="outline"
            className="border-green-600 text-green-600"
          >
            ← Back to Dashboard
          </Button>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <Card key={order.id}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Order Info */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-green-800">
                            Order #{order.id}
                          </h3>
                          <p className="text-gray-600">
                            {new Date(order.date).toLocaleDateString()} at {new Date(order.date).toLocaleTimeString()}
                          </p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div>
                          <h4 className="font-medium text-gray-700">Customer</h4>
                          <p className="text-gray-600">{order.userEmail}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Phone</h4>
                          <p className="text-gray-600">{order.phone}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-700">Address</h4>
                          <p className="text-gray-600">{order.address}</p>
                        </div>
                        {order.notes && (
                          <div>
                            <h4 className="font-medium text-gray-700">Notes</h4>
                            <p className="text-gray-600">{order.notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Order Items */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Items</h4>
                      <div className="space-y-1">
                        {order.items.map((item) => (
                          <div key={item.id} className="text-sm">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-gray-600">
                              ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="border-t mt-2 pt-2">
                        <p className="font-semibold text-green-600">
                          Total: ${order.total}
                        </p>
                      </div>
                    </div>
                    
                    {/* Status Update */}
                    <div>
                      <h4 className="font-medium text-gray-700 mb-2">Update Status</h4>
                      <Select 
                        value={order.status} 
                        onValueChange={(value) => updateOrderStatus(order.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pending">Pending</SelectItem>
                          <SelectItem value="Approved">Approved</SelectItem>
                          <SelectItem value="Rejected">Rejected</SelectItem>
                          <SelectItem value="Delivered">Delivered</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-8 text-center">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {statusFilter === "all" ? "No Orders Found" : `No ${statusFilter} Orders`}
                </h3>
                <p className="text-gray-600">
                  {statusFilter === "all" 
                    ? "No orders have been placed yet." 
                    : `There are no ${statusFilter} orders at the moment.`
                  }
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Summary Stats */}
        {orders.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-green-800">Order Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{orders.length}</p>
                  <p className="text-sm text-gray-600">Total Orders</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-600">
                    {orders.filter(o => o.status.toLowerCase() === 'pending').length}
                  </p>
                  <p className="text-sm text-gray-600">Pending</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">
                    {orders.filter(o => o.status.toLowerCase() === 'approved').length}
                  </p>
                  <p className="text-sm text-gray-600">Approved</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">
                    {orders.filter(o => o.status.toLowerCase() === 'delivered').length}
                  </p>
                  <p className="text-sm text-gray-600">Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminOrders;
