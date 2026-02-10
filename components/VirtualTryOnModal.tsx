/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WardrobeItem } from '../types';
import { generateDirectVirtualTryOn } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';
import { canUseTryOn, getRemainingTryOns, incrementTryOnUsage, saveTryOnResult } from '../lib/tryOnLimit';
import { logTryOnEvent } from '../lib/tryOnAnalytics';
import { logPersistentTryOnEvent } from '../lib/persistentAnalytics';
import { addWatermark } from '../lib/watermark';
import { FEATURE_FLAGS } from '../config/featureFlags';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: WardrobeItem | null;
  isUnlimited?: boolean;
}

type ModalStep = 'upload' | 'limit-reached' | 'generating';

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ isOpen, onClose, product, isUnlimited = false }) => {
  const [step, setStep] = useState<ModalStep>('upload');
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingTries, setRemainingTries] = useState(1);

  const handleClose = () => {
    setStep('upload');
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setError(null);
    onClose();
  };

  React.useEffect(() => {
    if (isOpen && !isUnlimited) {
      setRemainingTries(getRemainingTryOns());
    }
  }, [isOpen, isUnlimited]);

  const handleFaceSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
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
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        return;
      }
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

      const tryOnResult = await generateDirectVirtualTryOn(faceImage, bodyImage, garmentFile);
      const watermarkedImage = await addWatermark(tryOnResult);
      saveTryOnResult(watermarkedImage, product!.id);

      if (!isUnlimited) {
        incrementTryOnUsage();
        setRemainingTries(getRemainingTryOns());
      }

      logTryOnEvent(product!.id, product!.name);
      logPersistentTryOnEvent(product!.id, product!.name);
      handleClose();
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
      setStep('upload');
    }
  }, [faceImage, bodyImage, product, isUnlimited]);

  if (!isOpen) return null;

  const bothImagesUploaded = faceImage !== null && bodyImage !== null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-lg"
        >
          <div className="overflow-y-auto max-h-[90vh]">
            <AnimatePresence mode="wait">
              {/* Feature Disabled */}
              {!FEATURE_FLAGS.VIRTUAL_TRY_ON_ENABLED ? (
                <motion.div
                  key="under-development"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
                      Site is Currently Under Development
                    </h2>
                    <p className="text-gray-600 text-lg mb-6">Try again soon</p>
                    <button
                      onClick={handleClose}
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              ) : (
                <>
              {/* Limit Reached */}
              {step === 'limit-reached' && (
                <motion.div
                  key="limit-reached"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center max-w-md mx-auto">
                    <div className="w-20 h-20 mx-auto mb-6 bg-amber-100 rounded-full flex items-center justify-center">
                      <svg className="w-10 h-10 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                      <strong>Out of tries for today!</strong>
                    </h2>
                    <p className="text-gray-600 mb-4">
                      Come back tomorrow for your next FREE try-on
                    </p>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-lg mb-6">
                      <p className="text-sm text-gray-800">
                        Follow{' '}
                        <a
                          href="https://www.instagram.com/renderedfits"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-semibold text-purple-600 hover:text-purple-800 underline"
                        >
                          @renderedfits
                        </a>
                        {' '}for updates
                      </p>
                    </div>
                    <button
                      onClick={handleClose}
                      className="w-full px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
                    >
                      Got It
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Upload Step — Split Layout */}
              {step === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Left — Product Image */}
                    <div className="hidden lg:block bg-gray-50">
                      <img
                        src={product?.url}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right — Upload Form */}
                    <div className="flex flex-col">
                      {/* Top Bar */}
                      <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                        <div className="flex items-center gap-2 text-[13px] text-gray-700">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                            <path d="M12 2L9 9H2l5.5 4-2 7L12 16l6.5 4-2-7L22 9h-7L12 2z" />
                          </svg>
                          My looks
                        </div>
                        <div className="flex items-center gap-3">
                          {!isUnlimited && (
                            <span className="text-[12px] font-medium bg-[#1a1a1a] text-white px-3 py-1 rounded">
                              {remainingTries} {remainingTries === 1 ? 'credit' : 'credits'} left
                            </span>
                          )}
                          <button
                            onClick={handleClose}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 px-5 py-6 overflow-y-auto">
                        <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-6">
                          TRY IT ON, VIRTUALLY
                        </h2>

                        {/* Face Photo */}
                        <div className="mb-5">
                          <p className="text-[13px] font-medium text-gray-900 mb-2">Face photo</p>
                          <label htmlFor="face-upload" className="block cursor-pointer">
                            <div className={`relative border rounded-lg p-4 transition-colors ${
                              facePreview ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}>
                              {facePreview ? (
                                <div className="flex items-center gap-3">
                                  <img src={facePreview} alt="Face" className="w-12 h-12 rounded object-cover" />
                                  <div>
                                    <p className="text-[13px] font-medium text-green-700">Face photo uploaded</p>
                                    <p className="text-[11px] text-green-600">Tap to change</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start gap-3">
                                  <svg className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                    <circle cx="12" cy="8" r="5" />
                                    <path d="M9 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                    <path d="M13 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                    <path d="M10 13a2.5 2.5 0 004 0" />
                                  </svg>
                                  <div>
                                    <p className="text-[13px] font-medium text-gray-900">Upload your photo here</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            id="face-upload"
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif"
                            onChange={handleFaceSelect}
                          />
                        </div>

                        {/* Full Body Photo */}
                        <div className="mb-5">
                          <p className="text-[13px] font-medium text-gray-900 mb-2">Full body photo</p>
                          <label htmlFor="body-upload" className="block cursor-pointer">
                            <div className={`relative border rounded-lg p-4 transition-colors ${
                              bodyPreview ? 'border-green-400 bg-green-50' : 'border-gray-200 hover:border-gray-300 bg-white'
                            }`}>
                              {bodyPreview ? (
                                <div className="flex items-center gap-3">
                                  <img src={bodyPreview} alt="Body" className="w-12 h-12 rounded object-cover" />
                                  <div>
                                    <p className="text-[13px] font-medium text-green-700">Body photo uploaded</p>
                                    <p className="text-[11px] text-green-600">Tap to change</p>
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-start gap-3">
                                  <svg className="w-8 h-8 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                    <circle cx="12" cy="4" r="2.5" />
                                    <path d="M12 7v5" />
                                    <path d="M8 9l4 1 4-1" />
                                    <path d="M10 12l-2 8" />
                                    <path d="M14 12l2 8" />
                                  </svg>
                                  <div>
                                    <p className="text-[13px] font-medium text-gray-900">Upload your photo here</p>
                                    <p className="text-[11px] text-gray-400 mt-0.5">Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                                  </div>
                                </div>
                              )}
                            </div>
                          </label>
                          <input
                            id="body-upload"
                            type="file"
                            className="hidden"
                            accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif"
                            onChange={handleBodySelect}
                          />
                        </div>

                        {error && (
                          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                            <p className="text-red-700 text-[12px]">{error}</p>
                          </div>
                        )}
                      </div>

                      {/* Bottom Bar */}
                      <div className="border-t border-gray-200 px-5 py-4">
                        {/* Product Tags */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-[11px] bg-gray-100 text-gray-700 px-2.5 py-1 rounded border border-gray-200">
                            {product?.name}
                          </span>
                        </div>

                        {/* Try On Button */}
                        <button
                          onClick={handleGenerate}
                          disabled={!bothImagesUploaded}
                          className={`w-full py-3 px-6 rounded-lg text-[13px] font-medium tracking-wide transition-all flex items-center justify-center gap-2 ${
                            bothImagesUploaded
                              ? 'bg-[#1a1a1a] text-white hover:bg-black'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                          Try on
                        </button>
                      </div>

                      {/* Footer */}
                      <div className="border-t border-gray-100 px-5 py-2.5 text-center">
                        <p className="text-[11px] text-gray-400">
                          Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Generating Step — Split Layout */}
              {step === 'generating' && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                    {/* Left — Product Image */}
                    <div className="hidden lg:block bg-gray-50">
                      <img
                        src={product?.url}
                        alt={product?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Right — Loading */}
                    <div className="flex flex-col items-center justify-center p-8 sm:p-12 min-h-[400px]">
                      <Spinner />
                      <h3 className="text-xl font-light tracking-wide text-gray-900 mt-6 mb-2">
                        Generating Your Try-On
                      </h3>
                      <p className="text-gray-500 text-[13px] text-center max-w-xs">
                        Our AI is creating a personalized try-on with your photos and the garment...
                      </p>

                      {/* Footer */}
                      <div className="absolute bottom-0 left-0 right-0 border-t border-gray-100 px-5 py-2.5 text-center">
                        <p className="text-[11px] text-gray-400">
                          Powered by <span className="font-bold text-gray-600">RENDERED FITS</span> &rarr;
                        </p>
                      </div>
                    </div>
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
  );
};

export default VirtualTryOnModal;
