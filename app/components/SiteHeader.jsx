"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/reviews/", label: "Reviews" },
  { href: "/portugal/", label: "Portugal" },
  { href: "/acores/", label: "Açores" },
  { href: "/madeira/", label: "Madeira" },
  { href: "/moteis/", label: "Motéis" },
];

const DRAWER_EXTRA = [
  { href: "/como-escolhemos/", label: "Como escolhemos" },
  { href: "/contacto/", label: "Contacto" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(event) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="quase — inicio" onClick={close}>
        <Logo />
      </Link>

      <nav className="nav nav-desktop" aria-label="Navegação principal">
        {NAV_LINKS.map((item) => (
          <Link href={item.href} key={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle />
        <button
          className={`menu-toggle${open ? " is-open" : ""}`}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div
        className={`nav-backdrop${open ? " is-open" : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <nav
        id="mobile-nav"
        className={`nav-drawer${open ? " is-open" : ""}`}
        aria-label="Menu mobile"
        aria-hidden={!open}
      >
        <p className="nav-drawer-label">Explorar</p>
        {NAV_LINKS.map((item) => (
          <Link href={item.href} key={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
        <p className="nav-drawer-label">Informação</p>
        {DRAWER_EXTRA.map((item) => (
          <Link href={item.href} key={item.href} onClick={close}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
