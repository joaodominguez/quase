import { allSitios, CAT_LABEL } from "../../lib/sitios";

export const metadata = {
  title: "Mapa",
  description: "Mapa dos sítios do quase em Portugal, Açores e Madeira.",
  alternates: { canonical: "/mapa/" },
};

export default function Page() {
  const sitios = allSitios().filter((s) => s.geo?.lat);

  return (
    <main id="principal">
      <div className="col">
        <div className="indice-topo">
          <h1>Mapa</h1>
          <p className="sub">
            {sitios.length} sítios com coordenadas. Abre cada um para a ficha completa.
          </p>
        </div>
        <ul className="mapa-lista" style={{ listStyle: "none", padding: 0, margin: "0 0 3rem" }}>
          {sitios.map((s) => (
            <li
              key={s.id}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "0.5rem 1rem",
                padding: "0.85rem 0",
                borderBottom: "1px solid var(--linha)",
              }}
            >
              <div>
                <a href={s.url} style={{ fontFamily: "var(--f-display)", fontSize: "1.15rem" }}>
                  {s.nome}
                </a>
                <div style={{ color: "var(--tinta-3)", fontSize: "0.85rem" }}>
                  {CAT_LABEL[s.categoria]} · {s.onde}
                  {s.carregador && s.carregador !== "desconhecido"
                    ? ` · EV: ${s.carregador === "sim" ? "no sítio" : s.carregador === "perto" ? "perto" : "não"}`
                    : ""}
                </div>
              </div>
              <a
                href={`https://www.google.com/maps?q=${s.geo.lat},${s.geo.lon}`}
                rel="nofollow noopener"
                target="_blank"
                style={{ alignSelf: "center", fontSize: "0.85rem", color: "var(--fria)" }}
              >
                Mapa
              </a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
