/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Standalone Holland & Holland demo pages.
 * Product page styled to match H&H website aesthetic.
 * Animation starts only on manual "Virtual Try-On" button click.
 * Subtle "skip to result" option shown once animation has started.
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Product Data ─────────────────────────────────────────────────────────────

interface HHProduct {
  id: number;
  name: string;
  price: string;
  colour: string;
  category: string;
  sizes: string[];
  description: string;
  productImages: string[];   // gallery images (first = hero)
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
}

const BASE = '/result-images/Holland&Holland';

export const HH_PRODUCTS: Record<string, HHProduct> = {
  'tweed-field-coat': {
    id: 50,
    name: 'NORTHWOOD TWEED FIELD COAT',
    price: '£1,095.00',
    colour: 'HAWTHORN',
    category: 'Shooting',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'The quintessential fieldsports essential. The Northwood tweed weatherproof field coat combines shooting features with timeless style. The action back allows for ease of swing and the large bellow cartridge pockets with tab retainer mean fast and instinctive access when on the peg.',
    productImages: [
      `${BASE}/NORTHWOODTWEEDFIELDCOAT/clo-fldcoat1hawthorn-frontcopy_377520b7-af93-4b2a-baa4-a0ab41ac4011_2000x.jpg`,
      `${BASE}/NORTHWOODTWEEDFIELDCOAT/clo-fldcoat1hawthorn-backcopy_1c6442ea-53a5-4063-801f-83f748e78e65_2000x.jpg`,
      `${BASE}/NORTHWOODTWEEDFIELDCOAT/clo-fldcoat1hawthorn-detailcopy_8213dca1-99de-471c-90e2-c0be7caa2bf1_2000x.jpg`,
    ],
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/NORTHWOODTWEEDFIELDCOAT/clo-fldcoat1hawthorn-backcopy_1c6442ea-53a5-4063-801f-83f748e78e65_2000x-nb2-2k-tryon.png`,
  },
  'shooting-gilet': {
    id: 51,
    name: 'NORTHWOOD SHOOTING GILET',
    price: '£595.00',
    colour: 'MOSS',
    category: 'Shooting',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    description: 'A technical shooting gilet engineered for the field. Crafted in Northwood tweed with a warm quilted lining, multiple cartridge and utility pockets, and a clean silhouette that transitions effortlessly from shoot to town.',
    productImages: [
      `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss1_3559071e-b608-4b11-b3c8-2fbee352c3ee_2000x.jpg`,
      `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss2_d8686d3f-f6d2-4d1f-b093-8762682eb181_2000x.jpg`,
      `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss4_b5e144c0-93cb-4f30-a8e2-c3edc2c146b4_2000x.jpg`,
    ],
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/NORTHWOODSHOOTINGGILET/CLO-SWEATER5GiletMoss1_3559071e-b608-4b11-b3c8-2fbee352c3ee_2000x-nb2-2k-tryon.png`,
  },
  'ladies-shirt': {
    id: 52,
    name: 'HARROW SILK WOVEN TIE',
    price: '£145.00',
    colour: 'FLYING MALLARD',
    category: 'Accessories',
    sizes: ['One Size'],
    description: 'An exquisitely woven silk tie from Holland & Holland\'s Harrow collection. The Flying Mallard motif is a signature of the brand\'s fieldsports heritage, rendered in rich tones on a fine silk ground.',
    productImages: [
      `${BASE}/HARROWSILKWOVENTIE-FLYINGMALLARD/CLO-TIE1_0019copy_891e3c7b-ede9-4f60-bfea-ed8469bcc636_2000x.jpg`,
      `${BASE}/HARROWSILKWOVENTIE-FLYINGMALLARD/CLO-TIE1_0012copy_424f6bcb-c50d-4cea-ad7a-f29e25eb3a54_2000x.jpg.webp`,
      `${BASE}/HARROWSILKWOVENTIE-FLYINGMALLARD/CLO-TIE1_0037copy_01367728-ff74-4de1-80cd-1c0f964b33f5_2000x.jpg.webp`,
    ],
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/HARROWSILKWOVENTIE-FLYINGMALLARD/CLO-TIE1_0012copy_424f6bcb-c50d-4cea-ad7a-f29e25eb3a54_2000x.jpg-nb2-2k-tryon.png`,
  },
  'tweed-cap': {
    id: 53,
    name: 'HARROW TWEED PANEL CAP',
    price: '£165.00',
    colour: 'HONEYSUCKLE',
    category: 'Accessories',
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A classically proportioned panel cap in Holland & Holland\'s signature Harrow tweed. Finished with a leather sweatband and a subtle H&H embossed lining. The perfect complement to any country ensemble.',
    productImages: [
      `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE1_bd7c83e1-f236-4582-a0ff-230af9275c94_2000x.jpg`,
      `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE2_c1db3b89-ed35-4efb-90b5-25c113ebc4a0_2000x.jpg`,
      `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE3_803857ee-98b1-4b02-844a-21b79cc2f051_2000x.jpg`,
    ],
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody Background Removed.png',
    afterSrc: `${BASE}/HARROWTWEEDPANELCAP/CLO-CAP2HONEYSUCKLE1_bd7c83e1-f236-4582-a0ff-230af9275c94_2000x.jpg-nb2-2k-tryon.png`,
  },
};

// ─── Animation State Machine ──────────────────────────────────────────────────

type AnimationState =
  | 'idle'
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
  { state: 'popup_open',          duration: 900 },
  { state: 'cursor_to_face',      duration: 1000 },
  { state: 'click_face',          duration: 400 },
  { state: 'show_upload_modal',   duration: 1500 },
  { state: 'click_photo_library', duration: 800 },
  { state: 'face_uploaded',       duration: 800 },
  { state: 'cursor_to_body',      duration: 1000 },
  { state: 'click_body',          duration: 400 },
  { state: 'show_upload_modal_2', duration: 1500 },
  { state: 'click_photo_library_2', duration: 800 },
  { state: 'body_uploaded',       duration: 3800 },
  { state: 'loading',             duration: 4000 },
  { state: 'result',              duration: 0 },
];

function useAnimationSequence(active: boolean): { state: AnimationState; jumpToResult: () => void } {
  const [state, setState] = useState<AnimationState>('idle');
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const jumpToResult = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setState('result');
  };

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

  return { state, jumpToResult };
}

function isPopupVisible(s: AnimationState) {
  return s !== 'idle';
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
  return ['cursor_to_face','click_face','click_photo_library',
    'cursor_to_body','click_body','click_photo_library_2'].includes(s);
}

// ─── Cursor ───────────────────────────────────────────────────────────────────

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
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

// ─── Main Component ───────────────────────────────────────────────────────────

interface HHDemoPageProps {
  productSlug: keyof typeof HH_PRODUCTS;
}

const HollandHollandDemoPage: React.FC<HHDemoPageProps> = ({ productSlug }) => {
  const product = HH_PRODUCTS[productSlug];

  const [animationActive, setAnimationActive] = useState(false);
  const { state: animState, jumpToResult } = useAnimationSequence(animationActive);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] ?? product.sizes[0]);

  const faceUploadRef = useRef<HTMLDivElement>(null);
  const bodyUploadRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Drive cursor position based on anim state
  useEffect(() => {
    const getCenter = (ref: React.RefObject<HTMLElement | null>) => {
      if (!ref.current) return null;
      const r = ref.current.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    };
    if (animState === 'cursor_to_face' || animState === 'click_face') {
      const c = getCenter(faceUploadRef);
      if (c) setCursorPos(c);
    } else if (animState === 'cursor_to_body' || animState === 'click_body') {
      const c = getCenter(bodyUploadRef);
      if (c) setCursorPos(c);
    }
  }, [animState]);

  const handleTryOnClick = () => {
    setAnimationActive(false);
    setTimeout(() => setAnimationActive(true), 50);
  };

  const handleClose = () => {
    setAnimationActive(false);
  };

  // H&H brand colours
  const green = '#1B3A2D';
  const cream = '#F5F3EF';

  return (
    <div className="min-h-screen" style={{ backgroundColor: cream, fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Header ── */}
      <header style={{ backgroundColor: '#fff', borderBottom: '1px solid #D8D3CB' }}>
        {/* Top utility bar */}
        <div style={{ backgroundColor: green, height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', padding: '0 32px', gap: '20px' }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.12em', fontFamily: "'Arial', sans-serif" }}>OUR STORES</span>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '10px', letterSpacing: '0.12em', fontFamily: "'Arial', sans-serif" }}>CONTACT</span>
        </div>
        {/* Main header */}
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
            <nav style={{ display: 'flex', gap: '28px' }}>
              {['SHOOTING', 'CLOTHING', 'ACCESSORIES', 'GIFTS'].map(item => (
                <span key={item} style={{ fontSize: '11px', letterSpacing: '0.14em', color: '#2C2C2C', fontFamily: "'Arial', sans-serif", cursor: 'default' }}>{item}</span>
              ))}
            </nav>
            {/* Logo */}
            <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '18px', letterSpacing: '0.18em', fontWeight: 400, color: '#1a1a1a', whiteSpace: 'nowrap' }}>HOLLAND & HOLLAND</div>
              </div>
            </div>
            {/* Right icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Search */}
              <svg width="18" height="18" fill="none" stroke="#2C2C2C" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="7"/><path d="M16.5 16.5L21 21" strokeLinecap="round"/>
              </svg>
              {/* Account */}
              <svg width="18" height="18" fill="none" stroke="#2C2C2C" strokeWidth="1.5" viewBox="0 0 24 24">
                <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
              </svg>
              {/* Bag */}
              <svg width="18" height="18" fill="none" stroke="#2C2C2C" strokeWidth="1.5" viewBox="0 0 24 24">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
            </div>
          </div>
        </div>
        {/* Sub-nav */}
        <div style={{ borderTop: '1px solid #E8E4DC', padding: '10px 32px', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '11px', color: '#888', fontFamily: "'Arial', sans-serif", letterSpacing: '0.04em' }}>
            <span>Clothing</span>
            <span>/</span>
            <span>{product.category}</span>
            <span>/</span>
            <span style={{ color: '#2C2C2C' }}>{product.name}</span>
          </div>
        </div>
      </header>

      {/* ── Product Layout ── */}
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '32px 32px 64px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: isMobile ? '24px' : '48px', alignItems: 'start' }}>

          {/* Left — Image Gallery */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {/* Thumbnails */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
              {product.productImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  style={{
                    width: '72px', height: '72px', border: selectedImage === i ? `2px solid ${green}` : '2px solid transparent',
                    background: '#fff', padding: 0, cursor: 'pointer', overflow: 'hidden',
                  }}
                >
                  <img src={src} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
            {/* Main image */}
            <div style={{ flex: 1, backgroundColor: '#ECEAE4', position: 'relative', aspectRatio: '3/4', overflow: 'hidden' }}>
              <img
                src={product.productImages[selectedImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              {/* Plus icon top-right (decorative, matching H&H) */}
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '28px', height: '28px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="12" height="12" fill="none" stroke="#2C2C2C" strokeWidth="2"><path d="M6 1v10M1 6h10"/></svg>
              </div>
            </div>
          </div>

          {/* Right — Product Info */}
          <div style={{ paddingTop: isMobile ? 0 : '8px' }}>
            {/* Name */}
            <h1 style={{ fontSize: '14px', fontWeight: 400, letterSpacing: '0.12em', color: '#1a1a1a', fontFamily: "'Arial', sans-serif", margin: '0 0 8px 0', lineHeight: 1.4 }}>
              {product.name}
            </h1>
            {/* Price */}
            <p style={{ fontSize: '15px', fontWeight: 400, color: '#1a1a1a', margin: '0 0 6px 0', fontFamily: "'Arial', sans-serif" }}>
              {product.price}
            </p>
            {/* Colour */}
            <p style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#666', margin: '0 0 24px 0', fontFamily: "'Arial', sans-serif" }}>
              {product.colour}
            </p>

            {/* Size */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#1a1a1a', fontFamily: "'Arial', sans-serif" }}>SIZE</span>
                <span style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#888', fontFamily: "'Arial', sans-serif", cursor: 'default' }}>Size & Fit Guide</span>
              </div>
              {/* Size dropdown (decorative) */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                border: '1px solid #C8C3BB', padding: '10px 14px', backgroundColor: '#fff', cursor: 'pointer',
              }}>
                <span style={{ fontSize: '13px', color: '#1a1a1a', fontFamily: "'Arial', sans-serif" }}>Size: {selectedSize}</span>
                <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
              </div>
            </div>

            {/* Virtual Try-On button — PRIMARY CTA */}
            <button
              onClick={handleTryOnClick}
              style={{
                width: '100%', padding: '14px', marginBottom: '10px',
                backgroundColor: green, color: '#fff',
                fontSize: '12px', letterSpacing: '0.15em', fontFamily: "'Arial', sans-serif",
                border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                transition: 'background-color 0.2s',
              }}
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/>
              </svg>
              VIRTUAL TRY-ON
            </button>
            <p style={{ fontSize: '11px', color: '#888', textAlign: 'center', margin: '0 0 16px 0', fontFamily: "'Arial', sans-serif" }}>
              See this piece on you before you buy
            </p>

            {/* Add to Bag */}
            <button style={{
              width: '100%', padding: '14px', marginBottom: '12px',
              backgroundColor: green, color: '#fff',
              fontSize: '12px', letterSpacing: '0.15em', fontFamily: "'Arial', sans-serif",
              border: 'none', cursor: 'default',
            }}>
              ADD TO BAG
            </button>

            {/* Description */}
            <div style={{ borderTop: '1px solid #D8D3CB', marginTop: '24px', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', cursor: 'default' }}>
                <span style={{ fontSize: '12px', letterSpacing: '0.1em', fontFamily: "'Arial', sans-serif", color: '#1a1a1a' }}>DESCRIPTION</span>
                <svg width="14" height="14" fill="none" stroke="#666" strokeWidth="1.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6"/></svg>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.7', color: '#444', fontFamily: "'Georgia', serif", margin: 0 }}>
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Try-On Popup Overlay ── */}
      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(20,20,20,0.55)', fontFamily: "'Jost', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Skip to result — subtle, top-right of overlay */}
            {!isResultState(animState) && (
              <button
                onClick={jumpToResult}
                style={{
                  position: 'absolute', top: '16px', right: '16px',
                  fontSize: '11px', color: 'rgba(255,255,255,0.5)', background: 'none', border: 'none',
                  cursor: 'pointer', letterSpacing: '0.06em', fontFamily: "'Arial', sans-serif",
                  textDecoration: 'underline',
                }}
              >
                skip to result →
              </button>
            )}

            <motion.div
              className="relative shadow-2xl overflow-hidden"
              style={{ width: '768px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#fff' }}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
                      <div style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px',
                      }}>
                        <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>10 credits left</span>
                      </div>
                      <button
                        onClick={handleClose}
                        style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC', background: '#F9FAFB', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5">
                          <path d="M1 1l12 12M13 1L1 13"/>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Body */}
                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    {/* Left — product image */}
                    {!isMobile && (
                      <div style={{ width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB', position: 'relative' }}>
                        <img src={product.productImages[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                        <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', height: '29.83px', backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid #D1D5DC' }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>
                    )}

                    {/* Right — upload form */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                      {/* Title */}
                      <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #F3F4F6' }}>
                        <p style={{ margin: 0, fontSize: 'clamp(15px, 2vw, 22px)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#101828', fontFamily: "'Jost', sans-serif", lineHeight: 1.2 }}>
                          TRY IT ON, VIRTUALLY
                        </p>
                      </div>

                      {/* Face upload */}
                      <div style={{ padding: '16px 20px 0' }}>
                        <span style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#101828', marginBottom: '6px' }}>Face photo</span>
                        <div
                          ref={faceUploadRef}
                          style={{
                            background: isFaceUploaded(animState) ? '#EEF4FF' : '#F9FAFB',
                            border: isFaceUploaded(animState) ? '1px solid #93C5FD' : '1px solid #D1D5DC',
                            borderBottom: '1px solid #D1D5DC',
                            padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                        >
                          {isFaceUploaded(animState) ? (
                            <img src={product.faceSrc} alt="Face" style={{ width: '44px', height: '44px', objectFit: 'cover', borderRadius: '50%', border: '2px solid #93C5FD', flexShrink: 0 }} />
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="1.2" style={{ flexShrink: 0 }}><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                          )}
                          <div>
                            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '13px', color: '#101828', margin: 0 }}>
                              {isFaceUploaded(animState) ? 'Photo uploaded ✓' : 'Upload your photo here'}
                            </p>
                            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: '#6A7282', margin: 0 }}>Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Body upload */}
                      <div style={{ padding: '16px 20px 0' }}>
                        <span style={{ display: 'block', fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#101828', marginBottom: '6px' }}>Full body photo</span>
                        <div
                          ref={bodyUploadRef}
                          style={{
                            background: isBodyUploaded(animState) ? '#EEF4FF' : '#F9FAFB',
                            border: isBodyUploaded(animState) ? '1px solid #93C5FD' : '1px solid #D1D5DC',
                            borderBottom: '1px solid #D1D5DC',
                            padding: '12px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer',
                            transition: 'all 0.3s',
                          }}
                        >
                          {isBodyUploaded(animState) ? (
                            <img src={product.bodySrc} alt="Body" style={{ width: '44px', height: '44px', objectFit: 'cover', objectPosition: 'top', border: '2px solid #93C5FD', flexShrink: 0 }} />
                          ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="1.2" style={{ flexShrink: 0 }}><circle cx="12" cy="4" r="2"/><line x1="12" y1="6" x2="12" y2="14"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="10" y1="14" x2="8" y2="20"/><line x1="14" y1="14" x2="16" y2="20"/></svg>
                          )}
                          <div>
                            <p style={{ fontFamily: "'Jost', sans-serif", fontWeight: 500, fontSize: '13px', color: '#101828', margin: 0 }}>
                              {isBodyUploaded(animState) ? 'Photo uploaded ✓' : 'Upload your photo here'}
                            </p>
                            <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '11px', color: '#6A7282', margin: 0 }}>Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                          </div>
                        </div>
                      </div>

                      {/* Terms */}
                      <div style={{ padding: '12px 20px 6px' }}>
                        <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '10px', color: '#6A7282', margin: 0, lineHeight: '14px' }}>
                          By uploading your photo, you agree to our <u>Terms &amp; Conditions</u> and <u>Privacy Policy</u>. Your image is never permanently stored.
                        </p>
                      </div>

                      {/* Try on button */}
                      <div style={{ marginTop: 'auto', padding: '12px 20px 16px' }}>
                        <div style={{
                          background: isBodyUploaded(animState) ? green : '#6A7282',
                          height: '42px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          transition: 'background 0.3s',
                        }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                            <path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill={isBodyUploaded(animState) ? '#fff' : '#D1D5DC'}/>
                          </svg>
                          <span style={{ fontFamily: "'Jost', sans-serif", fontSize: '12px', letterSpacing: '0.1em', color: isBodyUploaded(animState) ? '#fff' : '#D1D5DC' }}>
                            {isBodyUploaded(animState) ? 'Generating your try-on...' : 'Try on'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Powered by footer */}
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>
              )}

              {/* ── LOADING ── */}
              {isLoadingState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '520px', gap: '20px' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                    style={{ width: '44px', height: '44px', borderRadius: '50%', border: `3px solid #E5E7EB`, borderTopColor: green }}
                  />
                  <p style={{ fontFamily: "'Jost', sans-serif", fontSize: '13px', color: '#6A7282', letterSpacing: '0.06em' }}>Generating your try-on...</p>
                </div>
              )}

              {/* ── RESULT SCREEN ── */}
              {isResultState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column' }}>
                  {/* Top bar */}
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '12px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                      </svg>
                      <span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span>
                      <span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span>
                    </div>
                    <button
                      onClick={handleClose}
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
                        style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in' }}
                      >
                        <img src={product.afterSrc} alt="Try-on result" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} />
                        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 500, color: '#1a1a1a', backgroundColor: 'rgba(255,255,255,0.92)', padding: '3px 8px', border: '1px solid #D1D5DC', letterSpacing: '0.06em' }}>
                            H&H
                          </span>
                        </div>
                      </button>

                      <div style={{ padding: '12px 12px 0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px', backgroundColor: '#fff', border: '1px solid #E5E7EB', padding: '0 12px', height: '44px', width: '100%', boxSizing: 'border-box' }}>
                          <span style={{ fontSize: '12px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>Size: {selectedSize}</span>
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
                        </div>
                      </div>

                      <div style={{ padding: '12px' }}>
                        <button style={{
                          display: 'block', width: '100%', padding: '13px', fontSize: '12px', fontWeight: 500,
                          letterSpacing: '0.12em', textTransform: 'uppercase', color: '#fff',
                          backgroundColor: green, textAlign: 'center', fontFamily: "'Jost', sans-serif",
                          boxSizing: 'border-box', border: 'none', cursor: 'default',
                        }}>
                          ADD TO BAG
                        </button>
                        <a
                          href="https://calendly.com/mail-renderedfits/15-minute-meeting"
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 400,
                            letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7282', backgroundColor: '#fff',
                            textAlign: 'center', textDecoration: 'none', fontFamily: "'Jost', sans-serif",
                            marginTop: '6px', border: '1px solid #E5E7EB', boxSizing: 'border-box',
                          }}
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Upload Modal Overlay ── */}
      <AnimatePresence>
        {isUploadModalVisible(animState) && (
          <motion.div
            ref={overlayContainerRef}
            className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/40"
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

      {/* ── Animated Cursor ── */}
      <AnimatedCursor
        x={cursorPos.x}
        y={cursorPos.y}
        visible={isCursorVisible(animState)}
        clicking={['click_face', 'click_body', 'click_photo_library', 'click_photo_library_2'].includes(animState)}
      />

      {/* ── Fullscreen Image ── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setFullscreenImage(false)}
          >
            <motion.img
              src={product.afterSrc}
              alt="Try-on result fullscreen"
              className="max-h-full max-w-full object-contain"
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HollandHollandDemoPage;
