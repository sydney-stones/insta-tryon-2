/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState } from 'react';
import type { WardrobeItem } from '../types';
import { PlusIcon, CheckCircleIcon, XIcon } from './icons';
import { defaultWardrobe } from '../wardrobe';

interface WardrobePanelProps {
  onGarmentSelect: (garmentFile: File, garmentInfo: WardrobeItem) => void;
  activeGarmentIds: string[];
  isLoading: boolean;
  wardrobe: WardrobeItem[];
  onRemoveFromWardrobe: (itemId: string) => void;
  onAddToWardrobe: (item: WardrobeItem) => void;
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

const WardrobePanel: React.FC<WardrobePanelProps> = ({ onGarmentSelect, activeGarmentIds, isLoading, wardrobe, onRemoveFromWardrobe, onAddToWardrobe }) => {
    const [error, setError] = useState<string | null>(null);
    const [showAddItemForm, setShowAddItemForm] = useState(false);
    const [newItemUrl, setNewItemUrl] = useState('');
    const [newItemName, setNewItemName] = useState('');

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

    const handleAddItemSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
    
        if (!newItemUrl.trim() || !newItemName.trim()) {
            setError("Please provide both a name and an image URL.");
            return;
        }
    
        try {
            // Basic URL validation
            new URL(newItemUrl);
        } catch (_) {
            setError("Please enter a valid URL.");
            return;
        }
    
        const newItem: WardrobeItem = {
            id: `custom-${Date.now()}`,
            name: newItemName,
            url: newItemUrl,
            isCustom: true,
        };
        onAddToWardrobe(newItem);
    
        // Reset and hide form
        setShowAddItemForm(false);
        setNewItemUrl('');
        setNewItemName('');
    };

  return (
    <div className="pt-6 border-t border-gray-400/50">
        <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-serif tracking-wider text-gray-800">Wardrobe</h2>
            <button
                onClick={() => setShowAddItemForm(!showAddItemForm)}
                disabled={isLoading}
                className="p-1.5 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors disabled:opacity-50"
                aria-label="Add new item to wardrobe"
            >
                <PlusIcon className="w-5 h-5" />
            </button>
        </div>
        
        {showAddItemForm && (
            <form onSubmit={handleAddItemSubmit} className="mb-4 p-3 bg-gray-100/80 rounded-lg animate-fade-in border border-gray-200/60">
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Add New Item</h3>
                <div className="space-y-2">
                    <input
                        type="text"
                        value={newItemName}
                        onChange={(e) => setNewItemName(e.target.value)}
                        placeholder="Item Name (e.g., 'Blue Jacket')"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
                        required
                        aria-label="Item Name"
                    />
                    <input
                        type="url"
                        value={newItemUrl}
                        onChange={(e) => setNewItemUrl(e.target.value)}
                        placeholder="Image URL (e.g., 'https://.../image.png')"
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-800"
                        required
                        aria-label="Image URL"
                    />
                </div>
                <div className="flex items-center justify-end gap-2 mt-3">
                    <button type="button" onClick={() => setShowAddItemForm(false)} className="px-3 py-1 text-sm font-semibold text-gray-600 rounded-md hover:bg-gray-200">
                        Cancel
                    </button>
                    <button type="submit" className="px-3 py-1 text-sm font-semibold text-white bg-gray-800 rounded-md hover:bg-gray-700">
                        Add Item
                    </button>
                </div>
            </form>
        )}
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
                        {item.isCustom && (
                            <button
                                onClick={() => onRemoveFromWardrobe(item.id)}
                                className="absolute -top-2 -right-2 z-10 p-1 bg-white rounded-full text-gray-500 hover:text-red-600 hover:bg-red-50 shadow-md transition-all opacity-0 group-hover/wardrobeitem:opacity-100 disabled:opacity-50"
                                aria-label={`Remove ${item.name} from wardrobe`}
                                disabled={isLoading}
                            >
                                <XIcon className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                );
            })}
        </div>
        {wardrobe.length === defaultWardrobe.length && !showAddItemForm && (
             <p className="text-center text-sm text-gray-500 mt-4">Your custom garments will appear here. Click the '+' to add an item from a URL.</p>
        )}
        {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
};

export default WardrobePanel;