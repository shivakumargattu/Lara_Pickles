
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      location: "Banjara Hills",
      rating: 5,
      text: "Absolutely exceptional quality! These pickles remind me of my grandmother's recipes. The authentic Hyderabadi flavors are unmatched.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b123?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      location: "Jubilee Hills",
      rating: 5,
      text: "I've been ordering from Lara Pickles for months now. The consistency in taste and premium packaging makes them stand out from others.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Anitha Reddy",
      location: "Madhapur",
      rating: 5,
      text: "The spicy jalapeño pickles are my favorite! Perfect blend of heat and flavor. Fast delivery and excellent customer service.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
    }
  ];

  return (
    <section className="py-20 bg-cream">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient-navy">What Our Customers</span>
            <br />
            <span className="text-gradient-gold">Are Saying</span>
          </h2>
          <p className="text-charcoal/70 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our valued customers from across Hyderabad have to say about our premium pickles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="group hover-lift bg-white border-0 premium-shadow hover:premium-shadow-lg transition-all duration-500 animate-scale-in-premium"
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity">
                  <Quote className="w-12 h-12 text-gold" />
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                
                <p className="text-charcoal/80 mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-gold/30"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gold rounded-full flex items-center justify-center">
                      <Star className="w-3 h-3 text-deep-navy" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal">{testimonial.name}</h4>
                    <p className="text-charcoal/60 text-sm">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="inline-flex items-center gap-4 bg-white px-8 py-4 rounded-full premium-shadow">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold text-gold" />
              ))}
            </div>
            <div className="text-charcoal">
              <span className="font-bold text-xl">4.9/5</span>
              <span className="text-charcoal/70 ml-2">from 150+ reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
