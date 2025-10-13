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
        <div className="flex items-center justify-between h-16 relative">
          {/* Left Side - Instagram */}
          <div className="flex items-center gap-4">
             <h7 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              @siennastones Wardrobe
            </h7>
            <a
              href="https://www.instagram.com/siennastones/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              aria-label="Follow on Instagram"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>

          {/* Center - Title */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
              RENDERED FITS
            </h1>
          </Link>

          {/* Right Side - Navigation */}
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/waitlist"
              className="relative px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 rounded-lg hover:from-yellow-500 hover:via-pink-600 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
            >
              For Creators
            </Link>

            <Link
              to="/brand-waitlist"
              className="relative px-3 py-1.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm hover:shadow-md"
            >
              For Brands
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
