import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Edit2, Upload, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DashboardLayout from './DashboardLayout';
import api from '@/api/api';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<any>(null);
    const { toast } = useToast();

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        oldPrice: '',
        description: '',
        category: '',
        countInStock: '',
        isFeatured: false,
    });
    const [images, setImages] = useState<File[]>([]);
    const [previewImages, setPreviewImages] = useState<string[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const { data } = await api.get('/products');
            setProducts(data);
        } catch (error) {
            toast({ variant: "destructive", title: "Error", description: "Failed to fetch products" });
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files);
            setImages(prev => [...prev, ...selectedFiles]);

            const newPreviews = selectedFiles.map(file => URL.createObjectURL(file));
            setPreviewImages(prev => [...prev, ...newPreviews]);
        }
    };

    const removeImage = (index: number) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setPreviewImages(prev => prev.filter((_, i) => i !== index));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            price: '',
            oldPrice: '',
            description: '',
            category: '',
            countInStock: '',
            isFeatured: false,
        });
        setImages([]);
        setPreviewImages([]);
        setEditingProduct(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitData = new FormData();
        Object.keys(formData).forEach(key => {
            submitData.append(key, (formData as any)[key]);
        });

        images.forEach(img => {
            submitData.append('images', img);
        });

        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct._id}`, submitData);
                toast({ title: "Success", description: "Product updated successfully" });
            } else {
                await api.post('/products', submitData);
                toast({ title: "Success", description: "Product added successfully" });
            }
            fetchProducts();
            setIsDialogOpen(false);
            resetForm();
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error", description: error.response?.data?.message || "Action failed" });
        }
    };

    const deleteProduct = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/${id}`);
                toast({ title: "Success", description: "Product deleted" });
                fetchProducts();
            } catch (error) {
                toast({ variant: "destructive", title: "Error", description: "Delete failed" });
            }
        }
    };

    const handleEdit = (product: any) => {
        setEditingProduct(product);
        setFormData({
            name: product.name,
            price: product.price,
            oldPrice: product.oldPrice || '',
            description: product.description,
            category: product.category,
            countInStock: product.countInStock,
            isFeatured: product.isFeatured,
        });
        setPreviewImages(product.images.map((img: string) => `http://localhost:5000${img}`));
        setIsDialogOpen(true);
    };

    return (
        <DashboardLayout>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Manage Products</h1>
                    <p className="text-gray-500">Add, edit, or remove products from your store</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    setIsDialogOpen(open);
                    if (!open) resetForm();
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#D4AF37] hover:bg-[#b08d2b] flex items-center gap-2">
                            <Plus className="w-4 h-4" />
                            Add Product
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>{editingProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name</Label>
                                    <Input id="name" value={formData.name} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="category">Category</Label>
                                    <Input id="category" value={formData.category} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price">Price (₹)</Label>
                                    <Input id="price" type="number" value={formData.price} onChange={handleInputChange} required />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="oldPrice">Old Price (₹)</Label>
                                    <Input id="oldPrice" type="number" value={formData.oldPrice} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="countInStock">Stock Quantity</Label>
                                    <Input id="countInStock" type="number" value={formData.countInStock} onChange={handleInputChange} required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={formData.description} onChange={handleInputChange} required />
                            </div>

                            <div className="space-y-2">
                                <Label>Product Images (At least one)</Label>
                                <div className="flex flex-wrap gap-4 mt-2">
                                    {previewImages.map((src, idx) => (
                                        <div key={idx} className="relative w-24 h-24 rounded-lg overflow-hidden border">
                                            <img src={src} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))}
                                    <Label htmlFor="image-upload" className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                        <Upload className="w-6 h-6 text-gray-400" />
                                        <span className="text-[10px] mt-1 text-gray-500">Upload</span>
                                        <input id="image-upload" type="file" multiple className="hidden" onChange={handleImageChange} />
                                    </Label>
                                </div>
                            </div>

                            <Button type="submit" className="w-full bg-[#2C3E50] h-12">
                                {editingProduct ? 'Update Product' : 'Create Product'}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-2xl border overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-sm">Product</th>
                            <th className="px-6 py-4 font-semibold text-sm">Category</th>
                            <th className="px-6 py-4 font-semibold text-sm">Price</th>
                            <th className="px-6 py-4 font-semibold text-sm">Stock</th>
                            <th className="px-6 py-4 font-semibold text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {products.map((product: any) => (
                            <tr key={product._id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={`http://localhost:5000${product.images[0]}`}
                                            alt=""
                                            className="w-12 h-12 rounded-lg object-cover bg-gray-100"
                                        />
                                        <p className="font-medium text-gray-800">{product.name}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-600">{product.category}</td>
                                <td className="px-6 py-4 text-sm font-semibold">₹{product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.countInStock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                        {product.countInStock} in stock
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(product)}>
                                            <Edit2 className="w-4 h-4 text-blue-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => deleteProduct(product._id)}>
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {products.length === 0 && !loading && (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                                    No products found. Add your first product!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    );
};

export default Products;
