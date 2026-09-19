import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export default function SiteLayout({ children }) {
  return (
    <>
      <a className="saltar" href="#principal">
        Saltar para o conteúdo
      </a>
      <SiteHeader solid />
      {children}
      <SiteFooter />
    </>
  );
}
