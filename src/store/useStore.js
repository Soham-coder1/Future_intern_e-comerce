
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
  persist(
    (set, get) => ({
      // Products
      products: [
        {
          id: 1,
          name: 'Premium Wireless Headphones',
          price: 299.99,
          originalPrice: 399.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
          description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
          rating: 4.8,
          reviews: 124,
          inStock: true,
          featured: true
        },
        {
          id: 2,
          name: 'Smart Fitness Watch',
          price: 199.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
          description: 'Advanced fitness tracking with heart rate monitoring and GPS.',
          rating: 4.6,
          reviews: 89,
          inStock: true,
          featured: false
        },
        {
          id: 3,
          name: 'Organic Cotton T-Shirt',
          price: 29.99,
          category: 'Clothing',
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
          description: 'Comfortable and sustainable organic cotton t-shirt in various colors.',
          rating: 4.4,
          reviews: 67,
          inStock: true,
          featured: false
        },
        {
          id: 4,
          name: 'Professional Camera Lens',
          price: 899.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400',
          description: 'Professional grade camera lens for stunning photography.',
          rating: 4.9,
          reviews: 156,
          inStock: true,
          featured: true
        },
        {
          id: 5,
          name: 'Luxury Leather Handbag',
          price: 249.99,
          category: 'Fashion',
          image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
          description: 'Elegant leather handbag crafted with premium materials.',
          rating: 4.7,
          reviews: 93,
          inStock: true,
          featured: false
        },
        {
          id: 6,
          name: 'Gaming Mechanical Keyboard',
          price: 149.99,
          category: 'Electronics',
          image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400',
          description: 'RGB mechanical keyboard perfect for gaming and productivity.',
          rating: 4.5,
          reviews: 78,
          inStock: true,
          featured: false
        },
        {
          id: 7,
          name: 'Artisan Coffee Beans',
          price: 24.99,
          category: 'Food',
          image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400',
          description: 'Premium single-origin coffee beans roasted to perfection.',
          rating: 4.8,
          reviews: 201,
          inStock: true,
          featured: true
        },
        {
          id: 8,
          name: 'Minimalist Desk Lamp',
          price: 79.99,
          category: 'Home',
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
          description: 'Modern LED desk lamp with adjustable brightness and color temperature.',
          rating: 4.3,
          reviews: 45,
          inStock: true,
          featured: false
        }
      ],

      // Cart
      cart: [],
      
      // User
      user: null,
      isAuthenticated: false,
      
      // Orders
      orders: [],
      
      // Admin
      isAdmin: false,
      
      // Filters
      searchQuery: '',
      selectedCategory: 'All',
      priceRange: [0, 1000],
      sortBy: 'name',
      
      // Actions
      addToCart: (product, quantity = 1) => {
        const cart = get().cart;
        const existingItem = cart.find(item => item.id === product.id);
        
        if (existingItem) {
          set({
            cart: cart.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + quantity }
                : item
            )
          });
        } else {
          set({
            cart: [...cart, { ...product, quantity }]
          });
        }
      },
      
      removeFromCart: (productId) => {
        set({
          cart: get().cart.filter(item => item.id !== productId)
        });
      },
      
      updateCartQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        
        set({
          cart: get().cart.map(item =>
            item.id === productId
              ? { ...item, quantity }
              : item
          )
        });
      },
      
      clearCart: () => {
        set({ cart: [] });
      },
      
      // User actions
      login: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isAdmin: userData.email === 'admin@store.com'
        });
      },
      
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isAdmin: false
        });
      },
      
      register: (userData) => {
        set({
          user: userData,
          isAuthenticated: true,
          isAdmin: false
        });
      },
      
      // Product actions
      addProduct: (product) => {
        const newProduct = {
          ...product,
          id: Date.now(),
          rating: 0,
          reviews: 0,
          inStock: true,
          featured: false
        };
        
        set({
          products: [...get().products, newProduct]
        });
      },
      
      updateProduct: (productId, updates) => {
        set({
          products: get().products.map(product =>
            product.id === productId
              ? { ...product, ...updates }
              : product
          )
        });
      },
      
      deleteProduct: (productId) => {
        set({
          products: get().products.filter(product => product.id !== productId)
        });
      },
      
      // Order actions
      createOrder: (orderData) => {
        const newOrder = {
          id: Date.now(),
          ...orderData,
          status: 'pending',
          createdAt: new Date().toISOString(),
          items: get().cart,
          total: get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
        };
        
        set({
          orders: [...get().orders, newOrder],
          cart: []
        });
        
        return newOrder;
      },
      
      updateOrderStatus: (orderId, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === orderId
              ? { ...order, status }
              : order
          )
        });
      },
      
      // Filter actions
      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
      
      setSelectedCategory: (category) => {
        set({ selectedCategory: category });
      },
      
      setPriceRange: (range) => {
        set({ priceRange: range });
      },
      
      setSortBy: (sortBy) => {
        set({ sortBy });
      },
      
      // Computed values
      getFilteredProducts: () => {
        const { products, searchQuery, selectedCategory, priceRange, sortBy } = get();
        
        let filtered = products.filter(product => {
          const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               product.description.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
          const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
          
          return matchesSearch && matchesCategory && matchesPrice;
        });
        
        // Sort products
        filtered.sort((a, b) => {
          switch (sortBy) {
            case 'price-low':
              return a.price - b.price;
            case 'price-high':
              return b.price - a.price;
            case 'rating':
              return b.rating - a.rating;
            case 'name':
            default:
              return a.name.localeCompare(b.name);
          }
        });
        
        return filtered;
      },
      
      getCartTotal: () => {
        return get().cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      },
      
      getCartItemsCount: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      getCategories: () => {
        const products = get().products;
        const categories = [...new Set(products.map(product => product.category))];
        return ['All', ...categories];
      },
      
      getFeaturedProducts: () => {
        return get().products.filter(product => product.featured);
      },
      
      getUserOrders: () => {
        const user = get().user;
        if (!user) return [];
        return get().orders.filter(order => order.userId === user.id);
      }
    }),
    {
      name: 'ecommerce-store',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin,
        orders: state.orders,
        products: state.products
      })
    }
  )
);

export default useStore;
