/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  category: string;
  sizes: string[];
  productSrc: string;
  productLabel: string;
  faceSrc: string;
  bodySrc: string;
  afterSrc: string;
  afterLabel: string;
  description: string;
}

const demoProducts: DemoProduct[] = [
  {
    id: 1,
    name: 'Corset Knit Midi Dress',
    brand: 'Brielle',
    price: 285,
    originalPrice: 380,
    category: 'Dresses',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    productSrc: '/result-images/brielle.webp',
    productLabel: 'Product: Corset Knit Midi Dress',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/brielle-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Textured knit midi dress with sheer corset bodice and fuzzy fabric. A statement evening piece.',
  },
  {
    id: 2,
    name: 'Miffy Knit Jumper',
    brand: 'Daisy Street',
    price: 42,
    category: 'Knitwear',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    productSrc: '/result-images/daisystreet.webp',
    productLabel: 'Product: Miffy Knit Jumper',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/daisystreet-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Playful Miffy character knit jumper with floral detail. Relaxed fit in cream.',
  },
  {
    id: 3,
    name: 'Distressed Wide Leg Jeans',
    brand: 'Elysian Clo',
    price: 120,
    originalPrice: 165,
    category: 'Denim',
    sizes: ['28', '30', '32', '34', '36'],
    productSrc: '/result-images/elysianclo.webp',
    productLabel: 'Product: Distressed Wide Leg Jeans',
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/elysianclo-tryon-2K.png',
    afterLabel: 'Try-On Result',
    description: 'Olive wash wide-leg jeans with heavy distressing. Relaxed streetwear fit.',
  },
  {
    id: 4,
    name: 'Tech Panelled Jacket',
    brand: 'Heliot Emil',
    price: 540,
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL'],
    productSrc: '/result-images/heliotemil.webp',
    productLabel: 'Product: Tech Panelled Jacket',
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/heliotemil-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Deconstructed technical jacket with mesh panel inserts. Avant-garde hooded silhouette.',
  },
  {
    id: 5,
    name: 'Fleece Zip Hoodie',
    brand: 'Heresy',
    price: 175,
    category: 'Tops',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    productSrc: '/result-images/heresy.jpg',
    productLabel: 'Product: Fleece Zip Hoodie',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/heresy-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Olive green fleece zip-up hoodie with embroidered pinwheel motif. Cosy oversized fit.',
  },
  {
    id: 6,
    name: 'Lightweight Windbreaker',
    brand: 'Mellow Clo',
    price: 95,
    originalPrice: 130,
    category: 'Outerwear',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    productSrc: '/result-images/mellowclo.webp',
    productLabel: 'Product: Lightweight Windbreaker',
    faceSrc: '/result-images/IMG_8175.jpeg',
    bodySrc: '/result-images/sydbody--new.jpeg',
    afterSrc: '/result-images/mellowclo-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Cropped olive windbreaker with funnel neck. Water-resistant nylon shell.',
  },
  {
    id: 7,
    name: 'Alma BB Monogram Bag',
    brand: 'Louis Vuitton',
    price: 1750,
    category: 'Bags',
    sizes: ['One Size'],
    productSrc: '/result-images/lvbag.webp',
    productLabel: 'Product: Alma BB Monogram Bag',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/lvbag-tryon-4K.png',
    afterLabel: 'Try-On Result',
    description: 'Iconic Alma BB in Monogram canvas with travel sticker patches and coloured stripe.',
  },
  {
    id: 8,
    name: 'Logo Denim Hat',
    brand: 'Rhude',
    price: 215,
    category: 'Accessories',
    sizes: ['One Size'],
    productSrc: '/result-images/RHUDEcap.jpg',
    productLabel: 'Product: Logo Denim Hat',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/RHPF25HA01741_RHUDE_LOGO_DENIM_HAT-OXFORD_INDIGO_1-tryon-4K.png',
    afterLabel: 'Try-On Result',
    description: 'Oxford indigo wash denim snapback with embroidered Rhude logo.',
  },
  {
    id: 9,
    name: 'Airlift Intrigue Bra & High-Waist Pant',
    brand: 'Alo',
    price: 168,
    category: 'Activewear',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    productSrc: '/result-images/alo.webp',
    productLabel: 'Product: Airlift Intrigue Bra & Pant',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/alo-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Sculpted airlift sports bra with high-waist leggings in steel blue. Performance meets style.',
  },
  {
    id: 10,
    name: 'Linen Midi Dress',
    brand: 'Reformation',
    price: 248,
    category: 'Dresses',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    productSrc: '/result-images/reformation.webp',
    productLabel: 'Product: Linen Midi Dress',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/reformation-tryon-1K.png',
    afterLabel: 'Try-On Result',
    description: 'Effortless linen midi dress with a relaxed silhouette. Sustainably made for everyday elegance.',
  },
];

// ─── Animation State Machine ────────────────────────────────────────────────

type AnimationState =
  | 'idle'
  | 'cursor_to_button'
  | 'click_button'
  | 'popup_open'
  | 'cursor_to_face'
  | 'click_face'
  | 'show_upload_modal'
  | 'click_photo_library'
  | 'show_gallery'
  | 'select_face'
  | 'face_uploaded'
  | 'cursor_to_body'
  | 'click_body'
  | 'show_upload_modal_2'
  | 'click_photo_library_2'
  | 'show_gallery_2'
  | 'select_body'
  | 'body_uploaded'
  | 'loading'
  | 'result';

const ANIMATION_SEQUENCE: { state: AnimationState; duration: number }[] = [
  { state: 'idle', duration: 2000 },
  { state: 'cursor_to_button', duration: 1200 },
  { state: 'click_button', duration: 500 },
  { state: 'popup_open', duration: 800 },
  { state: 'cursor_to_face', duration: 1000 },
  { state: 'click_face', duration: 400 },
  { state: 'show_upload_modal', duration: 1500 },
  { state: 'click_photo_library', duration: 800 },
  { state: 'show_gallery', duration: 1500 },
  { state: 'select_face', duration: 1000 },
  { state: 'face_uploaded', duration: 800 },
  { state: 'cursor_to_body', duration: 1000 },
  { state: 'click_body', duration: 400 },
  { state: 'show_upload_modal_2', duration: 1500 },
  { state: 'click_photo_library_2', duration: 800 },
  { state: 'show_gallery_2', duration: 1500 },
  { state: 'select_body', duration: 1000 },
  { state: 'body_uploaded', duration: 3800 },
  { state: 'loading', duration: 4000 },
  { state: 'result', duration: 0 },
];

function useAnimationSequence(active: boolean): AnimationState {
  const [state, setState] = useState<AnimationState>('idle');
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  useEffect(() => {
    if (!active) {
      setState('idle');
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
      return;
    }

    let cumulativeDelay = 0;
    const timers: NodeJS.Timeout[] = [];

    ANIMATION_SEQUENCE.forEach(({ state: s, duration }, index) => {
      const timer = setTimeout(() => {
        setState(s);
      }, cumulativeDelay);
      timers.push(timer);
      if (index < ANIMATION_SEQUENCE.length - 1) {
        cumulativeDelay += duration;
      }
    });

    timersRef.current = timers;
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [active]);

  return state;
}

// Helper: is the popup visible?
function isPopupVisible(state: AnimationState): boolean {
  const popupStates: AnimationState[] = [
    'popup_open', 'cursor_to_face', 'click_face',
    'show_upload_modal', 'click_photo_library', 'show_gallery', 'select_face', 'face_uploaded',
    'cursor_to_body', 'click_body',
    'show_upload_modal_2', 'click_photo_library_2', 'show_gallery_2', 'select_body', 'body_uploaded',
    'loading', 'result',
  ];
  return popupStates.includes(state);
}

function isFaceUploaded(state: AnimationState): boolean {
  const afterFace: AnimationState[] = [
    'face_uploaded', 'cursor_to_body', 'click_body',
    'show_upload_modal_2', 'click_photo_library_2', 'show_gallery_2', 'select_body', 'body_uploaded',
    'loading', 'result',
  ];
  return afterFace.includes(state);
}

function isBodyUploaded(state: AnimationState): boolean {
  const afterBody: AnimationState[] = ['body_uploaded', 'loading', 'result'];
  return afterBody.includes(state);
}

function isUploadModalVisible(state: AnimationState): boolean {
  return ['show_upload_modal', 'click_photo_library', 'show_upload_modal_2', 'click_photo_library_2'].includes(state);
}

function isGalleryVisible(state: AnimationState): boolean {
  return ['show_gallery', 'select_face', 'show_gallery_2', 'select_body'].includes(state);
}

function isLoadingState(state: AnimationState): boolean {
  return state === 'loading';
}

function isResultState(state: AnimationState): boolean {
  return state === 'result';
}

// Detect if cursor should be visible and where
function isCursorVisible(state: AnimationState): boolean {
  return [
    'cursor_to_button', 'click_button',
    'cursor_to_face', 'click_face',
    'click_photo_library',
    'select_face',
    'cursor_to_body', 'click_body',
    'click_photo_library_2',
    'select_body',
  ].includes(state);
}

// ─── Animated Cursor ────────────────────────────────────────────────────────

const CursorSVG: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" />
  </svg>
);

interface AnimatedCursorProps {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
}

const AnimatedCursor: React.FC<AnimatedCursorProps> = ({ x, y, visible, clicking }) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed pointer-events-none"
          style={{ zIndex: 9999 }}
          initial={{ opacity: 0, x, y }}
          animate={{
            opacity: 1,
            x,
            y,
            scale: clicking ? [1, 0.8, 1] : 1,
          }}
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
};

// ─── Simple Product Card (grid item) ────────────────────────────────────────

const ProductCard: React.FC<{ product: DemoProduct; onClick: () => void }> = ({ product, onClick }) => (
  <button
    onClick={onClick}
    className="bg-white border border-gray-200 rounded-lg overflow-hidden text-left hover:shadow-lg transition-shadow group cursor-pointer"
  >
    <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
      <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 text-[11px] tracking-[0.15em] font-medium px-4 py-2">
          VIEW DEMO
        </span>
      </div>
    </div>
    <div className="p-4 sm:p-5">
      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{product.brand}</p>
      <h3 className="text-sm sm:text-base font-medium text-gray-900 mb-2">{product.name}</h3>
      <div className="flex items-center gap-2">
        {product.originalPrice && (
          <span className="text-xs text-gray-400 line-through">&pound;{product.originalPrice}</span>
        )}
        <span className="text-sm font-medium">&pound;{product.price}</span>
      </div>
    </div>
  </button>
);

// ─── Mock Product Page Overlay ──────────────────────────────────────────────

interface MockProductPageProps {
  product: DemoProduct;
  onClose: () => void;
}

const MockProductPage: React.FC<MockProductPageProps> = ({ product, onClose }) => {
  const [animationActive, setAnimationActive] = useState(false);
  const animState = useAnimationSequence(animationActive);
  const [isMobile, setIsMobile] = useState(false);
  const [fullscreenImage, setFullscreenImage] = useState(false);

  const tryOnButtonRef = useRef<HTMLButtonElement>(null);
  const faceUploadRef = useRef<HTMLDivElement>(null);
  const bodyUploadRef = useRef<HTMLDivElement>(null);
  const overlayContainerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  // Escape key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Start animation after a brief delay for the page to render
  useEffect(() => {
    const timer = setTimeout(() => setAnimationActive(true), 600);
    return () => clearTimeout(timer);
  }, []);

  // Update cursor position based on animation state
  const updateCursorPosition = useCallback(() => {
    let targetEl: HTMLElement | null = null;

    if (animState === 'cursor_to_button' || animState === 'click_button') {
      targetEl = tryOnButtonRef.current;
    } else if (animState === 'cursor_to_face' || animState === 'click_face') {
      targetEl = faceUploadRef.current;
    } else if (animState === 'cursor_to_body' || animState === 'click_body') {
      targetEl = bodyUploadRef.current;
    } else if (animState === 'click_photo_library' || animState === 'click_photo_library_2') {
      // Target: "Photo Library" text area on the upload modal image — roughly 40% from top, 50% horizontal
      if (overlayContainerRef.current) {
        const rect = overlayContainerRef.current.getBoundingClientRect();
        setCursorPos({ x: rect.left + rect.width * 0.35, y: rect.top + rect.height * 0.42 });
        return;
      }
    } else if (animState === 'select_face' || animState === 'select_body') {
      // Target: a photo in the gallery — roughly 30% from top, 65% horizontal
      if (overlayContainerRef.current) {
        const rect = overlayContainerRef.current.getBoundingClientRect();
        setCursorPos({ x: rect.left + rect.width * 0.65, y: rect.top + rect.height * 0.3 });
        return;
      }
    }

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setCursorPos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });
    }
  }, [animState]);

  useEffect(() => {
    // Small delay to let DOM update before measuring
    const raf = requestAnimationFrame(() => {
      updateCursorPosition();
    });
    return () => cancelAnimationFrame(raf);
  }, [animState, updateCursorPosition]);

  const isClicking = [
    'click_button', 'click_face', 'click_photo_library',
    'select_face', 'click_body', 'click_photo_library_2', 'select_body',
  ].includes(animState);

  return (
    <div ref={containerRef} className="fixed inset-0 z-50 bg-white overflow-auto">
      {/* Animated Cursor */}
      <AnimatedCursor
        x={cursorPos.x}
        y={cursorPos.y}
        visible={isCursorVisible(animState)}
        clicking={isClicking}
      />

      {/* Store Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium">
              <span className="text-gray-400">WOMAN</span>
              <span className="text-gray-400">MAN</span>
              <span className="text-gray-400">BAGS</span>
              <span className="text-gray-400">SALE</span>
            </nav>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl tracking-[0.05em] font-light text-gray-900">
              Demo Store
            </span>
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Close">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <span className="hover:text-gray-900 cursor-default">Clothing</span>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product Content */}
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
            <h1 className="text-[13px] tracking-[0.15em] font-normal uppercase mb-4">
              {product.name.toUpperCase()}
            </h1>
            <div className="flex items-center gap-3 mb-6">
              {product.originalPrice && (
                <span className="text-[13px] line-through text-gray-400">&pound;{product.originalPrice}</span>
              )}
              <span className="text-[13px]">&pound;{product.price}</span>
            </div>

            {/* AI TRY ON Button */}
            <button
              ref={tryOnButtonRef}
              className={`w-full bg-[#444833] text-white py-4 px-6 text-[12px] tracking-[0.15em] font-medium flex items-center justify-center gap-3 mb-1 transition-all shadow-[0_0_20px_rgba(68,72,51,0.4)] ${
                animState === 'click_button' ? 'scale-95 shadow-[0_0_35px_rgba(68,72,51,0.7)]' : ''
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
              AI TRY ON
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

      {/* ─── Try-On Popup Overlay ─── */}
      <AnimatePresence>
        {isPopupVisible(animState) && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-auto shadow-2xl relative"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-gray-500 flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h8m-8 6h16" />
                    </svg>
                    My looks
                  </span>
                  <span className="text-[10px] bg-[#444833] text-white px-2.5 py-1 rounded-full font-medium">
                    1 credit left
                  </span>
                </div>
                <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body — Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left — Product Image (hidden on mobile to save space) */}
                <div className="hidden lg:block bg-gray-50 lg:aspect-auto lg:min-h-[450px]">
                  <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
                </div>

                {/* Right — Workflow Content */}
                <div className="p-4 sm:p-8 flex flex-col justify-center min-h-[300px] sm:min-h-[350px] relative">

                  {/* Upload step — slots start empty, get filled progressively */}
                  {!isLoadingState(animState) && !isResultState(animState) && (
                    <div>
                      <h3 className="text-lg sm:text-xl font-light tracking-wide text-gray-900 mb-6 text-center">
                        TRY IT ON, VIRTUALLY
                      </h3>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {/* Face Photo Slot */}
                        <div ref={faceUploadRef}>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Face photo</p>
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {isFaceUploaded(animState) ? (
                              <img src={product.faceSrc} alt="Face photo" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-2">
                                <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                <p className="text-[9px] text-gray-400">Upload your photo here</p>
                              </div>
                            )}
                          </div>
                          {isFaceUploaded(animState) && (
                            <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Uploaded
                            </p>
                          )}
                        </div>

                        {/* Body Photo Slot */}
                        <div ref={bodyUploadRef}>
                          <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Full body photo</p>
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center">
                            {isBodyUploaded(animState) ? (
                              <img src={product.bodySrc} alt="Full body photo" className="w-full h-full object-cover" />
                            ) : (
                              <div className="text-center p-2">
                                <svg className="w-8 h-8 text-gray-300 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <p className="text-[9px] text-gray-400">Upload your photo here</p>
                              </div>
                            )}
                          </div>
                          {isBodyUploaded(animState) && (
                            <p className="text-[10px] text-green-600 mt-1.5 flex items-center gap-1">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Uploaded
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Product tags + status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                          <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[Math.min(2, product.sizes.length - 1)]}</span>
                        </div>
                        {isBodyUploaded(animState) && (
                          <span className="text-[10px] text-[#444833] font-medium flex items-center gap-1">
                            <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Starting...
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Loading State */}
                  {isLoadingState(animState) && (
                    <div className="flex flex-col items-center justify-center text-center">
                      <h3 className="text-2xl sm:text-3xl font-light tracking-wide text-gray-900 mb-8">
                        GETTING DRESSED!
                      </h3>
                      <div className="relative mb-8">
                        <svg className="w-20 h-20 text-gray-800" viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M32 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" />
                          <path d="M32 16v4" />
                          <path d="M32 20 L8 40 L56 40 Z" strokeLinejoin="round" />
                        </svg>
                        <div className="flex gap-1.5 justify-center mt-4">
                          <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-2 h-2 bg-[#444833] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-center">
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[Math.min(2, product.sizes.length - 1)]}</span>
                      </div>
                    </div>
                  )}

                  {/* Result State */}
                  {isResultState(animState) && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setFullscreenImage(true)}
                        className="w-full max-h-[40vh] sm:max-h-[50vh] rounded-lg overflow-hidden bg-gray-100 mb-4 border border-gray-200 flex items-center justify-center cursor-zoom-in relative group"
                      >
                        <img src={product.afterSrc} alt={product.afterLabel} className="w-full h-full object-contain" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 text-[10px] tracking-[0.15em] font-medium px-3 py-1.5 rounded">
                            VIEW FULL SIZE
                          </span>
                        </div>
                      </button>
                      <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.name}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">{product.sizes[Math.min(2, product.sizes.length - 1)]}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-2.5 py-1 rounded">&pound;{product.price}</span>
                      </div>
                      {/* Schedule a Meeting button */}
                      <a
                        href="https://calendly.com/mail-renderedfits/15-minute-meeting"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#444833] text-white py-3 px-6 text-[11px] tracking-[0.15em] font-medium text-center hover:bg-[#3a3d2d] transition-colors block mb-2"
                      >
                        SCHEDULE A MEETING
                      </a>
                      <Link
                        to="/demo"
                        className="w-full border border-gray-300 text-gray-700 py-3 px-6 text-[11px] tracking-[0.15em] font-medium text-center hover:border-gray-500 transition-colors block"
                      >
                        TRY THE LIVE DEMO
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="border-t border-gray-200 px-5 py-3 flex items-center justify-center">
                <span className="text-[10px] text-gray-400 tracking-wider">
                  Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                </span>
              </div>

              {/* ─── Upload Modal Overlay ─── */}
              <AnimatePresence>
                {isUploadModalVisible(animState) && (
                  <motion.div
                    ref={overlayContainerRef}
                    className="absolute inset-0 z-[70] flex items-end sm:items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <motion.img
                      src={isMobile ? '/result-images/phoneupload.PNG' : '/result-images/desktopupload.png'}
                      alt="Upload dialog"
                      className="max-w-[85%] sm:max-w-[60%] max-h-[70%] object-contain rounded-xl shadow-2xl"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ─── Gallery Overlay ─── */}
              <AnimatePresence>
                {isGalleryVisible(animState) && (
                  <motion.div
                    ref={overlayContainerRef}
                    className="absolute inset-0 z-[70] flex items-center justify-center bg-black/40"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="relative max-w-[85%] sm:max-w-[60%] max-h-[80%]">
                      <motion.img
                        src="/result-images/phonegallery.PNG"
                        alt="Photo gallery"
                        className="w-full h-full object-contain rounded-xl shadow-2xl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 30 }}
                        transition={{ duration: 0.2 }}
                      />
                      {/* Selection highlight indicator */}
                      {(animState === 'select_face' || animState === 'select_body') && (
                        <motion.div
                          className="absolute border-4 border-blue-500 rounded-lg"
                          style={{
                            top: '22%',
                            right: '5%',
                            width: '28%',
                            height: '15%',
                          }}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: [0, 1, 0.7, 1] }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Fullscreen Result Image Viewer ─── */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setFullscreenImage(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              onClick={() => setFullscreenImage(false)}
              className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <motion.img
              src={product.afterSrc}
              alt={product.afterLabel}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Results Page (Main) ────────────────────────────────────────────────────

const ResultsPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<DemoProduct | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#444833] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <a href="/" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            RENDERED FITS™
          </a>
        </div>
      </header>

      {/* Section 1: Hero */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 leading-tight mb-6">
            See What Virtual Try-On Looks Like
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            The future of online shopping.
          </p>
        </div>
      </div>

      {/* Section 2: Product Demo Grid */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm mb-10 max-w-xl mx-auto">
            Click any product below to see the full virtual try-on experience.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {demoProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Stats Bar */}
      <div className="bg-[#444833] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">~20%</p>
              <p className="text-sm text-white/70 mt-1">fewer returns</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">~30%</p>
              <p className="text-sm text-white/70 mt-1">higher conversion</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">~20%</p>
              <p className="text-sm text-white/70 mt-1">higher AOV</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: How It Works */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-12 sm:mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 1</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer uploads photo</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 2</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">AI generates try-on in 20 seconds</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 3</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer selects size and adds to cart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-8">
            Want to see this on your products?
          </h2>
          <a
            href="https://calendly.com/mail-renderedfits/15-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#444833] text-white px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-medium hover:bg-[#3a3d2d] transition-colors"
          >
            Schedule a 15-Minute Meeting
          </a>
          <div className="mt-6">
            <Link
              to="/demo"
              className="text-[#444833] font-medium hover:underline transition-colors"
            >
              Or try it yourself on our live demo &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3a3d2d] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
            Rendered Fits Ltd registered in England and Wales under the company registration number 16922551. Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ
          </p>
        </div>
      </div>

      {/* ─── Full-screen Mock Product Page Overlay ─── */}
      <AnimatePresence>
        {selectedProduct && (
          <MockProductPage
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ResultsPage;
