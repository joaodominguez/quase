import HubPage from "../../components/HubPage";
import { sitiosByRegiao } from "../../lib/sitios";

export const metadata = {
  title: "Portugal continental",
  description: "Água quente em Portugal continental: termas, hotéis e motéis.",
  alternates: { canonical: "/portugal/" },
};

export default function Page() {
  return (
    <HubPage
      title="Portugal continental"
      lead="Do Minho ao Algarve — termas, spas e piscinas interiores."
      sitios={sitiosByRegiao("portugal")}
      kicker="Região"
    />
  );
}
