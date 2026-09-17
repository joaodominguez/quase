import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <nav aria-label="Rodape">
        <Link href="/portugal/">Portugal</Link>
        <Link href="/acores/">Acores</Link>
        <Link href="/madeira/">Madeira</Link>
        <Link href="/contacto/">Contacto</Link>
        <Link href="/privacidade/">Privacidade</Link>
      </nav>
      <p>
        Quase — guia independente de SPA e hoteis com piscina interior na Peninsula
        Iberica, Acores e Madeira. Links de reserva podem ser afiliados.
      </p>
    </footer>
  );
}
