import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const HOME_URL = "https://www.bestportugalhotels.com/en/";
const HOTELS_URL = "https://www.bestportugalhotels.com/en/hotels-x/";
const PORTFOLIO_SITEMAP_URL = "https://www.bestportugalhotels.com/mies_portfolio-sitemap.xml";
const OUTPUT_PATH = resolve("data/reference/bestportugalhotels-instagram.json");
const PUBLIC_LEADS_OUTPUT_PATH = resolve("data/reference/bestportugalhotels-public-leads.json");

function decodeEntities(value = "") {
  return value
    .replace(/&#038;/g, "&")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;/g, "'")
    .replace(/&#8211;/g, "-")
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/\\\//g, "/");
}

function stripTags(value = "") {
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function extractAttribute(html, name) {
  const match = html.match(new RegExp(`${name}="([^"]*)"`, "i"));
  return match ? decodeEntities(match[1]) : null;
}

function parseCaption(rawCaption = "") {
  const normalized = decodeEntities(rawCaption.replace(/<[^>]*>/g, " "))
    .replace(/\s*•\s*/g, "\n")
    .replace(/\s+/g, " ")
    .replace(/\n\s+/g, "\n")
    .trim();

  const compact = normalized.replace(/\s+/g, " ").trim();
  const extractField = (field) => {
    const pattern = new RegExp(
      `${field}:\\s*(.*?)(?=\\s+(?:Who|What|Where|How):|\\s+📸|\\s+〰|\\s+#|$)`,
      "i",
    );
    return compact.match(pattern)?.[1]?.trim() ?? null;
  };

  const who = extractField("Who");
  const what = extractField("What");
  const where = extractField("Where");
  const how = extractField("How");

  return {
    raw: compact,
    instagramHandle: who?.match(/@[\w.]+/)?.[0] ?? null,
    category: what,
    location: where,
    priceReference: how,
  };
}

function extractPosts(html) {
  const posts = [];
  const blockPattern = /<div class="sbi_item\b[\s\S]*?(?=<\/div><div class="sbi_item\b|<div id="sbi_load"|<\/div>\s*<\/div>\s*<div id="sbi_load")/g;
  const blocks = html.match(blockPattern) ?? [];

  for (const block of blocks) {
    const id = extractAttribute(block, "id")?.replace(/^sbi_/, "") ?? null;
    const date = extractAttribute(block, "data-date");
    const href = extractAttribute(block, "href");
    const fullRes = extractAttribute(block, "data-full-res");
    const altMatch = block.match(/<img[^>]+alt="([\s\S]*?)"/i);
    const screenreaderMatch = block.match(/<span class="sbi-screenreader">([\s\S]*?)<\/span>/i);
    const caption = parseCaption(altMatch?.[1] || screenreaderMatch?.[1] || "");
    const type = block.includes("sbi_type_video") ? "video" : "image";

    if (!id && !href && !caption.instagramHandle) {
      continue;
    }

    posts.push({
      source: "bestportugalhotels.com embedded Instagram feed",
      account: "bestportugalhotels_",
      id,
      type,
      postedAt: date ? new Date(Number(date) * 1000).toISOString() : null,
      postUrl: href,
      imageReferenceUrl: fullRes,
      instagramHandle: caption.instagramHandle,
      category: caption.category,
      location: caption.location,
      priceReference: caption.priceReference,
      captionReference: caption.raw,
      usageNotes:
        "Reference only. Confirm details with official sources and do not reuse images/captions without permission.",
    });
  }

  return posts;
}

function hotelNameFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => {
      if (["do", "da", "de", "del"].includes(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join(" ");
}

function extractHotelLinks(html) {
  const links = new Map();
  const pattern = /href="(https:\/\/www\.bestportugalhotels\.com\/en\/hotels\/([^/"#?]+)\/?)"[^>]*>([\s\S]*?)<\/a>/g;

  for (const match of html.matchAll(pattern)) {
    const publicUrl = match[1].endsWith("/") ? match[1] : `${match[1]}/`;
    const slug = match[2];
    const label = stripTags(match[3]);

    links.set(slug, {
      slug,
      name: label || hotelNameFromSlug(slug),
      publicUrl,
      source: HOTELS_URL,
    });
  }

  return links;
}

function extractPortfolioLeads(sitemapXml) {
  const leads = new Map();
  const locs = [...sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => decodeEntities(match[1]));

  for (const loc of locs) {
    const match = loc.match(/\/en\/hotels\/([^/]+)\/(.+)$/);
    if (!match) {
      continue;
    }

    const slug = match[1];
    const lead = leads.get(slug) ?? {
      slug,
      name: hotelNameFromSlug(slug),
      publicUrl: `https://www.bestportugalhotels.com/en/hotels/${slug}/`,
      portfolioUrls: [],
      source: PORTFOLIO_SITEMAP_URL,
    };

    lead.portfolioUrls.push(loc);
    leads.set(slug, lead);
  }

  return leads;
}

function extractPageDetails(html) {
  const title = stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] ?? "")
    .replace(/\s+-\s+Best Portugal Hotels\s*$/i, "")
    .replace(/\s+\|\s+Best Portugal Hotels\s*$/i, "")
    .replace(/\s+-\s+Portugal\s*$/i, "")
    .replace(/\s+by The Beautique Hotels\s+by The Beautique Hotels/i, " by The Beautique Hotels")
    .trim();
  const description = decodeEntities(
    html.match(/<meta\s+name="description"\s+content="([^"]*)"/i)?.[1] ?? "",
  ).trim();
  const h1 = stripTags(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1] ?? "");
  const imageReferenceUrls = [
    ...new Set(
      [...html.matchAll(/https:\/\/www\.bestportugalhotels\.com\/wp-content\/uploads\/[^"' <>)]+/g)]
        .map((match) => decodeEntities(match[0]))
        .filter((url) => /\.(jpe?g|png|webp)(?:\?|$)/i.test(url))
        .filter((url) => !/logo|cropped-prancheta|photo_replacer/i.test(url)),
    ),
  ].slice(0, 8);

  return {
    title: title || h1 || null,
    description: description || null,
    imageReferenceUrls,
  };
}

async function fetchText(url) {
  const response = await fetch(url, {
    headers: {
      "user-agent": "quase.pt public editorial crawler/0.1 (+https://quase.pt)",
      accept: "text/html,application/xhtml+xml,application/xml,text/xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return response.text();
}

async function enrichHotelLead(lead) {
  try {
    const html = await fetchText(lead.publicUrl);
    const details = extractPageDetails(html);

    return {
      ...lead,
      name: details.title || lead.name,
      description: details.description,
      imageReferenceUrls: details.imageReferenceUrls,
      publicPageReachable: true,
    };
  } catch (error) {
    return {
      ...lead,
      description: null,
      imageReferenceUrls: [],
      publicPageReachable: false,
      fetchError: error.message,
    };
  }
}

async function main() {
  const [homeHtml, hotelsHtml, portfolioSitemapXml] = await Promise.all([
    fetchText(HOME_URL),
    fetchText(HOTELS_URL),
    fetchText(PORTFOLIO_SITEMAP_URL),
  ]);

  const posts = extractPosts(homeHtml);
  const uniqueByPost = new Map();

  for (const post of posts) {
    uniqueByPost.set(post.postUrl ?? post.id, post);
  }

  const instagramPayload = {
    crawledAt: new Date().toISOString(),
    sourceUrl: HOME_URL,
    sourceAccount: "https://www.instagram.com/bestportugalhotels_/",
    limitations: [
      "Instagram profile pages are not reliably accessible without login.",
      "This crawl uses the public embedded feed on bestportugalhotels.com.",
      "Images and captions are stored as references only and must not be reused without permission.",
    ],
    count: uniqueByPost.size,
    posts: [...uniqueByPost.values()],
  };

  const hotelLinks = extractHotelLinks(hotelsHtml);
  const portfolioLeads = extractPortfolioLeads(portfolioSitemapXml);
  const mergedLeads = new Map();

  for (const [slug, lead] of portfolioLeads) {
    mergedLeads.set(slug, lead);
  }

  for (const [slug, lead] of hotelLinks) {
    const existing = mergedLeads.get(slug) ?? {};
    mergedLeads.set(slug, {
      ...existing,
      ...lead,
      portfolioUrls: existing.portfolioUrls ?? [],
      listingSource: HOTELS_URL,
    });
  }

  for (const post of uniqueByPost.values()) {
    if (!post.instagramHandle) {
      continue;
    }

    const key = post.instagramHandle.replace("@", "instagram-").toLowerCase();
    if (!mergedLeads.has(key)) {
      mergedLeads.set(key, {
        slug: key,
        name: post.instagramHandle,
        publicUrl: null,
        portfolioUrls: [],
        instagramHandle: post.instagramHandle,
        category: post.category,
        location: post.location,
        priceReference: post.priceReference,
        instagramPostUrl: post.postUrl,
        source: "embedded Instagram feed",
      });
    }
  }

  const enrichedLeads = [];
  for (const lead of mergedLeads.values()) {
    // Only fetch pages that exist as BPH hotel URLs; Instagram-only leads remain references.
    if (lead.publicUrl) {
      enrichedLeads.push(await enrichHotelLead(lead));
    } else {
      enrichedLeads.push({ ...lead, imageReferenceUrls: [], publicPageReachable: false });
    }
  }

  const publicLeadsPayload = {
    crawledAt: new Date().toISOString(),
    sources: [HOME_URL, HOTELS_URL, PORTFOLIO_SITEMAP_URL],
    limitations: [
      "Uses only public pages/sitemaps/embeds.",
      "Direct Instagram crawling without login is not used.",
      "Images and copy are references only; confirm data with official hotel sources before publishing.",
    ],
    count: enrichedLeads.length,
    leads: enrichedLeads.sort((a, b) => a.name.localeCompare(b.name)),
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(instagramPayload, null, 2)}\n`);
  await writeFile(PUBLIC_LEADS_OUTPUT_PATH, `${JSON.stringify(publicLeadsPayload, null, 2)}\n`);
  console.log(`Wrote ${instagramPayload.count} Instagram references to ${OUTPUT_PATH}`);
  console.log(`Wrote ${publicLeadsPayload.count} public leads to ${PUBLIC_LEADS_OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
