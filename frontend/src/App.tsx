import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/context/CartContext";
import Index from "@/pages/Index";
import Shop from "@/pages/Shop";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import ProductDetail from "@/pages/ProductDetail";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import ShippingPolicy from "@/pages/ShippingPolicy";
import Auth from "@/pages/Auth";
import Wishlist from "@/pages/Wishlist";
import Login from "@/pages/Admin/Login";
import Dashboard from "@/pages/Admin/Dashboard";
import Products from "@/pages/Admin/Products";
import Orders from "@/pages/Admin/Orders";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

import { AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Index /></PageTransition>} />
        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />
        <Route path="/about" element={<PageTransition><About /></PageTransition>} />
        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
        <Route path="/product/:id" element={<PageTransition><ProductDetail /></PageTransition>} />
        <Route path="/cart" element={<PageTransition><Cart /></PageTransition>} />
        <Route path="/checkout" element={<PageTransition><Checkout /></PageTransition>} />
        <Route path="/privacy-policy" element={<PageTransition><PrivacyPolicy /></PageTransition>} />
        <Route path="/terms-of-service" element={<PageTransition><TermsOfService /></PageTransition>} />
        <Route path="/shipping-policy" element={<PageTransition><ShippingPolicy /></PageTransition>} />
        <Route path="/login" element={<PageTransition><Auth /></PageTransition>} />
        <Route path="/wishlist" element={<PageTransition><Wishlist /></PageTransition>} />
        <Route path="/admin/login" element={<PageTransition><Login /></PageTransition>} />
        <Route path="/admin/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/admin/products" element={<PageTransition><Products /></PageTransition>} />
        <Route path="/admin/orders" element={<PageTransition><Orders /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <CartProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <FloatingWhatsApp />
        <BrowserRouter>
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </CartProvider>
  </QueryClientProvider>
);

export default App;
