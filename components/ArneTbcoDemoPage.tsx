/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Standalone Arne & TBCO demo pages — same widget/animation as ScabalDemoPage
 * but branded for Arne (menswear) and TBCO (womenswear).
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Product Data ─────────────────────────────────────────────────────────────

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  productSrc: string;
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  description: string;
}

export const ARNE_TBCO_PRODUCTS: Record<string, DemoProduct> = {
  'arne-jacket': {
    id: 101,
    name: 'Arne Technical Jacket',
    brand: 'Arne',
    price: 395,
    category: 'Outerwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    productSrc: '/result-images/arne3.webp',
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/arne2-nb2-2k-tryon.png',
    description: 'A refined technical jacket from Arne — clean lines, premium construction and versatile styling for every occasion.',
  },
  'tbco-dress-1': {
    id: 102,
    name: 'TBCO Printed Dress',
    brand: 'TBCO',
    price: 245,
    category: 'Dresses',
    sizes: ['XS', 'S', 'M', 'L'],
    productSrc: '/result-images/Screenshot 2026-03-23 at 10.42.18.png',
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Screenshot 2026-03-23 at 10.42.06.png',
    description: 'Effortless silhouette in a signature TBCO print. Designed for movement and crafted for confidence.',
  },
  'tbco-top-1': {
    id: 103,
    name: 'TBCO Woven Top',
    brand: 'TBCO',
    price: 175,
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L'],
    productSrc: '/result-images/Screenshot 2026-03-23 at 10.44.07 am.png',
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Screenshot 2026-03-23 at 10.44.02 am.png',
    description: 'A beautifully structured woven top — elevated basics done right by TBCO.',
  },
  'tbco-top-2': {
    id: 104,
    name: 'TBCO Studio Top',
    brand: 'TBCO',
    price: 195,
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L'],
    productSrc: '/result-images/Screenshot 2026-03-23 at 10.44.21 am.png',
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Screenshot 2026-03-23 at 10.44.14 am.png',
    description: 'Clean, versatile and effortlessly stylish — the TBCO Studio Top is a wardrobe essential.',
  },
  'arne-womenswear': {
    id: 105,
    name: 'Arne Womenswear Piece',
    brand: 'Arne',
    price: 320,
    category: 'Womenswear',
    sizes: ['XS', 'S', 'M', 'L'],
    productSrc: '/result-images/Screenshot 2026-03-23 at 10.44.30 am.png',
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Screenshot 2026-03-23 at 10.44.36 am.png',
    description: 'Signature Arne craftsmanship brought to womenswear — structured, refined and built to last.',
  },
};

// ─── Animation State Machine ──────────────────────────────────────────────────

type AnimationState =
  | 'idle' | 'cursor_to_button' | 'click_button' | 'popup_open'
  | 'cursor_to_face' | 'click_face' | 'show_upload_modal' | 'click_photo_library'
  | 'face_uploaded' | 'cursor_to_body' | 'click_body' | 'show_upload_modal_2'
  | 'click_photo_library_2' | 'body_uploaded' | 'loading' | 'result';

const ANIMATION_SEQUENCE: { state: AnimationState; duration: number }[] = [
  { state: 'idle', duration: 2000 },
  { state: 'cursor_to_button', duration: 1200 },
  { state: 'click_button', duration: 500 },
  { state: 'popup_open', duration: 800 },
  { state: 'cursor_to_face', duration: 1000 },
  { state: 'click_face', duration: 400 },
  { state: 'show_upload_modal', duration: 1500 },
  { state: 'click_photo_library', duration: 800 },
  { state: 'face_uploaded', duration: 800 },
  { state: 'cursor_to_body', duration: 1000 },
  { state: 'click_body', duration: 400 },
  { state: 'show_upload_modal_2', duration: 1500 },
  { state: 'click_photo_library_2', duration: 800 },
  { state: 'body_uploaded', duration: 3800 },
  { state: 'loading', duration: 4000 },
  { state: 'result', duration: 0 },
];

function useAnimationSequence(active: boolean): AnimationState {
  const [state, setState] = useState<AnimationState>('idle');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (!active) {
      setState('idle');
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      return;
    }
    let cumulativeDelay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ANIMATION_SEQUENCE.forEach(({ state: s, duration }, index) => {
      const timer = setTimeout(() => setState(s), cumulativeDelay);
      timers.push(timer);
      if (index < ANIMATION_SEQUENCE.length - 1) cumulativeDelay += duration;
    });
    timersRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return state;
}

const isPopupVisible = (s: AnimationState) =>
  ['popup_open','cursor_to_face','click_face','show_upload_modal','click_photo_library',
   'face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2',
   'body_uploaded','loading','result'].includes(s);
const isFaceUploaded = (s: AnimationState) =>
  ['face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2',
   'body_uploaded','loading','result'].includes(s);
const isBodyUploaded = (s: AnimationState) => ['body_uploaded','loading','result'].includes(s);
const isLoadingState = (s: AnimationState) => s === 'loading';
const isResultState  = (s: AnimationState) => s === 'result';
const isCursorVisible = (s: AnimationState) =>
  ['cursor_to_button','click_button','cursor_to_face','click_face','click_photo_library',
   'cursor_to_body','click_body','click_photo_library_2'].includes(s);

// ─── Animated Cursor ──────────────────────────────────────────────────────────

const CursorSVG: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" />
  </svg>
);

const AnimatedCursor: React.FC<{ x: number; y: number; visible: boolean; clicking: boolean }> = ({ x, y, visible, clicking }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="fixed pointer-events-none"
        style={{ zIndex: 9999 }}
        initial={{ opacity: 0, x, y }}
        animate={{ opacity: 1, x, y, scale: clicking ? [1, 0.8, 1] : 1 }}
        exit={{ opacity: 0 }}
        transition={{
          x: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
          y: { type: 'tween', duration: 0.8, ease: 'easeInOut' },
          scale: { duration: 0.3 },
          opacity: { duration: 0.2 },
        }}
      >
        <CursorSVG />
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Related products sidebar data ───────────────────────────────────────────

const RELATED: { slug: string; label: string; brand: string }[] = [
  { slug: 'arne-jacket',       label: 'Arne Technical Jacket',    brand: 'Arne'  },
  { slug: 'tbco-dress-1',      label: 'TBCO Printed Dress',       brand: 'TBCO'  },
  { slug: 'tbco-top-1',        label: 'TBCO Woven Top',           brand: 'TBCO'  },
  { slug: 'tbco-top-2',        label: 'TBCO Studio Top',          brand: 'TBCO'  },
  { slug: 'arne-womenswear',   label: 'Arne Womenswear',          brand: 'Arne'  },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

type ProductSlug = keyof typeof ARNE_TBCO_PRODUCTS;

interface ArneTbcoDemoPageProps {
  productSlug: ProductSlug;
}

const ArneTbcoDemoPage: React.FC<ArneTbcoDemoPageProps> = ({ productSlug }) => {
  const product = ARNE_TBCO_PRODUCTS[productSlug];

  const [animationActive, setAnimationActive] = useState(false);
  const animState = useAnimationSequence(animationActive);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const tryOnButtonRef   = useRef<HTMLButtonElement>(null);
  const faceUploadRef    = useRef<HTMLDivElement>(null);
  const bodyUploadRef    = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimationActive(true), 600);
    return () => clearTimeout(t);
  }, []);

  const updateCursorPosition = useCallback(() => {
    let targetEl: HTMLElement | null = null;
    if (animState === 'cursor_to_button' || animState === 'click_button') {
      targetEl = tryOnButtonRef.current;
    } else if (animState === 'cursor_to_face' || animState === 'click_face') {
      targetEl = faceUploadRef.current;
    } else if (animState === 'cursor_to_body' || animState === 'click_body') {
      targetEl = bodyUploadRef.current;
    } else if (animState === 'click_photo_library' || animState === 'click_photo_library_2') {
      if (overlayContainerRef.current) {
        const rect = overlayContainerRef.current.getBoundingClientRect();
        setCursorPos({ x: rect.left + rect.width * 0.35, y: rect.top + rect.height * 0.42 });
        return;
      }
    }
    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setCursorPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  }, [animState]);

  useEffect(() => {
    const raf = requestAnimationFrame(updateCursorPosition);
    return () => cancelAnimationFrame(raf);
  }, [animState, updateCursorPosition]);

  const isClicking = ['click_button','click_face','click_photo_library','click_body','click_photo_library_2'].includes(animState);

  const brandColor = product.brand === 'Arne' ? '#1a1a1a' : '#2c3e50';

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} visible={isCursorVisible(animState)} clicking={isClicking} />

      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium text-gray-400">
              <span>NEW IN</span>
              <span>CLOTHING</span>
              <span>ACCESSORIES</span>
              <span>SALE</span>
            </nav>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-xl tracking-[0.08em] font-semibold text-gray-900" style={{ fontFamily: 'Jost, sans-serif' }}>
              {product.brand === 'Arne' ? 'ARNE' : 'TBCO'}
            </span>
            <div className="flex items-center gap-4" />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <Link to="/arne-tbco" className="hover:text-gray-900 transition-colors">Home</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Layout */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">

          {/* Left — Product Image */}
          <div className="flex justify-center">
            <div className="relative bg-gray-50 overflow-hidden w-full">
              <div className="relative aspect-[3/4] mx-auto">
                <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col">
            <p className="text-[11px] tracking-[0.2em] font-medium text-gray-400 uppercase mb-1">{product.brand}</p>
            <h1 className="text-[20px] font-normal tracking-[0.05em] text-gray-900 mb-4" style={{ fontFamily: 'Jost, sans-serif' }}>
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-[14px] line-through text-gray-400">&pound;{product.originalPrice}</span>
              )}
              <span className="text-[16px] font-medium text-gray-900">&pound;{product.price}</span>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz, i) => (
                  <button
                    key={sz}
                    className={`border px-3 py-1.5 text-[12px] tracking-[0.1em] cursor-default transition-colors ${
                      i === 2 ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300 text-gray-700'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* AI TRY ON Button */}
            <button
              ref={tryOnButtonRef}
              className={`w-full py-4 px-6 text-[12px] tracking-[0.15em] font-medium flex items-center justify-center gap-3 mb-2 transition-all ${
                animState === 'click_button' ? 'scale-95' : ''
              }`}
              style={{ backgroundColor: brandColor, color: '#fff', boxShadow: `0 0 20px ${brandColor}66` }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              AI TRY ON
              <span className="text-[10px] border border-white/40 px-2 py-0.5 tracking-wider">New</span>
            </button>
            <p className="text-[11px] text-gray-500 text-center mb-6">Upload your photo and see yourself in this item</p>

            {/* Add to bag */}
            <div className="flex gap-0 mb-6">
              <button className="flex-1 border border-black py-4 px-6 text-[12px] tracking-[0.15em] font-medium cursor-default hover:bg-black hover:text-white transition-colors">
                ADD TO BAG
              </button>
              <button className="border border-black border-l-0 px-4 flex items-center justify-center cursor-default">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6 mb-8">
              <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Other products from this brand */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-[11px] tracking-[0.15em] text-gray-500 uppercase mb-3">More from this collection</p>
              <div className="flex flex-col gap-1">
                {RELATED.filter(r => r.slug !== productSlug).map(r => (
                  <Link
                    key={r.slug}
                    to={`/arne-tbco/${r.slug}`}
                    className="flex items-center justify-between py-2 text-[12px] text-gray-700 hover:text-gray-900 border-b border-gray-100 transition-colors"
                  >
                    <span>{r.label}</span>
                    <span className="text-gray-400 text-[10px] tracking-wider">{r.brand} →</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Try-On Popup ─── */}
      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(32,32,32,0.5)', fontFamily: "'Jost', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative shadow-2xl overflow-hidden"
              style={{ width: '768px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#fff' }}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.25 }}
            >
              {/* Upload screen */}
              {!isLoadingState(animState) && !isResultState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Top bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', height: '48px', borderRight: '1px solid #D1D5DC', minWidth: '113px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', color: '#101828' }}>My looks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>10 credits left</span>
                      </div>
                      <div style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC' }} />
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left — product image */}
                    {!isMobile && (
                      <div style={{ width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB', position: 'relative' }}>
                        <img src={product.productSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', border: '1px solid #D1D5DC' }}>{product.category}</span>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', border: '1px solid #D1D5DC' }}>{product.sizes[2]}</span>
                        </div>
                      </div>
                    )}

                    {/* Right — form */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '24px 24px 0', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                        <p style={{ fontSize: '30px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '36px' }}>
                          TRY IT ON, VIRTUALLY
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          {/* Face upload */}
                          <p style={{ fontSize: '16px', color: '#101828', marginBottom: '4px' }}>Face photo</p>
                          <div
                            ref={faceUploadRef}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '12px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer' }}
                          >
                            {isFaceUploaded(animState) ? (
                              <div style={{ position: 'relative' }}>
                                <img src={product.faceSrc} alt="Face" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                              </div>
                            ) : (
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="15" r="7" stroke="#101828" strokeWidth="1.5" />
                                <path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#101828" strokeWidth="1.5" />
                              </svg>
                            )}
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', margin: 0, lineHeight: '24px' }}>
                                {isFaceUploaded(animState) ? 'Face photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', margin: 0, lineHeight: '20px' }}>
                                {isFaceUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>

                          <div style={{ height: '32px' }} />

                          {/* Body upload */}
                          <p style={{ fontSize: '16px', color: '#101828', marginBottom: '4px' }}>Full body photo</p>
                          <div
                            ref={bodyUploadRef}
                            style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '12px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer' }}
                          >
                            {isBodyUploaded(animState) ? (
                              <div style={{ position: 'relative' }}>
                                <img src={product.bodySrc} alt="Body" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
                                <div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </div>
                              </div>
                            ) : (
                              <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                                <circle cx="20" cy="9" r="4" stroke="#101828" strokeWidth="1.5" />
                                <line x1="20" y1="13" x2="20" y2="28" stroke="#101828" strokeWidth="1.5" />
                                <line x1="12" y1="18" x2="28" y2="18" stroke="#101828" strokeWidth="1.5" />
                                <line x1="20" y1="28" x2="14" y2="38" stroke="#101828" strokeWidth="1.5" />
                                <line x1="20" y1="28" x2="26" y2="38" stroke="#101828" strokeWidth="1.5" />
                              </svg>
                            )}
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', margin: 0, lineHeight: '24px' }}>
                                {isBodyUploaded(animState) ? 'Full body photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', margin: 0, lineHeight: '20px' }}>
                                {isBodyUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms + button */}
                      <div>
                        <div style={{ padding: '8px 24px' }}>
                          <p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '16px', margin: 0 }}>
                            By uploading your photo, you agree to our{' '}
                            <Link to="/legal/end-user-terms" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>{' '}
                            and{' '}
                            <Link to="/legal/app-privacy-policy" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Privacy Policy</Link>.
                            {' '}Your image is never permanently stored.
                          </p>
                        </div>
                        <button
                          disabled
                          style={{
                            width: '100%', height: '48px', fontSize: '14px', fontWeight: 400,
                            color: isBodyUploaded(animState) ? '#fff' : '#D1D5DC',
                            backgroundColor: isBodyUploaded(animState) ? '#1E2939' : '#6A7282',
                            border: 'none', cursor: 'not-allowed',
                            fontFamily: "'Jost', sans-serif",
                            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          }}
                        >
                          {isBodyUploaded(animState) ? (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                              </svg>
                              Try on
                            </>
                          ) : (
                            <>
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="#D1D5DC"/>
                              </svg>
                              Try on
                            </>
                          )}
                        </button>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', height: '36px', backgroundColor: '#F3F4F6', borderTop: '1px solid #D1D5DC' }}>
                          <span style={{ fontSize: '12px', color: '#6A7282' }}>Powered by</span>
                          <Link to="/" style={{ fontSize: '12px', fontWeight: 700, color: '#101828', textDecoration: 'none' }}>RENDERED FITS™</Link>
                          <span style={{ fontSize: '12px', color: '#6A7282' }}>→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Loading screen */}
              {isLoadingState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '500px', gap: '24px', fontFamily: "'Jost', sans-serif" }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
                    style={{ width: '48px', height: '48px', border: '3px solid #E5E7EB', borderTopColor: '#1E2939', borderRadius: '50%' }}
                  />
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', fontWeight: 400, color: '#101828', marginBottom: '8px' }}>Generating your try-on…</p>
                    <p style={{ fontSize: '13px', color: '#6A7282' }}>Our AI is working its magic</p>
                  </div>
                </div>
              )}

              {/* Result screen */}
              {isResultState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Top bar */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', height: '48px', borderRight: '1px solid #D1D5DC', minWidth: '113px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', color: '#101828' }}>My looks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>9 credits left</span>
                      </div>
                      <div style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC' }} />
                    </div>
                  </div>

                  {/* Result image */}
                  <div
                    ref={overlayContainerRef}
                    style={{ position: 'relative', flex: 1, cursor: 'zoom-in', overflow: 'hidden' }}
                    onClick={() => setFullscreenImage(true)}
                  >
                    <motion.img
                      src={product.afterSrc}
                      alt="Try-on result"
                      style={{ width: '100%', height: '100%', objectFit: 'contain', maxHeight: '500px' }}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    <motion.div
                      style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', fontSize: '11px', color: '#101828', fontWeight: 500 }}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      Tap to expand
                    </motion.div>
                  </div>

                  {/* Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '36px', backgroundColor: '#F3F4F6', borderTop: '1px solid #D1D5DC', gap: '6px' }}>
                    <span style={{ fontSize: '12px', color: '#6A7282' }}>Powered by</span>
                    <Link to="/" style={{ fontSize: '12px', fontWeight: 700, color: '#101828', textDecoration: 'none' }}>RENDERED FITS™</Link>
                    <span style={{ fontSize: '12px', color: '#6A7282' }}>→</span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen result */}
      <AnimatePresence>
        {fullscreenImage && isResultState(animState) && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/90 cursor-zoom-out"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(false)}
          >
            <motion.img
              src={product.afterSrc}
              alt="Try-on result fullscreen"
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ArneTbcoDemoPage;
