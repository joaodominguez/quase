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
  const prefix = sitio.precoNota ? `${sitio.precoNota} ` : "";
  return `${temp}${prefix}${sitio.preco} € / ${u}`.replace(/^ · /, "");
}

/** Texto curto para cartões quando ainda não há preço fixo. */
export function precoFallback(sitio) {
  if (sitio.preco != null) return null;
  if (sitio.bookingUrl) return "preço na Booking";
  if (sitio.tipo === "termas") return "confirma entrada";
  if (sitio.tipo === "motel") return "confirma período";
  return null;
}

export function mapsUrl(sitio) {
  if (!sitio?.geo?.lat) return null;
  return `https://www.google.com/maps/dir/?api=1&destination=${sitio.geo.lat},${sitio.geo.lon}`;
}

export function sortedForGrid(list = []) {
  return [...list].sort((a, b) => {
    const sa = (a.imagem ? 0 : 2) + (a.preco != null ? 0 : 1);
    const sb = (b.imagem ? 0 : 2) + (b.preco != null ? 0 : 1);
    if (sa !== sb) return sa - sb;
    return a.nome.localeCompare(b.nome, "pt");
  });
}
