function WheelIcon({ spokes, finish }) {
  const angles = Array.from({ length: spokes }, (_, i) => (360 / spokes) * i);

  return (
    <svg viewBox="0 0 48 48" className="h-12 w-12 shrink-0">
      <circle cx="24" cy="24" r="22" fill="#0a0a0a" stroke={finish} strokeWidth="2" />
      <circle cx="24" cy="24" r="15" fill="none" stroke={finish} strokeOpacity="0.4" strokeWidth="1" />
      {angles.map((a) => (
        <line
          key={a}
          x1="24" y1="24" x2="24" y2="5"
          stroke={finish}
          strokeWidth="2.5"
          strokeLinecap="round"
          transform={`rotate(${a} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="5" fill={finish} />
    </svg>
  );
}

export default WheelIcon;