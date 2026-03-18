import Navbar from "@/components/Navbar";
import TraditionSection from "@/components/TraditionSection";
import WhyChooseUs from "@/components/WhyChooseUs";
import ReviewsSection from "@/components/ReviewsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-16">
        <TraditionSection />
        <WhyChooseUs />
        <ReviewsSection />
        <FAQSection />
      </div>
      <Footer />
    </div>
  );
};

export default About;
