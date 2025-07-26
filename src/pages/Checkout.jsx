import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import CheckoutForm from '@/components/checkout/CheckoutForm';
import OrderSummary from '@/components/checkout/OrderSummary';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, createOrder } = useStore();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  const [errors, setErrors] = useState({});

  const total = getCartTotal();
  const tax = total * 0.08;
  const finalTotal = total + tax;

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
    if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
    if (!formData.cvv) newErrors.cvv = 'CVV is required';
    if (!formData.nameOnCard) newErrors.nameOnCard = 'Name on card is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({ title: "Please fill in all required fields", className: "notification-error" });
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      const orderData = {
        customerInfo: { email: formData.email, firstName: formData.firstName, lastName: formData.lastName, address: formData.address, city: formData.city, state: formData.state, zipCode: formData.zipCode },
        paymentInfo: { cardNumber: `****-****-****-${formData.cardNumber.slice(-4)}`, nameOnCard: formData.nameOnCard },
        subtotal: total,
        tax: tax,
        total: finalTotal
      };
      const order = createOrder(orderData);
      setIsProcessing(false);
      toast({ title: "Order placed successfully!", description: `Order #${order.id} has been confirmed.`, className: "notification-success" });
      navigate('/order-confirmation', { state: { orderId: order.id } });
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Your cart is empty</h1>
          <p className="text-gray-300 mb-8">Add some products to your cart before checkout.</p>
          <Button onClick={() => navigate('/products')} className="btn-primary">Continue Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Checkout - ShopHub</title>
        <meta name="description" content="Complete your purchase securely with our encrypted checkout process." />
      </Helmet>
      <div className="min-h-screen">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-2">Checkout</h1>
            <p className="text-gray-300">Complete your order securely</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CheckoutForm
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              errors={errors}
              isProcessing={isProcessing}
              finalTotal={finalTotal}
            />
            <OrderSummary cart={cart} total={total} tax={tax} finalTotal={finalTotal} />
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Checkout;