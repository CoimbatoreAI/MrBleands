import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BestSellers from "@/components/BestSellers";
import ProcessSection from "@/components/ProcessSection";
import ReviewsSection from "@/components/ReviewsSection";
import NewsletterSection from "@/components/NewsletterSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <BestSellers />
      <ProcessSection />
      <ReviewsSection />
      <NewsletterSection />
      <Footer />
    </div>
  );
};

export default Index;
