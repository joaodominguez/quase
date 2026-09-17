export const metadata = {
  title: "Contacto",
  alternates: { canonical: "/contacto/" },
};

export default function ContactPage() {
  return (
    <main className="section legal">
      <h1>Contacto</h1>
      <p>
        Sugestoes de hoteis com SPA ou piscina interior, parcerias e correcoes:{" "}
        <a href="mailto:hello@quase.pt">hello@quase.pt</a>
      </p>
      <p>
        Instagram:{" "}
        <a href="https://www.instagram.com/quase.pt" rel="noreferrer" target="_blank">
          @quase.pt
        </a>
      </p>
    </main>
  );
}
