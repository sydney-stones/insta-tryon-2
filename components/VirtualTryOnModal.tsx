/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WardrobeItem } from '../types';
import { generateModelImage, generateVirtualTryOnImage } from '../services/geminiService';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';
import { canUseTryOn, getRemainingTryOns, incrementTryOnUsage, saveGeneratedModel, getSavedModel, saveTryOnResult } from '../lib/tryOnLimit';
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

type ModalStep = 'upload' | 'limit-reached' | 'generating-model' | 'model-ready' | 'generating-tryon';

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ isOpen, onClose, product, isUnlimited = false }) => {
  const [step, setStep] = useState<ModalStep>('upload');
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [modelImageUrl, setModelImageUrl] = useState<string | null>(null);
  const [tryOnImageUrl, setTryOnImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingTries, setRemainingTries] = useState(1);

  const handleClose = () => {
    setStep('upload');
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setModelImageUrl(null);
    setTryOnImageUrl(null);
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
    setStep('generating-model');

    try {
      // Generate model from both face and body photos
      const generatedModel = await generateModelImage(faceImage, bodyImage);

      if (!isUnlimited) {
        saveGeneratedModel(generatedModel);
      }

      setModelImageUrl(generatedModel);
      setStep('model-ready');

      if (product) {
        setStep('generating-tryon');

        const response = await fetch(product.url);
        const blob = await response.blob();
        const garmentFile = new File([blob], product.name, { type: blob.type });

        const tryOnResult = await generateVirtualTryOnImage(generatedModel, garmentFile);
        const watermarkedImage = await addWatermark(tryOnResult);
        setTryOnImageUrl(watermarkedImage);
        saveTryOnResult(watermarkedImage, product.id);

        if (!isUnlimited) {
          incrementTryOnUsage();
          setRemainingTries(getRemainingTryOns());
        }

        logTryOnEvent(product.id, product.name);
        logPersistentTryOnEvent(product.id, product.name);
        handleClose();
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
      setStep('upload');
    }
  }, [faceImage, bodyImage, product, isUnlimited]);

  const handleUseSavedModel = async () => {
    if (!isUnlimited && !canUseTryOn()) {
      setStep('limit-reached');
      setRemainingTries(0);
      return;
    }

    const savedModel = getSavedModel();
    if (!savedModel || !product) return;

    setStep('generating-tryon');
    setModelImageUrl(savedModel);

    try {
      const response = await fetch(product.url);
      const blob = await response.blob();
      const garmentFile = new File([blob], product.name, { type: blob.type });

      const tryOnResult = await generateVirtualTryOnImage(savedModel, garmentFile);
      const watermarkedImage = await addWatermark(tryOnResult);
      setTryOnImageUrl(watermarkedImage);
      saveTryOnResult(watermarkedImage, product.id);

      if (!isUnlimited) {
        incrementTryOnUsage();
        setRemainingTries(getRemainingTryOns());
      }

      logTryOnEvent(product.id, product.name);
      logPersistentTryOnEvent(product.id, product.name);
      handleClose();
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
      setStep('upload');
    }
  };

  if (!isOpen) return null;

  const savedModelExists = getSavedModel() !== null;
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
          className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          >
            <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

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

              {/* Upload Step - Face + Full Body */}
              {step === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-3">
                      Try On {product?.name}
                    </h2>
                    <p className="text-gray-600">
                      {savedModelExists ? 'Use your existing model or upload new photos' : 'Upload a face photo and a full body photo to see how this item looks on you'}
                    </p>
                    {!isUnlimited && (
                      <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-full">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm font-medium text-blue-900">
                          {remainingTries} {remainingTries === 1 ? 'try' : 'tries'} remaining today
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="max-w-lg mx-auto space-y-6">
                    {/* Use Saved Model */}
                    {savedModelExists && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleUseSavedModel}
                          className="w-full p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg hover:border-indigo-400 transition-colors group"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center">
                              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <div className="flex-1 text-left">
                              <p className="text-lg font-semibold text-gray-900 mb-1">Use Your Saved Model</p>
                              <p className="text-sm text-gray-600">Skip the upload and try on instantly</p>
                            </div>
                            <svg className="w-6 h-6 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </motion.button>
                        <div className="relative">
                          <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                          </div>
                          <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">or upload new photos</span>
                          </div>
                        </div>
                      </>
                    )}

                    {/* Two Upload Boxes */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Face Photo Upload */}
                      <label htmlFor="face-upload" className="block cursor-pointer group">
                        <div className={`relative aspect-square rounded-xl border-2 border-dashed transition-colors overflow-hidden ${
                          facePreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}>
                          {facePreview ? (
                            <img src={facePreview} alt="Face photo" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              {/* Face Icon */}
                              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                <circle cx="12" cy="8" r="5" />
                                <path d="M9 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                <path d="M13 9.5a1 1 0 011-1h0a1 1 0 011 1" />
                                <path d="M10 13a2.5 2.5 0 004 0" />
                              </svg>
                              <p className="text-sm font-semibold text-gray-700 text-center">Face Photo</p>
                              <p className="text-[11px] text-gray-400 mt-1 text-center">Clear front-facing selfie</p>
                            </div>
                          )}
                          {facePreview && (
                            <div className="absolute bottom-2 left-2 right-2 bg-green-600 text-white text-[11px] font-medium py-1 px-2 rounded text-center">
                              Face photo uploaded
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

                      {/* Full Body Photo Upload */}
                      <label htmlFor="body-upload" className="block cursor-pointer group">
                        <div className={`relative aspect-square rounded-xl border-2 border-dashed transition-colors overflow-hidden ${
                          bodyPreview ? 'border-green-400 bg-green-50' : 'border-gray-300 hover:border-gray-400 bg-gray-50'
                        }`}>
                          {bodyPreview ? (
                            <img src={bodyPreview} alt="Body photo" className="w-full h-full object-cover" />
                          ) : (
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                              {/* Full Body Icon */}
                              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
                                <circle cx="12" cy="4" r="2.5" />
                                <path d="M12 7v5" />
                                <path d="M8 9l4 1 4-1" />
                                <path d="M10 12l-2 8" />
                                <path d="M14 12l2 8" />
                              </svg>
                              <p className="text-sm font-semibold text-gray-700 text-center">Full Body Photo</p>
                              <p className="text-[11px] text-gray-400 mt-1 text-center">Head-to-toe standing photo</p>
                            </div>
                          )}
                          {bodyPreview && (
                            <div className="absolute bottom-2 left-2 right-2 bg-green-600 text-white text-[11px] font-medium py-1 px-2 rounded text-center">
                              Body photo uploaded
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

                    {/* Generate Button */}
                    <motion.button
                      whileHover={bothImagesUploaded ? { scale: 1.02 } : {}}
                      whileTap={bothImagesUploaded ? { scale: 0.98 } : {}}
                      onClick={handleGenerate}
                      disabled={!bothImagesUploaded}
                      className={`w-full py-4 px-6 rounded-lg font-semibold text-sm tracking-wide transition-all ${
                        bothImagesUploaded
                          ? 'bg-[#1a1a1a] text-white hover:bg-black'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {bothImagesUploaded ? 'GENERATE TRY-ON' : 'Upload both photos to continue'}
                    </motion.button>

                    {error && (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Generating Model Step */}
              {step === 'generating-model' && (
                <motion.div
                  key="generating-model"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12 flex flex-col items-center justify-center min-h-[400px]"
                >
                  <Spinner />
                  <h3 className="text-2xl font-serif font-bold text-gray-900 mt-6 mb-2">
                    Creating Your Model
                  </h3>
                  <p className="text-gray-600 text-center max-w-md">
                    Our AI is analyzing your photos and creating a personalized model...
                  </p>
                </motion.div>
              )}

              {/* Model Ready Step */}
              {step === 'model-ready' && modelImageUrl && (
                <motion.div
                  key="model-ready"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      Your Model is Ready!
                    </h2>
                    <p className="text-gray-600">
                      Now applying {product?.name} to your model...
                    </p>
                  </div>
                  <div className="max-w-md mx-auto mb-6">
                    <img src={modelImageUrl} alt="Your model" className="w-full h-auto rounded-xl shadow-lg" />
                  </div>
                  <div className="flex justify-center">
                    <Spinner />
                  </div>
                </motion.div>
              )}

              {/* Generating Try-On Step */}
              {step === 'generating-tryon' && modelImageUrl && (
                <motion.div
                  key="generating-tryon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      Your Model is Ready!
                    </h2>
                    <p className="text-gray-600">
                      Applying {product?.name} to your model...
                    </p>
                  </div>
                  <div className="max-w-md mx-auto mb-6">
                    <div className="relative">
                      <img src={modelImageUrl} alt="Your model" className="w-full h-auto rounded-xl shadow-lg" />
                      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] rounded-xl flex items-center justify-center">
                        <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg">
                          <Spinner />
                          <p className="text-gray-900 font-semibold mt-2">Applying outfit...</p>
                        </div>
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
