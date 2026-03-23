/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const benefits = [
  {
    title: 'Boost Sales',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
      </svg>
    ),
  },
  {
    title: 'Sustainability',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3C7 3 3 7.03 3 12c0 2.39.86 4.58 2.28 6.28M12 3c5 0 9 4.03 9 9 0 2.39-.86 4.58-2.28 6.28M12 3v18M3 12h18" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7.5S9.5 10 12 10s4-2.5 4-2.5M8 16.5S9.5 14 12 14s4 2.5 4 2.5" />
      </svg>
    ),
  },
  {
    title: 'Reduce Returns',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 9h1.5M9 12h6M9 15h4" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6l1.5 1.5L15 9" />
      </svg>
    ),
  },
  {
    title: 'Increase AOV',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 13v-1m4 1v-3m4 3V8M8 21l4-4 4 4M3 4h18" />
      </svg>
    ),
  },
  {
    title: 'Customer\nAcquisition',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: 'Studio\nBackground',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="6" width="20" height="14" rx="2" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2 10h20M6 6V4M18 6V4" />
      </svg>
    ),
  },
  {
    title: 'Advanced\nanalytics',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
  },
  {
    title: 'Competitive\nEdge',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      </svg>
    ),
  },
  {
    title: 'Committed to on-going updates and support',
    icon: (
      <svg className="w-7 h-7 text-white/80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 3v4a1 1 0 001 1h4" />
      </svg>
    ),
  },
];

const BenefitsSection: React.FC = () => (
  <div className="relative bg-[#2e3520] overflow-hidden">
    {/* Grid overlay */}
    <div className="absolute inset-0 opacity-20" style={{
      backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
      backgroundSize: '80px 80px'
    }} />

    <div className="relative z-10 max-w-7xl mx-auto">
      {/* Header row */}
      <div className="px-8 sm:px-12 lg:px-16 pt-16 sm:pt-20 pb-10 sm:pb-14 flex items-start justify-between">
        <div className="max-w-2xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
            Benefits{' '}
            <span className="font-light text-white/50">of our Virtual Try-on</span>
          </h2>
        </div>
      </div>

      {/* Two-column layout: grid on left, models on right */}
      <div className="flex items-end">
        {/* Benefit grid */}
        <div className="flex-1 min-w-0">
          {/* Row 1 — 4 cells */}
          <div className="grid grid-cols-4 border-t border-white/15">
            {benefits.slice(0, 4).map((b, i) => (
              <div
                key={i}
                className="border-r border-white/15 last:border-r-0 px-6 sm:px-8 py-8 sm:py-10 flex flex-col gap-8"
              >
                {b.icon}
                <p className="text-white text-sm sm:text-base font-medium leading-snug whitespace-pre-line">{b.title}</p>
              </div>
            ))}
          </div>

          {/* Row 2 — 5 cells (last one gets special treatment) */}
          <div className="grid grid-cols-5 border-t border-white/15">
            {benefits.slice(4, 9).map((b, i) => (
              <div
                key={i + 4}
                className="border-r border-white/15 last:border-r-0 px-5 sm:px-7 py-8 sm:py-10 flex flex-col gap-8"
              >
                {b.icon}
                <p className="text-white text-sm sm:text-base font-medium leading-snug whitespace-pre-line">{b.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Models photo — bleeds to right edge */}
        <div className="hidden lg:block flex-shrink-0 w-[340px] xl:w-[400px] self-stretch relative">
          <img
            src="/result-images/Website Design -4.png"
            alt="Virtual try-on models"
            className="absolute bottom-0 right-0 h-full w-full object-cover object-top"
          />
          {/* Fade on left edge to blend with grid */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#2e3520] to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  </div>
);

export default BenefitsSection;
