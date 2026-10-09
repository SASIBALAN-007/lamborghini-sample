import { useEffect, useRef } from "react";

/* ---------------------------- color helpers ---------------------------- */

const tmp = [0, 0, 0];

function rgbToHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  }

  tmp[0] = h; tmp[1] = s; tmp[2] = l;
}

function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

function hslToRgb(h, s, l) {
  h = (((h % 360) + 360) % 360) / 360;
  if (s === 0) {
    tmp[0] = tmp[1] = tmp[2] = l * 255;
    return;
  }
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;
  tmp[0] = hue2rgb(p, q, h + 1 / 3) * 255;
  tmp[1] = hue2rgb(p, q, h) * 255;
  tmp[2] = hue2rgb(p, q, h - 1 / 3) * 255;
}

/* --------------------------- body hue detection --------------------------- */

function detectBodyHue(data) {
  const BINS = 72; // 5 degrees each
  const bins = new Array(BINS).fill(0);

  for (let i = 0; i < data.length; i += 16) {
    if (data[i + 3] < 200) continue;
    rgbToHsl(data[i], data[i + 1], data[i + 2]);
    const [h, s, l] = tmp;
    if (s < 0.35 || l < 0.12 || l > 0.88) continue;
    bins[Math.floor(h / 5) % BINS] += s * (1 - Math.abs(2 * l - 1));
  }

  let best = 0;
  let bestValue = 0;
  for (let i = 0; i < BINS; i++) {
    const v = bins[(i - 1 + BINS) % BINS] + bins[i] + bins[(i + 1) % BINS];
    if (v > bestValue) {
      bestValue = v;
      best = i;
    }
  }

  return bestValue > 5 ? best * 5 + 2.5 : null;
}

/* ------------------------------- recoloring ------------------------------- */

function recolor(src, dst, tint, bodyHue, tol) {
  if (!tint || bodyHue == null) {
    dst.set(src);
    return;
  }

  for (let i = 0; i < src.length; i += 4) {
    const r = src[i];
    const g = src[i + 1];
    const b = src[i + 2];
    const a = src[i + 3];

    dst[i] = r;
    dst[i + 1] = g;
    dst[i + 2] = b;
    dst[i + 3] = a;

    if (a === 0) continue;

    rgbToHsl(r, g, b);
    const h = tmp[0];
    const s = tmp[1];
    const l = tmp[2];

    if (s < 0.22) continue; // greys: tires, glass, background, highlights

    let diff = h - bodyHue;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    const d = Math.abs(diff);
    if (d > tol) continue;

    // Full effect near the body hue, soft falloff at the edges
    const core = tol * 0.6;
    const hueW = d <= core ? 1 : 1 - (d - core) / (tol - core);
    const satW = Math.min(1, (s - 0.22) / 0.2);
    const w = hueW * satW;

    const nh = tint.h + diff * 0.5;
    const ns = Math.min(1, s * tint.sMul);
    const nl = Math.min(1, Math.max(0, l * tint.lMul + tint.lAdd));

    hslToRgb(nh, ns, nl);

    dst[i] = r + (tmp[0] - r) * w;
    dst[i + 1] = g + (tmp[1] - g) * w;
    dst[i + 2] = b + (tmp[2] - b) * w;
  }
}

/* ------------------------------ image loading ------------------------------ */

const cache = new Map();

function loadSource(src) {
  if (cache.has(src)) return cache.get(src);

  const promise = new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, 1400 / img.naturalWidth);
      const w = Math.round(img.naturalWidth * scale);
      const h = Math.round(img.naturalHeight * scale);

      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const { data } = ctx.getImageData(0, 0, w, h);

      const hue = detectBodyHue(data);
      console.info(`[PaintedCar] detected body hue for ${src}:`, hue);

      resolve({ w, h, data, hue });
    };
    img.onerror = reject;
    img.src = src;
  });

  cache.set(src, promise);
  return promise;
}

/* -------------------------------- component -------------------------------- */

function PaintedCar({ src, alt, tint, bodyHue = null, tolerance = 30, className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    loadSource(src)
      .then((source) => {
        const canvas = canvasRef.current;
        if (cancelled || !canvas) return;

        if (canvas.width !== source.w) canvas.width = source.w;
        if (canvas.height !== source.h) canvas.height = source.h;

        const ctx = canvas.getContext("2d");
        const out = ctx.createImageData(source.w, source.h);
        recolor(source.data, out.data, tint, bodyHue ?? source.hue, tolerance);
        ctx.putImageData(out, 0, 0);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [src, tint, bodyHue, tolerance]);

  return <canvas ref={canvasRef} role="img" aria-label={alt} className={className} />;
}

export default PaintedCar;