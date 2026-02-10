/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  '"Virtual try-on increased our conversion rate by 35%" — Fashion Retailer',
  '"Returns dropped by 25% in the first month" — E-commerce Brand',
  '"Customers love seeing themselves in our products" — Boutique Owner',
  '"Game-changer for our online store" — Shopify Merchant',
];

const ScrollingQuotes: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 10000); // Change quote every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#3a3d2d] py-4 overflow-hidden">
      <div className="relative h-6 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-white/70 text-sm text-center px-4">
              {quotes[currentIndex]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ScrollingQuotes;
