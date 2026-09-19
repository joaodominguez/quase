import { getSitioBySlug } from "@/lib/sitios";
import { loadSitios } from "@/lib/sitios-store";
import Ficha from "@/components/Ficha";

export function generateStaticParams() {
  return loadSitios()
    .filter((s) => (s.url || "").includes("/ficar/"))
    .map((s) => ({ slug: s.url.replace(/\/$/, "").split("/").pop() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sitio = getSitioBySlug(slug);
  if (!sitio) return { title: "Sítio" };
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
        <h1>Sítio não encontrado</h1>
      </main>
    );
  }
  return <Ficha sitio={sitio} />;
}
