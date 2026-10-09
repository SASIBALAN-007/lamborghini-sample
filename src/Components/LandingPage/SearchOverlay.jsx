import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Search, X } from "lucide-react";
import Footer from "./Footer";
// Edit these to match your real sections / routes
const items = [
  { label: "Revuelto", type: "Model", desc: "V12 Hybrid", href: "#models" },
  { label: "Temerario", type: "Model", desc: "V8 Twin-Turbo Hybrid", href: "#models" },
  { label: "Urus", type: "Model", desc: "Super SUV", href: "#models" },
  { label: "Configure your car", type: "Experience", desc: "Paint, wheels, interior and performance", href: "#configure" },
  { label: "Discover Temerario", type: "Experience", desc: "The new super sports car", href: "#temerario" },
  { label: "Find a dealer", type: "Contact", desc: "Locate your nearest Lamborghini dealer", href: "#footer" },
  { label: "Contact us", type: "Contact", desc: "Get in touch with our team", href: "#footer" },
];

const popular = ["Revuelto", "Temerario", "Urus", "Configure"];

function SearchOverlay({ open, onClose }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return items.filter((item) =>
      `${item.label} ${item.type} ${item.desc}`.toLowerCase().includes(q)
    );
  }, [query]);

  // Focus the input when opened, clear it when closed
  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 150);
      return () => clearTimeout(t);
    }
    setQuery("");
  }, [open]);

  // Close with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // Lock page scroll while open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const goTo = (href) => {
    onClose();
    // let the overlay start closing, then scroll to the section
    setTimeout(() => {
      if (href.startsWith("#")) {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = href;
      }
    }, 200);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (results[0]) goTo(results[0].href);
  };

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[60] overflow-y-auto bg-black/95 backdrop-blur-xl transition-all duration-500 ${
        open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-4 opacity-0"
      }`}
    >
      {/* Top bar */}
      <div className="flex h-20 items-center justify-between px-6 md:px-10 lg:px-12">
        <span className="text-[11px] uppercase tracking-[4px] text-white/50">
          Search
        </span>
        <button
          onClick={onClose}
          aria-label="Close search"
          className="group flex items-center gap-3 text-white transition-opacity hover:opacity-60"
        >
          <span className="hidden text-[11px] uppercase tracking-[2px] md:block">
            Close
          </span>
          <X size={28} strokeWidth={1.5} className="transition-transform duration-300 group-hover:rotate-90" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-4xl px-6 pb-20 pt-10 md:pt-20">
        {/* Input */}
        <form onSubmit={onSubmit} className="relative border-b border-white/30 transition-colors focus-within:border-white">
          <Search size={28} strokeWidth={1.5} className="absolute left-0 top-1/2 -translate-y-1/2 text-white/60" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search models, configure, dealers..."
            autoComplete="off"
            tabIndex={open ? 0 : -1}
            className="w-full bg-transparent py-5 pl-12 pr-10 text-2xl font-light uppercase tracking-wide text-white placeholder:text-white/30 focus:outline-none md:text-4xl"
          />
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery("");
                inputRef.current?.focus();
              }}
              aria-label="Clear search"
              className="absolute right-0 top-1/2 -translate-y-1/2 text-white/60 transition-colors hover:text-white"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          )}
        </form>

        {/* Popular searches */}
        {!query && (
          <div className="mt-10">
            <p className="mb-4 text-[10px] uppercase tracking-[4px] text-white/40">
              Popular searches
            </p>
            <div className="flex flex-wrap gap-3">
              {popular.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  tabIndex={open ? 0 : -1}
                  className="border border-white/30 px-5 py-3 text-[11px] uppercase tracking-[2px] text-white/80 transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="mt-10">
            <p className="mb-4 text-[10px] uppercase tracking-[4px] text-white/40">
              {results.length} {results.length === 1 ? "result" : "results"}
            </p>

            {results.length > 0 ? (
              <ul className="divide-y divide-white/10 border-t border-white/10">
                {results.map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => goTo(item.href)}
                      tabIndex={open ? 0 : -1}
                      className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                    >
                      <span>
                        <span className="block text-[10px] uppercase tracking-[3px] text-white/40">
                          {item.type}
                        </span>
                        <span className="mt-1 block text-2xl font-light uppercase tracking-wide text-white transition-transform duration-300 group-hover:translate-x-2 md:text-3xl">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-sm text-white/50">
                          {item.desc}
                        </span>
                      </span>
                      <ArrowUpRight
                        size={26}
                        strokeWidth={1.5}
                        className="shrink-0 text-white/40 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-white"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-white/50">
                No results for "{query}". Try a model name like Revuelto or Urus.
              </p>
            )}
          </div>
        )}
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default SearchOverlay;