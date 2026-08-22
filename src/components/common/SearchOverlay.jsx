import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, X, ArrowRight, Clock, Flame, ChevronRight } from 'lucide-react';
import { useDebounce } from '../../hooks/useDebounce';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { productService } from '../../services/productService';
import { formatPrice } from '../../utils/currency';
import { analyticsService } from '../../services/analyticsService';

const POPULAR_SEARCH_TERMS = [
  'Denim Jacket',
  'Heavyweight Tee',
  'Cargo Pants',
  'French Terry Hoodie',
  'Selvedge Jeans',
  'Linen Shirt',
  'Slip Dress',
  'Tailored Trousers',
];

export const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useLocalStorage('ari_styles_recent_searches', [
    'Denim Jacket',
    'Black T-Shirt',
    'Cargo Pants',
  ]);

  const debouncedQuery = useDebounce(query, 250);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input when opened & handle body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      document.body.style.overflow = '';
      setQuery('');
      setResults([]);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Search when debounced query updates
  useEffect(() => {
    if (!debouncedQuery || debouncedQuery.trim().length === 0) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    productService.searchProducts(debouncedQuery, 6).then((matched) => {
      setResults(matched);
      setIsLoading(false);
      analyticsService.search(debouncedQuery, matched.length);
    });
  }, [debouncedQuery]);

  const handleSubmitSearch = (searchTerm) => {
    const term = (searchTerm || query).trim();
    if (!term) return;

    // Save to recent searches
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== term.toLowerCase());
      return [term, ...filtered].slice(0, 6);
    });

    onClose();
    navigate(`/search?q=${encodeURIComponent(term)}`);
  };

  const removeRecentSearch = (e, termToRemove) => {
    e.stopPropagation();
    setRecentSearches((prev) => prev.filter((s) => s !== termToRemove));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/60 backdrop-blur-xs animate-fade-in">
      {/* Search Container Panel */}
      <div className="w-full bg-[#FAF9F5] border-b border-luxury-border shadow-2xl animate-slide-in-up pb-8 pt-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Top Bar with Close */}
          <div className="flex items-center justify-between pb-3 border-b border-luxury-border">
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-500">
              Search Ari & Styles Collection
            </span>
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-neutral-500 hover:text-luxury-black transition-colors"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Search Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmitSearch();
            }}
            className="relative mt-4 flex items-center"
          >
            <Search className="w-6 h-6 text-neutral-400 absolute left-2" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for jackets, heavyweight tees, denim, linen..."
              className="w-full pl-11 pr-12 py-3.5 bg-white border border-luxury-border rounded-sm text-base sm:text-lg text-luxury-black placeholder:text-neutral-400 focus:outline-hidden focus:border-luxury-black transition-all"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="absolute right-3 p-1 text-neutral-400 hover:text-luxury-black"
                aria-label="Clear query"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </form>

          {/* Live Search Results or Suggestions */}
          <div className="mt-6 max-h-[60vh] overflow-y-auto no-scrollbar">
            {isLoading ? (
              <div className="py-8 text-center text-xs uppercase tracking-widest text-neutral-500">
                Searching collection...
              </div>
            ) : query.trim() !== '' ? (
              /* Search Results */
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-luxury-border/60">
                  <h4 className="text-xs font-semibold tracking-widest uppercase text-neutral-500">
                    Products ({results.length})
                  </h4>
                  {results.length > 0 && (
                    <button
                      onClick={() => handleSubmitSearch()}
                      className="text-xs font-semibold text-luxury-black hover:text-luxury-gold inline-flex items-center gap-1"
                    >
                      <span>View all results</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {results.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.slug}`}
                        onClick={onClose}
                        className="flex items-center gap-3 p-2 bg-white rounded-xs border border-luxury-border hover:border-neutral-400 transition-all group"
                      >
                        <img
                          src={product.thumbnail || product.images[0]}
                          alt={product.name}
                          className="w-14 h-18 object-cover rounded-xs flex-shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] uppercase tracking-wider text-neutral-400 block truncate">
                            {product.category}
                          </span>
                          <h5 className="text-xs font-semibold text-luxury-black group-hover:text-luxury-gold truncate transition-colors">
                            {product.name}
                          </h5>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs font-bold text-luxury-black">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[10px] text-neutral-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-neutral-300 group-hover:text-luxury-black transition-colors" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-neutral-600">No products found matching "{query}".</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Try searching for broader keywords like "jacket", "tee", or "pants".
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Default Suggestions & Recent Searches */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Recent Searches */}
                {recentSearches.length > 0 && (
                  <div>
                    <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Recent Searches</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {recentSearches.map((term, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            setQuery(term);
                            handleSubmitSearch(term);
                          }}
                          className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-luxury-border rounded text-xs text-luxury-black hover:border-neutral-400 cursor-pointer transition-colors"
                        >
                          <span>{term}</span>
                          <button
                            onClick={(e) => removeRecentSearch(e, term)}
                            className="text-neutral-400 hover:text-neutral-700"
                            aria-label={`Remove search term ${term}`}
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Keywords */}
                <div>
                  <h4 className="flex items-center gap-1.5 text-xs font-bold tracking-widest uppercase text-neutral-500 mb-3">
                    <Flame className="w-3.5 h-3.5 text-luxury-gold" />
                    <span>Popular Searches</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCH_TERMS.map((term, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setQuery(term);
                          handleSubmitSearch(term);
                        }}
                        className="px-3 py-1.5 bg-white border border-luxury-border rounded text-xs text-neutral-700 hover:text-luxury-black hover:border-luxury-black transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Click outside backdrop */}
      <div className="flex-1" onClick={onClose} />
    </div>
  );
};

export default SearchOverlay;
