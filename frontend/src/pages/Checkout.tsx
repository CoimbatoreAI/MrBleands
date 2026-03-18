import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Truck, ShieldCheck, ArrowLeft } from "lucide-react";
import WhatsAppIcon from "@/components/WhatsAppIcon";
import { toast } from "sonner";
import api from "@/api/api";

const Checkout = () => {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        pincode: "",
        notes: ""
    });

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')!) : null;
        if (userInfo) {
            setFormData(prev => ({ ...prev, email: userInfo.email }));
        }
    }, []);

    if (cart.length === 0) {
        navigate("/cart");
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsProcessing(true);

        try {
            // 1. Save to Backend (Triggers Email Notifications)
            const orderData = {
                orderItems: cart.map(item => ({
                    name: item.name,
                    qty: item.quantity,
                    image: item.image,
                    price: item.price,
                    product: item.id
                })),
                shippingAddress: {
                    name: formData.name,
                    email: formData.email,
                    address: formData.address,
                    city: formData.city,
                    postalCode: formData.pincode,
                    country: "India",
                    phone: formData.phone
                },
                paymentMethod: "WhatsApp/UPI",
                totalPrice: totalPrice,
            };

            await api.post('/orders', orderData);

            // 2. Create WhatsApp Message for secondary notification
            const orderDetailsStr = cart.map(item => `${item.name} (${item.quantity}x) - ₹${item.price * item.quantity}`).join("\n");
            const message = `*New Order from Mr Blends Web Store*\n\n` +
                `*Order Details:*\n${orderDetailsStr}\n\n` +
                `*Total Price:* ₹${totalPrice}\n\n` +
                `*Delivery Information:*\n` +
                `Name: ${formData.name}\n` +
                `Email: ${formData.email}\n` +
                `Phone: ${formData.phone}\n` +
                `Address: ${formData.address}, ${formData.city} - ${formData.pincode}\n` +
                (formData.notes ? `Notes: ${formData.notes}\n` : "") +
                `\n*Order has been recorded in our system. Please provide payment details.*`;

            const whatsappUrl = `https://wa.me/918547448971?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");
            toast.success("Order placed successfully! Notifications sent to email.");
            clearCart();
            navigate("/");
        } catch (error: any) {
            console.error("Order error:", error);
            toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 py-24">
                <div className="max-w-5xl mx-auto">
                    <Button
                        variant="ghost"
                        className="mb-8 flex items-center gap-2"
                        onClick={() => navigate("/cart")}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Cart
                    </Button>

                    <h1 className="text-4xl font-heading font-bold mb-12 text-center">Checkout</h1>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Delivery Form */}
                        <div className="space-y-8">
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                                    <Truck className="h-6 w-6 text-primary" />
                                    Delivery Information
                                </h2>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name" className="font-body">Full Name *</Label>
                                            <Input
                                                id="name"
                                                name="name"
                                                placeholder="John Doe"
                                                required
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                className="rounded-xl h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="font-body">Email Address *</Label>
                                            <Input
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder="example@gmail.com"
                                                required
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                className="rounded-xl h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone" className="font-body">Phone Number (WhatsApp) *</Label>
                                        <Input
                                            id="phone"
                                            name="phone"
                                            placeholder="+91 00000 00000"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className="rounded-xl h-12"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="address" className="font-body">Full Address *</Label>
                                        <Textarea
                                            id="address"
                                            name="address"
                                            placeholder="Street name, Apartment, etc."
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            className="rounded-xl min-h-[100px]"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="city" className="font-body">City *</Label>
                                            <Input
                                                id="city"
                                                name="city"
                                                placeholder="Ernakulam"
                                                required
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                className="rounded-xl h-12"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="pincode" className="font-body">Pincode *</Label>
                                            <Input
                                                id="pincode"
                                                name="pincode"
                                                placeholder="682001"
                                                required
                                                value={formData.pincode}
                                                onChange={handleInputChange}
                                                className="rounded-xl h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="notes" className="font-body">Order Notes (Optional)</Label>
                                        <Textarea
                                            id="notes"
                                            name="notes"
                                            placeholder="Any special instructions?"
                                            value={formData.notes}
                                            onChange={handleInputChange}
                                            className="rounded-xl"
                                        />
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Order Summary & Finalize */}
                        <div className="space-y-8">
                            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
                                <h2 className="text-2xl font-heading font-bold mb-6 flex items-center gap-2">
                                    <CheckCircle2 className="h-6 w-6 text-primary" />
                                    Order Summary
                                </h2>

                                <div className="space-y-4 mb-8">
                                    {cart.map((item) => (
                                        <div key={item.id} className="flex justify-between items-center text-sm font-body">
                                            <span className="text-muted-foreground">{item.name} x {item.quantity}</span>
                                            <span className="font-semibold text-foreground">₹{item.price * item.quantity}</span>
                                        </div>
                                    ))}
                                    <div className="border-t border-border pt-4 mt-4 space-y-2">
                                        <div className="flex justify-between text-muted-foreground font-body">
                                            <span>Subtotal</span>
                                            <span>₹{totalPrice}</span>
                                        </div>
                                        <div className="flex justify-between text-muted-foreground font-body">
                                            <span>Shipping</span>
                                            <span className="text-green-600 font-medium">FREE</span>
                                        </div>
                                        <div className="flex justify-between text-2xl font-bold text-foreground font-heading">
                                            <span>Total</span>
                                            <span>₹{totalPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-4 bg-primary/5 border border-primary/10 rounded-xl flex gap-3">
                                        <WhatsAppIcon className="h-5 w-5 text-[#25D366] shrink-0" />
                                        <p className="text-xs font-body text-primary-foreground/80 text-foreground">
                                            After clicking the button below, we'll open WhatsApp to finalize your order details and payment.
                                        </p>
                                    </div>

                                    <Button
                                        onClick={handleSubmit}
                                        disabled={isProcessing}
                                        className="w-full h-16 rounded-full text-lg font-semibold gap-3 shadow-lg hover:shadow-xl transition-all bg-[#25D366] hover:bg-[#128C7E] text-white"
                                    >
                                        {isProcessing ? "Processing..." : (
                                            <>
                                                <WhatsAppIcon className="h-6 w-6" />
                                                Complete Order via WhatsApp
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl text-center">
                                    <ShieldCheck className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-[10px] font-medium font-body uppercase tracking-wider">Trusted Seller</span>
                                </div>
                                <div className="flex flex-col items-center justify-center p-4 bg-muted/30 rounded-xl text-center">
                                    <Truck className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-[10px] font-medium font-body uppercase tracking-wider">Safe Delivery</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default Checkout;
