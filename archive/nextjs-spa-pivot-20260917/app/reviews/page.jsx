import { hotels } from "../../data/hotels";
import ReviewCard from "../components/ReviewCard";

export const metadata = {
  title: "Todas as reviews",
  description:
    "Todas as reviews de hotéis com spa e piscina interior em Portugal, Açores e Madeira.",
  alternates: { canonical: "/reviews/" },
};

export default function ReviewsPage() {
  return (
    <main>
      <div className="wrap page-head">
        <p className="kicker">Reviews</p>
        <h1>Hotéis com spa e piscina interior</h1>
        <p>
          Cada ficha diz o essencial: porque importa, para quem e, melhor época, preço de
          partida e onde reservar.
        </p>
      </div>
      <section className="section">
        <div className="wrap">
          <div className="card-grid">
            {hotels.map((hotel) => (
              <ReviewCard hotel={hotel} key={hotel.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
