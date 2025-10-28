/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Testimonials from './Testimonials';

// Core metrics
const SALES_UPLIFT = 0.15; // 15%
const RETURN_REDUCTION = 0.10; // 10%

interface ROICalculatorProps {
  defaultRevenue?: number;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ defaultRevenue = 100000 }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(defaultRevenue);

  // Calculate benefits
  const calculations = useMemo(() => {
    const salesUplift = monthlyRevenue * SALES_UPLIFT;
    const returnSavings = monthlyRevenue * RETURN_REDUCTION;
    const totalGain = salesUplift + returnSavings;

    return {
      salesUplift,
      returnSavings,
      totalGain
    };
  }, [monthlyRevenue]);

  return (
    <div className="mt-16 border-t pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Calculate Your Benefits
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how virtual try-on technology could transform your online revenue
          </p>
        </div>

        {/* Revenue Slider */}
        <div className="mb-12 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8">
          <label className="block text-sm font-semibold text-gray-900 mb-4">
            Your Monthly Online Revenue
          </label>
          <input
            type="range"
            min="10000"
            max="2000000"
            step="10000"
            value={monthlyRevenue}
            onChange={(e) => setMonthlyRevenue(Number(e.target.value))}
            className="w-full h-3 bg-indigo-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">£10k</span>
            <div className="text-4xl font-bold text-indigo-600">
              £{monthlyRevenue >= 1000000 ? (monthlyRevenue / 1000000).toFixed(1) + 'M' : (monthlyRevenue / 1000).toFixed(0) + 'k'}
            </div>
            <span className="text-sm text-gray-600">£5M+</span>
          </div>
        </div>

        {/* Benefits Display */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Projected Monthly Benefits
          </h3>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Sales Uplift (+15%)</div>
              </div>
              <div className="text-3xl font-bold text-green-600">
                £{calculations.salesUplift >= 1000 ? (calculations.salesUplift / 1000).toFixed(1) + 'k' : calculations.salesUplift.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">extra revenue per month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Return Savings (-10%)</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                £{calculations.returnSavings >= 1000 ? (calculations.returnSavings / 1000).toFixed(1) + 'k' : calculations.returnSavings.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">saved per month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Total Added Value</div>
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                £{calculations.totalGain >= 1000 ? (calculations.totalGain / 1000).toFixed(1) + 'k' : calculations.totalGain.toFixed(0)}
              </div>
              <div className="text-xs text-gray-500 mt-1">per month</div>
            </div>
          </div>

          {/* Key Benefits */}
          <div className="bg-white rounded-xl p-6 mb-8">
            <h4 className="font-semibold text-gray-900 mb-4">How Virtual Try-On Helps Your Brand:</h4>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Increased Conversions</div>
                  <div className="text-sm text-gray-600">Customers buy with confidence</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Fewer Returns</div>
                  <div className="text-sm text-gray-600">Better fit = fewer returns</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Enhanced Brand Experience</div>
                  <div className="text-sm text-gray-600">Stand out from competitors</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <div className="font-medium text-gray-900">Mobile-First Technology</div>
                  <div className="text-sm text-gray-600">Works seamlessly on any device</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <motion.a
              href="https://tally.so/r/mOOqZ7"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-10 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg"
            >
              Join Brand Waitlist
            </motion.a>
            <p className="text-sm text-gray-600 mt-4">
              Get early access to virtual try-on technology
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <Testimonials />

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
        }
        .slider::-moz-range-thumb {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: #4f46e5;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(79, 70, 229, 0.4);
          border: none;
        }
      `}</style>
    </div>
  );
};

export default ROICalculator;
