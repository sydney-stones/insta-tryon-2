/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { WardrobeItem, WardrobeFolder } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: WardrobeItem[];
  folders: WardrobeFolder[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, folders }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const collectionNames = useMemo(() => {
    return ['All', ...folders.map(f => f.name)];
  }, [folders]);

  // Sort products by most recent first (reverse order of array)
  const sortedProducts = useMemo(() => {
    return [...products].reverse();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = sortedProducts;

    // Filter by collection
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(p => p.folder === selectedCollection);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        // Search in outfit name
        if (p.name.toLowerCase().includes(query)) {
          return true;
        }
        // Search in outfit items
        if (p.outfitItems && p.outfitItems.length > 0) {
          return p.outfitItems.some(item =>
            item.name.toLowerCase().includes(query)
          );
        }
        return false;
      });
    }

    return filtered;
  }, [sortedProducts, selectedCollection, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 text-center">
            Virtual Try-On
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            See yourself in my style
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search outfits or items..."
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Collection Filter */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {collectionNames.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCollection === collection
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'outfit' : 'outfits'}
            {searchQuery && ` matching "${searchQuery}"`}
          </p>
          {searchQuery && filteredProducts.length === 0 && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-sm text-gray-600 hover:text-gray-900 underline"
            >
              Clear search
            </button>
          )}
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchQuery ? 'No outfits found. Try a different search term.' : 'No outfits available.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
