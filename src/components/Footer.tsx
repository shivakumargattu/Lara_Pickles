
import { Star, Award, Shield, Phone, Mail, MapPin, Clock } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-premium text-cream border-t border-gold/20">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-gold rounded-full flex items-center justify-center animate-glow">
                <Star className="w-6 h-6 text-deep-navy" />
              </div>
              <h3 className="text-3xl font-bold">
                <span className="text-gradient-gold">Lara</span>
                <span className="text-cream ml-1">Pickles</span>
              </h3>
            </div>
            <p className="text-cream/80 leading-relaxed mb-6">
              Premium artisanal pickles crafted with love and the finest ingredients in the heart of Hyderabad. Experience tradition in every jar.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gold/20 px-3 py-1 rounded-full">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-sm text-cream">Premium Quality</span>
              </div>
              <div className="flex items-center gap-2 bg-gold/20 px-3 py-1 rounded-full">
                <Shield className="w-4 h-4 text-gold" />
                <span className="text-sm text-cream">Authentic</span>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <h4 className="font-semibold mb-6 text-gold text-lg">Quick Links</h4>
            <ul className="space-y-3 text-cream/80">
              <li>
                <a href="/" className="hover:text-gold transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-4"></span>
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-gold transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-4"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="/order-status" className="hover:text-gold transition-all duration-300 flex items-center gap-2 group">
                  <span className="w-0 h-0.5 bg-gold transition-all duration-300 group-hover:w-4"></span>
                  Order Status
                </a>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold mb-6 text-gold text-lg">Contact Info</h4>
            <ul className="space-y-4 text-cream/80">
              <li className="flex items-center gap-3 hover:text-gold transition-colors">
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <Mail className="w-4 h-4 text-gold" />
                </div>
                info@larapickles.com
              </li>
              <li className="flex items-center gap-3 hover:text-gold transition-colors">
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center">
                  <Phone className="w-4 h-4 text-gold" />
                </div>
                +91 98765 43210
              </li>
              <li className="flex items-start gap-3 hover:text-gold transition-colors">
                <div className="w-8 h-8 bg-gold/20 rounded-full flex items-center justify-center mt-1">
                  <MapPin className="w-4 h-4 text-gold" />
                </div>
                <span>Jubilee Hills, Hyderabad,<br />Telangana 500033</span>
              </li>
            </ul>
          </div>
          
          <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <h4 className="font-semibold mb-6 text-gold text-lg">Business Hours</h4>
            <ul className="space-y-3 text-cream/80">
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <div>
                  <div className="font-medium">Monday - Friday</div>
                  <div className="text-sm text-cream/60">9:00 AM - 6:00 PM</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <div>
                  <div className="font-medium">Saturday</div>
                  <div className="text-sm text-cream/60">10:00 AM - 4:00 PM</div>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-gold" />
                <div>
                  <div className="font-medium">Sunday</div>
                  <div className="text-sm text-cream/60">Closed</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gold/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-cream/60 text-center md:text-left">
              &copy; 2024 Lara Pickles. Proudly serving Hyderabad with authentic flavors.
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-cream/80 ml-2 text-sm">4.9/5 Rating</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
