import React, { useState } from 'react';
import { X, Star, CheckCircle } from 'lucide-react';
import { reviewService } from '../../services/reviewService';
import { useToast } from '../../hooks/useToast';

export const WriteReviewModal = ({ isOpen, onClose, product, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showSuccess, showError } = useToast();

  if (!isOpen || !product) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!author.trim()) {
      showError('Please enter your name');
      return;
    }
    if (!title.trim()) {
      showError('Please enter a review headline');
      return;
    }
    if (!comment.trim() || comment.trim().length < 10) {
      showError('Please write at least 10 characters for your review');
      return;
    }

    setIsSubmitting(true);
    try {
      const newRev = await reviewService.addReview(product.id, {
        rating,
        author: author.trim(),
        title: title.trim(),
        comment: comment.trim(),
      });

      showSuccess('Thank you! Your verified review has been published.');
      if (onReviewSubmitted) onReviewSubmitted(newRev);
      setIsSubmitting(false);
      onClose();
      // Reset
      setAuthor('');
      setTitle('');
      setComment('');
      setRating(5);
    } catch (err) {
      setIsSubmitting(false);
      showError('Failed to submit review. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={onClose} />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#FAF9F5] rounded-xs shadow-2xl border border-luxury-border p-6 sm:p-8 z-10 animate-scale-in my-auto">
        <div className="flex items-center justify-between pb-4 border-b border-luxury-border">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Community Review
            </span>
            <h3 className="font-serif text-xl font-bold text-luxury-black">
              Review "{product.name}"
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-luxury-black rounded-full hover:bg-neutral-100"
            aria-label="Close review modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Star Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1.5">
              Overall Rating
            </label>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-amber-500 hover:scale-110 transition-transform"
                >
                  <Star
                    className={`w-6 h-6 ${
                      (hoverRating || rating) >= star ? 'fill-current' : 'text-neutral-300'
                    }`}
                  />
                </button>
              ))}
              <span className="ml-2 text-xs font-bold text-luxury-black">
                {rating} / 5 Stars
              </span>
            </div>
          </div>

          {/* Author Name */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="e.g. Siddharth M."
              className="w-full px-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
            />
          </div>

          {/* Review Title */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1.5">
              Review Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Impeccable fit and heavyweight drape"
              className="w-full px-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
            />
          </div>

          {/* Review Comment */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1.5">
              Your Experience
            </label>
            <textarea
              required
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details regarding the silhouette, fabric breathability, sizing accuracy, and styling versatility..."
              className="w-full px-3.5 py-2.5 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
            />
          </div>

          <div className="p-3 bg-brand-50 rounded-xs border border-brand-200/80 text-[11px] text-neutral-600 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-700 flex-shrink-0" />
            <span>Reviews are automatically badged as Verified Customer Purchases.</span>
          </div>

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-luxury py-3.5 mt-2"
          >
            {isSubmitting ? 'Publishing Review...' : 'Submit Review'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WriteReviewModal;
