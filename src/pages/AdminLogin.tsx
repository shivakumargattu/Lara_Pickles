
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }

    // Mock admin login - in real app this would validate against a backend
    // For demo: admin@picklecraft.com / admin123
    if (formData.email === 'admin@picklecraft.com' && formData.password === 'admin123') {
      const adminData = {
        name: "Admin User",
        email: formData.email,
        id: 'admin-1',
        role: 'admin'
      };
      
      localStorage.setItem('admin', JSON.stringify(adminData));
      
      toast({
        title: "Success",
        description: "Logged in as admin successfully!",
      });
      
      navigate('/admin');
    } else {
      toast({
        title: "Error",
        description: "Invalid admin credentials.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-800">
                Admin Login
              </CardTitle>
              <p className="text-center text-gray-600">
                Access the PickleCraft admin dashboard
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter admin email"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter admin password"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Login as Admin
                </Button>
                
                <div className="text-center">
                  <Button 
                    onClick={() => navigate('/')}
                    variant="link"
                    className="text-green-600"
                  >
                    Back to Home
                  </Button>
                </div>
                
                <div className="text-center mt-6 p-4 bg-gray-100 rounded">
                  <p className="text-sm text-gray-600 mb-2">Demo Admin Credentials:</p>
                  <p className="text-xs text-gray-500">Email: admin@picklecraft.com</p>
                  <p className="text-xs text-gray-500">Password: admin123</p>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default AdminLogin;
