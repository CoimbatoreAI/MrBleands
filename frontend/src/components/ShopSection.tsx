import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "@/api/api";
import { Search, X } from "lucide-react";

const ShopSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const keyword = searchParams.get('search') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(`/products?keyword=${keyword}`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [keyword]);

  const clearSearch = () => {
    navigate('/shop');
  };

  return (
    <section id="shop" className="section-padding bg-background min-h-[60vh]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
            {keyword ? `Search Results for "${keyword}"` : "Shop by Pickle Variety"}
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-xl mx-auto">
            Handcrafted with love using traditional Kerala recipes
          </p>

          {keyword && (
            <button
              onClick={clearSearch}
              className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-muted hover:bg-muted/80 rounded-full text-sm font-semibold transition-all"
            >
              <X className="w-4 h-4" />
              Clear Search
            </button>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-gray-300">
            <div className="inline-flex p-6 bg-white rounded-full shadow-lg mb-6 text-muted-foreground">
              <Search className="w-12 h-12" />
            </div>
            <h2 className="text-2xl font-heading font-bold mb-2">No products found</h2>
            <p className="font-body text-muted-foreground mb-8">We couldn't find any pickles matching "{keyword}".</p>
            <button
              onClick={clearSearch}
              className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 font-bold transition-all"
            >
              View All Products
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopSection;
