/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import NotFoundPage from './NotFoundPage';

const SHOPIFY_APP_STORE_URL = 'https://apps.shopify.com/rendered-fits-virtual-try-on';
const CALENDLY_URL = 'https://calendly.com/mail-renderedfits/15-minute-meeting';
const HOME_URL = 'https://www.renderedfits.com/';

const ACCENT = '#444833';
const MODEL_IMG_V = 2; // bump when model face/body images are updated
const mv = (src: string) => `${src}?v=${MODEL_IMG_V}`;
const FRAME_HEIGHT = 640; // px — both left product frame and right widget share this height

interface TryOn {
  title: string;
  handle: string;
  price?: string | null;
  productImage: string;
  productImages: string[];
  tryOnImage: string;
  modelGender: 'women' | 'men';
  modelName?: string;
  customerImages: { face: string; body: string };
}

interface DemoManifest {
  slug: string;
  brandName: string;
  brandDomain: string;
  generatedOn: string;
  genderClassification: string;
  classificationConfidence: string;
  tryOns: TryOn[];
}

// ─── Animation state machine ──────────────────────────────────────────────────

type AnimState =
  | 'idle'
  | 'cursor_to_button'
  | 'click_button'
  | 'modal_open'
  | 'cursor_to_submit'
  | 'click_submit'
  | 'getting_dressed'
  | 'result';

const SEQUENCE: { s: AnimState; ms: number }[] = [
  { s: 'idle', ms: 1500 },               // extra pause so viewer sees the mock PDP
  { s: 'cursor_to_button', ms: 900 },
  { s: 'click_button', ms: 350 },
  { s: 'modal_open', ms: 1300 },
  { s: 'cursor_to_submit', ms: 800 },
  { s: 'click_submit', ms: 350 },
  { s: 'getting_dressed', ms: 3000 },    // 3-second loading frame
  { s: 'result', ms: 0 },
];

function useSequence(active: boolean): AnimState {
  const [state, setState] = useState<AnimState>('idle');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (!active) { setState('idle'); return; }
    let acc = 0;
    SEQUENCE.forEach(({ s, ms }, i) => {
      timers.current.push(setTimeout(() => setState(s), acc));
      if (i < SEQUENCE.length - 1) acc += ms;
    });
    return () => timers.current.forEach(clearTimeout);
  }, [active]);
  return state;
}

// ─── Cursor ───────────────────────────────────────────────────────────────────

const Cursor: React.FC<{ x: string; y: string; visible: boolean; clicking: boolean }> = ({ x, y, visible, clicking }) => (
  <AnimatePresence>
    {visible && (
      <motion.div
        className="absolute pointer-events-none z-50"
        initial={{ opacity: 0, left: x, top: y } as any}
        animate={{ opacity: 1, left: x, top: y, scale: clicking ? [1, 0.8, 1] : 1 } as any}
        exit={{ opacity: 0 }}
        transition={{ left: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
                      top: { type: 'tween', duration: 0.6, ease: 'easeInOut' },
                      scale: { duration: 0.25 } }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path d="M5 3L19 12L12 13L9 20L5 3Z" fill="black" stroke="white" strokeWidth="1" />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

const SparkleIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0l2.4 7.2L21.6 9.6 14.4 12l-2.4 9.6L9.6 12 2.4 9.6 9.6 7.2z" />
  </svg>
);

// ─── Rendered Fits widget (matched to FRAME_HEIGHT, larger model thumbs) ──────

const RFWidget: React.FC<{ tryOn: TryOn; highlightSubmit?: boolean; heightPx?: number }> = ({ tryOn, highlightSubmit = false, heightPx = FRAME_HEIGHT }) => {
  const arimo = { fontFamily: 'Arimo, sans-serif' } as React.CSSProperties;
  return (
    <div className="w-full bg-white border border-neutral-200 shadow-sm overflow-hidden flex flex-col" style={{ maxWidth: 400, height: heightPx }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-neutral-100 shrink-0">
        <div className="flex items-center gap-1.5 text-sm text-neutral-700" style={arimo}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7" />
          </svg>
          My looks
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-medium px-2 py-1 bg-neutral-900 text-white rounded" style={arimo}>10 credits left</span>
          <span className="text-neutral-400 text-lg leading-none">×</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-5 pb-3 flex-1 flex flex-col overflow-hidden">
        <h3 className="text-xl mb-4" style={{ ...arimo, fontWeight: 600, letterSpacing: '0.02em', color: '#1a1f2e' }}>
          TRY IT ON, VIRTUALLY
        </h3>

        <div className="text-xs text-neutral-800 mb-2" style={arimo}>Face photo</div>
        <div className="bg-neutral-100 mb-4 flex items-center gap-3 p-3 overflow-hidden">
          <div className="w-24 h-28 bg-white overflow-hidden shrink-0">
            <img src={mv(tryOn.customerImages.face)} alt="customer face" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-neutral-800" style={arimo}>Uploaded</div>
            <div className="text-[10px] text-neutral-500 leading-snug" style={arimo}>Format: png, jpg, heic<br/>Max file size: 25 MB</div>
          </div>
        </div>

        <div className="text-xs text-neutral-800 mb-2" style={arimo}>Full body photo</div>
        <div className="bg-neutral-100 mb-4 flex items-center gap-3 p-3 overflow-hidden">
          <div className="w-24 h-28 bg-white overflow-hidden shrink-0">
            <img src={mv(tryOn.customerImages.body)} alt="customer body" className="w-full h-full object-cover" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium text-neutral-800" style={arimo}>Uploaded</div>
            <div className="text-[10px] text-neutral-500 leading-snug" style={arimo}>Format: png, jpg, heic<br/>Max file size: 25 MB</div>
          </div>
        </div>

        <p className="text-[10px] text-neutral-500 leading-relaxed mt-auto mb-0" style={arimo}>
          By uploading your photo, you agree to our <span className="underline">Terms & Conditions</span> and <span className="underline">Privacy Policy</span>.
          Your image is never permanently stored.
        </p>
      </div>

      {/* Submit button */}
      <button
        className={`w-full py-4 flex items-center justify-center gap-2 text-white text-sm shrink-0 transition-transform ${highlightSubmit ? 'scale-[0.98]' : ''}`}
        style={{ backgroundColor: ACCENT, ...arimo }}
      >
        <SparkleIcon className="text-white" /> Try on
      </button>
    </div>
  );
};

// ─── Getting dressed frame (lifted from existing demos) ───────────────────────

const GettingDressedFrame: React.FC = () => {
  const jost = { fontFamily: "'Jost', sans-serif" } as React.CSSProperties;
  return (
    <div className="absolute inset-0 bg-white flex flex-col" style={jost}>
      <div className="flex items-center h-12 px-4 border-b border-neutral-200 gap-2 shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#101828" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.5 2h11L21 7l-3 2-1-1v12H7V8L6 9 3 7l3.5-5z" />
        </svg>
        <span className="text-sm font-medium text-neutral-900">Fits</span>
        <span className="text-[11px] font-medium text-white px-2 py-0.5" style={{ backgroundColor: '#1E2939' }}>Rendered Fits</span>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
        <p className="text-2xl mb-8 uppercase tracking-[0.08em] text-neutral-900">GETTING DRESSED!</p>
        <img src="/hanger.jpg" alt="" className="w-20 h-20 object-contain mb-5" />
        <div className="flex gap-2 mb-8">
          <span className="w-2 h-2 rounded-full inline-block animate-bounce" style={{ backgroundColor: '#1E2939', animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full inline-block animate-bounce" style={{ backgroundColor: '#1E2939', animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full inline-block animate-bounce" style={{ backgroundColor: '#1E2939', animationDelay: '300ms' }} />
        </div>
        <div className="inline-flex items-center gap-1 px-2.5 h-7 bg-neutral-100 border border-neutral-200">
          <span className="text-[11px] text-neutral-900">Size: M</span>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#6A7282" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
        </div>
      </div>
      <div className="h-9 border-t border-neutral-200 bg-neutral-50 flex items-center justify-center gap-1.5 shrink-0">
        <span className="text-[11px] text-neutral-500">Powered by</span>
        <span className="text-[11px] font-bold text-neutral-900 tracking-wide">RENDERED FITS</span>
      </div>
    </div>
  );
};

// ─── Customer photo with hover-zoom popover ───────────────────────────────────

const CustomerPhoto: React.FC<{ src: string; label: string }> = ({ src, label }) => (
  <div className="relative group">
    <div className="w-20 h-28 bg-white border border-neutral-200 overflow-hidden cursor-zoom-in">
      <img src={src} alt={label} className="w-full h-full object-cover" />
    </div>
    <div className="absolute z-50 left-1/2 -translate-x-1/2 top-full mt-2 w-56 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity duration-200 shadow-2xl">
      <div className="bg-white border border-neutral-200 overflow-hidden">
        <img src={src} alt="" className="w-full h-auto object-cover" />
        <div className="text-[10px] tracking-[0.2em] uppercase text-neutral-500 text-center py-2 bg-neutral-50" style={{ fontFamily: 'Arimo, sans-serif' }}>{label}</div>
      </div>
    </div>
  </div>
);

// ─── Workflow modal ───────────────────────────────────────────────────────────

const WorkflowModal: React.FC<{ tryOn: TryOn; brandName: string; onClose: () => void }> = ({ tryOn, brandName, onClose }) => {
  const state = useSequence(true);
  const arimo = { fontFamily: 'Arimo, sans-serif' } as React.CSSProperties;

  const cursorPos = (() => {
    switch (state) {
      case 'cursor_to_button': case 'click_button': return { x: 72, y: 80 };
      case 'cursor_to_submit': case 'click_submit': return { x: 50, y: 90 };
      default: return { x: 8, y: 92 };
    }
  })();
  const cursorVisible = ['cursor_to_button','click_button','cursor_to_submit','click_submit'].includes(state);
  const cursorClicking = ['click_button','click_submit'].includes(state);

  const idx = SEQUENCE.findIndex(x => x.s === state);
  const widgetVisible = idx >= SEQUENCE.findIndex(x => x.s === 'modal_open') && idx < SEQUENCE.findIndex(x => x.s === 'getting_dressed');
  const showGettingDressed = state === 'getting_dressed';
  const showResult = state === 'result';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="relative w-full max-w-5xl bg-white shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
        style={{
          height: showResult ? 'min(92vh, 760px)' : undefined,
          aspectRatio: showResult ? undefined : '16/10',
          maxHeight: '92vh',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-[60] w-8 h-8 flex items-center justify-center bg-white/90 hover:bg-white text-neutral-700 text-lg leading-none"
          aria-label="Close demo"
        >×</button>

        {/* Mock PDP */}
        <div className="absolute inset-0 grid grid-cols-2 bg-white">
          <div className="relative bg-neutral-50 flex items-center justify-center p-6">
            <img src={tryOn.productImage} alt="" className="w-full h-full object-contain" />
          </div>
          <div className="p-8 sm:p-10 flex flex-col justify-center">
            <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-500 mb-2" style={arimo}>{brandName}</div>
            <h2 className="text-2xl sm:text-3xl leading-tight mb-3" style={{ ...arimo, fontWeight: 600 }}>{tryOn.title}</h2>
            <div className="text-lg text-neutral-800 mb-6" style={arimo}>{tryOn.price || '£89.00'}</div>
            <div className="flex gap-2 mb-6">
              {['XS','S','M','L'].map(sz => (
                <div key={sz} className={`w-10 h-10 flex items-center justify-center border text-xs ${sz==='M'?'border-neutral-900':'border-neutral-300 text-neutral-500'}`} style={arimo}>{sz}</div>
              ))}
            </div>
            <button className="w-full py-3 bg-neutral-900 text-white text-xs tracking-[0.2em] uppercase mb-3" style={arimo}>
              Add to bag
            </button>
            <button
              className="w-full py-3 border text-xs tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2"
              style={{
                borderColor: ACCENT,
                color: state === 'click_button' ? '#fff' : ACCENT,
                backgroundColor: state === 'click_button' ? ACCENT : 'transparent',
                ...arimo,
                transform: state === 'click_button' ? 'scale(0.98)' : 'none',
              }}
            >
              <SparkleIcon /> AI Try On
            </button>
            <p className="text-[10px] text-neutral-400 mt-3 tracking-wider uppercase" style={arimo}>Powered by Rendered Fits</p>
          </div>
        </div>

        {/* Widget overlay */}
        <AnimatePresence>
          {widgetVisible && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                <RFWidget tryOn={tryOn} highlightSubmit={state === 'click_submit'} heightPx={520} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Getting dressed */}
        <AnimatePresence>
          {showGettingDressed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <GettingDressedFrame />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {showResult && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-white flex"
            >
              {/* Image side — flex-grows to fill, image scales without crop */}
              <div className="flex-1 bg-neutral-50 flex items-center justify-center p-4 min-w-0 min-h-0 overflow-hidden">
                <img
                  src={tryOn.tryOnImage}
                  alt=""
                  className="object-contain"
                  style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto' }}
                />
              </div>
              {/* Text side — fixed width, always fully visible */}
              <div className="w-[340px] shrink-0 p-6 flex flex-col h-full overflow-y-auto">
                <div className="text-[10px] tracking-[0.25em] uppercase mb-2 shrink-0" style={{ color: ACCENT, ...arimo }}>Your try-on</div>
                <h3 className="text-xl leading-tight mb-3 shrink-0" style={{ ...arimo, fontWeight: 600 }}>{tryOn.title}</h3>
                <p className="text-[13px] text-neutral-700 leading-relaxed mb-5 shrink-0" style={arimo}>
                  Allow customers to see themselves wearing your products before they purchase, within 10–20s.
                  Never redirected off your site. Simple install and setup.
                </p>
                <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-2 shrink-0" style={arimo}>
                  Customer photos — hover to enlarge
                </div>
                <div className="flex gap-3 mb-5 shrink-0">
                  <CustomerPhoto src={mv(tryOn.customerImages.face)} label="Face photo" />
                  <CustomerPhoto src={mv(tryOn.customerImages.body)} label="Body photo" />
                </div>
                <div className="flex flex-col gap-2 mt-auto pt-3 shrink-0">
                  <a
                    href={SHOPIFY_APP_STORE_URL} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2.5 text-white text-[10px] tracking-[0.2em] uppercase transition-opacity hover:opacity-90"
                    style={{ backgroundColor: ACCENT, ...arimo }}
                  >
                    Install on your store
                  </a>
                  <a
                    href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2.5 border text-[10px] tracking-[0.2em] uppercase"
                    style={{ borderColor: ACCENT, color: ACCENT, ...arimo }}
                  >
                    Book a 15-minute call
                  </a>
                  <button
                    onClick={onClose}
                    className="block w-full text-center px-4 py-2 text-[10px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900"
                    style={arimo}
                  >
                    Close demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Cursor x={`${cursorPos.x}%`} y={`${cursorPos.y}%`} visible={cursorVisible} clicking={cursorClicking} />
      </motion.div>
    </motion.div>
  );
};

// ─── Stats card ───────────────────────────────────────────────────────────────

const StatCard: React.FC<{ value: string; label: string; sub: string; delay: number }> = ({ value, label, sub, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
    transition={{ duration: 0.5, delay }}
    className="bg-white border border-neutral-200 p-8 text-center"
  >
    <div className="text-5xl sm:text-6xl mb-2" style={{ fontFamily: 'Arimo, sans-serif', fontWeight: 700, color: ACCENT }}>
      {value}
    </div>
    <div className="text-sm font-medium text-neutral-900 mb-2" style={{ fontFamily: 'Arimo, sans-serif' }}>{label}</div>
    <div className="text-xs text-neutral-500 leading-relaxed" style={{ fontFamily: 'Arimo, sans-serif' }}>{sub}</div>
  </motion.div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────

const AutoDemoPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [manifest, setManifest] = useState<DemoManifest | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeDemo, setActiveDemo] = useState<TryOn | null>(null);
  const [hoverProduct, setHoverProduct] = useState(false);

  useEffect(() => {
    if (!slug) { setNotFound(true); setLoading(false); return; }
    fetch(`/demos-data/${slug}.json`)
      .then(r => { if (!r.ok) throw new Error('not found'); return r.json(); })
      .then((m: DemoManifest) => { setManifest(m); setLoading(false); })
      .catch(() => { setNotFound(true); setLoading(false); });
  }, [slug]);

  useEffect(() => {
    if (activeDemo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [activeDemo]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fafaf7] flex items-center justify-center">
        <div className="text-neutral-500 text-sm tracking-wider uppercase" style={{ fontFamily: 'Arimo, sans-serif' }}>Loading…</div>
      </div>
    );
  }
  if (notFound || !manifest || manifest.tryOns.length === 0) return <NotFoundPage />;

  const t = manifest.tryOns[0];
  const arimo = { fontFamily: 'Arimo, sans-serif' } as React.CSSProperties;

  return (
    <div className="min-h-screen bg-[#fafaf7] text-neutral-900" style={arimo}>
      <div className="max-w-6xl mx-auto px-6 py-14 sm:py-20">

        <motion.header
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05] mb-5" style={{ ...arimo, fontWeight: 700 }}>
            {manifest.brandName} × Rendered Fits
          </h1>
          <p className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed" style={arimo}>
            Bringing the in-store dressing room experience online with industry-leading virtual try-on.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a href={SHOPIFY_APP_STORE_URL} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center px-7 py-3.5 text-white text-sm tracking-wider uppercase transition-opacity hover:opacity-90"
               style={{ ...arimo, backgroundColor: ACCENT }}>
              Install on Shopify
            </a>
            <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center justify-center px-7 py-3.5 border text-sm tracking-wider uppercase transition-colors"
               style={{ ...arimo, borderColor: ACCENT, color: ACCENT }}>
              Book a 15-minute call
            </a>
          </div>
        </motion.header>

        {/* Demo: product (left) + RF widget (right) — height-matched */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center lg:items-start justify-center mb-6">
          <motion.div
            initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative bg-neutral-100 overflow-hidden cursor-pointer w-full max-w-[480px]"
            style={{ height: FRAME_HEIGHT }}
            onClick={() => setActiveDemo(t)}
            onMouseEnter={() => setHoverProduct(true)}
            onMouseLeave={() => setHoverProduct(false)}
          >
            <img src={t.productImage} alt="" className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500 ${hoverProduct ? 'opacity-0' : 'opacity-100'}`} />
            <img src={t.tryOnImage} alt="" className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-500 ${hoverProduct ? 'opacity-100' : 'opacity-0'}`} />
            <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 text-[10px] tracking-[0.2em] uppercase text-neutral-700" style={arimo}>
              {hoverProduct ? 'Try-on result' : 'Product'}
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transition-opacity duration-300" style={{ opacity: hoverProduct ? 1 : 0.85 }}>
              <div className="px-5 py-2.5 text-white text-[10px] tracking-[0.25em] uppercase flex items-center gap-2 shadow-lg" style={{ ...arimo, backgroundColor: ACCENT }}>
                <SparkleIcon /> See full demo
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="cursor-pointer"
            onClick={() => setActiveDemo(t)}
          >
            <RFWidget tryOn={t} heightPx={FRAME_HEIGHT} />
            <p className="text-center text-[10px] tracking-[0.25em] uppercase text-neutral-500 mt-3" style={arimo}>
              Live customer view — tap to see the workflow
            </p>
          </motion.div>
        </div>

        <p className="text-center text-sm text-neutral-500 mb-16 sm:mb-20" style={arimo}>
          Hover the product to peek the result. Tap either side to see the full customer workflow.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-3" style={arimo}>What this unlocks</div>
          <h2 className="text-3xl sm:text-4xl tracking-tight" style={{ ...arimo, fontWeight: 600 }}>
            Why virtual try-on works.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-10">
          <StatCard value="+20%" label="Conversion uplift" sub="Shoppers who use virtual try-on convert at ~20% higher than those who don't." delay={0} />
          <StatCard value="20–30%" label="Fewer returns" sub="Returns drop sharply when customers see the fit before they buy." delay={0.1} />
          <StatCard value="↑↑" label="Higher AOV & LTV" sub="Try-on encourages bigger baskets and brings customers back more often." delay={0.2} />
        </div>

        <div className="text-center mb-20">
          <a href={HOME_URL} target="_blank" rel="noopener noreferrer"
             className="inline-flex items-center gap-2 text-sm tracking-wider uppercase underline-offset-4 hover:underline"
             style={{ ...arimo, color: ACCENT }}>
            Learn more →
          </a>
        </div>

        <footer className="pt-8 border-t border-neutral-200 text-center text-xs text-neutral-500 leading-relaxed" style={arimo}>
          Generated for {manifest.brandName} on {manifest.generatedOn}.
          Reply to the email if you'd like a fresh set with different products.
          <div className="mt-3">
            <a href={SHOPIFY_APP_STORE_URL} target="_blank" rel="noopener noreferrer"
               className="tracking-[0.2em] uppercase hover:text-neutral-900 transition-colors"
               style={{ color: ACCENT }}>
              Powered by Rendered Fits
            </a>
          </div>
        </footer>
      </div>

      <AnimatePresence>
        {activeDemo && (
          <WorkflowModal tryOn={activeDemo} brandName={manifest.brandName} onClose={() => setActiveDemo(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoDemoPage;
