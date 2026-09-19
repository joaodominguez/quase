import HubPage from "../../components/HubPage";
import { sitiosByRegiao } from "../../lib/sitios";

export const metadata = {
  title: "Açores",
  description: "Água quente nos Açores: Furnas, Ferraria e hotéis com piscina interior.",
  alternates: { canonical: "/acores/" },
};

export default function Page() {
  return (
    <HubPage
      title="Açores"
      lead="Furnas, falésias e água quente quando o Atlântico muda de humor."
      sitios={sitiosByRegiao("acores")}
      kicker="Região"
    />
  );
}
