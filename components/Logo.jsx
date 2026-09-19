export default function Logo({ className = "logo" }) {
  return (
    <a className={className} href="/" aria-label="quase, página inicial">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 220 56"
        fill="currentColor"
        role="img"
        aria-label="quase"
      >
        <text
          x="2"
          y="40"
          fontFamily="var(--f-display)"
          fontSize="42"
          fontWeight="600"
          letterSpacing="-1.5"
        >
          quase
        </text>
        <circle cx="198" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="3.2" />
        <circle cx="198" cy="28" r="5.5" fill="currentColor" />
      </svg>
    </a>
  );
}
