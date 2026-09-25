#!/usr/bin/env node
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const sitios = JSON.parse(readFileSync(join(root, "data/sitios.json"), "utf8"));

const EV = new Set(["sim", "perto", "nao", "desconhecido"]);
let errors = 0;

function fail(msg) {
  console.error("✗", msg);
  errors++;
}

if (!Array.isArray(sitios) || sitios.length < 1) fail("sitios.json vazio");

const ids = new Set();
for (const s of sitios) {
  if (!s.id) fail("sítio sem id");
  if (ids.has(s.id)) fail(`id duplicado: ${s.id}`);
  ids.add(s.id);
  if (!s.nome) fail(`${s.id}: sem nome`);
  if (!s.url) fail(`${s.id}: sem url`);
  if (!s.geo?.lat || !s.geo?.lon) fail(`${s.id}: sem geo`);
  if (!EV.has(s.carregador || "desconhecido")) fail(`${s.id}: carregador inválido`);
}

const evOk = sitios.filter((s) => s.carregador && s.carregador !== "desconhecido").length;
console.log(`sitios: ${sitios.length}`);
console.log(`com EV (sim/perto/nao): ${evOk}`);
console.log(`com foto: ${sitios.filter((s) => s.imagem).length}`);
console.log(`com review: ${sitios.filter((s) => s.review).length}`);
console.log(`com preço: ${sitios.filter((s) => s.preco != null).length}`);
console.log(`com Instagram: ${sitios.filter((s) => s.instagram).length}`);
console.log(`com site oficial: ${sitios.filter((s) => s.oficialUrl).length}`);
for (const s of sitios) {
  if (!s.review || String(s.review).trim().length < 40) fail(`${s.id}: review em falta ou demasiado curta`);
  if (s.instagram && !/^[A-Za-z0-9._]+$/.test(s.instagram)) fail(`${s.id}: Instagram inválido`);
}

if (errors) {
  console.error(`\n${errors} erros`);
  process.exit(1);
}
console.log("\ncheck ok");
