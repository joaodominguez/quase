import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="quase — inicio">
        <Logo />
      </Link>
      <nav className="nav" aria-label="Navegação principal">
        <Link href="/reviews/">Reviews</Link>
        <Link href="/portugal/">Portugal</Link>
        <Link href="/acores/">Açores</Link>
        <Link href="/madeira/">Madeira</Link>
      </nav>
      <ThemeToggle />
    </header>
  );
}
