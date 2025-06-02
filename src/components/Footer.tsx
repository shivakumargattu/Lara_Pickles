
const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#003366] via-[#002244] to-[#FFA500] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="animate-fade-in">
            <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white to-orange-200 bg-clip-text text-transparent">
              Lara Pickles
            </h3>
            <p className="text-blue-100 leading-relaxed">
              Premium artisanal pickles crafted with love and the finest ingredients in the heart of Hyderabad.
            </p>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold mb-4 text-[#FFA500]">Quick Links</h4>
            <ul className="space-y-2 text-blue-100">
              <li><a href="/" className="hover:text-[#FFA500] transition-all duration-300 hover:translate-x-2 inline-block">Home</a></li>
              <li><a href="/products" className="hover:text-[#FFA500] transition-all duration-300 hover:translate-x-2 inline-block">Products</a></li>
              <li><a href="/order-status" className="hover:text-[#FFA500] transition-all duration-300 hover:translate-x-2 inline-block">Order Status</a></li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-4 text-[#FFA500]">Contact Info</h4>
            <ul className="space-y-2 text-blue-100">
              <li className="flex items-center gap-2">
                <span className="text-[#FFA500]">📧</span> info@larapickles.com
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FFA500]">📞</span> +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#FFA500]">📍</span> Jubilee Hills, Hyderabad, Telangana 500033
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-4 text-[#FFA500]">Business Hours</h4>
            <ul className="space-y-2 text-blue-100">
              <li>Monday - Friday: 9AM - 6PM</li>
              <li>Saturday: 10AM - 4PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blue-600/30 mt-8 pt-8 text-center text-blue-100">
          <p>&copy; 2024 Lara Pickles. Proudly serving Hyderabad with authentic flavors.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
