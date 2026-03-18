import { ShoppingCart, Eye, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { useToast } from "@/hooks/use-toast";

const ProductCard = ({ product }: { product: any }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const userInfo = localStorage.getItem('userInfo');

  const productID = product._id || product.id;
  const productImage = product.images?.[0] ? `http://localhost:5000${product.images[0]}` : product.image;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ ...product, id: productID, image: productImage });
    toast({ title: "Added to Cart", description: product.name });
  };

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!userInfo) {
      navigate('/login');
      return;
    }
    try {
      await api.post(`/wishlist/${productID}`);
      setIsWishlisted(!isWishlisted);
      toast({
        title: !isWishlisted ? "Added to Wishlist" : "Removed from Wishlist",
        description: product.name
      });
    } catch (error) {
      toast({ variant: "destructive", title: "Error", description: "Could not update wishlist" });
    }
  };

  return (
    <div className="group bg-card rounded-2xl overflow-hidden border border-border hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <Link to={`/product/${productID}`} className="relative block overflow-hidden aspect-square">
        <img
          src={productImage}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="flex gap-2">
            <div className="bg-white/90 p-3 rounded-full text-primary shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="h-5 w-5" />
            </div>
            <button
              onClick={toggleWishlist}
              className={`p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 text-primary'}`}
            >
              <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>
        {product.isBestSeller && (
          <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-[10px] uppercase tracking-widest font-heading font-bold px-3 py-1 rounded-full shadow-lg">
            ⭐ Best Seller
          </span>
        )}
      </Link>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{product.emoji || "🍯"}</span>
          <Link to={`/product/${productID}`}>
            <h3 className="font-heading text-lg font-bold text-foreground hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
          </Link>
        </div>
        <div className="flex items-center justify-between mt-4">
          <span className="font-body text-xl font-bold text-primary">₹{product.price}</span>
          <Button
            size="sm"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-body rounded-full px-5 h-10 shadow-md hover:shadow-lg transition-all"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
