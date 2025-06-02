
const Footer = () => {
  return (
    <footer className="bg-green-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">PickleCraft</h3>
            <p className="text-green-200">
              Premium artisanal pickles crafted with love and the finest ingredients.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="/order-status" className="hover:text-white transition-colors">Order Status</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-green-200">
              <li>📧 info@picklecraft.com</li>
              <li>📞 (555) 123-4567</li>
              <li>📍 123 Pickle Street, Food City, FC 12345</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-green-200">
              <li>Monday - Friday: 9AM - 6PM</li>
              <li>Saturday: 10AM - 4PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-green-700 mt-8 pt-8 text-center text-green-200">
          <p>&copy; 2024 PickleCraft. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
