import { getSitioBySlug } from "@/lib/sitios";
import { loadSitios } from "@/lib/sitios-store";
import Ficha from "@/components/Ficha";
import { sitioMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return loadSitios()
    .filter((s) => (s.url || "").includes("/termas/"))
    .map((s) => ({ slug: s.url.replace(/\/$/, "").split("/").pop() }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const sitio = getSitioBySlug(slug);
  if (!sitio) return { title: "Termas" };
  return sitioMetadata(sitio);
}

export default async function Page({ params }) {
  const { slug } = await params;
  const sitio = getSitioBySlug(slug);
  if (!sitio) {
    return (
      <main className="col prose-page">
        <h1>Termas não encontradas</h1>
      </main>
    );
  }
  return <Ficha sitio={sitio} />;
}
