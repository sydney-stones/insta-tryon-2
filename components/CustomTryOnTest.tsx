/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateSimplifiedVirtualTryOn } from '../services/geminiService';

interface CustomTryOnTestProps {
  onBack: () => void;
}

const CustomTryOnTest: React.FC<CustomTryOnTestProps> = ({ onBack }) => {
  const [customerImages, setCustomerImages] = useState<File[]>([]);
  const [customerPreviews, setCustomerPreviews] = useState<string[]>([]);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [showPrompt, setShowPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCustomerImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        if (customerImages.length < 5) {
          setCustomerImages([...customerImages, file]);
          setCustomerPreviews([...customerPreviews, preview]);
        }
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setGarmentImage(file);
        setGarmentPreview(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeCustomerImage = (index: number) => {
    setCustomerImages(customerImages.filter((_, i) => i !== index));
    setCustomerPreviews(customerPreviews.filter((_, i) => i !== index));
  };

  // Generate live prompt preview
  const generatePromptPreview = (): string => {
    return `You are an expert virtual fashion photographer and try-on AI. Create a photorealistic full-body fashion photo where the person from the customer reference images is wearing the garment from the garment image.

**Reference Images Provided:**
- Customer Images (${customerImages.length}): Use ALL of these images to understand the person's face, body proportions, and overall appearance
- Garment Image (1): The clothing item to be worn by the person

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the customer reference images (features, skin tone, expression, hair)
   - Maintain the person's body type and proportions from the customer images
   - The person should look EXACTLY like themselves, just wearing the new garment

2. **Complete Garment Replacement**:
   - REMOVE all original clothing from the person
   - REPLACE it entirely with the garment from the garment image
   - The garment should fit naturally on the person's body
   - Preserve the exact style, color, pattern, and details of the garment
   - Adapt the garment to the person's pose with realistic wrinkles, folds, and draping
   - Ensure proper shadows and lighting consistent with the garment material

3. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce
   - The pose should showcase the garment effectively
   - Natural, confident posture with good balance

4. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting that highlights both the person and the garment
   - Soft, even lighting with appropriate shadows

5. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a professional studio photograph
   - Seamless integration between the person and the garment
   - Natural skin tones, fabric textures, and lighting

6. **Image Composition**:
   - Full-body shot showing the complete garment
   - Person should be centered and well-framed
   - Professional fashion photography composition

Return ONLY the final photorealistic virtual try-on image showing this person wearing the garment.`;
  };

  const isFormValid = (): boolean => {
    return customerImages.length > 0 && garmentImage !== null;
  };

  const handleTryOn = async () => {
    if (customerImages.length === 0 || !garmentImage) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const result = await generateSimplifiedVirtualTryOn(
        customerImages,
        garmentImage,
        resolution,
        { customPrompt: customPrompt || undefined }
      );
      setResultImage(result);
    } catch (err) {
      console.error('Virtual try-on error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate virtual try-on. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setCustomerImages([]);
    setCustomerPreviews([]);
    setGarmentImage(null);
    setGarmentPreview(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Simplified Try-On Test</h1>
              <p className="text-sm text-gray-600 mt-1">Test Gemini 3 Pro with simplified input structure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Image Uploads */}
          <div className="space-y-6">
            {/* Customer Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Customer Images (1-5)</h2>
              <p className="text-xs text-gray-500 mb-3">Upload photos showing face and/or full body</p>
              <div className="space-y-3">
                {customerPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Customer ${index + 1}`} className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => removeCustomerImage(index)}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {customerImages.length < 5 && (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm text-gray-500 font-semibold">Add Customer Photo</p>
                      <p className="text-xs text-gray-500">{customerImages.length}/5 images</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleCustomerImageChange} />
                  </label>
                )}
              </div>
            </div>

            {/* Garment Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Garment/Outfit Image</h2>
              {garmentPreview ? (
                <div className="relative">
                  <img src={garmentPreview} alt="Garment preview" className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
                  <button
                    onClick={() => {
                      setGarmentImage(null);
                      setGarmentPreview(null);
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
                    <p className="text-sm text-gray-500 font-semibold">Upload Garment Photo</p>
                    <p className="text-xs text-gray-500">Clothing to try on</p>
                  </div>
                  <input type="file" className="hidden" accept="image/*" onChange={handleGarmentChange} />
                </label>
              )}
            </div>
          </div>

          {/* Column 2: Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>

            {/* Resolution Selection */}
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-medium text-gray-700">Output Resolution</label>
              <div className="space-y-2">
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: resolution === '1K' ? '#f59e0b' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="resolution"
                    value="1K"
                    checked={resolution === '1K'}
                    onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">1K Resolution</div>
                    <div className="text-xs text-gray-500 mt-1">Faster generation, good for previews</div>
                  </div>
                </label>
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: resolution === '2K' ? '#f59e0b' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="resolution"
                    value="2K"
                    checked={resolution === '2K'}
                    onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">2K Resolution (Recommended)</div>
                    <div className="text-xs text-gray-500 mt-1">Balanced quality and speed</div>
                  </div>
                </label>
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: resolution === '4K' ? '#f59e0b' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="resolution"
                    value="4K"
                    checked={resolution === '4K'}
                    onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">4K Resolution</div>
                    <div className="text-xs text-gray-500 mt-1">Highest quality, slower generation</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Test Info */}
            <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <h3 className="text-sm font-semibold text-amber-900 mb-2">Testing Mode</h3>
              <ul className="text-xs text-amber-800 space-y-1">
                <li>• Simplified input: customer images + garment only</li>
                <li>• No separation between face/body/additional</li>
                <li>• Tests how Gemini 3 Pro handles mixed inputs</li>
                <li>• Useful for comparing different photo combinations</li>
              </ul>
            </div>

            {/* Image Count Info */}
            {customerImages.length > 0 && garmentImage && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>Total Images:</strong> {customerImages.length + 1}
                  <br />
                  <strong>Customer:</strong> {customerImages.length} image{customerImages.length !== 1 ? 's' : ''}
                  <br />
                  <strong>Garment:</strong> 1
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Generation & Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Try-On</h2>

            {/* Prompt Editor Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {showPrompt ? 'Hide' : 'Edit'} Generation Prompt
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 transition-transform ${showPrompt ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showPrompt && (
                <div className="mt-3 space-y-2">
                  <textarea
                    value={customPrompt !== null ? customPrompt : generatePromptPreview()}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="w-full h-96 p-4 bg-gray-900 text-gray-100 text-xs font-mono leading-relaxed rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-amber-500"
                    disabled={isProcessing}
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500">
                      {customPrompt !== null ? 'Using custom prompt' : 'Using default prompt — edit to customise'}
                    </p>
                    {customPrompt !== null && (
                      <button
                        onClick={() => setCustomPrompt(null)}
                        className="text-xs text-amber-600 hover:text-amber-700 font-medium"
                        disabled={isProcessing}
                      >
                        Reset to Default
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {!isProcessing && !resultImage && (
              <div>
                <button
                  onClick={handleTryOn}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  Generate Virtual Try-On
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {customerImages.length === 0 || !garmentImage
                    ? 'Upload at least 1 customer image and 1 garment image'
                    : 'Ready to generate!'}
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4"></div>
                <p className="text-sm text-gray-600">Generating virtual try-on...</p>
                <p className="text-xs text-gray-500 mt-2">This may take 30-90 seconds for {resolution} resolution</p>
              </div>
            )}

            {resultImage && (
              <div>
                <div className="mb-4">
                  <img src={resultImage} alt="Virtual try-on result" className="w-full h-auto rounded-lg shadow-md" />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = resultImage;
                      link.download = `simplified-tryon-${resolution}-result.png`;
                      link.click();
                    }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Download Result ({resolution})
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

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Try different combinations: 1 face + 1 body, 2 full body photos, mix of face and body</li>
            <li>Test with varying image quality and backgrounds</li>
            <li>Compare results with the structured Custom Try-On (face/body/additional separated)</li>
            <li>Upload customer photos in order of importance (most important first)</li>
            <li>Higher resolutions produce better quality but take longer to generate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomTryOnTest;
