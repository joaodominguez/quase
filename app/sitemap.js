import { allSitios } from "../lib/sitios";

export const dynamic = "force-static";

export default function sitemap() {
  const base = "https://quase.pt";
  const staticRoutes = [
    "",
    "mapa",
    "termas",
    "hoteis-com-termas",
    "hoteis-piscina-interior",
    "jacuzzi-no-quarto",
    "moteis",
    "portugal",
    "acores",
    "madeira",
    "listas",
    "listas/agua-quente-em-janeiro",
    "listas/piscinas-interiores-portugal",
    "listas/spa-acores-madeira",
    "listas/spa-fim-de-semana",
    "como-escolhemos",
    "contacto",
    "privacidade",
  ];

  const entries = staticRoutes.map((p) => ({
    url: `${base}/${p}${p ? "/" : ""}`,
    lastModified: new Date("2026-09-19"),
  }));

  for (const s of allSitios()) {
    if (!s.url) continue;
    entries.push({
      url: `${base}${s.url}`,
      lastModified: new Date("2026-09-19"),
    });
  }

  return entries;
}
