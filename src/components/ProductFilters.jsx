
import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

const ProductFilters = () => {
  const {
    searchQuery,
    selectedCategory,
    priceRange,
    sortBy,
    setSearchQuery,
    setSelectedCategory,
    setPriceRange,
    setSortBy,
    getCategories
  } = useStore();

  const categories = getCategories();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-6 mb-8"
    >
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-blue-400" />
        <h2 className="text-xl font-semibold text-white">Filters</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search */}
        <div className="space-y-2">
          <label className="form-label">Search Products</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input pl-10"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="space-y-2">
          <label className="form-label">Category</label>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="form-input">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="glass-effect border-white/20">
              {categories.map((category) => (
                <SelectItem key={category} value={category} className="text-white hover:bg-white/10">
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-2">
          <label className="form-label">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="price-range">
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={1000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
        </div>

        {/* Sort By */}
        <div className="space-y-2">
          <label className="form-label">Sort By</label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="form-input">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="glass-effect border-white/20">
              <SelectItem value="name" className="text-white hover:bg-white/10">Name</SelectItem>
              <SelectItem value="price-low" className="text-white hover:bg-white/10">Price: Low to High</SelectItem>
              <SelectItem value="price-high" className="text-white hover:bg-white/10">Price: High to Low</SelectItem>
              <SelectItem value="rating" className="text-white hover:bg-white/10">Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Quick Category Filters */}
      <div className="mt-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductFilters;
