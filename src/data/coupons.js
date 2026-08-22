/**
 * Ari & Styles Coupon Definitions
 * Validated coupons with minimum order values, discount types, and expiration rules.
 */

export const coupons = [
  {
    code: "ARI10",
    description: "10% off your entire order",
    type: "percentage", // 'percentage' | 'fixed' | 'shipping'
    value: 10,
    minOrderValue: 0,
    maxDiscount: 1000,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "WELCOME15",
    description: "15% off for new members on orders above ₹1,499",
    type: "percentage",
    value: 15,
    minOrderValue: 1499,
    maxDiscount: 1500,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "FREESHIP",
    description: "Complimentary shipping on any order",
    type: "shipping",
    value: 100, // 100% off shipping
    minOrderValue: 0,
    maxDiscount: 299,
    expiryDate: "2026-12-31",
    isActive: true,
  },
  {
    code: "BEYOND20",
    description: "20% off premium styling on orders above ₹2,999",
    type: "percentage",
    value: 20,
    minOrderValue: 2999,
    maxDiscount: 2000,
    expiryDate: "2026-12-31",
    isActive: true,
  },
];

export default coupons;
