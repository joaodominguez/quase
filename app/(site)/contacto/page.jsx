import { hubMetadata } from "@/lib/seo";

export const metadata = hubMetadata({
  title: "Contacto",
  description: "Correções e sugestões para o quase — ola@quase.pt.",
  path: "/contacto/",
});

export default function Page() {
  return (
    <main id="principal" className="col prose-page">
      <h1>Contacto</h1>
      <p>
        Correções e sugestões são bem-vindas, sobretudo se tiveres medido a água de algum sítio
        que ainda não cobrimos.
      </p>
      <p>
        Escreve para <a href="mailto:ola@quase.pt">ola@quase.pt</a>.
      </p>
    </main>
  );
}
