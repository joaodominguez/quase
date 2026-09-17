import Link from "next/link";

const tagLabel = {
  spa: "SPA",
  "piscina-interior": "Piscina interior",
  "piscina-exterior": "Piscina exterior",
  "piscina-quarto": "Piscina no quarto",
  termal: "Termal",
  wellness: "Wellness",
  design: "Design",
  historico: "Historico",
  cidade: "Cidade",
  mar: "Mar",
  vinho: "Vinho",
  jardim: "Jardim",
};

export default function HotelCard({ hotel, index = 0 }) {
  return (
    <Link
      className="hotel-link"
      href={`/ficar/${hotel.slug}/`}
      style={{ animationDelay: `${Math.min(index, 8) * 60}ms` }}
    >
      <p className="meta">
        {hotel.region} · {hotel.location}
      </p>
      <h3>{hotel.name}</h3>
      <p className="muted">{hotel.summary}</p>
      <div className="tag-row">
        {hotel.tags.slice(0, 3).map((tag) => (
          <span className="tag" key={tag}>
            {tagLabel[tag] || tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
