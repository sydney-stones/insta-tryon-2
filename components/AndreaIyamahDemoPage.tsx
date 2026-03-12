/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface DemoProduct {
  id: number;
  name: string;
  brand: string;
  price: number;
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
    name: 'SS26 Lookbook Dress',
    brand: 'Andrea Iyamah',
    price: 485,
    category: 'Dresses',
    sizes: ['XXS', 'XS', 'S', 'M', 'L'],
    productSrc: '/result-images/ANDREAIYAMAH_SS26_LOOKBOOKDSCF0054.jpg.webp',
    productLabel: 'Product: SS26 Lookbook Dress',
    faceSrc: '/result-images/siennaneutral--new.JPG',
    bodySrc: '/result-images/siennabody--new.JPG',
    afterSrc: '/result-images/ANDREAIYAMAH_SS26_LOOKBOOKDSCF0054.jpg-nb2-2k-tryon.png',
    afterLabel: 'Try-On Result',
    description: 'A bold, sculptural silhouette from the Andrea Iyamah SS26 collection. Vibrant print with a flowing silhouette.',
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

function isPopupVisible(state: AnimationState): boolean {
  return [
    'popup_open', 'cursor_to_face', 'click_face',
    'show_upload_modal', 'click_photo_library', 'show_gallery', 'select_face', 'face_uploaded',
    'cursor_to_body', 'click_body',
    'show_upload_modal_2', 'click_photo_library_2', 'show_gallery_2', 'select_body', 'body_uploaded',
    'loading', 'result',
  ].includes(state);
}

function isFaceUploaded(state: AnimationState): boolean {
  return [
    'face_uploaded', 'cursor_to_body', 'click_body',
    'show_upload_modal_2', 'click_photo_library_2', 'show_gallery_2', 'select_body', 'body_uploaded',
    'loading', 'result',
  ].includes(state);
}

function isBodyUploaded(state: AnimationState): boolean {
  return ['body_uploaded', 'loading', 'result'].includes(state);
}

function isUploadModalVisible(state: AnimationState): boolean {
  return ['show_upload_modal', 'click_photo_library', 'show_upload_modal_2', 'click_photo_library_2'].includes(state);
}

function isGalleryVisible(state: AnimationState): boolean {
  return ['show_gallery', 'select_face', 'show_gallery_2', 'select_body'].includes(state);
}

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

const CursorSVG: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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

// ─── Mock Product Page ───────────────────────────────────────────────────────

const MockProductPage: React.FC<{ product: DemoProduct; onClose: () => void }> = ({ product, onClose }) => {
  const [animationActive, setAnimationActive] = useState(false);
  const animState = useAnimationSequence(animationActive);
  const [isMobile, setIsMobile] = useState(false);

  const tryOnButtonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  useEffect(() => {
    const timer = setTimeout(() => setAnimationActive(true), 600);
    return () => clearTimeout(timer);
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
    } else if (animState === 'select_face' || animState === 'select_body') {
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
    const raf = requestAnimationFrame(() => updateCursorPosition());
    return () => cancelAnimationFrame(raf);
  }, [animState, updateCursorPosition]);

  const isClicking = [
    'click_button', 'click_face', 'click_photo_library',
    'select_face', 'click_body', 'click_photo_library_2', 'select_body',
  ].includes(animState);

  const showPopup = isPopupVisible(animState);
  const faceUploaded = isFaceUploaded(animState);
  const bodyUploaded = isBodyUploaded(animState);
  const showUploadModal = isUploadModalVisible(animState);
  const showGallery = isGalleryVisible(animState);
  const showLoading = animState === 'loading';
  const showResult = animState === 'result';
  const isSecondUpload = ['cursor_to_body', 'click_body', 'show_upload_modal_2', 'click_photo_library_2', 'show_gallery_2', 'select_body', 'body_uploaded', 'loading', 'result'].includes(animState);

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto">
      <AnimatedCursor x={cursorPos.x} y={cursorPos.y} visible={isCursorVisible(animState)} clicking={isClicking} />

      {/* Header */}
      <header className="border-b border-gray-200 sticky top-0 bg-white z-40">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <nav className="hidden md:flex items-center gap-6 text-[11px] tracking-[0.15em] font-medium">
              <span className="text-gray-400">WOMAN</span>
              <span className="text-gray-400">SWIM</span>
              <span className="text-gray-400">RESORT</span>
              <span className="text-gray-400">NEW IN</span>
            </nav>
            <span className="absolute left-1/2 transform -translate-x-1/2 text-lg sm:text-xl tracking-[0.25em] font-light text-gray-900 uppercase">
              Andrea Iyamah
            </span>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Close">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <nav className="flex items-center gap-2 text-[11px] text-gray-500">
          <span>Dresses</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>
      </div>

      {/* Product */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_460px] gap-6 lg:gap-12">
          {/* Left — Product Image */}
          <div className="flex justify-center">
            <div className="relative bg-gray-50 overflow-hidden w-full">
              <div className="relative aspect-[3/4] max-h-[40vh] lg:max-h-none mx-auto">
                <img src={product.productSrc} alt={product.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Right — Product Info */}
          <div className="flex flex-col lg:pt-0">
            <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-2">{product.brand}</p>
            <h1 className="text-[13px] tracking-[0.15em] font-normal uppercase mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[13px]">&pound;{product.price}</span>
            </div>

            {/* Sizes */}
            <div className="mb-6">
              <p className="text-[11px] tracking-wider text-gray-500 uppercase mb-2">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button key={size} className="border border-gray-200 px-3 py-1.5 text-[11px] tracking-wider hover:border-gray-900 transition-colors cursor-default">
                    {size}
                  </button>
                ))}
              </div>
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
            <p className="text-[11px] text-gray-500 text-center mb-6">Upload your photo and see yourself in this item</p>

            {/* Add to Bag */}
            <div className="flex gap-0 mb-6">
              <button className="flex-1 border border-black py-4 px-6 text-[12px] tracking-[0.15em] font-medium text-center cursor-default">
                ADD TO BAG
              </button>
            </div>

            {/* Description */}
            <p className="text-[13px] text-gray-600 leading-relaxed">{product.description}</p>
          </div>
        </div>
      </div>

      {/* ─── Try-On Popup ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            ref={overlayContainerRef}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm mx-auto overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Popup Header */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#444833] flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">AI Try On</span>
                </div>
                <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Loading State */}
              {showLoading && (
                <div className="flex flex-col items-center justify-center py-16 px-6">
                  <div className="w-14 h-14 rounded-full border-4 border-[#444833]/20 border-t-[#444833] animate-spin mb-6" />
                  <p className="text-sm font-medium text-gray-900 mb-2">Generating your try-on</p>
                  <p className="text-xs text-gray-500 text-center">Our AI is placing the garment on you...</p>
                </div>
              )}

              {/* Result State */}
              {showResult && (
                <div className="flex flex-col">
                  <div className="relative">
                    <motion.img
                      src={product.afterSrc}
                      alt="Try-on result"
                      className="w-full object-cover"
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.7, ease: 'easeOut' }}
                    />
                    <div className="absolute bottom-3 left-3 bg-[#444833]/90 text-white text-[10px] font-medium px-3 py-1 rounded-full tracking-wider">
                      RENDERED FITS
                    </div>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">{product.name}</p>
                    <p className="text-xs text-gray-500">{product.brand} · £{product.price}</p>
                  </div>
                </div>
              )}

              {/* Upload Panels (not loading/result) */}
              {!showLoading && !showResult && (
                <div className="p-5">
                  {/* Step indicator */}
                  <div className="flex items-center gap-2 mb-5">
                    <div className={`flex-1 h-1 rounded-full transition-colors duration-500 ${faceUploaded ? 'bg-[#444833]' : 'bg-gray-200'}`} />
                    <div className={`flex-1 h-1 rounded-full transition-colors duration-500 ${bodyUploaded ? 'bg-[#444833]' : 'bg-gray-200'}`} />
                  </div>

                  <p className="text-[11px] text-gray-500 text-center mb-4">
                    {isSecondUpload ? 'Step 2 of 2 — Upload a body photo' : 'Step 1 of 2 — Upload a face photo'}
                  </p>

                  {/* Upload areas */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {/* Face Upload */}
                    <div
                      ref={!isSecondUpload ? faceUploadRef : undefined}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        faceUploaded
                          ? 'border-[#444833] bg-[#444833]/5'
                          : !isSecondUpload
                          ? 'border-[#444833] border-dashed animate-pulse bg-[#444833]/5'
                          : 'border-gray-200 border-dashed bg-gray-50'
                      }`}
                    >
                      {faceUploaded ? (
                        <>
                          <img src={product.faceSrc} alt="Face" className="w-full h-full object-cover" />
                          <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-[#444833] flex items-center justify-center shadow">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center gap-1 p-3">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          <span className="text-[10px] text-gray-400 text-center leading-tight">Face photo</span>
                        </div>
                      )}
                    </div>

                    {/* Body Upload */}
                    <div
                      ref={isSecondUpload && !bodyUploaded ? bodyUploadRef : undefined}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 flex items-center justify-center cursor-pointer ${
                        bodyUploaded
                          ? 'border-[#444833] bg-[#444833]/5'
                          : isSecondUpload
                          ? 'border-[#444833] border-dashed animate-pulse bg-[#444833]/5'
                          : 'border-gray-200 border-dashed bg-gray-50'
                      }`}
                    >
                      {bodyUploaded ? (
                        <>
                          <img src={product.bodySrc} alt="Body" className="w-full h-full object-cover" />
                          <div className="absolute bottom-1.5 right-1.5 w-5 h-5 rounded-full bg-[#444833] flex items-center justify-center shadow">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </>
                      ) : (
                        <div ref={isSecondUpload ? bodyUploadRef : undefined} className="flex flex-col items-center gap-1 p-3">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="text-[10px] text-gray-400 text-center leading-tight">Body photo</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Upload modal overlay */}
                  <AnimatePresence>
                    {(showUploadModal || showGallery) && (
                      <motion.div
                        className="absolute inset-0 z-10 bg-white rounded-2xl flex flex-col overflow-hidden"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      >
                        {showUploadModal && (
                          <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between px-5 py-4 border-b">
                              <span className="text-sm font-semibold">Upload photo</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center gap-4 p-6">
                              <div className={`w-20 h-20 rounded-full flex items-center justify-center ${isSecondUpload ? 'bg-blue-50' : 'bg-purple-50'}`}>
                                <svg className={`w-10 h-10 ${isSecondUpload ? 'text-blue-400' : 'text-purple-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                              </div>
                              <div className="text-center">
                                <p className="text-sm font-medium text-gray-900 mb-1">Take a photo or</p>
                                <p className="text-[11px] text-gray-500">choose from library</p>
                              </div>
                              <div className="flex flex-col w-full gap-2">
                                <button className="w-full py-3 bg-[#444833] text-white text-[12px] tracking-wider rounded-xl">Take Photo</button>
                                <button className="w-full py-3 bg-gray-100 text-gray-700 text-[12px] tracking-wider rounded-xl">Photo Library</button>
                              </div>
                            </div>
                          </div>
                        )}

                        {showGallery && (
                          <div className="flex flex-col h-full">
                            <div className="flex items-center justify-between px-5 py-4 border-b">
                              <span className="text-sm font-semibold">Choose a photo</span>
                            </div>
                            <div className="flex-1 grid grid-cols-3 gap-1 p-2 overflow-auto">
                              {[
                                product.faceSrc,
                                product.bodySrc,
                                '/result-images/siennaface-new.png',
                                '/result-images/siennaface.png',
                                '/result-images/siennaphone.png',
                                product.faceSrc,
                              ].map((src, i) => (
                                <div
                                  key={i}
                                  className={`relative aspect-square bg-gray-100 overflow-hidden rounded cursor-pointer ${
                                    (animState === 'select_face' || animState === 'select_body') && i === (isSecondUpload ? 1 : 0)
                                      ? 'ring-2 ring-[#444833]'
                                      : ''
                                  }`}
                                >
                                  <img src={src} alt="" className="w-full h-full object-cover" />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button className="w-full py-3 bg-[#444833] text-white text-[12px] tracking-wider rounded-xl opacity-50 cursor-default">
                    {faceUploaded && bodyUploaded ? 'Generating...' : 'Upload photos to continue'}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Main Page ───────────────────────────────────────────────────────────────

const AndreaIyamahDemoPage: React.FC = () => {
  const [activeProduct, setActiveProduct] = useState<DemoProduct | null>(null);

  // Auto-launch the demo on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveProduct(demoProducts[0]);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    setActiveProduct(null);
    // Re-launch after a pause so the demo loops
    setTimeout(() => setActiveProduct(demoProducts[0]), 1500);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal branded header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl tracking-[0.25em] font-light uppercase text-gray-900">Andrea Iyamah</span>
          <span className="text-[11px] tracking-[0.15em] text-gray-400 uppercase hidden sm:block">
            Powered by Rendered Fits
          </span>
        </div>
      </header>

      {/* Hero / intro */}
      <div className="max-w-6xl mx-auto px-6 py-12 text-center">
        <p className="text-[11px] tracking-[0.2em] text-gray-400 uppercase mb-3">AI Virtual Try-On Demo</p>
        <h1 className="text-3xl sm:text-4xl font-serif italic text-gray-900 mb-4">
          See Our Pieces On You
        </h1>
        <p className="text-sm text-gray-500 max-w-md mx-auto mb-10">
          Watch how Rendered Fits lets your customers try on Andrea Iyamah pieces before they buy — reducing returns and increasing confidence.
        </p>

        {/* Product card */}
        <div className="max-w-xs mx-auto">
          {demoProducts.map(product => (
            <button
              key={product.id}
              onClick={() => setActiveProduct(product)}
              className="bg-white border border-gray-200 rounded-xl overflow-hidden text-left hover:shadow-xl transition-all group w-full"
            >
              <div className="relative aspect-[3/4] bg-gray-50 overflow-hidden">
                <img
                  src={product.productSrc}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 text-gray-900 text-[11px] tracking-[0.15em] font-medium px-5 py-2.5">
                    WATCH DEMO
                  </span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-1">{product.brand}</p>
                <h3 className="text-sm font-medium text-gray-900 mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">&pound;{product.price}</span>
                  <span className="text-[10px] tracking-wider text-[#444833] font-medium">TRY ON →</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Full-screen demo overlay */}
      <AnimatePresence>
        {activeProduct && (
          <motion.div
            key={activeProduct.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <MockProductPage product={activeProduct} onClose={handleClose} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AndreaIyamahDemoPage;
