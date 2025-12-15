/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateDirectVirtualTryOn } from '../services/geminiService';

interface CustomTryOnProps {
  onBack: () => void;
}

interface BatchResult {
  garmentName: string;
  imageUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  error?: string;
}

const CustomTryOn: React.FC<CustomTryOnProps> = ({ onBack }) => {
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);

  // Batch garment images
  const [garmentImages, setGarmentImages] = useState<File[]>([]);
  const [garmentPreviews, setGarmentPreviews] = useState<string[]>([]);

  const [additionalImages, setAdditionalImages] = useState<File[]>([]);
  const [additionalPreviews, setAdditionalPreviews] = useState<string[]>([]);
  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [showPrompt, setShowPrompt] = useState(false);

  // Batch processing state
  const [isBatchProcessing, setIsBatchProcessing] = useState(false);
  const [batchResults, setBatchResults] = useState<BatchResult[]>([]);
  const [currentProcessingIndex, setCurrentProcessingIndex] = useState<number>(-1);

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

  const handleBulkGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newGarmentFiles: File[] = [];
    const newGarmentPreviews: string[] = [];
    let filesProcessed = 0;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        newGarmentFiles.push(file);
        newGarmentPreviews.push(reader.result as string);
        filesProcessed++;

        if (filesProcessed === files.length) {
          setGarmentImages([...garmentImages, ...newGarmentFiles]);
          setGarmentPreviews([...garmentPreviews, ...newGarmentPreviews]);
        }
      };
      reader.readAsDataURL(file);
    });

    setError(null);
  };

  const removeGarmentImage = (index: number) => {
    setGarmentImages(garmentImages.filter((_, i) => i !== index));
    setGarmentPreviews(garmentPreviews.filter((_, i) => i !== index));
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
    return faceImage !== null && bodyImage !== null && garmentImages.length > 0;
  };

  const handleBatchGeneration = async () => {
    if (!faceImage || !bodyImage || garmentImages.length === 0) return;

    setIsBatchProcessing(true);
    setError(null);

    // Initialize batch results
    const initialResults: BatchResult[] = garmentImages.map((garment) => ({
      garmentName: garment.name.replace(/\.[^/.]+$/, ''),
      imageUrl: '',
      status: 'pending',
    }));
    setBatchResults(initialResults);

    // Process each garment one by one
    for (let i = 0; i < garmentImages.length; i++) {
      setCurrentProcessingIndex(i);

      // Update status to processing
      setBatchResults(prev => prev.map((result, idx) =>
        idx === i ? { ...result, status: 'processing' } : result
      ));

      try {
        const result = await generateDirectVirtualTryOn(
          faceImage,
          bodyImage,
          garmentImages[i],
          additionalImages.length > 0 ? additionalImages : undefined,
          resolution
        );

        // Update with completed result
        setBatchResults(prev => prev.map((res, idx) =>
          idx === i ? { ...res, status: 'completed', imageUrl: result } : res
        ));
      } catch (err) {
        console.error(`Error processing garment ${i}:`, err);

        // Update with error
        setBatchResults(prev => prev.map((res, idx) =>
          idx === i ? {
            ...res,
            status: 'failed',
            error: err instanceof Error ? err.message : 'Generation failed'
          } : res
        ));
      }
    }

    setCurrentProcessingIndex(-1);
    setIsBatchProcessing(false);
  };

  const handleDownloadAll = () => {
    const completedResults = batchResults.filter(r => r.status === 'completed');

    completedResults.forEach((result, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = result.imageUrl;
        link.download = `${result.garmentName}-tryon-${resolution}.png`;
        link.click();
      }, index * 500); // Stagger downloads by 500ms
    });
  };

  const handleReset = () => {
    // Clear garments and results
    setGarmentImages([]);
    setGarmentPreviews([]);
    setBatchResults([]);
    setError(null);
  };

  const handleFullReset = () => {
    // Full reset clears everything
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setGarmentImages([]);
    setGarmentPreviews([]);
    setAdditionalImages([]);
    setAdditionalPreviews([]);
    setBatchResults([]);
    setError(null);
  };

  const completedCount = batchResults.filter(r => r.status === 'completed').length;
  const failedCount = batchResults.filter(r => r.status === 'failed').length;

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
              <p className="text-sm text-gray-600 mt-1">Bulk process multiple outfits with Gemini 3 Pro</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Person Images */}
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
                    disabled={isBatchProcessing}
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
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'face')} disabled={isBatchProcessing} />
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
                    disabled={isBatchProcessing}
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
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'body')} disabled={isBatchProcessing} />
                </label>
              )}
            </div>

            {/* Additional Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">3. Additional Images (Optional)</h2>
              <p className="text-xs text-gray-500 mb-3">Add up to 5 more reference images of yourself</p>
              <div className="space-y-3">
                {additionalPreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Additional ${index + 1}`} className="w-full h-32 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => removeAdditionalImage(index)}
                      className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                      disabled={isBatchProcessing}
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {additionalImages.length < 5 && !isBatchProcessing && (
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

          {/* Column 2: Garment Images */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">4. Garment/Outfit Images (Bulk Upload)</h2>
            <p className="text-xs text-gray-500 mb-3">Upload multiple garment images - each will be processed separately</p>

            {/* Bulk Upload Button */}
            {!isBatchProcessing && (
              <label className="mb-4 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-purple-300 rounded-lg cursor-pointer bg-purple-50 hover:bg-purple-100">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 mb-2 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-purple-700 font-semibold">Upload Garment Images</p>
                  <p className="text-xs text-purple-600">Select multiple files</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleBulkGarmentUpload} />
              </label>
            )}

            {/* Garment Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[600px] overflow-y-auto">
              {garmentPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Garment ${index + 1}`} className="w-full h-32 object-cover bg-gray-100 rounded-lg" />
                  {!isBatchProcessing && (
                    <button
                      onClick={() => removeGarmentImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {/* Status badge */}
                  {batchResults[index] && (
                    <div className="absolute bottom-1 left-1 right-1">
                      {batchResults[index].status === 'pending' && (
                        <span className="text-xs bg-gray-200 text-gray-700 px-2 py-1 rounded block text-center">Pending</span>
                      )}
                      {batchResults[index].status === 'processing' && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded block text-center animate-pulse">Processing...</span>
                      )}
                      {batchResults[index].status === 'completed' && (
                        <span className="text-xs bg-green-500 text-white px-2 py-1 rounded block text-center">✓ Done</span>
                      )}
                      {batchResults[index].status === 'failed' && (
                        <span className="text-xs bg-red-500 text-white px-2 py-1 rounded block text-center">✗ Failed</span>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {garmentImages.length > 0 && (
              <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-xs text-purple-900">
                  <strong>{garmentImages.length}</strong> garment{garmentImages.length !== 1 ? 's' : ''} ready for processing
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Settings & Generation */}
          <div className="space-y-6">
            {/* Settings */}
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
                      disabled={isBatchProcessing}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">1K Resolution</div>
                      <div className="text-xs text-gray-500 mt-1">Faster batch processing</div>
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
                      disabled={isBatchProcessing}
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
                      disabled={isBatchProcessing}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">4K Resolution</div>
                      <div className="text-xs text-gray-500 mt-1">Highest quality, slower</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Prompt Preview Section */}
              <div className="mb-6">
                <button
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isBatchProcessing}
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

              {/* Batch Progress */}
              {isBatchProcessing && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-blue-900">Batch Processing</span>
                    <span className="text-sm text-blue-700">{completedCount + failedCount}/{garmentImages.length}</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((completedCount + failedCount) / garmentImages.length) * 100}%` }}
                    ></div>
                  </div>
                  {currentProcessingIndex >= 0 && (
                    <p className="text-xs text-blue-700 mt-2">
                      Processing: {garmentImages[currentProcessingIndex]?.name}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              {!isBatchProcessing && batchResults.length === 0 && (
                <button
                  onClick={handleBatchGeneration}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Generate All Try-Ons ({garmentImages.length})
                </button>
              )}

              {!isBatchProcessing && batchResults.length > 0 && (
                <div className="space-y-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-900">
                      <strong>Completed:</strong> {completedCount}/{garmentImages.length}
                      {failedCount > 0 && <span className="text-red-700"> ({failedCount} failed)</span>}
                    </p>
                  </div>
                  {completedCount > 0 && (
                    <button
                      onClick={handleDownloadAll}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Download All Results ({completedCount})
                    </button>
                  )}
                  <button
                    onClick={handleReset}
                    className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                  >
                    Process More Garments
                  </button>
                  <button
                    onClick={handleFullReset}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Reset All
                  </button>
                </div>
              )}
            </div>

            {/* Results Preview */}
            {batchResults.length > 0 && (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Results Preview</h2>
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {batchResults.map((result, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-start gap-3">
                        {result.imageUrl && (
                          <img src={result.imageUrl} alt={result.garmentName} className="w-20 h-20 object-cover rounded" />
                        )}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{result.garmentName}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {result.status === 'completed' && '✓ Ready to download'}
                            {result.status === 'processing' && 'Processing...'}
                            {result.status === 'pending' && 'Waiting...'}
                            {result.status === 'failed' && `✗ ${result.error || 'Failed'}`}
                          </p>
                          {result.status === 'completed' && (
                            <button
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = result.imageUrl;
                                link.download = `${result.garmentName}-tryon-${resolution}.png`;
                                link.click();
                              }}
                              className="mt-2 text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Download Individual
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Batch Processing Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Upload face and body images once - they'll be used for all garments</li>
            <li>Select multiple garment images at once using the bulk upload</li>
            <li>Each garment will be processed sequentially using the same person and prompt</li>
            <li>Download all results at once or individually after processing completes</li>
            <li>Lower resolutions (1K) process faster for large batches</li>
            <li>Processing time: ~30-90 seconds per garment depending on resolution</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CustomTryOn;
