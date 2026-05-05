import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { AsciiShader } from './AsciiShader';

const TIERS = [
  { name: 'Starter',      monthly: 249,  maxTryons: 1000  },
  { name: 'Growth',       monthly: 449,  maxTryons: 2000  },
  { name: 'Scale',        monthly: 749,  maxTryons: 3500  },
  { name: 'Professional', monthly: 1249, maxTryons: 6000  },
  { name: 'Enterprise',   monthly: null, maxTryons: Infinity },
];

// Visitor slider: log-scale steps so it feels natural across 1k–500k
const VISITOR_STEPS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 30000, 50000,
  75000, 100000, 150000, 200000, 300000, 500000,
];

// AOV slider: £25 steps from £25 to £1000
const AOV_MIN = 25;
const AOV_MAX = 1000;
const AOV_STEP = 25;

const SHOPIFY_APP_URL = 'https://apps.shopify.com/rendered-fits-virtual-try-on';
const CALENDLY_URL = 'https://calendly.com/mail-renderedfits/15-minute-meeting';

function getTier(tryons: number) {
  return TIERS.find(t => tryons <= t.maxTryons) ?? TIERS[TIERS.length - 1];
}

function fmtVisitors(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return v.toString();
}

function fmtGbp(n: number) {
  return '£' + Math.round(n).toLocaleString('en-GB');
}

export default function TierCalculatorPage() {
  const [visitorIdx, setVisitorIdx] = React.useState(8); // default ~30k
  const [aov, setAov] = React.useState(150);
  const [isAnnual, setIsAnnual] = React.useState(false);

  const visitors = VISITOR_STEPS[visitorIdx];

  const result = useMemo(() => {
    const tryons = Math.round(visitors * 0.07);
    const tier = getTier(tryons);

    // Conversion uplift: try-on users × 15% uplift × AOV × 12
    const conversionUplift = tryons * 0.15 * aov * 12;

    // Try-on converting orders (use ~10% conversion from try-on to purchase)
    const tryonConvertingOrders = tryons * 0.10;

    // Returns saving: 20% reduction on 2% baseline return rate × AOV × 12
    const returnsSaving = tryonConvertingOrders * 0.02 * 0.20 * aov * 12;

    // AOV uplift: try-on converting orders × 10% AOV increase × 12
    const aovUplift = tryonConvertingOrders * (aov * 0.10) * 12;

    const totalBenefit = conversionUplift + returnsSaving + aovUplift;

    // Annual cost: 10 months price (2 months free) when annual, else monthly × 12
    const annualCost = tier.monthly !== null
      ? (isAnnual ? tier.monthly * 10 : tier.monthly * 12)
      : 0;
    const monthlyCost = tier.monthly ?? null;

    return { tryons, tier, conversionUplift, returnsSaving, aovUplift, totalBenefit, annualCost, monthlyCost };
  }, [visitors, aov, isAnnual]);

  const isEnterprise = result.tier.name === 'Enterprise';

  // Progress percentage for tier indicator bar
  const tierIndex = TIERS.findIndex(t => t.name === result.tier.name);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <div
        className="relative overflow-hidden py-14 sm:py-20"
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
          <h1 className="text-3xl sm:text-5xl font-serif italic text-white mb-3 leading-tight">
            Which plan is right for you?
          </h1>
          <p className="text-white/60 text-base max-w-md mx-auto">
            Adjust the sliders — your recommended tier and ROI update live.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">

        {/* Sliders card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <h2 className="text-base font-bold text-gray-900 mb-7">Your store details</h2>

          {/* Visitor slider */}
          <div className="mb-8">
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-semibold text-gray-700">Monthly unique visitors</label>
              <span className="text-2xl font-black text-[#444833]">{fmtVisitors(visitors)}</span>
            </div>
            <input
              type="range"
              min={0}
              max={VISITOR_STEPS.length - 1}
              step={1}
              value={visitorIdx}
              onChange={e => setVisitorIdx(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #444833 ${(visitorIdx / (VISITOR_STEPS.length - 1)) * 100}%, #e5e7eb ${(visitorIdx / (VISITOR_STEPS.length - 1)) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1.5 text-xs text-gray-400">
              <span>1k</span>
              <span>500k</span>
            </div>
          </div>

          {/* AOV slider */}
          <div>
            <div className="flex justify-between items-baseline mb-3">
              <label className="text-sm font-semibold text-gray-700">Average order value</label>
              <span className="text-2xl font-black text-[#444833]">£{aov}</span>
            </div>
            <input
              type="range"
              min={AOV_MIN}
              max={AOV_MAX}
              step={AOV_STEP}
              value={aov}
              onChange={e => setAov(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #444833 ${((aov - AOV_MIN) / (AOV_MAX - AOV_MIN)) * 100}%, #e5e7eb ${((aov - AOV_MIN) / (AOV_MAX - AOV_MIN)) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-1.5 text-xs text-gray-400">
              <span>£25</span>
              <span>£1,000</span>
            </div>
          </div>
        </div>

        {/* Recommended tier card */}
        <div className="rounded-2xl bg-[#444833] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            Recommended tier
          </p>

          {/* Tier name + price */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <p className="text-4xl sm:text-5xl font-black text-white leading-none mb-2">
                {result.tier.name}
              </p>
              {isEnterprise ? (
                <p className="text-white/60 text-sm">Custom pricing — let's talk</p>
              ) : (
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="text-white/80 text-sm">
                    £{result.monthlyCost!.toLocaleString()}/mo
                  </p>
                  {isAnnual && (
                    <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                      2 months free
                    </span>
                  )}
                </div>
              )}
            </div>
            <div className="text-left sm:text-right shrink-0">
              <p className="text-3xl font-black text-white">{result.tryons.toLocaleString()}</p>
              <p className="text-white/50 text-xs">est. try-ons / month</p>
            </div>
          </div>

          {/* Tier progress dots */}
          <div className="flex items-center gap-1.5 mb-6">
            {TIERS.map((t, i) => (
              <div
                key={t.name}
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  i <= tierIndex ? 'bg-white' : 'bg-white/20'
                }`}
              />
            ))}
          </div>

          {/* Billing toggle */}
          {!isEnterprise && (
            <div className="inline-flex items-center gap-1 bg-black/20 rounded-full px-1.5 py-1.5 mb-5">
              <button
                onClick={() => setIsAnnual(false)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${!isAnnual ? 'bg-white text-[#444833]' : 'text-white/60 hover:text-white'}`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsAnnual(true)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 ${isAnnual ? 'bg-white text-[#444833]' : 'text-white/60 hover:text-white'}`}
              >
                Annual
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none ${isAnnual ? 'bg-[#444833] text-white' : 'bg-white/20 text-white'}`}>
                  2 months free
                </span>
              </button>
            </div>
          )}

          {/* Annual cost summary */}
          {!isEnterprise && (
            <p className="text-white/60 text-sm mb-5">
              {isAnnual
                ? `£${result.annualCost.toLocaleString()} billed annually`
                : `£${result.annualCost.toLocaleString()} billed monthly`}
            </p>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3">
            {isEnterprise ? (
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center bg-white text-[#444833] py-3 rounded-xl text-sm font-bold hover:bg-gray-100 transition-all"
              >
                Talk to the team
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
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center border border-white/30 text-white py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all"
            >
              Schedule a demo
            </a>
          </div>
        </div>

        {/* ROI card */}
        <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
            Estimated annual ROI
          </p>

          <div className="space-y-4">
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-gray-600">Conversion uplift</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmtGbp(result.conversionUplift)}</p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-gray-600">Returns saving</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmtGbp(result.returnsSaving)}</p>
            </div>
            <div className="border-t border-gray-100" />
            <div className="flex justify-between items-center gap-4">
              <p className="text-sm text-gray-600">AOV uplift</p>
              <p className="text-sm font-bold text-gray-900 tabular-nums shrink-0">{fmtGbp(result.aovUplift)}</p>
            </div>
            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between items-center gap-4">
                <p className="text-sm font-semibold text-gray-900">Total estimated annual benefit</p>
                <p className="text-sm font-black text-[#444833] tabular-nums shrink-0">{fmtGbp(result.totalBenefit)}</p>
              </div>
              {!isEnterprise && result.annualCost > 0 && (
                <div className="flex justify-between items-center gap-4">
                  <p className="text-sm text-gray-400">Annual subscription</p>
                  <p className="text-sm font-semibold text-gray-400 tabular-nums shrink-0">−{fmtGbp(result.annualCost)}</p>
                </div>
              )}
              {!isEnterprise && result.annualCost > 0 && (
                <div className="flex justify-between items-center gap-4 bg-gray-50 rounded-xl px-4 py-3 mt-1">
                  <p className="text-sm font-bold text-gray-900">Net annual return</p>
                  <p className="text-base font-black text-[#444833] tabular-nums shrink-0">
                    {fmtGbp(result.totalBenefit - result.annualCost)}
                  </p>
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
          <div className="space-y-2.5">
            {TIERS.map(t => {
              const isActive = result.tier.name === t.name;
              return (
                <div
                  key={t.name}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-[#444833] text-white shadow-md'
                      : 'bg-white border border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    {isActive && (
                      <svg className="w-3.5 h-3.5 text-white/70 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    <span className={`text-sm font-semibold truncate ${isActive ? 'text-white' : 'text-gray-800'}`}>
                      {t.name}
                    </span>
                    <span className={`text-xs hidden sm:block shrink-0 ${isActive ? 'text-white/50' : 'text-gray-400'}`}>
                      {t.maxTryons === Infinity ? '6,001+' : `≤ ${t.maxTryons.toLocaleString()}`} try-ons/mo
                    </span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className={`text-sm font-bold tabular-nums ${isActive ? 'text-white' : 'text-gray-900'}`}>
                      {t.monthly !== null ? `£${t.monthly.toLocaleString()}/mo` : 'Custom'}
                    </span>
                    {t.name === 'Enterprise' ? (
                      <a
                        href={CALENDLY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-white text-[#444833] hover:bg-gray-100'
                            : 'border border-gray-200 text-gray-600 hover:border-[#444833] hover:text-[#444833]'
                        }`}
                      >
                        Contact us
                      </a>
                    ) : (
                      <a
                        href={SHOPIFY_APP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
                          isActive
                            ? 'bg-white text-[#444833] hover:bg-gray-100'
                            : 'border border-gray-200 text-gray-600 hover:border-[#444833] hover:text-[#444833]'
                        }`}
                      >
                        Install
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Back link */}
        <div className="text-center pt-2 pb-6">
          <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
            ← Back to pricing
          </Link>
        </div>

      </div>

      {/* Slider thumb styling */}
      <style>{`
        input[type='range']::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #444833;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
        input[type='range']::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #444833;
          border: 3px solid white;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
