/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import type { WardrobeItem } from '../types';
import { CheckCircleIcon } from './icons';

interface WardrobePanelProps {
  onGarmentSelect: (garmentFile: File, garmentInfo: WardrobeItem) => void;
  activeGarmentIds: string[];
  isLoading: boolean;
  wardrobe: WardrobeItem[];
}

// Helper to convert image URL to a File object using a canvas to bypass potential CORS issues.
const urlToFile = (url: string, filename: string): Promise<File> => {
    return new Promise((resolve, reject) => {
        const image = new Image();
        image.setAttribute('crossOrigin', 'anonymous');

        image.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = image.naturalWidth;
            canvas.height = image.naturalHeight;

            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error('Could not get canvas context.'));
            }
            ctx.drawImage(image, 0, 0);

            canvas.toBlob((blob) => {
                if (!blob) {
                    return reject(new Error('Canvas toBlob failed.'));
                }
                const mimeType = blob.type || 'image/png';
                const file = new File([blob], filename, { type: mimeType });
                resolve(file);
            }, 'image/png');
        };

        image.onerror = (error) => {
            // Attempt to fetch via proxy if CORS fails for known patterns
            console.error(`Direct image load failed for ${url}. Error:`, error);
            reject(new Error(`Could not load image. Please ensure it's a direct link and the hosting service allows cross-origin access.`));
        };

        image.src = url;
    });
};

const WardrobePanel: React.FC<WardrobePanelProps> = ({ onGarmentSelect, activeGarmentIds, isLoading, wardrobe }) => {
    const [error, setError] = useState<string | null>(null);

    const handleGarmentClick = async (item: WardrobeItem) => {
        if (isLoading || activeGarmentIds.includes(item.id)) return;
        setError(null);
        try {
            const file = await urlToFile(item.url, item.name);
            onGarmentSelect(file, item);
        } catch (err) {
            const friendlyError = err instanceof Error ? err.message : 'Could not load the selected wardrobe item.';
            setError(friendlyError);
            console.error(`[Wardrobe] Failed to process wardrobe item from URL: ${item.url}.`, err);
        }
    };

  return (
    <div className="pt-6 border-t border-gray-400/50">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-serif tracking-wider text-gray-800">Wardrobe</h2>
        </div>
        
        <div className="grid grid-cols-3 gap-3">
            {wardrobe.map((item) => {
                const isActive = activeGarmentIds.includes(item.id);
                return (
                    <div key={item.id} className="relative group/wardrobeitem">
                        <button
                            onClick={() => handleGarmentClick(item)}
                            disabled={isLoading || isActive}
                            className="w-full relative aspect-square border rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 disabled:opacity-60 disabled:cursor-not-allowed"
                            aria-label={`Select ${item.name}`}
                        >
                            <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/wardrobeitem:opacity-100 transition-opacity">
                                <p className="text-white text-xs font-bold text-center p-1">{item.name}</p>
                            </div>
                            {isActive && (
                                <div className="absolute inset-0 bg-gray-900/70 flex items-center justify-center">
                                    <CheckCircleIcon className="w-8 h-8 text-white" />
                                </div>
                            )}
                        </button>
                    </div>
                );
            })}
        </div>
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default WardrobePanel;