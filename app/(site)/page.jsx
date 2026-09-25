import { allSitios, sortedForGrid } from "@/lib/sitios";
import Indice from "@/components/Indice";
import MapaIlustrado from "@/components/MapaIlustrado";
import JsonLd from "@/components/JsonLd";
import {
  SITE_DESCRIPTION,
  SITE_NAME,
  itemListJsonLd,
  pageSocial,
  websiteJsonLd,
} from "@/lib/seo";

const HOME_TITLE = `${SITE_NAME} — onde há água quente em Portugal`;

export const metadata = {
  title: { absolute: HOME_TITLE },
  description: SITE_DESCRIPTION,
  alternates: { canonical: "/" },
  ...pageSocial({
    title: HOME_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
  }),
};

export default function HomePage() {
  const sitios = sortedForGrid(allSitios());
  const n = sitios.length;

  return (
    <main id="principal">
      <JsonLd
        data={[
          websiteJsonLd(),
          itemListJsonLd({
            name: "Sítios com água aquecida em Portugal",
            description: SITE_DESCRIPTION,
            path: "/",
            sitios,
          }),
        ]}
      />
      <div className="col">
        <div className="indice-topo">
          <h1>
            {n === 103
              ? "Cento e três sítios em Portugal onde se entra em água aquecida"
              : `${n} sítios em Portugal onde se entra em água aquecida`}
          </h1>
          <p className="sub">
            Termas, hotéis com piscina interior e motéis. Estão todos nesta página. Reduz com
            os filtros até sobrar o que serve.
          </p>
        </div>
      </div>
      <Indice sitios={sitios} />
      <MapaIlustrado sitios={sitios} variante="entrada" />
    </main>
  );
}
