import HubPage from "../../components/HubPage";
import { sitiosByTipo } from "../../lib/sitios";

export const metadata = {
  title: "Motéis",
  description: "Motéis em Portugal: suítes, privacidade e estadias curtas.",
  alternates: { canonical: "/moteis/" },
};

export default function Page() {
  return (
    <HubPage
      title="Motéis"
      lead="Suítes privadas, estacionamento e estadias por horas ou noite."
      sitios={sitiosByTipo("motel")}
      kicker="Categoria"
    />
  );
}
