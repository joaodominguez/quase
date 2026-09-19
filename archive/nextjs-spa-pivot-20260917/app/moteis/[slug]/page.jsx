import Link from "next/link";
import { motels, getMotel, motelPrimaryUrl } from "../../../data/motels";

export function generateStaticParams() {
  return motels.map((motel) => ({ slug: motel.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const motel = getMotel(slug);
  if (!motel) {
    return { title: "Motel" };
  }

  return {
    title: motel.name,
    description: motel.summary,
    alternates: { canonical: `/moteis/${motel.slug}/` },
    openGraph: {
      title: `${motel.name} · quase`,
      description: motel.summary,
      url: `https://quase.pt/moteis/${motel.slug}/`,
      images: motel.image ? [{ url: motel.image }] : undefined,
    },
  };
}

function yesNo(value) {
  return value ? "Sim" : "Não";
}

export default async function MotelPage({ params }) {
  const { slug } = await params;
  const motel = getMotel(slug);

  if (!motel) {
    return (
      <main className="prose-page">
        <h1>Motel não encontrado</h1>
        <p>
          <Link href="/moteis/">Ver todos os motéis</Link>
        </p>
      </main>
    );
  }

  const related = motels.filter((item) => item.slug !== motel.slug).slice(0, 2);
  const ctaUrl = motelPrimaryUrl(motel);
  const isOfficial = Boolean(motel.officialUrl);

  return (
    <main>
      <header className="review-head">
        <div className="review-head-copy">
          <p className="kicker">
            Motéis · {motel.region} · {motel.location}
          </p>
          <h1>{motel.name}</h1>
          <p className="lead">{motel.summary}</p>
        </div>
        <div className="review-media">
          <img
            src={motel.image}
            alt={`${motel.name} — imagem ilustrativa`}
            fetchPriority="high"
          />
        </div>
      </header>

      <div className="wrap review-layout">
        <article className="prose">
          <h2>Porque importa</h2>
          <p>{motel.why}</p>

          <h2>Para quem</h2>
          <p>{motel.forWhom}</p>

          <h2>Estadia</h2>
          <p>{motel.stay.notes}</p>

          <figure>
            <img
              src={motel.image}
              alt={`${motel.name} — imagem ilustrativa`}
              loading="lazy"
            />
            <figcaption>
              {motel.imageCredit || "Imagem ilustrativa (não oficial)"}
            </figcaption>
          </figure>
        </article>

        <aside className="booking-panel">
          <h2>{motel.name}</h2>
          <p className="place">
            {motel.location} · {motel.area}
          </p>
          <ul className="panel-list">
            <li>
              <span>Desde</span>
              <strong>{motel.priceFrom}€</strong>
            </li>
            <li>
              <span>Nota preço</span>
              <strong>{motel.priceNote}</strong>
            </li>
            <li>
              <span>Estacionamento</span>
              <strong>{yesNo(motel.stay.parking)}</strong>
            </li>
            <li>
              <span>Estadia curta</span>
              <strong>{yesNo(motel.stay.shortStay)}</strong>
            </li>
            <li>
              <span>Noite</span>
              <strong>{yesNo(motel.stay.overnight)}</strong>
            </li>
          </ul>
          <a
            className="button button-primary"
            href={ctaUrl}
            rel={isOfficial ? "noopener" : "nofollow sponsored noopener"}
            target="_blank"
          >
            {isOfficial ? motel.officialLabel : "Ver disponibilidade"}
          </a>
          <p className="panel-note">
            Confirma preços, tipologias e disponibilidade directamente no motel.
          </p>
        </aside>
      </div>

      {related.length > 0 ? (
        <section className="section">
          <div className="wrap">
            <div className="section-head">
              <h2>Outros motéis</h2>
              <Link className="link-quiet" href="/moteis/">
                Ver todos →
              </Link>
            </div>
            <div className="rows">
              {related.map((item) => (
                <Link className="row" href={`/moteis/${item.slug}/`} key={item.slug}>
                  <div className="row-media">
                    <img src={item.image} alt="" loading="lazy" />
                  </div>
                  <div>
                    <h3>{item.name}</h3>
                    <p className="place">
                      {item.location} · {item.region}
                    </p>
                    <p>{item.summary}</p>
                  </div>
                  <div className="row-meta">
                    <span>desde {item.priceFrom}€</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </main>
  );
}
