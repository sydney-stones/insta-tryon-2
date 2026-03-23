/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen bg-white">

      {/* ===== SECTION 1: HERO ===== */}
      <div className="relative overflow-hidden" style={{
        background: 'linear-gradient(91.71deg, #444833 2.65%, #151A00 98.8%)',
      }}>
        {/* Grid lines — decorative, desktop only */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" aria-hidden="true">
          {/* Horizontal full-width lines */}
          {['11.2%', '86.6%'].map(y => (
            <div key={y} style={{ position: 'absolute', left: 0, right: 0, top: y, borderTop: '1px solid #B9BCAC' }} />
          ))}
          {/* Horizontal right-half lines */}
          {['23.8%', '36.3%', '48.9%', '61.4%', '74%'].map(y => (
            <div key={y} style={{ position: 'absolute', left: '40%', right: 0, top: y, borderTop: '1px solid #B9BCAC' }} />
          ))}
          {/* Vertical lines */}
          {['20.1%', '40.3%', '60.4%', '80.5%'].map(x => (
            <div key={x} style={{ position: 'absolute', left: x, top: 0, bottom: 0, borderLeft: '1px solid #B9BCAC' }} />
          ))}
        </div>

        {/* Radial gradient overlay — keeps left text legible over grid */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(102.25% 52.91% at 20.03% 50.72%, #444833 0%, rgba(68,72,51,0) 100%)',
        }} />

        {/* Content wrapper — responsive, centred */}
        <div className="relative z-10 max-w-[1600px] mx-auto flex flex-col lg:flex-row min-h-[100vh] lg:min-h-[900px]">

          {/* ---- LEFT: Text ---- */}
          <div className="flex-1 flex flex-col justify-center px-6 sm:px-10 lg:px-12 xl:px-16 py-20 lg:py-0" style={{ maxWidth: 750 }}>
            <h1 style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              lineHeight: '110%',
              color: '#FFFFFF',
              margin: 0,
            }} className="text-[clamp(32px,5vw,64px)]">
              Rendered Fits is a virtual try-on application{' '}
              <span style={{ color: 'rgba(255,255,255,0.45)' }}>that brings the dressing room online</span>
            </h1>

            <div className="mt-auto pt-10 lg:pt-16">
              <p style={{
                fontFamily: '"Inter Tight", Inter, sans-serif',
                fontWeight: 500,
                fontSize: 'clamp(16px, 1.25vw, 20px)',
                lineHeight: '32px',
                color: 'rgba(255,255,255,0.8)',
              }} className="max-w-[549px] mb-6">
                Allow your customers to virtually visualise garments on themselves before buying
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="inline-block border border-white text-white px-8 py-3.5 text-sm font-medium hover:bg-white hover:text-[#444833] transition-all" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', textDecoration: 'none' }}>
                  Schedule a Meeting
                </Link>
                <Link to="/results" className="inline-block border border-white/40 text-white/80 px-8 py-3.5 text-sm font-medium hover:bg-white/10 transition-all" style={{ fontFamily: '"Inter Tight", Inter, sans-serif', textDecoration: 'none' }}>
                  See How It Works
                </Link>
              </div>
            </div>
          </div>

          {/* ---- RIGHT: Two widgets with arrow ---- */}
          <div className="relative flex-shrink-0 flex items-center justify-center px-4 pb-10 lg:pb-0 lg:pr-8 xl:pr-12">

            {/* Widget container — stagger the two cards */}
            <div className="relative flex items-start gap-4 sm:gap-5 lg:gap-6">

              {/* Widget 1 — Product / "Try it on" (offset down) */}
              <div className="mt-10 lg:mt-14 flex-shrink-0" style={{
                width: 'clamp(240px, 19vw, 300px)',
                border: '2px solid #FFFFFF', background: '#FFFFFF',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D1D5DC', height: 38, flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', borderRight: '1px solid #D1D5DC', height: '100%', padding: '0 10px', gap: 6 }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#101828' }}>My looks</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <span style={{ background: '#1E2939', color: '#F9FAFB', fontSize: 9.5, fontWeight: 500, fontFamily: 'Jost, sans-serif', padding: '1.5px 6px', marginRight: 10 }}>10 credits left</span>
                    <div style={{ borderLeft: '1px solid #D1D5DC', height: 38, width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </div>
                  </div>
                </div>
                {/* Product image */}
                <img src="/result-images/etta_collection.png" alt="Product" style={{ width: '100%', aspectRatio: '3/2.8', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                {/* Tag row */}
                <div style={{ display: 'flex', gap: 3, padding: '6px 12px', borderTop: '1px solid #D1D5DC' }}>
                  {['Crewneck sweater','XXS','Beige'].map(t => (
                    <span key={t} style={{ fontFamily: 'Jost, sans-serif', fontSize: 9.5, color: '#101828', background: '#fff', padding: '1.5px 6px' }}>{t}</span>
                  ))}
                </div>
                {/* Form body */}
                <div style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 9 }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 400, fontSize: 'clamp(16px, 1.5vw, 24px)', lineHeight: '29px', textTransform: 'uppercase', color: '#101828', margin: 0 }}>TRY IT ON, VIRTUALLY</p>
                  {/* Face upload */}
                  <div>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 12, color: '#101828', display: 'block', marginBottom: 3 }}>Face photo</span>
                    <div style={{ background: '#F9FAFB', borderBottom: '1px solid #D1D5DC', padding: 12, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
                      <div>
                        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 12, color: '#101828', margin: 0 }}>Upload your photo here</p>
                        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#6A7282', margin: 0 }}>Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                      </div>
                    </div>
                  </div>
                  {/* Full body upload */}
                  <div>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 12, color: '#101828', display: 'block', marginBottom: 3 }}>Full body photo</span>
                    <div style={{ background: '#F9FAFB', borderBottom: '1px solid #D1D5DC', padding: 12, display: 'flex', alignItems: 'flex-start', gap: 9 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2"><circle cx="12" cy="4" r="2"/><line x1="12" y1="6" x2="12" y2="14"/><line x1="8" y1="10" x2="16" y2="10"/><line x1="10" y1="14" x2="8" y2="20"/><line x1="14" y1="14" x2="16" y2="20"/></svg>
                      <div>
                        <p style={{ fontFamily: 'Jost, sans-serif', fontWeight: 500, fontSize: 12, color: '#101828', margin: 0 }}>Upload your photo here</p>
                        <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#6A7282', margin: 0 }}>Format: png, jpg, heic &amp; Max file size: 25 MB</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Terms */}
                <div style={{ padding: '0 16px 6px' }}>
                  <p style={{ fontFamily: 'Jost, sans-serif', fontSize: 9.5, color: '#6A7282', margin: 0, lineHeight: '13px' }}>
                    By uploading your photo, you agree to our <u>Terms &amp; Conditions</u> and <u>Privacy Policy</u>. Your image is never permanently stored.
                  </p>
                </div>
                {/* Try on button */}
                <div style={{ background: '#6A7282', height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l2 7h7l-5.5 4 2 7L12 16l-5.5 4 2-7L3 9h7z" fill="#D1D5DC"/></svg>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#D1D5DC' }}>Try on</span>
                </div>
                {/* Powered by */}
                <div style={{ background: '#F3F4F6', borderTop: '1px solid #99A1AF', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#6A7282' }}>Powered by</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, fontWeight: 700, color: '#101828' }}>&nbsp;RENDERED FITS™</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#141B34" strokeWidth="1.2" strokeLinecap="square"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>

              {/* Arrow between widgets — curved connector */}
              <div className="hidden sm:flex absolute z-20 items-center justify-center" style={{
                left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
                width: 80, height: 80,
              }}>
                <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                  <path d="M8 42C20 42 30 8 50 8C60 8 68 14 72 20" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M64 14L72 20L64 24" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>

              {/* Widget 2 — Result (offset up) */}
              <div className="mb-10 lg:mb-14 flex-shrink-0" style={{
                width: 'clamp(240px, 19vw, 300px)',
                border: '2px solid #FFFFFF', background: '#FFFFFF',
                display: 'flex', flexDirection: 'column',
              }}>
                {/* Top bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D1D5DC', height: 38, flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                    <div style={{ borderRight: '1px solid #D1D5DC', height: '100%', width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#141B34" strokeWidth="1.2" strokeLinecap="square"><path d="M19 12H5m7-7l-7 7 7 7"/></svg>
                    </div>
                    <div style={{ borderRight: '1px solid #D1D5DC', height: '100%', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2" strokeLinecap="round"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 2 0 00-1.34-2.23z"/></svg>
                      <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#101828' }}>My looks</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                    <span style={{ background: '#1E2939', color: '#F9FAFB', fontSize: 9.5, fontWeight: 500, fontFamily: 'Jost, sans-serif', padding: '1.5px 6px', marginRight: 10 }}>9 credits left</span>
                    <div style={{ borderLeft: '1px solid #D1D5DC', height: 38, width: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F3F4F6' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1E2939" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                    </div>
                  </div>
                </div>
                {/* Result image */}
                <div style={{ position: 'relative', overflow: 'hidden' }}>
                  <img src="/result-images/etta_collection -tryon-1K.png" alt="Try-on result" style={{ width: '100%', aspectRatio: '3/4.3', objectFit: 'cover', objectPosition: 'top', display: 'block' }} />
                </div>
                {/* Color / Size row */}
                <div style={{ display: 'flex', borderTop: '1px solid #D1D5DC' }}>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px', borderRight: '1px solid #E5E7EB' }}>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 12, color: '#6A7282' }}>Color: <strong style={{ color: '#101828' }}>Brown</strong></span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#141B34" strokeWidth="1.2" strokeLinecap="square"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                  <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 9px' }}>
                    <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#6A7282' }}>Size: <strong style={{ color: '#101828' }}>XS</strong></span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#141B34" strokeWidth="1.2" strokeLinecap="square"><path d="M9 18l6-6-6-6"/></svg>
                  </div>
                </div>
                {/* Add to cart */}
                <div style={{ background: '#1E2939', height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E5E7EB" strokeWidth="1.2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#F9FAFB' }}>Add to cart · <s style={{ opacity: 0.6 }}>$34</s> $24</span>
                </div>
                {/* Powered by */}
                <div style={{ background: '#F3F4F6', borderTop: '1px solid #99A1AF', height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, color: '#6A7282' }}>Powered by</span>
                  <span style={{ fontFamily: 'Jost, sans-serif', fontSize: 11, fontWeight: 700, color: '#101828' }}>&nbsp;RENDERED FITS™</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#141B34" strokeWidth="1.2" strokeLinecap="square"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* ===== SCROLLING QUOTES BANNER ===== */}
      <ScrollingQuotes />

      {/* ===== SECTION 6b: RESULTS CAROUSEL ===== */}
      <div className="bg-white py-16 sm:py-20 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-3">
            See the Results
          </h2>
          <p className="text-center text-gray-500 text-sm max-w-md mx-auto">
            Original product images transformed into photorealistic try-on shots.
          </p>
        </div>
        {/* Scrolling track — infinite loop via CSS animation */}
        <div className="relative">
          <div className="flex gap-4 animate-scroll-carousel" style={{ width: 'max-content' }}>
            {[
              { original: '/result-images/tribal.webp', result: '/result-images/tribal-nb2-2k-tryon.png' },
              { original: '/result-images/casquette-tartan-4470282-model.webp', result: '/result-images/wastedcap-tryon.png' },
              { original: '/result-images/maha_ss26_04_02_130.webp', result: '/result-images/maha_ss26_04_02_129-nb2-2k-tryon.png' },
              { original: '/result-images/etta_collection.png', result: '/result-images/etta_collection -tryon-1K.png' },
              { original: '/result-images/nightcityclothing.webp', result: '/result-images/nightcityclothing-tryon-1K.png' },
              /* duplicate set for seamless loop */
              { original: '/result-images/tribal.webp', result: '/result-images/tribal-nb2-2k-tryon.png' },
              { original: '/result-images/casquette-tartan-4470282-model.webp', result: '/result-images/wastedcap-tryon.png' },
              { original: '/result-images/maha_ss26_04_02_130.webp', result: '/result-images/maha_ss26_04_02_129-nb2-2k-tryon.png' },
              { original: '/result-images/etta_collection.png', result: '/result-images/etta_collection -tryon-1K.png' },
              { original: '/result-images/nightcityclothing.webp', result: '/result-images/nightcityclothing-tryon-1K.png' },
            ].map((pair, idx) => (
              <div key={idx} className="flex gap-2 flex-shrink-0">
                {/* Original */}
                <div className="relative flex-shrink-0">
                  <img
                    src={pair.original}
                    alt="Original item"
                    className="h-72 sm:h-80 w-auto object-cover rounded-xl"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Original item
                  </span>
                </div>
                {/* Result */}
                <div className="relative flex-shrink-0">
                  <img
                    src={pair.result}
                    alt="Rendered Fits result"
                    className="h-72 sm:h-80 w-auto object-cover rounded-xl"
                    loading="lazy"
                  />
                  <span className="absolute bottom-2 right-2 bg-[#444833]/80 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                    Rendered Fits
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== SECTION 2b: BENEFITS OF VIRTUAL TRY-ON ===== */}
      <BenefitsSection />

      {/* ===== SECTION 3: PHONE MOCKUPS ===== */}
      <div className="bg-[#444833] py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 gap-3 sm:gap-6">
            {/* Phone 1 - Browse */}
            <div className="bg-white rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
              <div className="p-3 sm:p-4">
                <div className="bg-gray-100 rounded-lg aspect-[3/4] flex items-center justify-center">
                  <img src="/result-images/purdeyoutfit.png" alt="Browse products" className="w-full h-full object-cover rounded-lg" />
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
                  <img src="/result-images/siennaphone.png" alt="Upload your pictures" className="w-full h-full object-cover rounded-lg" />
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
                  <img src="/result-images/purdey-tryon-1k.png" alt="See your results" className="w-full h-full object-contain rounded-lg" />
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

      {/* ===== SECTION 5: PRICING ===== */}
      <div className="bg-white py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-gray-900 mb-4">
              Our Pricing
            </h2>
            <p className="text-gray-500 text-base max-w-lg mx-auto mb-8">
              Simple integration. Cancel anytime.
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
              <p className="text-sm text-gray-500 mt-1">Custom try-on limits and dedicated support.</p>
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
      <div className="bg-[#3a3d2d] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Links row */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-5">
            <Link to="/legal" className="text-white/50 hover:text-white/80 text-[11px] transition-colors">Legal</Link>
            <Link to="/contact" className="text-white/50 hover:text-white/80 text-[11px] transition-colors">Contact Us</Link>
          </div>
          {/* Divider */}
          <div className="border-t border-white/10 mb-5" />
          {/* Company info */}
          <p className="text-white/40 text-[10px] sm:text-[11px] leading-relaxed text-center">
            © {new Date().getFullYear()} Rendered Fits Ltd &nbsp;·&nbsp; Company No. 16922551 &nbsp;·&nbsp; VAT No. 510026164<br className="hidden sm:block" />
            <span className="hidden sm:inline"> </span>Registered office: 50-54 Oswald Road, Scunthorpe, North Lincolnshire, DN15 7PQ, United Kingdom &nbsp;·&nbsp; <a href="mailto:mail@renderedfits.com" className="hover:text-white/60 transition-colors">mail@renderedfits.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
