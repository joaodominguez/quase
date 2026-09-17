export const metadata = {
  title: "Privacidade",
  alternates: { canonical: "/privacidade/" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="section legal">
      <h1>Privacidade</h1>
      <p>
        O quase.pt e um guia editorial. Podemos usar cookies tecnicos e ferramentas de
        medicao (por exemplo analytics) para perceber que paginas sao uteis.
      </p>
      <p>
        Se usarmos links de reserva afiliados, o parceiro pode registar a origem do clique.
        Nao vendemos listas de emails. A newsletter, quando activa, e de opt-in.
      </p>
      <p>
        Para pedidos relacionados com dados pessoais:{" "}
        <a href="mailto:hello@quase.pt">hello@quase.pt</a>.
      </p>
    </main>
  );
}
