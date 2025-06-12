
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, ShoppingCart, Clock, Users, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin, isLoading } = useAuth();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalUsers: 0
  });
  const [error, setError] = useState<string | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    console.log('AdminDashboard - Auth state:', { user: user?.email, isAdmin, isLoading });
    
    if (!isLoading) {
      if (!user || !isAdmin) {
        console.log('Access denied, redirecting to login');
        navigate('/login');
        return;
      }
      
      loadStats();
    }
  }, [user, isAdmin, isLoading, navigate]);

  const loadStats = async () => {
    try {
      setStatsLoading(true);
      setError(null);

      // Get products count
      const { count: productsCount, error: productsError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      if (productsError) {
        console.error('Products count error:', productsError);
      }

      // Get orders count
      const { count: ordersCount, error: ordersError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      if (ordersError) {
        console.error('Orders count error:', ordersError);
      }

      // Get pending orders count
      const { count: pendingCount, error: pendingError } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      if (pendingError) {
        console.error('Pending orders count error:', pendingError);
      }

      // Get users count
      const { count: usersCount, error: usersError } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      if (usersError) {
        console.error('Users count error:', usersError);
      }

      setStats({
        totalProducts: productsCount || 0,
        totalOrders: ordersCount || 0,
        pendingOrders: pendingCount || 0,
        totalUsers: usersCount || 0
      });

    } catch (error) {
      console.error('Error loading stats:', error);
      setError('Failed to load dashboard statistics. Please refresh the page.');
    } finally {
      setStatsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Loading...</div>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null; // Will redirect in useEffect
  }

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
          <p className="text-gray-600">
            Welcome back, {user.email}! Manage your Lara Pickles business from here.
          </p>
        </div>

        {error && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              {error}
            </AlertDescription>
          </Alert>
        )}

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
                    <p className="text-2xl font-bold text-gray-900">
                      {statsLoading ? (
                        <div className="h-8 w-12 bg-gray-200 animate-pulse rounded"></div>
                      ) : (
                        card.value
                      )}
                    </p>
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

        {/* Debug Info for Development */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Debug Info:</h3>
            <p>User Email: {user.email}</p>
            <p>Is Admin: {isAdmin ? 'Yes' : 'No'}</p>
            <p>User ID: {user.id}</p>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;
