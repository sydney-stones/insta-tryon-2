/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Cernucci LIVE try-on pages — sent to Cernucci contacts post-meeting.
 * Identical widget design to CernucciDemoPage but with real image upload
 * and live Vertex AI API call instead of pre-rendered results.
 */

import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { generateVertexTryOn } from '../services/vertexTryonService';

// ─── Product Data ─────────────────────────────────────────────────────────────

interface LiveProduct {
  id: number;
  name: string;
  price: string;
  originalPrice?: string;
  discount?: string;
  colour: string;
  sizes: string[];
  defaultSize: string;
  // First image is used as the garment image sent to the API
  gallerySrcs: string[];
  metal?: string;
  description: string;
}

const BASE = '/result-images/Cernucci2';

export const CERNUCCI_LIVE_PRODUCTS: Record<string, LiveProduct> = {
  'cuban-chain-bracelet': {
    id: 80,
    name: '8mm Cuban Chain & Bracelet Set — White Gold',
    price: '£119.99',
    colour: 'White Gold',
    sizes: ['18"', '20"', '22"', '24"'],
    defaultSize: '20"',
    gallerySrcs: [
      `${BASE}/cubanchainandbracelet/8MM-MCC-MCB-WG_1200x1800.webp`,
      `${BASE}/cubanchainandbracelet/8MM-MCC-MCB-WG_2_1200x1800.webp`,
    ],
    metal: 'Brass · 18k White Gold Plated · Tarnish Resistant',
    description: 'The 8mm Cuban Chain paired with a matching Cuban Bracelet — both in White Gold. A co-ordinated set built for stacking and presence. Precision-crafted links with a high-polish finish.',
  },
  'mens-tracksuit': {
    id: 81,
    name: 'Octagon Tracksuit — Dark Heather',
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
    id: 82,
    name: 'Iced Out Pendant — White Gold',
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
    id: 83,
    name: 'Iced Out Round Stud Earring — White Gold',
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
    id: 84,
    name: 'Womens Navy Casual Set',
    price: '£99.99',
    colour: 'Navy',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'S',
    gallerySrcs: [
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-1c_84d5396e-5b68-4e1e-83a4-30ccabf65cef_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-2c_58adc2f5-49c7-45ac-ba3d-2cf6d70020de_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-4c_1200x1800.webp`,
      `${BASE}/womenscasual/TA-NVTOP35DH-WTA-NVJOG36DH-W-7c_1200x1800.webp`,
    ],
    description: 'The Womens Navy Casual Set — a relaxed crop top and co-ordinating jogger in soft navy. Effortless off-duty style with Cernucci\'s signature fit and premium fabric feel.',
  },
  'womens-yellow': {
    id: 85,
    name: 'Womens Bright Yellow Crop Set',
    price: '£99.99',
    colour: 'Bright Yellow',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    defaultSize: 'S',
    gallerySrcs: [
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY-1_85f50bc3-c1de-440b-9b49-97d99c7d194b_1200x1800.webp`,
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY-16_35da85ee-6a24-4922-9bf9-56571bb167d6_1200x1800.webp`,
      `${BASE}/womensyellow/SH-TAPCRJ01-W-BY_SH-TAPSHOR01-W-BY_d87861a2-8d90-4ec5-a340-c3a8d989c224_1200x1800.webp`,
    ],
    description: 'The Womens Bright Yellow Crop Set — a bold, head-turning combination of cropped jacket and co-ordinating shorts in vibrant yellow. Statement colour, Cernucci\'s relaxed athletic fit.',
  },
};

// ─── Upload States ─────────────────────────────────────────────────────────────

type UploadStep = 'idle' | 'upload' | 'processing' | 'result' | 'error';

// ─── File to base64 helper ─────────────────────────────────────────────────────

function fileToPreviewUrl(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CernucciLivePageProps {
  productSlug: keyof typeof CERNUCCI_LIVE_PRODUCTS;
}

const CernucciLivePage: React.FC<CernucciLivePageProps> = ({ productSlug }) => {
  const product = CERNUCCI_LIVE_PRODUCTS[productSlug];

  const [isMobile, setIsMobile] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  // Widget state
  const [popupOpen, setPopupOpen] = useState(false);
  const [step, setStep] = useState<UploadStep>('idle');

  // Uploads
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyFile, setBodyFile] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);

  const [resultImage, setResultImage] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const faceInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [productSlug]);

  const handleOpenWidget = () => {
    setStep('upload');
    setPopupOpen(true);
    setResultImage(null);
    setErrorMsg(null);
  };

  const handleClose = () => {
    setPopupOpen(false);
    setStep('idle');
  };

  const handleFaceSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFaceFile(file);
    setFacePreview(await fileToPreviewUrl(file));
  };

  const handleBodySelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setBodyFile(file);
    setBodyPreview(await fileToPreviewUrl(file));
  };

  const handleTryOn = async () => {
    if (!faceFile && !bodyFile) return;

    setStep('processing');
    setErrorMsg(null);

    try {
      // Use whichever photo was uploaded — body preferred, face as fallback
      const personImage = bodyFile ?? faceFile!;
      const garmentUrl = window.location.origin + product.gallerySrcs[0];
      const result = await generateVertexTryOn(personImage, garmentUrl);
      setResultImage(result);
      setStep('result');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setStep('error');
    }
  };

  const handleRetry = () => {
    setStep('upload');
    setErrorMsg(null);
    setResultImage(null);
  };

  const handleReset = () => {
    setFaceFile(null);
    setFacePreview(null);
    setBodyFile(null);
    setBodyPreview(null);
    setResultImage(null);
    setErrorMsg(null);
    setStep('upload');
  };

  const canTryOn = (faceFile !== null || bodyFile !== null) && step === 'upload';
  const mainImageSrc = product.gallerySrcs[activeGalleryIndex];

  return (
    <div className="min-h-screen bg-white overflow-auto">

      {/* ── Header ── */}
      <header style={{ borderBottom: '1px solid #e5e5e5', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: '60px' }}>
          <nav style={{ display: 'flex', gap: '32px', marginRight: 'auto' }}>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', color: '#111', cursor: 'default' }}>MENS</span>
            <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.04em', color: '#111', cursor: 'default' }}>WOMENS</span>
          </nav>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ fontSize: '22px', fontWeight: 700, letterSpacing: '0.06em', color: '#111' }}>CERNUCCI</span>
          </div>
          <div style={{ display: 'flex', gap: '16px', marginLeft: 'auto', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ccc', padding: '6px 12px', gap: '8px', minWidth: '160px' }}>
              <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/></svg>
              <span style={{ fontSize: '12px', color: '#999' }}>Search...</span>
            </div>
          </div>
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
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 64px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 480px', gap: isMobile ? '24px' : '48px', alignItems: 'start' }}>

        {/* Left — Gallery */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Thumbnail strip */}
          {!isMobile && product.gallerySrcs.length > 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '80px', flexShrink: 0 }}>
              {product.gallerySrcs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryIndex(i)}
                  style={{
                    width: '80px', height: '100px', padding: 0, border: 'none', cursor: 'pointer',
                    outline: activeGalleryIndex === i ? '2px solid #111' : '1px solid #e5e5e5',
                    outlineOffset: '-1px', overflow: 'hidden', backgroundColor: '#f5f5f5', flexShrink: 0,
                  }}
                >
                  <img src={src} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div style={{ flex: 1, backgroundColor: '#f5f5f5', overflow: 'hidden', aspectRatio: '2/3' }}>
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
          </div>
        </div>

        {/* Right — Product Info */}
        <div style={{ paddingTop: '8px' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#111', margin: '0 0 8px 0' }}>
            {product.name.toUpperCase()}
          </h1>

          {/* Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i <= 4 ? '#111' : 'none'} stroke="#111" strokeWidth="1.5">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
            <span style={{ fontSize: '12px', color: '#666' }}>317 REVIEWS</span>
          </div>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>NOW</span>
            <span style={{ fontSize: '18px', fontWeight: 700, color: '#111' }}>{product.price}</span>
            {product.originalPrice && (
              <>
                <span style={{ fontSize: '13px', color: '#999' }}>WAS</span>
                <span style={{ fontSize: '13px', color: '#999', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                <span style={{ fontSize: '12px', fontWeight: 700, color: '#16a34a' }}>| {product.discount}</span>
              </>
            )}
          </div>

          {/* Colour */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '13px', color: '#111', marginBottom: '8px' }}>Colour: <strong>{product.colour}</strong></p>
          </div>

          {/* Size */}
          {product.sizes.length > 1 && (
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <p style={{ fontSize: '13px', color: '#111', margin: 0 }}>Size: <strong>{selectedSize}</strong></p>
                <span style={{ fontSize: '12px', color: '#666', textDecoration: 'underline', cursor: 'default' }}>Size Guide</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelectedSize(s)} style={{
                    padding: '8px 14px', fontSize: '13px', fontWeight: 500, cursor: 'pointer',
                    border: selectedSize === s ? '2px solid #111' : '1px solid #ccc',
                    backgroundColor: selectedSize === s ? '#111' : '#fff',
                    color: selectedSize === s ? '#fff' : '#111',
                  }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI TRY ON */}
          <button
            onClick={handleOpenWidget}
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
            AI TRY ON
            <span style={{ fontSize: '10px', border: '1px solid rgba(255,255,255,0.4)', padding: '1px 8px', letterSpacing: '0.1em' }}>New</span>
          </button>
          <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', margin: '0 0 12px 0' }}>Upload your photo and see yourself in this item</p>

          {/* ADD TO CART */}
          <button style={{
            width: '100%', padding: '16px', fontSize: '13px', fontWeight: 700,
            letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff',
            backgroundColor: '#111', border: 'none', cursor: 'default', marginBottom: '16px',
          }}>
            ADD TO CART
          </button>

          {/* Description */}
          {product.description && (
            <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '16px', marginTop: '8px' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px', color: '#111' }}>ABOUT</p>
              <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.7', margin: 0 }}>{product.description}</p>
              {product.metal && (
                <p style={{ fontSize: '12px', color: '#666', marginTop: '10px' }}>
                  <strong>Metal:</strong> {product.metal}
                </p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Try-On Widget Overlay ── */}
      <AnimatePresence>
        {popupOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(32,32,32,0.5)', fontFamily: "'Jost', sans-serif" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative shadow-2xl overflow-hidden"
              style={{ width: '768px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#fff', borderRadius: '0px' }}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.25 }}
            >

              {/* ── UPLOAD STEP ── */}
              {step === 'upload' && (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  {/* Header bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', height: '48px', borderRight: '1px solid #D1D5DC', minWidth: '113px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', color: '#101828', whiteSpace: 'nowrap' }}>My looks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button onClick={handleClose} style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left — product image */}
                    {!isMobile && (
                      <div style={{ width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB', position: 'relative' }}>
                        <img src={mainImageSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', height: '29.83px', backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid #D1D5DC' }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    )}

                    {/* Right — upload form */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                        <div style={{ padding: '24px 24px 0' }}>
                          <p style={{ fontSize: '30px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '36px' }}>
                            TRY IT ON, VIRTUALLY
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          {/* Face upload */}
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Face photo</p>
                          <div
                            onClick={() => faceInputRef.current?.click()}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}
                          >
                            {facePreview ? (
                              <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={facePreview} alt="Face" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                              </div>
                            ) : (
                              <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                  <circle cx="20" cy="15" r="7" stroke="#101828" strokeWidth="1.5" fill="none" />
                                  <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#101828" strokeWidth="1.5" fill="none" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '24px' }}>
                                {faceFile ? 'Face photo uploaded — tap to change' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {faceFile ? faceFile.name : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>
                          <input ref={faceInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFaceSelect} />

                          <div style={{ height: '32px' }} />

                          {/* Body upload */}
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Full body photo</p>
                          <div
                            onClick={() => bodyInputRef.current?.click()}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}
                          >
                            {bodyPreview ? (
                              <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={bodyPreview} alt="Body" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                              </div>
                            ) : (
                              <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                  <circle cx="20" cy="9" r="4" stroke="#101828" strokeWidth="1.5" fill="none" />
                                  <line x1="20" y1="13" x2="20" y2="28" stroke="#101828" strokeWidth="1.5" />
                                  <line x1="12" y1="18" x2="28" y2="18" stroke="#101828" strokeWidth="1.5" />
                                  <line x1="20" y1="28" x2="14" y2="38" stroke="#101828" strokeWidth="1.5" />
                                  <line x1="20" y1="28" x2="26" y2="38" stroke="#101828" strokeWidth="1.5" />
                                </svg>
                              </div>
                            )}
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '24px' }}>
                                {bodyFile ? 'Full body photo uploaded — tap to change' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {bodyFile ? bodyFile.name : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>
                          <input ref={bodyInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleBodySelect} />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 24px' }}>
                          <p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '16px' }}>
                            By uploading your photo, you agree to our{' '}
                            <Link to="/legal/end-user-terms" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>{' '}
                            and{' '}
                            <Link to="/legal/app-privacy-policy" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Privacy Policy</Link>.
                            {' '}Your image is never permanently stored.
                          </p>
                        </div>
                        <button
                          onClick={handleTryOn}
                          disabled={!canTryOn}
                          style={{
                            width: '100%', height: '48px', fontSize: '14px', fontWeight: 400,
                            color: canTryOn ? '#fff' : '#D1D5DC',
                            backgroundColor: canTryOn ? '#1E2939' : '#6A7282',
                            border: 'none', cursor: canTryOn ? 'pointer' : 'not-allowed',
                            fontFamily: "'Jost', sans-serif",
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          }}
                        >
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill={canTryOn ? '#fff' : '#D1D5DC'} />
                          </svg>
                          Try on
                        </button>
                      </div>

                      <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── PROCESSING ── */}
              {step === 'processing' && (
                <div style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                  </div>
                  <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', textAlign: 'center' }}>
                    <p style={{ fontSize: '26px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#101828', marginBottom: '32px' }}>GETTING DRESSED!</p>
                    <img src="/hanger.jpg" alt="Loading" style={{ width: '72px', height: '72px', objectFit: 'contain', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '0ms', display: 'inline-block' }} />
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '150ms', display: 'inline-block' }} />
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '300ms', display: 'inline-block' }} />
                    </div>
                    <p style={{ fontSize: '12px', color: '#6A7282' }}>This takes around 20–30 seconds</p>
                  </div>
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
                </div>
              )}

              {/* ── RESULT ── */}
              {step === 'result' && resultImage && (
                <div style={{ fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '12px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                    </div>
                    <button onClick={handleClose} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #D1D5DC', cursor: 'pointer', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: '75vh' }}>
                    <div style={{ width: '341px', maxWidth: '100%', backgroundColor: '#fff', border: '1px solid #E5E7EB', position: 'relative' }}>
                      <button onClick={() => setFullscreenImage(true)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in', position: 'relative' }}>
                        <img src={resultImage} alt="Try-on result" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                      </button>

                      <div style={{ padding: '12px 12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '0 12px', height: '44px', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>

                      <div style={{ padding: '12px' }}>
                        <button onClick={handleReset} style={{ display: 'block', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#1E2939', textAlign: 'center', fontFamily: "'Jost', sans-serif", boxSizing: 'border-box', border: 'none', cursor: 'pointer', marginBottom: '6px' }}>
                          Try Again
                        </button>
                        <a href="https://calendly.com/mail-renderedfits/15-minute-meeting" target="_blank" rel="noopener noreferrer"
                          style={{ display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7282', backgroundColor: '#fff', textAlign: 'center', textDecoration: 'none', fontFamily: "'Jost', sans-serif", border: '1px solid #E5E7EB', boxSizing: 'border-box' }}>
                          Schedule a Meeting
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
                </div>
              )}

              {/* ── ERROR ── */}
              {step === 'error' && (
                <div style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                    </div>
                    <button onClick={handleClose} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #D1D5DC', cursor: 'pointer' }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
                    </button>
                  </div>
                  <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', minHeight: '280px', justifyContent: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: 500, color: '#101828', marginBottom: '12px' }}>Something went wrong</p>
                    <p style={{ fontSize: '13px', color: '#6A7282', marginBottom: '32px', maxWidth: '320px', lineHeight: '1.6' }}>{errorMsg}</p>
                    <button onClick={handleRetry} style={{ padding: '12px 32px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', color: '#fff', backgroundColor: '#1E2939', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>
                      Try Again
                    </button>
                  </div>
                </div>
              )}

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Result ── */}
      <AnimatePresence>
        {fullscreenImage && resultImage && (
          <motion.div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setFullscreenImage(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <motion.img src={resultImage} alt="Try-on result fullscreen" className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CernucciLivePage;
