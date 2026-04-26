/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { WardrobeItem, WardrobeFolder } from '../types';
import ScrollingQuotes from './ScrollingQuotes';
import BenefitsSection from './BenefitsSection';
import { AsciiShader } from './AsciiShader';

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
        <AsciiShader
          className="absolute inset-0 h-full w-full"
          density={16}
          opacity={0.18}
          mode="depth"
          charSet="block"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 80% at 30% 50%, transparent 40%, rgba(21,26,0,0.55) 100%), radial-gradient(ellipse 50% 100% at 100% 50%, rgba(21,26,0,0.7) 0%, transparent 60%)',
          }}
        />

        {/* Content wrapper — responsive, centred */}
        <div className="relative z-10 max-w-[1600px] mx-auto grid min-h-[100vh] lg:min-h-[900px] grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] items-center gap-10 px-6 sm:px-10 lg:px-12 xl:px-16 pb-20 pt-28 lg:pb-24 lg:pt-32">

          {/* ---- LEFT: Text ---- */}
          <div className="flex flex-col justify-center" style={{ maxWidth: 750 }}>
            <h1 style={{
              fontFamily: 'Jost, sans-serif',
              fontWeight: 500,
              lineHeight: '106%',
              color: '#FFFFFF',
              margin: 0,
              marginBottom: '28px',
              letterSpacing: '-0.015em',
            }} className="text-[clamp(32px,5vw,64px)]">
              Rendered Fits is a virtual try-on application{' '}
              <span style={{ color: 'rgba(255,255,255,0.38)' }}>that brings the dressing room online.</span>
            </h1>

            <p style={{
              fontFamily: '"Inter Tight", Inter, sans-serif',
              fontWeight: 400,
              fontSize: 'clamp(16px, 1.2vw, 17px)',
              lineHeight: '1.72',
              color: 'rgba(255,255,255,0.72)',
              margin: '0 0 40px 0',
            }} className="max-w-[520px]">
              Allow your customers to see how an item fits them, personally, before they buy. Simple integration. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/contact" className="inline-block border border-white bg-white px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.06em] text-[#444833] transition-all hover:bg-transparent hover:text-white" style={{ fontFamily: 'Jost, sans-serif', textDecoration: 'none' }}>
                Schedule a Meeting
              </Link>
              <Link to="/results" className="inline-block border border-white/40 bg-transparent px-8 py-3.5 text-center text-[13px] font-medium uppercase tracking-[0.06em] text-white transition-all hover:border-white" style={{ fontFamily: 'Jost, sans-serif', textDecoration: 'none' }}>
                See How It Works
              </Link>
            </div>
          </div>

          {/* ---- RIGHT: Hero image ---- */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <img
              src="/result-images/Website Design -6.png"
              alt="Rendered Fits virtual try-on interface"
              className="relative z-10 h-auto w-[58%] max-w-[440px] object-contain object-center sm:w-[54%] lg:w-[68%] xl:max-w-[500px]"
            />
          </div>

        </div>
      </div>

      {/* ===== SCROLLING QUOTES BANNER ===== */}
      <ScrollingQuotes />

      {/* ===== SECTION 6b: RESULTS CAROUSEL ===== */}
      {(() => {
        const pairs = [
          { original: '/result-images/tribal.webp', result: '/result-images/tribal-nb2-2k-tryon.png' },
          { original: '/result-images/casquette-tartan-4470282-model.webp', result: '/result-images/wastedcap-tryon.png' },
          { original: '/result-images/maha_ss26_04_02_130.webp', result: '/result-images/maha_ss26_04_02_129-nb2-2k-tryon.png' },
          { original: '/result-images/etta_collection.png', result: '/result-images/etta_collection -tryon-1K.png' },
          { original: '/result-images/nightcityclothing.webp', result: '/result-images/nightcityclothing-tryon-1K.png' },
        ];
        /* Three copies: animation scrolls -33.333% so the loop is seamless */
        const tripled = [...pairs, ...pairs, ...pairs];
        return (
          <div className="bg-white py-16 sm:py-20 overflow-hidden">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif italic text-center text-gray-900 mb-3">
                See the Results
              </h2>
              <p className="text-center text-gray-500 text-sm max-w-md mx-auto">
                Original product images transformed into photorealistic try-on shots.
              </p>
            </div>
            <div className="relative">
              <div className="flex gap-4 animate-scroll-carousel-3" style={{ width: 'max-content' }}>
                {tripled.map((pair, idx) => (
                  <div key={idx} className="flex gap-2 flex-shrink-0">
                    <div className="relative flex-shrink-0">
                      <img
                        src={pair.original}
                        alt="Original item"
                        className="h-72 sm:h-80 w-auto object-cover rounded-xl"
                        loading="eager"
                        decoding="async"
                        style={{ display: 'block' }}
                      />
                      <span className="absolute bottom-2 left-2 bg-black/50 text-white text-[10px] font-medium px-2 py-0.5 rounded-full backdrop-blur-sm">
                        Original item
                      </span>
                    </div>
                    <div className="relative flex-shrink-0">
                      <img
                        src={pair.result}
                        alt="Rendered Fits result"
                        className="h-72 sm:h-80 w-auto object-cover rounded-xl"
                        loading="eager"
                        decoding="async"
                        style={{ display: 'block' }}
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
        );
      })()}

      {/* ===== SECTION 2b: BENEFITS OF VIRTUAL TRY-ON ===== */}
      <BenefitsSection />

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

      {/* ===== SECTION 7: BRANDED FOOTER / CTA ===== */}
      <div className="bg-[#444833] py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 text-center">
            {/* Hanger logo */}
            <img
              src="/result-images/whitelogonobackground.png"
              alt="Rendered Fits"
              className="h-[160px] sm:h-[192px] md:h-[224px] lg:h-[256px] w-auto object-contain"
            />
            {/* CTA */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-white/70 text-xs sm:text-sm">Contact Us: <a href="mailto:mail@renderedfits.com" className="text-white hover:underline">mail@renderedfits.com</a></p>
              <Link
                to="/contact"
                className="inline-block border border-white text-white px-8 py-3 text-sm font-medium hover:bg-white hover:text-[#444833] transition-all"
              >
                Schedule a Meeting
              </Link>
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
