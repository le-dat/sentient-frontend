/**
 * DollarCoin — sketch-style 3-D coin icon.
 *
 * Geometry (viewBox 0 0 185 220, rotated 7° CW around coin centre):
 *   Face ellipse  : cx=82 cy=110 rx=72 ry=100
 *   Right edge    : sickle region between the face ellipse and an identical
 *                   ellipse whose centre is shifted 18 px to the right.
 *                   Both arcs span ±50° from the rightmost point.
 *   Inner ring    : cx=82 cy=110 rx=58 ry=83
 *   Dollar sign   : centred serif text, outline-only stroke
 */
export function DollarCoin({
  size = 175,
  strokeColor = "#7b8cba",
  faceColor = "#ffffff",
  edgeColor = "#eef1f9",
  className,
}: {
  size?: number;
  strokeColor?: string;
  faceColor?: string;
  edgeColor?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={Math.round(size * 1.19)}
      viewBox="0 0 185 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Tilt the whole coin ~7° clockwise around its centre (82, 110) */}
      <g transform="rotate(7, 82, 110)">

        {/*
          Right edge band — shows coin thickness.

          Left boundary:  right arc of face ellipse (cx=82, cy=110, rx=72, ry=100)
                          from (128, 33) → CW through (154, 110) → (128, 187)
          Right boundary: same arc but ellipse centre shifted 18 px right (cx=100)
                          from (144, 187) → CCW through (172, 110) → (144, 33)

          Arc flags: large-arc=0 (minor, ≈100°), sweep=1 CW / sweep=0 CCW
        */}
        <path
          d="M 128,33 A 72,100 0 0 1 128,187 L 144,187 A 72,100 0 0 0 144,33 Z"
          fill={edgeColor}
          stroke={strokeColor}
          strokeWidth="1.2"
          strokeLinejoin="round"
        />

        {/* Coin face */}
        <ellipse
          cx="82"
          cy="110"
          rx="72"
          ry="100"
          fill={faceColor}
          stroke={strokeColor}
          strokeWidth="1.5"
        />

        {/* Inner decorative ring */}
        <ellipse
          cx="82"
          cy="110"
          rx="58"
          ry="83"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1"
        />

        {/* Dollar sign — outline/sketch style */}
        <text
          x="82"
          y="110"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="84"
          fontFamily="Georgia, 'Times New Roman', serif"
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          $
        </text>

      </g>
    </svg>
  );
}
