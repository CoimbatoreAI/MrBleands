import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-primary-foreground/70 font-body text-sm border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img
                src="/logo.png"
                alt="Mr Blends Logo"
                className="h-24 md:h-28 w-auto object-contain"
              />
            </Link>
            <p className="leading-relaxed text-base">
              Bringing the authentic, soul-satisfying taste of traditional Kerala kitchens to households across India. Handcrafted with love.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com/mr_blends__" target="_blank" rel="noopener noreferrer" className="p-2 bg-primary/20 rounded-full hover:bg-secondary hover:text-secondary-foreground transition-all">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-primary-foreground mb-6">Explore</h4>
            <div className="space-y-4 text-base">
              <Link to="/" className="block hover:text-secondary transition-colors">Home</Link>
              <Link to="/shop" className="block hover:text-secondary transition-colors">Shop All</Link>
              <Link to="/about" className="block hover:text-secondary transition-colors">Our Story</Link>
              <Link to="/contact" className="block hover:text-secondary transition-colors">Get in Touch</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-primary-foreground mb-6">Categories</h4>
            <div className="space-y-4 text-base">
              <Link to="/shop" className="block hover:text-secondary transition-colors">Mango Variants</Link>
              <Link to="/shop" className="block hover:text-secondary transition-colors">Lemon Pickles</Link>
              <Link to="/shop" className="block hover:text-secondary transition-colors">Garlic Blends</Link>
              <Link to="/shop" className="block hover:text-secondary transition-colors">Dates Specialties</Link>
            </div>
          </div>

          <div>
            <h4 className="font-heading text-xl font-bold text-primary-foreground mb-6">Contact Us</h4>
            <div className="space-y-4 text-base">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-secondary shrink-0" />
                <span>God's Own Country, Kerala, India</span>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-secondary shrink-0" />
                <span>+91 85474 48971</span>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-secondary shrink-0" />
                <span>mullakkalramesh@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Mr Blends – Traditional Kerala Pickles. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy-policy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-secondary transition-colors">Terms of Service</Link>
            <Link to="/shipping-policy" className="hover:text-secondary transition-colors">Shipping Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
