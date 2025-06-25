import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  maxRating = 5, 
  size = 20, 
  interactive = false,
  onRatingChange 
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  const handleStarClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  const handleStarHover = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  const handleStarLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => {
        const starRating = index + 1;
        const isFilled = (hoverRating || rating) >= starRating;
        const isPartial = !hoverRating && rating > index && rating < starRating;
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleStarClick(starRating)}
            onMouseEnter={() => handleStarHover(starRating)}
            onMouseLeave={handleStarLeave}
            className={`${
              interactive 
                ? 'cursor-pointer hover:scale-110 transition-transform duration-200' 
                : 'cursor-default'
            }`}
            disabled={!interactive}
          >
            <Star
              size={size}
              className={`${
                isFilled 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : isPartial
                  ? 'text-yellow-400 fill-yellow-400/50'
                  : 'text-gray-600 dark:text-gray-400'
              } transition-colors duration-200`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;