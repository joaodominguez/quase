import HubPage from "@/components/HubPage";
import { sitiosByTipo } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Motéis",
  description: "Motéis em Portugal: suítes, privacidade e estadias curtas.",
  path: "/moteis/",
});

export default function Page() {
  return (
    <HubPage
      title="Motéis"
      lead="Suítes privadas, estacionamento e estadias por horas ou noite."
      sitios={sitiosByTipo("motel")}
      kicker="Categoria"
      path="/moteis/"
    />
  );
}
