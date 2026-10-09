import CarSwitcher from "./CarSwitcher";
import { angled } from "./utils";

function CarStage({
  cars,
  car,
  carIndex,
  imgSrc,
  imgFilter,
  saved,
  onSelectCar,
  onReset,
  onSave,
}) {
  return (
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

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4">
        <CarSwitcher cars={cars} carIndex={carIndex} onChange={onSelectCar} />

        <div className="flex gap-3">
          <button
            onClick={onReset}
            style={angled}
            className="border border-white/40 px-6 py-3 pr-8 text-[10px] font-semibold uppercase tracking-[3px] text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Reset
          </button>
          <button
            onClick={onSave}
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
  );
}

export default CarStage;