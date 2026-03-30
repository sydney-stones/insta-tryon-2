/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Standalone Allude demo page.
 * Styled as a luxury knitwear ecommerce page.
 * Each product has multiple gallery images that can be cycled — demonstrating
 * how Rendered Fits works with combinations of product shots.
 * Animation starts on manual "AI TRY ON" button click.
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
  composition: string;
  sizes: string[];
  defaultSize: string;
  // Multiple product gallery images the user can cycle through
  gallerySrcs: string[];
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  description: string;
}

export const ALLUDE_PRODUCTS: Record<string, DemoProduct> = {
  'white-jumper': {
    id: 70,
    name: 'Cashmere Rollneck Jumper',
    brand: 'Allude',
    price: '€595',
    colour: 'White',
    composition: '100% Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    defaultSize: 'S',
    gallerySrcs: [
      '/result-images/Allude/allude1.webp',
      '/result-images/Allude/allude2copy.webp',
    ],
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Allude/allude-white.png',
    description: 'A classic cashmere rollneck in pure white — the foundation of any refined wardrobe. Allude\'s signature fine-gauge knit offers exceptional softness with a clean, elegant silhouette.',
  },
  'yellow-jumper': {
    id: 71,
    name: 'Cashmere Crewneck Jumper',
    brand: 'Allude',
    price: '€545',
    colour: 'Yellow',
    composition: '100% Cashmere',
    sizes: ['XS', 'S', 'M', 'L'],
    defaultSize: 'S',
    gallerySrcs: [
      '/result-images/Allude/allude6.webp',
      '/result-images/Allude/allude7.webp',
    ],
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/Allude/allude-yellow.png',
    description: 'A vibrant cashmere crewneck in warm yellow — effortlessly elevated colour for every season. Cut in Allude\'s relaxed-yet-refined fit with ribbed cuffs and hem.',
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

const AnimatedCursor: React.FC<{ x: number; y: number; visible: boolean; clicking: boolean }> = ({ x, y, visible, clicking }) => (
  <AnimatePresence>
    {visible && (
      <motion.div className="fixed pointer-events-none" style={{ zIndex: 9999 }}
        initial={{ opacity: 0, x, y }}
        animate={{ opacity: 1, x, y, scale: clicking ? [1, 0.8, 1] : 1 }}
        exit={{ opacity: 0 }}
        transition={{ x: { type: 'tween', duration: 0.8, ease: 'easeInOut' }, y: { type: 'tween', duration: 0.8, ease: 'easeInOut' }, scale: { duration: 0.3 }, opacity: { duration: 0.2 } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface AlludeDemoPageProps {
  productSlug: keyof typeof ALLUDE_PRODUCTS;
}

const AlludeDemoPage: React.FC<AlludeDemoPageProps> = ({ productSlug }) => {
  const product = ALLUDE_PRODUCTS[productSlug];

  const [animationActive, setAnimationActive] = useState(false);
  const [forcedResult, setForcedResult] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.defaultSize);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  const tryOnButtonRef = useRef<HTMLButtonElement>(null);
  const faceUploadRef = useRef<HTMLDivElement>(null);
  const bodyUploadRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const seqState = useAnimationSequence(animationActive);
  const animState: AnimationState = forcedResult ? 'result' : seqState;

  // Reset gallery index when product changes
  useEffect(() => {
    setActiveGalleryIndex(0);
  }, [productSlug]);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const updateCursorPosition = useCallback(() => {
    let targetEl: HTMLElement | null = null;
    if (animState === 'cursor_to_button' || animState === 'click_button') targetEl = tryOnButtonRef.current;
    else if (animState === 'cursor_to_face' || animState === 'click_face') targetEl = faceUploadRef.current;
    else if (animState === 'cursor_to_body' || animState === 'click_body') targetEl = bodyUploadRef.current;
    else if (animState === 'click_photo_library' || animState === 'click_photo_library_2') {
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

  const handleSkip = () => { setAnimationActive(false); setForcedResult(true); };
  const handleRestart = () => { setForcedResult(false); setAnimationActive(false); setTimeout(() => setAnimationActive(true), 50); };

  const mainImageSrc = product.gallerySrcs[activeGalleryIndex];

  return (
    <div className="min-h-screen bg-white overflow-auto">

      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} visible={isCursorVisible(animState)} clicking={isClicking} />

      {/* ── Header ── */}
      <header style={{ borderBottom: '1px solid #e0dbd5', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 40 }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', height: '64px' }}>
          <nav style={{ display: 'flex', gap: '28px', marginRight: 'auto' }}>
            {['NEW IN', 'KNITWEAR', 'JACKETS', 'TROUSERS', 'SALE'].map(item => (
              <span key={item} style={{ fontSize: '11px', fontWeight: 400, letterSpacing: '0.12em', color: '#2a2a2a', cursor: 'default', textTransform: 'uppercase' }}>{item}</span>
            ))}
          </nav>
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
            <span style={{ fontSize: '20px', fontWeight: 300, letterSpacing: '0.22em', color: '#1a1a1a', textTransform: 'uppercase' }}>ALLUDE</span>
          </div>
          <div style={{ display: 'flex', gap: '20px', marginLeft: 'auto', alignItems: 'center' }}>
            <svg width="18" height="18" fill="none" stroke="#2a2a2a" strokeWidth="1.5" viewBox="0 0 24 24" style={{ cursor: 'default' }}><circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/></svg>
            <svg width="18" height="18" fill="none" stroke="#2a2a2a" strokeWidth="1.5" viewBox="0 0 24 24" style={{ cursor: 'default' }}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <svg width="18" height="18" fill="none" stroke="#2a2a2a" strokeWidth="1.5" viewBox="0 0 24 24" style={{ cursor: 'default' }}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '14px 24px' }}>
        <nav style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#999', letterSpacing: '0.06em' }}>
          <span>Home</span><span>/</span>
          <span>Knitwear</span><span>/</span>
          <span style={{ color: '#2a2a2a' }}>{product.name}</span>
        </nav>
      </div>

      {/* ── Product Layout ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px 80px', display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 440px', gap: isMobile ? '32px' : '64px', alignItems: 'start' }}>

        {/* Left — Gallery */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {/* Thumbnail strip */}
          {!isMobile && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '72px', flexShrink: 0 }}>
              {product.gallerySrcs.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGalleryIndex(i)}
                  style={{
                    width: '72px', height: '90px', padding: 0, border: 'none', cursor: 'pointer',
                    outline: activeGalleryIndex === i ? '2px solid #1a1a1a' : '1px solid #e0dbd5',
                    outlineOffset: '-1px',
                    overflow: 'hidden', backgroundColor: '#f5f2ef', flexShrink: 0,
                  }}
                >
                  <img src={src} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}

          {/* Main image */}
          <div style={{ flex: 1, backgroundColor: '#f5f2ef', overflow: 'hidden', aspectRatio: '3/4' }}>
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

          {/* Mobile dot indicators */}
          {isMobile && (
            <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', marginTop: '10px' }}>
              {product.gallerySrcs.map((_, i) => (
                <button key={i} onClick={() => setActiveGalleryIndex(i)} style={{
                  width: '6px', height: '6px', borderRadius: '50%', border: 'none', cursor: 'pointer', padding: 0,
                  backgroundColor: activeGalleryIndex === i ? '#1a1a1a' : '#ccc',
                }} />
              ))}
            </div>
          )}
        </div>

        {/* Right — Product Info */}
        <div style={{ paddingTop: '8px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.18em', color: '#888', textTransform: 'uppercase', margin: '0 0 8px 0' }}>{product.brand}</p>
          <h1 style={{ fontSize: '22px', fontWeight: 300, letterSpacing: '0.04em', color: '#1a1a1a', margin: '0 0 16px 0' }}>
            {product.name}
          </h1>

          {/* Price */}
          <p style={{ fontSize: '18px', fontWeight: 400, color: '#1a1a1a', margin: '0 0 24px 0' }}>{product.price}</p>

          {/* Colour */}
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#2a2a2a', margin: '0 0 10px 0', textTransform: 'uppercase' }}>
              Colour: <strong>{product.colour}</strong>
            </p>
          </div>

          {/* Size */}
          <div style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <p style={{ fontSize: '12px', letterSpacing: '0.08em', color: '#2a2a2a', margin: 0, textTransform: 'uppercase' }}>
                Size: <strong>{selectedSize}</strong>
              </p>
              <span style={{ fontSize: '11px', color: '#888', textDecoration: 'underline', cursor: 'default', letterSpacing: '0.06em' }}>Size guide</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {product.sizes.map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  style={{
                    width: '48px', height: '48px', fontSize: '12px', fontWeight: 400, cursor: 'pointer',
                    letterSpacing: '0.06em',
                    border: selectedSize === s ? '1.5px solid #1a1a1a' : '1px solid #d0cac3',
                    backgroundColor: selectedSize === s ? '#1a1a1a' : '#fff',
                    color: selectedSize === s ? '#fff' : '#2a2a2a',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* AI TRY ON */}
          <button
            ref={tryOnButtonRef}
            onClick={handleTryOnClick}
            className={`${animState === 'click_button' ? 'scale-95' : ''}`}
            style={{
              width: '100%', padding: '16px', fontSize: '12px', fontWeight: 400,
              letterSpacing: '0.14em', textTransform: 'uppercase', color: '#fff',
              backgroundColor: '#2a2a2a', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
              marginBottom: '10px', transition: 'transform 0.1s',
            }}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
            </svg>
            AI Try On
          </button>
          <p style={{ fontSize: '11px', color: '#999', textAlign: 'center', margin: '0 0 14px 0', letterSpacing: '0.04em' }}>Upload your photo and see yourself in this piece</p>

          {/* ADD TO BAG */}
          <button style={{
            width: '100%', padding: '16px', fontSize: '12px', fontWeight: 400,
            letterSpacing: '0.14em', textTransform: 'uppercase', color: '#2a2a2a',
            backgroundColor: '#fff', border: '1px solid #2a2a2a', cursor: 'default', marginBottom: '24px',
          }}>
            Add to Bag
          </button>

          {/* Composition */}
          <div style={{ borderTop: '1px solid #e0dbd5', paddingTop: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', margin: '0 0 8px 0' }}>Composition</p>
            <p style={{ fontSize: '13px', color: '#444', margin: '0 0 16px 0' }}>{product.composition}</p>
          </div>

          {/* Description */}
          <div style={{ borderTop: '1px solid #e0dbd5', paddingTop: '20px' }}>
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#888', textTransform: 'uppercase', margin: '0 0 8px 0' }}>About</p>
            <p style={{ fontSize: '13px', color: '#444', lineHeight: '1.75', margin: 0 }}>{product.description}</p>
          </div>
        </div>
      </div>

      {/* ── Try-On Popup Overlay ── */}
      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(32,32,32,0.5)', fontFamily: "'Jost', sans-serif" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
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
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', height: '48px', borderRight: '1px solid #D1D5DC', minWidth: '113px' }}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', color: '#101828', whiteSpace: 'nowrap' }}>My looks</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px' }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>10 credits left</span>
                      </div>
                      <div style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left — product image (uses active gallery image) */}
                    <div style={{ width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB', position: 'relative', display: isMobile ? 'none' : 'block' }}>
                      <img src={mainImageSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', height: '29.83px', backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid #D1D5DC' }}>
                        <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                      </div>
                    </div>

                    {/* Right �� upload form */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                        <div style={{ padding: '24px 24px 0' }}>
                          <p style={{ fontSize: '30px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '36px' }}>
                            TRY IT ON, VIRTUALLY
                          </p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Face photo</p>
                          <div ref={faceUploadRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}>
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
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '24px' }}>
                                {isFaceUploaded(animState) ? 'Face photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {isFaceUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>

                          <div style={{ height: '32px' }} />

                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Full body photo</p>
                          <div ref={bodyUploadRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}>
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
                            <div>
                              <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '24px' }}>
                                {isBodyUploaded(animState) ? 'Full body photo uploaded' : 'Upload your photo here'}
                              </p>
                              <p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>
                                {isBodyUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}
                              </p>
                            </div>
                          </div>
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
                        <button disabled style={{
                          width: '100%', height: '48px', fontSize: '14px', fontWeight: 400,
                          color: isBodyUploaded(animState) ? '#fff' : '#D1D5DC',
                          backgroundColor: isBodyUploaded(animState) ? '#1E2939' : '#6A7282',
                          border: 'none', cursor: 'not-allowed', fontFamily: "'Jost', sans-serif",
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                        }}>
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
                              </svg>
                              Try on
                            </>
                          )}
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

              {/* ── LOADING SCREEN ── */}
              {isLoadingState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '8px' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg>
                    <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                    <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
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
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                    </div>
                  </div>
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                  </div>
                </div>
              )}

              {/* ── RESULT SCREEN ── */}
              {isResultState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '12px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                    </div>
                    <button onClick={handleRestart} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #D1D5DC', cursor: 'pointer', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg>
                    </button>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: '75vh' }}>
                    <div style={{ width: '341px', maxWidth: '100%', backgroundColor: '#fff', border: '1px solid #E5E7EB', position: 'relative' }}>
                      <button onClick={() => setFullscreenImage(true)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in', position: 'relative' }}>
                        <img src={product.afterSrc} alt="Try-on result" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                      </button>

                      <div style={{ padding: '12px 12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '0 12px', height: '44px', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>

                      <div style={{ padding: '12px' }}>
                        <button style={{ display: 'block', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#1E2939', textAlign: 'center', fontFamily: "'Jost', sans-serif", boxSizing: 'border-box', border: 'none', cursor: 'default' }}>
                          Add to Bag
                        </button>
                        <a href="https://calendly.com/mail-renderedfits/15-minute-meeting" target="_blank" rel="noopener noreferrer"
                          style={{ display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7282', backgroundColor: '#fff', textAlign: 'center', textDecoration: 'none', fontFamily: "'Jost', sans-serif", marginTop: '6px', border: '1px solid #E5E7EB', boxSizing: 'border-box' }}>
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

              {/* ── Upload Modal ── */}
              <AnimatePresence>
                {isUploadModalVisible(animState) && (
                  <motion.div ref={overlayContainerRef} className="absolute inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <motion.img
                      src={isMobile ? '/result-images/phoneupload.PNG' : '/result-images/desktopupload.png'}
                      alt="Upload dialog" className="max-w-[85%] sm:max-w-[60%] max-h-[70%] object-contain rounded-xl shadow-2xl"
                      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Fullscreen Result ── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setFullscreenImage(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <motion.img src={product.afterSrc} alt="Try-on result fullscreen" className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlludeDemoPage;
