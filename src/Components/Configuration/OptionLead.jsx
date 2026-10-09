import WheelIcon from "./WheelIcon";

function OptionLead({ catId, opt, index }) {
  if (catId === "wheels") {
    return <WheelIcon spokes={opt.spokes} finish={opt.finish} />;
  }

  if (catId === "interior") {
    return (
      <span
        className="h-12 w-12 shrink-0 -skew-x-6 border border-white/20"
        style={{ background: `linear-gradient(135deg, ${opt.hex} 55%, ${opt.accent} 55%)` }}
      />
    );
  }

  return (
    <span className="flex h-12 w-12 shrink-0 -skew-x-6 items-center justify-center border border-white/20 bg-black/40 text-lg font-light text-yellow-400">
      {index}
    </span>
  );
}

export default OptionLead;