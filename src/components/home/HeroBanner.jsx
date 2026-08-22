import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const HeroBanner = () => {
  return (
    <section className="relative w-full min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-neutral-900 overflow-hidden">
      {/* Background Editorial Image with Luxury Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 1024px)"
            srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          />
          <source
            media="(min-width: 640px)"
            srcSet="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80"
          />
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80"
            alt="Ari & Styles Editorial Collection - Beyond Ordinary"
            className="w-full h-full object-cover object-center opacity-75 scale-105 transform hover:scale-100 transition-transform duration-1000 ease-out"
            loading="eager"
          />
        </picture>
        {/* Subtle Vignette & Gradient for High Contrast Typography */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white py-16">
        {/* Monogram Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-bold tracking-widest uppercase mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-luxury-gold" />
          <span>The New Autumn / Winter Edit</span>
        </div>

        {/* Brand Tagline & Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-balance">
          DEFINE YOUR STYLE
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-neutral-200 font-normal max-w-xl mx-auto tracking-wide leading-relaxed">
          Modern essentials designed for those who go <strong className="text-white font-semibold">beyond ordinary</strong>. Uncompromising silhouettes crafted for India and the world.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop?gender=men"
            className="w-full sm:w-auto px-8 py-4 bg-white text-luxury-black text-xs font-bold tracking-widest uppercase hover:bg-neutral-200 transition-all duration-300 rounded-xs shadow-xl inline-flex items-center justify-center gap-2 group"
          >
            <span>Shop Men</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/shop?gender=women"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white text-white text-xs font-bold tracking-widest uppercase hover:bg-white hover:text-luxury-black transition-all duration-300 rounded-xs inline-flex items-center justify-center gap-2 group"
          >
            <span>Shop Women</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-14 hidden sm:flex flex-col items-center gap-2 text-[10px] uppercase tracking-widest text-neutral-400">
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
