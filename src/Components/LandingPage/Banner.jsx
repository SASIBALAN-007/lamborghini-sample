

function Banner() {
  return (
    <section className="relative flex min-h-[300px] w-full items-center overflow-hidden bg-black md:min-h-[380px]">

      {/* Background Image */}
      <img
        src="/src/assets/banner-desktop.webp"
        alt="Luxury sports car"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Banner Content */}
      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-10 text-white md:px-16 md:py-12 lg:px-24">

        <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gray-300">
          Lamborghini World
        </p>

        <h2 className="max-w-2xl text-3xl font-semibold uppercase leading-[1.1] tracking-tight sm:text-4xl md:text-5xl">
          Beyond the
          <br />
          Ordinary.
        </h2>

        <p className="mt-4 max-w-md text-xs leading-6 text-gray-200 sm:text-sm">
          Discover a world where innovation meets extraordinary
          performance and every detail makes a statement.
        </p>

        <a
          href="https://www.lamborghini.com/en-en"
          className="group mt-5 inline-flex items-center gap-4 border border-white px-5 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition-all duration-300 hover:bg-white hover:text-black"
        >
          Discover More
          <span className="text-lg transition-transform duration-300 group-hover:translate-x-2">
            →
          </span>
        </a>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 h-1 w-full bg-white/10">
        <div className="h-full w-1/4 bg-white" />
      </div>

    </section>
  );
}

export default Banner;