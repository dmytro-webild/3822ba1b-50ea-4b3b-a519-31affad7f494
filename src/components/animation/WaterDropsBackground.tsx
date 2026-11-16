export default function WaterDropsBackground() {
  const droplets = [
    { top: "12%", left: "8%", size: "w-6 h-6", delay: "0s" },
    { top: "28%", left: "85%", size: "w-8 h-8", delay: "1.2s" },
    { top: "45%", left: "15%", size: "w-5 h-5", delay: "2.4s" },
    { top: "62%", left: "88%", size: "w-10 h-10", delay: "0.8s" },
    { top: "78%", left: "10%", size: "w-7 h-7", delay: "1.8s" },
    { top: "89%", left: "80%", size: "w-6 h-6", delay: "3.1s" },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {droplets.map((drop, idx) => (
        <div
          key={idx}
          className={`absolute ${drop.size} rounded-full bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_8px_32px_rgba(10,25,47,0.1)] animate-pulse`}
          style={{
            top: drop.top,
            left: drop.left,
            animationDelay: drop.delay,
            animationDuration: "4s",
          }}
        >
          {/* Inner reflection */}
          <div className="w-1.5 h-1.5 bg-white rounded-full opacity-80 mt-1 ml-1" />
        </div>
      ))}
    </div>
  );
}
