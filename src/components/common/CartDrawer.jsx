import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/currency';
import { siteConfig } from '../../config/siteConfig';

export const CartDrawer = () => {
  const {
    items,
    itemCount,
    subtotal,
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
    isCartDrawerOpen,
    closeCartDrawer,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    removeCoupon,
  } = useCart();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const navigate = useNavigate();

  // Handle ESC key and scroll lock
  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        closeCartDrawer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartDrawerOpen, closeCartDrawer]);

  const handleApplyCoupon = async (e) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    setIsApplyingCoupon(true);
    await applyCoupon(couponCodeInput);
    setIsApplyingCoupon(false);
    setCouponCodeInput('');
  };

  const handleCheckout = () => {
    closeCartDrawer();
    navigate('/checkout');
  };

  if (!isCartDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeCartDrawer}
        aria-hidden="true"
      />

      {/* Slide-In Drawer */}
      <div className="relative w-full max-w-md bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 animate-slide-in-right">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-luxury-border bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-luxury-black" />
            <h3 className="font-serif text-lg font-bold tracking-wide text-luxury-black">
              Shopping Bag ({itemCount})
            </h3>
          </div>
          <button
            onClick={closeCartDrawer}
            aria-label="Close cart drawer"
            className="p-1.5 text-neutral-500 hover:text-luxury-black transition-colors rounded-full hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-brand-50 px-5 py-3 border-b border-brand-200/80">
          <div className="flex items-center justify-between text-[11px] font-medium mb-1.5">
            {isFreeShippingQualified ? (
              <span className="text-emerald-800 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" />
                You have unlocked Complimentary Express Shipping!
              </span>
            ) : (
              <span className="text-neutral-700">
                Add <span className="font-bold text-luxury-black">{formatPrice(amountNeededForFreeShipping)}</span> more for Free Shipping
              </span>
            )}
            <span className="text-neutral-500 font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-1.5 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                isFreeShippingQualified ? 'bg-emerald-600' : 'bg-luxury-black'
              }`}
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Drawer Body: Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 divide-y divide-luxury-border/60">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4 text-neutral-400">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif text-lg font-bold text-luxury-black">Your bag is empty</h4>
              <p className="text-xs text-neutral-500 mt-1.5 max-w-xs leading-relaxed">
                Explore our modern essentials crafted with precision and purpose.
              </p>
              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/shop');
                }}
                className="btn-luxury mt-6 text-[11px]"
              >
                Shop New Arrivals
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cartItemId} className="pt-4 first:pt-0 flex gap-3.5 group">
                <Link
                  to={`/product/${item.slug}`}
                  onClick={closeCartDrawer}
                  className="w-20 h-26 bg-neutral-100 rounded-xs overflow-hidden flex-shrink-0 relative border border-luxury-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.slug}`}
                        onClick={closeCartDrawer}
                        className="text-xs font-semibold text-luxury-black hover:text-luxury-gold transition-colors line-clamp-1"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-neutral-400 hover:text-red-600 transition-colors p-0.5"
                        aria-label={`Remove ${item.name} from cart`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-1">
                      <span>Size: <strong className="text-luxury-black uppercase">{item.size}</strong></span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        Color:
                        <span
                          className="w-2.5 h-2.5 rounded-full inline-block border border-neutral-300"
                          style={{ backgroundColor: item.color?.hex || '#111' }}
                        />
                        <strong className="text-luxury-black">{item.color?.name}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-xs font-bold text-luxury-black">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-2 pt-2">
                    <div className="inline-flex items-center border border-luxury-border rounded-xs bg-white">
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                        className="p-1.5 text-neutral-600 hover:text-luxury-black hover:bg-neutral-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-semibold text-luxury-black min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="p-1.5 text-neutral-600 hover:text-luxury-black hover:bg-neutral-100 transition-colors disabled:opacity-30"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-luxury-black">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer: Calculations, Coupon & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-luxury-border bg-white space-y-3 sticky bottom-0 z-10 shadow-lg">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2 bg-brand-50 border border-brand-200 rounded-xs text-xs">
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-700" />
                    <span className="font-bold text-emerald-800">{appliedCoupon.code}</span>
                    <span className="text-neutral-500">applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[10px] text-red-600 hover:underline font-semibold uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCodeInput}
                    onChange={(e) => setCouponCodeInput(e.target.value.toUpperCase())}
                    placeholder="Promo code (e.g. ARI10)"
                    className="flex-1 px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black uppercase tracking-wider placeholder:normal-case placeholder:tracking-normal focus:outline-hidden focus:border-luxury-black"
                  />
                  <button
                    type="submit"
                    disabled={isApplyingCoupon || !couponCodeInput.trim()}
                    className="px-3.5 py-2 bg-luxury-black text-white text-[10px] font-bold tracking-widest uppercase rounded-xs hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                  >
                    {isApplyingCoupon ? '...' : 'Apply'}
                  </button>
                </form>
              )}
              {couponError && <p className="text-[11px] text-red-600 mt-1">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-700 mt-1">{couponSuccess}</p>}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs pt-1 border-t border-neutral-100">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span>-{formatPrice(couponDiscount)}</span>
                </div>
              )}
              <div className="flex justify-between text-neutral-600">
                <span>Estimated Shipping</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700 font-medium uppercase text-[11px]">FREE</strong> : formatPrice(shippingFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-luxury-black pt-2 border-t border-luxury-border">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
              <p className="text-[10px] text-neutral-400 text-center">
                Taxes included. Fast, secure checkout.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckout}
                className="w-full btn-luxury py-3.5 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  closeCartDrawer();
                  navigate('/cart');
                }}
                className="w-full btn-luxury-outline py-2.5 text-[11px]"
              >
                View Full Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
