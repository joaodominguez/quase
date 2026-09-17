import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Quase inicio">
        quase<span>.</span>pt
      </Link>
      <nav className="nav" aria-label="Navegacao principal">
        <Link className="hide-sm" href="/listas/piscinas-interiores-portugal/">
          Piscinas
        </Link>
        <Link href="/portugal/">Portugal</Link>
        <Link href="/acores/">Acores</Link>
        <Link href="/madeira/">Madeira</Link>
        <Link className="nav-cta" href="/listas/spa-fim-de-semana/">
          SPA
        </Link>
      </nav>
    </header>
  );
}
