
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { LogIn, Mail, Lock } from "lucide-react";

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
    <div className="min-h-screen bg-gradient-to-br from-cream via-warm-gray to-cream">
      <Navbar />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto animate-fade-in-up">
          <Card className="premium-shadow hover:premium-shadow-lg transition-all duration-500 border-0 bg-white/95 backdrop-blur-sm overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-gold"></div>
            
            <CardHeader className="text-center pb-8 pt-8">
              <div className="w-16 h-16 bg-gradient-premium rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
                <LogIn className="w-8 h-8 text-gold" />
              </div>
              <CardTitle className="text-3xl font-bold text-gradient-navy mb-2">
                Welcome Back
              </CardTitle>
              <p className="text-charcoal/70 text-lg">
                Login to your <span className="text-gradient-gold font-semibold">Lara Pickles</span> account
              </p>
            </CardHeader>
            
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-fade-in-left" style={{ animationDelay: '0.2s' }}>
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
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12"
                    required
                  />
                </div>
                
                <div className="animate-fade-in-right" style={{ animationDelay: '0.3s' }}>
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
                    placeholder="Enter your password"
                    className="border-2 border-warm-gray focus:border-gold transition-all duration-300 h-12"
                    required
                  />
                </div>
                
                <div className="animate-scale-in-premium" style={{ animationDelay: '0.4s' }}>
                  <Button 
                    type="submit" 
                    className="w-full btn-gold text-deep-navy font-semibold h-12 text-lg"
                  >
                    Sign In to Account
                  </Button>
                </div>
                
                <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                  <p className="text-charcoal/70">
                    Don't have an account?{' '}
                    <Button 
                      onClick={() => navigate('/register')}
                      variant="link"
                      className="text-gold hover:text-dark-gold p-0 h-auto font-semibold"
                    >
                      Create Account
                    </Button>
                  </p>
                </div>
                
                <div className="text-center mt-8 p-6 bg-gradient-to-r from-gold/10 to-dark-gold/10 rounded-lg border border-gold/20 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                  <p className="text-sm text-charcoal/80 mb-2 font-medium">Demo Access</p>
                  <p className="text-xs text-charcoal/60">Use any email and password combination to explore</p>
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
