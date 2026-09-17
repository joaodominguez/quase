export const metadata = {
  title: "Como escolhemos",
  description:
    "Critérios editoriais do quase: spa relevante, piscina interior, água no quarto e experiência termal.",
  alternates: { canonical: "/como-escolhemos/" },
};

export default function HowPage() {
  return (
    <main className="prose-page">
      <h1>Como escolhemos</h1>
      <p>
        O quase e um guia editorial independente. Não publicamos tudo — cada hotel entra
        porque a água e um motivo real para ficar.
      </p>

      <h2>Critérios</h2>
      <ul>
        <li>Spa relevante, com circuito de água ou tratamentos serios;</li>
        <li>piscina interior aquecida de uso comum;</li>
        <li>piscina ou plunge no quarto;</li>
        <li>ligação termal clara ao alojamento.</li>
      </ul>

      <h2>O que dizemos em cada review</h2>
      <ul>
        <li>Porque importa e para quem e;</li>
        <li>melhor época e temperatura de referência;</li>
        <li>preço de partida por noite;</li>
        <li>onde reservar.</li>
      </ul>

      <h2>Transparencia</h2>
      <p>
        Alguns links de reserva sao afiliados. A escolha editorial e independente e não
        vendemos posições em listas. Preços, temperaturas e imagens sao referência e devem
        ser confirmados junto do hotel.
      </p>
    </main>
  );
}
