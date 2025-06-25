import React, { useState } from 'react';
import { Package, Plus, Grid, ShoppingBag, User, LogOut, BarChart3 } from 'lucide-react';
import AddItem from './components/AddItem';
import ViewItems from './components/ViewItems';
import CartSidebar from './components/CartSidebar';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import { Item, ItemFormData, CartItem, User as UserType, Review, ReviewFormData } from './types/Item';
import { mockItems, mockReviews, mockDashboardStats } from './data/mockData';

type Page = 'view' | 'add' | 'dashboard';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('view');
  const [items, setItems] = useState<Item[]>(mockItems);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  const handleLogin = (user: UserType) => {
    setCurrentUser(user);
    setIsGuest(false);
  };

  const handleGuestMode = () => {
    setIsGuest(true);
    setCurrentPage('view');
  };

  const handleLoginRequired = () => {
    setIsLoginOpen(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsGuest(false);
    setCurrentPage('view');
    setCartItems([]);
  };

  const handleAddItem = (itemFormData: ItemFormData) => {
    if (!currentUser || currentUser.role !== 'seller') return;

    const newItem: Item = {
      id: Date.now().toString(),
      name: itemFormData.name,
      type: itemFormData.type,
      category: itemFormData.category,
      description: itemFormData.description,
      price: itemFormData.price,
      coverImage: itemFormData.coverImage ? URL.createObjectURL(itemFormData.coverImage) : '',
      additionalImages: itemFormData.additionalImages.map(file => URL.createObjectURL(file)),
      dateAdded: new Date(),
      rating: 0,
      ratingCount: 0,
      reviewCount: 0,
      purchaseCount: 0,
      monthlyPurchases: 0,
      sellerId: currentUser.id,
      sellerName: currentUser.name,
      companyName: itemFormData.companyName
    };
    
    setItems(prev => [newItem, ...prev]);
  };

  const handleAddToCart = (item: Item) => {
    if (isGuest) {
      handleLoginRequired();
      return;
    }

    if (!currentUser || currentUser.role !== 'buyer') {
      alert('Please login as a buyer to add items to cart');
      return;
    }

    setCartItems(prev => {
      const existingItem = prev.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prev, {
          id: item.id,
          name: item.name,
          price: item.price,
          coverImage: item.coverImage,
          quantity: 1
        }];
      }
    });

    // Update purchase count
    setItems(prev =>
      prev.map(i =>
        i.id === item.id
          ? { ...i, purchaseCount: i.purchaseCount + 1, monthlyPurchases: i.monthlyPurchases + 1 }
          : i
      )
    );
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleRateItem = (itemId: string, rating: number) => {
    if (isGuest) {
      handleLoginRequired();
      return;
    }

    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              userRating: rating,
              rating: item.ratingCount > 0 
                ? ((item.rating * item.ratingCount) + rating) / (item.ratingCount + 1)
                : rating,
              ratingCount: item.ratingCount + 1
            }
          : item
      )
    );
  };

  const handleAddReview = (itemId: string, reviewData: ReviewFormData) => {
    if (isGuest) {
      handleLoginRequired();
      return;
    }

    if (!currentUser || currentUser.role !== 'buyer') {
      alert('Please login as a buyer to write reviews');
      return;
    }

    const newReview: Review = {
      id: Date.now().toString(),
      userId: currentUser.id,
      userName: currentUser.name,
      itemId,
      rating: reviewData.rating,
      comment: reviewData.comment,
      images: reviewData.images.map(file => URL.createObjectURL(file)),
      videos: reviewData.videos.map(file => URL.createObjectURL(file)),
      dateAdded: new Date(),
      helpful: 0
    };

    setReviews(prev => [newReview, ...prev]);

    // Update item review count and rating
    setItems(prev =>
      prev.map(item =>
        item.id === itemId
          ? {
              ...item,
              reviewCount: item.reviewCount + 1,
              rating: item.ratingCount > 0 
                ? ((item.rating * item.ratingCount) + reviewData.rating) / (item.ratingCount + 1)
                : reviewData.rating,
              ratingCount: item.ratingCount + 1
            }
          : item
      )
    );
  };

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const canReview = currentUser?.role === 'buyer';
  const canSell = currentUser?.role === 'seller';
  const showCart = (currentUser?.role === 'buyer' || isGuest);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <nav className="bg-gray-900/80 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Package className="text-blue-400" size={32} />
              <h1 className="text-xl font-bold text-white">Marketplace</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage('view')}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    currentPage === 'view'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                  }`}
                >
                  <Grid size={18} />
                  <span>Browse Items</span>
                </button>
                
                {canSell && (
                  <>
                    <button
                      onClick={() => setCurrentPage('add')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'add'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      }`}
                    >
                      <Plus size={18} />
                      <span>Sell Items</span>
                    </button>
                    
                    <button
                      onClick={() => setCurrentPage('dashboard')}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                        currentPage === 'dashboard'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-blue-400 hover:bg-gray-800'
                      }`}
                    >
                      <BarChart3 size={18} />
                      <span>Dashboard</span>
                    </button>
                  </>
                )}
              </div>

              {showCart && (
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-gray-300 hover:text-blue-400 hover:bg-gray-800 transition-all duration-200"
                >
                  <ShoppingBag size={18} />
                  <span>Cart</span>
                  {totalCartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalCartItems}
                    </span>
                  )}
                </button>
              )}

              {currentUser ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 text-gray-300">
                    <User size={18} />
                    <div className="text-sm">
                      <div>{currentUser.name} ({currentUser.role})</div>
                      {currentUser.companyName && (
                        <div className="text-xs text-blue-400">{currentUser.companyName}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg font-medium text-gray-300 hover:text-red-400 hover:bg-gray-800 transition-all duration-200"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : isGuest ? (
                <div className="flex items-center space-x-3">
                  <span className="text-gray-400 text-sm">Guest Mode</span>
                  <button
                    onClick={() => setIsLoginOpen(true)}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                  >
                    <User size={18} />
                    <span>Login</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginOpen(true)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
                >
                  <User size={18} />
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!currentUser && !isGuest ? (
          <div className="text-center py-16">
            <Package className="mx-auto text-gray-600 mb-6" size={80} />
            <h2 className="text-3xl font-bold text-white mb-4">Welcome to Our Marketplace</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Discover amazing products from trusted sellers or start selling your own items. 
              Join our community of buyers and sellers today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleGuestMode}
                className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Browse as Guest
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        ) : currentPage === 'view' ? (
          <ViewItems 
            items={items} 
            onAddToCart={handleAddToCart}
            onRateItem={handleRateItem}
            reviews={reviews}
            onAddReview={handleAddReview}
            canReview={canReview}
            isGuest={isGuest}
            onLoginRequired={handleLoginRequired}
          />
        ) : currentPage === 'dashboard' && canSell && currentUser ? (
          <Dashboard stats={mockDashboardStats} user={currentUser} />
        ) : canSell && currentUser ? (
          <AddItem onAddItem={handleAddItem} user={currentUser} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-white mb-4">Access Denied</h2>
            <p className="text-gray-400">You don't have permission to access this page.</p>
          </div>
        )}
      </main>

      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={handleLogin}
      />

      {(currentUser?.role === 'buyer' || isGuest) && (
        <Chatbot items={items} />
      )}
    </div>
  );
}

export default App;