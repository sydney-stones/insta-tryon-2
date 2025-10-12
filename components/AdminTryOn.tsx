/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { WardrobeItem } from '../types';
import VirtualTryOnModal from './VirtualTryOnModal';

interface AdminTryOnProps {
  onBack: () => void;
  products: WardrobeItem[];
}

const AdminTryOn: React.FC<AdminTryOnProps> = ({ onBack, products }) => {
  const [selectedOutfit, setSelectedOutfit] = useState<WardrobeItem | null>(null);
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleTryOnClick = (outfit: WardrobeItem) => {
    setSelectedOutfit(outfit);
    setIsTryOnModalOpen(true);
  };

  const handleCloseTryOnModal = () => {
    setIsTryOnModalOpen(false);
    setTimeout(() => setSelectedOutfit(null), 300);
  };

  const filteredOutfits = products.filter((outfit) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return outfit.name.toLowerCase().includes(query) || outfit.id.toLowerCase().includes(query);
  });

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
              <h1 className="text-2xl font-bold text-gray-900">Unlimited Virtual Try-On</h1>
              <p className="text-sm text-gray-600 mt-1">Test outfits with no daily limits</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="relative max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search outfits..."
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      {/* Outfits Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {filteredOutfits.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? 'No outfits found.' : 'No outfits available. Add outfits in the dashboard first.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredOutfits.map((outfit) => (
              <div
                key={outfit.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="aspect-[3/4] bg-gray-100 relative">
                  <img
                    src={outfit.url}
                    alt={outfit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-sm truncate mb-1">
                    {outfit.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3">{outfit.folder || 'Uncategorized'}</p>
                  <button
                    onClick={() => handleTryOnClick(outfit)}
                    className="w-full bg-gray-900 text-white py-2 px-3 rounded-md text-sm font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Try On
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unlimited Try-On Modal */}
      <VirtualTryOnModal
        isOpen={isTryOnModalOpen}
        onClose={handleCloseTryOnModal}
        product={selectedOutfit}
        isUnlimited={true}
      />
    </div>
  );
};

export default AdminTryOn;
