import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const SOURCE_URL = "https://www.bestportugalhotels.com/en/";
const OUTPUT_PATH = resolve("data/reference/bestportugalhotels-instagram.json");

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

async function main() {
  const response = await fetch(SOURCE_URL, {
    headers: {
      "user-agent": "quase.pt editorial reference crawler/0.1 (+https://quase.pt)",
      accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${SOURCE_URL}: ${response.status}`);
  }

  const html = await response.text();
  const posts = extractPosts(html);
  const uniqueByPost = new Map();

  for (const post of posts) {
    uniqueByPost.set(post.postUrl ?? post.id, post);
  }

  const payload = {
    crawledAt: new Date().toISOString(),
    sourceUrl: SOURCE_URL,
    sourceAccount: "https://www.instagram.com/bestportugalhotels_/",
    limitations: [
      "Instagram profile pages are not reliably accessible without login.",
      "This crawl uses the public embedded feed on bestportugalhotels.com.",
      "Images and captions are stored as references only and must not be reused without permission.",
    ],
    count: uniqueByPost.size,
    posts: [...uniqueByPost.values()],
  };

  await mkdir(dirname(OUTPUT_PATH), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`Wrote ${payload.count} posts to ${OUTPUT_PATH}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
