/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "Virtual Try-On technology can boost sales by up to 30% and reduce returns by 20%.",
    source: "Forbes"
  },
  {
    quote: "Allowing customers to try on clothes virtually can increase sales and reduce returns.",
    source: "Shopify"
  },
  {
    quote: "55% of online apparel shoppers have returned an item because it looked different than expected.",
    source: "Google"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000); // Change quote every 7 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-pink-50 py-6 sm:py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="relative h-[120px] sm:h-[100px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-4"
            >
              <blockquote className="text-gray-700 text-sm sm:text-base leading-relaxed mb-2">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              <cite className="not-italic text-xs sm:text-sm font-semibold text-indigo-600">
                ~ {testimonials[currentIndex].source}
              </cite>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-indigo-600 w-6'
                  : 'bg-indigo-300 hover:bg-indigo-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
