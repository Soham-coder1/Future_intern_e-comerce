import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import useStore from '@/store/useStore';
import ProductCard from '@/components/ProductCard';
import ProductFilters from '@/components/ProductFilters';

const Products = () => {
  const { getFilteredProducts } = useStore();
  const filteredProducts = getFilteredProducts();

  return (
    <>
      <Helmet>
        <title>Products - ShopHub</title>
        <meta name="description" content="Browse our extensive collection of products. Find electronics, fashion, home goods and more with advanced filtering and search options." />
      </Helmet>

      <div className="min-h-screen">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">
            Our Products
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover our carefully curated collection of premium products
          </p>
        </motion.div>

        {/* Filters */}
        <ProductFilters />

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {filteredProducts.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-300">
                  Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="empty-state">
              <div className="glass-effect rounded-xl p-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-300 mb-6">
                  Try adjusting your filters or search terms to find what you're looking for.
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
};

export default Products;