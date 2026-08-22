import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { EmptyState } from '../components/common/EmptyState';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { formatPrice } from '../utils/currency';
import { analyticsService } from '../services/analyticsService';

export const Wishlist = () => {
  const { wishlist, wishlistCount, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  useEffect(() => {
    analyticsService.pageView('/wishlist', 'Wishlist — Ari & Styles');
    window.scrollTo(0, 0);
  }, []);

  const handleMoveToBag = (product) => {
    const size = product.sizes?.[0] || 'Standard';
    const color = product.colors?.[0] || null;
    addToCart(product, size, color, 1, true);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToBag = () => {
    wishlist.forEach((product) => {
      const size = product.sizes?.[0] || 'Standard';
      const color = product.colors?.[0] || null;
      addToCart(product, size, color, 1, false);
    });
    clearWishlist();
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Saved Wishlist"
        description="View and manage your saved fashion favorites from Ari & Styles."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Wishlist', url: '/wishlist' }]} />

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between py-6 sm:py-8 border-b border-luxury-border gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Personal Collection
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-1">
              SAVED PIECES ({wishlistCount})
            </h1>
          </div>

          {wishlistCount > 0 && (
            <div className="flex items-center gap-3">
              <button
                onClick={handleMoveAllToBag}
                className="btn-luxury py-2.5 px-4 text-[11px] inline-flex items-center gap-1.5"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Move All to Bag</span>
              </button>
              <button
                onClick={clearWishlist}
                className="text-xs uppercase tracking-wider font-semibold text-neutral-500 hover:text-red-600 transition-colors"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Wishlist Items Grid or Empty State */}
        <div className="py-8">
          {wishlist.length === 0 ? (
            <EmptyState
              icon={<Heart className="w-8 h-8 text-neutral-300" />}
              title="YOUR WISHLIST IS EMPTY"
              description="Save the pieces you love and come back to them anytime."
              actionLabel="EXPLORE COLLECTION"
              actionLink="/shop"
            />
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {wishlist.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xs border border-luxury-border p-3 flex flex-col justify-between shadow-2xs group"
                >
                  <div>
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-xs bg-neutral-100 mb-3">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.thumbnail || product.images?.[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </Link>
                      <button
                        onClick={() => removeFromWishlist(product.id)}
                        className="absolute top-2 right-2 p-1.5 bg-white/90 rounded-full text-neutral-500 hover:text-red-600 shadow-xs transition-colors"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="text-[10px] uppercase tracking-widest text-neutral-400 block truncate">
                      {product.category}
                    </span>
                    <Link
                      to={`/product/${product.slug}`}
                      className="font-sans text-xs font-semibold text-luxury-black hover:text-luxury-gold line-clamp-1 mt-0.5 block"
                    >
                      {product.name}
                    </Link>

                    <div className="flex items-baseline gap-2 mt-1.5">
                      <span className="text-xs font-bold text-luxury-black">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-[10px] text-neutral-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 mt-3 border-t border-luxury-border/60">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="w-full btn-luxury py-2.5 text-[10px] flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
