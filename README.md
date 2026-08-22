# ARI & STYLES — BEYOND ORDINARY
### Production-Grade Luxury Fashion E-Commerce Frontend

> Modern essentials designed for those who go beyond ordinary. Premium Indian fashion crafted with precision, heavyweight organic fabrics, and architectural silhouettes.

---

## 1. Quick Start & Execution

### Prerequisites
- Node.js (v18+ or v20+ recommended)
- npm (v9+ or v10+)

### Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Build optimized production bundle
npm run build

# 4. Preview production build locally
npm run preview
```

The application will run locally at `http://localhost:3000`.

---

## 2. Project Architecture & File Directory

```
ari-and-styles/
├── public/
│   ├── favicon.svg             # Luxury monogram logo
│   ├── robots.txt              # Search engine directives
│   └── sitemap.xml             # Complete XML sitemap
├── src/
│   ├── config/
│   │   └── siteConfig.js       # Centralized brand, currency, contact & shipping settings
│   ├── data/
│   │   ├── products.js         # Master product catalog (14+ detailed products)
│   │   ├── categories.js       # 8 curated fashion categories
│   │   └── coupons.js          # Active promo coupons (ARI10, WELCOME15, etc.)
│   ├── context/
│   │   ├── CartContext.jsx     # Line item grouping, Indian pricing & free shipping meter
│   │   ├── WishlistContext.jsx # Saved pieces & local persistence
│   │   ├── ToastContext.jsx    # Floating notifications
│   │   ├── AuthContext.jsx     # Client profile, saved addresses & simulated auth
│   │   └── QuickViewContext.jsx# Instant modal product preview
│   ├── hooks/
│   │   ├── useCart.js          # Cart hook
│   │   ├── useWishlist.js      # Wishlist hook
│   │   ├── useLocalStorage.js  # Safe localStorage hook with corruption recovery
│   │   ├── useDebounce.js      # Input debouncer for search
│   │   ├── useRecentlyViewed.js# Browsing history hook
│   │   └── useToast.js         # Toast alert trigger
│   ├── services/
│   │   ├── productService.js   # Product fetching & filtering abstraction
│   │   ├── orderService.js     # Order creation & history lookup
│   │   ├── paymentService.js   # Razorpay/Stripe payment abstraction & security notes
│   │   ├── reviewService.js    # Local review submission & merging
│   │   ├── couponService.js    # Promo code validation logic
│   │   ├── newsletterService.js# Newsletter subscription service
│   │   └── analyticsService.js # E-commerce event telemetry (GA4, Pixel)
│   ├── utils/
│   │   ├── currency.js         # Indian Rupee formatting (e.g. ₹1,999)
│   │   ├── filters.js          # Multi-attribute filter & sort engines
│   │   └── validation.js       # Form validators (Email, 10-digit Phone, 6-digit PIN)
│   ├── components/
│   │   ├── common/             # Header, Footer, AnnouncementBar, SearchOverlay, Drawer, Modals, SEO
│   │   ├── product/            # ProductCard, Gallery, Info, Reviews, Grid, RecentlyViewed
│   │   ├── shop/               # FilterSidebar, MobileDrawer, SortDropdown, ActiveFilters
│   │   └── home/               # HeroBanner, CategoryGrid, NewArrivals, Lookbook, InstagramFeed
│   ├── pages/                  # 19 Fully-featured responsive routes
│   ├── styles/
│   │   └── global.css          # Tailwind base, luxury scrollbars, button variants
│   ├── App.jsx                 # Lazy route declarations & providers
│   └── main.jsx
├── tailwind.config.js          # Design system color tokens, typography & animations
├── vite.config.js
└── package.json
```

---

## 3. Brand Customization Guide

All brand parameters are consolidated in a single file:
👉 **`src/config/siteConfig.js`**

You can modify:
- **Brand Name**: `siteConfig.brand.name`
- **Tagline**: `siteConfig.brand.tagline` (Default: `BEYOND ORDINARY`)
- **Free Shipping Threshold**: `siteConfig.shipping.freeShippingThreshold` (Default: `₹1,999`)
- **Standard & Express Shipping Fees**: `siteConfig.shipping.standardShippingFee`
- **Concierge Contact**: Email, WhatsApp, Phone, Physical Atelier Address
- **Social Links**: Instagram, Facebook, Pinterest
- **Announcement Ticker**: Text alerts and promo highlights

---

## 4. Product Catalog & Adding New Items

All products are defined in:
👉 **`src/data/products.js`**

### Product Schema Structure:
```javascript
{
  id: "as-jkt-001",
  slug: "urban-oversized-denim-jacket",
  name: "Urban Oversized Denim Jacket",
  category: "jackets",
  subcategory: "Denim Jackets",
  gender: "Unisex", // 'Men' | 'Women' | 'Unisex'
  shortDescription: "Heavyweight 14.5oz rigid denim jacket...",
  description: "Detailed description of fabric, cut, and construction...",
  price: 2499, // Current selling price in INR
  originalPrice: 3499, // MSRP price
  discount: 29, // % calculated discount
  thumbnail: "https://images.unsplash.com/...",
  images: [
    "https://images.unsplash.com/photo-1...",
    "https://images.unsplash.com/photo-2...",
    "https://images.unsplash.com/photo-3..."
  ],
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  colors: [
    { name: "Washed Vintage Indigo", hex: "#4A6B82" },
    { name: "Obsidian Black", hex: "#1C1C1C" }
  ],
  rating: 4.9,
  reviewCount: 38,
  stock: "IN STOCK", // 'IN STOCK' | 'LOW STOCK' | 'OUT OF STOCK'
  stockCount: 18,
  sku: "AS-DENIM-01",
  material: "100% 14.5oz Ring-Spun Cotton Denim",
  fit: "Relaxed Oversized Fit",
  careInstructions: "Machine wash cold inside-out. Hang dry.",
  isNew: true,
  isFeatured: true,
  isBestSeller: true,
  tags: ["denim", "outerwear", "streetwear"]
}
```

---

## 5. Replacing Images

### Option A: External Cloud CDN / S3 / Cloudinary (Recommended for Production)
Replace image URLs in `src/data/products.js` and `src/data/categories.js` with your CDN URLs (Cloudinary, Cloudflare Images, AWS S3).

### Option B: Local Assets
1. Place product images in `src/assets/images/products/`.
2. Import the image in `src/data/products.js` or place in `public/images/` and reference as `/images/my-product.webp`.
3. Preferred image formats: **WebP** or **AVIF** with an aspect ratio of `3:4` (e.g. 1200×1600px).

---

## 6. How Prices & Discounts Work

- **Selling Price (`price`)**: The final price the customer pays in Indian Rupees (INR).
- **Original Price (`originalPrice`)**: The strike-through price displayed in product cards and product details.
- **Discount (`discount`)**: Automatically badge-displayed as `XX% OFF`.
- **All prices are automatically formatted** according to the Indian numbering format (e.g. `₹1,999` or `₹1,49,999`) using `src/utils/currency.js`.

---

## 7. Future Production Payment & Backend Integration

> [!WARNING]
> **CRITICAL SECURITY RULE:** Never store secret API keys (Razorpay Key Secret, Stripe Secret Key) in client-side React / Vite code.

### Recommended Payment Architecture (Razorpay for India):
1. **User clicks Place Order**: Frontend calls your backend API: `POST /api/orders/create`
2. **Backend Validation**: The server validates item prices against your database, applies authoritative coupon discounts, and calls Razorpay Orders API using your `RAZORPAY_KEY_SECRET`.
3. **Frontend Modal**: Backend returns `razorpay_order_id` and public `key_id`. The client opens the Razorpay checkout modal.
4. **Signature Verification**: Once the customer authorizes UPI/Card payment, Razorpay returns `razorpay_payment_id`, `razorpay_order_id`, and `razorpay_signature`.
5. **Backend Verification**: Client sends the payload to `POST /api/orders/verify`. The backend cryptographically validates the HMAC-SHA256 signature, commits the order to PostgreSQL/MongoDB, and fires customer confirmation emails via Resend/SendGrid.

---

## 8. High-Traffic & Scalability Architecture

To serve tens of thousands of concurrent users in high-volume drop events:
- **Stateless Frontend**: Static assets hosted on global CDNs (Cloudflare / Vercel Edge).
- **Caching Layer**: Redis / Upstash for caching catalog queries and flash-sale product stock.
- **Database & Pooling**: Supabase PostgreSQL or AWS RDS with PgBouncer connection pooling.
- **Rate Limiting**: Cloudflare WAF / Upstash Rate Limiting on checkout and search endpoints.
- **Inventory Locking**: Distributed locks using Redis (`Redlock`) during high-demand drops to prevent overselling.
- **Error Telemetry**: Sentry integrated for frontend and backend runtime monitoring.

---

## 9. Deployment

### Vercel
```bash
npm i -g vercel
vercel
```
- Framework Preset: `Vite`
- Build Command: `npm run build`
- Output Directory: `dist`

### Netlify / Cloudflare Pages
- Build Command: `npm run build`
- Publish Directory: `dist`

---

© 2026 **Ari & Styles** (*BEYOND ORDINARY*). All rights reserved.
