import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';
import { ProductGallery } from '../components/product/ProductGallery';
import { ProductInfo } from '../components/product/ProductInfo';
import { ProductReviews } from '../components/product/ProductReviews';
import { ProductGrid } from '../components/product/ProductGrid';
import { RecentlyViewed } from '../components/product/RecentlyViewed';
import { SizeGuideModal } from '../components/common/SizeGuideModal';
import { WriteReviewModal } from '../components/common/WriteReviewModal';
import { ProductDetailsSkeleton } from '../components/common/LoadingSkeleton';
import { productService } from '../services/productService';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { analyticsService } from '../services/analyticsService';

export const ProductDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRefreshTrigger, setReviewRefreshTrigger] = useState(0);

  const { addRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    setIsLoading(true);
    productService.getProductBySlug(slug).then((found) => {
      if (found) {
        setProduct(found);
        addRecentlyViewed(found);
        analyticsService.productView(found);
        
        // Fetch related products
        productService.getRelatedProducts(found.id, found.category, 4).then((rel) => {
          setRelatedProducts(rel);
        });
      } else {
        setProduct(null);
      }
      setIsLoading(false);
    });

    window.scrollTo(0, 0);
  }, [slug, addRecentlyViewed]);

  if (isLoading) {
    return <ProductDetailsSkeleton />;
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center bg-[#FAF9F5]">
        <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
          Catalog Notice
        </span>
        <h2 className="font-serif text-3xl font-bold text-luxury-black mt-1 mb-2">
          Piece Not Found
        </h2>
        <p className="text-xs text-neutral-500 mb-6 max-w-sm">
          The requested garment might have been archived or is temporarily out of season.
        </p>
        <Link to="/shop" className="btn-luxury text-xs">
          Explore Current Drops
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      {/* SEO & Structured Data */}
      <SEO
        title={product.name}
        description={product.shortDescription || product.description}
        ogImage={product.thumbnail}
        productSchema={product}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Hierarchy */}
        <Breadcrumbs
          items={[
            { label: 'Shop', url: '/shop' },
            {
              label: product.category.charAt(0).toUpperCase() + product.category.slice(1),
              url: `/category/${product.category}`,
            },
            { label: product.name, url: `/product/${product.slug}` },
          ]}
        />

        {/* Main 2-Column Product Detail Layout (Desktop: Gallery Left, Info Right; Mobile: Stacked) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 py-8">
          {/* Left: Gallery (7 cols on large desktop) */}
          <div className="lg:col-span-7">
            <ProductGallery
              images={product.images}
              productName={product.name}
            />
          </div>

          {/* Right: Product Info & CTAs (5 cols on large desktop) */}
          <div className="lg:col-span-5">
            <ProductInfo
              product={product}
              onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
              onOpenReviewModal={() => setIsReviewModalOpen(true)}
            />
          </div>
        </div>

        {/* Customer Reviews Section */}
        <ProductReviews
          product={product}
          onOpenReviewModal={() => setIsReviewModalOpen(true)}
          refreshTrigger={reviewRefreshTrigger}
        />

        {/* You May Also Like / Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="py-14 border-t border-luxury-border">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-luxury-border">
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
                  Curated Pairings
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black mt-1">
                  YOU MAY ALSO LIKE
                </h3>
              </div>
              <Link
                to={`/category/${product.category}`}
                className="text-xs font-bold uppercase tracking-widest text-neutral-600 hover:text-luxury-black"
              >
                View Category
              </Link>
            </div>

            <ProductGrid products={relatedProducts} columns={4} />
          </section>
        )}

        {/* Recently Viewed Products */}
        <RecentlyViewed currentProductId={product.id} />
      </div>

      {/* Interactive Modals */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
        defaultCategory={product.category}
      />

      <WriteReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        product={product}
        onReviewSubmitted={() => setReviewRefreshTrigger((t) => t + 1)}
      />
    </div>
  );
};

export default ProductDetails;
