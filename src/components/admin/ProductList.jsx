import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProductListItem = ({ product, onEdit, onDelete }) => (
  <div className="glass-effect rounded-lg p-4 flex items-center space-x-4">
    <img
      src={product.image}
      alt={product.name}
      className="w-16 h-16 rounded-lg object-cover"
    />
    <div className="flex-1 min-w-0">
      <h3 className="font-semibold text-white truncate">{product.name}</h3>
      <p className="text-sm text-gray-400">{product.category}</p>
      <p className="text-lg font-bold text-blue-400">${product.price}</p>
    </div>
    <div className="flex space-x-2">
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onEdit(product)}
        className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20"
      >
        <Edit className="w-4 h-4" />
      </Button>
      <Button
        size="icon"
        variant="ghost"
        onClick={() => onDelete(product.id)}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  </div>
);

const ProductList = ({ products, onEdit, onDelete }) => (
  <div className="space-y-4 max-h-96 overflow-y-auto">
    {products.map((product) => (
      <ProductListItem key={product.id} product={product} onEdit={onEdit} onDelete={onDelete} />
    ))}
  </div>
);

export default ProductList;