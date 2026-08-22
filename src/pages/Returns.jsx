import React, { useEffect } from 'react';
import { RotateCcw, CheckCircle2, ShieldCheck, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

export const Returns = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="30-Day Hassle-Free Returns & Exchanges"
        description="Learn how to return or exchange items at Ari & Styles with our 30-day doorstep policy."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Return Policy', url: '/returns' }]} />

        {/* Header */}
        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Client Peace of Mind
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            30-DAY RETURNS & EXCHANGES
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2">
            Effortless doorstep pickups and prompt refunds for unworn items.
          </p>
        </div>

        {/* 3 Step Flow */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 py-8">
          <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <span className="font-serif text-2xl font-bold text-luxury-gold">01</span>
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Initiate Request
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Visit your Account Orders page or email our concierge within 30 days of receiving your package.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <span className="font-serif text-2xl font-bold text-luxury-gold">02</span>
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Doorstep Pickup
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Our courier executive will collect the package from your doorstep with zero extra return fee.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-2">
            <span className="font-serif text-2xl font-bold text-luxury-gold">03</span>
            <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
              Instant Refund
            </h4>
            <p className="text-xs text-neutral-500 leading-relaxed">
              Upon quality inspection at our atelier, your refund will be transferred directly to your bank/UPI.
            </p>
          </div>
        </div>

        {/* Detailed Guidelines */}
        <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed">
          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              1. Eligibility Criteria
            </h3>
            <p>
              To ensure all customers receive pristine luxury garments, items must satisfy the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li>Item must be unworn, unwashed, and free of fragrance or stains.</li>
              <li>All original branded security tags and polybag packaging must be attached.</li>
              <li>Footwear or accessories must be in original boxes without scuffs.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              2. Damaged or Defective Items
            </h3>
            <p>
              In the rare event that a garment arrives damaged or flawed, please notify concierge@ariandstyles.com within 48 hours of delivery with photos. We will expedite a priority replacement immediately.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              3. Exchanges for Different Sizes
            </h3>
            <p>
              Size exchanges are 100% complimentary. If you require a different size or fit, our team will dispatch the new replacement size right away upon pickup of the original item.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Returns;
