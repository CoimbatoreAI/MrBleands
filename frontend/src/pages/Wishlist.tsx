import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import api from '@/api/api';
import { useCart } from '@/context/CartContext';

const Wishlist = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const fetchWishlist = async () => {
        try {
            const { data } = await api.get('/wishlist');
            setProducts(data.products || []);
        } catch (error: any) {
            if (error.response?.status === 401) {
                navigate('/login');
            }
            console.error("Error fetching wishlist", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const removeFromWishlist = async (productId: string) => {
        try {
            await api.post(`/wishlist/${productId}`);
            setProducts(products.filter(p => p._id !== productId));
            toast({ title: "Removed", description: "Product removed from wishlist" });
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Action failed" });
        }
    };

    const handleAddToCart = (product: any) => {
        addToCart(product);
        toast({ title: "Added", description: "Product added to cart" });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-24 min-h-[60vh]">
                <div className="flex items-center gap-4 mb-12">
                    <button onClick={() => navigate(-1)} className="p-2 bg-muted/50 rounded-full hover:bg-muted transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <h1 className="font-heading text-4xl font-bold">My Wishlist</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product) => (
                            <div key={product._id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                                <div className="relative aspect-square">
                                    <img
                                        src={`http://localhost:5000${product.images[0]}`}
                                        alt={product.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <button
                                        onClick={() => removeFromWishlist(product._id)}
                                        className="absolute top-4 right-4 p-2 bg-white/90 text-red-500 rounded-full shadow-lg hover:bg-red-500 hover:text-white transition-all"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-6">
                                    <h3 className="font-heading text-lg font-bold mb-2">{product.name}</h3>
                                    <p className="font-body text-xl font-bold text-primary mb-6">₹{product.price}</p>
                                    <Button
                                        onClick={() => handleAddToCart(product)}
                                        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl gap-2 font-heading tracking-wide shadow-md"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Move to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/20 rounded-[3rem] border border-dashed border-gray-300">
                        <div className="inline-flex p-6 bg-white rounded-full shadow-lg mb-6 text-muted-foreground">
                            <Heart className="w-12 h-12" />
                        </div>
                        <h2 className="text-2xl font-heading font-bold mb-2">Wishlist is empty</h2>
                        <p className="font-body text-muted-foreground mb-8">Start adding your favorite pickles to your wishlist!</p>
                        <Button
                            onClick={() => navigate('/shop')}
                            className="bg-primary hover:bg-primary/90 rounded-2xl h-12 px-8 font-heading"
                        >
                            Explore Shop
                        </Button>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default Wishlist;
