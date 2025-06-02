
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";

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
    <nav className="bg-gradient-to-r from-[#003366] to-[#FFA500] shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="text-3xl font-bold text-white cursor-pointer hover:scale-105 transition-transform duration-300"
            onClick={() => navigate('/')}
          >
            <span className="bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">
              Lara Pickles
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`text-white hover:text-orange-200 transition-all duration-300 hover:scale-105 font-medium ${
                  location.pathname === item.path ? 'text-orange-200 font-bold border-b-2 border-orange-200 pb-1' : ''
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Desktop Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {isAdmin ? (
              <>
                <Button
                  onClick={() => navigate('/admin')}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-[#003366] transition-all duration-300"
                >
                  Admin Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
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
                  className="relative text-white hover:bg-white/20"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#FFA500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-white hover:bg-white/20"
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
                  className="text-white hover:bg-white/20"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-white text-[#003366] hover:bg-orange-100 transition-all duration-300 font-semibold"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 bg-gradient-to-r from-[#002244] to-[#FF8C00] rounded-lg mt-2">
            <div className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-white hover:text-orange-200 transition-colors font-medium ${
                    location.pathname === item.path ? 'text-orange-200 font-bold' : ''
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
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-[#003366] justify-start"
                  >
                    Admin Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-white hover:bg-white/20 justify-start"
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
                    className="text-white hover:bg-white/20 justify-start relative"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-[#FFA500] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-white hover:bg-white/20 justify-start"
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
                    className="text-white hover:bg-white/20 justify-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="bg-white text-[#003366] hover:bg-orange-100 justify-start font-semibold"
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
