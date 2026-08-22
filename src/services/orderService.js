/**
 * Order Service Abstraction Layer
 * Handles order creation, receipt tracking, and order history.
 * Easily connected to POST /api/v1/orders in production.
 */

const ORDER_STORAGE_KEY = 'ari_styles_orders';

export const orderService = {
  /**
   * Create and record a new order
   */
  async createOrder(orderPayload) {
    const orderId = `AS-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    
    // Estimate delivery 4 days from now
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 4);
    
    const newOrder = {
      orderId,
      createdAt: new Date().toISOString(),
      estimatedDelivery: deliveryDate.toLocaleDateString('en-IN', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Confirmed', // Confirmed -> Packed -> Shipped -> Out for Delivery -> Delivered
      trackingHistory: [
        {
          status: 'Confirmed',
          time: new Date().toISOString(),
          description: 'Order placed & payment verified.',
        },
      ],
      ...orderPayload,
    };

    // Store in localStorage for demo state persistence across sessions
    try {
      const existing = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
      existing.unshift(newOrder);
      localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(existing));
    } catch (e) {
      console.warn('Failed to persist order to local storage', e);
    }

    return Promise.resolve(newOrder);
  },

  /**
   * Retrieve order by ID
   */
  async getOrderById(orderId) {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
      const found = existing.find((o) => o.orderId === orderId);
      return Promise.resolve(found || null);
    } catch (e) {
      return Promise.resolve(null);
    }
  },

  /**
   * Get all past orders for customer account
   */
  async getOrderHistory() {
    try {
      const existing = JSON.parse(localStorage.getItem(ORDER_STORAGE_KEY) || '[]');
      return Promise.resolve(existing);
    } catch (e) {
      return Promise.resolve([]);
    }
  },
};

export default orderService;
