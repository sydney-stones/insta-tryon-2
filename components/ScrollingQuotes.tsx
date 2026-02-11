/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const quotes = [
  '"Retailers report up to 30% increase in conversions with virtual try-on" — Onix Systems Research Summary',
  '"Virtual try-on reduces return rates by 20-30%" — Research compiled by Onix Systems',
  '"AR try-ons lead to 200% rise in user interaction" — Multiple industry studies',
  '"Up to 40% increase in conversion rates for retailers adopting AR technology" — McKinsey & Company',
  '"320% growth in conversion rate reported by global beauty brand using AR try-on" — Inc. Magazine',
  '"64% reduction in return rates with virtual fitting rooms" — Banuba Research',
  '"Fashion returns cost retailers $743 billion globally" — Industry analysis',
  '"Time spent on product pages increases by 180% with virtual try-on" — E-commerce research data',
  '"Virtual try-on market projected to reach $46.42 billion by 2030" — Grand View Research',
  '"45% boost in buyer confidence with virtual fitting technology" — E-commerce studies',
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
