interface SubtleWaveTransitionProps {
  variant?: "silver" | "iceblue" | "pearl";
  flipY?: boolean;
  className?: string;
}

export default function SubtleWaveTransition({
  variant = "silver",
  flipY = false,
  className = "",
}: SubtleWaveTransitionProps) {
  // Gradient definitions per variant
  const gradients = {
    silver: {
      color1: "rgba(226, 232, 240, 0.45)", // Silver light
      color2: "rgba(203, 213, 225, 0.25)", // Slate 300
      stroke: "rgba(148, 163, 184, 0.3)",
    },
    iceblue: {
      color1: "rgba(224, 242, 254, 0.5)", // Ice blue 100
      color2: "rgba(186, 230, 253, 0.3)", // Ice blue 200
      stroke: "rgba(56, 189, 248, 0.25)",
    },
    pearl: {
      color1: "rgba(241, 245, 249, 0.6)", // Pearl slate 100
      color2: "rgba(226, 232, 240, 0.35)", // Pearl slate 200
      stroke: "rgba(203, 213, 225, 0.3)",
    },
  };

  const g = gradients[variant];

  return (
    <div
      className={`w-full overflow-hidden leading-none pointer-events-none select-none my-0 py-0 ${
        flipY ? "rotate-180" : ""
      } ${className}`}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="relative block w-full h-10 sm:h-14 lg:h-16"
      >
        <defs>
          <linearGradient id={`wave-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={g.color1} />
            <stop offset="50%" stopColor={g.color2} />
            <stop offset="100%" stopColor={g.color1} />
          </linearGradient>
        </defs>
        {/* Layer 1: Soft broad wave */}
        <path
          d="M0,0 C150,50 350,-20 500,40 C650,100 900,10 1200,30 L1200,120 L0,120 Z"
          fill={`url(#wave-grad-${variant})`}
          opacity="0.85"
        />
        {/* Layer 2: Subtle stroke line for abstract elegance */}
        <path
          d="M0,25 C300,70 600,0 900,45 C1050,68 1150,20 1200,35"
          fill="none"
          stroke={g.stroke}
          strokeWidth="1.5"
        />
      </svg>
    </div>
  );
}
