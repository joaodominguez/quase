#!/usr/bin/env node
/**
 * Define preço editorial num sítio (valor que viste no operador / Booking).
 *
 * Uso:
 *   node scripts/set-preco.mjs --id=pestana-viking --preco=103 --unidade=noite --nota='a partir de'
 *   node scripts/set-preco.mjs --id=termas-de-vizela --preco= --clear
 *
 * Unidades: noite | entrada | periodo | hora
 * Não inventes: só números que confirmaste na fonte (e preferes «a partir de»).
 */
import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function arg(name) {
  const hit = process.argv.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.slice(name.length + 3) : null;
}

const id = arg("id");
const clear = process.argv.includes("--clear");
if (!id) {
  console.error("Falta --id=");
  process.exit(1);
}

const pathJson = join(root, "data/sitios.json");
const sitios = JSON.parse(readFileSync(pathJson, "utf8"));
const sitio = sitios.find((s) => s.id === id);
if (!sitio) {
  console.error("id desconhecido:", id);
  process.exit(1);
}

if (clear) {
  sitio.preco = null;
  delete sitio.precoNota;
} else {
  const preco = arg("preco");
  const unidade = arg("unidade") || sitio.precoUnidade || "noite";
  const nota = arg("nota");
  if (preco == null || preco === "") {
    console.error("Falta --preco= (ou usa --clear)");
    process.exit(1);
  }
  const n = Number(String(preco).replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) {
    console.error("preço inválido");
    process.exit(1);
  }
  sitio.preco = n;
  sitio.precoUnidade = unidade;
  if (nota) sitio.precoNota = nota;
  else if (!sitio.precoNota) sitio.precoNota = "a partir de";
}

writeFileSync(pathJson, JSON.stringify(sitios, null, 2) + "\n");
console.log("ok", id, "→", sitio.preco, sitio.precoUnidade, sitio.precoNota || "");
