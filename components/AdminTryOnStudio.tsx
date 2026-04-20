/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * AdminTryOnStudio
 *
 * Admin-only UI for generating personalised try-on imagery used in cold
 * email outreach. All AI work happens server-side via /api/tryon-admin;
 * the only credential this component ever touches is the admin signed
 * token from sessionStorage.
 */

import React, { useCallback, useMemo, useRef, useState } from 'react';

const ADMIN_TOKEN_STORAGE_KEY = 'adminToken';
const MAX_GARMENTS = 6;
const MAX_IMAGE_EDGE_PX = 1600; // client-side downscale ceiling
const RESOLUTIONS = [
  { value: '1k', label: '1K' },
  { value: '2k', label: '2K' },
  { value: '4k', label: '4K' },
] as const;

const DEFAULT_PROMPT = `Generate a photorealistic fashion photograph of the person in the customer photos wearing the product from the product images. Where a product image shows the product being worn by a model, use that shot as the direct compositional reference — match its framing, crop, and camera distance exactly. Dress the person in every item shown across the product images, reproducing colours, textures, patterns, logos, and construction exactly. Completely replace all clothing and footwear from the customer photos with the product. Add complementary footwear if none is shown in the product images. For jewellery like earrings, necklaces, bracelets, pendants frame the shot as a close up headshot from the neckline up, showing the item being tried on as the main focus of the image.

Preserve this person's face, skin tone, hair, body shape, and natural expression exactly as they appear — do not idealise, alter, or add a smile.

The pose should feel natural, neutral and confident. Light grey seamless studio backdrop, soft directional studio lighting, 85mm portrait lens, 9:16 aspect ratio. Indistinguishable from a professional e-commerce shoot.`;

const MALE_PRESET = {
  face: '/result-images/sydface.jpeg',
  body: '/result-images/sydbody--new.jpeg',
};
const FEMALE_PRESET = {
  face: '/result-images/siennaface-new.png',
  body: '/result-images/siennabody--new.JPG',
};

// ─── helpers ────────────────────────────────────────────────────────────────

async function fileToDownscaledDataUrl(file: File): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error(`${file.name} is not an image`);
  }
  const originalUrl = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error(`Could not decode ${file.name}`));
      el.src = originalUrl;
    });

    const { width, height } = img;
    const longestEdge = Math.max(width, height);
    const scale = longestEdge > MAX_IMAGE_EDGE_PX ? MAX_IMAGE_EDGE_PX / longestEdge : 1;
    const w = Math.round(width * scale);
    const h = Math.round(height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas 2D context unavailable');
    ctx.drawImage(img, 0, 0, w, h);

    const mime = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const quality = mime === 'image/jpeg' ? 0.92 : undefined;
    return canvas.toDataURL(mime, quality);
  } finally {
    URL.revokeObjectURL(originalUrl);
  }
}

async function urlToDownscaledDataUrl(url: string): Promise<string> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Could not load preset image (${res.status})`);
  const blob = await res.blob();
  const file = new File([blob], url.split('/').pop() || 'preset', {
    type: blob.type || 'image/jpeg',
  });
  return fileToDownscaledDataUrl(file);
}

function readAdminToken(): string | null {
  try {
    return sessionStorage.getItem(ADMIN_TOKEN_STORAGE_KEY);
  } catch {
    return null;
  }
}

// ─── Reusable image-slot tile ───────────────────────────────────────────────

interface ImageSlotProps {
  label: string;
  helpText?: string;
  value: string | null;
  onChange: (dataUrl: string | null) => void;
  required?: boolean;
}

const ImageSlot: React.FC<ImageSlotProps> = ({
  label,
  helpText,
  value,
  onChange,
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError(null);
    try {
      const dataUrl = await fileToDownscaledDataUrl(file);
      onChange(dataUrl);
    } catch (e: any) {
      setError(e?.message || 'Could not load image');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-3 bg-white">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-gray-900">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </span>
        {value && (
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-xs text-red-600 hover:text-red-700"
          >
            Remove
          </button>
        )}
      </div>
      {helpText && (
        <p className="text-xs text-gray-500 mb-2">{helpText}</p>
      )}
      <div
        className="aspect-[3/4] rounded-md bg-gray-100 overflow-hidden cursor-pointer flex items-center justify-center border border-dashed border-gray-300"
        onClick={() => inputRef.current?.click()}
      >
        {busy ? (
          <span className="text-xs text-gray-500">Resizing…</span>
        ) : value ? (
          <img
            src={value}
            alt={label}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-gray-500">Click to upload</span>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
};

// ─── Main component ────────────────────────────────────────────────────────

interface AdminTryOnStudioProps {
  onBack: () => void;
}

const AdminTryOnStudio: React.FC<AdminTryOnStudioProps> = ({ onBack }) => {
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [garmentImages, setGarmentImages] = useState<
    Array<{ dataUrl: string; name: string }>
  >([]);
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [resolution, setResolution] = useState<string>('2k');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<{ image: string; mimeType: string } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [presetBusy, setPresetBusy] = useState<'male' | 'female' | null>(null);
  const garmentFileInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = useMemo(
    () =>
      !!faceImage &&
      !!bodyImage &&
      garmentImages.length > 0 &&
      prompt.trim().length > 0 &&
      !isGenerating,
    [faceImage, bodyImage, garmentImages, prompt, isGenerating]
  );

  const applyPreset = async (which: 'male' | 'female') => {
    setPresetBusy(which);
    setError(null);
    try {
      const preset = which === 'male' ? MALE_PRESET : FEMALE_PRESET;
      const [face, body] = await Promise.all([
        urlToDownscaledDataUrl(preset.face),
        urlToDownscaledDataUrl(preset.body),
      ]);
      setFaceImage(face);
      setBodyImage(body);
    } catch (e: any) {
      setError(e?.message || 'Could not load preset');
    } finally {
      setPresetBusy(null);
    }
  };

  const removeGarment = useCallback(
    (index: number) => () => {
      setGarmentImages((prev) => prev.filter((_, i) => i !== index));
    },
    []
  );

  const handleMultiGarmentUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    const remaining = MAX_GARMENTS - garmentImages.length;
    const filesToUse = Array.from(files).slice(0, remaining);
    try {
      const entries = await Promise.all(
        filesToUse.map(async (f) => ({
          dataUrl: await fileToDownscaledDataUrl(f),
          name: f.name,
        }))
      );
      setGarmentImages((prev) => [...prev, ...entries]);
    } catch (e: any) {
      setError(e?.message || 'Could not load one or more garment images');
    } finally {
      if (garmentFileInputRef.current) garmentFileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    setError(null);
    setResult(null);
    setIsGenerating(true);
    try {
      const token = readAdminToken();
      if (!token) {
        throw new Error(
          'Not signed in — log out and sign back in to refresh your admin session.'
        );
      }

      const garmentPayload = garmentImages.map((g) => g.dataUrl);
      if (!faceImage || !bodyImage || garmentPayload.length === 0) {
        throw new Error('Face, body, and at least one garment image are required.');
      }

      const res = await fetch('/api/tryon-admin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-token': token,
        },
        body: JSON.stringify({
          faceImage,
          bodyImage,
          garmentImages: garmentPayload,
          prompt: prompt.trim(),
          resolution,
        }),
      });

      const text = await res.text();
      let json: any = null;
      try {
        json = text ? JSON.parse(text) : null;
      } catch {
        /* non-JSON error page */
      }

      if (!res.ok) {
        const msg =
          json?.error || `Generation failed (HTTP ${res.status})`;
        throw new Error(msg);
      }
      if (!json?.image) {
        throw new Error('Server returned no image');
      }
      setResult({ image: json.image, mimeType: json.mimeType || 'image/png' });
    } catch (e: any) {
      setError(e?.message || 'Generation failed');
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadResult = () => {
    if (!result) return;
    const ext = result.mimeType.split('/')[1] || 'png';
    const stems = garmentImages
      .map((g) => g.name.replace(/\.[^/.]+$/, '').replace(/[^A-Za-z0-9_-]+/g, '-'))
      .map((s) => s.replace(/^-+|-+$/g, ''))
      .filter(Boolean);
    const joined = stems.join('_').slice(0, 120) || 'tryon';
    const a = document.createElement('a');
    a.href = result.image;
    a.download = `${joined}.${ext}`;
    a.click();
  };

  const garmentCount = garmentImages.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Custom Try-On Studio</h1>
          <div className="w-24" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column — inputs */}
        <div className="space-y-6">
          <section>
            <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
              Customer reference
            </h2>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => applyPreset('male')}
                disabled={presetBusy !== null}
                className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {presetBusy === 'male' ? 'Loading…' : 'Male'}
              </button>
              <button
                type="button"
                onClick={() => applyPreset('female')}
                disabled={presetBusy !== null}
                className="flex-1 py-2 px-3 text-sm font-medium border border-gray-300 rounded-md bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {presetBusy === 'female' ? 'Loading…' : 'Female'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <ImageSlot
                label="Face"
                helpText="Clear, front-on head shot"
                value={faceImage}
                onChange={setFaceImage}
                required
              />
              <ImageSlot
                label="Full body"
                helpText="Head-to-toe, neutral pose"
                value={bodyImage}
                onChange={setBodyImage}
                required
              />
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
                Garments ({garmentCount}/{MAX_GARMENTS})
              </h2>
              {garmentCount < MAX_GARMENTS && (
                <button
                  type="button"
                  onClick={() => garmentFileInputRef.current?.click()}
                  className="text-xs text-gray-900 font-medium hover:underline"
                >
                  + Upload images
                </button>
              )}
            </div>
            <input
              ref={garmentFileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              className="hidden"
              onChange={(e) => handleMultiGarmentUpload(e.target.files)}
            />
            {garmentCount === 0 ? (
              <div
                className="aspect-[3/1] rounded-md bg-gray-100 flex items-center justify-center border border-dashed border-gray-300 cursor-pointer"
                onClick={() => garmentFileInputRef.current?.click()}
              >
                <span className="text-xs text-gray-500">
                  Click to upload one or more garment images
                </span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {garmentImages.map((g, i) => (
                  <div
                    key={`${g.name}-${i}`}
                    className="border border-gray-300 rounded-lg p-3 bg-white"
                  >
                    <div className="flex items-center justify-between mb-2 gap-2">
                      <span
                        className="text-sm font-medium text-gray-900 truncate"
                        title={g.name}
                      >
                        {g.name}
                      </span>
                      <button
                        type="button"
                        onClick={removeGarment(i)}
                        className="text-xs text-red-600 hover:text-red-700 shrink-0"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="aspect-[3/4] rounded-md bg-gray-100 overflow-hidden flex items-center justify-center">
                      <img
                        src={g.dataUrl}
                        alt={g.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section>
            <label
              htmlFor="tryon-prompt"
              className="block text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2"
            >
              Prompt
            </label>
            <textarea
              id="tryon-prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={10}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 text-sm"
            />
            <div className="flex items-center justify-between mt-1">
              <button
                type="button"
                onClick={() => setPrompt(DEFAULT_PROMPT)}
                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
              >
                Reset to default
              </button>
              <p className="text-xs text-gray-500">
                {prompt.length} / 4000
              </p>
            </div>
          </section>

          <section>
            <label className="block text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Output resolution
            </label>
            <div className="flex gap-2">
              {RESOLUTIONS.map((r) => (
                <button
                  key={r.value}
                  type="button"
                  onClick={() => setResolution(r.value)}
                  className={`flex-1 py-2 px-3 text-sm font-medium border rounded-md transition-colors ${
                    resolution === r.value
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-900 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </section>

          <div className="pt-2">
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-full py-3 bg-gray-900 text-white rounded-md font-medium hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isGenerating ? 'Generating…' : 'Generate try-on'}
            </button>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </div>
        </div>

        {/* Right column — result */}
        <div>
          <h2 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-3">
            Result
          </h2>
          <div className="border border-gray-300 rounded-lg bg-white p-4 min-h-[480px] flex items-center justify-center">
            {isGenerating ? (
              <div className="text-center text-gray-500">
                <div className="animate-pulse text-sm">Generating try-on…</div>
                <div className="text-xs mt-1">This usually takes 10–30 seconds.</div>
              </div>
            ) : result ? (
              <div className="w-full">
                <img
                  src={result.image}
                  alt="Generated try-on"
                  className="w-full h-auto rounded-md"
                />
                <button
                  onClick={downloadResult}
                  className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors"
                >
                  Download
                </button>
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center">
                Upload a face, body and at least one garment, write a prompt,
                then hit Generate.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminTryOnStudio;
