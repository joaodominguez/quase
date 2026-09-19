export const metadata = {
  title: "Propostas de logo",
  robots: { index: false, follow: false },
};

const styles = {
  wrap: { maxWidth: 720, margin: "0 auto", padding: "3rem 1.25rem 4rem" },
  card: {
    padding: "1.75rem",
    border: "1px solid var(--linha)",
    borderRadius: 14,
    background: "var(--cartao)",
    marginBottom: "1.25rem",
  },
};

function MarkA() {
  return (
    <svg viewBox="0 0 220 56" fill="currentColor" height="40" aria-hidden="true">
      <text x="2" y="40" fontFamily="var(--f-display)" fontSize="42" fontWeight="600" letterSpacing="-1.5">
        quase
      </text>
      <circle cx="198" cy="28" r="14" fill="none" stroke="currentColor" strokeWidth="3.2" />
      <circle cx="198" cy="28" r="5.5" fill="currentColor" />
    </svg>
  );
}

function MarkB() {
  return (
    <svg viewBox="0 0 200 56" fill="currentColor" height="40" aria-hidden="true">
      <text x="0" y="40" fontFamily="var(--f-display)" fontSize="44" fontWeight="700" letterSpacing="-2">
        quase
      </text>
      <path d="M4 50 H196" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
    </svg>
  );
}

function MarkC() {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" height="48" aria-hidden="true">
      <rect width="64" height="64" rx="14" fill="var(--toque)" />
      <text x="10" y="42" fontFamily="var(--f-display)" fontSize="28" fontWeight="700">
        q
      </text>
      <circle cx="46" cy="32" r="10" fill="none" stroke="currentColor" strokeWidth="3" />
      <circle cx="46" cy="32" r="3.5" />
    </svg>
  );
}

export default function Page() {
  return (
    <main id="principal" style={styles.wrap}>
      <h1 style={{ fontFamily: "var(--f-display)", fontSize: "2.4rem" }}>Propostas de logo</h1>
      <p style={{ color: "var(--tinta-2)" }}>
        A opção A está activa no site. Favicon alinhado com o anel + q.
      </p>
      <div style={styles.card}>
        <p className="kicker-ficha">A — activa</p>
        <MarkA />
        <p style={{ color: "var(--tinta-3)", marginTop: "0.75rem" }}>
          Wordmark Bricolage + anel/ponto (água / alvo).
        </p>
      </div>
      <div style={styles.card}>
        <p className="kicker-ficha">B — alternativa</p>
        <MarkB />
        <p style={{ color: "var(--tinta-3)", marginTop: "0.75rem" }}>
          Só tipografia + filete. Mais seco, menos símbolo.
        </p>
      </div>
      <div style={styles.card}>
        <p className="kicker-ficha">C — marca quadrada</p>
        <MarkC />
        <p style={{ color: "var(--tinta-3)", marginTop: "0.75rem" }}>
          Para app icon / avatar. Mesmo vocabulário do favicon.
        </p>
      </div>
    </main>
  );
}
