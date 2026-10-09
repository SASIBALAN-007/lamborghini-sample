import StatBar from "./StatBar";

function StatsPanel({ stats }) {
  return (
    <div className="mt-auto border-t border-white/15 pt-5">
      <p className="mb-4 text-[10px] uppercase tracking-[4px] text-yellow-400">
        Performance
      </p>
      <div className="flex flex-col gap-4">
        {stats.map((s) => (
          <StatBar key={s.label} {...s} />
        ))}
      </div>
    </div>
  );
}

export default StatsPanel;