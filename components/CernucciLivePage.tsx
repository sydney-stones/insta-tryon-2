/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Cernucci LIVE try-on pages — sent to Cernucci contacts post-meeting.
 * Uses the same VirtualTryOnModal + generateDirectVirtualTryOn (Gemini) flow
 * as the existing male/female live demos. Cernucci branded product page shell.
 */

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WardrobeItem } from '../types';
import VirtualTryOnModal from './VirtualTryOnModal';
import { getAllTryOnResults, TryOnHistoryEntry } from '../lib/tryOnLimit';

// ─── Product Data ─────────────────────────────────────────────────────────────

const BASE = '/result-images/Cernucci2';

interface CernucciProduct {
  wardrobeItem: WardrobeItem;
  price: string;
  originalPrice?: string;
  discount?: string;
  colour: string;
  sizes: string[];
  defaultSize: string;
  // For matching sets: label and sizes for the second item
  sizes2?: string[];
  defaultSize2?: string;
  sizesLabel?: string;
  sizes2Label?: string;
  metal?: string;
  description: string;
  // All gallery images (first is sent to AI as garment)
  gallerySrcs: string[];
}

export const CERNUCCI_LIVE_PRODUCTS: Record<string, CernucciProduct> = {
  'gold-chain': {
    wardrobeItem: {
      id: 'cernucci-live-gold-chain',
      name: 'Micro Iced Cross Necklace - 15mm - Gold',
      url: `${BASE}/goldchain/AU-MCRICRSNK-GM-1_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£89.99',
    colour: 'Gold',
    sizes: ['18"', '20"', '22"', '24"', '26"'],
    defaultSize: '20"',
    gallerySrcs: [
      `${BASE}/goldchain/AU-MCRICRSNK-GM-1_1200x1800.webp`,
      `${BASE}/goldchain/AU-MCRICRSNK-GM-1_1_1200x1800.jpg`,
      `${BASE}/goldchain/AU-MCRICRSNK-GM-2_1200x1800.webp`,
      `${BASE}/goldchain/AU-MCRICRSNK-GM_1200x1800.jpg`,
    ],
    metal: 'Brass · 18k Gold Plated · Tarnish Resistant',
    description: 'The Micro Iced Cross Necklace - 15mm in Gold — a sleek, flexible chain with encrusted cubic zirconia stones running the full length. Maximum sparkle, Cernucci\'s signature precision finish.',
  },
  'mens-tracksuit': {
    wardrobeItem: {
      id: 'cernucci-live-mens-tracksuit',
      name: 'Octagon Tracksuit — Dark Heather',
      url: `${BASE}/menstracksuit/SH-OCTJK73DHM-SH-OCTJOG74DHM-3_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£129.99',
    colour: 'Dark Heather',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    defaultSize: 'M',
    gallerySrcs: [
      `${BASE}/menstracksuit/SH-OCTJK73DHM-SH-OCTJOG74DHM-3_1200x1800.webp`,
      `${BASE}/menstracksuit/SH-OCTJK73DHM-SH-OCTJOG74DHM-10_1200x1800.webp`,
      `${BASE}/menstracksuit/SH-OCTJK73DHM-SH-OCTJOG74DHM-19_1200x1800.webp`,
    ],
    description: 'The Octagon Tracksuit in Dark Heather — Cernucci\'s signature athletic silhouette in heavyweight fleece. Zip-through jacket and tapered jogger with tonal embroidered logo detail.',
  },
  'pendant': {
    wardrobeItem: {
      id: 'cernucci-live-pendant',
      name: 'Iced Out Pendant — White Gold',
      url: `${BASE}/pendant/ch-jannec03-w-wg-1_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£89.99',
    colour: 'White Gold',
    sizes: ['One Size'],
    defaultSize: 'One Size',
    gallerySrcs: [
      `${BASE}/pendant/ch-jannec03-w-wg-1_1200x1800.webp`,
      `${BASE}/pendant/ch-jannec03-w-wg-1_1_1200x1800.webp`,
      `${BASE}/pendant/ch-jannec03-w-wg-_1_1200x1800.webp`,
      `${BASE}/pendant/ch-jannec03-w-wg_1200x1800.webp`,
    ],
    metal: 'Brass · Rhodium Plated · High Quality Cut Cubic Zirconia',
    description: 'An iced out pendant encrusted with premium cubic zirconia stones for maximum sparkle. Worn on a matching chain or layered — a statement piece from Cernucci\'s jewellery collection.',
  },
  'stud-earring': {
    wardrobeItem: {
      id: 'cernucci-live-stud-earring',
      name: 'Iced Out Round Stud Earring — White Gold',
      url: `${BASE}/studearing/NB-ICRNDMCSTD-WGM-COMP_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£29.99',
    colour: 'White Gold',
    sizes: ['One Size'],
    defaultSize: 'One Size',
    gallerySrcs: [
      `${BASE}/studearing/NB-ICRNDMCSTD-WGM-COMP_1200x1800.webp`,
      `${BASE}/studearing/NB-ICRNDMCSTD-WGM_a2cd77ac-3eb0-4ec8-b1b4-80b6a82b6287_1200x1800.jpg`,
    ],
    metal: 'Brass · Rhodium Plated · CZ Stones',
    description: 'The Iced Out Round Stud Earring is encrusted with premium cubic zirconia for maximum sparkle. Lightweight and comfortable all day — these studs add instant edge to any look.',
  },
  'womens-casual': {
    wardrobeItem: {
      id: 'cernucci-live-womens-casual',
      name: 'Womens Navy Casual Set',
      url: `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-1c_84d5396e-5b68-4e1e-83a4-30ccabf65cef_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£99.99',
    colour: 'Navy',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'S',
    sizesLabel: 'Top Size',
    sizes2: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize2: 'S',
    sizes2Label: 'Tracksuit Bottoms Size',
    gallerySrcs: [
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-1c_84d5396e-5b68-4e1e-83a4-30ccabf65cef_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-2c_58adc2f5-49c7-45ac-ba3d-2cf6d70020de_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-4c_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-7c_1200x1800.webp`,
    ],
    description: 'The Womens Navy Casual Set — a relaxed crop top and co-ordinating jogger in soft navy. Effortless off-duty style with Cernucci\'s signature fit and premium fabric feel.',
  },
  'womens-yellow': {
    wardrobeItem: {
      id: 'cernucci-live-womens-yellow',
      name: 'Womens Bright Yellow Crop Set',
      url: `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY-1_85f50bc3-c1de-440b-9b49-97d99c7d194b_1200x1800.webp`,
      folder: 'Cernucci',
    },
    price: '£99.99',
    colour: 'Bright Yellow',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'S',
    sizesLabel: 'Tracksuit Top Size',
    sizes2: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize2: 'S',
    sizes2Label: 'Shorts Size',
    gallerySrcs: [
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY-1_85f50bc3-c1de-440b-9b49-97d99c7d194b_1200x1800.webp`,
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY-16_35da85ee-6a24-4922-9bf9-56571bb167d6_1200x1800.webp`,
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY_d87861a2-8d90-4ec5-a340-c3a8d989c224_1200x1800.webp`,
    ],
    description: 'The Womens Bright Yellow Crop Set — a bold, head-turning combination of cropped jacket and co-ordinating shorts in vibrant yellow. Statement colour, Cernucci\'s relaxed athletic fit.',
  },
};

// ─── Custom Prompt ────────────────────────────────────────────────────────────

const CUSTOM_PROMPT = `Generate a photorealistic fashion photograph of the person in the customer photos wearing the product from the product images. Where a product image shows the product being worn by a model, use that shot as the direct compositional reference — match its framing, crop, and camera distance exactly. Dress the person in every item shown across the product images, reproducing colours, textures, patterns, logos, and construction exactly. Completely replace all clothing and footwear from the customer photos with the product. Add complementary footwear if none is shown in the product images. For jewellery like earrings, necklaces, bracelets frame the shot as a close up headshot with clothing showing the item being tried on as the main focus of the image

Preserve this person's face, skin tone, hair, body shape, and natural expression exactly as they appear — do not idealise, alter, or add a smile.

The pose should feel natural and confident, as a fashion model would stand. Light grey seamless studio backdrop, soft directional studio lighting, 85mm portrait lens, 9:16 aspect ratio. Indistinguishable from a professional e-commerce shoot.`;

// ─── Page Component ───────────────────────────────────────────────────────────

interface CernucciLivePageProps {
  productSlug: keyof typeof CERNUCCI_LIVE_PRODUCTS;
}

const CernucciLivePage: React.FC<CernucciLivePageProps> = ({ productSlug }) => {
  const p = CERNUCCI_LIVE_PRODUCTS[productSlug];
  const product = p.wardrobeItem;

  const [selectedSize, setSelectedSize] = useState(p.defaultSize);
  const [selectedSize2, setSelectedSize2] = useState(p.defaultSize2 ?? '');
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const [tryOnResult, setTryOnResult] = useState<string | null>(null);
  const [myLooksOpen, setMyLooksOpen] = useState(false);
  const [myLooks, setMyLooks] = useState<TryOnHistoryEntry[]>([]);

  const handleTryOnResult = (imageUrl: string) => {
    setTryOnResult(imageUrl);
    setFullscreenImage(imageUrl);
  };

  const openMyLooks = () => {
    setMyLooks(getAllTryOnResults());
    setMyLooksOpen(true);
  };

  // Gallery is always just the product shots — result is never added
  const galleryImages = useMemo(() => [...p.gallerySrcs], [p.gallerySrcs]);

  useEffect(() => {
    setActiveGalleryIndex(0);
    setSelectedSize(p.defaultSize);
    setSelectedSize2(p.defaultSize2 ?? '');
  }, [productSlug, p.defaultSize, p.defaultSize2]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50)
      setActiveGalleryIndex(prev => prev === galleryImages.length - 1 ? 0 : prev + 1);
    if (touchEndX.current - touchStartX.current > 50)
      setActiveGalleryIndex(prev => prev === 0 ? galleryImages.length - 1 : prev - 1);
  };

  const mainImageSrc = galleryImages[activeGalleryIndex];

  return (
    <div className="min-h-screen bg-white overflow-auto">

      {/* ── Header ── */}
      <header style={{ borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60px' }}>
          <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', color: '#111' }}>CERNUCCI</span>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '12px 24px' }}>
        <nav style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '12px', color: '#999' }}>
          <span>Home</span><span>/</span>
          <span>All Products</span><span>/</span>
          <span style={{ color: '#111' }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Product Layout ── */}
      {isMobile ? (
        /* ── MOBILE: single column — title → image → everything else ── */
        <div style={{ padding: '0 0 64px' }}>
          {/* Product title */}
          <div style={{ padding: '0 20px 12px' }}>
            <h1 style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', margin: 0 }}>
              {product.name.toUpperCase()}
            </h1>
          </div>

          {/* Product image carousel — full bleed, directly below title */}
          <div style={{ position: 'relative', backgroundColor: '#f5f5f5', width: '100%', aspectRatio: '3/4' }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={mainImageSrc}
                src={mainImageSrc}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            {/* Dot indicators overlaid on image */}
            {galleryImages.length > 1 && (
              <div style={{ position: 'absolute', bottom: '10px', left: 0, right: 0, display: 'flex', gap: '6px', justifyContent: 'center' }}>
                {galleryImages.map((_, i) => (
                  <button key={i} onClick={() => setActiveGalleryIndex(i)} style={{
                    width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                    backgroundColor: activeGalleryIndex === i ? '#fff' : 'rgba(255,255,255,0.5)',
                  }} />
                ))}
              </div>
            )}
          </div>

          {/* Stars, price, colour, sizes — below image */}
          <div style={{ padding: '16px 20px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill={i <= 4 ? '#111' : 'none'} stroke="#111" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span style={{ fontSize: '11px', color: '#666' }}>317 REVIEWS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ fontSize: '12px', color: '#666' }}>NOW</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{p.price}</span>
              {p.originalPrice && (
                <>
                  <span style={{ fontSize: '12px', color: '#999' }}>WAS</span>
                  <span style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>{p.originalPrice}</span>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: '#16a34a' }}>| {p.discount}</span>
                </>
              )}
            </div>
            <p style={{ fontSize: '13px', color: '#111', margin: '0 0 12px 0' }}>Colour: <strong>{p.colour}</strong></p>

            {/* Size 1 */}
            {p.sizes.length > 1 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <p style={{ fontSize: '13px', color: '#111', margin: 0 }}>{p.sizesLabel ?? 'Size'}: <strong>{selectedSize}</strong></p>
                  <span style={{ fontSize: '11px', color: '#666', textDecoration: 'underline' }}>Size Guide</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{
                      padding: '7px 12px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                      border: selectedSize === s ? '2px solid #111' : '1px solid #ccc',
                      backgroundColor: selectedSize === s ? '#111' : '#fff',
                      color: selectedSize === s ? '#fff' : '#111',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}

            {/* Size 2 — matching sets */}
            {p.sizes2 && p.sizes2.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <p style={{ fontSize: '13px', color: '#111', margin: 0 }}>{p.sizes2Label}: <strong>{selectedSize2}</strong></p>
                  <span style={{ fontSize: '11px', color: '#666', textDecoration: 'underline' }}>Size Guide</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.sizes2.map(s => (
                    <button key={s} onClick={() => setSelectedSize2(s)} style={{
                      padding: '7px 12px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                      border: selectedSize2 === s ? '2px solid #111' : '1px solid #ccc',
                      backgroundColor: selectedSize2 === s ? '#111' : '#fff',
                      color: selectedSize2 === s ? '#fff' : '#111',
                    }}>{s}</button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* CTA section */}
          <div style={{ padding: '0 20px 0' }}>
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                width: '100%', padding: '16px', fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                backgroundColor: '#1B3A2D', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                marginBottom: '8px', boxShadow: '0 0 20px rgba(27,58,45,0.35)',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              {tryOnResult ? 'TRY ON AGAIN' : 'AI TRY ON'}
              <span style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.4)', padding: '1px 8px', letterSpacing: '0.1em' }}>New</span>
            </button>
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', margin: '0 0 12px 0' }}>Upload your photo and see yourself in this item</p>
            <button style={{
              width: '100%', padding: '16px', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
              backgroundColor: '#111', border: 'none', cursor: 'default', marginBottom: '12px',
            }}>ADD TO CART</button>
            <a
              href="https://calendly.com/mail-renderedfits/15-minute-meeting"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', width: '100%', padding: '14px', fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B3A2D',
                backgroundColor: '#fff', border: '1px solid #1B3A2D', textAlign: 'center',
                textDecoration: 'none', marginBottom: '20px', boxSizing: 'border-box',
              }}
            >Schedule a Meeting with Rendered Fits</a>
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#111' }}>ABOUT</p>
              <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.7', margin: 0 }}>{p.description}</p>
              {p.metal && <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}><strong>Metal:</strong> {p.metal}</p>}
            </div>
          </div>
        </div>
      ) : (
        /* ── DESKTOP: two-column grid ── */
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 64px', display: 'grid', gridTemplateColumns: '1fr 480px', gap: '48px', alignItems: 'start' }}>

          {/* Left — Gallery */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {galleryImages.length > 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '80px', flexShrink: 0 }}>
                {galleryImages.map((src, i) => (
                  <button key={i} onClick={() => setActiveGalleryIndex(i)} style={{
                    width: '80px', height: '100px', padding: 0, border: 'none', cursor: 'pointer',
                    outline: activeGalleryIndex === i ? '2px solid #111' : '1px solid #e5e5e5',
                    outlineOffset: '-1px', overflow: 'hidden', backgroundColor: '#f5f5f5', flexShrink: 0,
                  }}>
                    <img src={src} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  </button>
                ))}
              </div>
            )}
            <div style={{ flex: 1, backgroundColor: '#f5f5f5', overflow: 'hidden', aspectRatio: '2/3', position: 'relative' }}>
              <AnimatePresence mode="wait">
                <motion.img key={mainImageSrc} src={mainImageSrc} alt={product.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Right — Product Info */}
          <div style={{ paddingTop: '8px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', margin: '0 0 8px 0' }}>
              {product.name.toUpperCase()}
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? '#111' : 'none'} stroke="#111" strokeWidth="1.5">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
              <span style={{ fontSize: '12px', color: '#666' }}>317 REVIEWS</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <span style={{ fontSize: '13px', color: '#666' }}>NOW</span>
              <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{p.price}</span>
              {p.originalPrice && (
                <>
                  <span style={{ fontSize: '13px', color: '#999' }}>WAS</span>
                  <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>{p.originalPrice}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>| {p.discount}</span>
                </>
              )}
            </div>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '13px', color: '#111', marginBottom: '8px' }}>Colour: <strong>{p.colour}</strong></p>
            </div>
            {p.sizes.length > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p style={{ fontSize: '13px', color: '#111', margin: 0 }}>{p.sizesLabel ?? 'Size'}: <strong>{selectedSize}</strong></p>
                  <span style={{ fontSize: '12px', color: '#666', textDecoration: 'underline', cursor: 'default' }}>Size Guide</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.sizes.map(s => (
                    <button key={s} onClick={() => setSelectedSize(s)} style={{
                      padding: '8px 14px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                      border: selectedSize === s ? '2px solid #111' : '1px solid #ccc',
                      backgroundColor: selectedSize === s ? '#111' : '#fff',
                      color: selectedSize === s ? '#fff' : '#111',
                    }}>{s}</button>
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: '#666', margin: '6px 0 0 0' }}>Model wears size {p.defaultSize}.</p>
              </div>
            )}
            {p.sizes2 && p.sizes2.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <p style={{ fontSize: '13px', color: '#111', margin: 0 }}>{p.sizes2Label}: <strong>{selectedSize2}</strong></p>
                  <span style={{ fontSize: '12px', color: '#666', textDecoration: 'underline', cursor: 'default' }}>Size Guide</span>
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {p.sizes2.map(s => (
                    <button key={s} onClick={() => setSelectedSize2(s)} style={{
                      padding: '8px 14px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                      border: selectedSize2 === s ? '2px solid #111' : '1px solid #ccc',
                      backgroundColor: selectedSize2 === s ? '#111' : '#fff',
                      color: selectedSize2 === s ? '#fff' : '#111',
                    }}>{s}</button>
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: '#666', margin: '6px 0 0 0' }}>Model wears size {p.defaultSize2}.</p>
              </div>
            )}
            {/* AI TRY ON */}
            <button
              onClick={() => setIsModalOpen(true)}
              style={{
                width: '100%', padding: '16px', fontSize: '13px', fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                backgroundColor: '#1B3A2D', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                marginBottom: '8px', transition: 'transform 0.1s',
                boxShadow: '0 0 20px rgba(27,58,45,0.35)',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              {tryOnResult ? 'TRY ON AGAIN' : 'AI TRY ON'}
              <span style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.4)', padding: '1px 8px', letterSpacing: '0.1em' }}>New</span>
            </button>
            <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', margin: '0 0 12px 0' }}>Upload your photo and see yourself in this item</p>
            <button style={{
              width: '100%', padding: '16px', fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
              backgroundColor: '#111', border: 'none', cursor: 'default', marginBottom: '16px',
            }}>ADD TO CART</button>
            <a
              href="https://calendly.com/mail-renderedfits/15-minute-meeting"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'block', width: '100%', padding: '14px', fontSize: '12px', fontWeight: 500,
                letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B3A2D',
                backgroundColor: '#fff', border: '1px solid #1B3A2D', textAlign: 'center',
                textDecoration: 'none', marginBottom: '20px', boxSizing: 'border-box',
              }}
            >Schedule a Meeting with Rendered Fits</a>
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#111' }}>ABOUT</p>
              <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.7', margin: 0 }}>{p.description}</p>
              {p.metal && <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}><strong>Metal:</strong> {p.metal}</p>}
            </div>
          </div>
        </div>
      )}

      {/* ── VirtualTryOnModal (the proven infrastructure) ── */}
      <VirtualTryOnModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onResult={handleTryOnResult}
        product={product}
        isUnlimited={true}
        skipWatermark={true}
        customPrompt={CUSTOM_PROMPT}
      />

      {/* ── Result overlay ── */}
      <AnimatePresence>
        {fullscreenImage && (
          isMobile ? (
            /* ── MOBILE: full-screen, natural scroll, CTA sticky at bottom ── */
            <motion.div
              style={{ position: 'fixed', inset: 0, zIndex: 100, backgroundColor: '#fff', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.22 }}
            >
              {/* Header bar — sticky */}
              <div style={{ position: 'sticky', top: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '52px', borderBottom: '1px solid #e5e5e5', backgroundColor: '#fff' }}>
                <button
                  onClick={openMyLooks}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: '0 8px 0 0' }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                  </svg>
                  <span style={{ fontSize: '12px', color: '#101828', whiteSpace: 'nowrap' }}>My looks</span>
                </button>
                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', textAlign: 'center', flex: 1 }}>{product.name}</span>
                <button
                  onClick={() => setFullscreenImage(null)}
                  style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#f3f4f6', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
                >
                  <svg width="14" height="14" fill="none" stroke="#111" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Full image — no crop, no max-height */}
              <img
                src={fullscreenImage}
                alt="Your try-on result"
                style={{ width: '100%', display: 'block' }}
              />

              {/* CTA panel — sticky at bottom */}
              <div style={{ position: 'sticky', bottom: 0, backgroundColor: '#fff', borderTop: '1px solid #e5e5e5', padding: '12px 16px 32px', fontFamily: "'Jost', sans-serif" }}>
                {p.sizes.length > 1 && (
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#111', margin: '0 0 6px 0' }}>{p.sizesLabel ?? 'Size'}: <strong>{selectedSize}</strong></p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {p.sizes.map(s => (
                        <button key={s} onClick={() => setSelectedSize(s)} style={{
                          padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                          border: selectedSize === s ? '2px solid #111' : '1px solid #ccc',
                          backgroundColor: selectedSize === s ? '#111' : '#fff',
                          color: selectedSize === s ? '#fff' : '#111',
                        }}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}
                {p.sizes2 && p.sizes2.length > 0 && (
                  <div style={{ marginBottom: '10px' }}>
                    <p style={{ fontSize: '12px', color: '#111', margin: '0 0 6px 0' }}>{p.sizes2Label}: <strong>{selectedSize2}</strong></p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                      {p.sizes2.map(s => (
                        <button key={s} onClick={() => setSelectedSize2(s)} style={{
                          padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                          border: selectedSize2 === s ? '2px solid #111' : '1px solid #ccc',
                          backgroundColor: selectedSize2 === s ? '#111' : '#fff',
                          color: selectedSize2 === s ? '#fff' : '#111',
                        }}>{s}</button>
                      ))}
                    </div>
                  </div>
                )}
                <button style={{
                  width: '100%', padding: '15px', fontSize: '13px', fontWeight: 700,
                  letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
                  backgroundColor: '#111', border: 'none', cursor: 'default', marginBottom: '8px',
                }}>ADD TO CART</button>
                <a
                  href="https://calendly.com/mail-renderedfits/15-minute-meeting"
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    display: 'block', width: '100%', padding: '13px', fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B3A2D',
                    backgroundColor: '#fff', border: '1px solid #1B3A2D', textAlign: 'center',
                    textDecoration: 'none', boxSizing: 'border-box',
                  }}
                >Schedule a Meeting</a>
              </div>
            </motion.div>
          ) : (
            /* ── DESKTOP: centred card ── */
            <motion.div
              className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center"
              onClick={() => setFullscreenImage(null)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white w-auto max-w-sm overflow-y-auto"
                style={{ maxHeight: '95vh', borderRadius: '0px' }}
                initial={{ scale: 0.96 }} animate={{ scale: 1 }} exit={{ scale: 0.96 }}
                transition={{ duration: 0.22 }}
                onClick={e => e.stopPropagation()}
              >
                <button
                  onClick={() => setFullscreenImage(null)}
                  style={{ position: 'absolute', top: '12px', right: '12px', zIndex: 10, width: '32px', height: '32px', borderRadius: '50%', backgroundColor: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <svg width="14" height="14" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                <img src={fullscreenImage} alt="Your try-on result" style={{ width: '100%', display: 'block', objectFit: 'cover', maxHeight: '55vh' }} />
                <div style={{ padding: '16px', fontFamily: "'Jost', sans-serif" }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', margin: '0 0 12px 0' }}>{product.name}</p>
                  {p.sizes.length > 1 && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#111', margin: '0 0 6px 0' }}>{p.sizesLabel ?? 'Size'}: <strong>{selectedSize}</strong></p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {p.sizes.map(s => (
                          <button key={s} onClick={() => setSelectedSize(s)} style={{
                            padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                            border: selectedSize === s ? '2px solid #111' : '1px solid #ccc',
                            backgroundColor: selectedSize === s ? '#111' : '#fff',
                            color: selectedSize === s ? '#fff' : '#111',
                          }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  {p.sizes2 && p.sizes2.length > 0 && (
                    <div style={{ marginBottom: '12px' }}>
                      <p style={{ fontSize: '12px', color: '#111', margin: '0 0 6px 0' }}>{p.sizes2Label}: <strong>{selectedSize2}</strong></p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {p.sizes2.map(s => (
                          <button key={s} onClick={() => setSelectedSize2(s)} style={{
                            padding: '6px 12px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                            border: selectedSize2 === s ? '2px solid #111' : '1px solid #ccc',
                            backgroundColor: selectedSize2 === s ? '#111' : '#fff',
                            color: selectedSize2 === s ? '#fff' : '#111',
                          }}>{s}</button>
                        ))}
                      </div>
                    </div>
                  )}
                  <button style={{ width: '100%', padding: '14px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#111', border: 'none', cursor: 'default', marginTop: '4px' }}>ADD TO CART</button>
                  <a href="https://calendly.com/mail-renderedfits/15-minute-meeting" target="_blank" rel="noopener noreferrer"
                    style={{ display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1B3A2D', backgroundColor: '#fff', border: '1px solid #1B3A2D', textAlign: 'center', textDecoration: 'none', marginTop: '8px', boxSizing: 'border-box' }}
                  >Schedule a Meeting</a>
                </div>
              </motion.div>
            </motion.div>
          )
        )}
      </AnimatePresence>

      {/* ── My Looks overlay ── */}
      <AnimatePresence>
        {myLooksOpen && (
          <motion.div
            style={{ position: 'fixed', inset: 0, zIndex: 110, backgroundColor: '#fff', display: 'flex', flexDirection: 'column' }}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }}
            transition={{ duration: 0.2 }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', height: '52px', borderBottom: '1px solid #e5e5e5', flexShrink: 0, backgroundColor: '#fff' }}>
              <button
                onClick={() => setMyLooksOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
                <span style={{ fontSize: '13px', color: '#111' }}>Back</span>
              </button>
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111' }}>My Looks</span>
              <div style={{ width: '52px' }} />
            </div>

            {/* Grid or empty state */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {myLooks.length === 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DC" strokeWidth="1" style={{ marginBottom: '16px' }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                  </svg>
                  <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '8px' }}>No try-ons yet</p>
                  <p style={{ fontSize: '13px', color: '#6A7282' }}>Generate your first try-on to see it here</p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: '13px', color: '#6A7282', marginBottom: '16px' }}>{myLooks.length} {myLooks.length === 1 ? 'result' : 'results'} saved on this device</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    {myLooks.map((look, i) => (
                      <div key={i} style={{ cursor: 'pointer' }} onClick={() => { setFullscreenImage(look.tryOnImageUrl); setMyLooksOpen(false); }}>
                        <img
                          src={look.tryOnImageUrl}
                          alt={look.productName || 'Try-on result'}
                          style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block', border: '1px solid #E5E7EB' }}
                        />
                        {look.productName && (
                          <p style={{ fontSize: '11px', color: '#444', margin: '4px 0 0', lineHeight: '14px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                            {look.productName}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CernucciLivePage;
