import { useNavigate, Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus } from "lucide-react";

const Cart = () => {
    const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();
    const navigate = useNavigate();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-background flex flex-col">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-32 flex flex-col items-center justify-center text-center">
                    <div className="bg-muted p-8 rounded-full mb-6">
                        <ShoppingBag className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold mb-4">Your cart is empty</h1>
                    <p className="text-muted-foreground mb-8 max-w-md font-body">
                        Looks like you haven't added any delicious pickles to your cart yet.
                    </p>
                    <Button onClick={() => navigate("/shop")} className="rounded-full px-8 h-12">
                        Start Shopping
                    </Button>
                </main>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-24">
                <h1 className="text-4xl font-heading font-bold mb-12">Shopping Cart ({totalItems})</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cart.map((item) => (
                            <div
                                key={item.id}
                                className="flex flex-col sm:flex-row gap-6 p-6 bg-card border border-border rounded-2xl group transition-all hover:shadow-md"
                            >
                                <Link to={`/product/${item.id}`} className="block w-full sm:w-32 h-32 rounded-xl overflow-hidden flex-shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                </Link>

                                <div className="flex-1 flex flex-col justify-between py-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="text-xl font-heading font-semibold mb-1 group-hover:text-primary transition-colors">
                                                <Link to={`/product/${item.id}`}>{item.name}</Link>
                                            </h3>
                                            <p className="text-muted-foreground font-body">{item.emoji}</p>
                                        </div>
                                        <p className="text-xl font-bold text-primary">₹{item.price * item.quantity}</p>
                                    </div>

                                    <div className="flex items-center justify-between mt-4 sm:mt-0">
                                        <div className="flex items-center border border-border rounded-full px-3 py-1 bg-muted/50">
                                            <button
                                                className="p-1 hover:text-primary transition-colors disabled:opacity-50"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                disabled={item.quantity <= 1}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </button>
                                            <span className="mx-4 font-bold min-w-[20px] text-center">{item.quantity}</span>
                                            <button
                                                className="p-1 hover:text-primary transition-colors"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => removeFromCart(item.id)}
                                            className="text-muted-foreground hover:text-destructive transition-colors p-2 hover:bg-destructive/10 rounded-full"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Checkout Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-card border border-border rounded-2xl p-8 sticky top-24 shadow-sm">
                            <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
                            <div className="space-y-4 font-body mb-8">
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Subtotal</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                                <div className="flex justify-between text-muted-foreground">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-medium">Calculated at next step</span>
                                </div>
                                <div className="border-t border-border pt-4 mt-4 flex justify-between text-xl font-bold text-foreground">
                                    <span>Total</span>
                                    <span>₹{totalPrice}</span>
                                </div>
                            </div>
                            <Button
                                onClick={() => navigate("/checkout")}
                                className="w-full h-14 rounded-full text-lg font-semibold gap-2 shadow-lg hover:shadow-xl transition-all"
                            >
                                Checkout Now
                                <ArrowRight className="h-5 w-5" />
                            </Button>
                            <p className="text-center text-xs text-muted-foreground mt-6 font-body">
                                Secure payment options available via WhatsApp and Direct Bank Transfer.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Cart;
