import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import AdminHeader from '@/components/admin/AdminHeader';
import StatsGrid from '@/components/admin/StatsGrid';
import ProductList from '@/components/admin/ProductList';
import OrderList from '@/components/admin/OrderList';
import ProductForm from '@/components/admin/ProductForm';

const Admin = () => {
  const { 
    products, 
    orders, 
    addProduct, 
    updateProduct, 
    deleteProduct,
    updateOrderStatus,
    isAdmin 
  } = useStore();
  const { toast } = useToast();
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    category: '',
    description: '',
    image: ''
  });

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-gray-300 mb-8">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-400">Please login as an admin to continue.</p>
        </div>
      </div>
    );
  }

  const resetForm = () => {
    setEditingProduct(null);
    setProductData({ name: '', price: '', category: '', description: '', image: '' });
    setIsFormOpen(false);
  };

  const handleFormSubmit = () => {
    if (!productData.name || !productData.price || !productData.category) {
      toast({ title: "Please fill in all required fields", className: "notification-error" });
      return;
    }

    const payload = {
      ...productData,
      price: parseFloat(productData.price),
      image: productData.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400'
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      toast({ title: "Product updated successfully!", className: "notification-success" });
    } else {
      addProduct(payload);
      toast({ title: "Product added successfully!", className: "notification-success" });
    }
    
    resetForm();
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      description: product.description,
      image: product.image
    });
    setIsFormOpen(true);
  };

  const handleDeleteClick = (productId) => {
    deleteProduct(productId);
    toast({ title: "Product deleted successfully!", className: "notification-success" });
  };

  const handleOrderStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
    toast({ title: "Order status updated!", className: "notification-success" });
  };

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - ShopHub</title>
        <meta name="description" content="Admin dashboard for managing products, orders, and store analytics." />
      </Helmet>

      <div className="min-h-screen">
        <AdminHeader />
        <StatsGrid />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="admin-panel"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Products</h2>
              <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
                <DialogTrigger asChild>
                  <Button className="btn-primary" onClick={() => setEditingProduct(null)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </Button>
                </DialogTrigger>
                <DialogContent className="modal-content">
                  <DialogHeader>
                    <DialogTitle className="text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </DialogTitle>
                  </DialogHeader>
                  <ProductForm
                    product={productData}
                    setProduct={setProductData}
                    onSubmit={handleFormSubmit}
                    onCancel={resetForm}
                    isEditing={!!editingProduct}
                  />
                </DialogContent>
              </Dialog>
            </div>
            <ProductList products={products} onEdit={handleEditClick} onDelete={handleDeleteClick} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="admin-panel"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
            <OrderList orders={orders} onStatusChange={handleOrderStatusChange} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Admin;