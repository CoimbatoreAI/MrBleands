import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, ArrowLeft, Star, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import api from "@/api/api";
import { useToast } from "@/hooks/use-toast";

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/products/${id}`);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product", error);
                toast({ variant: "destructive", title: "Error", description: "Product not found" });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background">
                <h2 className="text-2xl font-bold mb-4 font-heading">Product Not Found</h2>
                <Button
                    onClick={() => navigate("/shop")}
                    className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12"
                >
                    Back to Shop
                </Button>
            </div>
        );
    }

    const handleAddToCart = () => {
        const productImage = product.images?.[0] ? `http://localhost:5000${product.images[0]}` : '';
        addToCart({
            ...product,
            id: product._id,
            image: productImage
        }, quantity);
        toast({ title: "Added to Cart", description: product.name });
    };

    const displayImage = product.images?.[0] ? `http://localhost:5000${product.images[0]}` : '';

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-24">
                <Button
                    variant="ghost"
                    className="mb-8 flex items-center gap-2 hover:bg-muted rounded-full"
                    onClick={() => navigate(-1)}
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                    <div className="relative rounded-[2rem] overflow-hidden shadow-2xl aspect-square border-4 border-white">
                        <img
                            src={displayImage}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                        />
                        {product.isFeatured && (
                            <span className="absolute top-6 left-6 bg-accent text-accent-foreground px-5 py-2 rounded-full text-xs font-bold shadow-xl uppercase tracking-widest">
                                ⭐ Featured
                            </span>
                        )}
                    </div>

                    <div className="space-y-8 animate-in fade-in slide-in-from-right-10 duration-700">
                        <div>
                            <p className="text-4xl mb-4">{product.emoji || "🍯"}</p>
                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-foreground mb-4">
                                {product.name}
                            </h1>
                            <div className="flex items-center gap-2 mb-6">
                                <div className="flex text-yellow-500">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-5 w-5 fill-current" />
                                    ))}
                                </div>
                                <span className="text-muted-foreground text-sm font-body font-medium ml-2">(4.9 rating)</span>
                            </div>
                            <div className="flex items-baseline gap-4 mb-6">
                                <p className="text-4xl font-bold text-primary">₹{product.price}</p>
                                {product.oldPrice && (
                                    <p className="text-xl text-muted-foreground line-through">₹{product.oldPrice}</p>
                                )}
                            </div>
                            <p className="text-muted-foreground text-lg leading-relaxed font-body">
                                {product.description}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 items-center">
                            <div className="flex items-center border border-border rounded-2xl px-4 py-3 bg-muted/30 w-full sm:w-auto">
                                <button
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white hover:bg-primary hover:text-white transition-all shadow-sm text-xl font-bold disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black"
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    disabled={quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="mx-6 font-bold text-2xl min-w-[30px] text-center font-heading">{quantity}</span>
                                <button
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white hover:bg-primary hover:text-white transition-all shadow-sm text-xl font-bold"
                                    onClick={() => setQuantity(q => q + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <Button
                                onClick={handleAddToCart}
                                className="w-full sm:flex-1 h-16 rounded-2xl text-xl font-bold gap-3 shadow-xl hover:shadow-2xl hover:bg-primary/90 transition-all active:scale-95 group font-heading tracking-wide"
                            >
                                <ShoppingCart className="h-6 w-6 group-hover:animate-bounce" />
                                Add to Cart
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-10 border-t">
                            <div className="flex items-center gap-4 p-5 bg-primary/5 rounded-2xl border border-primary/10">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <ShieldCheck className="h-6 w-6 text-primary" />
                                </div>
                                <span className="text-sm font-bold font-body text-foreground/80">100% Pure & Traditional</span>
                            </div>
                            <div className="flex items-center gap-4 p-5 bg-accent/5 rounded-2xl border border-accent/10">
                                <div className="p-3 bg-white rounded-xl shadow-sm">
                                    <Truck className="h-6 w-6 text-accent" />
                                </div>
                                <span className="text-sm font-bold font-body text-foreground/80">Express Pantry Delivery</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetail;
