
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAdding(true);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    setTimeout(() => {
      setIsAdding(false);
      toast({
        title: "Added to Cart! 🥒",
        description: `${product.name} has been added to your cart.`,
      });
    }, 800);
  };

  const viewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      className="group hover-lift cursor-pointer border-0 bg-white premium-shadow hover:premium-shadow-lg transition-all duration-500 animate-scale-in-premium overflow-hidden"
      style={{ animationDelay: `${0.15 * index}s` }}
      onClick={viewDetails}
    >
      <CardContent className="p-0 relative">
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-deep-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Rating Badge */}
          <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-1 premium-shadow">
            <Star className="w-4 h-4 fill-gold text-gold" />
            <span className="text-sm font-bold text-charcoal">{product.rating}</span>
          </div>
          
          {/* Price Badge */}
          <div className="absolute bottom-4 left-4 bg-gradient-gold text-deep-navy px-4 py-2 rounded-full font-bold premium-shadow animate-glow">
            ₹{(product.price * 80).toFixed(0)}
          </div>

          {/* Action Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                viewDetails();
              }}
              size="sm"
              variant="outline"
              className="bg-white/90 backdrop-blur-sm border-gold hover:bg-gold hover:text-deep-navy"
            >
              <Eye className="w-4 h-4" />
            </Button>
            <Button
              onClick={addToCart}
              disabled={isAdding}
              size="sm"
              className="bg-gold text-deep-navy hover:bg-dark-gold"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div className="p-6">
          <h3 className="font-bold text-charcoal mb-3 text-xl group-hover:text-deep-navy transition-colors duration-300">
            {product.name}
          </h3>
          <p className="text-charcoal/70 leading-relaxed line-clamp-2 mb-4">
            {product.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-gold text-gold' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-xs text-charcoal/60 bg-gold/10 px-2 py-1 rounded-full">Premium</span>
          </div>

          <Button
            onClick={addToCart}
            disabled={isAdding}
            className="w-full mt-4 btn-gold text-deep-navy font-semibold"
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
