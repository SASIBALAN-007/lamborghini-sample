import { angledThumb } from "./utils";

function CarSwitcher({ cars, carIndex, onChange }) {
  return (
    <div className="flex gap-3">
      {cars.map((c, i) => (
        <button
          key={c.name}
          onClick={() => onChange(i)}
          aria-label={`Configure ${c.name}`}
          style={angledThumb}
          className={`relative h-12 w-20 overflow-hidden transition-all duration-300 md:h-14 md:w-28 ${
            i === carIndex
              ? "scale-110 opacity-100 ring-2 ring-yellow-400"
              : "opacity-50 hover:opacity-90"
          }`}
        >
          <img src={c.image} alt="" className=" w-full object-cover" />
          <span className="absolute inset-x-0 bottom-0 bg-black/70 py-0.5 text-center text-[8px] uppercase tracking-[2px] text-white">
            {c.name}
          </span>
        </button>
      ))}
    </div>
  );
}

export default CarSwitcher;