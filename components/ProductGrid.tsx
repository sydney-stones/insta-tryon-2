/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem, WardrobeFolder } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: WardrobeItem[];
  folders: WardrobeFolder[];
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, folders, searchQuery = '' }) => {
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [roiOrders, setRoiOrders] = useState<string>('500');

  const collectionNames = useMemo(() => {
    return ['All', ...folders.map(f => f.name)];
  }, [folders]);

  const sortedProducts = useMemo(() => {
    return [...products].reverse();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = sortedProducts;
    if (selectedCollection !== 'All') {
      filtered = filtered.filter(p => p.folder === selectedCollection);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(p => {
        if (p.name.toLowerCase().includes(query)) return true;
        if (p.outfitItems && p.outfitItems.length > 0) {
          return p.outfitItems.some((item: { name: string }) =>
            item.name.toLowerCase().includes(query)
          );
        }
        return false;
      });
    }
    return filtered;
  }, [sortedProducts, selectedCollection, searchQuery]);

  // ROI Calculator logic based on the pricing table
  const roiData = useMemo(() => {
    const orders = parseInt(roiOrders) || 0;
    const monthlyOrders = orders;

    if (monthlyOrders <= 750) {
      // Starter tier
      const returnsPrevented = Math.round(monthlyOrders * 0.075);
      const returnSavings = returnsPrevented * 20;
      const conversionLift = Math.round(monthlyOrders * 0.05 * 75);
      const totalMonthly = returnSavings + conversionLift;
      const cost = 99;
      const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;
      return { tier: 'Starter', returnsPrevented: `${Math.max(21, returnsPrevented)}`, savingsReturns: `£${Math.max(420, returnSavings).toLocaleString()}`, conversionLift: `£${Math.max(1875, conversionLift).toLocaleString()}`, totalMonthly: `£${Math.max(2295, totalMonthly).toLocaleString()}`, roiMultiple: `${Math.max(9, roiMultiple)}x`, cost: '£99/mo' };
    } else if (monthlyOrders <= 2500) {
      // Growth tier
      const returnsPrevented = Math.round(monthlyOrders * 0.06);
      const returnSavings = returnsPrevented * 20;
      const conversionLift = Math.round(monthlyOrders * 0.05 * 75);
      const totalMonthly = returnSavings + conversionLift;
      const cost = 249;
      const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;
      return { tier: 'Growth', returnsPrevented: `${Math.max(56, returnsPrevented)}`, savingsReturns: `£${Math.max(1120, returnSavings).toLocaleString()}`, conversionLift: `£${Math.max(5625, conversionLift).toLocaleString()}`, totalMonthly: `£${Math.max(6745, totalMonthly).toLocaleString()}`, roiMultiple: `${Math.max(15, roiMultiple)}x`, cost: '£249/mo' };
    } else if (monthlyOrders <= 7500) {
      // Scale tier
      const returnsPrevented = Math.round(monthlyOrders * 0.05);
      const returnSavings = returnsPrevented * 20;
      const conversionLift = Math.round(monthlyOrders * 0.05 * 100);
      const totalMonthly = returnSavings + conversionLift;
      const cost = 499;
      const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;
      return { tier: 'Scale', returnsPrevented: `${Math.max(154, returnsPrevented)}`, savingsReturns: `£${Math.max(3080, returnSavings).toLocaleString()}`, conversionLift: `£${Math.max(15000, conversionLift).toLocaleString()}`, totalMonthly: `£${Math.max(18080, totalMonthly).toLocaleString()}`, roiMultiple: `${Math.max(24, roiMultiple)}x`, cost: '£499/mo' };
    } else {
      // Professional tier
      const returnsPrevented = Math.round(monthlyOrders * 0.05);
      const returnSavings = returnsPrevented * 20;
      const conversionLift = Math.round(monthlyOrders * 0.05 * 100);
      const totalMonthly = returnSavings + conversionLift;
      const cost = 999;
      const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;
      return { tier: 'Professional', returnsPrevented: `${Math.max(385, returnsPrevented)}`, savingsReturns: `£${Math.max(7700, returnSavings).toLocaleString()}`, conversionLift: `£${Math.max(37500, conversionLift).toLocaleString()}`, totalMonthly: `£${Math.max(45200, totalMonthly).toLocaleString()}`, roiMultiple: `${Math.max(36, roiMultiple)}x`, cost: '£999/mo' };
    }
  }, [roiOrders]);

  return (
    <div className="min-h-screen bg-white">

      {/* ===== SECTION 1: HERO ===== */}
      <div className="relative bg-[#444833] min-h-screen flex items-end overflow-hidden">
        {/* Hero Image - Right Side */}
        <div className="absolute right-0 bottom-0 h-full w-full sm:w-[60%] lg:w-[55%] pointer-events-none">
          <img
            src="/hero-models.png"
            alt="Virtual Try-On Models"
            className="h-full w-full object-contain object-right-bottom"
          />
        </div>

        {/* Hero Content - Left Side */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-20 lg:pb-24 pt-24 sm:pt-28">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif italic font-light text-white leading-[0.95] mb-8 sm:mb-10">
              AI- Powered<br />
              Virtual Try-on
            </h1>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-8 sm:mb-10 max-w-md">
              solution for Shopify fashion e-commerce, redefining the way people shop online. We bring the in-store try-on experience to every screen 24/7.
            </p>
            <Link
              to="/demo"
              className="inline-block border border-white text-white px-8 sm:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-medium hover:bg-white hover:text-[#444833] transition-all"
            >
              Try Our Demo
            </Link>
          </div>
        </div>
      </div>

      {/* ===== SECTION 2: STAT INTRO ===== */}
      <div className="bg-gray-100 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-700 text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto">
            Allowing customers to visualise clothes on themselves before buying has been shown to:
          </p>
          <div className="grid grid-cols-3 gap-4 sm:gap-8">
            {/* Reduce Returns */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#444833] rounded-lg w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 relative">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 17l-4 4m0 0l-4-4m4 4V3" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v4a1 1 0 001 1h3M21 7v4a1 1 0 01-1 1h-3" /></svg>
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm">~20%</span>
              </div>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Reduce Returns Rates<br />by ~20%</p>
            </div>
            {/* Boost Conversions */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#444833] rounded-lg w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 relative">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm">~30%</span>
              </div>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Boosts Conversions<br />by ~30%</p>
            </div>
            {/* Increase AOV */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#444833] rounded-lg w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 relative">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm">~20%</span>
              </div>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Increase AOV<br />by ~20%</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 3: PHONE MOCKUPS ===== */}
      <div className="bg-[#444833] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {/* Phone 1 - Browse */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="bg-gray-100 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <img src="/outfits/gymking.png" alt="Browse products" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="mt-2 sm:mt-3">
                  <p className="text-[10px] sm:text-xs text-gray-500">Step 1</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Browse Products</p>
                </div>
              </div>
            </div>
            {/* Phone 2 - Try It On */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="bg-[#444833] rounded-lg aspect-[3/4] flex flex-col items-center justify-center px-3">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <p className="text-white text-xs sm:text-sm font-bold text-center">TRY IT ON, VIRTUALLY</p>
                  <p className="text-white/60 text-[8px] sm:text-[10px] text-center mt-1">Take a selfie</p>
                </div>
                <div className="mt-2 sm:mt-3">
                  <p className="text-[10px] sm:text-xs text-gray-500">Step 2</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Try It On Virtually</p>
                </div>
              </div>
            </div>
            {/* Phone 3 - See Results */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="bg-gray-100 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <div className="text-center px-2">
                    <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#444833] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                    <p className="text-[#444833] text-xs sm:text-sm font-bold">Your Result</p>
                    <p className="text-gray-400 text-[8px] sm:text-[10px] mt-1">AI-generated try-on</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-3">
                  <p className="text-[10px] sm:text-xs text-gray-500">Step 3</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">See Your Results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 4: BENEFITS OF VIRTUAL TRY-ON ===== */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-12 sm:mb-16">
            Benefits of Virtual Try-on
          </h2>
          {/* Top row - 3 benefits */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-8 sm:mb-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Boost Sales</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Sustainability</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" /></svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Reduce Returns</p>
            </div>
          </div>
          {/* Bottom row - 2 benefits centered */}
          <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xs sm:max-w-md mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Increase<br />AOV</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#444833] rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              </div>
              <p className="text-xs sm:text-sm font-medium text-gray-800">Customer<br />Acquisition</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 5: ROI CALCULATOR ===== */}
      <div className="bg-gray-100 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-4">
            ROI Calculator
          </h2>
          <p className="text-center text-gray-500 text-sm mb-10 sm:mb-14 max-w-xl mx-auto">
            See the estimated return on investment for your business based on your monthly order volume.
          </p>

          {/* Order Input */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-14">
            <label className="text-sm sm:text-base font-medium text-gray-700">Monthly Orders:</label>
            <input
              type="number"
              value={roiOrders}
              onChange={(e) => setRoiOrders(e.target.value)}
              className="w-36 px-4 py-2.5 text-center text-lg font-semibold border-2 border-[#444833] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#444833]/50"
              min="0"
              step="100"
            />
          </div>

          {/* ROI Results Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            {/* Tier Header */}
            <div className="bg-[#444833] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider">Your Tier</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{roiData.tier}</p>
              </div>
              <p className="text-white text-sm font-medium">{roiData.cost}</p>
            </div>
            {/* Stats Grid */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Returns Prevented*</span>
                <span className="text-gray-900 font-semibold">{roiData.returnsPrevented}/mo</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Savings @ £20/return</span>
                <span className="text-gray-900 font-semibold">{roiData.savingsReturns}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Conversion Lift Value**</span>
                <span className="text-gray-900 font-semibold">{roiData.conversionLift}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm font-medium">Total Monthly Value</span>
                <span className="text-gray-900 font-bold text-lg">{roiData.totalMonthly}</span>
              </div>
              <div className="flex justify-between items-center py-3 bg-[#444833]/5 rounded-lg px-4 -mx-2">
                <span className="text-[#444833] text-sm font-bold">ROI Multiple</span>
                <span className="text-[#444833] font-black text-2xl">{roiData.roiMultiple}</span>
              </div>
            </div>
          </div>

          {/* Full Tier Comparison Table */}
          <div className="mt-10 sm:mt-14 overflow-x-auto">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#1a2332] text-white">
                  <th className="text-left py-3 px-3 sm:px-4 font-semibold">ROI Metric</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold">Starter</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold">Growth</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold">Scale</th>
                  <th className="text-center py-3 px-2 sm:px-4 font-semibold">Professional</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="border-b border-gray-200">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-gray-700">Returns Prevented*</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">21-56/mo</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">56-154/mo</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">154-385/mo</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">385-1,120/mo</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-gray-700">Savings @ £20/return</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£420-£1,120</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£1,120-£3,080</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£3,080-£7,700</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£7,700-£22,400</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-gray-700">Conversion Lift Value**</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£1,875-£5,625</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£5,625-£15,000</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£15,000-£37,500</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£37,500-£112,500</td>
                </tr>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <td className="py-2.5 px-3 sm:px-4 font-medium text-gray-700">Total Monthly Value</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£2,295-£6,745</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£6,745-£18,080</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£18,080-£45,200</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-gray-600">£45,200-£134,900</td>
                </tr>
                <tr className="bg-[#444833]/10 font-bold">
                  <td className="py-2.5 px-3 sm:px-4 text-[#444833]">ROI Multiple</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-[#444833]">9x-27x</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-[#444833]">15x-40x</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-[#444833]">24x-60x</td>
                  <td className="py-2.5 px-2 sm:px-4 text-center text-[#444833]">36x-108x</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ===== SECTION 6: BRANDED FOOTER / CTA ===== */}
      <div className="bg-[#444833] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-16">
            {/* Left - Large brand name */}
            <div className="text-center lg:text-left">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                RENDERED<br />FITS
              </h2>
            </div>
            {/* Right - Hanger icon + CTA */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              {/* Hanger SVG */}
              <svg className="w-24 h-24 sm:w-32 sm:h-32 text-white/80" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M50 15 C50 10, 55 5, 60 5 C65 5, 70 10, 65 15" strokeLinecap="round" />
                <path d="M50 15 L15 50 L85 50 L50 15 Z" strokeLinejoin="round" />
                <line x1="15" y1="50" x2="85" y2="50" />
              </svg>
              <div className="text-center lg:text-right">
                <p className="text-white/70 text-xs sm:text-sm mb-1">Contact Us: <a href="mailto:mail@renderedfits.com" className="text-white hover:underline">mail@renderedfits.com</a></p>
                <Link
                  to="/demo"
                  className="inline-block border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-[#444833] transition-all mt-3"
                >
                  Try Our Demo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 7: LEGAL FOOTER ===== */}
      <div className="bg-[#3a3d2d] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
            Rendered Fits Ltd registered in England and Wales under the company registration number 16922551. Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ
          </p>
        </div>
      </div>

      {/* ===== SECTION 8: COLLECTION FILTER + PRODUCT GRID ===== */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto py-4 no-scrollbar">
            {collectionNames.map((collection) => (
              <button
                key={collection}
                onClick={() => setSelectedCollection(collection)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCollection === collection
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {collection}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-12">
        <div className="mb-4 sm:mb-6">
          <p className="text-sm text-gray-600">
            @renderedfits wardrobe - {filteredProducts.length} {filteredProducts.length === 1 ? 'outfit' : 'outfits'}
          </p>
        </div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No outfits available.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;
