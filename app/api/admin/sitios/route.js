import { NextResponse } from "next/server";
import { loadSitios, sitiosStats } from "@/lib/sitios-store";

export const dynamic = "force-dynamic";

export async function GET() {
  const sitios = loadSitios();
  return NextResponse.json({
    total: sitios.length,
    stats: sitiosStats(sitios),
    sitios,
  });
}
