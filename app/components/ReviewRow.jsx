import Link from "next/link";

export default function ReviewRow({ hotel }) {
  return (
    <Link className="row" href={`/ficar/${hotel.slug}/`}>
      <div className="row-media">
        <img src={hotel.image} alt={`${hotel.name} — imagem ilustrativa`} loading="lazy" />
      </div>
      <div>
        <p className="place">
          {hotel.location} · {hotel.region}
        </p>
        <h3>{hotel.name}</h3>
        <p>{hotel.summary}</p>
      </div>
      <div className="row-meta">
        <strong>{hotel.priceFrom}€</strong>
        {hotel.whenToGo} · {hotel.tempC}°C
      </div>
    </Link>
  );
}
