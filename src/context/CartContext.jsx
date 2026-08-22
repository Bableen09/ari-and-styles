import React, { createContext, useContext, useState, useMemo, useCallback, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { useToast } from './ToastContext';
import { siteConfig } from '../config/siteConfig';
import { couponService } from '../services/couponService';
import { analyticsService } from '../services/analyticsService';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useLocalStorage('ari_styles_cart', []);
  const [appliedCoupon, setAppliedCoupon] = useLocalStorage('ari_styles_applied_coupon', null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const { showSuccess, showError, showInfo } = useToast();

  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);

  /**
   * Helper to generate unique cart key
   */
  const getCartKey = (id, size, colorName) => {
    return `${id}_${size || 'default'}_${colorName || 'default'}`;
  };

  /**
   * Add item to cart with size, color, quantity
   */
  const addToCart = useCallback((product, size, color, quantity = 1, shouldOpenDrawer = true) => {
    if (!product) return;

    if (!size && product.sizes && product.sizes.length > 0) {
      showError('Please select a size before adding to bag');
      return false;
    }

    const selectedColor = color || (product.colors && product.colors[0]) || { name: 'Default', hex: '#000000' };
    const selectedSize = size || (product.sizes && product.sizes[0]) || 'Standard';
    const cartItemId = getCartKey(product.id, selectedSize, selectedColor.name);

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        return updated;
      } else {
        const newItem = {
          cartItemId,
          id: product.id,
          slug: product.slug,
          name: product.name,
          category: product.category,
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.thumbnail || (product.images && product.images[0]) || '',
          size: selectedSize,
          color: selectedColor,
          quantity,
          sku: product.sku,
          stock: product.stock,
          maxStock: product.stockCount || 50,
        };
        return [...prevItems, newItem];
      }
    });

    analyticsService.addToCart(product, selectedSize, selectedColor, quantity);
    showSuccess(`Added "${product.name}" (${selectedSize}) to bag`);

    if (shouldOpenDrawer) {
      setIsCartDrawerOpen(true);
    }
    return true;
  }, [setItems, showSuccess, showError]);

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback((cartItemId) => {
    setItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.cartItemId === cartItemId);
      if (itemToRemove) {
        analyticsService.removeFromCart(itemToRemove);
        showInfo(`Removed "${itemToRemove.name}" from bag`);
      }
      return prevItems.filter((item) => item.cartItemId !== cartItemId);
    });
  }, [setItems, showInfo]);

  /**
   * Update item quantity
   */
  const updateQuantity = useCallback((cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.cartItemId === cartItemId) {
          const clampedQty = Math.min(newQuantity, item.maxStock || 50);
          return { ...item, quantity: clampedQty };
        }
        return item;
      })
    );
  }, [removeFromCart, setItems]);

  /**
   * Clear all items from cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
    setAppliedCoupon(null);
  }, [setItems, setAppliedCoupon]);

  // Derived financial calculations
  const itemCount = useMemo(() => {
    return items.reduce((acc, item) => acc + item.quantity, 0);
  }, [items]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [items]);

  const originalSubtotal = useMemo(() => {
    return items.reduce((acc, item) => acc + (item.originalPrice || item.price) * item.quantity, 0);
  }, [items]);

  const catalogSavings = useMemo(() => {
    return Math.max(0, originalSubtotal - subtotal);
  }, [originalSubtotal, subtotal]);

  // Revalidate coupon when subtotal changes
  useEffect(() => {
    if (appliedCoupon && subtotal > 0) {
      couponService.validateCoupon(appliedCoupon.code, subtotal).then((res) => {
        if (!res.isValid) {
          setAppliedCoupon(null);
          setCouponError(`Coupon "${appliedCoupon.code}" removed: Minimum order value not met.`);
          setTimeout(() => setCouponError(''), 4000);
        }
      });
    }
  }, [subtotal, appliedCoupon, setAppliedCoupon]);

  // Coupon discount amount
  const couponDiscount = useMemo(() => {
    if (!appliedCoupon || subtotal === 0) return 0;
    if (appliedCoupon.type === 'percentage') {
      const disc = (subtotal * appliedCoupon.value) / 100;
      return Math.round(appliedCoupon.maxDiscount ? Math.min(disc, appliedCoupon.maxDiscount) : disc);
    }
    if (appliedCoupon.type === 'fixed') {
      return Math.min(appliedCoupon.value, subtotal);
    }
    return 0;
  }, [appliedCoupon, subtotal]);

  // Shipping calculation
  const freeShippingThreshold = siteConfig.shipping.freeShippingThreshold;
  const isFreeShippingByThreshold = subtotal >= freeShippingThreshold;
  const isFreeShippingByCoupon = appliedCoupon?.type === 'shipping';
  
  const shippingFee = useMemo(() => {
    if (subtotal === 0) return 0;
    if (isFreeShippingByThreshold || isFreeShippingByCoupon) return 0;
    return siteConfig.shipping.standardShippingFee;
  }, [subtotal, isFreeShippingByThreshold, isFreeShippingByCoupon]);

  const amountNeededForFreeShipping = useMemo(() => {
    if (isFreeShippingByThreshold || isFreeShippingByCoupon) return 0;
    return Math.max(0, freeShippingThreshold - subtotal);
  }, [subtotal, freeShippingThreshold, isFreeShippingByThreshold, isFreeShippingByCoupon]);

  const freeShippingProgress = useMemo(() => {
    if (isFreeShippingByThreshold || isFreeShippingByCoupon) return 100;
    return Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  }, [subtotal, freeShippingThreshold, isFreeShippingByThreshold, isFreeShippingByCoupon]);

  // Total
  const total = useMemo(() => {
    if (subtotal === 0) return 0;
    return Math.max(0, subtotal - couponDiscount + shippingFee);
  }, [subtotal, couponDiscount, shippingFee]);

  // Apply Coupon action
  const applyCoupon = useCallback(async (code) => {
    setCouponError('');
    setCouponSuccess('');
    
    if (!code || code.trim() === '') {
      setCouponError('Please enter a coupon code');
      return false;
    }

    const res = await couponService.validateCoupon(code, subtotal);
    if (res.isValid && res.coupon) {
      setAppliedCoupon(res.coupon);
      setCouponSuccess(res.message);
      showSuccess(res.message);
      return true;
    } else {
      setCouponError(res.message);
      showError(res.message);
      return false;
    }
  }, [subtotal, setAppliedCoupon, showSuccess, showError]);

  const removeCoupon = useCallback(() => {
    const code = appliedCoupon?.code;
    setAppliedCoupon(null);
    setCouponSuccess('');
    setCouponError('');
    if (code) {
      showInfo(`Coupon "${code}" removed`);
    }
  }, [appliedCoupon, setAppliedCoupon, showInfo]);

  const value = {
    items,
    itemCount,
    subtotal,
    originalSubtotal,
    catalogSavings,
    couponDiscount,
    shippingFee,
    total,
    freeShippingThreshold,
    freeShippingProgress,
    amountNeededForFreeShipping,
    isFreeShippingQualified: isFreeShippingByThreshold || isFreeShippingByCoupon,
    appliedCoupon,
    couponError,
    couponSuccess,
    isCartDrawerOpen,
    openCartDrawer,
    closeCartDrawer,
    setIsCartDrawerOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
