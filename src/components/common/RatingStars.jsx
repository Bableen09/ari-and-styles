import React from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ rating = 5, reviewCount, size = 'sm', showNumeric = true }) => {
  const numRating = Number(rating) || 0;
  const starSizeClass = size === 'xs' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-3.5 h-3.5';

  return (
    <div className="inline-flex items-center gap-1.5">
      <div className="flex items-center text-amber-500">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${starSizeClass} ${
              numRating >= star
                ? 'fill-current'
                : numRating >= star - 0.5
                ? 'fill-current opacity-60'
                : 'text-neutral-300'
            }`}
          />
        ))}
      </div>
      {showNumeric && (
        <span className="text-[11px] font-semibold text-neutral-700">
          {numRating.toFixed(1)}
        </span>
      )}
      {reviewCount !== undefined && (
        <span className="text-[11px] text-neutral-400">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default RatingStars;
