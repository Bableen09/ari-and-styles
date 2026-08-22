/**
 * Analytics Service Abstraction Layer
 * Vendor-agnostic e-commerce telemetry tracker.
 * Dispatches to Google Analytics (gtag), Meta Pixel, Plausible, or Mixpanel.
 */

export const analyticsService = {
  /**
   * Track standard e-commerce action
   * @param {string} eventName - e.g. 'page_view', 'product_view', 'add_to_cart', 'purchase'
   * @param {object} payload - metadata payload
   */
  track(eventName, payload = {}) {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
      console.debug(`[Analytics Event] ${eventName}:`, payload);
    }

    // Google Analytics 4 integration hook
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, payload);
    }

    // Meta Pixel integration hook
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('trackCustom', eventName, payload);
    }
  },

  pageView(path, title) {
    this.track('page_view', { page_path: path, page_title: title });
  },

  productView(product) {
    this.track('product_view', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price,
      currency: 'INR',
    });
  },

  addToCart(product, size, color, quantity = 1) {
    this.track('add_to_cart', {
      product_id: product.id,
      product_name: product.name,
      category: product.category,
      price: product.price,
      size,
      color: color?.name,
      quantity,
      currency: 'INR',
    });
  },

  removeFromCart(item) {
    this.track('remove_from_cart', {
      product_id: item.id,
      product_name: item.name,
      size: item.size,
      quantity: item.quantity,
    });
  },

  beginCheckout(items, totalAmount) {
    this.track('begin_checkout', {
      items_count: items.length,
      total_amount: totalAmount,
      currency: 'INR',
    });
  },

  purchase(order) {
    this.track('purchase', {
      order_id: order.orderId,
      total_amount: order.pricing?.total,
      shipping: order.pricing?.shippingFee,
      tax: order.pricing?.tax,
      items: order.items,
      currency: 'INR',
    });
  },

  search(query, resultsCount) {
    this.track('search', {
      search_term: query,
      results_count: resultsCount,
    });
  },

  wishlistToggle(product, isAdded) {
    this.track(isAdded ? 'wishlist_add' : 'wishlist_remove', {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
    });
  },
};

export default analyticsService;
