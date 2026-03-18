import { ShieldCheck, Leaf, Heart, Truck, Award, Sparkles, MapPin, Sun, Fish, Flame } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <ShieldCheck className="h-8 w-8 text-primary" />,
    title: "100% Homemade",
    description:
      "Crafted in small batches using traditional Kerala family secrets passed down over 35+ years. No factory floors — just hands that have pickled for generations, ensuring every bite feels like a meal at Ammachi's house.",
  },
  {
    icon: <Leaf className="h-8 w-8 text-primary" />,
    title: "Premium Local Sourcing",
    description:
      "We source the finest Palakkad raw mangoes, Malabar green chillies, coastal prawns, and Wayanad spices directly from local farmers. Zero artificial colours, flavours, or preservatives — ever.",
  },
  {
    icon: <Sun className="h-8 w-8 text-primary" />,
    title: "Sun-Matured Perfection",
    description:
      "Our pickles are slow-matured under the tropical sun of Kerala in traditional clay and ceramic vessels — a time-honoured method that deepens flavours and ensures a long, natural shelf life.",
  },
  {
    icon: <Fish className="h-8 w-8 text-primary" />,
    title: "Authentic Kerala Seafood Pickles",
    description:
      "From the backwaters of Alappuzha to the fish markets of Kozhikode, our fish, prawn, and squid pickles are marinated in authentic Kerala masala and prepared fresh for a true coastal experience.",
  },
  {
    icon: <Award className="h-8 w-8 text-primary" />,
    title: "Time-Tested 35+ Year Recipes",
    description:
      "Our recipes have remained unchanged for over three and a half decades — a deliberate choice. We believe perfection was achieved long ago and we honour that legacy in every jar we seal.",
  },
  {
    icon: <Truck className="h-8 w-8 text-primary" />,
    title: "Pan-India Shipping",
    description:
      "Craving Kerala flavours in Chennai, Delhi, or Bengaluru? We ship securely across India in leak-proof, tamper-evident packaging so the authentic taste reaches you in perfect condition.",
  },
  {
    icon: <Flame className="h-8 w-8 text-primary" />,
    title: "Signature Heat Levels",
    description:
      "From mildly tangy Gooseberry Pickle to fiery Fish Pickle bursting with Malabar spices — we offer a range of heat profiles, letting you choose how bold you want your Kerala experience.",
  },
  {
    icon: <Heart className="h-8 w-8 text-primary" />,
    title: "Made with Love",
    description:
      "Every Mr Blends jar is a labour of love — mixed by hand, packed by family, and seasoned with the warmth of God's Own Country. It's not just pickle; it's a tradition we're proud to share.",
  },
  {
    icon: <Sparkles className="h-8 w-8 text-primary" />,
    title: "Versatile & Irresistible",
    description:
      "Perfect with Kerala red rice, dosa, chapati, parotta, or idli. Whether you're replicating Ammachi's lunch plate or spicing up a modern meal, Mr Blends elevates every dish.",
  },
];

const keralaPride = [
  { label: "Mango Pickle", origin: "Palakkad Farmlands" },
  { label: "Fish Pickle", origin: "Kozhikode Coast" },
  { label: "Prawn Pickle", origin: "Alappuzha Backwaters" },
  { label: "Gongura Pickle", origin: "Traditional Recipe" },
  { label: "Lime Pickle", origin: "Thrissur Orchards" },
  { label: "Garlic Pickle", origin: "Wayanad Hills" },
];

const WhyChooseUs = () => {
  return (
    <>
      <section className="section-padding bg-muted/20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-secondary font-bold tracking-widest uppercase text-sm mb-3">The Mr Blends Difference</p>
            <h2 className="font-heading text-4xl md:text-6xl font-bold text-foreground">
              Why Choose <span className="text-primary italic">Mr Blends</span>?
            </h2>
            <p className="mt-6 font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              Rooted in Kerala's rich culinary heritage, every jar we make carries 35+ years of passion, tradition, and uncompromising quality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.5 }}
                className="flex flex-col items-start gap-4 bg-card p-10 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                <div className="p-4 bg-primary/10 rounded-2xl mb-2">{feature.icon}</div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{feature.title}</h3>
                <p className="font-body text-muted-foreground leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Kerala Roots Banner */}
      <section className="section-padding bg-primary/5 border-y border-primary/10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="h-7 w-7 text-primary" />
              <p className="text-secondary font-bold tracking-widest uppercase text-sm">Proudly Kerala-Made</p>
            </div>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground">
              From Kerala's Farms to Your Table
            </h2>
            <p className="mt-5 font-body text-lg text-muted-foreground max-w-3xl mx-auto">
              Kerala — the land of coconut groves, backwater canals, and the world's finest spices — is inseparable from who we are. Every ingredient we use carries the terroir of God's Own Country. Here's a glimpse into where our beloved pickles come from:
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {keralaPride.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="bg-card border border-border rounded-2xl p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all"
              >
                <p className="font-heading text-xl font-bold text-primary mb-1">{item.label}</p>
                <p className="font-body text-sm text-muted-foreground">{item.origin}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-14 bg-card border border-border rounded-3xl p-10 md:p-14 text-center shadow-sm"
          >
            <p className="font-heading text-2xl md:text-3xl font-bold text-foreground italic leading-relaxed">
              "Kerala's pickle tradition is not just about preserving food — it's about preserving memory, identity, and the warmth of a shared meal. At Mr Blends, that's exactly what we do, one jar at a time."
            </p>
            <p className="mt-6 font-body text-muted-foreground text-sm">— The Mr Blends Family, Kerala</p>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;
