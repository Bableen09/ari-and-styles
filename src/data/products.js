/**
 * Ari & Styles Master Product Catalog
 * Comprehensive luxury fashion catalog with complete specifications, multi-angle images, reviews, and stock levels.
 */

export const products = [
  {
    id: "as-jkt-001",
    slug: "urban-oversized-denim-jacket",
    name: "Urban Oversized Denim Jacket",
    category: "jackets",
    subcategory: "Denim Jackets",
    gender: "Unisex",
    shortDescription: "Heavyweight 14.5oz rigid denim jacket featuring drop-shoulder geometry, custom matte gunmetal hardware, and clean double-needle seam finishes.",
    description: "The Urban Oversized Denim Jacket represents the cornerstone of modern casual luxury. Meticulously constructed from 14.5oz heavy-duty 100% ring-spun cotton denim, it undergoes a proprietary enzyme wash process that confers authentic vintage softness while preserving structural durability. Designed with dropped shoulders, exaggerated chest flap pockets, and clean welt side pockets for an unmistakable contemporary silhouette.",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    thumbnail: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Vintage Indigo", hex: "#4A6B82" },
      { name: "Obsidian Black", hex: "#1C1C1C" },
      { name: "Raw Ecru", hex: "#EAE6DF" }
    ],
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        id: "rev-1",
        author: "Aarav Mehta",
        rating: 5,
        date: "14 Feb 2026",
        title: "Exceptional weight and drape",
        comment: "The denim quality is on par with premium designer labels. Boxy fit is exact, sleeves are perfect length. Wore it across Delhi winter and got countless compliments.",
        verified: true
      },
      {
        id: "rev-2",
        author: "Rohan V.",
        rating: 5,
        date: "02 Feb 2026",
        title: "Worth every rupee",
        comment: "The hardware is heavy and matte. Feels durable like it will last 10 years.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 18,
    sku: "AS-DENIM-01",
    material: "100% 14.5oz Ring-Spun Cotton Denim",
    fit: "Relaxed Oversized Fit (Size down for regular fit)",
    careInstructions: "Machine wash cold inside-out with like colors. Line dry in shade. Do not tumble dry or bleach.",
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["denim", "outerwear", "oversized", "streetwear", "layering", "jacket"]
  },
  {
    id: "as-tee-002",
    slug: "essential-black-t-shirt",
    name: "Essential Black T-Shirt",
    category: "t-shirts",
    subcategory: "Crewneck Tees",
    gender: "Unisex",
    shortDescription: "260 GSM combed compact organic cotton tee with a high-retention ribbed collar and relaxed boxy cut.",
    description: "Engineered to solve the eternal hunt for the perfect black t-shirt. Cut from ultra-dense 260 GSM long-staple organic cotton, this t-shirt maintains its jet-black saturation and crisp silhouette wash after wash. Features a reinforced 1.25-inch ribbed collar that never sags, blind-stitched hems, and pre-shrunk fabric treatment.",
    price: 999,
    originalPrice: 1499,
    discount: 33,
    thumbnail: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Obsidian Black", hex: "#0F0F0F" },
      { name: "Pristine White", hex: "#FFFFFF" },
      { name: "Charcoal Heather", hex: "#383838" }
    ],
    rating: 4.8,
    reviewCount: 94,
    reviews: [
      {
        id: "rev-3",
        author: "Devansh S.",
        rating: 5,
        date: "18 Jan 2026",
        title: "Best tee in India hands down",
        comment: "The 260 GSM fabric has serious substance. Collar stays stiff after 8 washes. Absolutely zero shrinkage.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 45,
    sku: "AS-TEE-02",
    material: "100% Combed Compact Organic Cotton (260 GSM)",
    fit: "Boxy Modern Cut",
    careInstructions: "Machine wash cold. Warm iron on reverse. Do not dry clean.",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ["tshirt", "basics", "heavyweight", "essential", "cotton", "black"]
  },
  {
    id: "as-sht-003",
    slug: "classic-relaxed-shirt",
    name: "Classic Relaxed Shirt",
    category: "shirts",
    subcategory: "Casual Shirts",
    gender: "Men",
    shortDescription: "Tailored from pure French flax linen with a camp collar, mother-of-pearl buttons, and breezy relaxed silhouette.",
    description: "An homage to timeless Mediterranean leisure crafted for Indian climates. Made from 100% sustainable European flax linen, this shirt softens luxuriously with wear. Tailored with a convertible camp collar, genuine mother-of-pearl buttons, and a gently curved hem designed to look effortless both tucked and untucked.",
    price: 1799,
    originalPrice: 2499,
    discount: 28,
    thumbnail: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1603252109303-2751441ec157?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Oatmeal Sand", hex: "#D8D0C5" },
      { name: "Sage Olive", hex: "#7A8471" },
      { name: "Crisp Chalk", hex: "#F5F5F0" }
    ],
    rating: 4.7,
    reviewCount: 22,
    reviews: [
      {
        id: "rev-4",
        author: "Karan Johar P.",
        rating: 5,
        date: "05 Feb 2026",
        title: "Breathable and chic",
        comment: "Wore this in Goa humidity and stayed crisp. The linen drape is supreme.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 14,
    sku: "AS-SHT-03",
    material: "100% Pure Flax Linen (Pre-Washed)",
    fit: "Relaxed Resort Fit",
    careInstructions: "Hand wash or gentle cold cycle. Line dry damp. Light steam press.",
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ["linen", "shirt", "resort", "relaxed", "summer", "minimalist"]
  },
  {
    id: "as-pnt-004",
    slug: "everyday-cargo-pants",
    name: "Everyday Cargo Pants",
    category: "pants",
    subcategory: "Cargo Pants",
    gender: "Unisex",
    shortDescription: "Utilitarian technical cotton cargo trousers with articulated knees, deep gusseted pockets, and adjustable hem toggles.",
    description: "Built for purposeful daily mobility. Cut from heavy-duty ripstop cotton with 2% elastane for comfortable 4-way stretch. Features ergonomic knee articulation darts, low-profile magnetic cargo flap pockets, and concealed bungee hem adjusters allowing an effortless transition between wide-leg and tapered joggers.",
    price: 1999,
    originalPrice: 2899,
    discount: 31,
    thumbnail: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Field Khaki", hex: "#8E8770" },
      { name: "Stealth Black", hex: "#1A1A1A" },
      { name: "Slate Grey", hex: "#5C6166" }
    ],
    rating: 4.8,
    reviewCount: 31,
    reviews: [
      {
        id: "rev-5",
        author: "Vicky K.",
        rating: 5,
        date: "28 Jan 2026",
        title: "Incredible utility and fit",
        comment: "The toggle feature at the ankle is genius. Pockets hold iPhone Pro Max with zero pocket bulge.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 22,
    sku: "AS-PNT-04",
    material: "98% Cotton Ripstop, 2% Spandex",
    fit: "Straight Relaxed with Bungee Taper Option",
    careInstructions: "Machine wash cold. Tumble dry low. Do not iron cargo hardware.",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ["cargo", "pants", "streetwear", "tactical", "utility", "trousers"]
  },
  {
    id: "as-hdy-005",
    slug: "minimal-oversized-hoodie",
    name: "Minimal Oversized Hoodie",
    category: "hoodies",
    subcategory: "Pullover Hoodies",
    gender: "Unisex",
    shortDescription: "450 GSM luxury French terry cotton hoodie featuring a crossover seamless double-layered hood without drawstrings.",
    description: "Constructed for ultimate comfort with uncompromising architectural form. Spun from 450 GSM ultra-heavyweight combed French terry, this hoodie eliminates traditional drawstring clutter in favor of a clean crossover neck collar. Ribbed side gussets provide natural flex, and the dense brushed inner lining offers cloud-soft insulation.",
    price: 2299,
    originalPrice: 3299,
    discount: 30,
    thumbnail: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Washed Clay", hex: "#9E8279" },
      { name: "Pitch Black", hex: "#111111" },
      { name: "Raw Melange", hex: "#C7C4BF" }
    ],
    rating: 4.9,
    reviewCount: 46,
    reviews: [
      {
        id: "rev-6",
        author: "Meera Sen",
        rating: 5,
        date: "20 Jan 2026",
        title: "Substantial 450 GSM weight",
        comment: "Finally a brand in India making real heavyweight hoodies. The hood stands up structured and doesn't flop flat.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 16,
    sku: "AS-HDY-05",
    material: "100% Combed French Terry Cotton (450 GSM)",
    fit: "Oversized Silhouette with Dropped Shoulders",
    careInstructions: "Machine wash cold gentle. Reshape and flat dry. Do not tumble dry.",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ["hoodie", "streetwear", "heavyweight", "fleece", "cozy", "sweatshirt"]
  },
  {
    id: "as-jen-006",
    slug: "premium-straight-jeans",
    name: "Premium Straight Jeans",
    category: "jeans",
    subcategory: "Straight Leg Denim",
    gender: "Men",
    shortDescription: "13.5oz authentic red-line selvedge denim woven on vintage shuttle looms, finished with antique copper rivets.",
    description: "True denim purism engineered for longevity. Crafted from authentic 13.5oz red selvedge ID denim with a classic mid-rise and straight leg geometry that drapes cleanly over boots and sneakers. Custom debossed leather patch on the waistband and hidden selvedge coin pocket detail.",
    price: 2499,
    originalPrice: 3699,
    discount: 32,
    thumbnail: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: [
      { name: "Raw Deep Indigo", hex: "#1C2B42" },
      { name: "Vintage Mid Blue", hex: "#526F8A" },
      { name: "Faded Stone Grey", hex: "#4A4D52" }
    ],
    rating: 4.8,
    reviewCount: 29,
    reviews: [
      {
        id: "rev-7",
        author: "Ishaan Trivedi",
        rating: 5,
        date: "09 Feb 2026",
        title: "Selvedge denim perfection",
        comment: "Cuffing these reveals that crisp red selvedge line. The break-in after 2 weeks is sublime.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 19,
    sku: "AS-JEN-06",
    material: "100% Selvedge Cotton Denim (13.5oz)",
    fit: "Classic Straight Leg, Mid-Rise",
    careInstructions: "Wash infrequently. Cold hand wash inside-out. Hang to air dry.",
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    tags: ["jeans", "denim", "selvedge", "straight-fit", "pants", "classic"]
  },
  {
    id: "as-jkt-007",
    slug: "essential-womens-jacket",
    name: "Essential Women's Cropped Jacket",
    category: "jackets",
    subcategory: "Cropped Outerwear",
    gender: "Women",
    shortDescription: "Architectural cropped worker jacket in structured cotton twill with notched lapels and horn buttons.",
    description: "Designed for high-impact minimalist layering. Features an accentuated boxy cropped silhouette hitting right at the natural waist, wide structured sleeves, and tonal matte horn buttons. Pair effortlessly over high-waisted trousers or slip dresses.",
    price: 2199,
    originalPrice: 2999,
    discount: 27,
    thumbnail: "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Desert Sand", hex: "#C7B89E" },
      { name: "Olive Khaki", hex: "#636952" },
      { name: "Midnight Black", hex: "#141414" }
    ],
    rating: 4.9,
    reviewCount: 25,
    reviews: [
      {
        id: "rev-8",
        author: "Ananya Roy",
        rating: 5,
        date: "01 Feb 2026",
        title: "Flattering cropped cut",
        comment: "The cut on this jacket makes legs look so long. The fabric holds shape impeccably.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 11,
    sku: "AS-JKT-07",
    material: "100% Heavy Cotton Cavalry Twill",
    fit: "Boxy Cropped Silhouette",
    careInstructions: "Dry clean recommended or cold hand wash. Flat dry.",
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["jacket", "cropped", "womens", "minimalist", "outerwear", "twill"]
  },
  {
    id: "as-top-008",
    slug: "classic-ribbed-top",
    name: "Classic Ribbed Top",
    category: "t-shirts",
    subcategory: "Ribbed Tops",
    gender: "Women",
    shortDescription: "Form-fitting wide rib knit long sleeve top crafted from breathable micro-modal and Egyptian cotton blend.",
    description: "An everyday luxury foundation piece. Spun from an ultra-soft modal and Egyptian cotton 2x2 rib knit that contours the body with gentle compression without ever feeling restrictive. Features an elegant square-scoop neckline and elongated sleeves.",
    price: 899,
    originalPrice: 1299,
    discount: 31,
    thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Cream White", hex: "#F7F5EE" },
      { name: "Cocoa Brown", hex: "#5C4638" },
      { name: "Jet Black", hex: "#121212" }
    ],
    rating: 4.7,
    reviewCount: 19,
    reviews: [
      {
        id: "rev-9",
        author: "Kavya S.",
        rating: 5,
        date: "11 Feb 2026",
        title: "Silky soft and non-sheer",
        comment: "Even the white is totally opaque. The rib texture elevates it above standard basics.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 30,
    sku: "AS-TOP-08",
    material: "50% Micro Modal, 45% Egyptian Cotton, 5% Spandex",
    fit: "Fitted Contouring Silhouette",
    careInstructions: "Machine wash cold in laundry bag. Dry flat.",
    isNew: false,
    isFeatured: true,
    isBestSeller: false,
    tags: ["top", "ribbed", "modal", "womens", "basics", "longsleeve"]
  },
  {
    id: "as-blz-009",
    slug: "structured-linen-blazer",
    name: "Structured Linen Blazer",
    category: "jackets",
    subcategory: "Blazers",
    gender: "Unisex",
    shortDescription: "Double-breasted unstructured blazer crafted from heavyweight Irish linen with peak lapels.",
    description: "The epitome of modern understated tailoring. Tailored with a softly defined shoulder and relaxed double-breasted stance. Breathable unlined interior with silk-bound internal seams allows graceful drape in tropical and warm weather.",
    price: 2999,
    originalPrice: 4299,
    discount: 30,
    thumbnail: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["38 (S)", "40 (M)", "42 (L)", "44 (XL)"],
    colors: [
      { name: "Natural Flax", hex: "#D4C8B8" },
      { name: "Midnight Navy", hex: "#1A2238" },
      { name: "Smoky Charcoal", hex: "#2E2F33" }
    ],
    rating: 4.9,
    reviewCount: 16,
    reviews: [
      {
        id: "rev-10",
        author: "Aditya S.",
        rating: 5,
        date: "22 Jan 2026",
        title: "Masterclass in modern tailoring",
        comment: "Fits like an Armani unstructured jacket. Pure luxury at an accessible Indian price point.",
        verified: true
      }
    ],
    stock: "LOW STOCK",
    stockCount: 5,
    sku: "AS-BLZ-09",
    material: "100% Pure Heavyweight Linen",
    fit: "Relaxed Tailored Double-Breasted",
    careInstructions: "Specialist dry clean only. Steam press as needed.",
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ["blazer", "linen", "tailoring", "luxury", "outerwear", "formal"]
  },
  {
    id: "as-drs-010",
    slug: "silk-blend-slip-dress",
    name: "Silk Blend Slip Dress",
    category: "dresses",
    subcategory: "Maxi Dresses",
    gender: "Women",
    shortDescription: "Bias-cut silk blend maxi slip dress with subtle cowl neckline and adjustable criss-cross back straps.",
    description: "Flowing with fluid elegance, this maxi slip dress is cut on the true bias to drape seamlessly over curves. Woven from a lustrous heavyweight mulberry silk-viscose blend with low wrinkle tendency. Features French internal seams and side slit for effortless movement.",
    price: 2499,
    originalPrice: 3499,
    discount: 29,
    thumbnail: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Champagne Gold", hex: "#D6C4A5" },
      { name: "Liquid Black", hex: "#111111" },
      { name: "Emerald Forest", hex: "#1D3B2C" }
    ],
    rating: 4.8,
    reviewCount: 27,
    reviews: [
      {
        id: "rev-11",
        author: "Pooja Hegde M.",
        rating: 5,
        date: "03 Feb 2026",
        title: "Breathtaking drape",
        comment: "Wore this for an art gallery gala. Received so many compliments. Fabric feels liquid soft.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 12,
    sku: "AS-DRS-10",
    material: "70% Viscose, 30% Mulberry Silk",
    fit: "Bias-Cut Fluid Maxi Drape",
    careInstructions: "Dry clean or delicate silk wash in cold water with mild detergent.",
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["dress", "silk", "slip-dress", "evening", "maxi", "womens"]
  },
  {
    id: "as-trs-011",
    slug: "tailored-pleated-trousers",
    name: "Tailored Pleated Trousers",
    category: "pants",
    subcategory: "Tailored Trousers",
    gender: "Unisex",
    shortDescription: "High-waisted double-pleated wide-leg trousers crafted from tropical virgin wool blend with side tab adjusters.",
    description: "Modern sartorial elegance reimagined for daily wear. Double forward pleats provide dramatic volume through the thigh while tapering gently toward the hem. Featuring traditional brass side waist cinches that eliminate the need for a belt, and lined to the knee for superior comfort.",
    price: 2199,
    originalPrice: 3199,
    discount: 31,
    thumbnail: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Espresso Brown", hex: "#3A2A20" },
      { name: "Stone Taupe", hex: "#9E9689" },
      { name: "Raven Black", hex: "#151515" }
    ],
    rating: 4.9,
    reviewCount: 34,
    reviews: [
      {
        id: "rev-12",
        author: "Rahul Varma",
        rating: 5,
        date: "06 Feb 2026",
        title: "Best pleated trousers in my wardrobe",
        comment: "Side adjusters are high quality metal. The drape when walking is poetic.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 15,
    sku: "AS-TRS-11",
    material: "60% Virgin Wool, 38% Polyester, 2% Lycra",
    fit: "High-Rise Wide Leg with Forward Pleats",
    careInstructions: "Dry clean only. Cool iron with pressing cloth.",
    isNew: false,
    isFeatured: true,
    isBestSeller: true,
    tags: ["trousers", "pleated", "tailored", "wide-leg", "wool", "pants"]
  },
  {
    id: "as-tee-012",
    slug: "oversized-graphic-tee",
    name: "Beyond Ordinary Heavyweight Graphic Tee",
    category: "t-shirts",
    subcategory: "Graphic Tees",
    gender: "Unisex",
    shortDescription: "280 GSM heavyweight organic cotton tee with high-density puff screenprinted typographic archival artwork.",
    description: "A statement tribute to our ethos: BEYOND ORDINARY. Crafted from ultra-dense 280 GSM combed cotton with high-density puff print detailing on the back and a subtle minimalist chest monogram. Finished with dropped shoulders and a thick 32mm mock-rib collar.",
    price: 1299,
    originalPrice: 1799,
    discount: 28,
    thumbnail: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Vintage Chalk", hex: "#F3F1EC" },
      { name: "Washed Carbon", hex: "#282828" },
      { name: "Moss Green", hex: "#414838" }
    ],
    rating: 4.8,
    reviewCount: 42,
    reviews: [
      {
        id: "rev-13",
        author: "Zayan Khan",
        rating: 5,
        date: "16 Feb 2026",
        title: "Artistic and premium",
        comment: "The puff print has tactile depth. Doesn't crack or peel. Cut is wonderfully boxy.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 28,
    sku: "AS-TEE-12",
    material: "100% Organic Heavyweight Cotton (280 GSM)",
    fit: "Oversized Streetwear Silhouette",
    careInstructions: "Machine wash cold inside-out. Do not iron directly on print. Hang dry.",
    isNew: true,
    isFeatured: true,
    isBestSeller: true,
    tags: ["graphic-tee", "streetwear", "heavyweight", "beyond-ordinary", "tshirt", "oversized"]
  },
  {
    id: "as-acc-013",
    slug: "minimalist-leather-crossbody-bag",
    name: "Architectural Leather Crossbody Bag",
    category: "accessories",
    subcategory: "Bags",
    gender: "Unisex",
    shortDescription: "Handcrafted full-grain vegetable-tanned leather crossbody with magnetic snap closure and adjustable webbing strap.",
    description: "Structured minimalism for the urban nomad. Hand-stitched in Kanpur using premium full-grain vegetable-tanned leather that develops a rich caramel patina over time. Fits phone, keys, wallet, passport, and daily essentials in a sleek slim profile.",
    price: 1899,
    originalPrice: 2699,
    discount: 30,
    thumbnail: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["One Size"],
    colors: [
      { name: "Cognac Tan", hex: "#9E5B32" },
      { name: "Noir Black", hex: "#111111" }
    ],
    rating: 4.9,
    reviewCount: 21,
    reviews: [
      {
        id: "rev-14",
        author: "Tanvi Kapoor",
        rating: 5,
        date: "04 Feb 2026",
        title: "Leather quality is exceptional",
        comment: "Smells like authentic leather, beautiful burnished edges. Sleek and holds everything.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 14,
    sku: "AS-ACC-13",
    material: "100% Full-Grain Vegetable-Tanned Leather, Solid Brass Hardware",
    fit: "Adjustable 42cm–62cm Drop",
    careInstructions: "Condition with natural leather balm every 6 months. Keep dry.",
    isNew: true,
    isFeatured: false,
    isBestSeller: true,
    tags: ["leather", "bag", "crossbody", "accessories", "handcrafted"]
  },
  {
    id: "as-acc-014",
    slug: "signature-embroidered-cotton-cap",
    name: "Signature Embroidered Cotton Cap",
    category: "accessories",
    subcategory: "Headwear",
    gender: "Unisex",
    shortDescription: "Low-profile 6-panel unstructured dad cap in washed cotton twill with tonal monogram embroidery.",
    description: "An effortless daily accent. Crafted from 100% heavy washed cotton twill with subtle tonal Ari & Styles monogram embroidery on the crown and custom antique brass buckle closure at the rear.",
    price: 799,
    originalPrice: 1199,
    discount: 33,
    thumbnail: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
    images: [
      "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1000&q=80",
      "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=80"
    ],
    sizes: ["One Size (Adjustable)"],
    colors: [
      { name: "Washed Black", hex: "#222222" },
      { name: "Vintage Khaki", hex: "#B8A995" },
      { name: "Forest Green", hex: "#2D3B2E" }
    ],
    rating: 4.7,
    reviewCount: 15,
    reviews: [
      {
        id: "rev-15",
        author: "Pranav M.",
        rating: 5,
        date: "12 Feb 2026",
        title: "Clean unstructured fit",
        comment: "Doesn't look stiff or boxy. Perfect low profile cap.",
        verified: true
      }
    ],
    stock: "IN STOCK",
    stockCount: 35,
    sku: "AS-ACC-14",
    material: "100% Washed Cotton Twill",
    fit: "Low-Profile 6-Panel Adjustable",
    careInstructions: "Spot clean with damp cloth. Do not machine wash.",
    isNew: false,
    isFeatured: false,
    isBestSeller: false,
    tags: ["cap", "headwear", "hat", "accessories", "streetwear"]
  },
  {
    id: "as-top-001",
    slug: "Cute-layered-tank-top",
    name: "Cute Layered Tank Top",
    category: "tops",
    subcategory: "Tank Tops",
    gender: "Women",
    shortDescription: "A cute layered pink tank top designed for a stylish and comfortable everyday look.",
    description: "A cute pink layered tank top with a stylish silhouette, perfect for casual everyday outfits and easy layering.",
    price: 450,
    originalPrice: 690,
    discount: 35,
    thumbnail: "/products/pink-top.jpeg",
    images: [
     "/products/pink-top.jpeg"
    ],
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Pink", hex: "#FFC0CB" }
    ],
    rating: 0,
    reviewCount: 0,
    reviews: [],
    stock: "IN STOCK",
    stockCount: 20,
    sku: "AS-TOP-001",
    material: "Please update",
    fit: "Please update",
    careInstructions: "Please update",
    isNew: true,
    isFeatured: true,
    isBestSeller: false,
    tags: ["top", "tank-top", "pink", "layered", "women"]
  }
];

export default products;
