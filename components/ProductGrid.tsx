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

  const collectionNames = useMemo(() => {
    return ['All', ...folders.map(f => f.name)];
  }, [folders]);

  const filteredProducts = useMemo(() => {
    if (selectedCollection === 'All') {
      return products;
    }
    return products.filter(p => p.folder === selectedCollection);
  }, [products, selectedCollection]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 text-center">
            Virtual Try-On Store
          </h1>
          <p className="mt-4 text-lg text-gray-600 text-center max-w-2xl mx-auto">
            Browse my collection and try on any item virtually with AI-powered technology
          </p>
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
        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
