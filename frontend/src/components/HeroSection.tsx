import heroBg from "@/assets/hero-bg.jpg";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "./WhatsAppIcon";
import { motion } from "framer-motion";

const HeroSection = () => {
  const navigate = useNavigate();
  const whatsappLink = "https://wa.me/918547448971?text=Hi%20Mr%20Blends%2C%20I%20would%20like%20to%20order%20pickles";

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 }
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/60 to-foreground/40" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-3xl mx-auto px-4"
      >
        <motion.p
          variants={itemVariants}
          className="font-body text-sm md:text-base tracking-[0.3em] uppercase text-secondary mb-4"
        >
          From Kerala Kitchens to Your Table
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          Authentic Kerala Pickles
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-body text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Experience the bold spices and traditional flavors of Kerala with handcrafted pickles made using time-tested recipes and fresh ingredients.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-body text-base px-8 py-6 rounded-full"
            onClick={() => navigate("/shop")}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            Shop Pickles
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground font-body text-base px-8 py-6 rounded-full"
            asChild
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="mr-2 h-5 w-5" />
              Order on WhatsApp
            </a>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
