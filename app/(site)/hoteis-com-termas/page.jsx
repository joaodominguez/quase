import HubPage from "@/components/HubPage";
import { sitiosByCategoria } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Hotéis com termas",
  description: "Hotéis ligados a água termal em Portugal.",
  path: "/hoteis-com-termas/",
});

export default function Page() {
  return (
    <HubPage
      title="Hotéis com termas"
      lead="Dormir junto à água termal — palace, spa e jardins."
      sitios={sitiosByCategoria("hotel-termal")}
      kicker="Categoria"
      path="/hoteis-com-termas/"
    />
  );
}
