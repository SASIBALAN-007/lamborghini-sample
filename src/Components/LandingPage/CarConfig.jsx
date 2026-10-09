import { useState } from "react";

import revueltoImage from "/src/assets/cars/Revuelto PM-familyChooser.webp";
import temerarioImage from "/src/assets/cars/familyChooser-Temerario_0.webp";
import urusImage from "/src/assets/cars/Urus SE Performante-familyChooser_v3.webp";

/* ------------------------------ DATA ------------------------------ */

const STATS = ["Speed", "Acceleration", "Handling", "Braking"];
const SHORT = { Speed: "SPD", Acceleration: "ACC", Handling: "HDL", Braking: "BRK" };

const cars = [
  {
    name: "Revuelto",
    subtitle: "V12 Hybrid",
    image: revueltoImage,
    base: { Speed: 95, Acceleration: 92, Handling: 86, Braking: 88 },
    // Optional: real renders per paint id, e.g. { verde: verdeRevuelto }
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

const categories = [
  {
    id: "paint",
    label: "Paint",
    options: [
      { id: "stock", name: "Original", desc: "The colour in the photo.", hex: "#9ca3af", cost: 0, filter: "none" },
      { id: "verde", name: "Verde Mantis", desc: "Loud, electric green.", hex: "#6bbf2a", cost: 9000, filter: "hue-rotate(90deg) saturate(1.2)" },
      { id: "arancio", name: "Arancio Borealis", desc: "Deep metallic orange.", hex: "#f97316", cost: 9000, filter: "hue-rotate(-30deg) saturate(1.3)" },
      { id: "blu", name: "Blu Eleos", desc: "Cool pearl blue.", hex: "#2563eb", cost: 12000, filter: "hue-rotate(180deg) saturate(1.2)" },
      { id: "rosso", name: "Rosso Mars", desc: "Classic racing red.", hex: "#dc2626", cost: 9000, filter: "hue-rotate(-60deg) saturate(1.4)" },
      { id: "nero", name: "Nero Noctis", desc: "Stealth black.", hex: "#18181b", cost: 6000, filter: "grayscale(1) brightness(0.45) contrast(1.2)" },
      { id: "bianco", name: "Bianco Icarus", desc: "Clean, bright white.", hex: "#f4f4f5", cost: 6000, filter: "grayscale(1) brightness(1.5) contrast(0.95)" },
    ],
  },
  {
    id: "wheels",
    label: "Wheels",
    options: [
      { id: "standard", name: "Standard Forged", desc: "20\" forged, 5 spoke.", spokes: 5, finish: "#a1a1aa", cost: 0 },
      { id: "aero", name: "Aero Blade", desc: "21\" aero cover, low drag.", spokes: 10, finish: "#e4e4e7", cost: 4500, deltas: { Speed: 2 } },
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

const DEFAULT_BUILD = { paint: "stock", wheels: "standard", interior: "nero", perf: "stock" };

const money = (n) => `$${n.toLocaleString("en-US")}`;
const angled = { clipPath: "polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" };
const angledThumb = { clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)" };

/* --------------------------- SMALL PARTS --------------------------- */

function WheelIcon({ spokes, finish }) {
  const angles = Array.from({ length: spokes }, (_, i) => (360 / spokes) * i);
  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0">
      <circle cx="24" cy="24" r="22" fill="#0a0a0a" stroke={finish} strokeWidth="2" />
      <circle cx="24" cy="24" r="15" fill="none" stroke={finish} strokeOpacity="0.4" strokeWidth="1" />
      {angles.map((a) => (
        <line
          key={a}
          x1="24" y1="24" x2="24" y2="5"
          stroke={finish} strokeWidth="2.5" strokeLinecap="round"
          transform={`rotate(${a} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill={finish} />
    </svg>
  );
}

function Lead({ catId, opt, index }) {
  if (catId === "wheels") return <WheelIcon spokes={opt.spokes} finish={opt.finish} />;
  if (catId === "interior")
    return (
      <span
        className="h-12 w-12 shrink-0 -skew-x-6 border border-white/20"
        style={{ background: `linear-gradient(135deg, ${opt.hex} 55%, ${opt.accent} 55%)` }}
      />
    );
  return (
    <span className="flex h-12 w-12 shrink-0 -skew-x-6 items-center justify-center border border-white/20 bg-black/40 text-lg font-light text-yellow-400">
      {index}
    </span>
  );
}

function Deltas({ deltas }) {
  const entries = Object.entries(deltas ?? {});
  if (!entries.length) return null;
  return (
    <div className="mt-1 flex flex-wrap gap-x-3">
      {entries.map(([k, v]) => (
        <span key={k} className={`text-[9px] tracking-[2px] ${v > 0 ? "text-emerald-400" : "text-red-400"}`}>
          {v > 0 ? "+" : ""}{v} {SHORT[k]}
        </span>
      ))}
    </div>
  );
}

function StatBar({ label, base, value }) {
  const delta = value - base;
  const solid = Math.min(base, value);
  const extra = Math.abs(delta);
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[10px] uppercase tracking-[3px] text-white/60">
        <span>{label}</span>
        <span className="text-white">
          {value}
          {delta !== 0 && (
            <span className={`ml-2 ${delta > 0 ? "text-emerald-400" : "text-red-400"}`}>
              {delta > 0 ? "+" : ""}{delta}
            </span>
          )}
        </span>
      </div>
      <div className="flex h-[6px] w-full -skew-x-[20deg] bg-white/10">
        <div className="h-full bg-yellow-400 transition-all duration-500" style={{ width: `${solid}%` }} />
        <div
          className={`h-full transition-all duration-500 ${delta >= 0 ? "bg-emerald-400" : "bg-red-500"}`}
          style={{ width: `${extra}%` }}
        />
      </div>
    </div>
  );
}

/* ---------------------------- MAIN ---------------------------- */

function CarConfig() {
  const [carIndex, setCarIndex] = useState(0);
  const [activeCat, setActiveCat] = useState("paint");
  const [saved, setSaved] = useState(false);
  const [builds, setBuilds] = useState(() =>
    Object.fromEntries(cars.map((c) => [c.name, { ...DEFAULT_BUILD }]))
  );

  const car = cars[carIndex];
  const build = builds[car.name];
  const category = categories.find((c) => c.id === activeCat);

  const picked = categories.map((c) => ({
    cat: c,
    opt: c.options.find((o) => o.id === build[c.id]),
  }));

  const total = picked.reduce((sum, { opt }) => sum + opt.cost, 0);

  const stats = STATS.map((label) => {
    const base = car.base[label];
    const delta = picked.reduce((s, { opt }) => s + (opt.deltas?.[label] ?? 0), 0);
    return { label, base, value: Math.min(100, Math.max(0, base + delta)) };
  });

  const paint = picked.find((p) => p.cat.id === "paint").opt;
  const dedicatedImage = car.paintImages?.[paint.id];
  const imgSrc = dedicatedImage ?? car.image;
  const imgFilter = dedicatedImage ? "none" : paint.filter;

  const choose = (catId, optId) =>
    setBuilds((prev) => ({
      ...prev,
      [car.name]: { ...prev[car.name], [catId]: optId },
    }));

  const reset = () =>
    setBuilds((prev) => ({ ...prev, [car.name]: { ...DEFAULT_BUILD } }));

  const save = () => {
    console.log("Saved build:", { car: car.name, build, total });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <section
      id="configure"
      className="relative w-full select-none overflow-hidden bg-black lg:h-screen lg:min-h-[720px]"
    >
      <style>{`
        @keyframes cfgCarIn {
          from { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(8px); }
          to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes cfgPanelIn {
          from { opacity: 0; transform: translateX(30px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes cfgPulse {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50%      { opacity: 0.7;  transform: scale(1.04); }
        }
        .cfg-car-in   { animation: cfgCarIn 700ms cubic-bezier(.2,.8,.2,1) both; }
        .cfg-panel-in { animation: cfgPanelIn 500ms cubic-bezier(.2,.8,.2,1) both; }
        .cfg-pulse    { animation: cfgPulse 3s ease-in-out infinite; }
        .cfg-scroll::-webkit-scrollbar { width: 3px; }
        .cfg-scroll::-webkit-scrollbar-thumb { background: rgba(250,204,21,.6); }
      `}</style>

      {/* Garage background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,#2b2b2b_0%,#0a0a0a_55%,#000_85%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* HUD corners */}
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-yellow-400 md:left-8 md:top-8" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-yellow-400 md:right-8 md:top-8" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-yellow-400 md:bottom-8 md:left-8" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-yellow-400 md:bottom-8 md:right-8" />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-8 py-8 md:px-14 md:py-10">
        <div>
          <p className="text-[10px] uppercase tracking-[5px] text-yellow-400">Customize</p>
          <h2 className="mt-1 text-2xl font-light uppercase tracking-[6px] text-white md:text-3xl">
            {car.name}
          </h2>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[4px] text-white/50">Build cost</p>
          <p className="text-3xl font-light text-yellow-400 md:text-4xl">{money(total)}</p>
        </div>
      </div>

      {/* Main grid */}
      <div className="relative z-10 grid h-full grid-cols-1 gap-6 px-6 pb-8 pt-28 md:px-10 lg:grid-cols-[190px_minmax(0,1fr)_360px] lg:gap-8 lg:px-14 lg:pb-12">
        {/* Category menu */}
        <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:justify-center lg:overflow-visible">
          {categories.map((c, i) => {
            const active = c.id === activeCat;
            return (
              <button
                key={c.id}
                onClick={() => setActiveCat(c.id)}
                style={angled}
                className={`flex shrink-0 items-center gap-4 border-l-2 px-5 py-4 text-left transition-all duration-300 lg:w-full ${
                  active
                    ? "border-yellow-400 bg-yellow-400 text-black"
                    : "border-white/20 bg-white/5 text-white/70 hover:border-white hover:bg-white/10 hover:text-white"
                }`}
              >
                <span className={`text-[10px] tracking-[2px] ${active ? "text-black/60" : "text-yellow-400"}`}>
                  0{i + 1}
                </span>
                <span className="text-xs font-semibold uppercase tracking-[3px]">{c.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Stage */}
        <div className="relative min-h-[380px] lg:min-h-0">
          {/* Ghost name */}
          <span
            className="pointer-events-none absolute inset-x-0 top-[6%] hidden text-center text-[9rem] font-bold uppercase leading-none tracking-tighter text-transparent opacity-25 xl:block"
            style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
          >
            {car.name}
          </span>

          {/* Floor glow + ring */}
          <div className="pointer-events-none absolute bottom-[16%] left-1/2 h-[14%] w-[78%] -translate-x-1/2">
            <div className="cfg-pulse absolute inset-0 rounded-[50%] bg-[radial-gradient(ellipse,rgba(250,204,21,0.35),transparent_70%)]" />
            <div className="absolute inset-[10%] rounded-[50%] border border-dashed border-yellow-400/40" />
            <div className="absolute inset-x-[25%] inset-y-[30%] rounded-[50%] border border-white/20" />
          </div>

          {/* Car */}
          <div key={car.name} className="cfg-car-in absolute inset-x-0 bottom-[20%] top-[8%]">
            <img
              src={imgSrc}
              alt={car.name}
              className="h-full w-full object-contain object-center transition-[filter] duration-700"
              style={{ filter: imgFilter }}
            />
          </div>

          {/* Stage bottom bar */}
          <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4">
            <div className="flex gap-3">
              {cars.map((c, i) => (
                <button
                  key={c.name}
                  onClick={() => setCarIndex(i)}
                  aria-label={`Configure ${c.name}`}
                  style={angledThumb}
                  className={`relative h-12 w-20 overflow-hidden transition-all duration-300 md:h-14 md:w-28 ${
                    i === carIndex
                      ? "scale-110 opacity-100 ring-2 ring-yellow-400"
                      : "opacity-50 hover:opacity-90"
                  }`}
                >
                  <img src={c.image} alt="" className="h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center text-[8px] uppercase tracking-[2px] text-white">
                    {c.name}
                  </span>
                </button>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={reset}
                style={angled}
                className="border border-white/40 px-6 py-3 pr-8 text-[10px] font-semibold uppercase tracking-[3px] text-white transition-colors duration-300 hover:bg-white hover:text-black"
              >
                Reset
              </button>
              <button
                onClick={save}
                style={angled}
                className={`px-6 py-3 pr-8 text-[10px] font-bold uppercase tracking-[3px] text-black transition-colors duration-300 ${
                  saved ? "bg-white" : "bg-yellow-400 hover:bg-white"
                }`}
              >
                {saved ? "Build saved ✓" : "Save build"}
              </button>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <aside className="cfg-scroll flex min-h-0 flex-col gap-6 overflow-y-auto pr-1">
          <div key={`${car.name}-${activeCat}`}>
            <p className="mb-4 text-[10px] uppercase tracking-[4px] text-yellow-400">
              {category.label}
            </p>

            {category.id === "paint" ? (
              <div className="cfg-panel-in">
                <div className="grid grid-cols-4 gap-3">
                  {category.options.map((opt) => {
                    const active = build.paint === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => choose("paint", opt.id)}
                        aria-label={opt.name}
                        title={opt.name}
                        className={`h-14 -skew-x-6 border transition-all duration-300 ${
                          active
                            ? "scale-110 border-yellow-400 ring-2 ring-yellow-400"
                            : "border-white/20 hover:scale-105 hover:border-white"
                        }`}
                        style={{ backgroundColor: opt.hex }}
                      />
                    );
                  })}
                </div>
                <div className="mt-5 border-l-2 border-yellow-400 bg-white/5 px-4 py-3">
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-white">{paint.name}</p>
                  <p className="mt-1 text-xs text-white/60">{paint.desc}</p>
                  <p className="mt-2 text-xs text-yellow-400">
                    {paint.cost === 0 ? "Included" : `+${money(paint.cost)}`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {category.options.map((opt, i) => {
                  const active = build[category.id] === opt.id;
                  return (
                    <button
                      key={opt.id}
                      onClick={() => choose(category.id, opt.id)}
                      style={{ ...angled, animationDelay: `${i * 70}ms` }}
                      className={`cfg-panel-in flex w-full items-center gap-4 border-l-2 px-4 py-3 pr-8 text-left transition-colors duration-300 ${
                        active
                          ? "border-yellow-400 bg-yellow-400/15"
                          : "border-white/15 bg-white/5 hover:border-white/60 hover:bg-white/10"
                      }`}
                    >
                      <Lead catId={category.id} opt={opt} index={i} />
                      <span className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold uppercase tracking-[2px] text-white">
                          {opt.name}
                        </span>
                        <span className="mt-0.5 block text-[11px] text-white/55">{opt.desc}</span>
                        <Deltas deltas={opt.deltas} />
                      </span>
                      <span className={`shrink-0 text-[11px] ${active ? "text-yellow-400" : "text-white/60"}`}>
                        {opt.cost === 0 ? "Included" : `+${money(opt.cost)}`}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-auto border-t border-white/15 pt-5">
            <p className="mb-4 text-[10px] uppercase tracking-[4px] text-yellow-400">Performance</p>
            <div className="flex flex-col gap-4">
              {stats.map((s) => (
                <StatBar key={s.label} {...s} />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default CarConfig;