export const metadata = {
  title: "Como escolhemos",
  description: "Critérios editoriais do quase: água aquecida, fontes verificáveis, transparência.",
  alternates: { canonical: "/como-escolhemos/" },
};

export default function Page() {
  return (
    <main id="principal" className="col prose-page">
      <h1>Como escolhemos</h1>
      <p>
        O quase é um guia editorial independente de sítios em Portugal onde se entra em água
        aquecida: termas, hotéis com piscina interior ou termal, jacuzzi no quarto e motéis.
      </p>
      <h2>Critérios</h2>
      <ul>
        <li>Água aquecida como motivo real para ir (termal, piscina interior, suíte com água);</li>
        <li>informação verificável em fontes oficiais ou medição nossa;</li>
        <li>geo precisa o suficiente para o mapa e para «levar-me lá»;</li>
        <li>carregador elétrico: no sítio, perto (rede pública) ou sem informação — nunca inventado.</li>
      </ul>
      <h2>O que ainda não fazemos</h2>
      <p>
        Ainda não visitámos os sítios. Temperatura medida existe só onde a registámos. Preços e
        horários mudam — confirma sempre no operador.
      </p>
      <h2>Transparência</h2>
      <p>
        Alguns links de reserva são afiliados. A escolha editorial é independente. Fotografias
        Wikimedia Commons vão creditadas na imagem.
      </p>
    </main>
  );
}
