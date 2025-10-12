/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WardrobeItem } from '../types';
import { generateModelImage, generateVirtualTryOnImage } from '../services/geminiService';
import { UploadCloudIcon } from './icons';
import Spinner from './Spinner';
import { Compare } from './ui/compare';
import { getFriendlyErrorMessage } from '../lib/utils';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: WardrobeItem | null;
}

type ModalStep = 'upload' | 'generating-model' | 'model-ready' | 'generating-tryon' | 'result';

const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({ isOpen, onClose, product }) => {
  const [step, setStep] = useState<ModalStep>('upload');
  const [userImageUrl, setUserImageUrl] = useState<string | null>(null);
  const [modelImageUrl, setModelImageUrl] = useState<string | null>(null);
  const [tryOnImageUrl, setTryOnImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClose = () => {
    setStep('upload');
    setUserImageUrl(null);
    setModelImageUrl(null);
    setTryOnImageUrl(null);
    setError(null);
    onClose();
  };

  const handleFileSelect = useCallback(async (file: File) => {
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
        // Step 1: Generate model from user's selfie
        const generatedModel = await generateModelImage(file);
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
          setTryOnImageUrl(tryOnResult);
          setStep('result');
        }
      } catch (err) {
        setError(getFriendlyErrorMessage(err, 'Failed to generate try-on'));
        setStep('upload');
        setUserImageUrl(null);
      }
    };
    reader.readAsDataURL(file);
  }, [product]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleTryAgain = () => {
    setStep('upload');
    setUserImageUrl(null);
    setModelImageUrl(null);
    setTryOnImageUrl(null);
    setError(null);
  };

  if (!isOpen) return null;

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
                      Upload a selfie to see how this item looks on you
                    </p>
                  </div>

                  <div className="max-w-md mx-auto">
                    <label
                      htmlFor="tryon-upload"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <UploadCloudIcon className="w-16 h-16 text-gray-400 mb-4" />
                      <p className="text-lg font-semibold text-gray-700 mb-1">
                        Upload Your Photo
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

                    <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <p className="text-sm text-blue-900">
                        <span className="font-semibold">Tips:</span> Use a clear, well-lit photo. Full-body photos work best!
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
              {step === 'result' && tryOnImageUrl && userImageUrl && (
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
                      Drag the slider to compare before and after
                    </p>
                  </div>

                  <div className="max-w-md mx-auto mb-6">
                    <Compare
                      firstImage={userImageUrl}
                      secondImage={tryOnImageUrl}
                      slideMode="drag"
                      className="w-full h-[500px] rounded-xl"
                    />
                  </div>

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
                        Shop this Look
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default VirtualTryOnModal;
