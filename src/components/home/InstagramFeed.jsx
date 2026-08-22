import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

const FEED_IMAGES = [
  {
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    tag: "@ariandstyles #BeyondOrdinary",
  },
  {
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
    tag: "@siddharth_m #MonochromeEdit",
  },
  {
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    tag: "@ananyaroy #AriInsider",
  },
  {
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
    tag: "@karan_street #HeavyweightCotton",
  },
  {
    image: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=600&q=80",
    tag: "@pooja_hegde #LayeringEssentials",
  },
  {
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80",
    tag: "@devanshk #SelvedgeDenim",
  },
];

export const InstagramFeed = () => {
  return (
    <section className="py-16 sm:py-24 bg-white border-t border-luxury-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center justify-center p-2 rounded-full bg-neutral-100 text-luxury-black mb-3">
            <Instagram className="w-5 h-5" />
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black">
            AS SEEN ON YOU
          </h2>
          <p className="text-xs text-neutral-500 mt-1">
            Tag <strong className="text-luxury-black">@AriAndStyles</strong> and use <strong className="text-luxury-black">#BeyondOrdinary</strong> to be featured on our digital atelier.
          </p>
        </div>

        {/* 6 Grid items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {FEED_IMAGES.map((item, idx) => (
            <a
              key={idx}
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-xs overflow-hidden bg-neutral-100 block"
            >
              <img
                src={item.image}
                alt="Ari & Styles Community"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-2 text-white text-center">
                <Instagram className="w-5 h-5 mb-1" />
                <span className="text-[9px] font-semibold tracking-wider truncate max-w-full">
                  {item.tag}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-8">
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-luxury-black hover:text-luxury-gold transition-colors"
          >
            <span>Follow Our Visual Journal</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
