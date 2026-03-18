import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import api from "@/api/api";

const NewsletterSection = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/subscription/subscribe', { email });
            toast({
                title: "Welcome to our Spice Circle! 🌶️",
                description: "Check your inbox for a special welcome message.",
            });
            setEmail("");
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Subscription Failed",
                description: error.response?.data?.message || "Something went wrong. Please try again.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="section-padding bg-primary text-primary-foreground relative overflow-hidden">
            {/* Decorative patterns */}
            <div className="absolute top-0 right-0 p-20 opacity-10 pointer-events-none">
                <div className="text-8xl">🍯</div>
            </div>
            <div className="absolute bottom-0 left-0 p-20 opacity-10 pointer-events-none -rotate-12">
                <div className="text-8xl">🌶️</div>
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10 transition-all">
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-6 animate-in fade-in slide-in-from-bottom-5 duration-700">Join Our Spice Circle</h2>
                <p className="text-lg font-body opacity-90 mb-10 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-150">
                    Subscribe to get exclusive offers, tradition-inspired recipes, and updates on our latest pickle blends delivered to your inbox.
                </p>
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300"
                >
                    <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-primary-foreground text-foreground rounded-full h-14 px-6 border-none focus-visible:ring-secondary transition-all shadow-xl"
                        required
                        disabled={loading}
                    />
                    <Button
                        type="submit"
                        className="bg-secondary text-secondary-foreground hover:bg-secondary/90 h-14 rounded-full px-8 text-lg font-semibold shadow-xl transition-all hover:-translate-y-1 active:scale-95 whitespace-nowrap"
                        disabled={loading}
                    >
                        {loading ? "Joining..." : "Subscribe"}
                    </Button>
                </form>
            </div>
        </section>
    );
};

export default NewsletterSection;
