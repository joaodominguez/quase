import { NextResponse } from "next/server";
import { getSitioById, updateSitio } from "@/lib/sitios-store";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  const sitio = getSitioById(id);
  if (!sitio) {
    return NextResponse.json({ error: "Sítio não encontrado." }, { status: 404 });
  }
  return NextResponse.json(sitio);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }

  const updated = updateSitio(id, body || {});
  if (!updated) {
    return NextResponse.json({ error: "Sítio não encontrado." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, sitio: updated });
}
