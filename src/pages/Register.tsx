
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { UserPlus, User, Mail, Lock, Shield } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (formData.password.length < 6) {
      toast({
        title: "Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive"
      });
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      id: Date.now()
    };
    
    localStorage.setItem('user', JSON.stringify(userData));
    
    toast({
      title: "Success",
      description: "Account created successfully!",
    });
    
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-gray to-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto animate-fade-in-up">
          <Card className="premium-shadow hover:premium-shadow-lg transition-all duration-500 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
            
            <CardHeader className="text-center pb-6 pt-8">
              <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <UserPlus className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-navy mb-2">
                Join Lara Pickles
              </CardTitle>
              <p className="text-charcoal/70 text-lg">
                Create your account and discover premium <span className="text-gradient-gold font-semibold">artisanal pickles</span>
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="animate-fade-in-left" style={{ animationDelay: '0.1s' }}>
                  <Label htmlFor="name" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-gold" />
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-11"
                    required
                  />
                </div>
                
                <div className="animate-fade-in-right" style={{ animationDelay: '0.2s' }}>
                  <Label htmlFor="email" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <Mail className="w-4 h-4 text-gold" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-11"
                    required
                  />
                </div>
                
                <div className="animate-fade-in-left" style={{ animationDelay: '0.3s' }}>
                  <Label htmlFor="password" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-gold" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a secure password"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-11"
                    required
                  />
                </div>
                
                <div className="animate-fade-in-right" style={{ animationDelay: '0.4s' }}>
                  <Label htmlFor="confirmPassword" className="text-charcoal font-medium flex items-center gap-2 mb-2">
                    <Shield className="w-4 h-4 text-gold" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    placeholder="Confirm your password"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-11"
                    required
                  />
                </div>
                
                <div className="animate-scale-in-premium" style={{ animationDelay: '0.5s' }}>
                  <Button 
                    type="submit" 
                    className="w-full btn-gold text-deep-navy font-semibold h-12 text-lg"
                  >
                    Create Your Account
                  </Button>
                </div>
                
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-charcoal/70">
                    Already have an account?{' '}
                    <Button 
                      onClick={() => navigate('/login')}
                      variant="link"
                      className="text-gold hover:text-dark-gold p-0 h-auto font-semibold"
                    >
                      Sign In
                    </Button>
                  </p>
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

export default Register;
