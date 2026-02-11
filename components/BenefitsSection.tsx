/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Benefit {
  title: string;
  icon: JSX.Element;
  details: string[];
}

const benefits: Benefit[] = [
  {
    title: 'Boost Sales',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    details: [
      'Conversion rates increase by 20-40% with virtual try-on technology',
      'Shoppers who engage with AR features are 27% more likely to purchase (Shopify)',
      'One beauty brand saw 320% conversion growth after implementing VTO',
      '40% higher click-through rates when AR tools are available',
      'Creates buyer confidence, reducing purchase hesitation by 60%',
    ],
  },
  {
    title: 'Sustainability',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    details: [
      'Fashion returns generate 16 million metric tons of CO2 emissions annually',
      'In 2022, UK alone discarded 23 million returned items, creating 750,000 tonnes of CO2',
      '22-44% of returned products never reach another consumer',
      'Virtual try-on reduces the need for physical samples and bracketing (buying multiple sizes)',
      'Cutting returns by just 10% globally could save 2.4 million metric tonnes of CO2 annually',
      'Reverse logistics accounts for 25% of total e-commerce carbon footprint',
    ],
  },
  {
    title: 'Reduce Returns',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
      </svg>
    ),
    details: [
      'Fashion e-commerce return rates average 30-40% without VTO',
      'Virtual try-on can reduce returns by 20-64% depending on implementation',
      'Returns cost retailers an average of $24 per item in processing and restocking',
      '53% of returns stem from fit issues - directly addressable with VTO',
      'One retailer reduced returns from 35% to 12% after implementing AR try-on',
      'Sizing is the #1 cause of apparel returns globally',
    ],
  },
  {
    title: 'Increase AOV',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    details: [
      'Virtual try-on increases average order value by 25-33%',
      'Customers with VTO confidence explore complementary products, increasing basket size',
      'Session duration improves by 65% with virtual try-on features',
      'Pages per session increase by 45% when AR is available',
      'Users spend 25% more time exploring products with VTO',
      'Interactive product experiences drive cross-selling and upselling opportunities',
    ],
  },
  {
    title: 'Customer Acquisition',
    icon: (
      <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    details: [
      'AR experiences boost engagement by 200% compared to static product views',
      '79% of shoppers show interest in interacting with AR before buying',
      '58% of online shoppers more likely to buy if they can share VTO looks with others',
      'Net Promoter Scores increase by 15-25 points after VTO implementation',
      'Only 1% of retailers currently use AR, providing significant competitive advantage',
      'Virtual try-on creates shareable, viral moments that reduce customer acquisition costs',
      'Sephora recorded 35% higher engagement and 200% more trials with AR implementation',
    ],
  },
];

const BenefitsSection: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0); // Start with Boost Sales (index 0)
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation logic
  useEffect(() => {
    const startRotation = () => {
      rotationTimerRef.current = setInterval(() => {
        if (!isUserInteracting) {
          setExpandedIndex((prev) => {
            if (prev === null) return 0;
            return (prev + 1) % benefits.length;
          });
        }
      }, 7000); // Rotate every 7 seconds
    };

    startRotation();

    return () => {
      if (rotationTimerRef.current) clearInterval(rotationTimerRef.current);
      if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    };
  }, [isUserInteracting]);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);

    // Pause auto-rotation for 10 seconds after user clicks
    setIsUserInteracting(true);

    if (pauseTimerRef.current) clearTimeout(pauseTimerRef.current);
    pauseTimerRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 10000); // Resume rotation after 10 seconds
  };

  return (
    <div className="bg-white py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-12 sm:mb-16">
          Benefits of Virtual Try-on
        </h2>

        {/* Top row - 3 benefits */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {benefits.slice(0, 3).map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <button
                onClick={() => toggleExpand(index)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all cursor-pointer ${
                  expandedIndex === index
                    ? 'bg-[#6b7544] ring-2 ring-[#6b7544] ring-offset-2'
                    : 'bg-[#444833] hover:bg-[#3a3d2d]'
                }`}
              >
                {benefit.icon}
              </button>
              <p className="text-xs sm:text-sm font-medium text-gray-800">{benefit.title}</p>
            </div>
          ))}
        </div>

        {/* Bottom row - 2 benefits centered */}
        <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xs sm:max-w-md mx-auto mb-8">
          {benefits.slice(3, 5).map((benefit, index) => (
            <div key={index + 3} className="flex flex-col items-center text-center">
              <button
                onClick={() => toggleExpand(index + 3)}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-all cursor-pointer ${
                  expandedIndex === index + 3
                    ? 'bg-[#6b7544] ring-2 ring-[#6b7544] ring-offset-2'
                    : 'bg-[#444833] hover:bg-[#3a3d2d]'
                }`}
              >
                {benefit.icon}
              </button>
              <p className="text-xs sm:text-sm font-medium text-gray-800">
                {benefit.title.split(' ').map((word, i) => (
                  <React.Fragment key={i}>
                    {word}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>

        {/* Expanded Details */}
        <AnimatePresence mode="wait">
          {expandedIndex !== null && (
            <motion.div
              key={expandedIndex}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-gray-50 rounded-xl p-6 sm:p-8 max-w-3xl mx-auto mt-8 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {benefits[expandedIndex].title}
                  </h3>
                  <button
                    onClick={() => setExpandedIndex(null)}
                    className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <ul className="space-y-3">
                  {benefits[expandedIndex].details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700">
                      <svg className="w-5 h-5 text-[#444833] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BenefitsSection;
