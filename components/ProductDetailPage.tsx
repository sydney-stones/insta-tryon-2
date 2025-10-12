/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion } from 'framer-motion';

interface ProductDetailPageProps {
  products: WardrobeItem[];
  onTryOnClick: (product: WardrobeItem) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, onTryOnClick }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/" className="text-gray-600 hover:text-gray-900 underline">
            Return to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm mb-8">
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            Home
          </Link>
          <span className="text-gray-400">/</span>
          <Link to="/" className="text-gray-600 hover:text-gray-900">
            {product.folder}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="relative aspect-[3/4] lg:aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product.url}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
                {product.name}
              </h1>

              {product.price && (
                <p className="text-2xl font-semibold text-gray-900 mb-6">
                  ${product.price.toFixed(2)}
                </p>
              )}

              {product.description && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {product.material && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Material</h3>
                  <p className="text-gray-600">{product.material}</p>
                </div>
              )}

              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Select Size</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 px-4 border rounded-md text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-gray-900 bg-gray-900 text-white'
                            : 'border-gray-300 bg-white text-gray-900 hover:border-gray-900'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {product.colors && product.colors.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Available Colors</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.colors.map((color) => (
                      <span
                        key={color}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mt-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onTryOnClick(product)}
                className="w-full bg-gray-900 text-white py-4 px-6 rounded-md font-semibold text-base hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Virtual Try-On
              </motion.button>

              <button className="w-full bg-gray-100 text-gray-900 py-4 px-6 rounded-md font-semibold text-base hover:bg-gray-200 transition-colors">
                Add to Cart
              </button>
            </div>

            {/* Info Banner */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-md">
              <p className="text-sm text-blue-900">
                <span className="font-semibold">Try before you buy!</span> Use our Virtual Try-On feature to see how this looks on you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
