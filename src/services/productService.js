/**
 * Product Service Abstraction Layer
 * Interfaces with local catalog or future REST/GraphQL Product API (Supabase, PostgreSQL, Medusa, Shopify)
 */

import { products } from '../data/products';
import { filterProducts, sortProducts } from '../utils/filters';

export const productService = {
  /**
   * Fetch all products with optional filter and sort parameters
   */
  async getProducts(params = {}) {
    // Simulated network latency for realistic feel (can be removed or tied to real fetch)
    const { filters = {}, sortBy = 'featured' } = params;
    let result = filterProducts(products, filters);
    result = sortProducts(result, sortBy);
    return Promise.resolve(result);
  },

  /**
   * Fetch a single product by its URL slug
   */
  async getProductBySlug(slug) {
    if (!slug) return Promise.resolve(null);
    const found = products.find((p) => p.slug.toLowerCase() === slug.toLowerCase());
    return Promise.resolve(found || null);
  },

  /**
   * Fetch a single product by its unique ID
   */
  async getProductById(id) {
    if (!id) return Promise.resolve(null);
    const found = products.find((p) => p.id === id);
    return Promise.resolve(found || null);
  },

  /**
   * Get featured showcase products
   */
  async getFeaturedProducts(limit = 8) {
    const featured = products.filter((p) => p.isFeatured).slice(0, limit);
    return Promise.resolve(featured);
  },

  /**
   * Get new arrival drops
   */
  async getNewArrivals(limit = 6) {
    const newArrivals = products.filter((p) => p.isNew).slice(0, limit);
    return Promise.resolve(newArrivals);
  },

  /**
   * Get related products based on category or tags, excluding current product
   */
  async getRelatedProducts(currentProductId, category, limit = 4) {
    const related = products
      .filter((p) => p.id !== currentProductId && p.category.toLowerCase() === category.toLowerCase())
      .slice(0, limit);
    
    // If not enough in same category, supplement with featured items
    if (related.length < limit) {
      const extra = products
        .filter((p) => p.id !== currentProductId && !related.some((r) => r.id === p.id))
        .slice(0, limit - related.length);
      return Promise.resolve([...related, ...extra]);
    }
    
    return Promise.resolve(related);
  },

  /**
   * Search catalog by query string
   */
  async searchProducts(query, limit = 12) {
    if (!query || query.trim() === '') return Promise.resolve([]);
    const q = query.toLowerCase().trim();
    const results = products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)))
    ).slice(0, limit);
    return Promise.resolve(results);
  }
};

export default productService;
