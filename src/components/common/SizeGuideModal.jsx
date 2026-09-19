import React from 'react';
import { X, Ruler } from 'lucide-react';

export const SizeGuideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-4xl bg-[#FAF9F5] rounded-xs shadow-2xl border border-luxury-border p-5 sm:p-8 z-10 animate-scale-in my-auto max-h-[95vh] overflow-y-auto">

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-luxury-border">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-luxury-black" />

            <h3 className="font-serif text-xl font-bold text-luxury-black">
              Official Size Guide
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-500 hover:text-luxury-black rounded-full hover:bg-neutral-100"
            aria-label="Close size guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* New Size Guide Image */}
        <div className="mt-6 flex justify-center">
          <img
            src="/Images/size-guide.jpeg"
            alt="Ari & Styles Size Guide"
            className="w-full max-w-3xl h-auto object-contain rounded-sm"
          />
        </div>

        {/* Note */}
        <p className="mt-5 text-xs sm:text-sm text-neutral-500 text-center italic">
          Please note that measurements may vary slightly due to different body
          types and style preferences.
        </p>

      </div>
    </div>
  );
};

export default SizeGuideModal;