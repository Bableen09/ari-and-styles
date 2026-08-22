import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { NewArrivalsSlider } from '../components/home/NewArrivalsSlider';
import { EditorialLookbook } from '../components/home/EditorialLookbook';
import { InstagramFeed } from '../components/home/InstagramFeed';
import { ProductGrid } from '../components/product/ProductGrid';
import { SEO } from '../components/common/SEO';
import { products } from '../data/products';
import { siteConfig } from '../config/siteConfig';
import { analyticsService } from '../services/analyticsService';

export const Home = () => {
  useEffect(() => {
    analyticsService.pageView('/', 'Home — Ari & Styles');
    window.scrollTo(0, 0);
  }, []);

  // 8 Featured Products
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);

  return (
    <div className="bg-[#FAF9F5]">
      <SEO
        title="BEYOND ORDINARY — Modern Indian Fashion & Essentials"
        description="Explore Ari & Styles. Modern heavyweight essentials, Japanese selvedge denim, pure French flax linen, and architectural tailoring crafted for young India."
      />

      {/* 1. Hero Banner */}
      <HeroBanner />

      {/* 2. Shop By Category */}
      <CategoryGrid />

      {/* 3. New Arrivals Drop */}
      <NewArrivalsSlider />

      {/* 4. Featured 8 Products Grid */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-luxury-border gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              The Signature Selection
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-1">
              FEATURED PIECES
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-luxury-black inline-flex items-center gap-1 group"
          >
            <span>Explore Entire Catalog</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 8 Featured Products Grid */}
        <ProductGrid products={featuredProducts} columns={4} />

        <div className="text-center mt-12">
          <Link
            to="/shop"
            className="btn-luxury py-4 px-10 text-xs inline-flex items-center gap-2"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 5. Editorial Manifesto / Brand Story */}
      <EditorialLookbook />

      {/* 6. Instagram Community */}
      <InstagramFeed />
    </div>
  );
};

export default Home;
