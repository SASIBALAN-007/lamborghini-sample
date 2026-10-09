import { useEffect, useState } from "react";

import revueltoImage from "/src/assets/cars/Revuelto PM-familyChooser.webp";
import temerarioImage from "/src/assets/cars/familyChooser-Temerario_0.webp";
import urusImage from "/src/assets/cars/Urus SE Performante-familyChooser_v3.webp";

const models = [
  {
    name: "Revuelto",
    subtitle: "V12 Hybrid",
    image: revueltoImage,
    description:
      "The first Lamborghini V12 high-performance electrified vehicle. A new era of power, performance and unmistakable Lamborghini design.",
    specs: { power: "1015 HP", accel: "2.5 s", top: "350 km/h" },
    ratings: { Speed: 95, Acceleration: 92, Handling: 86, Braking: 88 },
  },
  {
    name: "Temerario",
    subtitle: "V8 Twin-Turbo Hybrid",
    image: temerarioImage,
    description:
      "A new generation of Lamborghini performance. Temerario combines electrified power with the unmistakable character of a super sports car.",
    specs: { power: "920 HP", accel: "2.7 s", top: "343 km/h" },
    ratings: { Speed: 92, Acceleration: 90, Handling: 94, Braking: 90 },
  },
  {
    name: "Urus",
    subtitle: "Super SUV",
    image: urusImage,
    description:
      "The Lamborghini Super SUV combines everyday versatility with extraordinary performance and unmistakable Lamborghini DNA.",
    specs: { power: "800 HP", accel: "3.4 s", top: "312 km/h" },
    ratings: { Speed: 82, Acceleration: 80, Handling: 76, Braking: 84 },
  },
];

const angled = {
  clipPath: "polygon(0 0, 100% 0, calc(100% - 14px) 100%, 0 100%)",
};
const angledThumb = {
  clipPath: "polygon(12px 0, 100% 0, calc(100% - 12px) 100%, 0 100%)",
};

function Arrow({ direction, onClick }) {
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? "Previous model" : "Next model"}
      className={`group absolute top-1/2 z-30 -translate-y-1/2 flex h-24 w-12 items-center justify-center text-white/70 transition-all duration-300 hover:text-white md:h-32 md:w-16 ${
        isLeft ? "left-2 md:left-6" : "right-2 md:right-6"
      }`}
    >
      <span
        className={`absolute inset-0 border border-white/30 bg-black/30 backdrop-blur-sm transition-all duration-300 group-hover:border-yellow-400 group-hover:bg-yellow-400/10 ${
          isLeft ? "-skew-x-6" : "skew-x-6"
        }`}
      />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className={`relative h-7 w-7 transition-transform duration-300 ${
          isLeft
            ? "group-hover:-translate-x-1"
            : "group-hover:translate-x-1"
        }`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d={isLeft ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        />
      </svg>
    </button>
  );
}

function StatBar({ label, value, delay }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-[10px] uppercase tracking-[3px] text-white/60">
        <span>{label}</span>
        <span className="text-white">{value}</span>
      </div>
      <div className="h-[6px] w-full -skew-x-[20deg] bg-white/10">
        <div
          className="stat-fill h-full bg-yellow-400"
          style={{ "--w": `${value}%`, animationDelay: `${delay}ms` }}
        />
      </div>
    </div>
  );
}

function Models() {
  const [current, setCurrent] = useState(0);
  const [dir, setDir] = useState(1);
  const [selected, setSelected] = useState(null);

  const total = models.length;
  const model = models[current];

  const next = () => {
    setDir(1);
    setCurrent((i) => (i + 1) % total);
  };
  const prev = () => {
    setDir(-1);
    setCurrent((i) => (i - 1 + total) % total);
  };
  const jump = (index) => {
    if (index === current) return;
    setDir(index > current ? 1 : -1);
    setCurrent(index);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isSelected = selected === current;

  return (
    <section
      id="models"
      className="relative h-screen min-h-[680px] w-full select-none overflow-hidden bg-black"
    >
      <style>{`
        @keyframes carIn {
          from {
            opacity: 0;
            transform: translateX(calc(var(--dir) * 9%)) skewX(calc(var(--dir) * -6deg)) scale(1.05);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: translateX(0) skewX(0) scale(1);
            filter: blur(0);
          }
        }
        @keyframes textIn {
          from { opacity: 0; transform: translateX(calc(var(--dir) * 40px)); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes statFill {
          from { width: 0; }
          to { width: var(--w); }
        }
        @keyframes ghostIn {
          from { opacity: 0; transform: translateX(calc(var(--dir) * 120px)); }
          to { opacity: 1; transform: translateX(0); }
        }
        .car-in { animation: carIn 800ms cubic-bezier(.2,.8,.2,1) both; }
        .text-in { animation: textIn 600ms cubic-bezier(.2,.8,.2,1) both; }
        .stat-fill { animation: statFill 900ms cubic-bezier(.2,.8,.2,1) both; }
        .ghost-in { animation: ghostIn 900ms cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {/* Background car */}
      <div key={`img-${current}`} className="car-in absolute inset-0" style={{ "--dir": dir }}>
        <img
          src={model.image}
          alt={model.name}
          className=" w-full object-cover"
        />
      </div>

      {/* Overlays */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-black via-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />

      {/* Ghost outline name */}
      <div
        key={`ghost-${current}`}
        className="ghost-in pointer-events-none absolute right-0 top-24 hidden w-full overflow-hidden text-right md:block"
        style={{ "--dir": dir }}
      >
        <span
          className="block pr-10 text-[13rem] font-bold uppercase leading-none tracking-tighter text-transparent opacity-30"
          style={{ WebkitTextStroke: "1px rgba(255,255,255,0.6)" }}
        >
          {model.name}
        </span>
      </div>

      {/* HUD corner brackets */}
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-yellow-400 md:left-8 md:top-8" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-yellow-400 md:right-8 md:top-8" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-yellow-400 md:bottom-8 md:left-8" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-yellow-400 md:bottom-8 md:right-8" />

      {/* Top bar */}
      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-8 py-8 md:px-16 md:py-12">
        <div>
          <p className="text-[10px] uppercase tracking-[5px] text-yellow-400">
            Garage
          </p>
          <h2 className="mt-1 text-2xl font-light uppercase tracking-[6px] text-white md:text-3xl">
            Select your car
          </h2>
        </div>

        <div className="text-right font-light text-white">
          <span className="text-4xl text-yellow-400 md:text-5xl">
            {String(current + 1).padStart(2, "0")}
          </span>
          <span className="text-lg text-white/50"> / {String(total).padStart(2, "0")}</span>
        </div>
      </div>

      {/* Info panel */}
      <div
        key={`info-${current}`}
        className="text-in absolute inset-x-0 bottom-32 z-20 px-16 md:bottom-36 md:px-28 lg:px-32"
        style={{ "--dir": dir }}
      >
        <div className="max-w-xl">
          <p className="mb-3 text-[11px] font-medium uppercase tracking-[5px] text-yellow-400">
            {model.subtitle}
          </p>

          <h3 className="text-6xl font-light uppercase leading-[0.85] tracking-[-3px] text-white md:text-8xl">
            {model.name}
          </h3>

          <p className="mt-5 max-w-md text-sm leading-7 text-white/70">
            {model.description}
          </p>

          {/* Quick specs */}
          <div className="mt-6 grid max-w-md grid-cols-3 gap-4 border-y border-white/15 py-4">
            {[
              ["Power", model.specs.power],
              ["0-100 km/h", model.specs.accel],
              ["Top speed", model.specs.top],
            ].map(([label, value]) => (
              <div key={label}>
                <p className="text-[9px] uppercase tracking-[3px] text-white/50">
                  {label}
                </p>
                <p className="mt-1 text-lg font-light text-white">{value}</p>
              </div>
            ))}
          </div>

          {/* Stat bars */}
          <div className="mt-6 hidden max-w-md grid-cols-2 gap-x-8 gap-y-4 sm:grid">
            {Object.entries(model.ratings).map(([label, value], i) => (
              <StatBar key={label} label={label} value={value} delay={i * 120} />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar: thumbnails + select */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-4 px-8 pb-8 md:px-16 md:pb-12">
        <p className="hidden w-40 text-[10px] uppercase tracking-[3px] text-white/40 md:block">
          ← → to browse
        </p>

        <div className="flex gap-3">
          {models.map((m, i) => (
            <button
              key={m.name}
              onClick={() => jump(i)}
              aria-label={`Show ${m.name}`}
              style={angledThumb}
              className={`relative h-14 w-24 overflow-hidden transition-all duration-300 md:h-16 md:w-32 ${
                i === current
                  ? "scale-110 opacity-100 ring-2 ring-yellow-400"
                  : "opacity-50 hover:opacity-90"
              }`}
            >
              <img src={m.image} alt="" className=" w-full object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center text-[8px] uppercase tracking-[2px] text-white">
                {m.name}
              </span>
            </button>
          ))}
        </div>


      </div>

      <Arrow direction="left" onClick={prev} />
      <Arrow direction="right" onClick={next} />
    </section>
  );
}

export default Models;