import React, { useEffect } from 'react';
import { X, SlidersHorizontal, Check, RotateCcw } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';

export const FilterDrawerMobile = ({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
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

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="relative w-full max-w-xs bg-[#FAF9F5] h-full shadow-2xl flex flex-col z-10 animate-slide-in-right ml-auto overflow-y-auto">
        <div className="p-4 flex items-center justify-between border-b border-luxury-border bg-white sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-luxury-black" />
            <h3 className="font-serif text-base font-bold text-luxury-black">
              Filter Collection
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close filters"
            className="p-1.5 text-neutral-500 hover:text-luxury-black rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 flex-1">
          <FilterSidebar
            filters={filters}
            onFilterChange={onFilterChange}
            onResetFilters={onResetFilters}
            totalResults={totalResults}
          />
        </div>

        <div className="p-4 border-t border-luxury-border bg-white sticky bottom-0 z-10">
          <button onClick={onClose} className="w-full btn-luxury py-3 text-xs">
            Show Results ({totalResults})
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterDrawerMobile;
