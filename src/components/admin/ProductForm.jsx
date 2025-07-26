import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const ProductForm = ({ product, setProduct, onSubmit, onCancel, isEditing }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setProduct(prev => ({ ...prev, category: value }));
  };

  return (
    <div className="space-y-4">
      <div className="form-group">
        <Label className="form-label">Product Name</Label>
        <Input
          name="name"
          value={product.name}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Enter product name"
        />
      </div>
      <div className="form-group">
        <Label className="form-label">Price</Label>
        <Input
          type="number"
          step="0.01"
          name="price"
          value={product.price}
          onChange={handleInputChange}
          className="form-input"
          placeholder="0.00"
        />
      </div>
      <div className="form-group">
        <Label className="form-label">Category</Label>
        <Select value={product.category} onValueChange={handleSelectChange}>
          <SelectTrigger className="form-input">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent className="glass-effect border-white/20">
            <SelectItem value="Electronics" className="text-white hover:bg-white/10">Electronics</SelectItem>
            <SelectItem value="Clothing" className="text-white hover:bg-white/10">Clothing</SelectItem>
            <SelectItem value="Fashion" className="text-white hover:bg-white/10">Fashion</SelectItem>
            <SelectItem value="Home" className="text-white hover:bg-white/10">Home</SelectItem>
            <SelectItem value="Food" className="text-white hover:bg-white/10">Food</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="form-group">
        <Label className="form-label">Description</Label>
        <Input
          name="description"
          value={product.description}
          onChange={handleInputChange}
          className="form-input"
          placeholder="Product description"
        />
      </div>
      <div className="form-group">
        <Label className="form-label">Image URL</Label>
        <Input
          name="image"
          value={product.image}
          onChange={handleInputChange}
          className="form-input"
          placeholder="https://example.com/image.jpg"
        />
      </div>
      <div className="flex space-x-3">
        <Button onClick={onSubmit} className="btn-primary flex-1">
          {isEditing ? 'Update Product' : 'Add Product'}
        </Button>
        <Button variant="outline" onClick={onCancel} className="btn-secondary">
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ProductForm;