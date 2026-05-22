import { NextRequest } from "next/server";

export function getPublicOrigin(request: NextRequest) {
  const forwardedHost =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  const forwardedProto =
    request.headers.get("x-forwarded-proto") ??
    (forwardedHost?.startsWith("localhost") ||
    forwardedHost?.startsWith("127.0.0.1")
      ? "http"
      : "https");

  if (forwardedHost && !forwardedHost.startsWith("0.0.0.0")) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return request.nextUrl.origin;
}
