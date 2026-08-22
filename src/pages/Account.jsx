import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  User,
  Package,
  Heart,
  MapPin,
  Settings,
  LogOut,
  Plus,
  Trash2,
  CheckCircle2,
  Clock,
  Truck,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../hooks/useWishlist';
import { orderService } from '../services/orderService';
import { formatPrice } from '../utils/currency';
import { siteConfig } from '../config/siteConfig';

export const Account = () => {
  const {
    user,
    isAuthenticated,
    logout,
    openAuthModal,
    updateProfile,
    addAddress,
    removeAddress,
  } = useAuth();

  const { wishlist, wishlistCount } = useWishlist();
  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'profile' | 'addresses' | 'wishlist' | 'settings'
  const [orders, setOrders] = useState([]);
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [newAddressData, setNewAddressData] = useState({
    fullName: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Haryana',
    pincode: '',
    isDefault: false,
  });

  useEffect(() => {
    orderService.getOrderHistory().then((history) => {
      // If no orders yet, include sample past orders for demonstration
      if (history.length === 0) {
        setOrders([
          {
            orderId: 'AS-2026-928410',
            createdAt: '2026-02-18T10:30:00.000Z',
            estimatedDelivery: 'Wed, Feb 25',
            status: 'Delivered',
            pricing: { total: 2499, subtotal: 2499, shippingFee: 0 },
            payment: { method: 'UPI Instant Transfer', status: 'PAID' },
            items: [
              {
                name: 'Urban Oversized Denim Jacket',
                size: 'L',
                color: { name: 'Washed Vintage Indigo' },
                price: 2499,
                quantity: 1,
                image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80',
              },
            ],
          },
          {
            orderId: 'AS-2026-819230',
            createdAt: '2026-01-28T14:15:00.000Z',
            estimatedDelivery: 'Mon, Feb 02',
            status: 'Delivered',
            pricing: { total: 1998, subtotal: 1998, shippingFee: 0 },
            payment: { method: 'Credit Card', status: 'PAID' },
            items: [
              {
                name: 'Essential Black T-Shirt',
                size: 'M',
                color: { name: 'Obsidian Black' },
                price: 999,
                quantity: 2,
                image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80',
              },
            ],
          },
        ]);
      } else {
        setOrders(history);
      }
    });

    window.scrollTo(0, 0);
  }, []);

  const handleSaveNewAddress = (e) => {
    e.preventDefault();
    if (!newAddressData.fullName || !newAddressData.address || !newAddressData.pincode) return;
    addAddress(newAddressData);
    setIsAddingAddress(false);
    setNewAddressData({
      fullName: '',
      phone: '',
      address: '',
      apartment: '',
      city: '',
      state: 'Haryana',
      pincode: '',
      isDefault: false,
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'Shipped':
      case 'Out for Delivery':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Confirmed':
      case 'Packed':
      case 'Processing':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'Cancelled':
      case 'Returned':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="My Account & Orders"
        description="Manage your Ari & Styles member profile, order tracking, and delivery preferences."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Account', url: '/account' }]} />

        {/* Page Header */}
        <div className="py-6 sm:py-8 border-b border-luxury-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              {siteConfig.brand.name} Insider Portal
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mt-1">
              {user ? `WELCOME, ${user.fullName.toUpperCase()}` : 'CLIENT ACCOUNT'}
            </h1>
            {user && (
              <p className="text-xs text-neutral-500 mt-1">
                Member Tier: <strong className="text-luxury-black">{user.tier}</strong> • Registered since {user.memberSince}
              </p>
            )}
          </div>

          {!user ? (
            <button onClick={() => openAuthModal('login')} className="btn-luxury text-xs py-3 px-6">
              Sign In / Register
            </button>
          ) : (
            <button
              onClick={logout}
              className="text-xs font-semibold uppercase tracking-wider text-neutral-500 hover:text-red-600 inline-flex items-center gap-1.5 self-start sm:self-auto"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          )}
        </div>

        {/* Main Tabs Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 py-8">
          {/* Navigation Sidebar (3 cols) */}
          <aside className="lg:col-span-3 space-y-1">
            <div className="bg-white rounded-xs border border-luxury-border p-2 shadow-2xs space-y-1">
              <button
                onClick={() => setActiveTab('orders')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'orders'
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>Order History</span>
                </div>
                <span className="text-[10px] opacity-70">({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('profile')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'profile'
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Profile & Identity</span>
              </button>

              <button
                onClick={() => setActiveTab('addresses')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'addresses'
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4" />
                  <span>Saved Addresses</span>
                </div>
                <span className="text-[10px] opacity-70">({user?.addresses?.length || 0})</span>
              </button>

              <button
                onClick={() => setActiveTab('wishlist')}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'wishlist'
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className="w-4 h-4" />
                  <span>Saved Wishlist</span>
                </div>
                <span className="text-[10px] opacity-70">({wishlistCount})</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xs text-xs font-semibold uppercase tracking-wider transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Account Preferences</span>
              </button>
            </div>
          </aside>

          {/* Tab Content Stage (9 cols) */}
          <main className="lg:col-span-9 space-y-6">
            {/* TAB 1: ORDERS */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-luxury-border">
                  <h3 className="font-serif text-xl font-bold text-luxury-black">
                    Your Orders ({orders.length})
                  </h3>
                </div>

                {orders.length === 0 ? (
                  <div className="bg-white p-8 rounded-xs border border-luxury-border text-center space-y-3">
                    <Package className="w-8 h-8 text-neutral-300 mx-auto" />
                    <h4 className="font-serif text-lg font-bold text-luxury-black">No Orders Yet</h4>
                    <p className="text-xs text-neutral-500">
                      When you place an order, you can track delivery progress here.
                    </p>
                    <Link to="/shop" className="btn-luxury text-xs inline-block">
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, idx) => (
                      <div
                        key={idx}
                        className="bg-white rounded-xs border border-luxury-border p-5 sm:p-6 shadow-2xs space-y-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-neutral-100">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-neutral-400">
                              Order #{order.orderId}
                            </span>
                            <p className="text-xs text-neutral-600 mt-0.5">
                              Placed on {new Date(order.createdAt).toLocaleDateString('en-IN', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span
                              className={`px-2.5 py-0.5 text-[10px] font-bold uppercase rounded-xs border ${getStatusBadge(
                                order.status
                              )}`}
                            >
                              {order.status}
                            </span>
                            <span className="font-bold text-sm text-luxury-black">
                              {formatPrice(order.pricing?.total)}
                            </span>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="divide-y divide-neutral-100">
                          {order.items?.map((item, iIdx) => (
                            <div key={iIdx} className="py-2.5 first:pt-0 flex items-center justify-between gap-4">
                              <div className="flex items-center gap-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-12 h-16 object-cover rounded-xs border border-luxury-border flex-shrink-0"
                                />
                                <div>
                                  <h5 className="text-xs font-semibold text-luxury-black">
                                    {item.name}
                                  </h5>
                                  <p className="text-[11px] text-neutral-500">
                                    Qty: {item.quantity} • Size: {item.size} • {item.color?.name || 'Standard'}
                                  </p>
                                </div>
                              </div>
                              <span className="text-xs font-bold text-luxury-black">
                                {formatPrice(item.price * item.quantity)}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Footer details */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs text-neutral-500">
                          <span>Payment Method: {order.payment?.method || 'UPI'}</span>
                          <span className="text-emerald-800 font-medium">
                            Expected: {order.estimatedDelivery || '3–5 Business Days'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-6">
                <h3 className="font-serif text-xl font-bold text-luxury-black pb-3 border-b border-luxury-border">
                  Personal Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user?.fullName || ''}
                      onBlur={(e) => updateProfile({ fullName: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={user?.email || ''}
                      onBlur={(e) => updateProfile({ email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      defaultValue={user?.phone || ''}
                      onBlur={(e) => updateProfile({ phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1">
                      Membership Tier
                    </label>
                    <input
                      type="text"
                      disabled
                      value={user?.tier || 'Ari Insider'}
                      className="w-full px-3.5 py-2.5 bg-neutral-100 border border-neutral-200 rounded-xs text-xs text-neutral-500"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: ADDRESSES */}
            {activeTab === 'addresses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-luxury-border">
                  <h3 className="font-serif text-xl font-bold text-luxury-black">
                    Saved Delivery Addresses
                  </h3>
                  <button
                    onClick={() => setIsAddingAddress(!isAddingAddress)}
                    className="btn-luxury py-2 px-4 text-xs inline-flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isAddingAddress ? 'Cancel' : 'Add New Address'}</span>
                  </button>
                </div>

                {isAddingAddress && (
                  <form
                    onSubmit={handleSaveNewAddress}
                    className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-4 animate-scale-in"
                  >
                    <h4 className="font-bold text-xs uppercase tracking-wider text-luxury-black">
                      New Shipping Address
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddressData.fullName}
                          onChange={(e) => setNewAddressData({ ...newAddressData, fullName: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={newAddressData.phone}
                          onChange={(e) => setNewAddressData({ ...newAddressData, phone: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        required
                        value={newAddressData.address}
                        onChange={(e) => setNewAddressData({ ...newAddressData, address: e.target.value })}
                        className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddressData.city}
                          onChange={(e) => setNewAddressData({ ...newAddressData, city: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                          State *
                        </label>
                        <input
                          type="text"
                          required
                          value={newAddressData.state}
                          onChange={(e) => setNewAddressData({ ...newAddressData, state: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold uppercase text-neutral-500 mb-1">
                          PIN Code *
                        </label>
                        <input
                          type="text"
                          required
                          maxLength={6}
                          value={newAddressData.pincode}
                          onChange={(e) => setNewAddressData({ ...newAddressData, pincode: e.target.value })}
                          className="w-full px-3 py-2 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button type="submit" className="btn-luxury py-2.5 px-6 text-xs">
                        Save Address
                      </button>
                    </div>
                  </form>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {user?.addresses?.map((addr) => (
                    <div
                      key={addr.id}
                      className="bg-white p-5 rounded-xs border border-luxury-border shadow-2xs relative space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-luxury-black">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] bg-luxury-black text-white px-2 py-0.5 uppercase tracking-wider rounded-xs">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-neutral-600">{addr.address}</p>
                      {addr.apartment && <p className="text-neutral-600">{addr.apartment}</p>}
                      <p className="text-neutral-600">
                        {addr.city}, {addr.state} — {addr.pincode}
                      </p>
                      <p className="text-neutral-500">Phone: {addr.phone}</p>

                      <div className="pt-3 border-t border-neutral-100 flex justify-end">
                        <button
                          onClick={() => removeAddress(addr.id)}
                          className="text-neutral-400 hover:text-red-600 p-1 transition-colors"
                          aria-label="Remove address"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: WISHLIST SHORTCUT */}
            {activeTab === 'wishlist' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-luxury-border">
                  <h3 className="font-serif text-xl font-bold text-luxury-black">
                    Saved Favorites ({wishlistCount})
                  </h3>
                  <Link to="/wishlist" className="btn-luxury py-2 px-4 text-xs">
                    Open Wishlist Page
                  </Link>
                </div>
                {wishlist.length === 0 ? (
                  <p className="text-xs text-neutral-500">Your wishlist is currently empty.</p>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {wishlist.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        to={`/product/${item.slug}`}
                        className="bg-white p-3 rounded-xs border border-luxury-border hover:border-neutral-400 transition-colors block"
                      >
                        <img
                          src={item.thumbnail || item.images?.[0]}
                          alt={item.name}
                          className="aspect-[3/4] object-cover rounded-xs mb-2"
                        />
                        <h5 className="text-xs font-semibold text-luxury-black truncate">{item.name}</h5>
                        <p className="text-xs font-bold text-luxury-black mt-1">{formatPrice(item.price)}</p>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 5: SETTINGS */}
            {activeTab === 'settings' && (
              <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-6 text-xs">
                <h3 className="font-serif text-xl font-bold text-luxury-black pb-3 border-b border-luxury-border">
                  Account Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-black w-4 h-4" />
                    <span>Receive SMS notifications for order dispatch and live delivery tracking</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-black w-4 h-4" />
                    <span>Receive weekly editorial drop emails and exclusive insider discounts</span>
                  </label>
                </div>
                <div className="pt-4 border-t border-neutral-100">
                  <button
                    onClick={() => alert('Preferences saved.')}
                    className="btn-luxury py-2.5 px-6 text-xs"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Account;
