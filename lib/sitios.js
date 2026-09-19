import { unstable_noStore as noStore } from "next/cache";
import { loadSitios } from "./sitios-store";

export {
  CAT_LABEL,
  CAT_CLASS,
  carregadorLabel,
  precoLabel,
  precoFallback,
  mapsUrl,
  sortedForGrid,
} from "./sitios-meta";

function sitios() {
  noStore();
  return loadSitios();
}

export function allSitios() {
  return sitios();
}

export function getSitio(id) {
  return sitios().find((s) => s.id === id);
}

export function getSitioBySlug(slug) {
  return sitios().find((s) => {
    const u = (s.url || "").replace(/\/$/, "");
    return u.endsWith(`/${slug}`);
  });
}

export function sitiosByCategoria(categoria) {
  return sitios().filter((s) => s.categoria === categoria);
}

export function sitiosByTipo(tipo) {
  return sitios().filter((s) => s.tipo === tipo);
}

export function sitiosByRegiao(regiao) {
  return sitios().filter((s) => s.regiao === regiao);
}

export function nearby(sitio, limit = 3) {
  if (!sitio?.geo?.lat) return [];
  const { lat, lon } = sitio.geo;
  return sitios()
    .filter((s) => s.id !== sitio.id && s.geo?.lat)
    .map((s) => ({
      s,
      d: (s.geo.lat - lat) ** 2 + (s.geo.lon - lon) ** 2,
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.s);
}
