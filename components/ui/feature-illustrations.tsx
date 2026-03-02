"use client";

export const CoinStackIllustration = () => (
  <div className="relative h-32 w-48">
    {/* Sparkle (on hover maybe?) or always there with low opacity? */}
    <div className="absolute left-10 top-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          fill="white"
          stroke="black"
          strokeWidth="1"
        />
      </svg>
    </div>

    {/* Main Coin Stack */}
    <div className="absolute bottom-4 left-4 transition-transform duration-300 group-hover:-translate-y-2">
      <svg width="60" height="80" viewBox="0 0 60 80" fill="none">
        {/* Base of stack */}
        {[0, 10, 20, 30].map((y) => (
          <g key={y} transform={`translate(0, ${y})`}>
            <ellipse
              cx="30"
              cy="40"
              rx="30"
              ry="10"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
            <rect
              x="0"
              y="40"
              width="60"
              height="10"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
            <ellipse
              cx="30"
              cy="50"
              rx="30"
              ry="10"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
          </g>
        ))}
        {/* Top of stack */}
        <ellipse
          cx="30"
          cy="40"
          rx="30"
          ry="10"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="white"
          className="group-hover:fill-[#FFD459] group-hover:stroke-black"
        />
        <text
          x="30"
          y="46"
          fontSize="18"
          textAnchor="middle"
          fill="#FF9D00"
          fontWeight="bold"
          fontFamily="system-ui"
          className="group-hover:fill-black"
        >
          $
        </text>
      </svg>
    </div>

    {/* Small Stack on right */}
    <div className="absolute bottom-4 right-12 transition-transform duration-300 group-hover:-translate-y-1">
      <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
        {[0, 8].map((y) => (
          <g key={y} transform={`translate(0, ${y})`}>
            <ellipse
              cx="20"
              cy="30"
              rx="20"
              ry="6.5"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
            <rect
              x="0"
              y="30"
              width="40"
              height="8"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
            <ellipse
              cx="20"
              cy="38"
              rx="20"
              ry="6.5"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="var(--card)"
              className="group-hover:fill-[#FFD459]/20 group-hover:stroke-black"
            />
          </g>
        ))}
        <ellipse
          cx="20"
          cy="30"
          rx="20"
          ry="6.5"
          stroke="currentColor"
          strokeWidth="2.5"
          fill="white"
          className="group-hover:fill-[#FFD459] group-hover:stroke-black"
        />
        <text
          x="20"
          y="34"
          fontSize="12"
          textAnchor="middle"
          fill="#FF9D00"
          fontWeight="bold"
          fontFamily="system-ui"
          className="group-hover:fill-black"
        >
          $
        </text>
      </svg>
    </div>

    {/* Molecule Connect (on hover) */}
    <div className="absolute right-4 top-10 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1">
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" className="stroke-black">
        <circle cx="16" cy="16" r="4" fill="white" stroke="black" strokeWidth="1.5" />
        <circle cx="28" cy="8" r="3" fill="black" />
        <circle cx="4" cy="24" r="3" fill="black" />
        <circle cx="24" cy="24" r="3" fill="black" />
        <line x1="16" y1="16" x2="28" y2="8" stroke="black" strokeWidth="1.5" />
        <line x1="16" y1="16" x2="4" y2="24" stroke="black" strokeWidth="1.5" />
        <line x1="16" y1="16" x2="24" y2="24" stroke="black" strokeWidth="1.5" />
      </svg>
    </div>
  </div>
);

export const RuleBasedIllustration = () => (
  <div className="relative h-32 w-48 group text-foreground">
    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path
          d="M48 4L16 44H36L32 76L64 36H44L48 4Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="3"
          className="group-hover:fill-primary group-hover:stroke-black"
        />
      </svg>
    </div>
    {/* Floating gear elements */}
    <div className="absolute right-8 top-12 opacity-0 transition-all duration-300 group-hover:opacity-100">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <circle cx="10" cy="10" r="4" stroke="black" strokeWidth="2" fill="white" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="9"
            y="3"
            width="2"
            height="3"
            fill="black"
            transform={`rotate(${deg}, 10, 10)`}
          />
        ))}
      </svg>
    </div>
  </div>
);

export const RiskShieldIllustration = () => (
  <div className="relative h-32 w-48 group text-foreground">
    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <path
          d="M40 8C40 8 16 16 16 40C16 64 40 72 40 72C40 72 64 64 64 40C64 16 40 8 40 8Z"
          fill="white"
          stroke="currentColor"
          strokeWidth="3"
          className="group-hover:fill-primary group-hover:stroke-black"
        />
        <path
          d="M40 24V56"
          stroke="currentColor"
          strokeWidth="2.5"
          className="group-hover:stroke-black"
        />
        <path
          d="M32 40H48"
          stroke="currentColor"
          strokeWidth="2.5"
          className="group-hover:stroke-black"
        />
      </svg>
    </div>
  </div>
);

export const CrossChainIllustration = () => (
  <div className="relative h-32 w-48 group text-foreground">
    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-2">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle
          cx="40"
          cy="40"
          r="12"
          stroke="currentColor"
          strokeWidth="3"
          fill="white"
          className="group-hover:fill-primary group-hover:stroke-black"
        />
        <circle
          cx="20"
          cy="20"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          className="group-hover:fill-black group-hover:stroke-black"
        />
        <circle
          cx="60"
          cy="20"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          className="group-hover:fill-black group-hover:stroke-black"
        />
        <circle
          cx="20"
          cy="60"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          className="group-hover:fill-black group-hover:stroke-black"
        />
        <circle
          cx="60"
          cy="60"
          r="6"
          stroke="currentColor"
          strokeWidth="2"
          fill="currentColor"
          className="group-hover:fill-black group-hover:stroke-black"
        />
        <line
          x1="40"
          y1="40"
          x2="20"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-black"
        />
        <line
          x1="40"
          y1="40"
          x2="60"
          y2="20"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-black"
        />
        <line
          x1="40"
          y1="40"
          x2="20"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-black"
        />
        <line
          x1="40"
          y1="40"
          x2="60"
          y2="60"
          stroke="currentColor"
          strokeWidth="2"
          className="group-hover:stroke-black"
        />
      </svg>
    </div>
  </div>
);
