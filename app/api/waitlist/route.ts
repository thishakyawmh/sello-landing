import { NextResponse } from "next/server";

type WaitlistPayload = {
  email?: unknown;
  name?: unknown;
  business?: unknown;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function optionalText(value: unknown, maxLength: number): string | null {
  if (value === undefined || value === null || value === "") return null;
  if (typeof value !== "string") return null;

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) return null;
  return normalized;
}

export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }

  if (new TextEncoder().encode(rawBody).byteLength > 8 * 1024) {
    return NextResponse.json({ ok: false, message: "Request is too large" }, { status: 413 });
  }

  let payload: WaitlistPayload;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ ok: false, message: "Invalid JSON request" }, { status: 400 });
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    return NextResponse.json({ ok: false, message: "Invalid request body" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  if (!email || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ ok: false, message: "Enter a valid email address" }, { status: 400 });
  }

  const name = optionalText(payload.name, 120);
  const business = optionalText(payload.business, 120);
  if ((payload.name && !name) || (payload.business && !business)) {
    return NextResponse.json({ ok: false, message: "Name and business type must be 120 characters or fewer" }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    return NextResponse.json(
      { ok: false, message: "Waitlist storage is not configured yet" },
      { status: 503 }
    );
  }

  try {
    const endpoint = new URL("/rest/v1/waitlist_signups?on_conflict=email", supabaseUrl);
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: serviceRoleKey,
        Authorization: `Bearer ${serviceRoleKey}`,
        "Content-Type": "application/json",
        Prefer: "resolution=ignore-duplicates,return=minimal",
      },
      body: JSON.stringify({ email, name, business }),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });

    if (!response.ok) {
      console.error("Waitlist storage request failed with status:", response.status);
      return NextResponse.json({ ok: false, message: "Unable to save your request right now" }, { status: 502 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ ok: false, message: "Unable to save your request right now" }, { status: 502 });
  }
}
