import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../product/ProductCard';
import { products } from '../../data/products';

export const NewArrivalsSlider = () => {
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-luxury-border gap-4">
          <div>
            <div className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-luxury-gold mb-1">
              <Sparkles className="w-3 h-3" />
              <span>Limited Release Drops</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
              NEW ARRIVALS
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-luxury-black inline-flex items-center gap-1 group"
          >
            <span>View All New Drops</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 New Arrival Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewArrivalsSlider;
