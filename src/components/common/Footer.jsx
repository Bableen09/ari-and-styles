import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, ArrowRight, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { newsletterService } from '../../services/newsletterService';
import { validateEmail } from '../../utils/validation';
import { useToast } from '../../hooks/useToast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { showSuccess, showError } = useToast();

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)) {
      showError('Please enter a valid email address.');
      return;
    }

    setIsSubscribing(true);
    try {
      const res = await newsletterService.subscribe(email);
      setIsSubscribed(true);
      showSuccess(res.message);
      setEmail('');
    } catch (err) {
      showError('Subscription failed. Please try again.');
    } finally {
      setIsSubscribing(false);
    }
  };

  return (
    <footer className="bg-luxury-black text-[#FAF9F5] pt-16 pb-12 border-t border-neutral-800">
      {/* Brand Value Propositions Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xs text-luxury-gold flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-white">
                Complimentary Express Shipping
              </h4>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                Free domestic shipping on all orders exceeding ₹1,999 across all Indian PIN codes.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xs text-luxury-gold flex-shrink-0">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-white">
                30-Day Effortless Returns
              </h4>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                Hassle-free doorstep exchanges and returns with prompt refunds.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xs text-luxury-gold flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-xs uppercase tracking-widest text-white">
                Authentic Indian Craftsmanship
              </h4>
              <p className="text-neutral-400 text-xs mt-1 leading-relaxed">
                Heavyweight organic cottons, Japanese selvedge denim & French flax linen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Story Column */}
          <div className="lg:col-span-2 space-y-4">
            <div>
              <span className="font-serif text-2xl font-bold tracking-widest text-white block">
                {siteConfig.brand.name}
              </span>
              <span className="text-[9px] font-sans font-semibold tracking-ultra uppercase text-neutral-400 mt-0.5 block">
                {siteConfig.brand.tagline}
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Modern essentials crafted for those who embrace intentional minimalism, architectural silhouettes, and enduring quality.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h5 className="text-[11px] font-bold tracking-widest uppercase text-white mb-1.5">
                Join The Ari & Styles Community
              </h5>
              <p className="text-[11px] text-neutral-400 mb-3">
                Receive private access to archival drops, private sales, and styling editorials.
              </p>

              {isSubscribed ? (
                <div className="p-3 bg-neutral-900 border border-emerald-800/60 rounded-xs flex items-center gap-2 text-xs text-emerald-400">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>You're now part of the Ari & Styles community.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address..."
                    className="flex-1 px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-xs text-white placeholder:text-neutral-500 focus:outline-hidden focus:border-white rounded-l-xs"
                  />
                  <button
                    type="submit"
                    disabled={isSubscribing}
                    className="px-4 py-2.5 bg-white text-luxury-black text-[11px] font-bold uppercase tracking-widest hover:bg-neutral-200 transition-colors rounded-r-xs flex items-center gap-1 flex-shrink-0"
                  >
                    <span>{isSubscribing ? '...' : 'Subscribe'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 1: Shop */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white">
              Shop
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/shop?sort=newest" className="hover:text-white transition-colors">
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=men" className="hover:text-white transition-colors">
                  Men's Edit
                </Link>
              </li>
              <li>
                <Link to="/shop?gender=women" className="hover:text-white transition-colors">
                  Women's Edit
                </Link>
              </li>
              <li>
                <Link to="/category/jackets" className="hover:text-white transition-colors">
                  Jackets & Outerwear
                </Link>
              </li>
              <li>
                <Link to="/category/t-shirts" className="hover:text-white transition-colors">
                  Heavyweight T-Shirts
                </Link>
              </li>
              <li>
                <Link to="/category/accessories" className="hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Help & Client Concierge */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  Contact Concierge
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="hover:text-white transition-colors">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-white transition-colors">
                  30-Day Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="hover:text-white transition-colors">
                  Master Size Guide
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-white transition-colors">
                  Order Tracking
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Brand & Social */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold tracking-widest uppercase text-white">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">
                  Our Story & Philosophy
                </Link>
              </li>
              <li>
                <Link to="/about#craftsmanship" className="hover:text-white transition-colors">
                  Fabric & Craftsmanship
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  Terms & Conditions
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <h5 className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 mb-2">
                Follow @AriAndStyles
              </h5>
              <div className="flex items-center space-x-3 text-neutral-400">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Instagram"
                  className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-full hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href={siteConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow us on Facebook"
                  className="p-1.5 bg-neutral-900 border border-neutral-800 rounded-full hover:text-white hover:border-neutral-600 transition-colors"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Copyright & Payment Icons */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-neutral-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
        <div>
          {siteConfig.footer.copyright} • {siteConfig.footer.madeIn}
        </div>

        {/* Payment Badges */}
        <div className="flex items-center gap-2 flex-wrap justify-center">
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400 font-semibold tracking-wider">
            UPI / GPay / PhonePe
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400 font-semibold tracking-wider">
            Visa / Mastercard / RuPay
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400 font-semibold tracking-wider">
            NetBanking
          </span>
          <span className="px-2 py-0.5 bg-neutral-900 border border-neutral-800 rounded text-[10px] text-neutral-400 font-semibold tracking-wider">
            Cash On Delivery (COD)
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
