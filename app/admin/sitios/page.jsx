import Link from "next/link";
import { loadSitios } from "@/lib/sitios-store";
import { CAT_LABEL } from "@/lib/sitios-meta";

export const dynamic = "force-dynamic";

const TIPO_LABEL = {
  hotel: "Hotéis",
  termas: "Termas",
  motel: "Motéis",
};

export default async function AdminSitiosPage({ searchParams }) {
  const params = await searchParams;
  const q = (params.q || "").trim().toLowerCase();
  const tipo = (params.tipo || "all").trim();
  const falta = (params.falta || "all").trim();

  const sitios = loadSitios();
  let filtered = sitios;

  if (tipo !== "all") {
    filtered = filtered.filter((s) => s.tipo === tipo);
  }
  if (falta === "foto") filtered = filtered.filter((s) => !s.imagem);
  if (falta === "preco") filtered = filtered.filter((s) => s.preco == null);
  if (falta === "instagram") filtered = filtered.filter((s) => !s.instagram);
  if (q) {
    filtered = filtered.filter((s) => {
      const blob = `${s.nome} ${s.onde} ${s.id} ${s.regiao}`.toLowerCase();
      return blob.includes(q);
    });
  }

  filtered = [...filtered].sort((a, b) => a.nome.localeCompare(b.nome, "pt"));

  const tipoFilters = [
    { key: "all", label: "Todos" },
    { key: "hotel", label: "Hotéis" },
    { key: "termas", label: "Termas" },
    { key: "motel", label: "Motéis" },
  ];
  const faltaFilters = [
    { key: "all", label: "Qualquer" },
    { key: "foto", label: "Sem foto" },
    { key: "preco", label: "Sem preço" },
    { key: "instagram", label: "Sem Instagram" },
  ];

  function hrefFor({ tipo: t = tipo, falta: f = falta, q: query = q }) {
    const sp = new URLSearchParams();
    if (t && t !== "all") sp.set("tipo", t);
    if (f && f !== "all") sp.set("falta", f);
    if (query) sp.set("q", query);
    const s = sp.toString();
    return s ? `/admin/sitios/?${s}` : "/admin/sitios/";
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-kicker">Conteúdo</p>
          <h1>Sítios</h1>
          <p className="admin-lead">
            {filtered.length} de {sitios.length} registos
          </p>
        </div>
      </header>

      <form className="admin-search" action="/admin/sitios/" method="get">
        {tipo !== "all" && <input type="hidden" name="tipo" value={tipo} />}
        {falta !== "all" && <input type="hidden" name="falta" value={falta} />}
        <input
          type="search"
          name="q"
          defaultValue={q}
          placeholder="Procurar por nome, local ou id…"
          aria-label="Procurar sítios"
        />
        <button type="submit" className="botao botao-secundario">
          Procurar
        </button>
      </form>

      <div className="admin-filters">
        {tipoFilters.map((f) => (
          <Link
            key={f.key}
            href={hrefFor({ tipo: f.key })}
            className={`admin-chip${tipo === f.key ? " is-active" : ""}`}
          >
            {f.label}
          </Link>
        ))}
      </div>
      <div className="admin-filters">
        {faltaFilters.map((f) => (
          <Link
            key={f.key}
            href={hrefFor({ falta: f.key })}
            className={`admin-chip${falta === f.key ? " is-active" : ""}`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <section className="admin-card">
        <div className="admin-list">
          {filtered.length === 0 && (
            <p className="admin-empty">Nenhum sítio neste filtro.</p>
          )}
          {filtered.map((s) => (
            <article key={s.id} className="admin-row">
              <div className="admin-row-body">
                <p className="admin-row-title">{s.nome}</p>
                <p className="admin-row-meta">
                  {TIPO_LABEL[s.tipo] || s.tipo}
                  {" · "}
                  {CAT_LABEL[s.categoria] || s.categoria}
                  {" · "}
                  {s.onde}
                  {s.estado === "obras" ? " · obras" : ""}
                </p>
                <p className="admin-row-flags">
                  {s.imagem ? "foto" : "sem foto"}
                  {" · "}
                  {s.preco != null ? `${s.preco} €` : "sem preço"}
                  {" · "}
                  {s.instagram ? "IG" : "sem IG"}
                </p>
              </div>
              <div className="admin-row-actions">
                <Link href={`/admin/sitios/${s.id}/`}>Editar</Link>
                <a href={s.url} target="_blank" rel="noreferrer">
                  Ver
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
