import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ChevronDown, Sparkles, ArrowUpRight } from 'lucide-react';
import { categories } from '../../data/categories';

export const DesktopNavigation = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);

  const navItemClass = ({ isActive }) =>
    `text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-200 border-b-2 ${
      isActive
        ? 'text-luxury-black border-luxury-black'
        : 'text-neutral-600 border-transparent hover:text-luxury-black hover:border-neutral-300'
    }`;

  return (
    <nav className="hidden lg:flex items-center justify-center space-x-8 py-2 relative">
      <NavLink to="/" className={navItemClass}>
        Home
      </NavLink>

      {/* Shop with Dropdown */}
      <div
        className="relative group"
        onMouseEnter={() => setActiveDropdown('shop')}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <NavLink
          to="/shop"
          className={({ isActive }) =>
            `inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase py-2 transition-colors duration-200 border-b-2 ${
              isActive
                ? 'text-luxury-black border-luxury-black'
                : 'text-neutral-600 border-transparent group-hover:text-luxury-black group-hover:border-neutral-300'
            }`
          }
        >
          <span>Shop</span>
          <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
        </NavLink>

        {/* Dropdown Menu */}
        {activeDropdown === 'shop' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white border border-luxury-border shadow-xl p-6 grid grid-cols-3 gap-6 animate-fade-in z-50 rounded-sm">
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">Featured</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/shop" className="text-luxury-black hover:text-luxury-gold transition-colors block py-1">
                    All Products
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=newest" className="text-luxury-black hover:text-luxury-gold transition-colors flex items-center justify-between py-1">
                    <span>New Arrivals</span>
                    <span className="text-[9px] bg-luxury-black text-white px-1.5 py-0.5 rounded-xs uppercase">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/shop?sort=best-seller" className="text-luxury-black hover:text-luxury-gold transition-colors block py-1">
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <h4 className="text-[11px] font-bold tracking-widest uppercase text-neutral-400">By Gender</h4>
              <ul className="space-y-1.5 text-xs">
                <li>
                  <Link to="/shop?gender=men" className="text-luxury-black hover:text-luxury-gold transition-colors block py-1">
                    Men's Collection
                  </Link>
                </li>
                <li>
                  <Link to="/shop?gender=women" className="text-luxury-black hover:text-luxury-gold transition-colors block py-1">
                    Women's Collection
                  </Link>
                </li>
                <li>
                  <Link to="/shop?gender=unisex" className="text-luxury-black hover:text-luxury-gold transition-colors block py-1">
                    Unisex Streetwear
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-brand-50 p-4 rounded-sm flex flex-col justify-between border border-brand-200/60">
              <div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-luxury-gold">
                  <Sparkles className="w-3 h-3" />
                  Editorial Edit
                </span>
                <h5 className="font-serif text-sm font-semibold text-luxury-black mt-1">
                  The Monochrome Drop
                </h5>
                <p className="text-[11px] text-neutral-500 mt-1 leading-relaxed">
                  240+ GSM heavyweight essentials for modern living.
                </p>
              </div>
              <Link
                to="/shop?sort=newest"
                className="inline-flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-luxury-black hover:text-luxury-gold mt-3 pt-2 border-t border-brand-200"
              >
                <span>Explore Drop</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Categories Dropdown */}
      <div
        className="relative group"
        onMouseEnter={() => setActiveDropdown('categories')}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button
          className="inline-flex items-center gap-1 text-xs font-semibold tracking-widest uppercase py-2 text-neutral-600 border-b-2 border-transparent group-hover:text-luxury-black group-hover:border-neutral-300 transition-colors duration-200"
        >
          <span>Categories</span>
          <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
        </button>

        {activeDropdown === 'categories' && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[720px] bg-white border border-luxury-border shadow-xl p-6 grid grid-cols-4 gap-4 animate-fade-in z-50 rounded-sm">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="group/item flex flex-col space-y-2 p-2 rounded hover:bg-brand-50 transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden rounded-xs bg-neutral-100 relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover/item:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <div>
                  <span className="text-xs font-semibold text-luxury-black group-hover/item:text-luxury-gold transition-colors block">
                    {cat.shortName}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {cat.itemCount} items
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <NavLink to="/category/jackets" className={navItemClass}>
        Jackets
      </NavLink>

      <NavLink to="/category/t-shirts" className={navItemClass}>
        T-Shirts
      </NavLink>

      <NavLink to="/category/jeans" className={navItemClass}>
        Denim
      </NavLink>

      <NavLink to="/category/accessories" className={navItemClass}>
        Accessories
      </NavLink>

      <NavLink to="/about" className={navItemClass}>
        About
      </NavLink>
    </nav>
  );
};

export default DesktopNavigation;
