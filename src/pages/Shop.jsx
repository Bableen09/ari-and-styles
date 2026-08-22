import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, Grid, LayoutGrid } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { FilterSidebar } from '../components/shop/FilterSidebar';
import { FilterDrawerMobile } from '../components/shop/FilterDrawerMobile';
import { SortDropdown } from '../components/shop/SortDropdown';
import { ActiveFilters } from '../components/shop/ActiveFilters';
import { ProductGrid } from '../components/product/ProductGrid';
import { products } from '../data/products';
import { filterProducts, sortProducts } from '../utils/filters';
import { analyticsService } from '../services/analyticsService';

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Initialize filters from URL query parameters
  const categoryParam = searchParams.get('category') || 'all';
  const genderParam = searchParams.get('gender') || 'all';
  const sortParam = searchParams.get('sort') || 'featured';

  const [filters, setFilters] = useState({
    category: categoryParam,
    gender: genderParam,
    priceRange: 'all',
    sizes: [],
    colors: [],
    inStockOnly: false,
  });

  const [sortBy, setSortBy] = useState(sortParam);

  // Sync state when URL params change
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: searchParams.get('category') || 'all',
      gender: searchParams.get('gender') || 'all',
    }));
    if (searchParams.get('sort')) {
      setSortBy(searchParams.get('sort'));
    }
  }, [searchParams]);

  useEffect(() => {
    analyticsService.pageView('/shop', 'Shop Collection — Ari & Styles');
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortBy);
    return result;
  }, [filters, sortBy]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update URL if category or gender changed
    const params = new URLSearchParams(searchParams);
    if (newFilters.category && newFilters.category !== 'all') {
      params.set('category', newFilters.category);
    } else {
      params.delete('category');
    }
    if (newFilters.gender && newFilters.gender !== 'all') {
      params.set('gender', newFilters.gender);
    } else {
      params.delete('gender');
    }
    setSearchParams(params);
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      gender: 'all',
      priceRange: 'all',
      sizes: [],
      colors: [],
      inStockOnly: false,
    });
    setSearchParams({});
  };

  const handleRemoveFilter = (key, value) => {
    handleFilterChange({
      ...filters,
      [key]: value,
    });
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Shop Modern Essentials & Streetwear"
        description="Browse the entire Ari & Styles collection. Japanese selvedge denim jackets, 260 GSM organic tees, linen resort shirts, and pleated trousers."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <Breadcrumbs items={[{ label: 'Shop All Collection', url: '/shop' }]} />

        {/* Page Title & Subtext */}
        <div className="py-6 sm:py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            The Master Catalog
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            SHOP THE COLLECTION
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-2xl">
            Thoughtfully engineered silhouettes designed with uncompromising materials and clean geometric tailoring.
          </p>
        </div>

        {/* Toolbar (Mobile Filter Button, Sort Dropdown, Product Count) */}
        <div className="flex items-center justify-between py-4 border-b border-luxury-border gap-4 flex-wrap">
          {/* Mobile Filter Button */}
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-luxury-border rounded-xs text-xs font-semibold uppercase tracking-wider text-luxury-black hover:border-neutral-400"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Product Count */}
          <div className="text-xs text-neutral-500 font-medium">
            Showing <strong className="text-luxury-black font-bold">{filteredProducts.length}</strong> of {products.length} Products
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-3">
            <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
          </div>
        </div>

        {/* Active Filter Tags */}
        <ActiveFilters
          filters={filters}
          onRemoveFilter={handleRemoveFilter}
          onClearAll={handleResetFilters}
        />

        {/* Main Content Layout (Sidebar + Product Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12 mt-6">
          {/* Desktop Sidebar Filter (Left 1 col) */}
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

          {/* Product Grid Area (Right 3 cols) */}
          <main className="lg:col-span-3">
            <ProductGrid
              products={filteredProducts}
              columns={3}
              emptyTitle="No Pieces Match Your Selection"
              emptyDescription="Try selecting different filter options, price ranges, or sizes to discover available styles."
            />
          </main>
        </div>
      </div>

      {/* Mobile Slide-in Filter Drawer */}
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

export default Shop;
