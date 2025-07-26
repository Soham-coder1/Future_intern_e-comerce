import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const OrderListItem = ({ order, onStatusChange }) => (
  <div className="order-card">
    <div className="flex items-center justify-between mb-3">
      <div>
        <h3 className="font-semibold text-white">Order #{order.id}</h3>
        <p className="text-sm text-gray-400">
          {order.customerInfo?.firstName} {order.customerInfo?.lastName}
        </p>
        <p className="text-xs text-gray-500">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-bold text-white">${order.total?.toFixed(2)}</p>
        <Select
          value={order.status}
          onValueChange={(value) => onStatusChange(order.id, value)}
        >
          <SelectTrigger className="w-32 h-8 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="glass-effect border-white/20">
            <SelectItem value="pending" className="text-white hover:bg-white/10">Pending</SelectItem>
            <SelectItem value="processing" className="text-white hover:bg-white/10">Processing</SelectItem>
            <SelectItem value="shipped" className="text-white hover:bg-white/10">Shipped</SelectItem>
            <SelectItem value="delivered" className="text-white hover:bg-white/10">Delivered</SelectItem>
            <SelectItem value="cancelled" className="text-white hover:bg-white/10">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
    
    <div className="space-y-2">
      {order.items?.slice(0, 2).map((item) => (
        <div key={item.id} className="flex items-center space-x-2 text-sm">
          <span className="text-gray-400">{item.quantity}x</span>
          <span className="text-white truncate">{item.name}</span>
        </div>
      ))}
      {order.items?.length > 2 && (
        <p className="text-xs text-gray-400">
          +{order.items.length - 2} more items
        </p>
      )}
    </div>
  </div>
);

const OrderList = ({ orders, onStatusChange }) => (
  <div className="space-y-4 max-h-96 overflow-y-auto">
    {orders.length > 0 ? (
      orders.slice().reverse().map((order) => (
        <OrderListItem key={order.id} order={order} onStatusChange={onStatusChange} />
      ))
    ) : (
      <div className="text-center py-8">
        <p className="text-gray-400">No orders yet</p>
      </div>
    )}
  </div>
);

export default OrderList;