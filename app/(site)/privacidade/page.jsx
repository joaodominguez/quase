import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Privacidade",
  description: "Política de privacidade do quase — cookies técnicos e medição GA4.",
  path: "/privacidade/",
});

export default function Page() {
  return (
    <main id="principal" className="col prose-page">
      <h1>Privacidade</h1>
      <p>
        O quase é um guia editorial. Usamos cookies técnicos e ferramentas de medição (GA4) para
        perceber que páginas são úteis.
      </p>
      <p>
        Quando usamos links de reserva afiliados, o parceiro pode registar a origem do clique.
        Não vendemos listas de contactos.
      </p>
      <p>
        Pedidos sobre dados pessoais: <a href="mailto:ola@quase.pt">ola@quase.pt</a>.
      </p>
    </main>
  );
}
