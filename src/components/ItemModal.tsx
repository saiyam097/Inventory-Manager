import React, { useState } from 'react';
import { X, MessageCircle, Calendar, ShoppingCart, DollarSign, TrendingUp, MessageSquare } from 'lucide-react';
import { Item, Review, ReviewFormData } from '../types/Item';
import ImageCarousel from './ImageCarousel';
import StarRating from './StarRating';
import ReviewSection from './ReviewSection';

interface ItemModalProps {
  item: Item | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: Item) => void;
  onRateItem: (itemId: string, rating: number) => void;
  reviews: Review[];
  onAddReview: (itemId: string, review: ReviewFormData) => void;
  canReview: boolean;
  isGuest?: boolean;
  onLoginRequired?: () => void;
}

const ItemModal: React.FC<ItemModalProps> = ({ 
  item, 
  isOpen, 
  onClose, 
  onAddToCart,
  onRateItem,
  reviews,
  onAddReview,
  canReview,
  isGuest = false,
  onLoginRequired
}) => {
  const [userRating, setUserRating] = useState(item?.userRating || 0);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');

  if (!isOpen || !item) return null;

  const handleEnquire = () => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    alert(`Enquiry sent for ${item.name}! We'll get back to you soon.`);
  };

  const handleBuyNow = () => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    alert(`Proceeding to buy ${item.name} for $${item.price.toFixed(2)}`);
  };

  const handleRatingChange = (rating: number) => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    setUserRating(rating);
    onRateItem(item.id, rating);
  };

  const handleAddReview = (reviewData: ReviewFormData) => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    onAddReview(item.id, reviewData);
  };

  const handleAddToCart = () => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    onAddToCart(item);
  };

  const itemReviews = reviews.filter(review => review.itemId === item.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-gray-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-gray-800/80 hover:bg-gray-700 text-gray-300 hover:text-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <X size={20} />
        </button>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Images */}
            <div>
              <ImageCarousel 
                images={[item.coverImage, ...item.additionalImages]} 
                itemName={item.name}
              />
            </div>

            {/* Right Column - Details */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{item.name}</h2>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-medium border border-blue-500/30 capitalize">
                      {item.category}
                    </span>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="text-green-400" size={20} />
                      <span className="text-2xl font-bold text-green-400">${item.price.toFixed(2)}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">Sold by {item.sellerName}</p>
                  <p className="text-sm text-blue-400 font-medium">{item.companyName}</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <TrendingUp className="text-green-400" size={20} />
                    <span className="text-green-400 font-semibold">Sales</span>
                  </div>
                  <p className="text-white text-lg font-bold">{item.purchaseCount}</p>
                  <p className="text-gray-400 text-sm">{item.monthlyPurchases} this month</p>
                </div>

                <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="text-blue-400" size={20} />
                    <span className="text-blue-400 font-semibold">Reviews</span>
                  </div>
                  <p className="text-white text-lg font-bold">{item.reviewCount}</p>
                  <div className="flex items-center space-x-2">
                    <StarRating rating={item.rating} size={16} />
                    <span className="text-gray-400 text-sm">({item.rating.toFixed(1)})</span>
                  </div>
                </div>
              </div>

              {/* Rating Section */}
              <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <StarRating rating={item.rating} size={20} />
                    <span className="text-gray-300">
                      {item.rating.toFixed(1)} ({item.ratingCount} ratings)
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-3">
                  <p className="text-gray-300 mb-2">Rate this item:</p>
                  <StarRating 
                    rating={userRating} 
                    size={24} 
                    interactive={true}
                    onRatingChange={handleRatingChange}
                  />
                  {userRating > 0 && (
                    <p className="text-sm text-blue-400 mt-2">
                      {isGuest ? 'Please login to save your rating!' : 'Thank you for rating this item!'}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-gray-400 mb-6">
                <Calendar size={16} className="mr-2" />
                Added on {item.dateAdded.toLocaleDateString()}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <ShoppingCart size={20} />
                  <span>Add to Cart</span>
                </button>
                
                <button
                  onClick={handleBuyNow}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Buy Now
                </button>
                
                <button
                  onClick={handleEnquire}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <MessageCircle size={20} />
                  <span>Enquire</span>
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-8">
            <div className="flex space-x-4 border-b border-gray-700">
              <button
                onClick={() => setActiveTab('details')}
                className={`pb-3 px-1 font-medium transition-colors duration-200 ${
                  activeTab === 'details'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Product Details
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 px-1 font-medium transition-colors duration-200 ${
                  activeTab === 'reviews'
                    ? 'text-blue-400 border-b-2 border-blue-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Reviews ({itemReviews.length})
              </button>
            </div>

            <div className="mt-6">
              {activeTab === 'details' ? (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{item.description}</p>
                </div>
              ) : (
                <ReviewSection
                  reviews={itemReviews}
                  onAddReview={handleAddReview}
                  canReview={canReview && !isGuest}
                  isGuest={isGuest}
                  onLoginRequired={onLoginRequired}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemModal;