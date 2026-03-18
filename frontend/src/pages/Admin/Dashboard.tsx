import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, ClipboardList, IndianRupee, Users } from 'lucide-react';
import DashboardLayout from './DashboardLayout';
import api from '@/api/api';

const Dashboard = () => {
    const [stats, setStats] = useState({
        products: 0,
        orders: 0,
        revenue: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [prodRes, orderRes] = await Promise.all([
                    api.get('/products'),
                    api.get('/orders')
                ]);

                const totalRevenue = orderRes.data.reduce((acc: number, item: any) => acc + item.totalPrice, 0);

                setStats({
                    products: prodRes.data.length,
                    orders: orderRes.data.length,
                    revenue: totalRevenue
                });
            } catch (error) {
                console.error("Error fetching stats", error);
            }
        };
        fetchData();
    }, []);

    const cards = [
        { label: 'Total Products', value: stats.products, icon: ShoppingBag, color: 'bg-blue-500' },
        { label: 'Total Orders', value: stats.orders, icon: ClipboardList, color: 'bg-green-500' },
        { label: 'Total Revenue', value: `₹${stats.revenue.toLocaleString()}`, icon: IndianRupee, color: 'bg-purple-500' },
        { label: 'Avg Order Value', value: stats.orders > 0 ? `₹${(stats.revenue / stats.orders).toFixed(0)}` : '₹0', icon: Users, color: 'bg-orange-500' },
    ];

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md transition-shadow"
                    >
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-xl ${card.color} text-white`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{card.label}</p>
                                <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-12">
                <h3 className="text-lg font-semibold mb-6">Recent Activity</h3>
                <div className="bg-white rounded-2xl border p-6 flex items-center justify-center min-h-[300px] text-gray-400">
                    <p>No recent activity data available yet.</p>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default Dashboard;
