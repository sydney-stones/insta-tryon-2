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

const StoreHeader: React.FC<StoreHeaderProps> = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${isHomePage ? 'absolute top-0 left-0 right-0 z-50' : 'bg-white border-b border-gray-200 sticky top-0 z-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo - Left on mobile, center on desktop */}
          <Link to="/" className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 z-10">
            <span className={`text-lg sm:text-xl md:text-2xl font-black tracking-wider whitespace-nowrap ${isHomePage ? 'text-white' : 'text-gray-900'}`}>
              RENDERED FITS<sup className="text-[9px] sm:text-[10px] md:text-[11px] align-super ml-0.5">™</sup>
            </span>
          </Link>

          {/* Navigation Links - Right side */}
          <nav className="flex items-center gap-4 sm:gap-6 ml-auto">
            <Link
              to="/demo-male"
              className={`text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Male Demo
            </Link>
            <Link
              to="/demo"
              className={`text-sm sm:text-base font-medium transition-colors whitespace-nowrap ${isHomePage ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}
            >
              Female Demo
            </Link>
            <Link
              to="/contact"
              className={`text-sm sm:text-base font-medium transition-colors whitespace-nowrap px-4 py-2 rounded-lg ${
                isHomePage
                  ? 'bg-white/10 text-white hover:bg-white/20 border border-white/30'
                  : 'bg-[#444833] text-white hover:bg-[#3a3d2d]'
              }`}
            >
              Book a Demo
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
