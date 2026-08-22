import React from 'react';
import { X } from 'lucide-react';

export const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const chips = [];

  if (filters.category && filters.category !== 'all') {
    chips.push({
      key: 'category',
      label: `Category: ${filters.category}`,
      onRemove: () => onRemoveFilter('category', 'all'),
    });
  }

  if (filters.gender && filters.gender !== 'all') {
    chips.push({
      key: 'gender',
      label: `Gender: ${filters.gender}`,
      onRemove: () => onRemoveFilter('gender', 'all'),
    });
  }

  if (filters.priceRange && filters.priceRange !== 'all') {
    const labelMap = {
      'under-999': 'Under ₹999',
      '999-1499': '₹999 – ₹1,499',
      '1500-2499': '₹1,500 – ₹2,499',
      '2500-plus': '₹2,500+',
    };
    chips.push({
      key: 'priceRange',
      label: `Price: ${labelMap[filters.priceRange] || filters.priceRange}`,
      onRemove: () => onRemoveFilter('priceRange', 'all'),
    });
  }

  if (filters.sizes && filters.sizes.length > 0) {
    filters.sizes.forEach((size) => {
      chips.push({
        key: `size-${size}`,
        label: `Size: ${size}`,
        onRemove: () =>
          onRemoveFilter(
            'sizes',
            filters.sizes.filter((s) => s !== size)
          ),
      });
    });
  }

  if (filters.colors && filters.colors.length > 0) {
    filters.colors.forEach((col) => {
      chips.push({
        key: `col-${col}`,
        label: `Color: ${col}`,
        onRemove: () =>
          onRemoveFilter(
            'colors',
            filters.colors.filter((c) => c !== col)
          ),
      });
    });
  }

  if (filters.inStockOnly) {
    chips.push({
      key: 'inStockOnly',
      label: 'In Stock Only',
      onRemove: () => onRemoveFilter('inStockOnly', false),
    });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4 pt-1">
      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mr-1">
        Active Filters:
      </span>
      {chips.map((chip) => (
        <span
          key={chip.key}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black font-medium"
        >
          <span>{chip.label}</span>
          <button
            onClick={chip.onRemove}
            className="p-0.5 text-neutral-400 hover:text-luxury-black transition-colors"
            aria-label={`Remove filter ${chip.label}`}
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
      <button
        onClick={onClearAll}
        className="text-[11px] font-bold uppercase tracking-wider text-red-600 hover:underline ml-2"
      >
        Clear All
      </button>
    </div>
  );
};

export default ActiveFilters;
