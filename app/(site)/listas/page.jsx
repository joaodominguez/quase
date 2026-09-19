import Link from "next/link";

export const metadata = {
  title: "Listas",
  description: "Listas editoriais do quase sobre água quente em Portugal.",
  alternates: { canonical: "/listas/" },
};

const LISTAS = [
  {
    slug: "agua-quente-em-janeiro",
    title: "Onde há água quente em Portugal em janeiro",
    lead: "Termas e piscinas interiores para o mês mais frio.",
  },
  {
    slug: "piscinas-interiores-portugal",
    title: "Hotéis com piscina interior aquecida em Portugal",
    lead: "Quando chove, a água continua lá dentro.",
  },
  {
    slug: "spa-acores-madeira",
    title: "Spa e água quente nos Açores e na Madeira",
    lead: "Ilhas com argumento térmico.",
  },
  {
    slug: "spa-fim-de-semana",
    title: "Spa para um fim de semana",
    lead: "Escapadinhas curtas com água quente.",
  },
];

export default function Page() {
  return (
    <main id="principal" className="col prose-page">
      <h1>Listas</h1>
      <p>Recortes editoriais a partir dos 103 sítios do índice.</p>
      <ul>
        {LISTAS.map((l) => (
          <li key={l.slug} style={{ marginBottom: "1.25rem" }}>
            <Link href={`/listas/${l.slug}/`}>
              <strong>{l.title}</strong>
            </Link>
            <div style={{ color: "var(--tinta-2)" }}>{l.lead}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
