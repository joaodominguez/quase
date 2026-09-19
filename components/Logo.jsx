export default function Logo({ className = "logo" }) {
  return (
    <a className={className} href="/" aria-label="quase, página inicial">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 142 56"
        fill="currentColor"
        role="img"
        aria-label="quase"
      >
        <text
          x="0"
          y="40"
          fontFamily="Bricolage Grotesque, Helvetica Neue, Arial, sans-serif"
          fontSize="42"
          fontWeight="600"
          letterSpacing="-1.8"
        >
          quase
        </text>
        {/* anel ~6px após o fim do wordmark (bbox ≈ 111) */}
        <circle cx="128.5" cy="28" r="11" fill="none" stroke="currentColor" strokeWidth="2.6" />
        <circle cx="128.5" cy="28" r="4" fill="currentColor" />
      </svg>
    </a>
  );
}
