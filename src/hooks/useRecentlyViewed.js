import { useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';

const RECENTLY_VIEWED_KEY = 'ari_styles_recently_viewed';
const MAX_ITEMS = 8;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useLocalStorage(RECENTLY_VIEWED_KEY, []);

  const addRecentlyViewed = useCallback((product) => {
    if (!product || !product.id) return;

    setRecentlyViewed((prev) => {
      // Remove if existing to put it at the front
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [
        {
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice,
          thumbnail: product.thumbnail || product.images?.[0],
          rating: product.rating,
          reviewCount: product.reviewCount,
          viewedAt: Date.now(),
        },
        ...filtered,
      ].slice(0, MAX_ITEMS);

      return updated;
    });
  }, [setRecentlyViewed]);

  const clearRecentlyViewed = useCallback(() => {
    setRecentlyViewed([]);
  }, [setRecentlyViewed]);

  return {
    recentlyViewed,
    addRecentlyViewed,
    clearRecentlyViewed,
  };
}

export default useRecentlyViewed;
