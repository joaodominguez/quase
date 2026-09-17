import { hotelsByHub } from "../../data/hotels";
import ReviewRow from "../components/ReviewRow";

const hubs = {
  portugal: {
    title: "Portugal continental",
    lead: "SPA, palaces termais e piscinas interiores — com preco, quando ir e temperatura de referencia.",
  },
  acores: {
    title: "Acores",
    lead: "Furnas, falésias e spa de ilha — agua quente quando o tempo muda.",
  },
  madeira: {
    title: "Madeira",
    lead: "Funchal e palace spa — piscina interior para dias de nuvem.",
  },
};

function HubPage({ hub }) {
  const copy = hubs[hub];
  const items = hotelsByHub(hub);

  return (
    <main>
      <header className="page-intro">
        <p className="section-label">Destino</p>
        <h1>{copy.title}</h1>
        <p className="lead">{copy.lead}</p>
      </header>
      <section className="section">
        <div className="wrap">
          <div className="review-list">
            {items.map((hotel) => (
              <ReviewRow hotel={hotel} key={hotel.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export function makeHub(hub) {
  return function Page() {
    return <HubPage hub={hub} />;
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
