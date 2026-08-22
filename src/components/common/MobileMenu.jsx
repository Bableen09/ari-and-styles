import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, ChevronRight, User, Heart, ShoppingBag, Search, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import { siteConfig } from '../../config/siteConfig';

export const MobileMenu = ({ isOpen, onClose, onOpenSearch }) => {
  const navigate = useNavigate();

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNavClick = (path) => {
    onClose();
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-sm bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 animate-slide-in-right overflow-y-auto">
        {/* Drawer Header */}
        <div className="p-4 flex items-center justify-between border-b border-luxury-border bg-white sticky top-0 z-10">
          <div>
            <h3 className="font-serif text-lg font-bold tracking-wider text-luxury-black">
              {siteConfig.brand.name}
            </h3>
            <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400">
              {siteConfig.brand.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close navigation menu"
            className="p-2 text-neutral-600 hover:text-luxury-black transition-colors rounded-full hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search button in menu */}
        <div className="p-4 pb-2">
          <button
            onClick={() => {
              onClose();
              if (onOpenSearch) onOpenSearch();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-luxury-border rounded text-xs text-neutral-500 hover:border-neutral-400 transition-colors"
          >
            <Search className="w-4 h-4 text-neutral-400" />
            <span>Search products, categories...</span>
          </button>
        </div>

        {/* Nav Links */}
        <div className="flex-1 px-4 py-2 space-y-1 divide-y divide-luxury-border/60">
          <div className="py-2 space-y-1">
            <button
              onClick={() => handleNavClick('/')}
              className="w-full flex items-center justify-between py-2.5 text-xs font-bold tracking-widest uppercase text-luxury-black hover:text-luxury-gold text-left"
            >
              <span>Home</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleNavClick('/shop')}
              className="w-full flex items-center justify-between py-2.5 text-xs font-bold tracking-widest uppercase text-luxury-black hover:text-luxury-gold text-left"
            >
              <span>Shop All</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleNavClick('/shop?sort=newest')}
              className="w-full flex items-center justify-between py-2.5 text-xs font-bold tracking-widest uppercase text-luxury-black hover:text-luxury-gold text-left"
            >
              <div className="flex items-center gap-2">
                <span>New Arrivals</span>
                <span className="text-[8px] bg-luxury-black text-white px-1.5 py-0.5 uppercase tracking-wider">New</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
            <button
              onClick={() => handleNavClick('/shop?sort=best-seller')}
              className="w-full flex items-center justify-between py-2.5 text-xs font-bold tracking-widest uppercase text-luxury-black hover:text-luxury-gold text-left"
            >
              <span>Best Sellers</span>
              <ChevronRight className="w-4 h-4 text-neutral-400" />
            </button>
          </div>

          {/* Gender Collections */}
          <div className="py-3 space-y-1">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 px-1 mb-1">
              Collections
            </h4>
            <button
              onClick={() => handleNavClick('/shop?gender=men')}
              className="w-full flex items-center justify-between py-2 text-xs font-medium tracking-wider text-neutral-800 hover:text-luxury-black text-left"
            >
              <span>Men's Edit</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            <button
              onClick={() => handleNavClick('/shop?gender=women')}
              className="w-full flex items-center justify-between py-2 text-xs font-medium tracking-wider text-neutral-800 hover:text-luxury-black text-left"
            >
              <span>Women's Edit</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
            <button
              onClick={() => handleNavClick('/shop?gender=unisex')}
              className="w-full flex items-center justify-between py-2 text-xs font-medium tracking-wider text-neutral-800 hover:text-luxury-black text-left"
            >
              <span>Unisex Streetwear</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          </div>

          {/* Categories */}
          <div className="py-3 space-y-1">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 px-1 mb-1">
              Shop Categories
            </h4>
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleNavClick(`/category/${cat.slug}`)}
                  className="flex items-center gap-2 p-2 bg-white rounded-xs border border-luxury-border hover:border-neutral-400 transition-colors text-left"
                >
                  <img src={cat.image} alt={cat.name} className="w-6 h-6 object-cover rounded-xs" />
                  <span className="text-[11px] font-medium text-luxury-black truncate">{cat.shortName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Company & Support */}
          <div className="py-3 space-y-2">
            <h4 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 px-1">
              Information
            </h4>
            <div className="flex flex-col space-y-1.5 text-xs text-neutral-600">
              <button onClick={() => handleNavClick('/about')} className="text-left py-1 hover:text-luxury-black">
                About Ari & Styles
              </button>
              <button onClick={() => handleNavClick('/contact')} className="text-left py-1 hover:text-luxury-black">
                Concierge & Contact
              </button>
              <button onClick={() => handleNavClick('/faq')} className="text-left py-1 hover:text-luxury-black">
                FAQs
              </button>
              <button onClick={() => handleNavClick('/shipping')} className="text-left py-1 hover:text-luxury-black">
                Shipping & Delivery
              </button>
              <button onClick={() => handleNavClick('/returns')} className="text-left py-1 hover:text-luxury-black">
                30-Day Returns
              </button>
              <button onClick={() => handleNavClick('/size-guide')} className="text-left py-1 hover:text-luxury-black">
                Size Guide
              </button>
            </div>
          </div>
        </div>

        {/* Footer info in drawer */}
        <div className="p-4 border-t border-luxury-border bg-white space-y-3">
          <div className="flex items-center justify-between text-xs">
            <button
              onClick={() => handleNavClick('/account')}
              className="inline-flex items-center gap-2 font-medium text-neutral-800 hover:text-luxury-black"
            >
              <User className="w-4 h-4" />
              <span>My Account</span>
            </button>
            <button
              onClick={() => handleNavClick('/wishlist')}
              className="inline-flex items-center gap-2 font-medium text-neutral-800 hover:text-luxury-black"
            >
              <Heart className="w-4 h-4" />
              <span>Wishlist</span>
            </button>
          </div>
          <div className="text-[10px] text-neutral-400 text-center">
            {siteConfig.brand.name} • {siteConfig.brand.tagline}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
