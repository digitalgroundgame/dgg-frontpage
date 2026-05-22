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

function popupError(message: string, status = 400) {
  const authMessage = `authorization:github:error:${JSON.stringify({ message })}`;

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
    <p>${message}</p>
  </body>
</html>`,
    status,
  );
}

export function GET(request: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    return popupError("Missing GITHUB_CLIENT_ID.", 500);
  }

  const provider = request.nextUrl.searchParams.get("provider") ?? "github";

  if (provider !== "github") {
    return popupError(`Unsupported OAuth provider: ${provider}`);
  }

  const origin = request.nextUrl.origin;
  const scope =
    request.nextUrl.searchParams.get("scope") ??
    process.env.DECAP_GITHUB_SCOPE ??
    "repo,user";
  const authorizeUrl = new URL("https://github.com/login/oauth/authorize");
  const state = crypto.randomUUID();

  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", `${origin}/api/cms/callback`);
  authorizeUrl.searchParams.set("scope", scope);
  authorizeUrl.searchParams.set("state", state);

  return html(`<!doctype html>
<html>
  <body>
    <script>
      const provider = "github";
      const authorizeUrl = ${JSON.stringify(authorizeUrl.toString())};

      window.opener?.postMessage("authorizing:" + provider, window.location.origin);
      window.addEventListener("message", (event) => {
        if (
          event.origin === window.location.origin &&
          event.data === "authorizing:" + provider
        ) {
          window.location.assign(authorizeUrl);
        }
      });
    </script>
    <p>Authorizing with GitHub...</p>
  </body>
</html>`);
}
