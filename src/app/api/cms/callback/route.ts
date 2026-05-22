import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function html(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

function popupMessage(type: "success" | "error", payload: unknown, status = 200) {
  const authMessage = `authorization:github:${type}:${JSON.stringify(payload)}`;

  return html(
    `<!doctype html>
<html>
  <body>
    <script>
      window.opener?.postMessage(
        ${JSON.stringify(authMessage)},
        window.location.origin
      );
      window.close();
    </script>
    <p>GitHub authorization ${type}.</p>
  </body>
</html>`,
    status,
  );
}

export async function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const code = request.nextUrl.searchParams.get("code");
  const error = request.nextUrl.searchParams.get("error");
  const errorDescription = request.nextUrl.searchParams.get("error_description");

  if (error) {
    return popupMessage(
      "error",
      { message: errorDescription ?? error },
      400,
    );
  }

  if (!clientId || !clientSecret) {
    return popupMessage(
      "error",
      { message: "Missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET." },
      500,
    );
  }

  if (!code) {
    return popupMessage("error", { message: "Missing GitHub code." }, 400);
  }

  const tokenResponse = await fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
      cache: "no-store",
    },
  );
  const tokenData = await tokenResponse.json();

  if (!tokenResponse.ok || tokenData.error || !tokenData.access_token) {
    return popupMessage(
      "error",
      {
        message:
          tokenData.error_description ??
          tokenData.error ??
          "GitHub token exchange failed.",
      },
      400,
    );
  }

  return popupMessage("success", {
    token: tokenData.access_token,
    provider: "github",
  });
}
