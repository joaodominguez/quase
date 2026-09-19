import Link from "next/link";
import { loadSitios, sitiosStats } from "@/lib/sitios-store";

export const dynamic = "force-dynamic";

export default function AdminPage() {
  const sitios = loadSitios();
  const stats = sitiosStats(sitios);

  const metrics = [
    { label: "Sítios", value: stats.total, detail: Object.entries(stats.byTipo).map(([k, v]) => `${k}: ${v}`).join(" · ") },
    { label: "Com foto", value: stats.comFoto, detail: `${stats.semFoto} sem foto` },
    { label: "Com preço", value: stats.comPreco, detail: `${stats.semPreco} sem preço` },
    { label: "Instagram", value: stats.comInstagram, detail: `${stats.comBooking} com Booking` },
  ];

  const recent = [...sitios]
    .filter((s) => !s.imagem || s.preco == null || !s.instagram)
    .slice(0, 8);

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Operação</p>
          <h1>Visão geral</h1>
          <p className="admin-lead">Estado actual do catálogo quase.</p>
        </div>
        <a className="botao botao-secundario" href="/" target="_blank" rel="noreferrer">
          Ver site
        </a>
      </header>

      <section className="admin-metrics">
        {metrics.map((m) => (
          <article key={m.label} className="admin-metric">
            <p className="admin-metric-value">{m.value}</p>
            <p className="admin-metric-label">{m.label}</p>
            <p className="admin-metric-detail">{m.detail}</p>
          </article>
        ))}
      </section>

      <section className="admin-card">
        <div className="admin-card-head">
          <div>
            <h2>A completar</h2>
            <p>Sítios sem foto, preço ou Instagram.</p>
          </div>
          <Link href="/admin/sitios/">Ver todos</Link>
        </div>
        <div className="admin-list">
          {recent.length === 0 && (
            <p className="admin-empty">Nada pendente neste filtro rápido.</p>
          )}
          {recent.map((s) => (
            <div key={s.id} className="admin-row">
              <div>
                <p className="admin-row-title">{s.nome}</p>
                <p className="admin-row-meta">
                  {s.onde}
                  {!s.imagem ? " · sem foto" : ""}
                  {s.preco == null ? " · sem preço" : ""}
                  {!s.instagram ? " · sem Instagram" : ""}
                </p>
              </div>
              <Link href={`/admin/sitios/${s.id}/`}>Editar</Link>
            </div>
          ))}
        </div>
      </section>

      {stats.obras > 0 && (
        <p className="admin-note">{stats.obras} sítio(s) marcado(s) como obras.</p>
      )}
    </main>
  );
}
