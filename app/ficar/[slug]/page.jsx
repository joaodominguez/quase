import Link from "next/link";
import { hotels, getHotel } from "../../../data/hotels";

export function generateStaticParams() {
  return hotels.map((hotel) => ({ slug: hotel.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const hotel = getHotel(slug);
  if (!hotel) {
    return { title: "Hotel" };
  }

  return {
    title: hotel.name,
    description: hotel.summary,
    alternates: { canonical: `/ficar/${hotel.slug}/` },
    openGraph: {
      title: `${hotel.name} · Quase`,
      description: hotel.summary,
      url: `https://quase.pt/ficar/${hotel.slug}/`,
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
      <main className="section">
        <p>Hotel nao encontrado.</p>
      </main>
    );
  }

  const bookingUrl = `https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(hotel.bookingQuery)}`;
  const hubLabel =
    hotel.hub === "portugal" ? "Portugal" : hotel.hub === "acores" ? "Acores" : "Madeira";

  return (
    <main>
      <header className="page-hero">
        <p className="eyebrow">
          {hotel.region} · {hotel.location}
        </p>
        <h1>{hotel.name}</h1>
        <p className="lead">{hotel.summary}</p>
      </header>

      <section className="section prose">
        <p>{hotel.why}</p>
        <p>
          <strong>Para quem:</strong> {hotel.forWhom}
        </p>
        <p>
          <strong>Epoca:</strong> {hotel.season}
        </p>

        <div className="water-facts" aria-label="Agua e spa">
          <div>
            <strong>SPA</strong>
            <span>{yesNo(hotel.water.spa)}</span>
          </div>
          <div>
            <strong>Piscina interior</strong>
            <span>{yesNo(hotel.water.indoorPool)}</span>
          </div>
          <div>
            <strong>Piscina no quarto</strong>
            <span>{yesNo(hotel.water.roomPool)}</span>
          </div>
          <div>
            <strong>Notas</strong>
            <span>{hotel.water.notes}</span>
          </div>
        </div>

        <div className="cta-row">
          <a className="button button-dark" href={bookingUrl} rel="nofollow sponsored" target="_blank">
            Ver disponibilidade
          </a>
          <Link className="button button-ghost" href={`/${hotel.hub}/`}>
            Mais em {hubLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
