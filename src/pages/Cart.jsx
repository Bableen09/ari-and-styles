import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShoppingBag,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  Tag,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { formatPrice } from '../utils/currency';
import { siteConfig } from '../config/siteConfig';
import { products } from '../data/products';
import { analyticsService } from '../services/analyticsService';

export const Cart = () => {
  const {
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
    isFreeShippingQualified,
    appliedCoupon,
    couponError,
    couponSuccess,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const { addToWishlist } = useWishlist();
  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    analyticsService.pageView('/cart', 'Shopping Bag — Ari & Styles');
    window.scrollTo(0, 0);
  }, []);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCoupon(couponInput);
    setIsApplying(false);
    setCouponInput('');
  };

  const handleMoveToWishlist = (item) => {
    const fullProduct = products.find((p) => p.id === item.id) || item;
    addToWishlist(fullProduct);
    removeFromCart(item.cartItemId);
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title={`Shopping Bag (${itemCount})`}
        description="Review and complete your Ari & Styles order."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shopping Bag', url: '/cart' }]} />

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between py-6 sm:py-8 border-b border-luxury-border gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Order Review
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-1">
              YOUR SHOPPING BAG ({itemCount})
            </h1>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs uppercase tracking-wider font-semibold text-neutral-500 hover:text-red-600 transition-colors self-start sm:self-auto"
            >
              Clear Entire Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="py-12">
            <EmptyState
              icon={<ShoppingBag className="w-8 h-8 text-neutral-300" />}
              title="YOUR BAG IS EMPTY"
              description="Explore our contemporary luxury pieces designed beyond ordinary."
              actionLabel="EXPLORE THE COLLECTION"
              actionLink="/shop"
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 py-8">
            {/* Left: Cart Items & Free Shipping Bar (8 cols) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Free Shipping Progress Alert */}
              <div className="p-4 bg-white rounded-xs border border-luxury-border shadow-2xs">
                <div className="flex items-center justify-between text-xs font-medium mb-2">
                  {isFreeShippingQualified ? (
                    <span className="text-emerald-800 font-semibold flex items-center gap-1.5">
                      <Check className="w-4 h-4" />
                      Complimentary Express Shipping is activated on this order!
                    </span>
                  ) : (
                    <span className="text-neutral-700">
                      Add <strong className="text-luxury-black">{formatPrice(amountNeededForFreeShipping)}</strong> more to qualify for <strong className="text-luxury-black">Free Shipping</strong> across India.
                    </span>
                  )}
                  <span className="text-neutral-500 font-bold">{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-neutral-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isFreeShippingQualified ? 'bg-emerald-600' : 'bg-luxury-black'
                    }`}
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white rounded-xs border border-luxury-border divide-y divide-luxury-border/60 shadow-2xs">
                {items.map((item) => (
                  <div key={item.cartItemId} className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 group">
                    {/* Thumbnail */}
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-24 h-32 sm:w-28 sm:h-36 bg-neutral-100 rounded-xs overflow-hidden flex-shrink-0 border border-luxury-border relative"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-semibold block">
                              {item.category}
                            </span>
                            <Link
                              to={`/product/${item.slug}`}
                              className="font-serif text-base sm:text-lg font-bold text-luxury-black hover:text-luxury-gold transition-colors"
                            >
                              {item.name}
                            </Link>
                          </div>
                          <span className="font-bold text-sm sm:text-base text-luxury-black">
                            {formatPrice(item.price * item.quantity)}
                          </span>
                        </div>

                        {/* Specs */}
                        <div className="flex flex-wrap items-center gap-4 text-xs text-neutral-500 mt-2">
                          <span>
                            Size: <strong className="text-luxury-black uppercase">{item.size}</strong>
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5">
                            Color:
                            <span
                              className="w-3 h-3 rounded-full border border-black/10 inline-block"
                              style={{ backgroundColor: item.color?.hex || '#111' }}
                            />
                            <strong className="text-luxury-black">{item.color?.name}</strong>
                          </span>
                          <span>•</span>
                          <span>
                            Unit Price: <strong className="text-luxury-black">{formatPrice(item.price)}</strong>
                          </span>
                        </div>
                      </div>

                      {/* Controls (Quantity + Actions) */}
                      <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100 flex-wrap gap-3">
                        <div className="inline-flex items-center border border-luxury-border rounded-xs bg-[#FAF9F5]">
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                            className="p-2 text-neutral-600 hover:text-luxury-black hover:bg-neutral-200/60 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="px-4 text-xs font-bold text-luxury-black min-w-[28px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                            disabled={item.quantity >= item.maxStock}
                            className="p-2 text-neutral-600 hover:text-luxury-black hover:bg-neutral-200/60 transition-colors disabled:opacity-30"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center space-x-4 text-xs">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="inline-flex items-center gap-1 text-neutral-500 hover:text-luxury-black transition-colors"
                          >
                            <Heart className="w-3.5 h-3.5" />
                            <span>Save for later</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="inline-flex items-center gap-1 text-neutral-500 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Link */}
              <div className="flex justify-between items-center pt-2">
                <Link
                  to="/shop"
                  className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-luxury-black inline-flex items-center gap-1.5"
                >
                  <span>← Continue Browsing Collection</span>
                </Link>
              </div>
            </div>

            {/* Right: Order Summary Card & Promo Code (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Order Summary Box */}
              <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-5 sticky top-24">
                <h3 className="font-serif text-lg font-bold text-luxury-black pb-3 border-b border-luxury-border">
                  Order Summary
                </h3>

                {/* Promo Code Input */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-luxury-black mb-1.5">
                    Promotional Code
                  </label>
                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-3 bg-brand-50 border border-brand-200 rounded-xs text-xs">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-emerald-700" />
                        <div>
                          <span className="font-bold text-emerald-800 uppercase">{appliedCoupon.code}</span>
                          <span className="text-[11px] text-neutral-500 block">{appliedCoupon.description}</span>
                        </div>
                      </div>
                      <button
                        onClick={removeCoupon}
                        className="text-xs text-red-600 hover:underline font-bold uppercase tracking-wider"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyCoupon} className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="e.g. ARI10 or WELCOME15"
                        className="flex-1 px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus:outline-hidden focus:border-luxury-black"
                      />
                      <button
                        type="submit"
                        disabled={isApplying || !couponInput.trim()}
                        className="px-4 py-2.5 bg-luxury-black text-white text-xs font-bold uppercase tracking-widest rounded-xs hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                      >
                        {isApplying ? '...' : 'Apply'}
                      </button>
                    </form>
                  )}
                  {couponError && <p className="text-xs text-red-600 mt-1.5">{couponError}</p>}
                  {couponSuccess && <p className="text-xs text-emerald-700 mt-1.5">{couponSuccess}</p>}
                </div>

                {/* Calculation Rows */}
                <div className="space-y-2.5 text-xs pt-2 border-t border-neutral-100">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {catalogSavings > 0 && (
                    <div className="flex justify-between text-neutral-500">
                      <span>Catalog Discount</span>
                      <span>-{formatPrice(catalogSavings)}</span>
                    </div>
                  )}

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Shipping</span>
                    <span>
                      {shippingFee === 0 ? (
                        <strong className="text-emerald-700 font-bold uppercase text-[11px]">
                          COMPLIMENTARY
                        </strong>
                      ) : (
                        formatPrice(shippingFee)
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between text-neutral-600">
                    <span>Estimated Tax (GST 12%)</span>
                    <span className="text-[11px] text-neutral-500">Included in Price</span>
                  </div>

                  <div className="flex justify-between text-base font-bold text-luxury-black pt-3 border-t border-luxury-border">
                    <span>Total Amount</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Checkout CTA */}
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full btn-luxury py-4 text-xs flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Trust Badges */}
                <div className="pt-3 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>256-Bit SSL Encrypted Indian Payments</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>Doorstep 30-Day Exchange Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
