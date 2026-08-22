import React, { useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

export const Privacy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Privacy Policy"
        description="Learn how Ari & Styles handles customer privacy, payment security, and data protection."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Privacy Policy', url: '/privacy' }]} />

        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Legal & Compliance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            PRIVACY POLICY
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Last Updated: February 2026 • {siteConfig.brand.legalName}
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xs border border-luxury-border shadow-2xs space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed my-8">
          <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-xs text-xs text-neutral-700 italic">
            Notice: This document represents a standard architectural placeholder structure for e-commerce legal compliance in India and does not constitute formal legal counsel.
          </div>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              1. Information We Collect
            </h3>
            <p>
              When you browse our catalog, save favorites to your wishlist, or complete a purchase with {siteConfig.brand.name}, we may collect the following information:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs text-neutral-600">
              <li><strong>Contact Information:</strong> Name, email address, phone number, and delivery address.</li>
              <li><strong>Transaction Data:</strong> Ordered garments, order reference IDs, delivery timestamps, and payment method summaries. Note: We never store your full payment card details or CVVs directly on our servers.</li>
              <li><strong>Device & Browsing Data:</strong> IP address, browser type, and interaction telemetry.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              2. How We Utilize Your Data
            </h3>
            <p>
              Your data is collected strictly to fulfill orders, arrange express courier pickups and deliveries, process returns and refunds, and inform you of new drops if subscribed to our community newsletter.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              3. Payment Security & Third-Party Processors
            </h3>
            <p>
              All online payments (UPI, Debit/Credit Cards, NetBanking) are processed via PCI-DSS compliant Indian payment gateways (such as Razorpay). Transmission of confidential payment information is encrypted using 256-bit Secure Socket Layer (SSL) protocols.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              4. Cookies and Local Storage
            </h3>
            <p>
              We utilize browser localStorage and session cookies to maintain your shopping bag items, wishlist selections, and recently viewed styles across your browsing session without transmitting sensitive authentication tokens.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              5. Contact Our Data Protection Officer
            </h3>
            <p>
              For data access, correction requests, or privacy inquiries, please contact our legal concierge at <a href={`mailto:${siteConfig.contact.email}`} className="text-luxury-black font-semibold underline">{siteConfig.contact.email}</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
