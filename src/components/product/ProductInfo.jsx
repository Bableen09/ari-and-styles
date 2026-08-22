import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  Check,
} from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { formatPrice } from '../../utils/currency';
import { RatingStars } from '../common/RatingStars';
import { siteConfig } from '../../config/siteConfig';

export const ProductInfo = ({ product, onOpenSizeGuide, onOpenReviewModal }) => {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const navigate = useNavigate();

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [openAccordions, setOpenAccordions] = useState({
    description: true,
    details: false,
    shipping: false,
    care: false,
  });

  const isLiked = isInWishlist(product.id);
  const isOutOfStock = product.stock === 'OUT OF STOCK';

  const toggleAccordion = (key) => {
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAddToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) return;
    setIsAdding(true);
    addToCart(product, selectedSize, selectedColor, quantity, true);
    setTimeout(() => setIsAdding(false), 400);
  };

  const handleBuyNow = () => {
    if (!selectedSize && product.sizes?.length > 0) return;
    addToCart(product, selectedSize, selectedColor, quantity, false);
    navigate('/checkout');
  };

  return (
    <div className="flex flex-col space-y-6">
      {/* Category, Gender & SKU Header */}
      <div>
        <div className="flex items-center justify-between text-xs uppercase tracking-widest text-neutral-400">
          <span className="font-semibold">{product.category} • {product.gender}</span>
          <span>SKU: {product.sku}</span>
        </div>

        {/* Product Title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-2 tracking-tight">
          {product.name}
        </h1>

        {/* Rating and Review Count link */}
        <div className="flex items-center gap-3 mt-3">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} size="md" />
          <span className="text-neutral-300">•</span>
          <button
            type="button"
            onClick={onOpenReviewModal}
            className="text-xs font-semibold text-neutral-600 hover:text-luxury-black underline underline-offset-4"
          >
            Write a Review
          </button>
        </div>
      </div>

      {/* Pricing & Stock Status */}
      <div className="p-4 bg-white rounded-xs border border-luxury-border">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-2xl sm:text-3xl font-bold text-luxury-black">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice > product.price && (
            <>
              <span className="text-base text-neutral-400 line-through">
                {formatPrice(product.originalPrice)}
              </span>
              <span className="bg-luxury-black text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest rounded-xs">
                {product.discount}% OFF
              </span>
            </>
          )}
        </div>
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-neutral-100 text-xs">
          <span className="text-neutral-500">{siteConfig.tax.label}</span>
          <span
            className={`font-bold uppercase tracking-wider ${
              isOutOfStock
                ? 'text-red-600'
                : product.stock === 'LOW STOCK'
                ? 'text-amber-600'
                : 'text-emerald-700'
            }`}
          >
            {product.stock}
          </span>
        </div>
      </div>

      {/* Color Selection */}
      {product.colors?.length > 0 && (
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold uppercase tracking-wider text-luxury-black">
              Color: <span className="font-normal text-neutral-600">{selectedColor?.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            {product.colors.map((col, idx) => {
              const isSelected = selectedColor?.name === col.name;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedColor(col)}
                  className={`group flex items-center gap-2 p-1.5 rounded-xs border-2 transition-all ${
                    isSelected
                      ? 'border-luxury-black bg-white shadow-xs'
                      : 'border-luxury-border bg-white hover:border-neutral-400'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-black/10 flex-shrink-0"
                    style={{ backgroundColor: col.hex }}
                  />
                  <span className="text-xs font-medium text-luxury-black pr-1">{col.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {product.sizes?.length > 0 && (
        <div>
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold uppercase tracking-wider text-luxury-black">
              Select Size: <span className="font-normal text-neutral-600 uppercase">{selectedSize}</span>
            </span>
            <button
              type="button"
              onClick={onOpenSizeGuide}
              className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-600 hover:text-luxury-black underline underline-offset-4"
            >
              <Ruler className="w-3.5 h-3.5" />
              <span>Size Guide</span>
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {product.sizes.map((s) => {
              const isSelected = selectedSize === s;
              return (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`py-3 text-xs font-bold uppercase tracking-wider rounded-xs border transition-all ${
                    isSelected
                      ? 'bg-luxury-black text-white border-luxury-black shadow-xs'
                      : 'bg-white text-luxury-black border-luxury-border hover:border-neutral-400'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity & CTA Buttons */}
      <div className="space-y-3 pt-2">
        <div className="flex gap-3">
          {/* Quantity selector */}
          <div className="inline-flex items-center border border-luxury-border rounded-xs bg-white h-12">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3.5 h-full text-neutral-600 hover:text-luxury-black hover:bg-neutral-100 transition-colors"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="px-3 text-xs font-bold text-luxury-black min-w-[32px] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => Math.min(product.stockCount || 20, q + 1))}
              className="px-3.5 h-full text-neutral-600 hover:text-luxury-black hover:bg-neutral-100 transition-colors"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Add to Bag */}
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isOutOfStock}
            className="flex-1 btn-luxury h-12 flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{isAdding ? 'Adding...' : isOutOfStock ? 'Sold Out' : 'Add to Bag'}</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => toggleWishlist(product)}
            className={`w-12 h-12 rounded-xs border flex items-center justify-center transition-colors flex-shrink-0 ${
              isLiked
                ? 'bg-red-50 border-red-200 text-red-600'
                : 'bg-white border-luxury-border text-neutral-600 hover:text-luxury-black hover:border-neutral-400'
            }`}
            aria-label={isLiked ? 'Remove from wishlist' : 'Save to wishlist'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Buy Now (Direct Checkout) */}
        {!isOutOfStock && (
          <button
            onClick={handleBuyNow}
            className="w-full btn-luxury-outline h-12 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-luxury-gold" />
            <span>Instant Buy Now</span>
          </button>
        )}
      </div>

      {/* Brand Benefits Bar */}
      <div className="grid grid-cols-2 gap-3 py-4 border-y border-luxury-border text-[11px] text-neutral-600">
        <div className="flex items-center gap-2">
          <Truck className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          <span>Complimentary Shipping &gt; ₹1,999</span>
        </div>
        <div className="flex items-center gap-2">
          <RotateCcw className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          <span>Hassle-Free 30-Day Returns</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          <span>100% Secure Indian Payments</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="w-4 h-4 text-luxury-gold flex-shrink-0" />
          <span>Rigorous Quality Inspected</span>
        </div>
      </div>

      {/* Expandable Information Accordions */}
      <div className="divide-y divide-luxury-border border-b border-luxury-border">
        {/* Description Accordion */}
        <div className="py-3.5">
          <button
            onClick={() => toggleAccordion('description')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black text-left"
          >
            <span>Product Description</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordions.description ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.description && (
            <div className="pt-3 text-xs text-neutral-600 leading-relaxed animate-fade-in space-y-2">
              <p>{product.description}</p>
              {product.shortDescription && <p className="font-medium text-neutral-800">{product.shortDescription}</p>}
            </div>
          )}
        </div>

        {/* Material & Fabric Accordion */}
        <div className="py-3.5">
          <button
            onClick={() => toggleAccordion('details')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black text-left"
          >
            <span>Material & Fit Specifications</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordions.details ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.details && (
            <div className="pt-3 text-xs text-neutral-600 leading-relaxed animate-fade-in space-y-1.5">
              <p><strong>Composition:</strong> {product.material}</p>
              <p><strong>Silhouette:</strong> {product.fit}</p>
              <p><strong>Fabric Origin:</strong> Hand-curated premium sustainable mills.</p>
              <p><strong>SKU:</strong> {product.sku}</p>
            </div>
          )}
        </div>

        {/* Shipping & Returns Accordion */}
        <div className="py-3.5">
          <button
            onClick={() => toggleAccordion('shipping')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black text-left"
          >
            <span>Shipping & Return Policies</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordions.shipping ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.shipping && (
            <div className="pt-3 text-xs text-neutral-600 leading-relaxed animate-fade-in space-y-1.5">
              <p>• Orders dispatched within 24–48 business hours from Gurugram Atelier.</p>
              <p>• Standard Transit: 3–5 Business Days across all Indian Metros & Tier 1/2 cities.</p>
              <p>• Express Transit: 1–2 Business Days available at checkout.</p>
              <p>• Doorstep pickup arranged for 30-day exchanges and returns.</p>
            </div>
          )}
        </div>

        {/* Care Instructions Accordion */}
        <div className="py-3.5">
          <button
            onClick={() => toggleAccordion('care')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-luxury-black text-left"
          >
            <span>Care Instructions</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${
                openAccordions.care ? 'rotate-180' : ''
              }`}
            />
          </button>
          {openAccordions.care && (
            <div className="pt-3 text-xs text-neutral-600 leading-relaxed animate-fade-in">
              <p>{product.careInstructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
