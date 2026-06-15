import "../styles.css";

export const metadata = {
  metadataBase: new URL("https://quase.pt"),
  title: "Quase.pt - Refugios especiais para ficar em Portugal",
  description:
    "Guia curado de herdades, casas de campo, boutique hoteis e pequenos refugios com alma em Portugal.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://quase.pt/",
    title: "Quase.pt - Refugios especiais para ficar em Portugal",
    description:
      "Descobre alojamentos independentes, herdades, turismo rural e boutique hoteis escolhidos pelo charme, calma e autenticidade.",
    locale: "pt_PT",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body>{children}</body>
    </html>
  );
}
