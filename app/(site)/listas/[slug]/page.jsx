import HubPage from "@/components/HubPage";
import { allSitios, sitiosByRegiao, sitiosByCategoria } from "@/lib/sitios";
import { hubMetadata } from "@/lib/seo";

const LISTAS = {
  "agua-quente-em-janeiro": {
    title: "Onde há água quente em Portugal em janeiro",
    lead: "Termas e hotéis com piscina interior — o inverno não manda parar.",
    pick: () =>
      allSitios().filter(
        (s) =>
          s.categoria === "termas" ||
          s.categoria === "hotel-termal" ||
          s.categoria === "hotel",
      ),
  },
  "piscinas-interiores-portugal": {
    title: "Hotéis com piscina interior aquecida em Portugal",
    lead: "Piscina coberta no continente, Açores e Madeira.",
    pick: () =>
      allSitios().filter(
        (s) => s.categoria === "hotel" || s.categoria === "hotel-termal",
      ),
  },
  "spa-acores-madeira": {
    title: "Spa e água quente nos Açores e na Madeira",
    lead: "Ilhas com termas e piscinas interiores.",
    pick: () => [...sitiosByRegiao("acores"), ...sitiosByRegiao("madeira")],
  },
  "spa-fim-de-semana": {
    title: "Spa para um fim de semana",
    lead: "Opções com boa ligação de carro a Lisboa ou Porto.",
    pick: () =>
      allSitios().filter(
        (s) =>
          (s.lisboa != null && s.lisboa <= 2.5) ||
          (s.porto != null && s.porto <= 2.5),
      ),
  },
};

export function generateStaticParams() {
  return Object.keys(LISTAS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const L = LISTAS[slug];
  if (!L) return { title: "Lista" };
  return hubMetadata({
    title: L.title,
    description: L.lead,
    path: `/listas/${slug}/`,
  });
}

export default async function Page({ params }) {
  const { slug } = await params;
  const L = LISTAS[slug];
  if (!L) {
    return (
      <main className="col prose-page">
        <h1>Lista não encontrada</h1>
      </main>
    );
  }
  return (
    <HubPage
      title={L.title}
      lead={L.lead}
      sitios={L.pick()}
      kicker="Lista"
      path={`/listas/${slug}/`}
    />
  );
}
