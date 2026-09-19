"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";

const NAV = [
  { href: "/admin/", label: "Visão geral" },
  { href: "/admin/sitios/", label: "Sítios" },
  { href: "/admin/sistema/", label: "Sistema" },
];

export default function AdminShell({ children }) {
  const pathname = usePathname() || "/admin/";

  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <div className="admin-brand">
          <Logo className="logo admin-logo" />
          <span className="admin-badge">Admin</span>
        </div>
        <nav className="admin-nav" aria-label="Backoffice">
          {NAV.map(({ href, label }) => {
            const active =
              href === "/admin/"
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname === href || pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`admin-nav-link${active ? " is-active" : ""}`}
              >
                {label}
              </Link>
            );
          })}
        </nav>
        <a className="admin-back" href="/">
          Voltar ao site
        </a>
      </aside>
      <div className="admin-main">{children}</div>
    </div>
  );
}
