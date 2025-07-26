import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard, Lock } from 'lucide-react';

const FormField = ({ id, name, label, value, onChange, placeholder, error, type = "text", ...props }) => (
  <div className="form-group">
    <Label htmlFor={id} className="form-label">{label}</Label>
    <Input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      className="form-input"
      placeholder={placeholder}
      {...props}
    />
    {error && <p className="form-error">{error}</p>}
  </div>
);

const CheckoutForm = ({ formData, handleInputChange, handleSubmit, errors, isProcessing, finalTotal }) => {
  return (
    <div className="checkout-form">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
          <FormField
            id="email"
            name="email"
            label="Email Address"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            error={errors.email}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField id="firstName" name="firstName" label="First Name" value={formData.firstName} onChange={handleInputChange} placeholder="John" error={errors.firstName} />
            <FormField id="lastName" name="lastName" label="Last Name" value={formData.lastName} onChange={handleInputChange} placeholder="Doe" error={errors.lastName} />
          </div>
          <FormField id="address" name="address" label="Address" value={formData.address} onChange={handleInputChange} placeholder="123 Main Street" error={errors.address} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField id="city" name="city" label="City" value={formData.city} onChange={handleInputChange} placeholder="New York" error={errors.city} />
            <FormField id="state" name="state" label="State" value={formData.state} onChange={handleInputChange} placeholder="NY" error={errors.state} />
            <FormField id="zipCode" name="zipCode" label="ZIP Code" value={formData.zipCode} onChange={handleInputChange} placeholder="10001" error={errors.zipCode} />
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
            <Lock className="w-5 h-5 mr-2" />
            Payment Information
          </h2>
          <FormField id="nameOnCard" name="nameOnCard" label="Name on Card" value={formData.nameOnCard} onChange={handleInputChange} placeholder="John Doe" error={errors.nameOnCard} />
          <FormField id="cardNumber" name="cardNumber" label="Card Number" value={formData.cardNumber} onChange={handleInputChange} placeholder="1234 5678 9012 3456" maxLength={19} error={errors.cardNumber} />
          <div className="grid grid-cols-2 gap-4">
            <FormField id="expiryDate" name="expiryDate" label="Expiry Date" value={formData.expiryDate} onChange={handleInputChange} placeholder="MM/YY" maxLength={5} error={errors.expiryDate} />
            <FormField id="cvv" name="cvv" label="CVV" value={formData.cvv} onChange={handleInputChange} placeholder="123" maxLength={4} error={errors.cvv} />
          </div>
        </div>

        <Button type="submit" size="lg" disabled={isProcessing} className="w-full btn-primary text-lg py-4">
          {isProcessing ? (
            <div className="flex items-center">
              <div className="loading-spinner mr-2"></div>
              Processing...
            </div>
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Complete Order - ${finalTotal.toFixed(2)}
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default CheckoutForm;