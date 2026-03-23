/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/* Icon paths from Figma vector proportions */
const BoostSalesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M14 10h4l2 4-4 4h-2a8 8 0 000 16h2l4 4-2 4h-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M20 12c0-2.21 1.79-4 4-4s4 1.79 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 24h32M24 8v32" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 16l4-4 4 4M28 32l4-4 4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SustainabilityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 8C15.16 8 8 15.16 8 24s7.16 16 16 16 16-7.16 16-16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M32 8c0 0-2 6-8 8s-8 8-8 8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M40 16c-2 0-10 4-10 14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M30 10l10 6-6 10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ReduceReturnsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="16" width="36" height="28" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M6 24h36" stroke="#fff" strokeWidth="2" />
    <path d="M16 8h16" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 8v8M36 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 34l4-4 4 4M22 30v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const IncreaseAOVIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 40h6V28H8zM21 40h6V20h-6zM34 40h6V12h-6z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M10 20l8-8 8 6 12-14" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M34 4h6v6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CustomerAcquisitionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="17" cy="16" r="6" stroke="#fff" strokeWidth="2" />
    <circle cx="31" cy="16" r="6" stroke="#fff" strokeWidth="2" />
    <path d="M4 40c0-7.18 5.82-13 13-13h14c7.18 0 13 5.82 13 13" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const StudioBackgroundIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="12" width="40" height="28" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M4 20h40" stroke="#fff" strokeWidth="2" />
    <path d="M12 12V8M36 12V8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="32" r="5" stroke="#fff" strokeWidth="2" />
  </svg>
);

const AdvancedAnalyticsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="28" width="8" height="12" rx="1" stroke="#fff" strokeWidth="2" />
    <rect x="20" y="20" width="8" height="20" rx="1" stroke="#fff" strokeWidth="2" />
    <rect x="34" y="10" width="8" height="30" rx="1" stroke="#fff" strokeWidth="2" />
    <path d="M10 22l10-10 10 8 10-16" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CompetitiveEdgeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6l4.5 9 9.9 1.4-7.2 7 1.7 9.9L24 28.8l-8.9 4.6 1.7-9.9-7.2-7 9.9-1.4z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 26l4 4 8-9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const OngoingSupportIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="32" rx="2" stroke="#fff" strokeWidth="2" />
    <path d="M6 18h36" stroke="#fff" strokeWidth="2" />
    <path d="M14 8V6M34 8V6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <path d="M14 26h12M14 32h8" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    <circle cx="36" cy="34" r="7" fill="#2e3a08" stroke="#fff" strokeWidth="2" />
    <path d="M33 34l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const row1 = [
  { title: 'Boost Sales', Icon: BoostSalesIcon },
  { title: 'Sustainability', Icon: SustainabilityIcon },
  { title: 'Reduce Returns', Icon: ReduceReturnsIcon },
  { title: 'Increase AOV', Icon: IncreaseAOVIcon },
];

const row2 = [
  { title: 'Customer\nAcquisition', Icon: CustomerAcquisitionIcon },
  { title: 'Studio Background', Icon: StudioBackgroundIcon },
  { title: 'Advanced analytics', Icon: AdvancedAnalyticsIcon },
  { title: 'Competitive Edge', Icon: CompetitiveEdgeIcon },
  { title: 'Committed to on-going updates and support', Icon: OngoingSupportIcon },
];

const BenefitCell: React.FC<{ title: string; Icon: React.FC }> = ({ title, Icon }) => (
  <div style={{
    width: 256,
    minHeight: 232,
    background: 'rgba(255,255,255,0.05)',
    border: '1px solid rgba(255,255,255,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexShrink: 0,
    marginRight: -1,
  }}>
    {/* Icon area — 72×72 padded container */}
    <div style={{ padding: 12, width: 72, height: 72, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Icon />
    </div>
    {/* Label */}
    <div style={{ padding: '24px', width: '100%' }}>
      <span style={{
        fontFamily: 'Inter Tight, Inter, sans-serif',
        fontWeight: 500,
        fontSize: 24,
        lineHeight: '32px',
        color: 'rgba(255,255,255,0.9)',
        whiteSpace: 'pre-line',
        display: 'block',
      }}>
        {title}
      </span>
    </div>
  </div>
);

const BenefitsSection: React.FC = () => (
  <div className="relative overflow-hidden" style={{
    background: 'linear-gradient(91.71deg, #444833 2.65%, #181E01 98.8%)',
    minHeight: 900,
  }}>
    {/* Logo rectangle top-left */}
    <div className="absolute top-0 left-0 z-20 flex items-center px-8" style={{
      width: 346, height: 104,
      background: 'rgba(255,255,255,0.15)',
    }}>
      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.08em' }}>
        RENDERED FITS™
      </span>
    </div>

    {/* Horizontal rule below logo */}
    <div className="absolute inset-x-0" style={{ top: 101, borderTop: '1px solid #B9BCAC' }} />

    {/* Vertical separator right of logo area */}
    <div className="absolute" style={{ left: 322, top: 0, height: 101, borderLeft: '1px solid #B9BCAC' }} />

    {/* Models photo — right side, behind content */}
    <div className="absolute inset-y-0 right-0" style={{ width: '45%' }}>
      <img
        src="/result-images/Website Design -4.png"
        alt="Virtual try-on models"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      {/* Gradient fade from left */}
      <div className="absolute inset-y-0 left-0" style={{ width: '50%', background: 'linear-gradient(to right, #181E01, transparent)' }} />
    </div>

    {/* Bottom gradient overlay */}
    <div className="absolute inset-x-0 bottom-0" style={{ height: 463, background: 'linear-gradient(180deg, rgba(25,31,2,0) 0%, #1D2206 100%)' }} />

    {/* Content */}
    <div className="relative z-10" style={{ padding: '0 0 0 0' }}>

      {/* Headline */}
      <h2 style={{
        fontFamily: 'Jost, sans-serif',
        fontWeight: 500,
        fontSize: 'clamp(42px, 4.6vw, 74px)',
        lineHeight: '100%',
        color: '#FFFFFF',
        position: 'relative',
        padding: '232px 0 0 40px',
        marginBottom: 0,
        maxWidth: 929,
      }}>
        Benefits <span style={{ fontWeight: 400 }}>of our Virtual Try-on</span>
      </h2>

      {/* Benefit grid rows */}
      <div style={{ marginTop: 0, paddingBottom: 0 }}>
        {/* Row 1 */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(185,188,172,0.4)', marginTop: 32 }}>
          {row1.map((b) => (
            <BenefitCell key={b.title} title={b.title} Icon={b.Icon} />
          ))}
        </div>

        {/* Row 2 */}
        <div style={{ display: 'flex', alignItems: 'stretch', borderTop: '1px solid rgba(185,188,172,0.4)' }}>
          {row2.map((b) => (
            <BenefitCell key={b.title} title={b.title} Icon={b.Icon} />
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default BenefitsSection;
