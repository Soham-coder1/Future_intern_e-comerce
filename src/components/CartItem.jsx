
import React from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2 } from 'lucide-react';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';

const CartItem = ({ item }) => {
  const { updateCartQuantity, removeFromCart } = useStore();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id);
    } else {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="cart-item flex items-center space-x-4"
    >
      {/* Product Image */}
      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-white truncate">{item.name}</h3>
        <p className="text-sm text-gray-400">{item.category}</p>
        <p className="text-lg font-bold text-blue-400">${item.price}</p>
      </div>

      {/* Quantity Controls */}
      <div className="quantity-controls">
        <Button
          size="icon"
          variant="ghost"
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity - 1)}
        >
          <Minus className="w-4 h-4" />
        </Button>
        
        <span className="w-12 text-center font-semibold text-white">
          {item.quantity}
        </span>
        
        <Button
          size="icon"
          variant="ghost"
          className="quantity-btn"
          onClick={() => handleQuantityChange(item.quantity + 1)}
        >
          <Plus className="w-4 h-4" />
        </Button>
      </div>

      {/* Total Price */}
      <div className="text-right">
        <p className="font-bold text-lg text-white">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove Button */}
      <Button
        size="icon"
        variant="ghost"
        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
        onClick={() => removeFromCart(item.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </motion.div>
  );
};

export default CartItem;
