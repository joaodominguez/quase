export const metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto/" },
};

export default function ContactPage() {
  return (
    <main className="prose-page">
      <h1>Contacto</h1>
      <p>
        Sugestões de hotéis com spa ou piscina interior, parcerias e correções:{" "}
        <a href="mailto:hello@quase.pt">hello@quase.pt</a>
      </p>
    </main>
  );
}
