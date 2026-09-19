import { allSitios, sortedForGrid } from "../lib/sitios";
import Indice from "../components/Indice";

export default function HomePage() {
  const sitios = sortedForGrid(allSitios());
  const n = sitios.length;

  return (
    <main id="principal">
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
    </main>
  );
}
