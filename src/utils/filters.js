/**
 * Product Filtering, Sorting, and Search Utilities
 */

export const filterProducts = (productsList, filters = {}) => {
  if (!Array.isArray(productsList)) return [];

  return productsList.filter((product) => {
    // Category filter
    if (filters.category && filters.category !== 'all') {
      if (product.category.toLowerCase() !== filters.category.toLowerCase()) {
        return false;
      }
    }

    // Gender filter
    if (filters.gender && filters.gender !== 'all') {
      const matchGender =
        product.gender.toLowerCase() === filters.gender.toLowerCase() ||
        product.gender.toLowerCase() === 'unisex';
      if (!matchGender) return false;
    }

    // Price Range filter
    if (filters.priceRange && filters.priceRange !== 'all') {
      const price = product.price;
      switch (filters.priceRange) {
        case 'under-999':
          if (price >= 1000) return false;
          break;
        case '999-1499':
          if (price < 999 || price > 1499) return false;
          break;
        case '1500-2499':
          if (price < 1500 || price > 2499) return false;
          break;
        case '2500-plus':
          if (price < 2500) return false;
          break;
        default:
          break;
      }
    }

    // Size filter (array of selected sizes)
    if (filters.sizes && filters.sizes.length > 0) {
      const hasMatchingSize = filters.sizes.some((selectedSize) =>
        product.sizes.some(
          (s) => s.toLowerCase().trim() === selectedSize.toLowerCase().trim() ||
                 s.toLowerCase().includes(selectedSize.toLowerCase())
        )
      );
      if (!hasMatchingSize) return false;
    }

    // Color filter (array of selected colors)
    if (filters.colors && filters.colors.length > 0) {
      const hasMatchingColor = filters.colors.some((selectedColor) =>
        product.colors.some((c) =>
          c.name.toLowerCase().includes(selectedColor.toLowerCase())
        )
      );
      if (!hasMatchingColor) return false;
    }

    // Availability filter
    if (filters.inStockOnly) {
      if (product.stock === 'OUT OF STOCK') return false;
    }

    // Minimum rating filter
    if (filters.minRating && filters.minRating > 0) {
      if (product.rating < filters.minRating) return false;
    }

    // Search query filter (if provided within filter object)
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchCategory = product.category.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTags = product.tags && product.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchCategory && !matchDesc && !matchTags) return false;
    }

    return true;
  });
};

export const sortProducts = (productsList, sortBy = 'featured') => {
  if (!Array.isArray(productsList)) return [];
  const list = [...productsList];

  switch (sortBy) {
    case 'newest':
      return list.sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
    case 'best-seller':
      return list.sort((a, b) => (b.isBestSeller === a.isBestSeller ? 0 : b.isBestSeller ? 1 : -1));
    case 'price-asc':
      return list.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return list.sort((a, b) => b.price - a.price);
    case 'rating':
      return list.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case 'featured':
    default:
      return list.sort((a, b) => (b.isFeatured === a.isFeatured ? 0 : b.isFeatured ? 1 : -1));
  }
};
