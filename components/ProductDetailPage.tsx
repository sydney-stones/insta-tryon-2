/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { WardrobeItem } from '../types';
import { motion } from 'framer-motion';
import { getSavedModel } from '../lib/tryOnLimit';

interface ProductDetailPageProps {
  products: WardrobeItem[];
  onTryOnClick: (product: WardrobeItem) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, onTryOnClick }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const savedModel = getSavedModel();

  const productImages = useMemo(() => {
    if (!product) return [];
    const images = [product.url];
    if (product.secondaryImageUrl) {
      images.push(product.secondaryImageUrl);
    }
    // Add saved model as 3rd image if it exists
    if (savedModel) {
      images.push(savedModel);
    }
    return images;
  }, [product, savedModel]);

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
          {/* Product Image with Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] lg:aspect-[2/3] overflow-hidden rounded-lg bg-gray-100">
              <img
                src={productImages[selectedImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              {/* "Try on this look" button overlay if viewing saved model */}
              {savedModel && selectedImageIndex === productImages.length - 1 && (
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onTryOnClick(product)}
                    className="bg-white text-gray-900 px-8 py-4 rounded-lg font-bold text-lg shadow-xl"
                  >
                    Try on this look
                  </motion.button>
                </div>
              )}
            </div>
            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="flex gap-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[3/4] w-20 overflow-hidden rounded-md transition-all ${
                      selectedImageIndex === index
                        ? 'ring-2 ring-gray-900 ring-offset-2'
                        : 'ring-1 ring-gray-200 hover:ring-gray-400'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                    {/* Label for model image thumbnail */}
                    {savedModel && index === productImages.length - 1 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end justify-center pb-1">
                        <span className="text-white text-xs font-semibold">You</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Virtual Try-On Button - Mobile */}
            <div className="lg:hidden">
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
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Virtual Try-On Button - Desktop */}
            <div className="hidden lg:block mb-6">
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
            </div>

            <div className="flex-1">

              {product.description && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Outfit Items */}
              {product.outfitItems && product.outfitItems.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Shop This Outfit</h3>
                  <div className="space-y-3">
                    {product.outfitItems.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{item.name}</p>
                          {item.price !== undefined && item.price > 0 && (
                            <p className="text-sm text-gray-600 mt-1">
                              £{item.price.toFixed(2)}
                            </p>
                          )}
                        </div>
                        {item.shopUrl && (
                          <a
                            href={item.shopUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-4 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-md hover:bg-gray-800 transition-colors"
                          >
                            Shop
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
