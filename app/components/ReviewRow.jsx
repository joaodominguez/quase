import Link from "next/link";
import MediaBlock from "./MediaBlock";

export default function ReviewRow({ hotel }) {
  return (
    <Link className="review-row" href={`/ficar/${hotel.slug}/`}>
      <MediaBlock
        src={hotel.image}
        alt={`${hotel.name} — imagem ilustrativa`}
        tone={hotel.tone}
        size="sm"
      />
      <div>
        <h3>{hotel.name}</h3>
        <p className="muted">
          {hotel.location} · {hotel.region}
        </p>
        <p className="blurb">{hotel.summary}</p>
      </div>
      <div className="review-stats">
        <div>
          <strong>{hotel.priceFrom}€</strong>/noite
        </div>
        <div>{hotel.whenToGo}</div>
        <div>{hotel.tempC}°C</div>
      </div>
      <span className="review-chevron" aria-hidden="true">
        ›
      </span>
    </Link>
  );
}
