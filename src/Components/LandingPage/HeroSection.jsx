function SplitLetters({ text, startDelay = 0, step = 70 }) {
  return text.split("").map((char, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="hero-letter inline-block"
      style={{ animationDelay: `${startDelay + i * step}ms` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
}

function SplitWords({ text, startDelay = 0, step = 60 }) {
  return text.split(" ").map((word, i) => (
    <span
      key={i}
      aria-hidden="true"
      className="hero-word mr-[0.3em] inline-block"
      style={{ animationDelay: `${startDelay + i * step}ms` }}
    >
      {word}
    </span>
  ));
}

function HeroSection() {
  const description =
    "The new Lamborghini super sports car. Experience a new generation of performance.";

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <style>{`
        @keyframes letterUp {
          from { transform: translateY(110%) rotate(6deg); opacity: 0; }
          to   { transform: translateY(0) rotate(0); opacity: 1; }
        }
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(14px); filter: blur(6px); }
          to   { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
        @keyframes trackIn {
          from { letter-spacing: 1em; opacity: 0; }
          to   { letter-spacing: 4px; opacity: 1; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroZoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }
        @keyframes scrollLine {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(250%); }
        }

        .hero-letter { animation: letterUp 900ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-word   { animation: wordIn 800ms ease-out both; }
        .hero-line   { transform-origin: left; animation: lineGrow 900ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-track  { animation: trackIn 1400ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-fade-up{ animation: fadeUp 900ms cubic-bezier(0.16, 1, 0.3, 1) both; }
        .hero-zoom   { animation: heroZoom 18s ease-out infinite alternate; }
        .hero-scroll { animation: scrollLine 1.8s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .hero-letter, .hero-word, .hero-line, .hero-track,
          .hero-fade-up, .hero-zoom, .hero-scroll { animation: none !important; }
        }
      `}</style>

      {/* Background Video */}
      <video
        className="hero-zoom absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/src/assets/lamboeghiniVodeo.mp4" type="video/mp4" />
      </video>

      {/* Overlays */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Hero Content */}
      <div className="absolute inset-0 z-10 flex items-end">
        <div className="w-full px-6 pb-16 md:px-12 md:pb-20 lg:px-16">
          {/* Small Heading with growing line */}
          <div className="mb-4 flex items-center gap-4">
            <span
              className="hero-line block h-px w-12 bg-white md:w-16"
              style={{ animationDelay: "0.2s" }}
            />
            <p
              className="hero-track text-xs font-medium uppercase text-white md:text-sm"
              style={{ animationDelay: "0.3s" }}
            >
              Lamborghini
            </p>
          </div>

          {/* Main Heading: letter by letter */}
          <h1
            aria-label="Temerario"
            className="overflow-hidden py-1 text-5xl font-light uppercase leading-none tracking-tight text-white md:text-7xl lg:text-8xl"
          >
            <SplitLetters text="Temerario" startDelay={500} step={80} />
          </h1>

          {/* Description: word by word */}
          <p
            aria-label={description}
            className="mt-5 max-w-lg text-sm leading-relaxed text-white/80 md:text-base"
          >
            <SplitWords text={description} startDelay={1300} step={55} />
          </p>

          {/* Button */}
          <div
            className="hero-fade-up mt-8"
            style={{ animationDelay: "2.2s" }}
          >
            <a
              href="#temerario"
              className="group relative inline-flex items-center gap-3 overflow-hidden border border-white px-7 py-4 text-xs font-medium uppercase tracking-[2px] text-white transition-colors duration-500 hover:text-black"
            >
              <span className="absolute inset-0 -translate-x-full bg-white transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10">Discover More</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="relative z-10 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="hero-fade-up absolute bottom-7 left-1/2 z-20 -translate-x-1/2"
        style={{ animationDelay: "2.6s" }}
      >
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] uppercase tracking-[3px] text-white/70">
            Scroll
          </span>
          <div className="h-10 w-px overflow-hidden bg-white/30">
            <div className="hero-scroll h-1/2 w-full bg-white" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;