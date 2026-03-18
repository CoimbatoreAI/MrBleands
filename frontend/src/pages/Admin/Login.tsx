import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from '@/api/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            navigate('/admin/dashboard');
        }
    }, [navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await api.post('/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            toast({
                title: "Login Successful",
                description: "Welcome back to MrBlends Admin.",
            });
            navigate('/admin/dashboard');
        } catch (error: any) {
            toast({
                variant: "destructive",
                title: "Login Failed",
                description: error.response?.data?.message || "Invalid credentials",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[#2C3E50]">Admin Login</h1>
                    <p className="text-gray-500 mt-2">Enter your credentials to access the dashboard</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="example@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="h-12"
                        />
                    </div>
                    <Button
                        type="submit"
                        className="w-full h-12 bg-[#2C3E50] hover:bg-[#1a252f] text-white rounded-xl transition-all"
                        disabled={loading}
                    >
                        {loading ? "Authenticating..." : "Login"}
                    </Button>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;
