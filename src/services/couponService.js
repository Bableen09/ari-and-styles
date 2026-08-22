/**
 * Coupon Service Abstraction Layer
 * Handles discount calculations and code validations.
 * Replaceable with POST /api/v1/coupons/validate backend endpoint.
 */

import { coupons } from '../data/coupons';

export const couponService = {
  /**
   * Validate coupon against cart subtotal
   * @param {string} code 
   * @param {number} subtotal 
   * @returns {Promise<{ isValid: boolean, discountAmount: number, message: string, coupon: object|null }>}
   */
  async validateCoupon(code, subtotal) {
    if (!code || typeof code !== 'string') {
      return {
        isValid: false,
        discountAmount: 0,
        message: 'Please enter a valid coupon code.',
        coupon: null,
      };
    }

    const cleanCode = code.trim().toUpperCase();
    const foundCoupon = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!foundCoupon) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Coupon code "${cleanCode}" is invalid.`,
        coupon: null,
      };
    }

    if (!foundCoupon.isActive) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Coupon "${cleanCode}" has expired.`,
        coupon: null,
      };
    }

    if (foundCoupon.minOrderValue > 0 && subtotal < foundCoupon.minOrderValue) {
      return {
        isValid: false,
        discountAmount: 0,
        message: `Coupon "${cleanCode}" requires a minimum order value of ₹${foundCoupon.minOrderValue.toLocaleString('en-IN')}.`,
        coupon: null,
      };
    }

    let discountAmount = 0;
    if (foundCoupon.type === 'percentage') {
      discountAmount = (subtotal * foundCoupon.value) / 100;
      if (foundCoupon.maxDiscount && discountAmount > foundCoupon.maxDiscount) {
        discountAmount = foundCoupon.maxDiscount;
      }
    } else if (foundCoupon.type === 'fixed') {
      discountAmount = foundCoupon.value;
    } else if (foundCoupon.type === 'shipping') {
      // Shipping coupon handled directly in cart calculation
      discountAmount = 0;
    }

    return {
      isValid: true,
      discountAmount: Math.round(discountAmount),
      message: `Coupon "${cleanCode}" applied successfully!`,
      coupon: foundCoupon,
    };
  },
};

export default couponService;
