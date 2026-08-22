import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

export const EditorialLookbook = () => {
  return (
    <section className="py-20 sm:py-28 bg-[#FAF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* LEFT: Dual Editorial Photos */}
          <div className="lg:col-span-7 grid grid-cols-2 gap-4 sm:gap-6 relative">
            <div className="aspect-[3/4] rounded-xs overflow-hidden bg-neutral-100 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                alt="Ari & Styles Editorial Look"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="aspect-[3/4] rounded-xs overflow-hidden bg-neutral-100 shadow-md translate-y-8">
              <img
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80"
                alt="Ari & Styles Tailoring"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            {/* Floating Editorial Badge */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-xs border border-luxury-border shadow-xl text-center z-10 max-w-[200px]">
              <span className="text-[9px] font-bold tracking-widest uppercase text-luxury-gold block">
                Ethos
              </span>
              <span className="font-serif text-sm sm:text-base font-bold text-luxury-black mt-0.5 block">
                {siteConfig.brand.tagline}
              </span>
            </div>
          </div>

          {/* RIGHT: Manifesto Text & Story */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                The Ari & Styles Manifesto
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black leading-tight">
                Designed for those who go beyond ordinary.
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
              Fashion in India is undergoing a quiet revolution. We reject fast-fashion obsolescence, synthetic shortcuts, and generic templates. Instead, Ari & Styles creates architectural staples using 14.5oz Japanese selvedge denim, 260+ GSM combed organic cottons, and pure French flax linen.
            </p>

            <div className="p-4 bg-white border-l-2 border-luxury-black rounded-r-xs shadow-2xs space-y-1.5">
              <Quote className="w-5 h-5 text-neutral-300" />
              <p className="font-serif italic text-sm text-neutral-800">
                "True luxury lies in the quiet confidence of exceptional fabrics, razor-sharp cuts, and understated geometry."
              </p>
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-bold block pt-1">
                — Design Atelier, Ari & Styles
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="btn-luxury py-4 px-8 inline-flex items-center gap-2"
              >
                <span>Read Our Philosophy</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditorialLookbook;
