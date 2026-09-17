import { hotelsByHub } from "../../data/hotels";
import ReviewRow from "./ReviewRow";

const hubs = {
  portugal: {
    title: "Portugal continental",
    lead: "Spa, palaces termais e piscinas interiores do Minho ao Algarve.",
  },
  acores: {
    title: "Açores",
    lead: "Furnas, falésias e água quente quando o tempo muda de humor.",
  },
  madeira: {
    title: "Madeira",
    lead: "Funchal e palace spa — piscina interior para dias de nuvem.",
  },
};

export function makeHub(hub) {
  return function HubPage() {
    const copy = hubs[hub];
    const items = hotelsByHub(hub);

    return (
      <main>
        <div className="wrap page-head">
          <p className="kicker">Destino</p>
          <h1>{copy.title}</h1>
          <p>{copy.lead}</p>
        </div>
        <section className="section">
          <div className="wrap">
            <div className="rows">
              {items.map((hotel) => (
                <ReviewRow hotel={hotel} key={hotel.slug} />
              ))}
            </div>
          </div>
        </section>
      </main>
    );
  };
}

export function hubMetadata(hub) {
  const copy = hubs[hub];
  return {
    title: copy.title,
    description: copy.lead,
    alternates: { canonical: `/${hub}/` },
  };
}
