import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Heart, ShoppingBag, User } from 'lucide-react';
import { DesktopNavigation } from './DesktopNavigation';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { siteConfig } from '../../config/siteConfig';

export const Header = ({ onOpenSearch, onOpenMobileMenu }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { itemCount, openCartDrawer } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  // Scroll listener for compact sticky header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 bg-[#FAF9F5]/95 backdrop-blur-md border-b border-luxury-border transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-xs' : 'py-3.5 lg:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between">
          {/* LEFT: Mobile Menu Button & Desktop Search */}
          <div className="flex items-center space-x-3 lg:space-x-4 flex-1">
            {/* Mobile Hamburger */}
            <button
              type="button"
              onClick={onOpenMobileMenu}
              aria-label="Open mobile navigation menu"
              className="p-1.5 -ml-1.5 text-luxury-black hover:text-neutral-600 transition-colors lg:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Menu Icon + Search Trigger */}
            <div className="hidden lg:flex items-center space-x-4">
              <button
                type="button"
                onClick={onOpenMobileMenu}
                aria-label="Open all categories menu"
                className="p-1.5 text-luxury-black hover:text-neutral-600 transition-colors inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Menu className="w-4 h-4" />
                <span className="text-[11px]">Menu</span>
              </button>

              <button
                type="button"
                onClick={onOpenSearch}
                aria-label="Search catalog"
                className="inline-flex items-center gap-2 text-xs font-medium text-neutral-600 hover:text-luxury-black transition-colors px-2 py-1.5 rounded-sm hover:bg-neutral-100/60"
              >
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline text-[11px] tracking-wide">Search collection...</span>
              </button>
            </div>
          </div>

          {/* CENTER: ARI & STYLES BRAND IDENTITY */}
          <div className="flex flex-col items-center justify-center text-center flex-shrink-0">
            <Link
              to="/"
              className="group flex flex-col items-center focus:outline-hidden focus-visible:ring-1 focus-visible:ring-luxury-black"
            >
              <span className={`font-serif font-bold text-luxury-black tracking-widest uppercase transition-all duration-300 ${
                isScrolled ? 'text-lg lg:text-xl' : 'text-xl lg:text-2xl'
              }`}>
                {siteConfig.brand.name}
              </span>
              <span className="text-[8px] sm:text-[9px] font-sans font-semibold tracking-ultra uppercase text-neutral-500 group-hover:text-luxury-black transition-colors -mt-0.5">
                {siteConfig.brand.tagline}
              </span>
            </Link>
          </div>

          {/* RIGHT: Actions (Search on mobile, Wishlist, Account, Cart) */}
          <div className="flex items-center justify-end space-x-1 sm:space-x-3 lg:space-x-4 flex-1">
            {/* Mobile Search Button */}
            <button
              type="button"
              onClick={onOpenSearch}
              aria-label="Open search"
              className="p-1.5 text-luxury-black hover:text-neutral-600 transition-colors lg:hidden"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Account Icon */}
            <Link
              to="/account"
              aria-label="My Account"
              className="p-1.5 text-luxury-black hover:text-neutral-600 transition-colors hidden sm:inline-flex"
            >
              <User className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>

            {/* Wishlist Icon */}
            <Link
              to="/wishlist"
              aria-label={`Wishlist (${wishlistCount} items)`}
              className="relative p-1.5 text-luxury-black hover:text-neutral-600 transition-colors inline-flex items-center"
            >
              <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart Button */}
            <button
              type="button"
              onClick={openCartDrawer}
              aria-label={`Shopping Bag (${itemCount} items)`}
              className="relative p-1.5 text-luxury-black hover:text-neutral-600 transition-colors inline-flex items-center group"
            >
              <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-105 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-luxury-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-scale-in">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        {!isScrolled && (
          <div className="pt-2 border-t border-luxury-border/50 mt-2 hidden lg:block">
            <DesktopNavigation />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
