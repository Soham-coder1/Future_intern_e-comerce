import React from 'react';
import { CheckCircle } from 'lucide-react';

const OrderSummary = ({ cart, total, tax, finalTotal }) => (
  <div className="glass-effect rounded-xl p-6 h-fit sticky top-24">
    <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
    
    <div className="space-y-4 mb-6">
      {cart.map((item) => (
        <div key={item.id} className="flex items-center space-x-3">
          <img src={item.image} alt={item.name} className="w-12 h-12 rounded-lg object-cover" />
          <div className="flex-1 min-w-0">
            <p className="text-white font-medium truncate">{item.name}</p>
            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
          </div>
          <p className="text-white font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}
    </div>

    <div className="divider"></div>

    <div className="space-y-3">
      <div className="flex justify-between text-gray-300">
        <span>Subtotal</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between text-gray-300">
        <span>Shipping</span>
        <span className="text-green-400">Free</span>
      </div>
      <div className="flex justify-between text-gray-300">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className="divider"></div>
      <div className="flex justify-between text-xl font-bold text-white">
        <span>Total</span>
        <span>${finalTotal.toFixed(2)}</span>
      </div>
    </div>

    <div className="mt-6 p-4 bg-green-500/10 border border-green-400/30 rounded-lg">
      <div className="flex items-center space-x-2 text-green-400">
        <CheckCircle className="w-5 h-5" />
        <span className="font-medium">Secure Checkout</span>
      </div>
      <p className="text-sm text-gray-300 mt-1">
        Your payment information is encrypted and secure.
      </p>
    </div>
  </div>
);

export default OrderSummary;