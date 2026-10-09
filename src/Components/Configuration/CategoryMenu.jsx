import { angled } from "./utils";

function CategoryMenu({ categories, activeCat, onChange }) {
  return (
    <nav className="flex gap-2 overflow-x-auto lg:flex-col lg:justify-center lg:overflow-visible">
      {categories.map((c, i) => {
        const active = c.id === activeCat;
        return (
          <button
            key={c.id}
            onClick={() => onChange(c.id)}
            style={angled}
            className={`flex shrink-0 items-center gap-4 border-l-2 px-5 py-4 text-left transition-all duration-300 lg:w-full ${
              active
                ? "border-yellow-400 bg-yellow-400 text-black"
                : "border-white/20 bg-white/5 text-white/70 hover:border-white hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className={`text-[10px] tracking-[2px] ${active ? "text-black/60" : "text-yellow-400"}`}>
              0{i + 1}
            </span>
            <span className="text-xs font-semibold uppercase tracking-[3px]">
              {c.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}

export default CategoryMenu;