import { NextResponse } from "next/server";

const ACTION_NETWORK_API_URL =
  "https://actionnetwork.org/api/v2/forms/05fef774-35a1-4e30-8b2a-9928890fa8a9/submissions/";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_ERROR_MESSAGE_LENGTH = 500;

async function getActionNetworkError(response: Response): Promise<string> {
  const responseBody = (await response.text()).trim();

  if (!responseBody) {
    return `Action Network returned status ${response.status}.`;
  }

  try {
    const parsedBody = JSON.parse(responseBody) as {
      error?: unknown;
      message?: unknown;
    };
    const message =
      typeof parsedBody.error === "string"
        ? parsedBody.error
        : typeof parsedBody.message === "string"
          ? parsedBody.message
          : responseBody;

    return message.slice(0, MAX_ERROR_MESSAGE_LENGTH);
  } catch {
    return responseBody.slice(0, MAX_ERROR_MESSAGE_LENGTH);
  }
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body === "object" && body !== null && "email" in body
      ? body.email
      : undefined;

  if (
    typeof email !== "string" ||
    email.length > 254 ||
    !EMAIL_PATTERN.test(email.trim())
  ) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }

  const apiKey = process.env.ACTION_NETWORK_API_KEY?.trim();

  if (!apiKey) {
    const error = "ACTION_NETWORK_API_KEY is not configured.";
    console.error(error);
    return NextResponse.json(
      { error },
      { status: 503 },
    );
  }

  try {
    const response = await fetch(ACTION_NETWORK_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/hal+json",
        "Content-Type": "application/json",
        "OSDI-API-Token": apiKey,
      },
      body: JSON.stringify({
        person: {
          email_addresses: [{ address: email.trim() }],
        },
      }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!response.ok) {
      const error = await getActionNetworkError(response);
      console.error(`Action Network email signup failed: ${error}`);
      return NextResponse.json(
        { error },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Unable to submit email signup to Action Network.", error);
    const message =
      error instanceof Error ? error.message : "Unknown Action Network error.";
    return NextResponse.json(
      { error: message },
      { status: 502 },
    );
  }
}
