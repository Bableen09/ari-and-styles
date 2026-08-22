import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Heart, ArrowRight, Quote } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

export const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Our Story & Philosophy — BEYOND ORDINARY"
        description="Discover the origin story of Ari & Styles. Modern heavyweight luxury essentials tailored for the discerning Indian youth."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'About Us', url: '/about' }]} />

        {/* Hero Section */}
        <div className="py-12 sm:py-20 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold tracking-widest uppercase text-luxury-gold block">
            The Ari & Styles Origin
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-luxury-black tracking-tight leading-tight">
            BEYOND ORDINARY
          </h1>
          <p className="text-sm sm:text-base text-neutral-600 font-normal leading-relaxed">
            Founded with an uncompromising vision: to engineer architectural modern apparel that celebrates individuality, tactile substance, and timeless Indian craftsmanship.
          </p>
        </div>

        {/* Full Width Editorial Image */}
        <div className="aspect-[21/9] rounded-xs overflow-hidden bg-neutral-900 border border-luxury-border shadow-lg relative my-8">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=2000&q=80"
            alt="Ari & Styles Design Studio & Atelier"
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-12">
            <p className="text-white text-xs sm:text-sm font-light tracking-wide max-w-lg">
              The Ari & Styles Atelier in Gurugram, India — where every silhouette is sampled, drape-tested, and perfected.
            </p>
          </div>
        </div>

        {/* 3 Pillars / Story Sections */}
        <div className="py-16 space-y-20 divide-y divide-luxury-border/60">
          {/* 1. OUR STORY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                01 / Genesis
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
                OUR STORY
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                For too long, fashion choices in India were polarized between cheap fast-fashion polyester and unattainable heritage haute couture. Ari & Styles was born to bridge this gap.
              </p>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We set out to create a wardrobe of heavyweight essentials: 260+ GSM organic cotton t-shirts that hold their structure through years of wear, authentic 14.5oz shuttle-loom selvedge denim jackets, and breezy linen shirts tailored specifically for urban living.
              </p>
            </div>
            <div className="lg:col-span-6 aspect-[4/3] rounded-xs overflow-hidden bg-neutral-100 border border-luxury-border shadow-md">
              <img
                src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80"
                alt="Crafting Heavyweight Cotton Tees"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* 2. OUR PHILOSOPHY */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-16">
            <div className="lg:col-span-6 order-2 lg:order-1 aspect-[4/3] rounded-xs overflow-hidden bg-neutral-100 border border-luxury-border shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="Architectural Tailoring & Pure Flax Linen"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                02 / Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
                OUR PHILOSOPHY
              </h2>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                We believe clothing is not merely fabric; it is personal architecture. Our design language is rooted in quiet luxury, balanced proportion, and intentional minimalism.
              </p>
              <div className="p-4 bg-white border-l-2 border-luxury-gold rounded-r-xs shadow-2xs space-y-1">
                <Quote className="w-4 h-4 text-luxury-gold" />
                <p className="font-serif italic text-sm text-luxury-black">
                  "Simplicity is not about the lack of clutter; it is about the mastery of detail."
                </p>
              </div>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Every seam, button weight, and hemline is calculated to empower confidence and effortless movement.
              </p>
            </div>
          </div>

          {/* 3. OUR PROMISE */}
          <div id="craftsmanship" className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center pt-16">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                03 / Commitment
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
                OUR PROMISE
              </h2>
              <ul className="space-y-3 text-xs sm:text-sm text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-black mt-1.5 flex-shrink-0" />
                  <span><strong>Zero Synthetic Compromises:</strong> We prioritize natural, high-retention fibers like ring-spun cotton, European flax linen, and mulberry silk.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-black mt-1.5 flex-shrink-0" />
                  <span><strong>Ethical Indian Production:</strong> Produced in fair-wage artisan workshops across Haryana, Gujarat, and Tamil Nadu.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-luxury-black mt-1.5 flex-shrink-0" />
                  <span><strong>Doorstep Happiness:</strong> 30-day effortless returns and direct customer concierge support for all styling queries.</span>
                </li>
              </ul>

              <div className="pt-4">
                <Link to="/shop" className="btn-luxury py-3.5 px-8 text-xs inline-flex items-center gap-2">
                  <span>Explore The Wardrobe</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="lg:col-span-6 aspect-[4/3] rounded-xs overflow-hidden bg-neutral-100 border border-luxury-border shadow-md">
              <img
                src="https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80"
                alt="Ari & Styles Quality Inspection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
