import Link from "next/link";
import {
  hotels,
  getFeaturedHotel,
  getLatestReviews,
  bookingUrl,
} from "../../data/hotels";
import FactsRow from "./FactsRow";
import ReviewCard from "./ReviewCard";

const minPrice = Math.min(...hotels.map((hotel) => hotel.priceFrom));

export default function HomePage() {
  const featured = getFeaturedHotel();
  const latest = getLatestReviews(3, featured.slug);

  return (
    <main>
      <section className="hero">
        <div className="hero-copy">
          <p className="kicker">Guia de spa e piscinas interiores</p>
          <h1>
            Água quente,
            <br />
            tempo lento.
          </h1>
          <p>
            Reviews de hotéis com spa e piscina interior em Portugal, Açores e Madeira.
            Para quem viaja para repousar, não para passar a correr.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/reviews/">
              Ver reviews
            </Link>
            <Link className="link-quiet" href="/como-escolhemos/">
              Como escolhemos →
            </Link>
          </div>
        </div>
        <div className="hero-media">
          <img
            src="/images/hero/home-v2.jpg"
            alt="Piscina interior com vapor — imagem ilustrativa"
            fetchPriority="high"
          />
          <p className="media-caption">
            {featured.name} · {featured.location}
          </p>
        </div>
      </section>

      <section className="stats" aria-label="Resumo do guia">
        <div>
          <strong>{hotels.length}</strong>
          <span>Reviews</span>
        </div>
        <div>
          <strong>3</strong>
          <span>Regiões</span>
        </div>
        <div>
          <strong>{minPrice}€</strong>
          <span>Preços desde</span>
        </div>
        <div>
          <strong>Hoje</strong>
          <span>Actualizado</span>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <p className="label">Review em destaque</p>
          <article className="featured">
            <div className="featured-media">
              <img
                src={featured.image}
                alt={`${featured.name} — imagem ilustrativa`}
                fetchPriority="high"
              />
            </div>
            <div>
              <h3>{featured.name}</h3>
              <p className="place">
                {featured.location} · {featured.region}
              </p>
              <p className="excerpt">{featured.summary}</p>
              <FactsRow hotel={featured} />
              <div className="actions">
                <Link className="button button-primary" href={`/ficar/${featured.slug}/`}>
                  Ler review
                </Link>
                <a
                  className="button button-ghost"
                  href={bookingUrl(featured)}
                  rel="nofollow sponsored noopener"
                  target="_blank"
                >
                  Ver disponibilidade
                </a>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="section-head">
            <h2>Ultimas reviews</h2>
            <Link className="link-quiet" href="/reviews/">
              Ver todas →
            </Link>
          </div>
          <div className="card-grid">
            {latest.map((hotel) => (
              <ReviewCard hotel={hotel} key={hotel.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
