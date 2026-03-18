import Navbar from "@/components/Navbar";
import ShopSection from "@/components/ShopSection";
import Footer from "@/components/Footer";

const Shop = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <div className="bg-primary py-20 px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-primary-foreground mb-4">Our Spice Collection</h1>
          <p className="text-lg font-body text-primary-foreground/80 max-w-2xl mx-auto italic">
            From traditional mango to exotic dates, explore our range of handcrafted Kerala pickles matured to perfection.
          </p>
        </div>
        <ShopSection />
      </div>
      <Footer />
    </div>
  );
};

export default Shop;
