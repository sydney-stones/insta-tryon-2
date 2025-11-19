/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { generateModelImage, generateVirtualTryOnImage } from '../services/geminiService';

interface CustomTryOnProps {
  onBack: () => void;
}

const DAILY_LIMIT = 5;
const STORAGE_KEY = 'customTryOnUsage';

interface UsageData {
  date: string;
  count: number;
}

const CustomTryOn: React.FC<CustomTryOnProps> = ({ onBack }) => {
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [outfitFile, setOutfitFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [outfitPreview, setOutfitPreview] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState<string>('');
  const [usageCount, setUsageCount] = useState(0);

  useEffect(() => {
    // Check usage on load
    const usage = getUsageData();
    setUsageCount(usage.count);
  }, []);

  const getUsageData = (): UsageData => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored) {
      try {
        const data: UsageData = JSON.parse(stored);
        // Reset if it's a new day
        if (data.date !== today) {
          return { date: today, count: 0 };
        }
        return data;
      } catch (e) {
        return { date: today, count: 0 };
      }
    }
    return { date: today, count: 0 };
  };

  const incrementUsage = () => {
    const today = new Date().toDateString();
    const newCount = usageCount + 1;
    const data: UsageData = { date: today, count: newCount };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUsageCount(newCount);
  };

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setSelfieFile(file);
      const reader = new FileReader();
      reader.onload = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleOutfitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setOutfitFile(file);
      const reader = new FileReader();
      reader.onload = () => setOutfitPreview(reader.result as string);
      reader.readAsDataURL(file);
      setError(null);
    }
  };

  const handleTryOn = async () => {
    if (!selfieFile || !outfitFile) {
      setError('Please upload both selfie and outfit images');
      return;
    }

    if (usageCount >= DAILY_LIMIT) {
      setError(`Daily limit of ${DAILY_LIMIT} try-ons reached. Try again tomorrow.`);
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      // Step 1: Generate model image
      setProcessingStep('Converting selfie to model pose...');
      const modelImage = await generateModelImage(selfieFile);

      // Step 2: Apply outfit
      setProcessingStep('Applying outfit...');
      const result = await generateVirtualTryOnImage(modelImage, outfitFile);

      setResultImage(result);
      incrementUsage();
      setProcessingStep('');
    } catch (err) {
      console.error('Try-on error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate try-on. Please try again.');
      setProcessingStep('');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelfieFile(null);
    setOutfitFile(null);
    setSelfiePreview(null);
    setOutfitPreview(null);
    setResultImage(null);
    setError(null);
    setProcessingStep('');
  };

  const remainingTries = DAILY_LIMIT - usageCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              >
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Custom Virtual Try-On</h1>
                <p className="text-sm text-gray-600 mt-1">Upload your own selfie and outfit</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-700">
                Remaining tries today: <span className={remainingTries > 0 ? 'text-green-600' : 'text-red-600'}>{remainingTries}/{DAILY_LIMIT}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            {/* Selfie Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Upload Your Selfie</h2>
              <div className="space-y-4">
                {selfiePreview ? (
                  <div className="relative">
                    <img src={selfiePreview} alt="Selfie preview" className="w-full h-64 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => {
                        setSelfieFile(null);
                        setSelfiePreview(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleSelfieChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Outfit Upload */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Upload Outfit Image</h2>
              <div className="space-y-4">
                {outfitPreview ? (
                  <div className="relative">
                    <img src={outfitPreview} alt="Outfit preview" className="w-full h-64 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => {
                        setOutfitFile(null);
                        setOutfitPreview(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-12 h-12 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleOutfitChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleTryOn}
                disabled={!selfieFile || !outfitFile || isProcessing || usageCount >= DAILY_LIMIT}
                className="flex-1 px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? 'Processing...' : 'Try On'}
              </button>
              <button
                onClick={handleReset}
                disabled={isProcessing}
                className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Reset
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
          </div>

          {/* Result Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Result</h2>
            {isProcessing ? (
              <div className="flex flex-col items-center justify-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mb-4"></div>
                <p className="text-gray-600">{processingStep}</p>
              </div>
            ) : resultImage ? (
              <div className="space-y-4">
                <img src={resultImage} alt="Try-on result" className="w-full rounded-lg" />
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = resultImage;
                    link.download = 'virtual-tryon-result.png';
                    link.click();
                  }}
                  className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Download Result
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-center">Your try-on result will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Best Results</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Use a clear, well-lit selfie with your full upper body visible</li>
            <li>Stand facing the camera with a neutral pose</li>
            <li>Use outfit images with clear, visible clothing items</li>
            <li>Avoid busy backgrounds in your selfie for better results</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomTryOn;
