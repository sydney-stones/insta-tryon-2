/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreHeader from './components/StoreHeader';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import AdminPage from './components/AdminPage';
import WaitlistPage from './components/WaitlistPage';
import BrandWaitlistPage from './components/BrandWaitlistPage';
import { defaultWardrobe, getWardrobeFolders } from './wardrobe';
import { WardrobeItem } from './types';

const App: React.FC = () => {
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WardrobeItem | null>(null);
  const [wardrobe, setWardrobe] = useState<WardrobeItem[]>(defaultWardrobe);

  // Load wardrobe from localStorage if available
  useEffect(() => {
    const savedOutfits = localStorage.getItem('wardrobeOutfits');
    if (savedOutfits) {
      try {
        const parsed = JSON.parse(savedOutfits);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWardrobe(parsed);
        }
      } catch (e) {
        console.error('Failed to load wardrobe:', e);
      }
    }
  }, []);

  const handleTryOnClick = (product: WardrobeItem) => {
    setSelectedProduct(product);
    setIsTryOnModalOpen(true);
  };

  const handleCloseTryOnModal = () => {
    setIsTryOnModalOpen(false);
    // Don't clear selectedProduct immediately to allow for exit animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const wardrobeFolders = getWardrobeFolders(wardrobe);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Routes>
          {/* Admin Route - Hidden from navigation */}
          <Route path="/admin" element={<AdminPage products={wardrobe} />} />

          {/* Public Routes */}
          <Route
            path="/*"
            element={
              <>
                <StoreHeader />
                <Routes>
                  <Route
                    path="/"
                    element={
                      <ProductGrid
                        products={wardrobe}
                        folders={wardrobeFolders}
                      />
                    }
                  />
                  <Route
                    path="/product/:id"
                    element={
                      <ProductDetailPage
                        products={wardrobe}
                        onTryOnClick={handleTryOnClick}
                      />
                    }
                  />
                  <Route
                    path="/waitlist"
                    element={<WaitlistPage />}
                  />
                  <Route
                    path="/brand-waitlist"
                    element={<BrandWaitlistPage />}
                  />
                </Routes>

                <VirtualTryOnModal
                  isOpen={isTryOnModalOpen}
                  onClose={handleCloseTryOnModal}
                  product={selectedProduct}
                />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
