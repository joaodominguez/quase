import { NextResponse } from "next/server";
import { writeFileSync, mkdirSync, existsSync, copyFileSync } from "fs";
import { join } from "path";
import { getSitioById, updateSitio } from "@/lib/sitios-store";

export const dynamic = "force-dynamic";

const MAX_BYTES = 6 * 1024 * 1024;

function fotosDirs() {
  const dirs = [join(process.cwd(), "public", "fotos")];
  if (process.env.SHARED_FOTOS) dirs.push(process.env.SHARED_FOTOS);
  else if (process.env.DATA_DIR) {
    dirs.push(join(process.env.DATA_DIR, "..", "shared", "fotos"));
  }
  return [...new Set(dirs)];
}

export async function POST(request, { params }) {
  const { id } = await params;
  const sitio = getSitioById(id);
  if (!sitio) {
    return NextResponse.json({ error: "Sítio não encontrado." }, { status: 404 });
  }

  let form;
  try {
    form = await request.formData();
  } catch {
    return NextResponse.json({ error: "Formulário inválido." }, { status: 400 });
  }

  const file = form.get("foto");
  const credito = String(form.get("credito") || "").trim();
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "Falta o ficheiro foto." }, { status: 400 });
  }
  if (!credito) {
    return NextResponse.json(
      { error: "Indica o crédito (ex.: Nome · CC BY-SA 4.0 · Wikimedia Commons)." },
      { status: 400 },
    );
  }

  const type = file.type || "";
  if (!type.startsWith("image/")) {
    return NextResponse.json({ error: "O ficheiro tem de ser uma imagem." }, { status: 400 });
  }

  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length < 4000) {
    return NextResponse.json({ error: "Imagem demasiado pequena." }, { status: 400 });
  }
  if (buf.length > MAX_BYTES) {
    return NextResponse.json({ error: "Imagem acima de 6 MB." }, { status: 400 });
  }

  const rel = `/fotos/${id}.jpg`;
  for (const dir of fotosDirs()) {
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, `${id}.jpg`), buf);
  }

  const updated = updateSitio(id, { imagem: rel, credito });
  return NextResponse.json({ ok: true, sitio: updated, path: rel });
}
