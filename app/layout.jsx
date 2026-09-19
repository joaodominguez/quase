import "../styles/globals.css";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";

export const metadata = {
  metadataBase: new URL("https://quase.pt"),
  title: {
    default: "quase — onde há água quente em Portugal",
    template: "%s — quase",
  },
  description:
    "Cento e três sítios em Portugal onde se entra em água aquecida no inverno: termas, hotéis com piscina interior aquecida e motéis.",
  alternates: { canonical: "/" },
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    url: "https://quase.pt/",
    siteName: "quase",
    locale: "pt_PT",
    title: "quase — onde há água quente em Portugal",
    description:
      "Cento e três sítios em Portugal onde se entra em água aquecida no inverno.",
  },
};

const themeScript = `(function(){document.documentElement.classList.add("js");try{var t=localStorage.getItem("quase-tema");if(t)document.documentElement.setAttribute("data-theme",t);}catch(e){}})();`;

const ga = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-N2210CKKWX");`;

export default function RootLayout({ children }) {
  return (
    <html lang="pt-PT" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="theme-color" content="#F6F8F7" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#070E10" media="(prefers-color-scheme: dark)" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700&family=Instrument+Sans:wght@400;500;600;700&display=swap"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-N2210CKKWX" />
        <script dangerouslySetInnerHTML={{ __html: ga }} />
      </head>
      <body>
        <a className="saltar" href="#principal">
          Saltar para o conteúdo
        </a>
        <SiteHeader solid />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
