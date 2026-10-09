import { useState } from "react";

import { cars, categories, DEFAULT_BUILD, STATS } from "./data";
import { money } from "./utils";

import ConfiguratorStyles from "./ConfiguratorStyles";
import HudCorners from "./HudCorners";
import CategoryMenu from "./CategoryMenu";
import CarStage from "./CarStage";
import OptionPanel from "./OptionPanel";
import StatsPanel from "./StatsPanel";

function Configurator() {
  const [carIndex, setCarIndex] = useState(0);
  const [activeCat, setActiveCat] = useState("paint");
  const [saved, setSaved] = useState(false);
  const [builds, setBuilds] = useState(() =>
    Object.fromEntries(cars.map((c) => [c.name, { ...DEFAULT_BUILD }]))
  );

  const car = cars[carIndex];
  const build = builds[car.name];
  const category = categories.find((c) => c.id === activeCat);

  // Currently selected option in every category
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

  // Paint -> image
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
      className="relative  w-full select-none overflow-hidden bg-black lg:h-screen lg:min-h-[720px]"
    >
      <ConfiguratorStyles />

      {/* Garage background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_65%,#2b2b2b_0%,#0a0a0a_55%,#000_85%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, #fff 0, #fff 1px, transparent 1px, transparent 4px)",
        }}
      />
      <HudCorners />

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
        <CategoryMenu
          categories={categories}
          activeCat={activeCat}
          onChange={setActiveCat}
        />

        <CarStage
          cars={cars}
          car={car}
          carIndex={carIndex}
          imgSrc={imgSrc}
          imgFilter={imgFilter}
          saved={saved}
          onSelectCar={setCarIndex}
          onReset={reset}
          onSave={save}
        />

        <aside className="cfg-scroll flex min-h-0 flex-col gap-6 overflow-y-auto pr-1">
          <OptionPanel
            key={`${car.name}-${activeCat}`}
            category={category}
            selectedId={build[category.id]}
            onSelect={choose}
          />
          <StatsPanel stats={stats} />
        </aside>
      </div>
    </section>
  );
}

export default Configurator;