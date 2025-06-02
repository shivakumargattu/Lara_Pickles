
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Clock, Users } from "lucide-react";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalUsers: 0
  });

  useEffect(() => {
    // Check if admin is logged in
    const admin = localStorage.getItem('admin');
    if (!admin) {
      navigate('/admin-login');
      return;
    }

    // Calculate stats
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const pendingOrders = orders.filter(order => order.status.toLowerCase() === 'pending');
    
    setStats({
      totalProducts: 6, // Mock data - in real app this would come from backend
      totalOrders: orders.length,
      pendingOrders: pendingOrders.length,
      totalUsers: 5 // Mock data
    });
  }, [navigate]);

  const statCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: Package,
      color: "bg-blue-500",
      action: () => navigate('/admin/products')
    },
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-green-500",
      action: () => navigate('/admin/orders')
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-yellow-500",
      action: () => navigate('/admin/orders')
    },
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-purple-500",
      action: () => {}
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome to the PickleCraft admin panel</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((card, index) => (
            <Card 
              key={index} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={card.action}
            >
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className={`${card.color} p-3 rounded-full text-white mr-4`}>
                    <card.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Product Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Manage your pickle products, add new varieties, update prices and descriptions.
              </p>
              <Button 
                onClick={() => navigate('/admin/products')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Manage Products
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-800">Order Management</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View and manage customer orders, update order status, and track deliveries.
              </p>
              <Button 
                onClick={() => navigate('/admin/orders')}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                Manage Orders
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Orders */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-green-800">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {JSON.parse(localStorage.getItem('orders') || '[]')
                .slice(-5)
                .reverse()
                .map((order) => (
                <div key={order.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">Order #{order.id}</p>
                    <p className="text-sm text-gray-600">{order.userEmail}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${order.total}</p>
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      order.status.toLowerCase() === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status.toLowerCase() === 'approved' ? 'bg-green-100 text-green-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
              {JSON.parse(localStorage.getItem('orders') || '[]').length === 0 && (
                <p className="text-gray-500 text-center py-4">No orders yet</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
