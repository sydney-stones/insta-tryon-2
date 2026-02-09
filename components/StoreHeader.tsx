/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface StoreHeaderProps {
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

const StoreHeader: React.FC<StoreHeaderProps> = ({ searchQuery = '', setSearchQuery }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const isStorePage = isHomePage || location.pathname.startsWith('/product');

  return (
    <header className={`${isHomePage ? 'absolute top-0 left-0 right-0 z-50' : 'bg-white border-b border-gray-200 sticky top-0 z-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Left Side - Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <Link
              to="/demo"
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Male Demo
            </Link>
            <Link
              to="/demo"
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Female Demo
            </Link>
            <a
              href="https://tally.so/r/mOOqZ7"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Book a Demo
            </a>
          </div>

          {/* Center - Logo (always centered) */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <img
              src="/Renderedfits-TM-2.png"
              alt="Rendered Fits"
              className={`h-8 sm:h-10 md:h-12 w-auto ${isHomePage ? 'brightness-0 invert' : ''}`}
            />
          </Link>

          {/* Right Side - Search */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {isStorePage && setSearchQuery && (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={`w-24 sm:w-32 md:w-48 px-3 py-1.5 text-sm rounded-lg focus:outline-none focus:ring-2 ${isHomePage ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-white/30' : 'border border-gray-300 focus:ring-gray-900'}`}
                />
                <svg
                  className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none ${isHomePage ? 'text-white/60' : 'text-gray-400'}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
