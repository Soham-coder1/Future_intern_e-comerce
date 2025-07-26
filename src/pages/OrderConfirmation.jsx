import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Home } from 'lucide-react';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';

const OrderConfirmation = () => {
  const location = useLocation();
  const { orders } = useStore();
  const orderId = location.state?.orderId;
  
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
            <title>Order Not Found - ShopHub</title>
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Order Not Found</h1>
          <p className="text-gray-300 mb-8">The order you're looking for doesn't exist.</p>
          <Link to="/">
            <Button className="btn-primary">Go Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  const steps = [
    { icon: CheckCircle, label: 'Order Confirmed', completed: true },
    { icon: Package, label: 'Processing', completed: false },
    { icon: Truck, label: 'Shipped', completed: false },
    { icon: Home, label: 'Delivered', completed: false }
  ];

  return (
    <>
      <Helmet>
        <title>Order Confirmation - ShopHub</title>
        <meta name="description" content={`Your order #${order.id} has been confirmed and is being processed. Thank you for shopping with ShopHub.`} />
      </Helmet>

      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle className="w-10 h-10 text-white" />
            </motion.div>
            <h1 className="text-4xl font-bold text-white mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-300 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-gray-400">
              Order #{order.id} • {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* Order Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass-effect rounded-xl p-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Order Status</h2>
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === steps.length - 1;
                
                return (
                  <div key={step.label} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-600 text-gray-400'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className={`text-sm mt-2 ${
                        step.completed ? 'text-white' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                    </div>
                    {!isLast && (
                      <div className={`flex-1 h-1 mx-4 ${
                        step.completed ? 'bg-green-500' : 'bg-gray-600'
                      }`} />
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Details */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="glass-effect rounded-xl p-6"
            >
              <h2 className="text-xl font-bold text-white mb-6">Order Details</h2>
              
              <div className="space-y-4">
                {order.items?.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.name}</h3>
                      <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="divider"></div>

              <div className="space-y-2">
                <div className="flex justify-between text-gray-300">
                  <span>Subtotal</span>
                  <span>${order.subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Tax</span>
                  <span>${order.tax?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="divider"></div>
                <div className="flex justify-between text-xl font-bold text-white">
                  <span>Total</span>
                  <span>${order.total?.toFixed(2)}</span>
                </div>
              </div>
            </motion.div>

            {/* Shipping & Payment Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="space-y-6"
            >
              {/* Shipping Address */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Shipping Address</h3>
                <div className="text-gray-300 space-y-1">
                  <p>{order.customerInfo?.firstName} {order.customerInfo?.lastName}</p>
                  <p>{order.customerInfo?.address}</p>
                  <p>
                    {order.customerInfo?.city}, {order.customerInfo?.state} {order.customerInfo?.zipCode}
                  </p>
                </div>
              </div>

              {/* Payment Method */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
                <div className="text-gray-300">
                  <p>Credit Card ending in {order.paymentInfo?.cardNumber?.slice(-4)}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    {order.paymentInfo?.nameOnCard}
                  </p>
                </div>
              </div>

              {/* Contact Info */}
              <div className="glass-effect rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">Contact Information</h3>
                <div className="text-gray-300">
                  <p>{order.customerInfo?.email}</p>
                  <p className="text-sm text-gray-400 mt-1">
                    We'll send order updates to this email address
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mt-12"
          >
            <Link to="/products">
              <Button size="lg" className="btn-primary">
                Continue Shopping
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="btn-secondary"
              onClick={() => {
                window.print();
              }}
            >
              Print Receipt
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default OrderConfirmation;