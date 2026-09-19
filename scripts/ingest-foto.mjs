#!/usr/bin/env node
/**
 * Acrescenta uma fotografia CC/licenciada a um sítio.
 *
 * Uso:
 *   node scripts/ingest-foto.mjs --id=pousada-serra-da-estrela \
 *     --url='https://upload.wikimedia.org/wikipedia/commons/…/ficheiro.jpg' \
 *     --credito='Nome · CC BY-SA 4.0 · Wikimedia Commons'
 *
 * Regras: só imagens com licença clara (CC/CC0/domínio público) ou autorização
 * escrita do hotel. Verifica sempre que a foto é mesmo daquele sítio.
 */
import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import https from "https";
import http from "http";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

function get(url, redirects = 0) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith("https") ? https : http;
    lib
      .get(
        url,
        {
          headers: {
            "User-Agent": "quase.pt-bot/1.0 (https://quase.pt; CC photo mirror)",
            Accept: "image/*,*/*",
          },
        },
        (res) => {
          if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location && redirects < 5) {
            res.resume();
            return get(res.headers.location, redirects + 1).then(resolve, reject);
          }
          if (res.statusCode !== 200) {
            res.resume();
            reject(new Error(`HTTP ${res.statusCode}`));
            return;
          }
          const chunks = [];
          res.on("data", (c) => chunks.push(c));
          res.on("end", () => resolve(Buffer.concat(chunks)));
        },
      )
      .on("error", reject);
  });
}

const id = arg("id");
const url = arg("url");
const credito = arg("credito");
if (!id || !url || !credito) {
  console.error("Falta --id= --url= --credito=");
  process.exit(1);
}

const pathJson = join(root, "data/sitios.json");
const sitios = JSON.parse(readFileSync(pathJson, "utf8"));
const sitio = sitios.find((s) => s.id === id);
if (!sitio) {
  console.error("id desconhecido:", id);
  process.exit(1);
}

mkdirSync(join(root, "public/fotos"), { recursive: true });
const file = `public/fotos/${id}.jpg`;
const buf = await get(url);
if (buf.length < 8000) {
  console.error("ficheiro demasiado pequeno — verifica o URL");
  process.exit(1);
}
writeFileSync(join(root, file), buf);
sitio.imagem = `/fotos/${id}.jpg`;
sitio.credito = credito;
writeFileSync(pathJson, JSON.stringify(sitios, null, 2) + "\n");
console.log("ok", id, "→", sitio.imagem, `(${buf.length} bytes)`);
console.log("credito:", credito);
