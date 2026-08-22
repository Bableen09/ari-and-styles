import React from 'react';
import { ArrowUpDown } from 'lucide-react';

const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured Drops' },
  { id: 'newest', label: 'Newest Arrivals' },
  { id: 'best-seller', label: 'Best Selling' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' },
];

export const SortDropdown = ({ sortBy, onSortChange }) => {
  return (
    <div className="relative inline-flex items-center gap-1.5 text-xs">
      <span className="text-neutral-500 font-medium uppercase tracking-wider text-[10px] hidden sm:inline">
        Sort By:
      </span>
      <div className="relative">
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="appearance-none bg-white border border-luxury-border rounded-xs px-3 py-2 pr-8 text-xs font-semibold text-luxury-black focus:outline-hidden focus:border-luxury-black cursor-pointer uppercase tracking-wider"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
};

export default SortDropdown;
