import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Package, Truck, ArrowRight, ShieldCheck, ShoppingBag, Download } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { formatPrice } from '../utils/currency';
import { siteConfig } from '../config/siteConfig';

export const OrderSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fallback demo order if visited directly
  const displayOrder = order || {
    orderId: `AS-${new Date().getFullYear()}-749210`,
    createdAt: new Date().toISOString(),
    estimatedDelivery: 'Thu, Feb 26',
    status: 'Confirmed',
    customer: {
      fullName: 'Arjun Singhania',
      email: 'arjun.singhania@example.com',
      phone: '+91 98100 12345',
    },
    shippingAddress: {
      address: 'Villa 14, The Magnolia Enclave, Golf Course Road',
      apartment: 'Phase 5',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002',
      country: 'India',
    },
    payment: {
      method: 'UPI Instant Transfer',
      paymentId: 'UPI-RR-928471920',
      status: 'PAID',
    },
    items: [
      {
        id: 'as-jkt-001',
        slug: 'urban-oversized-denim-jacket',
        name: 'Urban Oversized Denim Jacket',
        image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80',
        price: 2499,
        quantity: 1,
        size: 'L',
        color: { name: 'Washed Vintage Indigo' },
      },
    ],
    pricing: {
      subtotal: 2499,
      couponDiscount: 250,
      shippingFee: 0,
      total: 2249,
      couponCode: 'ARI10',
    },
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-10 sm:py-16">
      <SEO
        title={`Order Confirmed #${displayOrder.orderId}`}
        description="Your Ari & Styles order has been confirmed."
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header Card */}
        <div className="bg-white p-8 sm:p-10 rounded-xs border border-luxury-border shadow-md text-center space-y-4">
          <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2 animate-scale-in">
            <CheckCircle2 className="w-9 h-9" />
          </div>

          <span className="text-[10px] font-bold tracking-widest uppercase text-luxury-gold block">
            Order Confirmation
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
            ORDER CONFIRMED
          </h1>

          <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Thank you for shopping with <strong className="text-luxury-black">{siteConfig.brand.name}</strong>. We are carefully preparing your pieces for shipment from our Atelier.
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-50 border border-brand-200 rounded-xs text-xs font-bold text-luxury-black">
            <span>Order Reference:</span>
            <span className="text-luxury-gold uppercase tracking-wider">{displayOrder.orderId}</span>
          </div>
        </div>

        {/* Tracking & Timeline Card */}
        <div className="mt-8 bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-luxury-gold" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider text-luxury-black">
                  Estimated Delivery Date
                </h4>
                <p className="text-sm font-bold text-emerald-800">
                  {displayOrder.estimatedDelivery} (3–5 Business Days)
                </p>
              </div>
            </div>
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] uppercase tracking-wider rounded-xs self-start sm:self-auto">
              Status: {displayOrder.status || 'Confirmed'}
            </span>
          </div>

          {/* Ordered Items Summary */}
          <div>
            <h4 className="font-serif text-base font-bold text-luxury-black mb-3">
              Garments in this Order
            </h4>
            <div className="divide-y divide-neutral-100">
              {displayOrder.items.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-16 object-cover rounded-xs border border-luxury-border flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <Link
                        to={`/product/${item.slug}`}
                        className="text-xs font-semibold text-luxury-black hover:underline truncate block"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} • Size: {item.size} • {item.color?.name || 'Standard'}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-luxury-black flex-shrink-0">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Payment Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-neutral-100 text-xs">
            <div>
              <h5 className="font-bold uppercase tracking-wider text-neutral-400 text-[10px] mb-1.5">
                Shipping Address
              </h5>
              <p className="font-bold text-luxury-black">{displayOrder.customer?.fullName}</p>
              <p className="text-neutral-600">{displayOrder.shippingAddress?.address}</p>
              {displayOrder.shippingAddress?.apartment && (
                <p className="text-neutral-600">{displayOrder.shippingAddress?.apartment}</p>
              )}
              <p className="text-neutral-600">
                {displayOrder.shippingAddress?.city}, {displayOrder.shippingAddress?.state} — {displayOrder.shippingAddress?.pincode}
              </p>
              <p className="text-neutral-600">Phone: {displayOrder.customer?.phone}</p>
            </div>

            <div>
              <h5 className="font-bold uppercase tracking-wider text-neutral-400 text-[10px] mb-1.5">
                Financial Summary
              </h5>
              <div className="space-y-1 text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(displayOrder.pricing?.subtotal)}</span>
                </div>
                {displayOrder.pricing?.couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-medium">
                    <span>Discount:</span>
                    <span>-{formatPrice(displayOrder.pricing?.couponDiscount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>{displayOrder.pricing?.shippingFee === 0 ? 'Complimentary' : formatPrice(displayOrder.pricing?.shippingFee)}</span>
                </div>
                <div className="flex justify-between font-bold text-luxury-black pt-1 border-t border-neutral-100 text-sm">
                  <span>Total Paid:</span>
                  <span>{formatPrice(displayOrder.pricing?.total)}</span>
                </div>
                <div className="text-[11px] text-neutral-400 pt-1">
                  Payment: {displayOrder.payment?.method || 'UPI / Card'}
                </div>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-neutral-100 flex flex-col sm:flex-row gap-3">
            <Link
              to="/shop"
              className="flex-1 btn-luxury py-3.5 text-xs inline-flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Continue Shopping</span>
            </Link>

            <Link
              to="/account"
              className="flex-1 btn-luxury-outline py-3.5 text-xs inline-flex items-center justify-center gap-2"
            >
              <span>View Order History</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
