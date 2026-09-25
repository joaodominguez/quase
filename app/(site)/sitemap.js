import { loadSitios, sitiosPath } from "@/lib/sitios-store";
import { statSync } from "fs";

export const dynamic = "force-static";

function dataModified() {
  try {
    return statSync(sitiosPath()).mtime;
  } catch {
    return new Date();
  }
}

export default function sitemap() {
  const base = "https://quase.pt";
  const modified = dataModified();

  const staticRoutes = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "mapa", priority: 0.9, changeFrequency: "weekly" },
    { path: "termas", priority: 0.85, changeFrequency: "weekly" },
    { path: "hoteis-com-termas", priority: 0.85, changeFrequency: "weekly" },
    {
      path: "hoteis-piscina-interior",
      priority: 0.85,
      changeFrequency: "weekly",
    },
    { path: "jacuzzi-no-quarto", priority: 0.8, changeFrequency: "weekly" },
    { path: "moteis", priority: 0.8, changeFrequency: "weekly" },
    { path: "portugal", priority: 0.8, changeFrequency: "weekly" },
    { path: "acores", priority: 0.8, changeFrequency: "weekly" },
    { path: "madeira", priority: 0.8, changeFrequency: "weekly" },
    { path: "listas", priority: 0.75, changeFrequency: "weekly" },
    {
      path: "listas/agua-quente-em-janeiro",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "listas/piscinas-interiores-portugal",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "listas/spa-acores-madeira",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "listas/spa-fim-de-semana",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    {
      path: "listas/escadinhas-beira-mar",
      priority: 0.75,
      changeFrequency: "weekly",
    },
    { path: "como-escolhemos", priority: 0.5, changeFrequency: "monthly" },
    { path: "contacto", priority: 0.4, changeFrequency: "yearly" },
    { path: "privacidade", priority: 0.3, changeFrequency: "yearly" },
  ];

  const entries = staticRoutes.map(({ path, priority, changeFrequency }) => ({
    url: `${base}/${path}${path ? "/" : ""}`,
    lastModified: modified,
    changeFrequency,
    priority,
  }));

  for (const s of loadSitios()) {
    if (!s.url) continue;
    entries.push({
      url: `${base}${s.url}`,
      lastModified: modified,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  return entries;
}
