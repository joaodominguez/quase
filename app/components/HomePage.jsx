import Link from "next/link";
import { hotels } from "../../data/hotels";
import { lists } from "../../data/lists";
import HotelCard from "./HotelCard";

export default function HomePage() {
  const featured = hotels.filter((hotel) =>
    ["six-senses-douro-valley", "octant-furnas", "the-yeatman", "savoy-palace-madeira"].includes(
      hotel.slug,
    ),
  );

  return (
    <main>
      <section className="hero" aria-label="Quase">
        <div className="hero-bg" aria-hidden="true" />
        <div className="hero-copy">
          <p className="hero-brand">quase</p>
          <h1>SPA e piscinas interiores para ficar.</h1>
          <p className="lead">
            Portugal, Acores e Madeira — hoteis escolhidos pela agua quente, o vapor e o
            silencio, nao pelo checklist turistico.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/listas/piscinas-interiores-portugal/">
              Ver piscinas interiores
            </Link>
            <Link className="button button-secondary" href="/listas/spa-fim-de-semana/">
              SPA de fim de semana
            </Link>
          </div>
        </div>
      </section>

      <section className="section" id="listas">
        <div className="section-head">
          <h2>Listas para comecar</h2>
          <p>Tres entradas. Uma ideia por pagina. Sem guias genericos de cidade.</p>
        </div>
        <div className="list-grid">
          {lists.map((list, index) => (
            <Link
              className="list-link"
              href={`/listas/${list.slug}/`}
              key={list.slug}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <p className="eyebrow">{list.region}</p>
              <h3>{list.title}</h3>
              <p className="muted">{list.summary}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="section" id="destaques">
        <div className="section-head">
          <h2>Primeiras fichas</h2>
          <p>
            Seleccao inicial — cada ficha diz se ha SPA, piscina interior ou agua no quarto.
          </p>
        </div>
        <div className="hotel-grid">
          {featured.map((hotel, index) => (
            <HotelCard hotel={hotel} index={index} key={hotel.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
