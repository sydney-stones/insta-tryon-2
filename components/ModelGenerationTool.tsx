/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateCustomModelFromMeasurements, UserMeasurements } from '../services/geminiService';

interface ModelGenerationToolProps {
  onBack: () => void;
}

const ModelGenerationTool: React.FC<ModelGenerationToolProps> = ({ onBack }) => {
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [measurements, setMeasurements] = useState<UserMeasurements>({
    height: 0,
    weight: 0,
    chest: 0,
    waist: 0,
    hips: 0,
    shoulder: 0,
    inseam: 0,
    armLength: 0,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'face' | 'body' | 'additional'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        if (type === 'face') {
          setFaceImage(file);
          setFacePreview(preview);
        } else if (type === 'body') {
          setBodyImage(file);
          setBodyPreview(preview);
        } else if (type === 'additional') {
          if (additionalImages.length < 3) {
            setAdditionalImages([...additionalImages, file]);
            setAdditionalPreviews([...additionalPreviews, preview]);
          }
        }
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAdditionalImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
    setAdditionalPreviews(additionalPreviews.filter((_, i) => i !== index));
  };

  const handleMeasurementChange = (field: keyof UserMeasurements, value: string) => {
    const numValue = parseFloat(value) || 0;
    setMeasurements({ ...measurements, [field]: numValue });
  };

  const isFormValid = (): boolean => {
    return (
      faceImage !== null &&
      bodyImage !== null &&
      measurements.height > 0 &&
      measurements.weight > 0 &&
      measurements.chest > 0 &&
      measurements.waist > 0 &&
      measurements.hips > 0 &&
      measurements.shoulder > 0 &&
      measurements.inseam > 0 &&
      measurements.armLength > 0
    );
  };

  const handleGenerate = async () => {
    if (!faceImage || !bodyImage) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const result = await generateCustomModelFromMeasurements(
        faceImage,
        bodyImage,
        measurements,
        additionalImages.length > 0 ? additionalImages : undefined
      );
      setResultImage(result);
    } catch (err) {
      console.error('Model generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate model. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setAdditionalImages([]);
    setAdditionalPreviews([]);
    setMeasurements({
      height: 0,
      weight: 0,
      chest: 0,
      waist: 0,
      hips: 0,
      shoulder: 0,
      inseam: 0,
      armLength: 0,
    });
    setResultImage(null);
    setError(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Custom Model Generation</h1>
              <p className="text-sm text-gray-600 mt-1">Create accurate studio model photos from measurements</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Image Uploads */}
          <div className="space-y-6">
            {/* Face Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">1. Face Image (Required)</h2>
              {facePreview ? (
                <div className="relative">
                  <img src={facePreview} alt="Face preview" className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
                  <button
                    onClick={() => {
                      setFaceImage(null);
                      setFacePreview(null);
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
                    <p className="text-sm text-gray-500 font-semibold">Upload Face Photo</p>
                    <p className="text-xs text-gray-500">For facial likeness</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'face')} />
                </label>
              )}
            </div>

            {/* Body Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">2. Full Body Image (Required)</h2>
              {bodyPreview ? (
                <div className="relative">
                  <img src={bodyPreview} alt="Body preview" className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
                  <button
                    onClick={() => {
                      setBodyImage(null);
                      setBodyPreview(null);
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
                    <p className="text-sm text-gray-500 font-semibold">Upload Body Photo</p>
                    <p className="text-xs text-gray-500">For body shape/size</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'body')} />
                </label>
              )}
            </div>

            {/* Additional Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Additional Images (Optional)</h2>
              <p className="text-xs text-gray-500 mb-3">Add up to 3 more reference images</p>
              <div className="space-y-3">
                {additionalPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Additional ${index + 1}`} className="w-full h-32 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {additionalImages.length < 3 && (
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center">
                      <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-xs text-gray-500">Add Image</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'additional')} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Measurements Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Measurements</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 165"
                  value={measurements.height || ''}
                  onChange={(e) => handleMeasurementChange('height', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 63"
                  value={measurements.weight || ''}
                  onChange={(e) => handleMeasurementChange('weight', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chest/Bust (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 90"
                  value={measurements.chest || ''}
                  onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Waist (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 72"
                  value={measurements.waist || ''}
                  onChange={(e) => handleMeasurementChange('waist', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Hips (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 98"
                  value={measurements.hips || ''}
                  onChange={(e) => handleMeasurementChange('hips', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Shoulder Width (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 40"
                  value={measurements.shoulder || ''}
                  onChange={(e) => handleMeasurementChange('shoulder', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Inseam (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 76"
                  value={measurements.inseam || ''}
                  onChange={(e) => handleMeasurementChange('inseam', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Arm Length (cm)</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  placeholder="e.g. 58"
                  value={measurements.armLength || ''}
                  onChange={(e) => handleMeasurementChange('armLength', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Column 3: Generation & Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Model</h2>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {!isProcessing && !resultImage && (
              <div>
                <button
                  onClick={handleGenerate}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  Generate Studio Model
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {!faceImage || !bodyImage
                    ? 'Upload face and body images'
                    : !isFormValid()
                    ? 'Fill in all measurements'
                    : 'Ready to generate!'}
                </p>
                {faceImage && bodyImage && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-900">
                      <strong>Model:</strong> gemini-3-pro-image-preview
                      <br />
                      <strong>Images:</strong> {2 + additionalImages.length} ({additionalImages.length <= 5 ? 'high fidelity' : 'standard'})
                    </p>
                  </div>
                )}
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mb-4"></div>
                <p className="text-sm text-gray-600">Generating custom model...</p>
                <p className="text-xs text-gray-500 mt-2">This may take 20-60 seconds</p>
              </div>
            )}

            {resultImage && (
              <div>
                <div className="mb-4">
                  <img src={resultImage} alt="Generated model" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = resultImage;
                      link.download = 'custom-model-result.png';
                      link.click();
                    }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Download Result
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Generate Another
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

export default ModelGenerationTool;
