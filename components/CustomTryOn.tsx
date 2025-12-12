/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateDirectVirtualTryOn } from '../services/geminiService';

interface CustomTryOnProps {
  onBack: () => void;
}

const CustomTryOn: React.FC<CustomTryOnProps> = ({ onBack }) => {
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);
  const [garmentImage, setGarmentImage] = useState<File | null>(null);
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null);
  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'face' | 'body' | 'garment' | 'additional'
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
        } else if (type === 'garment') {
          setGarmentImage(file);
          setGarmentPreview(preview);
        } else if (type === 'additional') {
          if (additionalImages.length < 5) {
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

  // Generate live prompt preview
  const generatePromptPreview = (): string => {
    const additionalImagesText = additionalImages.length > 0
      ? `- Additional reference images (${additionalImages.length}): Use these for more accurate representation of the person`
      : '';

    return `You are an expert virtual fashion photographer and try-on AI. Create a photorealistic full-body fashion photo where the person from the reference images is wearing the garment from the garment image.

**Reference Images Provided:**
- Image 1 (Face): Facial likeness reference - preserve this person's unique facial features, skin tone, hair, and identity
- Image 2 (Body): Full body reference - use this for understanding body proportions, posture, and shape
- Image 3 (Garment): The clothing item to be worn by the person
${additionalImagesText}

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the facial reference images (features, skin tone, expression, hair)
   - Maintain the person's body type and proportions from the body reference image
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
    return faceImage !== null && bodyImage !== null && garmentImage !== null;
  };

  const handleTryOn = async () => {
    if (!faceImage || !bodyImage || !garmentImage) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const result = await generateDirectVirtualTryOn(
        faceImage,
        bodyImage,
        garmentImage,
        additionalImages.length > 0 ? additionalImages : undefined,
        resolution
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
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setGarmentImage(null);
    setGarmentPreview(null);
    setAdditionalImages([]);
    setAdditionalPreviews([]);
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
              <h1 className="text-2xl font-bold text-gray-900">Custom Virtual Try-On</h1>
              <p className="text-sm text-gray-600 mt-1">One-step AI try-on with Gemini 3 Pro</p>
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

            {/* Garment Image */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Garment/Outfit Image (Required)</h2>
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
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'garment')} />
                </label>
              )}
            </div>

            {/* Additional Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">4. Additional Images (Optional)</h2>
              <p className="text-xs text-gray-500 mb-3">Add up to 5 more reference images of yourself</p>
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
                {additionalImages.length < 5 && (
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

          {/* Column 2: Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>

            {/* Resolution Selection */}
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-medium text-gray-700">Output Resolution</label>
              <div className="space-y-2">
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: resolution === '1K' ? '#9333ea' : '#e5e7eb' }}>
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
                  style={{ borderColor: resolution === '2K' ? '#9333ea' : '#e5e7eb' }}>
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
                  style={{ borderColor: resolution === '4K' ? '#9333ea' : '#e5e7eb' }}>
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

            {/* Model Info */}
            <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <h3 className="text-sm font-semibold text-purple-900 mb-2">Gemini 3 Pro Image</h3>
              <ul className="text-xs text-purple-800 space-y-1">
                <li>• One-step virtual try-on (no intermediate model generation)</li>
                <li>• Up to 5 human reference images for character consistency</li>
                <li>• Advanced reasoning for photorealistic results</li>
                <li>• Professional studio quality output</li>
              </ul>
            </div>

            {/* Image Count Info */}
            {faceImage && bodyImage && garmentImage && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>Total Images:</strong> {3 + additionalImages.length}
                  <br />
                  <strong>Person References:</strong> {2 + additionalImages.length} (up to 5 supported)
                  <br />
                  <strong>Garment:</strong> 1
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Generation & Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Try-On</h2>

            {/* Prompt Preview Section */}
            <div className="mb-6">
              <button
                onClick={() => setShowPrompt(!showPrompt)}
                className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {showPrompt ? 'Hide' : 'View'} Generation Prompt
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
                <div className="mt-3 p-4 bg-gray-900 rounded-lg overflow-auto max-h-96">
                  <pre className="text-xs text-gray-100 whitespace-pre-wrap font-mono leading-relaxed">
                    {generatePromptPreview()}
                  </pre>
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
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  Generate Virtual Try-On
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {!faceImage || !bodyImage || !garmentImage
                    ? 'Upload face, body, and garment images'
                    : 'Ready to generate!'}
                </p>
              </div>
            )}

            {isProcessing && (
              <div className="flex flex-col items-center justify-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
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
                      link.download = `virtual-tryon-${resolution}-result.png`;
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
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Best Results</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Use a clear face photo showing your facial features clearly</li>
            <li>Provide a full-body photo showing your body proportions and shape</li>
            <li>Use a high-quality garment image with the clothing clearly visible</li>
            <li>Additional reference images help improve facial and body accuracy</li>
            <li>Neutral backgrounds work best for all reference photos</li>
            <li>Higher resolutions produce better quality but take longer to generate</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomTryOn;
