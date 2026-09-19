import { loadSitios, sitiosPath, sitiosStats } from "@/lib/sitios-store";

export const dynamic = "force-dynamic";

export default function AdminSistemaPage() {
  const sitios = loadSitios();
  const stats = sitiosStats(sitios);

  const rows = [
    ["Site", process.env.NEXT_PUBLIC_SITE_URL || "https://quase.pt"],
    ["Ambiente", process.env.NODE_ENV || "production"],
    ["DATA_DIR", process.env.DATA_DIR || "(data/ do repositório)"],
    ["Ficheiro", sitiosPath()],
    ["ADMIN_USER", process.env.ADMIN_USER ? "definido" : "em falta"],
    ["ADMIN_PASSWORD", process.env.ADMIN_PASSWORD ? "definido" : "em falta"],
    ["Total sítios", String(stats.total)],
    ["Com foto", String(stats.comFoto)],
    ["Com preço", String(stats.comPreco)],
    ["Com Instagram", String(stats.comInstagram)],
  ];

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Operação</p>
          <h1>Sistema</h1>
          <p className="admin-lead">Configuração e estado da infraestrutura.</p>
        </div>
      </header>

      <section className="admin-card">
        <dl className="admin-dl">
          {rows.map(([label, value]) => (
            <div key={label} className="admin-dl-row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <p className="admin-note">
        Autenticação Basic Auth (ADMIN_USER / ADMIN_PASSWORD), como no VagaSaúde.
        Alterações aos sítios gravam em sitios.json e passam a valer no site sem rebuild.
      </p>
    </main>
  );
}
