/**
 * Indian Rupee & Price Formatting Utilities
 */

import { siteConfig } from '../config/siteConfig';

/**
 * Format a number into Indian Rupee representation (e.g. ₹1,999 or ₹1,49,999)
 * @param {number} amount - numeric amount in INR
 * @param {boolean} includeSymbol - whether to prefix with ₹
 * @returns {string} formatted currency string
 */
export const formatPrice = (amount, includeSymbol = true) => {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return includeSymbol ? `${siteConfig.currency.symbol}0` : '0';
  }

  const num = Math.round(Number(amount));
  
  // Format according to Indian Numbering System (Lakhs, Crores)
  const formatted = num.toLocaleString('en-IN', {
    maximumFractionDigits: 0,
    useGrouping: true,
  });

  return includeSymbol ? `${siteConfig.currency.symbol}${formatted}` : formatted;
};

/**
 * Calculate percentage discount between original price and current price
 * @param {number} originalPrice 
 * @param {number} currentPrice 
 * @returns {number} percentage rounded
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

export default {
  formatPrice,
  calculateDiscount,
};
