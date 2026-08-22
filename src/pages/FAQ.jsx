import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Search } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';

const FAQS_DATA = [
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "How long does shipping take across India?",
        a: "All domestic orders are processed and dispatched from our Gurugram atelier within 24–48 business hours. Standard delivery takes 3–5 business days for major metropolitan areas (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Kolkata, Chennai) and 4–7 business days for rest of India. Express shipping (1–2 days) is also available at checkout.",
      },
      {
        q: "Do you offer Cash on Delivery (COD)?",
        a: "Yes, Cash on Delivery is available across 19,000+ Indian PIN codes. You can pay in cash or via instant UPI QR code directly to the delivery executive upon package arrival.",
      },
      {
        q: "Do you ship across all states in India?",
        a: "Yes, Ari & Styles ships to all 28 states and 8 union territories across India via our trusted logistics partners (BlueDart, Delhivery, and DTDC).",
      },
      {
        q: "What is the threshold for free shipping?",
        a: `We offer complimentary express shipping on all domestic orders exceeding ₹${siteConfig.shipping.freeShippingThreshold.toLocaleString('en-IN')}. For orders below this threshold, a flat nominal fee of ₹${siteConfig.shipping.standardShippingFee} applies.`,
      },
    ],
  },
  {
    category: "Returns & Exchanges",
    items: [
      {
        q: "What is your return policy?",
        a: "We offer a 30-day hassle-free return and exchange window from the date of delivery. Items must be unworn, unwashed, and in their original packaging with all security tags intact.",
      },
      {
        q: "How do I initiate a return or exchange?",
        a: "You can initiate a return directly from your Account Dashboard under 'Order History', or by emailing concierge@ariandstyles.com with your Order ID. We arrange complimentary doorstep pickup for all returns.",
      },
      {
        q: "How long do refunds take to reflect in my bank account?",
        a: "Once the returned piece passes our quality inspection at our atelier (usually within 24 hours of receipt), refunds are processed instantly for UPI/Cards (reflecting in 2–4 business days). For COD orders, we transfer directly to your provided bank account or UPI VPA.",
      },
    ],
  },
  {
    category: "Sizing & Garment Care",
    items: [
      {
        q: "How do I choose my size accurately?",
        a: "Each product page contains detailed garment measurements in both inches and centimeters under the 'Size Guide' button. Most of our modern streetwear pieces feature a relaxed boxy fit. If you prefer a tailored look, we recommend sizing down.",
      },
      {
        q: "How should I wash and care for heavyweight cotton tees and denim?",
        a: "We recommend washing all heavyweight cotton tees and denim inside-out in cold water on a gentle cycle. Always hang dry in the shade to preserve fabric density and prevent shrinking.",
      },
    ],
  },
  {
    category: "Orders, Payments & Coupons",
    items: [
      {
        q: "How can I track my live order?",
        a: "Upon dispatch, you will receive an SMS and email containing your live tracking AWB link. You can also view live tracking updates anytime in your Account Dashboard.",
      },
      {
        q: "Can I modify or cancel an order after placing it?",
        a: "Orders can be modified or cancelled within 2 hours of placement before entering our atelier fulfillment stream. Please contact our client concierge team immediately via WhatsApp or phone.",
      },
      {
        q: "How do I apply a promotional coupon code?",
        a: "You can enter your promotional code (such as ARI10 or WELCOME15) in the coupon input field in your Shopping Bag or Cart Drawer and click 'Apply'. The discount will be reflected immediately in your total.",
      },
    ],
  },
];

export const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleItem = (categoryIndex, itemIndex) => {
    const key = `${categoryIndex}-${itemIndex}`;
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredFaqs = FAQS_DATA.map((group) => {
    const matched = group.items.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...group, items: matched };
  }).filter((group) => group.items.length > 0);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about shipping, returns, sizing, and payments at Ari & Styles."
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'FAQs', url: '/faq' }]} />

        {/* Page Header */}
        <div className="py-8 border-b border-luxury-border text-center">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Help & Guidance
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            FREQUENTLY ASKED QUESTIONS
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-lg mx-auto">
            Everything you need to know about our craftsmanship, delivery timelines across India, and return policies.
          </p>

          {/* Search Box */}
          <div className="relative mt-6 max-w-md mx-auto">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. shipping, COD, sizing)..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black shadow-2xs"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="py-10 space-y-10">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xs border border-luxury-border p-6">
              <p className="text-xs text-neutral-500">No questions found matching "{searchQuery}".</p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 text-xs font-bold text-luxury-black underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            filteredFaqs.map((group, gIdx) => (
              <div key={gIdx} className="space-y-4">
                <h3 className="font-serif text-xl font-bold text-luxury-black border-b border-luxury-border pb-2">
                  {group.category}
                </h3>

                <div className="space-y-3">
                  {group.items.map((item, iIdx) => {
                    const key = `${gIdx}-${iIdx}`;
                    const isOpen = Boolean(openItems[key]);
                    return (
                      <div
                        key={iIdx}
                        className="bg-white rounded-xs border border-luxury-border shadow-2xs overflow-hidden transition-colors"
                      >
                        <button
                          onClick={() => toggleItem(gIdx, iIdx)}
                          className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-luxury-black hover:text-neutral-700"
                        >
                          <span>{item.q}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-neutral-400 transition-transform duration-200 flex-shrink-0 ml-3 ${
                              isOpen ? 'rotate-180 text-luxury-black' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-4 sm:px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed border-t border-neutral-100 bg-[#FAF9F5]/40 animate-fade-in">
                            {item.a}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
