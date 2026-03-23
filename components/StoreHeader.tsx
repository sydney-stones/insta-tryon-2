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
          {/* Logo - centred */}
          <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 z-10">
            <img
              src="/result-images/RENDEREDFITS.png"
              alt="Rendered Fits"
              className={`h-8 sm:h-10 w-auto object-contain ${isHomePage ? '' : 'brightness-0'}`}
            />
          </Link>

          {/* Navigation Links - Right side */}
          <nav className="flex items-center gap-4 sm:gap-8 ml-auto">
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
