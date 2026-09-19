import HubPage from "../../components/HubPage";
import { sitiosByCategoria } from "../../lib/sitios";

export const metadata = {
  title: "Termas",
  description: "Termas e água mineral quente em Portugal, Açores e Madeira.",
  alternates: { canonical: "/termas/" },
};

export default function Page() {
  return (
    <HubPage
      title="Termas"
      lead="Água mineral quente — tanques, piscinas termais e balneários."
      sitios={sitiosByCategoria("termas")}
      kicker="Categoria"
    />
  );
}
