function ConfiguratorStyles() {
  return (
    <style>{`
      @keyframes cfgCarIn {
        from { opacity: 0; transform: translateY(20px) scale(0.96); filter: blur(8px); }
        to   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
      }
      @keyframes cfgPanelIn {
        from { opacity: 0; transform: translateX(30px); }
        to   { opacity: 1; transform: translateX(0); }
      }
      @keyframes cfgPulse {
        0%, 100% { opacity: 0.35; transform: scale(1); }
        50%      { opacity: 0.7;  transform: scale(1.04); }
      }
      .cfg-car-in   { animation: cfgCarIn 700ms cubic-bezier(.2,.8,.2,1) both; }
      .cfg-panel-in { animation: cfgPanelIn 500ms cubic-bezier(.2,.8,.2,1) both; }
      .cfg-pulse    { animation: cfgPulse 3s ease-in-out infinite; }
      .cfg-scroll::-webkit-scrollbar { width: 3px; }
      .cfg-scroll::-webkit-scrollbar-thumb { background: rgba(250,204,21,.6); }
    `}</style>
  );
}

export default ConfiguratorStyles;