"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { href: "/mapa/", label: "Mapa" },
  { href: "/termas/", label: "Termas" },
  { href: "/hoteis-com-termas/", label: "Hotéis com termas" },
  { href: "/jacuzzi-no-quarto/", label: "Jacuzzi no quarto" },
  { href: "/listas/", label: "Listas" },
  { href: "/moteis/", label: "Motéis" },
  { href: "/como-escolhemos/", label: "Como escolhemos" },
];

export default function SiteHeader({ solid = false }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add("js");
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-aberto", open);
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className={`topo${solid ? " solido" : ""}`}>
      <div className="col topo-in">
        <Logo />
        <nav className="menu" id="menu" aria-label="Principal">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="topo-fim">
          <button
            type="button"
            className="menu-btn"
            id="menu-btn"
            aria-expanded={open}
            aria-controls="menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <svg className="abrir" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
            <svg className="fechar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
