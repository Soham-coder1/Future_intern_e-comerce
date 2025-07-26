import React from 'react';
import { motion } from 'framer-motion';
import { Package, Users, DollarSign, TrendingUp } from 'lucide-react';
import useStore from '@/store/useStore';

const StatCard = ({ icon: Icon, title, value, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="stats-card"
  >
    <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-lg flex items-center justify-center mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-gray-400 text-sm">{title}</p>
  </motion.div>
);

const StatsGrid = () => {
  const { products, orders } = useStore();
  
  const stats = [
    {
      title: 'Total Products',
      value: products.length,
      icon: Package,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Orders',
      value: orders.length,
      icon: TrendingUp,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Revenue',
      value: `$${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}`,
      icon: DollarSign,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Customers',
      value: new Set(orders.map(order => order.customerInfo?.email)).size,
      icon: Users,
      color: 'from-pink-500 to-pink-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  );
};

export default StatsGrid;