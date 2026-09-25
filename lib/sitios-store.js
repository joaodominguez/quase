import { readFileSync, writeFileSync, renameSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const REPO_DATA = join(process.cwd(), "data", "sitios.json");

export function sitiosPath() {
  if (process.env.DATA_DIR) {
    return join(process.env.DATA_DIR, "sitios.json");
  }
  return REPO_DATA;
}

export function loadSitios() {
  const primary = sitiosPath();
  const path = existsSync(primary) ? primary : REPO_DATA;
  return JSON.parse(readFileSync(path, "utf8"));
}

export function saveSitios(sitios) {
  if (!Array.isArray(sitios)) {
    throw new Error("sitios deve ser um array");
  }
  const path = sitiosPath();
  const dir = join(path, "..");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  const tmp = `${path}.tmp`;
  writeFileSync(tmp, `${JSON.stringify(sitios, null, 2)}\n`, "utf8");
  renameSync(tmp, path);
  return path;
}

export function getSitioById(id) {
  return loadSitios().find((s) => s.id === id) || null;
}

export function updateSitio(id, patch) {
  const sitios = loadSitios();
  const index = sitios.findIndex((s) => s.id === id);
  if (index < 0) return null;

  const current = sitios[index];
  const next = { ...current };

  const stringFields = [
    "nome",
    "onde",
    "resumo",
    "review",
    "bookingUrl",
    "oficialUrl",
    "instagram",
    "imagem",
    "credito",
    "carregador",
    "carregadorTexto",
    "estado",
    "precoUnidade",
    "tempFonte",
    "agua",
    "quando",
    "sub",
  ];

  for (const key of stringFields) {
    if (!(key in patch)) continue;
    const value = patch[key];
    if (value === null || value === undefined || value === "") {
      next[key] = key === "estado" ? "aberto" : null;
    } else {
      next[key] = String(value).trim();
    }
  }

  if ("preco" in patch) {
    const raw = patch.preco;
    if (raw === null || raw === undefined || raw === "") next.preco = null;
    else {
      const n = Number(raw);
      next.preco = Number.isFinite(n) ? n : null;
    }
  }

  if ("temp" in patch) {
    const raw = patch.temp;
    if (raw === null || raw === undefined || raw === "") next.temp = null;
    else {
      const n = Number(raw);
      next.temp = Number.isFinite(n) ? n : null;
    }
  }

  sitios[index] = next;
  next.updatedAt = new Date().toISOString();
  saveSitios(sitios);
  return next;
}

export function sitiosStats(sitios = loadSitios()) {
  const byTipo = {};
  const byCategoria = {};
  let comFoto = 0;
  let comPreco = 0;
  let comInstagram = 0;
  let comBooking = 0;
  let obras = 0;

  for (const s of sitios) {
    byTipo[s.tipo] = (byTipo[s.tipo] || 0) + 1;
    byCategoria[s.categoria] = (byCategoria[s.categoria] || 0) + 1;
    if (s.imagem) comFoto += 1;
    if (s.preco != null) comPreco += 1;
    if (s.instagram) comInstagram += 1;
    if (s.bookingUrl) comBooking += 1;
    if (s.estado === "obras") obras += 1;
  }

  return {
    total: sitios.length,
    byTipo,
    byCategoria,
    comFoto,
    comPreco,
    comInstagram,
    comBooking,
    obras,
    semFoto: sitios.length - comFoto,
    semPreco: sitios.length - comPreco,
  };
}
