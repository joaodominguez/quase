import HubPage from "@/components/HubPage";
import { sitiosByCategoria } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Termas",
  description: "Termas e água mineral quente em Portugal, Açores e Madeira.",
  path: "/termas/",
});

export default function Page() {
  return (
    <HubPage
      title="Termas"
      lead="Água mineral quente — tanques, piscinas termais e balneários."
      sitios={sitiosByCategoria("termas")}
      kicker="Categoria"
      path="/termas/"
    />
  );
}
