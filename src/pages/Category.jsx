import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { FilterDrawerMobile } from '../components/shop/FilterDrawerMobile';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ActiveFilters } from '../components/shop/ActiveFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { categories } from '../data/categories';
import { products } from '../data/products';
import { filterProducts, sortProducts } from '../utils/filters';
import { analyticsService } from '../services/analyticsService';

export const Category = () => {
  const { category: categorySlug } = useParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const matchedCategory = categories.find(
    (c) => c.slug.toLowerCase() === (categorySlug || '').toLowerCase()
  );

  const [filters, setFilters] = useState({
    category: categorySlug || 'all',
    gender: 'all',
    priceRange: 'all',
    sizes: [],
    colors: [],
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState('featured');

  // Keep filter category in sync with route param
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: categorySlug || 'all',
    }));
    analyticsService.pageView(`/category/${categorySlug}`, `${matchedCategory?.name || 'Category'} — Ari & Styles`);
    window.scrollTo(0, 0);
  }, [categorySlug, matchedCategory]);

  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, {
      ...filters,
      category: categorySlug,
    });
    result = sortProducts(result, sortBy);
    return result;
  }, [categorySlug, filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleResetFilters = () => {
    setFilters({
      category: categorySlug || 'all',
      gender: 'all',
      priceRange: 'all',
      sizes: [],
      colors: [],
      inStockOnly: false,
    });
  };

  const handleRemoveFilter = (key, value) => {
    handleFilterChange({
      ...filters,
      [key]: value,
    });
  };

  if (!matchedCategory) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F5]">
        <h2 className="font-serif text-3xl font-bold text-luxury-black mb-2">Category Not Found</h2>
        <p className="text-xs text-neutral-500 mb-6">The category "{categorySlug}" does not exist in our catalog.</p>
        <Link to="/shop" className="btn-luxury text-xs">
          View All Categories
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title={`${matchedCategory.name} — Modern Fashion`}
        description={matchedCategory.description}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            { label: matchedCategory.name, url: `/category/${matchedCategory.slug}` },
          ]}
        />

        {/* Category Editorial Hero Banner */}
        <div className="relative rounded-xs overflow-hidden my-6 border border-luxury-border bg-neutral-900 shadow-md">
          <div className="aspect-[21/9] sm:aspect-[24/8] w-full overflow-hidden relative">
            <img
              src={matchedCategory.image}
              alt={matchedCategory.name}
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent flex items-center p-6 sm:p-12">
              <div className="max-w-xl text-white space-y-2">
                <span className="text-[10px] font-bold tracking-widest uppercase text-luxury-gold block">
                  Category Collection
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
                  {matchedCategory.name}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed">
                  {matchedCategory.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between py-4 border-b border-luxury-border gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-luxury-border rounded-xs text-xs font-semibold uppercase tracking-wider text-luxury-black"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          <div className="text-xs text-neutral-500 font-medium">
            Showing <strong className="text-luxury-black font-bold">{filteredProducts.length}</strong> Pieces
          </div>

          <div className="flex items-center gap-3">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Active Filters */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleResetFilters}
        />

        {/* Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mt-6">
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24 bg-white p-5 rounded-xs border border-luxury-border shadow-2xs">
              <FilterSidebar
                filters={filters}
                onFilterChange={handleFilterChange}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
              />
            </div>
          </aside>

          <main className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              columns={3}
              emptyTitle={`No ${matchedCategory.name} Found`}
              emptyDescription="Try resetting your filters or check other collections."
            />
          </main>
        </div>
      </div>

      <FilterDrawerMobile
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={handleResetFilters}
        totalResults={filteredProducts.length}
      />
    </div>
  );
};

export default Category;
