const SITE_URL = "https://quase.pt";
const SITE_NAME = "quase";
const SITE_DESCRIPTION =
  "Cento e três sítios em Portugal onde se entra em água aquecida no inverno: termas, hotéis com piscina interior aquecida e motéis.";

export { SITE_URL, SITE_NAME, SITE_DESCRIPTION };

export function absoluteUrl(path = "/") {
  if (!path) return `${SITE_URL}/`;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function absoluteImage(path) {
  if (!path) return null;
  return absoluteUrl(path);
}

/** Metadata Open Graph + Twitter partilhados por página. */
export function pageSocial({ title, description, url, images }) {
  const abs = absoluteUrl(url);
  const imgs = (images || []).filter(Boolean).map((src) => ({
    url: absoluteImage(src),
  }));
  return {
    openGraph: {
      type: "website",
      locale: "pt_PT",
      siteName: SITE_NAME,
      title,
      description,
      url: abs,
      ...(imgs.length ? { images: imgs } : {}),
    },
    twitter: {
      card: imgs.length ? "summary_large_image" : "summary",
      title,
      description,
      ...(imgs.length ? { images: imgs.map((i) => i.url) } : {}),
    },
  };
}

/** Metadata completo para uma ficha de sítio. */
export function sitioMetadata(sitio) {
  const place = sitio.onde?.split(",")[0]?.trim() || "";
  const title = place ? `${sitio.nome} — ${place}` : sitio.nome;
  const description = sitio.resumo || SITE_DESCRIPTION;
  return {
    title,
    description,
    alternates: { canonical: sitio.url },
    ...pageSocial({
      title,
      description,
      url: sitio.url,
      images: sitio.imagem ? [sitio.imagem] : [],
    }),
  };
}

/** Metadata para hubs / listas. */
export function hubMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    ...pageSocial({ title, description, url: path }),
  };
}

function schemaTypeForSitio(sitio) {
  if (sitio.tipo === "motel") return "Motel";
  if (sitio.tipo === "termas" || sitio.categoria === "termas") return "DaySpa";
  if (sitio.categoria === "hotel-termal") return "Hotel";
  return "Hotel";
}

function priceRange(sitio) {
  if (sitio.preco == null) return undefined;
  const n = Number(sitio.preco);
  if (!Number.isFinite(n)) return undefined;
  if (n < 50) return "€";
  if (n < 150) return "€€";
  if (n < 300) return "€€€";
  return "€€€€";
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description: SITE_DESCRIPTION,
    inLanguage: "pt-PT",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      logo: absoluteUrl("/favicon.svg"),
    },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd({ name, description, path, sitios }) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description,
    url: absoluteUrl(path),
    numberOfItems: sitios.length,
    itemListElement: sitios.slice(0, 50).map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absoluteUrl(s.url),
      name: s.nome,
    })),
  };
}

export function sitioJsonLd(sitio) {
  const type = schemaTypeForSitio(sitio);
  const sameAs = [sitio.oficialUrl, sitio.instagram, sitio.bookingUrl].filter(
    Boolean,
  );
  const image = absoluteImage(sitio.imagem);
  const data = {
    "@context": "https://schema.org",
    "@type": type,
    name: sitio.nome,
    description: sitio.resumo || undefined,
    url: absoluteUrl(sitio.url),
    inLanguage: "pt-PT",
    ...(image ? { image } : {}),
    ...(sitio.onde
      ? {
          address: {
            "@type": "PostalAddress",
            addressLocality: sitio.onde.split(",")[0].trim(),
            addressCountry: "PT",
          },
        }
      : {}),
    ...(sitio.geo?.lat != null && sitio.geo?.lon != null
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: sitio.geo.lat,
            longitude: sitio.geo.lon,
          },
        }
      : {}),
    ...(priceRange(sitio) ? { priceRange: priceRange(sitio) } : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
  return data;
}

export function sitioBreadcrumbs(sitio) {
  const crumbs = [{ name: "Início", path: "/" }];
  if (sitio.tipo === "motel") {
    crumbs.push({ name: "Motéis", path: "/moteis/" });
  } else if (sitio.tipo === "termas" || sitio.categoria === "termas") {
    crumbs.push({ name: "Termas", path: "/termas/" });
  } else if (sitio.categoria === "hotel-termal") {
    crumbs.push({ name: "Hotéis com termas", path: "/hoteis-com-termas/" });
  } else if (sitio.categoria === "jacuzzi-no-quarto") {
    crumbs.push({ name: "Jacuzzi no quarto", path: "/jacuzzi-no-quarto/" });
  } else {
    crumbs.push({
      name: "Hotéis com piscina interior",
      path: "/hoteis-piscina-interior/",
    });
  }
  crumbs.push({ name: sitio.nome, path: sitio.url });
  return crumbs;
}
