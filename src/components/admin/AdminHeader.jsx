import React from 'react';
import { motion } from 'framer-motion';

const AdminHeader = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="mb-8"
  >
    <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
    <p className="text-gray-300">Manage your store and monitor performance</p>
  </motion.div>
);

export default AdminHeader;