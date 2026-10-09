import OptionLead from "./OptionLead";
import DeltaTags from "./DeltaTags";
import { angled, money } from "./utils";

function OptionList({ catId, options, selectedId, onSelect }) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt, i) => {
        const active = selectedId === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            style={{ ...angled, animationDelay: `${i * 70}ms` }}
            className={`cfg-panel-in flex w-full items-center gap-4 border-l-2 px-4 py-3 pr-8 text-left transition-colors duration-300 ${
              active
                ? "border-yellow-400 bg-yellow-400/15"
                : "border-white/15 bg-white/5 hover:border-white/60 hover:bg-white/10"
            }`}
          >
            <OptionLead catId={catId} opt={opt} index={i} />

            <span className="min-w-0 flex-1">
              <span className="block text-xs font-semibold uppercase tracking-[2px] text-white">
                {opt.name}
              </span>
              <span className="mt-0.5 block text-[11px] text-white/55">
                {opt.desc}
              </span>
              <DeltaTags deltas={opt.deltas} />
            </span>

            <span className={`shrink-0 text-[11px] ${active ? "text-yellow-400" : "text-white/60"}`}>
              {opt.cost === 0 ? "Included" : `+${money(opt.cost)}`}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default OptionList;