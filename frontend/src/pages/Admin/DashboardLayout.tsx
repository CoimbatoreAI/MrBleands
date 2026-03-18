import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, ClipboardList, LogOut, Package } from 'lucide-react';
import { Button } from "@/components/ui/button";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        navigate('/admin/login');
    };

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, path: '/admin/dashboard' },
        { label: 'Products', icon: ShoppingBag, path: '/admin/products' },
        { label: 'Orders', icon: ClipboardList, path: '/admin/orders' },
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-[#2C3E50] text-white hidden md:flex flex-col">
                <div className="p-6">
                    <Link to="/" className="text-2xl font-bold flex items-center gap-2">
                        <Package className="w-8 h-8 text-[#D4AF37]" />
                        MrBlends
                    </Link>
                    <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Admin Panel</p>
                </div>

                <nav className="flex-1 mt-6 px-4 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${location.pathname === item.path
                                ? 'bg-[#D4AF37] text-white shadow-lg'
                                : 'hover:bg-white/10 text-gray-300 hover:text-white'
                                }`}
                        >
                            <item.icon className="w-5 h-5" />
                            <span className="font-medium">{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className="p-4 mt-auto border-t border-white/10">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className="w-full flex items-center justify-start gap-3 text-gray-300 hover:text-white hover:bg-white/10"
                    >
                        <LogOut className="w-5 h-5" />
                        Logout
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-white border-b flex items-center justify-between px-8">
                    <h2 className="text-xl font-semibold text-gray-800">
                        {navItems.find(item => item.path === location.pathname)?.label || 'Admin'}
                    </h2>
                    <div className="flex items-center gap-4">
                        <div className="text-right">
                            <p className="text-sm font-medium">Administrator</p>
                            <p className="text-xs text-gray-500">admin@mrblendsonline.com</p>
                        </div>
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold text-[#2C3E50]">
                            A
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
