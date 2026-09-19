import Link from "next/link";

export default function ReviewCard({ hotel }) {
  return (
    <Link className="card" href={`/ficar/${hotel.slug}/`}>
      <div className="card-media">
        <img src={hotel.image} alt={`${hotel.name} — imagem ilustrativa`} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{hotel.name}</h3>
        <p className="place">
          {hotel.location} · {hotel.region}
        </p>
        <p>{hotel.summary}</p>
      </div>
      <div className="card-foot">
        <span>
          desde <strong>{hotel.priceFrom}€</strong>
        </span>
        <span>
          <strong>{hotel.tempC}°C</strong>
        </span>
      </div>
    </Link>
  );
}
