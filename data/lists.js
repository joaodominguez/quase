import { hotels } from "./hotels";

export const lists = [
  {
    slug: "piscinas-interiores-portugal",
    title: "Hoteis com piscina interior em Portugal",
    region: "Portugal continental",
    summary:
      "Quando chove ou o Atlantico esta frio: estadias escolhidas pela agua quente la dentro.",
    hotelSlugs: [
      "six-senses-douro-valley",
      "vidago-palace",
      "the-yeatman",
      "longevity-health-wellness-alvor",
      "areias-do-seixo",
      "sublime-comporta",
      "torre-de-gomariz-wine-spa",
    ],
  },
  {
    slug: "spa-acores-madeira",
    title: "SPA e agua quente nos Acores e Madeira",
    region: "Ilhas",
    summary:
      "Ilhas com vapor, termas e piscina coberta — para ficar quando o tempo muda de humor.",
    hotelSlugs: [
      "octant-furnas",
      "pedras-do-mar-resort-spa",
      "terra-nostra-garden-hotel",
      "savoy-palace-madeira",
      "reids-palace-madeira",
    ],
  },
  {
    slug: "spa-fim-de-semana",
    title: "SPA para um fim de semana",
    region: "Escapadinhas",
    summary:
      "Poucos dias, muito tempo dentro de agua: uma seleccao curta para desligar depressa.",
    hotelSlugs: [
      "the-yeatman",
      "torre-de-gomariz-wine-spa",
      "areias-do-seixo",
      "vidago-palace",
      "sublime-comporta",
    ],
  },
];

export function getList(slug) {
  return lists.find((list) => list.slug === slug);
}

export function hotelsForList(list) {
  return list.hotelSlugs
    .map((slug) => hotels.find((hotel) => hotel.slug === slug))
    .filter(Boolean);
}
