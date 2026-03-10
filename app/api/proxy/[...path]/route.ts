import { type NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.API_URL;

type Context = { params: Promise<{ path: string[] }> };

async function proxy(req: NextRequest, ctx: Context): Promise<NextResponse> {
  if (!BACKEND_URL) {
    return NextResponse.json(
      { detail: "API_URL is not configured" },
      { status: 500 },
    );
  }

  const { path } = await ctx.params;
  const pathname = path.join("/");
  const search = req.nextUrl.search ?? "";
  const targetUrl = `${BACKEND_URL}/${pathname}${search}`;

  // Forward safe headers only — drop host, connection, etc.
  const forwardHeaders = new Headers();
  for (const [key, value] of req.headers.entries()) {
    const lower = key.toLowerCase();
    if (
      lower === "content-type" ||
      lower === "accept" ||
      lower === "authorization"
    ) {
      forwardHeaders.set(key, value);
    }
  }

  const body =
    req.method !== "GET" && req.method !== "HEAD"
      ? await req.arrayBuffer()
      : undefined;

  const upstream = await fetch(targetUrl, {
    method: req.method,
    headers: forwardHeaders,
    body,
    // Prevent Node from following redirects silently
    redirect: "follow",
  });

  const responseHeaders = new Headers();
  const contentType = upstream.headers.get("content-type");
  if (contentType) responseHeaders.set("content-type", contentType);

  const data = await upstream.arrayBuffer();

  return new NextResponse(data, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
