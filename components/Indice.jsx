"use client";

import { useMemo, useState } from "react";
import Cartao from "./Cartao";

const LOTE = 12;

const TIPOS = [
  { id: "termas", label: "Termas", css: "var(--cat-termas)" },
  { id: "hotel-termal", label: "Hotéis com termas", css: "var(--cat-hotel-termal)" },
  { id: "hotel", label: "Hotéis com piscina interior", css: "var(--cat-hotel)" },
  { id: "jacuzzi-no-quarto", label: "Jacuzzi no quarto", css: "var(--cat-jacuzzi)" },
  { id: "motel", label: "Motéis", css: "var(--cat-motel)" },
];

export default function Indice({ sitios }) {
  const counts = useMemo(() => {
    const c = {};
    TIPOS.forEach((t) => {
      c[t.id] = sitios.filter((s) => s.categoria === t.id).length;
    });
    return c;
  }, [sitios]);

  const [tipos, setTipos] = useState(() =>
    Object.fromEntries(TIPOS.map((t) => [t.id, true])),
  );
  const [onde, setOnde] = useState(null);
  const [carro, setCarro] = useState(null);
  const [tem, setTem] = useState({});
  const [tudo, setTudo] = useState(false);

  const filtrados = useMemo(() => {
    return sitios.filter((s) => {
      if (!tipos[s.categoria]) return false;
      if (onde && s.regiao !== onde) return false;
      if (carro) {
        const [key, max] = carro.split("-");
        const h = s[key];
        if (h === null || h === undefined || h > parseFloat(max)) return false;
      }
      if (tem.preco && s.preco === null) return false;
      if (tem.foto && !s.imagem) return false;
      if (tem.ev && (!s.carregador || s.carregador === "desconhecido" || s.carregador === "nao"))
        return false;
      return true;
    });
  }, [sitios, tipos, onde, carro, tem]);

  const visiveis = tudo ? filtrados : filtrados.slice(0, LOTE);

  function toggleTipo(id) {
    setTipos((prev) => ({ ...prev, [id]: !prev[id] }));
    setTudo(false);
  }

  return (
    <>
      <form className="barra-filtros" id="indice" onSubmit={(e) => e.preventDefault()}>
        <div className="col">
          <fieldset>
            <legend className="saltar">Filtrar os sítios</legend>
            <div className="fila" id="f-tipos">
              {TIPOS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className="filtro"
                  data-tipo={t.id}
                  aria-pressed={tipos[t.id]}
                  style={{ "--c": t.css }}
                  onClick={() => toggleTipo(t.id)}
                >
                  <i />
                  {t.label} <b>{counts[t.id]}</b>
                </button>
              ))}
            </div>
            <div className="fila" id="f-onde">
              <button
                type="button"
                className="filtro"
                aria-pressed={onde === "portugal"}
                onClick={() => setOnde(onde === "portugal" ? null : "portugal")}
              >
                Portugal continental
              </button>
              <button
                type="button"
                className="filtro"
                aria-pressed={onde === "acores"}
                onClick={() => setOnde(onde === "acores" ? null : "acores")}
              >
                Açores
              </button>
              <button
                type="button"
                className="filtro"
                aria-pressed={onde === "madeira"}
                onClick={() => setOnde(onde === "madeira" ? null : "madeira")}
              >
                Madeira
              </button>
            </div>
            <div className="fila" id="f-carro">
              <button
                type="button"
                className="filtro"
                aria-pressed={carro === "porto-2"}
                onClick={() => setCarro(carro === "porto-2" ? null : "porto-2")}
              >
                ≤ 2 h do Porto
              </button>
              <button
                type="button"
                className="filtro"
                aria-pressed={carro === "lisboa-2"}
                onClick={() => setCarro(carro === "lisboa-2" ? null : "lisboa-2")}
              >
                ≤ 2 h de Lisboa
              </button>
            </div>
            <div className="fila" id="f-tem">
              <button
                type="button"
                className="filtro"
                aria-pressed={!!tem.preco}
                onClick={() => setTem((p) => ({ ...p, preco: !p.preco }))}
              >
                Com preço
              </button>
              <button
                type="button"
                className="filtro"
                aria-pressed={!!tem.foto}
                onClick={() => setTem((p) => ({ ...p, foto: !p.foto }))}
              >
                Com fotografia
              </button>
              <button
                type="button"
                className="filtro"
                aria-pressed={!!tem.ev}
                onClick={() => setTem((p) => ({ ...p, ev: !p.ev }))}
              >
                Com carregador EV
              </button>
            </div>
          </fieldset>
          <p className="contagem" id="f-contagem" aria-live="polite">
            {filtrados.length === sitios.length
              ? `${sitios.length} sítios`
              : `${filtrados.length} de ${sitios.length} sítios`}
          </p>
        </div>
      </form>

      <div className="col">
        <ul className="grelha grelha-densa" id="lista-sitios">
          {visiveis.map((s) => (
            <Cartao key={s.id} sitio={s} />
          ))}
        </ul>
        {!tudo && filtrados.length > LOTE ? (
          <button type="button" className="mostrar-mais" onClick={() => setTudo(true)}>
            Mostrar os {filtrados.length - LOTE} restantes
          </button>
        ) : null}
      </div>
    </>
  );
}
