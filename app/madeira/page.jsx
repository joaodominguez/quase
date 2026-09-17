import { hotelsByHub } from "../../data/hotels";
import HotelCard from "../components/HotelCard";

const copy = {
  title: "Madeira",
  lead: "Funchal e palace spa — piscina interior para quando as levadas ficam na nuvem.",
};

export const metadata = {
  title: copy.title,
  description: copy.lead,
  alternates: { canonical: "/madeira/" },
};

export default function MadeiraPage() {
  const items = hotelsByHub("madeira");

  return (
    <main>
      <header className="page-hero">
        <p className="eyebrow">Hub</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </header>
      <section className="section">
        <div className="hotel-grid">
          {items.map((hotel, index) => (
            <HotelCard hotel={hotel} index={index} key={hotel.slug} />
          ))}
        </div>
      </section>
    </main>
  );
}
