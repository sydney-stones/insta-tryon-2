/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface ComparisonCard {
  id: number;
  productType: string;
  beforeLabel: string;
  productLabel: string;
  afterLabel: string;
  beforeSrc: string;
  productSrc: string;
  afterSrc: string;
}

const comparisons: ComparisonCard[] = [
  { id: 1, productType: 'Summer Dress', beforeLabel: 'Customer Photo 1', productLabel: 'Product: Summer Dress', afterLabel: 'Try-On Result 1', beforeSrc: '/Users/sydneystones/insta-tryon-2-1/result-images/face.png', productSrc: '', afterSrc: '' },
  { id: 2, productType: 'Denim Jacket', beforeLabel: 'Customer Photo 2', productLabel: 'Product: Denim Jacket', afterLabel: 'Try-On Result 2', beforeSrc: '/Users/sydneystones/insta-tryon-2-1/result-images/fullbody Large.jpeg', productSrc: '', afterSrc: '' },
  { id: 3, productType: 'Evening Gown', beforeLabel: 'Customer Photo 3', productLabel: 'Product: Evening Gown', afterLabel: 'Try-On Result 3', beforeSrc: 'result-images/IMG_8175.jpeg', productSrc: '', afterSrc: '' },
  { id: 4, productType: 'Casual T-Shirt', beforeLabel: 'Customer Photo 4', productLabel: 'Product: Casual T-Shirt', afterLabel: 'Try-On Result 4', beforeSrc: 'result-images/siennabody--new.JPG', productSrc: '', afterSrc: '' },
  { id: 5, productType: 'Wool Coat', beforeLabel: 'Customer Photo 5', productLabel: 'Product: Wool Coat', afterLabel: 'Try-On Result 5', beforeSrc: '/Users/sydneystones/insta-tryon-2-1/result-images/siennaface.png', productSrc: '', afterSrc: '' },
  { id: 6, productType: 'Silk Blouse', beforeLabel: 'Customer Photo 6', productLabel: 'Product: Silk Blouse', afterLabel: 'Try-On Result 6', beforeSrc: '/Users/sydneystones/insta-tryon-2-1/result-images/siennaneutral--new.JPG', productSrc: '', afterSrc: '' },
  { id: 7, productType: 'Leather Jacket', beforeLabel: 'Customer Photo 7', productLabel: 'Product: Leather Jacket', afterLabel: 'Try-On Result 7', beforeSrc: '/Users/sydneystones/insta-tryon-2-1/result-images/sydbody--new.jpeg', productSrc: '', afterSrc: '' },
  { id: 8, productType: 'Knit Sweater', beforeLabel: 'Customer Photo 8', productLabel: 'Product: Knit Sweater', afterLabel: 'Try-On Result 8', beforeSrc: '', productSrc: '', afterSrc: '' },
];

const ResultsPage: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<number | null>(null);

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCard(null);
    };
    if (selectedCard !== null) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedCard]);

  const selectedComparison = selectedCard !== null ? comparisons.find(c => c.id === selectedCard) : null;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-[#444833] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <a href="/" className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            RENDERED FITS™
          </a>
        </div>
      </header>

      {/* Section 1: Hero */}
      <div className="bg-white py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif italic text-gray-900 leading-tight mb-6">
            See What Virtual Try-On Actually Looks Like
          </h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            Real customers. Real products. Generated in 20 seconds.
          </p>
        </div>
      </div>

      {/* Section 2: Before/After Gallery */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {comparisons.map((card) => (
              <button
                key={card.id}
                onClick={() => setSelectedCard(card.id)}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer text-left"
              >
                <div className="p-4 sm:p-5">
                  {/* 3-column: Before | Product | After */}
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-3 items-center">
                    {/* Before */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Before</p>
                      {card.beforeSrc ? (
                        <img src={card.beforeSrc} alt={card.beforeLabel} className="w-full aspect-[3/4] object-cover rounded-lg" />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs text-gray-400 text-center px-2">{card.beforeLabel}</span>
                        </div>
                      )}
                    </div>

                    {/* Product (center, smaller) */}
                    <div className="flex flex-col items-center">
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">Product</p>
                      {card.productSrc ? (
                        <img src={card.productSrc} alt={card.productLabel} className="w-16 sm:w-20 aspect-square object-cover rounded-lg" />
                      ) : (
                        <div className="w-16 sm:w-20 aspect-square bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                          <svg className="w-6 h-6 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* After */}
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-gray-400 mb-2">After</p>
                      {card.afterSrc ? (
                        <img src={card.afterSrc} alt={card.afterLabel} className="w-full aspect-[3/4] object-cover rounded-lg" />
                      ) : (
                        <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-[10px] sm:text-xs text-gray-400 text-center px-2">{card.afterLabel}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-800">{card.productType}</p>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">Click to enlarge</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Section 3: Stats Bar */}
      <div className="bg-[#444833] py-10 sm:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12">
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">28%</p>
              <p className="text-sm text-white/70 mt-1">fewer returns</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">20%</p>
              <p className="text-sm text-white/70 mt-1">higher conversion</p>
            </div>
            <div className="hidden sm:block w-px h-10 bg-white/20" />
            <div className="text-center">
              <p className="text-2xl sm:text-3xl font-bold text-white">15-25%</p>
              <p className="text-sm text-white/70 mt-1">higher AOV</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: How It Works */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-12 sm:mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 1</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer uploads photo</p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 2</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">AI generates try-on in 20 seconds</p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
                </svg>
              </div>
              <p className="text-[10px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1">Step 3</p>
              <p className="text-sm sm:text-base font-semibold text-gray-900">Customer selects size and adds to cart</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section 5: CTA */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-8">
            Want to see this on your products?
          </h2>
          <a
            href="https://calendly.com/mail-renderedfits/15-minute-meeting"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-[#444833] text-white px-10 sm:px-14 py-4 sm:py-5 text-base sm:text-lg font-medium hover:bg-[#3a3d2d] transition-colors"
          >
            Book a 15-Minute Demo
          </a>
          <div className="mt-6">
            <Link
              to="/demo"
              className="text-[#444833] font-medium hover:underline transition-colors"
            >
              Or try it yourself on our live demo &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#3a3d2d] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
            Rendered Fits Ltd registered in England and Wales under the company registration number 16922551. Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ
          </p>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedComparison && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900">{selectedComparison.productType}</h3>
              <button
                onClick={() => setSelectedCard(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {/* Before */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Before</p>
                  {selectedComparison.beforeSrc ? (
                    <img src={selectedComparison.beforeSrc} alt={selectedComparison.beforeLabel} className="w-full aspect-[3/4] object-cover rounded-lg" />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-400">{selectedComparison.beforeLabel}</span>
                    </div>
                  )}
                </div>

                {/* After */}
                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">After</p>
                  {selectedComparison.afterSrc ? (
                    <img src={selectedComparison.afterSrc} alt={selectedComparison.afterLabel} className="w-full aspect-[3/4] object-cover rounded-lg" />
                  ) : (
                    <div className="w-full aspect-[3/4] bg-gray-200 rounded-lg flex items-center justify-center">
                      <span className="text-sm text-gray-400">{selectedComparison.afterLabel}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Product thumbnail below */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
                {selectedComparison.productSrc ? (
                  <img src={selectedComparison.productSrc} alt={selectedComparison.productLabel} className="w-12 h-12 object-cover rounded-lg" />
                ) : (
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                    <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
                <div>
                  <p className="text-sm font-medium text-gray-800">{selectedComparison.productType}</p>
                  <p className="text-xs text-gray-400">{selectedComparison.productLabel}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;
