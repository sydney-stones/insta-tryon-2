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
          </nav>
        </div>
      </div>
    </header>
  );
};

export default StoreHeader;
