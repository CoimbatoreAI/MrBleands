import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import traditionImage from "@/assets/mixed-pickle.jpg";
import { motion } from "framer-motion";
import { MapPin, Flame, Users, Star } from "lucide-react";

const TraditionSection = () => {
  const navigate = useNavigate();

  const stats = [
    { value: "35+", label: "Years of Heritage", icon: <Star className="h-5 w-5 text-primary" /> },
    { value: "100%", label: "Artisanal Process", icon: <Flame className="h-5 w-5 text-primary" /> },
    { value: "Kerala", label: "Born & Crafted In", icon: <MapPin className="h-5 w-5 text-primary" /> },
    { value: "5000+", label: "Happy Families", icon: <Users className="h-5 w-5 text-primary" /> },
  ];

  return (
    <section className="section-padding bg-background overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <p className="text-secondary font-bold tracking-widest uppercase text-sm">Our Legacy</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground leading-tight">
              Preserving the Authentic Taste of Kerala
            </h2>
            <div className="font-body text-lg text-muted-foreground leading-relaxed space-y-6">
              <p>
                At Mr Blends, our mission is to bring the nostalgic flavour of tradition to every dining table. Born in the heart of Kerala — the spice capital of India — our recipes have stayed unchanged for over <strong className="text-foreground">35 years</strong>, preserving the same fiery spice levels and artisanal techniques lovingly passed down by our grandparents.
              </p>
              <p>
                Each jar is a testament to Kerala's rich agricultural heritage. We source our raw mangoes, green chillies, gongura, and tender gooseberries from the lush farmlands and coastal belts of Thrissur, Palakkad, and Malabar. The fish pickles are prepared using the freshest catch from the fish markets of Kozhikode and Alappuzha, marinated in aromatic Kerala masala and sun-dried to perfection.
              </p>
              <p>
                Our pickles are slow-matured in traditional clay and ceramic vessels under the generous tropical sun of God's Own Country — a process that naturally deepens flavours and ensures a long, preservative-free shelf life. We don't just sell pickles; we share a living piece of Kerala's culinary soul, one spoonful at a time.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 pt-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 + 0.3, duration: 0.5 }}
                  className="border-l-4 border-primary pl-4 flex flex-col gap-1"
                >
                  <div className="flex items-center gap-2">
                    {stat.icon}
                    <p className="text-3xl font-bold font-heading text-primary">{stat.value}</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Kerala Specialities Tags */}
            <div className="flex flex-wrap gap-3 pt-2">
              {["Mango Pickle", "Fish Pickle", "Prawn Pickle", "Gongura Pickle", "Gooseberry Pickle", "Lime Pickle", "Garlic Pickle", "Mixed Pickle"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                  {tag}
                </span>
              ))}
            </div>

            <Button onClick={() => navigate("/shop")} className="rounded-full h-14 px-10 text-lg font-semibold">
              Explore Our Collection
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-primary/10 rounded-full blur-3xl" />
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 aspect-[4/5] md:aspect-auto">
              <img
                src={traditionImage}
                alt="Traditional Kerala Pickle Making"
                className="w-full h-full object-cover scale-110"
              />
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute -bottom-8 -left-8 bg-secondary text-secondary-foreground p-8 rounded-2xl shadow-xl hidden md:block max-w-[220px] -rotate-6"
            >
              <p className="font-heading font-bold text-xl italic">"The same taste my grandmother used to make in Kerala."</p>
              <p className="font-body text-xs mt-2 opacity-80">- Satisfied Customer, Thrissur</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TraditionSection;
