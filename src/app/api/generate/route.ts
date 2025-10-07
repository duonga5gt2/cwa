import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const endpoint = process.env.GENERATE_ENDPOINT; // API Gateway URL for the Lambda
  if (!endpoint) {
    return NextResponse.json({ error: "GENERATE_ENDPOINT not configured" }, { status: 500 });
  }
  const body = await req.text();
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body,
    cache: "no-store",
  });
  const txt = await r.text();
  const isJson = r.headers.get("content-type")?.includes("application/json");
  if (!r.ok) return new NextResponse(txt || "Upstream error", { status: r.status });
  return new NextResponse(isJson ? txt : JSON.stringify({ raw: txt }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
