import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <Link className="brand" href="/">
            quase.pt
          </Link>
          <p>
            Guia editorial de SPA e hoteis com piscina interior em Portugal, Acores e
            Madeira.
          </p>
        </div>
        <div>
          <p className="footer-label">Explorar</p>
          <nav aria-label="Explorar">
            <Link href="/portugal/">Portugal</Link>
            <Link href="/acores/">Acores</Link>
            <Link href="/madeira/">Madeira</Link>
            <Link href="/listas/piscinas-interiores-portugal/">Listas</Link>
          </nav>
        </div>
        <div>
          <p className="footer-label">Sobre</p>
          <nav aria-label="Sobre">
            <Link href="/contacto/">Contacto</Link>
            <Link href="/privacidade/">Privacidade</Link>
          </nav>
        </div>
      </div>
      <p className="footer-copy">
        Links de reserva podem ser afiliados. Precos e temperaturas sao referencia editorial
        e devem ser confirmados na reserva. Fotos actuais sao ilustrativas (stock) ate haver
        imagens oficiais ou licenciadas.
      </p>
    </footer>
  );
}
