import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AsciiShader } from './AsciiShader';

const TIERS = [
  { name: 'Starter',      monthly: 249,  maxTryons: 1000  },
  { name: 'Growth',       monthly: 449,  maxTryons: 2000  },
  { name: 'Scale',        monthly: 749,  maxTryons: 3500  },
  { name: 'Professional', monthly: 1249, maxTryons: 6000  },
  { name: 'Enterprise',   monthly: null, maxTryons: Infinity },
];

const SHOPIFY_APP_URL = 'https://apps.shopify.com/rendered-fits-virtual-try-on';
const BOOK_A_CALL_URL = 'https://calendly.com/mail-renderedfits/15-minute-meeting';

function getTier(tryonsPerMonth: number) {
  return TIERS.find(t => tryonsPerMonth <= t.maxTryons) ?? TIERS[TIERS.length - 1];
}

export default function TierCalculatorPage() {
  const [visitors, setVisitors] = useState('');
  const [aov, setAov] = useState('');
  const [result, setResult] = useState<{
    tryons: number;
    tier: typeof TIERS[0];
    conversionUplift: number;
    returnsSaving: number;
    aovUplift: number;
    totalBenefit: number;
    annualCost: number;
  } | null>(null);
  const [error, setError] = useState('');

  function calculate() {
    const v = parseFloat(visitors.replace(/,/g, ''));
    const a = aov.trim() === '' ? 150 : parseFloat(aov.replace(/,/g, ''));

    if (isNaN(v) || v <= 0) {
      setError('Please enter your monthly unique visitors to continue.');
      setResult(null);
      return;
    }
    if (isNaN(a) || a <= 0) {
      setError('Please enter a valid average order value.');
      setResult(null);
      return;
    }

    setError('');

    const tryons = Math.round(v * 0.07);
    const tier = getTier(tryons);

    // ROI calculations
    // Conversion uplift: try-on users × 20% uplift × AOV × 12
    const conversionUplift = tryons * 0.20 * a * 12;

    // Returns saving: 20% reduction on 2% return rate on try-on converting orders × AOV × 12
    // try-on converting orders per month = tryons × ~15% conversion (industry midpoint)
    const tryonConvertingOrders = tryons * 0.15;
    const returnsSaving = tryonConvertingOrders * 0.02 * 0.20 * a * 12;

    // AOV uplift: try-on converting orders × 10% AOV increase × 12
    const aovUplift = tryonConvertingOrders * (a * 0.10) * 12;

    const totalBenefit = conversionUplift + returnsSaving + aovUplift;
    const annualCost = tier.monthly !== null ? tier.monthly * 12 : 0;

    setResult({ tryons, tier, conversionUplift, returnsSaving, aovUplift, totalBenefit, annualCost });
  }

  const fmt = (n: number) =>
    '£' + Math.round(n).toLocaleString('en-GB');

  const isEnterprise = result?.tier.name === 'Enterprise';

  return (
    <div className="min-h-screen bg-white">

      {/* Hero header */}
      <div
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ background: 'linear-gradient(91.71deg, #444833 2.65%, #151A00 98.8%)' }}
      >
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
              'radial-gradient(ellipse 80% 70% at 50% 40%, rgba(100,110,50,0.18) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            Tier Recommendation
          </p>
          <h1 className="text-3xl sm:text-5xl font-serif italic text-white mb-4 leading-tight">
            Which plan is right for you?
          </h1>
          <p className="text-white/60 text-base sm:text-lg max-w-md mx-auto">
            Enter your site stats and we'll estimate your ideal tier and expected return on investment.
          </p>
        </div>
      </div>

      {/* Calculator */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-14 sm:py-20">

        {/* Inputs */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Your store details</h2>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Monthly unique website visitors
                <span className="ml-1.5 text-xs font-normal text-gray-400">(required)</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  inputMode="numeric"
                  value={visitors}
                  onChange={e => setVisitors(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && calculate()}
                  placeholder="e.g. 25,000"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#444833]/30 focus:border-[#444833] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Average order value (£)
                <span className="ml-1.5 text-xs font-normal text-gray-400">(defaults to £150 if left blank)</span>
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={aov}
                  onChange={e => setAov(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && calculate()}
                  placeholder="150"
                  className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-3 text-gray-900 text-sm placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#444833]/30 focus:border-[#444833] transition-all"
                />
              </div>
            </div>
          </div>

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          <button
            onClick={calculate}
            className="mt-6 w-full bg-[#444833] text-white py-3.5 rounded-xl text-sm font-bold hover:bg-[#3a3d2b] transition-all"
          >
            Calculate my tier
          </button>
        </div>

        {/* Results */}
        {result && (
          <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300">

            {/* Recommended tier */}
            <div
              className={`rounded-2xl p-6 sm:p-8 ${isEnterprise ? 'bg-[#444833] text-white' : 'bg-[#444833] text-white'}`}
            >
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3">
                Recommended tier
              </p>
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div>
                  <p className="text-3xl sm:text-4xl font-black text-white mb-1">{result.tier.name}</p>
                  {isEnterprise ? (
                    <p className="text-white/70 text-sm">Custom pricing — let's talk</p>
                  ) : (
                    <p className="text-white/70 text-sm">
                      £{result.tier.monthly!.toLocaleString()}/month
                    </p>
                  )}
                </div>
                <div className="text-left sm:text-right">
                  <p className="text-2xl font-black text-white">{result.tryons.toLocaleString()}</p>
                  <p className="text-white/60 text-xs">estimated try-ons/month</p>
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {isEnterprise ? (
                  <a
                    href={BOOK_A_CALL_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white text-[#444833] py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
                  >
                    Book a call
                  </a>
                ) : (
                  <a
                    href={SHOPIFY_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-white text-[#444833] py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
                  >
                    Install on Shopify
                  </a>
                )}
                <Link
                  to="/contact"
                  className="flex-1 text-center border border-white/30 text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all"
                >
                  Schedule a demo
                </Link>
              </div>
            </div>

            {/* ROI breakdown */}
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
                Estimated annual ROI
              </p>

              <div className="space-y-4">
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm text-gray-600">Conversion uplift</p>
                  <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmt(result.conversionUplift)}</p>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm text-gray-600">Returns saving</p>
                  <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmt(result.returnsSaving)}</p>
                </div>
                <div className="border-t border-gray-100" />
                <div className="flex justify-between items-start gap-4">
                  <p className="text-sm text-gray-600">AOV uplift</p>
                  <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmt(result.aovUplift)}</p>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-start gap-4">
                    <p className="text-sm font-semibold text-gray-900">Total estimated annual benefit</p>
                    <p className="text-sm font-black text-[#444833] tabular-nums shrink-0">{fmt(result.totalBenefit)}</p>
                  </div>
                  {!isEnterprise && result.annualCost > 0 && (
                    <div className="flex justify-between items-start gap-4 mt-2">
                      <p className="text-sm text-gray-500">Annual subscription cost</p>
                      <p className="text-sm font-semibold text-gray-500 tabular-nums shrink-0">−{fmt(result.annualCost)}</p>
                    </div>
                  )}
                  {!isEnterprise && result.annualCost > 0 && (
                    <div className="flex justify-between items-start gap-4 mt-3 bg-gray-50 rounded-xl px-4 py-3">
                      <p className="text-sm font-bold text-gray-900">Net annual return</p>
                      <p className="text-base font-black text-[#444833] tabular-nums shrink-0">{fmt(result.totalBenefit - result.annualCost)}</p>
                    </div>
                  )}
                </div>
              </div>

              <p className="mt-6 text-xs text-gray-400 leading-relaxed border-t border-gray-100 pt-5">
                These projections are based on documented industry benchmarks from earlier-generation virtual try-on tools. Rendered Fits is expected to outperform them.
              </p>
            </div>

            {/* All tiers reference */}
            <div className="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-5">All tiers</p>
              <div className="space-y-3">
                {TIERS.map(t => (
                  <div
                    key={t.name}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all ${
                      result.tier.name === t.name
                        ? 'bg-[#444833] text-white'
                        : 'bg-white border border-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {result.tier.name === t.name && (
                        <svg className="w-4 h-4 text-white/70 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className={`text-sm font-semibold ${result.tier.name === t.name ? 'text-white' : ''}`}>{t.name}</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className={`text-xs hidden sm:block ${result.tier.name === t.name ? 'text-white/60' : 'text-gray-400'}`}>
                        {t.maxTryons === Infinity ? '6,001+' : `up to ${t.maxTryons.toLocaleString()}`} try-ons/mo
                      </span>
                      <span className={`text-sm font-bold tabular-nums ${result.tier.name === t.name ? 'text-white' : 'text-gray-900'}`}>
                        {t.monthly !== null ? `£${t.monthly.toLocaleString()}/mo` : 'Custom'}
                      </span>
                      <a
                        href={SHOPIFY_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                          result.tier.name === t.name
                            ? 'bg-white text-[#444833] hover:bg-gray-100'
                            : 'border border-gray-200 text-gray-600 hover:border-[#444833] hover:text-[#444833]'
                        }`}
                      >
                        Install
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to pricing
          </Link>
        </div>
      </div>
    </div>
  );
}
