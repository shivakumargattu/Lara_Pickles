
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, LogOut, Star } from "lucide-react";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Mock authentication state - in real app this would come from context/store
  const isLoggedIn = localStorage.getItem('user') !== null;
  const isAdmin = localStorage.getItem('admin') !== null;
  const cartItemsCount = JSON.parse(localStorage.getItem('cart') || '[]').length;

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    navigate('/');
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Order Status', path: '/order-status' },
  ];

  return (
    <nav className="bg-gradient-premium shadow-2xl sticky top-0 z-50 backdrop-blur-sm border-b border-gold/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center group-hover:animate-glow transition-all duration-300">
              <Star className="w-6 h-6 text-deep-navy" />
            </div>
            <div className="text-2xl md:text-3xl font-bold">
              <span className="text-gradient-gold">Lara</span>
              <span className="text-cream ml-1">Pickles</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`relative text-cream hover:text-gold transition-all duration-300 font-medium group ${
                  location.pathname === item.path ? 'text-gold' : ''
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-full ${
                  location.pathname === item.path ? 'w-full' : ''
                }`}></span>
              </button>
            ))}
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Button
                  onClick={() => navigate('/admin')}
                  className="btn-premium text-cream hover:text-gold px-6 py-2"
                >
                  Admin Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-cream hover:text-gold hover:bg-cream/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : isLoggedIn ? (
              <>
                <Button
                  onClick={() => navigate('/cart')}
                  variant="ghost"
                  className="relative text-cream hover:text-gold hover:bg-cream/10"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gold text-deep-navy text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-glow">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-cream hover:text-gold hover:bg-cream/10"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/login')}
                  variant="ghost"
                  className="text-cream hover:text-gold hover:bg-cream/10"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="btn-gold text-deep-navy hover:text-charcoal font-semibold px-6 py-2"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cream hover:text-gold transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 glass-morphism rounded-lg mt-2 border border-gold/20 animate-fade-in-up">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-cream hover:text-gold transition-colors font-medium ${
                    location.pathname === item.path ? 'text-gold font-bold' : ''
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {isAdmin ? (
                <>
                  <Button
                    onClick={() => {
                      navigate('/admin');
                      setIsMenuOpen(false);
                    }}
                    className="btn-premium text-cream justify-start"
                  >
                    Admin Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-cream hover:text-gold hover:bg-cream/10 justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : isLoggedIn ? (
                <>
                  <Button
                    onClick={() => {
                      navigate('/cart');
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="text-cream hover:text-gold hover:bg-cream/10 justify-start relative"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-gold text-deep-navy text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-cream hover:text-gold hover:bg-cream/10 justify-start"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    onClick={() => {
                      navigate('/login');
                      setIsMenuOpen(false);
                    }}
                    variant="ghost"
                    className="text-cream hover:text-gold hover:bg-cream/10 justify-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="btn-gold text-deep-navy justify-start font-semibold"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
