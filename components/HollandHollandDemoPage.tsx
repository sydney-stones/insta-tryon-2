/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Standalone Holland & Holland demo pages.
 * Widget and workflow identical to ScabalDemoPage — only images and branding differ.
 * Animation starts on manual "VIRTUAL TRY-ON" button click (not auto-start).
 * Subtle "skip to result →" link shown once animation begins.
 *
 * To create a new brand demo page: copy this file, swap BRAND_PRODUCTS data,
 * update the header nav items and brand name, and register routes in App.tsx.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Product Data ─────────────────────────────────────────────────────────────

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  colour: string;
  category: string;
  sizes: string[];
  productSrc: string;
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  description: string;
}

const BASE = '/result-images/Holland&Holland';

export const HH_PRODUCTS: Record<string, DemoProduct> = {
  'tweed-field-coat': {
    id: 50,
    name: 'Northwood Ladies Tweed Field Coat',
    brand: 'Holland & Holland',
    price: '£1,095',
    colour: 'Hazel',
    category: 'Shooting',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productSrc: `${BASE}/NORTHWOODTWEEDFIELDCOAT/Holland&Holland.jpg`,
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: `${BASE}/NORTHWOODTWEEDFIELDCOAT/Holland&Holland2.jpeg`,
    description: 'The quintessential fieldsports essential. The Northwood tweed weatherproof field coat combines shooting features with timeless style. The action back allows for ease of swing and the large bellow cartridge pockets with tab retainer mean fast and instinctive access when on the peg.',
  },
  'shooting-gilet': {
    id: 51,
    name: 'Northwood Shooting Gilet',
    brand: 'Holland & Holland',
    price: '£595.00',
    colour: 'Moss',
    category: 'Shooting',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productSrc: `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss1_3559071e-b608-4b11-b3c8-2fbee352c3ee_2000x.jpg`,
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss1_3559071e-b608-4b11-b3c8-2fbee352c3ee_2000x-nb2-2k-tryon.png`,
    description: 'A technical shooting gilet engineered for the field. Crafted in Northwood tweed with a warm quilted lining, multiple cartridge and utility pockets, and a clean silhouette that transitions effortlessly from shoot to town.',
  },
  'silk-tie': {
    id: 52,
    name: 'Harrow Silk Woven Tie — Flying Mallard',
    brand: 'Holland & Holland',
    price: '£145.00',
    colour: 'Flying Mallard',
    category: 'Accessories',
    sizes: ['One Size'],
    productSrc: `${BASE}/HARROWSILKWOVENTIE-FLYING MALLARD/CLO-TIE1_0019copy_891e3c7b-ede9-4f60-bfea-ed8469bcc636_2000x.jpg`,
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/HARROWSILKWOVENTIE-FLYING MALLARD/CLO-TIE1_0012copy_424f6bcb-c50d-4cea-ad7a-f29e25eb3a54_2000x.jpg-nb2-2k-tryon.png`,
    description: "An exquisitely woven silk tie from Holland & Holland's Harrow collection. The Flying Mallard motif is a signature of the brand's fieldsports heritage, rendered in rich tones on a fine silk ground.",
  },
  'tweed-cap': {
    id: 53,
    name: 'Harrow Tweed Panel Cap',
    brand: 'Holland & Holland',
    price: '£165.00',
    colour: 'Honeysuckle',
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    productSrc: `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE3_803857ee-98b1-4b02-844a-21b79cc2f051_2000x.jpg`,
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE1_bd7c83e1-f236-4582-a0ff-230af9275c94_2000x.jpg-nb2-2k-tryon.png`,
    description: "A classically proportioned panel cap in Holland & Holland's signature Harrow tweed. Finished with a leather sweatband and a subtle H&H embossed lining. The perfect complement to any country ensemble.",
  },
};

// ─── Animation State Machine ──────────────────────────────────────────────────

type AnimationState =
  | 'idle'
  | 'cursor_to_button'
  | 'click_button'
  | 'popup_open'
  | 'cursor_to_face'
  | 'click_face'
  | 'show_upload_modal'
  | 'click_photo_library'
  | 'face_uploaded'
  | 'cursor_to_body'
  | 'click_body'
  | 'show_upload_modal_2'
  | 'click_photo_library_2'
  | 'body_uploaded'
  | 'loading'
  | 'result';

const ANIMATION_SEQUENCE: { state: AnimationState; duration: number }[] = [
  { state: 'idle',                  duration: 500 },
  { state: 'cursor_to_button',      duration: 1200 },
  { state: 'click_button',          duration: 500 },
  { state: 'popup_open',            duration: 800 },
  { state: 'cursor_to_face',        duration: 1000 },
  { state: 'click_face',            duration: 400 },
  { state: 'show_upload_modal',     duration: 1500 },
  { state: 'click_photo_library',   duration: 800 },
  { state: 'face_uploaded',         duration: 800 },
  { state: 'cursor_to_body',        duration: 1000 },
  { state: 'click_body',            duration: 400 },
  { state: 'show_upload_modal_2',   duration: 1500 },
  { state: 'click_photo_library_2', duration: 800 },
  { state: 'body_uploaded',         duration: 3800 },
  { state: 'loading',               duration: 4000 },
  { state: 'result',                duration: 0 },
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

function isPopupVisible(s: AnimationState) {
  return ['popup_open','cursor_to_face','click_face','show_upload_modal','click_photo_library',
    'face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2',
    'body_uploaded','loading','result'].includes(s);
}
function isFaceUploaded(s: AnimationState) {
  return ['face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2',
    'body_uploaded','loading','result'].includes(s);
}
function isBodyUploaded(s: AnimationState) {
  return ['body_uploaded','loading','result'].includes(s);
}
function isUploadModalVisible(s: AnimationState) {
  return ['show_upload_modal','click_photo_library','show_upload_modal_2','click_photo_library_2'].includes(s);
}
function isLoadingState(s: AnimationState) { return s === 'loading'; }
function isResultState(s: AnimationState) { return s === 'result'; }
function isCursorVisible(s: AnimationState) {
  return ['cursor_to_button','click_button','cursor_to_face','click_face','click_photo_library',
    'cursor_to_body','click_body','click_photo_library_2'].includes(s);
}

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

// ─── Main Demo Page ───────────────────────────────────────────────────────────

interface HHDemoPageProps {
  productSlug: keyof typeof HH_PRODUCTS;
}

const HollandHollandDemoPage: React.FC<HHDemoPageProps> = ({ productSlug }) => {
  const product = HH_PRODUCTS[productSlug];

  const [animationActive, setAnimationActive] = useState(false);
  const [forcedResult, setForcedResult] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const tryOnButtonRef = useRef<HTMLButtonElement>(null);
  const faceUploadRef = useRef<HTMLDivElement>(null);
  const bodyUploadRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const seqState = useAnimationSequence(animationActive);
  const animState: AnimationState = forcedResult ? 'result' : seqState;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
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

  const handleTryOnClick = () => {
    setForcedResult(false);
    setAnimationActive(false);
    setTimeout(() => setAnimationActive(true), 50);
  };

  const handleSkip = () => {
    setAnimationActive(false);
    setForcedResult(true);
  };

  const handleRestart = () => {
    setForcedResult(false);
    setAnimationActive(false);
    setTimeout(() => setAnimationActive(true), 50);
  };

  return (
    <div className="min-h-screen bg-white overflow-auto">

      {/* Animated Cursor */}
      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} visible={isCursorVisible(animState)} clicking={isClicking} />

      {/* ── Header — H&H branded ── */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium">
              <span className="text-gray-400">SHOOTING</span>
              <span className="text-gray-400">CLOTHING</span>
              <span className="text-gray-400">ACCESSORIES</span>
              <span className="text-gray-400">GIFTS</span>
            </nav>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-base sm:text-lg tracking-[0.12em] font-light text-gray-900 whitespace-nowrap">
              HOLLAND & HOLLAND
            </span>
            <div className="flex items-center gap-4" />
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <span>Clothing</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* ── Product Content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">

          {/* Left — Product Image */}
          <div className="flex justify-center">
            <div className="relative bg-gray-50 overflow-hidden w-full lg:w-full max-h-[40vh] lg:max-h-none">
              <div className="relative aspect-[3/4] max-h-[40vh] lg:max-h-none mx-auto">
                <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col lg:pt-0">
            <h1 className="text-[13px] tracking-[0.15em] font-normal uppercase mb-1">
              {product.name.toUpperCase()}
            </h1>
            <p className="text-[12px] tracking-[0.1em] text-gray-400 uppercase mb-4">{product.colour}</p>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px]">{product.price}</span>
            </div>

            {/* Size selector */}
            <div className="mb-5">
              <div className="flex justify-between mb-2">
                <span className="text-[11px] tracking-[0.1em] text-gray-800 uppercase">Size</span>
                <span className="text-[11px] tracking-[0.1em] text-gray-400 cursor-default">Size & Fit Guide</span>
              </div>
              <div className="flex items-center justify-between border border-gray-300 px-3 py-2.5 cursor-default">
                <span className="text-[13px] text-gray-800">Size: {product.sizes[Math.min(1, product.sizes.length - 1)]}</span>
                <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            {/* VIRTUAL TRY-ON — primary CTA */}
            <button
              ref={tryOnButtonRef}
              onClick={handleTryOnClick}
              className={`w-full bg-[#1B3A2D] text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium flex items-center justify-center gap-3 mb-1 transition-all shadow-[0_0_20px_rgba(27,58,45,0.35)] ${
                animState === 'click_button' ? 'scale-95 shadow-[0_0_35px_rgba(27,58,45,0.65)]' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              VIRTUAL TRY-ON
              <span className="text-[10px] border border-white/40 px-2 py-0.5 tracking-wider">New</span>
            </button>
            <p className="text-[11px] text-gray-500 text-center mb-6">
              Upload your photo and see yourself in this item
            </p>

            {/* ADD TO BAG */}
            <div className="flex gap-0 mb-6">
              <button className="flex-1 border border-black py-4 px-6 text-[12px] tracking-[0.15em] font-medium text-center cursor-default">
                ADD TO BAG
              </button>
              <button className="border border-black border-l-0 px-4 flex items-center justify-center cursor-default">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Description */}
            <div className="border-t border-gray-200 pt-6">
              <p className="text-[12px] text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Try-On Popup Overlay ── */}
      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(32,32,32,0.5)', fontFamily: "'Jost', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Subtle skip link */}
            {!isResultState(animState) && (
              <button
                onClick={handleSkip}
                style={{
                  position: 'absolute', top: '14px', right: '16px',
                  fontSize: '11px', color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none',
                  cursor: 'pointer', letterSpacing: '0.04em', fontFamily: 'sans-serif', textDecoration: 'underline',
                }}
              >
                skip to result →
              </button>
            )}

            <motion.div
              className="relative shadow-2xl overflow-hidden"
              style={{ width: '768px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#fff', borderRadius: '0px' }}
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.25 }}
            >

              {/* ── UPLOAD SCREEN ── */}
              {!isLoadingState(animState) && !isResultState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  {/* Top Bar */}
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff',
                  }}>
                    <div style={{
                      display: 'flex', flexDirection: 'row', alignItems: 'center',
                      padding: '0px 16px', gap: '8px', height: '48px',
                      borderRight: '1px solid #D1D5DC', minWidth: '113px',
                    }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 400, color: '#101828', whiteSpace: 'nowrap' }}>My looks</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '0px' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px',
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>10 credits left</span>
                      </div>
                      {/* No close button on standalone page */}
                      <div style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC' }} />
                    </div>
                  </div>

                  {/* Body — two panel */}
                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left — product image */}
                    <div style={{
                      width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB',
                      position: 'relative', display: isMobile ? 'none' : 'block',
                    }}>
                      <img src={product.productSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', height: '29.83px', backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid #D1D5DC' }}>
                        <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {product.sizes[Math.min(1, product.sizes.length - 1)]}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>

                    {/* Right — upload form */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ padding: '0px 0px 0', display: 'flex', flexDirection: 'column', gap: '32px', flex: 1, paddingTop: '0px' }}>
                        <div style={{ padding: '24px 24px 0' }}>
                          <p style={{ fontSize: '30px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '36px' }}>
                            TRY IT ON, VIRTUALLY
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          {/* Face photo */}
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Face photo</p>
                          <div
                            ref={faceUploadRef}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                              padding: '16px', gap: '20px', backgroundColor: '#F9FAFB',
                              borderBottom: '1px solid #D1D5DC', cursor: 'pointer',
                              marginLeft: '24px', marginRight: '24px',
                            }}
                          >
                            {isFaceUploaded(animState) ? (
                              <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={product.faceSrc} alt="Face" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0px', lineHeight: '24px' }}>
                                {isFaceUploaded(animState) ? 'Face photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {isFaceUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>

                          <div style={{ height: '32px' }} />

                          {/* Full body photo */}
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Full body photo</p>
                          <div
                            ref={bodyUploadRef}
                            style={{
                              display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                              padding: '16px', gap: '20px', backgroundColor: '#F9FAFB',
                              borderBottom: '1px solid #D1D5DC', cursor: 'pointer',
                              marginLeft: '24px', marginRight: '24px',
                            }}
                          >
                            {isBodyUploaded(animState) ? (
                              <div style={{ position: 'relative', flexShrink: 0 }}>
                                <img src={product.bodySrc} alt="Body" style={{ width: '40px', height: '40px', objectFit: 'cover' }} />
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
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0px', lineHeight: '24px' }}>
                                {isBodyUploaded(animState) ? 'Full body photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {isBodyUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Terms + Try on button */}
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 24px', display: 'flex', alignItems: 'center' }}>
                          <p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '16px' }}>
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
                            border: 'none', borderRadius: '0px', cursor: 'not-allowed',
                            fontFamily: "'Jost', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          }}
                        >
                          {isBodyUploaded(animState) ? (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" className="animate-spin">
                                <circle cx="12" cy="12" r="10" stroke="#D1D5DC" strokeOpacity="0.5" />
                                <path d="M12 2a10 10 0 0110 10" stroke="#D1D5DC" strokeOpacity="0.9" />
                              </svg>
                              Try on
                            </>
                          ) : (
                            <>
                              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="#D1D5DC" />
                                <path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#D1D5DC" />
                              </svg>
                              Try on
                            </>
                          )}
                        </button>
                      </div>

                      {/* Footer */}
                      <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                        <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LOADING SCREEN ── */}
              {isLoadingState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                    </div>
                  </div>
                  <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', textAlign: 'center' }}>
                    <p style={{ fontSize: '26px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#101828', marginBottom: '32px' }}>GETTING DRESSED!</p>
                    <img src="/hanger.jpg" alt="Loading" style={{ width: '72px', height: '72px', objectFit: 'contain', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}>
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '0ms', display: 'inline-block' }} />
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '150ms', display: 'inline-block' }} />
                      <span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '300ms', display: 'inline-block' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '0 10px', height: '29.83px', backgroundColor: '#F3F4F6', border: '1px solid #E5E7EB' }}>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {product.sizes[Math.min(1, product.sizes.length - 1)]}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── RESULT SCREEN ── */}
              {isResultState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '12px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                    </div>
                    <button
                      onClick={handleRestart}
                      style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #D1D5DC', cursor: 'pointer', flexShrink: 0 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path d="M1 1l12 12M13 1L1 13" />
                      </svg>
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: '75vh' }}>
                    <div style={{ width: '341px', maxWidth: '100%', backgroundColor: '#fff', border: '1px solid #E5E7EB', position: 'relative' }}>
                      <button
                        onClick={() => setFullscreenImage(true)}
                        style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in', position: 'relative' }}
                      >
                        <img src={product.afterSrc} alt="Try-on result" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '6px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', backgroundColor: 'rgba(255,255,255,0.9)', padding: '3px 8px', border: '1px solid #D1D5DC' }}>
                            {product.brand}
                          </span>
                        </div>
                      </button>

                      <div style={{ padding: '12px 12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '0 12px', height: '44px', width: '100%', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {product.sizes[Math.min(1, product.sizes.length - 1)]}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>

                      <div style={{ padding: '12px' }}>
                        <button
                          style={{ display: 'block', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#1E2939', textAlign: 'center', fontFamily: "'Jost', sans-serif", boxSizing: 'border-box', border: 'none', cursor: 'default' }}
                        >
                          Add to Cart
                        </button>
                        <a
                          href="https://calendly.com/mail-renderedfits/15-minute-meeting"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7282', backgroundColor: '#fff', textAlign: 'center', textDecoration: 'none', fontFamily: "'Jost', sans-serif", marginTop: '6px', border: '1px solid #E5E7EB', boxSizing: 'border-box' }}
                        >
                          Schedule a Meeting
                        </a>
                      </div>
                    </div>
                  </div>

                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── Upload Modal Overlay ── */}
              <AnimatePresence>
                {isUploadModalVisible(animState) && (
                  <motion.div
                    ref={overlayContainerRef}
                    className="absolute inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.img
                      src={isMobile ? '/result-images/phoneupload.PNG' : '/result-images/desktopupload.png'}
                      alt="Upload dialog"
                      className="max-w-[85%] sm:max-w-[60%] max-h-[70%] object-contain rounded-xl shadow-2xl"
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Result Viewer ── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <button onClick={() => setFullscreenImage(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              src={product.afterSrc}
              alt="Try-on result fullscreen"
              className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HollandHollandDemoPage;
