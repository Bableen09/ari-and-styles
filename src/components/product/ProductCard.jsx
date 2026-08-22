import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useWishlist } from '../../hooks/useWishlist';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../utils/currency';
import { RatingStars } from '../common/RatingStars';

export const ProductCard = ({ product, showCategory = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { openQuickView } = useQuickView();
  const { addToCart } = useCart();

  if (!product) return null;

  const isLiked = isInWishlist(product.id);
  const primaryImage = product.thumbnail || product.images?.[0];
  const secondaryImage = product.images?.[1] || primaryImage;

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Default to first size and color
    const defaultSize = product.sizes?.[0] || 'Standard';
    const defaultColor = product.colors?.[0] || null;
    addToCart(product, defaultSize, defaultColor, 1, true);
  };

  return (
    <div
      className="group relative flex flex-col bg-transparent transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100 rounded-xs border border-luxury-border">
        <Link to={`/product/${product.slug}`} className="block w-full h-full">
          {/* Primary Image */}
          <img
            src={primaryImage}
            alt={product.name}
            loading="lazy"
            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
              isHovered && secondaryImage !== primaryImage
                ? 'opacity-0 scale-105'
                : 'opacity-100 scale-100 group-hover:scale-105'
            }`}
          />

          {/* Secondary Image for smooth hover flip */}
          {secondaryImage !== primaryImage && (
            <img
              src={secondaryImage}
              alt={`${product.name} alternate view`}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${
                isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          )}
        </Link>

        {/* Badges (Top Left) */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10 pointer-events-none">
          {product.isNew && (
            <span className="bg-luxury-black text-white text-[9px] font-bold px-2 py-0.5 tracking-widest uppercase rounded-xs">
              NEW
            </span>
          )}
          {product.isBestSeller && !product.isNew && (
            <span className="bg-neutral-800 text-white text-[9px] font-bold px-2 py-0.5 tracking-widest uppercase rounded-xs">
              BESTSELLER
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-neutral-100 text-luxury-black border border-neutral-300 text-[9px] font-bold px-2 py-0.5 tracking-widest uppercase rounded-xs">
              {product.discount}% OFF
            </span>
          )}
          {product.stock === 'LOW STOCK' && (
            <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase rounded-xs">
              Low Stock
            </span>
          )}
          {product.stock === 'OUT OF STOCK' && (
            <span className="bg-red-100 text-red-800 border border-red-300 text-[9px] font-bold px-1.5 py-0.5 tracking-wider uppercase rounded-xs">
              Sold Out
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          aria-label={isLiked ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full backdrop-blur-xs transition-all duration-200 ${
            isLiked
              ? 'bg-white text-red-600 shadow-md scale-105'
              : 'bg-white/80 text-neutral-600 hover:text-luxury-black hover:bg-white sm:opacity-0 sm:group-hover:opacity-100 shadow-xs'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Action Overlay (Bottom of Image on Desktop) */}
        <div className="hidden sm:flex absolute inset-x-2.5 bottom-2.5 gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 bg-white/95 backdrop-blur-xs text-luxury-black hover:bg-luxury-black hover:text-white py-2 text-[10px] font-bold uppercase tracking-widest transition-all rounded-xs shadow-md inline-flex items-center justify-center gap-1"
          >
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </button>

          <button
            onClick={handleQuickAdd}
            disabled={product.stock === 'OUT OF STOCK'}
            aria-label="Quick add to bag"
            className="p-2 bg-white/95 backdrop-blur-xs text-luxury-black hover:bg-luxury-black hover:text-white rounded-xs shadow-md transition-all disabled:opacity-40"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Product Details Text */}
      <div className="pt-3 pb-1 flex flex-col flex-1 justify-between">
        <div>
          {/* Category */}
          {showCategory && (
            <span className="text-[10px] font-semibold tracking-widest uppercase text-neutral-400 block truncate mb-0.5">
              {product.category}
            </span>
          )}

          {/* Product Name */}
          <Link
            to={`/product/${product.slug}`}
            className="font-sans text-xs font-semibold text-luxury-black hover:text-luxury-gold transition-colors line-clamp-1 block"
          >
            {product.name}
          </Link>

          {/* Rating */}
          <div className="mt-1">
            <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="xs" />
          </div>
        </div>

        {/* Price Row & Color Preview */}
        <div className="flex items-center justify-between mt-2 pt-1 border-t border-luxury-border/40">
          <div className="flex items-baseline gap-2">
            <span className="text-xs font-bold text-luxury-black">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-[10px] text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          {product.colors?.length > 0 && (
            <div className="flex items-center space-x-1">
              {product.colors.slice(0, 3).map((col, idx) => (
                <span
                  key={idx}
                  className="w-2 h-2 rounded-full border border-black/20"
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              {product.colors.length > 3 && (
                <span className="text-[9px] text-neutral-400">
                  +{product.colors.length - 3}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
