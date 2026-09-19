"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { CAT_LABEL } from "../lib/sitios";
import mapaPontos from "../data/mapa-pontos.json";
import mapaLayout from "../data/mapa-layout.json";
import {
  molduraAcores,
  molduraMadeira,
  continente,
  acores,
  madeira,
} from "../data/mapa-partes.js";

function pontoClass(categoria) {
  return `ponto p-${categoria || "hotel"}`;
}

function useMapaMobile(bp = 760) {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${bp}px)`);
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [bp]);
  return mobile;
}

function Pontos({ pontos, r, onShow, onHide }) {
  return pontos.map((p) => {
    const label = `${p.sitio.nome} — ${CAT_LABEL[p.sitio.categoria] || p.sitio.categoria}`;
    const href = p.sitio.url || "#";
    return (
      <a
        key={p.id}
        href={href}
        aria-label={label}
        onMouseEnter={(e) => onShow(p, e.currentTarget.querySelector("circle"))}
        onFocus={(e) => onShow(p, e.currentTarget.querySelector("circle"))}
        onBlur={onHide}
      >
        <circle
          className={pontoClass(p.sitio.categoria)}
          cx={p.cx}
          cy={p.cy}
          r={r}
          data-id={p.id}
        >
          <title>{label}</title>
        </circle>
      </a>
    );
  });
}

export default function MapaIlustrado({
  sitios,
  variante = "pagina",
  ariaLabel = "Mapa dos sítios do guia em Portugal continental, Açores e Madeira",
}) {
  const wrapRef = useRef(null);
  const svgRef = useRef(null);
  const [balao, setBalao] = useState(null);
  const mobile = useMapaMobile(760);

  const byId = useMemo(() => {
    const m = {};
    sitios.forEach((s) => {
      m[s.id] = s;
    });
    return m;
  }, [sitios]);

  const grupos = useMemo(() => {
    const all = mapaPontos.pontos
      .map((p) => {
        const s = byId[p.id];
        if (!s) return null;
        return { ...p, sitio: s, regiao: s.regiao || p.regiao || "portugal" };
      })
      .filter(Boolean);
    return {
      portugal: all.filter((p) => p.regiao === "portugal"),
      acores: all.filter((p) => p.regiao === "acores"),
      madeira: all.filter((p) => p.regiao === "madeira"),
    };
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
    const wrap = wrapRef.current;
    if (!wrap || !el) return;
    const cx = el.getBoundingClientRect();
    const pai = wrap.getBoundingClientRect();
    const bits = [];
    if (s.temp != null) bits.push(`${String(s.temp).replace(".", ",")}°`);
    if (s.preco != null) bits.push(`${String(s.preco).replace(".", ",")} €`);
    if (s.avaliacao) bits.push(s.avaliacao);

    const w = Math.min(220, pai.width - 16);
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
      width: w,
    });
  }

  const classe = variante === "entrada" ? "mapa-entrada" : "mapa-zona";
  const layout = mobile ? mapaLayout.mobile : null;
  const viewBox = mobile ? mapaLayout.mobile.viewBox : mapaLayout.desktop.viewBox;
  const r = mobile ? 7 : 5.5;

  return (
    <section className={`${classe}${mobile ? " mapa-empilhado" : ""}`}>
      <div className="col mapa-tela" ref={wrapRef}>
        <svg
          ref={svgRef}
          className="mapa"
          viewBox={viewBox}
          role="img"
          aria-label={ariaLabel}
          preserveAspectRatio="xMidYMid meet"
          onMouseLeave={() => setBalao(null)}
        >
          <g transform={layout?.continente}>
            <g dangerouslySetInnerHTML={{ __html: continente }} />
            <Pontos
              pontos={grupos.portugal}
              r={r}
              onShow={mostrar}
              onHide={() => setBalao(null)}
            />
          </g>
          <g transform={layout?.acores}>
            <g dangerouslySetInnerHTML={{ __html: molduraAcores + acores }} />
            <Pontos
              pontos={grupos.acores}
              r={r}
              onShow={mostrar}
              onHide={() => setBalao(null)}
            />
          </g>
          <g transform={layout?.madeira}>
            <g dangerouslySetInnerHTML={{ __html: molduraMadeira + madeira }} />
            <Pontos
              pontos={grupos.madeira}
              r={r}
              onShow={mostrar}
              onHide={() => setBalao(null)}
            />
          </g>
        </svg>

        {balao ? (
          <a
            className="mapa-balao"
            href={balao.url}
            style={{ left: balao.left, top: balao.top, width: balao.width }}
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
            Cada ponto é um sítio e a cor é a categoria.
            {mobile
              ? " Toca num ponto para abrir a ficha."
              : " Passa o rato para ver o nome."}
          </p>
        )}
      </div>
    </section>
  );
}
