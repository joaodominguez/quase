import { allSitios } from "@/lib/sitios";
import MapaIlustrado from "@/components/MapaIlustrado";

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
        <div className="mapa-topo">
          <h1>Onde é que isto fica</h1>
          <p>
            Os {sitios.length} sítios do guia. Cada ponto é um, a cor é a categoria, e carregar
            abre a ficha.
          </p>
          <div className="mapa-legenda" aria-hidden="true">
            <span style={{ "--c": "var(--cat-termas)" }}>
              <i /> Termas
            </span>
            <span style={{ "--c": "var(--cat-hotel-termal)" }}>
              <i /> Hotéis com termas
            </span>
            <span style={{ "--c": "var(--cat-hotel)" }}>
              <i /> Piscina interior
            </span>
            <span style={{ "--c": "var(--cat-jacuzzi)" }}>
              <i /> Jacuzzi no quarto
            </span>
            <span style={{ "--c": "var(--cat-motel)" }}>
              <i /> Motéis
            </span>
          </div>
        </div>
      </div>
      <MapaIlustrado sitios={sitios} variante="pagina" />
    </main>
  );
}
