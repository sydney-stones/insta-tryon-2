/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { WardrobeItem } from '../types';
import { generateVertexTryOn, checkVertexTryonHealth, getVertexTryonErrorMessage } from '../services/vertexTryonService';

interface VertexTryOnDemoProps {
  onBack: () => void;
  products: WardrobeItem[];
}

const VertexTryOnDemo: React.FC<VertexTryOnDemoProps> = ({ onBack, products }) => {
  const [selectedOutfit, setSelectedOutfit] = useState<WardrobeItem | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [selfiePreview, setSelfiePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isServerAvailable, setIsServerAvailable] = useState(false);

  // Check server availability on mount
  useEffect(() => {
    checkVertexTryonHealth().then(setIsServerAvailable);
  }, []);

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setSelfieFile(file);
      const reader = new FileReader();
      reader.onload = () => setSelfiePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleOutfitSelect = (outfit: WardrobeItem) => {
    setSelectedOutfit(outfit);
  };

  const handleGenerateTryOn = async () => {
    if (!selfieFile || !selectedOutfit) return;

    setError(null);
    setResultImage(null);
    setIsProcessing(true);

    try {
      const tryOnResult = await generateVertexTryOn(selfieFile, selectedOutfit.url);
      setResultImage(tryOnResult);
    } catch (err) {
      console.error('Error generating try-on:', err);
      setError(getVertexTryonErrorMessage(err));
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setSelfieFile(null);
    setSelfiePreview(null);
    setSelectedOutfit(null);
    setResultImage(null);
    setError(null);
  };

  const filteredOutfits = products.filter((outfit) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return outfit.name.toLowerCase().includes(query) || outfit.id.toLowerCase().includes(query);
  });

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              <h1 className="text-2xl font-bold text-gray-900">Vertex AI Virtual Try-On Demo</h1>
              <p className="text-sm text-gray-600 mt-1">
                Try on outfits using Google's Vertex AI
                {isServerAvailable ? (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                    Server Online
                  </span>
                ) : (
                  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                    Server Offline
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Server Status Alert */}
        {!isServerAvailable && (
          <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-900">
              <strong>Vertex AI server is not running.</strong> To use this feature:
            </p>
            <ol className="text-sm text-yellow-900 mt-2 ml-4 list-decimal space-y-1">
              <li>Set environment variables: <code className="bg-yellow-100 px-1 rounded">export GOOGLE_CLOUD_PROJECT=your-project-id</code></li>
              <li>Authenticate: <code className="bg-yellow-100 px-1 rounded">gcloud auth application-default login</code></li>
              <li>Start server: <code className="bg-yellow-100 px-1 rounded">cd vertex-tryon && python vertex_tryon_server.py</code></li>
            </ol>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Step 1: Upload Selfie */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Upload Your Selfie</h2>
            {selfiePreview ? (
              <div className="relative">
                <img src={selfiePreview} alt="Selfie preview" className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
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
              <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500">PNG, JPG (MAX. 10MB)</p>
                </div>
                <input type="file" className="hidden" accept="image/*" onChange={handleSelfieChange} />
              </label>
            )}
          </div>

          {/* Step 2: Select Outfit */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Select Outfit from Home Page</h2>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search outfits..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={!selfieFile}
            />
            <div className="max-h-[400px] overflow-y-auto space-y-2">
              {filteredOutfits.map((outfit) => (
                <button
                  key={outfit.id}
                  onClick={() => handleOutfitSelect(outfit)}
                  disabled={!selfieFile}
                  className={`w-full p-3 border-2 rounded-lg text-left transition-all ${
                    selectedOutfit?.id === outfit.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  } ${!selfieFile ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="flex gap-3">
                    <img src={outfit.url} alt={outfit.name} className="w-16 h-16 object-cover rounded" />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-gray-900">{outfit.name}</p>
                      <p className="text-xs text-gray-500 mt-1">{outfit.folder || 'Uncategorized'}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 3: Generate & Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Generate Try-On</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {!isProcessing && !resultImage && (
              <div>
                <button
                  onClick={handleGenerateTryOn}
                  disabled={!selfieFile || !selectedOutfit || !isServerAvailable}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  Generate with Vertex AI
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {!selfieFile ? 'Upload a selfie first' : !selectedOutfit ? 'Select an outfit' : !isServerAvailable ? 'Server is offline' : 'Ready to generate!'}
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-sm text-gray-600">Generating with Vertex AI...</p>
                <p className="text-xs text-gray-500 mt-2">This may take 10-30 seconds</p>
              </div>
            )}

            {resultImage && (
              <div>
                <div className="mb-4">
                  <img src={resultImage} alt="Try-on result" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => downloadImage(resultImage, `vertex-tryon-${selectedOutfit?.name}-result.png`)}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors"
                  >
                    Download Result
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Try Another
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VertexTryOnDemo;
