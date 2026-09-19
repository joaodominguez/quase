import sitios from "../data/sitios.json";

export const CAT_LABEL = {
  termas: "Termas",
  "hotel-termal": "Hotéis com termas",
  hotel: "Hotéis com piscina interior",
  "jacuzzi-no-quarto": "Jacuzzi no quarto",
  motel: "Motéis",
};

export const CAT_CLASS = {
  termas: "cat-termas",
  "hotel-termal": "cat-hotel-termal",
  hotel: "cat-hotel",
  "jacuzzi-no-quarto": "cat-jacuzzi-no-quarto",
  motel: "cat-motel",
};

export function allSitios() {
  return sitios;
}

export function getSitio(id) {
  return sitios.find((s) => s.id === id);
}

export function getSitioBySlug(slug) {
  return sitios.find((s) => {
    const u = (s.url || "").replace(/\/$/, "");
    return u.endsWith(`/${slug}`);
  });
}

export function sitiosByCategoria(categoria) {
  return sitios.filter((s) => s.categoria === categoria);
}

export function sitiosByTipo(tipo) {
  return sitios.filter((s) => s.tipo === tipo);
}

export function sitiosByRegiao(regiao) {
  return sitios.filter((s) => s.regiao === regiao);
}

export function nearby(sitio, limit = 3) {
  if (!sitio?.geo?.lat) return [];
  const { lat, lon } = sitio.geo;
  return sitios
    .filter((s) => s.id !== sitio.id && s.geo?.lat)
    .map((s) => ({
      s,
      d:
        (s.geo.lat - lat) ** 2 + (s.geo.lon - lon) ** 2,
    }))
    .sort((a, b) => a.d - b.d)
    .slice(0, limit)
    .map((x) => x.s);
}

export function carregadorLabel(sitio) {
  if (sitio.carregadorTexto) return sitio.carregadorTexto;
  switch (sitio.carregador) {
    case "sim":
      return "No próprio sítio";
    case "perto":
      return "Perto (rede pública)";
    case "nao":
      return "Não";
    default:
      return "Sem informação confirmada";
  }
}

export function precoLabel(sitio) {
  if (sitio.preco == null) return "";
  const u =
    sitio.precoUnidade === "entrada"
      ? "entrada"
      : sitio.precoUnidade === "periodo"
        ? "período"
        : "noite";
  const temp = sitio.temp != null ? `~${sitio.temp}° · ` : "";
  return `${temp}${sitio.preco} € / ${u}`.replace(/^ · /, "");
}

export function mapsUrl(sitio) {
  if (!sitio.geo?.lat) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${sitio.geo.lat},${sitio.geo.lon}`;
}

export function sortedForGrid(list = sitios) {
  // Prefer sites with photo, then price, then name — mirrors production intent
  return [...list].sort((a, b) => {
    const sa = (a.imagem ? 0 : 2) + (a.preco != null ? 0 : 1);
    const sb = (b.imagem ? 0 : 2) + (b.preco != null ? 0 : 1);
    if (sa !== sb) return sa - sb;
    return a.nome.localeCompare(b.nome, "pt");
  });
}
