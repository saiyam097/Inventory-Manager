import React, { useState } from 'react';
import { Star, ThumbsUp, Camera, Video, Send, User } from 'lucide-react';
import { Review, ReviewFormData } from '../types/Item';
import StarRating from './StarRating';

interface ReviewSectionProps {
  reviews: Review[];
  onAddReview: (review: ReviewFormData) => void;
  canReview: boolean;
  isGuest?: boolean;
  onLoginRequired?: () => void;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ 
  reviews, 
  onAddReview, 
  canReview, 
  isGuest = false,
  onLoginRequired 
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 0,
    comment: '',
    images: [],
    videos: []
  });

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    
    if (reviewForm.rating === 0 || !reviewForm.comment.trim()) {
      alert('Please provide a rating and comment');
      return;
    }

    onAddReview(reviewForm);
    setReviewForm({
      rating: 0,
      comment: '',
      images: [],
      videos: []
    });
    setShowReviewForm(false);
  };

  const handleWriteReview = () => {
    if (isGuest && onLoginRequired) {
      onLoginRequired();
      return;
    }
    setShowReviewForm(!showReviewForm);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReviewForm(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setReviewForm(prev => ({
      ...prev,
      videos: [...prev.videos, ...files]
    }));
  };

  const removeMedia = (type: 'images' | 'videos', index: number) => {
    setReviewForm(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Customer Reviews</h3>
        <button
          onClick={handleWriteReview}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
        >
          Write Review
        </button>
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={reviewForm.rating}
                size={24}
                interactive={true}
                onRatingChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewForm.comment}
                onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                rows={4}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none text-white placeholder-gray-400"
                placeholder="Share your experience with this product..."
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Add Photos
                </label>
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200">
                  <div className="text-center">
                    <Camera className="mx-auto text-gray-400 mb-1" size={24} />
                    <span className="text-sm text-gray-400">Upload Photos</span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">
                  Add Videos
                </label>
                <label className="flex items-center justify-center w-full h-24 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-500/10 transition-all duration-200">
                  <div className="text-center">
                    <Video className="mx-auto text-gray-400 mb-1" size={24} />
                    <span className="text-sm text-gray-400">Upload Videos</span>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={handleVideoUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Media Preview */}
            {(reviewForm.images.length > 0 || reviewForm.videos.length > 0) && (
              <div className="space-y-3">
                {reviewForm.images.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Photos:</p>
                    <div className="flex flex-wrap gap-2">
                      {reviewForm.images.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeMedia('images', index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {reviewForm.videos.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-300 mb-2">Videos:</p>
                    <div className="flex flex-wrap gap-2">
                      {reviewForm.videos.map((file, index) => (
                        <div key={index} className="relative">
                          <video
                            src={URL.createObjectURL(file)}
                            className="w-16 h-16 object-cover rounded-lg"
                            muted
                          />
                          <button
                            type="button"
                            onClick={() => removeMedia('videos', index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 transition-colors duration-200"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3">
              <button
                type="submit"
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                <Send size={16} />
                <span>Submit Review</span>
              </button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-8">
            <User className="mx-auto text-gray-600 mb-4" size={48} />
            <p className="text-gray-400">No reviews yet. Be the first to review!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-600/20 w-10 h-10 rounded-full flex items-center justify-center border border-blue-500/30">
                    <User className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{review.userName}</p>
                    <p className="text-sm text-gray-400">
                      {review.dateAdded.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <StarRating rating={review.rating} size={16} />
              </div>

              <p className="text-gray-300 mb-4">{review.comment}</p>

              {/* Review Media */}
              {(review.images.length > 0 || review.videos.length > 0) && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {review.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Review ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                      />
                    ))}
                    {review.videos.map((video, index) => (
                      <video
                        key={index}
                        src={video}
                        className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:scale-105 transition-transform duration-200"
                        controls
                        muted
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4 text-sm">
                <button className="flex items-center space-x-1 text-gray-400 hover:text-blue-400 transition-colors duration-200">
                  <ThumbsUp size={16} />
                  <span>Helpful ({review.helpful})</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;