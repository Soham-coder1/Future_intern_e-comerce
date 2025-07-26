
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart!",
      description: `${product.name} has been added to your cart.`,
      className: "notification-success"
    });
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const discount = product.originalPrice ? 
    Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="product-card group relative overflow-hidden"
    >
      <Link to={`/product/${product.id}`}>
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="discount-badge">
              -{discount}%
            </div>
          )}

          {/* Quick Actions */}
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-2">
            <Button
              size="icon"
              variant="secondary"
              onClick={handleWishlist}
              className="glass-effect"
            >
              <Heart className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="secondary"
              className="glass-effect"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Category */}
          <Badge variant="secondary" className="category-badge">
            {product.category}
          </Badge>

          {/* Product Name */}
          <h3 className="font-semibold text-lg text-white group-hover:text-blue-300 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="rating-stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) 
                    ? 'fill-current text-yellow-400' 
                    : 'text-gray-400'
                }`}
              />
            ))}
            <span className="text-sm text-gray-400 ml-2">
              ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2">
            <span className="price-tag">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-300 line-clamp-2">
            {product.description}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="mt-4">
        <Button
          onClick={handleAddToCart}
          className="w-full btn-primary group-hover:scale-105 transition-transform duration-200"
          disabled={!product.inStock}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          {product.inStock ? 'Add to Cart' : 'Out of Stock'}
        </Button>
      </div>

      {/* Stock Status */}
      {!product.inStock && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center rounded-xl">
          <span className="text-white font-semibold bg-red-500 px-4 py-2 rounded-lg">
            Out of Stock
          </span>
        </div>
      )}
    </motion.div>
  );
};

export default ProductCard;
