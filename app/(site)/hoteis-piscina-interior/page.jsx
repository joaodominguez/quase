import HubPage from "@/components/HubPage";
import { sitiosByCategoria } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Hotéis com piscina interior",
  description: "Hotéis com piscina interior aquecida em Portugal, Açores e Madeira.",
  path: "/hoteis-piscina-interior/",
});

export default function Page() {
  return (
    <HubPage
      title="Hotéis com piscina interior"
      lead="Piscina coberta e aquecida — o plano B (ou A) para chuva e inverno."
      sitios={sitiosByCategoria("hotel")}
      kicker="Categoria"
      path="/hoteis-piscina-interior/"
    />
  );
}
