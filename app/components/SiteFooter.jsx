import Link from "next/link";
import Logo from "./Logo";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Logo withTagline />
          <p>
            Guia editorial de hotéis com SPA e piscina interior em Portugal, Açores e
            Madeira.
          </p>
        </div>
        <div>
          <p className="footer-label">Explorar</p>
          <nav aria-label="Explorar">
            <Link href="/reviews/">Todas as reviews</Link>
            <Link href="/portugal/">Portugal</Link>
            <Link href="/acores/">Açores</Link>
            <Link href="/madeira/">Madeira</Link>
          </nav>
        </div>
        <div>
          <p className="footer-label">Informação</p>
          <nav aria-label="Informação">
            <Link href="/como-escolhemos/">Como escolhemos</Link>
            <Link href="/contacto/">Contacto</Link>
            <Link href="/privacidade/">Privacidade</Link>
          </nav>
        </div>
      </div>
      <p className="footer-copy">
        Alguns links de reserva podem ser afiliados e ajudam a manter o projecto
        independente — não pagas mais por isso. Preços, temperaturas e fotografias sao
        referência editorial e devem ser confirmados junto do hotel.
      </p>
    </footer>
  );
}
