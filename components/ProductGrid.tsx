/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem, WardrobeFolder } from '../types';

interface ProductGridProps {
  products: WardrobeItem[];
  folders: WardrobeFolder[];
  searchQuery?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ }) => {
  const [roiOrders, setRoiOrders] = useState<number>(500);
  const [roiRevenue, setRoiRevenue] = useState<number>(25000);

  // ROI Calculator logic with correct pricing tiers
  // Works with either monthly orders or monthly revenue independently
  const roiData = useMemo(() => {
    const orders = roiOrders;
    const revenue = roiRevenue;

    // Tier from orders
    const getTierFromOrders = (o: number) => {
      if (o <= 500) return { tier: 'Starter', cost: 249, rank: 1 };
      if (o <= 1500) return { tier: 'Growth', cost: 449, rank: 2 };
      if (o <= 5000) return { tier: 'Scale', cost: 749, rank: 3 };
      if (o <= 15000) return { tier: 'Professional', cost: 1249, rank: 4 };
      return { tier: 'Enterprise', cost: 0, rank: 5 };
    };

    // Tier from revenue
    const getTierFromRevenue = (r: number) => {
      if (r <= 25000) return { tier: 'Starter', cost: 249, rank: 1 };
      if (r <= 75000) return { tier: 'Growth', cost: 449, rank: 2 };
      if (r <= 250000) return { tier: 'Scale', cost: 749, rank: 3 };
      if (r <= 750000) return { tier: 'Professional', cost: 1249, rank: 4 };
      return { tier: 'Enterprise', cost: 0, rank: 5 };
    };

    const orderTier = getTierFromOrders(orders);
    const revenueTier = getTierFromRevenue(revenue);

    // Use whichever gives the higher tier
    const selected = orderTier.rank >= revenueTier.rank ? orderTier : revenueTier;
    const { tier, cost } = selected;

    // Calculate ROI metrics
    const avgOrderValue = orders > 0 ? revenue / orders : 50;
    const returnRate = 0.07;
    const conversionLiftRate = 0.05;
    const returnsPrevented = Math.round(orders * returnRate);
    const returnSavings = returnsPrevented * 20;
    const conversionLift = Math.round(orders * conversionLiftRate * avgOrderValue);
    const totalMonthly = returnSavings + conversionLift;
    const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;

    return {
      tier,
      cost,
      costDisplay: cost > 0 ? `£${cost.toLocaleString()}/mo` : 'Custom',
      returnsPrevented,
      returnSavings,
      conversionLift,
      totalMonthly,
      roiMultiple,
    };
  }, [roiOrders, roiRevenue]);

  return (
    <div className="min-h-screen bg-white">

      {/* ===== SECTION 1: HERO ===== */}
      <div className="relative bg-[#444833] min-h-screen flex items-end overflow-hidden">
        {/* Hero Image - Right Side */}
        <div className="absolute right-0 bottom-0 h-full w-full sm:w-[65%] lg:w-[60%] pointer-events-none">
          <img
            src="/hero-models.png"
            alt="Virtual Try-On Models"
            className="h-full w-full object-contain object-right-bottom scale-110 origin-bottom-right"
          />
        </div>

        {/* Hero Content - Left Side */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-16 sm:pb-20 lg:pb-24 pt-24 sm:pt-28">
          <div className="max-w-2xl lg:max-w-3xl">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-serif italic font-light text-white leading-[0.9] mb-8 sm:mb-10">
              AI- Powered<br />
              Virtual Try-on
            </h1>
            <p className="text-white/80 text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 max-w-lg">
              Solution for Shopify fashion e-commerce, redefining the way people shop online. We bring the in-store try-on experience to every screen 24/7.
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
                  <img src="/3.png" alt="Browse products" className="w-full h-full object-cover rounded-lg" />
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
                <div className="bg-gray-100 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <img src="/4.png" alt="Upload your pictures" className="w-full h-full object-cover rounded-lg" />
                </div>
                <div className="mt-2 sm:mt-3">
                  <p className="text-[10px] sm:text-xs text-gray-500">Step 2</p>
                  <p className="text-xs sm:text-sm font-semibold text-gray-900">Upload Your Pictures</p>
                </div>
              </div>
            </div>
            {/* Phone 3 - See Results */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="bg-gray-100 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <img src="/5.png" alt="See your results" className="w-full h-full object-cover rounded-lg" />
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
            Adjust the sliders to see the estimated return on investment for your business.
          </p>

          {/* Sliders */}
          <div className="max-w-2xl mx-auto space-y-8 mb-10 sm:mb-14">
            {/* Monthly Orders Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm sm:text-base font-medium text-gray-700">Monthly Orders</label>
                <span className="text-lg font-bold text-[#444833]">{roiOrders.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="100"
                max="20000"
                step="100"
                value={roiOrders}
                onChange={(e) => setRoiOrders(parseInt(e.target.value))}
                className="w-full h-2 bg-[#444833]/20 rounded-lg appearance-none cursor-pointer accent-[#444833]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>100</span>
                <span>20,000</span>
              </div>
            </div>

            {/* Monthly Revenue Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm sm:text-base font-medium text-gray-700">Monthly Revenue</label>
                <span className="text-lg font-bold text-[#444833]">£{roiRevenue.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={roiRevenue}
                onChange={(e) => setRoiRevenue(parseInt(e.target.value))}
                className="w-full h-2 bg-[#444833]/20 rounded-lg appearance-none cursor-pointer accent-[#444833]"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>£5,000</span>
                <span>£1,000,000</span>
              </div>
            </div>
          </div>

          {/* Tier Selection Visual */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center">
              {[
                { name: 'Starter', price: '£249', orders: '0-500', revenue: '£0-25k' },
                { name: 'Growth', price: '£449', orders: '501-1,500', revenue: '£25k-75k' },
                { name: 'Scale', price: '£749', orders: '1,501-5,000', revenue: '£75k-250k' },
                { name: 'Professional', price: '£1,249', orders: '5,001-15,000', revenue: '£250k-750k' },
                { name: 'Enterprise', price: 'Custom', orders: '15,000+', revenue: '£750k+' },
              ].map((t) => (
                <div
                  key={t.name}
                  className={`rounded-lg py-3 sm:py-4 px-1 sm:px-3 transition-all ${
                    roiData.tier === t.name
                      ? 'bg-[#444833] text-white shadow-lg scale-105'
                      : 'bg-white text-gray-500 border border-gray-200'
                  }`}
                >
                  <p className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${roiData.tier === t.name ? 'text-white/80' : 'text-gray-400'}`}>{t.name}</p>
                  <p className={`text-sm sm:text-xl font-black mt-1 ${roiData.tier === t.name ? 'text-white' : 'text-gray-700'}`}>{t.price}</p>
                  <p className={`text-[9px] sm:text-xs mt-1 ${roiData.tier === t.name ? 'text-white/60' : 'text-gray-400'}`}>{t.orders} orders</p>
                  <p className={`text-[9px] sm:text-xs ${roiData.tier === t.name ? 'text-white/60' : 'text-gray-400'}`}>{t.revenue} rev</p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Results Card */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden max-w-2xl mx-auto">
            {/* Tier Header */}
            <div className="bg-[#444833] px-6 py-4 flex items-center justify-between">
              <div>
                <p className="text-white/70 text-xs uppercase tracking-wider">Your Recommended Tier</p>
                <p className="text-white text-xl sm:text-2xl font-bold">{roiData.tier}</p>
              </div>
              <p className="text-white text-lg sm:text-xl font-bold">{roiData.costDisplay}</p>
            </div>
            {/* Stats Grid */}
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Returns Prevented*</span>
                <span className="text-gray-900 font-semibold">{roiData.returnsPrevented.toLocaleString()}/mo</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Savings @ £20/return</span>
                <span className="text-gray-900 font-semibold">£{roiData.returnSavings.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm">Conversion Lift Value**</span>
                <span className="text-gray-900 font-semibold">£{roiData.conversionLift.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-gray-100">
                <span className="text-gray-600 text-sm font-medium">Total Monthly Value</span>
                <span className="text-gray-900 font-bold text-lg">£{roiData.totalMonthly.toLocaleString()}</span>
              </div>
              {roiData.cost > 0 && (
                <div className="flex justify-between items-center py-3 bg-[#444833]/5 rounded-lg px-4 -mx-2">
                  <span className="text-[#444833] text-sm font-bold">ROI Multiple</span>
                  <span className="text-[#444833] font-black text-2xl">{roiData.roiMultiple}x</span>
                </div>
              )}
              {roiData.tier === 'Enterprise' && (
                <div className="text-center py-3">
                  <p className="text-[#444833] font-semibold text-sm">Contact us for custom Enterprise pricing</p>
                  <a href="mailto:mail@renderedfits.com" className="text-[#444833] underline text-sm">mail@renderedfits.com</a>
                </div>
              )}
            </div>
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

      {/* ===== SECTION 8: DEMO LINKS ===== */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
            Try It Yourself
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto">
            Experience our virtual try-on technology with our live demos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
            <Link
              to="/demo-male"
              className="group border-2 border-[#444833] rounded-xl p-6 sm:p-8 hover:bg-[#444833] transition-all"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#444833] group-hover:text-white mx-auto mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <p className="text-lg sm:text-xl font-bold text-[#444833] group-hover:text-white transition-colors">Male Demo</p>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">Try on menswear</p>
            </Link>
            <Link
              to="/demo"
              className="group border-2 border-[#444833] rounded-xl p-6 sm:p-8 hover:bg-[#444833] transition-all"
            >
              <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#444833] group-hover:text-white mx-auto mb-4 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              <p className="text-lg sm:text-xl font-bold text-[#444833] group-hover:text-white transition-colors">Female Demo</p>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">Try on womenswear</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
