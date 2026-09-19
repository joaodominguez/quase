import Link from "next/link";
import { notFound } from "next/navigation";
import { getSitioById } from "@/lib/sitios-store";
import SitioEditForm from "@/components/SitioEditForm";

export const dynamic = "force-dynamic";

export default async function AdminSitioEditPage({ params }) {
  const { id } = await params;
  const sitio = getSitioById(id);
  if (!sitio) notFound();

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">
            <Link href="/admin/sitios/">Sítios</Link>
          </p>
          <h1>{sitio.nome}</h1>
          <p className="admin-lead">Editar ficha editorial.</p>
        </div>
      </header>
      <SitioEditForm sitio={sitio} />
    </main>
  );
}
