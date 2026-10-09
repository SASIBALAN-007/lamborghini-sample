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
              {delta > 0 ? "+" : ""}
              {delta}
            </span>
          )}
        </span>
      </div>

      <div className="flex h-[6px] w-full -skew-x-[20deg] bg-white/10">
        <div
          className="h-full bg-yellow-400 transition-all duration-500"
          style={{ width: `${solid}%` }}
        />
        <div
          className={`h-full transition-all duration-500 ${delta >= 0 ? "bg-emerald-400" : "bg-red-500"}`}
          style={{ width: `${extra}%` }}
        />
      </div>
    </div>
  );
}

export default StatBar;