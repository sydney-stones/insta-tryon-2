/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import StoreHeader from './components/StoreHeader';
import ProductGrid from './components/ProductGrid';
import ProductDetailPage from './components/ProductDetailPage';
import VirtualTryOnModal from './components/VirtualTryOnModal';
import { defaultWardrobe, getWardrobeFolders } from './wardrobe';
import { WardrobeItem } from './types';

const App: React.FC = () => {
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<WardrobeItem | null>(null);

  const handleTryOnClick = (product: WardrobeItem) => {
    setSelectedProduct(product);
    setIsTryOnModalOpen(true);
  };

  const handleCloseTryOnModal = () => {
    setIsTryOnModalOpen(false);
    // Don't clear selectedProduct immediately to allow for exit animation
    setTimeout(() => setSelectedProduct(null), 300);
  };

  const wardrobeFolders = getWardrobeFolders(defaultWardrobe);

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <StoreHeader />

        <Routes>
          <Route
            path="/"
            element={
              <ProductGrid
                products={defaultWardrobe}
                folders={wardrobeFolders}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetailPage
                products={defaultWardrobe}
                onTryOnClick={handleTryOnClick}
              />
            }
          />
        </Routes>

        <VirtualTryOnModal
          isOpen={isTryOnModalOpen}
          onClose={handleCloseTryOnModal}
          product={selectedProduct}
        />
      </div>
    </Router>
  );
};

export default App;
