"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  function actual() {
    const t = document.documentElement.getAttribute("data-theme");
    if (t) return t;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function toggle() {
    const novo = actual() === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novo);
    try {
      localStorage.setItem("quase-tema", novo);
    } catch {
      /* private */
    }
  }

  if (!ready) {
    return (
      <button type="button" className="tema" aria-label="Mudar entre tema claro e escuro" />
    );
  }

  return (
    <button
      type="button"
      className="tema"
      id="tema"
      aria-label="Mudar entre tema claro e escuro"
      title="Mudar de tema"
      onClick={toggle}
    >
      <svg className="lua" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
      </svg>
      <svg className="sol" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4.2" />
        <path d="M12 2v2M12 20v2M4.2 4.2l1.5 1.5M18.3 18.3l1.5 1.5M2 12h2M20 12h2M4.2 19.8l1.5-1.5M18.3 5.7l1.5-1.5" />
      </svg>
    </button>
  );
}
