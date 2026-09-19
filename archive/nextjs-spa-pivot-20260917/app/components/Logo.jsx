export default function Logo({ withTagline = false }) {
  return (
    <span className={`logo${withTagline ? " logo-stacked" : ""}`}>
      <svg
        className="logo-mark"
        viewBox="0 0 300 92"
        role="img"
        aria-label="quase"
        focusable="false"
      >
        <text
          x="2"
          y="58"
          fontFamily="var(--font-display)"
          fontSize="70"
          fontWeight="600"
          letterSpacing="-2"
          fill="currentColor"
        >
          quase
        </text>
        <path
          d="M4 74 H104 c13 0 19 7 32 7 s19 -7 32 -7 h110"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          opacity="0.8"
        />
      </svg>
      {withTagline ? <span className="logo-tagline">Spa e piscinas interiores</span> : null}
    </span>
  );
}
