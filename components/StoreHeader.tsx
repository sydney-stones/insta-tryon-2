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
        <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
          {/* Left Side - Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-5 flex-shrink-0">
            <Link
              to="/demo-male"
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

          {/* Center - Logo */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2">
            <span className={`text-base sm:text-lg md:text-xl font-black tracking-wider whitespace-nowrap ${isHomePage ? 'text-white' : 'text-gray-900'}`}>
              RENDERED FITS<sup className="text-[8px] sm:text-[9px] md:text-[10px] align-super ml-0.5">™</sup>
            </span>
          </Link>

          {/* Right Side - Search Icon */}
          <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
            {isStorePage && setSearchQuery && (
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className={`w-0 focus:w-32 sm:focus:w-48 px-0 focus:px-3 py-1.5 text-sm rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 ${isHomePage ? 'bg-white/10 border border-white/20 text-white placeholder-white/50 focus:ring-white/30' : 'border border-gray-300 focus:ring-gray-900'} ${searchQuery ? (isHomePage ? 'w-32 sm:w-48 px-3 bg-white/10 border border-white/20' : 'w-32 sm:w-48 px-3 border border-gray-300') : ''}`}
                />
                <svg
                  className={`w-5 h-5 cursor-pointer ${searchQuery ? 'absolute right-2 top-1/2 -translate-y-1/2' : ''} ${isHomePage ? 'text-white/80 hover:text-white' : 'text-gray-500 hover:text-gray-900'} transition-colors`}
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
