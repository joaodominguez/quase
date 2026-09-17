import { hotelsByHub } from "../../data/hotels";
import HotelCard from "../components/HotelCard";

const copy = {
  title: "Acores",
  lead: "Furnas, falésias e spa de ilha — onde a chuva e uma desculpa para entrar na agua.",
};

export const metadata = {
  title: copy.title,
  description: copy.lead,
  alternates: { canonical: "/acores/" },
};

export default function AcoresPage() {
  const items = hotelsByHub("acores");

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
