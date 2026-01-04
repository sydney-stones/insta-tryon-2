/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem, WardrobeFolder } from '../types';
import ProductCard from './ProductCard';
import Testimonials from './Testimonials';

interface ProductGridProps {
  products: WardrobeItem[];
  folders: WardrobeFolder[];
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, folders, searchQuery = '' }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');

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
          return p.outfitItems.some((item: { name: string }) =>
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
      {/* Hero Section - Waitlist CTAs */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 text-center mb-4">
            Virtual Try Before You Buy
          </h1>

          {/* Waitlist Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Link
              to="/brand-waitlist"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all hover:scale-105 shadow-lg text-center"
            >
              For Brands
            </Link>

            <Link
              to="/demo"
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-lg hover:from-emerald-700 hover:via-teal-700 hover:to-cyan-700 transition-all hover:scale-105 shadow-lg text-center"
            >
              See How It Works
            </Link>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-[#444833] py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center leading-relaxed">
            Rendered Fits is an AI-powered virtual try-on solution for Shopify fashion e-commerce, redefining the way people shop online.
          </p>
        </div>
      </div>

      {/* Large Image Section */}
      <div className="w-full flex justify-center bg-white py-8 sm:py-12">
        <img
          src="/outfits/gymking.png"
          alt="Virtual Try-On Demo"
          className="w-full max-w-7xl h-auto object-contain"
        />
      </div>

      {/* Benefits Statistics Section */}
      <div className="bg-[#444833]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">30%</p>
              <p className="text-gray-200 text-lg">Higher conversion rate with virtual try-on</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">20%</p>
              <p className="text-gray-200 text-lg">Reduction in product returns</p>
            </div>
            <div>
              <p className="text-4xl sm:text-5xl font-bold text-white mb-2">20%</p>
              <p className="text-gray-200 text-lg">Increase in average order value</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-600">
            @renderedfits wardrobe - {filteredProducts.length} {filteredProducts.length === 1 ? 'outfit' : 'outfits'}
          </p>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No outfits available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Legal Footer */}
      <footer className="bg-[#444833] py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <img
              src="/Renderedfits-TM-2.png"
              alt="Rendered Fits"
              className="h-8 sm:h-10 w-auto mb-2"
            />
            <div className="text-xs sm:text-sm text-white space-y-2">
              <p>Get in touch: <a href="mailto:renderedfits@gmail.com" className="hover:underline">renderedfits@gmail.com</a></p>
              <p>Rendered Fits Ltd registered in England and Wales under the company registration number 16922551.</p>
              <p>Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductGrid;
