import Cartao from "./Cartao";
import { sortedForGrid } from "../lib/sitios-meta";

export default function HubPage({
  title,
  lead,
  sitios,
  kicker = "Explorar",
}) {
  const list = sortedForGrid(sitios);
  return (
    <main id="principal">
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
