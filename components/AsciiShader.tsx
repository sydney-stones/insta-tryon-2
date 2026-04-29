import React, { useEffect, useRef } from 'react';

const CHAR_SETS = {
  standard: ' .,:;i1tfLCG08@',
  block: ' ░░▒▒▓▓█',
  minimal: '   .·∙•',
  fashion: ' +FITS+RFITS™RF',
  brand: ' RENDERED FITS™',
} as const;

const BRAND_WORDMARK = ' RENDERED FITS ';

type ShaderMode =
  | 'flow'
  | 'noise'
  | 'scan'
  | 'radial'
  | 'vortex'
  | 'magnetic'
  | 'cellular'
  | 'warp'
  | 'lightning'
  | 'depth';

type CharSet = keyof typeof CHAR_SETS;

interface AsciiShaderProps {
  density?: number;
  opacity?: number;
  mode?: ShaderMode;
  charSet?: CharSet;
  className?: string;
}

function hash(x: number, y: number, s: number) {
  const n = Math.sin(x * 127.1 + y * 311.7 + s * 74.3) * 43758.5453;
  return n - Math.floor(n);
}

function noise(x: number, y: number, t: number) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(ix, iy, t);
  const b = hash(ix + 1, iy, t);
  const c = hash(ix, iy + 1, t);
  const d = hash(ix + 1, iy + 1, t);
  return a + (b - a) * ux + (c - a) * uy + (d - b - c + a) * ux * uy;
}

function fbm(x: number, y: number, t: number, oct = 4) {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < oct; i += 1) {
    v += amp * noise(x * freq, y * freq, t);
    amp *= 0.5;
    freq *= 2.1;
  }
  return v;
}

export function AsciiShader({
  density = 16,
  opacity = 0.18,
  mode = 'depth',
  charSet = 'block',
  className,
}: AsciiShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999, px: -9999, py: -9999, vx: 0, vy: 0 });
  const smoothMouseRef = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = 0;
    let height = 0;
    let time = 0;
    let cols = 1;
    let rows = 1;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouse = mouseRef.current;
      mouse.px = mouse.x;
      mouse.py = mouse.y;
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
      mouse.vx = mouse.x - mouse.px;
      mouse.vy = mouse.y - mouse.py;
    };

    const onPointerLeave = () => {
      const mouse = mouseRef.current;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const getMouseInfluence = (col: number, row: number) => {
      const mouse = mouseRef.current;
      const smoothMouse = smoothMouseRef.current;
      smoothMouse.x += (mouse.x - smoothMouse.x) * 0.08;
      smoothMouse.y += (mouse.y - smoothMouse.y) * 0.08;

      const cx = col * density * 0.62 + density * 0.31;
      const cy = row * density + density * 0.5;
      const dx = cx - smoothMouse.x;
      const dy = cy - smoothMouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 140;
      if (dist > radius || mouse.x < 0) return { influence: 0, angle: 0 };

      const falloff = 1 - dist / radius;
      const smooth = falloff * falloff * (3 - 2 * falloff);
      const speed = Math.min(Math.sqrt(mouse.vx ** 2 + mouse.vy ** 2) / 30, 1);
      return {
        influence: smooth * (0.5 + speed * 0.5),
        angle: Math.atan2(dy, dx),
      };
    };

    const getBrightness = (col: number, row: number) => {
      const nx = col / cols;
      const ny = row / rows;
      const { influence, angle } = getMouseInfluence(col, row);
      const ripple = influence * 0.18;
      const mx = nx + Math.cos(angle + Math.PI) * ripple;
      const my = ny + Math.sin(angle + Math.PI) * ripple;

      let base = 0.5;
      switch (mode) {
        case 'flow': {
          const a2 = fbm(mx * 3 + time * 0.12, my * 3, Math.floor(time * 0.04) * 0.1, 3) * Math.PI * 4;
          base = (fbm(mx * 2 + Math.cos(a2) * 0.3 + time * 0.06, my * 2 + Math.sin(a2) * 0.3, 0, 4) + 0.5) * 0.5;
          break;
        }
        case 'noise':
          base = fbm(mx * 4, my * 4, time * 0.02, 5);
          break;
        case 'scan': {
          const wave = Math.sin((my * 40 - time * 1.4) * Math.PI * 0.5) * 0.5 + 0.5;
          base = wave * 0.65 + fbm(mx * 6, my * 6, 0, 3) * 0.35;
          break;
        }
        case 'radial': {
          const cx = 0.35 + Math.sin(time * 0.07) * 0.08;
          const cy = 0.5 + Math.cos(time * 0.05) * 0.06;
          const r = Math.hypot(mx - cx, (my - cy) * 1.4);
          base = (Math.sin(r * 14 - time * 1.2) * 0.5 + 0.5) * 0.7 + fbm(mx * 3, my * 3, 0, 3) * 0.3;
          break;
        }
        case 'vortex': {
          const s1x = 0.3 + Math.sin(time * 0.04) * 0.12;
          const s1y = 0.5 + Math.cos(time * 0.03) * 0.08;
          const s2x = 0.7 - Math.sin(time * 0.04) * 0.12;
          const s2y = 0.5 - Math.cos(time * 0.03) * 0.08;
          const r1 = Math.hypot(mx - s1x, (my - s1y) * 1.5);
          const r2 = Math.hypot(mx - s2x, (my - s2y) * 1.5);
          const a1 = Math.atan2(my - s1y, mx - s1x);
          const a2 = Math.atan2(my - s2y, mx - s2x);
          base = (Math.sin(r1 * 18 - a1 * 3 - time * 1.5) + Math.sin(r2 * 18 + a2 * 3 + time * 1.5) + 2) * 0.225 + fbm(mx * 2, my * 2, time * 0.03, 2) * 0.1;
          break;
        }
        case 'magnetic': {
          const p1x = 0.25 + Math.sin(time * 0.05) * 0.1;
          const p1y = 0.4 + Math.cos(time * 0.07) * 0.15;
          const p2x = 0.75 - Math.sin(time * 0.05) * 0.1;
          const p2y = 0.6 - Math.cos(time * 0.07) * 0.15;
          const dx1 = mx - p1x;
          const dy1 = (my - p1y) * 1.2;
          const dx2 = mx - p2x;
          const dy2 = (my - p2y) * 1.2;
          const r1 = Math.sqrt(dx1 * dx1 + dy1 * dy1) + 0.001;
          const r2 = Math.sqrt(dx2 * dx2 + dy2 * dy2) + 0.001;
          base = (Math.sin((dx1 / r1 / r1 - dx2 / r2 / r2) * 28 + time * 0.6) * 0.5 + 0.5) * 0.75 + fbm(mx * 3, my * 3, 0, 2) * 0.25;
          break;
        }
        case 'cellular': {
          let minD1 = 99;
          let minD2 = 99;
          for (let i = 0; i < 9; i += 1) {
            const cx = hash(i, 0, Math.floor(time * 0.02)) * 0.9 + 0.05 + Math.sin(time * 0.04 + i * 1.3) * 0.06;
            const cy = hash(0, i, Math.floor(time * 0.02) + 1) * 0.9 + 0.05 + Math.cos(time * 0.03 + i * 0.9) * 0.06;
            const d = Math.hypot(mx - cx, (my - cy) * 1.3);
            if (d < minD1) {
              minD2 = minD1;
              minD1 = d;
            } else if (d < minD2) {
              minD2 = d;
            }
          }
          base = Math.min(1, (minD2 - minD1) * 4.5) * 0.8 + fbm(mx * 5, my * 5, time * 0.01, 2) * 0.2;
          break;
        }
        case 'warp': {
          const wx = mx + Math.sin(my * 8 + time * 0.5) * 0.06 + Math.sin(my * 3.1 - time * 0.3) * 0.04;
          const wy = my + Math.cos(mx * 7 - time * 0.4) * 0.05 + Math.cos(mx * 2.7 + time * 0.25) * 0.03;
          base = (Math.sin(wx * 22 + time * 0.4) * Math.sin(wy * 16 - time * 0.3) * 0.5 + 0.5) * 0.7 + fbm(wx * 3, wy * 3, time * 0.02, 3) * 0.3;
          break;
        }
        case 'lightning': {
          let minD = 99;
          for (let i = 0; i < 7; i += 1) {
            const bx = hash(i, 3, Math.floor(time * 0.06)) + Math.sin(time * 0.12 + i) * 0.1;
            const by = hash(3, i, Math.floor(time * 0.06) + 5) + Math.cos(time * 0.09 + i) * 0.1;
            minD = Math.min(minD, Math.hypot((mx - bx) * 2.5, my - by));
          }
          const bolt = Math.exp(-minD * 22) + Math.exp(-minD * 6) * 0.4;
          const flicker = Math.sin(time * 4.3 + mx * 8) * 0.5 + 0.5;
          base = Math.min(1, bolt * flicker * 2.5 + fbm(mx * 5, my * 5, time * 0.05, 2) * 0.15);
          break;
        }
        case 'depth':
          base = fbm(mx * 2 + time * 0.08, my * 2, 0, 3) * 0.2 + fbm(mx * 4 - time * 0.12, my * 4, 1.5, 3) * 0.35 + fbm(mx * 8 + time * 0.2, my * 8, 3.1, 2) * 0.45;
          break;
      }

      return Math.min(1, base + influence * 0.75);
    };

    const draw = () => {
      cols = Math.ceil(width / (density * 0.62));
      rows = Math.ceil(height / density);
      const chars = CHAR_SETS[charSet];

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${density}px 'Courier New', monospace`;
      ctx.textBaseline = 'top';

      for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
          const brightness = getBrightness(col, row);
          const char =
            charSet === 'brand'
              ? brightness < 0.28
                ? ' '
                : BRAND_WORDMARK[col % BRAND_WORDMARK.length]
              : chars[Math.max(0, Math.min(chars.length - 1, Math.floor(brightness * (chars.length - 1))))];
          if (char === ' ') continue;

          const light = Math.floor(brightness * 200 + 30);
          ctx.fillStyle = `rgb(${light}, ${Math.floor(light * 1.02)}, ${Math.floor(light * 0.55)})`;
          ctx.fillText(char, col * density * 0.62, row * density);
        }
      }

      if (!reduceMotion) time += 0.35;
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [density, mode, charSet]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ opacity, mixBlendMode: 'screen' }}
    />
  );
}
