import React, { useState, useEffect } from 'react';
import { ShoppingBag, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from './DashboardLayout';
import api from '@/api/api';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);
    const { toast } = useToast();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const { data } = await api.get('/orders');
            setOrders(data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch orders" });
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.patch(`/orders/${id}/status`, { status });
            toast({ title: "Success", description: `Order status updated to ${status}` });
            fetchOrders();
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Update failed" });
        }
    };

    const deleteOrder = async (id: string) => {
        if (window.confirm("Delete this order record?")) {
            try {
                await api.delete(`/orders/${id}`);
                toast({ title: "Success", description: "Order deleted" });
                fetchOrders();
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Delete failed" });
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Pending': return 'bg-yellow-100 text-yellow-700';
            case 'Processing': return 'bg-blue-100 text-blue-700';
            case 'Shipped': return 'bg-purple-100 text-purple-700';
            case 'Delivered': return 'bg-green-100 text-green-700';
            case 'Cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <DashboardLayout>
            <div className="mb-8">
                <h1 className="text-2xl font-bold">Manage Orders</h1>
                <p className="text-gray-500">Track and fulfill customer orders</p>
            </div>

            <div className="bg-white rounded-2xl border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-sm">Customer</th>
                            <th className="px-6 py-4 font-semibold text-sm">Date</th>
                            <th className="px-6 py-4 font-semibold text-sm">Total</th>
                            <th className="px-6 py-4 font-semibold text-sm">Status</th>
                            <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map((order: any) => (
                            <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-xs font-mono text-gray-500">#{order._id.slice(-8).toUpperCase()}</td>
                                <td className="px-6 py-4">
                                    <p className="font-medium text-gray-800">{order.shippingAddress.address.split(',')[0]}</p>
                                    <p className="text-xs text-gray-500">{order.shippingAddress.phone}</p>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 text-sm font-semibold">₹{order.totalPrice}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Dialog>
                                            <DialogTrigger asChild>
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedOrder(order)}>
                                                    <Eye className="w-4 h-4 text-gray-600" />
                                                </Button>
                                            </DialogTrigger>
                                            <DialogContent className="max-w-xl">
                                                <DialogHeader>
                                                    <DialogTitle>Order Details</DialogTitle>
                                                </DialogHeader>
                                                {selectedOrder && (
                                                    <div className="space-y-6">
                                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-1">Shipping Address</h4>
                                                                <p className="text-gray-600">{selectedOrder.shippingAddress.address}</p>
                                                                <p className="text-gray-600">{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                                                                <p className="text-gray-600">{selectedOrder.shippingAddress.phone}</p>
                                                            </div>
                                                            <div>
                                                                <h4 className="font-semibold text-gray-900 mb-1">Order Summary</h4>
                                                                <p className="text-gray-600">Items: {selectedOrder.orderItems.length}</p>
                                                                <p className="text-gray-600">Payment: {selectedOrder.paymentMethod}</p>
                                                                <p className="font-bold text-gray-800 mt-2">Total: ₹{selectedOrder.totalPrice}</p>
                                                            </div>
                                                        </div>

                                                        <div>
                                                            <h4 className="font-semibold text-gray-900 mb-2">Order Items</h4>
                                                            <div className="space-y-2">
                                                                {selectedOrder.orderItems.map((item: any, idx: number) => (
                                                                    <div key={idx} className="flex items-center justify-between p-2 border rounded-lg">
                                                                        <div className="flex items-center gap-3">
                                                                            <img src={`http://localhost:5000${item.image}`} className="w-10 h-10 object-cover rounded" alt="" />
                                                                            <div>
                                                                                <p className="font-medium">{item.name}</p>
                                                                                <p className="text-xs text-gray-500">Qty: {item.qty} × ₹{item.price}</p>
                                                                            </div>
                                                                        </div>
                                                                        <p className="font-semibold">₹{item.qty * item.price}</p>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        <div className="border-t pt-4">
                                                            <h4 className="font-semibold text-gray-900 mb-2">Update Status</h4>
                                                            <div className="flex flex-wrap gap-2">
                                                                {['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((status) => (
                                                                    <Button
                                                                        key={status}
                                                                        size="sm"
                                                                        variant={selectedOrder.status === status ? 'default' : 'outline'}
                                                                        className={selectedOrder.status === status ? 'bg-[#D4AF37]' : ''}
                                                                        onClick={() => updateStatus(selectedOrder._id, status)}
                                                                    >
                                                                        {status}
                                                                    </Button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </DialogContent>
                                        </Dialog>
                                        <Button variant="ghost" size="icon" onClick={() => deleteOrder(order._id)}>
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {orders.length === 0 && !loading && (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                                    No orders found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Orders;
