import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Updated type with createdAt included
type Payload = {
  email: string;
  name?: string;
  business?: string;
  createdAt?: string;
};

export async function POST(req: Request) {
  try {
    const payload: Payload = await req.json();

    // Validate email
    if (!payload?.email) {
      return NextResponse.json(
        { ok: false, message: "Email required" },
        { status: 400 }
      );
    }

    // Prepare file location
    const file = path.join(process.cwd(), "waitlist_temp.json");
    let list: Payload[] = [];

    // Load existing file if available
    if (fs.existsSync(file)) {
      try {
        list = JSON.parse(fs.readFileSync(file, "utf8"));
      } catch {
        list = [];
      }
    }

    // Push new entry
    list.push({
      ...payload,
      createdAt: new Date().toISOString(),
    });

    // Save back to file
    fs.writeFileSync(file, JSON.stringify(list, null, 2));

    // Success response
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Waitlist API Error:", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
