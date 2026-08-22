import React from 'react';
import { ProductCard } from './ProductCard';
import { EmptyState } from '../common/EmptyState';

export const ProductGrid = ({
  products = [],
  columns = 4,
  emptyTitle = "No Products Found",
  emptyDescription = "Try adjusting your filters or search terms to find what you're looking for.",
}) => {
  if (!products || products.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  const columnClass =
    columns === 3
      ? 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3'
      : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  return (
    <div className={`grid ${columnClass} gap-4 sm:gap-6 lg:gap-8`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
