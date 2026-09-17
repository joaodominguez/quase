import { hotelsByHub } from "../../data/hotels";
import HotelCard from "../components/HotelCard";

const copy = {
  title: "Portugal continental",
  lead: "SPA, palaces termais e piscinas interiores do Minho ao Algarve — com prioridade a agua quente.",
};

export const metadata = {
  title: copy.title,
  description: copy.lead,
  alternates: { canonical: "/portugal/" },
};

export default function PortugalPage() {
  const items = hotelsByHub("portugal");

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
