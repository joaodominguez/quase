import HubPage from "@/components/HubPage";
import { sitiosByRegiao } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Madeira",
  description: "Água quente na Madeira: palace spa e piscinas interiores.",
  path: "/madeira/",
});

export default function Page() {
  return (
    <HubPage
      title="Madeira"
      lead="Funchal e arredores — piscina interior para dias de nuvem."
      sitios={sitiosByRegiao("madeira")}
      kicker="Região"
      path="/madeira/"
    />
  );
}
