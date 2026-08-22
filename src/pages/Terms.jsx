import React, { useEffect } from 'react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

export const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Terms & Conditions"
        description="Terms and conditions governing the purchase of apparel and use of the Ari & Styles platform."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Terms & Conditions', url: '/terms' }]} />

        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Legal Terms of Service
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            TERMS & CONDITIONS
          </h1>
          <p className="text-xs text-neutral-500 mt-2">
            Governing the use of {siteConfig.brand.url} and commercial purchases from {siteConfig.brand.legalName}.
          </p>
        </div>

        <div className="bg-white p-6 sm:p-10 rounded-xs border border-luxury-border shadow-2xs space-y-6 text-xs sm:text-sm text-neutral-600 leading-relaxed my-8">
          <div className="p-3.5 bg-brand-50 border border-brand-200 rounded-xs text-xs text-neutral-700 italic">
            Notice: This document provides sample terms and conditions for frontend demonstration and should be reviewed by legal counsel prior to high-volume commercial trading.
          </div>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              1. Acceptance of Terms
            </h3>
            <p>
              By accessing, browsing, or purchasing products on this website, you agree to be bound by these Terms & Conditions and our Privacy Policy. If you do not agree with any part of these terms, you should discontinue using our website.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              2. Product Descriptions and Pricing
            </h3>
            <p>
              We strive to display garment colors, cuts, and textures with maximum accuracy. However, slight variations may arise depending on your monitor calibration. All prices are listed in Indian Rupees (INR) and are inclusive of standard Goods and Services Tax (GST).
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              3. Order Acceptance and Inventory Allocation
            </h3>
            <p>
              Receipt of an electronic order confirmation does not signify our final acceptance of your order. Ari & Styles reserves the right to cancel or limit order quantities in the event of unforeseen stock discrepancies or fraudulent payment flags.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              4. Intellectual Property
            </h3>
            <p>
              All trademarks, logos, typography, visual layouts, and content associated with {siteConfig.brand.name} and "{siteConfig.brand.tagline}" are the proprietary property of {siteConfig.brand.legalName}.
            </p>
          </section>

          <section className="space-y-2">
            <h3 className="font-serif text-lg font-bold text-luxury-black">
              5. Governing Law and Jurisdiction
            </h3>
            <p>
              These Terms and any separate agreements shall be governed by and construed in accordance with the laws of the Republic of India, under the jurisdiction of the courts of Gurugram / New Delhi.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;
