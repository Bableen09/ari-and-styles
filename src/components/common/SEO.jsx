import { useEffect } from 'react';
import { siteConfig } from '../../config/siteConfig';

/**
 * Lightweight SEO manager that updates document head metadata and structured data
 */
export const SEO = ({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = 'website',
  productSchema,
}) => {
  useEffect(() => {
    // 1. Title
    const fullTitle = title
      ? `${title} | ${siteConfig.brand.name} — ${siteConfig.brand.tagline}`
      : `${siteConfig.brand.name} | ${siteConfig.brand.tagline} — Modern Indian Fashion`;
    document.title = fullTitle;

    // 2. Meta description
    const metaDesc = description || siteConfig.brand.description;
    let descTag = document.querySelector('meta[name="description"]');
    if (!descTag) {
      descTag = document.createElement('meta');
      descTag.setAttribute('name', 'description');
      document.head.appendChild(descTag);
    }
    descTag.setAttribute('content', metaDesc);

    // 3. Open Graph Tags
    const updateOrCreateMeta = (property, content) => {
      let tag = document.querySelector(`meta[property="${property}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute('property', property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    updateOrCreateMeta('og:title', fullTitle);
    updateOrCreateMeta('og:description', metaDesc);
    updateOrCreateMeta('og:type', ogType);
    updateOrCreateMeta('og:site_name', siteConfig.brand.name);
    if (canonicalUrl) updateOrCreateMeta('og:url', canonicalUrl);
    if (ogImage) updateOrCreateMeta('og:image', ogImage);

    // 4. JSON-LD Structured Data Schema for Products
    let schemaScript = document.getElementById('json-ld-schema');
    if (productSchema) {
      if (!schemaScript) {
        schemaScript = document.createElement('script');
        schemaScript.id = 'json-ld-schema';
        schemaScript.type = 'application/ld+json';
        document.head.appendChild(schemaScript);
      }

      const schema = {
        '@context': 'https://schema.org/',
        '@type': 'Product',
        name: productSchema.name,
        image: productSchema.images || [productSchema.thumbnail],
        description: productSchema.description,
        sku: productSchema.sku,
        brand: {
          '@type': 'Brand',
          name: siteConfig.brand.name,
        },
        offers: {
          '@type': 'Offer',
          url: window.location.href,
          priceCurrency: 'INR',
          price: productSchema.price,
          availability:
            productSchema.stock === 'OUT OF STOCK'
              ? 'https://schema.org/OutOfStock'
              : 'https://schema.org/InStock',
        },
        aggregateRating: productSchema.rating
          ? {
              '@type': 'AggregateRating',
              ratingValue: productSchema.rating,
              reviewCount: productSchema.reviewCount || 1,
            }
          : undefined,
      };

      schemaScript.textContent = JSON.stringify(schema);
    } else if (schemaScript) {
      schemaScript.remove();
    }

    return () => {
      // Clean up dynamic schema if unmounting
      const scriptToRemove = document.getElementById('json-ld-schema');
      if (scriptToRemove) scriptToRemove.remove();
    };
  }, [title, description, canonicalUrl, ogImage, ogType, productSchema]);

  return null;
};

export default SEO;
