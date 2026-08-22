import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Banknote,
  Lock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Truck,
  RotateCcw,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useCart } from '../hooks/useCart';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';
import { validateCheckoutForm } from '../utils/validation';
import { orderService } from '../services/orderService';
import { paymentService } from '../services/paymentService';
import { analyticsService } from '../services/analyticsService';
import { siteConfig } from '../config/siteConfig';

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat',
  'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal', 'Delhi NCR', 'Chandigarh', 'Jammu & Kashmir'
];

export const Checkout = () => {
  const {
    items,
    itemCount,
    subtotal,
    couponDiscount,
    shippingFee,
    total,
    appliedCoupon,
    clearCart,
  } = useCart();

  const { user } = useAuth();
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    email: user?.email || '',
    phone: user?.phone || '',
    fullName: user?.fullName || '',
    address: user?.addresses?.[0]?.address || '',
    apartment: user?.addresses?.[0]?.apartment || '',
    city: user?.addresses?.[0]?.city || '',
    state: user?.addresses?.[0]?.state || 'Haryana',
    pincode: user?.addresses?.[0]?.pincode || '',
    saveAddress: true,
    paymentMethod: 'upi', // 'upi' | 'card' | 'cod'
  });

  const [formErrors, setFormErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
      return;
    }
    analyticsService.beginCheckout(items, total);
    analyticsService.pageView('/checkout', 'Secure Checkout — Ari & Styles');
    window.scrollTo(0, 0);
  }, [items, total, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear field-specific error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    // Validate form
    const validation = validateCheckoutForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(validation.errors)[0];
      const errorElement = document.querySelector(`[name="${firstErrorKey}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        errorElement.focus();
      }
      return;
    }

    setIsProcessing(true);

    try {
      // 1. Process payment via payment abstraction
      const paymentResult = await paymentService.processPayment({
        method: formData.paymentMethod,
        amount: total,
        customerInfo: formData,
      });

      // 2. Create authoritative order via order service
      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          address: formData.address,
          apartment: formData.apartment,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          country: 'India',
        },
        payment: {
          method: formData.paymentMethod,
          paymentId: paymentResult.paymentId,
          status: paymentResult.status,
        },
        items: items.map((i) => ({
          id: i.id,
          slug: i.slug,
          name: i.name,
          image: i.image,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
          color: i.color,
          sku: i.sku,
        })),
        pricing: {
          subtotal,
          couponDiscount,
          shippingFee,
          total,
          couponCode: appliedCoupon?.code || null,
        },
      };

      const createdOrder = await orderService.createOrder(orderPayload);
      analyticsService.purchase(createdOrder);

      // 3. Clear cart and redirect to order success
      clearCart();
      navigate('/order-success', { state: { order: createdOrder } });
    } catch (err) {
      console.error('Order placement error', err);
      setIsProcessing(false);
      setFormErrors({ general: 'Failed to finalize your order. Please review your details and try again.' });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Secure Checkout"
        description="Complete your order with Ari & Styles. Encrypted and safe payment options."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Shopping Bag', url: '/cart' },
            { label: 'Secure Checkout', url: '/checkout' },
          ]}
        />

        {/* Checkout Header */}
        <div className="py-6 sm:py-8 border-b border-luxury-border">
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-1">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit Encrypted Checkout</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
            CONFIRM & COMPLETE ORDER
          </h1>
        </div>

        <form onSubmit={handlePlaceOrder} className="py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Input Form Columns (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {formErrors.general && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xs flex items-center gap-3 text-xs text-red-700">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{formErrors.general}</span>
                </div>
              )}

              {/* Step 1: Contact Information */}
              <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="font-serif text-lg font-bold text-luxury-black">
                    1. Contact Information
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                    Step 1 of 3
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="arjun@example.com"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                        formErrors.email ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Mobile Number (10 Digits) *
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 bg-neutral-100 border border-r-0 border-luxury-border text-xs font-semibold text-neutral-600 rounded-l-xs">
                        +91
                      </span>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-r-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          formErrors.phone ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                    </div>
                    {formErrors.phone && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2: Delivery Address */}
              <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="font-serif text-lg font-bold text-luxury-black">
                    2. Delivery Address
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                    Step 2 of 3
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Full Recipient Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="e.g. Arjun Singhania"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                        formErrors.fullName ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Street Address & House/Flat No. *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="House / Villa 14, Magnolia Enclave, Sector 29"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                        formErrors.address ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Apartment, Floor, Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleChange}
                      placeholder="Near City Club / Phase 5"
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Gurugram"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          formErrors.city ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                      {formErrors.city && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.city}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        required
                        value={formData.state}
                        onChange={handleChange}
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          formErrors.state ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      >
                        {INDIAN_STATES.map((st) => (
                          <option key={st} value={st}>
                            {st}
                          </option>
                        ))}
                      </select>
                      {formErrors.state && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.state}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        PIN Code *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        maxLength={6}
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="122002"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          formErrors.pincode ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                      {formErrors.pincode && (
                        <p className="text-[11px] text-red-600 mt-1">{formErrors.pincode}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3: Payment Options */}
              <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                  <h3 className="font-serif text-lg font-bold text-luxury-black">
                    3. Payment Method
                  </h3>
                  <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">
                    Step 3 of 3
                  </span>
                </div>

                <div className="space-y-3">
                  {/* Option 1: UPI */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xs border cursor-pointer transition-all ${
                      formData.paymentMethod === 'upi'
                        ? 'border-luxury-black bg-brand-50 shadow-xs'
                        : 'border-luxury-border hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="upi"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={handleChange}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Smartphone className="w-4 h-4 text-luxury-gold" />
                          <span className="text-xs font-bold uppercase tracking-wider text-luxury-black">
                            UPI Instant Transfer (Recommended)
                          </span>
                        </div>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-xs uppercase">
                          Zero Fees
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Google Pay, PhonePe, Paytm, BHIM, and all Indian bank UPI apps.
                      </p>
                    </div>
                  </label>

                  {/* Option 2: Cards */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xs border cursor-pointer transition-all ${
                      formData.paymentMethod === 'card'
                        ? 'border-luxury-black bg-brand-50 shadow-xs'
                        : 'border-luxury-border hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-luxury-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-luxury-black">
                          Credit / Debit Card
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Visa, Mastercard, RuPay, and American Express cards issued across India.
                      </p>
                    </div>
                  </label>

                  {/* Option 3: Cash on Delivery */}
                  <label
                    className={`flex items-start gap-3 p-4 rounded-xs border cursor-pointer transition-all ${
                      formData.paymentMethod === 'cod'
                        ? 'border-luxury-black bg-brand-50 shadow-xs'
                        : 'border-luxury-border hover:border-neutral-400 bg-white'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="mt-1 accent-black"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-luxury-gold" />
                        <span className="text-xs font-bold uppercase tracking-wider text-luxury-black">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-1">
                        Pay in cash or via UPI QR code to the courier delivery executive upon arrival.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Right: Order Summary Sidebar (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-5 sticky top-24">
                <h3 className="font-serif text-lg font-bold text-luxury-black pb-3 border-b border-luxury-border">
                  Order Summary ({itemCount} items)
                </h3>

                {/* Items Mini List */}
                <div className="max-h-60 overflow-y-auto divide-y divide-neutral-100 pr-1 no-scrollbar">
                  {items.map((item) => (
                    <div key={item.cartItemId} className="py-2.5 first:pt-0 flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-16 object-cover rounded-xs border border-luxury-border flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-semibold text-luxury-black truncate">
                          {item.name}
                        </h5>
                        <p className="text-[11px] text-neutral-500">
                          Qty: {item.quantity} • Size: {item.size} • {item.color?.name}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-luxury-black">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-2 text-xs pt-3 border-t border-neutral-100">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-emerald-700 font-bold">
                      <span>Coupon Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(couponDiscount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
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
                    <span>GST (12% Included)</span>
                    <span className="text-neutral-500">₹0 extra</span>
                  </div>

                  <div className="flex justify-between text-lg font-bold text-luxury-black pt-3 border-t border-luxury-border">
                    <span>Total Amount</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                {/* Place Order CTA Button */}
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full btn-luxury py-4 text-xs flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>
                    {isProcessing ? 'Processing Order...' : `PLACE ORDER • ${formatPrice(total)}`}
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="pt-4 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>Your personal information is encrypted and secure</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>Tracked delivery across India</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-3.5 h-3.5 text-luxury-gold flex-shrink-0" />
                    <span>30-Day Hassle-Free Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;
