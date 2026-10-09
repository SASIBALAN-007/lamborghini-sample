function HudCorners() {
  return (
    <>
      <div className="pointer-events-none absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-yellow-400 md:left-8 md:top-8" />
      <div className="pointer-events-none absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-yellow-400 md:right-8 md:top-8" />
      <div className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-yellow-400 md:bottom-8 md:left-8" />
      <div className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-yellow-400 md:bottom-8 md:right-8" />
    </>
  );
}

export default HudCorners;