import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn } from 'lucide-react';

export const ProductGallery = ({ images = [], productName = 'Product' }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });

  const galleryImages = images.length > 0 ? images : ['https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80'];

  // Handle ESC for fullscreen
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
      if (e.key === 'ArrowRight' && isFullscreen) {
        handleNext();
      }
      if (e.key === 'ArrowLeft' && isFullscreen) {
        handlePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFullscreen, galleryImages.length]);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails (Vertical on desktop, horizontal on mobile) */}
      {galleryImages.length > 1 && (
        <div className="flex lg:flex-col gap-2.5 overflow-x-auto lg:overflow-y-auto no-scrollbar lg:w-20 flex-shrink-0">
          {galleryImages.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-[3/4] w-16 lg:w-full rounded-xs overflow-hidden border-2 transition-all flex-shrink-0 bg-neutral-100 ${
                activeIndex === idx
                  ? 'border-luxury-black shadow-xs'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}

      {/* Main Image Stage */}
      <div className="relative flex-1 aspect-[3/4] bg-neutral-100 rounded-xs overflow-hidden border border-luxury-border select-none group">
        <div
          className="w-full h-full cursor-crosshair overflow-hidden"
          onMouseEnter={() => setIsZoomed(true)}
          onMouseLeave={() => setIsZoomed(false)}
          onMouseMove={handleMouseMove}
          onClick={() => setIsFullscreen(true)}
        >
          <img
            src={galleryImages[activeIndex]}
            alt={`${productName} - View ${activeIndex + 1}`}
            className={`w-full h-full object-cover transition-transform duration-200 ${
              isZoomed ? 'scale-150 origin-[var(--zoom-x)_var(--zoom-y)]' : 'scale-100'
            }`}
            style={{
              '--zoom-x': `${zoomPos.x}%`,
              '--zoom-y': `${zoomPos.y}%`,
            }}
          />
        </div>

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-xs uppercase tracking-widest pointer-events-none">
          {activeIndex + 1} / {galleryImages.length}
        </div>

        {/* Fullscreen Trigger */}
        <button
          onClick={() => setIsFullscreen(true)}
          aria-label="View fullscreen image"
          className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-xs rounded-full text-neutral-700 hover:text-luxury-black hover:bg-white shadow-xs transition-all opacity-0 group-hover:opacity-100"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Next / Prev Navigation Buttons */}
        {galleryImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-xs rounded-full text-neutral-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-xs rounded-full text-neutral-800 hover:bg-white shadow-md transition-all opacity-0 group-hover:opacity-100 hover:scale-105"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 select-none animate-fade-in">
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            aria-label="Close fullscreen gallery"
            className="absolute top-6 right-6 p-2.5 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-full transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Lightbox Main Image */}
          <div className="relative max-w-5xl max-h-[90vh] flex items-center justify-center">
            <img
              src={galleryImages[activeIndex]}
              alt={`${productName} fullscreen`}
              className="max-h-[85vh] max-w-full object-contain rounded-xs shadow-2xl"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 text-xs font-bold rounded-xs tracking-widest">
              {activeIndex + 1} OF {galleryImages.length}
            </div>
          </div>

          {/* Fullscreen Navigation */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                aria-label="Previous image"
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-full transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next image"
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-neutral-800/80 hover:bg-neutral-700 text-white rounded-full transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
