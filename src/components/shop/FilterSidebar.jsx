import React from 'react';
import { RotateCcw, Check, ChevronDown } from 'lucide-react';
import { categories } from '../../data/categories';

export const FilterSidebar = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const SIZES_LIST = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '28', '30', '32', '34', '36'];
  const COLORS_LIST = [
    { name: 'Black', hex: '#111111' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Indigo', hex: '#2A4D69' },
    { name: 'Khaki', hex: '#8E8770' },
    { name: 'Sand', hex: '#C7B89E' },
    { name: 'Olive', hex: '#4B5320' },
    { name: 'Brown', hex: '#5C4638' },
  ];

  const handleSizeToggle = (size) => {
    const currentSizes = filters.sizes || [];
    const updated = currentSizes.includes(size)
      ? currentSizes.filter((s) => s !== size)
      : [...currentSizes, size];
    onFilterChange({ ...filters, sizes: updated });
  };

  const handleColorToggle = (colorName) => {
    const currentColors = filters.colors || [];
    const updated = currentColors.includes(colorName)
      ? currentColors.filter((c) => c !== colorName)
      : [...currentColors, colorName];
    onFilterChange({ ...filters, colors: updated });
  };

  return (
    <div className="space-y-6 text-xs text-luxury-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-luxury-border">
        <span className="font-bold uppercase tracking-widest text-[11px]">
          Filters ({totalResults})
        </span>
        <button
          onClick={onResetFilters}
          className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-neutral-500 hover:text-luxury-black font-semibold"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2 pb-4 border-b border-luxury-border">
        <h4 className="font-bold uppercase tracking-wider text-[11px]">Category</h4>
        <div className="space-y-1">
          <button
            onClick={() => onFilterChange({ ...filters, category: 'all' })}
            className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
              !filters.category || filters.category === 'all'
                ? 'font-bold text-luxury-black'
                : 'text-neutral-600 hover:text-luxury-black'
            }`}
          >
            <span>All Categories</span>
            {(!filters.category || filters.category === 'all') && <Check className="w-3 h-3" />}
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onFilterChange({ ...filters, category: cat.slug })}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                filters.category === cat.slug
                  ? 'font-bold text-luxury-black'
                  : 'text-neutral-600 hover:text-luxury-black'
              }`}
            >
              <span>{cat.name}</span>
              {filters.category === cat.slug && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="space-y-2 pb-4 border-b border-luxury-border">
        <h4 className="font-bold uppercase tracking-wider text-[11px]">Gender</h4>
        <div className="space-y-1">
          {['all', 'men', 'women', 'unisex'].map((g) => (
            <button
              key={g}
              onClick={() => onFilterChange({ ...filters, gender: g })}
              className={`w-full text-left py-1 text-xs capitalize transition-colors flex items-center justify-between ${
                (filters.gender || 'all') === g
                  ? 'font-bold text-luxury-black'
                  : 'text-neutral-600 hover:text-luxury-black'
              }`}
            >
              <span>{g === 'all' ? 'All Collections' : g}</span>
              {(filters.gender || 'all') === g && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="space-y-2 pb-4 border-b border-luxury-border">
        <h4 className="font-bold uppercase tracking-wider text-[11px]">Price</h4>
        <div className="space-y-1">
          {[
            { id: 'all', label: 'All Prices' },
            { id: 'under-999', label: 'Under ₹999' },
            { id: '999-1499', label: '₹999 – ₹1,499' },
            { id: '1500-2499', label: '₹1,500 – ₹2,499' },
            { id: '2500-plus', label: '₹2,500 & Above' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => onFilterChange({ ...filters, priceRange: item.id })}
              className={`w-full text-left py-1 text-xs transition-colors flex items-center justify-between ${
                (filters.priceRange || 'all') === item.id
                  ? 'font-bold text-luxury-black'
                  : 'text-neutral-600 hover:text-luxury-black'
              }`}
            >
              <span>{item.label}</span>
              {(filters.priceRange || 'all') === item.id && <Check className="w-3 h-3" />}
            </button>
          ))}
        </div>
      </div>

      {/* Sizes Filter */}
      <div className="space-y-2 pb-4 border-b border-luxury-border">
        <h4 className="font-bold uppercase tracking-wider text-[11px]">Sizes</h4>
        <div className="grid grid-cols-4 gap-1.5 pt-1">
          {SIZES_LIST.map((sz) => {
            const isSelected = (filters.sizes || []).includes(sz);
            return (
              <button
                key={sz}
                onClick={() => handleSizeToggle(sz)}
                className={`py-1.5 text-center text-xs font-semibold uppercase rounded-xs border transition-colors ${
                  isSelected
                    ? 'bg-luxury-black text-white border-luxury-black'
                    : 'bg-white text-luxury-black border-luxury-border hover:border-neutral-400'
                }`}
              >
                {sz}
              </button>
            );
          })}
        </div>
      </div>

      {/* Color Filter */}
      <div className="space-y-2 pb-4 border-b border-luxury-border">
        <h4 className="font-bold uppercase tracking-wider text-[11px]">Colors</h4>
        <div className="flex flex-wrap gap-2 pt-1">
          {COLORS_LIST.map((c) => {
            const isSelected = (filters.colors || []).includes(c.name);
            return (
              <button
                key={c.name}
                onClick={() => handleColorToggle(c.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs border text-[11px] transition-colors ${
                  isSelected
                    ? 'bg-neutral-100 border-luxury-black font-bold'
                    : 'bg-white border-luxury-border text-neutral-600 hover:border-neutral-400'
                }`}
              >
                <span
                  className="w-3 h-3 rounded-full border border-black/20"
                  style={{ backgroundColor: c.hex }}
                />
                <span>{c.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="pt-1">
        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={Boolean(filters.inStockOnly)}
            onChange={(e) => onFilterChange({ ...filters, inStockOnly: e.target.checked })}
            className="w-4 h-4 rounded text-luxury-black focus:ring-0 cursor-pointer accent-black"
          />
          <span className="text-xs font-medium text-luxury-black">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
