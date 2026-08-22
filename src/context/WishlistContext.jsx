import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { analyticsService } from '../services/analyticsService';

const WishlistContext = createContext(null);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useLocalStorage('ari_styles_wishlist', []);
  const { showSuccess, showInfo } = useToast();

  const isInWishlist = useCallback((productId) => {
    return wishlist.some((item) => item.id === productId);
  }, [wishlist]);

  const addToWishlist = useCallback((product) => {
    if (!product) return;
    setWishlist((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      analyticsService.wishlistToggle(product, true);
      showSuccess(`Added "${product.name}" to wishlist`);
      return [...prev, product];
    });
  }, [setWishlist, showSuccess]);

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => {
      const itemToRemove = prev.find((item) => item.id === productId);
      if (itemToRemove) {
        analyticsService.wishlistToggle(itemToRemove, false);
        showInfo(`Removed "${itemToRemove.name}" from wishlist`);
      }
      return prev.filter((item) => item.id !== productId);
    });
  }, [setWishlist, showInfo]);

  const toggleWishlist = useCallback((product) => {
    if (!product) return;
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  }, [isInWishlist, addToWishlist, removeFromWishlist]);

  const clearWishlist = useCallback(() => {
    setWishlist([]);
  }, [setWishlist]);

  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  const value = {
    wishlist,
    wishlistCount,
    isInWishlist,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};

export default WishlistContext;
