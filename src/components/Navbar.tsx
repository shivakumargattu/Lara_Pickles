
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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            className="text-2xl font-bold text-green-600 cursor-pointer"
            onClick={() => navigate('/')}
          >
            PickleCraft
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.path)}
                className={`text-gray-700 hover:text-green-600 transition-colors ${
                  location.pathname === item.path ? 'text-green-600 font-semibold' : ''
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
                  className="border-green-600 text-green-600"
                >
                  Admin Dashboard
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-600"
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
                  className="relative text-gray-600"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {cartItemsCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemsCount}
                    </span>
                  )}
                </Button>
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-gray-600"
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
                  className="text-gray-600"
                >
                  Login
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Register
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.path);
                    setIsMenuOpen(false);
                  }}
                  className={`text-left text-gray-700 hover:text-green-600 transition-colors ${
                    location.pathname === item.path ? 'text-green-600 font-semibold' : ''
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
                    className="border-green-600 text-green-600 justify-start"
                  >
                    Admin Dashboard
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-gray-600 justify-start"
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
                    className="text-gray-600 justify-start relative"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-2 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </Button>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="text-gray-600 justify-start"
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
                    className="text-gray-600 justify-start"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      navigate('/register');
                      setIsMenuOpen(false);
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white justify-start"
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
