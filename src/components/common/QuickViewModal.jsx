import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Star, ShoppingBag, Heart, Check, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useQuickView } from '../../context/QuickViewContext';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatPrice } from '../../utils/currency';
import { siteConfig } from '../../config/siteConfig';

export const QuickViewModal = () => {
  const { selectedProduct, isOpen, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  // Initialize selections when product opens
  useEffect(() => {
    if (selectedProduct) {
      setActiveImageIndex(0);
      setSelectedSize(selectedProduct.sizes?.[0] || '');
      setSelectedColor(selectedProduct.colors?.[0] || null);
      setQuantity(1);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedProduct, isOpen, closeQuickView]);

  if (!isOpen || !selectedProduct) return null;

  const isLiked = isInWishlist(selectedProduct.id);
  const productImages = selectedProduct.images?.length > 0 ? selectedProduct.images : [selectedProduct.thumbnail];

  const handleAddToCart = () => {
    if (!selectedSize && selectedProduct.sizes?.length > 0) return;
    setIsAdding(true);
    addToCart(selectedProduct, selectedSize, selectedColor, quantity, true);
    setTimeout(() => {
      setIsAdding(false);
      closeQuickView();
    }, 400);
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigate(`/product/${selectedProduct.slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={closeQuickView}
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-xs shadow-2xl border border-luxury-border overflow-hidden z-10 animate-scale-in my-auto">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close preview modal"
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-xs rounded-full text-neutral-600 hover:text-luxury-black hover:bg-white shadow-xs transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT: Image Gallery */}
          <div className="bg-white p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-luxury-border">
            <div className="aspect-[3/4] overflow-hidden rounded-xs bg-neutral-100 relative">
              <img
                src={productImages[activeImageIndex]}
                alt={selectedProduct.name}
                className="w-full h-full object-cover"
              />
              {selectedProduct.discount > 0 && (
                <div className="absolute top-3 left-3 bg-luxury-black text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest">
                  {selectedProduct.discount}% OFF
                </div>
              )}
            </div>

            {/* Thumbnail selector */}
            {productImages.length > 1 && (
              <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar">
                {productImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-14 h-16 rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx ? 'border-luxury-black' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Product Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Category & SKU */}
              <div className="flex items-center justify-between text-[11px] text-neutral-500 uppercase tracking-widest">
                <span>{selectedProduct.category}</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              {/* Title */}
              <h2 className="font-serif text-2xl font-bold text-luxury-black mt-1.5">
                {selectedProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(selectedProduct.rating) ? 'fill-current' : 'opacity-30'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-semibold text-neutral-700">
                  {selectedProduct.rating} ({selectedProduct.reviewCount} reviews)
                </span>
              </div>

              {/* Pricing */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-xl font-bold text-luxury-black">
                  {formatPrice(selectedProduct.price)}
                </span>
                {selectedProduct.originalPrice > selectedProduct.price && (
                  <span className="text-sm text-neutral-400 line-through">
                    {formatPrice(selectedProduct.originalPrice)}
                  </span>
                )}
                <span className="text-[11px] text-neutral-500">
                  ({siteConfig.tax.label})
                </span>
              </div>

              <p className="text-xs text-neutral-600 mt-3 line-clamp-3 leading-relaxed">
                {selectedProduct.shortDescription || selectedProduct.description}
              </p>

              {/* Color Swatches */}
              {selectedProduct.colors?.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-luxury-black mb-2">
                    <span>Color: <span className="font-normal text-neutral-600">{selectedColor?.name}</span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    {selectedProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full p-0.5 border-2 transition-all flex items-center justify-center ${
                          selectedColor?.name === c.name ? 'border-luxury-black scale-110' : 'border-transparent hover:border-neutral-300'
                        }`}
                        title={c.name}
                      >
                        <span
                          className="w-full h-full rounded-full border border-black/10"
                          style={{ backgroundColor: c.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {selectedProduct.sizes?.length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs font-semibold text-luxury-black mb-2">
                    <span>Select Size</span>
                    <span className="text-[11px] text-emerald-700 font-semibold">{selectedProduct.stock}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        onClick={() => setSelectedSize(s)}
                        className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-xs border transition-all ${
                          selectedSize === s
                            ? 'bg-luxury-black text-white border-luxury-black'
                            : 'bg-white text-luxury-black border-luxury-border hover:border-neutral-400'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Actions: Add to Bag, Wishlist, View Full Product */}
            <div className="space-y-3 pt-4 border-t border-luxury-border">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={isAdding || selectedProduct.stock === 'OUT OF STOCK'}
                  className="flex-1 btn-luxury py-3.5 flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isAdding ? 'Adding...' : selectedProduct.stock === 'OUT OF STOCK' ? 'Out of Stock' : 'Add to Bag'}</span>
                </button>

                <button
                  onClick={() => toggleWishlist(selectedProduct)}
                  className={`p-3.5 rounded-xs border transition-colors ${
                    isLiked
                      ? 'bg-red-50 border-red-200 text-red-600'
                      : 'bg-white border-luxury-border text-neutral-600 hover:text-luxury-black hover:border-neutral-400'
                  }`}
                  aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={handleViewFullDetails}
                className="w-full text-center text-xs font-semibold uppercase tracking-widest text-neutral-600 hover:text-luxury-black transition-colors inline-flex items-center justify-center gap-1.5 py-1"
              >
                <span>View Full Specifications & Reviews</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
