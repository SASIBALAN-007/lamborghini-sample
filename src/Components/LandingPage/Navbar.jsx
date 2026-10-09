import { useEffect, useState } from "react";
import { Menu, Search } from "lucide-react";
import SlideOptions from "./SlideOptions";
import SearchOverlay from "./SearchOverlay";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`
          fixed left-0 top-0 z-50 w-full
          transition-all duration-500
          ${scrolled ? "bg-black/70 backdrop-blur-xl" : "bg-transparent"}
        `}
      >
        <div className="relative flex h-20 items-center justify-between px-6 md:px-10 lg:px-12">
          {/* LEFT - MENU */}
          <button
            onClick={() => setMenuOpen(true)}
            className="group flex items-center gap-3 text-white transition-opacity hover:opacity-60"
            aria-label="Open menu"
          >
            <Menu
              size={28}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:scale-90"
            />
            <span className="hidden text-[11px] uppercase tracking-[2px] md:block">
              Menu
            </span>
          </button>

          {/* CENTER - LOGO */}
          <a
            href="/"
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <img
              src="/src/assets/lambo.png"
              alt="Lamborghini"
              className="h-12 w-auto object-contain md:h-14"
            />
          </a>

          {/* RIGHT - SEARCH */}
          <button
            onClick={() => setSearchOpen(true)}
            className="group text-white transition-opacity hover:opacity-60"
            aria-label="Search"
          >
            <Search
              size={25}
              strokeWidth={1.5}
              className="transition-transform duration-300 group-hover:scale-90"
            />
          </button>
        </div>
      </header>

      {/* MENU OVERLAY */}
      <SlideOptions open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* SEARCH OVERLAY */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

export default Navbar;