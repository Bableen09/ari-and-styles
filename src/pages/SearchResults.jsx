import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGrid } from '../components/product/ProductGrid';
import { productService } from '../services/productService';
import { analyticsService } from '../services/analyticsService';

export const SearchResults = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [inputValue, setInputValue] = useState(query);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setInputValue(query);
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    productService.searchProducts(query, 24).then((matched) => {
      setResults(matched);
      setIsLoading(false);
      analyticsService.search(query, matched.length);
    });

    window.scrollTo(0, 0);
  }, [query]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchParams({ q: inputValue.trim() });
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title={query ? `Search: "${query}"` : 'Search Collection'}
        description={`Search results for ${query} across Ari & Styles modern fashion catalog.`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            { label: `Search: ${query || 'All'}`, url: `/search?q=${query}` },
          ]}
        />

        {/* Search Header Form */}
        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Catalog Search
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-1">
            {query ? `SEARCH RESULTS FOR "${query.toUpperCase()}"` : 'SEARCH PRODUCTS'}
          </h1>

          <form onSubmit={handleSearchSubmit} className="mt-6 max-w-xl flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search jackets, heavyweight t-shirts, cargo pants..."
                className="w-full pl-10 pr-4 py-3 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
              />
            </div>
            <button type="submit" className="btn-luxury px-6 text-xs flex-shrink-0">
              Search
            </button>
          </form>
        </div>

        {/* Results Body */}
        <div className="py-8">
          {isLoading ? (
            <div className="py-16 text-center text-xs uppercase tracking-widest text-neutral-400">
              Searching collection...
            </div>
          ) : results.length > 0 ? (
            <div className="space-y-6">
              <div className="text-xs text-neutral-500 font-medium">
                Found <strong className="text-luxury-black font-bold">{results.length}</strong> matching pieces
              </div>
              <ProductGrid products={results} columns={4} />
            </div>
          ) : (
            <div className="py-16 text-center max-w-md mx-auto space-y-4">
              <h3 className="font-serif text-2xl font-bold text-luxury-black">
                No Exact Matches Found
              </h3>
              <p className="text-xs text-neutral-500 leading-relaxed">
                We couldn't find any garments matching "{query}". Try checking your spelling or search by broader categories such as "jackets", "tees", or "denim".
              </p>
              <div className="pt-2">
                <Link to="/shop" className="btn-luxury text-xs inline-flex items-center gap-2">
                  <span>Browse All Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;
