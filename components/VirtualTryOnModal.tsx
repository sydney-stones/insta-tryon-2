/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { generateModelImage, generateVirtualTryOnImage } from '../services/geminiService';
import { UploadCloudIcon } from './icons';
import Spinner from './Spinner';
import { getFriendlyErrorMessage } from '../lib/utils';
import { canUseTryOn, getRemainingTryOns, incrementTryOnUsage, saveGeneratedModel, getSavedModel } from '../lib/tryOnLimit';
import { logTryOnEvent } from '../lib/tryOnAnalytics';
import { logPersistentTryOnEvent } from '../lib/persistentAnalytics';
import { addWatermark } from '../lib/watermark';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: WardrobeItem | null;
  isUnlimited?: boolean; // For admin mode
}

type ModalStep = 'upload' | 'limit-reached' | 'generating-model' | 'model-ready' | 'generating-tryon' | 'result';

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ isOpen, onClose, product, isUnlimited = false }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState<ModalStep>('upload');
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [modelImageUrl, setModelImageUrl] = useState<string | null>(null);
  const [tryOnImageUrl, setTryOnImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [remainingTries, setRemainingTries] = useState(3);
  const [showPurchasePopup, setShowPurchasePopup] = useState(false);

  const handleClose = () => {
    setStep('upload');
    setUserImageUrl(null);
    setModelImageUrl(null);
    setTryOnImageUrl(null);
    setError(null);
    setShowPurchasePopup(false);
    onClose();
  };

  // Update remaining tries when modal opens
  React.useEffect(() => {
    if (isOpen && !isUnlimited) {
      setRemainingTries(getRemainingTryOns());
    }
  }, [isOpen, isUnlimited]);

  const handleFileSelect = useCallback(async (file: File) => {
    // Check limit before processing (unless unlimited mode)
    if (!isUnlimited && !canUseTryOn()) {
      setStep('limit-reached');
      setRemainingTries(0);
      return;
    }

    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      setUserImageUrl(dataUrl);
      setError(null);
      setStep('generating-model');

      try {
        // Step 1: Check if we have a saved model from today, otherwise generate new one
        let generatedModel = getSavedModel();

        if (!generatedModel) {
          // Generate new model from user's selfie
          generatedModel = await generateModelImage(file);

          // Save the model for reuse (unless unlimited mode)
          if (!isUnlimited) {
            saveGeneratedModel(generatedModel);
          }
        }

        setModelImageUrl(generatedModel);

        // Show model-ready step with the generated model
        setStep('model-ready');

        // Step 2: Generate try-on with the product in the background
        if (product) {
          // Start generating try-on
          setStep('generating-tryon');

          // Convert product URL to File
          const response = await fetch(product.url);
          const blob = await response.blob();
          const garmentFile = new File([blob], product.name, { type: blob.type });

          const tryOnResult = await generateVirtualTryOnImage(generatedModel, garmentFile);

          // Add watermark to the generated image
          const watermarkedImage = await addWatermark(tryOnResult);
          setTryOnImageUrl(watermarkedImage);

          // Increment usage count on success (unless unlimited mode)
          if (!isUnlimited) {
            incrementTryOnUsage();
            setRemainingTries(getRemainingTryOns());
          }

          // Log analytics for successful try-on (both local and persistent)
          logTryOnEvent(product.id, product.name);
          logPersistentTryOnEvent(product.id, product.name);

          setStep('result');

          // Show purchase popup after 2 seconds for demo product
          if (product.folder === 'Demo') {
            setTimeout(() => {
              setShowPurchasePopup(true);
            }, 2000);
          }
        }
      } catch (err) {
        setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
        setStep('upload');
        setUserImageUrl(null);
      }
    };
    reader.readAsDataURL(file);
  }, [product, isUnlimited]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleTryAgain = () => {
    handleClose();
    navigate('/');
  };

  const handleUseSavedModel = async () => {
    const savedModel = getSavedModel();
    if (!savedModel || !product) return;

    setStep('generating-tryon');
    setModelImageUrl(savedModel);

    try {
      // Convert product URL to File
      const response = await fetch(product.url);
      const blob = await response.blob();
      const garmentFile = new File([blob], product.name, { type: blob.type });

      const tryOnResult = await generateVirtualTryOnImage(savedModel, garmentFile);

      // Add watermark to the generated image
      const watermarkedImage = await addWatermark(tryOnResult);
      setTryOnImageUrl(watermarkedImage);

      // Increment usage count on success (unless unlimited mode)
      if (!isUnlimited) {
        incrementTryOnUsage();
        setRemainingTries(getRemainingTryOns());
      }

      // Log analytics for successful try-on (both local and persistent)
      logTryOnEvent(product.id, product.name);
      logPersistentTryOnEvent(product.id, product.name);

      setStep('result');

      // Show purchase popup after 2 seconds for demo product
      if (product.folder === 'Demo') {
        setTimeout(() => {
          setShowPurchasePopup(true);
        }, 2000);
      }
    } catch (err) {
      setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
      setStep('upload');
    }
  };

  if (!isOpen) return null;

  const savedModelExists = getSavedModel() !== null;

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
              {/* Limit Reached Step */}
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
                      Come back tomorrow for your next 2 FREE try-ons
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

              {/* Upload Step */}
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
                      {savedModelExists ? 'Use your existing model or upload a new photo' : 'Upload a selfie to see how this item looks on you'}
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

                  <div className="max-w-md mx-auto space-y-4">
                    {/* Use Saved Model Button */}
                    {savedModelExists && (
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
                            <p className="text-lg font-semibold text-gray-900 mb-1">
                              Use Your Saved Model
                            </p>
                            <p className="text-sm text-gray-600">
                              Skip the upload and try on instantly
                            </p>
                          </div>
                          <svg className="w-6 h-6 text-indigo-600 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </motion.button>
                    )}

                    {savedModelExists && (
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                          <span className="px-2 bg-white text-gray-500">or</span>
                        </div>
                      </div>
                    )}

                    {/* Upload New Photo */}
                    <label
                      htmlFor="tryon-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <UploadCloudIcon className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-1">
                        {savedModelExists ? 'Upload New Photo' : 'Upload a Selfie'}
                      </p>
                      <p className="text-sm text-gray-500">
                        PNG, JPG, or WEBP (MAX. 10MB)
                      </p>
                    </label>
                    <input
                      id="tryon-upload"
                      type="file"
                      className="hidden"
                      accept="image/png, image/jpeg, image/webp, image/avif, image/heic, image/heif"
                      onChange={handleFileChange}
                    />

                    {error && (
                      <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Tips:</span> Use a clear, well-lit photo. AI interpretation of how these items could look on.
                      </p>
                    </div>
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
                    Our AI is analyzing your photo and creating a personalized model...
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
                    <img
                      src={modelImageUrl}
                      alt="Your model"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
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
                      <img
                        src={modelImageUrl}
                        alt="Your model"
                        className="w-full h-auto rounded-xl shadow-lg"
                      />
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

              {/* Result Step */}
              {step === 'result' && tryOnImageUrl && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="p-8 sm:p-12"
                >
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-serif font-bold text-gray-900 mb-2">
                      Here's How It Looks!
                    </h2>
                    <p className="text-gray-600">
                      Your personalized try-on result
                    </p>
                  </div>

                  <div className="max-w-md mx-auto mb-6">
                    <img
                      src={tryOnImageUrl}
                      alt="Virtual try-on result"
                      className="w-full h-auto rounded-xl shadow-lg"
                    />
                  </div>

                  {/* Outfit Items */}
                  {product?.outfitItems && product.outfitItems.length > 0 && (
                    <div className="max-w-md mx-auto mb-6">
                      <h3 className="text-sm font-semibold text-gray-900 mb-3">Shop This Outfit</h3>
                      <div className="space-y-2">
                        {product.outfitItems.map((item, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900">{item.name}</p>
                              {item.price && (
                                <p className="text-xs text-gray-600 mt-0.5">
                                  £{item.price.toFixed(2)}
                                </p>
                              )}
                            </div>
                            {item.shopUrl && (
                              <a
                                href={item.shopUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ml-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-md hover:bg-gray-800 transition-colors"
                              >
                                Shop
                              </a>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                    <button
                      onClick={handleTryAgain}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 rounded-md font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Try Another Outfit
                    </button>
                    {product?.shopUrl ? (
                      <a
                        href={product.shopUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors text-center"
                      >
                        Shop this Look
                      </a>
                    ) : (
                      <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-3 bg-gray-900 text-white rounded-md font-semibold hover:bg-gray-800 transition-colors"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Purchase Popup (for Demo Product) */}
        <AnimatePresence>
          {showPurchasePopup && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 flex items-center justify-center p-4 z-10"
              onClick={() => setShowPurchasePopup(false)}
            >
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
              <motion.div
                initial={{ y: 20 }}
                animate={{ y: 0 }}
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
                className="relative bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Love the Look?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Ready to add <strong>{product?.name}</strong> to your wardrobe? This virtual try-on experience can be yours!
                  </p>
                  <div className="space-y-3">
                    {product?.outfitItems && product.outfitItems.length > 0 && (
                      <>
                        <p className="text-sm font-semibold text-gray-900 mb-2">Shop Individual Items:</p>
                        <div className="space-y-2 mb-4">
                          {product.outfitItems.slice(0, 2).map((item: { name: string; price?: number; shopUrl?: string }, index: number) => (
                            <a
                              key={index}
                              href={item.shopUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="block w-full bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                            >
                              Shop {item.name} - £{item.price?.toFixed(2)}
                            </a>
                          ))}
                        </div>
                      </>
                    )}
                    <button
                      onClick={() => setShowPurchasePopup(false)}
                      className="block w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                    >
                      Maybe Later
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">
                    This is a demo. Want this tech for your store?{' '}
                    <a href="/brand-waitlist" className="text-indigo-600 underline hover:text-indigo-800">
                      Learn more
                    </a>
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatePresence>
  );
};

export default VirtualTryOnModal;
