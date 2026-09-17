import Link from "next/link";
import {
  getFeaturedHotel,
  getLatestReviews,
  bookingUrl,
} from "../../data/hotels";
import FactsRow from "./FactsRow";
import MediaBlock from "./MediaBlock";
import ReviewRow from "./ReviewRow";

export default function HomePage() {
  const featured = getFeaturedHotel();
  const latest = getLatestReviews(3, featured.slug);

  return (
    <main>
      <section className="hero" aria-label="Quase">
        <div className="hero-media" aria-hidden="true" />
        <div className="hero-inner">
          <p className="hero-brand">quase</p>
          <h1>Agua quente. Tempo lento.</h1>
          <p className="lead">
            SPA e piscinas interiores em Portugal, Acores e Madeira.
          </p>
          <Link className="button button-teal" href="#destaque">
            Explorar guia →
          </Link>
        </div>
      </section>

      <section className="section" id="destaque">
        <div className="wrap">
          <p className="section-label">Em destaque</p>
          <article className="featured">
            <MediaBlock tone={featured.tone} size="lg" />
            <div className="featured-body">
              <h3>{featured.name}</h3>
              <p className="featured-meta">
                {featured.location}, {featured.region}
              </p>
              <p className="featured-summary">{featured.summary}</p>
              <FactsRow hotel={featured} />
              <div className="button-row" style={{ marginTop: "1.25rem" }}>
                <Link className="button button-teal" href={`/ficar/${featured.slug}/`}>
                  Ler review →
                </Link>
                <a
                  className="button button-outline-dark"
                  href={bookingUrl(featured)}
                  rel="nofollow sponsored noopener"
                  target="_blank"
                >
                  Ver disponibilidade →
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" id="reviews" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="section-label">Ultimas reviews</p>
          <h2 className="section-title">Mais fichas para ler</h2>
          <div className="review-list">
            {latest.map((hotel) => (
              <ReviewRow hotel={hotel} key={hotel.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="reservar" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <p className="section-label">Onde reservar</p>
          <h2 className="section-title">Links de reserva</h2>
          <div className="booking-note">
            <p>
              Em cada review indicamos onde reservar. Quando existir parceria, usamos links
              afiliados — a escolha editorial continua independente.
            </p>
            <div className="booking-links">
              <a
                href={bookingUrl(featured)}
                rel="nofollow sponsored noopener"
                target="_blank"
              >
                Booking
              </a>
              <span>Site oficial do hotel (quando indicado na ficha)</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
