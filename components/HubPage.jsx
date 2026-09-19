import Cartao from "./Cartao";
import JsonLd from "./JsonLd";
import { sortedForGrid } from "../lib/sitios-meta";
import { breadcrumbJsonLd, itemListJsonLd } from "../lib/seo";

export default function HubPage({
  title,
  lead,
  sitios,
  kicker = "Explorar",
  path = "/",
}) {
  const list = sortedForGrid(sitios);
  return (
    <main id="principal">
      <JsonLd
        data={[
          itemListJsonLd({
            name: title,
            description: lead,
            path,
            sitios: list,
          }),
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: title, path },
          ]),
        ]}
      />
      <div className="col">
        <div className="indice-topo">
          <p className="kicker-ficha">{kicker}</p>
          <h1>{title}</h1>
          <p className="sub">{lead}</p>
        </div>
        <div className="hub-lista">
          <ul className="grelha">
            {list.map((s) => (
              <Cartao key={s.id} sitio={s} />
            ))}
          </ul>
        </div>
      </div>
    </main>
  );
}
