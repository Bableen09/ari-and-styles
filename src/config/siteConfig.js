/**
 * Ari & Styles Central Brand & Site Configuration
 * Edit brand information, shipping thresholds, contact info, and features from this single source.
 */

export const siteConfig = {
  brand: {
    name: "Ari & Styles",
    legalName: "Ari & Styles Lifestyle Pvt. Ltd.",
    tagline: "BEYOND ORDINARY",
    established: 2024,
    description: "Modern essentials designed for those who go beyond ordinary. Premium Indian fashion crafted with precision and purpose.",
    url: "https://ariandstyles.com",
    logoText: "ARI & STYLES",
    monogram: "A&S",
  },
  
  currency: {
    symbol: "₹",
    code: "INR",
    locale: "en-IN",
  },

  shipping: {
    freeShippingThreshold: 1999, // ₹1,999
    standardShippingFee: 149,
    expressShippingFee: 299,
    estimatedStandardDays: "3–5 Business Days",
    estimatedExpressDays: "1–2 Business Days",
    codAvailable: true,
    codFee: 49,
  },

  tax: {
    ratePercent: 12, // 12% GST standard
    taxIncludedInPrice: true,
    label: "Includes all taxes",
  },

  contact: {
    email: "concierge@ariandstyles.com",
    supportEmail: "support@ariandstyles.com",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    hours: "Monday – Saturday: 10:00 AM – 7:00 PM IST",
    address: {
      line1: "The Design Atelier, Plot 42",
      line2: "Sector 29, DLF Phase 4",
      city: "Gurugram",
      state: "Haryana",
      pincode: "122002",
      country: "India",
    },
  },

  social: {
    instagram: "https://instagram.com/ariandstyles",
    facebook: "https://facebook.com/ariandstyles",
    pinterest: "https://pinterest.com/ariandstyles",
    twitter: "https://twitter.com/ariandstyles",
  },

  announcements: [
    {
      id: "free-shipping",
      text: "COMPLIMENTARY SHIPPING ACROSS INDIA ON ORDERS ABOVE ₹1,999",
      link: "/shop",
    },
    {
      id: "new-drop",
      text: "THE MONOCHROME EDIT — DISCOVER NEW ARRIVALS",
      link: "/shop?sort=newest",
    },
    {
      id: "coupon",
      text: "USE CODE 'ARI10' FOR 10% OFF YOUR FIRST ORDER",
      link: "/shop",
    }
  ],

  footer: {
    copyright: `© ${new Date().getFullYear()} Ari & Styles. All rights reserved.`,
    madeIn: "Crafted with passion in India",
  }
};

export default siteConfig;
