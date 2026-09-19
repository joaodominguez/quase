import HubPage from "@/components/HubPage";
import { sitiosByRegiao } from "@/lib/sitios";

export const metadata = {
  title: "Madeira",
  description: "Água quente na Madeira: palace spa e piscinas interiores.",
  alternates: { canonical: "/madeira/" },
};

export default function Page() {
  return (
    <HubPage
      title="Madeira"
      lead="Funchal e arredores — piscina interior para dias de nuvem."
      sitios={sitiosByRegiao("madeira")}
      kicker="Região"
    />
  );
}
