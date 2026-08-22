import React, { useEffect } from 'react';
import { Truck, Clock, ShieldCheck, MapPin, CheckCircle } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

export const Shipping = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Shipping & Delivery Policy"
        description="Learn about Ari & Styles domestic delivery timelines across India, shipping charges, and tracking."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Shipping Policy', url: '/shipping' }]} />

        {/* Header */}
        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Logistics & Transit
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            SHIPPING & DELIVERY
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Transparent timelines and reliable domestic delivery across all 28 Indian states.
          </p>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8">
          <div className="bg-white p-5 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <Truck className="w-5 h-5 text-luxury-gold" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Complimentary Shipping
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Available on all orders over ₹{siteConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')}.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <Clock className="w-5 h-5 text-luxury-gold" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Dispatch Window
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Dispatched within 24–48 hours from our Gurugram Atelier.
            </p>
          </div>

          <div className="bg-white p-5 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <MapPin className="w-5 h-5 text-luxury-gold" />
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Coverage
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              19,000+ PIN codes served across India with live GPS tracking.
            </p>
          </div>
        </div>

        {/* Detailed Policy Text */}
        <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              1. Domestic Transit Timelines
            </h3>
            <p>
              We partner with premier express logistics services including BlueDart, Delhivery, and DTDC to ensure safe, rapid fulfillment:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li><strong>Tier 1 Metros (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai, Pune):</strong> 2–4 Business Days</li>
              <li><strong>Tier 2 Cities (Jaipur, Lucknow, Chandigarh, Ahmedabad, Indore, Kochi):</strong> 3–5 Business Days</li>
              <li><strong>Tier 3 & Remote Regions (North East, J&K, Island territories):</strong> 5–7 Business Days</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              2. Shipping Charges & Thresholds
            </h3>
            <p>
              All orders above ₹{siteConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')} qualify for complimentary domestic express delivery. For orders below ₹{siteConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')}, a flat fee of ₹{siteConfig.shipping.standardShippingFee} is applied at checkout.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              3. Cash on Delivery (COD) Guidelines
            </h3>
            <p>
              Cash on Delivery is available for all standard pin codes. For COD orders, we kindly request customers to keep exact cash ready or scan the dynamic UPI QR code with the delivery executive.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              4. Order Tracking & Notifications
            </h3>
            <p>
              Immediately upon dispatch from our Atelier, you will receive an SMS and email notification containing your unique Tracking Number (Air Waybill Number) and direct tracking link.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
