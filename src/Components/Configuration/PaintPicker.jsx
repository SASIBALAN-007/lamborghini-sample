import { money } from "./utils";

function PaintPicker({ options, selectedId, onSelect }) {
  const selected = options.find((o) => o.id === selectedId);

  return (
    <div className="cfg-panel-in">
      <div className="grid grid-cols-4 gap-3">
        {options.map((opt) => {
          const active = selectedId === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => onSelect(opt.id)}
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
        <p className="text-sm font-semibold uppercase tracking-[3px] text-white">
          {selected.name}
        </p>
        <p className="mt-1 text-xs text-white/60">{selected.desc}</p>
        <p className="mt-2 text-xs text-yellow-400">
          {selected.cost === 0 ? "Included" : `+${money(selected.cost)}`}
        </p>
      </div>
    </div>
  );
}

export default PaintPicker;