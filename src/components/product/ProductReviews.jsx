import React, { useState, useEffect } from 'react';
import { Star, CheckCircle, Plus, Filter } from 'lucide-react';
import { RatingStars } from '../common/RatingStars';
import { reviewService } from '../../services/reviewService';

export const ProductReviews = ({ product, onOpenReviewModal, refreshTrigger }) => {
  const [reviews, setReviews] = useState(product.reviews || []);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    reviewService.getReviews(product.id, product.reviews || []).then((allReviews) => {
      setReviews(allReviews);
    });
  }, [product.id, product.reviews, refreshTrigger]);

  // Calculate statistics
  const totalReviews = reviews.length;
  const averageRating =
    totalReviews > 0
      ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / totalReviews).toFixed(1)
      : product.rating.toFixed(1);

  const starCounts = {
    5: reviews.filter((r) => Number(r.rating) === 5).length,
    4: reviews.filter((r) => Number(r.rating) === 4).length,
    3: reviews.filter((r) => Number(r.rating) === 3).length,
    2: reviews.filter((r) => Number(r.rating) === 2).length,
    1: reviews.filter((r) => Number(r.rating) === 1).length,
  };

  const filteredReviews =
    selectedFilter === 'all'
      ? reviews
      : reviews.filter((r) => Number(r.rating) === Number(selectedFilter));

  return (
    <section className="py-12 border-t border-luxury-border" id="customer-reviews">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-8 border-b border-luxury-border gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Verified Feedback
            </span>
            <h2 className="font-serif text-3xl font-bold text-luxury-black mt-1">
              Customer Reviews ({totalReviews})
            </h2>
          </div>
          <button
            onClick={onOpenReviewModal}
            className="btn-luxury py-3 px-6 text-xs inline-flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Write A Review</span>
          </button>
        </div>

        {/* Rating Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-b border-luxury-border">
          {/* Average Rating Score */}
          <div className="flex flex-col items-center justify-center p-6 bg-white rounded-xs border border-luxury-border text-center">
            <span className="font-serif text-5xl font-bold text-luxury-black">
              {averageRating}
            </span>
            <div className="my-2">
              <RatingStars rating={Number(averageRating)} showNumeric={false} size="md" />
            </div>
            <p className="text-xs text-neutral-500 font-medium">
              Based on {totalReviews} verified customer reviews
            </p>
          </div>

          {/* Star Breakdown Bars */}
          <div className="md:col-span-2 flex flex-col justify-center space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = starCounts[stars] || 0;
              const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
              return (
                <button
                  key={stars}
                  onClick={() => setSelectedFilter(selectedFilter === String(stars) ? 'all' : String(stars))}
                  className="flex items-center gap-3 text-xs text-neutral-600 hover:text-luxury-black transition-colors w-full group"
                >
                  <span className="w-10 font-bold text-right">{stars} ★</span>
                  <div className="flex-1 bg-neutral-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-luxury-black h-full group-hover:bg-neutral-800 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="w-12 text-left text-neutral-400 font-medium">{count} ({percentage}%)</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar">
          <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5" /> Filter:
          </span>
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
              selectedFilter === 'all'
                ? 'bg-luxury-black text-white'
                : 'bg-white text-neutral-600 border border-luxury-border hover:border-neutral-400'
            }`}
          >
            All Reviews ({totalReviews})
          </button>
          {[5, 4, 3, 2, 1].map((star) => (
            <button
              key={star}
              onClick={() => setSelectedFilter(String(star))}
              className={`px-3 py-1.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                selectedFilter === String(star)
                  ? 'bg-luxury-black text-white'
                  : 'bg-white text-neutral-600 border border-luxury-border hover:border-neutral-400'
              }`}
            >
              {star} Stars ({starCounts[star]})
            </button>
          ))}
        </div>

        {/* Reviews List */}
        <div className="space-y-4 pt-2">
          {filteredReviews.length === 0 ? (
            <div className="py-8 text-center bg-white rounded-xs border border-luxury-border p-6">
              <p className="text-xs text-neutral-500">No reviews found matching this filter.</p>
              <button
                onClick={() => setSelectedFilter('all')}
                className="mt-2 text-xs font-bold text-luxury-black underline"
              >
                Show All Reviews
              </button>
            </div>
          ) : (
            filteredReviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 sm:p-6 bg-white rounded-xs border border-luxury-border shadow-2xs space-y-2.5 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-3">
                    <RatingStars rating={rev.rating} showNumeric={false} size="xs" />
                    <h4 className="font-semibold text-xs text-luxury-black uppercase tracking-wider">
                      {rev.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-neutral-400">{rev.date}</span>
                </div>

                <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>

                <div className="flex items-center gap-2 pt-1 text-[11px] text-neutral-500">
                  <span className="font-bold text-luxury-black">{rev.author}</span>
                  {rev.verified && (
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-xs text-[10px]">
                      <CheckCircle className="w-3 h-3" />
                      Verified Purchaser
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
