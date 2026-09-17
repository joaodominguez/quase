import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/">
        quase.pt
      </Link>
      <nav className="nav" aria-label="Navegacao principal">
        <Link className="hide-sm" href="/listas/piscinas-interiores-portugal/">
          Listas
        </Link>
        <Link href="/portugal/">Portugal</Link>
        <Link href="/acores/">Acores</Link>
        <Link href="/madeira/">Madeira</Link>
      </nav>
    </header>
  );
}
