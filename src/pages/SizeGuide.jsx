import React, { useState, useEffect } from 'react';
import { Ruler, CheckCircle2, Info } from 'lucide-react';
import { SEO } from '../components/common/SEO';
import { Breadcrumbs } from '../components/common/Breadcrumbs';

const FULL_SIZE_CHARTS = {
  tshirts: {
    category: "Heavyweight T-Shirts & Tops",
    description: "Our signature tees feature a boxy dropped-shoulder silhouette with structured high-retention collars.",
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
    category: "Jackets & Denim Outerwear",
    description: "Outerwear is cut with generous room for layered hoodies or chunky knitwear underneath.",
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
  jeans: {
    category: "Selvedge Jeans & Cargo Trousers",
    description: "Crafted with true waist measurements. Refer to your natural waist circumference.",
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
    category: "Slip Dresses & Co-Ords",
    description: "Bias-cut fluid silks and contoured rib knits crafted to drape gracefully over natural curves.",
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

export const SizeGuide = () => {
  const [unit, setUnit] = useState('inches');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#FAF9F5] min-h-screen py-6 sm:py-10">
      <SEO
        title="Master Size Guide & Fit Specifications"
        description="Comprehensive sizing charts for Ari & Styles t-shirts, jackets, denim, trousers, and dresses."
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: 'Master Size Guide', url: '/size-guide' }]} />

        {/* Header */}
        <div className="py-8 border-b border-luxury-border flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest uppercase text-neutral-400">
              Measurement Architecture
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-luxury-black mt-1">
              MASTER SIZE GUIDE
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 mt-2">
              Accurate garment dimensions calibrated for modern streetwear and luxury tailoring.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="inline-flex items-center bg-white p-1 rounded-xs border border-luxury-border shadow-2xs self-start sm:self-auto">
            <button
              onClick={() => setUnit('inches')}
              className={`px-4 py-1.5 text-xs font-bold uppercase transition-colors rounded-xs ${
                unit === 'inches' ? 'bg-luxury-black text-white' : 'text-neutral-500 hover:text-luxury-black'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-4 py-1.5 text-xs font-bold uppercase transition-colors rounded-xs ${
                unit === 'cm' ? 'bg-luxury-black text-white' : 'text-neutral-500 hover:text-luxury-black'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Size Charts Sections */}
        <div className="py-10 space-y-12">
          {Object.entries(FULL_SIZE_CHARTS).map(([key, chart]) => {
            const rows = unit === 'inches' ? chart.inches : chart.cm;
            return (
              <div key={key} className="space-y-3">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-luxury-black">
                    {chart.category}
                  </h3>
                  <p className="text-xs text-neutral-500 mt-0.5">{chart.description}</p>
                </div>

                <div className="overflow-x-auto rounded-xs border border-luxury-border bg-white shadow-2xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FAF9F5] border-b border-luxury-border text-neutral-700 font-bold uppercase tracking-wider">
                      <tr>
                        {chart.headers.map((h, i) => (
                          <th key={i} className="p-3.5">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-luxury-border/60">
                      {rows.map((r, rIdx) => (
                        <tr key={rIdx} className="hover:bg-neutral-50/80 transition-colors">
                          {r.map((c, cIdx) => (
                            <td
                              key={cIdx}
                              className={`p-3.5 ${
                                cIdx === 0 ? 'font-bold text-luxury-black uppercase' : 'text-neutral-600'
                              }`}
                            >
                              {c}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}

          {/* Measuring Guide Card */}
          <div className="bg-white p-6 sm:p-8 rounded-xs border border-luxury-border shadow-2xs space-y-4">
            <h4 className="font-serif text-xl font-bold text-luxury-black flex items-center gap-2">
              <Ruler className="w-5 h-5 text-luxury-gold" />
              <span>How To Take Your Measurements</span>
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-neutral-600 leading-relaxed">
              <div className="space-y-2">
                <p>
                  <strong>1. Chest / Bust:</strong> Wrap the tape around the fullest part of your chest, under the armpits, keeping the measuring tape parallel to the floor.
                </p>
                <p>
                  <strong>2. Waist:</strong> Measure around your natural waistline, typically located roughly an inch above the belly button.
                </p>
              </div>
              <div className="space-y-2">
                <p>
                  <strong>3. Hips:</strong> Stand with heels together and measure around the fullest circumference of your hips.
                </p>
                <p>
                  <strong>4. Inseam:</strong> Measure from the top of your inner thigh down along the inner leg to the bottom of the ankle.
                </p>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 italic pt-2 border-t border-neutral-100">
              *All size dimensions represent default sample values and can be updated from our central sizing configuration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
