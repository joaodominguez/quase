import HubPage from "../../components/HubPage";
import { sitiosByCategoria } from "../../lib/sitios";

export const metadata = {
  title: "Hotéis com termas",
  description: "Hotéis ligados a água termal em Portugal.",
  alternates: { canonical: "/hoteis-com-termas/" },
};

export default function Page() {
  return (
    <HubPage
      title="Hotéis com termas"
      lead="Dormir junto à água termal — palace, spa e jardins."
      sitios={sitiosByCategoria("hotel-termal")}
      kicker="Categoria"
    />
  );
}
