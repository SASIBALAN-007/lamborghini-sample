import { SHORT } from "./data";

function DeltaTags({ deltas }) {
  const entries = Object.entries(deltas ?? {});
  if (!entries.length) return null;

  return (
    <div className="mt-1 flex flex-wrap gap-x-3">
      {entries.map(([k, v]) => (
        <span
          key={k}
          className={`text-[9px] tracking-[2px] ${v > 0 ? "text-emerald-400" : "text-red-400"}`}
        >
          {v > 0 ? "+" : ""}
          {v} {SHORT[k]}
        </span>
      ))}
    </div>
  );
}

export default DeltaTags;