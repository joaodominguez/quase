/** Motéis (estadia curta / suítes) em Portugal — fichas com sites oficiais verificados. */

export const motels = [
  {
    slug: "havay-motel",
    name: "Havay Motel",
    region: "Grande Porto",
    location: "Leça do Balio",
    area: "Matosinhos / Porto",
    tags: ["suites", "piscina-suite", "24h"],
    summary:
      "Um dos motéis emblemáticos do Grande Porto: suítes temáticas, algumas com piscina, e operação pensada para privacidade.",
    why: "Referência antiga na área metropolitana do Porto, com renovação contínua e foco em discrição. Útil quando queres uma suíte com equipamento próprio (incluindo opções com piscina) sem lógica de hotel de cidade.",
    forWhom: "Casais que querem suíte privada com tempo definido; quem procura piscina na suíte na área do Porto.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes:
        "Confirmar tipologia (suite com piscina vs. quarto temático), duração e extras no site oficial.",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 125,
    priceNote: "referência suítes com piscina (consultar tabela actual)",
    officialUrl: "https://havaymotel.pt/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
  {
    slug: "silk-motel",
    name: "Silk Motel",
    region: "Grande Porto",
    location: "Pedroso",
    area: "Vila Nova de Gaia",
    tags: ["suites", "piscina-suite", "tematico"],
    summary:
      "Motel em Pedroso (Gaia) com suítes temáticas e opções com piscina — experiência de suíte, não de quarto de hotel.",
    why: "Gama clara de suítes (standard a XL Experience) e comunicação directa de preços no site. Bom ponto de partida se queres comparar tipologias com água / hidromassagem na área sul do Porto.",
    forWhom: "Quem quer escolher suíte por ambiente (e não só por localização) na margem sul.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes: "Validar promoções e duração mínima no site; preços variam por suíte e período.",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 55,
    priceNote: "desde suítes de entrada (consultar site)",
    officialUrl: "https://silkmotel.com/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
  {
    slug: "alto-de-valongo",
    name: "Motel Alto de Valongo",
    region: "Grande Porto",
    location: "Valongo",
    area: "≈10 km do centro do Porto",
    tags: ["suites", "jacuzzi", "garagem"],
    summary:
      "Em Valongo, com vistas desafogadas e suítes com garagem privativa — discrição como argumento principal.",
    why: "Posiciona-se pela combinação de localização afastada do centro, acesso directo garagem–quarto e suítes com jacuzzi. Útil quando a prioridade é confidencialidade e não proximidade à Baixa.",
    forWhom: "Quem vem de carro e quer chegar e entrar sem passagem por lobby de hotel.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes: "Confirmar tipologias (Jacuzzi Lux / Plus / Deluxe) e disponibilidade no site oficial.",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 80,
    priceNote: "estimativa editorial — confirmar no site",
    officialUrl: "https://altodevalongo.com/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
  {
    slug: "elite-motel-sintra",
    name: "Elite Motel",
    region: "Grande Lisboa",
    location: "Albarraque, Sintra",
    area: "Sintra",
    tags: ["suites", "piscina-interior", "jacuzzi"],
    summary:
      "Em Albarraque (Sintra): suítes com piscina interior aquecida e jacuzzi — o moteis da margem de Lisboa com argumento de água na suíte.",
    why: "Diferencia-se pelas suítes com piscina interior (ex.: Elite HOT / Luma). Se no guia de spa procuras água partilhada, aqui a água é privada, na suíte.",
    forWhom: "Casais na área de Lisboa/Sintra que querem piscina ou jacuzzi sem partilhar espaço comum.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes: "Preços por período (ex. 6h); confirmar suíte e disponibilidade em elitemotel.pt.",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 190,
    priceNote: "referência suítes com piscina / 6h (consultar site)",
    officialUrl: "https://www.elitemotel.pt/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
  {
    slug: "requinte-motel-sintra",
    name: "Requinte Motel",
    region: "Grande Lisboa",
    location: "Abrunheira, Sintra",
    area: "Sintra",
    tags: ["suites", "precos-publicos", "curta"],
    summary:
      "Motel em Abrunheira com grelha de preços pública por período — desde suítes simples a nupcial.",
    why: "Transparência de tarifas (2h / 4h / 12h / +12h) facilita comparar sem telefonema. Bom para quem quer uma opção Sintra com regras claras de duração.",
    forWhom: "Estadias curtas com orçamento definido; quem prefere ver preços antes de reservar.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes:
        "Reservas antecipadas sobretudo em tipologias premium; restantes conforme disponibilidade. Confirmar excepções (namorados, ano novo).",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 25,
    priceNote: "desde suite simples / 2h (tabela do site)",
    officialUrl: "https://www.requintemotel.pt/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
  {
    slug: "dlirius-azuis",
    name: "Motel D'Lirius Azuis",
    region: "Grande Lisboa",
    location: "Sintra",
    area: "junto à vila de Sintra",
    tags: ["suites", "tematico", "jacuzzi"],
    summary:
      "Junto a Sintra desde 2004: dezenas de suítes temáticas, com foco em discrição e estadias a qualquer hora.",
    why: "Volume de tipologias (cerca de 38 suítes) dá margem para escolher ambiente. Posiciona-se como escape — útil se queres variedade sem sair da órbita de Sintra.",
    forWhom: "Quem quer suíte temática na área de Sintra; estadias flexíveis fora do horário de hotel clássico.",
    stay: {
      parking: true,
      shortStay: true,
      overnight: true,
      notes: "Consultar suítes e preços actuais em dliriusazuis.com.",
    },
    season: "Todo o ano.",
    whenToGo: "Todo o ano",
    priceFrom: 90,
    priceNote: "desde tipologias publicadas no site",
    officialUrl: "https://dliriusazuis.com/",
    officialLabel: "Site oficial",
    bookingQuery: null,
    image: "/images/hotels/fallback-v2.jpg",
    imageCredit: "Imagem ilustrativa (não oficial)",
  },
];

export function getMotel(slug) {
  return motels.find((motel) => motel.slug === slug);
}

export function motelPrimaryUrl(motel) {
  if (motel.officialUrl) return motel.officialUrl;
  if (motel.bookingQuery) {
    return `https://www.booking.com/searchresults.pt-pt.html?ss=${encodeURIComponent(motel.bookingQuery)}`;
  }
  return "/moteis/";
}
