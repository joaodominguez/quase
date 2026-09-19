import "../styles/globals.css";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "../lib/seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — onde há água quente em Portugal`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "pt_PT",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
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
      <body>{children}</body>
    </html>
  );
}
