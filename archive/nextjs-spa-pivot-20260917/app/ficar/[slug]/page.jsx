import Link from "next/link";
import { hotels, getHotel, bookingUrl } from "../../../data/hotels";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) {
    return { title: "Review" };
  }

  return {
    title: hotel.name,
    description: hotel.summary,
    alternates: { canonical: `/ficar/${hotel.slug}/` },
    openGraph: {
      title: `${hotel.name} · quase`,
      description: hotel.summary,
      url: `https://quase.pt/ficar/${hotel.slug}/`,
      images: hotel.image ? [{ url: hotel.image }] : undefined,
    },
  };
}

function yesNo(value) {
  return value ? "Sim" : "Não";
}

export default async function HotelPage({ params }) {
  const { slug } = await params;
  const hotel = getHotel(slug);

  if (!hotel) {
    return (
      <main className="prose-page">
        <h1>Review não encontrada</h1>
        <p>
          <Link href="/reviews/">Ver todas as reviews</Link>
        </p>
      </main>
    );
  }

  const related = hotels.filter((item) => item.slug !== hotel.slug).slice(0, 2);
  const hubLabel =
    hotel.hub === "portugal" ? "Portugal" : hotel.hub === "acores" ? "Açores" : "Madeira";

  return (
    <main>
      <header className="review-head">
        <div className="review-head-copy">
          <p className="kicker">
            {hotel.region} · {hotel.location}
          </p>
          <h1>{hotel.name}</h1>
          <p className="lead">{hotel.summary}</p>
        </div>
        <div className="review-media">
          <img
            src={hotel.image}
            alt={`${hotel.name} — imagem ilustrativa`}
            fetchPriority="high"
          />
        </div>
      </header>

      <div className="wrap review-layout">
        <article className="prose">
          <h2>Porque importa</h2>
          <p>{hotel.why}</p>

          <h2>Para quem</h2>
          <p>{hotel.forWhom}</p>

          <h2>Melhor época</h2>
          <p>{hotel.season}</p>

          <h2>Água e spa</h2>
          <p>{hotel.water.notes}</p>

          <figure>
            <img
              src={hotel.image}
              alt={`Piscina interior — ${hotel.name}`}
              loading="lazy"
            />
            <figcaption>
              {hotel.imageCredit || "Imagem ilustrativa (não oficial)"}
            </figcaption>
          </figure>
        </article>

        <aside className="booking-panel">
          <h2>{hotel.name}</h2>
          <p className="place">{hotel.location}</p>
          <ul className="panel-list">
            <li>
              <span>Preço desde</span>
              <strong>{hotel.priceFrom}€</strong>
            </li>
            <li>
              <span>Quando ir</span>
              <strong>{hotel.whenToGo}</strong>
            </li>
            <li>
              <span>Temp. agora</span>
              <strong>{hotel.tempC}°C</strong>
            </li>
            <li>
              <span>Spa</span>
              <strong>{yesNo(hotel.water.spa)}</strong>
            </li>
            <li>
              <span>Piscina interior</span>
              <strong>{yesNo(hotel.water.indoorPool)}</strong>
            </li>
            <li>
              <span>Piscina no quarto</span>
              <strong>{yesNo(hotel.water.roomPool)}</strong>
            </li>
          </ul>
          <a
            className="button button-primary"
            href={bookingUrl(hotel)}
            rel="nofollow sponsored noopener"
            target="_blank"
          >
            Ver disponibilidade
          </a>
          <p className="panel-note">
            Reservar via {hotel.bookingLabel || "Booking"} ·{" "}
            <Link href={`/${hotel.hub}/`}>mais em {hubLabel}</Link>
          </p>
        </aside>
      </div>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="label">Relacionado</p>
          <div className="rows">
            {related.map((item) => (
              <Link className="row" href={`/ficar/${item.slug}/`} key={item.slug}>
                <div className="row-media">
                  <img src={item.image} alt={item.name} loading="lazy" />
                </div>
                <div>
                  <p className="place">
                    {item.location} · {item.region}
                  </p>
                  <h3>{item.name}</h3>
                  <p>{item.summary}</p>
                </div>
                <div className="row-meta">
                  <strong>{item.priceFrom}€</strong>
                  {item.tempC}°C
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
