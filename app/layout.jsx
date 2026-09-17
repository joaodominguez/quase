import "../styles.css";
import SiteHeader from "./components/SiteHeader";
import SiteFooter from "./components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://quase.pt"),
  title: {
    default: "quase · Spa e piscinas interiores",
    template: "%s · quase",
  },
  description:
    "Reviews de hotéis com spa e piscina interior em Portugal, Açores e Madeira: preço, melhor época, temperatura e onde reservar.",
  alternates: { canonical: "/" },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    url: "https://quase.pt/",
    siteName: "quase",
    title: "quase · Spa e piscinas interiores",
    description:
      "Reviews de hotéis com spa e piscina interior em Portugal, Açores e Madeira.",
    locale: "pt_PT",
  },
};

const themeScript = `(function(){try{var t=localStorage.getItem("quase-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark";}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
