/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StoreHeader: React.FC = () => {
  const location = useLocation();
  const isStorePage = location.pathname === '/' || location.pathname.startsWith('/product');

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              Virtual Try-On
            </h1>
          </Link>

          <nav className="flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors ${
                isStorePage ? 'text-gray-900' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Shop
            </Link>
            <button className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-gray-900 rounded-full">
                0
              </span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
