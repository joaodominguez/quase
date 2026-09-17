import "../styles.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://quase.pt"),
  title: {
    default: "Quase · SPA e piscinas interiores",
    template: "%s · Quase",
  },
  description:
    "Reviews de hoteis com SPA e piscina interior em Portugal, Acores e Madeira — com preco, quando ir, temperatura e onde reservar.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://quase.pt/",
    title: "Quase · SPA e piscinas interiores",
    description:
      "Reviews de SPA e piscinas interiores em Portugal, Acores e Madeira.",
    locale: "pt_PT",
    siteName: "Quase",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
