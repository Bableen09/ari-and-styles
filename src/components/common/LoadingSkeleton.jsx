import React from 'react';

export const ProductCardSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 animate-pulse">
      <div className="aspect-[3/4] bg-neutral-200 rounded-xs w-full" />
      <div className="space-y-1.5 pt-1">
        <div className="h-3 bg-neutral-200 rounded-xs w-1/3" />
        <div className="h-4 bg-neutral-200 rounded-xs w-3/4" />
        <div className="h-3.5 bg-neutral-200 rounded-xs w-1/4" />
      </div>
    </div>
  );
};

export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {[...Array(count)].map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
};

export const ProductDetailsSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 animate-pulse">
        {/* Gallery skeleton */}
        <div className="aspect-[3/4] bg-neutral-200 rounded-xs w-full" />
        {/* Info skeleton */}
        <div className="space-y-6">
          <div className="h-4 bg-neutral-200 w-1/4 rounded-xs" />
          <div className="h-8 bg-neutral-200 w-3/4 rounded-xs" />
          <div className="h-6 bg-neutral-200 w-1/3 rounded-xs" />
          <div className="h-20 bg-neutral-200 w-full rounded-xs" />
          <div className="h-12 bg-neutral-200 w-full rounded-xs" />
        </div>
      </div>
    </div>
  );
};

export default {
  ProductCardSkeleton,
  ProductGridSkeleton,
  ProductDetailsSkeleton,
};
