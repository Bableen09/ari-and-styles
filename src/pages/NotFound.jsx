import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Compass } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { siteConfig } from '../config/siteConfig';

export const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-[75vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 text-center">
      <SEO
        title="404 — Page Not Found"
        description="The page you are looking for does not exist on Ari & Styles."
      />

      <div className="max-w-md w-full space-y-6">
        <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
          <Compass className="w-8 h-8" />
        </div>

        <span className="font-serif text-7xl sm:text-8xl font-bold text-luxury-black tracking-tight block">
          404
        </span>

        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black">
            THIS PAGE DOESN'T EXIST
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 mt-2 leading-relaxed">
            Looks like this piece went out of style or the URL has been updated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link
            to="/shop"
            className="btn-luxury py-3.5 px-8 text-xs inline-flex items-center justify-center gap-2"
          >
            <span>Back to Shop</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to="/"
            className="btn-luxury-outline py-3.5 px-8 text-xs inline-flex items-center justify-center"
          >
            Return Home
          </Link>
        </div>

        <div className="pt-8 text-[11px] text-neutral-400">
          {siteConfig.brand.name} • {siteConfig.brand.tagline}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
