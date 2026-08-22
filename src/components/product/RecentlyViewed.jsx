import React from 'react';
import { useRecentlyViewed } from '../../hooks/useRecentlyViewed';
import { ProductCard } from './ProductCard';
import { products as catalogProducts } from '../../data/products';

export const RecentlyViewed = ({ currentProductId }) => {
  const { recentlyViewed } = useRecentlyViewed();

  // Filter out the active product if on detail page
  const items = recentlyViewed
    .filter((item) => item.id !== currentProductId)
    .slice(0, 4);

  if (items.length === 0) return null;

  // Hydrate with full product data if available
  const hydratedItems = items.map((item) => {
    return catalogProducts.find((p) => p.id === item.id) || item;
  });

  return (
    <section className="py-12 border-t border-luxury-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-luxury-border">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Your Browsing History
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black mt-1">
              Recently Viewed
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {hydratedItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
