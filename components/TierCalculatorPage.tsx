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

// Visitor slider: log-scale steps across 1k–500k
const VISITOR_STEPS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 30000, 50000,
  75000, 100000, 150000, 200000, 300000, 500000,
];

// Orders slider: log-scale steps across 10–10000/mo
const ORDER_STEPS = [
  10, 20, 30, 50, 75, 100, 150, 200, 300, 500,
  750, 1000, 1500, 2000, 3000, 5000, 7500, 10000,
];

const AOV_MIN = 25;
const AOV_MAX = 1000;
const AOV_STEP = 25;

const SHOPIFY_APP_URL = 'https://apps.shopify.com/rendered-fits-virtual-try-on';
const CALENDLY_URL = 'https://calendly.com/mail-renderedfits/15-minute-meeting';

type Mode = 'visitors' | 'orders' | 'both';

function getTier(tryons: number) {
  return TIERS.find(t => tryons <= t.maxTryons) ?? TIERS[TIERS.length - 1];
}

function tryonsFromVisitors(v: number) { return v * 0.07; }
function tryonsFromOrders(o: number)   { return o * (0.07 / 0.015); } // = orders × 4.667

function fmtVisitors(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}k`;
  return v.toString();
}

function fmtOrders(o: number) {
  if (o >= 1000) return `${(o / 1000).toFixed(1)}k`;
  return o.toLocaleString('en-GB');
}


function SliderTrack({
  value, min, max, step, onChange, label, displayValue, rangeMin, rangeMax,
}: {
  value: number; min: number; max: number; step: number;
  onChange: (v: number) => void;
  label: string; displayValue: React.ReactNode;
  rangeMin: string; rangeMax: string;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-2xl font-black text-[#444833]">{displayValue}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #444833 ${pct}%, #e5e7eb ${pct}%)`,
        }}
      />
      <div className="flex justify-between mt-1.5 text-xs text-gray-400">
        <span>{rangeMin}</span>
        <span>{rangeMax}</span>
      </div>
    </div>
  );
}

function StepSliderTrack({
  idx, steps, onChange, label, displayValue,
}: {
  idx: number; steps: number[];
  onChange: (i: number) => void;
  label: string; displayValue: React.ReactNode;
}) {
  const pct = (idx / (steps.length - 1)) * 100;
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="text-sm font-semibold text-gray-700">{label}</label>
        <span className="text-2xl font-black text-[#444833]">{displayValue}</span>
      </div>
      <input
        type="range"
        min={0}
        max={steps.length - 1}
        step={1}
        value={idx}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer"
        style={{
          background: `linear-gradient(to right, #444833 ${pct}%, #e5e7eb ${pct}%)`,
        }}
      />
      <div className="flex justify-between mt-1.5 text-xs text-gray-400">
        <span>{fmtVisitors(steps[0])}</span>
        <span>{fmtVisitors(steps[steps.length - 1])}</span>
      </div>
    </div>
  );
}

export default function TierCalculatorPage() {
  const [mode, setMode] = React.useState<Mode>('visitors');
  const [visitorIdx, setVisitorIdx] = React.useState(8);  // ~30k
  const [orderIdx, setOrderIdx]     = React.useState(9);  // ~500
  const [aov, setAov]               = React.useState(150);
  const [isAnnual, setIsAnnual]     = React.useState(false);

  const result = useMemo(() => {
    const v = VISITOR_STEPS[visitorIdx];
    const o = ORDER_STEPS[orderIdx];

    let tryons: number;
    if (mode === 'visitors') {
      tryons = tryonsFromVisitors(v);
    } else if (mode === 'orders') {
      tryons = tryonsFromOrders(o);
    } else {
      tryons = (tryonsFromVisitors(v) + tryonsFromOrders(o)) / 2;
    }
    tryons = Math.round(tryons);

    const tier = getTier(tryons);

    // Annual: 10 months (2 months free); monthly: × 12
    const annualCost = tier.monthly !== null
      ? (isAnnual ? tier.monthly * 10 : tier.monthly * 12)
      : 0;

    return { tryons, tier, annualCost, monthlyCost: tier.monthly };
  }, [mode, visitorIdx, orderIdx, aov, isAnnual]);

  const isEnterprise = result.tier.name === 'Enterprise';
  const tierIndex = TIERS.findIndex(t => t.name === result.tier.name);

  const modeTab = (m: Mode, label: string) => (
    <button
      onClick={() => setMode(m)}
      className={`flex-1 py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
        mode === m
          ? 'bg-[#444833] text-white shadow-sm'
          : 'text-gray-500 hover:text-gray-700'
      }`}
    >
      {label}
    </button>
  );

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
            Adjust the sliders to find which tier suits your shop.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-6">

        {/* Inputs card */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-base font-bold text-gray-900">Your store details</h2>
          </div>

          {/* Mode toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1 mb-7">
            {modeTab('visitors', 'I know my visitors')}
            {modeTab('orders',   'I know my orders')}
            {modeTab('both',     'I know both')}
          </div>

          <div className="space-y-8">
            {/* Visitor slider */}
            {(mode === 'visitors' || mode === 'both') && (
              <StepSliderTrack
                idx={visitorIdx}
                steps={VISITOR_STEPS}
                onChange={setVisitorIdx}
                label="Monthly unique visitors"
                displayValue={fmtVisitors(VISITOR_STEPS[visitorIdx])}
              />
            )}

            {/* Orders slider */}
            {(mode === 'orders' || mode === 'both') && (
              <div>
                <div className="flex justify-between items-baseline mb-3">
                  <label className="text-sm font-semibold text-gray-700">Monthly orders</label>
                  <span className="text-2xl font-black text-[#444833]">{fmtOrders(ORDER_STEPS[orderIdx])}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={ORDER_STEPS.length - 1}
                  step={1}
                  value={orderIdx}
                  onChange={e => setOrderIdx(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #444833 ${(orderIdx / (ORDER_STEPS.length - 1)) * 100}%, #e5e7eb ${(orderIdx / (ORDER_STEPS.length - 1)) * 100}%)`,
                  }}
                />
                <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                  <span>10</span>
                  <span>10k</span>
                </div>
              </div>
            )}

            {/* "Both" blended note */}
            {mode === 'both' && (
              <p className="text-xs text-gray-400 -mt-3">
                Using the average of both estimates.
              </p>
            )}

            {/* AOV slider — always shown */}
            <SliderTrack
              value={aov}
              min={AOV_MIN}
              max={AOV_MAX}
              step={AOV_STEP}
              onChange={setAov}
              label="Average order value"
              displayValue={`£${aov}`}
              rangeMin="£25"
              rangeMax="£1,000"
            />
          </div>
        </div>

        {/* Recommended tier card */}
        <div className="rounded-2xl bg-[#444833] p-6 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">
            Recommended tier
          </p>

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

          {/* Tier progress bar */}
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
            <div className="inline-flex items-center gap-1 bg-black/20 rounded-full px-1.5 py-1.5 mb-4">
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

          {!isEnterprise && (
            <p className="text-white/60 text-sm mb-5">
              {isAnnual
                ? `£${result.annualCost.toLocaleString()} billed annually`
                : `£${result.annualCost.toLocaleString()} billed monthly`}
            </p>
          )}

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
