import { getSitioBySlug, allSitios } from "../../../lib/sitios";
import Ficha from "../../../components/Ficha";

export function generateStaticParams() {
  return allSitios()
    .filter((s) => (s.url || "").includes("/moteis/"))
    .map((s) => ({ slug: s.url.replace(/\/$/, "").split("/").pop() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sitio = getSitioBySlug(slug);
  if (!sitio) return { title: "Motel" };
  return {
    title: `${sitio.nome} — ${sitio.onde?.split(",")[0] || ""}`.replace(/ — $/, ""),
    description: sitio.resumo,
    alternates: { canonical: sitio.url },
  };
}

export default async function Page({ params }) {
  const { slug } = await params;
  const sitio = getSitioBySlug(slug);
  if (!sitio) {
    return (
      <main className="col prose-page">
        <h1>Motel não encontrado</h1>
      </main>
    );
  }
  return <Ficha sitio={sitio} />;
}
