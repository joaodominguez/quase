import HubPage from "@/components/HubPage";
import { sitiosByCategoria } from "@/lib/sitios";

export const metadata = {
  title: "Jacuzzi no quarto",
  description: "Alojamentos com jacuzzi ou piscina privativa no quarto.",
  alternates: { canonical: "/jacuzzi-no-quarto/" },
};

export default function Page() {
  return (
    <HubPage
      title="Jacuzzi no quarto"
      lead="Água quente sem sair do quarto."
      sitios={sitiosByCategoria("jacuzzi-no-quarto")}
      kicker="Categoria"
    />
  );
}
