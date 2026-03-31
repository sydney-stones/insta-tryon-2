/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { WardrobeItem } from '../types';
import { generateDirectVirtualTryOn } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';
import { canUseTryOn, getRemainingTryOns, incrementTryOnUsage, saveTryOnResult, getAllTryOnResults, TryOnHistoryEntry } from '../lib/tryOnLimit';
import { logTryOnEvent } from '../lib/tryOnAnalytics';
import { logPersistentTryOnEvent } from '../lib/persistentAnalytics';
import { addWatermark } from '../lib/watermark';
import { FEATURE_FLAGS } from '../config/featureFlags';

interface ProductSizeMeta {
  sizes?: string[];
  defaultSize?: string;
  sizesLabel?: string;
  sizes2?: string[];
  defaultSize2?: string;
  sizes2Label?: string;
  price?: string;
}

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: WardrobeItem | null;
  isUnlimited?: boolean;
  customPrompt?: string;
  skipWatermark?: boolean;
  productMeta?: ProductSizeMeta;
  onResult?: (imageUrl: string) => void;
}

type ModalStep = 'upload' | 'limit-reached' | 'generating' | 'my-looks';

// ─── Shared top bar ───────────────────────────────────────────────────────────

const TopBar: React.FC<{
  onMyLooks: () => void;
  onClose: () => void;
  creditsEl?: React.ReactNode;
  myLooksActive?: boolean;
}> = ({ onMyLooks, onClose, creditsEl, myLooksActive }) => (
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '48px', borderBottom: '1px solid #D1D5DC', flexShrink: 0, backgroundColor: '#fff' }}>
    <button
      onClick={onMyLooks}
      style={{
        display: 'flex', alignItems: 'center', padding: '0 16px', gap: '8px', height: '48px',
        minWidth: '113px', background: 'none', borderRight: '1px solid #D1D5DC', cursor: 'pointer',
        backgroundColor: myLooksActive ? '#F3F4F6' : 'transparent',
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
      </svg>
      <span style={{ fontSize: '14px', color: '#101828', whiteSpace: 'nowrap' }}>My looks</span>
    </button>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {creditsEl}
      <button onClick={onClose} style={{ width: '48px', height: '48px', background: 'none', border: 'none', borderLeft: '1px solid #D1D5DC', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
);

const Footer: React.FC = () => (
  <div style={{ height: '36px', borderTop: '1px solid #D1D5DC', backgroundColor: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexShrink: 0 }}>
    <span style={{ fontSize: '11px', color: '#6A7282' }}>Powered by</span>
    <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E2939', letterSpacing: '0.05em' }}>RENDERED FITS</span>
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ isOpen, onClose, product, isUnlimited = false, customPrompt, skipWatermark = false, productMeta, onResult }) => {
  const [step, setStep] = useState<ModalStep>('upload');
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingTries, setRemainingTries] = useState(1);
  const [myLooks, setMyLooks] = useState<TryOnHistoryEntry[]>([]);
  const [selectedLook, setSelectedLook] = useState<TryOnHistoryEntry | null>(null);
  const [lookFullscreen, setLookFullscreen] = useState(false);
  const [lookSize, setLookSize] = useState('');
  const [lookSize2, setLookSize2] = useState('');

  const handleClose = () => {
    setStep('upload');
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setError(null);
    setSelectedLook(null);
    setLookFullscreen(false);
    onClose();
  };

  const handleMyLooks = () => {
    setMyLooks(getAllTryOnResults());
    setSelectedLook(null);
    setLookFullscreen(false);
    setStep(step === 'my-looks' ? 'upload' : 'my-looks');
  };

  const openLook = (look: TryOnHistoryEntry) => {
    setSelectedLook(look);
    setLookSize(look.defaultSize ?? '');
    setLookSize2(look.defaultSize2 ?? '');
    setLookFullscreen(false);
  };

  React.useEffect(() => {
    if (isOpen && !isUnlimited) {
      setRemainingTries(getRemainingTryOns());
    }
    if (isOpen) {
      setStep('upload');
    }
  }, [isOpen, isUnlimited]);

  const handleFaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
      setFaceImage(file);
      setError(null);
      const reader = new FileReader();
      reader.onload = (ev) => setFacePreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleBodySelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) { setError('Please select an image file.'); return; }
      setBodyImage(file);
      setError(null);
      const reader = new FileReader();
      reader.onload = (ev) => setBodyPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = useCallback(async () => {
    if (!faceImage || !bodyImage) {
      setError('Please upload both a face photo and a full body photo.');
      return;
    }
    if (!isUnlimited && !canUseTryOn()) {
      setStep('limit-reached');
      setRemainingTries(0);
      return;
    }
    setError(null);
    setStep('generating');
    try {
      const response = await fetch(product!.url);
      const blob = await response.blob();
      const garmentFile = new File([blob], product!.name, { type: blob.type });
      const tryOnResult = await generateDirectVirtualTryOn(faceImage, bodyImage, garmentFile, undefined, '2K', customPrompt ? { customPrompt } : undefined);
      const finalImage = skipWatermark ? tryOnResult : await addWatermark(tryOnResult);
      saveTryOnResult(finalImage, product!.id, product!.name, productMeta);
      if (!isUnlimited) {
        incrementTryOnUsage();
        setRemainingTries(getRemainingTryOns());
      }
      logTryOnEvent(product!.id, product!.name);
      logPersistentTryOnEvent(product!.id, product!.name);
      handleClose();
      onResult?.(finalImage);
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
      setStep('upload');
    }
  }, [faceImage, bodyImage, product, isUnlimited, customPrompt, skipWatermark]);

  if (!isOpen) return null;

  const bothImagesUploaded = faceImage !== null && bodyImage !== null;

  const creditsEl = !isUnlimited ? (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 8px', backgroundColor: '#1E2939', height: '20px', marginRight: '16px' }}>
      <span style={{ fontSize: '12px', fontWeight: 500, color: '#F9FAFB', whiteSpace: 'nowrap' }}>{remainingTries} {remainingTries === 1 ? 'credit' : 'credits'} left</span>
    </div>
  ) : undefined;

  return (
    <>
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
          className="shadow-2xl w-full sm:w-auto"
          style={{ borderRadius: '0px', backgroundColor: '#fff', maxWidth: '768px', maxHeight: '95vh', overflow: 'hidden', position: 'relative', fontFamily: "'Jost', sans-serif" }}
        >
          <div className="overflow-y-auto max-h-[95vh]">
            <AnimatePresence mode="wait">
              {/* Feature Disabled */}
              {!FEATURE_FLAGS.VIRTUAL_TRY_ON_ENABLED ? (
                <motion.div key="under-development" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="p-8 sm:p-12">
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">Site is Currently Under Development</h2>
                    <p className="text-gray-600 text-lg mb-6">Try again soon</p>
                    <button onClick={handleClose} className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors">Close</button>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Limit Reached */}
                  {step === 'limit-reached' && (
                    <motion.div key="limit-reached" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="p-8 sm:p-12">
                      <div className="text-center max-w-md mx-auto">
                        <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                          <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        </div>
                        <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3"><strong>Out of tries for today!</strong></h2>
                        <p className="text-gray-600 mb-4">Come back tomorrow for your next FREE try-on</p>
                        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg mb-6">
                          <p className="text-sm text-gray-800">Follow{' '}
                            <a href="https://www.instagram.com/renderedfits" target="_blank" rel="noopener noreferrer" className="font-semibold text-purple-600 hover:text-purple-800 underline">@renderedfits</a>
                            {' '}for updates
                          </p>
                        </div>
                        <button onClick={handleClose} className="w-full px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors">Got It</button>
                      </div>
                    </motion.div>
                  )}

                  {/* My Looks */}
                  {step === 'my-looks' && (
                    <motion.div key="my-looks" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <TopBar onMyLooks={handleMyLooks} onClose={handleClose} creditsEl={creditsEl} myLooksActive />
                      <div style={{ minHeight: '300px' }}>
                        {myLooks.length === 0 ? (
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 24px', textAlign: 'center', minHeight: '300px' }}>
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#D1D5DC" strokeWidth="1" style={{ marginBottom: '16px' }}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
                            </svg>
                            <p style={{ fontSize: '16px', fontWeight: 500, color: '#101828', marginBottom: '8px' }}>No try-ons yet</p>
                            <p style={{ fontSize: '13px', color: '#6A7282', marginBottom: '24px' }}>Generate your first try-on to see it here</p>
                            <button
                              onClick={() => setStep('upload')}
                              style={{ padding: '10px 24px', fontSize: '13px', fontWeight: 500, color: '#fff', backgroundColor: '#1E2939', border: 'none', cursor: 'pointer', letterSpacing: '0.06em', textTransform: 'uppercase' }}
                            >
                              Try something on
                            </button>
                          </div>
                        ) : selectedLook ? (
                          /* ── Look detail view ── */
                          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            {/* Back */}
                            <button
                              onClick={() => { setSelectedLook(null); setLookFullscreen(false); }}
                              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', background: 'none', border: 'none', borderBottom: '1px solid #E5E7EB', cursor: 'pointer', fontSize: '13px', color: '#6A7282', flexShrink: 0 }}
                            >
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15 18l-6-6 6-6"/></svg>
                              Back to My Looks
                            </button>
                            <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                              {/* Image panel */}
                              <div style={{ flex: 1, position: 'relative', backgroundColor: '#F9FAFB', overflow: 'hidden' }}>
                                <img
                                  src={selectedLook.tryOnImageUrl}
                                  alt={selectedLook.productName || 'Try-on result'}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                                />
                                {/* Fullscreen button */}
                                <button
                                  onClick={() => setLookFullscreen(true)}
                                  style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.45)', border: 'none', borderRadius: '4px', padding: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 3H5a2 2 0 00-2 2v3m18 0V5a2 2 0 00-2-2h-3m0 18h3a2 2 0 002-2v-3M3 16v3a2 2 0 002 2h3"/></svg>
                                </button>
                              </div>
                              {/* Info panel */}
                              <div style={{ width: '220px', flexShrink: 0, padding: '16px', overflowY: 'auto', borderLeft: '1px solid #E5E7EB', display: 'flex', flexDirection: 'column', gap: '14px' }}>
                                {selectedLook.productName && (
                                  <p style={{ fontSize: '13px', fontWeight: 700, color: '#101828', textTransform: 'uppercase', letterSpacing: '0.04em', margin: 0 }}>{selectedLook.productName}</p>
                                )}
                                {selectedLook.price && (
                                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#101828', margin: 0 }}>{selectedLook.price}</p>
                                )}
                                {/* Size 1 */}
                                {selectedLook.sizes && selectedLook.sizes.length > 1 && (
                                  <div>
                                    <p style={{ fontSize: '12px', color: '#101828', margin: '0 0 6px' }}>{selectedLook.sizesLabel ?? 'Size'}: <strong>{lookSize}</strong></p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                      {selectedLook.sizes.map(s => (
                                        <button key={s} onClick={() => setLookSize(s)} style={{
                                          padding: '5px 10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                                          border: lookSize === s ? '2px solid #111' : '1px solid #ccc',
                                          backgroundColor: lookSize === s ? '#111' : '#fff',
                                          color: lookSize === s ? '#fff' : '#111',
                                        }}>{s}</button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {/* Size 2 — matching sets */}
                                {selectedLook.sizes2 && selectedLook.sizes2.length > 0 && (
                                  <div>
                                    <p style={{ fontSize: '12px', color: '#101828', margin: '0 0 6px' }}>{selectedLook.sizes2Label ?? 'Size 2'}: <strong>{lookSize2}</strong></p>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                      {selectedLook.sizes2.map(s => (
                                        <button key={s} onClick={() => setLookSize2(s)} style={{
                                          padding: '5px 10px', fontSize: '12px', fontWeight: 500, cursor: 'pointer',
                                          border: lookSize2 === s ? '2px solid #111' : '1px solid #ccc',
                                          backgroundColor: lookSize2 === s ? '#111' : '#fff',
                                          color: lookSize2 === s ? '#fff' : '#111',
                                        }}>{s}</button>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                <button style={{
                                  width: '100%', padding: '12px', fontSize: '12px', fontWeight: 700,
                                  letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff',
                                  backgroundColor: '#111', border: 'none', cursor: 'default', marginTop: 'auto',
                                }}>ADD TO CART</button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div style={{ padding: '16px' }}>
                            <p style={{ fontSize: '13px', color: '#6A7282', marginBottom: '16px' }}>{myLooks.length} {myLooks.length === 1 ? 'result' : 'results'} saved on this device</p>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
                              {myLooks.map((look, i) => (
                                <div key={i} style={{ position: 'relative', cursor: 'pointer' }} onClick={() => openLook(look)}>
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
                          </div>
                        )}
                      </div>
                      <Footer />
                    </motion.div>
                  )}

                  {/* Upload Step */}
                  {step === 'upload' && (
                    <motion.div key="upload" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <TopBar onMyLooks={handleMyLooks} onClose={handleClose} creditsEl={creditsEl} />

                        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
                          {/* Left — Product Image */}
                          <div style={{ width: '50%', flexShrink: 0, backgroundColor: '#F9FAFB', position: 'relative' }} className="hidden lg:block">
                            <img src={product?.url} alt={product?.name} style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '400px' }} />
                          </div>

                          {/* Right — Upload Form */}
                          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', flex: 1 }}>
                              <div style={{ padding: '20px 20px 0' }}>
                                <p style={{ fontSize: '22px', fontWeight: 400, textTransform: 'uppercase', color: '#101828', lineHeight: '28px' }}>
                                  TRY IT ON, VIRTUALLY
                                </p>
                              </div>

                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                {/* Face uploader */}
                                <label htmlFor="face-upload" style={{ cursor: 'pointer' }}>
                                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#101828', padding: '0 20px', marginBottom: '4px' }}>Face photo</p>
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px', gap: '12px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', marginLeft: '20px', marginRight: '20px' }}>
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
                                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '20px' }}>
                                        {facePreview ? 'Face photo uploaded' : 'Upload your photo here'}
                                      </p>
                                      <p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '18px' }}>
                                        {facePreview ? 'Tap to change' : 'Format: png, jpg, heic · Max 25 MB'}
                                      </p>
                                    </div>
                                  </div>
                                </label>
                                <input id="face-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleFaceSelect} />

                                <div style={{ height: '20px' }} />

                                {/* Body uploader */}
                                <label htmlFor="body-upload" style={{ cursor: 'pointer' }}>
                                  <p style={{ fontSize: '14px', fontWeight: 400, color: '#101828', padding: '0 20px', marginBottom: '4px' }}>Full body photo</p>
                                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', padding: '12px', gap: '12px', backgroundColor: '#F9FAFB', borderBottom: '1px solid #D1D5DC', marginLeft: '20px', marginRight: '20px' }}>
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
                                      <p style={{ fontSize: '14px', fontWeight: 500, color: '#101828', marginBottom: '0', lineHeight: '20px' }}>
                                        {bodyPreview ? 'Full body photo uploaded' : 'Upload your photo here'}
                                      </p>
                                      <p style={{ fontSize: '12px', color: '#6A7282', lineHeight: '18px' }}>
                                        {bodyPreview ? 'Tap to change' : 'Format: png, jpg, heic · Max 25 MB'}
                                      </p>
                                    </div>
                                  </div>
                                </label>
                                <input id="body-upload" type="file" className="hidden" accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif" onChange={handleBodySelect} />
                              </div>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                              {error && (
                                <div style={{ padding: '0 20px 8px' }}>
                                  <p style={{ fontSize: '12px', color: '#dc2626', backgroundColor: '#fef2f2', padding: '8px 12px', border: '1px solid #fecaca' }}>{error}</p>
                                </div>
                              )}
                              <div style={{ padding: '8px 20px' }}>
                                <p style={{ fontSize: '11px', color: '#6A7282', lineHeight: '16px' }}>
                                  By uploading your photo, you agree to our{' '}
                                  <Link to="/legal/end-user-terms" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Terms &amp; Conditions</Link>{' '}
                                  and{' '}
                                  <Link to="/legal/app-privacy-policy" target="_blank" style={{ color: '#6A7282', textDecoration: 'underline' }}>Privacy Policy</Link>.
                                  {' '}Your image is never permanently stored.
                                </p>
                              </div>
                              <button
                                onClick={handleGenerate}
                                disabled={!bothImagesUploaded}
                                style={{
                                  width: '100%', height: '48px', fontSize: '14px', fontWeight: 400,
                                  color: bothImagesUploaded ? '#fff' : '#D1D5DC',
                                  backgroundColor: bothImagesUploaded ? '#1E2939' : '#6A7282',
                                  border: 'none', cursor: bothImagesUploaded ? 'pointer' : 'not-allowed',
                                  fontFamily: "'Jost', sans-serif",
                                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                                }}
                              >
                                {bothImagesUploaded ? (
                                  <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
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
                            <Footer />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Generating Step */}
                  {step === 'generating' && (
                    <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <div style={{ fontFamily: "'Jost', sans-serif" }}>
                        <TopBar onMyLooks={handleMyLooks} onClose={handleClose} creditsEl={creditsEl} />
                        <div style={{ padding: '32px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '300px', textAlign: 'center' }}>
                          <p style={{ fontSize: '22px', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#101828', marginBottom: '28px' }}>
                            GETTING DRESSED!
                          </p>
                          <Spinner />
                          <p style={{ fontSize: '13px', color: '#6A7282', marginTop: '16px', maxWidth: '240px', lineHeight: 1.6 }}>
                            Our AI is creating a personalised try-on with your photos and the garment...
                          </p>
                        </div>
                        <Footer />
                      </div>
                    </motion.div>
                  )}
                </>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>

    {/* Fullscreen look overlay */}
    <AnimatePresence>
      {lookFullscreen && selectedLook && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={() => setLookFullscreen(false)}
        >
          <button
            onClick={() => setLookFullscreen(false)}
            style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.15)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
          <img
            src={selectedLook.tryOnImageUrl}
            alt={selectedLook.productName || 'Try-on result'}
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain', display: 'block' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
};

export default VirtualTryOnModal;
