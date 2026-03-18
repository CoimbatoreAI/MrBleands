import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from '@/api/api';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const endpoint = isLogin ? '/users/login' : '/users/register';
        try {
            const { data } = await api.post(endpoint, { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast({
                title: isLogin ? "Login Successful" : "Registration Successful",
                description: isLogin ? "Welcome back!" : "Account created successfully!",
            });
            navigate('/');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Authentication Failed",
                description: error.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-12 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white p-8 rounded-3xl shadow-2xl border border-gray-100"
                >
                    <div className="text-center mb-8">
                        <h1 className="font-heading text-3xl font-bold text-foreground">
                            {isLogin ? "Welcome Back" : "Join MrBlends"}
                        </h1>
                        <p className="font-body text-muted-foreground mt-2">
                            {isLogin ? "Sign in to access your account" : "Create an account for faster checkout"}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="email font-body">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password font-body">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 rounded-xl"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl transition-all shadow-lg font-heading tracking-wide"
                            disabled={loading}
                        >
                            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-100 pt-6">
                        <p className="font-body text-sm text-muted-foreground">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="ml-2 font-bold text-primary hover:underline"
                            >
                                {isLogin ? "Sign Up Now" : "Sign In Now"}
                            </button>
                        </p>
                    </div>
                </motion.div>
            </div>
            <Footer />
        </div>
    );
};

export default Auth;
