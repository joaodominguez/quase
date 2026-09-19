"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CAT_LABEL } from "../lib/sitios";
import mapaPontos from "../data/mapa-pontos.json";
import mapaBase from "../data/mapa-base.js";

function pontoClass(categoria) {
  return `ponto p-${categoria || "hotel"}`;
}

export default function MapaIlustrado({
  sitios,
  variante = "pagina",
  ariaLabel = "Mapa dos sítios do guia em Portugal continental, Açores e Madeira",
}) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const [balao, setBalao] = useState(null);

  const byId = useMemo(() => {
    const m = {};
    sitios.forEach((s) => {
      m[s.id] = s;
    });
    return m;
  }, [sitios]);

  const pontos = useMemo(() => {
    return mapaPontos.pontos
      .map((p) => {
        const s = byId[p.id];
        if (!s) return null;
        return { ...p, sitio: s };
      })
      .filter(Boolean);
  }, [byId]);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setBalao(null);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function mostrar(ponto, el) {
    const s = ponto.sitio;
    const svg = svgRef.current;
    const wrap = wrapRef.current;
    if (!svg || !wrap || !el) return;
    const cx = el.getBoundingClientRect();
    const pai = wrap.getBoundingClientRect();
    const bits = [];
    if (s.temp != null) bits.push(`${String(s.temp).replace(".", ",")}°`);
    if (s.preco != null) bits.push(`${String(s.preco).replace(".", ",")} €`);
    if (s.avaliacao) bits.push(s.avaliacao);

    // Temporary place then measure — use estimated size first
    const w = 220;
    const h = s.imagem ? 160 : 72;
    let left = cx.left - pai.left + cx.width / 2 - w / 2;
    left = Math.max(8, Math.min(left, pai.width - w - 8));
    let top = cx.top - pai.top - h - 12;
    if (top < 8) top = cx.top - pai.top + cx.height + 10;

    setBalao({
      id: s.id,
      nome: s.nome,
      onde: s.onde,
      imagem: s.imagem,
      dados: bits.join(" · "),
      url: s.url,
      left,
      top,
    });
  }

  const classe =
    variante === "entrada" ? "mapa-entrada" : "mapa-zona";

  return (
    <section className={classe}>
      <div className="col mapa-tela" ref={wrapRef}>
        <svg
          ref={svgRef}
          className="mapa"
          viewBox={mapaPontos.viewBox}
          role="img"
          aria-label={ariaLabel}
          preserveAspectRatio="xMidYMid meet"
          onMouseLeave={() => setBalao(null)}
        >
          <g dangerouslySetInnerHTML={{ __html: mapaBase }} />
          {pontos.map((p) => {
            const label = `${p.sitio.nome} — ${CAT_LABEL[p.sitio.categoria] || p.sitio.categoria}`;
            const href = p.sitio.url || "#";
            return (
              <a
                key={p.id}
                href={href}
                aria-label={label}
                onMouseEnter={(e) => {
                  const c = e.currentTarget.querySelector("circle");
                  mostrar(p, c);
                }}
                onFocus={(e) => {
                  const c = e.currentTarget.querySelector("circle");
                  mostrar(p, c);
                }}
                onBlur={() => setBalao(null)}
              >
                <circle
                  className={pontoClass(p.sitio.categoria)}
                  cx={p.cx}
                  cy={p.cy}
                  r="5.5"
                  data-id={p.id}
                >
                  <title>{label}</title>
                </circle>
              </a>
            );
          })}
        </svg>

        {balao ? (
          <a
            className="mapa-balao"
            href={balao.url}
            style={{ left: balao.left, top: balao.top }}
            onMouseEnter={() => {}}
            onMouseLeave={() => setBalao(null)}
          >
            {balao.imagem ? (
              <img src={balao.imagem} alt="" loading="lazy" />
            ) : null}
            <div className="mapa-balao-corpo">
              <strong>{balao.nome}</strong>
              <span className="onde">{balao.onde}</span>
              {balao.dados ? <span className="dados">{balao.dados}</span> : null}
            </div>
          </a>
        ) : null}

        {variante === "entrada" ? (
          <p className="mapa-fonte">
            Cada ponto é um sítio e a cor é a categoria.{" "}
            <a href="/mapa/">Ver o mapa em grande</a>.
          </p>
        ) : (
          <p className="mapa-fonte">
            Cada ponto é um sítio e a cor é a categoria. Passa o rato para ver o nome.
          </p>
        )}
      </div>
    </section>
  );
}
