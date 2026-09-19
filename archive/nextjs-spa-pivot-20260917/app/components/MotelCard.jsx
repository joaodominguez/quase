import Link from "next/link";

export default function MotelCard({ motel }) {
  return (
    <Link className="card" href={`/moteis/${motel.slug}/`}>
      <div className="card-media">
        <img src={motel.image} alt={`${motel.name} — imagem ilustrativa`} loading="lazy" />
      </div>
      <div className="card-body">
        <h3>{motel.name}</h3>
        <p className="place">
          {motel.location} · {motel.region}
        </p>
        <p>{motel.summary}</p>
      </div>
      <div className="card-foot">
        <span>
          desde <strong>{motel.priceFrom}€</strong>
        </span>
        <span>
          <strong>{motel.tempC}°C</strong>
        </span>
      </div>
    </Link>
  );
}
