import { Star, Quote } from "lucide-react";
import WhatsAppIcon from "./WhatsAppIcon";

const reviews = [
  {
    text: "The mango pickle tastes exactly like the ones my grandmother used to make in Palakkad. The spice balance is perfect and the oil quality is top-notch. Absolutely loved it!",
    author: "Priya Menon",
    location: "Kochi, Kerala",
    initials: "PM"
  },
  {
    text: "I've tried many bottled pickles, but Mr Blends is in a league of its own. The garlic pickle is rich, pungent, and has that authentic slow-matured depth. Highly recommended!",
    author: "Rahul Krishnan",
    location: "Bangalore, KA",
    initials: "RK"
  },
  {
    text: "Fast delivery to Mumbai and excellent packaging. The dates pickle is a must-try – the perfect blend of sweet and spicy. My family is now a permanent customer.",
    author: "Anjali Sharma",
    location: "Mumbai, MH",
    initials: "AS"
  },
];

const ReviewsSection = () => {
  return (
    <section className="section-padding bg-muted/10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground mb-4">
            Loved by Spice Lovers
          </h2>
          <p className="font-body text-muted-foreground text-lg">Authentic reviews from our community across India</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <div key={i} className="bg-card rounded-[2rem] p-10 border border-border shadow-sm hover:shadow-xl transition-all relative group">
              <Quote className="absolute top-8 right-8 h-12 w-12 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />

              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="h-4 w-4 fill-secondary text-secondary" />
                ))}
              </div>

              <p className="font-body text-foreground/90 mb-8 text-lg leading-relaxed italic">"{review.text}"</p>

              <div className="flex items-center gap-4 border-t border-border pt-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold font-heading">
                  {review.initials}
                </div>
                <div>
                  <p className="font-heading font-bold text-foreground">{review.author}</p>
                  <p className="font-body text-xs text-muted-foreground">{review.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-muted-foreground mb-6">Want to share your experience?</p>
          <a
            href="https://wa.me/918547448971?text=Hi%20Mr%20Blends%2C%20I%20would%20like%20to%20send%20a%20review"
            className="inline-flex items-center gap-2 text-[#25D366] font-bold hover:underline"
          >
            <WhatsAppIcon className="h-5 w-5" />
            Send us a Review on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
