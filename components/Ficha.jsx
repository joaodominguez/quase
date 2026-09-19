import Cartao from "./Cartao";
import {
  CAT_LABEL,
  CAT_CLASS,
  carregadorLabel,
  mapsUrl,
  nearby,
} from "../lib/sitios";

export default function Ficha({ sitio }) {
  const cat = CAT_LABEL[sitio.categoria] || sitio.categoria;
  const catClass = CAT_CLASS[sitio.categoria] || "cat-hotel";
  const proximos = nearby(sitio, 3);
  const maps = mapsUrl(sitio);
  const sub =
    sitio.sub ||
    `${sitio.onde}. ${sitio.estado === "aberto" ? "Aberto." : ""}`.trim();

  return (
    <main id="principal">
      <section className={`heroi ${catClass}`}>
        <div className="col">
          <p className="kicker-ficha">{cat}</p>
          <h1>{sitio.nome}</h1>
          <p className="sub">{sub}</p>
        </div>
      </section>

      <div className="col">
        <div className="medidas">
          {sitio.quando ? (
            <div className="medida">
              <div className="k">quando ir</div>
              <div className="v" style={{ fontSize: 17 }}>
                {sitio.quando}
              </div>
            </div>
          ) : null}
          {sitio.temp != null ? (
            <div className="medida">
              <div className="k">temperatura</div>
              <div className="v">{sitio.temp}°</div>
            </div>
          ) : null}
          {sitio.preco != null ? (
            <div className="medida">
              <div className="k">preço</div>
              <div className="v">{sitio.preco} €</div>
            </div>
          ) : null}
        </div>

        <div className="ficha-corpo">
          <div>
            <p>{sitio.resumo}</p>
            <h2>A água</h2>
            <p>
              {sitio.agua ||
                "Ainda não medimos a água deste sítio. Quando medirmos, fica aqui a temperatura à superfície e a meio, com a hora e o dia da medição."}
            </p>
            <h2>Ficar lá</h2>
            <p>
              {sitio.ficar ||
                (sitio.tipo === "motel"
                  ? "Motel com suítes privadas. Confirma tipologias, duração e preços no site oficial ou na reserva."
                  : sitio.tipo === "termas"
                    ? "Espaço termal de visita. Confirma horários e preços de entrada antes de ires."
                    : "A piscina interior é aquecida. Confirma detalhes e disponibilidade antes de reservar.")}
            </p>
            {sitio.imagem ? (
              <figure className="ficha-foto">
                <img src={sitio.imagem} alt={sitio.nome} loading="lazy" />
                {sitio.credito ? <figcaption>{sitio.credito}</figcaption> : null}
              </figure>
            ) : null}
          </div>

          <div className="lado">
            <dl>
              <dt>onde</dt>
              <dd>{sitio.onde}</dd>
              {sitio.quando ? (
                <>
                  <dt>quando ir</dt>
                  <dd>{sitio.quando}</dd>
                </>
              ) : null}
              {sitio.preco != null ? (
                <>
                  <dt>preço</dt>
                  <dd>
                    {sitio.preco} €
                    {sitio.precoUnidade ? ` / ${sitio.precoUnidade}` : ""}
                  </dd>
                </>
              ) : null}
              <dt>carregador elétrico</dt>
              <dd>{carregadorLabel(sitio)}</dd>
              {sitio.oficialUrl ? (
                <>
                  <dt>site oficial</dt>
                  <dd>
                    <a href={sitio.oficialUrl} rel="noopener" target="_blank">
                      Abrir site
                    </a>
                  </dd>
                </>
              ) : null}
            </dl>

            {sitio.bookingUrl ? (
              <>
                <a
                  className="botao booking"
                  href={sitio.bookingUrl}
                  rel="sponsored nofollow noopener"
                  target="_blank"
                >
                  Ver preços na Booking
                </a>
                <p className="fonte">
                  Ligação de afiliado: se reservares por aqui não pagas mais, e é o que
                  mantém o guia de pé.
                </p>
              </>
            ) : null}

            {maps ? (
              <>
                <a
                  className="botao levar"
                  href={maps}
                  rel="nofollow noopener"
                  target="_blank"
                >
                  Levar-me lá
                </a>
                <p className="fonte">Abre a rota no Google Maps para a morada exacta.</p>
              </>
            ) : null}
          </div>
        </div>

        {proximos.length ? (
          <section className="seccao proximos">
            <p className="q">Perto daqui</p>
            <ul className="grelha">
              {proximos.map((p) => (
                <Cartao key={p.id} sitio={p} />
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </main>
  );
}
