/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { generateSimplifiedCustomModel } from '../services/geminiService';

interface ModelGenerationToolProps {
  onBack: () => void;
}

const ModelGenerationTool: React.FC<ModelGenerationToolProps> = ({ onBack }) => {
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [referencePreviews, setReferencePreviews] = useState<string[]>([]);
  const [selectedModel, setSelectedModel] = useState<'gemini-2.5-flash' | 'gemini-3-pro'>('gemini-3-pro');
  const [showPrompt, setShowPrompt] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }

      const maxImages = selectedModel === 'gemini-2.5-flash' ? 3 : 5;
      if (referenceImages.length >= maxImages) {
        setError(`Maximum ${maxImages} images for ${selectedModel === 'gemini-2.5-flash' ? 'Gemini 2.5 Flash' : 'Gemini 3.0 Pro'}`);
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const preview = reader.result as string;
        setReferenceImages([...referenceImages, file]);
        setReferencePreviews([...referencePreviews, preview]);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (index: number) => {
    setReferenceImages(referenceImages.filter((_, i) => i !== index));
    setReferencePreviews(referencePreviews.filter((_, i) => i !== index));
  };

  // Generate live prompt preview
  const generatePromptPreview = (): string => {
    return `You are an expert fashion photographer AI. Create a full-body professional studio model photo using the provided reference images.

**Reference Images Provided:**
- ${referenceImages.length} reference image${referenceImages.length > 1 ? 's' : ''}: Use ALL of these images to understand the person's unique facial features, body proportions, skin tone, hair, and overall appearance

**Critical Requirements:**

1. **Complete Identity Preservation**:
   - The face MUST perfectly match the reference images (facial features, expression, skin tone, hair, identity)
   - Maintain the person's natural body type and proportions as shown in the reference images
   - The person should look EXACTLY like themselves in a professional model pose

2. **Professional Model Pose**:
   - Place the person in a natural, relaxed standing model pose suitable for e-commerce fashion photography
   - Natural, confident posture with good balance
   - Arms relaxed at sides or one hand on hip
   - Straight posture showcasing body proportions

3. **Studio Environment**:
   - Clean, neutral studio backdrop (light gray, #f0f0f0)
   - Professional studio lighting with soft, even illumination
   - Appropriate shadows that highlight body contours naturally

4. **Photorealistic Quality**:
   - The final image must be completely photorealistic and indistinguishable from a real studio photograph
   - Natural skin tones, textures, and lighting
   - Professional fashion photography quality

5. **Image Composition**:
   - Full-body shot from head to toe
   - Person centered and well-framed
   - Professional e-commerce model photography composition
   - Exact dimensions: 1080 pixels wide by 1350 pixels tall (4:5 aspect ratio)

**Clothing:**
- Simple, neutral clothing (plain t-shirt or simple top, neutral pants or jeans)
- Nothing that distracts from the person's appearance
- Clothing should fit naturally and look professional

Return ONLY the final photorealistic studio model image.`;
  };

  const isFormValid = (): boolean => {
    return referenceImages.length > 0;
  };

  const handleGenerate = async () => {
    if (referenceImages.length === 0) return;

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const modelName = selectedModel === 'gemini-2.5-flash'
        ? 'gemini-2.5-flash-image'
        : 'gemini-3-pro-image-preview-preview';

      const result = await generateSimplifiedCustomModel(
        referenceImages,
        modelName
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
    setReferenceImages([]);
    setReferencePreviews([]);
    setResultImage(null);
    setError(null);
  };

  const maxImages = selectedModel === 'gemini-2.5-flash' ? 3 : 5;

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
              <p className="text-sm text-gray-600 mt-1">Create professional studio model photos from reference images</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Column 1: Image Uploads */}
          <div className="space-y-6">
            {/* Reference Images */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Reference Images (1-{maxImages})</h2>
              <p className="text-xs text-gray-500 mb-3">Upload photos showing face, body, or any angles</p>
              <div className="space-y-3">
                {referencePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt={`Reference ${index + 1}`} className="w-full h-48 object-contain bg-gray-100 rounded-lg" />
                    <button
                      onClick={() => removeImage(index)}
                      className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                {referenceImages.length < maxImages && (
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm text-gray-500 font-semibold">Add Reference Photo</p>
                      <p className="text-xs text-gray-500">{referenceImages.length}/{maxImages} images</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                  </label>
                )}
              </div>
            </div>
          </div>

          {/* Column 2: Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Settings</h2>

            {/* Model Selection */}
            <div className="mb-6 space-y-3">
              <label className="block text-sm font-medium text-gray-700">AI Model Selection</label>
              <div className="space-y-2">
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: selectedModel === 'gemini-2.5-flash' ? '#10b981' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="model"
                    value="gemini-2.5-flash"
                    checked={selectedModel === 'gemini-2.5-flash'}
                    onChange={(e) => {
                      setSelectedModel(e.target.value as 'gemini-2.5-flash' | 'gemini-3-pro');
                      // If switching to flash and have more than 3 images, show warning
                      if (e.target.value === 'gemini-2.5-flash' && referenceImages.length > 3) {
                        setError('Gemini 2.5 Flash supports up to 3 images. Please remove some images.');
                      } else {
                        setError(null);
                      }
                    }}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Gemini 2.5 Flash</div>
                    <div className="text-xs text-gray-500 mt-1">Faster generation, supports up to 3 images</div>
                  </div>
                </label>
                <label className="flex items-start p-3 border-2 rounded-lg cursor-pointer transition-colors hover:bg-gray-50 relative"
                  style={{ borderColor: selectedModel === 'gemini-3-pro' ? '#10b981' : '#e5e7eb' }}>
                  <input
                    type="radio"
                    name="model"
                    value="gemini-3-pro"
                    checked={selectedModel === 'gemini-3-pro'}
                    onChange={(e) => {
                      setSelectedModel(e.target.value as 'gemini-2.5-flash' | 'gemini-3-pro');
                      setError(null);
                    }}
                    className="mt-1 mr-3"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-sm">Gemini 3.0 Pro</div>
                    <div className="text-xs text-gray-500 mt-1">Higher quality, supports up to 5 images</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Model Info */}
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
              <h3 className="text-sm font-semibold text-emerald-900 mb-2">Simplified Approach</h3>
              <ul className="text-xs text-emerald-800 space-y-1">
                <li>• No measurements required</li>
                <li>• Upload any mix of face and body photos</li>
                <li>• AI infers body proportions from images</li>
                <li>• Generates model in neutral clothing</li>
              </ul>
            </div>

            {/* Image Count Info */}
            {referenceImages.length > 0 && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-900">
                  <strong>Model:</strong> {selectedModel === 'gemini-2.5-flash' ? 'Gemini 2.5 Flash' : 'Gemini 3.0 Pro'}
                  <br />
                  <strong>Reference Images:</strong> {referenceImages.length} ({referenceImages.length <= 5 ? 'high fidelity' : 'standard'})
                  <br />
                  <strong>Output:</strong> 1080x1350 (4:5 ratio)
                </p>
              </div>
            )}
          </div>

          {/* Column 3: Generation & Results */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Model</h2>

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
                  onClick={handleGenerate}
                  disabled={!isFormValid()}
                  className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-4"
                >
                  Generate Studio Model
                </button>
                <p className="text-sm text-gray-500 text-center">
                  {referenceImages.length === 0
                    ? 'Upload at least 1 reference image'
                    : 'Ready to generate!'}
                </p>
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

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">Tips for Best Results</h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-blue-800">
            <li>Upload a mix of face photos and full-body photos for best accuracy</li>
            <li>Include at least one clear face photo showing facial features</li>
            <li>Include at least one full-body photo showing body proportions</li>
            <li>Use well-lit photos with neutral backgrounds</li>
            <li>More reference images generally produce better results (up to model limit)</li>
            <li>The AI will generate the model in simple, neutral clothing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ModelGenerationTool;
