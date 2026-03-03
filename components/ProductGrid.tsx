/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem, WardrobeFolder } from '../types';
import ScrollingQuotes from './ScrollingQuotes';
import BenefitsSection from './BenefitsSection';

interface ProductGridProps {
  products: WardrobeItem[];
  folders: WardrobeFolder[];
  searchQuery?: string;
}

const TIERS = [
  { name: 'Starter',      monthly: 249,  annual: 2490,  tryonsMonthly: 1000,  tryonsAnnual: 12000  },
  { name: 'Growth',       monthly: 449,  annual: 4490,  tryonsMonthly: 2000,  tryonsAnnual: 24000  },
  { name: 'Scale',        monthly: 749,  annual: 7490,  tryonsMonthly: 3500,  tryonsAnnual: 42000  },
  { name: 'Professional', monthly: 1249, annual: 12490, tryonsMonthly: 6000,  tryonsAnnual: 72000  },
];

const ProductGrid: React.FC<ProductGridProps> = ({ }) => {
  const [roiOrders, setRoiOrders] = useState<number>(500);
  const [roiRevenue, setRoiRevenue] = useState<number>(25000);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);

  useEffect(() => {
    const injectSchema = (id: string, json: object) => {
      let el = document.getElementById(id) as HTMLScriptElement | null;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(json);
    };

    injectSchema('schema-organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Rendered Fits',
      url: 'https://renderedfits.com',
      description: 'AI-powered virtual try-on technology for Shopify fashion brands. Reduce returns and increase conversions.',
      foundingDate: '2025',
      sameAs: [
        'https://linkedin.com/company/renderedfits',
        'https://instagram.com/renderedfits',
      ],
    });

    injectSchema('schema-software', {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Rendered Fits',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      description: 'AI-powered virtual try-on for Shopify fashion brands. Let customers see themselves wearing your products before they buy.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'GBP',
        description: 'Free trial available',
      },
    });

    return () => {
      document.getElementById('schema-organization')?.remove();
      document.getElementById('schema-software')?.remove();
    };
  }, []);

  // ROI Calculator — tier driven by monthly revenue slider
  const roiData = useMemo(() => {
    // Pick tier by revenue bands: <£20k→Starter, <£40k→Growth, <£75k→Scale, else→Professional
    const idx = roiRevenue < 20000 ? 0 : roiRevenue < 40000 ? 1 : roiRevenue < 75000 ? 2 : 3;
    const tier = TIERS[idx];
    const cost = isAnnual ? Math.round(tier.annual / 12) : tier.monthly;
    const tryons = isAnnual ? tier.tryonsAnnual : tier.tryonsMonthly;

    const avgOrderValue = roiOrders > 0 ? roiRevenue / roiOrders : 50;
    const returnsPrevented = Math.round(roiOrders * 0.07);
    const returnSavings = returnsPrevented * 20;
    const conversionLift = Math.round(roiOrders * 0.05 * avgOrderValue);
    const totalMonthly = returnSavings + conversionLift;
    const roiMultiple = cost > 0 ? Math.round(totalMonthly / cost) : 0;

    return {
      tier: tier.name,
      tryons,
      tryonsMonthly: tier.tryonsMonthly,
      tryonsAnnual: tier.tryonsAnnual,
      monthly: tier.monthly,
      annual: tier.annual,
      cost,
      costDisplay: `£${cost.toLocaleString()}/mo`,
      returnsPrevented,
      returnSavings,
      conversionLift,
      totalMonthly,
      roiMultiple,
    };
  }, [roiOrders, roiRevenue, isAnnual]);

  return (
    <div className="min-h-screen bg-white">

      {/* ===== SECTION 1: HERO ===== */}
      <div className="relative bg-[#444833] min-h-screen flex items-center justify-center overflow-hidden">
        {/* Hero Image - Background */}
        <div className="absolute inset-0 opacity-30">
          <img
            src="/hero-models.png"
            alt="Virtual Try-On Models"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Hero Content - Centered */}
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-serif italic font-light text-white leading-[0.9] mb-8 sm:mb-10">
              AI-Powered<br />
              Virtual Try-on
            </h1>
            <p className="text-white/90 text-lg sm:text-xl md:text-2xl lg:text-3xl leading-relaxed mb-10 sm:mb-12 max-w-3xl mx-auto font-light">
              Solution for Shopify fashion e-commerce, redefining the way people shop online. We bring the in-store try-on experience to every screen 24/7.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/contact"
                className="inline-block border-2 border-white text-white px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-medium hover:bg-white hover:text-[#444833] transition-all"
              >
                Schedule a Meeting
              </Link>
              <Link
                to="/results"
                className="inline-block border-2 border-white/50 text-white px-10 sm:px-12 py-4 sm:py-5 text-base sm:text-lg font-medium hover:bg-white hover:text-[#444833] transition-all"
              >
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SCROLLING QUOTES BANNER ===== */}
      <ScrollingQuotes />

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
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm"></span>
              </div>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Reduce Returns Rates<br />by ~20%</p>
            </div>
            {/* Boost Conversions */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#444833] rounded-lg w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 relative">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm"></span>
              </div>
              <p className="text-gray-800 text-xs sm:text-sm font-medium">Boosts Conversions<br />by ~30%</p>
            </div>
            {/* Increase AOV */}
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#444833] rounded-lg w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center mb-4 relative">
                <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span className="absolute bottom-2 right-2 text-white font-bold text-xs sm:text-sm"></span>
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
      <BenefitsSection />

      {/* ===== SECTION 5: PRICING ===== */}
      <div className="bg-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto mb-8">
              No developer required. Cancel anytime.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-3 bg-gray-100 rounded-full px-2 py-2">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${!isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 ${isAnnual ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Annual
                <span className="bg-[#444833] text-white text-[10px] font-bold px-2 py-0.5 rounded-full leading-none">2 months free</span>
              </button>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TIERS.map((t, i) => {
              const displayPrice = isAnnual ? Math.round(t.annual / 12) : t.monthly;
              const displayTryons = isAnnual ? t.tryonsAnnual : t.tryonsMonthly;
              const isPopular = i === 1; // Growth = most popular
              return (
                <div
                  key={t.name}
                  className={`relative rounded-2xl flex flex-col transition-all ${
                    isPopular
                      ? 'bg-[#444833] text-white shadow-2xl ring-2 ring-[#444833]'
                      : 'bg-white text-gray-900 border border-gray-200 shadow-sm'
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-[#6b7544] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <div className="p-7 flex flex-col flex-1">
                    {/* Tier name */}
                    <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${isPopular ? 'text-white/60' : 'text-gray-400'}`}>
                      {t.name}
                    </p>

                    {/* Price */}
                    <div className="mb-2 flex items-end gap-1">
                      <span className={`text-4xl font-black leading-none ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                        £{displayPrice.toLocaleString()}
                      </span>
                      <span className={`text-sm pb-1 ${isPopular ? 'text-white/50' : 'text-gray-400'}`}>/mo</span>
                    </div>
                    {isAnnual ? (
                      <p className={`text-xs mb-6 ${isPopular ? 'text-white/50' : 'text-gray-400'}`}>
                        £{t.annual.toLocaleString()} billed annually
                      </p>
                    ) : (
                      <p className={`text-xs mb-6 ${isPopular ? 'text-white/50' : 'text-gray-400'}`}>
                        or £{Math.round(t.annual / 12).toLocaleString()}/mo billed annually
                      </p>
                    )}

                    {/* Try-on allowance — primary feature */}
                    <div className={`rounded-xl p-4 mb-6 ${isPopular ? 'bg-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                      <p className={`text-2xl font-black ${isPopular ? 'text-white' : 'text-gray-900'}`}>
                        {displayTryons.toLocaleString()}
                      </p>
                      <p className={`text-xs font-medium mt-0.5 ${isPopular ? 'text-white/60' : 'text-gray-500'}`}>
                        {isAnnual ? 'try-ons per year' : 'try-ons per month'}
                      </p>
                    </div>

                    {/* Feature list */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {[
                        'Shopify integration',
                        'AI-powered try-on',
                        'All product types',
                        'Analytics dashboard',
                        i >= 1 && 'Priority support',
                        i >= 2 && '1-on-1 onboarding support',
                        i >= 3 && 'Dedicated account manager',
                      ].filter(Boolean).map((feature, fi) => (
                        <li key={fi} className="flex items-center gap-2.5">
                          <svg className={`w-4 h-4 flex-shrink-0 ${isPopular ? 'text-white/70' : 'text-[#444833]'}`} fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className={`text-sm ${isPopular ? 'text-white/80' : 'text-gray-600'}`}>{feature as string}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    <Link
                      to="/contact"
                      className={`block text-center py-3 px-6 rounded-xl text-sm font-semibold transition-all ${
                        isPopular
                          ? 'bg-white text-[#444833] hover:bg-gray-100'
                          : 'border-2 border-[#444833] text-[#444833] hover:bg-[#444833] hover:text-white'
                      }`}
                    >
                      Schedule a demo
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Enterprise row */}
          <div className="mt-6 rounded-2xl border border-gray-200 bg-white shadow-sm px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Enterprise</p>
              <p className="text-lg font-bold text-gray-900">Need more volume or a custom integration?</p>
              <p className="text-sm text-gray-500 mt-1">Custom try-on limits, white-labelling, SLA, and dedicated support.</p>
            </div>
            <Link
              to="/contact"
              className="flex-shrink-0 border-2 border-[#444833] text-[#444833] px-8 py-3 rounded-xl text-sm font-semibold hover:bg-[#444833] hover:text-white transition-all"
            >
              Talk to us
            </Link>
          </div>

        </div>
      </div>

      {/* ===== SECTION 6: ROI CALCULATOR ===== */}
      <div className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-3">
            Calculate Your ROI
          </h2>
          <p className="text-center text-gray-500 text-sm mb-12 max-w-md mx-auto">
            Enter your store's numbers to see your estimated return and recommended plan.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

            {/* Left — inputs */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-800">Monthly Orders</label>
                    <p className="text-xs text-gray-400 mt-0.5">How many orders does your store process per month?</p>
                  </div>
                  <span className="text-xl font-black text-[#444833] tabular-nums">{roiOrders.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="100" max="20000" step="100" value={roiOrders}
                  onChange={(e) => setRoiOrders(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#444833]"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1.5">
                  <span>100</span><span>20,000</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <label className="text-sm font-semibold text-gray-800">Monthly Revenue</label>
                    <p className="text-xs text-gray-400 mt-0.5">Your average monthly revenue in GBP</p>
                  </div>
                  <span className="text-xl font-black text-[#444833] tabular-nums">£{roiRevenue.toLocaleString()}</span>
                </div>
                <input
                  type="range" min="5000" max="200000" step="1000" value={roiRevenue}
                  onChange={(e) => setRoiRevenue(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-[#444833]"
                />
                <div className="flex justify-between text-xs text-gray-300 mt-1.5">
                  <span>£5k</span><span>£200k</span>
                </div>
              </div>

              {/* Avg order value derived stat */}
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 flex items-center justify-between">
                <span className="text-sm text-gray-500">Avg. order value</span>
                <span className="text-sm font-bold text-gray-800">
                  £{roiOrders > 0 ? Math.round(roiRevenue / roiOrders).toLocaleString() : '—'}
                </span>
              </div>
            </div>

            {/* Right — results */}
            <div className="space-y-4">
              {/* Recommended tier callout */}
              <div className="bg-[#444833] rounded-2xl p-6 text-white">
                <p className="text-white/60 text-xs uppercase tracking-widest mb-1">Recommended plan</p>
                <div className="flex items-end justify-between">
                  <p className="text-3xl font-black">{roiData.tier}</p>
                  <div className="text-right">
                    <p className="text-2xl font-black">{roiData.costDisplay}</p>
                    {isAnnual && <p className="text-white/50 text-xs">£{roiData.annual.toLocaleString()}/yr</p>}
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-white/70 text-sm">{isAnnual ? 'Try-ons per year' : 'Try-ons per month'}</span>
                  <span className="text-white font-bold">{roiData.tryons.toLocaleString()}</span>
                </div>
              </div>

              {/* ROI breakdown */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm divide-y divide-gray-100">
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Fewer returns</p>
                    <p className="text-xs text-gray-400 mt-0.5">{roiData.returnsPrevented.toLocaleString()} returns prevented/mo @ £20 each</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">+£{roiData.returnSavings.toLocaleString()}</p>
                </div>
                <div className="px-6 py-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Higher conversions</p>
                    <p className="text-xs text-gray-400 mt-0.5">5% lift on {roiOrders.toLocaleString()} orders @ £{roiOrders > 0 ? Math.round(roiRevenue / roiOrders) : 0} AOV</p>
                  </div>
                  <p className="text-base font-bold text-gray-900">+£{roiData.conversionLift.toLocaleString()}</p>
                </div>
                <div className="px-6 py-4 flex justify-between items-center bg-gray-50 rounded-b-2xl">
                  <p className="text-sm font-semibold text-gray-700">Total monthly value added</p>
                  <p className="text-lg font-black text-gray-900">£{roiData.totalMonthly.toLocaleString()}</p>
                </div>
              </div>

              {/* ROI multiple highlight */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Estimated ROI</p>
                  <p className="text-xs text-gray-400 mt-0.5">Value generated vs. plan cost</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-[#444833]">{roiData.roiMultiple}x</p>
                </div>
              </div>

              <p className="text-[10px] text-gray-400 px-1 leading-relaxed">
                Based on industry averages: 7% return rate reduction, 5% conversion lift. Estimates only — actual results vary.
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* ===== SECTION 6: DEMO LINKS ===== */}
      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
            Try It Yourself
          </h2>
          <p className="text-gray-500 text-sm sm:text-base mb-10 max-w-lg mx-auto">
            Experience our virtual try-on technology with our live demos.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <Link
              to="/demo-male"
              className="group border-2 border-[#444833] rounded-xl p-6 sm:p-8 hover:bg-[#444833] transition-all"
            >
              <p className="text-lg sm:text-xl font-bold text-[#444833] group-hover:text-white transition-colors">Male Demo</p>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">Try on menswear</p>
            </Link>
            <Link
              to="/demo"
              className="group border-2 border-[#444833] rounded-xl p-6 sm:p-8 hover:bg-[#444833] transition-all"
            >
              <p className="text-lg sm:text-xl font-bold text-[#444833] group-hover:text-white transition-colors">Female Demo</p>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">Try on womenswear</p>
            </Link>
            <Link
              to="/results"
              className="group border-2 border-[#444833] rounded-xl p-6 sm:p-8 hover:bg-[#444833] transition-all"
            >
              <p className="text-lg sm:text-xl font-bold text-[#444833] group-hover:text-white transition-colors">See Results</p>
              <p className="text-sm text-gray-500 group-hover:text-white/70 mt-1 transition-colors">See how it works</p>
            </Link>
          </div>
        </div>
      </div>

      {/* ===== SECTION 7: BRANDED FOOTER / CTA ===== */}
      <div className="bg-[#444833] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between gap-10 lg:gap-16">
            {/* Left - Large brand name */}
            <div className="text-center lg:text-left">
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-none tracking-tight">
                RENDERED<br />FITS
              </h2>
            </div>
            {/* Right - CTA */}
            <div className="flex flex-col items-center lg:items-end gap-6">
              <div className="text-center lg:text-right">
                <p className="text-white/70 text-xs sm:text-sm mb-1">Contact Us: <a href="mailto:mail@renderedfits.com" className="text-white hover:underline">mail@renderedfits.com</a></p>
                <Link
                  to="/contact"
                  className="inline-block border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-[#444833] transition-all mt-3"
                >
                  Schedule a Meeting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== SECTION 8: LEGAL FOOTER ===== */}
      <div className="bg-[#3a3d2d] py-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/50 text-[10px] sm:text-xs leading-relaxed">
            Rendered Fits Ltd registered in England and Wales under the company registration number 16922551. Registered office address: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, United Kingdom, DN15 7PQ
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
