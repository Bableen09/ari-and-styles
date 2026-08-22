import React, { useState } from 'react';
import { X, Ruler, CheckCircle2 } from 'lucide-react';

const SIZE_CHARTS = {
  tops: {
    title: "T-Shirts, Tops & Hoodies",
    headers: ["Size", "Chest (in/cm)", "Length (in/cm)", "Shoulder (in/cm)", "Sleeve (in/cm)"],
    inches: [
      ["XS", "36 - 38", "27.0", "18.5", "8.5"],
      ["S", "38 - 40", "28.0", "19.5", "9.0"],
      ["M", "40 - 42", "29.0", "20.5", "9.5"],
      ["L", "42 - 44", "30.0", "21.5", "10.0"],
      ["XL", "44 - 46", "31.0", "22.5", "10.5"],
      ["XXL", "46 - 48", "32.0", "23.5", "11.0"],
    ],
    cm: [
      ["XS", "91 - 96", "68.5", "47.0", "21.5"],
      ["S", "96 - 101", "71.0", "49.5", "23.0"],
      ["M", "101 - 106", "73.5", "52.0", "24.0"],
      ["L", "106 - 111", "76.0", "54.5", "25.5"],
      ["XL", "111 - 117", "78.5", "57.0", "26.5"],
      ["XXL", "117 - 122", "81.0", "59.5", "28.0"],
    ]
  },
  jackets: {
    title: "Jackets, Outerwear & Blazers",
    headers: ["Size", "Chest (in/cm)", "Length (in/cm)", "Shoulder (in/cm)", "Sleeve (in/cm)"],
    inches: [
      ["XS", "38 - 40", "25.5", "19.0", "24.5"],
      ["S", "40 - 42", "26.5", "20.0", "25.0"],
      ["M", "42 - 44", "27.5", "21.0", "25.5"],
      ["L", "44 - 46", "28.5", "22.0", "26.0"],
      ["XL", "46 - 48", "29.5", "23.0", "26.5"],
      ["XXL", "48 - 50", "30.5", "24.0", "27.0"],
    ],
    cm: [
      ["XS", "96 - 101", "65.0", "48.0", "62.0"],
      ["S", "101 - 106", "67.5", "51.0", "63.5"],
      ["M", "106 - 111", "70.0", "53.5", "65.0"],
      ["L", "111 - 117", "72.5", "56.0", "66.0"],
      ["XL", "117 - 122", "75.0", "58.5", "67.5"],
      ["XXL", "122 - 127", "77.5", "61.0", "68.5"],
    ]
  },
  bottoms: {
    title: "Jeans, Cargo Pants & Trousers",
    headers: ["Size (Waist)", "Waist (in/cm)", "Hip (in/cm)", "Inseam (in/cm)", "Thigh (in/cm)"],
    inches: [
      ["28", "29.0", "38.0", "30.5", "23.5"],
      ["30", "31.0", "40.0", "31.0", "24.5"],
      ["32", "33.0", "42.0", "31.5", "25.5"],
      ["34", "35.0", "44.0", "32.0", "26.5"],
      ["36", "37.0", "46.0", "32.5", "27.5"],
      ["38", "39.0", "48.0", "33.0", "28.5"],
    ],
    cm: [
      ["28", "73.5", "96.5", "77.5", "59.5"],
      ["30", "78.5", "101.5", "78.5", "62.0"],
      ["32", "84.0", "106.5", "80.0", "64.5"],
      ["34", "89.0", "111.5", "81.0", "67.0"],
      ["36", "94.0", "116.5", "82.5", "70.0"],
      ["38", "99.0", "122.0", "84.0", "72.5"],
    ]
  },
  dresses: {
    title: "Dresses & Slip Silhouettes",
    headers: ["Size", "Bust (in/cm)", "Waist (in/cm)", "Hip (in/cm)", "Total Length (in/cm)"],
    inches: [
      ["XS", "32 - 34", "25 - 26", "35 - 36", "52.0"],
      ["S", "34 - 36", "27 - 28", "37 - 38", "53.0"],
      ["M", "36 - 38", "29 - 30", "39 - 40", "54.0"],
      ["L", "38 - 40", "31 - 32", "41 - 42", "55.0"],
      ["XL", "40 - 42", "33 - 35", "43 - 45", "56.0"],
    ],
    cm: [
      ["XS", "81 - 86", "63 - 66", "89 - 91", "132.0"],
      ["S", "86 - 91", "68 - 71", "94 - 96", "134.5"],
      ["M", "91 - 96", "73 - 76", "99 - 101", "137.0"],
      ["L", "96 - 101", "78 - 81", "104 - 106", "139.5"],
      ["XL", "101 - 106", "84 - 89", "109 - 114", "142.0"],
    ]
  }
};

export const SizeGuideModal = ({ isOpen, onClose, defaultCategory = 'tops' }) => {
  const [unit, setUnit] = useState('inches'); // 'inches' | 'cm'
  const [activeTab, setActiveTab] = useState(
    defaultCategory === 'jackets' ? 'jackets' :
    defaultCategory === 'jeans' || defaultCategory === 'pants' ? 'bottoms' :
    defaultCategory === 'dresses' ? 'dresses' : 'tops'
  );

  if (!isOpen) return null;

  const currentChart = SIZE_CHARTS[activeTab] || SIZE_CHARTS.tops;
  const rows = unit === 'inches' ? currentChart.inches : currentChart.cm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs animate-fade-in" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#FAF9F5] rounded-xs shadow-2xl border border-luxury-border p-6 sm:p-8 z-10 animate-scale-in my-auto">
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

        {/* Category Tabs & Unit Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4 pb-2">
          {/* Tabs */}
          <div className="flex flex-wrap gap-1 bg-white p-1 rounded-xs border border-luxury-border">
            {Object.entries(SIZE_CHARTS).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors ${
                  activeTab === key
                    ? 'bg-luxury-black text-white'
                    : 'text-neutral-600 hover:text-luxury-black'
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Unit Toggle */}
          <div className="inline-flex items-center bg-white p-1 rounded-xs border border-luxury-border self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
                unit === 'inches' ? 'bg-neutral-200 text-luxury-black' : 'text-neutral-500'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-bold uppercase transition-colors ${
                unit === 'cm' ? 'bg-neutral-200 text-luxury-black' : 'text-neutral-500'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Table */}
        <div className="mt-4 overflow-x-auto rounded-xs border border-luxury-border bg-white">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F5] border-b border-luxury-border text-neutral-600 font-bold uppercase tracking-wider">
              <tr>
                {currentChart.headers.map((header, idx) => (
                  <th key={idx} className="p-3 text-neutral-800">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-luxury-border/60">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-neutral-50/80 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td
                      key={cIdx}
                      className={`p-3 ${
                        cIdx === 0 ? 'font-bold text-luxury-black uppercase' : 'text-neutral-600'
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measurement Tips */}
        <div className="mt-5 p-4 bg-brand-50 rounded-xs border border-brand-200/80 text-xs text-neutral-600 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-luxury-black uppercase tracking-wider text-[11px]">
            <CheckCircle2 className="w-4 h-4 text-luxury-gold" />
            <span>How To Measure Correctly</span>
          </div>
          <p>
            <strong>Chest / Bust:</strong> Measure around the fullest part of your chest, keeping the tape measure horizontal.
          </p>
          <p>
            <strong>Waist:</strong> Measure around your natural waistline, allowing a comfortable breath.
          </p>
          <p className="text-[11px] text-neutral-500 italic pt-1">
            *All dimensions represent sample measurements and can be calibrated according to customer specifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SizeGuideModal;
