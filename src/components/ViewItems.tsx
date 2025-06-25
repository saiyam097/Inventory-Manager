import React, { useState } from 'react';
import { Search, Grid, Calendar, ShoppingCart, DollarSign, TrendingUp, MessageSquare, Filter } from 'lucide-react';
import { Item, Review, ReviewFormData } from '../types/Item';
import ItemModal from './ItemModal';
import StarRating from './StarRating';

interface ViewItemsProps {
  items: Item[];
  onAddToCart: (item: Item) => void;
  onRateItem: (itemId: string, rating: number) => void;
  reviews: Review[];
  onAddReview: (itemId: string, review: ReviewFormData) => void;
  canReview: boolean;
  isGuest?: boolean;
  onLoginRequired?: () => void;
}

const ViewItems: React.FC<ViewItemsProps> = ({ 
  items, 
  onAddToCart, 
  onRateItem, 
  reviews, 
  onAddReview, 
  canReview,
  isGuest = false,
  onLoginRequired
}) => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'clothing', label: 'Clothing' },
    { value: 'beauty', label: 'Beauty' },
    { value: 'electronics', label: 'Electronics' },
    { value: 'sports', label: 'Sports' },
    { value: 'home', label: 'Home & Garden' },
    { value: 'books', label: 'Books' },
    { value: 'toys', label: 'Toys' },
    { value: 'other', label: 'Other' }
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleItemClick = (item: Item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleAddToCart = (e: React.MouseEvent, item: Item) => {
    e.stopPropagation();
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    onAddToCart(item);
  };

  const handleModalAddToCart = (item: Item) => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    onAddToCart(item);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-3">
          <Grid className="text-blue-400" size={28} />
          <h1 className="text-3xl font-bold text-white">Browse Products</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white placeholder-gray-400"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-48 pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-white appearance-none"
            >
              {categories.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Quick Filters */}
      <div className="flex flex-wrap gap-2">
        {categories.slice(1).map(category => (
          <button
            key={category.value}
            onClick={() => setSelectedCategory(category.value)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              selectedCategory === category.value
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
            }`}
          >
            {category.label}
          </button>
        ))}
        {selectedCategory !== 'all' && (
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-4 py-2 rounded-full text-sm font-medium bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white transition-all duration-200"
          >
            Clear Filter
          </button>
        )}
      </div>

      {filteredItems.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-600 mb-4">
            <Grid size={64} className="mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-gray-400 mb-2">No products found</h3>
          <p className="text-gray-500">
            {searchTerm || selectedCategory !== 'all' 
              ? 'Try adjusting your search or filter criteria.' 
              : 'No products available at the moment.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleItemClick(item)}
              className="bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden group border border-gray-700"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.coverImage}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-gray-900/80 text-blue-400 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm border border-blue-500/30 capitalize">
                    {item.category}
                  </span>
                </div>
                <div className="absolute top-3 left-3">
                  <div className="bg-gray-900/80 text-green-400 px-2 py-1 rounded-full text-xs font-bold backdrop-blur-sm border border-green-500/30 flex items-center space-x-1">
                    <DollarSign size={12} />
                    <span>{item.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1 line-clamp-2 group-hover:text-blue-400 transition-colors duration-200">
                  {item.name}
                </h3>
                
                <p className="text-xs text-gray-500 mb-2">{item.companyName}</p>
                
                <div className="flex items-center space-x-2 mb-2">
                  <StarRating rating={item.rating} size={16} />
                  <span className="text-gray-400 text-sm">({item.reviewCount})</span>
                </div>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {item.description}
                </p>

                {/* Stats */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <TrendingUp size={12} />
                    <span>{item.monthlyPurchases} sold</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MessageSquare size={12} />
                    <span>{item.reviewCount} reviews</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar size={14} className="mr-1" />
                    {item.dateAdded.toLocaleDateString()}
                  </div>
                  
                  <button
                    onClick={(e) => handleAddToCart(e, item)}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-110"
                  >
                    <ShoppingCart size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ItemModal
        item={selectedItem}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onAddToCart={handleModalAddToCart}
        onRateItem={onRateItem}
        reviews={reviews}
        onAddReview={onAddReview}
        canReview={canReview}
        isGuest={isGuest}
        onLoginRequired={onLoginRequired}
      />
    </div>
  );
};

export default ViewItems;