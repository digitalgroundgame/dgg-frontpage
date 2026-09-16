import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const localProxyUrl = "http://127.0.0.1:8081/api/v1";

export async function POST(request: NextRequest) {
  try {
    const proxyResponse = await fetch(localProxyUrl, {
      method: "POST",
      headers: {
        "Content-Type":
          request.headers.get("content-type") ?? "application/json",
      },
      body: await request.arrayBuffer(),
      cache: "no-store",
    });

    return new NextResponse(await proxyResponse.arrayBuffer(), {
      status: proxyResponse.status,
      headers: {
        "Content-Type":
          proxyResponse.headers.get("content-type") ?? "application/json",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The local CMS proxy is unavailable." },
      { status: 502 },
    );
  }
}
