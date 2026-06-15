"use client";

import { useMemo, useState } from "react";
import { collections, filters } from "../../data/collections";

const criteria = [
  {
    number: "01",
    title: "Personalidade",
    text: "Arquitectura, historia, paisagem, hospitalidade ou uma ligacao clara ao territorio.",
  },
  {
    number: "02",
    title: "Pequena escala",
    text: "Preferencia por projectos independentes, turismo rural e boutique stays.",
  },
  {
    number: "03",
    title: "Utilidade",
    text: "Para quem e ideal, melhor epoca, ambiente, acessos e pontos fracos.",
  },
  {
    number: "04",
    title: "Transparencia",
    text: "Links afiliados serao identificados. A escolha editorial continua separada.",
  },
];

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const visibleCollections = useMemo(() => {
    if (activeFilter === "all") {
      return collections;
    }

    return collections.filter((collection) => collection.tags.includes(activeFilter));
  }, [activeFilter]);

  return (
    <>
      <header className="site-header">
        <a className="brand" href="/" aria-label="Quase.pt inicio">
          <span className="brand-mark">q</span>
          <span>quase.pt</span>
        </a>
        <nav className="nav" aria-label="Navegacao principal">
          <a href="#colecoes">Colecoes</a>
          <a href="#criterios">Criterios</a>
          <a href="#afiliados">Afiliados</a>
          <a className="nav-cta" href="#newsletter">
            Newsletter
          </a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">Guia independente de estadias em Portugal</p>
            <h1>Pequenos refugios. Grandes desculpas para ficar.</h1>
            <p className="lead">
              Uma seleccao de herdades, casas de campo, boutique hoteis e alojamentos
              com personalidade, escolhidos para quem prefere descobrir antes de comparar.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#colecoes">
                Ver coleccoes
              </a>
              <a className="button button-secondary" href="#parcerias">
                Sugerir um lugar
              </a>
            </div>
          </div>

          <div className="hero-gallery" aria-label="Ambiente visual do Quase.pt">
            <article className="feature-stay feature-main">
              <span className="stay-kicker">Alentejo</span>
              <h2>Herdades de silencio, piscina e luz quente.</h2>
            </article>
            <article className="feature-stay feature-small feature-douro">
              <span className="stay-kicker">Douro</span>
              <p>Quintas com vista para vinhas.</p>
            </article>
            <article className="feature-stay feature-small feature-mar">
              <span className="stay-kicker">Costa</span>
              <p>Casas discretas perto do mar.</p>
            </article>
          </div>
        </section>

        <section className="section manifesto" id="manifesto">
          <p className="eyebrow">Manifesto</p>
          <div className="manifesto-grid">
            <h2>Menos lista interminavel. Mais curadoria com gosto.</h2>
            <p>
              O Quase.pt existe para encontrar projectos pequenos que se perdem entre
              anuncios, comparadores e rankings automaticos. Primeiro vem a historia do
              lugar. A reserva vem depois, com transparencia.
            </p>
          </div>
        </section>

        <section className="section collections" id="colecoes">
          <div className="section-heading">
            <p className="eyebrow">Coleccoes iniciais</p>
            <h2>Escolhe pelo tipo de escapadinha.</h2>
            <p>
              Ainda antes de ter centenas de fichas, o site deve organizar a descoberta
              por vontade: campo, mar, romantico, familia, isolamento, design ou mesa.
            </p>
          </div>

          <div className="filters" aria-label="Filtrar coleccoes">
            {filters.map((filter) => (
              <button
                className={`filter ${activeFilter === filter.id ? "is-active" : ""}`}
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
              >
                {filter.label}
              </button>
            ))}
          </div>

          <div className="collection-grid">
            {visibleCollections.map((collection) => (
              <article className={`collection-card card-${collection.tone}`} key={collection.id}>
                <div className="card-image" />
                <div className="card-body">
                  <span>{collection.region}</span>
                  <h3>{collection.title}</h3>
                  <p>{collection.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section criteria" id="criterios">
          <div className="section-heading compact">
            <p className="eyebrow">Como escolhemos</p>
            <h2>Bonito nao chega. Tem de fazer sentido.</h2>
          </div>
          <div className="criteria-list">
            {criteria.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <strong>{item.title}</strong>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section split affiliate" id="afiliados">
          <div>
            <p className="eyebrow">Modelo de afiliados</p>
            <h2>Reserva simples, contexto primeiro.</h2>
          </div>
          <div className="panel">
            <p>
              As futuras fichas podem incluir botoes como &quot;Ver disponibilidade&quot;,
              &quot;Reservar no parceiro&quot; ou &quot;Contactar directamente&quot;, sempre com
              aviso claro quando existir comissao.
            </p>
            <p className="note">
              O site podera receber comissoes por reservas feitas atraves de links
              afiliados, sem custo adicional para quem reserva.
            </p>
          </div>
        </section>

        <section className="section newsletter" id="newsletter">
          <div className="newsletter-card">
            <div>
              <p className="eyebrow">Newsletter</p>
              <h2>Uma descoberta por semana.</h2>
              <p>
                Um email curto com lugares bonitos, ideias de escapadinha e novidades
                do projecto.
              </p>
            </div>
            <form className="signup" action="mailto:ola@quase.pt" method="post" encType="text/plain">
              <label htmlFor="email">Email</label>
              <div className="signup-row">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="o-teu-email@exemplo.pt"
                  required
                />
                <button className="button button-primary" type="submit">
                  Receber
                </button>
              </div>
              <small>Sem spam. Apenas descobertas e novidades do Quase.pt.</small>
            </form>
          </div>
        </section>

        <section className="section split partners" id="parcerias">
          <div>
            <p className="eyebrow">Alojamentos e marcas</p>
            <h2>Tens um projecto pequeno, bonito e com historia?</h2>
          </div>
          <p>
            O Quase.pt procura herdades, casas de campo, boutique hoteis, experiencias
            locais e marcas portuguesas alinhadas com viagens tranquilas e autenticas.
            Escreve para <a href="mailto:ola@quase.pt">ola@quase.pt</a>.
          </p>
        </section>
      </main>

      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Quase.pt. Guia editorial independente.</p>
        <p>
          <a href="#afiliados">Aviso de afiliados</a>
          <span aria-hidden="true">/</span>
          <a href="mailto:ola@quase.pt">Contacto</a>
        </p>
      </footer>
    </>
  );
}
