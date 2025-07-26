import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, User, Search, Menu, Store, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import useStore from '@/store/useStore';
import { Button } from '@/components/ui/button';
const Navbar = () => {
  const location = useLocation();
  const {
    cart,
    isAuthenticated,
    user,
    isAdmin,
    logout
  } = useStore();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navItems = [{
    path: '/',
    label: 'Home',
    icon: Store
  }, {
    path: '/products',
    label: 'Products',
    icon: Search
  }];
  if (isAdmin) {
    navItems.push({
      path: '/admin',
      label: 'Admin',
      icon: Shield
    });
  }
  return <motion.nav className="navbar px-6 py-4" initial={{
    y: -100
  }} animate={{
    y: 0
  }} transition={{
    duration: 0.5
  }}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Store className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">ShopHub</span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map(item => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return <Link key={item.path} to={item.path} className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'hover:bg-white/10 text-gray-300 hover:text-white'}`}>
                <Icon className="w-4 h-4" />
                <span className="font-medium">{item.label}</span>
              </Link>;
        })}
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart */}
          <Link to="/cart" className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && <motion.span className="cart-badge" initial={{
              scale: 0
            }} animate={{
              scale: 1
            }} transition={{
              type: "spring",
              stiffness: 500,
              damping: 30
            }}>
                  {cartItemsCount}
                </motion.span>}
            </Button>
          </Link>

          {/* User Menu */}
          {isAuthenticated ? <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="hidden md:block text-sm font-medium text-gray-300">
                  {user?.name || user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-gray-300 hover:text-white">
                Logout
              </Button>
            </div> : <div className="flex items-center space-x-2">
              <Link to="/login">
                <Button variant="ghost" size="sm">Login</Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="btn-primary">Sign Up</Button>
              </Link>
            </div>}

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.nav>;
};
export default Navbar;
