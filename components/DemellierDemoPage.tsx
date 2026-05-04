/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

/**
 * Standalone Demellier London demo page — pre-made example for sales calls.
 * Product page layout: gallery + thumbnails (desktop) / swipe carousel (mobile).
 * Animation is scripted (pre-made result), triggered by clicking AI TRY ON.
 * Uses Sienna (female) customer images.
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: string;
  category: string;
  sizes: string[];
  gallerySrcs: string[];
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  description: string;
  colourLabel: string;
  swatchColor: string;
  breadcrumbLabel: string;
  colourName: string;
}

export const DEMELLIER_PRODUCTS: Record<string, DemoProduct> = {
  'the-midi-stockholm': {
    id: 120,
    name: 'The Midi Stockholm',
    brand: 'DEMELLIER LONDON',
    price: '£450',
    category: 'Bags',
    sizes: ['One Size'],
    gallerySrcs: [
      '/result-images/demellierlondon/TheMidiStockholm/Screenshot-2026-04-24-at-12.04.46-pm.jpeg',
      '/result-images/demellierlondon/TheMidiStockholm/Screenshot-2026-04-24-at-12.05.01-pm.jpeg',
      '/result-images/demellierlondon/TheMidiStockholm/Screenshot-2026-04-24-at-12.05.10-pm.jpeg',
      '/result-images/demellierlondon/TheMidiStockholm/Screenshot-2026-04-24-at-12.05.21-pm.png',
    ],
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/demellierlondon/TheMidiStockholm/result.jpeg',
    description: 'The Midi Stockholm. A structured, considered bag with Demellier\'s clean lines and understated hardware — the kind of piece that elevates every outfit without competing with it.',
    colourLabel: 'Tan',
    swatchColor: '#B8956A',
    breadcrumbLabel: 'The Stockholm Collection',
    colourName: 'Mocha Suede & Mocha Smooth',
  },
  'the-siena-saddle': {
    id: 121,
    name: 'The Siena Saddle',
    brand: 'DEMELLIER LONDON',
    price: '£425',
    category: 'Bags',
    sizes: ['One Size'],
    gallerySrcs: [
      '/result-images/demellierlondon/TheSienaSaddle/Screenshot-2026-04-24-at-1.46.09-pm.png',
      '/result-images/demellierlondon/TheSienaSaddle/Screenshot-2026-04-24-at-1.46.17-pm.png',
      '/result-images/demellierlondon/TheSienaSaddle/Screenshot-2026-04-24-at-1.46.32-pm.png',
      '/result-images/demellierlondon/TheSienaSaddle/Screenshot-2026-04-24-at-1.46.40-pm.png',
    ],
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/demellierlondon/TheSienaSaddle/result.jpeg',
    description: 'The Siena Saddle. A relaxed, curved silhouette in a soft leather with adjustable strap — worn cross-body or over the shoulder, it moves with you.',
    colourLabel: 'Cognac',
    swatchColor: '#9B5E2A',
    breadcrumbLabel: 'The Siena Collection',
    colourName: 'Cognac Small Grain',
  },
  'the-florence': {
    id: 122,
    name: 'The Florence',
    brand: 'DEMELLIER LONDON',
    price: '£540',
    category: 'Bags',
    sizes: ['One Size'],
    gallerySrcs: [
      '/result-images/demellierlondon/TheFlorence/Screenshot-2026-04-24-at-1.44.20-pm.png',
      '/result-images/demellierlondon/TheFlorence/Screenshot-2026-04-24-at-1.44.44-pm.png',
      '/result-images/demellierlondon/TheFlorence/Screenshot-2026-04-24-at-1.45.01-pm.png',
      '/result-images/demellierlondon/TheFlorence/Screenshot-2026-04-24-at-1.45.11-pm.png',
    ],
    faceSrc: '/result-images/siennaface-new.png',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/demellierlondon/TheFlorence/result.jpeg',
    description: 'The Florence. A signature Demellier top-handle with refined proportions — polished enough for the office, structured enough to anchor a full look.',
    colourLabel: 'Black',
    swatchColor: '#1a1a1a',
    breadcrumbLabel: 'The Florence Collection',
    colourName: 'Black Smooth',
  },
};

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
    if (!active) { setState('idle'); timersRef.current.forEach(clearTimeout); timersRef.current = []; return; }
    let d = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];
    ANIMATION_SEQUENCE.forEach(({ state: s, duration }, i) => {
      timers.push(setTimeout(() => setState(s), d));
      if (i < ANIMATION_SEQUENCE.length - 1) d += duration;
    });
    timersRef.current = timers;
    return () => timers.forEach(clearTimeout);
  }, [active]);
  return state;
}

const isPopupVisible = (s: AnimationState) => ['popup_open','cursor_to_face','click_face','show_upload_modal','click_photo_library','face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2','body_uploaded','loading','result'].includes(s);
const isFaceUploaded = (s: AnimationState) => ['face_uploaded','cursor_to_body','click_body','show_upload_modal_2','click_photo_library_2','body_uploaded','loading','result'].includes(s);
const isBodyUploaded = (s: AnimationState) => ['body_uploaded','loading','result'].includes(s);
const isUploadModalVisible = (s: AnimationState) => ['show_upload_modal','click_photo_library','show_upload_modal_2','click_photo_library_2'].includes(s);
const isLoadingState = (s: AnimationState) => s === 'loading';
const isResultState = (s: AnimationState) => s === 'result';
const isCursorVisible = (s: AnimationState) => ['cursor_to_button','click_button','cursor_to_face','click_face','click_photo_library','cursor_to_body','click_body','click_photo_library_2'].includes(s);

const AnimatedCursor: React.FC<{ x: number; y: number; visible: boolean; clicking: boolean }> = ({ x, y, visible, clicking }) => (
  <AnimatePresence>
    {visible && (
      <motion.div className="fixed pointer-events-none" style={{ zIndex: 9999 }}
        initial={{ opacity: 0, x, y }} animate={{ opacity: 1, x, y, scale: clicking ? [1, 0.8, 1] : 1 }} exit={{ opacity: 0 }}
        transition={{ x: { type: 'tween', duration: 0.8, ease: 'easeInOut' }, y: { type: 'tween', duration: 0.8, ease: 'easeInOut' }, scale: { duration: 0.3 }, opacity: { duration: 0.2 } }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" /></svg>
      </motion.div>
    )}
  </AnimatePresence>
);

interface DemellierDemoPageProps { productSlug: keyof typeof DEMELLIER_PRODUCTS; }

const DemellierDemoPage: React.FC<DemellierDemoPageProps> = ({ productSlug }) => {
  const product = DEMELLIER_PRODUCTS[productSlug];
  const [animationActive, setAnimationActive] = useState(false);
  const animState = useAnimationSequence(animationActive);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const tryOnButtonRef = useRef<HTMLButtonElement>(null);
  const faceUploadRef = useRef<HTMLDivElement>(null);
  const bodyUploadRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => { const check = () => setIsMobile(window.innerWidth < 768); check(); window.addEventListener('resize', check); return () => window.removeEventListener('resize', check); }, []);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) setActiveGalleryIndex(p => p === product.gallerySrcs.length - 1 ? 0 : p + 1);
    if (touchEndX.current - touchStartX.current > 50) setActiveGalleryIndex(p => p === 0 ? product.gallerySrcs.length - 1 : p - 1);
  };
  const showPreviousImage = () => setActiveGalleryIndex(p => p === 0 ? product.gallerySrcs.length - 1 : p - 1);
  const showNextImage = () => setActiveGalleryIndex(p => p === product.gallerySrcs.length - 1 ? 0 : p + 1);

  const updateCursorPosition = useCallback(() => {
    let targetEl: HTMLElement | null = null;
    if (animState === 'cursor_to_button' || animState === 'click_button') targetEl = tryOnButtonRef.current;
    else if (animState === 'cursor_to_face' || animState === 'click_face') targetEl = faceUploadRef.current;
    else if (animState === 'cursor_to_body' || animState === 'click_body') targetEl = bodyUploadRef.current;
    else if (animState === 'click_photo_library' || animState === 'click_photo_library_2') {
      if (overlayContainerRef.current) { const r = overlayContainerRef.current.getBoundingClientRect(); setCursorPos({ x: r.left + r.width * 0.35, y: r.top + r.height * 0.42 }); return; }
    }
    if (targetEl) { const r = targetEl.getBoundingClientRect(); setCursorPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 }); }
  }, [animState]);

  useEffect(() => { const raf = requestAnimationFrame(updateCursorPosition); return () => cancelAnimationFrame(raf); }, [animState, updateCursorPosition]);

  const isClicking = ['click_button','click_face','click_photo_library','click_body','click_photo_library_2'].includes(animState);
  const mainImageSrc = product.gallerySrcs[activeGalleryIndex];
  const tryOnBtnStyle: React.CSSProperties = { width: '100%', padding: '16px', fontSize: '12px', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#1a1a1a', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '8px', boxShadow: '0 0 20px rgba(0,0,0,0.35)' };
  const galleryFrameStyle: React.CSSProperties = {
    position: 'relative',
    backgroundColor: '#efeeeb',
    width: '100%',
    overflow: 'hidden',
  };
  const galleryImageStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center center',
    display: 'block',
    padding: isMobile ? '18px 14px 24px' : '24px 26px 30px',
  };
  const thumbnailStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    objectPosition: 'center center',
    display: 'block',
    padding: '6px',
  };
  const pageSidePadding = isMobile ? '20px' : '28px';
  const swatchColors = ['#1f1c18', '#34251f', '#5b5242', '#9f6e48', '#b7aa99', '#8a816d', '#46362b'];
  const infoRows = ['Free Shipping & Returns', 'Ethically & Sustainably Made', 'Lifetime Repairs Service', 'A Bag, A Life'];
  const klarnaInstallment = `£${(Number(product.price.replace('£', '')) / 3).toFixed(2)}`;

  return (
    <div className="min-h-screen bg-white overflow-auto">
      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} visible={isCursorVisible(animState)} clicking={isClicking} />
      <header style={{ borderBottom: '1px solid #f0f0f0', backgroundColor: '#fff', zIndex: 40 }}>
        <div style={{ padding: `0 ${pageSidePadding}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: isMobile ? '56px' : '64px', position: 'relative' }}>
          <nav style={{ display: 'flex', gap: isMobile ? '18px' : '34px', fontSize: isMobile ? '13px' : '17px', fontWeight: 400, color: '#1f1f1f' }}>
            {['New Arrivals','Bags','About'].map(n => <span key={n}>{n}</span>)}
          </nav>
          <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? '14px' : '18px', fontWeight: 600, letterSpacing: '0.22em', color: '#111', textAlign: 'center', lineHeight: 1 }}>
            DEMELLIER
            <span style={{ display: 'block', fontSize: isMobile ? '7px' : '8px', letterSpacing: '0.38em', fontWeight: 500, marginTop: '4px' }}>LONDON</span>
          </span>
          <div style={{ display: 'flex', alignItems: 'center', gap: isMobile ? '12px' : '20px', fontSize: isMobile ? '13px' : '17px', color: '#1f1f1f' }}>
            {!isMobile && <><span>EN ▾</span><span>United Kingdom (GBP) ▾</span></>}
            <span>⌕</span>
            <span>◠</span>
            <span>👜 0</span>
          </div>
        </div>
      </header>

      {isMobile ? (
        <div style={{ padding: '0 0 64px' }}>
          <div style={{ padding: '14px 20px 10px', fontSize: '11px', color: '#8b8b8b' }}>
            <span>Top Handle Bags</span><span style={{ padding: '0 6px' }}>/</span><span>Brown Bags</span><span style={{ padding: '0 6px' }}>/</span><span>{product.breadcrumbLabel}</span>
          </div>
          <div style={{ ...galleryFrameStyle, aspectRatio: '1 / 1.03' }} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
            <AnimatePresence mode="wait"><motion.img key={mainImageSrc} src={mainImageSrc} alt={product.name} style={galleryImageStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} /></AnimatePresence>
            <div style={{ position: 'absolute', left: '16px', bottom: '18px', fontSize: '12px', color: '#111' }}>{activeGalleryIndex + 1}/{product.gallerySrcs.length}</div>
            {product.gallerySrcs.length > 1 && (
              <>
                <button onClick={showPreviousImage} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(255,255,255,0.82)', color: '#111', fontSize: '18px', lineHeight: 1, cursor: 'pointer' }}>‹</button>
                <button onClick={showNextImage} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', width: '34px', height: '34px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(255,255,255,0.82)', color: '#111', fontSize: '18px', lineHeight: 1, cursor: 'pointer' }}>›</button>
              </>
            )}
          </div>
          {product.gallerySrcs.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '10px 20px 0' }}>
              {product.gallerySrcs.map((src, index) => (
                <button key={src} onClick={() => setActiveGalleryIndex(index)} style={{ width: '62px', height: '62px', flexShrink: 0, border: activeGalleryIndex === index ? '1px solid #111' : '1px solid #d8d8d8', backgroundColor: '#efeeeb', padding: 0, overflow: 'hidden' }}>
                  <img src={src} alt={`View ${index + 1}`} style={thumbnailStyle} />
                </button>
              ))}
            </div>
          )}
          <div style={{ padding: '20px 20px 0' }}>
            <h1 style={{ fontSize: '22px', fontWeight: 400, color: '#111', margin: '0 0 12px' }}>{product.name}</h1>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '15px', color: '#111', marginBottom: '16px' }}><span>{product.price}</span><span style={{ color: '#8b8b8b' }}>Taxes & Duties included</span></div>
            <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.4, margin: '0 0 18px' }}>{product.description}</p>
            <div style={{ fontSize: '13px', marginBottom: '10px' }}><span style={{ color: '#222' }}>Materials:</span> <span style={{ color: '#6b6b6b' }}>All</span> <span style={{ marginLeft: '10px', color: '#6b6b6b' }}>Suede</span> <span style={{ marginLeft: '10px', color: '#6b6b6b' }}>Grain</span></div>
            <div style={{ fontSize: '13px', color: '#222', marginBottom: '10px' }}>Colour: {product.colourName}</div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '18px' }}>{swatchColors.map((color, index) => <button key={color + index} style={{ width: '22px', height: '22px', borderRadius: '50%', border: index === 3 ? '1px solid #111' : '1px solid #cfcfcf', backgroundColor: color, padding: 0 }} />)}</div>
            <div style={{ fontSize: '13px', color: '#222', marginBottom: '18px' }}>Family: Stockholm ▾</div>
            <div style={{ textAlign: 'center', color: '#8b8b8b', fontSize: '12px', margin: '0 0 14px' }}>Taxes and duties included in the price</div>
            <button style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 400, color: '#fff', backgroundColor: '#000', border: 'none', marginBottom: '10px' }}>Add to cart</button>
            <button ref={tryOnButtonRef} onClick={() => { if (!animationActive) setAnimationActive(true); }} style={{ width: '100%', padding: '15px', fontSize: '14px', fontWeight: 500, color: '#fff', backgroundColor: '#5a5a5a', border: 'none', marginBottom: '12px' }}>AI TRY ON</button>
            <div style={{ borderTop: '1px solid #efefef', paddingTop: '16px', display: 'grid', gap: '10px', color: '#222', fontSize: '13px' }}>{infoRows.map(row => <div key={row}>{row}</div>)}</div>
          </div>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(620px, 1.04fr) minmax(420px, 0.8fr)', alignItems: 'stretch' }}>
          <div style={{ ...galleryFrameStyle, minHeight: 'calc(100vh - 65px)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '28px 28px 0', fontSize: '13px', color: '#797979' }}>
              <span>Top Handle Bags</span><span style={{ padding: '0 10px' }}>/</span><span>Brown Bags</span><span style={{ padding: '0 10px' }}>/</span><span>{product.breadcrumbLabel}</span>
            </div>
            <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AnimatePresence mode="wait"><motion.img key={mainImageSrc} src={mainImageSrc} alt={product.name} style={galleryImageStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} /></AnimatePresence>
              <div style={{ position: 'absolute', left: '28px', bottom: '22px', fontSize: '17px', color: '#111' }}>{activeGalleryIndex + 1}/{product.gallerySrcs.length}</div>
              {product.gallerySrcs.length > 1 && (
                <>
                  <button onClick={showPreviousImage} style={{ position: 'absolute', left: '28px', top: '50%', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(255,255,255,0.82)', color: '#111', fontSize: '24px', lineHeight: 1, cursor: 'pointer' }}>‹</button>
                  <button onClick={showNextImage} style={{ position: 'absolute', right: '28px', top: '50%', transform: 'translateY(-50%)', width: '42px', height: '42px', borderRadius: '999px', border: '1px solid rgba(0,0,0,0.08)', backgroundColor: 'rgba(255,255,255,0.82)', color: '#111', fontSize: '24px', lineHeight: 1, cursor: 'pointer' }}>›</button>
                </>
              )}
            </div>
            {product.gallerySrcs.length > 1 && (
              <div style={{ display: 'flex', gap: '10px', padding: '0 28px 22px', overflowX: 'auto' }}>
                {product.gallerySrcs.map((src, index) => (
                  <button key={src} onClick={() => setActiveGalleryIndex(index)} style={{ width: '72px', height: '72px', flexShrink: 0, border: activeGalleryIndex === index ? '1px solid #111' : '1px solid #d8d8d8', backgroundColor: '#efeeeb', padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                    <img src={src} alt={`View ${index + 1}`} style={thumbnailStyle} />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ backgroundColor: '#fff', padding: '54px 56px 80px' }}>
            <div style={{ maxWidth: '610px' }}>
              <h1 style={{ fontSize: '21px', fontWeight: 400, color: '#111', margin: '0 0 14px' }}>{product.name}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '26px', fontSize: '16px' }}>
                <span style={{ color: '#111' }}>{product.price}</span>
                <span style={{ color: '#8a8a8a' }}>Taxes & Duties included</span>
              </div>
              <p style={{ fontSize: '16px', color: '#7d7d7d', lineHeight: 1.2, margin: '0 0 26px', maxWidth: '600px' }}>{product.description} <span style={{ color: '#111' }}>Read more</span></p>

              <div style={{ display: 'flex', gap: '14px', alignItems: 'center', fontSize: '13px', marginBottom: '22px' }}>
                <span style={{ color: '#222' }}>Materials:</span>
                <span style={{ color: '#333', textDecoration: 'underline' }}>All</span>
                <span style={{ color: '#333' }}>Suede</span>
                <span style={{ color: '#333' }}>Grain</span>
              </div>

              <div style={{ fontSize: '13px', color: '#222', marginBottom: '14px' }}>Colour: {product.colourName}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                {swatchColors.map((color, index) => (
                  <button key={color + index} style={{ width: '28px', height: '28px', borderRadius: '50%', border: index === 3 ? '1px solid #8e8e8e' : '1px solid #d3d3d3', backgroundColor: color, padding: 0, boxShadow: index === 3 ? '0 0 0 2px #efefef inset' : undefined }} />
                ))}
                <span style={{ marginLeft: '8px', color: '#555' }}>-</span>
              </div>

              <div style={{ fontSize: '13px', color: '#222', marginBottom: '32px' }}>Family: Stockholm ▾</div>

              <div style={{ textAlign: 'center', color: '#8b8b8b', fontSize: '12px', marginBottom: '16px' }}>
                <div>Express Delivery, arrives by Mon 4th May</div>
                <div>Free returns within 28 days</div>
              </div>
              <div style={{ textAlign: 'center', color: '#111', fontSize: '14px', marginBottom: '12px' }}>Taxes and duties included in the price</div>

              <button style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: 400, color: '#fff', backgroundColor: '#000', border: 'none', marginBottom: '10px' }}>Add to cart</button>
              <button ref={tryOnButtonRef} onClick={() => { if (!animationActive) setAnimationActive(true); }} style={{ width: '100%', padding: '15px 16px', fontSize: '14px', fontWeight: 600, color: '#fff', backgroundColor: '#5c5c5c', border: '1px solid #7a7a7a', marginBottom: '6px' }}>AI TRY ON</button>
              <div style={{ width: '100%', border: '1px solid #e2e2e2', padding: '8px 12px', textAlign: 'center', fontSize: '12px', color: '#444', marginBottom: '28px' }}>3 payments of <strong>{klarnaInstallment}</strong> at 0% interest with <span style={{ fontWeight: 500 }}>Klarna</span> <span style={{ textDecoration: 'underline' }}>Learn more</span></div>

              <div style={{ display: 'grid', gap: '10px', color: '#222', fontSize: '13px' }}>
                <div>Size</div>
                {infoRows.map(row => <div key={row}>{row}</div>)}
              </div>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(32,32,32,0.5)', fontFamily: "'Jost', sans-serif" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="relative shadow-2xl overflow-hidden" style={{ width: '768px', maxWidth: '100%', maxHeight: '90vh', backgroundColor: '#fff', borderRadius: '0px' }} initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.97, y: 16 }} transition={{ duration: 0.25 }}>
              {!isLoadingState(animState) && !isResultState(animState) && (
                <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff' }}>
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0px 16px', gap: '8px', height: '48px', borderRight: '1px solid #D1D5DC', minWidth: '113px' }}><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg><span style={{ fontSize: '14px', fontWeight: 400, color: '#101828', whiteSpace: 'nowrap' }}>My looks</span></div>
                    <div style={{ display: 'flex', alignItems: 'center' }}><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px' }}><span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>10 credits left</span></div><div style={{ width: '48px', height: '48px', borderLeft: '1px solid #D1D5DC' }} /></div>
                  </div>
                  <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                    <div style={{ width: '50%', flexShrink: 0, background: 'linear-gradient(180deg, #f7f2eb 0%, #efe6dd 100%)', position: 'relative', display: isMobile ? 'none' : 'block' }}>
                      <img src={mainImageSrc} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'center center', minHeight: '400px', padding: '26px 24px 34px' }} />
                      <div style={{ position: 'absolute', bottom: '12px', left: '12px', display: 'flex', alignItems: 'center', gap: '6px', padding: '0 10px', height: '29.83px', backgroundColor: 'rgba(255,255,255,0.92)', border: '1px solid #D1D5DC' }}><span style={{ fontSize: '11px', fontWeight: 500, color: '#101828', fontFamily: "'Jost', sans-serif" }}>{product.colourLabel}</span></div>
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', flex: 1 }}>
                        <div style={{ padding: '24px 24px 0' }}><p style={{ fontSize: '30px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '36px' }}>TRY IT ON, VIRTUALLY</p></div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0px' }}>
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Face photo</p>
                          <div ref={faceUploadRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}>
                            {isFaceUploaded(animState) ? (<div style={{ position: 'relative', flexShrink: 0 }}><img src={product.faceSrc} alt="Face" style={{ width: '40px', height: '40px', objectFit: 'cover' }} /><div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>) : (<div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="15" r="7" stroke="#101828" strokeWidth="1.5" fill="none" /><path d="M8 36c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="#101828" strokeWidth="1.5" fill="none" /></svg></div>)}
                            <div><p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0px', lineHeight: '24px' }}>{isFaceUploaded(animState) ? 'Face photo uploaded' : 'Upload your photo here'}</p><p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>{isFaceUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}</p></div>
                          </div>
                          <div style={{ height: '32px' }} />
                          <p style={{ fontSize: '16px', fontWeight: 400, color: '#101828', padding: '0 24px', marginBottom: '4px' }}>Full body photo</p>
                          <div ref={bodyUploadRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '16px', gap: '20px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', cursor: 'pointer', marginLeft: '24px', marginRight: '24px' }}>
                            {isBodyUploaded(animState) ? (<div style={{ position: 'relative', flexShrink: 0 }}><img src={product.bodySrc} alt="Body" style={{ width: '40px', height: '40px', objectFit: 'cover' }} /><div style={{ position: 'absolute', bottom: 0, right: 0, width: '16px', height: '16px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><svg width="9" height="9" viewBox="0 0 20 20" fill="white"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg></div></div>) : (<div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="9" r="4" stroke="#101828" strokeWidth="1.5" fill="none" /><line x1="20" y1="13" x2="20" y2="28" stroke="#101828" strokeWidth="1.5" /><line x1="12" y1="18" x2="28" y2="18" stroke="#101828" strokeWidth="1.5" /><line x1="20" y1="28" x2="14" y2="38" stroke="#101828" strokeWidth="1.5" /><line x1="20" y1="28" x2="26" y2="38" stroke="#101828" strokeWidth="1.5" /></svg></div>)}
                            <div><p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '0px', lineHeight: '24px' }}>{isBodyUploaded(animState) ? 'Full body photo uploaded' : 'Upload your photo here'}</p><p style={{ fontSize: '14px', color: '#6A7282', lineHeight: '20px' }}>{isBodyUploaded(animState) ? 'Tap to change' : 'Format: png, jpg, heic & Max file size: 25 MB'}</p></div>
                          </div>
                        </div>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div style={{ padding: '8px 24px' }}><p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '16px' }}>By uploading your photo, you agree to our{' '}<Link to="/legal/end-user-terms" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>{' '}and{' '}<Link to="/legal/app-privacy-policy" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Privacy Policy</Link>.{' '}Your image is never permanently stored.</p></div>
                        <button disabled style={{ width: '100%', height: '48px', fontSize: '14px', fontWeight: 400, color: isBodyUploaded(animState) ? '#fff' : '#D1D5DC', backgroundColor: isBodyUploaded(animState) ? '#1E2939' : '#6A7282', border: 'none', borderRadius: '0px', cursor: 'not-allowed', fontFamily: "'Jost', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                          {isBodyUploaded(animState) ? (<><svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeWidth="2" className="animate-spin"><circle cx="12" cy="12" r="10" stroke="#D1D5DC" strokeOpacity="0.5" /><path d="M12 2a10 10 0 0110 10" stroke="#D1D5DC" strokeOpacity="0.9" /></svg>Try on</>) : (<><svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l1.5 4.5L18 8l-4.5 1.5L12 14l-1.5-4.5L6 8l4.5-1.5L12 2z" fill="#D1D5DC" /><path d="M19 15l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z" fill="#D1D5DC" /></svg>Try on</>)}
                        </button>
                      </div>
                      <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}><span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span><span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></div>
                    </div>
                  </div>
                </div>
              )}
              {isLoadingState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif" }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '8px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg><span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span><span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span></div>
                  <div style={{ padding: '48px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '360px', textAlign: 'center' }}>
                    <p style={{ fontSize: '26px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#101828', marginBottom: '32px' }}>GETTING DRESSED!</p>
                    <img src="/hanger.jpg" alt="Loading" style={{ width: '72px', height: '72px', objectFit: 'contain', marginBottom: '20px' }} />
                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '32px' }}><span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '0ms', display: 'inline-block' }} /><span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '150ms', display: 'inline-block' }} /><span className="animate-bounce" style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#1E2939', animationDelay: '300ms', display: 'inline-block' }} /></div>
                  </div>
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span><span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></div>
                </div>
              )}
              {isResultState(animState) && (
                <div style={{ fontFamily: "'Jost', sans-serif", display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '48px', padding: '0 16px', borderBottom: '1px solid #D1D5DC', gap: '12px', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5"><path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" /></svg><span style={{ fontSize: '14px', fontWeight: 500, color: '#101828' }}>Fits</span><span style={{ fontSize: '11px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', padding: '2px 8px' }}>Rendered Fits</span></div>
                    <button onClick={() => { setAnimationActive(false); setTimeout(() => setAnimationActive(true), 50); }} style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'none', border: '1px solid #D1D5DC', cursor: 'pointer', flexShrink: 0 }}><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="#101828" strokeWidth="1.5"><path d="M1 1l12 12M13 1L1 13" /></svg></button>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px', backgroundColor: '#F9FAFB', overflowY: 'auto', maxHeight: '75vh' }}>
                    <div style={{ width: '341px', maxWidth: '100%', backgroundColor: '#fff', border: '1px solid #E5E7EB' }}>
                      <button onClick={() => setFullscreenImage(true)} style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: 0, cursor: 'zoom-in' }}><img src={product.afterSrc} alt="Try-On Result" style={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'block' }} /></button>
                      <div style={{ padding: '12px' }}>
                        <button style={{ display: 'block', width: '100%', padding: '13px', fontSize: '13px', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', backgroundColor: '#1E2939', textAlign: 'center', fontFamily: "'Jost', sans-serif", boxSizing: 'border-box', border: 'none', cursor: 'default' }}>Add to Cart</button>
                        <a href="https://calendly.com/mail-renderedfits/15-minute-meeting" target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%', padding: '12px', fontSize: '12px', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#6A7282', backgroundColor: '#fff', textAlign: 'center', textDecoration: 'none', fontFamily: "'Jost', sans-serif", marginTop: '6px', border: '1px solid #E5E7EB', boxSizing: 'border-box' }}>Schedule a Meeting</a>
                      </div>
                    </div>
                  </div>
                  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}><span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span><span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg></div>
                </div>
              )}
              <AnimatePresence>
                {isUploadModalVisible(animState) && (
                  <motion.div ref={overlayContainerRef} className="absolute inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/40" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                    <motion.img src={isMobile ? '/result-images/phoneupload.PNG' : '/result-images/desktopupload.png'} alt="Upload dialog" className="max-w-[85%] sm:max-w-[60%] max-h-[70%] object-contain rounded-xl shadow-2xl" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }} transition={{ duration: 0.2 }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {fullscreenImage && (
          <motion.div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out" onClick={() => setFullscreenImage(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <button onClick={() => setFullscreenImage(false)} className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"><svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            <motion.img src={product.afterSrc} alt="Try-On Result" className="max-w-full max-h-full object-contain" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} transition={{ duration: 0.2 }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DemellierDemoPage;
