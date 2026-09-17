import Link from "next/link";
import { hotels, getHotel, bookingUrl } from "../../../data/hotels";
import FactsRow from "../../components/FactsRow";

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
      title: `${hotel.name} · Quase`,
      description: hotel.summary,
      url: `https://quase.pt/ficar/${hotel.slug}/`,
      images: hotel.image ? [{ url: hotel.image }] : undefined,
    },
  };
}

function yesNo(value) {
  return value ? "Sim" : "Nao";
}

export default async function HotelPage({ params }) {
  const { slug } = await params;
  const hotel = getHotel(slug);

  if (!hotel) {
    return (
      <main className="legal">
        <p>Review nao encontrada.</p>
      </main>
    );
  }

  const hubLabel =
    hotel.hub === "portugal" ? "Portugal" : hotel.hub === "acores" ? "Acores" : "Madeira";

  return (
    <main>
      <header className="review-hero">
        <div className="media review-hero-media" data-tone={hotel.tone}>
          <img
            src={hotel.image}
            alt={`${hotel.name} — imagem ilustrativa`}
            fetchPriority="high"
          />
        </div>
        <div className="review-hero-inner">
          <p className="eyebrow">
            {hotel.region} · {hotel.location}
          </p>
          <h1>{hotel.name}</h1>
          <p className="lead">{hotel.summary}</p>
        </div>
      </header>

      <article className="review-body">
        <h2>Porque e que importa</h2>
        <p>{hotel.why}</p>

        <h2>Para quem e</h2>
        <p>{hotel.forWhom}</p>

        <h2>Melhor epoca</h2>
        <p>{hotel.season}</p>

        <h2>Agua e spa</h2>
        <p>
          SPA: {yesNo(hotel.water.spa)}. Piscina interior: {yesNo(hotel.water.indoorPool)}.
          Piscina no quarto: {yesNo(hotel.water.roomPool)}. {hotel.water.notes}
        </p>

        <FactsRow hotel={hotel} />

        {hotel.imageCredit ? (
          <p className="image-credit">Foto: {hotel.imageCredit}</p>
        ) : null}
      </article>

      <div className="review-actions">
        <a
          className="button button-teal"
          href={bookingUrl(hotel)}
          rel="nofollow sponsored noopener"
          target="_blank"
        >
          Ver disponibilidade
        </a>
        <Link className="button button-outline-dark" href={`/${hotel.hub}/`}>
          Mais em {hubLabel} →
        </Link>
      </div>
    </main>
  );
}
