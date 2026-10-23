import React from "react";
import Image from "next/image";

export const HeroVisual: React.FC = () => {
  const nodes = [
    { cx: 200, cy: 62 },
    { cx: 331, cy: 157 },
    { cx: 281, cy: 312 },
    { cx: 119, cy: 312 },
    { cx: 69, cy: 157 },
  ];

  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[500px]"
      aria-hidden="true"
    >
      <div className="absolute inset-[14%] rounded-full bg-[var(--moderno-accent)]/[0.08] blur-3xl" />
      <div className="absolute inset-[13%] rounded-full border border-white/[0.055] bg-white/[0.018] backdrop-blur-[2px]" />

      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full"
        fill="none"
      >
        <defs>
          <linearGradient id="moderno-orbit" x1="70" y1="40" x2="330" y2="360">
            <stop offset="0" stopColor="#A8C7FF" stopOpacity="0.7" />
            <stop offset="0.55" stopColor="#4C8DFF" stopOpacity="0.24" />
            <stop offset="1" stopColor="#4C8DFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle
          cx="200"
          cy="200"
          r="170"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="170"
          stroke="url(#moderno-orbit)"
          strokeWidth="1.25"
          strokeDasharray="220 848"
          strokeLinecap="round"
          transform="rotate(-138 200 200)"
        />
        <circle
          cx="200"
          cy="200"
          r="138"
          stroke="rgba(255,255,255,0.085)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="rgba(255,255,255,0.065)"
          strokeWidth="1"
        />

        {nodes.map((node) => (
          <g key={`${node.cx}-${node.cy}`}>
            <line
              x1="200"
              y1="200"
              x2={node.cx}
              y2={node.cy}
              stroke="rgba(255,255,255,0.035)"
              strokeWidth="1"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="9"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />
            <circle
              cx={node.cx}
              cy={node.cy}
              r="3"
              fill="#A8C7FF"
              fillOpacity="0.9"
            />
          </g>
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 flex h-[92px] w-[92px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/[0.1] bg-[#0f151d]/80 shadow-[0_24px_70px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:h-[108px] sm:w-[108px]">
        <div className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.025] sm:h-[80px] sm:w-[80px]">
          <Image
            src="/logo-mark.png"
            alt=""
            width={54}
            height={54}
            className="h-[46px] w-[46px] object-contain sm:h-[54px] sm:w-[54px]"
          />
        </div>
      </div>
    </div>
  );
};
