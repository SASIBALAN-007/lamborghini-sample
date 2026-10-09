import revueltoImage from "/src/assets/cars/Revuelto PM-familyChooser.webp";
import temerarioImage from "/src/assets/cars/familyChooser-Temerario_0.webp";
import urusImage from "/src/assets/cars/Urus SE Performante-familyChooser_v3.webp";

export const STATS = ["Speed", "Acceleration", "Handling", "Braking"];

export const SHORT = {
  Speed: "SPD",
  Acceleration: "ACC",
  Handling: "HDL",
  Braking: "BRK",
};

export const cars = [
  {
    name: "Revuelto",
    subtitle: "V12 Hybrid",
    image: revueltoImage,
    base: { Speed: 95, Acceleration: 92, Handling: 86, Braking: 88 },
    // Optional real renders per paint id, e.g. { verde: verdeRevuelto }
    paintImages: {},
  },
  {
    name: "Temerario",
    subtitle: "V8 Twin-Turbo Hybrid",
    image: temerarioImage,
    base: { Speed: 92, Acceleration: 90, Handling: 94, Braking: 90 },
    paintImages: {},
  },
  {
    name: "Urus",
    subtitle: "Super SUV",
    image: urusImage,
    base: { Speed: 82, Acceleration: 80, Handling: 76, Braking: 84 },
    paintImages: {},
  },
];

export const categories = [
{
  id: "paint",
  label: "Paint",
  options: [
    { id: "stock",   name: "Original",         desc: "The colour in the photo.", hex: "#9ca3af", cost: 0,     tint: null },
    { id: "verde",   name: "Verde Mantis",     desc: "Loud, electric green.",    hex: "#6bbf2a", cost: 9000,  tint: { h: 95,  sMul: 1,    lMul: 0.95, lAdd: 0 } },
    { id: "arancio", name: "Arancio Borealis", desc: "Deep metallic orange.",    hex: "#f97316", cost: 9000,  tint: { h: 24,  sMul: 1,    lMul: 1,    lAdd: 0 } },
    { id: "blu",     name: "Blu Eleos",        desc: "Cool pearl blue.",         hex: "#2563eb", cost: 12000, tint: { h: 218, sMul: 1,    lMul: 0.9,  lAdd: 0 } },
    { id: "rosso",   name: "Rosso Mars",       desc: "Classic racing red.",      hex: "#dc2626", cost: 9000,  tint: { h: 358, sMul: 1.05, lMul: 0.85, lAdd: 0 } },
    { id: "nero",    name: "Nero Noctis",      desc: "Stealth black.",           hex: "#18181b", cost: 6000,  tint: { h: 0,   sMul: 0.08, lMul: 0.35, lAdd: 0 } },
    { id: "bianco",  name: "Bianco Icarus",    desc: "Clean, bright white.",     hex: "#f4f4f5", cost: 6000,  tint: { h: 0,   sMul: 0.05, lMul: 0.6,  lAdd: 0.42 } },
  ],
},
  {
    id: "wheels",
    label: "Wheels",
    options: [
      { id: "standard", name: "Standard Forged", desc: '20" forged, 5 spoke.', spokes: 5, finish: "#a1a1aa", cost: 0 },
      { id: "aero", name: "Aero Blade", desc: '21" aero cover, low drag.', spokes: 10, finish: "#e4e4e7", cost: 4500, deltas: { Speed: 2 } },
      { id: "track", name: "Track Spec", desc: "Lightweight, wide stance.", spokes: 6, finish: "#facc15", cost: 6800, deltas: { Handling: 3, Braking: 2 } },
      { id: "titanium", name: "Titanium Edition", desc: "Ultra-light titanium.", spokes: 7, finish: "#71717a", cost: 11000, deltas: { Acceleration: 2, Handling: 1 } },
    ],
  },
  {
    id: "interior",
    label: "Interior",
    options: [
      { id: "nero", name: "Nero Ade", desc: "Black leather, grey stitching.", hex: "#18181b", accent: "#71717a", cost: 0 },
      { id: "rosso", name: "Rosso Alala", desc: "Red leather, black Alcantara.", hex: "#b91c1c", accent: "#18181b", cost: 3500 },
      { id: "verde", name: "Verde Selvans", desc: "Green accents, carbon trim.", hex: "#3f6212", accent: "#18181b", cost: 3500 },
      { id: "arancio", name: "Arancio Leonis", desc: "Orange leather, dark trim.", hex: "#ea580c", accent: "#27272a", cost: 4200 },
    ],
  },
  {
    id: "perf",
    label: "Performance",
    options: [
      { id: "stock", name: "Stock", desc: "Factory settings.", cost: 0 },
      { id: "s1", name: "Stage 1", desc: "ECU remap and sport exhaust.", cost: 8000, deltas: { Speed: 2, Acceleration: 3 } },
      { id: "s2", name: "Stage 2", desc: "Intake, lightweight parts.", cost: 17000, deltas: { Speed: 3, Acceleration: 5, Handling: 2 } },
      { id: "s3", name: "Stage 3 Track Pack", desc: "Aero kit, race brakes, slicks.", cost: 32000, deltas: { Speed: 4, Acceleration: 6, Handling: 5, Braking: 6 } },
    ],
  },
];

export const DEFAULT_BUILD = {
  paint: "stock",
  wheels: "standard",
  interior: "nero",
  perf: "stock",
};