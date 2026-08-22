import React, { useState, useEffect } from 'react';
import { Mail, Phone, Clock, MapPin, Send, CheckCircle2, MessageSquare, Instagram } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { siteConfig } from '../config/siteConfig';
import { validateContactForm } from '../utils/validation';
import { useToast } from '../hooks/useToast';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showError('Please correct the highlighted errors in the form.');
      return;
    }

    setIsSending(true);
    // Simulate sending message to concierge API
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSending(false);
    setIsSubmitted(true);
    showSuccess('Thank you! Your message has been routed to our concierge team.');
  };

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Client Concierge & Contact"
        description="Contact Ari & Styles customer concierge for sizing advice, order tracking, and bespoke inquiries."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Client Concierge', url: '/contact' }]} />

        {/* Header */}
        <div className="py-8 border-b border-luxury-border">
          <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
            Assistance & Inquiries
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
            CLIENT CONCIERGE
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 max-w-xl">
            Our styling specialists and order concierge are available to assist with sizing, custom orders, returns, and delivery logistics.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-12">
          {/* Left: Contact Information Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-xs border border-luxury-border shadow-2xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-luxury-black pb-3 border-b border-neutral-100">
                Direct Channels
              </h3>

              <div className="space-y-4 text-xs">
                {/* Email */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-50 rounded-xs text-luxury-black border border-brand-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-luxury-black uppercase tracking-wider">Email Concierge</h5>
                    <a
                      href={`mailto:${siteConfig.contact.email}`}
                      className="text-neutral-600 hover:text-luxury-black underline block mt-0.5"
                    >
                      {siteConfig.contact.email}
                    </a>
                    <span className="text-[10px] text-neutral-400">Responses within 4–6 business hours</span>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-50 rounded-xs text-luxury-black border border-brand-200">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-luxury-black uppercase tracking-wider">Phone & WhatsApp Support</h5>
                    <a
                      href={`tel:${siteConfig.contact.phone}`}
                      className="text-neutral-600 hover:text-luxury-black block mt-0.5 font-medium"
                    >
                      {siteConfig.contact.phone}
                    </a>
                    <span className="text-[10px] text-neutral-400">Direct WhatsApp support available</span>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-50 rounded-xs text-luxury-black border border-brand-200">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-luxury-black uppercase tracking-wider">Concierge Hours</h5>
                    <p className="text-neutral-600 mt-0.5">{siteConfig.contact.hours}</p>
                    <span className="text-[10px] text-neutral-400">Indian Standard Time (IST)</span>
                  </div>
                </div>

                {/* Physical Atelier */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-brand-50 rounded-xs text-luxury-black border border-brand-200">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-luxury-black uppercase tracking-wider">Design Atelier & Office</h5>
                    <p className="text-neutral-600 mt-0.5 leading-relaxed">
                      {siteConfig.contact.address.line1}, {siteConfig.contact.address.line2}<br />
                      {siteConfig.contact.address.city}, {siteConfig.contact.address.state} — {siteConfig.contact.address.pincode}, India
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Connect:
                </span>
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 rounded-xs text-xs font-semibold text-luxury-black hover:bg-luxury-black hover:text-white transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs">
              <h3 className="font-serif text-xl font-bold text-luxury-black mb-1">
                Send Us A Message
              </h3>
              <p className="text-xs text-neutral-500 mb-6">
                Fill in the details below and our team will get back to you promptly.
              </p>

              {isSubmitted ? (
                <div className="p-8 bg-brand-50 rounded-xs border border-brand-200 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 className="w-10 h-10 text-emerald-700 mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-luxury-black">Message Dispatched</h4>
                  <p className="text-xs text-neutral-600 max-w-sm mx-auto leading-relaxed">
                    Thank you, <strong>{formData.name}</strong>. Your query regarding "{formData.subject}" has been received by our concierge.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                    }}
                    className="btn-luxury text-xs py-2.5 px-6 mt-3"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Arjun Singhania"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          errors.name ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                      {errors.name && <p className="text-[11px] text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="arjun@example.com"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          errors.email ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                      {errors.email && <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 bg-[#FAF9F5] border border-luxury-border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Sizing advice / Order query"
                        className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                          errors.subject ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                        }`}
                      />
                      {errors.subject && <p className="text-[11px] text-red-600 mt-1">{errors.subject}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-luxury-black mb-1">
                      Message *
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please provide details regarding your inquiry..."
                      className={`w-full px-3.5 py-2.5 bg-[#FAF9F5] border rounded-xs text-xs text-luxury-black focus:outline-hidden focus:border-luxury-black ${
                        errors.message ? 'border-red-500 bg-red-50/20' : 'border-luxury-border'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <button
                    type="submit"
                    disabled={isSending}
                    className="w-full btn-luxury py-3.5 text-xs flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSending ? 'Sending Message...' : 'Submit Inquiry'}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
