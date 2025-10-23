/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Testimonials from './Testimonials';

// Tier definitions with new pricing structure
const TIERS = [
  {
    name: 'Starter',
    subtitle: 'Small Boutique',
    minRevenue: 10000,
    maxRevenue: 40000,
    monthlyFee: 900,
    includedTryOns: 3000,
    color: 'emerald',
    icon: '🌱'
  },
  {
    name: 'Growth',
    subtitle: 'Mid-Sized Shopify Brand',
    minRevenue: 50000,
    maxRevenue: 250000,
    monthlyFee: 2000,
    includedTryOns: 10000,
    color: 'blue',
    icon: '📈'
  },
  {
    name: 'Premium',
    subtitle: 'High-Traffic / Multi-SKU Brand',
    minRevenue: 300000,
    maxRevenue: 1000000,
    monthlyFee: 4200,
    includedTryOns: 25000,
    color: 'purple',
    icon: '⭐'
  },
  {
    name: 'Enterprise',
    subtitle: 'Luxury / Global Shopify+ Brand',
    minRevenue: 1000000,
    maxRevenue: 50000000,
    monthlyFee: 7500,
    includedTryOns: 50000,
    color: 'amber',
    icon: '👑'
  }
];

// Core metrics
const SALES_UPLIFT = 0.22; // 22%
const RETURN_REDUCTION = 0.18; // 18%
const OVERAGE_FEE = 0.08; // £0.08 per try-on

interface ROICalculatorProps {
  defaultRevenue?: number;
}

const ROICalculator: React.FC<ROICalculatorProps> = ({ defaultRevenue = 100000 }) => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(defaultRevenue);

  // Determine recommended tier
  const recommendedTier = useMemo(() => {
    return TIERS.find(tier =>
      monthlyRevenue >= tier.minRevenue && monthlyRevenue <= tier.maxRevenue
    ) || TIERS[TIERS.length - 1];
  }, [monthlyRevenue]);

  // Calculate ROI metrics
  const calculations = useMemo(() => {
    const salesUplift = monthlyRevenue * SALES_UPLIFT;
    const returnSavings = monthlyRevenue * RETURN_REDUCTION;
    const totalGain = salesUplift + returnSavings;
    const netGain = totalGain - recommendedTier.monthlyFee;
    const roi = (netGain / recommendedTier.monthlyFee) * 100;

    return {
      salesUplift,
      returnSavings,
      totalGain,
      netGain,
      roi,
      monthlyCost: recommendedTier.monthlyFee
    };
  }, [monthlyRevenue, recommendedTier]);

  const getColorClasses = (color: string, isRecommended: boolean) => {
    const colors = {
      emerald: {
        border: isRecommended ? 'border-emerald-500 shadow-emerald-200' : 'border-gray-200',
        bg: isRecommended ? 'bg-gradient-to-br from-emerald-50 to-emerald-100' : 'bg-white',
        badge: 'bg-emerald-100 text-emerald-700',
        accent: 'text-emerald-600'
      },
      blue: {
        border: isRecommended ? 'border-blue-500 shadow-blue-200' : 'border-gray-200',
        bg: isRecommended ? 'bg-gradient-to-br from-blue-50 to-blue-100' : 'bg-white',
        badge: 'bg-blue-100 text-blue-700',
        accent: 'text-blue-600'
      },
      purple: {
        border: isRecommended ? 'border-purple-500 shadow-purple-200' : 'border-gray-200',
        bg: isRecommended ? 'bg-gradient-to-br from-purple-50 to-purple-100' : 'bg-white',
        badge: 'bg-purple-100 text-purple-700',
        accent: 'text-purple-600'
      },
      amber: {
        border: isRecommended ? 'border-amber-500 shadow-amber-200' : 'border-gray-200',
        bg: isRecommended ? 'bg-gradient-to-br from-amber-50 to-amber-100' : 'bg-white',
        badge: 'bg-amber-100 text-amber-700',
        accent: 'text-amber-600'
      }
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="mt-16 border-t pt-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-4">
            Calculate Your ROI
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See how virtual try-on technology could transform your online revenue with our transparent tier-based pricing
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
            max="5000000"
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

        {/* All Tiers Display */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Choose Your Tier</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((tier) => {
              const isRecommended = tier.name === recommendedTier.name;
              const colors = getColorClasses(tier.color, isRecommended);

              return (
                <motion.div
                  key={tier.name}
                  whileHover={{ scale: 1.02 }}
                  className={`relative rounded-xl border-2 ${colors.border} ${colors.bg} p-6 transition-all ${
                    isRecommended ? 'shadow-xl' : 'shadow-sm'
                  }`}
                >
                  {isRecommended && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg">
                        RECOMMENDED
                      </span>
                    </div>
                  )}

                  <div className="text-center mb-4">
                    <div className="text-3xl mb-2">{tier.icon}</div>
                    <h4 className="text-xl font-bold text-gray-900 mb-1">{tier.name}</h4>
                    <p className="text-xs text-gray-600">{tier.subtitle}</p>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-gray-900">£{tier.monthlyFee.toLocaleString()}</div>
                      <div className="text-xs text-gray-600">per month</div>
                    </div>

                    <div className={`${colors.badge} rounded-lg p-3 text-center`}>
                      <div className="font-semibold text-sm">{tier.includedTryOns.toLocaleString()} Try-Ons</div>
                      <div className="text-xs">included monthly</div>
                    </div>

                    <div className="text-center text-xs text-gray-600">
                      <div>Revenue range:</div>
                      <div className="font-semibold">
                        £{(tier.minRevenue / 1000).toFixed(0)}k - £{tier.maxRevenue >= 1000000 ? (tier.maxRevenue / 1000000).toFixed(0) + 'M' : (tier.maxRevenue / 1000).toFixed(0) + 'k'}
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>+22% sales uplift</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>-18% returns</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Brand dashboard</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-700">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      <span>£0.08 per extra try-on</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ROI Calculation Results */}
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 sm:p-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Your Projected Returns with {recommendedTier.name} Tier
          </h3>

          {/* Metrics Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Sales Uplift (+22%)</div>
              </div>
              <div className="text-3xl font-bold text-green-600">
                £{(calculations.salesUplift / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-500 mt-1">per month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Return Savings (18%)</div>
              </div>
              <div className="text-3xl font-bold text-blue-600">
                £{(calculations.returnSavings / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-500 mt-1">saved per month</div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                <div className="text-sm font-medium text-gray-600">Total Added Value</div>
              </div>
              <div className="text-3xl font-bold text-indigo-600">
                £{(calculations.totalGain / 1000).toFixed(1)}k
              </div>
              <div className="text-xs text-gray-500 mt-1">per month</div>
            </div>
          </div>

          {/* Net Gain and ROI */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-8 text-center">
              <div className="text-sm font-medium mb-2 opacity-90">Net Monthly Gain</div>
              <div className="text-sm opacity-75 mb-2">Total Value - Monthly Cost</div>
              <div className="text-5xl font-bold mb-2">
                £{(calculations.netGain / 1000).toFixed(1)}k
              </div>
              <div className="text-sm opacity-90">
                (£{(calculations.totalGain / 1000).toFixed(1)}k - £{(calculations.monthlyCost / 1000).toFixed(1)}k)
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl p-8 text-center">
              <div className="text-sm font-medium mb-2 opacity-90">Return on Investment</div>
              <div className="text-5xl font-bold mb-2">{calculations.roi.toFixed(0)}%</div>
              <div className="text-sm opacity-90">
                For every £1 spent, gain £{(calculations.roi / 100 + 1).toFixed(1)}
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
              Start with a 14-day free trial • No credit card required
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
