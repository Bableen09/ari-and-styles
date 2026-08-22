/**
 * Review Service Abstraction Layer
 * Handles local customer review persistence and catalog review merging.
 */

const REVIEWS_STORAGE_KEY = 'ari_styles_custom_reviews';

export const reviewService = {
  /**
   * Get all reviews for a product (catalog defaults + user submissions)
   */
  async getReviews(productId, defaultReviews = []) {
    try {
      const stored = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
      const customReviews = stored[productId] || [];
      return [...customReviews, ...defaultReviews];
    } catch (e) {
      return defaultReviews;
    }
  },

  /**
   * Add a new customer review
   */
  async addReview(productId, reviewData) {
    const newReview = {
      id: `rev-usr-${Date.now()}`,
      author: reviewData.author || 'Fashion Enthusiast',
      rating: Number(reviewData.rating) || 5,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      title: reviewData.title || 'Verified Purchase',
      comment: reviewData.comment,
      verified: true,
    };

    try {
      const stored = JSON.parse(localStorage.getItem(REVIEWS_STORAGE_KEY) || '{}');
      if (!stored[productId]) stored[productId] = [];
      stored[productId].unshift(newReview);
      localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(stored));
    } catch (e) {
      console.warn('Failed to save review locally', e);
    }

    return Promise.resolve(newReview);
  },
};

export default reviewService;
