/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateSingleProductTryOn } from '../services/geminiService';

interface SingleProductTryOnProps {
  onBack: () => void;
}

const SingleProductTryOn: React.FC<SingleProductTryOnProps> = ({ onBack }) => {
  const [faceImage, setFaceImage] = useState<File | null>(null);
  const [facePreview, setFacePreview] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<File | null>(null);
  const [bodyPreview, setBodyPreview] = useState<string | null>(null);

  const [garmentImages, setGarmentImages] = useState<File[]>([]);
  const [garmentPreviews, setGarmentPreviews] = useState<string[]>([]);

  const [resolution, setResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [showPrompt, setShowPrompt] = useState(false);
  const [customPrompt, setCustomPrompt] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'face' | 'body'
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
        } else {
          setBodyImage(file);
          setBodyPreview(preview);
        }
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGarmentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFiles: File[] = [];
    const newPreviews: string[] = [];
    let filesProcessed = 0;
    const totalFiles = Array.from(files).filter(f => f.type.startsWith('image/')).length;

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith('image/')) return;

      const reader = new FileReader();
      reader.onload = () => {
        newFiles.push(file);
        newPreviews.push(reader.result as string);
        filesProcessed++;

        if (filesProcessed === totalFiles) {
          setGarmentImages(prev => [...prev, ...newFiles]);
          setGarmentPreviews(prev => [...prev, ...newPreviews]);
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

  const generatePromptPreview = (): string => {
    const garmentLabels = garmentImages.map((file, i) => {
      const name = file.name.toLowerCase();
      if (name.includes('front')) return `- Garment Image ${i + 1}: FRONT view of the garment`;
      if (name.includes('back')) return `- Garment Image ${i + 1}: BACK view of the garment`;
      if (name.includes('model')) return `- Garment Image ${i + 1}: Model wearing the garment (use for fit and drape reference)`;
      if (name.includes('detail') || name.includes('close')) return `- Garment Image ${i + 1}: Detail/close-up view of the garment`;
      if (name.includes('side')) return `- Garment Image ${i + 1}: SIDE view of the garment`;
      return `- Garment Image ${i + 1}: Reference view of the garment`;
    }).join('\n');

    return `You are an expert virtual fashion photographer and try-on AI specialising in accurate garment reproduction. You are given a face reference, a body reference, and ${garmentImages.length || '?'} image${garmentImages.length !== 1 ? 's' : ''} of a SINGLE garment/outfit from different angles. Your task is to create a photorealistic photo of this person wearing this exact garment.

**Reference Images Provided:**
- Image 1 (Face): Facial likeness reference — preserve this person's unique facial features, skin tone, hair, and identity exactly
- Image 2 (Body): Full body reference — use this for accurate body proportions, posture, and shape
${garmentLabels || '- (Upload garment images to see labels)'}

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the facial reference (features, skin tone, expression, hair)
   - Maintain the person's exact body type and proportions from the body reference
   - The person should look EXACTLY like themselves, just wearing the new garment

2. **Garment Accuracy — THIS IS THE HIGHEST PRIORITY**:
   - Study ALL provided garment images carefully before generating
   - Reproduce the EXACT style, silhouette, cut, and shape of the garment — do not alter or simplify the design
   - Reproduce the EXACT colour(s), pattern, print, texture, and fabric appearance
   - Preserve every visible detail: logos, embroidery, buttons, zips, stitching, pockets, labels, tags, hems, cuffs, collar shape
   - If a front AND back view are provided, ensure both sides are accurately represented (the front should match the front image, and the garment structure visible from behind should match the back image)
   - If a model-worn reference is provided, use it to understand how the garment drapes, fits, and falls on a real body — replicate that same fit and draping behaviour on this person's body type
   - The garment should fit naturally on this specific person's body proportions — accounting for their height, shoulder width, torso length, and build
   - Adapt realistic wrinkles, folds, and fabric tension that are consistent with the garment's material and the person's pose

3. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce
   - The pose should showcase the garment effectively — front-facing to display the garment's design
   - Natural, confident posture with good balance

4. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting that highlights both the person and the garment
   - Soft, even lighting with appropriate shadows that show fabric texture and depth

5. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a professional studio photograph
   - Seamless integration between the person and the garment
   - Natural skin tones, fabric textures, and lighting
   - No AI artefacts, blurring, or distortion on the garment details

6. **Image Composition**:
   - Full-body shot showing the complete garment from head to toe
   - Person should be centered and well-framed
   - Output MUST be exactly 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio)

Return ONLY the final photorealistic virtual try-on image.`;
  };

  const getResultFilename = (): string => {
    if (garmentImages.length === 0) return `tryon-${resolution.toLowerCase()}.png`;
    // Use the first garment filename, strip extension and common suffixes like -front, -back etc.
    const firstName = garmentImages[0].name.replace(/\.[^/.]+$/, '');
    // Try to extract a brand/product name by removing angle suffixes
    const baseName = firstName.replace(/[-_]?(front|back|model|detail|close|side|closeup)$/i, '').trim();
    return `${baseName || firstName}-${resolution.toLowerCase()}-tryon.png`;
  };

  const isFormValid = (): boolean => {
    return faceImage !== null && bodyImage !== null && garmentImages.length > 0;
  };

  const handleGenerate = async () => {
    if (!faceImage || !bodyImage || garmentImages.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const result = await generateSingleProductTryOn(
        faceImage,
        bodyImage,
        garmentImages,
        { customPrompt: customPrompt || undefined }
      );
      setResultImage(result);
    } catch (err) {
      console.error('Single product try-on error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate virtual try-on. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setGarmentImages([]);
    setGarmentPreviews([]);
    setResultImage(null);
    setError(null);
  };

  const handleFullReset = () => {
    setFaceImage(null);
    setFacePreview(null);
    setBodyImage(null);
    setBodyPreview(null);
    setGarmentImages([]);
    setGarmentPreviews([]);
    setResultImage(null);
    setError(null);
    setCustomPrompt(null);
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
              <h1 className="text-2xl font-bold text-gray-900">Single Product Try-On</h1>
              <p className="text-sm text-gray-600 mt-1">Multi-angle garment reference with Gemini 3 Pro</p>
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
                    onClick={() => { setFaceImage(null); setFacePreview(null); }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    disabled={isProcessing}
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
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'face')} disabled={isProcessing} />
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
                    onClick={() => { setBodyImage(null); setBodyPreview(null); }}
                    className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    disabled={isProcessing}
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
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageChange(e, 'body')} disabled={isProcessing} />
                </label>
              )}
            </div>
          </div>

          {/* Column 2: Product Images (multiple angles) */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">3. Product Images (Multi-Angle)</h2>
            <p className="text-xs text-gray-500 mb-4">Upload multiple images of the same product — front, back, model shot, detail views, etc.</p>

            {/* Upload Button */}
            {!isProcessing && (
              <label className="mb-4 flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-teal-300 rounded-lg cursor-pointer bg-teal-50 hover:bg-teal-100">
                <div className="flex flex-col items-center justify-center">
                  <svg className="w-10 h-10 mb-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className="text-sm text-teal-700 font-semibold">Upload Product Images</p>
                  <p className="text-xs text-teal-600">Select multiple angles</p>
                </div>
                <input type="file" className="hidden" accept="image/*" multiple onChange={handleGarmentUpload} />
              </label>
            )}

            {/* Product Image Grid */}
            <div className="grid grid-cols-2 gap-3 max-h-[500px] overflow-y-auto">
              {garmentPreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <img src={preview} alt={`Product ${index + 1}`} className="w-full h-36 object-cover bg-gray-100 rounded-lg" />
                  {!isProcessing && (
                    <button
                      onClick={() => removeGarmentImage(index)}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                  {/* File name label */}
                  <div className="absolute bottom-1 left-1 right-1">
                    <span className="text-[10px] bg-black/60 text-white px-2 py-0.5 rounded block truncate">
                      {garmentImages[index]?.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {garmentImages.length > 0 && (
              <div className="mt-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-xs text-teal-900">
                  <strong>{garmentImages.length}</strong> product image{garmentImages.length !== 1 ? 's' : ''} uploaded
                </p>
                <p className="text-[10px] text-teal-700 mt-1">
                  Tip: Name files with "front", "back", "model", "detail", or "side" for automatic labelling in the prompt
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Settings & Generation */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>

              {/* Resolution Selection */}
              <div className="mb-6 space-y-3">
                <label className="block text-sm font-medium text-gray-700">Output Resolution</label>
                <div className="space-y-2">
                  <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                    style={{ borderColor: resolution === '1K' ? '#0d9488' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="resolution"
                      value="1K"
                      checked={resolution === '1K'}
                      onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                      className="mt-1 mr-3"
                      disabled={isProcessing}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">1K Resolution</div>
                      <div className="text-xs text-gray-500 mt-1">Faster generation, good for previews</div>
                    </div>
                  </label>
                  <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                    style={{ borderColor: resolution === '2K' ? '#0d9488' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="resolution"
                      value="2K"
                      checked={resolution === '2K'}
                      onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                      className="mt-1 mr-3"
                      disabled={isProcessing}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">2K Resolution (Recommended)</div>
                      <div className="text-xs text-gray-500 mt-1">Balanced quality and speed</div>
                    </div>
                  </label>
                  <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                    style={{ borderColor: resolution === '4K' ? '#0d9488' : '#e5e7eb' }}>
                    <input
                      type="radio"
                      name="resolution"
                      value="4K"
                      checked={resolution === '4K'}
                      onChange={(e) => setResolution(e.target.value as '1K' | '2K' | '4K')}
                      className="mt-1 mr-3"
                      disabled={isProcessing}
                    />
                    <div className="flex-1">
                      <div className="font-medium text-sm">4K Resolution</div>
                      <div className="text-xs text-gray-500 mt-1">Highest quality, slower generation</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Info Box */}
              <div className="mb-6 p-4 bg-teal-50 border border-teal-200 rounded-lg">
                <h3 className="text-sm font-semibold text-teal-900 mb-2">Single Product Mode</h3>
                <ul className="text-xs text-teal-800 space-y-1">
                  <li>Upload multiple angles of ONE product</li>
                  <li>Front, back, model, and detail images improve accuracy</li>
                  <li>The AI uses all views to accurately reproduce the garment</li>
                  <li>Gemini 3 Pro only — no fallback model</li>
                </ul>
              </div>

              {/* Image Count Summary */}
              {(faceImage || bodyImage || garmentImages.length > 0) && (
                <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-xs text-blue-900">
                    <strong>Total Images:</strong> {(faceImage ? 1 : 0) + (bodyImage ? 1 : 0) + garmentImages.length}
                    <br />
                    <strong>Face:</strong> {faceImage ? '1' : '0'} | <strong>Body:</strong> {bodyImage ? '1' : '0'} | <strong>Product:</strong> {garmentImages.length}
                  </p>
                </div>
              )}

              {/* Prompt Editor Section */}
              <div className="mb-6">
                <button
                  onClick={() => setShowPrompt(!showPrompt)}
                  className="flex items-center justify-between w-full p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                  disabled={isProcessing}
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
                      className="w-full h-96 p-4 bg-gray-900 text-gray-100 text-xs font-mono leading-relaxed rounded-lg resize-y focus:outline-none focus:ring-2 focus:ring-teal-500"
                      disabled={isProcessing}
                    />
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {customPrompt !== null ? 'Using custom prompt' : 'Using default prompt — edit to customise'}
                      </p>
                      {customPrompt !== null && (
                        <button
                          onClick={() => setCustomPrompt(null)}
                          className="text-xs text-teal-600 hover:text-teal-700 font-medium"
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

              {/* Generate Button */}
              {!isProcessing && !resultImage && (
                <button
                  onClick={handleGenerate}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Generate Try-On ({garmentImages.length} product image{garmentImages.length !== 1 ? 's' : ''})
                </button>
              )}

              {/* Processing State */}
              {isProcessing && (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mb-4"></div>
                  <p className="text-sm text-gray-600">Generating virtual try-on...</p>
                  <p className="text-xs text-gray-500 mt-2">Using {garmentImages.length} product image{garmentImages.length !== 1 ? 's' : ''} for accurate reproduction</p>
                </div>
              )}

              {/* Result */}
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
                        link.download = getResultFilename();
                        link.click();
                      }}
                      className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Download Result ({resolution})
                    </button>
                    <button
                      onClick={handleReset}
                      className="w-full px-6 py-3 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                    >
                      Try Another Product
                    </button>
                    <button
                      onClick={handleFullReset}
                      className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                    >
                      Reset All
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Single Product Try-On Tips</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Upload the <strong>front view</strong> as the primary reference for garment design and pattern</li>
            <li>Add a <strong>back view</strong> to ensure accurate collar, back pattern, and overall structure</li>
            <li>Include a <strong>model-worn photo</strong> so the AI understands how the garment drapes and fits on a body</li>
            <li>Add <strong>detail/close-up</strong> shots for intricate patterns, logos, or embroidery accuracy</li>
            <li>Name your files descriptively (e.g. "jacket-front.jpg", "jacket-back.jpg") for automatic prompt labelling</li>
            <li>More reference images = more accurate garment reproduction, but also longer processing time</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SingleProductTryOn;
