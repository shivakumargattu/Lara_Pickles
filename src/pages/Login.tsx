
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";

const Login = () => {
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

    // Mock login - in real app this would validate against a backend
    // For demo purposes, any email/password combination works
    const userData = {
      name: "John Doe",
      email: formData.email,
      id: Date.now()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Success",
      description: "Logged in successfully!",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center text-green-800">
                Welcome Back
              </CardTitle>
              <p className="text-center text-gray-600">
                Login to your PickleCraft account
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
                    placeholder="Enter your email"
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
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                >
                  Login
                </Button>
                
                <div className="text-center">
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <Button 
                      onClick={() => navigate('/register')}
                      variant="link"
                      className="text-green-600 p-0 h-auto"
                    >
                      Register here
                    </Button>
                  </p>
                </div>
                
                <div className="text-center mt-6 p-4 bg-gray-100 rounded">
                  <p className="text-sm text-gray-600 mb-2">Demo Credentials:</p>
                  <p className="text-xs text-gray-500">Use any email and password to login</p>
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

export default Login;
