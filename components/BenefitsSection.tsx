/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

/*
 * Icons from exact Figma SVG paths (benefits.txt).
 * Each icon uses a 48×48 viewBox matching the Figma "Frame" containers.
 */

/* Boost Sales — price-tag icon */
const BoostSalesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M28 4H16L4 16V28L20 44L44 20L28 4Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="14" cy="14" r="2" fill="white"/>
  </svg>
);

/* Sustainability — leaf/recycle */
const SustainabilityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6C14 6 6 14 6 24C6 34 14 42 24 42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M24 6C34 6 42 14 42 24" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M30 18C30 18 28 28 18 32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M42 18L36 24L42 30" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Reduce Returns — box with return arrow */
const ReduceReturnsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    {/* box body */}
    <path d="M6 18H42V44H6V18Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* box top flap */}
    <path d="M6 18L16 4H32L42 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    {/* center divider */}
    <path d="M24 18V4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* Increase AOV — bar chart with up arrow */
const IncreaseAOVIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M8 40H16V28H8V40Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M20 40H28V20H20V40Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M32 40H40V12H32V40Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M10 22L19 13L28 20L38 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M34 6H42V14" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Customer Acquisition — two people */
const CustomerAcquisitionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <circle cx="17" cy="16" r="6" stroke="white" strokeWidth="2"/>
    <circle cx="31" cy="16" r="6" stroke="white" strokeWidth="2"/>
    <path d="M4 42C4 34 9.82 27 17 27H31C38.18 27 44 34 44 42" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

/* Studio Background — panoramic frame */
const StudioBackgroundIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="4" y="6" width="40" height="36" rx="1" stroke="white" strokeWidth="2"/>
    <path d="M4 6L20 24L28 16L38 28L44 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="34" cy="15" r="3" stroke="white" strokeWidth="2"/>
  </svg>
);

/* Advanced Analytics — bar chart */
const AdvancedAnalyticsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M6 34H14V42H6V34Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M20 26H28V42H20V26Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M34 14H42V42H34V14Z" stroke="white" strokeWidth="2" strokeLinecap="square"/>
    <path d="M10 28L19 18L28 24L38 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Competitive Edge — star/medal */
const CompetitiveEdgeIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <path d="M24 6L28.5 17H40L30.5 23.5L34 35L24 28L14 35L17.5 23.5L8 17H19.5L24 6Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M18 28L22 32L30 23" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* Committed to ongoing updates — calendar with check */
const OngoingSupportIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <rect x="6" y="8" width="36" height="34" rx="1" stroke="white" strokeWidth="2"/>
    <path d="M6 18H42" stroke="white" strokeWidth="2"/>
    <path d="M16 6V10M32 6V10" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 30H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M15 36H22" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="36" cy="36" r="8" fill="#2e3a08" stroke="white" strokeWidth="2"/>
    <path d="M33 36L35 38L40 33" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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

/* Figma: each cell = 256×232px, icon container 72×72 (12px padding + 48×48 frame), label 24px padding, font Inter Tight 24/32 */
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
    {/* Icon area — 72×72 with 12px padding = 48×48 icon */}
    <div style={{ width: 72, height: 72, padding: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
      <Icon />
    </div>
    {/* Label — 24px padding, Inter Tight 500 24px/32px */}
    <div style={{ padding: 24, width: '100%', boxSizing: 'border-box' }}>
      <span style={{
        fontFamily: '"Inter Tight", Inter, sans-serif',
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
  /* Figma: 1600×900, gradient #444833→#181E01, models photo right side */
  <div style={{
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(91.71deg, #444833 2.65%, #181E01 98.8%)',
    minHeight: 900,
  }}>
    {/* Logo box — same as hero: x=-25,y=-4, w=346,h=104 */}
    <div style={{
      position: 'absolute', top: -4, left: -25, width: 346, height: 104,
      background: 'rgba(255,255,255,0.15)',
      display: 'flex', alignItems: 'center', paddingLeft: 58,
      zIndex: 10,
    }}>
      <span style={{ fontFamily: 'Jost, sans-serif', fontWeight: 700, fontSize: 18, color: '#fff', letterSpacing: '0.08em' }}>
        RENDERED FITS™
      </span>
    </div>

    {/* Horizontal rule below logo: y=101 */}
    <div style={{ position: 'absolute', left: 0, right: 0, top: 101, borderTop: '1px solid #B9BCAC', pointerEvents: 'none' }} />
    {/* Short vertical rule right of logo: x=322, h=101 */}
    <div style={{ position: 'absolute', left: 322, top: 0, height: 101, borderLeft: '1px solid #B9BCAC', pointerEvents: 'none' }} />

    {/* Models photo — Figma: right side, w=1599, mirrored, covers right portion */}
    <div style={{ position: 'absolute', top: 0, right: 0, width: '45%', height: '100%' }}>
      <img
        src="/result-images/Website Design -4.png"
        alt="Virtual try-on models"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
      />
      {/* Gradient fade from left edge of photo into bg */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, #181E01 0%, rgba(24,30,1,0.6) 40%, transparent 100%)',
      }} />
    </div>

    {/* Bottom gradient overlay — Figma: y=437, h=463 */}
    <div style={{
      position: 'absolute', left: 0, right: 0, bottom: 0, height: 463,
      background: 'linear-gradient(180deg, rgba(25,31,2,0) 0%, #1D2206 100%)',
      pointerEvents: 'none',
    }} />

    {/* Content */}
    <div style={{ position: 'relative', zIndex: 5 }}>

      {/* Headline — Figma: top=232, left≈119, w=929, font Jost 500 74px */}
      <h2 style={{
        fontFamily: 'Jost, sans-serif',
        fontWeight: 500,
        fontSize: 'clamp(40px, 4.625vw, 74px)',
        lineHeight: '100%',
        color: '#FFFFFF',
        margin: 0,
        padding: '232px 0 0 40px',
        maxWidth: 929,
      }}>
        <strong>Benefits</strong>{' '}
        <span style={{ fontWeight: 400 }}>of our Virtual Try-on</span>
      </h2>

      {/* Benefit grid — Figma: row1 y=437, row2 y=668, cells 256×232 */}
      <div style={{ marginTop: 32 }}>
        {/* Row 1: 4 cells */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          borderTop: '1px solid rgba(185,188,172,0.4)',
          borderBottom: '1px solid rgba(185,188,172,0.4)',
        }}>
          {row1.map((b) => (
            <BenefitCell key={b.title} title={b.title} Icon={b.Icon} />
          ))}
        </div>

        {/* Row 2: 5 cells */}
        <div style={{
          display: 'flex',
          alignItems: 'stretch',
          borderBottom: '1px solid rgba(185,188,172,0.4)',
        }}>
          {row2.map((b) => (
            <BenefitCell key={b.title} title={b.title} Icon={b.Icon} />
          ))}
        </div>
      </div>

    </div>
  </div>
);

export default BenefitsSection;
